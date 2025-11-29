/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name worker_chess_engine_0x88.js
 * @version created 25.10m.2025 
 * last modified 25.10m.2025
*/

import { ChessEngine_0x88_С } from "../engine_chess_0x88/chess_engine_0x88.js?v=2911m25";
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

      this.chessEngine_0x88_O.chess_board_0x88_O_start.set_0x88_from_fen(fen);

      //console.log("e-> ini chess_board_0x88_O");
      //w_chessEngine_0x88_O.chessEngine_0x88_O.chess_board_0x88_O.test_print_0x88();
      //w_chessEngine_0x88_O.chessEngine_0x88_O.chess_board_0x88_O.test_print_0x88_color();
      //w_chessEngine_0x88_O.chessEngine_0x88_O.chess_board_0x88_O.test_print_any_0x88();

    } else if (message.includes("go depth ")) {
      let end = message.length;
      let depth_max_s = message.slice(9, end);
      let depth_max = Number(depth_max_s);

      //let info_return_e = w_chessEngine_0x88_O.chessEngine_0x88_O.test_go_depth_nm(depth_max);      
      //let info_return_e = w_chessEngine_0x88_O.chessEngine_0x88_O.test_go_depth_ab(depth_max);
      let info_return_e = this.chessEngine_0x88_O.go_depth_id(depth_max);

      //console.log("e-> info_return_e");
      //info_return_e.chess_board_0x88_O_move.test_print_0x88();
      //info_return_e.chess_board_0x88_O_move.test_print_0x88_color();
      //info_return_e.chess_board_0x88_O_move.test_print_any_0x88();

      fen = info_return_e.chess_board_0x88_O_end.set_fen_from_0x88();
      //console.log('e fen to gui : ' + fen); 
      postMessage("position fen " + fen);
      postMessage("score " + info_return_e.score);
      postMessage("node " + info_return_e.node_count);
      postMessage(this.PV_line_str_save);
      postMessage("go");
    }
  }
}

let worker_chessEngine_0x88_O = new Worker_ChessEngine_0x88_С();
worker_chessEngine_0x88_O.iniM();
