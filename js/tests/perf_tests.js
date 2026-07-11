// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name perf_tests.js
 * @version created 04.07m.2026
*/

import {
      searching_negamax, ini_stack, chess_board_0x88_end_original, node_mm
} from "../chess_engine_0x88/search_0x88/search_negamax_0x88.js";

import {
      x07_y07_to_0x88_cb,
      test_print_piece_0x88_cb,
      test_compare_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb,
      letter_to_x_coordinate_cb,
      BOARD_SIZE_CB
} from "../chess_engine_0x88/move_generator_0x88_t/chess_board_0x88.js";

import {
      ini_random_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
      test_generation_key_64_tk
} from "../chess_engine_0x88/for_sorting_move_0x88/transposition_key_0x88.js";

import {
      clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, pv_line_to_uci_string_pv,
      MAX_DEPTH_PV, IND_TYPE_VARIANT_PV
} from "../chess_engine_0x88/search_0x88/pv_line_0x88.js";

import { Timer_C } from "../browser/timer.js";


/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/



let Tests_perf_R = {

      NAME: "Tests_perf_R",

      timer_O: new Timer_C(),



      iniM() {



      },

      //=======================================================================================
      /*
       * 
       * 
      */
      searching_negamax_test() {

            let best_score = 0;

            let node_true = 0;

            let depth = 0;

            let depth_max = 0;

            let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(0);// текущая доска с фигурами 0x88

            const chess_board_key_64 = new BigUint64Array(1);

            let packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(0);

            let fen = "no";

            let time_start = 0;// запускаем таймер
            let time_end = 0;// останавливаем таймер
            let time_delta = 0;// промежуток времени между запуском и остановкой таймера
            let nps = 0;

            ini_stack();

            ini_random_key_array_64_tk();// инициируем внтуренний массив случайных чисел.

            //------------------------------------------------------------------
            time_start = Tests_perf_R.timer_O.getCurrentTimeMs();
            fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            depth_max = 5;

            set_board_from_fen_0x88_cb(fen, chess_board_0x88);

            best_score = searching_negamax(packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max);

            node_true = 4865609;

            time_end = Tests_perf_R.timer_O.getCurrentTimeMs();
            time_delta = (time_end - time_start) / 1000;
            nps = node_mm/time_delta;

            if (node_mm != node_true) {
                  //if (1) {
                  console.log("Tests_perf_R -> Initial Position");
                  test_print_piece_0x88_cb(chess_board_0x88);
                  console.log("Tests_perf_R -> depth_max = " + depth_max);
                  console.log("Tests_perf_R -> best_score = " + best_score);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);
                  console.log("Tests_perf_R -> node_true = " + node_true);                 
                  console.log("--------------------- ");
                  console.log(" ");
            } else {
                  console.log("Tests_perf_R -> Initial Position OK depth_max = " + depth_max);
                  console.log("Tests_perf_R -> time_delta = " + time_delta); 
                  console.log("Tests_perf_R -> node_mm = " + node_mm); 
                  console.log("Tests_perf_R -> nps = " + nps);    
                  console.log(" ");                                              
            }
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            time_start = Tests_perf_R.timer_O.getCurrentTimeMs();
            fen = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -";
            depth_max = 4;

            set_board_from_fen_0x88_cb(fen, chess_board_0x88);

            best_score = searching_negamax(packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max);

            node_true = 4085603;

            time_end = Tests_perf_R.timer_O.getCurrentTimeMs();
            time_delta = (time_end - time_start) / 1000;
            nps = node_mm/time_delta;            

            if (node_mm != node_true) {
                  //if (1) {
                  console.log("Tests_perf_R -> Position 2");
                  test_print_piece_0x88_cb(chess_board_0x88);
                  console.log("Tests_perf_R -> depth_max = " + depth_max);
                  console.log("Tests_perf_R -> best_score = " + best_score);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);
                  console.log("Tests_perf_R -> node_true = " + node_true);
                  console.log("--------------------- ");
                  console.log(" ");
            } else {
                  console.log("Tests_perf_R -> Position 2 OK depth_max = " + depth_max);
                  console.log("Tests_perf_R -> time_delta = " + time_delta);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);     
                  console.log("Tests_perf_R -> nps = " + nps);  
                  console.log(" ");                                                  
            }
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            time_start = Tests_perf_R.timer_O.getCurrentTimeMs();
            fen = "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1";
            depth_max = 6;

            set_board_from_fen_0x88_cb(fen, chess_board_0x88);

            best_score = searching_negamax(packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max);

            node_true = 11030083;

            time_end = Tests_perf_R.timer_O.getCurrentTimeMs();
            time_delta = (time_end - time_start) / 1000; 
            nps = node_mm/time_delta;                       

            if (node_mm != node_true) {
                  //if (1) {
                  console.log("Tests_perf_R -> Position 3");
                  test_print_piece_0x88_cb(chess_board_0x88);
                  console.log("Tests_perf_R -> depth_max = " + depth_max);
                  console.log("Tests_perf_R -> best_score = " + best_score);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);
                  console.log("Tests_perf_R -> node_true = " + node_true);
                  console.log("--------------------- ");
                  console.log(" ");
            } else {
                  console.log("Tests_perf_R -> Position 3 OK depth_max = " + depth_max);
                  console.log("Tests_perf_R -> time_delta = " + time_delta);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);      
                  console.log("Tests_perf_R -> nps = " + nps);   
                  console.log(" ");                                                
            }
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            time_start = Tests_perf_R.timer_O.getCurrentTimeMs();
            fen = "r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1";
            depth_max = 5;

            set_board_from_fen_0x88_cb(fen, chess_board_0x88);

            best_score = searching_negamax(packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max);

            node_true = 15833292;

            time_end = Tests_perf_R.timer_O.getCurrentTimeMs();
            time_delta = (time_end - time_start) / 1000;
            nps = node_mm/time_delta;            

            if (node_mm != node_true) {
                  //if (1) {
                  console.log("Tests_perf_R -> Position 4");
                  test_print_piece_0x88_cb(chess_board_0x88);
                  console.log("Tests_perf_R -> depth_max = " + depth_max);
                  console.log("Tests_perf_R -> best_score = " + best_score);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);
                  console.log("Tests_perf_R -> node_true = " + node_true);
                  console.log("--------------------- ");
                  console.log(" ");
            } else {
                  console.log("Tests_perf_R -> Position 4 OK depth_max = " + depth_max);
                  console.log("Tests_perf_R -> time_delta = " + time_delta);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);  
                  console.log("Tests_perf_R -> nps = " + nps);  
                  console.log(" ");                                                     
            }
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            time_start = Tests_perf_R.timer_O.getCurrentTimeMs();
            fen = "rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8";
            depth_max = 4;

            set_board_from_fen_0x88_cb(fen, chess_board_0x88);

            best_score = searching_negamax(packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max);

            node_true = 2103487;

            time_end = Tests_perf_R.timer_O.getCurrentTimeMs();
            time_delta = (time_end - time_start) / 1000;
            nps = node_mm/time_delta;            

            if (node_mm != node_true) {
                  //if (1) {
                  console.log("Tests_perf_R -> Position 5");
                  test_print_piece_0x88_cb(chess_board_0x88);
                  console.log("Tests_perf_R -> depth_max = " + depth_max);
                  console.log("Tests_perf_R -> best_score = " + best_score);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);
                  console.log("Tests_perf_R -> node_true = " + node_true);
                  console.log("--------------------- ");
                  console.log(" ");
            } else {
                  console.log("Tests_perf_R -> Position 5 OK depth_max = " + depth_max);
                  console.log("Tests_perf_R -> time_delta = " + time_delta);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);      
                  console.log("Tests_perf_R -> nps = " + nps); 
                  console.log(" ");                                                  
            }
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            time_start = Tests_perf_R.timer_O.getCurrentTimeMs();
            fen = "r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10";
            depth_max = 4;

            set_board_from_fen_0x88_cb(fen, chess_board_0x88);

            best_score = searching_negamax(packing_pv_line, chess_board_0x88, chess_board_key_64, depth, depth_max);

            node_true = 3894594;

            time_end = Tests_perf_R.timer_O.getCurrentTimeMs();
            time_delta = (time_end - time_start) / 1000;
            nps = node_mm/time_delta;            

            if (node_mm != node_true) {
                  //if (1) {
                  console.log("Tests_perf_R -> Position 6");
                  test_print_piece_0x88_cb(chess_board_0x88);
                  console.log("Tests_perf_R -> depth_max = " + depth_max);
                  console.log("Tests_perf_R -> best_score = " + best_score);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);
                  console.log("Tests_perf_R -> node_true = " + node_true);
                  console.log("--------------------- ");
                  console.log(" ");
            } else {
                  console.log("Tests_perf_R -> Position 6 OK depth_max = " + depth_max);
                  console.log("Tests_perf_R -> time_delta = " + time_delta);
                  console.log("Tests_perf_R -> node_mm = " + node_mm);      
                  console.log("Tests_perf_R -> nps = " + nps);  
                  console.log(" ");                                                 
            }
            //------------------------------------------------------------------
      },
      //======================================================================================= 

      go() {
            console.log("Tests_perf_R -> Start Perf Tests");

            Tests_perf_R.searching_negamax_test();

      },

};

export { Tests_perf_R };