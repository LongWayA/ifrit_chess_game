/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_search_root_0x88.js
 * @version created 11.10m.2025 
 * last modified 11.10m.2025, 24.10m.2025
*/

import { Chess_board_0x88_C } from "../move_generator/chess_board_0x88.js";
import { Move_list_0x88_С } from "../move_generator/move_list_0x88.js";
import { Move_list_root_0x88_С } from "../move_generator/move_list_root_0x88.js";
import { PV_line_0x88_C } from "../move_generator/pv_line_0x88.js";

import { Move_gen_1_captures_0x88_С } from "../move_generator/move_gen_1_captures_0x88.js";
import { Move_gen_2_quiet_0x88_С } from "../move_generator/move_gen_2_quiet_0x88.js";
import { Make_move_0x88_C } from "../move_generator/make_move_0x88.js";
import { Unmake_move_0x88_C } from "../move_generator/unmake_move_0x88.js";
import { Undo_0x88_C } from "../move_generator/undo_0x88.js";

import { Evaluate_0x88_C } from "./evaluate_0x88.js";

import { Transposition_table_0x88_C } from "../for_sorting_move/transposition_table_0x88.js";
import { killer_heuristic_0x88_O } from "../for_sorting_move/killer_heuristic_0x88.js";
import { History_heuristic_0x88_C } from "../for_sorting_move/history_heuristic_0x88.js";

import { Search_minmax_0x88_C } from "./search_minmax_0x88.js";
import { Search_ab_0x88_C } from "./search_ab_0x88.js";

import { Timer_C } from "../../browser/timer.js";

/**
* НАЗНАЧЕНИЕ
* Поиск начинается с присланой в виде fen позиции fen_start
* и максимальной глубины depth_max_search
* Из fen мы заполняем chess_board_0x88_O_start.
*
* Во время поиска идет циклическое погружение и на каждой просчитанной глубине
* возвращается заполненный объект info_return_search
* Конечно есть финальная позиция fen_end
* Так что поиск начинается со стартового fen и заканчивается
* финальным.
* Конечно есть лучшая оценка найденная во время поиска best_score_str
* Конечно же выводим лучший вариант pv_line_str
* его вид еще не окончательный. надо будет еще обдумать.
* Дальше вывод количество рассмотреных узлов node_count_str.
* Также есть вывод скорости поиска nodes_per_second_str.
* И конечно же глубина поиска depth_max_search_str.
*
* Думаю этот интерфейс останется надолго. Добавление эвристик и даже замена генератора
* на него влиять не должны.
*
*/

class Search_root_0x88_C {

  chessEngine_0x88_O = null;

  move_gen_1_captures_0x88_O = new Move_gen_1_captures_0x88_С();
  move_gen_2_quiet_0x88_O = new Move_gen_2_quiet_0x88_С();

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();

  evaluate_0x88_O = new Evaluate_0x88_C();

  transposition_table_0x88_O = new Transposition_table_0x88_C();
  killer_heuristic_0x88_O = new killer_heuristic_0x88_O();
  history_heuristic_0x88_O = new History_heuristic_0x88_C();

  search_minmax_0x88_O = new Search_minmax_0x88_C();//TEST_NEGAMAX
  search_ab_0x88_O = new Search_ab_0x88_C();

  timer_O = new Timer_C();

  static NAME = "Search_root_0x88_C";

  static ALPHA_SCORE = -30000;
  static BETA_SCORE = 30000;

  START_POSITION_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  stop_search = 0;

  info_return_search = {
    fen_start: "-",// начальная позиция в виде fen передаваемая на вход движка
    fen_end: "-",// конечная позиция в виде fen возникшая после хода движка
    pv_line_str: "-",// цепочка ходов приведшея к лучшему ходу и оценке на заданной глубине  
    pv_line_uci_str: "-",// цепочка ходов приведшея к лучшему ходу и оценке на заданной глубине         
    best_score_str: "-",// лучшая оценка найденная при поиске на заданной глубине
    best_score_uci_str: "-",// лучшая оценка найденная при поиске на заданной глубине
    best_move_uci_str: "-",// лучший найденный ход
    node_count_str: "-",// количество просмотренных узлов или по другому позиций
    nodes_per_second_str: "-",// скорость узлы в сек.
    depth_max_search_str: "-"// заданная глубина поиска
  };

