/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name gui_worker.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

import { StateGame_C } from "../gui_chess/state_game.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

let GuiWorker_R = {

      NAME: "GuiWorker_R",
      IfritChessGame_O: 0,
      checkbox_O: 0,

      iniM(IfritChessGame_R, checkbox_R) {
          GuiWorker_R.IfritChessGame_O = IfritChessGame_R;
          GuiWorker_R.checkbox_O = checkbox_R;
      },

      // функция работы с движком запущенным в отдельном потоке.
      message_egnine_to_gui(message) {
            //console.log('TO GUI message ' + message);

            if (message.includes("position fen ")) {
                  let end = message.length;
                  let fen = message.slice(13, end);
                  GuiWorker_R.checkbox_O.set_input_set_fen(fen);
                  //console.log('g fen from engine : ' + fen);
                  GuiWorker_R.IfritChessGame_O.chessBoard_8x8_O.set_8x8_from_fen(fen, GuiWorker_R.IfritChessGame_O.chessEngine_0x88_O.chess_board_0x88_O);
            }

            if (message.includes("score ")) {
                  let end = message.length;
                  let score_s = message.slice(6, end);
                  //console.log('Gg score ' + score_s);
                  GuiWorker_R.IfritChessGame_O.stateGame_O.score = Number(score_s);
                  //console.log('g score ' + this.score);            
            }

            if (message.includes("node ")) {
                  let end = message.length;
                  let node_s = message.slice(5, end);
                  //console.log('g node ' + node_s);
                  GuiWorker_R.IfritChessGame_O.stateGame_O.nodes = Number(node_s);
                  //console.log('g node ' + this.nodes);           
            }

            if (message.includes("PV line: ")) {
                  GuiWorker_R.IfritChessGame_O.stateGame_O.pv_line_str = message;

            }

            if (message.includes("go")) {
                  //console.log('g go');
                  // рисуем доску                 
                  GuiWorker_R.IfritChessGame_O.draw_O.draw_chess_board_8x8(GuiWorker_R.IfritChessGame_O.chessBoard_8x8_O, GuiWorker_R.IfritChessGame_O.stateGame_O.is_white);


                  GuiWorker_R.IfritChessGame_O.checkbox_O.set_text_engine(
                        " max depth:" + GuiWorker_R.IfritChessGame_O.stateGame_O.depth_max + " nodes:" +
                        GuiWorker_R.IfritChessGame_O.stateGame_O.nodes + " score:" + GuiWorker_R.IfritChessGame_O.stateGame_O.score +
                        "\n " + GuiWorker_R.IfritChessGame_O.stateGame_O.pv_line_str);

                  if (GuiWorker_R.IfritChessGame_O.chessBoard_8x8_O.side_to_move != StateGame_C.WHITE) {

                        GuiWorker_R.IfritChessGame_O.stateGame_O.nomber_move = GuiWorker_R.IfritChessGame_O.stateGame_O.nomber_move + 1;

                        GuiWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(GuiWorker_R.IfritChessGame_O.stateGame_O.nomber_move + "." +
                              GuiWorker_R.IfritChessGame_O.stateGame_O.pv_line_str.slice(11, 18));
                  } else {

                        GuiWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(GuiWorker_R.IfritChessGame_O.stateGame_O.pv_line_str.slice(11, 18));
                  }

                  GuiWorker_R.IfritChessGame_O.stop_click = 0;
                  GuiWorker_R.IfritChessGame_O.stop_click_2 = 0;
            }
      },

      test_message(not_go) {
            GuiWorker_R.IfritChessGame_O.draw_O.draw_chess_board_8x8(GuiWorker_R.IfritChessGame_O.chessBoard_8x8_O,
                  GuiWorker_R.IfritChessGame_O.stateGame_O.is_white);

            GuiWorker_R.IfritChessGame_O.checkbox_O.set_text_engine(" Ифрит думает.");

            // message_gui_to_engine    
            let fen = GuiWorker_R.IfritChessGame_O.chessBoard_8x8_O.set_fen_from_8x8(
                  GuiWorker_R.IfritChessGame_O.chessEngine_0x88_O.chess_board_0x88_O);
            let message = "position fen " + fen;
            worker_egine_0x88.postMessage(message);
            message = "go depth " + GuiWorker_R.IfritChessGame_O.stateGame_O.depth_max;
            worker_egine_0x88.postMessage(message);

            if (GuiWorker_R.IfritChessGame_O.chessBoard_8x8_O.side_to_move != StateGame_C.WHITE) {
                  // GuiWorker_R.IfritChessGame_O.stateGame_O.nomber_move = GuiWorker_R.IfritChessGame_O.stateGame_O.nomber_move + 1;
                  if (not_go == 1) {
                        GuiWorker_R.IfritChessGame_O.stateGame_O.nomber_move = GuiWorker_R.IfritChessGame_O.stateGame_O.nomber_move + 1;
                        GuiWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(GuiWorker_R.IfritChessGame_O.stateGame_O.nomber_move + "." +
                              GuiWorker_R.IfritChessGame_O.chessEngine_0x88_O.move_list_gui_0x88_O.move_to_string(
                                    GuiWorker_R.IfritChessGame_O.chessEngine_0x88_O.i_move,
                                    GuiWorker_R.IfritChessGame_O.chessEngine_0x88_O.chess_board_0x88_O_gui));
                  }

            } else {
                  if (not_go == 1) {
                        GuiWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(
                              GuiWorker_R.IfritChessGame_O.chessEngine_0x88_O.move_list_gui_0x88_O.move_to_string(
                                    GuiWorker_R.IfritChessGame_O.chessEngine_0x88_O.i_move,
                                    GuiWorker_R.IfritChessGame_O.chessEngine_0x88_O.chess_board_0x88_O_gui));
                  }

            }
            GuiWorker_R.IfritChessGame_O.stop_click_2 = 1;

      }


};

export{GuiWorker_R};

const worker_egine_0x88 = new Worker('js/worker/w_chess_engine_0x88.js', {type: "module"});

worker_egine_0x88.onmessage = function (event) {
      //console.log('Сообщение от движка : ', event.data);
      GuiWorker_R.message_egnine_to_gui(event.data);
};