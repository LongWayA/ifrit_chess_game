// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name pv_line_0x88.js
 * @version created 24.01m.2026 
*/

import {
  x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
  save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
  IND_MAX, SIDE_TO_MOVE, LET_COOR,
  BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK
} from "../move_generator/chess_board_new.js";

import {
  clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
  sorting_list, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
  return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
  type_move_to_name_piese, type_move_to_name_piese_f, return_promo_piece_from_type_move,
  LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_CAPTURES_MOVE, IND_NUMBER_MOVE,
  IND_PROMO_QUEEN, IND_PROMO_ROOK, IND_PROMO_BISHOP, IND_PROMO_KNIGHT,
  MOVE_NO, CAPTURES_PAWN_QUEEN_PROMO_QUEEN, CAPTURES_PAWN_ROOK_PROMO_QUEEN, CAPTURES_PAWN_BISHOP_PROMO_QUEEN,
  CAPTURES_PAWN_KNIGHT_PROMO_QUEEN, CAPTURES_PAWN_QUEEN_PROMO_ROOK, CAPTURES_PAWN_ROOK_PROMO_ROOK,
  CAPTURES_PAWN_BISHOP_PROMO_ROOK, CAPTURES_PAWN_KNIGHT_PROMO_ROOK, CAPTURES_PAWN_QUEEN_PROMO_BISHOP,
  CAPTURES_PAWN_ROOK_PROMO_BISHOP, CAPTURES_PAWN_BISHOP_PROMO_BISHOP, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP,
  CAPTURES_PAWN_QUEEN_PROMO_KNIGHT, CAPTURES_PAWN_ROOK_PROMO_KNIGHT, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT,
  CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT, MOVE_PAWN_PROMO_QUEEN, MOVE_PAWN_PROMO_ROOK, MOVE_PAWN_PROMO_BISHOP,
  MOVE_PAWN_PROMO_KNIGHT, CAPTURES_PAWN_QUEEN, CAPTURES_PAWN_ROOK, CAPTURES_PAWN_BISHOP, CAPTURES_PAWN_KNIGHT,
  CAPTURES_KNIGHT_QUEEN, CAPTURES_KNIGHT_ROOK, CAPTURES_BISHOP_QUEEN, CAPTURES_BISHOP_ROOK, CAPTURES_ROOK_QUEEN,
  CAPTURES_KNIGHT_BISHOP, CAPTURES_KNIGHT_KNIGHT, CAPTURES_BISHOP_BISHOP, CAPTURES_BISHOP_KNIGHT, CAPTURES_ROOK_ROOK,
  CAPTURES_QUEEN_QUEEN, CAPTURES_ROOK_BISHOP, CAPTURES_ROOK_KNIGHT, CAPTURES_QUEEN_ROOK, CAPTURES_QUEEN_BISHOP,
  CAPTURES_QUEEN_KNIGHT, CAPTURES_KING_QUEEN, CAPTURES_KING_ROOK, CAPTURES_KING_BISHOP, CAPTURES_KING_KNIGHT,
  CAPTURES_PAWN_PAWN, EP_CAPTURES, CAPTURES_KNIGHT_PAWN, CAPTURES_BISHOP_PAWN, CAPTURES_ROOK_PAWN,
  CAPTURES_QUEEN_PAWN, CAPTURES_KING_PAWN, MOVE_QUEEN, MOVE_ROOK, MOVE_BISHOP, MOVE_KNIGHT, MOVE_KING, MOVE_PAWN,
  MOVE_DOUBLE_PAWN, MOVE_KING_CASTLE, MOVE_KING_QUEEN_CASTLE, TYPE_MOVE_NAME
} from "../move_generator/move_list_new.js";

/**
* НАЗНАЧЕНИЕ

let packing_pv_line = new Uint32Array(MAX_DEPTH = 103).fill(MOVE_NO);

101 - type_variant - тип варианта
102 - score_variant - оценка варианта
103 - depth_max - длина варианта
*/


const MAX_DEPTH = 104;

const IND_TYPE_VARIANT = 101;
const IND_SCORE_VARIANT = 102;
const IND_DEPTH = 103;

