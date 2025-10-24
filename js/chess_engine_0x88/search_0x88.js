/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_0x88.js
 * @version created 11.10m.2025 
 * last modified 11.10m.2025, 22.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Search_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();
  pv_line_0x88_O = new PV_line_0x88_C();

  static NAME = "Search_0x88_C";

  node = 0;

  chess_board_0x88_O_move = new Chess_board_0x88_C();


  constructor() {

  }

  iniM() {
    //for tactical and quiet moves
  }

  test_start_search(chess_board_0x88_O, move_generator_0x88_O, depth_max) {
    let score;// текущая оценка позиции
    let depth = 0;
    this.node = 0;
    let alpha = -50000;
    let beta = 50000;

    //score = this.searching_minimax(chess_board_0x88_O, move_generator_0x88_O, depth, depth_max);
    score = this.searching_alpha_beta(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, depth, depth_max);
    //console.log("Search_0x88_C->start_search " + depth + " score " + score);
    this.pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);
    return score;
  }


  start_search(chess_board_0x88_O, move_generator_0x88_O, depth_max) {
    let score;// текущая оценка позиции
    let depth = 0;
    this.node = 0;
    let alpha = -50000;
    let beta = 50000;

    //score = this.searching_minimax(chess_board_0x88_O, move_generator_0x88_O, depth, depth_max);
    //score = this.searching_alpha_beta(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, depth, depth_max);
    score = this.searching_alpha_beta_fail_hard(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, depth, depth_max);
    //console.log("Search_0x88_C->start_search " + depth + " score " + score);
    this.pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);
    return score;
  }

  // searching_alpha_beta_fail_hard
  searching_alpha_beta_fail_hard(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, depth, depth_max) {
    let undo_0x88_O = new Undo_0x88_C();
    let score = 0;// текущая оценка позиции
    let number_moove_legal = 0;

    if (depth >= depth_max) {
      score = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      this.node = this.node + 1;
      //console.log("Search_0x88_C->MAX depth " + depth + " found_score " + found_score);
      //chess_board_0x88_O.test_print_0x88();
      return score;
    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();
      move_generator_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      //  console.log("Search_0x88_C->depth " + depth + "до сортировки >>>>>>>>>>>>>>>>>>>>>>>>>>> ");
      //  move_list_0x88_O.test_print_list(chess_board_0x88_O);           
      move_list_0x88_O.sorting_list();
      //  console.log("Search_0x88_C->depth " + depth + "после сортировки <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");       
      //  move_list_0x88_O.test_print_list(chess_board_0x88_O);       
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        //console.log("Search_0x88_C->2 ");
        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
        //здесь должен быть контроль легальности хода
        if (is_moove_legal == 0) {
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
          }
          continue;
        }
        number_moove_legal = number_moove_legal + 1;
        score = this.searching_alpha_beta_fail_hard(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
        move_list_0x88_O.score_move[move_i] = score;
        //if (depth == 0)  console.log("Search_0x88_C->MAX depth == 0 depth " + depth + " score " + score);
        //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
        if (move_list_0x88_O.piece_color[move_i] == 1) {//

          if (score >= beta) {
            // восстановили доску
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
            return beta;   // fail hard beta-cutoff
          }

          // белые ищут максимум
          if (score > alpha) {
            alpha = score; // alpha acts like max in MiniMax
            this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);

            //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
          }

        } else {

          if (score <= alpha) {
            // восстановили доску
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
            return alpha; // fail hard alpha-cutoff         
          }
          // черные ищут минимум          
          if (score < beta) {
            beta = score; // beta acts like min in MiniMax
            this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
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

  searching_alpha_beta(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, depth, depth_max) {
    let undo_0x88_O = new Undo_0x88_C();
    let score = 0;// текущая оценка позиции
    let found_score;// максимальная оценка позиции
    if (chess_board_0x88_O.side_to_move == 1) {
      found_score = -20000;// максимальная оценка позиции
    } else {
      found_score = 20000;// минимальная оценка позиции
    }
    if (depth >= depth_max) {
      found_score = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      this.node = this.node + 1;
      //console.log("Search_0x88_C->MAX depth " + depth + " found_score " + found_score);
      //chess_board_0x88_O.test_print_0x88();
    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();
      move_generator_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      //  console.log("Search_0x88_C->depth " + depth + "до сортировки >>>>>>>>>>>>>>>>>>>>>>>>>>> ");
      //  move_list_0x88_O.test_print_list(chess_board_0x88_O);           
      move_list_0x88_O.sorting_list();
      //  console.log("Search_0x88_C->depth " + depth + "после сортировки <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");       
      //  move_list_0x88_O.test_print_list(chess_board_0x88_O);       
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        //console.log("Search_0x88_C->2 ");
        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
        //здесь должен быть контроль легальности хода
        if (is_moove_legal == 0) {
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
          }
          continue;
        }
        score = this.searching_alpha_beta(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
        move_list_0x88_O.score_move[move_i] = score;
        //if (depth == 0)  console.log("Search_0x88_C->MAX depth == 0 depth " + depth + " score " + score);
        //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
        if (chess_board_0x88_O.side_to_move == 0) {// тут черные потому что ход за белых сделан, и мне нужно его записать, хотя
          // поиск идет со стороны белых. такая вот неочевидная засада.
          // белые ищут максимум
          if (score > found_score) {
            found_score = score;
            if (score > alpha) alpha = score; // alpha acts like max in MiniMax
            this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);

            //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
          }
          if (score >= beta) {
            // восстановили доску
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
            return score;   // fail soft beta-cutoff
          }
        } else {
          // черные ищут минимум          
          if (score < found_score) {
            found_score = score;
            if (score < beta) beta = score; // beta acts like min in MiniMax
            this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
            //console.log("Search_0x88_C->score > min_score depth " + depth + " found_score " + found_score);
          }
          if (score <= alpha) {
            // восстановили доску
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
            return score; // fail soft alpha-cutoff, break can also be used here          
          }
        }
        // восстановили доску
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
      }
    }
    return found_score;
  }


  searching_minimax(chess_board_0x88_O, move_generator_0x88_O, depth, depth_max) {
    //let chess_board_0x88_O_save = new Chess_board_0x88_C();
    let undo_0x88_O = new Undo_0x88_C();
    let score = 0;// текущая оценка позиции
    let found_score;// максимальная оценка позиции
    if (chess_board_0x88_O.side_to_move == 1) {
      found_score = -20000;// максимальная оценка позиции
    } else {
      found_score = 20000;// минимальная оценка позиции
    }
    if (depth >= depth_max) {
      found_score = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      this.node = this.node + 1;
      //console.log("Search_0x88_C->MAX depth " + depth + " found_score " + found_score);
      //chess_board_0x88_O.test_print_0x88();
    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();
      move_generator_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      move_list_0x88_O.sorting_list();
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        //console.log("Search_0x88_C->2 ");
        // записали доску
        //chess_board_0x88_O_save.save_chess_board_0x88(chess_board_0x88_O);
        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
        //здесь должен быть контроль легальности хода
        if (is_moove_legal == 0) {
          /////////////////////////////////////////////////////////////////////
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
            // if (chess_board_0x88_O.test_compare_chess_board_0x88(chess_board_0x88_O_save) != 1) {
            //   console.log("Search_0x88_C-> отмена нелегального хода прошла с ошибкой --------------------------");
            //   move_list_0x88_O.test_print_i_move_list(move_i, chess_board_0x88_O);
            // }
          }
          // восстановили доску
          //chess_board_0x88_O.save_chess_board_0x88(chess_board_0x88_O_save);
          continue;
        }
        score = this.searching_minimax(chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
        move_list_0x88_O.score_move[move_i] = score;
        //if (depth == 0)  console.log("Search_0x88_C->MAX depth == 0 depth " + depth + " score " + score);
        //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
        if (chess_board_0x88_O.side_to_move == 0) {// тут черные потому что ход за белых сделан, и мне нужно его записать, хотя
          // поиск идет со стороны белых. такая вот неочевидная засада.
          // белые ищут максимум
          if (score > found_score) {
            found_score = score;
            this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
            //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
          }
        } else {
          // черные ищут минимум
          if (score < found_score) {
            found_score = score;
            this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
            //console.log("Search_0x88_C->score > min_score depth " + depth + " found_score " + found_score);
          }
        }
        /////////////////////////////////////////////////////////////////////
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
        // if (chess_board_0x88_O.test_compare_chess_board_0x88(chess_board_0x88_O_save) != 1) {
        //   console.log("Search_0x88_C-> отмена хода прошла с ошибкой --------------------------");
        //   move_list_0x88_O.test_print_i_move_list(move_i, chess_board_0x88_O);
        // }
        // восстановили доску
        //chess_board_0x88_O.save_chess_board_0x88(chess_board_0x88_O_save);
      }
    }
    return found_score;
  }


  test_searching_minimax(chess_board_0x88_O, move_generator_0x88_O, depth, depth_max) {
    let chess_board_0x88_O_save = new Chess_board_0x88_C();
    let undo_0x88_O = new Undo_0x88_C();
    let score = 0;// текущая оценка позиции
    let found_score;// максимальная оценка позиции
    if (chess_board_0x88_O.side_to_move == 1) {
      found_score = -20000;// максимальная оценка позиции
    } else {
      found_score = 20000;// минимальная оценка позиции
    }
    if (depth >= depth_max) {
      found_score = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      this.node = this.node + 1;
      //console.log("Search_0x88_C->MAX depth " + depth + " found_score " + found_score);
      //chess_board_0x88_O.test_print_0x88();
    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();
      move_generator_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      move_list_0x88_O.sorting_list();
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        //console.log("Search_0x88_C->2 ");
        // записали доску
        chess_board_0x88_O_save.test_save_chess_board_0x88(chess_board_0x88_O);
        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
        //здесь должен быть контроль легальности хода
        if (is_moove_legal == 0) {
          /////////////////////////////////////////////////////////////////////
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);

            if (chess_board_0x88_O.test_compare_chess_board_0x88(chess_board_0x88_O_save) != 1) {
              console.log("Search_0x88_C-> отмена нелегального хода прошла с ошибкой --------------------------");
              move_list_0x88_O.test_print_i_move_list(move_i, chess_board_0x88_O);
            }

          }
          // восстановили доску
          //chess_board_0x88_O.save_chess_board_0x88(chess_board_0x88_O_save);
          continue;
        }
        score = this.searching_minimax(chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
        move_list_0x88_O.score_move[move_i] = score;
        //if (depth == 0)  console.log("Search_0x88_C->MAX depth == 0 depth " + depth + " score " + score);
        //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
        if (chess_board_0x88_O.side_to_move == 0) {// тут черные потому что ход за белых сделан, и мне нужно его записать, хотя
          // поиск идет со стороны белых. такая вот неочевидная засада.
          // белые ищут максимум
          if (score > found_score) {
            found_score = score;
            this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
            //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
          }
        } else {
          // черные ищут минимум
          if (score < found_score) {
            found_score = score;
            this.pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
            //console.log("Search_0x88_C->score > min_score depth " + depth + " found_score " + found_score);
          }
        }
        /////////////////////////////////////////////////////////////////////
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
        if (chess_board_0x88_O.test_compare_chess_board_0x88(chess_board_0x88_O_save) != 1) {
          console.log("Search_0x88_C-> отмена хода прошла с ошибкой --------------------------");
          move_list_0x88_O.test_print_i_move_list(move_i, chess_board_0x88_O);
        }
        // восстановили доску
        //chess_board_0x88_O.save_chess_board_0x88(chess_board_0x88_O_save);
      }
    }
    return found_score;
  }

}