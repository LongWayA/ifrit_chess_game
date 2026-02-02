// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name history_heuristic_0x88.js
 * @version created 01.02m.2026
*/

import {
  x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
  save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
  IND_MAX, SIDE_TO_MOVE, LET_COOR,
  BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK,
  SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
} from "../move_generator/chess_board_new.js";

import {
  clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
  sorting_list_ml, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
  return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
  type_move_to_name_piese, type_move_to_name_piese_f, return_promo_piece_from_type_move, set_move_after_the_captures_ml,
  sorting_list_history_heuristic_ml,
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
 Мне кажется, что это дальнейшее обобщение killer heuristic

 Заполняем массив history[color][from][to]
 количество ячеек 2 * 64 * 64 = 8_192
 значениями вида (depth_max - depth) * (depth_max - depth)
 таким образом, что если ход вызвал отсечку по альфе или бете то 
 history[color][from][to] = history[color][from][to] + (depth_max - depth) * (depth_max - depth);
 Максимальное значение сейчас 100_000. если оно превышено то все значения делим на 2.
 Взятия мы не пишем.

*/


// тут все на 1 больше последней позиции потому что есть 0
const MAX_COLOR_HH = 2;
const MAX_COORDINATE_HH = 64;
const MAX_HISTORY_HH = 100_000;

let history = new Array(MAX_COLOR_HH);  // [цвет фигуры][поле откуда фигура ходит][поле куда фигура ходит]


const get_history_hh = function () {
  return history;
}


// создаем трехмерный массив color, from, to
const ini_Array_hh = function () {
  for (let color = 0; color < MAX_COLOR_HH; color++) {
    history[color] = new Array(MAX_COORDINATE_HH);
    for (let from = 0; from < MAX_COORDINATE_HH; from++) {
      history[color][from] = new Int32Array(MAX_COORDINATE_HH);
    }
  }
  clear_history_hh();
}

// очищаем историю
const clear_history_hh = function () {
  //let g = 0;
  for (let color = 0; color < MAX_COLOR_HH; color++) {
    for (let from = 0; from < MAX_COORDINATE_HH; from++) {
      for (let to = 0; to < MAX_COORDINATE_HH; to++) {
        //g = g + 1;
        history[color][from][to] = 0;//-1 g
      }
    }
  }
}

// 
const ini_test_history_hh = function () {// 64
  for (let color = 0; color < MAX_COLOR_HH; color++) {
    for (let from = 0; from < MAX_COORDINATE_HH; from++) {
      for (let to = 0; to < MAX_COORDINATE_HH; to++) {

        history[color][from][to] = 100 * from + to;//
      }
    }
  }
}


// 
/** записываем хороший ход
* @param {number} move_i
* @param {Uint32Array} packing_moves
* @param {number} depth
* @param {number} depth_max
* @returns {void}
*/
const history_good_save_hh = function (move_i, packing_moves, depth, depth_max) {

  let delta_depth = depth_max - depth;

  // преобразование Chess_board_0x88_C.SQUARE_128_to_64[] переводит 128-клеточную доску в 64-клеточную 
  // так как нам в масиве не нужны 64 дополнительные неиспользуемые в данном случае клетки. 
  // напомню что 128 клеточная доска нужна что бы в одну операцию (SquareIndex & 0x88 == 0 - мы еще на доске) 
  // оперделять выход за пределы доски

  let color = packing_moves[IND_PIESE_COLOR];
  let from_128 = get_from(move_i, packing_moves);
  let to_128 = get_to(move_i, packing_moves);


  let from_64 = SQUARE_128_to_64_CB[from_128];
  let to_64 = SQUARE_128_to_64_CB[to_128];

  history[color][from_64][to_64] = history[color][from_64][to_64] + delta_depth * delta_depth;

  // console.log("History_heuristic_0x88_C-> from_64 " + from_64 + " to_64 " + to_64 + " color " + color);
  // console.log("History_heuristic_0x88_C-> history " + history[color][from_64][to_64]);    

  // если запись в ячейку истории превысила лимит все делим на два  
  if (history[color][from_64][to_64] > MAX_HISTORY_HH) {

    for (let color = 0; color < MAX_COLOR_HH; color++) {
      for (let from = 0; from < MAX_COORDINATE_HH; from++) {
        for (let to = 0; to < MAX_COORDINATE_HH; to++) {
          history[color][from][to] = history[color][from][to] / 2;
        }
      }
    }
  }
}

// записываем плохой ход
/**
* @param {number} color
* @param {number} from_128
* @param {number} to_128
* @param {number} depth
* @param {number} depth_max
* @returns {void}
*/
const history_bad_save_hh = function (color, from_128, to_128, depth, depth_max) {

  let delta_depth = depth_max - depth;

  // преобразование Chess_board_0x88_C.SQUARE_128_to_64[] переводит 128-клеточную доску в 64-клеточную 
  // так как нам в масиве не нужны 64 дополнительные неиспользуемые в данном случае клетки. 
  // напомню что 128 клеточная доска нужна что бы в одну операцию (SquareIndex & 0x88 == 0 - мы еще на доске) 
  // оперделять выход за пределы доски

  let from_64 = SQUARE_128_to_64_CB[from_128];
  let to_64 = SQUARE_128_to_64_CB[to_128];

  history[color][from_64][to_64] = history[color][from_64][to_64] - delta_depth * delta_depth;

  // console.log("History_heuristic_0x88_C-> from_64 " + from_64 + " to_64 " + to_64 + " color " + color);
  // console.log("History_heuristic_0x88_C-> history " + history[color][from_64][to_64]);    

  // если запись в ячейку истории превысила лимит все делим на два  
  if (history[color][from_64][to_64] < -1 * MAX_HISTORY_HH) {

    for (let color = 0; color < MAX_COLOR_HH; color++) {
      for (let from = 0; from < MAX_COORDINATE_HH; from++) {
        for (let to = 0; to < MAX_COORDINATE_HH; to++) {
          history[color][from][to] = history[color][from][to] / 2;
        }
      }
    }
  }
}

export {
  ini_Array_hh, clear_history_hh, ini_test_history_hh, history_good_save_hh, history_bad_save_hh, get_history_hh,
  MAX_COLOR_HH, MAX_COORDINATE_HH, MAX_HISTORY_HH
};
