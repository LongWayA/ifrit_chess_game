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

  //chess_board_0x88_O_move = new Chess_board_0x88_C();// для записи позиции с ходом в случае не IID
  quiescence_search_0x88_O = new Quiescence_search_0x88_C();// статический поиск

  node = 0;// считаем узлы

  ///////////////////////////////////////
  is_ab_use = 1;

  is_quiescence_use = 1;

  is_PVS_use = 1;

  // sorting
  is_TT_use = 1;
  is_killer_heuristic_use = 1;
  is_history_heuristic_use = 1;

  // pruning
  is_razoring_use = 0;
  is_lmr_use = 0;
  is_futility_pruning_use = 0;// not working
  ///////////////////////////////////////

  test_sorting = {
    save_alpha_up: 0,
    save_alpha_cut: 0,
    save_beta_up: 0,
    save_beta_cut: 0,
    save_score_up: 0,

    use_alpha_up: 0,
    use_alpha_cut: 0,
    use_beta_up: 0,
    use_beta_cut: 0,
    use_score: 0,
  }

  constructor() {

  }

  iniM() {

  }

  // searching_alpha_beta_fail_soft
  searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
    move_gen_2_quiet_0x88_O, depth, depth_max, isPV, transposition_table_0x88_O, killer_heuristic_0x88_O, history_heuristic_0x88_O) {

    let undo_0x88_O = new Undo_0x88_C();
    let best_node_line_0x88_O = new PV_line_0x88_C();

    let score = 0;// текущая оценка позиции
    let found_score = 0;// максимальная оценка позиции
    let is_update_pv_line = 0;// максимальная оценка позиции    
    let number_moove_legal = 0;
    let isPV_node = 0;
    let tt_type_node = 0;
    let new_depth_max = 0;
    let i_lmr = 0;
    let is_save_position = 0;

    // test+++++++++++++++++++++++++++
    //let test_save_move_list_0x88_O = new Move_list_0x88_С();// для тестирования сортировок

    // поиск на максимальной глубине-----------------------------------
    if (depth >= depth_max) {

      if (this.is_quiescence_use == 0) {
        found_score = this.evaluate_0x88_O.score_position(chess_board_0x88_O, transposition_table_0x88_O);
      }
      this.node = this.node + 1;

      //this.quiescence_search_0x88_O.node = 0;
      if (this.is_quiescence_use == 1) {
        found_score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, chess_board_0x88_O,
          move_gen_1_captures_0x88_O, depth, transposition_table_0x88_O);
      }
      //this.node = this.node + this.quiescence_search_0x88_O.node;

      pv_line_0x88_O.score_depth_max = found_score;
      return found_score;
    }
    // -----------------------------------поиск на максимальной глубине

    // используем хеш таблицу ====================================================   
    if (this.is_TT_use == 1) {

      // ищем позицию в хеш таблице
      is_save_position = transposition_table_0x88_O.is_save_position(chess_board_0x88_O, depth, depth_max);

        //test
        //if (is_save_position.tn == 0) console.log("Search_0x88_C-> tn == 0 !!!! depth " + depth);

      if ((is_save_position.tn == Transposition_table_0x88_C.ALPHA_CUT) && (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.BLACK)) {

        if (is_save_position.sc <= alpha) {
          //test
          this.test_sorting.use_alpha_cut = this.test_sorting.use_alpha_cut + 1;
          return is_save_position.sc;
        }
      }

      if ((is_save_position.tn == Transposition_table_0x88_C.BETA_CUT) && (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE)) {

        if (is_save_position.sc >= beta) {
          //test          
          this.test_sorting.use_beta_cut = this.test_sorting.use_beta_cut + 1;
          return is_save_position.sc;
        }
      }

      if ((is_save_position.tn == Transposition_table_0x88_C.MAX_SCORE_UPDATE) && (isPV == 0)) {

        //test        
        this.test_sorting.use_score = this.test_sorting.use_score + 1;
        return is_save_position.sc;
      }
    }
    // ==================================================== используем хеш таблицу    

    // razoring ====================================================    
    if (this.is_razoring_use == 1) {

      score = this.evaluate_0x88_O.score_position(chess_board_0x88_O, transposition_table_0x88_O);

      if (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE) {

        if ((isPV == 0) && (score < (alpha - Evaluate_0x88_C.BISHOP_SCORE -
          Evaluate_0x88_C.PAWN_SCORE * (depth_max - depth) * (depth_max - depth)))) {

          score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, chess_board_0x88_O,
            move_gen_1_captures_0x88_O, depth, transposition_table_0x88_O);
          return score;
        }
      } else {

        if ((isPV == 0) && (score > (beta + Evaluate_0x88_C.BISHOP_SCORE +
          Evaluate_0x88_C.PAWN_SCORE * (depth_max - depth) * (depth_max - depth)))) {

          score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, chess_board_0x88_O,
            move_gen_1_captures_0x88_O, depth, transposition_table_0x88_O);
          return score;
        }
      }
    }
    // ==================================================== razoring

    // Futility pruning ====================================================     
    if (this.is_futility_pruning_use == 1) {

      if (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE) {

        if ((isPV == 0) && ((score - (depth_max - depth) * (depth_max - depth)) >= beta)) {
          score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, chess_board_0x88_O,
            move_gen_1_captures_0x88_O, depth, transposition_table_0x88_O);
          return score;
        }
      } else {
        if ((isPV == 0) && ((score + (depth_max - depth) * (depth_max - depth)) <= alpha)) {
          score = this.quiescence_search_0x88_O.quiescence_search(alpha, beta, chess_board_0x88_O,
            move_gen_1_captures_0x88_O, depth, transposition_table_0x88_O);
          return score;
        }
      }
    }
    // ==================================================== Futility pruning


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

    // test+++++++++++++++++++++++++++
    //test_save_move_list_0x88_O.save_list_from(move_list_0x88_O);
    // console.log("1 Search_0x88_C->depth " + depth);
    // move_list_0x88_O.test_print_list(chess_board_0x88_O);

    // сортировка по взятиям и типу других ходов
    move_list_0x88_O.sorting_list();

    // используем историю ====================================================    
    // сортировка по истории
    if (this.is_history_heuristic_use == 1) {
      move_list_0x88_O.sorting_list_history_heuristic(history_heuristic_0x88_O);
    }
    //==================================================== используем историю   

    // используем киллеры ====================================================
    if (this.is_killer_heuristic_use == 1) {
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
    }
    //==================================================== используем киллеры

    // используем хеш таблицу ====================================================
    // 
    if (this.is_TT_use == 1) {
      if ((is_save_position.tn == Transposition_table_0x88_C.ALPHA_UPDATE) && (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.WHITE)) {
        move_list_0x88_O.set_tt_move_in_0(is_save_position.from, is_save_position.to);
        //test
        //console.log("Search_0x88_C->use ALPHA_UPDATE side_to_move " + chess_board_0x88_O.side_to_move);
        //console.log("Search_0x88_C->use ALPHA_UPDATE piece_color " + move_list_0x88_O.piece_color);        
        this.test_sorting.use_alpha_up = this.test_sorting.use_alpha_up + 1;
      } else if ((is_save_position.tn == Transposition_table_0x88_C.BETA_UPDATE) && (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.BLACK)) {
        move_list_0x88_O.set_tt_move_in_0(is_save_position.from, is_save_position.to);
        //test        
        //console.log("Search_0x88_C->use BETA_UPDATE side_to_move " + chess_board_0x88_O.side_to_move);
        //console.log("Search_0x88_C->use BETA_UPDATE piece_color " + move_list_0x88_O.piece_color);                 
        this.test_sorting.use_beta_up = this.test_sorting.use_beta_up + 1;
      }
    }
    //==================================================== используем хеш таблицу

    // test+++++++++++++++++++++++++++
    // test_save_move_list_0x88_O.test_compare_list_from(move_list_0x88_O);
    // console.log("2 Search_0x88_C->depth " + depth);
    // move_list_0x88_O.test_print_list(chess_board_0x88_O);
    // console.log("--------------------------------------------- ");

    new_depth_max = depth_max;
    if (this.is_lmr_use == 1) {
      i_lmr = move_list_0x88_O.number_captures_move + 3;//(3) взятия два киллера и тт ход не сокращаем 
    }

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

      if (this.is_PVS_use == 0) {
        isPV_node = 1;
        score = this.searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
          move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node, transposition_table_0x88_O,
          killer_heuristic_0x88_O, history_heuristic_0x88_O);
      }

      if (this.is_PVS_use == 1) {

        if ((move_i == 0) && (isPV == 1)) {
          isPV_node = 1;
          score = this.searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
            move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node, transposition_table_0x88_O,
            killer_heuristic_0x88_O, history_heuristic_0x88_O);
        } else {

          if (this.is_lmr_use == 1) {
            if ((move_i > i_lmr) && (depth_max - depth) > 2) new_depth_max = depth_max - 1;
          }

          if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) {
            isPV_node = 0;
            score = this.searching_alpha_beta_id(alpha, (alpha + 1), pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
              move_gen_2_quiet_0x88_O, (depth + 1), new_depth_max, isPV_node, transposition_table_0x88_O,
              killer_heuristic_0x88_O, history_heuristic_0x88_O);
          } else {
            isPV_node = 0;
            score = this.searching_alpha_beta_id((beta - 1), beta, pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O,
              move_gen_2_quiet_0x88_O, (depth + 1), new_depth_max, isPV_node, transposition_table_0x88_O,
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
      }

      // восстановили доску
      this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);

      // SCORE UPDATE

      if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) {

        // alpha < value < beta => exact value
        if (score > found_score) {

          found_score = score;

          if (this.is_ab_use == 1) {
            // lower bound
            if (score >= beta) {

              // записываем ход в историю color, from_128, to_128, depth, depth_max
              if (this.is_history_heuristic_use == 1) {
                if (move_list_0x88_O.type_move[move_i] > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
                  history_heuristic_0x88_O.history_good_save(move_list_0x88_O.piece_color,
                    move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max);
                }
              }

              // записываем ход в киллер 
              if (this.is_killer_heuristic_use == 1) {
                if (move_list_0x88_O.type_move[move_i] > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
                  killer_heuristic_0x88_O.add_move(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth);
                }
              }

              // записываем ход в хеш
              if (this.is_TT_use == 1) {
                transposition_table_0x88_O.add_position(Transposition_table_0x88_C.BETA_CUT, move_list_0x88_O.type_move[move_i],
                  score, move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max, chess_board_0x88_O);
                //test                  
                this.test_sorting.save_beta_cut = this.test_sorting.save_beta_cut + 1;
              }

              return score;   // 
            }//

            tt_type_node = Transposition_table_0x88_C.MAX_SCORE_UPDATE;

            if (score > alpha) {
              alpha = score; //
              tt_type_node = Transposition_table_0x88_C.ALPHA_UPDATE;

              if (isPV == 1) {
                best_node_line_0x88_O.save_list(pv_line_0x88_O);
                best_node_line_0x88_O.type_variant[depth] = "ab_W";
                is_update_pv_line = 1;
              }
            }

            if (this.is_TT_use == 1) {
              // записываем ход в хеш
              transposition_table_0x88_O.add_position(tt_type_node, move_list_0x88_O.type_move[move_i],
                score, move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max, chess_board_0x88_O);

              //test
              if (tt_type_node == Transposition_table_0x88_C.MAX_SCORE_UPDATE) {
                this.test_sorting.save_score_up = this.test_sorting.save_score_up + 1;
              } else if (tt_type_node == Transposition_table_0x88_C.ALPHA_UPDATE) {
                this.test_sorting.save_alpha_up = this.test_sorting.save_alpha_up + 1;
              }
            }
          } else {
            if (isPV == 1) {
              best_node_line_0x88_O.save_list(pv_line_0x88_O);
              best_node_line_0x88_O.type_variant[depth] = "ab_B";
              is_update_pv_line = 1;
            }
          }
        }

      } else {// if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE)

        if (score < found_score) {

          found_score = score;

          if (this.is_ab_use == 1) {

            // upper bound
            if (score <= alpha) {

              // записываем ход в историю color, from_128, to_128, depth, depth_max
              if (this.is_history_heuristic_use == 1) {
                if (move_list_0x88_O.type_move[move_i] > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
                  history_heuristic_0x88_O.history_good_save(move_list_0x88_O.piece_color,
                    move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max);
                }
              }

              // записываем ход в киллер  
              if (this.is_killer_heuristic_use == 1) {
                if (move_list_0x88_O.type_move[move_i] > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
                  killer_heuristic_0x88_O.add_move(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth);
                }
              }

              // записываем ход в хеш   
              if (this.is_TT_use == 1) {
                transposition_table_0x88_O.add_position(Transposition_table_0x88_C.ALPHA_CUT, move_list_0x88_O.type_move[move_i],
                  score, move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max, chess_board_0x88_O);
                //test
                this.test_sorting.save_alpha_cut = this.test_sorting.save_alpha_cut + 1;
              }
              return score;//
            }//

            tt_type_node = Transposition_table_0x88_C.MAX_SCORE_UPDATE;

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
            if (this.is_TT_use == 1) {
              transposition_table_0x88_O.add_position(tt_type_node, move_list_0x88_O.type_move[move_i],
                score, move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i], depth, depth_max, chess_board_0x88_O);

              //test                
              if (tt_type_node == Transposition_table_0x88_C.MAX_SCORE_UPDATE) {
                this.test_sorting.save_score_up = this.test_sorting.save_score_up + 1;
              } else if (tt_type_node == Transposition_table_0x88_C.BETA_UPDATE) {
                this.test_sorting.save_beta_up = this.test_sorting.save_beta_up + 1;
              }
            }
          } else {
            if (isPV == 1) {
              best_node_line_0x88_O.save_list(pv_line_0x88_O);
              best_node_line_0x88_O.type_variant[depth] = "ab_B";
              is_update_pv_line = 1;
            }
          }
        }

      }//if (chess_board_0x88_O.side_to_move == 1) {

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

