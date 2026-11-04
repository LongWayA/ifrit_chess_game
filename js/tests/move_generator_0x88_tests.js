// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_generator_0x88_tests.js
 * @version created 09.06m.2026
*/

import {
      Сhess_board_0x88_TEST_С
} from "../chess_engine_0x88/core_0x88_t/chess_board_0x88_t/chess_board_0x88_test.js";

import {
      Move_list_0x88_TEST_С
} from "../chess_engine_0x88/core_0x88_t/move_list_0x88_t/move_list_0x88_test.js";

import {
      generator_move_captures_0x88_TEST_С
} from "../chess_engine_0x88/core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88_test.js";

import {
      generator_move_quiet_0x88_TEST_С
} from "../chess_engine_0x88/core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88_test.js";

import {
      Make_move_0x88_TEST_С
} from "../chess_engine_0x88/core_0x88_t/make_move_0x88_t/make_move_0x88_test.js";


/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

const TEST = 1;
const NOT_TEST = 0;

const is_chess_board_0x88 = 1; // TEST
const is_move_list_0x88 = 1; // TEST
const is_generator_move_captures_0x88 = 1; // TEST
const is_generator_move_quiet_0x88 = 1; // TEST
const is_make_move_0x88 = 1; // TEST

let Tests_R = {

      NAME: "Tests_R",

      chess_board_0x88_TEST_O: new Сhess_board_0x88_TEST_С(),

      move_list_0x88_TEST_O: new Move_list_0x88_TEST_С(),  
      
      generator_move_captures_0x88_TEST_O: new generator_move_captures_0x88_TEST_С(),  
      
      generator_move_quiet_0x88_TEST_O: new generator_move_quiet_0x88_TEST_С(),

      make_move_0x88_TEST_O: new Make_move_0x88_TEST_С(),      



      iniM() {

            Tests_R.chess_board_0x88_TEST_O.iniM();// Тестируем модуль шахматной доски chess_board_0x88.js

            Tests_R.move_list_0x88_TEST_O.iniM();// Тестируем модуль список ходов move_list_0x88.js

            Tests_R.generator_move_captures_0x88_TEST_O.iniM();// Тестируем модуль генерация взятий generator_move_captures_0x88_test.js

            Tests_R.generator_move_quiet_0x88_TEST_O.iniM();// Тестируем модуль генераций тихих ходов generator_move_quiet_0x88.js

            Tests_R.make_move_0x88_TEST_O.iniM();// Тестируем модуль генераций тихих ходов generator_move_quiet_0x88.js

      },

      go() {
            console.log("Tests_R -> Start Tests: All");

            // Тестируем модуль шахматной доски chess_board_0x88.js
            if (is_chess_board_0x88 == TEST) {
                  console.log("Tests_R -> Start Test: chess_board_0x88");
                  Tests_R.chess_board_0x88_TEST_O.go();
            }

            // Тестируем модуль список ходов move_list_0x88.js
            if (is_move_list_0x88 == TEST) {
                  console.log("Tests_R -> Start Test: move_list_0x88.js");
                  Tests_R.move_list_0x88_TEST_O.go();
            }

            // Тестируем модуль генерации взятий generator_move_captures_0x88_test.js
            if (is_generator_move_captures_0x88 == TEST) {
                  console.log("Tests_R -> Start Test: generator_move_captures_0x88_test.js");
                  Tests_R.generator_move_captures_0x88_TEST_O.go();
            }

            // Тестируем модуль генерации тихих ходов generator_move_quiet_0x88.js
            if (is_generator_move_quiet_0x88 == TEST) {
                  console.log("Tests_R -> Start Test: generator_move_quiet_0x88.js");
                  Tests_R.generator_move_quiet_0x88_TEST_O.go();
            }

            // Тестируем модуль генерации позиций make_move_0x88.js
            if (is_make_move_0x88 == TEST) {
                  console.log("Tests_R -> Start Test: make_move_0x88.js");
                  Tests_R.make_move_0x88_TEST_O.go();
            }

      },

};

Tests_R.iniM();

export { Tests_R };