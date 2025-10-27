/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_engine_0x88.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

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
  move_generator_0x88_O = new Move_generator_0x88_С();
  search_start_0x88_O = new Search_start_0x88_C();
  chess_board_0x88_O = new Chess_board_0x88_C();

  // для счета движка
  move_list_0x88_O = new Move_list_0x88_С();
  pv_line_0x88_O = new PV_line_0x88_C();

  // обеспечение оболочки
  chess_board_0x88_O_gui = new Chess_board_0x88_C();
  chess_board_0x88_O_save_gui = new Chess_board_0x88_C();
  move_list_gui_0x88_O = new Move_list_0x88_С();
  undo_0x88_O = new Undo_0x88_C();

  //---------

  score = 0;

  info_return_e = {
    best_move: "-",
    score: 0,
    pv_line: "-",
    node_count: 0,
    fen: "-",
    chess_board_0x88_O_move: null
  };


  constructor() {

  }

  iniM() {
    this.chess_board_0x88_O.iniM();
    this.move_list_0x88_O.iniM();
    this.move_generator_0x88_O.iniM();
    this.search_start_0x88_O.iniM();
  }

  //////////////////////
  // TEST

  // просто генерация ходов и просмотр в консоле
  test_pseudo_legal_moves() {
    console.log("ChessEngine_0x88_С->go_test --------");
    this.chess_board_0x88_O.score = this.search_start_0x88_O.evaluate_0x88_O.score_position(this.chess_board_0x88_O);
    this.chess_board_0x88_O.test_print_0x88();
    this.chess_board_0x88_O.test_print_0x88_color();
    console.log("ChessEngine_0x88_С->chess_board_0x88_O.score " + this.chess_board_0x88_O.score);
    this.chess_board_0x88_O.test_print_any_0x88();
    this.move_generator_0x88_O.generated_pseudo_legal_moves(this.chess_board_0x88_O, this.move_list_0x88_O);
    this.move_list_0x88_O.sorting_list();
    //this.move_list_0x88_O.test_print_list(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);
  }

  // запуск полного перебора minmax
  // тут можно проверить корректность игрового движка с помощью perf_t. как правильно он генерирует позиции.
  test_go_depth_mm(depth_max) {

    let info_return_search = this.search_start_0x88_O.test_start_search_mm(this.pv_line_0x88_O, this.chess_board_0x88_O,
      this.move_generator_0x88_O, depth_max);

    this.info_return_e.score = info_return_search.score;
    this.info_return_e.pv_line_0x88_O = info_return_search.pv_line_0x88_O;
    this.info_return_e.node_count = info_return_search.node_count;
    this.info_return_e.chess_board_0x88_O_move = info_return_search.chess_board_0x88_O_move;

    return this.info_return_e;
  }

  // alpha beta
  test_go_depth_ab(depth_max) {

    let info_return_search = this.search_start_0x88_O.test_start_search_ab(this.pv_line_0x88_O, this.chess_board_0x88_O,
      this.move_generator_0x88_O, depth_max);

    this.info_return_e.score = info_return_search.score;
    this.info_return_e.pv_line_0x88_O = info_return_search.pv_line_0x88_O;
    this.info_return_e.node_count = info_return_search.node_count;
    this.info_return_e.chess_board_0x88_O_move = info_return_search.chess_board_0x88_O_move;

    return this.info_return_e;
  }

  // alpha beta fail hard
  test_go_depth_abfh(depth_max) {

    let info_return_search = this.search_start_0x88_O.test_start_search_abfh(this.pv_line_0x88_O, this.chess_board_0x88_O,
      this.move_generator_0x88_O, depth_max);

    this.info_return_e.score = info_return_search.score;
    this.info_return_e.pv_line_0x88_O = info_return_search.pv_line_0x88_O;
    this.info_return_e.node_count = info_return_search.node_count;
    this.info_return_e.chess_board_0x88_O_move = info_return_search.chess_board_0x88_O_move;

    return this.info_return_e;
  }

  //////////////////////
  // GAME

  // iterative deepening with PVS
  go_depth_id(depth_max) {

    let info_return_search = this.search_start_0x88_O.start_search_id(this.pv_line_0x88_O, this.chess_board_0x88_O,
      this.move_generator_0x88_O, depth_max);

    this.info_return_e.score = info_return_search.score;
    this.info_return_e.pv_line_0x88_O = info_return_search.pv_line_0x88_O;
    this.info_return_e.node_count = info_return_search.node_count;
    this.info_return_e.chess_board_0x88_O_move = info_return_search.chess_board_0x88_O_move;

    return this.info_return_e;
  }

  // для режима отдельного потока
  // iterative deepening with PVS
  go_depth(depth_max) {

    let info_return_search = this.search_start_0x88_O.start_search_id(this.pv_line_0x88_O, this.chess_board_0x88_O,
      this.move_generator_0x88_O, depth_max);

    this.info_return_e.score = info_return_search.score;
    this.info_return_e.pv_line_0x88_O = info_return_search.pv_line_0x88_O;
    this.info_return_e.node_count = info_return_search.node_count;
    this.info_return_e.chess_board_0x88_O_move = info_return_search.chess_board_0x88_O_move;

    return this.info_return_e;
  }

  /////////////////////////////

  // set position
  position(chessBoard_8x8_O) {
    this.chess_board_0x88_O.set_0x88_from_8x8(chessBoard_8x8_O);

  }

  //this.one_click_on_squares_x, this.one_click_on_squares_y, x_b_n, y_b_n
  pseudo_move_is_ok(from_x, from_y, to_x, to_y, chessBoard_8x8_O) {

    // инициализируем вспомогательный массив    
    this.chess_board_0x88_O_gui.set_0x88_from_8x8(chessBoard_8x8_O);

    let from = this.chess_board_0x88_O_gui.x07_y07_to_0x88(from_x, from_y);
    let to = this.chess_board_0x88_O_gui.x07_y07_to_0x88(to_x, to_y);
    this.move_list_gui_0x88_O.clear_list();
    this.move_generator_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, this.chess_board_0x88_O_gui,
      this.move_list_gui_0x88_O);

    // console.log("IfritChessEngine_С-> print_list---------- ");
    // this.move_list_gui_0x88_O.test_print_list(this.chess_board_0x88_O); 
    // this.chess_board_0x88_O.test_print_0x88();
    // this.chess_board_0x88_O.test_print_0x88_color();
    let ret = this.move_list_gui_0x88_O.move_is_legal(from, to);

    //console.log("IfritChessEngine_С-> from_x " + from_x + " from_y " + from_y +" to_x " + to_x + " to_y " + to_y);
    //console.log("IfritChessEngine_С-> from " + from + " to " + to);
    //console.log("IfritChessEngine_С-> ret " + ret);

    return ret;
  }

  //
  move_is_legal(one_click_on_squares_x, one_click_on_squares_y, x_b_n, y_b_n, chessBoard_8x8_O) {

    // инициализируем вспомогательный массив    
    this.chess_board_0x88_O_gui.set_0x88_from_8x8(chessBoard_8x8_O);

    // переводим кординаты х у в одну для генератора позиций
    let from = this.chess_board_0x88_O_gui.x07_y07_to_0x88(one_click_on_squares_x, one_click_on_squares_y);
    let to = this.chess_board_0x88_O_gui.x07_y07_to_0x88(x_b_n, y_b_n);
    //------
    // обсчитываем всевозможные ходы и заполняем специальный список move_list_gui_0x88_O
    this.move_list_gui_0x88_O.clear_list();
    this.move_generator_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, this.chess_board_0x88_O_gui,
      this.move_list_gui_0x88_O, this.move_generator_0x88_O);
    //------
    //console.log("from_king gui " + IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O.king_from);
    // находим номер нашего хода в списке ходов
    let move_i = this.move_list_gui_0x88_O.return_i_move(from, to);

    // сохраняем доску в специальную chess_board_0x88_O_save_gui
    this.chess_board_0x88_O_save_gui.save_chess_board_0x88(this.chess_board_0x88_O_gui);

    // делаем ход и возвращаем флаг легальности хода  
    //console.log("ChessBoard_8x8_C->click(mouseDown) СДЕЛАЕМ ХОД ДЛЯ ПРОВЕРКИ ЛЕГАЛЬНОСТИ from " + from + " to "+ to);
    let is_moove_legal = IfritChessGame_R.chessEngine_0x88_O.search_start_0x88_O.make_move_0x88_O.do_moves(move_i,
      this.chess_board_0x88_O_gui, this.move_list_gui_0x88_O, this.undo_0x88_O, this.move_generator_0x88_O);

    return is_moove_legal;

  }

  draw_rect_move(from_x, from_y, chessBoard_8x8_O, draw_O) {
    this.chess_board_0x88_O_gui.set_0x88_from_8x8(chessBoard_8x8_O);
    let from = this.chess_board_0x88_O.x07_y07_to_0x88(from_x, from_y);
    this.move_list_gui_0x88_O.clear_list();
    this.move_generator_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, this.chess_board_0x88_O_gui,
      this.move_list_gui_0x88_O, this.move_generator_0x88_O);

    draw_O.draw_rect_move(this.move_list_gui_0x88_O, this.chess_board_0x88_O_gui, chessBoard_8x8_O, Html5Canvas_C.BLUE);
  }
}