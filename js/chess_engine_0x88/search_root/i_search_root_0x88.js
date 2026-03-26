// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_search_root_0x88.js
 * @version created 24.01m.2026 
*/


import {
    clear_list_ml, add_packing_move_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml, set_color_ml, 
    set_number_captures_move_ml, sorting_list_ml, test_compare_list_from_ml, test_print_i_move_list_ml, test_print_list_ml, 
    save_list_from_ml, move_is_found_ml, return_i_move_ml, move_to_string_uci_ml, return_type_captures_pawn_promo_ml, 
    return_type_simple_move_ml, type_move_to_name_piese_ml, type_move_to_name_piese_f_ml, return_promo_piece_from_type_move_ml, 
    set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml,
    LENGTH_LIST_ML, IND_PIESE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    IND_PROMO_QUEEN_ML, IND_PROMO_ROOK_ML, IND_PROMO_BISHOP_ML, IND_PROMO_KNIGHT_ML,
    MOVE_NO_ML, CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML, CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML, CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML, CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML, CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML, CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML, CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML, CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML, MOVE_PAWN_PROMO_QUEEN_ML, MOVE_PAWN_PROMO_ROOK_ML, MOVE_PAWN_PROMO_BISHOP_ML,
    MOVE_PAWN_PROMO_KNIGHT_ML, CAPTURES_PAWN_QUEEN_ML, CAPTURES_PAWN_ROOK_ML, CAPTURES_PAWN_BISHOP_ML, CAPTURES_PAWN_KNIGHT_ML,
    CAPTURES_KNIGHT_QUEEN_ML, CAPTURES_KNIGHT_ROOK_ML, CAPTURES_BISHOP_QUEEN_ML, CAPTURES_BISHOP_ROOK_ML, CAPTURES_ROOK_QUEEN_ML,
    CAPTURES_KNIGHT_BISHOP_ML, CAPTURES_KNIGHT_KNIGHT_ML, CAPTURES_BISHOP_BISHOP_ML, CAPTURES_BISHOP_KNIGHT_ML, CAPTURES_ROOK_ROOK_ML,
    CAPTURES_QUEEN_QUEEN_ML, CAPTURES_ROOK_BISHOP_ML, CAPTURES_ROOK_KNIGHT_ML, CAPTURES_QUEEN_ROOK_ML, CAPTURES_QUEEN_BISHOP_ML,
    CAPTURES_QUEEN_KNIGHT_ML, CAPTURES_KING_QUEEN_ML, CAPTURES_KING_ROOK_ML, CAPTURES_KING_BISHOP_ML, CAPTURES_KING_KNIGHT_ML,
    CAPTURES_PAWN_PAWN_ML, EP_CAPTURES_ML, CAPTURES_KNIGHT_PAWN_ML, CAPTURES_BISHOP_PAWN_ML, CAPTURES_ROOK_PAWN_ML,
    CAPTURES_QUEEN_PAWN_ML, CAPTURES_KING_PAWN_ML, MOVE_QUEEN_ML, MOVE_ROOK_ML, MOVE_BISHOP_ML, MOVE_KNIGHT_ML, MOVE_KING_ML, MOVE_PAWN_ML,
    MOVE_DOUBLE_PAWN_ML, MOVE_KING_CASTLE_ML, MOVE_KING_QUEEN_CASTLE_ML, TYPE_MOVE_NAME_ML
} from "../move_generator_0x88/move_list_0x88.js";

import {
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piese_0x88_cb, test_print_piese_color_0x88_cb, test_print_piese_in_line_0x88_cb, 
    test_compare_chess_board_0x88_cb,save_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb, 
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    IND_MAX_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB, 
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB, 
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB,  SQUARE_128_to_64_CB
} from "../move_generator_0x88/chess_board_0x88.js";

import {
  clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV, IND_DEPTH_PV
} from "../move_generator_0x88/pv_line_0x88.js";

