/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_gui_chess.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

import { GuiStartWorker_R } from "../worker/gui_start_worker.js";
import { ChessBoard_8x8_C } from "./chess_board_8x8.js";
import { Game_line_0x88_C } from "./game_line_0x88.js";
import { GuiLegalMove_0x88_С } from "./gui_legal_move_0x88.js";

import { Draw_С } from "./draw.js";
// uci
import { Uci_C } from "../uci/uci.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/


class Gui_chess_C {

      GuiStartWorker_O = GuiStartWorker_R;
      IfritChessGame_O = 0;
      chessBoard_8x8_O = new ChessBoard_8x8_C();// доска 8x8 для графического отображения в браузере
      game_line_0x88_O = new Game_line_0x88_C();//

      guiLegalMove_0x88_O = new GuiLegalMove_0x88_С();//   

      draw_O = new Draw_С();// рисуем в браузере   
      uci_O = new Uci_C();

      static NAME = "Gui_chess_C";

      static WHITE = 1;
      static BLACK = 0;

      // test = 1 запуск полного перебора minmax         
      // test = 2 message_to_engine(message) работа с воркером
      static MINMAX = 1;
      static ID = 2;

      static CLICK_NO = 0;
      static CLICK_ONE = 1;

      static CLICK_NOT_STOP = 0;
      static CLICK_YES_STOP = 1;

      click_state = 0;
      click_is_stop = 0;

      click_on_squares_x = -1;
      click_on_squares_y = -1;

      click_save_on_squares_x = -1;
      click_save_on_squares_y = -1;

      // максимальная глубина перебора
      depth_max = -1;
      // количество рассмотреных узлов
      nodes_str = 0;

      nodes_per_second_str = 0;

      // оценка найденного варианта
      score_str = 0;
      // найденный вариант в виде строки с ходами и оценкой в конце
      pv_line_str = " no";
      // игра идет за белых или черных
      is_white = 1;
      // номер хода в записи партии
      nomber_move = 0;

      // режим игры
      mode_game = 1;

      constructor() {
      }

      iniM(IfritChessGame_R) {
            this.IfritChessGame_O = IfritChessGame_R;
            this.chessBoard_8x8_O.iniM();
            this.GuiStartWorker_O.iniM(IfritChessGame_R);
            this.draw_O.iniM();
            this.uci_O.iniM();
            this.guiLegalMove_0x88_O.iniM();

            this.click_state = Gui_chess_C.CLICK_NO;
            this.click_is_stop = Gui_chess_C.CLICK_NOT_STOP;
            this.depth_max = -1;
            this.nodes = 0;
            this.score = 0;
            this.pv_line_str = " no";
            this.is_white = 1;
            this.nomber_move = 0;
            this.mode_game = 1;
      }

      // координаты клика мышки переводим в номер клетки по х и у от 0 и до 7
      xy_to_squares_xy(x, y) {
            //console.log('Gui_chess_C-> xy_to_squares_xy x ' + x + " y " + y);
            this.click_on_squares_x = Math.floor((x - this.chessBoard_8x8_O.x_start) / this.chessBoard_8x8_O.squares_width);
            this.click_on_squares_y = Math.floor((y - this.chessBoard_8x8_O.y_start) / this.chessBoard_8x8_O.squares_height);
      }

      squares_xy_save() {
            this.click_save_on_squares_x = this.click_on_squares_x;
            this.click_save_on_squares_y = this.click_on_squares_y;
      }

      // если играем за черных то разворачиваем доску. клики зеркалятся по х и у.
      squares_xy_mirror() {
            if (this.is_white == Gui_chess_C.BLACK) this.click_on_squares_x = 7 - this.click_on_squares_x;
            if (this.is_white == Gui_chess_C.BLACK) this.click_on_squares_y = 7 - this.click_on_squares_y;
      }

      is_click_to_board() {
            if ((0 <= this.click_on_squares_x) && (8 > this.click_on_squares_x) &&
                  (0 <= this.click_on_squares_y) && (8 > this.click_on_squares_y)) {
                  return true;
            } else {
                  return false;
            }
      }

      // если кликнули по той же клетке снова
      is_click_to_square_again(x_save, y_save, x, y) {

            if ((x_save == x) && (y_save == y)) {
                  return true;
            } else {
                  return false;
            }
      }

      // если кликнули по фигуре цвета хода
      is_click_to_our_piece(x, y) {

            // фигуры цвет
            let sq_piece_color_8x8 = this.chessBoard_8x8_O.sq_piece_color_8x8[y][x];

            // фигуры имя
            let sq_piece_8x8 = this.chessBoard_8x8_O.sq_piece_8x8[y][x];

            // фигура цвета ходящей стороны и фигура есть 
            if ((sq_piece_8x8 != 0) && (sq_piece_color_8x8 == this.chessBoard_8x8_O.side_to_move)) {//   
                  return true;
            } else {
                  return false;
            }
      }

      // если кликнули по фигуре цвета хода
      is_legal_move() {

            // обсчитали ход и выдали вердикт легальный ли он без шахов
            if (this.guiLegalMove_0x88_O.pseudo_move_is_ok(
                  this.click_save_on_squares_x,
                  this.click_save_on_squares_y,
                  this.click_on_squares_x,
                  this.click_on_squares_y,
                  this.chessBoard_8x8_O)) {

                  // обсчитали ход и выдали вердикт легальный ли он с шахами
                  let is_moove_legal = this.guiLegalMove_0x88_O.move_is_legal(
                        this.click_save_on_squares_x,
                        this.click_save_on_squares_y,
                        this.click_on_squares_x,
                        this.click_on_squares_y,
                        this.chessBoard_8x8_O);

                  // фигура цвета ходящей стороны и фигура есть 
                  if (is_moove_legal) {//   
                        return true;
                  } else {
                        return false;
                  }
            }
      }

};

export { Gui_chess_C };