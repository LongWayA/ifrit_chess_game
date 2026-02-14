// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_minmax_0x88.js
 * @version created 24.01m.2026 
*/

/**
* НАЗНАЧЕНИЕ

*/

import {
   save_chess_board_0x88, 
   IND_MAX, SIDE_TO_MOVE, WHITE
} from "../move_generator/chess_board_new.js";

import { do_moves_mm } from "../move_generator/make_move_new.js";
import { undo_moves_um } from "../move_generator/unmake_move_new.js";

import { UNDO_MAX } from "../move_generator/undo_new.js";

import {
   get_type_move, get_from, get_to, get_name_capture_piece,
  LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_MOVE,
  MOVE_NO
} from "../move_generator/move_list_new.js";

import { clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV, IND_DEPTH_PV} from "../move_generator/pv_line_new.js";

import { generated_pseudo_legal_captures } from "../move_generator/move_generator_captures_new.js";
import { generated_pseudo_legal_quiet_moves } from "../move_generator/move_generator_quiet_new.js";

import { score_position } from "./evaluate_new.js";



const BEST_VALUE_MOD = 20000;

let node_mm = 0;

let chess_board_0x88_end_original = new Uint8Array(IND_MAX).fill(0);// доска 0x88 с фигурами;

/**
 * @param {Uint32Array} packing_pv_line
 * @param {Uint8Array} chess_board_0x88 
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} depth
 * @param {number} depth_max
 * @returns {number}
 */
const searching_minmax = function (packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max) {

  let undo = new Uint8Array(UNDO_MAX).fill(0);

  let best_packing_pv_line = new Uint32Array(MAX_DEPTH_PV).fill(MOVE_NO);

  let score = 0;// текущая оценка позиции
  let found_score;// максимальная оценка позиции

  let is_moove_legal = -1;

  let packing_moves = new Uint32Array(LENGTH_LIST).fill(MOVE_NO);

  const chess_board_key_64_undo = new BigUint64Array(1);

  let type_move;// тип хода
  let from;
  let to;
  let name_capture_piece;
  let piece_color;
  let i_move = -1;

   //TEST
   //test_print_piese_0x88(chess_board_0x88);
   //test_print_any_0x88(chess_board_0x88);

  if (depth == 0) node_mm = 0;

  if (depth >= depth_max) {
    found_score = score_position(chess_board_0x88, chess_board_key_64);
    //console.log("searching_minmax->found_score " + found_score);
    //found_score = 0;
    node_mm = node_mm + 1;

  } else {
    //console.log("searching_minmax->depth " + depth);

    if (chess_board_0x88[SIDE_TO_MOVE] == WHITE) {
      found_score = -BEST_VALUE_MOD;// максимальная оценка позиции
    } else {
      found_score = BEST_VALUE_MOD;// максимальная оценка позиции
    }

    generated_pseudo_legal_captures(chess_board_0x88, packing_moves);
    generated_pseudo_legal_quiet_moves(chess_board_0x88, packing_moves);

    //test_print_list(packing_moves);

    for (let move_i = 0; move_i < packing_moves[IND_NUMBER_MOVE]; move_i++) {

      type_move = get_type_move(move_i, packing_moves);// тип хода
      from = get_from(move_i, packing_moves);
      to = get_to(move_i, packing_moves);
      name_capture_piece = get_name_capture_piece(move_i, packing_moves);
      piece_color = packing_moves[IND_PIESE_COLOR];

      is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, piece_color);

      if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
        undo_moves_um(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, name_capture_piece, piece_color);
        continue;
      } else if (is_moove_legal == 2) {// нелегальные рокировки и взятия короля не генерируются. просто пропускаем ход
        continue;
      }

      add_move_to_pv_line_pv(move_i, packing_moves, packing_pv_line, depth);

      //pv_line_0x88_O.add_move(move_i, packing_moves, depth);
      if (depth == 0) packing_pv_line[IND_TYPE_VARIANT_PV] = 1;

      score = searching_minmax(packing_pv_line, chess_board_0x88, chess_board_key_64, (depth + 1), depth_max);

      if (packing_moves[IND_PIESE_COLOR] == WHITE) {

        if (score > found_score) {
          found_score = score;
          i_move = move_i;
          save_pv_line_pv(best_packing_pv_line, packing_pv_line);
          if (depth == 0) save_chess_board_0x88(chess_board_0x88_end_original, chess_board_0x88);
          //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
        }//if (score > found_score) {

      } else {

        if (score < found_score) {
          found_score = score;
          i_move = move_i;
          save_pv_line_pv(best_packing_pv_line, packing_pv_line);
          if (depth == 0) save_chess_board_0x88(chess_board_0x88_end_original, chess_board_0x88);
          //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
        }//if (score > found_score) {

      }

      undo_moves_um(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, name_capture_piece, piece_color);

    }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

   if(i_move != -1) save_pv_line_pv(packing_pv_line, best_packing_pv_line);
  }//if (depth >= depth_max) {

  return found_score;
}//searching_minmax(pv_line_0x88_O, chess_board_0x88,

export { searching_minmax, chess_board_0x88_end_original, node_mm };

/*
int negaMax( int depth ) {
    if ( depth == 0 ) return evaluate();
    int max = -oo;
    for ( all moves)  {
        score = -negaMax( depth - 1 );
        if( score > max )
            max = score;
    }
    return max;
}
*/