// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_negamax_0x88.js
 * @version created 16.05m.2026 (High-Speed V8 Optimized)
*/

import {
  BOARD_SIZE_CB, SIDE_TO_MOVE_CB,
  BLACK_CB, WHITE_CB,
  IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_list_ml, get_type_move_ml, get_from_ml, get_to_ml,
  LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_MOVE_ML,
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
import { score_position_e } from "../evaluate_0x88/evaluate_0x88.js";

const MAX_DEPTH_SEARCH = 129;

// Преаллоцированные стеки (оставляем только то, что реально нужно в бою)
const chess_board_undo_stack = new Array(MAX_DEPTH_SEARCH);
const packing_moves_stack = new Array(MAX_DEPTH_SEARCH);
const best_packing_pv_line_stack = new Array(MAX_DEPTH_SEARCH);

// Буфер для тестовой позиции (обновляем только при реальном улучшении на depth === 0)
const chess_board_0x88_found_best_score = new Int32Array(BOARD_SIZE_CB).fill(0);

const ini_stack = function () {
  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {
    chess_board_undo_stack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
    packing_moves_stack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    best_packing_pv_line_stack[depth] = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
  }
};

const MATE = -30000;
const INIT_EVAL = -40000;

let node_mm = 0;

/**
 * Оптимизированный поиск Negamax (0x88)
 * 
 * @param {Int32Array} chess_board_0x88 - позиция
 * @param {Int32Array} chess_board_0x88_score - позиция (оставлено для совместимости сигнатуры)
 * @param {BigUint64Array} chess_board_key_64 - зобрист ключ позиции
 * @param {Int32Array} packing_pv_line - линия варианта лучшая на данный момент
 * @param {number} depth - текущая глубина поиска
 * @param {number} depth_max - максимальная глубина поиска
 * @returns {number} - оценка позиции
 */
const searching_negamax = function (
  chess_board_0x88,
  chess_board_0x88_score,
  chess_board_key_64,
  packing_pv_line,
  depth,
  depth_max
) {
  if (depth === 0) {
    node_mm = 0;
  }

  // 1. БЫСТРЫЙ ВЫХОД НА ЛИСТЬЯХ: убрали пересчет Зобрист-ключа и копирование доски 4.8 млн раз
  if (depth >= depth_max) {
    node_mm++;
    return score_position_e(chess_board_0x88);
  }

  // Берем ссылки на стеки текущего уровня один раз до цикла
  const chess_board_undo = chess_board_undo_stack[depth];
  const packing_moves = packing_moves_stack[depth];
  const best_packing_pv_line = best_packing_pv_line_stack[depth];

  // Сохраняем Зобрист-ключ в локальную переменную (быстрее, чем обращение к стековому массиву BigUint64Array)
  const key_64_undo = chess_board_key_64[0];

  // Сбрасываем и генерируем ходы
  clear_list_ml(packing_moves);
  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

  // Выносим чтение из массива за пределы цикла for (инварианты цикла)
  const total_moves = packing_moves[IND_NUMBER_MOVE_ML];
  const piece_color = packing_moves[IND_PIECE_COLOR_ML];
  const next_depth = depth + 1;

  let found_score = INIT_EVAL;
  let has_improved = false;
  let number_move_legal = 0;

  for (let move_number = 0; move_number < total_moves; move_number++) {
    const type_move = get_type_move_ml(move_number, packing_moves);
    const from = get_from_ml(move_number, packing_moves);
    const to = get_to_ml(move_number, packing_moves);

    // Копируем доску перед ходом
    chess_board_undo.set(chess_board_0x88);

    // Делаем ход
    const is_move_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, piece_color);

    // Если ход нелегальный (0 - шах, 2 - нелегальная рокировка)
    if (is_move_legal !== 1) {
      if (is_move_legal === 0) {
        chess_board_0x88.set(chess_board_undo);
        chess_board_key_64[0] = key_64_undo;
      }
      continue;
    }

    add_move_to_pv_line_pv(move_number, packing_moves, packing_pv_line, depth);
    number_move_legal++;

    const score = -searching_negamax(
      chess_board_0x88,
      chess_board_0x88_score,
      chess_board_key_64,
      packing_pv_line,
      next_depth,
      depth_max
    );

    if (score > found_score) {
      found_score = score;
      has_improved = true;
      save_pv_line_pv(best_packing_pv_line, packing_pv_line);

      if (depth === 0) {
        chess_board_0x88_found_best_score.set(chess_board_0x88);
      }
    }

    // Откатываем позицию и ключ из быстрых локальных ссылок
    chess_board_0x88.set(chess_board_undo);
    chess_board_key_64[0] = key_64_undo;
  }

  if (has_improved) {
    save_pv_line_pv(packing_pv_line, best_packing_pv_line);
  }

  // Проверка на мат или пат (если не было ни одного легального хода)
  if (number_move_legal === 0) {
    if (depth === 0) {
      chess_board_0x88_found_best_score.set(chess_board_0x88);
    }

    packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

    const side = chess_board_0x88[SIDE_TO_MOVE_CB];
    const king_sq = side === WHITE_CB
      ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
      : chess_board_0x88[IND_KING_FROM_BLACK_CB];

    if (check_detected_mgc(king_sq, side, chess_board_0x88) !== 0) {
      return MATE + depth;
    }

    return 0;
  }

  return found_score;
};

export { searching_negamax, ini_stack, chess_board_0x88_found_best_score, node_mm };
