/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name gui_start_worker.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

import { Gui_chess_C } from "../gui_chess/gui_chess.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

const worker_egine_0x88 = new Worker('js/worker/worker_chess_engine_0x88.js', { type: "module" });

worker_egine_0x88.onmessage = function (event) {
      //console.log('Сообщение от движка : ', event.data);
      GuiStartWorker_R.message_egnine_to_gui(event.data);
};

//
let GuiStartWorker_R = {

      NAME: "GuiStartWorker_R",
      IfritChessGame_O: 0,
      checkbox_O: 0,

      iniM(IfritChessGame_R) {
            GuiStartWorker_R.IfritChessGame_O = IfritChessGame_R;
            GuiStartWorker_R.checkbox_O = IfritChessGame_R.checkbox_O;
      },

      // функция работы с движком запущенным в отдельном потоке.
      message_egnine_to_gui(message) {
            //console.log('TO GUI message ' + message);

            if (message.includes("position fen ")) {
                  let end = message.length;
                  let fen = message.slice(13, end);
                  GuiStartWorker_R.checkbox_O.set_input_set_fen(fen);
                  //console.log('g fen from engine : ' + fen);
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(fen,
                        GuiStartWorker_R.IfritChessGame_O.chessEngine_0x88_O.chess_board_0x88_O_start);
            }

            if (message.includes("score ")) {
                  let end = message.length;
                  let score_s = message.slice(6, end);
                  //console.log('Gg score ' + score_s);
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.score = Number(score_s);
                  //console.log('g score ' + this.score);            
            }

            if (message.includes("node ")) {
                  let end = message.length;
                  let node_s = message.slice(5, end);
                  //console.log('g node ' + node_s);
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nodes = Number(node_s);
                  //console.log('g node ' + this.nodes);           
            }

            if (message.includes("nps ")) {
                  let end = message.length;
                  let node_s = message.slice(3, end);
                  //console.log('g node ' + node_s);
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nodes_per_second = Number(node_s);
                  //console.log('g node ' + this.nodes);           
            }

            if (message.includes("PV line: ")) {
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str = message;
                  GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_engine("\n" + message);

            }

            if (message.includes("go")) {
                  //console.log('g go');
                  // рисуем доску                 
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.draw_O.draw_chess_board_8x8(GuiStartWorker_R.IfritChessGame_O.
                        gui_chess_O.chessBoard_8x8_O,
                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.is_white);


                  GuiStartWorker_R.IfritChessGame_O.checkbox_O.set_text_engine(
                        " max depth:" + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.depth_max + ", nodes:" +
                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nodes +
                        ", kN/s:" + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nodes_per_second +
                        ", score:" + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.score +
                        "\n " + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str);

                  if (GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O.side_to_move != Gui_chess_C.WHITE) {

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nomber_move = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nomber_move + 1;

                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nomber_move + "." +
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str.slice(11, 18));
                  } else {

                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str.slice(11, 18));
                  }

                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.click_is_stop = Gui_chess_C.CLICK_NOT_STOP;

            }
      },

      test_message(not_go) {
            GuiStartWorker_R.IfritChessGame_O.gui_chess_O.draw_O.draw_chess_board_8x8(GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O,
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.is_white);

            GuiStartWorker_R.IfritChessGame_O.checkbox_O.set_text_engine(" Ифрит думает.");

            // message_gui_to_engine    
            let fen = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O.set_fen_from_8x8(
                  GuiStartWorker_R.IfritChessGame_O.chessEngine_0x88_O.chess_board_0x88_O_start);
            let message = "position fen " + fen;
            worker_egine_0x88.postMessage(message);
            message = "go depth " + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.depth_max;
            worker_egine_0x88.postMessage(message);

            if (GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O.side_to_move != Gui_chess_C.WHITE) {
                  // GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nomber_move = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nomber_move + 1;
                  if (not_go == 1) {
                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nomber_move = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nomber_move + 1;
                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nomber_move + "." +
                              GuiStartWorker_R.IfritChessGame_O.chessEngine_0x88_O.move_list_0x88_O_gui.move_to_string(
                                    GuiStartWorker_R.IfritChessGame_O.chessEngine_0x88_O.i_move,
                                    GuiStartWorker_R.IfritChessGame_O.chessEngine_0x88_O.chess_board_0x88_O_gui));
                  }

            } else {
                  if (not_go == 1) {
                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(
                              GuiStartWorker_R.IfritChessGame_O.chessEngine_0x88_O.move_list_0x88_O_gui.move_to_string(
                                    GuiStartWorker_R.IfritChessGame_O.chessEngine_0x88_O.i_move,
                                    GuiStartWorker_R.IfritChessGame_O.chessEngine_0x88_O.chess_board_0x88_O_gui));
                  }

            }

      }


};

export { GuiStartWorker_R };