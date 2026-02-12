// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_search_root_0x88.js
 * @version created 24.01m.2026 
*/


import {
  clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
  sorting_list_ml, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
  return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
  type_move_to_name_piese, type_move_to_name_piese_f, return_promo_piece_from_type_move, set_move_after_the_captures_ml,
  sorting_list_history_heuristic_ml,
  LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_CAPTURES_MOVE, IND_NUMBER_MOVE,
  IND_PROMO_QUEEN, IND_PROMO_ROOK, IND_PROMO_BISHOP, IND_PROMO_KNIGHT,
  MOVE_NO, CAPTURES_PAWN_QUEEN_PROMO_QUEEN, CAPTURES_PAWN_ROOK_PROMO_QUEEN, CAPTURES_PAWN_BISHOP_PROMO_QUEEN,
  CAPTURES_PAWN_KNIGHT_PROMO_QUEEN, CAPTURES_PAWN_QUEEN_PROMO_ROOK, CAPTURES_PAWN_ROOK_PROMO_ROOK,
  CAPTURES_PAWN_BISHOP_PROMO_ROOK, CAPTURES_PAWN_KNIGHT_PROMO_ROOK, CAPTURES_PAWN_QUEEN_PROMO_BISHOP,
  CAPTURES_PAWN_ROOK_PROMO_BISHOP, CAPTURES_PAWN_BISHOP_PROMO_BISHOP, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP,
  CAPTURES_PAWN_QUEEN_PROMO_KNIGHT, CAPTURES_PAWN_ROOK_PROMO_KNIGHT, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT,
  CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT, MOVE_PAWN_PROMO_QUEEN, MOVE_PAWN_PROMO_ROOK, MOVE_PAWN_PROMO_BISHOP,
  MOVE_PAWN_PROMO_KNIGHT, CAPTURES_PAWN_QUEEN, CAPTURES_PAWN_ROOK, CAPTURES_PAWN_BISHOP, CAPTURES_PAWN_KNIGHT,
  CAPTURES_KNIGHT_QUEEN, CAPTURES_KNIGHT_ROOK, CAPTURES_BISHOP_QUEEN, CAPTURES_BISHOP_ROOK, CAPTURES_ROOK_QUEEN,
  CAPTURES_KNIGHT_BISHOP, CAPTURES_KNIGHT_KNIGHT, CAPTURES_BISHOP_BISHOP, CAPTURES_BISHOP_KNIGHT, CAPTURES_ROOK_ROOK,
  CAPTURES_QUEEN_QUEEN, CAPTURES_ROOK_BISHOP, CAPTURES_ROOK_KNIGHT, CAPTURES_QUEEN_ROOK, CAPTURES_QUEEN_BISHOP,
  CAPTURES_QUEEN_KNIGHT, CAPTURES_KING_QUEEN, CAPTURES_KING_ROOK, CAPTURES_KING_BISHOP, CAPTURES_KING_KNIGHT,
  CAPTURES_PAWN_PAWN, EP_CAPTURES, CAPTURES_KNIGHT_PAWN, CAPTURES_BISHOP_PAWN, CAPTURES_ROOK_PAWN,
  CAPTURES_QUEEN_PAWN, CAPTURES_KING_PAWN, MOVE_QUEEN, MOVE_ROOK, MOVE_BISHOP, MOVE_KNIGHT, MOVE_KING, MOVE_PAWN,
  MOVE_DOUBLE_PAWN, MOVE_KING_CASTLE, MOVE_KING_QUEEN_CASTLE, TYPE_MOVE_NAME
} from "../move_generator/move_list_new.js";

import {
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88,
  test_compare_chess_board_0x88, save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88,
  searching_king, iniStartPositionForWhite, IND_MAX, SIDE_TO_MOVE, WHITE
} from "../move_generator/chess_board_new.js";

import {
  clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV, IND_DEPTH_PV
} from "../move_generator/pv_line_new.js";

import { generated_pseudo_legal_captures } from "../move_generator/move_generator_captures_new.js";
import { generated_pseudo_legal_quiet_moves } from "../move_generator/move_generator_quiet_new.js";

