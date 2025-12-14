/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name worker_chess_engine_0x88.js
 * @version created 25.10m.2025 
 * last modified 25.10m.2025
*/

import { ChessEngine_0x88_С } from "../chess_engine_0x88/i_chess_engine_0x88.js";
/**
* НАЗНАЧЕНИЕ

*/

onmessage = function (event) {
  //console.log('Сообщение от оболочки : ', event.data);
  worker_chessEngine_0x88_O.message_to_engine(event.data);
};


class Worker_ChessEngine_0x88_С {

  chessEngine_0x88_O = new ChessEngine_0x88_С();// встроенный шахматный движок на доске 0x88

  static NAME = "Worker_ChessEngine_0x88_С";

  PV_line_str_save = "-";
  fen_start = "-";

  constructor() {
  }

  iniM() {
    this.chessEngine_0x88_O.iniM(this);
  }

  message_chessEngine_0x88_to_worker_chessEngine_0x88_O(message) {
    this.PV_line_str_save = message;
    postMessage(message);
  }

  message_to_engine(message) {
    //console.log('e message : ' + message);
    let fen;
    if (message.includes("position fen ")) {
      let end = message.length;
      fen = message.slice(13, end);
      //console.log('e fen from gui : ' + fen);

      this.fen_start = fen;

    } else if (message.includes("go depth ")) {
      let end = message.length;
      let depth_max_s = message.slice(9, end);
      let depth_max = Number(depth_max_s);

      //let info_return_search = w_chessEngine_0x88_O.chessEngine_0x88_O.test_go_depth_nm(depth_max);      
      let info_return_search = this.chessEngine_0x88_O.go_depth_id(this.fen_start, depth_max);
      
      postMessage("position fen " + info_return_search.fen_end);
      postMessage("score " + info_return_search.best_score_str);
      postMessage("node " + info_return_search.node_count_str);
      postMessage("nps " + info_return_search.nodes_per_second_str);      
      postMessage(this.PV_line_str_save);
      postMessage("go");
    }
  }
}

let worker_chessEngine_0x88_O = new Worker_ChessEngine_0x88_С();
worker_chessEngine_0x88_O.iniM();
