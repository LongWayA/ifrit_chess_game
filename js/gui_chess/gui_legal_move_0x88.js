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
} from "../chess_engine_0x88/move_generator_0x88/move_list_0x88.js";

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
} from "../chess_engine_0x88/move_generator_0x88/chess_board_0x88.js";

import { 
      generated_pseudo_legal_captures_mgc, generated_pseudo_legal_captures_one_piece_for_gui_mgc, check_detected_mgc 
} from "../chess_engine_0x88/move_generator_0x88/move_generator_captures_0x88.js";
import {     
  generated_pseudo_legal_quiet_moves_mgq, generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq,
  A1_MGQ, B1_MGQ, C1_MGQ , D1_MGQ, E1_MGQ, F1_MGQ, G1_MGQ, H1_MGQ, 
  A8_MGQ, B8_MGQ, C8_MGQ, D8_MGQ, E8_MGQ, F8_MGQ, G8_MGQ, H8_MGQ 
} from "../chess_engine_0x88/move_generator_0x88/move_generator_quiet_0x88.js";

import { do_moves_mm } from "../chess_engine_0x88/move_generator_0x88/make_move_0x88.js";

import { UNDO_MAX } from "../chess_engine_0x88/move_generator_0x88/undo_0x88.js";

import {
  ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
  key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
  key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep_sq_0x88_tk, key_update_QqKk_0x88_tk,
  test_generation_key_64_tk
} from "../chess_engine_0x88/for_sorting_move/transposition_key_0x88.js";

/**
* НАЗНАЧЕНИЕ

*/

/**
 * Класс.
 * @class
 */
class GuiLegalMove_0x88_С {

  static NAME = "GuiLegalMove_0x88_С";

  chess_board_0x88_gui = new Int32Array(IND_MAX_CB).fill(0);// текущая доска с фигурами 0x88 
  packing_moves_gui = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);// список ходов. ход упакован в одно число Uint32

  //packing_moves_gui_save = new Int32Array(LENGTH_LIST).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32

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
      let fen = set_fen_from_0x88_cb(this.chess_board_0x88_gui);
      return fen;
  }

  move_to_string_uci(){
        //return move_to_string_uci(this.i_move_save, this.packing_moves_gui_save);
        return move_to_string_uci_ml(this.i_move, this.packing_moves_gui);        
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
    set_board_from_fen_0x88_cb(fen_start, this.chess_board_0x88_gui);//

    let from = x07_y07_to_0x88_cb(from_x, from_y);

    let to = x07_y07_to_0x88_cb(to_x, to_y);

    clear_list_ml(this.packing_moves_gui);

    generated_pseudo_legal_captures_mgc(this.chess_board_0x88_gui, this.packing_moves_gui);
    generated_pseudo_legal_quiet_moves_mgq(this.chess_board_0x88_gui, this.packing_moves_gui);

    let ret = move_is_found_ml(this.packing_moves_gui, from, to);

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

    let undo = new Int32Array(UNDO_MAX).fill(0);// для отмены хода

    // инициализируем вспомогательный массив    
    let fen_start = chessBoard_8x8_O.set_fen_from_8x8();
    set_board_from_fen_0x88_cb(fen_start, this.chess_board_0x88_gui);//

    // переводим кординаты х у в одну для генератора позиций

    let from = x07_y07_to_0x88_cb(one_click_on_squares_x, one_click_on_squares_y);
    let to = x07_y07_to_0x88_cb(x_b_n, y_b_n);
    //------
    // обсчитываем всевозможные ходы и заполняем специальный список move_list_gui_0x88_O
    clear_list_ml(this.packing_moves_gui);


    generated_pseudo_legal_captures_mgc(this.chess_board_0x88_gui, this.packing_moves_gui);
    generated_pseudo_legal_quiet_moves_mgq(this.chess_board_0x88_gui, this.packing_moves_gui);

    //save_list_from(this.packing_moves_gui_save, this.packing_moves_gui);

    //------
    // находим номер нашего хода в списке ходов
    let move_i = return_i_move_ml(this.packing_moves_gui, from, to);
    this.i_move = move_i;
    //this.i_move_save = this.i_move;

    // делаем ход и возвращаем флаг легальности хода  
    //console.log("ChessBoard_8x8_C->click(mouseDown) СДЕЛАЕМ ХОД ДЛЯ ПРОВЕРКИ ЛЕГАЛЬНОСТИ from " + from + " to "+ to);


    let type_move = get_type_move_ml(move_i, this.packing_moves_gui);
    from = get_from_ml(move_i, this.packing_moves_gui);
    to = get_to_ml(move_i, this.packing_moves_gui);
    let name_capture_piece = get_name_capture_piece_ml(move_i, this.packing_moves_gui);
    let piece_color = this.packing_moves_gui[IND_PIESE_COLOR_ML];

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
    set_board_from_fen_0x88_cb(fen_start, this.chess_board_0x88_gui);//

    let from = x07_y07_to_0x88_cb(from_x, from_y);

    clear_list_ml(this.packing_moves_gui);

    generated_pseudo_legal_captures_one_piece_for_gui_mgc(from, this.chess_board_0x88_gui, this.packing_moves_gui)
    generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq(from, this.chess_board_0x88_gui, this.packing_moves_gui);

    draw_O.draw_rect_move(this.packing_moves_gui, chessBoard_8x8_O, Html5Canvas_C.BLUE, is_white);
  }
}

export { GuiLegalMove_0x88_С };