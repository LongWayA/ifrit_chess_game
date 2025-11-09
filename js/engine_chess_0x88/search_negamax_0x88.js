/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_negamax_0x88.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

import { Make_move_0x88_C} from "./make_move_0x88.js";
import { Unmake_move_0x88_C } from "./unmake_move_0x88.js";
import { Evaluate_0x88_C} from "./evaluate_0x88.js";
import { Chess_board_0x88_C } from "./chess_board_0x88.js";

class Search_negamax_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();

  static NAME = "Search_minmax_0x88_C";

  node = 0;

  chess_board_0x88_O_move = new Chess_board_0x88_C();

  constructor() {
  }

  iniM() {
    //for tactical and quiet moves
  }

  searching_negamax(pv_line_0x88_O, chess_board_0x88_O,
    move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth, depth_max) {
    let undo_0x88_O = new Undo_0x88_C();
    let best_node_line_0x88_O = new PV_line_0x88_C();

    let score = 0;// текущая оценка позиции
    let found_score = -20000;// максимальная оценка позиции


    if (depth >= depth_max) {
      found_score = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      this.node = this.node + 1;
      pv_line_0x88_O.score_depth_max = found_score;

    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();

      move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      //move_list_0x88_O.sorting_list(); 

      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O,);
 
        if (is_moove_legal == 0) {
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {

            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);

          }//if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
          ;
          continue;
        }//if (is_moove_legal == 0) {

        pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
        pv_line_0x88_O.type_variant[depth] = "nm";

        score = -1 * this.searching_negamax(pv_line_0x88_O, chess_board_0x88_O,
          move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, (depth + 1), depth_max);

        move_list_0x88_O.score_move[move_i] = score;

        if (score > found_score) {
          found_score = score;
          best_node_line_0x88_O.save_list(pv_line_0x88_O);
          best_node_line_0x88_O.type_variant[depth] = "nm_M";

          if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
          //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
        }//if (score > found_score) {

        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);

      }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      pv_line_0x88_O.save_list(best_node_line_0x88_O);
    }//if (depth >= depth_max) {

    return found_score;
  }//searching_negamax(pv_line_0x88_O, chess_board_0x88_O,
}

export{Search_negamax_0x88_C};

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