import {     
  generated_pseudo_legal_captures_mgc, generated_pseudo_legal_moves_one_piece_for_gui_mgc, check_detected_mgc
 } from "../move_generator_0x88/move_generator_captures_0x88.js";
import {     
  generated_pseudo_legal_quiet_moves_mgq, generated_pseudo_legal_moves_one_piece_for_gui_qm_mgq,
  A1_MGQ, B1_MGQ, C1_MGQ , D1_MGQ, E1_MGQ, F1_MGQ, G1_MGQ, H1_MGQ, 
  A8_MGQ, B8_MGQ, C8_MGQ, D8_MGQ, E8_MGQ, F8_MGQ, G8_MGQ, H8_MGQ 
} from "../move_generator_0x88/move_generator_quiet_0x88.js";

import { do_moves_mm } from "../move_generator_0x88/make_move_0x88.js";
import { undo_moves_um } from "../move_generator_0x88/unmake_move_0x88.js";

import { UNDO_MAX } from "../move_generator_0x88/undo_0x88.js";

import {
  searching_minmax, chess_board_0x88_end_original, node_mm
} from "./search_minmax_0x88.js";

import {
  searching_alpha_beta_id_ab, set_stop_search_in_1_ab, set_stop_search_in_0_ab, set_node_in_0_ab,
  node_ab, is_history_heuristic_use_ab,
  BEST_SCORE_MOD_AB,
  save_alpha_up_test_tt, save_alpha_cut_test_tt, save_beta_up_test_tt, save_beta_cut_test_tt,
  use_alpha_up_test_tt, use_alpha_cut_test_tt, use_beta_up_test_tt, use_beta_cut_test_tt,
  clear_test_tt
} from "./search_ab_0x88.js";

import {
  sorting_list_top_max_score_lr, sorting_list_top_min_score_lr, add_score_lr, clear_list_lr,
  LENGTH_LIST_LR, IND_NUMBER_MOVE_LR
} from "../move_generator_0x88/move_list_root_0x88.js";

import {
  ini_Array_hh, clear_history_hh, ini_test_history_hh, history_good_save_hh, history_bad_save_hh, get_history_hh,
  MAX_COLOR_HH, MAX_COORDINATE_HH, MAX_HISTORY_HH
} from "../for_sorting_move/history_heuristic_0x88.js";

import {
  ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
  key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
  key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep2_0x88_tk, key_update_QqKk_0x88_tk,
  test_generation_key_64_tk
} from "../for_sorting_move/transposition_key_0x88.js";

import {
  clear_out_tt, ini_tt, clear_hash_tt, test_uses_hash_tt, set_position_in_tt, get_position_from_tt, print_test_set_get_position_tt,
  MAX_TABLE_LENTH_TT, MAX_SCORE_UPDATE_TT, ALPHA_UPDATE_TT, BETA_UPDATE_TT, ALPHA_CUT_TT, BETA_CUT_TT,
  IND_TN_TT, IND_SC_TT, IND_DD_TT
} from "../for_sorting_move/transposition_table_0x88.js";

import { Timer_C } from "../../browser/timer.js";

import { ChessEngine_0x88_С } from "../i_chess_engine_0x88.js";

/**
* НАЗНАЧЕНИЕ
* Есть два режима поиска: 
* searching_iterative_deepening(fen_start, depth_max) - основной поиск
* start_search_minmax(fen_start, depth_max) - тестирование перебора
*
* Поиск начинается с присланой в виде fen позиции fen_start
* и максимальной глубины перебора depth_max
* Из fen мы заполняем chess_board_0x88_O_start.
*
* Во время поиска идет циклическое погружение и на каждой просчитанной глубине
* возвращается заполненный объект uci_return_search
* Конечно есть финальная позиция fen_end
* Так что поиск начинается со стартового fen и заканчивается
* финальным.
* Конечно же выводим строку с информацией info : "info depth 1 score cp 17 nodes 20 nps 20000 pv e2e4 "
* тут и глубина перебора  и оценка и колличество узлов и скорость перебора и лучший вариант 
*
* Выводим так же лучший ход best_move
*
* Думаю этот интерфейс останется надолго. Добавление эвристик и даже замена генератора
* на него влиять не должны.
*/

