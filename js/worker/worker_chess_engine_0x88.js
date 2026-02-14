// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name worker_chess_engine_0x88.js
 * @version created 25.10m.2025 
*/

import { ChessEngine_0x88_С } from "../chess_engine_0x88/i_chess_engine_0x88.js";
/**
* НАЗНАЧЕНИЕ

*/

onmessage = function (event) {
  //console.log('Сообщение от оболочки : ', event.data);
  worker_chessEngine_0x88_O.message_to_engine(event.data);
};

/**
 * Класс.
 * @class
 */
class Worker_ChessEngine_0x88_С {

  chessEngine_0x88_O = new ChessEngine_0x88_С();// встроенный шахматный движок на доске 0x88

  static NAME = "Worker_ChessEngine_0x88_С";

  fen_start = "-";
  mode_game = 0;


  constructor() {
  }

  iniM() {
    this.chessEngine_0x88_O.iniM(this);
  }

  // передаем оболочке информацию о текущем поиске это строки вида 
  // info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4 
  // info currmove e2e4 currmovenumber 1 depth 8 - идет только когда делаем ехе uci engine
  /**
  * @param {string} message
  * @returns {void}
  */
  message_chessEngine_0x88_to_worker_chessEngine_0x88_O(message) {
    postMessage(message);
  }

  /**
   * @param {string} message
   * @returns {void}
   */
  message_to_engine(message) {
    //console.log('e message : ' + message);
    let fen;
    if (message.includes("position fen ")) {
      let end = message.length;
      fen = message.slice(13, end);
      //console.log('e fen from gui : ' + fen);

      this.fen_start = fen;

    }
    else if (message.includes("go depth ")) {
      let end = message.length;
      let depth_max_s = message.slice(9, end);
      let depth_max = Number(depth_max_s);


      /** @type {import('../chess_engine_0x88/search_root/i_search_root_new.js').uci_return_search}*/
      let uci_return_search;

      if (this.mode_game == 1) {
        
        console.log('Worker_ChessEngine_0x88_С -> go_depth_minmax');

        uci_return_search = this.chessEngine_0x88_O.go_depth_minmax(this.fen_start, depth_max);

        postMessage("position fen " + uci_return_search.fen_end);
        postMessage(uci_return_search.info);
        postMessage(uci_return_search.best_move);
      }
      else if (this.mode_game == 2) {
        uci_return_search = this.chessEngine_0x88_O.go_depth_id(this.fen_start, depth_max);

        postMessage("position fen " + uci_return_search.fen_end);
        postMessage(uci_return_search.info);
        postMessage(uci_return_search.best_move);
      }

    }
    else if (message.includes("mode_game ")) {
      let end = message.length;
      let mode_game_s = message.slice(9, end);
      this.mode_game = Number(mode_game_s);
    }

  }
}

let worker_chessEngine_0x88_O = new Worker_ChessEngine_0x88_С();
worker_chessEngine_0x88_O.iniM();

//export { Worker_ChessEngine_0x88_С };