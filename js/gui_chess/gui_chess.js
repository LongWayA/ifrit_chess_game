/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name gui_chess.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

import { GuiWorker_R } from "../worker/gui_worker.js";
import { ChessBoard_8x8_C } from "./chess_board_8x8.js";
import { Game_line_0x88_C } from "./game_line_0x88.js";
import { Draw_С } from "../gui_chess/draw.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/


class Gui_chess_C {

      GuiWorker_O = GuiWorker_R;
      chessBoard_8x8_O = new ChessBoard_8x8_C();// доска 8x8 для графического отображения в браузере
      game_line_0x88_O = new Game_line_0x88_C();//
      draw_O = new Draw_С();// рисуем в браузере   

      
      static NAME = "Gui_chess_C";

      static WHITE = 1;
      static BLACK = 0;

      // test = 1 просто генерация ходов и просмотр в консоле
      // test = 2 запуск полного перебора minmax     
      // test = 3 alpha beta       
      // test = 4 iterative deepening
      // test = 5 message_to_engine(message) работа с воркером
      static TEST_GEN_MOOVE = 1;
      static TEST_MINMAX = 2;
      static TEST_AB = 3;
      static TEST_ID = 4;
      static TEST_MESSAGE = 5;

      // максимальная глубина перебора
      depth_max = -1;
      // количество рассмотреных узлов
      nodes = 0;
      // оценка найденного варианта
      score = 0;
      // найденный вариант в виде строки с ходами и оценкой в конце
      pv_line_str = " no";
      // игра идет за белых или черных
      is_white = 1;
      // номер хода в записи партии
      nomber_move = 0;
      // режим игры
      test = 1;

      constructor() {
      }

      iniM() {
            this.depth_max = -1;
            this.nodes = 0;
            this.score = 0;
            this.pv_line_str = " no";
            this.is_white = 1;
            this.nomber_move = 0;
            this.test = 1;
      }
};

export{Gui_chess_C};