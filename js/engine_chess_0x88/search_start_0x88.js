/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_start_0x88.js
 * @version created 11.10m.2025 
 * last modified 11.10m.2025, 24.10m.2025
*/

import { Chess_board_0x88_C } from "./move_generator/chess_board_0x88.js";
import { Move_list_0x88_С } from "./move_generator/move_list_0x88.js";
import { Move_list_root_0x88_С } from "./move_generator/move_list_root_0x88.js";
import { PV_line_0x88_C } from "./pv_line_0x88.js";

import { Move_gen_1_captures_0x88_С } from "./move_generator/move_gen_1_captures_0x88.js";
import { Move_gen_2_quiet_0x88_С } from "./move_generator/move_gen_2_quiet_0x88.js";
import { Make_move_0x88_C } from "./move_generator/make_move_0x88.js";
import { Unmake_move_0x88_C } from "./move_generator/unmake_move_0x88.js";
import { Undo_0x88_C } from "./move_generator/undo_0x88.js";

import { Evaluate_0x88_C } from "./evaluate_0x88.js";
import { Transposition_table_0x88_C } from "./for_sorting_move/transposition_table_0x88.js";
import { killer_heuristic_0x88_O } from "./for_sorting_move/killer_heuristic_0x88.js";
import { History_heuristic_0x88_C } from "./for_sorting_move/history_heuristic_0x88.js";
import { Search_minmax_0x88_C } from "./search_minmax_0x88.js";
import { Search_ab_0x88_C } from "./search_ab_0x88.js";





/**
* НАЗНАЧЕНИЕ
* Поиск начинается с присланой позиции chess_board_0x88_O_start
* и максимальной глубины depth_max_2
* конечно можно было бы уже на этом уровне принимать фен, но пока что
* решил переводить из фена уровнем выше что бы и там что то делать и
* не перегружать этот уровень. но на самом деле это не принципиально
*
* Во время поиска идет циклическое погружение и на каждой просчитанной глубине
* возвращается заполненный объект info_return_search
* в нем я тоже решил обойтись минимумом. 
* Для тестов и ясности есть начальная позиция chess_board_0x88_O_start
* Конечно есть финальная позиция chess_board_0x88_O_end
* Так что поиск начинается со стартовой и заканчивается
* финальной позицией.
* Конечно есть лучшая оценка найденная во время поиска score
* Конечно же выводим лучший вариант pv_line
* его вид еще не окончательный. надо будет еще обдумать.
* Дальше вывод количество рассмотреных узлов. 
* Надо подумать включать в них быстрый поиск node_count
* или может быть вывести два - с ним и без него 
* И конечно же глубина поиска. depth_search
* После просмотра на заданной глубине мы выводим объект info_return_search
*
* Думаю этот интерфейс останется надолго. Добавление эвристик и даже замена генератора
* на него влиять не должны
*
*/



class Search_start_0x88_C {

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

  static NAME = "Search_start_0x88_C";

  static ALPHA_VALUE = -30000;
  static BETA_VALUE = 30000;

  info_return_search = {
    chess_board_0x88_O_start: null,//
    chess_board_0x88_O_end: null,//
    score: 0,//
    pv_line: null,//
    node_count: 0,//
    depth_search: 0//
  };

  constructor() {

  }

  iniM(chessEngine_0x88_O) {
    this.chessEngine_0x88_O = chessEngine_0x88_O;

    this.transposition_table_0x88_O.iniM();
    this.history_heuristic_0x88_O.iniM();
  }


  message_engine_to_search_start(message) {

  }


  // 
  searching_iterative_deepening(chess_board_0x88_O_start, depth_max_2) {

    let chess_board_0x88_O = new Chess_board_0x88_C();
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
    let isPV_node = 1;

    //console.log("Search_0x88_C->depth " + depth);
    let is_moove_legal = -1;

    move_list_0x88_O.iniM();
    move_list_root_0x88_O.iniM();

    //this.transposition_table_0x88_O.iniM();
    let node = 0;

    chess_board_0x88_O.save_chess_board_0x88(chess_board_0x88_O_start);

    // копируем доску чтобы когда у движка не будет ходов он не откатывался к предыдущей.
    chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O);


