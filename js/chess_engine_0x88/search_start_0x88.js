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

class Search_start_0x88_C {

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();
  evaluate_0x88_O = new Evaluate_0x88_C();

  search_minmax_0x88_O = new Search_minmax_0x88_C();
  search_ab_0x88_O = new Search_ab_0x88_C();
  search_pvs_0x88_O = new Search_pvs_0x88_C();

  static NAME = "Search_start_0x88_C";

  info_return_search = {
    best_move: "-",
    score: 0,
    pv_line: "-",
    node_count: 0,
    chess_board_0x88_O_move: null
  };


  node = 0;

  constructor() {

  }

  iniM() {
    //for tactical and quiet moves
  }

  // min max
  test_start_search_mm(pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, depth_max) {
    let depth = 0;

    // min max
    let score = this.search_minmax_0x88_O.searching_minimax(pv_line_0x88_O, chess_board_0x88_O,
      move_generator_0x88_O, depth, depth_max);

    this.info_return_search.best_move = "-";
    this.info_return_search.score = score;
    this.info_return_search.pv_line = pv_line_0x88_O;
    this.info_return_search.node_count = this.search_minmax_0x88_O.node;
    this.info_return_search.chess_board_0x88_O_move = this.search_minmax_0x88_O.chess_board_0x88_O_move;

    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88_color();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_any_0x88();

    return this.info_return_search;
  }

  // alpha beta
  test_start_search_ab(pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, depth_max) {
    let depth = 0;
    let alpha = -50000;
    let beta = 50000;

    // alpha beta
    let score = this.search_ab_0x88_O.searching_alpha_beta(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,
      move_generator_0x88_O, depth, depth_max);

    this.info_return_search.best_move = "-";
    this.info_return_search.score = score;
    this.info_return_search.pv_line = pv_line_0x88_O;
    this.info_return_search.node_count = this.search_ab_0x88_O.node;
    this.info_return_search.chess_board_0x88_O_move = this.search_ab_0x88_O.chess_board_0x88_O_move;
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88_color();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_any_0x88();


    return this.info_return_search;
  }

  // alpha beta fail hard
  test_start_search_abfh(pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, depth_max) {
    let score;// текущая оценка позиции
    let depth = 0;
    let alpha = -50000;
    let beta = 50000;

    // alpha beta fail hard
    score = this.search_ab_0x88_O.searching_alpha_beta_fail_hard(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,
      move_generator_0x88_O, depth, depth_max);

    this.info_return_search.best_move = "-";
    this.info_return_search.score = score;
    this.info_return_search.pv_line = pv_line_0x88_O;
    this.info_return_search.node_count = this.search_ab_0x88_O.node;
    this.info_return_search.chess_board_0x88_O_move = this.search_ab_0x88_O.chess_board_0x88_O_move;

    return this.info_return_search;
  }

  // iterative deepening with PVS
  start_search_id(pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, depth_max) {

    this.node = 0;
    this.info_return_search = this.searching_iterative_deepening(pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, depth_max);
    //console.log("Search_0x88_C->start_search " + depth + " score " + score);
    return this.info_return_search;
  }

  /////////////////////////////////

  // 
  searching_iterative_deepening(pv_line_0x88_O, chess_board_0x88_O, move_generator_0x88_O, depth_max_2) {

    let alpha = -50000;
    let beta = 50000;
    let undo_0x88_O = new Undo_0x88_C();
    let score = 0;// текущая оценка позиции
    let depth = 0;
    let best_score;// лучшая оценка позиции

    //console.log("Search_0x88_C->depth " + depth);
    let is_moove_legal = -1;
    let move_list_0x88_O = new Move_list_0x88_С();
    let chess_board_0x88_O_move = new Chess_board_0x88_C();

    move_list_0x88_O.iniM();

    move_generator_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    // первый раз сортируем по типу хода.
    move_list_0x88_O.sorting_list();

    // увеличение по максимальной глубине
    for (let depth_max = 1; depth_max <= depth_max_2; depth_max++) {

      if (chess_board_0x88_O.side_to_move == 1) {
        best_score = - 10000;
        alpha = -50000;

      } else {
        best_score = 10000;
        beta = 50000;
      }// if (chess_board_0x88_O.side_to_move == 1) {

      // идем по списку ходов
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);

        if (is_moove_legal == 0) {
          // особый случай. нелегальные рокировки не генерируются
          if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
            (move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE)) {
            this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
          }//if ((move_list_0x88_O.type_move[move_i] != Move_list_0x88_С.MOVE_KING_CASTLE) &&
          continue;
        }//if (is_moove_legal == 0) {

        this.search_pvs_0x88_O.node = 0;
        score = this.search_pvs_0x88_O.searching_PVS(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,
          move_generator_0x88_O, (depth + 1), depth_max);
        this.node = this.node + this.search_pvs_0x88_O.node + 1;

        //score = this.searching_alpha_beta_fail_hard(alpha, beta, chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max);
        //score = this.searching_minimax(chess_board_0x88_O, move_generator_0x88_O, (depth + 1), depth_max)
        move_list_0x88_O.score_move[move_i] = score;

        if (move_list_0x88_O.piece_color[move_i] == 1) {//
          //console.log("Search_0x88_C-> должны смотреть за черных, а вот реально что " + move_list_0x88_O.piece_color[move_i]);
          // белые ищут максимум
          if (score > best_score) {
            if (score > alpha) alpha = score; // alpha acts like max in MiniMax
            best_score = score;
            pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
          }//if (score > best_score) {

        } else {
          //console.log("Search_0x88_C-> должны смотреть за черных, а вот реально что " + move_list_0x88_O.piece_color[move_i]);
          // черные ищут минимум  
          if (score < best_score) {
            if (score < beta) beta = score; // beta acts like min in MiniMax
            best_score = score;
            pv_line_0x88_O.add_move(move_i, move_list_0x88_O, depth);
            chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
          }//if (score < best_score) {
        }//if (move_list_0x88_O.piece_color[move_i] == 1) {//
        // восстановили доску
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O);
      }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      // мы прошли весь список ходов. теперь сортируем его по оценке. белые ищут макс., а черные мин.
      if (chess_board_0x88_O.side_to_move == 1) {
        //console.log("Search_0x88_C->score > MAX " + depth_max);
        move_list_0x88_O.sorting_list_top_max_score();
      } else {
        //console.log("Search_0x88_C->score > MIN " + depth_max);
        move_list_0x88_O.sorting_list_top_min_score();
      }//if (chess_board_0x88_O.side_to_move == 1) {

    }// for (let depth_max = 1; depth_max < depth_max_2; depth_max++) {

    // console.log("Search_0x88_C->СМОТРИМ ЧТО ПОЛУЧИЛОСЬ ");
    // move_list_0x88_O.test_print_list(chess_board_0x88_O);

    this.info_return_search.best_move = "-";
    this.info_return_search.score = best_score;
    this.info_return_search.pv_line = pv_line_0x88_O;
    this.info_return_search.node_count = this.node;
    this.info_return_search.chess_board_0x88_O_move = chess_board_0x88_O_move;

    return this.info_return_search;
  }
}