// @ts-check
/**
@copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
@author AnBr75
@name search_negamax_0x88.js
@version 2.0 — переработка под максимальную скорость

НАЗНАЧЕНИЕ
  Поиск лучшего хода: negamax + alpha-beta (fail-soft) + PVS.
  Дополнительно: таблица транспозиций, поиск взятий (quiescence),
  итеративное углубление, форсированный вариант (PV), killer/history,
  LMR, futility, отсечение по расстоянию до мата, продление шаха.

СОВМЕСТИМОСТЬ
  Публичный API прежний:
    searching_negamax(board, score_board, key, pv, depth, depth_max) -> score
    ini_stack(), chess_board_0x88_found_best_score, node_mm
  Знаки и кодировка матовых оценок сохранены:  MATE + ply  (MATE = -30000).

ПРИНЦИПЫ СКОРОСТИ (почему код написан именно так)
  1. НОЛЬ аллокаций внутри поиска. Все буферы создаются один раз в ini_stack()
     и адресуются по полуходу (ply). Это стек линии вариантов, а не дерево.
  2. Все горячие данные — типизированные массивы одного типа (Int32Array /
     BigUint64Array). Это мономорфные доступы, которые V8 компилирует в mov.
  3. Инварианты вынесены из циклов (число ходов, цвет, ссылки на буферы ply).
  4. Ход один раз распаковывается в packed-id (from|to<<8|type<<16) и дальше
     декодируется битовыми операциями вместо повторных вызовов аксессоров.
  5. Сортировка ЛЕНИВАЯ: на каждом шаге выбирается максимум из остатка.
     При отсечении хвост списка вообще не сортируется.
  6. Отладка (TRACK_SCORE_BOARD / VERIFY_ZOBRIST_KEY) выключена флагами-константами:
     V8 выкидывает эти ветки при оптимизации. В старом коде они стоили дороже поиска.
*/

/* =========================================================================
 * 0. ИМПОРТЫ (те же зависимости, что и в версии 1.0)
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
 * 1. ФЛАГИ КОНФИГУРАЦИИ ("флаги компиляции")
 *    Это module-level const с литералами: V8 константно сворачивает такие
 *    ветки в оптимизированном коде. Менять — здесь, а не в рантайме.
 *
 *    РЕЖИМ СОВМЕСТИМОСТИ (бит-в-бит как версия 1.0, для сверки тестов):
 *      USE_ALPHA_BETA=false, USE_MOVE_ORDERING=false, USE_TT=false,
 *      USE_QUIESCENCE=false, USE_ITERATIVE_DEEPEN=false, USE_LMR=false,
 *      USE_FUTILITY=false, USE_CHECK_EXTENSION=false, USE_MATE_DISTANCE=false,
 *      TRACK_SCORE_BOARD=true, VERIFY_ZOBRIST_KEY=true
 * ========================================================================= */
const USE_ALPHA_BETA       = true;  // alpha-beta отсечения (главный ускоритель)
const USE_MOVE_ORDERING    = true;  // сортировка ходов (без неё AB бесполезен)
const USE_TT               = true;  // таблица транспозиций
const USE_QUIESCENCE       = true;  // поиск взятий за горизонтом
const USE_ITERATIVE_DEEPEN = true;  // итеративное углубление 1..depth_max
const USE_ASPIRATION       = true;  // узкое окно вокруг прошлой оценки
const USE_KILLER_MOVES     = true;  // 2 тихих хода-отсечения на ply
const USE_HISTORY          = true;  // history-эвристика для тихих ходов
const USE_CHECK_EXTENSION  = true;  // +1 полуход, если король под шахом
const USE_LMR              = true;  // late move reductions
const USE_FUTILITY         = true;  // отсечение тихих ходов у горизонта
const USE_MATE_DISTANCE    = true;  // отсечение по расстоянию до мата
const USE_MVV_LVA          = false; // требует заполнить capture_victim_value!
const TRACK_SCORE_BOARD    = false; // TEST: доска, соответствующая оценке
const VERIFY_ZOBRIST_KEY   = false; // TEST: сверка ключа на каждом листе
const DEBUG_PRINT_MOVES    = false; // TEST: печать списка ходов корня

/* Производные константы: вычисляются один раз, в горячем пути — просто флаг. */
const AB      = USE_ALPHA_BETA;
const ORD_ON  = USE_MOVE_ORDERING;
const TT_ON   = USE_TT;
const QS_ON   = USE_QUIESCENCE;
const LMR_ON  = USE_LMR && AB;
const FUT_ON  = USE_FUTILITY && AB;
const MDP_ON  = USE_MATE_DISTANCE && AB;
const CHK_ON  = USE_CHECK_EXTENSION;
/* TT-отсечение возвращает оценку БЕЗ позиции => несовместимо с TRACK_SCORE_BOARD. */
const TT_CUT  = USE_TT && AB && !TRACK_SCORE_BOARD;

