// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_chess_engine_0x88.js
 * @version created 27.09m.2025 
*/

import {
  start_search_minmax_r, searching_iterative_deepening_r, set_stop_search_in_1_r, set_stop_search_in_0_r, test_tt,
  move_str_to_board_r
} from "./search_root/i_search_root_new.js";

/**
* НАЗНАЧЕНИЕ
что должен уметь делать движок?
принимать фен нотацию позиции
принимать команды на старт обсчета позиции и остановку
выдавать вариант приведший к лучшему ходу с оценкой каждого хода варианта
         выдавать лучший ход
         выдавать оценку лучшего хода
выдавать количество рассмотренных позиций
выдавать фен позиции
*/

/**
 * Класс.
 * @class
 */
class ChessEngine_0x88_С {

  static NAME = "ChessEngine_0x88";

  /* @type {Worker_ChessEngine_0x88_С | null} */
  worker_chessEngine_0x88_O = null;

  //---------

  score = 0;
  i_move = 0;

  constructor() {

  }

  /*
   * @param {Worker_ChessEngine_0x88_С} worker_chessEngine_0x88_O
   * @returns {void}
   */
  // @ts-ignore
  iniM(worker_chessEngine_0x88_O) {

    this.worker_chessEngine_0x88_O = worker_chessEngine_0x88_O;

  }

  /** moves e2e4 e7e5 g1f3 b8c6 f1b5
   * @param {string} fen_start
   * @param {string} move_str
   * @returns {string}
   */
  move_str_to_board(fen_start, move_str) {
    let fen = move_str_to_board_r(fen_start, move_str);
    return fen;
  }

  set_stop_search_in_1() {
    set_stop_search_in_1_r();
  }

  /**
   * @param {import('./search_root/i_search_root_new.js').uci_return_search} uci_return_search
   * @returns {void}
   */
  info_from_depth_uci(uci_return_search) {
    console.log(uci_return_search.info);
  }

  /**
   * @param {number} move
   * @param {number} move_i
   * @param {number} depth_max_current
   * @returns {void}
   */
  info_currmove_uci(move, move_i, depth_max_current) {
    let str = "info currmove " + move + " currmovenumber " + move_i + " depth " + depth_max_current;
    console.log(str);
  }

  // сообщение поиска движку
  /**
   * @param {import('./search_root/i_search_root_new.js').uci_return_search} uci_return_search
   * @returns {void}
   */
  message_search_root_to_engine(uci_return_search) {
    let message = uci_return_search.info;
    // @ts-ignore
    this.worker_chessEngine_0x88_O?.message_chessEngine_0x88_to_worker_chessEngine_0x88_O(message);
  }

  // iterative deepening
  /**
  * @param {string} fen_start
  * @param {number} depth_max
  * @returns {uci_return_search}
  */
  go_depth_id(fen_start, depth_max) {
    console.log("ChessEngine_0x88_С->go_depth_id depth_max " + depth_max);

    //let uci_return_search = this.search_root_0x88_O.searching_iterative_deepening(fen_start, depth_max);
    let uci_return_search = searching_iterative_deepening_r(this, fen_start, depth_max);

    return uci_return_search;
  }

  // запуск полного перебора minmax
  // тут можно проверить корректность игрового движка с помощью perf_t. как правильно он генерирует позиции.
  /**
   * @param {string} fen_start
   * @param {number} depth_max
   * @returns {uci_return_search}
   */
  go_depth_minmax(fen_start, depth_max) {
    console.log("ChessEngine_0x88_С->go_depth_minmax");
    let uci_return_search = start_search_minmax_r(fen_start, depth_max);

    return uci_return_search;
  }

}

export { ChessEngine_0x88_С };