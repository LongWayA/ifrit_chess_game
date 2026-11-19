// @ts-check
/**
@copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
@author AnBr75
@name search_nm_ab_0x88.js
@version corrected / refactored

НАЗНАЧЕНИЕ
  Negamax + alpha-beta + PVS.
  Дополнительно:
    - quiescence search на горизонте;
    - TT-ход для сортировки и beta-cut отсечение;
    - killer heuristic;
    - history heuristic;
    - razoring / LMR под флагами;
    - детектор повторений внутри текущей линии поиска.

ВАЖНО
  Модуль сохраняет старый внешний API:
    searching_negamax_alpha_beta_id_ab(...)
    ini_stack_ab()
    set_stop_search_in_1_ab()
    set_stop_search_in_0_ab()
    set_node_in_0_ab()
    node_ab
    INIT_EVAL_AB
    ...

  Основная оценка считается от лица стороны, чей ход.
  Матовая кодировка сохранена: MATE_AB + depth.
*/

import {
  BOARD_SIZE_CB,
  SIDE_TO_MOVE_CB,
  WHITE_CB,
  IND_KING_FROM_WHITE_CB,
  IND_KING_FROM_BLACK_CB,
  test_compare_chess_board_0x88_cb
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_list_ml,
  get_type_move_ml,
  get_from_ml,
  get_to_ml,
  sorting_list_ml,
  set_move_after_the_captures_ml,
  sorting_list_history_heuristic_ml,
  set_move_in_0_ml,
  LENGTH_LIST_ML,
  IND_PIECE_COLOR_ML,
  IND_NUMBER_CAPTURES_MOVE_ML,
  IND_NUMBER_MOVE_ML,
  MOVE_NO_ML,
  CAPTURES_KING_PAWN_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
  add_move_to_pv_line_pv,
  save_pv_line_pv,
  MAX_DEPTH_PV,
  IND_DEPTH_MAT_PV
} from "../search_negamax_0x88/pv_line_0x88.js";

