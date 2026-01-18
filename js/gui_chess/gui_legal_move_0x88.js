// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name gui_legal_move_0x88.js
 * @version created 27.09m.2025 
*/

import { Html5Canvas_C } from "./html5_canvas/html5_canvas.js";
import { Uci_C } from "../uci/uci.js";

//
import { Chess_board_0x88_C } from "../chess_engine_0x88/move_generator/chess_board_0x88.js";
import { Move_list_0x88_С } from "../chess_engine_0x88/move_generator/move_list_0x88.js";

import { Move_gen_1_captures_0x88_С } from "../chess_engine_0x88/move_generator/move_gen_1_captures_0x88.js";
import { Move_gen_2_quiet_0x88_С } from "../chess_engine_0x88/move_generator/move_gen_2_quiet_0x88.js";
import { Make_move_0x88_C } from "../chess_engine_0x88/move_generator/make_move_0x88.js";
import { Unmake_move_0x88_C } from "../chess_engine_0x88/move_generator/unmake_move_0x88.js";
import { Undo_0x88_C } from "../chess_engine_0x88/move_generator/undo_0x88.js";

import { Transposition_table_0x88_C } from "../chess_engine_0x88/for_sorting_move/transposition_table_0x88.js";
import { ChessBoard_8x8_C } from "./chess_board_8x8.js";

import { Draw_С } from "./draw.js";
/**
* НАЗНАЧЕНИЕ

*/

/**
 * Класс.
 * @class
 */
class GuiLegalMove_0x88_С {

  static NAME = "GuiLegalMove_0x88_С";

  uci_O = new Uci_C();

  // обеспечение оболочки
  chess_board_0x88_O_gui = new Chess_board_0x88_C();
  chess_board_0x88_O_save_gui = new Chess_board_0x88_C();
  move_list_0x88_O_gui = new Move_list_0x88_С();

  move_gen_1_captures_0x88_O = new Move_gen_1_captures_0x88_С();
  move_gen_2_quiet_0x88_O = new Move_gen_2_quiet_0x88_С();

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();

   transposition_table_0x88_O = new Transposition_table_0x88_C();

  //---------

  score = 0;
  i_move = 0;

  constructor() {

  }

  iniM() {
    
    this.transposition_table_0x88_O.iniM();
    this.uci_O.iniM();
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
    this.chess_board_0x88_O_gui.set_0x88_from_fen(fen_start);

    let from = this.chess_board_0x88_O_gui.x07_y07_to_0x88(from_x, from_y);

    let to = this.chess_board_0x88_O_gui.x07_y07_to_0x88(to_x, to_y);

    this.move_list_0x88_O_gui.clear_list();

    this.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui,
      this.move_list_0x88_O_gui);

    this.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui,
      this.move_list_0x88_O_gui);

    let ret = this.move_list_0x88_O_gui.move_is_found(from, to);

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

    let undo_0x88_O = new Undo_0x88_C();

    // инициализируем вспомогательный массив    
    let fen_start = chessBoard_8x8_O.set_fen_from_8x8();
    this.chess_board_0x88_O_gui.set_0x88_from_fen(fen_start);

    // переводим кординаты х у в одну для генератора позиций
    let from = this.chess_board_0x88_O_gui.x07_y07_to_0x88(one_click_on_squares_x, one_click_on_squares_y);
    let to = this.chess_board_0x88_O_gui.x07_y07_to_0x88(x_b_n, y_b_n);
    //------
    // обсчитываем всевозможные ходы и заполняем специальный список move_list_gui_0x88_O
    this.move_list_0x88_O_gui.clear_list();
    this.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui);

    this.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui);
    //------
    // находим номер нашего хода в списке ходов
    let move_i = this.move_list_0x88_O_gui.return_i_move(from, to);
    this.i_move = move_i;
    // сохраняем доску в специальную chess_board_0x88_O_save_gui
    this.chess_board_0x88_O_save_gui.save_chess_board_0x88(this.chess_board_0x88_O_gui);

    // делаем ход и возвращаем флаг легальности хода  
    //console.log("ChessBoard_8x8_C->click(mouseDown) СДЕЛАЕМ ХОД ДЛЯ ПРОВЕРКИ ЛЕГАЛЬНОСТИ from " + from + " to "+ to);
    let is_moove_legal = this.make_move_0x88_O.do_moves(move_i,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui,
      undo_0x88_O, this.move_gen_1_captures_0x88_O, this.transposition_table_0x88_O);

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
    this.chess_board_0x88_O_gui.set_0x88_from_fen(fen_start);

    let from = this.chess_board_0x88_O_gui.x07_y07_to_0x88(from_x, from_y);

    this.move_list_0x88_O_gui.clear_list();

    this.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui);

    this.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui);

    draw_O.draw_rect_move(this.move_list_0x88_O_gui, this.chess_board_0x88_O_gui,
      chessBoard_8x8_O, Html5Canvas_C.BLUE, is_white);
  }
}

export { GuiLegalMove_0x88_С };