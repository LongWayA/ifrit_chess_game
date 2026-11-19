// @ts-check
/**
@copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
@author AnBr75
@name search_negamax_0x88.js
@version 1.1 — ускоренный ПОЛНЫЙ ПЕРЕБОР. Алгоритм не изменён.

НАЗНАЧЕНИЕ
  Тот же полный перебор (negamax без единого отсечения), что и в версии 1.0.
  Совпадает БИТ-В-БИТ: оценка, лучший ход при равенстве оценок, линия варианта,
  матовые оценки, счётчик node_mm, содержимое TEST-буферов.
  Порядок ходов НЕ меняется — иначе поехал бы выбор хода при равных оценках.

ЧТО ИМЕННО УСКОРЕНО (и почему результат тот же)
  1. TEST-код убран из горячего пути под флаги-константы.
     Генерация зобрист-ключа из позиции на КАЖДОМ листе стоила дороже, чем
     оценка позиции и весь обход узла. V8 сворачивает такие ветки в ноль.
  2. Листья больше не вызываются рекурсивно.
     Слой depth == depth_max-1 (функция search_preleaf) считает оценку прямо
     в цикле. Это убирает ~95% всех вызовов функции: 6 аргументов, пролог,
     5 обращений к стекам, сравнение глубин — на каждый лист.
  3. На слое depth_max-1 снимки PV не делаются вообще.
     Дети-листья в PV ничего не пишут, значит линия целиком определяется
     номером лучшего хода. Один add_move_to_pv_line_pv в конце узла вместо
     серии save_pv_line_pv по 500+ байт. Это самый массовый слой дерева.
  4. Отложенный снимок PV в остальных узлах.
     Копируем линию не сразу при улучшении, а перед следующим легальным ходом
     (который её испортит). Если лучший ход оказался последним — не копируем
     ни туда, ни обратно. Экономия двух memcpy на узел.
  5. Инварианты вынесены из цикла: число ходов, цвет стороны, ссылки на буферы
     слоя, признак "дети — листья", глубина ребёнка.
  6. Счётчик узлов копится в локальной переменной: одна запись в модульную
     переменную на узел вместо b записей.
  7. Ноль аллокаций в поиске, все массивы типизированные и однотипные.

ЧЕГО ЗДЕСЬ НЕТ (специально)
  alpha-beta, TT, quiescence, killers/history, LMR, сортировка ходов,
  итеративное углубление. Это другой алгоритм, он живёт в отдельном модуле.
*/

/* =========================================================================
 * 0. ИМПОРТЫ — те же зависимости, что и в версии 1.0
 * ========================================================================= */