import { do_moves_mm } from "../move_generator/make_move_new.js";
import { undo_moves_um } from "../move_generator/unmake_move_new.js";

import { UNDO_MAX } from "../move_generator/undo_new.js";

import {
  searching_minmax, chess_board_0x88_end_original, node_mm
} from "./search_minmax_new.js";

import {
  searching_alpha_beta_id_ab, set_stop_search_in_1_ab, set_stop_search_in_0_ab, set_node_in_0_ab,
  node_ab, is_history_heuristic_use_ab,
  BEST_SCORE_MOD_AB,
  save_alpha_up_test_tt, save_alpha_cut_test_tt, save_beta_up_test_tt, save_beta_cut_test_tt,
  use_alpha_up_test_tt, use_alpha_cut_test_tt, use_beta_up_test_tt, use_beta_cut_test_tt,
  clear_test_tt
} from "./search_ab_new.js";

import {
  sorting_list_top_max_score_lr, sorting_list_top_min_score_lr, add_score_lr, clear_list_lr,
  LENGTH_LIST_LR, IND_NUMBER_MOVE_LR
} from "../move_generator/move_list_root_new.js";

import {
  ini_Array_hh, clear_history_hh, ini_test_history_hh, history_good_save_hh, history_bad_save_hh, get_history_hh,
  MAX_COLOR_HH, MAX_COORDINATE_HH, MAX_HISTORY_HH
} from "../for_sorting_move/history_heuristic_new.js";

import {
  ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
  key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
  key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep2_0x88_tk, key_update_QqKk_0x88_tk,
  test_generation_key_64_tk
} from "../for_sorting_move/transposition_key_new.js";

