/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_minmax_0x88.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

import { Move_list_0x88_С } from "./move_generator/move_list_0x88.js";
import { Make_move_0x88_C } from "./move_generator/make_move_0x88.js";
import { Unmake_move_0x88_C } from "./move_generator/unmake_move_0x88.js";
import { Evaluate_0x88_C } from "./evaluate_0x88.js";
import { Chess_board_0x88_C } from "./move_generator/chess_board_0x88.js";
import { Undo_0x88_C } from "./move_generator/undo_0x88.js";
import { PV_line_0x88_C } from "./pv_line_0x88.js";

class Search_minmax_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();


  static NAME = "Search_minmax_0x88_C";
  static BEST_VALUE_MOD = 20000;

  node = 0;

  chess_board_0x88_O_end = new Chess_board_0x88_C();

  constructor() {
  }

  iniM() {
    //for tactical and quiet moves
  }

  searching_minmax(pv_line_0x88_O, chess_board_0x88_O,
    move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth, depth_max) {
    let undo_0x88_O = new Undo_0x88_C();
    let best_node_line_0x88_O = new PV_line_0x88_C();

    let score = 0;// текущая оценка позиции
    let found_score;// максимальная оценка позиции


    if (depth >= depth_max) {
      found_score = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      this.node = this.node + 1;
      pv_line_0x88_O.score_depth_max = found_score;

    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();

      if (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE) {
        found_score = -Search_minmax_0x88_C.BEST_VALUE_MOD;// максимальная оценка позиции
      } else {
        found_score = Search_minmax_0x88_C.BEST_VALUE_MOD;// максимальная оценка позиции
      }

      move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      //move_list_0x88_O.sorting_list(); 
      //move_list_0x88_O.test_print_list(chess_board_0x88_O);

      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O,);

        if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          continue;
        } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
          continue;
        }

        pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
        pv_line_0x88_O.type_variant[depth] = "nm";

        score = this.searching_minmax(pv_line_0x88_O, chess_board_0x88_O,
          move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, (depth + 1), depth_max);

        if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) {

          if (score > found_score) {
            found_score = score;
            best_node_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_line_0x88_O.type_variant[depth] = "mm_M";

            if (depth == 0) this.chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O);
            //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
          }//if (score > found_score) {

        } else {

          if (score < found_score) {
            found_score = score;
            best_node_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_line_0x88_O.type_variant[depth] = "mm_B";

            if (depth == 0) this.chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O);
            //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
          }//if (score > found_score) {

        }

        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);

      }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      pv_line_0x88_O.save_list(best_node_line_0x88_O);
    }//if (depth >= depth_max) {

    return found_score;
  }//searching_negamax(pv_line_0x88_O, chess_board_0x88_O,
}

export { Search_minmax_0x88_C };

/*
int negaMax( int depth ) {
    if ( depth == 0 ) return evaluate();
    int max = -oo;
    for ( all moves)  {
        score = -negaMax( depth - 1 );
        if( score > max )
            max = score;
    }
    return max;
}
*/