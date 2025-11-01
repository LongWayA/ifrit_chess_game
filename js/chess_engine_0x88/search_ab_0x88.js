/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_0x88.js
 * @version created 11.10m.2025 
 * last modified 11.10m.2025, 24.10m.2025
*/

/**
* НАЗНАЧЕНИЕ
  что выгоднее в chess engine alpha beta fail soft или alpha beta fail_hard ?
  ответ от  Google AI:
  В современных шахматных движках, которые активно используют PVS и таблицы перестановок, 
  fail-soft является стандартом де-факто, так как он обеспечивает 
  более быструю и точную работу алгоритма.
  ----------------------
  
  ответ от  Google AI:
  Примерная оценка: В реальных тестах, при хорошем упорядочивании ходов, 
  PVS может потребовать примерно на 10% меньше вычислений (или узлов для поиска), 
  чем стандартный альфа-бета алгоритм. В некоторых случаях сообщалось о 
  сокращении общего числа узлов и времени примерно на 33%.

*/

class Search_ab_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();

  static NAME = "Search_ab_0x88_C";

  node = 0;

  chess_board_0x88_O_move = new Chess_board_0x88_C();
  quiescence_search_0x88_O = new Quiescence_search_0x88_C();

  constructor() {

  }

  iniM() {
    //for tactical and quiet moves
  }

  // searching_alpha_beta_fail_soft
  searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
    move_gen_2_quiet_0x88_O, depth, depth_max, isPV) {

    let undo_0x88_O = new Undo_0x88_C();
    let best_node_line_0x88_O = new PV_line_0x88_C();
    let score = 0;// текущая оценка позиции
    let found_score;// максимальная оценка позиции
    //let found_score_test;// максимальная оценка позиции    
    let is_update_pv_line;// максимальная оценка позиции    
    let number_moove_legal = 0;
    let isPV_node = 0;


    is_update_pv_line = 0;

    found_score = -80000;// максимальная оценка позиции

    if (depth >= depth_max) {
      //found_score_test = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      this.node = this.node + 1;

      this.quiescence_search_0x88_O.node = 0;
      //found_score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,      
      found_score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, chess_board_0x88_O,
        move_gen_1_captures_0x88_O, depth);
      //this.node = this.node + this.quiescence_search_0x88_O.node;

      pv_line_0x88_O.score_depth_max = found_score;
      //console.log("Search_0x88_C-> depth " + depth + " found_scoreQ " + found_score + " found_score " + found_score_test);
      //chess_board_0x88_O.test_print_0x88();
    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();

      move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      //  console.log("Search_0x88_C->depth " + depth + "до сортировки >>>>>>>>>>>>>>>>>>>>>>>>>>> ");
      //  move_list_0x88_O.test_print_list(chess_board_0x88_O);     
      //move_list_0x88_O.sorting_list();
      //  console.log("Search_0x88_C->depth " + depth + "после сортировки <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");       
      //  move_list_0x88_O.test_print_list(chess_board_0x88_O); 
      move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      move_list_0x88_O.sorting_list();

      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        //console.log("Search_0x88_C->2 ");
        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O);
        //здесь должен быть контроль легальности хода
        if (is_moove_legal == 0) {
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          }
          continue;
        }

        pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
        pv_line_0x88_O.quiescence[depth] = "ab";

        number_moove_legal = number_moove_legal + 1;
        //}
        // if (move_i == 0) {

        //   score = -1 * this.searching_alpha_beta_test(-1 * beta, -1 * alpha, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
        //     move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV);

        //   move_list_0x88_O.score_move[move_i] = score;
        //   } else {
        isPV_node = 0;// не главная линия
        score = -1 * this.searching_alpha_beta_id(-1 * (alpha + 1), -1 * alpha, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
          move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node);

        move_list_0x88_O.score_move[move_i] = score;
        //   }

        if (score > alpha && score < beta) {
          isPV_node = 1;// главная линия          
          score = -1 * this.searching_alpha_beta_id(-1 * beta, -1 * alpha, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
            move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node);

          move_list_0x88_O.score_move[move_i] = score;
        }

        if (score > found_score) {
          found_score = score;
          if (score > alpha) {
            alpha = score; // 
            if (isPV == 1) { // записываем только на главной линии
              best_node_line_0x88_O.save_list(pv_line_0x88_O);
              best_node_line_0x88_O.quiescence[depth] = "ab_M";
              best_node_line_0x88_O.score_move[depth] = score;
              is_update_pv_line = 1;
            }
          }
          // if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
        }
        if (score >= beta) {
          // восстановили доску
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          return score;   // fail soft beta-cutoff
        }
        // восстановили доску
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
      }

      if (is_update_pv_line == 1) pv_line_0x88_O.save_list(best_node_line_0x88_O);

      //это мат или пат
      if (number_moove_legal == 0) {
        //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
        //console.log(' ALLERT  number_moove_legal == 0 !!!!!!!!!!!!!');
        if (chess_board_0x88_O.side_to_move == 1) {
          // ход белых. а ходов нет. это 0 пат, если же белый король под шахом это мат
          if (move_gen_1_captures_0x88_O.check_detected(chess_board_0x88_O.searching_king(1), 1, chess_board_0x88_O) != 0) {
            //console.log("Search_0x88_C-> W chek ");
            if (isPV == 1) {// записываем только на главной линии
              pv_line_0x88_O.score_depth_max = (20000 - depth);
            }
            return (20000 - depth);
          }
          if (isPV == 1) {// записываем только на главной линии
            pv_line_0x88_O.score_depth_max = 0;
          }
          return 0;
        } else {
          if (move_gen_1_captures_0x88_O.check_detected(chess_board_0x88_O.searching_king(0), 0, chess_board_0x88_O) != 0) {
            //console.log("Search_0x88_C-> B chek ");
            if (isPV == 1) {// записываем только на главной линии
              pv_line_0x88_O.score_depth_max = -1 * (20000 - depth);
            }
            return -1 * (20000 - depth);
          }
          if (isPV == 1) {// записываем только на главной линии
            pv_line_0x88_O.score_depth_max = 0;
          }
          return 0;
        }
      }

    }
    return found_score;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // searching_alpha_beta_fail_soft
  searching_alpha_beta_test(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
    move_gen_2_quiet_0x88_O, depth, depth_max) {

    let undo_0x88_O = new Undo_0x88_C();
    let best_node_line_0x88_O = new PV_line_0x88_C();
    let score = 0;// текущая оценка позиции
    let found_score;// максимальная оценка позиции
    //let found_score_test;// максимальная оценка позиции    
    let is_update_pv_line;// максимальная оценка позиции    
    let number_moove_legal = 0;

    is_update_pv_line = 0;

    found_score = -80000;// максимальная оценка позиции

    if (depth >= depth_max) {
      //found_score_test = this.evaluate_0x88_O.score_position(chess_board_0x88_O);
      //this.node = this.node + 1;

      this.quiescence_search_0x88_O.node = 0;
      //found_score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,      
      found_score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, chess_board_0x88_O,
        move_gen_1_captures_0x88_O, depth);
      this.node = this.node + this.quiescence_search_0x88_O.node;

      pv_line_0x88_O.score_depth_max = found_score;
      //console.log("Search_0x88_C-> depth " + depth + " found_scoreQ " + found_score + " found_score " + found_score_test);
      //chess_board_0x88_O.test_print_0x88();
    } else {
      //console.log("Search_0x88_C->depth " + depth);
      let is_moove_legal = -1;
      let move_list_0x88_O = new Move_list_0x88_С();
      move_list_0x88_O.iniM();

      move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      //  console.log("Search_0x88_C->depth " + depth + "до сортировки >>>>>>>>>>>>>>>>>>>>>>>>>>> ");
      //  move_list_0x88_O.test_print_list(chess_board_0x88_O);     
      //move_list_0x88_O.sorting_list();
      //  console.log("Search_0x88_C->depth " + depth + "после сортировки <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");       
      //  move_list_0x88_O.test_print_list(chess_board_0x88_O); 
      move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
      move_list_0x88_O.sorting_list();

      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {
        //console.log("Search_0x88_C->2 ");
        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O);
        //здесь должен быть контроль легальности хода
        if (is_moove_legal == 0) {
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          }
          continue;
        }

        pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
        pv_line_0x88_O.quiescence[depth] = "ab";

        number_moove_legal = number_moove_legal + 1;

        score = -1 * this.searching_alpha_beta_test(-1 * beta, -1 * alpha, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
          move_gen_2_quiet_0x88_O, (depth + 1), depth_max);

        move_list_0x88_O.score_move[move_i] = score;
        //if (depth == 0)  console.log("Search_0x88_C->MAX depth == 0 depth " + depth + " score " + score);
        //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
        if (score > found_score) {
          found_score = score;
          if (score > alpha) {
            alpha = score; // alpha acts like max in MiniMax
            best_node_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_line_0x88_O.quiescence[depth] = "ab_W";
            best_node_line_0x88_O.score_move[depth] = score;
            is_update_pv_line = 1;
          }
          //  if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
        }
        if (score >= beta) {
          // восстановили доску
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          return score;   // fail soft beta-cutoff
        }
        // восстановили доску
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
      }

      if (is_update_pv_line == 1) pv_line_0x88_O.save_list(best_node_line_0x88_O);

      //это мат или пат
      if (number_moove_legal == 0) {
        //console.log("Search_0x88_C->side_to_move--------- " + chess_board_0x88_O.side_to_move);
        //console.log(' ALLERT  number_moove_legal == 0 !!!!!!!!!!!!!');
        if (chess_board_0x88_O.side_to_move == 1) {
          // ход белых. а ходов нет. это 0 пат, если же белый король под шахом это мат
          if (move_gen_1_captures_0x88_O.check_detected(chess_board_0x88_O.searching_king(1), 1, chess_board_0x88_O) != 0) {
            //console.log("Search_0x88_C-> W chek ");
            pv_line_0x88_O.score_depth_max = (20000 - depth);
            return (20000 - depth);
          }
          pv_line_0x88_O.score_depth_max = 0;
          return 0;
        } else {
          if (move_gen_1_captures_0x88_O.check_detected(chess_board_0x88_O.searching_king(0), 0, chess_board_0x88_O) != 0) {
            //console.log("Search_0x88_C-> B chek ");
            pv_line_0x88_O.score_depth_max = -1 * (20000 - depth);
            return -1 * (20000 - depth);
          }
          pv_line_0x88_O.score_depth_max = 0;
          return 0;
        }
      }

    }
    return found_score;
  }
}
/*
  // searching_alpha_beta_fail_hard
  ////////////////////////////////////////
https://www.chessprogramming.org/Alpha-Beta

  PVS
  value = PVS(-(alpha+1),-alpha)
  if(value > alpha && value < beta) {
  value = PVS(-beta,-alpha);


number of leaves with depth n and b = 40
depth n	    bn	                b⌈n/2⌉ + b⌊n/2⌋ - 1
      0	    1	                  1
      1	    40	                40
      2	    1,600	              79
      3	    64,000	            1,639
      4	    2,560,000	          3,199
      5	    102,400,000	        65,569
      6	    4,096,000,000	      127,999
      7	    163,840,000,000	    2,623,999
      8	    6,553,600,000,000	  5,119,999

Fail soft
Negamax
int alphaBeta( int alpha, int beta, int depthleft ) {
   if( depthleft == 0 ) return quiesce( alpha, beta );
   bestValue = -infinity;
   for ( all moves)  {
      score = -alphaBeta( -beta, -alpha, depthleft - 1 );
      if( score > bestValue )
      {
         bestValue = score;
         if( score > alpha )
            alpha = score; // alpha acts like max in MiniMax
      }
      if( score >= beta )
         return bestValue;   //  fail soft beta-cutoff, existing the loop here is also fine
   }
   return bestValue;
}

Fail hard
Negamax

int alphaBeta( int alpha, int beta, int depthleft ) {
   if( depthleft == 0 ) return quiesce( alpha, beta );
   for ( all moves)  {
      score = -alphaBeta( -beta, -alpha, depthleft - 1 );
      if( score >= beta )
         return beta;   //  fail hard beta-cutoff
      if( score > alpha )
         alpha = score; // alpha acts like max in MiniMax
   }
   return alpha;
}

*/