// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name pv_line_0x88.js
 * @version created 24.01m.2026 
*/

import {
  s_0x88_to_x07, s_0x88_to_y07,
  LET_COOR,
} from "../move_generator/chess_board_new.js";

import {
  get_type_move, get_from, get_to, get_name_capture_piece,
   return_promo_piece_from_type_move,
   TYPE_MOVE_NAME
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