/**
    * 
    * @typedef {Object} uci_return_search
    * @property {string} fen_start - начальная позиция в виде fen передаваемая на вход движка
    * @property {string} fen_end - конечная позиция в виде fen возникшая после хода движка
    * @property {string} info - info depth 1 score cp 17 nodes 20 nps 20000 pv e2e4 
    * @property {string} best_move - bestmove e2e4 ponder e7e6
    */

const ALPHA_SCORE_R = -30000;
const BETA_SCORE_R = 30000;


const timer_O = new Timer_C();

const uci_return_search = {
  fen_start: "-",// начальная позиция в виде fen передаваемая на вход движка
  fen_end: "-",// конечная позиция в виде fen возникшая после хода движка
  info: "-",// info depth 1 seldepth 2 multipv 1 score cp 17 nodes 20 nps 20000 hashfull 0 tbhits 0 time 1 pv e2e4        
  best_move: "-",// bestmove e2e4 ponder e7e6
};

let stop_search_root = 0;// флаг эсктренного выхода в корне

const set_stop_search_in_1_r = function () {
  set_stop_search_in_1_ab();
  stop_search_root = 1;
}

const set_stop_search_in_0_r = function () {
  set_stop_search_in_0_ab();
  stop_search_root = 0;
}

const test_tt = function () {
  console.log("-------------------------------------- ");
  console.log("save_alpha_cut_test_tt " + save_alpha_cut_test_tt);
  console.log("use_alpha_cut_test_tt " + use_alpha_cut_test_tt);
  console.log("----- ");
  console.log("save_alpha_up_test_tt " + save_alpha_up_test_tt);
  console.log("use_alpha_up_test_tt " + use_alpha_up_test_tt);
  console.log("----- ");
  console.log("save_beta_cut_test_tt " + save_beta_cut_test_tt);
  console.log("use_beta_cut_test_tt " + use_beta_cut_test_tt);
  console.log("----- ");
  console.log("save_beta_up_test_tt " + save_beta_up_test_tt);
  console.log("use_beta_up_test_tt " + use_beta_up_test_tt);
  console.log("-------------------------------------- ");

}

/** minmax
 * @param {string} fen_start
 * @param {number} depth_max
 * @returns {uci_return_search}
 */
const start_search_minmax_r = function (fen_start, depth_max) {
  let depth = 0;

  let chess_board_0x88 = new Int32Array(IND_MAX_CB).fill(0);// текущая доска с фигурами 0x88 
  let chess_board_0x88_start = new Int32Array(IND_MAX_CB).fill(0);// записываем стартовую доску
  let chess_board_0x88_get_move = new Int32Array(IND_MAX_CB).fill(0);// записываем доску с ходом

  let chess_board_0x88_save_test = new Int32Array(IND_MAX_CB).fill(0);// доска 0x88 с фигурами

  const chess_board_key_64 = new BigUint64Array(1);

  let packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);

  let time_start = 0;// запускаем таймер
  let time_end = 0;// останавливаем таймер
  let time_delta = 0;// промежуток времени между запуском и остановкой таймера

  ini_random_key_array_64_tk();// инициируем внтуренний массив случайных чисел.

  time_start = timer_O.getCurrentTimeMs();

  console.log("start_search_minmax->fen_start " + fen_start);

  set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_start);

  save_chess_board_0x88_cb(chess_board_0x88, chess_board_0x88_start);
  save_chess_board_0x88_cb(chess_board_0x88_save_test, chess_board_0x88);
  save_chess_board_0x88_cb(chess_board_0x88_get_move, chess_board_0x88);

  console.log("start_search_minmax ");
  console.log("=========================================================================");
  //
  let node = 0;

  let best_score = searching_minmax(packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max);

  node = node + node_mm;

  test_compare_chess_board_0x88_cb(chess_board_0x88_save_test, chess_board_0x88);

  save_chess_board_0x88_cb(chess_board_0x88_get_move, chess_board_0x88_end_original);

  //test
  test_print_piese_0x88_cb(chess_board_0x88_get_move);

  time_end = timer_O.getCurrentTimeMs();
  time_delta = (time_end - time_start) / 1000;

  let w = (chess_board_0x88_start[SIDE_TO_MOVE_CB] == WHITE_CB) ? 1 : -1;

  uci_return_search.fen_start = fen_start;
  uci_return_search.fen_end = set_fen_from_0x88_cb(chess_board_0x88_get_move);
  //uci_return_search.fen_end = fen_start;

  let depth_uci = String(depth_max);
  let score_cp = String(w * best_score);
  let nodes = String(node);
  let nps = String(Math.round(node / time_delta));
  let pv = pv_line_to_uci_string_pv(packing_pv_line, best_score);

  //info depth 3 seldepth 4 multipv 1 score cp 42 nodes 72 nps 36000 hashfull 0 tbhits 0 time 2 pv e2e4
  //info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4        
  uci_return_search.info = "info depth " + depth_uci + " score cp " + score_cp +
    " nodes " + nodes + " nps " + nps + " pv " + pv;

  uci_return_search.best_move = "bestmove no";


  //console.log("Search_0x88_C->start_print_pv_line ***************************************");
  //this.info_return_search.pv_line.test_print_pv_line(chess_board_0x88_O);
  //pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);

  console.log("start_search_minmax node " + node);

  return uci_return_search;
}

