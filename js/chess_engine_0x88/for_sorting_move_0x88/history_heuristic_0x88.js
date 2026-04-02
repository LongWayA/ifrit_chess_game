// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name history_heuristic_0x88.js
 * @version created 01.02m.2026
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
* @param {Int32Array} packing_moves
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

  let color = packing_moves[IND_PIESE_COLOR_ML];
  let from_128 = get_from_ml(move_i, packing_moves);
  let to_128 = get_to_ml(move_i, packing_moves);


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