  constructor() {

  }

  iniM(chessEngine_0x88_O) {
    this.chessEngine_0x88_O = chessEngine_0x88_O;

    this.search_ab_0x88_O.iniM();
    this.transposition_table_0x88_O.iniM();
    this.history_heuristic_0x88_O.iniM();
  }

  set_stop_search_in_1() {
    this.search_ab_0x88_O.set_stop_search_in_1();
    this.stop_search = 1;
  }

  // 
  searching_iterative_deepening(fen_start, depth_max) {

    let chess_board_0x88_O = new Chess_board_0x88_C();
    let chess_board_0x88_O_start = new Chess_board_0x88_C();
    let chess_board_0x88_O_end = new Chess_board_0x88_C();

    let move_list_0x88_O = new Move_list_0x88_С();
    let move_list_root_0x88_O = new Move_list_root_0x88_С();

    let undo_0x88_O = new Undo_0x88_C();
    let best_node_pv_line_0x88_O = new PV_line_0x88_C();
    let pv_line_0x88_O = new PV_line_0x88_C();

    let alpha;
    let beta;
    let score = 0;// текущая оценка позиции
    let depth = 0;
    let best_score;// лучшая оценка позиции
    let best_move_i;// лучшая 
    let isPV_node = 1;

    //console.log("Search_0x88_C->depth " + depth);
    let is_moove_legal = -1;

    let time_start = 0;
    let time_end = 0;
    let time_delta = 0;

    this.search_ab_0x88_O.set_stop_search_in_0();
    this.stop_search = 0;


    chess_board_0x88_O_start.set_0x88_from_fen(fen_start);

    move_list_0x88_O.iniM();
    move_list_root_0x88_O.iniM();

    this.transposition_table_0x88_O.iniM();
    this.history_heuristic_0x88_O.iniM();

    let node = 0;

    chess_board_0x88_O_start.key_64 = this.transposition_table_0x88_O.set_key_from_board_0x88(chess_board_0x88_O_start);

    chess_board_0x88_O.save_chess_board_0x88(chess_board_0x88_O_start);
    chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O_start);