import {
  clear_out_tt, ini_tt, clear_hash_tt, test_uses_hash_tt, set_position_in_tt, get_position_from_tt, print_test_set_get_position_tt,
  MAX_TABLE_LENTH_TT, MAX_SCORE_UPDATE_TT, ALPHA_UPDATE_TT, BETA_UPDATE_TT, ALPHA_CUT_TT, BETA_CUT_TT,
  IND_TN_TT, IND_SC_TT, IND_DD_TT
} from "../for_sorting_move/transposition_table_new.js";

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

  let chess_board_0x88 = new Uint8Array(IND_MAX).fill(0);// текущая доска с фигурами 0x88 
  let chess_board_0x88_start = new Uint8Array(IND_MAX).fill(0);// записываем стартовую доску
  let chess_board_0x88_get_move = new Uint8Array(IND_MAX).fill(0);// записываем доску с ходом

  let chess_board_0x88_save_test = new Uint8Array(IND_MAX).fill(0);// доска 0x88 с фигурами

  let packing_pv_line = new Uint32Array(MAX_DEPTH_PV).fill(MOVE_NO);

  let time_start = 0;// запускаем таймер
  let time_end = 0;// останавливаем таймер
  let time_delta = 0;// промежуток времени между запуском и остановкой таймера

  time_start = timer_O.getCurrentTimeMs();

  console.log("start_search_minmax->fen_start " + fen_start);

  set_board_from_fen_0x88(fen_start, chess_board_0x88_start);

  save_chess_board_0x88(chess_board_0x88, chess_board_0x88_start);
  save_chess_board_0x88(chess_board_0x88_save_test, chess_board_0x88);
  save_chess_board_0x88(chess_board_0x88_get_move, chess_board_0x88);

  console.log("start_search_minmax ");
  console.log("=========================================================================");
  //
  let node = 0;

  let best_score = searching_minmax(packing_pv_line, chess_board_0x88, depth, depth_max);

  node = node + node_mm;

  test_compare_chess_board_0x88(chess_board_0x88_save_test, chess_board_0x88);

  save_chess_board_0x88(chess_board_0x88_get_move, chess_board_0x88_end_original);

  time_end = timer_O.getCurrentTimeMs();
  time_delta = (time_end - time_start) / 1000;

  let w = (chess_board_0x88_start[SIDE_TO_MOVE] == WHITE) ? 1 : -1;

  uci_return_search.fen_start = fen_start;
  uci_return_search.fen_end = set_fen_from_0x88(chess_board_0x88_get_move);
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

  let chess_board_0x88 = new Uint8Array(IND_MAX).fill(0);// текущая доска с фигурами 0x88 
  let chess_board_0x88_start = new Uint8Array(IND_MAX).fill(0);// записываем стартовую доску
  let chess_board_0x88_get_move = new Uint8Array(IND_MAX).fill(0);// записываем доску с ходом

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const chess_board_key_64 = new BigUint64Array(1);
  const chess_board_key_64_undo = new BigUint64Array(1);
  const chess_board_key_64_save_test = new BigUint64Array(1);
  const chess_board_key_64_test = new BigUint64Array(1);


  chess_board_key_64[0] = 0n;

  ini_random_key_array_64_tk();// инициируем внтуренний массив случайных чисел.
  ini_tt();
  clear_test_tt();

  let packing_moves = new Uint32Array(LENGTH_LIST).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32

  let list_score_move = new Int32Array(LENGTH_LIST).fill(MOVE_NO);// список оценок ходов. нужно для сортировки по оценке в корне

  let undo = new Uint8Array(UNDO_MAX).fill(0);// для отмены хода

  let packing_pv_line = new Uint32Array(MAX_DEPTH_PV).fill(MOVE_NO);// линия лучших ходов
  let best_packing_pv_line = new Uint32Array(MAX_DEPTH_PV).fill(MOVE_NO);// линия лучших ходов для конкретного узла

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
  set_board_from_fen_0x88(fen_start, chess_board_0x88_start);// доска из фен

  save_chess_board_0x88(chess_board_0x88, chess_board_0x88_start);
  // копируем доску чтобы когда у движка не будет ходов не получить пустую доску.
  save_chess_board_0x88(chess_board_0x88_get_move, chess_board_0x88);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // по позиции генерируем ключ
  set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);

  let node_root = 0;// количество финальных позиций

  generated_pseudo_legal_captures(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves(chess_board_0x88, packing_moves);

  //test_print_list(packing_moves);

  sorting_list_ml(packing_moves);// сортировка списка ходов по типу хода

  //console.log("searching_iterative_deepening -> after sorting_list");
  //test_print_list(packing_moves);
  //console.log("searching_iterative_deepening start searching начало поиска");

  // увеличение по максимальной глубине
  for (let depth_max_current = 1; depth_max_current <= depth_max; depth_max_current++) {

    let number_move_legal = 0;

    time_start = timer_O.getCurrentTimeMs();

    if (packing_moves[IND_PIESE_COLOR] == 1) {
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

    for (let move_i = 0; move_i < packing_moves[IND_NUMBER_MOVE]; move_i++) {

      type_move = get_type_move(move_i, packing_moves);
      from = get_from(move_i, packing_moves);
      to = get_to(move_i, packing_moves);
      name_capture_piece = get_name_capture_piece(move_i, packing_moves);
      piece_color = packing_moves[IND_PIESE_COLOR];

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
      if (packing_moves[IND_PIESE_COLOR] == WHITE) {

        if (score > best_score) {

          best_score = score;
          best_move_i = move_i;

          save_pv_line_pv(best_packing_pv_line, packing_pv_line);
          save_chess_board_0x88(chess_board_0x88_get_move, chess_board_0x88);


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
          save_chess_board_0x88(chess_board_0x88_get_move, chess_board_0x88);

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
    uci_return_search.fen_end = set_fen_from_0x88(chess_board_0x88_get_move);


    if (number_move_legal != 0) {

      if (chess_board_0x88_start[SIDE_TO_MOVE] == WHITE) {
        sorting_list_top_max_score_lr(list_score_move);
      } else {
        sorting_list_top_min_score_lr(list_score_move);
      }

      w = (chess_board_0x88_start[SIDE_TO_MOVE] == WHITE) ? 1 : -1;

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
      uci_return_search.best_move = "bestmove " + move_to_string_uci(best_move_i, best_packing_pv_line);

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


export { start_search_minmax_r, searching_iterative_deepening_r, set_stop_search_in_1_r, set_stop_search_in_0_r, test_tt };