/* =========================================================================
 * 2. КОНСТАНТЫ ОЦЕНОК И ГЛУБИН
 * ========================================================================= */
const MAX_DEPTH_SEARCH = 129;                 // размер всех стеков (как в v1.0)
const MAX_PLY          = MAX_DEPTH_SEARCH - 1;// последний безопасный ply
const PV_MAX_PLY       = MAX_DEPTH_PV - 1;    // дальше в PV писать нельзя

const MATE      = -30000;   // база матовой оценки (совместимо с v1.0)
const MATE_ABS  = 30000;
const INF       = 40000;    // больше любой реальной оценки
const INIT_EVAL = -INF;     // стартовый "минус бесконечность" узла
/* Всё, что по модулю больше MATE_BOUND — матовая оценка, а не позиционная. */
const MATE_BOUND = MATE_ABS - MAX_DEPTH_SEARCH;

const NO_MOVE_ID = -1;      // packed-id никогда не бывает отрицательным

/* Слои сортировки ходов. Порядок важен: TT > взятия > killer0 > killer1 > history */
const SCORE_TT_MOVE = 1 << 30;
const SCORE_CAPTURE = 1 << 28;
const SCORE_KILLER0 = 1 << 26;
const SCORE_KILLER1 = 1 << 25;
const HISTORY_LIMIT = 1 << 24;   // заведомо ниже SCORE_KILLER1
const HISTORY_SIZE  = 128 * 128; // from*128+to для доски 0x88
const HISTORY_MASK  = HISTORY_SIZE - 1;

const NODE_CHECK_MASK = 1023;    // проверка стопа раз в 1024 узла (дёшево)
const ASP_WINDOW      = 50;      // полуширина aspiration-окна в сантипешках

/* Типы записей TT */
const TT_EXACT = 0, TT_LOWER = 1, TT_UPPER = 2;
const TT_DEFAULT_ENTRIES = 1 << 19; // 524288 записей * 24 байта ≈ 12 МБ

/* =========================================================================
 * 3. ТАБЛИЦЫ ЭВРИСТИК (создаются один раз при загрузке модуля)
 * ========================================================================= */

/** LMR: таблица редукций [глубина][номер хода]. Заполняется один раз. */
const lmr_table = new Int32Array(64 * 64);
for (let d = 1; d < 64; d++) {
  for (let m = 1; m < 64; m++) {
    const r = Math.floor(0.75 + Math.log(d) * Math.log(m) / 2.25);
    lmr_table[(d << 6) | m] = r > 0 ? r : 0;
  }
}

/** Futility: запас оценки по оставшейся глубине (индекс 1 и 2). */
const futility_margin = new Int32Array([0, PAWN_SCORE_E * 2, PAWN_SCORE_E * 4]);

/** Killer-ходы: по 2 packed-id на каждый ply. */
const killer_moves = new Int32Array(MAX_DEPTH_SEARCH * 2).fill(NO_MOVE_ID);

/** History: насколько часто тихий ход from->to давал отсечение. */
const history_table = new Int32Array(HISTORY_SIZE);

/**
 * MVV-LVA: ценность ЖЕРТВЫ по коду фигуры, который возвращает
 * get_name_capture_piece_ml(). Заполните своими кодами фигур, например:
 *   capture_victim_value[CODE_PAWN]=100; ... [CODE_QUEEN]=900; [CODE_KING]=0;
 * и включите USE_MVV_LVA. Пока таблица нулевая — эвристика выключена.
 */
const capture_victim_value = new Int32Array(256);

/* =========================================================================
 * 4. СТЕКИ ПОИСКА (адресация по ply; ноль аллокаций во время поиска)
 * ========================================================================= */
const chess_board_undo_stack       = new Array(MAX_DEPTH_SEARCH); // доска до хода
const chess_board_key_64_undo_stack= new Array(MAX_DEPTH_SEARCH); // ключ до хода
const packing_moves_stack          = new Array(MAX_DEPTH_SEARCH); // список ходов
const best_packing_pv_line_stack   = new Array(MAX_DEPTH_SEARCH); // снимок лучшего PV
const chess_board_save_stack_score = new Array(MAX_DEPTH_SEARCH); // TEST-доска оценки
const move_id_stack                = new Array(MAX_DEPTH_SEARCH); // packed-id хода
const move_score_stack             = new Array(MAX_DEPTH_SEARCH); // оценка сортировки
const move_order_stack             = new Array(MAX_DEPTH_SEARCH); // перестановка индексов

