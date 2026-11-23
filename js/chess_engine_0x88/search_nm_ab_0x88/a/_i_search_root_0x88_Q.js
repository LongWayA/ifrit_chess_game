// @ts-check
/**
@copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
@author AnBr75
@name i_search_root_0x88.js
@version corrected / refactored

НАЗНАЧЕНИЕ
  Корневой интерфейс поиска.

  Есть два режима:
    1. start_search_negamax_r(fen_start, depth_max)
       Тестовый запуск полного перебора.

    2. searching_iterative_deepening_r(chessEngine_0x88_O, fen_start, depth_max)
       Основной поиск: итеративное углубление + alpha-beta/PVS.

  На каждой завершённой глубине формируется UCI-подобный объект:
    {
      fen_start,
      fen_end,
      info,
      best_move
    }

  Важно:
    - незавершённая из-за stop итерация не публикуется;
    - bestmove берётся из корневого списка ходов, а не из PV-массива;
    - info depth показывает текущую завершённую глубину;
    - тяжёлые проверки ключей и печати вынесены под флаги.
*/

import {
  clear_list_ml,
  get_type_move_ml,
  get_from_ml,
  get_to_ml,
  return_i_move_ml,
  move_to_string_uci_ml,
  sorting_list_ml,
  LENGTH_LIST_ML,
  IND_PIECE_COLOR_ML,
  IND_NUMBER_MOVE_ML,
  MOVE_NO_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
  BOARD_SIZE_CB,
  SIDE_TO_MOVE_CB,
  WHITE_CB,
  IND_KING_FROM_WHITE_CB,
  IND_KING_FROM_BLACK_CB,
  x07_y07_to_0x88_cb,
  letter_to_x_coordinate_cb,
  set_board_from_fen_0x88_cb,
  set_fen_from_0x88_cb,
  test_print_piece_0x88_f_cb
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_pv_line_pv,
  add_move_to_pv_line_pv,
  save_pv_line_pv,
  pv_line_to_uci_string_pv,
  MAX_DEPTH_PV,
  IND_TYPE_VARIANT_PV
} from "../search_negamax_0x88/pv_line_0x88.js";

