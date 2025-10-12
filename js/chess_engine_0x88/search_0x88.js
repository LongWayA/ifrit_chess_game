/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_0x88.js
 * @version created 11.10m.2025 
 * last modified 11.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Search_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();
  pv_line_0x88_O = new PV_line_0x88_C();

  static NAME = "Search_0x88_C";

  depth = 0;// глубина
  depth_max = 2;// максимальная глубина



  constructor() {

  }

  iniM() {

  }

  start_search(chess_board_0x88_O, move_generator_0x88_O) {
    let value;// текущая оценка позиции
    this.depth = 0;
    value = this.searching(chess_board_0x88_O, move_generator_0x88_O);
    return value;
  }

  searching(chess_board_0x88_O, move_generator_0x88_O) {
    let chess_board_0x88_O_s = new Chess_board_0x88_C();
    let undo_0x88_O = new Undo_0x88_C();
    let value;// текущая оценка позиции
    this.depth = this.depth + 1;
    if (this.depth >= this.depth_max) {
      console.log("Search_0x88_C->MAX depth " + this.depth);
      chess_board_0x88_O.test_drow_0x88();
      value = this.depth;
    } else {
      console.log("Search_0x88_C->depth " + this.depth);
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();
      move_generator_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        console.log("Search_0x88_C->2 ");
        this.make_move_0x88_O.do_undo_moves(chess_board_0x88_O, chess_board_0x88_O_s);
        this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
        value = this.searching(chess_board_0x88_O, move_generator_0x88_O);
        this.make_move_0x88_O.undo_moves(chess_board_0x88_O, chess_board_0x88_O_s);
      }
    }
    this.depth = this.depth - 1;
    return value;
  }

}