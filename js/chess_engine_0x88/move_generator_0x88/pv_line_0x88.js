// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name pv_line_0x88.js
 * @version created 24.01m.2026 
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
} from "./chess_board_0x88.js";

import {
    clear_list_ml, add_packing_move_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml, set_color_ml, 
    set_number_captures_move_ml, sorting_list_ml, test_compare_list_from_ml, test_print_i_move_list_ml, test_print_list_ml, 
    save_list_from_ml, move_is_found_ml, return_i_move_ml, move_to_string_uci_ml, return_type_captures_pawn_promo_ml, 
    return_type_simple_move_ml, type_move_to_name_piese_ml, type_move_to_name_piese_f_ml, return_promo_piece_from_type_move_ml, 
    set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml,
  TYPE_MOVE_NAME_ML
} from "./move_list_0x88.js";

/**
* НАЗНАЧЕНИЕ

let packing_pv_line = new Int32Array(MAX_DEPTH = 103).fill(MOVE_NO);

101 - type_variant - тип варианта
102 - score_variant - оценка варианта
103 - depth_max - длина варианта
*/


const MAX_DEPTH_PV = 104;

const IND_TYPE_VARIANT_PV = 101;
const IND_DEPTH_MAT_PV = 102;
const IND_DEPTH_PV = 103;

/**
* очищаем список ходов
* @param {Int32Array} packing_pv_line
* @returns {void}
*/
const clear_pv_line_pv = function (packing_pv_line) {
  for (let i = 0; i < MAX_DEPTH_PV; i++) {
    packing_pv_line[i] = 0;
  }
}

/**
* @param {number} i_move
* @param {Int32Array} packing_moves
* @param {Int32Array} packing_pv_line
* @param {number} depth
* @returns {void}
*/
const add_move_to_pv_line_pv = function (i_move, packing_moves, packing_pv_line, depth) {
  //console.log('Move_list_0x88_С->add_move');
  packing_pv_line[depth] = packing_moves[i_move];
  if (depth > packing_pv_line[IND_DEPTH_PV]) packing_pv_line[IND_DEPTH_PV] = depth;
}

/**
* @param {Int32Array} packing_pv_line_to
* @param {Int32Array} packing_pv_line_from
 * @returns {void}
 */
const save_pv_line_pv = function (packing_pv_line_to, packing_pv_line_from) {

  let depth_max = packing_pv_line_from[IND_DEPTH_PV];

  for (let i = 0; i <= depth_max; i++) {
    packing_pv_line_to[i] = packing_pv_line_from[i];
  }

  packing_pv_line_to[IND_DEPTH_PV] = packing_pv_line_from[IND_DEPTH_PV];
  packing_pv_line_to[IND_TYPE_VARIANT_PV] = packing_pv_line_from[IND_TYPE_VARIANT_PV];
  packing_pv_line_to[IND_DEPTH_MAT_PV] = packing_pv_line_from[IND_DEPTH_MAT_PV];
}

/**
 * @param {Int32Array} packing_pv_line
 * @returns {void}
 */
const test_print_pv_line_pv = function (packing_pv_line) {
  let type_move_i;
  let from_i;
  let to_i;
  let name_capture_piece_i;

  let type_variant = packing_pv_line[IND_TYPE_VARIANT_PV];
  let score_variant = packing_pv_line[IND_DEPTH_MAT_PV];
  let depth_max = packing_pv_line[IND_DEPTH_PV];


  console.log("test_print_list ********");
  for (let i = 0; i <= depth_max; i++) {

    type_move_i = get_type_move_ml(i, packing_pv_line);
    from_i = get_from_ml(i, packing_pv_line);
    to_i = get_to_ml(i, packing_pv_line);
    name_capture_piece_i = get_name_capture_piece_ml(i, packing_pv_line);

    console.log("type_move[" + i + "] = " + type_move_i + " nm = " + TYPE_MOVE_NAME_ML[type_move_i]);
    console.log("from[" + i + "] = " + from_i);
    console.log("to[" + i + "] = " + to_i);
    console.log("name_capture_piece_i[" + i + "] = " + name_capture_piece_i);

    console.log(LET_COOR_CB[s_0x88_to_x07_cb(from_i)] + "" +
      (8 - s_0x88_to_y07_cb(from_i)) + "-" +
      LET_COOR_CB[s_0x88_to_x07_cb(to_i)] + "" +
      (8 - s_0x88_to_y07_cb(to_i)));

    console.log("---- ");
  }

  console.log("type_variant = " + type_variant);
  console.log("score_variant = " + score_variant);
  console.log("depth_max = " + depth_max);
  console.log("*********** test_print_list");
}

/**
 * @param {Int32Array} packing_pv_line
 * @param {number} mat
 * @returns {string}
 */
const pv_line_to_uci_string_pv = function (packing_pv_line, mat) {

  let pv_line_str = "";
  let promo;

  let type_move_i;
  let from_i;
  let to_i;
  let name_capture_piece_i;

  let type_variant = packing_pv_line[IND_TYPE_VARIANT_PV];
  let depth_mat = packing_pv_line[IND_DEPTH_MAT_PV];
  let depth_max = packing_pv_line[IND_DEPTH_PV];

  if (depth_mat != 0) {
    if ((mat > 9000) || (mat < -9000)) {
      depth_max = depth_mat - 500;// обхожу ноль. так как на 1 глубине -> depth - 1 = 0
    }
  }

  for (let i = 0; i <= depth_max; i++) {

    type_move_i = get_type_move_ml(i, packing_pv_line);
    from_i = get_from_ml(i, packing_pv_line);
    to_i = get_to_ml(i, packing_pv_line);
    name_capture_piece_i = get_name_capture_piece_ml(i, packing_pv_line);
    promo = return_promo_piece_from_type_move_ml(type_move_i);

    pv_line_str = pv_line_str +
      LET_COOR_CB[s_0x88_to_x07_cb(from_i)] + "" + (8 - s_0x88_to_y07_cb(from_i)) +
      LET_COOR_CB[s_0x88_to_x07_cb(to_i)] + "" + (8 - s_0x88_to_y07_cb(to_i)) + promo + " ";
  }

  return pv_line_str;
}


export {
  clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV, IND_DEPTH_PV
};
