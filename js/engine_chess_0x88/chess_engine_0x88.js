/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_engine_0x88.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

import { Chess_board_0x88_C } from "./move_generator/chess_board_0x88.js";
import { Move_list_0x88_С } from "./move_generator/move_list_0x88.js";

import { Search_start_0x88_C } from "./search_start_0x88.js";

import { Undo_0x88_C } from "./move_generator/undo_0x88.js";

import { Html5Canvas_C } from "../gui_chess/html5_canvas/html5_canvas.js";
// uci
import { Uci_C } from "../uci/uci.js";

import { Transposition_table_0x88_C } from "./for_sorting_move/transposition_table_0x88.js";


/**
* НАЗНАЧЕНИЕ
что должен уметь делать движок?
принимать фен нотацию позиции
принимать команды на старт обсчета позиции и остановку
выдавать вариант приведший к лучшему ходу с оценкой каждого хода варианта
         выдавать лучший ход
         выдавать оценку лучшего хода
выдавать количество рассмотренных позиций
выдавать фен позиции
*/

class ChessEngine_0x88_С {

  static NAME = "ChessEngine_0x88";

  worker_chessEngine_0x88_O = null;

  // для 
  chess_board_0x88_O_start = new Chess_board_0x88_C();

  chess_board_0x88_O_test = new Chess_board_0x88_C();
  move_list_0x88_O_test = new Move_list_0x88_С();

  search_start_0x88_O = new Search_start_0x88_C();
  uci_O = new Uci_C();

  // обеспечение оболочки
  chess_board_0x88_O_gui = new Chess_board_0x88_C();
  chess_board_0x88_O_save_gui = new Chess_board_0x88_C();
  move_list_0x88_O_gui = new Move_list_0x88_С();

  transposition_table_0x88_O = new Transposition_table_0x88_C();

  //---------

  score = 0;
  i_move = 0;

  constructor() {

  }

  iniM(worker_chessEngine_0x88_O) {

    this.worker_chessEngine_0x88_O = worker_chessEngine_0x88_O;

    this.search_start_0x88_O.iniM(this);
    this.uci_O.iniM();
    this.transposition_table_0x88_O.iniM();
  }

  message_worker_chessEngine_to_engine(message) {
    
  }

  // сообщение поиска движку
  message_search_start_to_engine(info_return_search) {
     let message = info_return_search.pv_line.pv_line_to_string(this.chess_board_0x88_O_test,
      this.move_list_0x88_O_test);

      console.log("Search_0x88_C->pv_line_str " + message + " depth_search " + info_return_search.depth_search);

    this.worker_chessEngine_0x88_O.message_chessEngine_0x88_to_worker_chessEngine_0x88_O(message);
  }

  //////////////////////
  // TEST

  // просто генерация ходов и просмотр в консоле
  test_pseudo_legal_moves() {
    //console.log("ChessEngine_0x88_С->test_pseudo_legal_moves --------");
    this.chess_board_0x88_O_test.score =
      this.search_start_0x88_O.evaluate_0x88_O.score_position(this.chess_board_0x88_O_test);
    //  this.chess_board_0x88_O.test_print_0x88();
    //  this.chess_board_0x88_O.test_print_0x88_color();
    //  console.log("ChessEngine_0x88_С->chess_board_0x88_O.score " + this.chess_board_0x88_O.score);
    //  this.chess_board_0x88_O.test_print_any_0x88();
    this.search_start_0x88_O.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(this.chess_board_0x88_O_test,
      this.move_list_0x88_O_test);
    this.search_start_0x88_O.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(this.chess_board_0x88_O_test,
      this.move_list_0x88_O_test);

    //this.move_list_0x88_O.sorting_list();
    //this.move_list_0x88_O.test_print_list(this.chess_board_0x88_O);
  }

  // запуск полного перебора minmax
  // тут можно проверить корректность игрового движка с помощью perf_t. как правильно он генерирует позиции.
  test_go_depth_minmax(depth_max) {
    //console.log("ChessEngine_0x88_С->test_go_depth_nm --------");
    let info_return_search = this.search_start_0x88_O.test_start_search_minmax(this.chess_board_0x88_O_start, depth_max);

    return info_return_search;
  }

  // alpha beta
  test_go_depth_ab(depth_max) {
    //console.log("ChessEngine_0x88_С->test_go_depth_ab --------");
    let info_return_search = this.search_start_0x88_O.test_start_search_ab(depth_max);

    return info_return_search;
  }

  //////////////////////
  // GAME

  // iterative deepening
  go_depth_id(fen_start, depth_max) {
    //console.log("ChessEngine_0x88_С->go_depth_id depth_max " + depth_max);
    let info_return_search = this.search_start_0x88_O.searching_iterative_deepening(fen_start, depth_max);

    return info_return_search;
  }

  /////////////////////////////

  //this.one_click_on_squares_x, this.one_click_on_squares_y, x_b_n, y_b_n
  pseudo_move_is_ok(from_x, from_y, to_x, to_y, chessBoard_8x8_O) {

    // инициализируем вспомогательный массив    
    let fen_start = chessBoard_8x8_O.set_fen_from_8x8();
    this.chess_board_0x88_O_gui.set_0x88_from_fen(fen_start);

    let from = this.chess_board_0x88_O_gui.x07_y07_to_0x88(from_x, from_y);

    let to = this.chess_board_0x88_O_gui.x07_y07_to_0x88(to_x, to_y);

    this.move_list_0x88_O_gui.clear_list();

    this.search_start_0x88_O.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui,
      this.move_list_0x88_O_gui);

    this.search_start_0x88_O.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui,
      this.move_list_0x88_O_gui);

    let ret = this.move_list_0x88_O_gui.move_is_found(from, to);

    return ret;
  }

  //
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
    this.search_start_0x88_O.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui);

    this.search_start_0x88_O.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui);
    //------
    // находим номер нашего хода в списке ходов
    let move_i = this.move_list_0x88_O_gui.return_i_move(from, to);
    this.i_move = move_i;
    // сохраняем доску в специальную chess_board_0x88_O_save_gui
    this.chess_board_0x88_O_save_gui.save_chess_board_0x88(this.chess_board_0x88_O_gui);

    // делаем ход и возвращаем флаг легальности хода  
    //console.log("ChessBoard_8x8_C->click(mouseDown) СДЕЛАЕМ ХОД ДЛЯ ПРОВЕРКИ ЛЕГАЛЬНОСТИ from " + from + " to "+ to);
    let is_moove_legal = this.search_start_0x88_O.make_move_0x88_O.do_moves(move_i,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui,
      undo_0x88_O, this.search_start_0x88_O.move_gen_1_captures_0x88_O, this.transposition_table_0x88_O);

    return is_moove_legal;

  }

  draw_rect_move(from_x, from_y, chessBoard_8x8_O, draw_O, is_white) {

    let fen_start = chessBoard_8x8_O.set_fen_from_8x8();
    this.chess_board_0x88_O_gui.set_0x88_from_fen(fen_start);

    let from = this.chess_board_0x88_O_gui.x07_y07_to_0x88(from_x, from_y);

    this.move_list_0x88_O_gui.clear_list();

    this.search_start_0x88_O.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui);

    this.search_start_0x88_O.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
      this.chess_board_0x88_O_gui, this.move_list_0x88_O_gui);

    draw_O.draw_rect_move(this.move_list_0x88_O_gui, this.chess_board_0x88_O_gui,
      chessBoard_8x8_O, Html5Canvas_C.BLUE, is_white);
  }
}

export { ChessEngine_0x88_С };