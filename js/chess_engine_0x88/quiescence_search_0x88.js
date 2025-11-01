/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name quiescence_search_0x88.js
 * @version created 27.10m.2025 
 * last modified 27.10m.2025
*/

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
  quiescence_search(alpha, beta, chess_board_0x88_O, move_gen_1_captures_0x88_O, depth) {
    let undo_0x88_O = new Undo_0x88_C();
    let score = 0;// текущая оценка позиции
    let best_value;// максимальная оценка позиции

    let is_moove_legal = -1;
    let move_list_0x88_O = new Move_list_0x88_С();

    let static_eval = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
    this.node = this.node + 1;

    // Stand Pat =====================================
    best_value = static_eval;

      if (best_value >= beta) return best_value;
      if (best_value > alpha) alpha = best_value;

    // ===================================== Stand Pat
   
    move_list_0x88_O.iniM();
    move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    move_list_0x88_O.sorting_list();


    for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O);
 
      if (is_moove_legal == 0) {
        /////////////////////////////////////////////////////////////////////
        // особый случай. нелегальные рокировки не генерируются
        if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
          (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
        }
 
        continue;
      }
 
      score = -1 * this.quiescence_search(-1 * beta, -1 * alpha, chess_board_0x88_O, move_gen_1_captures_0x88_O, (depth + 1));

      move_list_0x88_O.score_move[move_i] = score;

        if (score >= beta) {
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          return score;
        }
        if (score > best_value) best_value = score;
        if( score > alpha ) alpha = score;

      /////////////////////////////////////////////////////////////////////
      this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
    }
 
    return best_value;
  }
}

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