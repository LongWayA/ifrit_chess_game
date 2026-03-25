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
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piese_0x88_cb, test_print_piese_color_0x88_cb, test_print_piese_in_line_0x88_cb, 
    test_compare_chess_board_0x88_cb,save_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb, 
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    IND_MAX_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB, 
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB, 
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB,  SQUARE_128_to_64_CB
} from "../move_generator_0x88/chess_board_0x88.js";

import { do_moves_mm } from "../move_generator_0x88/make_move_0x88.js";
import { undo_moves_um } from "../move_generator_0x88/unmake_move_0x88.js";

import { UNDO_MAX } from "../move_generator_0x88/undo_0x88.js";

import {
    clear_list_ml, add_packing_move_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml, set_color_ml, 
    set_number_captures_move_ml, sorting_list_ml, test_compare_list_from_ml, test_print_i_move_list_ml, test_print_list_ml, 
    save_list_from_ml, move_is_found_ml, return_i_move_ml, move_to_string_uci_ml, return_type_captures_pawn_promo_ml, 
    return_type_simple_move_ml, type_move_to_name_piese_ml, type_move_to_name_piese_f_ml, return_promo_piece_from_type_move_ml, 
    set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml,
    LENGTH_LIST_ML, IND_PIESE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    IND_PROMO_QUEEN_ML, IND_PROMO_ROOK_ML, IND_PROMO_BISHOP_ML, IND_PROMO_KNIGHT_ML,
    MOVE_NO_ML, CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML, CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML, CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML, CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML, CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML, CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML, CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML, CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML, MOVE_PAWN_PROMO_QUEEN_ML, MOVE_PAWN_PROMO_ROOK_ML, MOVE_PAWN_PROMO_BISHOP_ML,
    MOVE_PAWN_PROMO_KNIGHT_ML, CAPTURES_PAWN_QUEEN_ML, CAPTURES_PAWN_ROOK_ML, CAPTURES_PAWN_BISHOP_ML, CAPTURES_PAWN_KNIGHT_ML,
    CAPTURES_KNIGHT_QUEEN_ML, CAPTURES_KNIGHT_ROOK_ML, CAPTURES_BISHOP_QUEEN_ML, CAPTURES_BISHOP_ROOK_ML, CAPTURES_ROOK_QUEEN_ML,
    CAPTURES_KNIGHT_BISHOP_ML, CAPTURES_KNIGHT_KNIGHT_ML, CAPTURES_BISHOP_BISHOP_ML, CAPTURES_BISHOP_KNIGHT_ML, CAPTURES_ROOK_ROOK_ML,
    CAPTURES_QUEEN_QUEEN_ML, CAPTURES_ROOK_BISHOP_ML, CAPTURES_ROOK_KNIGHT_ML, CAPTURES_QUEEN_ROOK_ML, CAPTURES_QUEEN_BISHOP_ML,
    CAPTURES_QUEEN_KNIGHT_ML, CAPTURES_KING_QUEEN_ML, CAPTURES_KING_ROOK_ML, CAPTURES_KING_BISHOP_ML, CAPTURES_KING_KNIGHT_ML,
    CAPTURES_PAWN_PAWN_ML, EP_CAPTURES_ML, CAPTURES_KNIGHT_PAWN_ML, CAPTURES_BISHOP_PAWN_ML, CAPTURES_ROOK_PAWN_ML,
    CAPTURES_QUEEN_PAWN_ML, CAPTURES_KING_PAWN_ML, MOVE_QUEEN_ML, MOVE_ROOK_ML, MOVE_BISHOP_ML, MOVE_KNIGHT_ML, MOVE_KING_ML, MOVE_PAWN_ML,
    MOVE_DOUBLE_PAWN_ML, MOVE_KING_CASTLE_ML, MOVE_KING_QUEEN_CASTLE_ML, TYPE_MOVE_NAME_ML
} from "../move_generator_0x88/move_list_0x88.js";

import { clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV, IND_DEPTH_PV} from "../move_generator_0x88/pv_line_0x88.js";

import { generated_pseudo_legal_captures } from "../move_generator_0x88/move_generator_captures_0x88.js";
import { generated_pseudo_legal_quiet_moves } from "../move_generator_0x88/move_generator_quiet_0x88.js";

import { score_position } from "./evaluate_0x88.js";



const BEST_VALUE_MOD = 20000;

let node_mm = 0;

let chess_board_0x88_end_original = new Int32Array(IND_MAX_CB).fill(0);// доска 0x88 с фигурами;

/**
 * @param {Int32Array} packing_pv_line
 * @param {Int32Array} chess_board_0x88 
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} depth
 * @param {number} depth_max
 * @returns {number}
 */
const searching_minmax = function (packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max) {

  let undo = new Int32Array(UNDO_MAX).fill(0);

  let best_packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);

  let score = 0;// текущая оценка позиции
  let found_score;// максимальная оценка позиции

  let is_moove_legal = -1;

  let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

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

    if (chess_board_0x88[SIDE_TO_MOVE_CB] == WHITE_CB) {
      found_score = -BEST_VALUE_MOD;// максимальная оценка позиции
    } else {
      found_score = BEST_VALUE_MOD;// максимальная оценка позиции
    }

    generated_pseudo_legal_captures(chess_board_0x88, packing_moves);
    generated_pseudo_legal_quiet_moves(chess_board_0x88, packing_moves);

    //test_print_list(packing_moves);

    for (let move_i = 0; move_i < packing_moves[IND_NUMBER_MOVE_ML]; move_i++) {

      type_move = get_type_move_ml(move_i, packing_moves);// тип хода
      from = get_from_ml(move_i, packing_moves);
      to = get_to_ml(move_i, packing_moves);
      name_capture_piece = get_name_capture_piece_ml(move_i, packing_moves);
      piece_color = packing_moves[IND_PIESE_COLOR_ML];

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

      if (packing_moves[IND_PIESE_COLOR_ML] == WHITE_CB) {

        if (score > found_score) {
          found_score = score;
          i_move = move_i;
          save_pv_line_pv(best_packing_pv_line, packing_pv_line);
          if (depth == 0) save_chess_board_0x88_cb(chess_board_0x88_end_original, chess_board_0x88);
          //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
        }//if (score > found_score) {

      } else {

        if (score < found_score) {
          found_score = score;
          i_move = move_i;
          save_pv_line_pv(best_packing_pv_line, packing_pv_line);
          if (depth == 0) save_chess_board_0x88_cb(chess_board_0x88_end_original, chess_board_0x88);
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