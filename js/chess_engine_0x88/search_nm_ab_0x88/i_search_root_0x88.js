// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_search_root_0x88.js
 * @version created 24.01m.2026 
*/


import {
  get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml,
  sorting_list_ml,
  return_i_move_ml, move_to_string_uci_ml, move_to_string_f_ml,
  LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_MOVE_ML,
  MOVE_NO_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
  x07_y07_to_0x88_cb,
  test_print_piece_0x88_cb,
  test_compare_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb, test_print_piece_0x88_f_cb,
  letter_to_x_coordinate_cb,
  BOARD_SIZE_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV
} from "../core_0x88_t/pv_line_0x88/pv_line_0x88.js";

import {
  generated_pseudo_legal_captures_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";

import { nm_searching_negamax, nm_ini_stack } from "../search_negamax_0x88/search_negamax_0x88.js";

import {
  ab_searching_negamax_alpha_beta_id, ab_ini_stack, ab_clear_test_tt,
  AB_INIT_EVAL, AB_IS_TEST_BOARD_SCORE,
  ab_save_alpha_up_test_tt, ab_save_beta_cut_test_tt, //save_score_up_test_tt,
  ab_use_alpha_up_test_tt, ab_use_beta_cut_test_tt, //use_score_test_tt,
  ab_use_alpha_up_not_move_test_tt
} from "./search_nm_ab_0x88.js";

import {
  sorting_list_top_max_score_lr, add_score_lr
} from "./move_list_root_0x88.js";

import {
  ini_Array_hh
} from "../heuristic_0x88/history_heuristic_0x88/history_heuristic_0x88.js";

import {
  ini_random_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
  test_generation_key_64_tk
} from "../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

import {
  ini_tt, test_uses_hash_tt, print_test_set_get_position_tt, TT_IS_TEST_FEN
} from "../heuristic_0x88/transposition_table_0x88/transposition_table_0x88.js";

import { Timer_C } from "../../browser/timer.js";

import { ChessEngine_0x88_С } from "../i_chess_engine_0x88.js";

import { qs_ini_stack } from "../quiescence_search_0x88/quiescence_search_0x88.js";

import { score_position_e, PAWN_SCORE_E } from "../evaluate_0x88/evaluate_0x88.js";

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
* @typedef {Object} return_search_result
* @property {string} fen_start - начальная позиция в виде fen передаваемая на вход движка
* @property {string} fen_end - конечная позиция в виде fen возникшая после хода движка
* @property {string} uci_info - info depth 1 score cp 17 nodes 20 nps 20000 pv e2e4 
* @property {string} uci_best_move - bestmove e2e4 ponder e7e6
* @property {string} best_move_f - ♙e2e4
* @property {string} pv_f - ♙e2e4 ♙e2e4
*/

/** @type {return_search_result} */
const return_search_result = {
  fen_start: "-",// начальная позиция в виде fen передаваемая на вход движка
  fen_end: "-",// конечная позиция в виде fen возникшая после хода движка
  uci_info: "-",// info depth 1 seldepth 2 multipv 1 score cp 17 nodes 20 nps 20000 hashfull 0 tbhits 0 time 1 pv e2e4        
  uci_best_move: "-",// bestmove e2e4 ponder e7e6
  best_move_f: "-",// ♙e2e4
  pv_f: "-"// ♙e2e4 ♙e2e4
};

const ALPHA_SCORE_R = -50000;
const BETA_SCORE_R = 50000;

const timer_O = new Timer_C();

let stop_search_root = 0;// флаг эсктренного выхода в корне

const set_stop_search_in_1_r = function () {
  // N
  //set_stop_search_in_1_ab();
  stop_search_root = 1;
}

const set_stop_search_in_0_r = function () {
  // N
  //set_stop_search_in_0_ab();
  stop_search_root = 0;
}

const test_tt = function () {
  if (TT_IS_TEST_FEN) {
    console.log("-------------------------------------- ");
    console.log("ab_save_alpha_up_test_tt " + ab_save_alpha_up_test_tt);
    console.log("ab_use_alpha_up_test_tt " + ab_use_alpha_up_test_tt);
    console.log("----- ");
    console.log("ab_save_beta_cut_test_tt " + ab_save_beta_cut_test_tt);
    console.log("ab_use_beta_cut_test_tt " + ab_use_beta_cut_test_tt);
    console.log("----- ");
    console.log("ab_use_alpha_up_not_move_test_tt " + ab_use_alpha_up_not_move_test_tt);
    console.log("-------------------------------------- ");
  }
}

/** negamax
 * @param {string} fen_start
 * @param {number} depth_max
 * @returns {return_search_result}
 */
const start_search_negamax_r = function (fen_start, depth_max) {
  let depth = 0;

  let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(0);// текущая доска с фигурами 0x88

  // TEST
  let chess_board_0x88_score = new Int32Array(BOARD_SIZE_CB).fill(0);// позиция соответствующая оценке с фигурами 0x88 

  let chess_board_0x88_start = new Int32Array(BOARD_SIZE_CB).fill(0);// записываем стартовую доску

  const chess_board_key_64 = new BigUint64Array(1);// зобрист ключ позиции

  let packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);

  // это позиция соответствующая найденному лучшему ходу.
  let chess_board_0x88_found_best_score = new Int32Array(BOARD_SIZE_CB).fill(0);// доска 0x88 с фигурами;

  let time_start = 0;// запускаем таймер
  let time_end = 0;// останавливаем таймер
  let time_delta = 0;// промежуток времени между запуском и остановкой таймера

  nm_ini_stack();// инициируем стек

  ini_random_key_array_64_tk();// инициируем внутренний массив случайных чисел.

  time_start = timer_O.getCurrentTimeMs();

  console.log("start_search_negamax_r -> start_search_negamax_r->fen_start " + fen_start);

  set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_start);

  chess_board_0x88.set(chess_board_0x88_start);

  chess_board_key_64[0] = 0n;
  // по позиции генерируем ключ
  set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);

  console.log("start_search_negamax_r -> start_search_negamax ");
  console.log("start_search_negamax_r -> =========================================================================");


  let node_mm = new Int32Array(1).fill(0);

  let best_score = nm_searching_negamax(chess_board_0x88, chess_board_0x88_score, chess_board_key_64, packing_pv_line,
    depth, depth_max, node_mm, chess_board_0x88_found_best_score);



  //test
  console.log("start_search_negamax_r -> chess_board_0x88_found_best_score");
  test_print_piece_0x88_f_cb(chess_board_0x88_found_best_score);

  // TEST
  console.log("start_search_negamax_r -> chess_board_0x88_score");
  test_print_piece_0x88_f_cb(chess_board_0x88_score);
  console.log("start_search_negamax_r -> chess_board_0x88_score => score = " + score_position_e(chess_board_0x88_score));

  //console.log("start_search_negamax_r -> packing_pv_line");
  //test_print_pv_line_pv(packing_pv_line);


  time_end = timer_O.getCurrentTimeMs();
  time_delta = (time_end - time_start) / 1000;

  return_search_result.fen_start = fen_start;
  return_search_result.fen_end = set_fen_from_0x88_cb(chess_board_0x88_found_best_score);
  //uci_return_search.fen_end = fen_start;

  let depth_uci = String(depth_max);
  let score_cp = String(best_score);
  let nodes = String(node_mm[0]);
  let nps = String(Math.round(node_mm[0] / time_delta));
  let pv = pv_line_to_uci_string_pv(packing_pv_line, best_score);

  //info depth 3 seldepth 4 multipv 1 score cp 42 nodes 72 nps 36000 hashfull 0 tbhits 0 time 2 pv e2e4
  //info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4        
  return_search_result.uci_info = "info depth " + depth_uci + " score cp " + score_cp +
    " nodes " + nodes + " nps " + nps + " pv " + pv;

  return_search_result.uci_best_move = "bestmove no";


  //console.log("Search_0x88_C->start_print_pv_line ***************************************");
  //this.info_return_search.pv_line.test_print_pv_line(chess_board_0x88_O);
  //pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);

  console.log("start_search_negamax_r -> start_search_negamax node " + node_mm[0]);

  return return_search_result;
}

