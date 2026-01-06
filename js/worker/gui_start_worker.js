/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name gui_start_worker.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

import { Gui_chess_C } from "../gui_chess/i_gui_chess.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

// при запуске игры сразу же запускается отдельный поток в котором идет расчет.
const worker_egine_0x88 = new Worker('js/worker/worker_chess_engine_0x88.js', { type: "module" });

// принимаем сообщения от движка
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

      // функция работы с текстовыми сообщениями от движка который запущен в отдельном потоке.
      message_egnine_to_gui(message) {
            //console.log('TO GUI message ' + message);

            if (message.includes("position fen ")) {
                  let end = message.length;
                  let fen = message.slice(13, end);
                  GuiStartWorker_R.checkbox_O.set_input_set_fen(fen);
                  //console.log('g fen from engine : ' + fen);
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(fen);

                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_position(fen);
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
                        ", n/s:" + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nodes_per_second +
                        ", score:" + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.score +
                        "\n " + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str);

                  let move_str;      

                  if (GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O.side_to_move != Gui_chess_C.WHITE) {

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move + 1;

                        move_str = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move + "." +
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str.slice(11, 18);

                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(move_str);

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_pv_line_str(move_str,
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move, Gui_chess_C.WHITE);

                  } else {

                        move_str = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str.slice(11, 18);

                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(move_str);

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_pv_line_str(move_str,
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move, 0);

                  }

                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.click_is_stop = Gui_chess_C.CLICK_NOT_STOP;
                  GuiStartWorker_R.IfritChessGame_O.checkbox_O.set_disabled(false);

            }
      },


      // передаем сообщение движку после нажатия кнопки го или сделанного руками хода, 
      // если ход сделали мы то добавляем его в линию игры
      message_gui_to_egnine(fen, depth_max, side_to_move, not_go, mode_game) {

            let message = "mode_game " + mode_game;
            worker_egine_0x88.postMessage(message);

            message = "position fen " + fen;
            worker_egine_0x88.postMessage(message);
            message = "go depth " + depth_max;
            worker_egine_0x88.postMessage(message);

            let move_str;

            // когда нажимаем кнопку go то нам не нужно записывать ход потому что хода пока нет. 
            // мы здесь записываем ход который сделали на доске
            if (not_go == 1) {

                  if (side_to_move != Gui_chess_C.WHITE) {
                        // GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move + 1;
                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move + 1;

                        move_str = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move + "." +
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.move_list_0x88_O_gui.move_to_string(
                                    GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.i_move,
                                    GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.chess_board_0x88_O_gui);

                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(move_str);

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_pv_line_str(move_str,
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move, Gui_chess_C.WHITE);

                  } else {

                        move_str = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.move_list_0x88_O_gui.move_to_string(
                                    GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.i_move,
                                    GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.chess_board_0x88_O_gui);

                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(move_str);

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_pv_line_str( move_str,
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move, 0);
                  }
            }

      }


};

export { GuiStartWorker_R };