import {
  generated_pseudo_legal_captures_mgc,
  check_detected_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";

import {
  searching_negamax,
  ini_stack,
  chess_board_0x88_found_best_score,
  node_mm
} from "../search_negamax_0x88/search_negamax_0x88.js";

import {
  searching_negamax_alpha_beta_id_ab,
  set_stop_search_in_1_ab,
  set_stop_search_in_0_ab,
  set_node_in_0_ab,
  node_ab,
  is_history_heuristic_use_ab,
  ini_stack_ab,
  INIT_EVAL_AB,
  save_alpha_up_test_tt,
  save_beta_cut_test_tt,
  use_alpha_up_test_tt,
  use_beta_cut_test_tt,
  clear_test_tt
} from "./search_nm_ab_0x88.js";

import {
  ini_Array_hh
} from "../heuristic_0x88/history_heuristic_0x88/history_heuristic_0x88.js";

import {
  ini_random_key_array_64_tk,
  set_key_from_board_0x88_tk,
  test_chess_board_key_64_tk,
  test_generation_key_64_tk
} from "../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

import {
  ini_tt,
  test_uses_hash_tt,
  print_test_set_get_position_tt
} from "../heuristic_0x88/transposition_table_0x88/transposition_table_0x88.js";

import { Timer_C } from "../../browser/timer.js";
import { ChessEngine_0x88_С } from "../i_chess_engine_0x88.js";
import { ini_stack_qs } from "../quiescence_search_0x88/quiescence_search_0x88.js";
import { score_position_e } from "../evaluate_0x88/evaluate_0x88.js";

/**
@typedef {Object} uci_return_search
@property {string} fen_start
@property {string} fen_end
@property {string} info
@property {string} best_move
*/

/* =========================================================================
 * 1. КОНСТАНТЫ И ФЛАГИ
 * ========================================================================= */

const ALPHA_SCORE_R = -50000;
const BETA_SCORE_R = 50000;
const MATE_R = -30000;

/** Ограничение глубины сверху. */
const MAX_DEPTH_ROOT = Math.min(128, MAX_DEPTH_PV - 1);

/** TEST: печать позиций после полного перебора. */
const DEBUG_NEGAMAX_PRINT = false;

/** TEST: проверка ключей после каждого корневого хода. */
const VERIFY_ROOT_KEY = false;

/** TEST: печать TT-статистики в конце поиска. */
const DEBUG_TT_PRINT = false;

const timer_O = new Timer_C();

/* =========================================================================
 * 2. ОДНОКРАТНАЯ ИНИЦИАЛИЗАЦИЯ
 *    В старом коде случайные ключи и стеки пересоздавались на каждый поиск.
 *    Это дорого и сбрасывает полезную информацию.
 * ========================================================================= */

let keys_initialized_r = false;
let search_initialized_r = false;

function ensure_keys_r() {
  if (!keys_initialized_r) {
    ini_random_key_array_64_tk();
    keys_initialized_r = true;
  }
}

function ensure_search_r() {
  ensure_keys_r();

  if (!search_initialized_r) {
    ini_tt();
    ini_stack_qs();
    ini_stack_ab();
    ini_stack();

    if (is_history_heuristic_use_ab == 1) {
      ini_Array_hh();
    }

    search_initialized_r = true;
  }
}

/** Принудительная переинициализация. Можно вызвать при новой партии. */
const ini_search_root_r = function () {
  keys_initialized_r = false;
  search_initialized_r = false;
  ensure_search_r();
};

/* =========================================================================
 * 3. STOP-ФЛАГИ
 * ========================================================================= */

let stop_search_root = 0;

const set_stop_search_in_1_r = function () {
  set_stop_search_in_1_ab();
  stop_search_root = 1;
};

const set_stop_search_in_0_r = function () {
  set_stop_search_in_0_ab();
  stop_search_root = 0;
};

/* =========================================================================
 * 4. TEST TT
 * ========================================================================= */

const test_tt = function () {
  console.log("-------------------------------------- ");
  console.log("save_alpha_up_test_tt " + save_alpha_up_test_tt);
  console.log("use_alpha_up_test_tt " + use_alpha_up_test_tt);
  console.log("----- ");
  console.log("save_beta_cut_test_tt " + save_beta_cut_test_tt);
  console.log("use_beta_cut_test_tt " + use_beta_cut_test_tt);
  console.log("-------------------------------------- ");
};

/* =========================================================================
 * 5. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ КОРНЯ
 * ========================================================================= */

/**
 * Оценка позиции, в которой нет легальных ходов.
 *
 * @param {Int32Array} board
 * @returns {number}
 */
function no_moves_score_r(board) {
  const side = board[SIDE_TO_MOVE_CB];
  const king_square = (side == WHITE_CB)
    ? board[IND_KING_FROM_WHITE_CB]
    : board[IND_KING_FROM_BLACK_CB];

  if (check_detected_mgc(king_square, side, board) != 0) {
    return MATE_R;
  }

  return 0;
}

/**
 * Стабильная сортировка корневого порядка ходов по оценкам прошлой итерации.
 * Сортируем не сам список ходов, а массив индексов root_order.
 *
 * @param {Int32Array} root_order
 * @param {Int32Array} root_scores
 * @param {number} count
 */
function sort_root_order_by_score(root_order, root_scores, count) {
  for (let i = 1; i < count; i++) {
    const move_i = root_order[i];
    const score = root_scores[move_i];

    let j = i - 1;

    // Стабильно: при равных оценках старый порядок сохраняется.
    while (j >= 0 && root_scores[root_order[j]] < score) {
      root_order[j + 1] = root_order[j];
      j--;
    }

    root_order[j + 1] = move_i;
  }
}

/**
 * Первый UCI-ход из PV-строки.
 *
 * @param {string} pv
 * @returns {string}
 */
function first_move_from_pv_string(pv) {
  const trimmed = pv.trim();
  if (trimmed.length == 0) return "no";

  const space_i = trimmed.indexOf(" ");
  if (space_i == -1) return trimmed;

  return trimmed.slice(0, space_i);
}

/* =========================================================================
 * 6. ТЕСТОВЫЙ ЗАПУСК ПОЛНОГО ПЕРЕБОРА
 * ========================================================================= */

/**
 * @param {string} fen_start
 * @param {number} depth_max
 * @returns {uci_return_search}
 */
const start_search_negamax_r = function (fen_start, depth_max) {
  ensure_search_r();

  const chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(0);
  const chess_board_0x88_score = new Int32Array(BOARD_SIZE_CB).fill(0);
  const chess_board_0x88_start = new Int32Array(BOARD_SIZE_CB).fill(0);
  const chess_board_key_64 = new BigUint64Array(1);
  const packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);

  set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_start);
  chess_board_0x88.set(chess_board_0x88_start);
  set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);

  const time_start = timer_O.getCurrentTimeMs();

  const best_score = searching_negamax(
    chess_board_0x88,
    chess_board_0x88_score,
    chess_board_key_64,
    packing_pv_line,
    0,
    depth_max
  );

  const nodes = node_mm;
  const time_end = timer_O.getCurrentTimeMs();
  const time_delta_ms = Math.max(time_end - time_start, 1);
  const time_delta_sec = time_delta_ms / 1000;
  const nps = Math.round(nodes / time_delta_sec);

  const pv = pv_line_to_uci_string_pv(packing_pv_line, best_score);
  const best_move_uci = first_move_from_pv_string(pv);

  if (DEBUG_NEGAMAX_PRINT) {
    console.log("start_search_negamax_r -> fen_start " + fen_start);
    console.log("start_search_negamax_r -> found_best_score:");
    test_print_piece_0x88_f_cb(chess_board_0x88_found_best_score);
    console.log("start_search_negamax_r -> score_board:");
    test_print_piece_0x88_f_cb(chess_board_0x88_score);
    console.log("start_search_negamax_r -> score_board eval = " +
      score_position_e(chess_board_0x88_score));
  }

  /** @type {uci_return_search} */
  const result = {
    fen_start: fen_start,
    fen_end: set_fen_from_0x88_cb(chess_board_0x88_found_best_score),
    info:
      "info depth " + depth_max +
      " score cp " + best_score +
      " nodes " + nodes +
      " nps " + nps +
      " time " + time_delta_ms +
      " pv " + pv,
    best_move: "bestmove " + best_move_uci
  };

  return result;
};