/* Буферы корня. Итерация пишет сюда и только после ЗАВЕРШЕНИЯ
   копируется наружу — так аварийный стоп не портит результат. */
const iter_pv_line     = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
const iter_score_board = new Int32Array(BOARD_SIZE_CB);
const iter_best_board  = new Int32Array(BOARD_SIZE_CB);

/** Доска после лучшего хода корня (публичный буфер, как в v1.0). */
const chess_board_0x88_found_best_score = new Int32Array(BOARD_SIZE_CB);

/** TEST: ключ, сгенерированный заново из позиции, для сверки. */
const chess_board_key_64_test = new BigUint64Array(1);

/* =========================================================================
 * 5. ТАБЛИЦА ТРАНСПОЗИЦИЙ (своя, поверх вашего зобрист-ключа)
 *    SoA: ключи отдельно, данные отдельно. Запись = 4 int:
 *      [0] score (мат нормализован относительно узла)
 *      [1] packed-id лучшего хода
 *      [2] meta = depth(0..7) | flag(8..9) | age(10..17)
 *      [3] сторона, чей ход (страховка, если ключ не кодирует сторону)
 *
 *    ТРЕБОВАНИЕ: ключ ОБЯЗАН включать сторону хода, рокировки и en-passant.
 *    Если это не так — поставьте USE_TT = false.
 * ========================================================================= */
let tt_keys     = new BigUint64Array(1);
let tt_data     = new Int32Array(4);
let tt_mask_big = 0n;   // BigInt-маска для индекса (одна операция на узел)
let tt_age      = 0;

/* =========================================================================
 * 6. СЧЁТЧИКИ И УПРАВЛЕНИЕ ПОИСКОМ
 * ========================================================================= */
let node_mm = 0;             // узлов просмотрено (экспортируется, live binding)
let tt_probes = 0, tt_hits = 0;
let search_stopped = false;
let nodes_limit = 0;         // 0 = без ограничения
let time_limit_ms = 0;       // 0 = без ограничения
let time_start = 0;
let root_best_id = NO_MOVE_ID;   // лучший ход корня прошлой итерации
let root_depth_current = 0;      // текущая глубина итерации (для продлений)
let root_depth_completed = 0;
let root_score = 0;
let stacks_ready = false;

/** Проверка лимитов. Вызывается раз в 1024 узла — на скорость не влияет. */
function check_stop() {
  if (nodes_limit > 0 && node_mm >= nodes_limit) { search_stopped = true; return; }
  if (time_limit_ms > 0 && (Date.now() - time_start) >= time_limit_ms) search_stopped = true;
}

/** Немедленно остановить поиск (из GUI/таймера). Результат прошлой итерации цел. */
function stop_search() { search_stopped = true; }
function set_nodes_limit(n) { nodes_limit = n | 0; }
function set_time_limit(ms) { time_limit_ms = ms | 0; }

/** Старение history: делим пополам, чтобы свежие данные весили больше. */
function age_history() {
  for (let i = 0; i < HISTORY_SIZE; i++) history_table[i] >>= 1;
}

/** Полный сброс накопленных эвристик (новая партия / новая позиция). */
function clear_search_state() {
  tt_keys.fill(0n);
  tt_data.fill(0);
  killer_moves.fill(NO_MOVE_ID);
  history_table.fill(0);
  tt_age = 0;
  root_best_id = NO_MOVE_ID;
}

/** Диагностика последнего поиска. */
function get_search_info() {
  return {
    nodes: node_mm, depth: root_depth_completed, score: root_score,
    tt_probes, tt_hits, stopped: search_stopped
  };
}

/* =========================================================================
 * 7. ИНИЦИАЛИЗАЦИЯ
 * ========================================================================= */
/**
 * Выделить все буферы поиска. Вызывать один раз при старте программы.
 * @param {number} [tt_entries] желаемое число записей TT (округлится до 2^n)
 */
function ini_stack(tt_entries = TT_DEFAULT_ENTRIES) {
  for (let ply = 0; ply < MAX_DEPTH_SEARCH; ply++) {
    chess_board_undo_stack[ply]        = new Int32Array(BOARD_SIZE_CB);
    chess_board_key_64_undo_stack[ply] = new BigUint64Array(1);
    packing_moves_stack[ply]           = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    best_packing_pv_line_stack[ply]    = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
    chess_board_save_stack_score[ply]  = new Int32Array(BOARD_SIZE_CB);
    move_id_stack[ply]                 = new Int32Array(LENGTH_LIST_ML);
    move_score_stack[ply]              = new Int32Array(LENGTH_LIST_ML);
    move_order_stack[ply]              = new Int32Array(LENGTH_LIST_ML);
  }

  if (TT_ON) {
    let n = 1024;
    while (n < tt_entries) n <<= 1;      // размер обязан быть степенью двойки
    tt_keys = new BigUint64Array(n);
    tt_data = new Int32Array(n * 4);
    tt_mask_big = BigInt(n - 1);
  }

  clear_search_state();
  stacks_ready = true;
}

