// @ts-check
/**
@copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
@author AnBr75
@name quiescence_search_0x88.js
@version 3.0 — переписан под реальную кодировку доски и списка ходов

НАЗНАЧЕНИЕ
  Поиск взятий (quiescence) за горизонтом основного поиска.
  Статическая оценка "слепа" к тактике: если последний ход — взятие ферзя
  пешкой, оценка увидит +900 и остановится, не заметив ответного взятия.
  Quiescence доигрывает форсированные взятия до "тихой" позиции.

  Узел:
    1. stand-pat — право не бить вообще;
    2. генерация взятий;
    3. отсечение безнадёжных взятий (delta / SEE-lite);
    4. рекурсия в окне (-beta, -alpha).

  Отдельная ветка — ШАХ: стоять нельзя, поэтому генерируются ВСЕ ходы
  и играются все уходы. Нет легальных ходов под шахом — это мат.

СОГЛАШЕНИЯ, НА КОТОРЫЕ ОПИРАЕТСЯ МОДУЛЬ (проверены по исходникам)
  chess_board_0x88.js:
    код фигуры: 1..6 белые (P,N,B,R,Q,K), 9..14 чёрные;
    тип фигуры = code & 7 (1..6, одинаково для обоих цветов);
    цвет хода  = board[SIDE_TO_MOVE_CB] (1 белый, 0 чёрный);
    короли     = board[IND_KING_FROM_WHITE_CB / IND_KING_FROM_BLACK_CB].

  move_list_0x88.js:
    упакованный ход = victim<<24 | to<<16 | from<<8 | type;
    type 1..16  — взятие с превращением, 17..20 — тихое превращение,
    (type - 1) & 3 -> 0=Q, 1=R, 2=B, 3=N  (работает для всех 1..20);
    type 46     — взятие на проходе (целевое поле пустое!);
    type 21..51 — обычные взятия, 52..60 — тихие ходы;
    clear_list_ml обнуляет только 3 счётчика (дёшево).

  Сортировку sorting_list_ml здесь НЕ используем: в ней все взятия пешек
  (45..51) стоят после проигрышных взятий (36..40) и взятий королём,
  то есть выигрышный N×P идёт позже проигрышного Q×N. Своя сортировка
  по реальной ценности жертвы этого лишена.

СОВМЕСТИМОСТЬ
  quiescence_search(alpha, beta, board, key, depth [, qs_ply])
  Старый вызов с 5 аргументами работает как раньше (qs_ply = 0).
*/

