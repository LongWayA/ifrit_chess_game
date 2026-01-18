// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name gui_start_worker.js
 * @version created 31.10m.2025 
*/

import { Gui_chess_C } from "../gui_chess/i_gui_chess.js";
import { Checkbox_C } from "../browser/checkbox.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

// при запуске игры сразу же запускается отдельный поток в котором идет расчет.
const worker_egine_0x88 = new Worker('js/worker/worker_chess_engine_0x88.js', { type: "module" });

// принимаем сообщения от движка
/**
 * @param {any} event
 * @returns {void}
 */
worker_egine_0x88.onmessage = function (event) {
      //console.log('Сообщение от движка : ', event.data);
      GuiStartWorker_R.message_egnine_to_gui(event.data);
};

//
let GuiStartWorker_R = {

      NAME: "GuiStartWorker_R",
      /** @type {any} */
      IfritChessGame_O: null,

      /** @type {Checkbox_C | null} */
      checkbox_O: null,
      /**
       * @param {any} IfritChessGame_R
       * @returns {void}
       */
      iniM(IfritChessGame_R) {
            GuiStartWorker_R.IfritChessGame_O = IfritChessGame_R;
            GuiStartWorker_R.checkbox_O = IfritChessGame_R.checkbox_O;
      },

      // функция работы с текстовыми сообщениями от движка который запущен в отдельном потоке.
      /**
       * @param {string} message
       * @returns {void}
       */
      message_egnine_to_gui(message) {
            //console.log('TO GUI message ' + message);

            if (message.includes("position fen ")) {
                  let end = message.length;
                  let fen = message.slice(13, end);
                  GuiStartWorker_R.checkbox_O?.set_input_set_fen(fen);
                  //console.log('g fen from engine : ' + fen);
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(fen);

                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_position(fen);
            }

            //0    1     2 3     4  5  6     7  8   9     10 11  
            //info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4
            if (message.includes("info ")) {

                  let info = message.split(' ');

                  //console.log('message ' + message);
                  // console.log('info[0] ' + info[0]);//info
                  // console.log('info[1] ' + info[1]);//depth
                  // console.log('info[2] ' + info[2]);//3
                  // console.log('info[3] ' + info[3]);//score
                  // console.log('info[4] ' + info[4]);//cp 
                  // console.log('info[5] ' + info[5]);//42
                  // console.log('info[6] ' + info[6]);//nodes
                  // console.log('info[7] ' + info[7]);//72
                  // console.log('info[8] ' + info[8]);//nps
                  // console.log('info[9] ' + info[9]);//36000

                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.score = Number(info[5]);
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nodes = Number(info[7]);
                  GuiStartWorker_R.IfritChessGame_O.gui_chess_O.nodes_per_second = Number(info[9]);

                  if (message.includes("pv ")) {
                        let pv_i = message.indexOf("pv");
                        let end = message.length;
                        let pv = message.slice(pv_i, end);

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str = pv;
                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.info_from_engine = message;
                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_engine("\n" + message);
                  }

            }

            if (message.includes("bestmove")) {
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
                        "\n " + GuiStartWorker_R.IfritChessGame_O.gui_chess_O.info_from_engine);

                  let move_str;

                  if (GuiStartWorker_R.IfritChessGame_O.gui_chess_O.chessBoard_8x8_O.side_to_move != Gui_chess_C.WHITE) {

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move =
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move + 1;

                        move_str = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str.slice(3, 8);

                        if (move_str[4] != " ") {
                              move_str = move_str + " ";
                              // console.log("move_str " + move_str);
                              console.log("move_str[4] " + move_str[4]);
                        }

                        move_str = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move + "." + move_str;



                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(move_str);

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_pv_line_str(move_str,
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move, Gui_chess_C.WHITE);

                  } else {

                        move_str = GuiStartWorker_R.IfritChessGame_O.gui_chess_O.pv_line_str.slice(3, 8);


                        if (move_str[4] != " ") {
                              move_str = move_str + " ";
                              // console.log("move_str " + move_str);                              
                              // console.log("move_str[4] " + move_str[4]);
                        }

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
      /**
       * @param {string} fen
       * @param {number} depth_max
       * @param {number} side_to_move 
       * @param {number} not_go
       * @param {number} mode_game  
       * @returns {void}
       */
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
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.move_list_0x88_O_gui.move_to_string_uci(
                                    GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.i_move,
                                    GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.chess_board_0x88_O_gui) +
                              " ";

                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(move_str);

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_pv_line_str(move_str,
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move, Gui_chess_C.WHITE);

                  } else {

                        move_str =
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.move_list_0x88_O_gui.move_to_string_uci(
                                    GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.i_move,
                                    GuiStartWorker_R.IfritChessGame_O.gui_chess_O.guiLegalMove_0x88_O.chess_board_0x88_O_gui) +
                              " ";

                        GuiStartWorker_R.IfritChessGame_O.checkbox_O.add_text_chess_game(move_str);

                        GuiStartWorker_R.IfritChessGame_O.gui_chess_O.game_line_0x88_O.add_pv_line_str(move_str,
                              GuiStartWorker_R.IfritChessGame_O.gui_chess_O.number_move, 0);
                  }
            }

      }


};

export { GuiStartWorker_R };