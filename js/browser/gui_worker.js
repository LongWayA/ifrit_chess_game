/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name gui_worker.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/


let GuiWorker_R = {

      NAME: "GuiWorker_R",


      iniM() {

      },

      // функция работы с движком запущенным в отдельном потоке.
      message_egnine_to_gui(message) {
            //console.log('TO GUI message ' + message);

            if (message.includes("position fen ")) {
                  let end = message.length;
                  let fen = message.slice(13, end);
                  input_set_fen.value = fen;
                  //console.log('g fen from engine : ' + fen);
                  IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_fen(fen, IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);
            }

            if (message.includes("score ")) {
                  let end = message.length;
                  let score_s = message.slice(6, end);
                  //console.log('Gg score ' + score_s);
                  IfritChessGame_R.stateGame_O.score = Number(score_s);
                  //console.log('g score ' + this.score);            
            }

            if (message.includes("node ")) {
                  let end = message.length;
                  let node_s = message.slice(5, end);
                  //console.log('g node ' + node_s);
                  IfritChessGame_R.stateGame_O.nodes = Number(node_s);
                  //console.log('g node ' + this.nodes);           
            }

            if (message.includes("PV line: ")) {
                  IfritChessGame_R.stateGame_O.pv_line_str = message;

            }

            if (message.includes("go")) {
                  //console.log('g go');
                  // рисуем доску                 
                  IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, IfritChessGame_R.stateGame_O.is_white);

                  text_engine.value = " max depth:" + IfritChessGame_R.stateGame_O.depth_max + " nodes:" +
                        IfritChessGame_R.stateGame_O.nodes + " score:" + IfritChessGame_R.stateGame_O.score +
                        "\n " + IfritChessGame_R.stateGame_O.pv_line_str;

                  if (IfritChessGame_R.chessBoard_8x8_O.side_to_move != StateGame_C.WHITE) {
                        IfritChessGame_R.stateGame_O.nomber_move = IfritChessGame_R.stateGame_O.nomber_move + 1;
                        text_chess_game.value += IfritChessGame_R.stateGame_O.nomber_move + "." +
                              IfritChessGame_R.stateGame_O.pv_line_str.slice(11, 18);
                  } else {

                        text_chess_game.value += IfritChessGame_R.stateGame_O.pv_line_str.slice(11, 18);
                  }


                  IfritChessGame_R.stop_click = 0;
                  IfritChessGame_R.stop_click_2 = 0;
            }
      },

      test_message(not_go) {
            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O,
                  IfritChessGame_R.stateGame_O.is_white);

            text_engine.value = " Ифрит думает.";

            // message_gui_to_engine    
            let fen = IfritChessGame_R.chessBoard_8x8_O.set_fen_from_8x8(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);
            let message = "position fen " + fen;
            worker_egine_0x88.postMessage(message);
            message = "go depth " + IfritChessGame_R.stateGame_O.depth_max;
            worker_egine_0x88.postMessage(message);

            if (IfritChessGame_R.chessBoard_8x8_O.side_to_move != StateGame_C.WHITE) {
                  // IfritChessGame_R.stateGame_O.nomber_move = IfritChessGame_R.stateGame_O.nomber_move + 1;
                  if (not_go == 1) {
                        IfritChessGame_R.stateGame_O.nomber_move = IfritChessGame_R.stateGame_O.nomber_move + 1;
                        text_chess_game.value += IfritChessGame_R.stateGame_O.nomber_move + "." +
                              IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O.move_to_string(
                                    IfritChessGame_R.chessEngine_0x88_O.i_move,
                                    IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O_gui);
                  }

            } else {
                  if (not_go == 1) {
                        text_chess_game.value +=
                              IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O.move_to_string(
                                    IfritChessGame_R.chessEngine_0x88_O.i_move,
                                    IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O_gui);
                  }

            }
            IfritChessGame_R.stop_click_2 = 1;

      }


};

const worker_egine_0x88 = new Worker('js/chess_engine_0x88/w_chess_engine_0x88.js');

worker_egine_0x88.onmessage = function (event) {
      //console.log('Сообщение от движка : ', event.data);
      GuiWorker_R.message_egnine_to_gui(event.data);
};