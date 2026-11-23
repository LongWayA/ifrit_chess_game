// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_chess_engine_0x88.js
 * @version created 27.09m.2025 
*/

import {
  start_search_negamax_r, searching_iterative_deepening_r, set_stop_search_in_1_r, set_stop_search_in_0_r, test_tt,
  move_str_to_board_r
} from "./search_nm_ab_0x88/i_search_root_0x88.js";

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
   * вызывается из worker_chessEngine_0x88_O
   *
   * @param {Worker_ChessEngine_0x88_С} worker_chessEngine_0x88_O
   * @returns {void}
   */
  // @ts-ignore
  iniM(worker_chessEngine_0x88_O) {

    // этот класс используется в worker_chess_engine_0x88.js
    // и здесь мы организуем обратный вызов методов объекта который создал нас
    this.worker_chessEngine_0x88_O = worker_chessEngine_0x88_O;

  }

  /** 
   * node.js
   * 
   * очень интересная функция.
   * надо будет внимателно ее пересмотреть.
   * все уже забыл
   * 
   * moves e2e4 e7e5 g1f3 b8c6 f1b5
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
   * node.js
   * тут тоже обратный вызов. завершена очередная итерация на определенной максимальной глубине
   * и функция корневого поиска searching_iterative_deepening_r передает результат поиска
   * в объекте return_search_result
   * понятно что searching_iterative_deepening_r могла бы и сама печатать console.log(return_search_result.uci_info);
   * но мы весь официальный вывод организуем через i_chess_engine_0x88.js
   * хотя о чем это я это же консольный вывод! эта фукнция нужна для работы через нод
   * 
   * @param {import('./search_nm_ab_0x88/i_search_root_0x88.js').return_search_result} return_search_result
   * @returns {void}
   */
  node_js_return_search_result_on_depth_max_current_to_ChessEngine_0x88_С_from_searching_iterative_deepening_r(return_search_result) {
    console.log(return_search_result.uci_info);
  }

  /**
   * node.js
   * передаем информацию во время поиска из функции корневого поиска searching_iterative_deepening_r
   * тут работает обратный вызов. сам поиск вызывает метод объекта который его запустил
   * 
   * понятно что searching_iterative_deepening_r могла бы и сама печатать console.log(str);
   * но мы весь официальный вывод организуем через i_chess_engine_0x88.js
   * хотя о чем это я это же консольный вывод! эта фукнция нужна для работы через нод
   * 
   * @param {string} move
   * @param {number} move_i
   * @param {string} depth_max_current
   * @returns {void}
   */
  info_currmove_uci_from_searching_iterative_deepening_r(move, move_i, depth_max_current) {
    let str = "info currmove " + move + " currmovenumber " + move_i + " depth " + depth_max_current;
    console.log(str);
  }

  /**
   * этот метод вызывает функция поиска searching_iterative_deepening_r
   * и через нее передает сообщение worker_chessEngine_0x88_O т.е. потоку worker
   * 
   * @param {import('./search_nm_ab_0x88/i_search_root_0x88.js').return_search_result} return_search_result
   * @returns {void}
   */
  return_search_result_on_depth_max_current_to_ChessEngine_0x88_С_from_searching_iterative_deepening_r(return_search_result) {
    let message = return_search_result.uci_info;
    // @ts-ignore
    this.worker_chessEngine_0x88_O?.incoming_message_Worker_ChessEngine_0x88_С_from_ChessEngine_0x88_С(message);
  }

  /**
   * вызывается из worker_chessEngine_0x88_O
   * 
   * запуск полного поиска
   * 
  * @param {string} fen_start
  * @param {number} depth_max
  * @returns {return_search_result}
  */
  go_depth_id(fen_start, depth_max) {
    //DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    //console.log("ChessEngine_0x88_С->go_depth_iterative deepening depth_max = " + depth_max);
    let return_search_result = searching_iterative_deepening_r(this, fen_start, depth_max);
    return return_search_result;
  }

  /**
   * вызывается из worker_chessEngine_0x88_O
   * 
   * запуск полного перебора negamax
   * 
   * @param {string} fen_start
   * @param {number} depth_max
   * @returns {return_search_result}
   */
  go_depth_negamax(fen_start, depth_max) {
    console.log("ChessEngine_0x88_С->go_depth_negamax");
    let return_search_result = start_search_negamax_r(fen_start, depth_max);
    return return_search_result;
  }
}

export { ChessEngine_0x88_С };

/*
Описание класса.

Работа должна вестись через воркер worker_chessEngine_0x88_O
В итоге вообще непонятно как он работает потому что вызываются другие функции
из модуля i_search_root_0x88.js

*/