/* =========================================================================
 * 8. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ГОРЯЧЕГО ПУТИ
 *    Все маленькие и мономорфные — V8 их инлайнит.
 * ========================================================================= */

/**
 * Ленивая сортировка: найти максимум среди order[i..n) и поднять его в позицию i.
 * Возвращает ИСХОДНЫЙ номер хода в списке (список ходов не переставляем!).
 * @param {Int32Array} order @param {Int32Array} scores
 * @param {number} i @param {number} n @returns {number}
 */
function pick_best_move(order, scores, i, n) {
  let bi = i;
  let bs = scores[order[i]];
  for (let j = i + 1; j < n; j++) {
    const s = scores[order[j]];
    if (s > bs) { bs = s; bi = j; }
  }
  if (bi !== i) { const t = order[i]; order[i] = order[bi]; order[bi] = t; }
  return order[i];
}

/** Квадрат короля ходящей стороны. */
function king_square(board, side) {
  return (side === WHITE_CB) ? board[IND_KING_FROM_WHITE_CB] : board[IND_KING_FROM_BLACK_CB];
}

/** Лист без quiescence: статическая оценка (+ отладочные проверки). */
function leaf_eval(board, score_board, key) {
  node_mm++;
  if (TRACK_SCORE_BOARD) score_board.set(board);
  if (VERIFY_ZOBRIST_KEY) {
    set_key_from_board_0x88_tk(board, chess_board_key_64_test);
    test_chess_board_key_64_tk(chess_board_key_64_test, key);
  }
  return score_position_e(board);
}

/* =========================================================================
 * 9. ПОИСК ВЗЯТИЙ (QUIESCENCE)
 *    За горизонтом играем только форсированные взятия, пока позиция не
 *    "успокоится". Убирает эффект горизонта: движок не отдаёт фигуру
 *    последним ходом перед оценкой.
 * ========================================================================= */
/**
 * @param {Int32Array} board @param {Int32Array} score_board
 * @param {BigUint64Array} key @param {Int32Array} pv
 * @param {number} ply @param {number} alpha @param {number} beta
 * @returns {number}
 */
function quiescence(board, score_board, key, pv, ply, alpha, beta) {
  node_mm++;
  if ((node_mm & NODE_CHECK_MASK) === 0) check_stop();
  if (search_stopped) return 0;
  if (ply >= MAX_PLY) return score_position_e(board);

  /* stand-pat: право "не бить вообще". Оценка уже от лица ходящей стороны. */
  const stand_pat = score_position_e(board);
  let best_score = stand_pat;
  if (AB) {
    if (stand_pat >= beta) return stand_pat;   // fail-soft отсечение
    if (stand_pat > alpha) alpha = stand_pat;
  }
  if (TRACK_SCORE_BOARD) score_board.set(board);

  const moves = packing_moves_stack[ply];
  clear_list_ml(moves);
  generated_pseudo_legal_captures_mgc(board, moves);
  const n = moves[IND_NUMBER_MOVE_ML];
  if (n === 0) return best_score;
  const piece_color = moves[IND_PIECE_COLOR_ML];

  /* Подготовка сортировки: только MVV (ценность жертвы), если включено. */
  const ids = move_id_stack[ply];
  const scores = move_score_stack[ply];
  const order = move_order_stack[ply];
  for (let i = 0; i < n; i++) {
    const from = get_from_ml(i, moves);
    const to = get_to_ml(i, moves);
    const type = get_type_move_ml(i, moves);
    ids[i] = from | (to << 8) | (type << 16);
    order[i] = i;
    scores[i] = (ORD_ON && USE_MVV_LVA)
      ? capture_victim_value[get_name_capture_piece_ml(i, moves) & 255] : 0;
  }

  const undo_board = chess_board_undo_stack[ply];
  const undo_key = chess_board_key_64_undo_stack[ply];
  const best_pv = best_packing_pv_line_stack[ply];
  const save_board = chess_board_save_stack_score[ply];
  let have_pv = false;

  for (let i = 0; i < n; i++) {
    const mn = ORD_ON ? pick_best_move(order, scores, i, n) : order[i];
    const id = ids[mn];
    const from = id & 255;
    const to = (id >> 8) & 255;
    const type = id >>> 16;

    undo_board.set(board);
    undo_key[0] = key[0];

    const legal = do_moves_mm(board, key, type, from, to, piece_color);
    if (legal === 0 || legal === 2) {          // 0=король под шахом, 2=спец.случай
      board.set(undo_board);
      key[0] = undo_key[0];
      continue;
    }

    if (ply < PV_MAX_PLY) add_move_to_pv_line_pv(mn, moves, pv, ply);
    const score = -quiescence(board, score_board, key, pv, ply + 1, -beta, -alpha);

    board.set(undo_board);
    key[0] = undo_key[0];
    if (search_stopped) return 0;

    if (score > best_score) {
      best_score = score;
      if (ply < PV_MAX_PLY) { save_pv_line_pv(best_pv, pv); have_pv = true; }
      if (TRACK_SCORE_BOARD) save_board.set(score_board);
      if (AB) {
        if (score >= beta) return score;       // отсечение: PV уже содержит ход
        if (score > alpha) alpha = score;
      }
    }
  }

  if (have_pv) {
    if (ply < PV_MAX_PLY) save_pv_line_pv(pv, best_pv);
    if (TRACK_SCORE_BOARD) score_board.set(save_board);
  }
  return best_score;
}