//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {ChessEngine_0x88_С} chessEngine_0x88_O это ссылка на вызвающий объект что бы во время поиска передавать информацию
 * @param {string} fen_start
 * @param {number} depth_max
 * @returns {return_search_result}
 */
const searching_iterative_deepening_r = function (chessEngine_0x88_O, fen_start, depth_max) {

  // позиции
  const chess_board_0x88_start_from_fen = new Int32Array(BOARD_SIZE_CB).fill(0);// записываем стартовую доску 
  let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(0);// текущая доска с фигурами 0x88 
  let chess_board_0x88_get_move = new Int32Array(BOARD_SIZE_CB).fill(0);// записываем доску с лучшим ходом

  // TEST доска из глубины с позицией которую статически оцениваем
  let chess_board_0x88_score = new Int32Array(BOARD_SIZE_CB).fill(0);// позиция соответствующая оценке с фигурами 0x88 
  let chess_board_0x88_save_score = new Int32Array(BOARD_SIZE_CB).fill(0);// сохраняем в узле лучшую позицию соответствующую лучшей оценке

  // ключи позиций
  const chess_board_key_64_start = new BigUint64Array(1);
  let chess_board_key_64 = new BigUint64Array(1);

  // список ходов из позиции
  let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);// список ходов. ход упакован в одно число Uint32

  // список оценок каждого хода. соотносятся по номеру хода 
  let list_score_move = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);// список оценок ходов. нужно для сортировки по оценке в корне

  // линия основного варианта
  let packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);// линия лучших ходов
  let best_packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);// линия лучших ходов для конкретного узла


  let alpha;
  let beta;
  let score;// текущая оценка позиции
  let best_score;// лучшая оценка позиции
  let best_move_i = -1;// номер лучшего хода в списке ходов
  let best_move;// лучший ход
  let is_moove_legal = -1;// является ли ход легальным
  let number_move_legal;

  let depth = 0;

  let isPV_node = 1;// является ли узел основным вариантом

  let time_start = 0;// запускаем таймер
  let time_end = 0;// останавливаем таймер
  let time_delta = 0;// промежуток времени между запуском и остановкой таймера

  let type_move;// тип хода
  let from;// откуда ход
  let to;// куда ход
  let name_capture_piece;// имя взятой фигуры
  let piece_color;// цвет хода
  let color_move;// цвет хода

  let node_root = 0;// количество финальных позиций
  let node_ab = new Int32Array(1).fill(0);


  // set_stop_search_in_0_ab();// сбрасываем флаг экстренного выхода в поиске

  stop_search_root = 0;// флаг эсктренного выхода в корне


  ini_random_key_array_64_tk();// инициируем внтуренний массив случайных чисел.
  ini_tt();
  if (TT_IS_TEST_FEN) ab_clear_test_tt();
  ab_ini_stack();// стек альфа беты
  qs_ini_stack();// стек быстрого поиска
  ini_Array_hh();// ини массива истории

  //DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  //  console.log("searching_iterative_deepening -> ========================================================== ");
  //console.log("searching_iterative_deepening->fen_start " + fen_start);

  // доска из фен
  set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_start_from_fen);
  chess_board_0x88.set(chess_board_0x88_start_from_fen);

  // копируем доску чтобы когда у движка не будет ходов не получить пустую доску.
  chess_board_0x88_get_move.set(chess_board_0x88);

  // по позиции генерируем ключ
  set_key_from_board_0x88_tk(chess_board_0x88_start_from_fen, chess_board_key_64_start);
  chess_board_key_64[0] = chess_board_key_64_start[0];

  // генерация списка избыточных ходов
  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

  // генераторы выдают полностью определенный спискок ходов packing_moves
  // это единственная функция в модуле списка ходов выдающая ход в виде уки.
  // move_to_string_uci_ml(i, packing_moves) - печатаем отдельный ход из списка в виде: e2e4 или e7e8q

  // TEST-----------------
  // печатаем в консоль весь список ходов
  //test_print_list_ml(packing_moves);

  // печатаем позицию
  //test_print_piece_0x88_cb(chess_board_0x88);
  // ----------------- TEST

  // сортировка списка ходов по типу хода
  sorting_list_ml(packing_moves);

  // TEST-----------------
  //console.log("searching_iterative_deepening -> after sorting_list");

  // печатаем в консоль весь список ходов
  //test_print_list_ml(packing_moves);
  // ----------------- TEST

  //DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  //  console.log("searching_iterative_deepening start searching начало поиска");

  // увеличение по максимальной глубине
  for (let depth_max_current = 1; depth_max_current <= depth_max; depth_max_current++) {

    time_start = timer_O.getCurrentTimeMs();

    best_score = AB_INIT_EVAL;//  оценка позиции

    alpha = ALPHA_SCORE_R;
    beta = BETA_SCORE_R;

    best_move_i = -1;
    best_move = -1;

    number_move_legal = 0;

    node_root = 0;

    clear_pv_line_pv(packing_pv_line);


    // идем по списку ходов
    for (let move_i = 0; move_i < packing_moves[IND_NUMBER_MOVE_ML]; move_i++) {

      type_move = get_type_move_ml(move_i, packing_moves);
      from = get_from_ml(move_i, packing_moves);
      to = get_to_ml(move_i, packing_moves);
      name_capture_piece = get_name_capture_piece_ml(move_i, packing_moves);
      piece_color = packing_moves[IND_PIECE_COLOR_ML];

      is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, piece_color);

      if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл

        chess_board_0x88.set(chess_board_0x88_start_from_fen);
        chess_board_key_64[0] = chess_board_key_64_start[0];

        continue;
      } else if (is_moove_legal == 2) {// нелегальные рокировки и взятия короля не генерируются. просто пропускаем ход
        continue;
      }
      number_move_legal = number_move_legal + 1;

      // node_js^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      chessEngine_0x88_O?.info_currmove_uci_from_searching_iterative_deepening_r(move_to_string_uci_ml(move_i, packing_moves), move_i, String(depth_max_current));

      // пишем ход в линию варианта что бы следующая глубина видела от какого хода они появились
      add_move_to_pv_line_pv(move_i, packing_moves, packing_pv_line, depth);

      isPV_node = 1;
      node_ab[0] = 0;

      // для поиска необходимы: alpha, beta - окно поиска, chess_board_0x88 - позиция со сделанным ходом, 
      // chess_board_0x88_score - тестовая позиция. это позиция которую на глубине оценили статически,
      // chess_board_key_64 - ключ позиции, packing_pv_line - линия варианта где уже прописаны сделанные ходы, 
      // depth - текущая глубина поиска, depth_max_current- максимальная глубина поиска,
      // node_ab - количество рассмотренных узлов(в корне заходим с 0), 
      // isPV_node - какой узел (1- основной, 0-поиск с нулевым окном)

      score = -ab_searching_negamax_alpha_beta_id(-beta, -alpha, chess_board_0x88, chess_board_0x88_score, chess_board_key_64,
        packing_pv_line, (depth + 1), depth_max_current, node_ab, isPV_node)

      // после поиска мы получаем: 
      // score - оценку позиции, 
      // chess_board_0x88_score - тестовую доску - позиция которую на глубине оценили статически,
      // packing_pv_line - линию варианта, 
      // node_ab - колличество оцененных позиций. 
      // и это все.

      node_root = node_root + node_ab[0];

      // присваиваем ходу оценку
      add_score_lr(move_i, list_score_move, score);


      if (score > best_score) {

        best_score = score;
        best_move_i = move_i;
        best_move = packing_moves[move_i];

        save_pv_line_pv(best_packing_pv_line, packing_pv_line);
        chess_board_0x88_get_move.set(chess_board_0x88);

        // TEST
        if (AB_IS_TEST_BOARD_SCORE) {
          // с глубины вернулась не только оценка, но и позиция соответствующая оценки 
          // ее мы тоже записываем в узловой кеш
          chess_board_0x88_save_score.set(chess_board_0x88_score);//записываем позицию соответствующую лучшей оценке
        }

        if (score > alpha) {
          alpha = score; //
        }
      }//if (score > best_score) {

      // восстановили доску
      chess_board_0x88.set(chess_board_0x88_start_from_fen);
      chess_board_key_64[0] = chess_board_key_64_start[0];

    }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

    if (best_move_i != -1) {
      save_pv_line_pv(packing_pv_line, best_packing_pv_line);

      // TEST
      if (AB_IS_TEST_BOARD_SCORE) {
        // а это та самая финальная позиция которую оценили статически
        chess_board_0x88_score.set(chess_board_0x88_save_score);// возвращаем лучшую записанную позицию соотв. лучшей оценке
      }
    }

    time_end = timer_O.getCurrentTimeMs();
    time_delta = (time_end - time_start) / 1000;

    //DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD   
    if (AB_IS_TEST_BOARD_SCORE) {
      //test
      // console.log("*");
      // console.log("searching_iterative_deepening_r -> depth_max_current = " + depth_max_current);
      // console.log("searching_iterative_deepening_r -> chess_board_0x88_found_best_score");
      // test_print_piece_0x88_f_cb(chess_board_0x88_get_move);
      // console.log("searching_iterative_deepening_r -> node_root = " + node_root);

      // // TEST
      // console.log("ssearching_iterative_deepening_r -> chess_board_0x88_score");
      // test_print_piece_0x88_f_cb(chess_board_0x88_score);
      // console.log("searching_iterative_deepening_r -> chess_board_0x88_score => score = " + score_position_e(chess_board_0x88_score));

    }

    return_search_result.fen_start = fen_start;
    return_search_result.fen_end = set_fen_from_0x88_cb(chess_board_0x88_get_move);// если ходов не было тут стартовая позиция

    if (number_move_legal != 0) {

      // вот она сортировка по оценке
      sorting_list_top_max_score_lr(list_score_move);

      let depth_uci = String(depth_max_current);
      let score_cp = String(best_score);
      let nodes = String(node_root);
      let nps = String(Math.round(node_root / time_delta));
      let pv = pv_line_to_uci_string_pv(packing_pv_line, best_score);

      //info depth 3 seldepth 4 multipv 1 score cp 42 nodes 72 nps 36000 hashfull 0 tbhits 0 time 2 pv e2e4
      //info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4        
      return_search_result.uci_info = "info depth " + depth_uci + " score cp " + score_cp +
        " nodes " + nodes + " nps " + nps + " pv " + pv;

      //bestmove e2e4
      const piece_color_pv = packing_moves[IND_PIECE_COLOR_ML];
      return_search_result.best_move_f = "bestmove " + move_to_string_f_ml(0, packing_pv_line, piece_color_pv);
      return_search_result.uci_best_move = "bestmove " + move_to_string_uci_ml(0, packing_pv_line);//best_move

      // node_js^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      chessEngine_0x88_O?.node_js_return_search_result_on_depth_max_current_to_ChessEngine_0x88_С_from_searching_iterative_deepening_r(return_search_result);

      //
      chessEngine_0x88_O?.return_search_result_on_depth_max_current_to_ChessEngine_0x88_С_from_searching_iterative_deepening_r(return_search_result);



    } else { // if (number_move_legal != 0) {
      let depth_uci = String(depth_max_current);
      let score_cp = String(0);
      let nodes = String(0);
      let nps = String(0);

      //info depth 3 seldepth 4 multipv 1 score cp 42 nodes 72 nps 36000 hashfull 0 tbhits 0 time 2 pv e2e4
      //info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4        
      return_search_result.uci_info = "info depth " + depth_uci + " score cp " + score_cp +
        " nodes " + nodes + " nps " + nps + " pv no";

      return_search_result.best_move_f = "bestmove no";
      return_search_result.uci_best_move = "bestmove no";

      // почему этот используем только когда ходов нет?
      chessEngine_0x88_O?.node_js_return_search_result_on_depth_max_current_to_ChessEngine_0x88_С_from_searching_iterative_deepening_r(return_search_result);

      chessEngine_0x88_O?.return_search_result_on_depth_max_current_to_ChessEngine_0x88_С_from_searching_iterative_deepening_r(return_search_result);
    }

    // экстренный выход 
    if (stop_search_root == 1) return return_search_result;

  }// for (let depth_max_current = 1; depth_max_current < depth_max_search; depth_max_current++) {

  if (TT_IS_TEST_FEN) print_test_set_get_position_tt();// печатаем если есть коллизии фена
  if (TT_IS_TEST_FEN) test_uses_hash_tt();// сколько позиций записано

  if (TT_IS_TEST_FEN) test_tt();// записано использовано по альфа бете

  return return_search_result;
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
  let chess_board_0x88_uci = new Int32Array(BOARD_SIZE_CB).fill(0);// текущая доска с фигурами 0x88 
  let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);// список ходов. ход упакован в одно число Uint32

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
    piece_color = packing_moves[IND_PIECE_COLOR_ML];

    is_moove_legal = do_moves_mm(chess_board_0x88_uci, chess_board_key_64, type_move, from, to, piece_color);

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
  start_search_negamax_r, searching_iterative_deepening_r, set_stop_search_in_1_r, set_stop_search_in_0_r, test_tt,
  move_str_to_board_r,
};