// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name pathes_browser.js
 * @version created 09.06m.2026
*/

import {
      Сhess_board_0x88_TEST_С
} from "../chess_engine_0x88/move_generator_0x88/chess_board_0x88_test.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

const TEST = 1;
const NOT_TEST = 0;

const is_chess_board_0x88 = 1; // TEST


let Tests_R = {

      NAME: "Tests_R",

      chess_board_0x88_TEST_O: new Сhess_board_0x88_TEST_С(),


      iniM() {

            Tests_R.chess_board_0x88_TEST_O.iniM();// Тестируем модуль шахматной доски chess_board_0x88.js

      },

      go() {
            console.log("Tests_R -> Start Tests: All");


            // Тестируем модуль шахматной доски chess_board_0x88.js
            if (is_chess_board_0x88 == TEST) {
                  console.log("Tests_R -> Start Test: chess_board_0x88");
                  Tests_R.chess_board_0x88_TEST_O.go();
            }


      },

};

Tests_R.iniM();

export { Tests_R };