/* =========================================================================
 * 10. ОСНОВНОЙ УЗЕЛ: NEGAMAX + ALPHA-BETA + PVS
 * ========================================================================= */
/**
 * @param {Int32Array} board          позиция (меняется на месте, всегда откатывается)
 * @param {Int32Array} score_board    TEST: позиция, соответствующая оценке
 * @param {BigUint64Array} key        зобрист-ключ (меняется на месте)
 * @param {Int32Array} pv             линия варианта
 * @param {number} ply                полуход от корня (индекс стеков)
 * @param {number} depth_left         ОСТАВШАЯСЯ глубина (не абсолютная!)
 * @param {number} alpha              нижняя граница окна
 * @param {number} beta               верхняя граница окна
 * @returns {number} оценка от лица стороны, чей ход
 */
function search_node(board, score_board, key, pv, ply, depth_left, alpha, beta) {

  /* --- 10.1 Горизонт: уходим в поиск взятий ---------------------------- */
  if (depth_left <= 0) {
    if (QS_ON) return quiescence(board, score_board, key, pv, ply, alpha, beta);
    return leaf_eval(board, score_board, key);
  }
  /* Защита от переполнения стеков (продления шаха могут уйти далеко). */
  if (ply >= MAX_PLY) return leaf_eval(board, score_board, key);

  node_mm++;
  if ((node_mm & NODE_CHECK_MASK) === 0) check_stop();
  if (search_stopped) return 0;

  const is_root = (ply === 0);
  const is_pv = (beta - alpha) > 1;   // PV-узел: окно не нулевое
  const alpha_orig = alpha;           // нужен для типа записи в TT

  /* --- 10.2 Отсечение по расстоянию до мата ---------------------------- *
   * Быстрее мата на этом ply нас заматовать не могут, а быстрее чем на
   * ply+1 мы заматовать не можем. Сужаем окно бесплатно.                 */
  if (MDP_ON && !is_root) {
    const ma = MATE + ply;
    const mb = MATE_ABS - ply - 1;
    if (alpha < ma) alpha = ma;
    if (beta > mb) beta = mb;
    if (alpha >= beta) return alpha;
  }

  /* --- 10.3 Проба таблицы транспозиций --------------------------------- */
  let tt_move_id = NO_MOVE_ID;
  let tt_slot = 0;
  if (TT_ON) {
    const k = key[0];
    tt_slot = Number(k & tt_mask_big);      // одна BigInt-операция на узел
    const base = tt_slot << 2;
    tt_probes++;
    if (tt_keys[tt_slot] === k && tt_data[base + 3] === board[SIDE_TO_MOVE_CB]) {
      tt_hits++;
      const meta = tt_data[base + 2];
      tt_move_id = tt_data[base + 1];       // ход для сортировки берём всегда
      if (TT_CUT && !is_pv && !is_root && (meta & 255) >= depth_left) {
        let s = tt_data[base];
        /* Матовые оценки хранятся нормализованными — разворачиваем в ply. */
        if (s > MATE_BOUND) s -= ply; else if (s < -MATE_BOUND) s += ply;
        const flag = (meta >> 8) & 3;
        if (flag === TT_EXACT) return s;
        if (flag === TT_LOWER && s >= beta) return s;
        if (flag === TT_UPPER && s <= alpha) return s;
      }
    }
  }

  /* --- 10.4 Шах и продление -------------------------------------------- *
   * Под шахом все ходы форсированы — не даём горизонту обрезать мат.     */
  let in_check = false;
  if (CHK_ON) {
    const side = board[SIDE_TO_MOVE_CB];
    in_check = check_detected_mgc(king_square(board, side), side, board) !== 0;
    if (in_check && ply < root_depth_current * 2) depth_left++;
  }

  /* --- 10.5 Генерация ходов (взятия первыми — это уже слой сортировки) -- */
  const moves = packing_moves_stack[ply];
  clear_list_ml(moves);
  generated_pseudo_legal_captures_mgc(board, moves);
  generated_pseudo_legal_quiet_moves_mgq(board, moves);
  const number_moves = moves[IND_NUMBER_MOVE_ML];        // инвариант -> в локал
  const number_captures = moves[IND_NUMBER_CAPTURES_MOVE_ML];
  const piece_color = moves[IND_PIECE_COLOR_ML];         // инвариант -> в локал

  if (DEBUG_PRINT_MOVES && is_root) test_print_list_ml(moves);

  /* --- 10.6 Оценка ходов для сортировки -------------------------------- *
   * Пакуем ход один раз: from(0..7) | to(8..15) | type(16..30).
   * Дальше по циклу аксессоры списка не вызываем вообще.                 */
  const ids = move_id_stack[ply];
  const scores = move_score_stack[ply];
  const order = move_order_stack[ply];
  const kbase = ply << 1;
  const killer0 = killer_moves[kbase];
  const killer1 = killer_moves[kbase + 1];

  for (let i = 0; i < number_moves; i++) {
    const from = get_from_ml(i, moves);
    const to = get_to_ml(i, moves);
    const type = get_type_move_ml(i, moves);
    const id = from | (to << 8) | (type << 16);
    ids[i] = id;
    order[i] = i;

    let s = 0;
    if (ORD_ON) {
      if ((is_root && id === root_best_id) || id === tt_move_id) s = SCORE_TT_MOVE;
      else if (i < number_captures) {
        s = SCORE_CAPTURE;
        if (USE_MVV_LVA) s += capture_victim_value[get_name_capture_piece_ml(i, moves) & 255];
      }
      else if (USE_KILLER_MOVES && id === killer0) s = SCORE_KILLER0;
      else if (USE_KILLER_MOVES && id === killer1) s = SCORE_KILLER1;
      else if (USE_HISTORY) s = history_table[((from << 7) | to) & HISTORY_MASK];
    }
    scores[i] = s;
  }

  /* --- 10.7 Futility: заранее считаем статику у горизонта --------------- */
  let fut_active = false;
  let fut_limit = 0;
  if (FUT_ON && !is_pv && !in_check && depth_left <= 2) {
    fut_active = true;
    fut_limit = score_position_e(board) + futility_margin[depth_left];
  }

  /* --- 10.8 Основной цикл по ходам ------------------------------------- */
  const undo_board = chess_board_undo_stack[ply];
  const undo_key = chess_board_key_64_undo_stack[ply];
  const best_pv = best_packing_pv_line_stack[ply];
  const save_board = chess_board_save_stack_score[ply];

  let best_score = INIT_EVAL;
  let best_id = NO_MOVE_ID;
  let legal_count = 0;
  let tt_flag = TT_UPPER;   // не улучшили alpha => это верхняя граница

  for (let i = 0; i < number_moves; i++) {

    /* (а) ленивая сортировка: берём лучший из оставшихся */
    const mn = ORD_ON ? pick_best_move(order, scores, i, number_moves) : order[i];
    const id = ids[mn];
    const from = id & 255;
    const to = (id >> 8) & 255;
    const type = id >>> 16;
    const is_capture = mn < number_captures;

    /* (б) futility: тихий ход не может поднять оценку выше alpha.
           Обязательное условие legal_count>0 — иначе получим ложный мат! */
    if (fut_active && !is_capture && legal_count > 0 && fut_limit <= alpha) continue;

    /* (в) сохраняем позицию и ключ */
    undo_board.set(board);
    undo_key[0] = key[0];

    /* (г) делаем ход; 0 = король под шахом, 2 = нелегальный спец.ход.
           ВНИМАНИЕ: в v1.0 при коде 2 откат не делался — здесь исправлено. */
    const legal = do_moves_mm(board, key, type, from, to, piece_color);
    if (legal === 0 || legal === 2) {
      board.set(undo_board);
      key[0] = undo_key[0];
      continue;
    }
    legal_count++;

    /* (д) записываем ход в PV до рекурсии */
    if (ply < PV_MAX_PLY) add_move_to_pv_line_pv(mn, moves, pv, ply);
    if (is_root) pv[IND_TYPE_VARIANT_PV] = 1;   // сохранено поведение v1.0

    /* (е) рекурсия */
    let score;
    const next_ply = ply + 1;
    const next_depth = depth_left - 1;

    if (!AB || legal_count === 1) {
      /* Полный перебор (режим совместимости) либо первый ход PV-узла:
         первый ход обязан исследоваться в полном окне. */
      score = -search_node(board, score_board, key, pv, next_ply, next_depth, -beta, -alpha);
    } else {
      /* PVS: остальные ходы — в нулевом окне (дешёвое доказательство "не лучше"). */
      let red = 0;
      if (LMR_ON && !is_pv && !in_check && depth_left >= 3 && legal_count >= 4 &&
          !is_capture && id !== killer0 && id !== killer1) {
        const d = depth_left < 64 ? depth_left : 63;
        const m = legal_count < 64 ? legal_count : 63;
        red = lmr_table[(d << 6) | m];
        if (red > next_depth) red = next_depth;
      }
      score = -search_node(board, score_board, key, pv, next_ply, next_depth - red, -alpha - 1, -alpha);
      /* Редуцированный ход оказался лучше — перепроверяем на полной глубине. */
      if (red > 0 && score > alpha) {
        score = -search_node(board, score_board, key, pv, next_ply, next_depth, -alpha - 1, -alpha);
      }
      /* Ход реально в окне — только теперь полное окно (иначе PV неполный). */
      if (score > alpha && score < beta) {
        score = -search_node(board, score_board, key, pv, next_ply, next_depth, -beta, -alpha);
      }
    }

    /* (ж) позиция после лучшего хода корня нужна ДО отката */
    if (is_root && score > best_score) iter_best_board.set(board);

    /* (з) откат позиции и ключа — обязателен на всех путях */
    board.set(undo_board);
    key[0] = undo_key[0];

    if (search_stopped) return 0;

    /* (и) обработка результата */
    if (score > best_score) {
      best_score = score;
      best_id = id;
      if (ply < PV_MAX_PLY) save_pv_line_pv(best_pv, pv);
      if (TRACK_SCORE_BOARD) save_board.set(score_board);
      if (is_root) root_best_id = id;          // для сортировки след. итерации
      if (AB && score > alpha) { alpha = score; tt_flag = TT_EXACT; }
    }

    /* (к) beta-отсечение */
    if (AB && score >= beta) {
      tt_flag = TT_LOWER;
      if (!is_capture) {
        if (USE_KILLER_MOVES && killer_moves[kbase] !== id) {
          killer_moves[kbase + 1] = killer_moves[kbase];
          killer_moves[kbase] = id;
        }
        if (USE_HISTORY) {
          const h = ((from << 7) | to) & HISTORY_MASK;
          history_table[h] += depth_left * depth_left;
          if (history_table[h] > HISTORY_LIMIT) age_history();
        }
      }
      break;   // хвост списка не смотрим — в этом вся экономия
    }
  }

  /* --- 10.9 Мат или пат ------------------------------------------------- */
  if (legal_count === 0) {
    const side = board[SIDE_TO_MOVE_CB];
    const checked = in_check ||
      check_detected_mgc(king_square(board, side), side, board) !== 0;
    /* Кодировка совместима с v1.0. ВНИМАНИЕ: v1.0 ставит этот флаг и при
       пате тоже — поведение сохранено, но похоже на ошибку (см. примечания). */
    if (ply < PV_MAX_PLY) pv[IND_DEPTH_MAT_PV] = ply - 1 + 500;
    if (is_root) iter_best_board.set(board);
    if (TRACK_SCORE_BOARD) score_board.set(board);
    return checked ? (MATE + ply) : 0;
  }

  /* --- 10.10 Возврат лучшей линии и лучшей позиции ---------------------- */
  if (best_id !== NO_MOVE_ID) {
    if (ply < PV_MAX_PLY) save_pv_line_pv(pv, best_pv);
    if (TRACK_SCORE_BOARD) score_board.set(save_board);
  }

  /* --- 10.11 Запись в TT ------------------------------------------------ */
  if (TT_ON && !is_root && !search_stopped) {
    let s = best_score;
    /* Нормализуем мат: храним расстояние ОТ УЗЛА, а не от корня. */
    if (s > MATE_BOUND) s += ply; else if (s < -MATE_BOUND) s -= ply;
    const base = tt_slot << 2;
    const meta_old = tt_data[base + 2];
    const depth_old = meta_old & 255;
    const age_old = (meta_old >>> 10) & 255;
    /* Замещение: чужая/устаревшая запись, либо не глубже текущей, либо EXACT. */
    if (tt_keys[tt_slot] !== key[0] || age_old !== tt_age ||
        tt_flag === TT_EXACT || depth_left >= depth_old) {
      const d = depth_left > 255 ? 255 : depth_left;
      tt_keys[tt_slot] = key[0];
      tt_data[base] = s;
      tt_data[base + 1] = best_id;
      tt_data[base + 2] = d | (tt_flag << 8) | (tt_age << 10);
      tt_data[base + 3] = board[SIDE_TO_MOVE_CB];
    }
  }

  return best_score;   // fail-soft: может выйти за границы окна — это норма
}

