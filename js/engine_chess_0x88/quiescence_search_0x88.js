/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name quiescence_search_0x88.js
 * @version created 27.10m.2025 
 * last modified 27.10m.2025
*/

import { Chess_board_0x88_C } from "./move_generator/chess_board_0x88.js?v=2911m25";
import { Make_move_0x88_C} from "./move_generator/make_move_0x88.js?v=2911m25";
import { Unmake_move_0x88_C } from "./move_generator/unmake_move_0x88.js?v=2911m25";
import { Evaluate_0x88_C} from "./evaluate_0x88.js?v=2911m25";
import { Undo_0x88_C } from "./move_generator/undo_0x88.js?v=2911m25";
import { Move_list_0x88_С } from "./move_generator/move_list_0x88.js?v=2911m25";

/**
* НАЗНАЧЕНИЕ

*/

class Quiescence_search_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();

  static NAME = "Quiescence_search_0x88_C";

  node = 0;

  constructor() {
  }

  iniM() {
    //for tactical and quiet moves
  }

  //quiescence_search(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O, depth) {
  quiescence_search(alpha, beta, chess_board_0x88_O, move_gen_1_captures_0x88_O, depth, transposition_table_0x88_O) {
    let undo_0x88_O = new Undo_0x88_C();
    let score = 0;// текущая оценка позиции
    let best_value;// максимальная оценка позиции

    let is_moove_legal = -1;
    let move_list_0x88_O = new Move_list_0x88_С();

    let static_eval = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
    this.node = this.node + 1;

    // Stand Pat =====================================
    best_value = static_eval;

    if (chess_board_0x88_O.side_to_move == 1) {
      if (best_value >= beta) return best_value;
      if (best_value > alpha) alpha = best_value;
    } else {
      if (best_value <= alpha) return best_value;
      if (best_value < beta) alpha = best_value;
    }
    // ===================================== Stand Pat

    move_list_0x88_O.iniM();
    move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    move_list_0x88_O.sorting_list();


    for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, 
        move_gen_1_captures_0x88_O, transposition_table_0x88_O);

        if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          continue;
        } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
          continue;
        }

      score = this.quiescence_search(alpha, beta, chess_board_0x88_O, move_gen_1_captures_0x88_O, (depth + 1), transposition_table_0x88_O);

      if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) {
        if (score >= beta) {
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          return score;
        }
        if (score > best_value) best_value = score;
        if (score > alpha) alpha = score;
      } else {

        if (score <= alpha) {
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          return score;
        }
        if (score < best_value) best_value = score;
        if (score < beta) alpha = score;
      }
 
      this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
    }

    return best_value;
  }
}

export{Quiescence_search_0x88_C};

/*
https://www.chessprogramming.org/Quiescence_Search

int Quiesce( int alpha, int beta ) {
    int static_eval = Evaluate();

    // Stand Pat
    int best_value = static_eval;
    if( best_value >= beta )
        return best_value;
    if( best_value > alpha )
        alpha = best_value;

    until( every_capture_has_been_examined )  {
        MakeCapture();
        score = -Quiesce( -beta, -alpha );
        TakeBackMove();

        if( score >= beta )
            return score;
        if( score > best_value )
            best_value = score;
        if( score > alpha )
            alpha = score;
    }

    return best_value;
}


*/