import {
  BOARD_SIZE_CB, SIDE_TO_MOVE_CB,
  BLACK_CB, WHITE_CB,
  IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";
import {
  clear_list_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml,
  sorting_list_ml, test_print_list_ml,
  LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
  MOVE_NO_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";
import {
  add_move_to_pv_line_pv, save_pv_line_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV
} from "./pv_line_0x88.js";
import {
  generated_pseudo_legal_captures_mgc, check_detected_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";
import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";
import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";
import { score_position_e, PAWN_SCORE_E } from "../evaluate_0x88/evaluate_0x88.js";
import {
  set_key_from_board_0x88_tk, test_chess_board_key_64_tk
} from "../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

/* =========================================================================
 * 1. ФЛАГИ
 *    Это const с литералами: V8 при оптимизации выкидывает выключенные ветки
 *    целиком. Чтобы получить поведение версии 1.0 один-в-один (для сверки
 *    тестов) — поставьте оба TEST-флага в true.
 * ========================================================================= */

/** TEST: сверять ключ, изменённый в do_moves, с ключом, собранным из позиции.
 *  ВНИМАНИЕ: это самая дорогая операция во всём старом поиске. */
const VERIFY_ZOBRIST_KEY = false;

/** TEST: вести доску, соответствующую найденной оценке (chess_board_0x88_score).
 *  Копия доски на каждом листе + на каждом улучшении оценки. */
const TRACK_SCORE_BOARD = false;

/** EXPERIMENT: вместо clear_list_ml обнулять только два счётчика.
 *  Включайте ТОЛЬКО если clear_list_ml ничего кроме счётчиков не чистит
 *  (в v1.0 эти две строки были закомментированы рядом с вызовом).
 *  Если clear_list_ml заполняет весь массив MOVE_NO_ML — это заметный выигрыш. */
const FAST_CLEAR_LIST = false;

/* =========================================================================
 * 2. КОНСТАНТЫ
 * ========================================================================= */

/** Максимум, который в принципе не достижим для полного перебора. */
const MAX_DEPTH_SEARCH = 129;

/** Реальная глубина ограничена ещё и длиной линии варианта. */
const MAX_SAFE_DEPTH = Math.min(MAX_DEPTH_SEARCH - 1, MAX_DEPTH_PV - 1);

const MATE = -30000;
/** Матовая оценка всегда должна обновлять INIT_EVAL и при "-" и при "+"
 *  на следующей глубине: (-30000 > -40000) и (30000 > -40000). */
const INIT_EVAL = -40000;

/* =========================================================================
 * 3. СТЕКИ
 *    Мы идём по дереву вариантов, но храним не дерево, а ЛИНИЮ позиций:
 *    на каждую глубину свой набор буферов. Поэтому во время поиска нет
 *    ни одной аллокации — всё создано один раз в ini_stack().
 * ========================================================================= */

/** Позиция до хода — чтобы восстановить её после возврата с глубины. */
const chess_board_undo_stack = new Array(MAX_DEPTH_SEARCH);
/** Ключ до хода — по той же причине. */
const chess_board_key_64_undo_stack = new Array(MAX_DEPTH_SEARCH);
/** Список запакованных ходов для каждой позиции линии. */
const packing_moves_stack = new Array(MAX_DEPTH_SEARCH);
/** Снимок лучшей линии варианта на каждой глубине. */
const best_packing_pv_line_stack = new Array(MAX_DEPTH_SEARCH);
/** TEST: позиция, соответствующая найденной оценке. */
const chess_board_save_stack_score = new Array(MAX_DEPTH_SEARCH);

/**
 * Выделить все буферы поиска. Один раз при старте программы.
 */
const ini_stack = function () {
  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {
    chess_board_undo_stack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
    chess_board_key_64_undo_stack[depth] = new BigUint64Array(1);
    packing_moves_stack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    best_packing_pv_line_stack[depth] = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
    chess_board_save_stack_score[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
  }
};

/** Позиция, соответствующая найденному лучшему ходу корня (публичный буфер). */
const chess_board_0x88_found_best_score = new Int32Array(BOARD_SIZE_CB).fill(0);

/** TEST: ключ, собранный прямо из позиции, для сравнения с поисковым. */
const chess_board_key_64_test = new BigUint64Array(1);

/** Счётчик просмотренных листьев (как и в v1.0 — считаются только листья). */
let node_mm = 0;

/* =========================================================================
 * 4. ХОЛОДНЫЕ ХВОСТЫ
 *    Вынесены в отдельные функции, чтобы не раздувать горячие циклы.
 *    V8 не тратит на них регистры внутри основного цикла.
 * ========================================================================= */

/**
 * Лист дерева: статическая оценка позиции.
 * Используется только когда сам вход в поиск уже на предельной глубине
 * (depth >= depth_max). В остальных случаях лист считается прямо в цикле
 * search_preleaf — без вызова функции.
 *
 * @param {Int32Array} chess_board_0x88
 * @param {Int32Array} chess_board_0x88_score
 * @param {BigUint64Array} chess_board_key_64
 * @returns {number}
 */
function leaf_eval(chess_board_0x88, chess_board_0x88_score, chess_board_key_64) {
  const found_score = score_position_e(chess_board_0x88);
  node_mm = node_mm + 1;
  if (TRACK_SCORE_BOARD) chess_board_0x88_score.set(chess_board_0x88);
  if (VERIFY_ZOBRIST_KEY) {
    set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_test);
    test_chess_board_key_64_tk(chess_board_key_64_test, chess_board_key_64);
  }
  return found_score;
}

/**
 * Легальных ходов нет: это мат или пат.
 * Полностью повторяет блок из v1.0, включая кодировку признака мата.
 *
 * @param {Int32Array} chess_board_0x88
 * @param {Int32Array} chess_board_0x88_score
 * @param {Int32Array} packing_pv_line
 * @param {number} depth
 * @returns {number} MATE + depth при шахе, иначе 0
 */
function resolve_no_legal_moves(chess_board_0x88, chess_board_0x88_score, packing_pv_line, depth) {
  if (depth === 0) chess_board_0x88_found_best_score.set(chess_board_0x88);
  if (TRACK_SCORE_BOARD) chess_board_0x88_score.set(chess_board_0x88);

  // почему depth - 1: на этой глубине мы ход не записывали
  // почему + 500: при depth = 1 получился бы 0, а детектор мата срабатывает
  // только на значение != 0; 500 потом отнимается
  // ВНИМАНИЕ: v1.0 ставит этот признак и при пате тоже — поведение сохранено.
  packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

  const side = chess_board_0x88[SIDE_TO_MOVE_CB];
  const king_square = (side === WHITE_CB)
    ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
    : chess_board_0x88[IND_KING_FROM_BLACK_CB];

  if (check_detected_mgc(king_square, side, chess_board_0x88) != 0) return MATE + depth;
  return 0;
}

/* =========================================================================
 * 5. ПРЕДПОСЛЕДНИЙ СЛОЙ (depth == depth_max - 1)
 *    Самый массовый слой дерева: примерно b^(d-1) узлов из b^d.
 *    Здесь два ключевых ускорения:
 *      - дети-листья считаются БЕЗ рекурсивного вызова;
 *      - снимки PV не делаются: листья в PV не пишут, поэтому вся линия
 *        определяется номером лучшего хода, и его достаточно записать
 *        один раз в конце узла.
 * ========================================================================= */
/**
 * @param {Int32Array} chess_board_0x88        позиция
 * @param {Int32Array} chess_board_0x88_score  TEST: позиция найденной оценки
 * @param {BigUint64Array} chess_board_key_64  зобрист ключ позиции
 * @param {Int32Array} packing_pv_line         линия варианта
 * @param {number} depth                       текущая глубина
 * @returns {number} оценка позиции
 */
function search_preleaf(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                        packing_pv_line, depth) {

  // --- буферы этого слоя (инварианты цикла) ------------------------------
  const chess_board_undo = chess_board_undo_stack[depth];
  const chess_board_key_64_undo = chess_board_key_64_undo_stack[depth];
  const packing_moves = packing_moves_stack[depth];
  const chess_board_save_score = chess_board_save_stack_score[depth];

  // --- генерация всех ходов: сначала взятия, потом тихие -----------------
  // Список перезаписывается: мы идём по дереву, а буфер один на слой.
  if (FAST_CLEAR_LIST) {
    packing_moves[IND_NUMBER_MOVE_ML] = 0;
    packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = 0;
  } else {
    clear_list_ml(packing_moves);
  }
  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

  const number_moves = packing_moves[IND_NUMBER_MOVE_ML]; //读了 один раз, не в цикле
  const piece_color = packing_moves[IND_PIECE_COLOR_ML];  // цвет стороны — инвариант
  const is_root = (depth === 0);

  // Нет даже псевдолегальных ходов — сразу мат/пат, цикл не нужен.
  if (number_moves === 0) {
    return resolve_no_legal_moves(chess_board_0x88, chess_board_0x88_score, packing_pv_line, depth);
  }

  let found_score = INIT_EVAL;   // максимальная найденная в узле оценка
  let best_move_number = -1;     // номер хода, обновившего максимум
  let number_move_legal = 0;     // количество легальных ходов

  // --- перебор ВСЕХ ходов, без каких-либо отсечений ----------------------
  for (let move_number = 0; move_number < number_moves; move_number++) {

    chess_board_undo.set(chess_board_0x88);            // записали позицию
    chess_board_key_64_undo[0] = chess_board_key_64[0];// записали ключ

    const type_move = get_type_move_ml(move_number, packing_moves);
    const from = get_from_ml(move_number, packing_moves);
    const to = get_to_ml(move_number, packing_moves);

    // делаем ход. Нестрогие сравнения сохранены как в v1.0.
    const is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64,
                                       type_move, from, to, piece_color);

    // 0 — король под шахом; 2 — нелегальные рокировки/взятия короля.
    // В v1.0 для кода 2 откат не делался; здесь откатывается всегда.
    // Если do_moves при коде 2 позицию не трогает — результат тот же.
    if (is_moove_legal == 0 || is_moove_legal == 2) {
      chess_board_0x88.set(chess_board_undo);
      chess_board_key_64[0] = chess_board_key_64_undo[0];
      continue;
    }
    number_move_legal = number_move_legal + 1;

    // --- ЛИСТ вместо рекурсивного вызова ---------------------------------
    // Ребёнок на глубине depth_max ничего, кроме оценки, не делает.
    const score = -score_position_e(chess_board_0x88);
    if (VERIFY_ZOBRIST_KEY) {
      set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_test);
      test_chess_board_key_64_tk(chess_board_key_64_test, chess_board_key_64);
    }

    if (score > found_score) {          // строгое ">" — при равенстве берём первый
      found_score = score;
      best_move_number = move_number;
      // Позиция листа — это текущая доска, копия через score_board не нужна.
      if (TRACK_SCORE_BOARD) chess_board_save_score.set(chess_board_0x88);
      if (is_root) chess_board_0x88_found_best_score.set(chess_board_0x88);
    }

    chess_board_0x88.set(chess_board_undo);            // восстановили позицию
    chess_board_key_64[0] = chess_board_key_64_undo[0];// восстановили ключ
  }

  // Один плюс на узел вместо b плюсов в модульную переменную.
  node_mm = node_mm + number_move_legal;

  if (number_move_legal === 0) {
    return resolve_no_legal_moves(chess_board_0x88, chess_board_0x88_score, packing_pv_line, depth);
  }

  // --- линия варианта: одна запись лучшего хода --------------------------
  // Снимки не нужны: дети-листья в packing_pv_line ничего не писали,
  // поэтому состояние PV после add_move(best) точно равно тому, что в v1.0
  // получалось копированием best_packing_pv_line обратно.
  if (best_move_number !== -1) {
    add_move_to_pv_line_pv(best_move_number, packing_moves, packing_pv_line, depth);
    if (is_root) packing_pv_line[IND_TYPE_VARIANT_PV] = 1;
    if (TRACK_SCORE_BOARD) chess_board_0x88_score.set(chess_board_save_score);
  }

  return found_score;
}

/* =========================================================================
 * 6. ОБЫЧНЫЙ УЗЕЛ (depth <= depth_max - 2)
 *    Здесь дети сами являются узлами, поэтому линия варианта общая и её
 *    приходится снимать. Снимок делается ОТЛОЖЕННО — см. комментарий ниже.
 * ========================================================================= */
/**
 * @param {Int32Array} chess_board_0x88        позиция
 * @param {Int32Array} chess_board_0x88_score  TEST: позиция найденной оценки
 * @param {BigUint64Array} chess_board_key_64  зобрист ключ позиции
 * @param {Int32Array} packing_pv_line         линия варианта
 * @param {number} depth                       текущая глубина
 * @param {number} depth_left                  сколько полуходов осталось
 * @returns {number} оценка позиции
 */
function search_node(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                     packing_pv_line, depth, depth_left) {

  // --- буферы этого слоя (инварианты цикла) ------------------------------
  const chess_board_undo = chess_board_undo_stack[depth];
  const chess_board_key_64_undo = chess_board_key_64_undo_stack[depth];
  const packing_moves = packing_moves_stack[depth];
  const best_packing_pv_line = best_packing_pv_line_stack[depth];
  const chess_board_save_score = chess_board_save_stack_score[depth];

  // --- генерация всех ходов ----------------------------------------------
  if (FAST_CLEAR_LIST) {
    packing_moves[IND_NUMBER_MOVE_ML] = 0;
    packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = 0;
  } else {
    clear_list_ml(packing_moves);
  }
  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

  const number_moves = packing_moves[IND_NUMBER_MOVE_ML];
  const piece_color = packing_moves[IND_PIECE_COLOR_ML];
  const is_root = (depth === 0);

  if (number_moves === 0) {
    return resolve_no_legal_moves(chess_board_0x88, chess_board_0x88_score, packing_pv_line, depth);
  }

  // Куда пойдёт рекурсия — решаем ОДИН раз на узел, а не на каждый ход.
  const child_is_preleaf = (depth_left === 2);
  const child_depth = depth + 1;
  const child_depth_left = depth_left - 1;

  let found_score = INIT_EVAL;
  let best_move_number = -1;
  let number_move_legal = 0;

  // Отложенный снимок PV:
  //   pv_pending = true  — в packing_pv_line сейчас лежит лучшая линия,
  //                        снимок ещё не сделан;
  //   pv_saved   = true  — снимок лучшей линии уже есть в best_packing_pv_line.
  // Снимок делается только перед следующим легальным ходом, который испортит
  // packing_pv_line. Если лучший ход был последним — не копируем вообще ничего.
  let pv_pending = false;
  let pv_saved = false;

  // --- перебор ВСЕХ ходов, без каких-либо отсечений ----------------------
  for (let move_number = 0; move_number < number_moves; move_number++) {

    chess_board_undo.set(chess_board_0x88);
    chess_board_key_64_undo[0] = chess_board_key_64[0];

    const type_move = get_type_move_ml(move_number, packing_moves);
    const from = get_from_ml(move_number, packing_moves);
    const to = get_to_ml(move_number, packing_moves);

    const is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64,
                                       type_move, from, to, piece_color);
    if (is_moove_legal == 0 || is_moove_legal == 2) {
      chess_board_0x88.set(chess_board_undo);
      chess_board_key_64[0] = chess_board_key_64_undo[0];
      continue;
    }

    // Следующий легальный ход сейчас перезапишет PV — сохраняем лучшую линию.
    if (pv_pending) {
      save_pv_line_pv(best_packing_pv_line, packing_pv_line);
      pv_saved = true;
      pv_pending = false;
    }

    add_move_to_pv_line_pv(move_number, packing_moves, packing_pv_line, depth);
    number_move_legal = number_move_legal + 1;
    if (is_root) packing_pv_line[IND_TYPE_VARIANT_PV] = 1;

    const score = child_is_preleaf
      ? -search_preleaf(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                        packing_pv_line, child_depth)
      : -search_node(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                     packing_pv_line, child_depth, child_depth_left);

    if (score > found_score) {          // строгое ">" — при равенстве берём первый
      found_score = score;
      best_move_number = move_number;
      pv_pending = true;
      if (TRACK_SCORE_BOARD) chess_board_save_score.set(chess_board_0x88_score);
      // позицию лучшего хода корня пишем ДО отката доски
      if (is_root) chess_board_0x88_found_best_score.set(chess_board_0x88);
    }

    chess_board_0x88.set(chess_board_undo);
    chess_board_key_64[0] = chess_board_key_64_undo[0];
  }

  if (number_move_legal === 0) {
    return resolve_no_legal_moves(chess_board_0x88, chess_board_0x88_score, packing_pv_line, depth);
  }

  // --- возврат лучшей линии ----------------------------------------------
  if (pv_pending) {
    // лучшая линия уже лежит в packing_pv_line — копировать нечего
  } else if (pv_saved) {
    save_pv_line_pv(packing_pv_line, best_packing_pv_line);
  }
  if (TRACK_SCORE_BOARD && best_move_number !== -1) {
    chess_board_0x88_score.set(chess_board_save_score);
  }

  return found_score;
}

