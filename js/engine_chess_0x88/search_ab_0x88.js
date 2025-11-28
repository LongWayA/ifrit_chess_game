/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_0x88.js
 * @version created 11.10m.2025 
 * last modified 11.10m.2025, 24.10m.2025
*/

import { Move_list_0x88_С } from "./move_generator/move_list_0x88.js";
import { Make_move_0x88_C } from "./move_generator/make_move_0x88.js";
import { Unmake_move_0x88_C } from "./move_generator/unmake_move_0x88.js";
import { PV_line_0x88_C } from "./pv_line_0x88.js";
import { Undo_0x88_C } from "./move_generator/undo_0x88.js";
import { Evaluate_0x88_C } from "./evaluate_0x88.js";
import { Chess_board_0x88_C } from "./move_generator/chess_board_0x88.js";
import { Quiescence_search_0x88_C } from "./quiescence_search_0x88.js";
import { Transposition_table_0x88_C } from "./for_sorting_move/transposition_table_0x88.js";



/**
* НАЗНАЧЕНИЕ
 

*/
//-

class Search_ab_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();

  static NAME = "Search_ab_0x88_C";

  static MAT_VALUE_MOD = 10000;
  static BEST_VALUE_MOD = 20000;

  node = 0;

  chess_board_0x88_O_move = new Chess_board_0x88_C();
  quiescence_search_0x88_O = new Quiescence_search_0x88_C();

  constructor() {

  }

  iniM() {

  }

  // searching_alpha_beta_fail_soft
  searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
    move_gen_2_quiet_0x88_O, depth, depth_max, isPV, transposition_table_0x88_O, killer_heuristic_0x88_O, history_heuristic_0x88_O) {

    let undo_0x88_O = new Undo_0x88_C();
    let best_node_line_0x88_O = new PV_line_0x88_C();
    //let test_save_move_list_0x88_O = new Move_list_0x88_С();

    let score = 0;// текущая оценка позиции
    let found_score;// максимальная оценка позиции
    //let found_score_test;// максимальная оценка позиции    
    let is_update_pv_line = 0;// максимальная оценка позиции    
    let number_moove_legal = 0;
    let isPV_node = 0;
    let tt_type_node = 0;

    if (depth >= depth_max) {
      //found_score = this.evaluate_0x88_O.score_position(chess_board_0x88_O, transposition_table_0x88_O);
      this.node = this.node + 1;

      //this.quiescence_search_0x88_O.node = 0;
      found_score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, chess_board_0x88_O,
        move_gen_1_captures_0x88_O, depth, transposition_table_0x88_O);

      //this.node = this.node + this.quiescence_search_0x88_O.node;

      pv_line_0x88_O.score_depth_max = found_score;
      return found_score;
      //console.log("Search_0x88_C-> depth " + depth + " found_scoreQ " + found_score + " found_score " + found_score_test);
      //chess_board_0x88_O.test_print_0x88();
    }

    // ищем позицию в хеш таблице
    let is_save_position = transposition_table_0x88_O.is_save_position(chess_board_0x88_O, depth, depth_max);

    // используем хеш таблицу ====================================================
    if ((is_save_position.tn == Transposition_table_0x88_C.ALPHA_CUT) && (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.BLACK)) {
      if (is_save_position.sc <= alpha) {
        return is_save_position.sc;
      }
    }

    if ((is_save_position.tn == Transposition_table_0x88_C.BETA_CUT) && (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE)) {
      if (is_save_position.sc >= beta) {
        return is_save_position.sc;
      }
    }

    if ((is_save_position.tn == Transposition_table_0x88_C.MAX_SCORE_UPDATE) && (isPV == 0)) {
      return is_save_position.sc;
    }
    //==================================================== используем хеш таблицу

    if (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE) {
      found_score = -Search_ab_0x88_C.BEST_VALUE_MOD;// максимальная оценка позиции
    } else {
      found_score = Search_ab_0x88_C.BEST_VALUE_MOD;// максимальная оценка позиции
    }

    //console.log("Search_0x88_C->depth " + depth);
    let is_moove_legal = -1;
    let move_list_0x88_O = new Move_list_0x88_С();
    move_list_0x88_O.iniM();

    move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);

    //test_save_move_list_0x88_O.save_list_from(move_list_0x88_O);

    // сортировка по взятиям и типу других ходов
    move_list_0x88_O.sorting_list();

    // используем историю ====================================================    
    // сортировка по истории
    move_list_0x88_O.sorting_list_history_heuristic(history_heuristic_0x88_O);
    //==================================================== используем историю   

    // используем киллеры ====================================================
    // если второй киллер записан то выводим его на позицию после взятий
    if (killer_heuristic_0x88_O.killer_moves_from_2[depth] != -1) {
      // console.log("Search_0x88_C->killer_moves_2");
      // console.log("Search_0x88_C->killer_heuristic_0x88_O.killer_moves_2[" + depth + "] " + killer_heuristic_0x88_O.killer_moves_2[depth]);
      // console.log("Search_0x88_C->type_move[0] до " + move_list_0x88_O.type_move[0]);
      move_list_0x88_O.set_move_after_the_captures(killer_heuristic_0x88_O.killer_moves_from_2[depth],
        killer_heuristic_0x88_O.killer_moves_to_2[depth]);
      //console.log("Search_0x88_C->type_move[0] после " + move_list_0x88_O.type_move[0]);
    };

    // если первый киллер записан то выводим его на позицию после взятий и перед вторым   
    if (killer_heuristic_0x88_O.killer_moves_from_1[depth] != -1) {
      // console.log("Search_0x88_C->killer_moves_1");
      // console.log("Search_0x88_C->killer_heuristic_0x88_O.killer_moves_1[" + depth + "] " + killer_heuristic_0x88_O.killer_moves_1[depth]);
      // console.log("Search_0x88_C->type_move[0] до " + move_list_0x88_O.type_move[0]);
      move_list_0x88_O.set_move_after_the_captures(killer_heuristic_0x88_O.killer_moves_from_1[depth],
        killer_heuristic_0x88_O.killer_moves_to_1[depth]);
      //console.log("Search_0x88_C->type_move[0] после " + move_list_0x88_O.type_move[0]);
    };
    //==================================================== используем киллеры

    // используем хеш таблицу ====================================================
    // просто выходить по оценке не буду. слишком много коллизий(1 на 10 позиций)
    if ((is_save_position.tn == Transposition_table_0x88_C.ALPHA_UPDATE) && (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE)) {
      move_list_0x88_O.set_move_in_0(is_save_position.tm, is_save_position.from, is_save_position.to);
    } else if ((is_save_position.tn == Transposition_table_0x88_C.BETA_UPDATE) && (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.BLACK)) {
      move_list_0x88_O.set_move_in_0(is_save_position.tm, is_save_position.from, is_save_position.to);
    }
    //==================================================== используем хеш таблицу


    //test_save_move_list_0x88_O.test_compare_list_from(move_list_0x88_O);

    for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      //console.log("Search_0x88_C->2 ");
      is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O,
        move_gen_1_captures_0x88_O, transposition_table_0x88_O);

      if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
        continue;
      } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
        continue;
      }

      pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
      pv_line_0x88_O.type_variant[depth] = "ab";

      number_moove_legal = number_moove_legal + 1;

      if ((move_i == 0) && (isPV == 1)) {
        isPV_node = 1;
        score = this.searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
          move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node, transposition_table_0x88_O
          , killer_heuristic_0x88_O, history_heuristic_0x88_O);
      } else {

        if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) {
          isPV_node = 0;
          score = this.searching_alpha_beta_id(alpha, (alpha + 1), pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
            move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node, transposition_table_0x88_O,
            killer_heuristic_0x88_O, history_heuristic_0x88_O);
        } else {
          isPV_node = 0;
          score = this.searching_alpha_beta_id((beta - 1), beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
            move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node, transposition_table_0x88_O,
            killer_heuristic_0x88_O, history_heuristic_0x88_O);
        }

        if ((score > alpha) && (score < beta)) {
          isPV_node = 1;
          //console.log("Search_0x88_C->depth " + depth + " пересчет ");
          score = this.searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
            move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node, transposition_table_0x88_O,
            killer_heuristic_0x88_O, history_heuristic_0x88_O);
        }
      }

      if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) {
        // alpha < value < beta => exact value
        if (score > found_score) {
          found_score = score;
          tt_type_node = Transposition_table_0x88_C.MAX_SCORE_UPDATE;

          //if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
          if (score > alpha) {
            alpha = score; //
            tt_type_node = Transposition_table_0x88_C.ALPHA_UPDATE;

            if (isPV == 1) {
              best_node_line_0x88_O.save_list(pv_line_0x88_O);
              best_node_line_0x88_O.type_variant[depth] = "ab_W";
              is_update_pv_line = 1;
            }
          }

          // записываем ход в хеш
          transposition_table_0x88_O.add_position(tt_type_node, move_list_0x88_O.type_move[move_i],
            score, move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max, chess_board_0x88_O);

        }

        // lower bound
        if (score >= beta) {
          // восстановили доску
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);

          // записываем ход в историю color, from_128, to_128, depth, depth_max
          if (move_list_0x88_O.type_move[move_i] > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
            history_heuristic_0x88_O.history_good_save(move_list_0x88_O.piece_color,
              move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max);
          }

          // записываем ход в киллер 
          if (move_list_0x88_O.type_move[move_i] > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
            killer_heuristic_0x88_O.add_move(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth);
          }

          // записываем ход в хеш
          transposition_table_0x88_O.add_position(Transposition_table_0x88_C.BETA_CUT, move_list_0x88_O.type_move[move_i],
            score, move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max, chess_board_0x88_O);

          return score;   // 
        }//

      } else {// if (chess_board_0x88_O.side_to_move == 1) {

        if (score < found_score) {
          found_score = score;
          tt_type_node = Transposition_table_0x88_C.MAX_SCORE_UPDATE;

          // if (depth == 0) this.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
          if (score < beta) {
            beta = score; //
            tt_type_node = Transposition_table_0x88_C.BETA_UPDATE;

            if (isPV == 1) {
              best_node_line_0x88_O.save_list(pv_line_0x88_O);
              best_node_line_0x88_O.type_variant[depth] = "ab_B";
              is_update_pv_line = 1;
            }
          }
          // записываем ход в хеш
          transposition_table_0x88_O.add_position(tt_type_node, move_list_0x88_O.type_move[move_i],
            score, move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max, chess_board_0x88_O);
        }

        // upper bound
        if (score <= alpha) {
          // восстановили доску
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);

          // записываем ход в историю color, from_128, to_128, depth, depth_max
          if (move_list_0x88_O.type_move[move_i] > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
            history_heuristic_0x88_O.history_good_save(move_list_0x88_O.piece_color,
              move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max);
          }

          // записываем ход в киллер            
          if (move_list_0x88_O.type_move[move_i] > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
            killer_heuristic_0x88_O.add_move(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth);
          }

          // записываем ход в хеш            
          transposition_table_0x88_O.add_position(Transposition_table_0x88_C.ALPHA_CUT, move_list_0x88_O.type_move[move_i],
            score, move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max, chess_board_0x88_O);
          return score;   //
        }//

      }//if (chess_board_0x88_O.side_to_move == 1) {

      // восстановили доску
      this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
    }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

    if (is_update_pv_line == 1) pv_line_0x88_O.save_list(best_node_line_0x88_O);

    //это мат или пат
    if (number_moove_legal == 0) {

      let mat = Search_ab_0x88_C.MAT_VALUE_MOD - depth;

      if (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE) {//

        // ход белых. а ходов нет. это 0 пат, если же белый король под шахом это мат
        if (move_gen_1_captures_0x88_O.check_detected(chess_board_0x88_O.searching_king(1), 1, chess_board_0x88_O) != 0) {

          //console.log("Search_0x88_C-> W chek ");

          // тут ход белых, но они выставляют минус. Потому что мат это максимально плохое событие 
          // для белых и оно должно быть с минимально возможной оценкой         
          mat = -1 * mat;

          pv_line_0x88_O.score_depth_max = mat;

          // chess_board_0x88_O.test_print_0x88();

          return mat;
        }

        pv_line_0x88_O.score_depth_max = 0;
        return 0;

      } else {//if (chess_board_0x88_O.side_to_move == 1) {
        //  console.log("Search_0x88_C-> B pat ");
        if (move_gen_1_captures_0x88_O.check_detected(chess_board_0x88_O.searching_king(0), 0, chess_board_0x88_O) != 0) {

          //console.log("Search_0x88_C-> B chek ");
          pv_line_0x88_O.score_depth_max = mat;
          return mat;
        }
        pv_line_0x88_O.score_depth_max = 0;
        return 0;
      }//if (chess_board_0x88_O.side_to_move == 1) {
    }// if (number_moove_legal == 0) {

    return found_score;//found_score
  }
}

export { Search_ab_0x88_C };

//for tactical and quiet moves

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

int alphaBetaMax( int alpha, int beta, int depthleft ) {
   if ( depthleft == 0 ) return evaluate();
   bestValue = -infinity;
   for ( all moves) {
      score = alphaBetaMin( alpha, beta, depthleft - 1 );
      if( score > bestValue )
      {
         bestValue = score;
         if( score > alpha )
            alpha = score; // alpha acts like max in MiniMax
      }
      if( score >= beta )
         return score;   // fail soft beta-cutoff
   }
   return bestValue;
}

int alphaBetaMin( int alpha, int beta, int depthleft ) {
   if ( depthleft == 0 ) return -evaluate();
   bestValue = infinity;
   for ( all moves) {
      score = alphaBetaMax( alpha, beta, depthleft - 1 );
      if( score < bestValue)
      {
         bestValue = score;
         if( score < beta )
            beta = score; // beta acts like min in MiniMax
      }
      if( score <= alpha )
         return score; // fail soft alpha-cutoff, break can also be used here
   }
   return bestValue;
}


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