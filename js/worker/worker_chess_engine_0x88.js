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
*
* он вызывается в модуле gui_start_worker.js
* в виде const worker_egine_0x88 = new Worker('js/worker/worker_chess_engine_0x88.js', { type: "module" });
* 
* как только этот модуль читается в конце он создает объект класса
* но это не поток worker а просто объект который я так назвал
* потому что в этом модуле есть функция onmessage(event)
* она обеспечивает передачу сообщений от основного потока
* и тут же используется функция postMessage(message)
* передающая сообщения основному потоку
* 
* значит этот объект запускается в потоке worker
* и через него и другие модули. это корень отдельного потока
* 
* получается какая то странная цепочка:
* 
* это основная цепочка                                                            тут уже вызов много чего еще  
* gui_start_worker.js -> worker_chess_engine_0x88.js -> i_chess_engine_0x88.js -> i_search_root_0x88.js -> search_nm_ab_0x88.js
*                                                                                                       -> search_negamax_0x88.js 
*
*/

/**
 * 
 * посылаем сообщения основному потоку оболочки
 * 
  * @param {string} message
  * @returns {void}
  */
let outgoing_message_worker_chess_engine_to_gui_start_worker = function (message) {
      postMessage(message);
}

/**
 * 
 * принимаем сообщения от основного потока оболочки
 * 
 * @param {any} event
 * @returns {void}
 */
onmessage = function (event) {
  //console.log('Сообщение от оболочки : ', event.data);
  worker_chessEngine_0x88_O.incoming_message_worker_chess_engine_from_gui_start_worker(event.data);
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

  // функция return_search_result_on_depth_max_current_from_searching_iterative_deepening_r_to_worker
  // передает информацию основному потоку через этот метод
  // передаем оболочке информацию о текущем поиске это строки вида 
  // info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4 
  // info currmove e2e4 currmovenumber 1 depth 8 - идет только когда делаем ехе uci engine
  /**
  * @param {string} message
  * @returns {void}
  */
  incoming_message_Worker_ChessEngine_0x88_С_from_ChessEngine_0x88_С(message) {
    outgoing_message_worker_chess_engine_to_gui_start_worker(message);
  }

  /**
   * получаем сообщение от оболочки через onmessage(event)
   * в нем вызывается наш метод
   * 
   * @param {string} message
   * @returns {void}
   */
  incoming_message_worker_chess_engine_from_gui_start_worker(message) {
    //console.log('e message : ' + message);
    let fen;

    ////////////////////////////////////////////////////////////////////////////////////
    // uci 
    // пришла позиция фен, мы ее запоминаем в this.fen_start
    if (message.includes("position fen ")) {
      let end = message.length;
      fen = message.slice(13, end);
      //console.log('e fen from gui : ' + fen);

      this.fen_start = fen;

    }

    ////////////////////////////////////////////////////////////////////////////////////
    // uci    
    // пришла комнада вида go depth 2, запоминаем глубину поиска в depth_max
    // запускаем расчет и отдаем результат
    else if (message.includes("go depth ")) {
      let end = message.length;
      let depth_max_s = message.slice(9, end);
      let depth_max = Number(depth_max_s);

      /** @type {import('../chess_engine_0x88/search_nm_ab_0x88/i_search_root_0x88.js').return_search_result}*/
      let return_search_result;

      // режим полного перебора go_depth_negamax
      if (this.mode_game == 1) {

        console.log('Worker_ChessEngine_0x88_С -> go_depth_negamax');
        return_search_result = this.chessEngine_0x88_O.go_depth_negamax(this.fen_start, depth_max);

        outgoing_message_worker_chess_engine_to_gui_start_worker("position fen " + return_search_result.fen_end);
        outgoing_message_worker_chess_engine_to_gui_start_worker(return_search_result.uci_info);
        outgoing_message_worker_chess_engine_to_gui_start_worker(return_search_result.uci_best_move);
      }
      // режим полного поиска с итерациями go_depth_id
      else if (this.mode_game == 2) {
        return_search_result = this.chessEngine_0x88_O.go_depth_id(this.fen_start, depth_max);

        // передаем позицию с ходом через сообщение из дочерного потока в основной как фен в gui_start_worker.js
        outgoing_message_worker_chess_engine_to_gui_start_worker("position fen " + return_search_result.fen_end);
        outgoing_message_worker_chess_engine_to_gui_start_worker(return_search_result.uci_info);
        //outgoing_message_worker_chess_engine_to_gui_start_worker(return_search_result.uci_best_move);
        outgoing_message_worker_chess_engine_to_gui_start_worker(return_search_result.best_move_f);
      }

    }
    ////////////////////////////////////////////////////////////////////////////////////
    // not uci 
    // пришла комнада выбора режима игры    
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