/* =========================================================================
 * 7. ТОЧКА ВХОДА (сигнатура полностью совместима с v1.0)
 *    Вся диспетчеризация делается здесь ОДИН раз, а не в каждом узле.
 * ========================================================================= */
/**
 * @param {Int32Array} chess_board_0x88        позиция
 * @param {Int32Array} chess_board_0x88_score  позиция найденной оценки (TEST)
 * @param {BigUint64Array} chess_board_key_64  зобрист ключ позиции
 * @param {Int32Array} packing_pv_line         лучшая линия варианта
 * @param {number} depth                       текущая глубина поиска
 * @param {number} depth_max                   максимальная глубина поиска
 * @returns {number} оценка позиции
 */
const searching_negamax = function (chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                                    packing_pv_line, depth, depth_max) {

  if (depth === 0) node_mm = 0;

  // Защита от выхода за пределы стеков и за длину линии варианта.
  // В v1.0 при depth_max >= 129 был бы доступ к undefined-буферу.
  if (depth_max > MAX_SAFE_DEPTH) depth_max = MAX_SAFE_DEPTH;

  const depth_left = depth_max - depth;

  if (depth_left <= 0) {
    return leaf_eval(chess_board_0x88, chess_board_0x88_score, chess_board_key_64);
  }
  if (depth_left === 1) {
    return search_preleaf(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                          packing_pv_line, depth);
  }
  return search_node(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                     packing_pv_line, depth, depth_left);
};

export { searching_negamax, ini_stack, chess_board_0x88_found_best_score, node_mm };