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

import { Chess_board_0x88_C } from "../move_generator/chess_board_0x88.js";

import {
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88,
  test_compare_chess_board_0x88, save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88,
  searching_king, iniStartPositionForWhite, IND_MAX, SIDE_TO_MOVE, WHITE
} from "../move_generator/chess_board_new.js";

import { do_moves } from "../move_generator/make_move_new.js";
import { undo_moves } from "../move_generator/unmake_move_new.js";

import {  set_undo, get_undo, UNDO_MAX } from "../move_generator/undo_new.js";

//import { Move_list_0x88_С } from "../move_generator/move_list_new.js";
import { Move_list_0x88_С } from "../move_generator/move_list_0x88.js";

//import { Evaluate_0x88_C } from "./evaluate_0x88.js";

import { PV_line_0x88_C } from "../move_generator/pv_line_new.js";

import {generated_pseudo_legal_captures} from "../move_generator/move_generator_captures_new.js";
import {generated_pseudo_legal_quiet_moves} from "../move_generator/move_generator_quiet_new.js";

//  const evaluate_0x88_O = new Evaluate_0x88_C();

let chess_board_0x88_test = new Chess_board_0x88_C();


const BEST_VALUE_MOD = 20000;

let node_mm = 0;

let chess_board_0x88_end_original = new Uint8Array(IND_MAX).fill(0);// доска 0x88 с фигурами;

/**
 * @param {PV_line_0x88_C} pv_line_0x88_O 
 * @param {Uint8Array} chess_board_0x88 
 * @param {number} depth
 * @param {number} depth_max
 * @returns {number}
 */
const searching_minmax = function (pv_line_0x88_O, chess_board_0x88, depth, depth_max) {

  let undo = new Uint8Array(UNDO_MAX).fill(0);

  let best_node_line_0x88_O = new PV_line_0x88_C();

  let score = 0;// текущая оценка позиции
  let found_score;// максимальная оценка позиции

  // test_print_piese_in_line_0x88(chess_board_0x88);
  // test_print_piese_0x88(chess_board_0x88);
  // test_print_piese_color_0x88(chess_board_0x88);
  // test_print_any_0x88(chess_board_0x88);

  if (depth == 0) node_mm = 0;

  if (depth >= depth_max) {
    //found_score = evaluate_0x88_O.score_position(chess_board_0x88);
    found_score = 0;
    node_mm = node_mm + 1;
    pv_line_0x88_O.score_depth_max = found_score;

  } else {
    //console.log("Search_0x88_C->depth " + depth);
    let is_moove_legal = -1;
    let move_list_0x88_O = new Move_list_0x88_С();
    move_list_0x88_O.iniM();

    if (chess_board_0x88[SIDE_TO_MOVE] == WHITE) {
      found_score = -BEST_VALUE_MOD;// максимальная оценка позиции
    } else {
      found_score = BEST_VALUE_MOD;// максимальная оценка позиции
    }

    generated_pseudo_legal_captures(chess_board_0x88, move_list_0x88_O);
    generated_pseudo_legal_quiet_moves(chess_board_0x88, move_list_0x88_O);

    //move_list_0x88_O.sorting_list(); 
    //move_list_0x88_O.test_print_list(chess_board_0x88_test);

    for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      is_moove_legal = do_moves(move_i, chess_board_0x88, move_list_0x88_O, undo);

      if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
        undo_moves(move_i, chess_board_0x88, move_list_0x88_O, undo);
        continue;
      } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
        continue;
      }

      pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
      pv_line_0x88_O.type_variant[depth] = "nm";

      score = searching_minmax(pv_line_0x88_O, chess_board_0x88, (depth + 1), depth_max);

      if (move_list_0x88_O.piece_color == WHITE) {

        if (score > found_score) {
          found_score = score;
          best_node_line_0x88_O.save_list(pv_line_0x88_O);
          best_node_line_0x88_O.type_variant[depth] = "mm_M";

          if (depth == 0) save_chess_board_0x88(chess_board_0x88_end_original, chess_board_0x88);
          //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
        }//if (score > found_score) {

      } else {

        if (score < found_score) {
          found_score = score;
          best_node_line_0x88_O.save_list(pv_line_0x88_O);
          best_node_line_0x88_O.type_variant[depth] = "mm_B";

          if (depth == 0) save_chess_board_0x88(chess_board_0x88_end_original, chess_board_0x88);
          //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
        }//if (score > found_score) {

      }

      undo_moves(move_i, chess_board_0x88, move_list_0x88_O, undo);

    }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

    pv_line_0x88_O.save_list(best_node_line_0x88_O);
  }//if (depth >= depth_max) {

  return found_score;
}//searching_negamax(pv_line_0x88_O, chess_board_0x88,

export { searching_minmax, chess_board_0x88_end_original, node_mm};

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