/* =========================================================================
 * 11. КОРЕНЬ: ИТЕРАТИВНОЕ УГЛУБЛЕНИЕ + ASPIRATION WINDOW
 *     Итерации 1..depth_max дают почти бесплатный прирост скорости:
 *     лучший ход прошлой итерации исследуется первым и режет всё дерево.
 * ========================================================================= */
function search_root(board, score_board, key, pv, depth_max) {
  if (!stacks_ready) ini_stack();

  node_mm = 0;
  tt_probes = 0; tt_hits = 0;
  search_stopped = false;
  time_start = Date.now();
  tt_age = (tt_age + 1) & 255;      // маркер "свежести" записей TT
  killer_moves.fill(NO_MOVE_ID);
  age_history();
  root_best_id = NO_MOVE_ID;
  root_depth_completed = 0;
  root_score = 0;
  pv[IND_DEPTH_MAT_PV] = 0;         // сброс признака мата прошлого поиска
  pv[IND_TYPE_VARIANT_PV] = 0;

  let limit = depth_max | 0;
  if (limit < 1) limit = 1;
  if (limit > MAX_PLY - 2) limit = MAX_PLY - 2;

  const single = !USE_ITERATIVE_DEEPEN || !AB;
  const first = single ? limit : 1;
  let score = 0;

  for (let d = first; d <= limit; d++) {
    root_depth_current = d;

    /* Узкое окно вокруг оценки прошлой итерации. */
    let alpha = -INF, beta = INF, delta = ASP_WINDOW;
    if (USE_ASPIRATION && AB && d >= 4 && root_depth_completed > 0 &&
        score > -MATE_BOUND && score < MATE_BOUND) {
      alpha = score - delta; if (alpha < -INF) alpha = -INF;
      beta = score + delta;  if (beta > INF) beta = INF;
    }

    /* Переисследование при выходе за окно (не более 5 попыток). */
    for (let attempt = 0; attempt < 5; attempt++) {
      score = search_node(board, iter_score_board, key, iter_pv_line, 0, d, alpha, beta);
      if (search_stopped) break;
      if (score <= alpha) {                       // fail-low: расширяем вниз
        alpha = (alpha - delta < -INF) ? -INF : alpha - delta;
        delta <<= 1;
        continue;
      }
      if (score >= beta) {                        // fail-high: расширяем вверх
        beta = (beta + delta > INF) ? INF : beta + delta;
        delta <<= 1;
        continue;
      }
      break;                                      // оценка внутри окна — годна
    }
    if (search_stopped) break;                    // незавершённую итерацию не публикуем

    /* Публикация результата завершённой итерации. */
    save_pv_line_pv(pv, iter_pv_line);
    if (TRACK_SCORE_BOARD) score_board.set(iter_score_board);
    chess_board_0x88_found_best_score.set(iter_best_board);
    root_depth_completed = d;
    root_score = score;

    if (score > MATE_BOUND || score < -MATE_BOUND) break;  // мат найден — хватит
  }

  return score;
}