import {
  generated_pseudo_legal_captures_mgc,
  check_detected_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";

import { score_position_e, PAWN_SCORE_E } from "../evaluate_0x88/evaluate_0x88.js";

import { quiescence_search } from "../quiescence_search_0x88/quiescence_search_0x88.js";

import {
  add_move_kh,
  MAX_DEPTH_KH
} from "../heuristic_0x88/killer_heuristic_0x88/killer_heuristic_0x88.js";

import {
  history_good_save_hh,
  get_history_hh
} from "../heuristic_0x88/history_heuristic_0x88/history_heuristic_0x88.js";

import {
  set_position_in_tt,
  get_position_from_tt,
  ALPHA_UPDATE_TT,
  BETA_CUT_TT,
  IND_TN_TT,
  IND_SC_TT
} from "../heuristic_0x88/transposition_table_0x88/transposition_table_0x88.js";

/* =========================================================================
 * 1. ФЛАГИ ЭВРИСТИК
 *    Оставлены числовыми 0/1 для совместимости со старым кодом.
 * ========================================================================= */

let is_quiescence_use = 1;          // поиск взятий на горизонте
let is_ab_use = 1;                  // alpha-beta отсечения
let is_PVS_use = 1;                 // principal variation search

let is_killer_heuristic_use_ab = 1; // два killer-хода на глубину
let is_history_heuristic_use_ab = 1;// history heuristic
let is_TT_use = 1;                  // transposition table

let is_razoring_use = 0;            // razoring
let is_lmr_use = 0;                 // late move reductions

/** TEST: проверять, что quiescence_search восстановил доску. */
const VERIFY_QS_BOARD = false;

/* =========================================================================
 * 2. КОНСТАНТЫ
 * ========================================================================= */

const MATE_AB = -30000;

/**
 * Стартовая "минус бесконечность".
 * Матовая оценка должна обновлять её и при отрицательном, и при положительном
 * мате: -30000 > -40000 и +30000 > -40000.
 */
const INIT_EVAL_AB = -40000;

/** Размер стеков поиска. */
const MAX_DEPTH_SEARCH = 129;

/**
 * Реальная безопасная глубина ограничена:
 *   - стеком поиска;
 *   - длиной PV-линии.
 */
const MAX_SAFE_DEPTH = Math.min(MAX_DEPTH_SEARCH - 1, MAX_DEPTH_PV - 1);

/* =========================================================================
 * 3. СЧЁТЧИКИ И TEST-СТАТИСТИКА
 * ========================================================================= */

/** Счётчик листьев. Как и в старом коде, считаем именно листья. */
let node_ab = 0;

/** Флаг экстренной остановки. */
let stop_search = 0;

let save_alpha_up_test_tt = 0;
let save_beta_cut_test_tt = 0;
let use_alpha_up_test_tt = 0;
let use_beta_cut_test_tt = 0;

/** TEST-доска для проверки восстановления позиции после quiescence. */
const chess_board_0x88_test = new Int32Array(BOARD_SIZE_CB).fill(0);

/* =========================================================================
 * 4. СТЕКИ И ТАБЛИЦЫ ЭВРИСТИК
 * ========================================================================= */

/** Killer-ходы: по два упакованных хода на глубину. */
const packing_moves_k1 = new Int32Array(MAX_DEPTH_KH).fill(MOVE_NO_ML);
const packing_moves_k2 = new Int32Array(MAX_DEPTH_KH).fill(MOVE_NO_ML);

/**
 * Ключи текущей линии поиска для детектора повторений.
 * В старом коде массив был всего на 20 элементов — это легко ломало поиск
 * на глубинах больше 20.
 */
const chess_board_key_64_repetition = new BigUint64Array(MAX_DEPTH_SEARCH).fill(0n);

/** Список ходов для каждой глубины. */
const packing_moves_stack = new Array(MAX_DEPTH_SEARCH);

/** Лучшая PV-линия для каждой глубины. */
const best_packing_pv_line_stack = new Array(MAX_DEPTH_SEARCH);

/** Ключ до хода. */
const chess_board_key_64_undo_stack = new Array(MAX_DEPTH_SEARCH);

/** Доска до хода. */
const chess_board_undo_stack = new Array(MAX_DEPTH_SEARCH);

/** Буфер для одного TT-хода. */
const packing_moves_1_tt_stack = new Array(MAX_DEPTH_SEARCH);

/**
 * Инициализация стеков alpha-beta поиска.
 * Вызывать один раз при старте программы.
 */
const ini_stack_ab = function () {
  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {
    packing_moves_stack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    best_packing_pv_line_stack[depth] = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
    chess_board_key_64_undo_stack[depth] = new BigUint64Array(1);
    chess_board_undo_stack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
    packing_moves_1_tt_stack[depth] = new Int32Array(1).fill(MOVE_NO_ML);
  }
};

const set_stop_search_in_1_ab = function () {
  stop_search = 1;
};

const set_stop_search_in_0_ab = function () {
  stop_search = 0;
};

const set_node_in_0_ab = function () {
  node_ab = 0;
};

const clear_test_tt = function () {
  save_alpha_up_test_tt = 0;
  save_beta_cut_test_tt = 0;
  use_alpha_up_test_tt = 0;
  use_beta_cut_test_tt = 0;
};

/* =========================================================================
 * 5. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
 * ========================================================================= */

/**
 * Лист поиска: статическая оценка или quiescence search.
 *
 * @param {number} alpha
 * @param {number} beta
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} depth
 * @returns {number}
 */
function leaf_score_ab(alpha, beta, chess_board_0x88, chess_board_key_64, depth) {
  let best_score;

  if (is_quiescence_use == 0) {
    best_score = score_position_e(chess_board_0x88);
  } else {
    if (VERIFY_QS_BOARD) {
      chess_board_0x88_test.set(chess_board_0x88);
      best_score = quiescence_search(alpha, beta, chess_board_0x88, chess_board_key_64, depth);
      test_compare_chess_board_0x88_cb(chess_board_0x88_test, chess_board_0x88);
    } else {
      best_score = quiescence_search(alpha, beta, chess_board_0x88, chess_board_key_64, depth);
    }
  }

  node_ab = node_ab + 1;
  return best_score;
}

/**
 * Легальных ходов нет: мат или пат.
 * Сохранена старая кодировка IND_DEPTH_MAT_PV.
 *
 * @param {Int32Array} chess_board_0x88
 * @param {Int32Array} packing_pv_line
 * @param {number} depth
 * @returns {number}
 */
function no_legal_moves_ab(chess_board_0x88, packing_pv_line, depth) {
  const side = chess_board_0x88[SIDE_TO_MOVE_CB];
  const king_square = (side == WHITE_CB)
    ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
    : chess_board_0x88[IND_KING_FROM_BLACK_CB];

  // Сохранено из старой версии:
  // depth - 1, потому что на этой глубине ход не записывался;
  // +500, чтобы при depth = 1 не получить 0.
  packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

  if (check_detected_mgc(king_square, side, chess_board_0x88) != 0) {
    return MATE_AB + depth;
  }

  return 0;
}

/* =========================================================================
 * 6. ОСНОВНОЙ ALPHA-BETA ПОИСК
 * ========================================================================= */

/**
 * Negamax + alpha-beta + PVS.
 *
 * @param {number} alpha
 * @param {number} beta
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64
 * @param {Int32Array} packing_pv_line
 * @param {number} depth
 * @param {number} depth_max
 * @param {number} isPV
 * @returns {number}
 */
const searching_negamax_alpha_beta_id_ab = function (
  alpha,
  beta,
  chess_board_0x88,
  chess_board_key_64,
  packing_pv_line,
  depth,
  depth_max,
  isPV
) {

  /* --- 6.1 Экстренный выход -------------------------------------------- */
  if (stop_search == 1) return 0;

  /* --- 6.2 Защита от переполнения стеков ------------------------------- */
  if (depth >= MAX_SAFE_DEPTH) {
    return leaf_score_ab(alpha, beta, chess_board_0x88, chess_board_key_64, depth);
  }

  /* --- 6.3 Детектор повторений внутри текущей линии -------------------- *
   * Позиция может повториться только на том же ходу стороны, поэтому
   * смотрим назад с шагом 2.
   * В поиске достаточно одного повторения, чтобы вернуть ничью.
   * --------------------------------------------------------------------- */
  chess_board_key_64_repetition[depth] = chess_board_key_64[0];

  if (depth >= 2) {
    const current_key = chess_board_key_64[0];

    for (let i = depth - 2; i >= 0; i -= 2) {
      if (chess_board_key_64_repetition[i] === current_key) {
        return 0;
      }
    }
  }

  /* --- 6.4 Горизонт поиска --------------------------------------------- */
  if (depth >= depth_max) {
    return leaf_score_ab(alpha, beta, chess_board_0x88, chess_board_key_64, depth);
  }

  /* --- 6.5 Буферы текущей глубины -------------------------------------- */
  const packing_moves = packing_moves_stack[depth];
  const best_packing_pv_line = best_packing_pv_line_stack[depth];
  const chess_board_0x88_undo = chess_board_undo_stack[depth];
  const chess_board_key_64_undo = chess_board_key_64_undo_stack[depth];
  const packing_moves_1_tt = packing_moves_1_tt_stack[depth];

  /* --- 6.6 Проба TT ----------------------------------------------------- *
   * Используем:
   *   - BETA_CUT_TT как отсечение;
   *   - TT-ход для сортировки.
   * --------------------------------------------------------------------- */
  let tt_type = -1;
  let tt_score = 0;

  if (is_TT_use == 1) {
    const out_tt = get_position_from_tt(
      chess_board_key_64,
      packing_moves_1_tt,
      depth,
      depth_max,
      "" // fen не генерируем: это дорого и нужно только для отладки
    );

    if (out_tt) {
      tt_type = out_tt[IND_TN_TT];
      tt_score = out_tt[IND_SC_TT];

      if (tt_type == BETA_CUT_TT && tt_score >= beta) {
        use_beta_cut_test_tt = use_beta_cut_test_tt + 1;
        return tt_score;
      }
    }
  }

  /* --- 6.7 Razoring ----------------------------------------------------- *
   * По умолчанию выключен.
   * Идея: если статическая оценка настолько плоха, что даже запас не
   * дотягивает до alpha, проверяем это через quiescence.
   * --------------------------------------------------------------------- */
  if (is_razoring_use == 1) {
    const depth_left = depth_max - depth;

    if (isPV == 0 && depth_left < 3) {
      const static_score = score_position_e(chess_board_0x88);
      const razor_margin = PAWN_SCORE_E * depth_left;

      // Защита от матовых зон: рядом с матом razoring может испортить оценку.
      if ((static_score + razor_margin) < alpha && alpha < 5000) {
        const side = chess_board_0x88[SIDE_TO_MOVE_CB];
        const king_square = (side == WHITE_CB)
          ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
          : chess_board_0x88[IND_KING_FROM_BLACK_CB];

        const in_check = check_detected_mgc(king_square, side, chess_board_0x88) != 0;

        if (!in_check) {
          const razor_score = quiescence_search(
            alpha,
            alpha + 1,
            chess_board_0x88,
            chess_board_key_64,
            depth
          );

          if (razor_score <= alpha) return razor_score;
        }
      }
    }
  }

  /* --- 6.8 Генерация ходов --------------------------------------------- *
   * ВАЖНО: список обязательно очищаем.
   * Буфер используется повторно на разных узлах одной глубины.
   * --------------------------------------------------------------------- */
  clear_list_ml(packing_moves);

  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

  /* --- 6.9 Сортировка ходов -------------------------------------------- */

  // Базовая сортировка по типу хода.
  sorting_list_ml(packing_moves);

  // History heuristic.
  if (is_history_heuristic_use_ab == 1) {
    sorting_list_history_heuristic_ml(packing_moves, get_history_hh());
  }

  // Killer heuristic.
  if (is_killer_heuristic_use_ab == 1 && depth < MAX_DEPTH_KH) {
    if (packing_moves_k2[depth] != 0) {
      set_move_after_the_captures_ml(packing_moves, packing_moves_k2, depth);
    }

    if (packing_moves_k1[depth] != 0) {
      set_move_after_the_captures_ml(packing_moves, packing_moves_k1, depth);
    }
  }

  // TT-ход ставим первым.
  if (is_TT_use == 1 && tt_type != -1) {
    set_move_in_0_ml(packing_moves, packing_moves_1_tt);
    use_alpha_up_test_tt = use_alpha_up_test_tt + 1;
  }

  /* --- 6.10 Инварианты цикла ------------------------------------------- */
  const number_moves = packing_moves[IND_NUMBER_MOVE_ML];
  const piece_color = packing_moves[IND_PIECE_COLOR_ML];
  const depth_left = depth_max - depth;

  // Не сокращаем взятия и несколько первых тихих ходов.
  const lmr_start = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] + 4;

  let best_score = INIT_EVAL_AB;
  let number_move_legal = 0;
  let is_update_pv_line = 0;

  /* --- 6.11 Основной цикл по ходам ------------------------------------- */
  for (let move_i = 0; move_i < number_moves; move_i++) {

    const type_move = get_type_move_ml(move_i, packing_moves);
    const from = get_from_ml(move_i, packing_moves);
    const to = get_to_ml(move_i, packing_moves);

    chess_board_0x88_undo.set(chess_board_0x88);
    chess_board_key_64_undo[0] = chess_board_key_64[0];

    const is_moove_legal = do_moves_mm(
      chess_board_0x88,
      chess_board_key_64,
      type_move,
      from,
      to,
      piece_color
    );

    // 0 — король под шахом.
    // 2 — нелегальный специальный ход.
    // В обоих случаях откатываем позицию и ключ.
    if (is_moove_legal == 0 || is_moove_legal == 2) {
      chess_board_0x88.set(chess_board_0x88_undo);
      chess_board_key_64[0] = chess_board_key_64_undo[0];
      continue;
    }

    // Первый именно ЛЕГАЛЬНЫЙ ход, а не просто move_i == 0.
    const is_first_legal_move = (number_move_legal == 0);
    number_move_legal = number_move_legal + 1;

    add_move_to_pv_line_pv(move_i, packing_moves, packing_pv_line, depth);

    let score;
    let child_depth_max = depth_max;

    /* --- PVS / полный поиск -------------------------------------------- */
    if (is_PVS_use == 0 || (is_first_legal_move && isPV == 1)) {
      // Первый ход PV-узла ищем в полном окне.
      score = -searching_negamax_alpha_beta_id_ab(
        -beta,
        -alpha,
        chess_board_0x88,
        chess_board_key_64,
        packing_pv_line,
        depth + 1,
        child_depth_max,
        1
      );
    } else {
      // Остальные ходы сначала ищем в нулевом окне.
      if (is_lmr_use == 1 && number_move_legal > lmr_start && depth_left > 4) {
        child_depth_max = depth_max - 1;
      }

      score = -searching_negamax_alpha_beta_id_ab(
        -(alpha + 1),
        -alpha,
        chess_board_0x88,
        chess_board_key_64,
        packing_pv_line,
        depth + 1,
        child_depth_max,
        0
      );

      // Если LMR-ход оказался лучше alpha — перепроверяем на полной глубине.
      if (score > alpha && child_depth_max != depth_max) {
        child_depth_max = depth_max;

        score = -searching_negamax_alpha_beta_id_ab(
          -(alpha + 1),
          -alpha,
          chess_board_0x88,
          chess_board_key_64,
          packing_pv_line,
          depth + 1,
          child_depth_max,
          0
        );
      }

      // Если ход попал внутрь окна — нужен полный PV-поиск.
      if (score > alpha && score < beta) {
        score = -searching_negamax_alpha_beta_id_ab(
          -beta,
          -alpha,
          chess_board_0x88,
          chess_board_key_64,
          packing_pv_line,
          depth + 1,
          depth_max,
          1
        );
      }
    }

    // Восстанавливаем позицию и ключ ДО обработки результата.
    chess_board_0x88.set(chess_board_0x88_undo);
    chess_board_key_64[0] = chess_board_key_64_undo[0];

    // Если поиск остановлен, результат больше не обрабатываем.
    if (stop_search == 1) return 0;

    /* --- Обновление лучшей оценки -------------------------------------- */
    if (score > best_score) {
      best_score = score;

      if (is_ab_use == 1) {

        /* --- beta cutoff ------------------------------------------------ */
        if (score >= beta) {

          // History / killer записываем только для тихих ходов.
          if (type_move > CAPTURES_KING_PAWN_ML) {
            if (is_history_heuristic_use_ab == 1) {
              history_good_save_hh(move_i, packing_moves, depth, depth_max);
            }

            if (is_killer_heuristic_use_ab == 1 && depth < MAX_DEPTH_KH) {
              add_move_kh(packing_moves, packing_moves_k1, packing_moves_k2, move_i, depth);
            }
          }

          if (is_TT_use == 1) {
            set_position_in_tt(
              chess_board_key_64,
              packing_moves,
              BETA_CUT_TT,
              score,
              depth,
              depth_max,
              move_i,
              ""
            );
            save_beta_cut_test_tt = save_beta_cut_test_tt + 1;
          }

          return score;
        }

        /* --- улучшение alpha -------------------------------------------- */
        if (score > alpha) {
          alpha = score;

          if (is_TT_use == 1) {
            set_position_in_tt(
              chess_board_key_64,
              packing_moves,
              ALPHA_UPDATE_TT,
              score,
              depth,
              depth_max,
              move_i,
              ""
            );
            save_alpha_up_test_tt = save_alpha_up_test_tt + 1;
          }

          if (isPV == 1) {
            save_pv_line_pv(best_packing_pv_line, packing_pv_line);
            is_update_pv_line = 1;
          }
        }

      } else {
        // Режим без alpha-beta: просто полный перебор.
        if (isPV == 1) {
          save_pv_line_pv(best_packing_pv_line, packing_pv_line);
          is_update_pv_line = 1;
        }
      }
    }
  }

  /* --- 6.12 Возврат лучшей PV-линии ------------------------------------ */
  if (is_update_pv_line == 1) {
    save_pv_line_pv(packing_pv_line, best_packing_pv_line);
  }

  /* --- 6.13 Мат / пат --------------------------------------------------- */
  if (number_move_legal == 0) {
    return no_legal_moves_ab(chess_board_0x88, packing_pv_line, depth);
  }

  return best_score;
};

export {
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
};