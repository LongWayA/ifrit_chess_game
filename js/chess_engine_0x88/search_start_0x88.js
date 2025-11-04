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
  hash_table_0x88_O = new Hash_table_0x88_C();

  search_negamax_0x88_O = new Search_negamax_0x88_C();//TEST_NEGAMAX
  search_ab_0x88_O = new Search_ab_0x88_C();

  chess_board_0x88_O_save_test = new Chess_board_0x88_C();
  move_list_0x88_O = new Move_list_0x88_С();

  static NAME = "Search_start_0x88_C";

  static ALPHA_VALUE = -30000;
  static BETA_VALUE = 30000;

  info_return_search = {
    best_move: "-",
    score: 0,
    pv_line: "-",
    pv_line_str: "-",
    node_count: 0,
    chess_board_0x88_O_move: null
  };


  node = 0;


  constructor() {

  }

  iniM() {
    this.hash_table_0x88_O.iniM();
    //for tactical and quiet moves
  }

  // negamax
  test_start_search_nm(pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth_max) {
    let depth = 0;

    this.chess_board_0x88_O_save_test.save_chess_board_0x88(chess_board_0x88_O);
    //console.log("=========================================================================");
    //console.log("Search_0x88_C->start_search =============================================");
    // negamax
    this.search_negamax_0x88_O.node = 0;

    let score = this.search_negamax_0x88_O.searching_negamax(pv_line_0x88_O, chess_board_0x88_O,
      move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth, depth_max);

    if (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.BLACK) score = -1 * score;

    this.chess_board_0x88_O_save_test.test_compare_chess_board_0x88(chess_board_0x88_O);

    this.info_return_search.best_move = "-";
    this.info_return_search.score = score;
    this.info_return_search.pv_line = pv_line_0x88_O;
    this.info_return_search.pv_line_str = pv_line_0x88_O.pv_line_to_string(chess_board_0x88_O, this.move_list_0x88_O);
    this.info_return_search.node_count = this.search_negamax_0x88_O.node;
    this.info_return_search.chess_board_0x88_O_move = this.search_negamax_0x88_O.chess_board_0x88_O_move;

    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_0x88_color();
    //  this.search_minmax_0x88_O.chess_board_0x88_O_move.test_print_any_0x88();
    //console.log("Search_0x88_C->start_print_pv_line ***************************************");
    //this.info_return_search.pv_line.test_print_pv_line(chess_board_0x88_O);
    //pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);

    console.log("Search_0x88_C->this.search_negamax_0x88_O.node" + this.search_negamax_0x88_O.node);

    return this.info_return_search;
  }

  // alpha beta
  test_start_search_ab(pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth_max) {
    let depth = 0;
    let alpha = Search_start_0x88_C.ALPHA_VALUE;
    let beta = Search_start_0x88_C.BETA_VALUE;
    this.node = 0;
    this.search_ab_0x88_O.node = 0;
    let isPV_node = 1;

    // копируем доску чтобы когда у движка не будет ходов он не откатывался к предыдущей.
    this.search_ab_0x88_O.chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);

    this.search_ab_0x88_O.node = 0;

    let score = this.search_ab_0x88_O.searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,//
      move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth, depth_max, isPV_node);

    // let score = this.search_ab_0x88_O.searching_alpha_beta_test(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,//
    //   move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth, depth_max);

    this.info_return_search.best_move = "-";
    this.info_return_search.score = score;
    this.info_return_search.pv_line = pv_line_0x88_O;
    this.info_return_search.pv_line_str = pv_line_0x88_O.pv_line_to_string(chess_board_0x88_O, this.move_list_0x88_O);
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
  // 
  searching_iterative_deepening(pv_line_0x88_O, chess_board_0x88_O, move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, depth_max_2) {

    let undo_0x88_O = new Undo_0x88_C();
    let best_node_line_0x88_O = new PV_line_0x88_C();
    let move_list_0x88_O = new Move_list_0x88_С();
    let chess_board_0x88_O_move = new Chess_board_0x88_C();


    let alpha;
    let beta;
    let score = 0;// текущая оценка позиции
    let depth = 0;
    let best_score;// лучшая оценка позиции
    let isPV_node = 1;

    //console.log("Search_0x88_C->depth " + depth);
    let is_moove_legal = -1;
    move_list_0x88_O.iniM();
    //this.hash_table_0x88_O.iniM();
    this.node = 0;

    // копируем доску чтобы когда у движка не будет ходов он не откатывался к предыдущей.
    chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);

    move_gen_1_captures_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    move_gen_2_quiet_0x88_O.generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O);
    // первый раз сортируем по типу хода.
    move_list_0x88_O.sorting_list();

    console.log("Search_0x88_C->начало поиска searching_alpha_beta_id ");
    //    move_list_0x88_O.test_print_list(chess_board_0x88_O);

    //    chess_board_0x88_O.test_print_0x88();

    // увеличение по максимальной глубине
    for (let depth_max = 1; depth_max <= depth_max_2; depth_max++) {

      if (chess_board_0x88_O.side_to_move == 1) {
        best_score = -Search_ab_0x88_C.BEST_VALUE_MOD;// максимальная оценка позиции
      } else {
        best_score = Search_ab_0x88_C.BEST_VALUE_MOD;// максимальная оценка позиции
      }
      alpha = Search_start_0x88_C.ALPHA_VALUE;
      beta = Search_start_0x88_C.BETA_VALUE;

      pv_line_0x88_O.clear_list()
      this.hash_table_0x88_O.iniM();
      // идем по списку ходов
      for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

        is_moove_legal = this.make_move_0x88_O.do_moves(move_i, chess_board_0x88_O, move_list_0x88_O,
          undo_0x88_O, move_gen_1_captures_0x88_O);

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

        this.search_ab_0x88_O.node = 0;
        //        score = -1 * this.search_ab_0x88_O.searching_alpha_beta_test(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,
        //move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, (depth + 1), depth_max);
        score = this.search_ab_0x88_O.searching_alpha_beta_id(alpha, beta, pv_line_0x88_O, chess_board_0x88_O,
          move_gen_1_captures_0x88_O, move_gen_2_quiet_0x88_O, (depth + 1), depth_max, isPV_node, this.hash_table_0x88_O);

        this.node = this.node + this.search_ab_0x88_O.node + 1;

        move_list_0x88_O.score_move[move_i] = score;

        //console.log("Search_0x88_C-> должны смотреть за черных, а вот реально что " + move_list_0x88_O.piece_color[move_i]);
        // белые ищут максимум
        if (move_list_0x88_O.piece_color[move_i] == Chess_board_0x88_C.WHITE) {
          if (score > best_score) {
            best_node_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_line_0x88_O.type_variant[depth] = "id_W";
            best_node_line_0x88_O.score_move[depth] = score;
            best_score = score;
            chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
            if (score > alpha) alpha = score; // alpha acts like max in MiniMax
          }//if (score > best_score) {
        } else {
          if (score < best_score) {
            best_node_line_0x88_O.save_list(pv_line_0x88_O);
            best_node_line_0x88_O.type_variant[depth] = "id_B";
            best_node_line_0x88_O.score_move[depth] = score;
            best_score = score;
            chess_board_0x88_O_move.save_chess_board_0x88(chess_board_0x88_O);
            if (score < beta) beta = score; // alpha acts like max in MiniMax
          }//if (score > best_score) {
        }

        // восстановили доску
        this.unmake_move_0x88_O.undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O);
      }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

      if (chess_board_0x88_O.side_to_move == 1) {
        move_list_0x88_O.sorting_list_top_max_score();
      } else {
        move_list_0x88_O.sorting_list_top_min_score();
      }

      pv_line_0x88_O.save_list(best_node_line_0x88_O);

      this.info_return_search.best_move = "-";
      this.info_return_search.score = best_score;
      this.info_return_search.pv_line = pv_line_0x88_O;
      this.info_return_search.pv_line_str = pv_line_0x88_O.pv_line_to_string(chess_board_0x88_O, this.move_list_0x88_O);
      this.info_return_search.node_count = this.node;
      this.info_return_search.chess_board_0x88_O_move = chess_board_0x88_O_move;
      console.log("Search_0x88_C->pv_line_str " + this.info_return_search.pv_line_str + " depth_max " + depth_max);

      console.log("Search_0x88_C->z " + this.hash_table_0x88_O.z); 
      console.log("Search_0x88_C->z_add " + this.hash_table_0x88_O.z_add);      
      console.log("Search_0x88_C->no_colz " + this.hash_table_0x88_O.no_colz);
      console.log("Search_0x88_C->colz " + this.hash_table_0x88_O.colz);

    }// for (let depth_max = 1; depth_max < depth_max_2; depth_max++) {

    //console.log("Search_0x88_C->конец поиска ");

    //move_list_0x88_O.test_print_list(chess_board_0x88_O);
    //chess_board_0x88_O.test_print_0x88();
    //chess_board_0x88_O_move.test_print_0x88();
    return this.info_return_search;
  }
}