// from Stockfish_src=====================
// Step 4. Transposition table lookup
// Step 5. Tablebases probe
// Step 6. Static evaluation of the position
// Step 7. Razoring
// If eval is really low, skip search entirely and return the qsearch value.
// For PvNodes, we must have a guard against mates being returned.
// if (!PvNode && eval < alpha - 514 - 294 * depth * depth)
//    return qsearch<NonPV>(pos, ss, alpha, beta);
// Step 8. Futility pruning: child node
// The depth condition is important for mate finding.
// if (!ss->ttPv && depth < 14 && eval - futility_margin(depth) >= beta && eval >= beta
//   && (!ttData.move || ttCapture) && !is_loss(beta) && !is_win(eval))
//    return (2 * beta + eval) / 3;
// Step 9. Null move search with verification search
// Step 10. Internal iterative reductions
// At sufficient depth, reduce depth for PV/Cut nodes without a TTMove.
// (*Scaler) Especially if they make IIR less aggressive.
// if (!allNode && depth >= 6 && !ttData.move && priorReduction <= 3)
// depth--;
// Step 11. ProbCut
// If we have a good enough capture (or queen promotion) and a reduced search
// returns a value much above beta, we can (almost) safely prune the previous move.
// Step 12. A small Probcut idea
// Step 13. Loop through all pseudo-legal moves until no moves remain
// or a beta cutoff occurs.
// Step 14. Pruning at shallow depth.
// Depth conditions are important for mate finding.
// Step 15. Extensions
// Singular extension search. If all moves but one
// fail low on a search of (alpha-s, beta-s), and just one fails high on
// (alpha, beta), then that move is singular and should be extended. To
// verify this we do a reduced search on the position excluding the ttMove
// and if the result is lower than ttValue minus a margin, then we will
// extend the ttMove. Recursive singular search is avoided.

// (*Scaler) Generally, higher singularBeta (i.e closer to ttValue)
// and lower extension margins scale well.
// Step 16. Make the move
// Step 17. Late moves reduction / extension (LMR)
//if (depth >= 2 && moveCount > 1)
//{
// In general we want to cap the LMR depth search at newDepth, but when
// reduction is negative, we allow this move a limited search extension
// beyond the first move depth.
// To prevent problems when the max value is less than the min value,
// std::clamp has been replaced by a more robust implementation.
// Step 18. Full-depth search when LMR is skipped
// Step 19. Undo move
// Step 20. Check for a new best move
// Finished searching the move. If a stop occurred, the return value of
// the search cannot be trusted, and we return immediately without updating
// best move, principal variation nor transposition table.
// Step 21. Check for mate and stalemate
// All legal moves have been searched and if there are no legal moves, it
// must be a mate or a stalemate. If we are in a singular extension search then
// return a fail low score.

// =====================from Stockfish_src 

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