/**
* очищаем список ходов
* @param {Uint32Array} packing_pv_line
* @returns {void}
*/
const clear_pv_line = function (packing_pv_line) {
  for (let i = 0; i < MAX_DEPTH; i++) {
    packing_pv_line[i] = 0;

  }
}

/**
* @param {number} i_move
* @param {Uint32Array} packing_moves
* @param {Uint32Array} packing_pv_line
* @param {number} depth
* @returns {void}
*/
const add_move_to_pv_line = function (i_move, packing_moves, packing_pv_line, depth) {
  //console.log('Move_list_0x88_С->add_move');
  packing_pv_line[depth] = packing_moves[i_move];
  if (depth > packing_pv_line[IND_DEPTH]) packing_pv_line[IND_DEPTH] = depth;
}

/**
* @param {Uint32Array} packing_pv_line_to
* @param {Uint32Array} packing_pv_line_from
 * @returns {void}
 */
const save_pv_line = function (packing_pv_line_to, packing_pv_line_from) {

  for (let i = 0; i <= MAX_DEPTH; i++) {
    packing_pv_line_to[i] = packing_pv_line_from[i];
  }
}

/**
 * @param {Uint32Array} packing_pv_line
 * @returns {void}
 */
const test_print_pv_line = function (packing_pv_line) {
  let type_move_i;
  let from_i;
  let to_i;
  let name_capture_piece_i;

  let type_variant = packing_pv_line[IND_TYPE_VARIANT];
  let score_variant = packing_pv_line[IND_SCORE_VARIANT];
  let depth_max = packing_pv_line[IND_DEPTH];


  console.log("test_print_list ********");
  for (let i = 0; i <= depth_max; i++) {

    type_move_i = get_type_move(i, packing_pv_line);
    from_i = get_from(i, packing_pv_line);
    to_i = get_to(i, packing_pv_line);
    name_capture_piece_i = get_name_capture_piece(i, packing_pv_line);

    console.log("type_move[" + i + "] = " + type_move_i + " nm = " + TYPE_MOVE_NAME[type_move_i]);
    console.log("from[" + i + "] = " + from_i);
    console.log("to[" + i + "] = " + to_i);
    console.log("name_capture_piece_i[" + i + "] = " + name_capture_piece_i);

    console.log(LET_COOR[s_0x88_to_x07(from_i)] + "" +
      (8 - s_0x88_to_y07(from_i)) + "-" +
      LET_COOR[s_0x88_to_x07(to_i)] + "" +
      (8 - s_0x88_to_y07(to_i)));

    console.log("---- ");
  }

  console.log("type_variant = " + type_variant);
  console.log("score_variant = " + score_variant);
  console.log("depth_max = " + depth_max);
  console.log("*********** test_print_list");
}

/**
 * @param {Uint32Array} packing_pv_line
 * @returns {string}
 */
const pv_line_to_uci_string = function (packing_pv_line) {

  let pv_line_str = "";
  let promo;

  let type_move_i;
  let from_i;
  let to_i;
  let name_capture_piece_i;

  let type_variant = packing_pv_line[IND_TYPE_VARIANT];
  let score_variant = packing_pv_line[IND_SCORE_VARIANT];
  let depth_max = packing_pv_line[IND_DEPTH];

  for (let i = 0; i <= depth_max; i++) {

    type_move_i = get_type_move(i, packing_pv_line);
    from_i = get_from(i, packing_pv_line);
    to_i = get_to(i, packing_pv_line);
    name_capture_piece_i = get_name_capture_piece(i, packing_pv_line);
    promo = return_promo_piece_from_type_move(type_move_i);

    pv_line_str = pv_line_str +
      LET_COOR[s_0x88_to_x07(from_i)] + "" + (8 - s_0x88_to_y07(from_i)) +
      LET_COOR[s_0x88_to_x07(to_i)] + "" + (8 - s_0x88_to_y07(to_i)) + promo + " ";
  }

  return pv_line_str;
}


export {clear_pv_line, add_move_to_pv_line, save_pv_line, test_print_pv_line, pv_line_to_uci_string,
MAX_DEPTH, IND_TYPE_VARIANT, IND_SCORE_VARIANT, IND_DEPTH};
