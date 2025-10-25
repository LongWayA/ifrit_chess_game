/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_engine_0x88.js
 * @version created 25.10m.2025 
 * last modified 25.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

//import {ChessEngine_0x88_С} from './js/chess_engine_0x88/chess_engine_0x88.js';

    importScripts("../chess_engine_0x88/chess_board_0x88.js");
    importScripts("../chess_engine_0x88/move_list_0x88.js");
    importScripts("../chess_engine_0x88/move_generator_0x88.js");
    importScripts("../chess_engine_0x88/undo_0x88.js");
    importScripts("../chess_engine_0x88/make_move_0x88.js");
    importScripts("../chess_engine_0x88/unmake_move_0x88.js");
    importScripts("../chess_engine_0x88/evaluate_0x88.js");
    importScripts("../chess_engine_0x88/pv_line_0x88.js");
    importScripts("../chess_engine_0x88/search_minmax_0x88.js");
    importScripts("../chess_engine_0x88/search_ab_0x88.js");
    importScripts("../chess_engine_0x88/search_pvs_0x88.js");    
    importScripts("../chess_engine_0x88/search_start_0x88.js");    
    importScripts("../chess_engine_0x88/chess_engine_0x88.js");

class W_ChessEngine_0x88_С {

   chessEngine_0x88_O = new ChessEngine_0x88_С();// встроенный шахматный движок на доске 0x88

  static NAME = "W_ChessEngine_0x88";



  score = 0;

  constructor() {

  }

  iniM() {
 
  }

  go_test() {
    console.log("W_ChessEngine_0x88_С->go_test");

  }
}

let w_chessEngine_0x88_O = new W_ChessEngine_0x88_С();


onmessage = function(event) {
  console.log('Получено сообщение от основного: ', event.data);
  let score = w_chessEngine_0x88_O.chessEngine_0x88_O.go_search(2);
  postMessage('Привет от рабочего потока! score = ' + score);
  //w_chessEngine_0x88_O.go_test;
};








//export {W_ChessEngine_0x88_С}; // 