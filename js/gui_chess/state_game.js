/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name state_game.js
 * @version created 31.10m.2025 
 * last modified 31.10m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/


class StateGame_C {

      static NAME = "StateGame_C";

      static WHITE = 1;
      static BLACK = 0;

      // test = 1 просто генерация ходов и просмотр в консоле
      // test = 2 запуск полного перебора minmax     
      // test = 3 alpha beta       
      // test = 4 iterative deepening
      // test = 5 message_to_engine(message) работа с воркером
      static TEST_GEN_MOOVE = 1;
      static TEST_NEGAMAX = 2;
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

export{StateGame_C};