/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name checkbox.js
 * @version created 09.11m.2025 
 * last modified 09.11m.2025
*/

import { Gui_chess_C } from "../gui_chess/i_gui_chess.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

const checkbox_is_black_game = document.getElementById('is_black_game');

checkbox_is_black_game.addEventListener('change', function () {
      checkbox_R.checkbox_is_black_game_checked();
});

const input_max_depth = document.getElementById('max_depth');

input_max_depth.addEventListener('input', function () {
      checkbox_R.input_max_depth_checked();
});

const input_set_fen = document.getElementById('set_fen');

const text_chess_game = document.getElementById('text_chess_game');
const text_engine = document.getElementById('text_engine');

const buttonLeft = document.getElementById('buttonLeft');
const buttonGo = document.getElementById('buttonGo');
const buttonRight = document.getElementById('buttonRight');
const buttonStart = document.getElementById('buttonStart');
const buttonFen = document.getElementById('buttonFen');

class Checkbox_C {

      static NAME = "Checkbox_C";

      IfritChessGame_O = 0;

      constructor() {
      }

      iniM(IfritChessGame_R) {

            this.IfritChessGame_O = IfritChessGame_R;
      }

      checkbox_is_black_game_checked() {
            if (checkbox_is_black_game.checked) {
                  this.IfritChessGame_O.gui_chess_O.is_white = Gui_chess_C.BLACK;
            } else {
                  this.IfritChessGame_O.gui_chess_O.is_white = Gui_chess_C.WHITE;
            }
            this.IfritChessGame_O.gui_chess_O.draw_O.draw_chess_board_8x8(this.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O,
                  this.IfritChessGame_O.gui_chess_O.is_white);
      }

      input_max_depth_checked() {
            if (isNaN(parseInt(input_max_depth.value))) {
                  this.IfritChessGame_O.gui_chess_O.depth_max = 1;
                  input_max_depth.value = this.IfritChessGame_O.gui_chess_O.depth_max;
            } else {
                  this.IfritChessGame_O.gui_chess_O.depth_max = parseInt(input_max_depth.value);
                  if (this.IfritChessGame_O.gui_chess_O.depth_max <= 0) this.IfritChessGame_O.gui_chess_O.depth_max = 1;
                  if (this.IfritChessGame_O.gui_chess_O.depth_max > 12) this.IfritChessGame_O.gui_chess_O.depth_max = 12;
                  input_max_depth.value = this.IfritChessGame_O.gui_chess_O.depth_max;//
            }
      }

      set_disabled(yes) {// true, false
            buttonLeft.disabled = yes;
            buttonGo.disabled = yes;
            buttonRight.disabled = yes;
            buttonStart.disabled = yes;
            buttonFen.disabled = yes;
      }


      set_input_max_depth_value(value) {
            input_max_depth.value = value;
      }

      set_input_set_fen(value) {
            input_set_fen.value = value;
      }

      get_input_set_fen() {
            return input_set_fen.value;
      }

      set_text_engine(value) {
            text_engine.value = value;
      }

      add_text_engine(value) {
            text_engine.value += value;
      }

      get_text_engine() {
            return text_engine.value;
      }

      set_text_chess_game(value) {
            text_chess_game.value = value;
      }

      add_text_chess_game(value) {
            text_chess_game.value += value;
      }

      get_text_chess_game() {
            return text_chess_game.value;
      }


};

let checkbox_R = new Checkbox_C();

export { checkbox_R };