//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {ChessEngine_0x88_С} chessEngine_0x88_O
 * @param {string} fen_start
 * @param {number} depth_max
 * @returns {uci_return_search}
 */
const searching_iterative_deepening_r = function (chessEngine_0x88_O, fen_start, depth_max) {

  let chess_board_0x88 = new Int32Array(IND_MAX_CB).fill(0);// текущая доска с фигурами 0x88 
  let chess_board_0x88_start = new Int32Array(IND_MAX_CB).fill(0);// записываем стартовую доску
  let chess_board_0x88_get_move = new Int32Array(IND_MAX_CB).fill(0);// записываем доску с ходом

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const chess_board_key_64 = new BigUint64Array(1);
  const chess_board_key_64_undo = new BigUint64Array(1);
  const chess_board_key_64_save_test = new BigUint64Array(1);
  const chess_board_key_64_test = new BigUint64Array(1);


  chess_board_key_64[0] = 0n;

  ini_random_key_array_64_tk();// инициируем внтуренний массив случайных чисел.
  ini_tt();
  clear_test_tt();

  let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);// список ходов. ход упакован в одно число Uint32

  let list_score_move = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);// список оценок ходов. нужно для сортировки по оценке в корне

  let undo = new Int32Array(UNDO_MAX).fill(0);// для отмены хода

  let packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);// линия лучших ходов
  let best_packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);// линия лучших ходов для конкретного узла

  let alpha;
  let beta;
  let score;// текущая оценка позиции
  let depth = 0;
  let best_score;// лучшая оценка позиции
  let best_move_i = -1;// номер лучшего хода в списке ходов
  let isPV_node = 1;// является ли узел основным вариантом

  let is_moove_legal = -1;// является ли ход легальным

  let time_start = 0;// запускаем таймер
  let time_end = 0;// останавливаем таймер
  let time_delta = 0;// промежуток времени между запуском и остановкой таймера

  let type_move;// тип хода
  let from;// откуда ход
  let to;// куда ход
  let name_capture_piece;// имя взятой фигуры
  let piece_color;// цвет хода
  let w;// цвет хода

  if (is_history_heuristic_use_ab == 1) {
    ini_Array_hh();
  }

  set_stop_search_in_0_ab();// сбрасываем флаг экстренного выхода в поиске
  stop_search_root = 0;// флаг эсктренного выхода в корне

  console.log("searching_iterative_deepening->========================================================== ");
  //console.log("searching_iterative_deepening->fen_start " + fen_start);
  set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_start);// доска из фен

  save_chess_board_0x88_cb(chess_board_0x88, chess_board_0x88_start);
  // копируем доску чтобы когда у движка не будет ходов не получить пустую доску.
  save_chess_board_0x88_cb(chess_board_0x88_get_move, chess_board_0x88);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // по позиции генерируем ключ
  set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);

  let node_root = 0;// количество финальных позиций

  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);


  //test_print_list(packing_moves);
  //test_print_piese_0x88(chess_board_0x88);


  sorting_list_ml(packing_moves);// сортировка списка ходов по типу хода

  //console.log("searching_iterative_deepening -> after sorting_list");
  //test_print_list(packing_moves);
  //console.log("searching_iterative_deepening start searching начало поиска");

  // увеличение по максимальной глубине
  for (let depth_max_current = 1; depth_max_current <= depth_max; depth_max_current++) {

    let number_move_legal = 0;

    time_start = timer_O.getCurrentTimeMs();

    if (packing_moves[IND_PIESE_COLOR_ML] == 1) {
      best_score = -BEST_SCORE_MOD_AB;// максимальная оценка позиции
    } else {
      best_score = BEST_SCORE_MOD_AB;// максимальная оценка позиции
    }

    alpha = ALPHA_SCORE_R;
    beta = BETA_SCORE_R;

    clear_pv_line_pv(packing_pv_line);

    number_move_legal = 0;

    // идем по списку ходов

    //console.log("searching_iterative_deepening -> packing_moves[IND_NUMBER_MOVE] " + packing_moves[IND_NUMBER_MOVE]);
    node_root = 0;

    for (let move_i = 0; move_i < packing_moves[IND_NUMBER_MOVE_ML]; move_i++) {

      type_move = get_type_move_ml(move_i, packing_moves);
      from = get_from_ml(move_i, packing_moves);
      to = get_to_ml(move_i, packing_moves);
      name_capture_piece = get_name_capture_piece_ml(move_i, packing_moves);
      piece_color = packing_moves[IND_PIESE_COLOR_ML];

      is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, piece_color);

      if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
        undo_moves_um(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move,
          from, to, name_capture_piece, piece_color);
        continue;
      } else if (is_moove_legal == 2) {// нелегальные рокировки и взятия короля не генерируются. просто пропускаем ход
        continue;
      }
      number_move_legal = number_move_legal + 1;

      //gggggggggggggggggggggggggggggggggg
      //this.chessEngine_0x88_O?.info_currmove_uci(move_list_0x88_O.move_to_string_uci(move_i, chess_board_0x88_O), move_i, String(depth_max_current));

      add_move_to_pv_line_pv(move_i, packing_moves, packing_pv_line, depth);
      packing_pv_line[IND_TYPE_VARIANT_PV] = 1;

      // console.log("searching_iterative_deepening ->  move_i " + move_i + " depth_max_current " + depth_max_current + " ==========");
      set_node_in_0_ab();

      isPV_node = 1;

      // сохраняем ключ доски для последующего сравнения
      chess_board_key_64_save_test[0] = chess_board_key_64[0];

      score = searching_alpha_beta_id_ab(alpha, beta, chess_board_0x88, chess_board_key_64, packing_pv_line,
        (depth + 1), depth_max_current, isPV_node);

  //test
  //console.log("searching_iterative_deepening -> score " + score);
  //test_print_piese_0x88(chess_board_0x88);

      // сравниваем ключи сохраненный и измененный
      test_chess_board_key_64_tk(chess_board_key_64_save_test, chess_board_key_64);

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // генерируем ключ по позиции и сравниваем его с вышедшим из поиска
      set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_test);
      test_generation_key_64_tk(chess_board_key_64_test, chess_board_key_64, packing_moves, move_i, "root");

      node_root = node_root + node_ab;
      //console.log("--searching_iterative_deepening ->  move_i " + move_i + " score " + score);

      add_score_lr(move_i, list_score_move, score);

      //console.log("Search_0x88_C-> должны смотреть за черных, а вот реально что " + move_list_0x88_O.piece_color);
      // белые ищут максимум
      if (packing_moves[IND_PIESE_COLOR_ML] == WHITE_CB) {

        if (score > best_score) {

          best_score = score;
          best_move_i = move_i;

          save_pv_line_pv(best_packing_pv_line, packing_pv_line);
          save_chess_board_0x88_cb(chess_board_0x88_get_move, chess_board_0x88);


          if (score > alpha) {
            alpha = score; // alpha acts like max in MiniMax
          }
        }//if (score > best_score) {

      } else {

        // черные ищут минимум
        if (score < best_score) {

          best_score = score;
          best_move_i = move_i;

          save_pv_line_pv(best_packing_pv_line, packing_pv_line);
          save_chess_board_0x88_cb(chess_board_0x88_get_move, chess_board_0x88);

          if (score < beta) {
            beta = score; // beta acts like max in MiniMax
          }
        }//if (score > best_score) {
      }

      // восстановили доску
      undo_moves_um(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move,
        from, to, name_capture_piece, piece_color);

    }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

    if (best_move_i != -1) save_pv_line_pv(packing_pv_line, best_packing_pv_line);

    time_end = timer_O.getCurrentTimeMs();
    time_delta = (time_end - time_start) / 1000;

    uci_return_search.fen_start = fen_start;
    uci_return_search.fen_end = set_fen_from_0x88_cb(chess_board_0x88_get_move);


    if (number_move_legal != 0) {

      if (chess_board_0x88_start[SIDE_TO_MOVE_CB] == WHITE_CB) {
        sorting_list_top_max_score_lr(list_score_move);
      } else {
        sorting_list_top_min_score_lr(list_score_move);
      }

      w = (chess_board_0x88_start[SIDE_TO_MOVE_CB] == WHITE_CB) ? 1 : -1;

      let depth_uci = String(depth_max);
      let score_cp = String(w * best_score);
      let nodes = String(node_root);
      let nps = String(Math.round(node_root / time_delta)); packing_pv_line

      //console.log("packing_pv_line[IND_DEPTH_PV] = " + packing_pv_line[IND_DEPTH_PV]);

      let pv = pv_line_to_uci_string_pv(packing_pv_line, best_score);

      //info depth 3 seldepth 4 multipv 1 score cp 42 nodes 72 nps 36000 hashfull 0 tbhits 0 time 2 pv e2e4
      //info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4        
      uci_return_search.info = "info depth " + depth_uci + " score cp " + score_cp +
        " nodes " + nodes + " nps " + nps + " pv " + pv;

      uci_return_search.best_move = "bestmove no";
      uci_return_search.best_move = "bestmove " + move_to_string_uci_ml(best_move_i, best_packing_pv_line);

      // nnnnnnnnnnnnnnnnnnnnnn
      chessEngine_0x88_O?.message_search_root_to_engine(uci_return_search);

    }
    else { // if (number_move_legal != 0) {
      let depth_uci = String(depth_max);
      let score_cp = String(0);
      let nodes = String(0);
      let nps = String(0);

      //info depth 3 seldepth 4 multipv 1 score cp 42 nodes 72 nps 36000 hashfull 0 tbhits 0 time 2 pv e2e4
      //info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4        
      uci_return_search.info = "info depth " + depth_uci + " score cp " + score_cp +
        " nodes " + nodes + " nps " + nps + " pv no";

      uci_return_search.best_move = "bestmove no";

      chessEngine_0x88_O?.message_search_root_to_engine(uci_return_search);

      chessEngine_0x88_O?.info_from_depth_uci(uci_return_search);
    }

    //print_test_set_get_position_tt();
    //test_uses_hash_tt();

    // экстренный выход 
    if (stop_search_root == 1) return uci_return_search;

  }// for (let depth_max_current = 1; depth_max_current < depth_max_search; depth_max_current++) {

  print_test_set_get_position_tt();
  test_uses_hash_tt();

  test_tt();

  return uci_return_search;
}