import {
  BOARD_SIZE_CB,
  SIDE_TO_MOVE_CB,
  WHITE_CB,
  IND_KING_FROM_WHITE_CB,
  IND_KING_FROM_BLACK_CB,
  IND_HALFMOVE_CLOCK_CB,
  W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB,
  B_PAWN_CB, B_KING_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_list_ml,
  LENGTH_LIST_ML,
  IND_NUMBER_MOVE_ML,
  MOVE_NO_ML,
  EP_CAPTURES_ML,
  CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, // = 1, первый тип с превращением
  MOVE_PAWN_PROMO_KNIGHT_ML           // = 20, последний тип с превращением
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
  generated_pseudo_legal_captures_mgc,
  check_detected_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";

import {
  score_position_e,
  PIECE_SCORE_E,
  PAWN_SCORE_E
} from "../evaluate_0x88/evaluate_0x88.js";

/* =========================================================================
 * 1. ФЛАГИ
 *    const с литералами: V8 выкидывает выключенные ветки при оптимизации.
 * ========================================================================= */

/** Сортировка взятий по реальной ценности: дорогая жертва дешёвой фигурой. */
const QS_USE_MVV_LVA = true;

/** Delta pruning: даже съев эту фигуру, до alpha не дотянем — пропускаем. */
const QS_USE_DELTA = true;

/**
 * SEE-lite: проигрывающее по материалу взятие на защищённое поле пропускаем.
 * Проверка вызывается ТОЛЬКО для взятий, где жертва дешевле атакующего,
 * то есть редко. Опирается на то, что check_detected_mgc(square, color, board)
 * отвечает "поле square атаковано противником стороны color" — именно так
 * она используется для короля в основном поиске.
 */
const QS_USE_SEE_LITE = true;

/** Под шахом играем все уходы, а не только взятия, и детектируем мат. */
const QS_IN_CHECK_EVASIONS = true;

/** Правило 50 ходов: halfmove_clock >= 100 -> ничья. */
const QS_USE_FIFTY_RULE = true;

/* =========================================================================
 * 2. КОНСТАНТЫ
 * ========================================================================= */

/** Диапазон типов ходов с превращением (взятия 1..16 и тихие 17..20). */
const PROMO_TYPE_FIRST = CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML;
const PROMO_TYPE_LAST = MOVE_PAWN_PROMO_KNIGHT_ML;

/** Размер стеков. Индекс — абсолютный ply от корня основного поиска. */
const MAX_DEPTH_SEARCH = 129;
const MAX_PLY = MAX_DEPTH_SEARCH - 1;

/** Сколько полуходов всего разрешаем искать внутри quiescence. */
const QS_MAX_PLY = 32;

/** Сколько полуходов подряд играем уходы из-под шаха (защита от вечного шаха). */
const QS_MAX_CHECK_PLY = 8;

/** Матовая база — та же, что в основном поиске (MATE_AB). */
const MATE_QS = -30000;
const INIT_EVAL_QS = -40000;

/** Выше этого по модулю — матовая зона, материальные отсечения запрещены. */
const MATE_BOUND = 29000;

/** Запас delta pruning на позиционные приобретения. */
const DELTA_MARGIN = 2 * PAWN_SCORE_E;

/** Запас SEE-lite: почти равные по материалу взятия не режем. */
const SEE_MARGIN = PAWN_SCORE_E;

/** База сортировки: любое взятие/превращение выше любого тихого хода. */
const CAPTURE_SORT_BASE = 1 << 20;

/* =========================================================================
 * 3. ТАБЛИЦЫ ЦЕННОСТЕЙ
 *    Строим один раз в ini_stack_qs. Дальше — локальный Int32Array(16),
 *    никаких обращений к импортированному массиву в горячем пути.
 * ========================================================================= */

/** Ценность фигуры по её коду (0..15). Индекс — тот же код, что на доске. */
const QS_PIECE_VALUE = new Int32Array(16);

/** Прибавка к материалу при превращении: [Q-P, R-P, B-P, N-P]. */
const QS_PROMO_BONUS = new Int32Array(4);

/**
 * Заполняем таблицы ценностей.
 * Если PIECE_SCORE_E действительно индексирована КОДОМ фигуры (длина > 14
 * и белая/чёрная пешка оценены одинаково) — берём значения оценщика, чтобы
 * delta pruning жил в той же шкале. Иначе строим свою от PAWN_SCORE_E.
 * Проверка на симметрию обязательна: если таблица индексирована ТИПОМ (1..6),
 * чёрные фигуры получили бы 0 и отсечения работали бы неверно.
 */
function ini_qs_piece_values() {
  let use_eval_table = false;

  if (PIECE_SCORE_E && PIECE_SCORE_E.length > B_KING_CB) {
    if (PIECE_SCORE_E[W_PAWN_CB] > 0 &&
        PIECE_SCORE_E[B_PAWN_CB] === PIECE_SCORE_E[W_PAWN_CB]) {
      use_eval_table = true;
    }
  }

  // Резервная шкала по ТИПУ фигуры (индекс 1..6).
  const p = PAWN_SCORE_E;
  const value_by_type = new Int32Array([0, p, 3 * p, 3 * p, 5 * p, 9 * p, 20 * p, 0]);

  for (let code = 0; code < 16; code++) {
    let value = value_by_type[code & 7];   // code & 7 -> тип 1..6, цвет не важен
    if (use_eval_table) value = PIECE_SCORE_E[code];
    QS_PIECE_VALUE[code] = value;
  }
  QS_PIECE_VALUE[0] = 0;                   // пустое поле

  const pawn_value = QS_PIECE_VALUE[W_PAWN_CB];
  QS_PROMO_BONUS[0] = QS_PIECE_VALUE[W_QUEEN_CB] - pawn_value;
  QS_PROMO_BONUS[1] = QS_PIECE_VALUE[W_ROOK_CB] - pawn_value;
  QS_PROMO_BONUS[2] = QS_PIECE_VALUE[W_BISHOP_CB] - pawn_value;
  QS_PROMO_BONUS[3] = QS_PIECE_VALUE[W_KNIGHT_CB] - pawn_value;
}

/* =========================================================================
 * 4. СЧЁТЧИКИ И STOP
 * ========================================================================= */

let node_qs = 0;
let stop_search_qs = 0;
let qs_ready = false;

const set_node_in_0_qs = function () { node_qs = 0; };
const set_stop_search_in_1_qs = function () { stop_search_qs = 1; };
const set_stop_search_in_0_qs = function () { stop_search_qs = 0; };

/* =========================================================================
 * 5. СТЕКИ
 *    Всё выделяется один раз, во время поиска — ноль аллокаций.
 * ========================================================================= */

/** Список ходов на каждый ply. */
const packing_moves_stack = new Array(MAX_DEPTH_SEARCH);
/** Позиция до хода. */
const chess_board_save_stack = new Array(MAX_DEPTH_SEARCH);
/** Ключ до хода. */
const chess_board_key_64_undo_stack = new Array(MAX_DEPTH_SEARCH);

/** Материальная выгода хода (жертва + прибавка за превращение). */
const qs_gain_stack = new Array(MAX_DEPTH_SEARCH);
/** Ключ сортировки MVV-LVA. */
const qs_score_stack = new Array(MAX_DEPTH_SEARCH);
/** Перестановка индексов: сам список ходов не переставляем. */
const qs_order_stack = new Array(MAX_DEPTH_SEARCH);

/**
 * Инициализация quiescence. Вызывать один раз при старте программы.
 */
const ini_stack_qs = function () {
  ini_qs_piece_values();

  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {
    packing_moves_stack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    chess_board_save_stack[depth] = new Int32Array(BOARD_SIZE_CB);
    chess_board_key_64_undo_stack[depth] = new BigUint64Array(1);

    qs_gain_stack[depth] = new Int32Array(LENGTH_LIST_ML);
    qs_score_stack[depth] = new Int32Array(LENGTH_LIST_ML);
    qs_order_stack[depth] = new Int32Array(LENGTH_LIST_ML);
  }

  qs_ready = true;
};

/* =========================================================================
 * 6. QUIESCENCE SEARCH
 * ========================================================================= */

/**
 * @param {number} alpha
 * @param {number} beta
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} depth    абсолютный ply от корня основного поиска
 * @param {number} [qs_ply] полуход внутри самого quiescence (0 на входе)
 * @returns {number} оценка от лица стороны, чей ход
 */
const quiescence_search = function (
  alpha,
  beta,
  chess_board_0x88,
  chess_board_key_64,
  depth,
  qs_ply = 0
) {

  /* --- 6.1 Границы и экстренный выход ---------------------------------- *
   * Проверки ДО обращения к буферам стека.
   * --------------------------------------------------------------------- */
  if (stop_search_qs == 1) return 0;
  if (!qs_ready) ini_stack_qs();

  if (depth >= MAX_PLY || qs_ply >= QS_MAX_PLY) {
    return score_position_e(chess_board_0x88);
  }

  node_qs = node_qs + 1;

  /* --- 6.2 Шах ---------------------------------------------------------- *
   * Цвет берём прямо с доски, а не из IND_PIECE_COLOR_ML: список только что
   * очищен, и цвет в нём ставит генератор — лишний повод для зависимости.
   * --------------------------------------------------------------------- */
  const piece_color = chess_board_0x88[SIDE_TO_MOVE_CB];
  const king_square = (piece_color == WHITE_CB)
    ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
    : chess_board_0x88[IND_KING_FROM_BLACK_CB];

  const in_check = (check_detected_mgc(king_square, piece_color, chess_board_0x88) != 0);

  // Режим ухода из-под шаха: играем ВСЕ ходы и не имеем права "стоять".
  const evasions = QS_IN_CHECK_EVASIONS && in_check && (qs_ply < QS_MAX_CHECK_PLY);

  /* --- 6.3 Правило 50 ходов --------------------------------------------- */
  if (QS_USE_FIFTY_RULE && !in_check &&
      chess_board_0x88[IND_HALFMOVE_CLOCK_CB] >= 100) {
    return 0;
  }

  /* --- 6.4 Stand-pat ---------------------------------------------------- */
  let best_value;
  let static_eval = 0;

  if (evasions) {
    best_value = INIT_EVAL_QS;      // под шахом стоять нельзя
  } else {
    static_eval = score_position_e(chess_board_0x88);
    best_value = static_eval;

    if (best_value >= beta) return best_value;   // fail-soft отсечение
    if (best_value > alpha) alpha = best_value;
  }

  /* --- 6.5 Генерация ходов ---------------------------------------------- *
   * Список обязательно очищаем: буфер один на ply и переиспользуется
   * соседними узлами. clear_list_ml — это 3 записи, стоит копейки.
   * --------------------------------------------------------------------- */
  const packing_moves = packing_moves_stack[depth];

  clear_list_ml(packing_moves);
  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);

  if (evasions) {
    generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);
  }

  const number_moves = packing_moves[IND_NUMBER_MOVE_ML];

  // Нет даже псевдолегальных ходов: под шахом это мат, иначе — тихая позиция.
  if (number_moves == 0) {
    if (evasions) return MATE_QS + depth;
    return best_value;
  }

  /* --- 6.6 Проход оценки ходов ------------------------------------------ *
   * Ход распаковываем ОДИН раз битовыми операциями (схема из move_list_0x88).
   * Здесь же считаем материальную выгоду для delta / SEE-lite.
   * --------------------------------------------------------------------- */
  const move_gain = qs_gain_stack[depth];
  const move_score = qs_score_stack[depth];
  const move_order = qs_order_stack[depth];
  const pawn_value = QS_PIECE_VALUE[W_PAWN_CB];

  for (let i = 0; i < number_moves; i++) {
    const packed_move = packing_moves[i];
    const type_move = packed_move & 0xFF;
    const from = (packed_move >> 8) & 0xFF;
    const victim_code = (packed_move >>> 24) & 0xFF;

    let gain = QS_PIECE_VALUE[victim_code];

    // Взятие на проходе: целевое поле пустое, в упаковке может лежать 0.
    if (type_move == EP_CAPTURES_ML) gain = pawn_value;

    // Превращение: пешка исчезает, появляется новая фигура.
    // (type - 1) & 3 -> 0=Q, 1=R, 2=B, 3=N для всех типов 1..20.
    if (type_move >= PROMO_TYPE_FIRST && type_move <= PROMO_TYPE_LAST) {
      gain = gain + QS_PROMO_BONUS[(type_move - 1) & 3];
    }

    let sort_score = 0;
    if (QS_USE_MVV_LVA && gain > 0) {
      // Атакующий ранжируется ТИПОМ (1 пешка .. 6 король), а не ценностью:
      // множитель 8 у выгоды гарантированно больше 6, поэтому порядок
      // "сначала дорогая жертва, при равенстве — дешёвый атакующий" строгий.
      // Взятия королём автоматически уходят в конец взятий.
      const attacker_type = chess_board_0x88[from] & 7;
      sort_score = CAPTURE_SORT_BASE + gain * 8 - attacker_type;
    }

    move_gain[i] = gain;
    move_score[i] = sort_score;
    move_order[i] = i;
  }

  /* --- 6.7 Основной цикл ------------------------------------------------ */
  const chess_board_save = chess_board_save_stack[depth];
  const chess_board_key_64_undo = chess_board_key_64_undo_stack[depth];

  let number_move_legal = 0;

  // Под шахом и в матовой зоне материальные отсечения отключаем полностью.
  const near_mate = (alpha > MATE_BOUND || beta < -MATE_BOUND);
  const allow_material_cut = !evasions && !near_mate;

  for (let i = 0; i < number_moves; i++) {

    /* (а) Ленивая сортировка: максимум из остатка.
           При отсечении хвост списка вообще не сортируется,
           и никаких subarray/sort с компаратором не создаётся. */
    let best_i = i;
    let best_sort = move_score[move_order[i]];

    for (let j = i + 1; j < number_moves; j++) {
      const s = move_score[move_order[j]];
      if (s > best_sort) { best_sort = s; best_i = j; }
    }

    if (best_i != i) {
      const tmp = move_order[i];
      move_order[i] = move_order[best_i];
      move_order[best_i] = tmp;
    }

    const move_i = move_order[i];
    const packed_move = packing_moves[move_i];
    const type_move = packed_move & 0xFF;
    const from = (packed_move >> 8) & 0xFF;
    const to = (packed_move >> 16) & 0xFF;
    const gain = move_gain[move_i];

    /* (б) Отсечение безнадёжных взятий.
           Превращения не режем никогда: помимо материала они меняют позицию. */
    if (allow_material_cut && gain > 0 &&
        !(type_move >= PROMO_TYPE_FIRST && type_move <= PROMO_TYPE_LAST)) {

      // Delta pruning: даже съев эту фигуру, до alpha не дотянем.
      if (QS_USE_DELTA) {
        if ((static_eval + gain + DELTA_MARGIN) <= alpha) continue;
      }

      // SEE-lite: дорогая фигура берёт дешёвую на защищённом поле.
      // Поле проверяем ДО хода: атакующий ещё на from и в редких случаях
      // экранирует защитника — ошибка в безопасную сторону (ход играем).
      if (QS_USE_SEE_LITE) {
        const attacker_value = QS_PIECE_VALUE[chess_board_0x88[from]];

        if (attacker_value > (gain + SEE_MARGIN)) {
          if (check_detected_mgc(to, piece_color, chess_board_0x88) != 0) continue;
        }
      }
    }

    /* (в) Делаем ход */
    chess_board_save.set(chess_board_0x88);
    chess_board_key_64_undo[0] = chess_board_key_64[0];

    const is_moove_legal = do_moves_mm(
      chess_board_0x88,
      chess_board_key_64,
      type_move,
      from,
      to,
      piece_color
    );

    // 0 — король под шахом; 2 — нелегальный специальный ход.
    // Откатываем в обоих случаях (в v1.0 для кода 2 отката не было).
    if (is_moove_legal == 0 || is_moove_legal == 2) {
      chess_board_0x88.set(chess_board_save);
      chess_board_key_64[0] = chess_board_key_64_undo[0];
      continue;
    }

    number_move_legal = number_move_legal + 1;

    /* (г) Рекурсия */
    const score = -quiescence_search(
      -beta,
      -alpha,
      chess_board_0x88,
      chess_board_key_64,
      depth + 1,
      qs_ply + 1
    );

    /* (д) Откат позиции и ключа */
    chess_board_0x88.set(chess_board_save);
    chess_board_key_64[0] = chess_board_key_64_undo[0];

    if (stop_search_qs == 1) return 0;

    /* (е) Обработка результата */
    if (score > best_value) {
      best_value = score;

      if (score >= beta) return score;   // fail-soft beta cutoff
      if (score > alpha) alpha = score;
    }
  }

  /* --- 6.8 Мат под шахом ------------------------------------------------ */
  if (evasions && number_move_legal == 0) {
    return MATE_QS + depth;
  }

  return best_value;
};

export {
  quiescence_search,
  ini_stack_qs,
  node_qs,
  set_node_in_0_qs,
  set_stop_search_in_1_qs,
  set_stop_search_in_0_qs
};