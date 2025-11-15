/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_engine_0x88.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

import { Search_start_0x88_C } from "./search_start_0x88.js";
import { Undo_0x88_C } from "./move_generator/undo_0x88.js";

import { Html5Canvas_C } from "../gui_chess/html5_canvas/html5_canvas.js";
// uci
import { Uci_C } from "../uci/uci.js";

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

  // для всех
  
  search_start_0x88_O = new Search_start_0x88_C();
  uci_O = new Uci_C();

  //---------

  score = 0;
  i_move = 0;

  constructor() {

  }

  iniM() {
    this.search_start_0x88_O.iniM();
    this.uci_O.iniM();    
  }

  //////////////////////
  // TEST

  // просто генерация ходов и просмотр в консоле
  test_pseudo_legal_moves() {
    //console.log("ChessEngine_0x88_С->test_pseudo_legal_moves --------");
    this.search_start_0x88_O.chess_board_0x88_O.score = 
    this.search_start_0x88_O.evaluate_0x88_O.score_position(this.search_start_0x88_O.chess_board_0x88_O);
    //  this.chess_board_0x88_O.test_print_0x88();
    //  this.chess_board_0x88_O.test_print_0x88_color();
    //  console.log("ChessEngine_0x88_С->chess_board_0x88_O.score " + this.chess_board_0x88_O.score);
    //  this.chess_board_0x88_O.test_print_any_0x88();
    this.search_start_0x88_O.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(this.search_start_0x88_O.chess_board_0x88_O, 
      this.search_start_0x88_O.move_list_0x88_O);
    this.search_start_0x88_O.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(this.search_start_0x88_O.chess_board_0x88_O, 
      this.search_start_0x88_O.move_list_0x88_O);

    //this.move_list_0x88_O.sorting_list();
    //this.move_list_0x88_O.test_print_list(this.chess_board_0x88_O);
  }

  // запуск полного перебора minmax
  // тут можно проверить корректность игрового движка с помощью perf_t. как правильно он генерирует позиции.
  test_go_depth_minmax(depth_max) {
    //console.log("ChessEngine_0x88_С->test_go_depth_nm --------");
    let info_return_search = this.search_start_0x88_O.test_start_search_minmax(depth_max);

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
  go_depth_id(depth_max) {
    //console.log("ChessEngine_0x88_С->go_depth_id depth_max " + depth_max);
    let info_return_search = this.search_start_0x88_O.searching_iterative_deepening(depth_max);

    return info_return_search;
  }

  /////////////////////////////

  // set position
  position(chessBoard_8x8_O) {
    this.search_start_0x88_O.chess_board_0x88_O.set_0x88_from_8x8(chessBoard_8x8_O);

  }

  //this.one_click_on_squares_x, this.one_click_on_squares_y, x_b_n, y_b_n
  pseudo_move_is_ok(from_x, from_y, to_x, to_y, chessBoard_8x8_O) {

    // инициализируем вспомогательный массив    
    this.search_start_0x88_O.chess_board_0x88_O_gui.set_0x88_from_8x8(chessBoard_8x8_O);

    let from = this.search_start_0x88_O.chess_board_0x88_O_gui.x07_y07_to_0x88(from_x, from_y);

    let to = this.search_start_0x88_O.chess_board_0x88_O_gui.x07_y07_to_0x88(to_x, to_y);
    
    this.search_start_0x88_O.move_list_gui_0x88_O.clear_list();

    this.search_start_0x88_O.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, 
      this.search_start_0x88_O.chess_board_0x88_O_gui,
      this.search_start_0x88_O.move_list_gui_0x88_O);

    this.search_start_0x88_O.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, 
      this.search_start_0x88_O.chess_board_0x88_O_gui,
      this.search_start_0x88_O.move_list_gui_0x88_O);

    // console.log("IfritChessEngine_С-> print_list---------- ");
    // this.move_list_gui_0x88_O.test_print_list(this.chess_board_0x88_O); 
    // this.chess_board_0x88_O.test_print_0x88();
    // this.chess_board_0x88_O.test_print_0x88_color();
    let ret = this.search_start_0x88_O.move_list_gui_0x88_O.move_is_legal(from, to);

    //console.log("IfritChessEngine_С-> from_x " + from_x + " from_y " + from_y +" to_x " + to_x + " to_y " + to_y);
    //console.log("IfritChessEngine_С-> from " + from + " to " + to);
    //console.log("IfritChessEngine_С-> ret " + ret);

    return ret;
  }

  //
  move_is_legal(one_click_on_squares_x, one_click_on_squares_y, x_b_n, y_b_n, chessBoard_8x8_O) {

    let undo_0x88_O = new Undo_0x88_C();

    // инициализируем вспомогательный массив    
    this.search_start_0x88_O.chess_board_0x88_O_gui.set_0x88_from_8x8(chessBoard_8x8_O);

    // переводим кординаты х у в одну для генератора позиций
    let from = this.search_start_0x88_O.chess_board_0x88_O_gui.x07_y07_to_0x88(one_click_on_squares_x, one_click_on_squares_y);
    let to = this.search_start_0x88_O.chess_board_0x88_O_gui.x07_y07_to_0x88(x_b_n, y_b_n);
    //------
    // обсчитываем всевозможные ходы и заполняем специальный список move_list_gui_0x88_O
    this.search_start_0x88_O.move_list_gui_0x88_O.clear_list();
    this.search_start_0x88_O.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, 
      this.search_start_0x88_O.chess_board_0x88_O_gui,
      this.search_start_0x88_O.move_list_gui_0x88_O);
    this.search_start_0x88_O.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, 
      this.search_start_0x88_O.chess_board_0x88_O_gui,
      this.search_start_0x88_O.move_list_gui_0x88_O);
    //------
    // находим номер нашего хода в списке ходов
    let move_i = this.search_start_0x88_O.move_list_gui_0x88_O.return_i_move(from, to);
    this.i_move = move_i;
    // сохраняем доску в специальную chess_board_0x88_O_save_gui
    this.search_start_0x88_O.chess_board_0x88_O_save_gui.save_chess_board_0x88(this.search_start_0x88_O.chess_board_0x88_O_gui);

    // делаем ход и возвращаем флаг легальности хода  
    //console.log("ChessBoard_8x8_C->click(mouseDown) СДЕЛАЕМ ХОД ДЛЯ ПРОВЕРКИ ЛЕГАЛЬНОСТИ from " + from + " to "+ to);
    let is_moove_legal = this.search_start_0x88_O.make_move_0x88_O.do_moves(move_i,
      this.search_start_0x88_O.chess_board_0x88_O_gui, this.search_start_0x88_O.move_list_gui_0x88_O,
       undo_0x88_O, this.search_start_0x88_O.move_gen_1_captures_0x88_O);

    return is_moove_legal;

  }

  draw_rect_move(from_x, from_y, chessBoard_8x8_O, draw_O, is_white) {
    this.search_start_0x88_O.chess_board_0x88_O_gui.set_0x88_from_8x8(chessBoard_8x8_O);
    let from = this.search_start_0x88_O.chess_board_0x88_O.x07_y07_to_0x88(from_x, from_y);
    this.search_start_0x88_O.move_list_gui_0x88_O.clear_list();
    this.search_start_0x88_O.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
       this.search_start_0x88_O.chess_board_0x88_O_gui,
      this.search_start_0x88_O.move_list_gui_0x88_O);
    this.search_start_0x88_O.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, 
      this.search_start_0x88_O.chess_board_0x88_O_gui,
      this.search_start_0x88_O.move_list_gui_0x88_O);

    draw_O.draw_rect_move(this.search_start_0x88_O.move_list_gui_0x88_O, this.search_start_0x88_O.chess_board_0x88_O_gui,
       chessBoard_8x8_O, Html5Canvas_C.BLUE, is_white);
  }
}

export { ChessEngine_0x88_С };