/* =========================================================================
 * 7. ОСНОВНОЙ ПОИСК: ИТЕРАТИВНОЕ УГЛУБЛЕНИЕ + ALPHA-BETA
 * ========================================================================= */

/**
 * @param {ChessEngine_0x88_С} chessEngine_0x88_O
 * @param {string} fen_start
 * @param {number} depth_max
 * @returns {uci_return_search}
 */
const searching_iterative_deepening_r = function (chessEngine_0x88_O, fen_start, depth_max) {
  ensure_search_r();
  clear_test_tt();

  set_stop_search_in_0_ab();
  stop_search_root = 0;

  if (depth_max > MAX_DEPTH_ROOT) depth_max = MAX_DEPTH_ROOT;
  if (depth_max < 1) depth_max = 1;

  /* --- доски и ключи ---------------------------------------------------- */
  const chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(0);
  const chess_board_0x88_save = new Int32Array(BOARD_SIZE_CB).fill(0);
  const chess_board_0x88_start = new Int32Array(BOARD_SIZE_CB).fill(0);
  const chess_board_0x88_get_move = new Int32Array(BOARD_SIZE_CB).fill(0);

  const chess_board_key_64 = new BigUint64Array(1);
  const chess_board_key_64_undo = new BigUint64Array(1);
  const chess_board_key_64_save_test = new BigUint64Array(1);
  const chess_board_key_64_test = new BigUint64Array(1);

  /* --- списки ходов и PV ------------------------------------------------ */
  const packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
  const root_scores = new Int32Array(LENGTH_LIST_ML).fill(INIT_EVAL_AB);
  const packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
  const best_packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);

  /* --- стартовая позиция ------------------------------------------------ */
  set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_start);
  chess_board_0x88.set(chess_board_0x88_start);

  // Если ходов нет, fen_end не должен стать пустой доской.
  chess_board_0x88_get_move.set(chess_board_0x88);

  set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);

  /* --- корневой список ходов ------------------------------------------- */
  clear_list_ml(packing_moves);
  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

  // Базовая сортировка корневого списка.
  sorting_list_ml(packing_moves);

  const number_root_moves = packing_moves[IND_NUMBER_MOVE_ML];
  const piece_color_root = packing_moves[IND_PIECE_COLOR_ML];

  // Порядок перебора корневых ходов. Сам список ходов не переставляем.
  const root_order = new Int32Array(number_root_moves);
  for (let i = 0; i < number_root_moves; i++) {
    root_order[i] = i;
  }

  /** @type {uci_return_search} */
  let last_result = {
    fen_start: fen_start,
    fen_end: fen_start,
    info: "info depth 0 score cp 0 nodes 0 nps 0 time 0 pv no",
    best_move: "bestmove no"
  };

  let nodes_total = 0;
  let time_total_ms = 0;
  let completed_depth = 0;

  /* --- итеративное углубление ------------------------------------------ */
  for (let depth_max_current = 1; depth_max_current <= depth_max; depth_max_current++) {

    if (stop_search_root == 1) break;

    const time_start = timer_O.getCurrentTimeMs();

    let best_score = INIT_EVAL_AB;
    let alpha = ALPHA_SCORE_R;
    let beta = BETA_SCORE_R;

    let best_move_i = -1;
    let best_move_uci = "no";
    let number_move_legal = 0;
    let node_depth = 0;

    clear_pv_line_pv(packing_pv_line);
    root_scores.fill(INIT_EVAL_AB);

    /* --- цикл по корневым ходам ---------------------------------------- */
    for (let order_i = 0; order_i < number_root_moves; order_i++) {

      if (stop_search_root == 1) break;

      const move_i = root_order[order_i];

      const type_move = get_type_move_ml(move_i, packing_moves);
      const from = get_from_ml(move_i, packing_moves);
      const to = get_to_ml(move_i, packing_moves);

      chess_board_0x88_save.set(chess_board_0x88);
      chess_board_key_64_undo[0] = chess_board_key_64[0];

      const is_moove_legal = do_moves_mm(
        chess_board_0x88,
        chess_board_key_64,
        type_move,
        from,
        to,
        piece_color_root
      );

      if (is_moove_legal == 0 || is_moove_legal == 2) {
        chess_board_0x88.set(chess_board_0x88_save);
        chess_board_key_64[0] = chess_board_key_64_undo[0];
        continue;
      }

      number_move_legal = number_move_legal + 1;

      add_move_to_pv_line_pv(move_i, packing_moves, packing_pv_line, 0);

      set_node_in_0_ab();

      if (VERIFY_ROOT_KEY) {
        chess_board_key_64_save_test[0] = chess_board_key_64[0];
      }

      const score = -searching_negamax_alpha_beta_id_ab(
        -beta,
        -alpha,
        chess_board_0x88,
        chess_board_key_64,
        packing_pv_line,
        1,
        depth_max_current,
        1
      );

      node_depth = node_depth + node_ab;

      if (VERIFY_ROOT_KEY) {
        test_chess_board_key_64_tk(chess_board_key_64_save_test, chess_board_key_64);
        set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_test);
        test_generation_key_64_tk(
          chess_board_key_64_test,
          chess_board_key_64,
          packing_moves,
          move_i,
          "root"
        );
      }

      root_scores[move_i] = score;

      if (score > best_score) {
        best_score = score;
        best_move_i = move_i;

        // UCI лучшего хода фиксируем сразу из корневого списка.
        best_move_uci = move_to_string_uci_ml(move_i, packing_moves);

        save_pv_line_pv(best_packing_pv_line, packing_pv_line);
        chess_board_0x88_get_move.set(chess_board_0x88);

        if (score > alpha) {
          alpha = score;
        }
      }

      chess_board_0x88.set(chess_board_0x88_save);
      chess_board_key_64[0] = chess_board_key_64_undo[0];

      if (stop_search_root == 1) break;
    }

    // Незавершённую итерацию не публикуем.
    if (stop_search_root == 1) break;

    if (best_move_i != -1) {
      save_pv_line_pv(packing_pv_line, best_packing_pv_line);
    }

    const time_end = timer_O.getCurrentTimeMs();
    const time_delta_ms = Math.max(time_end - time_start, 1);

    time_total_ms = time_total_ms + time_delta_ms;
    nodes_total = nodes_total + node_depth;
    completed_depth = depth_max_current;

    // Готовим порядок ходов для следующей итерации.
    sort_root_order_by_score(root_order, root_scores, number_root_moves);

    const time_total_sec = time_total_ms / 1000;
    const nps = Math.round(nodes_total / time_total_sec);

    let info;
    let best_move;

    if (number_move_legal != 0) {
      const pv = pv_line_to_uci_string_pv(packing_pv_line, best_score);

      info =
        "info depth " + depth_max_current +
        " score cp " + best_score +
        " nodes " + nodes_total +
        " nps " + nps +
        " time " + time_total_ms +
        " pv " + pv;

      best_move = "bestmove " + best_move_uci;
    } else {
      const score_no_moves = no_moves_score_r(chess_board_0x88);

      info =
        "info depth " + depth_max_current +
        " score cp " + score_no_moves +
        " nodes " + nodes_total +
        " nps " + nps +
        " time " + time_total_ms +
        " pv no";

      best_move = "bestmove no";
    }

    /** @type {uci_return_search} */
    const iteration_result = {
      fen_start: fen_start,
      fen_end: set_fen_from_0x88_cb(chess_board_0x88_get_move),
      info: info,
      best_move: best_move
    };

    last_result = iteration_result;

    chessEngine_0x88_O?.message_search_root_to_engine(iteration_result);

    // Если легальных ходов нет, глубже искать не нужно.
    if (number_move_legal == 0) {
      chessEngine_0x88_O?.info_from_depth_uci(iteration_result);
      break;
    }
  }

  /* --- если stop пришёл до первой завершённой итерации ------------------ *
   * стараемся вернуть хотя бы первый легальный ход, чтобы GUI не получил
   * пустой bestmove.
   * --------------------------------------------------------------------- */
  if (completed_depth == 0 && number_root_moves > 0) {
    for (let order_i = 0; order_i < number_root_moves; order_i++) {
      const move_i = root_order[order_i];

      const type_move = get_type_move_ml(move_i, packing_moves);
      const from = get_from_ml(move_i, packing_moves);
      const to = get_to_ml(move_i, packing_moves);

      chess_board_0x88_save.set(chess_board_0x88);
      chess_board_key_64_undo[0] = chess_board_key_64[0];

      const is_moove_legal = do_moves_mm(
        chess_board_0x88,
        chess_board_key_64,
        type_move,
        from,
        to,
        piece_color_root
      );

      if (is_moove_legal == 0 || is_moove_legal == 2) {
        chess_board_0x88.set(chess_board_0x88_save);
        chess_board_key_64[0] = chess_board_key_64_undo[0];
        continue;
      }

      const fallback_uci = move_to_string_uci_ml(move_i, packing_moves);
      chess_board_0x88_get_move.set(chess_board_0x88);

      chess_board_0x88.set(chess_board_0x88_save);
      chess_board_key_64[0] = chess_board_key_64_undo[0];

      last_result = {
        fen_start: fen_start,
        fen_end: set_fen_from_0x88_cb(chess_board_0x88_get_move),
        info: "info depth 0 score cp 0 nodes 0 nps 0 time 0 pv no",
        best_move: "bestmove " + fallback_uci
      };

      break;
    }
  }

  if (DEBUG_TT_PRINT) {
    print_test_set_get_position_tt();
    test_uses_hash_tt();
    test_tt();
  }

  return last_result;
};