/* =========================================================================
 * 12. ПУБЛИЧНАЯ ТОЧКА ВХОДА (сигнатура совместима с v1.0)
 * ========================================================================= */
/**
 * @param {Int32Array} chess_board_0x88        позиция
 * @param {Int32Array} chess_board_0x88_score  позиция, соответствующая оценке (TEST)
 * @param {BigUint64Array} chess_board_key_64  зобрист-ключ позиции
 * @param {Int32Array} packing_pv_line         линия варианта
 * @param {number} depth                       текущая глубина (0 = корень)
 * @param {number} depth_max                   максимальная глубина поиска
 * @returns {number} оценка позиции от лица ходящей стороны
 */
function searching_negamax(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                           packing_pv_line, depth, depth_max) {
  if (depth !== 0) {
    /* Прямой вход в узел (не через корень) — на случай внешних вызовов/тестов. */
    if (!stacks_ready) ini_stack();
    root_depth_current = depth_max - depth;
    return search_node(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                       packing_pv_line, depth, depth_max - depth, -INF, INF);
  }
  return search_root(chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
                     packing_pv_line, depth_max);
}

export {
  /* совместимый API */
  searching_negamax, ini_stack, chess_board_0x88_found_best_score, node_mm,
  /* новое */
  stop_search, set_nodes_limit, set_time_limit,
  clear_search_state, get_search_info,
  capture_victim_value, MAX_DEPTH_SEARCH
};