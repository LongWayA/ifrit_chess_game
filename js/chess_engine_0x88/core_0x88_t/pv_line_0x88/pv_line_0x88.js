// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name pv_line_0x88.js
 * @version created 24.01m.2026 
*/

import {
    s_0x88_to_x07_cb, s_0x88_to_y07_cb, chessPieces,
    LET_COOR_CB
} from "../chess_board_0x88_t/chess_board_0x88.js";

import {
    get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml,
    return_promo_piece_from_type_move_ml,
    TYPE_MOVE_NAME_ML
} from "../move_list_0x88_t/move_list_0x88.js";

/**
* НАЗНАЧЕНИЕ

let packing_pv_line = new Int32Array(MAX_DEPTH_PV = 104).fill(MOVE_NO);

вариант не может быть больше 101 ход т.е. индекс до 100 это возможные ходы
101 - type_variant - тип варианта. это я уже не помню что такое и вроде не использую
102 - детектор мата и пата по типу depth - 1 + 500 пишем глубину последнего хода 
так как на глубине обнаружения мата ходов не было то depth - 1,
 + 500 что бы не было нуля на глубине 1 так как 0 это отсутствие мата или пата
103 - depth_max - максимальная глубина записи хода
*/


const MAX_DEPTH_PV = 104;// размер массива. до 103 глубины. причем 101,102,103 используем

const IND_DEPTH_PV = 101; // сюда пишем глубину записи если она больше уже записанной. 
                          // т.е. это последняя глубина записанного хода, а не колличество записанных ходов

const IND_DEPTH_MAT_PV = 102;// записываем детектор мата по типу depth - 1 + 500, если не 0 то случай мата или пата 
const IND_TYPE_VARIANT_PV = 103;// кое где пишу но зачем уже не помню. похоже не использую

/**
* очищаем список ходов
* @param {Int32Array} packing_pv_line
* @returns {void}
*/
const clear_pv_line_pv = (packing_pv_line) => {
  for (let i = 0; i < MAX_DEPTH_PV; i++) {
    packing_pv_line[i] = 0;
  }
  packing_pv_line[IND_TYPE_VARIANT_PV] = 0;
  packing_pv_line[IND_DEPTH_MAT_PV] = 0;
  packing_pv_line[IND_DEPTH_PV] = 0;
}

/**
* добавляем ход из списка ходов в линию варианта(тоже списко ходов только по глубине)
* @param {number} i_move
* @param {Int32Array} packing_moves
* @param {Int32Array} packing_pv_line
* @param {number} depth
* @returns {void}
*/
const add_move_to_pv_line_pv = (i_move, packing_moves, packing_pv_line, depth) => {
  //console.log('Move_list_0x88_С->add_move');
  packing_pv_line[depth] = packing_moves[i_move];
  if (depth > packing_pv_line[IND_DEPTH_PV]) packing_pv_line[IND_DEPTH_PV] = depth;
}

/**
* @param {Int32Array} packing_pv_line_to
* @param {Int32Array} packing_pv_line_from
 * @returns {void}
 */
const save_pv_line_pv = (packing_pv_line_to, packing_pv_line_from) => {

  let depth_max = packing_pv_line_from[IND_DEPTH_PV];

  for (let i = 0; i <= depth_max; i++) { // <= а не < существенно
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
const test_print_pv_line_pv = (packing_pv_line) => {
  let type_move_i;
  let from_i;
  let to_i;
  let name_capture_piece_i;

  let type_variant = packing_pv_line[IND_TYPE_VARIANT_PV];
  let depth_mat = packing_pv_line[IND_DEPTH_MAT_PV];
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
// score_variant
  console.log("type_variant = " + type_variant);
  console.log("depth_mat = " + depth_mat);
  console.log("depth_max = " + depth_max);
  console.log("*********** test_print_list");
}

/**
 * @param {Int32Array} packing_pv_line
 * @param {number} mat
 * @returns {string}
 */
const pv_line_to_uci_string_pv = (packing_pv_line, mat) => {

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

// /** @type {Record<number, string>} */
// const chessPieces = {

//     0: '\u3000', // Специальный широкий пробел

//     // Белые фигуры
//     1: '♙', // Пешка
//     2: '♘', // Конь
//     3: '♗', // Слон
//     4: '♖', // Ладья
//     5: '♕', // Ферзь
//     6: '♔', // Король

//     // Черные фигуры
//      9: '♟', // Пешка
//     10: '♞', // Конь
//     11: '♝', // Слон
//     12: '♜', // Ладья
//     13: '♛', // Ферзь
//     14: '♚' // Король
// };


export {
  clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV, IND_DEPTH_PV
};
