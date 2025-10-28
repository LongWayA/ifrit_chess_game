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
    //let best_node_line_0x88_O = new PV_line_0x88_C();
    let score = 0;// текущая оценка позиции
    let best_value;// максимальная оценка позиции

    let is_moove_legal = -1;
    let move_list_0x88_O = new Move_list_0x88_С();

 //   let be_move = 0;
 //   let be_best_move = 0;

    let static_eval = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
    this.node = this.node + 1;


    // if (chess_board_0x88_O.side_to_move == 1) {
    //   best_value = -20000;// максимальная оценка позиции
    // } else {
    //   best_value = 20000;// минимальная оценка позиции
    // }

    // Stand Pat =====================================
    best_value = static_eval;

    if (chess_board_0x88_O.side_to_move == 1) {
      if (best_value >= beta) return best_value;
      if (best_value > alpha) alpha = best_value;
    } else {
      if (best_value <= alpha) return best_value;
      if (best_value < beta) beta = best_value;
    }
    // ===================================== Stand Pat

    //console.log("Quiescence_search_0x88_C->MAX depth " + depth + " found_score " + found_score);
    //chess_board_0x88_O.test_print_0x88();

    move_list_0x88_O.iniM();
    move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    move_list_0x88_O.sorting_list();

    //console.log("Quiescence_search_0x88_C->depth " + depth);
    //chess_board_0x88_O.test_print_0x88();
    //  chess_board_0x88_O.test_print_0x88_color();
    //  chess_board_0x88_O.test_print_any_0x88();
    //move_list_0x88_O.test_print_list(chess_board_0x88_O);


    for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
      //console.log("Search_0x88_C->2 ");

      is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O);
      //здесь должен быть контроль легальности хода
      if (is_moove_legal == 0) {
        /////////////////////////////////////////////////////////////////////
        // особый случай. нелегальные рокировки не генерируются
        if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
          (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O);
        }
 
        continue;
      }

      //pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
      //pv_line_0x88_O.quiescence[depth] = "q";
      //be_move = 1;
      //score = this.quiescence_search(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O, (depth + 1));
      score = this.quiescence_search(alpha, beta, chess_board_0x88_O, move_gen_1_captures_0x88_O, (depth + 1));

      move_list_0x88_O.score_move[move_i] = score;

      if (chess_board_0x88_O.side_to_move == 0) {// тут черные потому что ход за белых сделан, и мне нужно его записать, хотя

        if (score >= beta) {
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O);
          return score;
        }

        // белые ищут максимум
        if (score > best_value) {
          best_value = score;
         // best_node_line_0x88_O.save_list(pv_line_0x88_O);
         // best_node_line_0x88_O.quiescence[depth] = "q_W";
         // best_node_line_0x88_O.score_move[depth] = score;
         // be_best_move = 1;
          //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
        }

        if( score > alpha ) alpha = score;

      } else {

       if (score <= alpha) {
          // восстановили доску
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O);
          return score; // fail soft alpha-cutoff, break can also be used here          
        }

        // черные ищут минимум
        if (score < best_value) {
          best_value = score;
          if (score < beta) beta = score;    
          //best_node_line_0x88_O.save_list(pv_line_0x88_O);
          //best_node_line_0x88_O.quiescence[depth] = "q_B";
          //best_node_line_0x88_O.score_move[depth] = score;
          //be_best_move = 1;
          //console.log("Search_0x88_C->score > min_score depth " + depth + " found_score " + found_score);
        }

         if (score < beta) beta = score; 

      }
      /////////////////////////////////////////////////////////////////////
      this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O,);
    }


    // if (be_move == 1) {
    //   if (be_best_move == 1) {
    //     pv_line_0x88_O.save_list(best_node_line_0x88_O);
    //   }
    // } else {// если взятий нет просто возвращаем оценку
    //   pv_line_0x88_O.score_depth_max = best_value;
    // }

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