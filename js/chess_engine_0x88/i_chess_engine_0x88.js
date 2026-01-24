// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_chess_engine_0x88.js
 * @version created 27.09m.2025 
*/

import { Search_root_0x88_C } from "./search_root/i_search_root_0x88.js";
import { start_search_minmax } from "./search_root/i_search_root_new.js";

import { Uci_C } from "../uci/uci.js";
//import { Worker_ChessEngine_0x88_С } from "../worker/worker_chess_engine_0x88.js";

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

  search_root_0x88_O = new Search_root_0x88_C();
  uci_O = new Uci_C();

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

    this.search_root_0x88_O.iniM(this);
    this.uci_O.iniM();
  }

  set_stop_search_in_1() {
    this.search_root_0x88_O.set_stop_search_in_1();
  }

  /**
   * @param {import('./search_root/i_search_root_0x88.js').uci_return_search} uci_return_search
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
   * @param {import('./search_root/i_search_root_0x88.js').uci_return_search} uci_return_search
   * @returns {void}
   */
  message_search_root_to_engine(uci_return_search) {
    let message = uci_return_search.info;
    // @ts-ignore
    this.worker_chessEngine_0x88_O?.message_chessEngine_0x88_to_worker_chessEngine_0x88_O(message);
  }

  // запуск полного перебора minmax
  // тут можно проверить корректность игрового движка с помощью perf_t. как правильно он генерирует позиции.
  /**
   * @param {string} fen_start
   * @param {number} depth_max
   * @returns {uci_return_search}
   */
  go_depth_minmax(fen_start, depth_max) {
    //console.log("ChessEngine_0x88_С->test_go_depth_nm --------");
    //let uci_return_search = this.search_root_0x88_O.start_search_minmax(fen_start, depth_max);
    let uci_return_search = go_depth_minmax(fen_start, depth_max);    

    return uci_return_search;
  }

  // iterative deepening
   /**
   * @param {string} fen_start
   * @param {number} depth_max
   * @returns {uci_return_search}
   */ 
  go_depth_id(fen_start, depth_max) {
    //console.log("ChessEngine_0x88_С->go_depth_id depth_max " + depth_max);
    let uci_return_search = this.search_root_0x88_O.searching_iterative_deepening(fen_start, depth_max);

    return uci_return_search;
  }
}

  // запуск полного перебора minmax
  // тут можно проверить корректность игрового движка с помощью perf_t. как правильно он генерирует позиции.
  /**
   * @param {string} fen_start
   * @param {number} depth_max
   * @returns {uci_return_search}
   */
  const go_depth_minmax = function(fen_start, depth_max) {
    //console.log("ChessEngine_0x88_С->test_go_depth_nm --------");
    let uci_return_search = start_search_minmax(fen_start, depth_max);

    return uci_return_search;
  }


export { ChessEngine_0x88_С, go_depth_minmax };