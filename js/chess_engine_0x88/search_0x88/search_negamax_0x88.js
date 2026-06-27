// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_negamax_0x88.js
 * @version created 16.05m.2026 
 * Code review: Qwen3.7-Max AI
*/

/**
* НАЗНАЧЕНИЕ

*/

import {
  BOARD_SIZE_CB, SIDE_TO_MOVE_CB,
  BLACK_CB, WHITE_CB,
  IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB
} from "../move_generator_0x88/chess_board_0x88.js";

import { do_moves_mm } from "../move_generator_0x88/make_move_0x88.js";

import {
  get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml,
  sorting_list_ml, test_print_list_ml,
  LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
  MOVE_NO_ML
} from "../move_generator_0x88/move_list_0x88.js";

import {
  add_move_to_pv_line_pv, save_pv_line_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV
} from "./pv_line_0x88.js";

import {
  generated_pseudo_legal_captures_mgc, check_detected_mgc
} from "../move_generator_0x88/move_generator_captures_0x88.js";
import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../move_generator_0x88/move_generator_quiet_0x88.js";

import { } from "./evaluate_0x88.js";

import {

} from "../for_sorting_move_0x88/transposition_key_0x88.js";


const MAX_DEPTH_SEARCH = 128;

let packing_moves_stack = new Array(MAX_DEPTH_SEARCH);
let best_packing_pv_line_stack = new Array(MAX_DEPTH_SEARCH);
let chess_board_key_64_undo_stack = new Array(MAX_DEPTH_SEARCH);
let chess_board_save_stack = new Array(MAX_DEPTH_SEARCH);

const ini_stack = function () {

  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {

    packing_moves_stack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    best_packing_pv_line_stack[depth] = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
    chess_board_key_64_undo_stack[depth] = new BigUint64Array(1);
    chess_board_save_stack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
  }
}

let chess_board_key_64_test = new BigUint64Array(1);


const MATE = -30000;
const INIT_EVAL = -40000;// матовая оценка всегда должна обновлять INIT_EVAL 
// и при - и при + на следющей глубине поиска (-30000 > -40000) и (30000 > -40000)

let node_mm = 0;

let chess_board_0x88_end_original = new Int32Array(BOARD_SIZE_CB).fill(0);// доска 0x88 с фигурами;

/**
 * @param {Int32Array} packing_pv_line
 * @param {Int32Array} chess_board_0x88 
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} depth
 * @param {number} depth_max
 * @returns {number}
 */
const searching_negamax = function (packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max) {

  let packing_moves = packing_moves_stack[depth];
  let best_packing_pv_line = best_packing_pv_line_stack[depth];
  const chess_board_key_64_undo = chess_board_key_64_undo_stack[depth];

  let chess_board_save = chess_board_save_stack[depth];

  // ВАЖНО: сбросить счётчик ходов
  packing_moves[IND_NUMBER_MOVE_ML] = 0;
  packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = 0;

  let number_move_legal = 0;// колличество легальных ходов

  let score = 0;// текущая оценка позиции
  let found_score;// максимальная оценка позиции

  let is_moove_legal = -1;

  let type_move;// тип хода
  let from;
  let to;
  let name_capture_piece;
  let piece_color;
  let update_found_score = -1;

  if (depth == 0) node_mm = 0;

  if (depth >= depth_max) {
    //found_score = score_position_e(chess_board_0x88, chess_board_key_64);
    //console.log("searching_minmax->found_score " + found_score);
    found_score = 0;
    node_mm = node_mm + 1;

    // сравниваем ключи сохраненный и измененный

    //set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_test);
    //test_chess_board_key_64_tk(chess_board_key_64_test, chess_board_key_64);

    return found_score;

  }
  //console.log("searching_minmax->depth " + depth);

  found_score = INIT_EVAL;// минимальная стартовая оценка позиции

  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

   if (depth == 0) {

     console.log("searching_negamax -> before sorting_list");

  //   // печатаем в консоль весь список ходов
     test_print_list_ml(packing_moves);

  //   // сортировка списка ходов по типу хода
  //   sorting_list_ml(packing_moves);

  //   console.log("searching_negamax -> after sorting_list");

  //   // печатаем в консоль весь список ходов
  //   test_print_list_ml(packing_moves);
   }


  for (let move_number = 0; move_number < packing_moves[IND_NUMBER_MOVE_ML]; move_number++) {

    type_move = get_type_move_ml(move_number, packing_moves);// тип хода
    from = get_from_ml(move_number, packing_moves);
    to = get_to_ml(move_number, packing_moves);
    name_capture_piece = get_name_capture_piece_ml(move_number, packing_moves);
    piece_color = packing_moves[IND_PIECE_COLOR_ML];

    chess_board_save.set(chess_board_0x88);
    chess_board_key_64_undo[0] = chess_board_key_64[0];

    is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, piece_color);


    if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
      chess_board_0x88.set(chess_board_save);
      chess_board_key_64[0] = chess_board_key_64_undo[0];
      continue;

    } else if (is_moove_legal == 2) {// нелегальные рокировки и взятия короля не генерируются. просто пропускаем ход
      continue;
    }

    add_move_to_pv_line_pv(move_number, packing_moves, packing_pv_line, depth);

    number_move_legal = number_move_legal + 1;

    if (depth == 0) packing_pv_line[IND_TYPE_VARIANT_PV] = 1;

    score = -searching_negamax(packing_pv_line, chess_board_0x88, chess_board_key_64, (depth + 1), depth_max);


    if (score > found_score) {
      found_score = score;
      update_found_score = move_number;
      save_pv_line_pv(best_packing_pv_line, packing_pv_line);
      if (depth == 0) chess_board_0x88_end_original.set(chess_board_0x88);
      //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
    }//if (score > found_score) {

    chess_board_0x88.set(chess_board_save);
    chess_board_key_64[0] = chess_board_key_64_undo[0];


  }//for (let move_number = 0; move_number < move_list_0x88_O.number_move; move_number++) {

  if (update_found_score != -1) save_pv_line_pv(packing_pv_line, best_packing_pv_line);

  //это мат или пат
  if (number_move_legal == 0) {

    let mat = MATE + depth;

    if (chess_board_0x88[SIDE_TO_MOVE_CB] == WHITE_CB) {//

      // ход белых. а ходов нет. это 0 пат, если же белый король под шахом это мат
      if (check_detected_mgc(chess_board_0x88[IND_KING_FROM_WHITE_CB], WHITE_CB, chess_board_0x88) != 0) {

        //console.log("searching_alpha_beta_id_ab-> W chek ");

        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

        return mat;
      }
      packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

      return 0;

    } else {//if (chess_board_0x88_O.side_to_move == 1) {
      //  console.log("Search_0x88_C-> B pat ");
      if (check_detected_mgc(chess_board_0x88[IND_KING_FROM_BLACK_CB], BLACK_CB, chess_board_0x88) != 0) {

        //console.log("searching_alpha_beta_id_ab-> B chek ");

        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;// обхожу ноль. так как на 1 глубине -> depth - 1 = 0

        return mat;
      }

      packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

      return 0;
    }//if (chess_board_0x88_O.side_to_move == 1) {
  }// if (number_move_legal == 0) {

  return found_score;

}//searching_minmax(pv_line_0x88_O, chess_board_0x88,

export { searching_negamax, ini_stack, chess_board_0x88_end_original, node_mm };