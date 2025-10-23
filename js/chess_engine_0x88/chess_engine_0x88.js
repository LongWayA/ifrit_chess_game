/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_engine_0x88.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class ChessEngine_0x88_С {

  static NAME = "ChessEngine_0x88";

  // для всех
  move_generator_0x88_O = new Move_generator_0x88_С();
  search_0x88_O = new Search_0x88_C();
  chess_board_0x88_O = new Chess_board_0x88_C();

  // для счета движка
  move_list_0x88_O = new Move_list_0x88_С();

  // обеспечение оболочки
  chess_board_0x88_O_save_gui = new Chess_board_0x88_C();
  move_list_gui_0x88_O = new Move_list_0x88_С();
  //---------

  score = 0;

  constructor() {

  }

  iniM() {
    this.chess_board_0x88_O.iniM();
    this.move_list_0x88_O.iniM();
    this.move_generator_0x88_O.iniM();
    this.search_0x88_O.iniM();
  }

  go_test(depth_max) {
    console.log("ChessEngine_0x88_С->go_test --------");
    this.chess_board_0x88_O.score = this.search_0x88_O.evaluate_0x88_O.score_position(this.chess_board_0x88_O);
    this.chess_board_0x88_O.test_print_0x88();
    this.chess_board_0x88_O.test_print_0x88_color();
    console.log("ChessEngine_0x88_С->chess_board_0x88_O.score " + this.chess_board_0x88_O.score);
    this.chess_board_0x88_O.test_print_any_0x88();
    this.move_generator_0x88_O.generated_pseudo_legal_moves(this.chess_board_0x88_O, this.move_list_0x88_O);
    this.move_list_0x88_O.test_print_list(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);
  }


  go_search(depth_max) {

    this.score = this.search_0x88_O.start_search(this.chess_board_0x88_O, this.move_generator_0x88_O, depth_max);
    //режим без ответа компа                    
    ///IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.test_print_0x88();
    ///IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.test_print_0x88_color();
    ///////////////////
    // с ответом компа                   
    this.search_0x88_O.chess_board_0x88_O_move.test_print_0x88();
    this.search_0x88_O.chess_board_0x88_O_move.test_print_0x88_color();
    //console.log("ChessEngine_0x88_С->score " + this.score);
    //this.chess_board_0x88_O.test_print_0x88();
    //this.chess_board_0x88_O.test_print_0x88_color();
  }

  //this.one_click_on_squares_x, this.one_click_on_squares_y, x_b_n, y_b_n
  move_is_legal(from_x, from_y, to_x, to_y) {

    let from = this.chess_board_0x88_O.x07_y07_to_0x88(from_x, from_y);
    let to = this.chess_board_0x88_O.x07_y07_to_0x88(to_x, to_y);
    this.move_list_gui_0x88_O.clear_list();
    this.move_generator_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, this.chess_board_0x88_O,
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

  draw_rect_move(from_x, from_y, chessBoard_8x8_O, draw_O) {

    let from = this.chess_board_0x88_O.x07_y07_to_0x88(from_x, from_y);
    this.move_list_gui_0x88_O.clear_list();
    this.move_generator_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from, this.chess_board_0x88_O,
      this.move_list_gui_0x88_O, this.move_generator_0x88_O);

    draw_O.draw_rect_move(this.move_list_gui_0x88_O, this.chess_board_0x88_O, chessBoard_8x8_O, Html5Canvas_C.BLUE);
  }
}