/////////////////////////////////////////////////////////

/** moves e2e4 e7e5 g1f3 b8c6 f1b5
 * @param {string} fen_start
 * @param {string} move_str
 * @returns {string}
 */
const move_str_to_board_r = function (fen_start, move_str) {

  // эта доска используется что бы перевести уки команду в позицию 
  // потом провести ходы, если есть, а потом опять перевести в фен. 
  // т.е. к счету внутри движка эта доска отношения не имеет.
  let chess_board_0x88_uci = new Int32Array(IND_MAX_CB).fill(0);// текущая доска с фигурами 0x88 
  let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);// список ходов. ход упакован в одно число Uint32
  let undo = new Int32Array(UNDO_MAX).fill(0);// для отмены хода

  const chess_board_key_64 = new BigUint64Array(1);
  const chess_board_key_64_undo = new BigUint64Array(1);

  chess_board_key_64[0] = 0n;

  let type_move;
  let name_capture_piece;
  let piece_color;

  let from;
  let to;
  let promo;

  let x07;
  let y07;

  let i_move;
  let is_moove_legal;

  let pos_start = 6;

  ini_random_key_array_64_tk();// инициируем внтуренний массив случайных чисел.

  set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_uci);// доска из фен;

  //console.log("Search_0x88_C-> " + move_str);

  for (let pos = pos_start; pos < move_str.length; pos++) {

    //console.log("Search_0x88_C-> " + move_str[pos] + move_str[pos + 1] +
    //  move_str[pos + 2] + move_str[pos + 3] + move_str[pos + 4]);

    generated_pseudo_legal_captures_mgc(chess_board_0x88_uci, packing_moves);
    generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88_uci, packing_moves);


    //console.log("1 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]);      
    x07 = letter_to_x_coordinate_cb(move_str[pos]);
    pos = pos + 1;

    //console.log("1 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]);       
    y07 = 8 - Number(move_str[pos]);
    pos = pos + 1;
    from = x07_y07_to_0x88_cb(x07, y07);
    //console.log("1 Search_0x88_C-> from " + from);

    //console.log("2 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]);      
    x07 = letter_to_x_coordinate_cb(move_str[pos]);
    pos = pos + 1;
    //console.log("2 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]);      
    y07 = 8 - Number(move_str[pos]);

    to = x07_y07_to_0x88_cb(x07, y07);

    //console.log("2 Search_0x88_C-> to " + to);      

    pos = pos + 1;

    promo = "";
    //console.log("3 Search_0x88_C-> move_str[" + pos + "] " + move_str[pos]); 
    if (move_str[pos] != " ") {
      promo = move_str[pos];
      pos = pos + 1;
    }

    i_move = return_i_move_ml(packing_moves, from, to, promo);

    //console.log("Search_0x88_C-> from " + from + " to " + to + " promo " + promo + " i_move " + i_move);

    type_move = get_type_move_ml(i_move, packing_moves);
    from = get_from_ml(i_move, packing_moves);
    to = get_to_ml(i_move, packing_moves);
    name_capture_piece = get_name_capture_piece_ml(i_move, packing_moves);
    piece_color = packing_moves[IND_PIESE_COLOR_ML];

    is_moove_legal = do_moves_mm(chess_board_0x88_uci, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, piece_color);

    if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
      //console.log("Search_0x88_C->ошибка хода");
      return "-1";
    } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
      //console.log("Search_0x88_C->ошибка рокировки");
      return "-1";
    }
  }//for (let pos = pos_start; pos < move_str.length; pos++) {

  //chess_board_0x88_O_uci.test_print_0x88();
  //chess_board_0x88_O_uci.test_print_0x88_color();    
  //chess_board_0x88_O_uci.test_print_any_0x88();
  let fen = set_fen_from_0x88_cb(chess_board_0x88_uci);
  //console.log("Search_0x88_C-> fen " + fen);
  return fen;

}//move_str_to_board(chess_board_0x88_O_uci, move_str) {


export {
  start_search_minmax_r, searching_iterative_deepening_r, set_stop_search_in_1_r, set_stop_search_in_0_r, test_tt,
  move_str_to_board_r
};