    // копируем доску чтобы когда у движка не будет ходов не получить пустую доску.
    chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O);


    this.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    this.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);

    move_list_0x88_O.sorting_list();

    //console.log("Search_0x88_C->alpha_beta_id start searching начало поиска");

    //chess_board_0x88_O_test.set_0x88_from_fen(this.START_POSITION_FEN);
    //this.move_str_to_board(chess_board_0x88_O_test, "moves e2e4 e7e5 g1f3 b8c6 f1b5");

    // test+++++++++++++++++++++++++++
    //console.log("test 1");
    //move_list_0x88_O.test_print_list(chess_board_0x88_O);

    //move_list_0x88_O.sorting_list();

    // test sorting history
    //this.history_heuristic_0x88_O.ini_test_history();
    //move_list_0x88_O.sorting_list_history_heuristic(this.history_heuristic_0x88_O);

    // test sorting killer    
    //move_list_0x88_O.set_move_after_the_captures(51, 35);

    // test sorting tt
    //move_list_0x88_O.set_tt_move_in_0(51, 35);
    //move_list_0x88_O.set_tt_move_in_0(113, 82);

    //console.log("test 2");
    //move_list_0x88_O.test_print_list(chess_board_0x88_O);

    // увеличение по максимальной глубине
    for (let depth_max_current = 1; depth_max_current <= depth_max; depth_max_current++) {

      node = 0;

      let number_move_legal = 0;

      time_start = this.timer_O.getCurrentTimeMs();

      if (chess_board_0x88_O.side_to_move == 1) {
        best_score = -Search_ab_0x88_C.BEST_SCORE_MOD;// максимальная оценка позиции
      } else {
        best_score = Search_ab_0x88_C.BEST_SCORE_MOD;// максимальная оценка позиции
      }

      alpha = Search_root_0x88_C.ALPHA_SCORE;
      beta = Search_root_0x88_C.BETA_SCORE;

      pv_line_0x88_O.clear_list();
      //this.transposition_table_0x88_O.iniM();
      this.killer_heuristic_0x88_O.clear_list();

      number_move_legal = 0;

      // идем по списку ходов
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O,
          undo_0x88_O, this.move_gen_1_captures_0x88_O, this.transposition_table_0x88_O);

        if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
          this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          continue;
        } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
          continue;
        }

        //gggggggggggggggggggggggggggggggggg
        //this.chessEngine_0x88_O.info_currmove_uci(move_list_0x88_O.move_to_string_uci(move_i, chess_board_0x88_O), move_i, String(depth_max_current));

        number_move_legal = number_move_legal + 1;

        this.search_ab_0x88_O.node = 0;
        pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
        pv_line_0x88_O.type_variant[depth] = "id";

        score = this.search_ab_0x88_O.searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,
          this.move_gen_1_captures_0x88_O, this.move_gen_2_quiet_0x88_O, (depth + 1), depth_max_current,
          isPV_node, this.transposition_table_0x88_O, this.killer_heuristic_0x88_O, this.history_heuristic_0x88_O);

        node = node + this.search_ab_0x88_O.node;

        move_list_root_0x88_O.add_score[move_i] = score;

        //console.log("Search_0x88_C-> должны смотреть за черных, а вот реально что " + move_list_0x88_O.piece_color);
        // белые ищут максимум
        if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) {
          if (score > best_score) {
            best_node_pv_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_pv_line_0x88_O.type_variant[depth] = "id_W";
            best_node_pv_line_0x88_O.score_depth_max = score;
            best_score = score;
            best_move_i = move_i;
            chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O);
            if (score > alpha) {
              alpha = score; // alpha acts like max in MiniMax
              if (pv_line_0x88_O.score_depth_max != score) {
                console.log("Search_0x88_C-> pv_line_0x88_O.score_depth_max "
                  + pv_line_0x88_O.score_depth_max + " score " + score);
              }

            }
          }//if (score > best_score) {
        } else {
          // черные ищут минимум
          if (score < best_score) {
            best_node_pv_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_pv_line_0x88_O.type_variant[depth] = "id_B";
            best_node_pv_line_0x88_O.score_depth_max = score;
            best_score = score;
            best_move_i = move_i;
            chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O);
            if (score < beta) {
              beta = score; // beta acts like max in MiniMax
              if (pv_line_0x88_O.score_depth_max != score) {
                console.log("Search_0x88_C-> pv_line_0x88_O.score_depth_max "
                  + pv_line_0x88_O.score_depth_max + " score " + score);
              }
            }
          }//if (score > best_score) {
        }

        // восстановили доску
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);

        // экстренный выход 
        if (this.stop_search == 1) return 0;

      }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      if (number_move_legal != 0) {

        if (chess_board_0x88_O.side_to_move == 1) {
          move_list_root_0x88_O.sorting_list_top_max_score(move_list_0x88_O);
        } else {
          move_list_root_0x88_O.sorting_list_top_min_score(move_list_0x88_O);
        }

        pv_line_0x88_O.save_list(best_node_pv_line_0x88_O);

        time_end = this.timer_O.getCurrentTimeMs();
        time_delta = (time_end - time_start) / 1000;

        // console.log("Search_0x88_C->time_start " + time_start);
        // console.log("Search_0x88_C->time_end " + time_end);
        //console.log("Search_0x88_C->time_delta " + time_delta);

        //console.log("Search_0x88_C->node " + node);
        //console.log("Search_0x88_C->kN/s = node / time_delta " + Math.round(node / time_delta));
        //console.log("Search_0x88_C->best_move_i " + move_list_0x88_O.move_to_string(best_move_i, chess_board_0x88_O));

        // console.log("Search_0x88_C->SAVE----------------------------- ");
        // console.log("Search_0x88_C->save_alpha_up " + this.search_ab_0x88_O.test_tt.save_alpha_up);
        // console.log("Search_0x88_C->save_alpha_cut " + this.search_ab_0x88_O.test_tt.save_alpha_cut);
        // console.log("Search_0x88_C->save_beta_up " + this.search_ab_0x88_O.test_tt.save_beta_up);
        // console.log("Search_0x88_C->save_beta_cut " + this.search_ab_0x88_O.test_tt.save_beta_cut);
        // console.log("Search_0x88_C->save_score_up " + this.search_ab_0x88_O.test_tt.save_score_up);      

        // console.log("Search_0x88_C->USE----------------------------- ");      
        // console.log("Search_0x88_C->use_alpha_up " + this.search_ab_0x88_O.test_tt.use_alpha_up);
        // console.log("Search_0x88_C->use_alpha_cut " + this.search_ab_0x88_O.test_tt.use_alpha_cut);
        // console.log("Search_0x88_C->use_beta_up " + this.search_ab_0x88_O.test_tt.use_beta_up);
        // console.log("Search_0x88_C->use_beta_cut " + this.search_ab_0x88_O.test_tt.use_beta_cut);
        // console.log("Search_0x88_C->use_score " + this.search_ab_0x88_O.test_tt.use_score);     

        //console.log("Search_0x88_C->add_a_cnt_h_move " + this.search_ab_0x88_O.test_hh.add_a_cnt_h_move);
        //console.log("Search_0x88_C->add_b_cnt_h_move " + this.search_ab_0x88_O.test_hh.add_b_cnt_h_move);

        let w = (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) ? 1 : -1;

        this.info_return_search.fen_start = fen_start;
        this.info_return_search.fen_end = chess_board_0x88_O_end.set_fen_from_0x88();
        this.info_return_search.pv_line_str = pv_line_0x88_O.pv_line_to_string(chess_board_0x88_O, move_list_0x88_O);
        this.info_return_search.pv_line_uci_str = pv_line_0x88_O.pv_line_to_uci_string(chess_board_0x88_O, move_list_0x88_O);
        this.info_return_search.best_score_str = String(best_score);
        this.info_return_search.best_score_uci_str = String(w * best_score);
        this.info_return_search.best_move_uci_str = move_list_0x88_O.move_to_string_uci(best_move_i, chess_board_0x88_O);
        this.info_return_search.node_count_str = String(node);
        this.info_return_search.nodes_per_second_str = String(Math.round(node / time_delta));
        this.info_return_search.depth_max_search_str = String(depth_max_current);

        // nnnnnnnnnnnnnnnnnnnnnn
        this.chessEngine_0x88_O.message_search_root_to_engine(this.info_return_search);

        this.chessEngine_0x88_O.info_from_depth_uci(this.info_return_search);

        //console.log("Search_0x88_C->ADD");
        //console.log("Search_0x88_C->key_64_equal " + this.transposition_table_0x88_O.key_64_equal);
        //console.log("Search_0x88_C->key_64_not_equal " + this.transposition_table_0x88_O.key_64_not_equal);
        //console.log("Search_0x88_C->node " + node);
        //console.log("Search_0x88_C->add_position " + this.transposition_table_0x88_O.add_position_p);
        //console.log("Search_0x88_C->add_position_key_64_true " + this.transposition_table_0x88_O.add_position_key_64_true);
        //console.log("Search_0x88_C->add_position_new " + this.transposition_table_0x88_O.add_position_new);
        //console.log("Search_0x88_C->add_position_rew " + this.transposition_table_0x88_O.add_position_rew);
        //console.log("Search_0x88_C->IS");
        //console.log("Search_0x88_C->is_save_position " + this.transposition_table_0x88_O.is_save_position_p);
        //console.log("Search_0x88_C->is_save_key_64_true " + this.transposition_table_0x88_O.is_save_key_64_true);
        //console.log("Search_0x88_C->is_save_key_64_false " + this.transposition_table_0x88_O.is_save_key_64_false);
        //console.log("Search_0x88_C->is_save_delta_depth_ok " + this.transposition_table_0x88_O.is_save_delta_depth_ok);
        //console.log("Search_0x88_C->collision_fen " + this.transposition_table_0x88_O.collision_fen);
        //console.log("Search_0x88_C->no_collision_fen " + this.transposition_table_0x88_O.no_collision_fen);


        //this.transposition_table_0x88_O.test_uses_hash();
      }
      else { // if (number_move_legal != 0) {
        this.info_return_search.fen_start = fen_start;
        this.info_return_search.fen_end = chess_board_0x88_O_end.set_fen_from_0x88();
        this.info_return_search.pv_line_str = "PV line: no move";
        this.info_return_search.pv_line_uci_str = "PV line: no move";
        this.info_return_search.best_move_uci_str = "no move";

        this.chessEngine_0x88_O.message_search_root_to_engine(this.info_return_search);

        this.chessEngine_0x88_O.info_from_depth_uci(this.info_return_search);
      }

    }// for (let depth_max_current = 1; depth_max_current < depth_max_search; depth_max_current++) {

    return this.info_return_search;
  }

  /////////////////////////////////////////////////////////

  // minmax
  start_search_minmax(fen_start, depth_max) {
    let depth = 0;

    let chess_board_0x88_O = new Chess_board_0x88_C();
    let chess_board_0x88_O_start = new Chess_board_0x88_C();
    let chess_board_0x88_O_end = new Chess_board_0x88_C();
    let chess_board_0x88_O_save_test = new Chess_board_0x88_C();

    let move_list_0x88_O_for_pv_line = new Move_list_0x88_С();

    let pv_line_0x88_O = new PV_line_0x88_C();

    let time_start = 0;
    let time_end = 0;
    let time_delta = 0;

    time_start = this.timer_O.getCurrentTimeMs();

    chess_board_0x88_O_start.set_0x88_from_fen(fen_start);
    chess_board_0x88_O_start.key_64 = this.transposition_table_0x88_O.set_key_from_board_0x88(chess_board_0x88_O_start);


    chess_board_0x88_O.save_chess_board_0x88(chess_board_0x88_O_start);
    chess_board_0x88_O_save_test.save_chess_board_0x88(chess_board_0x88_O);

    console.log("Search_0x88_C->minmax start_search ");
    //chess_board_0x88_O_save_test.test_print_0x88_color();

    //
    this.search_minmax_0x88_O.node = 0;

    let best_score = this.search_minmax_0x88_O.searching_minmax(pv_line_0x88_O, chess_board_0x88_O,
      this.move_gen_1_captures_0x88_O, this.move_gen_2_quiet_0x88_O, depth, depth_max, this.transposition_table_0x88_O);

    //console.log("=========================================================================");
    //console.log("Search_0x88_C->start_search 22222 =============================================");
    //chess_board_0x88_O_save_test.test_print_0x88_color();
    //chess_board_0x88_O.test_print_0x88_color();

    //chess_board_0x88_O_save_test.test_compare_chess_board_0x88(chess_board_0x88_O);
    chess_board_0x88_O_end.save_chess_board_0x88(this.search_minmax_0x88_O.chess_board_0x88_O_end);
    //chess_board_0x88_O_end.save_chess_board_0x88(this.search_minmax_0x88_O.chess_board_0x88_O_move);

    time_end = this.timer_O.getCurrentTimeMs();
    time_delta = (time_end - time_start) / 1000;

    this.info_return_search.fen_start = fen_start;
    this.info_return_search.fen_end = chess_board_0x88_O_end.set_fen_from_0x88();
    this.info_return_search.pv_line_str = pv_line_0x88_O.pv_line_to_string(chess_board_0x88_O, move_list_0x88_O_for_pv_line);

    this.info_return_search.best_score_str = String(best_score);
    this.info_return_search.node_count_str = String(this.search_minmax_0x88_O.node);
    this.info_return_search.nodes_per_second_str = String(Math.round(this.search_minmax_0x88_O.node / time_delta));
    this.info_return_search.depth_max_search_str = String(depth_max);


    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88_color();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_any_0x88();
    //console.log("Search_0x88_C->start_print_pv_line ***************************************");
    //this.info_return_search.pv_line.test_print_pv_line(chess_board_0x88_O);
    //pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);

    console.log("Search_0x88_C->minmax search node " + this.search_minmax_0x88_O.node);

    return this.info_return_search;
  }

  // moves e2e4 e7e5 g1f3 b8c6 f1b5
  move_str_to_board(fen_start, move_str) {

    // эта доска используется что бы перевести уки команду в позицию 
    // потом провести ходы, если есть, а потом опять перевести в фен. 
    // т.е. к счету внутри движка эта доска отношения не имеет.
    let chess_board_0x88_O_uci = new Chess_board_0x88_C();


    let move_list_0x88_O = new Move_list_0x88_С();
    let undo_0x88_O = new Undo_0x88_C();

    let from;
    let to;
    let promo;
    let x07;
    let y07;
    let i_move;
    let is_moove_legal;

    let pos_start = 6;

    this.transposition_table_0x88_O.iniM();

    chess_board_0x88_O_uci.set_0x88_from_fen(fen_start);

    //console.log("Search_0x88_C-> " + move_str);

    for (let pos = pos_start; pos < move_str.length; pos++) {

      //console.log("Search_0x88_C-> " + move_str[pos] + move_str[pos + 1] +
      //  move_str[pos + 2] + move_str[pos + 3] + move_str[pos + 4]);

      move_list_0x88_O.iniM();
      this.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O_uci, move_list_0x88_O);
      this.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O_uci, move_list_0x88_O);

      //console.log("1 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]);      
      x07 = chess_board_0x88_O_uci.letter_to_x_coordinate(move_str[pos]);
      pos = pos + 1;

      //console.log("1 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]);       
      y07 = 8 - Number(move_str[pos]);
      pos = pos + 1;
      from = chess_board_0x88_O_uci.x07_y07_to_0x88(x07, y07);
      //console.log("1 Search_0x88_C-> from " + from);

      //console.log("2 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]);      
      x07 = chess_board_0x88_O_uci.letter_to_x_coordinate(move_str[pos]);
      pos = pos + 1;
      //console.log("2 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]);      
      y07 = 8 - Number(move_str[pos]);

      to = chess_board_0x88_O_uci.x07_y07_to_0x88(x07, y07);

      //console.log("2 Search_0x88_C-> to " + to);      

      pos = pos + 1;

      promo = "";
      //console.log("3 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]); 
      if (move_str[pos] != " ") {
        promo = move_str[pos];
        pos = pos + 1;
      }

      i_move = move_list_0x88_O.return_i_move(from, to, promo);

      //console.log("Search_0x88_C-> from " + from + " to " + to + " promo " + promo + " i_move " + i_move);

      is_moove_legal = this.make_move_0x88_O.do_moves(i_move, chess_board_0x88_O_uci, move_list_0x88_O,
        undo_0x88_O, this.move_gen_1_captures_0x88_O, this.transposition_table_0x88_O);

      if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
        //console.log("Search_0x88_C->ошибка хода");
        return -1;
      } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
        //console.log("Search_0x88_C->ошибка рокировки");
        return -1;
      }
    }//for (let pos = pos_start; pos < move_str.length; pos++) {

    //chess_board_0x88_O_uci.test_print_0x88();
    //chess_board_0x88_O_uci.test_print_0x88_color();    
    //chess_board_0x88_O_uci.test_print_any_0x88();
    let fen = chess_board_0x88_O_uci.set_fen_from_0x88();
    //console.log("Search_0x88_C-> fen " + fen);
    return fen;

  }//move_str_to_board(chess_board_0x88_O_uci, move_str) {

}

export { Search_root_0x88_C };