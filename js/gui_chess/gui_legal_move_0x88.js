// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name gui_legal_move_0x88.js
 * @version created 27.09m.2025 
*/

import { Html5Canvas_C } from "./html5_canvas/html5_canvas.js";

import { ChessBoard_8x8_C } from "./chess_board_8x8.js";

import { Draw_С } from "./draw.js";

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
} from "../chess_engine_0x88/move_generator/move_list_new.js";

import {
  x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
  save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite, letter_to_x_coordinate,
  IND_MAX, SIDE_TO_MOVE, LET_COOR,
  BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK,
  SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
} from "../chess_engine_0x88/move_generator/chess_board_new.js";

import { generated_pseudo_legal_captures, generated_pseudo_legal_moves_one_piece_for_gui, check_detected } from "../chess_engine_0x88/move_generator/move_generator_captures_new.js";
import { generated_pseudo_legal_quiet_moves, generated_pseudo_legal_moves_one_piece_for_gui_qm } from "../chess_engine_0x88/move_generator/move_generator_quiet_new.js";

import { do_moves_mm } from "../chess_engine_0x88/move_generator/make_move_new.js";

import { UNDO_MAX } from "../chess_engine_0x88/move_generator/undo_new.js";

import {
  ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
  key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
  key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep2_0x88_tk, key_update_QqKk_0x88_tk,
  test_generation_key_64_tk
} from "../chess_engine_0x88/for_sorting_move/transposition_key_new.js";

/**
* НАЗНАЧЕНИЕ

*/

/**
 * Класс.
 * @class
 */
class GuiLegalMove_0x88_С {

  static NAME = "GuiLegalMove_0x88_С";

  chess_board_0x88_gui = new Uint8Array(IND_MAX).fill(0);// текущая доска с фигурами 0x88 
  packing_moves_gui = new Uint32Array(LENGTH_LIST).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32

  //packing_moves_gui_save = new Uint32Array(LENGTH_LIST).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32

  chess_board_key_64 = new BigUint64Array(1);
  chess_board_key_64_undo = new BigUint64Array(1);

  //---------

  score = 0;
  i_move = 0;
  //i_move_save = 0;

  constructor() {

  }

  iniM() {
    ini_random_key_array_64_tk();// инициируем внтуренний массив случайных чисел.
  }

  set_fen() {
      let fen = set_fen_from_0x88(this.chess_board_0x88_gui);
      return fen;
  }

  move_to_string_uci(){
        //return move_to_string_uci(this.i_move_save, this.packing_moves_gui_save);
        return move_to_string_uci(this.i_move, this.packing_moves_gui);        
  }


  //this.one_click_on_squares_x, this.one_click_on_squares_y, x_b_n, y_b_n
  /**
  * @param {number} from_x
  * @param {number} from_y
  * @param {number} to_x
  * @param {number} to_y
  * @param {ChessBoard_8x8_C} chessBoard_8x8_O
  * @returns {boolean}
  */
  pseudo_move_is_ok(from_x, from_y, to_x, to_y, chessBoard_8x8_O) {

    // инициализируем вспомогательный массив    
    let fen_start = chessBoard_8x8_O.set_fen_from_8x8();
    set_board_from_fen_0x88(fen_start, this.chess_board_0x88_gui);//

    let from = x07_y07_to_0x88(from_x, from_y);

    let to = x07_y07_to_0x88(to_x, to_y);

    clear_list(this.packing_moves_gui);

    generated_pseudo_legal_captures(this.chess_board_0x88_gui, this.packing_moves_gui);
    generated_pseudo_legal_quiet_moves(this.chess_board_0x88_gui, this.packing_moves_gui);

    let ret = move_is_found(this.packing_moves_gui, from, to);

    return ret;
  }

  /**
  * @param {number} one_click_on_squares_x
  * @param {number} one_click_on_squares_y
  * @param {number} x_b_n
  * @param {number} y_b_n
  * @param {ChessBoard_8x8_C} chessBoard_8x8_O
  * @returns {number}
  */
  move_is_legal(one_click_on_squares_x, one_click_on_squares_y, x_b_n, y_b_n, chessBoard_8x8_O) {

    let undo = new Uint8Array(UNDO_MAX).fill(0);// для отмены хода

    // инициализируем вспомогательный массив    
    let fen_start = chessBoard_8x8_O.set_fen_from_8x8();
    set_board_from_fen_0x88(fen_start, this.chess_board_0x88_gui);//

    // переводим кординаты х у в одну для генератора позиций

    let from = x07_y07_to_0x88(one_click_on_squares_x, one_click_on_squares_y);
    let to = x07_y07_to_0x88(x_b_n, y_b_n);
    //------
    // обсчитываем всевозможные ходы и заполняем специальный список move_list_gui_0x88_O
    clear_list(this.packing_moves_gui);


    generated_pseudo_legal_captures(this.chess_board_0x88_gui, this.packing_moves_gui);
    generated_pseudo_legal_quiet_moves(this.chess_board_0x88_gui, this.packing_moves_gui);

    //save_list_from(this.packing_moves_gui_save, this.packing_moves_gui);

    //------
    // находим номер нашего хода в списке ходов
    let move_i = return_i_move(this.packing_moves_gui, from, to);
    this.i_move = move_i;
    //this.i_move_save = this.i_move;

    // делаем ход и возвращаем флаг легальности хода  
    //console.log("ChessBoard_8x8_C->click(mouseDown) СДЕЛАЕМ ХОД ДЛЯ ПРОВЕРКИ ЛЕГАЛЬНОСТИ from " + from + " to "+ to);


    let type_move = get_type_move(move_i, this.packing_moves_gui);
    from = get_from(move_i, this.packing_moves_gui);
    to = get_to(move_i, this.packing_moves_gui);
    let name_capture_piece = get_name_capture_piece(move_i, this.packing_moves_gui);
    let piece_color = this.packing_moves_gui[IND_PIESE_COLOR];

    let is_moove_legal = do_moves_mm(this.chess_board_0x88_gui, this.chess_board_key_64, this.chess_board_key_64_undo, undo,
      type_move, from, to, piece_color);


    return is_moove_legal;

  }

  /**
  * @param {number} from_x
  * @param {number} from_y
  * @param {ChessBoard_8x8_C} chessBoard_8x8_O
  * @param {Draw_С} draw_O
  * @param {number} is_white
  * @returns {void}
  */
  draw_rect_move(from_x, from_y, chessBoard_8x8_O, draw_O, is_white) {

    let fen_start = chessBoard_8x8_O.set_fen_from_8x8();
    set_board_from_fen_0x88(fen_start, this.chess_board_0x88_gui);//

    let from = x07_y07_to_0x88(from_x, from_y);

    clear_list(this.packing_moves_gui);

    generated_pseudo_legal_moves_one_piece_for_gui(from, this.chess_board_0x88_gui, this.packing_moves_gui)
    generated_pseudo_legal_moves_one_piece_for_gui_qm(from, this.chess_board_0x88_gui, this.packing_moves_gui);

    draw_O.draw_rect_move(this.packing_moves_gui, chessBoard_8x8_O, Html5Canvas_C.BLUE, is_white);
  }
}

export { GuiLegalMove_0x88_С };