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

  depth_max = 2;// максимальная глубина
  chess_board_0x88_O_move = new Chess_board_0x88_C();


  constructor() {

  }

  iniM() {

  }

  start_search(chess_board_0x88_O, move_generator_0x88_O) {
    let value;// текущая оценка позиции
    let depth = 0;
    value = this.searching_negamax(chess_board_0x88_O, move_generator_0x88_O, depth);
    this.pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);
    return value;
  }

  searching_negamax(chess_board_0x88_O, move_generator_0x88_O, depth) {
    let chess_board_0x88_O_save = new Chess_board_0x88_C();
    let undo_0x88_O = new Undo_0x88_C();
    let value = 0;// текущая оценка позиции
    let max_value = -20000;// максимальная оценка позиции
    if (depth >= this.depth_max) {
      max_value = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      //console.log("Search_0x88_C->MAX depth " + depth + " value " + value);
      //chess_board_0x88_O.test_print_0x88();
    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();
      move_generator_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        //console.log("Search_0x88_C->2 ");
        this.make_move_0x88_O.save_chess_board_0x88(chess_board_0x88_O, chess_board_0x88_O_save);
        this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
        value = -1 * this.searching_negamax(chess_board_0x88_O, move_generator_0x88_O, (depth + 1));
        move_list_0x88_O.score_move[move_i] = value;
         //if (depth == 0)  console.log("Search_0x88_C->MAX depth == 0 depth " + depth + " value " + value);
        if (value > max_value) {
          max_value = value;
          this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
          if (depth == 0) this.make_move_0x88_O.save_chess_board_0x88(chess_board_0x88_O, this.chess_board_0x88_O_move);
          //console.log("Search_0x88_C->value > max_value depth " + depth);
        }
        this.make_move_0x88_O.restore_chess_board_0x88(chess_board_0x88_O, chess_board_0x88_O_save);
      }
    }
    return max_value;
  }
}