/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_0x88.js
 * @version created 11.10m.2025 
 * last modified 11.10m.2025, 24.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Search_pvs_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();

  static NAME = "Search_pvs_0x88_C";

  node = 0;

  constructor() {

  }

  iniM() {
    //for tactical and quiet moves
  }

  // 
  searching_PVS(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, depth, depth_max) {
    let undo_0x88_O = new Undo_0x88_C();
    let score = 0;// текущая оценка позиции
    let number_moove_legal = 0;

    if (depth >= depth_max) {
      score = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      this.node = this.node + 1;
      return score;
    } else {
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();
      move_generator_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      move_list_0x88_O.sorting_list();
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
        if (is_moove_legal == 0) {
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
          }
          continue;
        }
        number_moove_legal = number_moove_legal + 1;

        if (move_list_0x88_O.piece_color[move_i] == 1) {//

          // if (move_i == 0) {
          //   score = this.searching_PVS(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
          //   move_list_0x88_O.score_move[move_i] = score;
          // } else {
          score = this.searching_PVS(alpha, (alpha + 1), pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
          move_list_0x88_O.score_move[move_i] = score;
          //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
          //         }
          if (score > alpha && score < beta) {
            score = this.searching_PVS(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
            move_list_0x88_O.score_move[move_i] = score;
          }

          if (score >= beta) {
            // восстановили доску
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
            return beta;   // fail hard beta-cutoff
          }

          // белые ищут максимум
          if (score > alpha) {
            alpha = score; // alpha acts like max in MiniMax
            pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
          }

        } else {

          // if (move_i == 0) {
          //   score = this.searching_PVS(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
          //   move_list_0x88_O.score_move[move_i] = score;
          // } else {
          score = this.searching_PVS((beta - 1), beta, pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
          move_list_0x88_O.score_move[move_i] = score;
          //if (depth == 0)  console.log("Search_0x88_C->MAX depth == 0 depth " + depth + " score " + score);
          //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
          //          }

          if (score < beta && score > alpha) {
            score = this.searching_PVS(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
            move_list_0x88_O.score_move[move_i] = score;
          }

          if (score <= alpha) {
            // восстановили доску
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
            return alpha; // fail hard alpha-cutoff         
          }
          // черные ищут минимум          
          if (score < beta) {
            beta = score; // beta acts like min in MiniMax
            pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            //console.log("Search_0x88_C->score > min_score depth " + depth + " found_score " + found_score);
          }
        }
        // восстановили доску
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
      }
    }

    // это мат или пат
    if (number_moove_legal == 0) {
      if (chess_board_0x88_O.side_to_move == 1) {
        if (move_generator_0x88_O.check_detected(chess_board_0x88_O.searching_king(1), 1, chess_board_0x88_O) != 0) {
          return -20000;
        }
        return 0;
      } else {
        if (move_generator_0x88_O.check_detected(chess_board_0x88_O.searching_king(0), 0, chess_board_0x88_O) != 0) {
          return 20000;
        }
        return 0;
      }
    }

    if (chess_board_0x88_O.side_to_move == 1) {
      return alpha;
    } else {
      return beta;
    }
  }
}