    this.move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    this.move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);

    move_list_0x88_O.sorting_list();

    console.log("Search_0x88_C->начало поиска searching_alpha_beta_id ");

    // увеличение по максимальной глубине
    for (let depth_max = 1; depth_max <= depth_max_2; depth_max++) {

      if (chess_board_0x88_O.side_to_move == 1) {
        best_score = -Search_ab_0x88_C.BEST_VALUE_MOD;// максимальная оценка позиции
      } else {
        best_score = Search_ab_0x88_C.BEST_VALUE_MOD;// максимальная оценка позиции
      }
      alpha = Search_start_0x88_C.ALPHA_VALUE;
      beta = Search_start_0x88_C.BETA_VALUE;

      pv_line_0x88_O.clear_list();
      //this.transposition_table_0x88_O.iniM();
      this.killer_heuristic_0x88_O.clear_list();
      // идем по списку ходов
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O,
          undo_0x88_O, this.move_gen_1_captures_0x88_O);

        if (is_moove_legal == 0) {
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {

            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
          }//if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
          continue;
        }//if (is_moove_legal == 0) {

        this.search_ab_0x88_O.node = 0;
        pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
        pv_line_0x88_O.type_variant[depth] = "id";

        score = this.search_ab_0x88_O.searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,
          this.move_gen_1_captures_0x88_O, this.move_gen_2_quiet_0x88_O, (depth + 1), depth_max,
          isPV_node, this.transposition_table_0x88_O, this.killer_heuristic_0x88_O, this.history_heuristic_0x88_O);

        node = node + this.search_ab_0x88_O.node + 1;

        move_list_root_0x88_O.add_score[move_i] = score;

        //console.log("Search_0x88_C-> должны смотреть за черных, а вот реально что " + move_list_0x88_O.piece_color);
        // белые ищут максимум
        if (move_list_0x88_O.piece_color == Chess_board_0x88_C.WHITE) {
          if (score > best_score) {
            best_node_pv_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_pv_line_0x88_O.type_variant[depth] = "id_W";
            best_node_pv_line_0x88_O.score_depth_max = score;
            best_score = score;
            chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O);
            if (score > alpha) alpha = score; // alpha acts like max in MiniMax
          }//if (score > best_score) {
        } else {
          if (score < best_score) {
            best_node_pv_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_pv_line_0x88_O.type_variant[depth] = "id_B";
            best_node_pv_line_0x88_O.score_depth_max = score;
            best_score = score;
            chess_board_0x88_O_end.save_chess_board_0x88(chess_board_0x88_O);
            if (score < beta) beta = score; // alpha acts like max in MiniMax
          }//if (score > best_score) {
        }

        // восстановили доску
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
      }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      if (chess_board_0x88_O.side_to_move == 1) {
        move_list_root_0x88_O.sorting_list_top_max_score(move_list_0x88_O);
      } else {
        move_list_root_0x88_O.sorting_list_top_min_score(move_list_0x88_O);
      }

      pv_line_0x88_O.save_list(best_node_pv_line_0x88_O);

      this.info_return_search.chess_board_0x88_O_start = chess_board_0x88_O_start;
      this.info_return_search.chess_board_0x88_O_end = chess_board_0x88_O_end;
      this.info_return_search.score = best_score;
      this.info_return_search.pv_line = pv_line_0x88_O;
      this.info_return_search.node_count = node;
      this.info_return_search.depth_search = depth_max;

      this.chessEngine_0x88_O.message_search_start_to_engine(this.info_return_search);

      console.log("Search_0x88_C->ADD");
      console.log("Search_0x88_C->node " + node);
      console.log("Search_0x88_C->add_position " + this.transposition_table_0x88_O.add_position_p);
      console.log("Search_0x88_C->add_position_key_32_true " + this.transposition_table_0x88_O.add_position_key_32_true);
      console.log("Search_0x88_C->add_position_new " + this.transposition_table_0x88_O.add_position_new);
      console.log("Search_0x88_C->add_position_rew " + this.transposition_table_0x88_O.add_position_rew);
      console.log("Search_0x88_C->IS");      
      console.log("Search_0x88_C->is_save_position " + this.transposition_table_0x88_O.is_save_position_p);
      console.log("Search_0x88_C->is_save_key_32_true " + this.transposition_table_0x88_O.is_save_key_32_true);
      console.log("Search_0x88_C->is_save_key_32_false " + this.transposition_table_0x88_O.is_save_key_32_false);
      console.log("Search_0x88_C->collision_fen " + this.transposition_table_0x88_O.collision_fen);
      console.log("Search_0x88_C->no_collision_fen " + this.transposition_table_0x88_O.no_collision_fen);


      this.transposition_table_0x88_O.test_uses_hash();

    }// for (let depth_max = 1; depth_max < depth_max_2; depth_max++) {

    return this.info_return_search;
  }

  /////////////////////////////////////////////////////////

  // minmax
  test_start_search_minmax(chess_board_0x88_O_start, depth_max) {
    let depth = 0;

    let chess_board_0x88_O = new Chess_board_0x88_C();
    let chess_board_0x88_O_end = new Chess_board_0x88_C();
    let chess_board_0x88_O_save_test = new Chess_board_0x88_C();

    let pv_line_0x88_O = new PV_line_0x88_C();

    chess_board_0x88_O.save_chess_board_0x88(chess_board_0x88_O_start);
    chess_board_0x88_O_save_test.save_chess_board_0x88(chess_board_0x88_O);

    //console.log("=========================================================================");
    //console.log("Search_0x88_C->start_search =============================================");
    // negamax
    this.search_minmax_0x88_O.node = 0;

    let best_score = this.search_minmax_0x88_O.searching_minmax(pv_line_0x88_O, chess_board_0x88_O,
      this.move_gen_1_captures_0x88_O, this.move_gen_2_quiet_0x88_O, depth, depth_max);

    chess_board_0x88_O_save_test.test_compare_chess_board_0x88(chess_board_0x88_O);
    chess_board_0x88_O_end.save_chess_board_0x88(this.search_minmax_0x88_O.chess_board_0x88_O_end);
    //chess_board_0x88_O_end.save_chess_board_0x88(this.search_minmax_0x88_O.chess_board_0x88_O_move);

    this.info_return_search.chess_board_0x88_O_start = chess_board_0x88_O_start;
    this.info_return_search.chess_board_0x88_O_end = chess_board_0x88_O_end;
    this.info_return_search.score = best_score;
    this.info_return_search.pv_line = pv_line_0x88_O;
    this.info_return_search.node_count = this.search_minmax_0x88_O.node;
    this.info_return_search.depth_search = depth_max;

    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88_color();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_any_0x88();
    //console.log("Search_0x88_C->start_print_pv_line ***************************************");
    //this.info_return_search.pv_line.test_print_pv_line(chess_board_0x88_O);
    //pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);

    console.log("Search_0x88_C->this.search_negamax_0x88_O.node" + this.search_minmax_0x88_O.node);

    return this.info_return_search;
  }

  // alpha beta
  test_start_search_ab(depth_max) {
    let depth = 0;
    let alpha = Search_start_0x88_C.ALPHA_VALUE;
    let beta = Search_start_0x88_C.BETA_VALUE;
    this.node = 0;
    this.search_ab_0x88_O.node = 0;
    let isPV_node = 1;

    console.log("Search_0x88_C->test_start_search_ab");

    // копируем доску чтобы когда у движка не будет ходов он не откатывался к предыдущей.
    this.search_ab_0x88_O.chess_board_0x88_O_move.save_chess_board_0x88(this.chess_board_0x88_O);

    this.search_ab_0x88_O.node = 0;

    let score = this.search_ab_0x88_O.searching_alpha_beta_id(alpha, beta, this.pv_line_0x88_O, this.chess_board_0x88_O,
      this.move_gen_1_captures_0x88_O, this.move_gen_2_quiet_0x88_O, depth, depth_max,
      isPV_node, this.transposition_table_0x88_O, this.killer_heuristic_0x88_O, this.history_heuristic_0x88_O);


    // let score = this.search_ab_0x88_O.searching_alpha_beta_test(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,//
    //   move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth, depth_max);

    this.info_return_search.best_move = "-";
    this.info_return_search.score = score;
    this.info_return_search.pv_line = this.pv_line_0x88_O;
    this.info_return_search.pv_line_str = pv_line_0x88_O.pv_line_to_string(this.chess_board_0x88_O, this.move_list_0x88_O);
    this.info_return_search.node_count = this.search_ab_0x88_O.node;
    this.info_return_search.chess_board_0x88_O_move = this.search_ab_0x88_O.chess_board_0x88_O_move;
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88_color();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_any_0x88();
    //console.log("Search_0x88_C->start_search ***************************************");
    //pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);
    //this.info_return_search.pv_line.test_print_pv_line(chess_board_0x88_O);
    //console.log("Search_0x88_C->pv_line_str " + this.info_return_search.pv_line_str);
    return this.info_return_search;
  }

  /////////////////////////////////

}

export { Search_start_0x88_C };