/* =========================================================================
 * 8. UCI MOVES -> FEN
 * ========================================================================= */

/**
 * Преобразует строку ходов в конечный FEN.
 * Поддерживаемый формат:
 *   "moves e2e4 e7e5 g1f3 ..."
 *
 * @param {string} fen_start
 * @param {string} move_str
 * @returns {string} FEN или "-1" при ошибке
 */
const move_str_to_board_r = function (fen_start, move_str) {
  ensure_keys_r();

  const chess_board_0x88_uci = new Int32Array(BOARD_SIZE_CB).fill(0);
  const packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
  const chess_board_key_64 = new BigUint64Array(1);

  set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_uci);
  set_key_from_board_0x88_tk(chess_board_0x88_uci, chess_board_key_64);

  const tokens = move_str.trim().split(/\s+/);
  let token_start = 0;

  if (tokens.length > 0 && tokens[0] == "moves") {
    token_start = 1;
  }

  for (let token_i = token_start; token_i < tokens.length; token_i++) {
    const move_uci = tokens[token_i];

    if (move_uci.length < 4) continue;

    // Важно: список ходов очищаем перед каждой генерацией.
    clear_list_ml(packing_moves);
    generated_pseudo_legal_captures_mgc(chess_board_0x88_uci, packing_moves);
    generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88_uci, packing_moves);

    const from_x = letter_to_x_coordinate_cb(move_uci[0]);
    const from_y = 8 - Number(move_uci[1]);
    const from = x07_y07_to_0x88_cb(from_x, from_y);

    const to_x = letter_to_x_coordinate_cb(move_uci[2]);
    const to_y = 8 - Number(move_uci[3]);
    const to = x07_y07_to_0x88_cb(to_x, to_y);

    const promo = move_uci.length > 4 ? move_uci[4] : "";

    const i_move = return_i_move_ml(packing_moves, from, to, promo);
    if (i_move < 0) return "-1";

    const type_move = get_type_move_ml(i_move, packing_moves);
    const move_from = get_from_ml(i_move, packing_moves);
    const move_to = get_to_ml(i_move, packing_moves);
    const piece_color = packing_moves[IND_PIECE_COLOR_ML];

    const is_moove_legal = do_moves_mm(
      chess_board_0x88_uci,
      chess_board_key_64,
      type_move,
      move_from,
      move_to,
      piece_color
    );

    if (is_moove_legal == 0 || is_moove_legal == 2) {
      return "-1";
    }
  }

  return set_fen_from_0x88_cb(chess_board_0x88_uci);
};

export {
  start_search_negamax_r,
  searching_iterative_deepening_r,
  set_stop_search_in_1_r,
  set_stop_search_in_0_r,
  test_tt,
  move_str_to_board_r,
  ini_search_root_r
};