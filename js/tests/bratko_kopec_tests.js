// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name bratko_kopec_tests.js
 * @version created 26.11m.2026
*/

import {
      start_search_negamax_r, searching_iterative_deepening_r, set_stop_search_in_1_r, set_stop_search_in_0_r, test_tt,
      move_str_to_board_r
} from "../chess_engine_0x88/search_nm_ab_0x88/i_search_root_0x88.js"

import { ChessEngine_0x88_С } from "../chess_engine_0x88/i_chess_engine_0x88.js";

import {
      x07_y07_to_0x88_cb,
      test_print_piece_0x88_cb,
      test_compare_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb, test_print_piece_0x88_f_cb,
      letter_to_x_coordinate_cb,
      BOARD_SIZE_CB
} from "../chess_engine_0x88/core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

let Tests_B_K = {

      /*
       * 
       * 
      */
      test() {

            const chess_board_0x88_start_from_fen = new Int32Array(BOARD_SIZE_CB).fill(0);// записываем стартовую доску

            /** @type {import('../chess_engine_0x88/search_nm_ab_0x88/i_search_root_0x88').return_search_result}*/
            let return_search_result;

            let chessEngine_0x88_O = new ChessEngine_0x88_С();
            //let chessEngine_0x88_O = null;

            const depth_max = 9;//8

            let fen_test;

            let success = 0;

            let failure = 0;

            let fen_test_stack = [
                  "2q1rr1k/3bbnnp/p2p1pp1/2pPp3/PpP1P1P1/1P2BNNP/2BQ1PRK/7R b - - 0 1",     // 2   0
                  "r3r1k1/ppqb1ppp/8/4p1NQ/8/2P5/PP3PPP/R3R1K1 b - - 0 1",                  // 11  1
                  "rnb2r1k/pp2p2p/2pp2p1/q2P1p2/8/1Pb2NP1/PB2PPBP/R2Q1RK1 w - - 0 1",       // 13  2
                  "2r3k1/1p2q1pp/2b1pr2/p1pp4/6Q1/1P1PP1R1/P1PN2PP/5RK1 w - - 0 1",         // 14  3
                  "3rn2k/ppb2rpp/2ppqp2/5N2/2P1P3/1P5Q/PB3PPP/3RR1K1 w - - 0 1",            // 20  4
                  "r2qnrnk/p2b2b1/1p1p2pp/2pPpp2/1PP1P3/PRNBB3/3QNPPP/5RK1 w - - 0 1",      // 23  5
                  "1k1r4/pp1b1R2/3q2pp/4p3/2B5/4Q3/PPP2B2/2K5 b - - 0 1",                   // 0   6 - id BK.01
                  "1nk1r1r1/pp2n1pp/4p3/q2pPp1N/b1pP1P2/B1P2R2/2P1B1PP/R2Q2K1 w - - 0 1",   // 6   7
                  "2r1nrk1/p2q1ppp/bp1p4/n1pPp3/P1P1P3/2PBB1N1/4QPPP/R4RK1 w - - 0 1",      // 10  8
                  "r1bqkb1r/4npp1/p1p4p/1p1pP1B1/8/1B6/PPPN1PPP/R2Q1RK1 w kq - 0 1",        // 15  9
                  "r2q1rk1/1ppnbppp/p2p1nb1/3Pp3/2P1P1P1/2N2N1P/PPB1QP2/R1B2RK1 b - - 0 1", // 16  10
                  "3rr3/2pq2pk/p2p1pnp/8/2QBPP2/1P6/P5PP/4RRK1 b - - 0 1",                  // 18  11
                  "2r2rk1/1bqnbpp1/1p1ppn1p/pP6/N1P1P3/P2B1N1P/1B2QPP1/R2R2K1 b - - 0 1",   // 21  12
                  "r1b2rk1/2q1b1pp/p2ppn2/1p6/3QP3/1BN1B3/PPP3PP/R4RK1 w - - 0 1",          // 4   13

                  "3r1k2/4npp1/1ppr3p/p6P/P2PPPP1/1NR5/5K2/2R5 w - - 0 1",                  // 1   14 d5 слишком сложный
                  "rnbqkb1r/p3pppp/1p6/2ppP3/3N4/2P5/PPP1QPPP/R1B1KB1R w KQkq - 0 1",       // 3   15 e6 d11 no
                  "2r3k1/pppR1pp1/4p3/4P1P1/5P2/1P4K1/P1P5/8 w - - 0 1",                    // 5   16 g6 d14 no
                  "4b3/p3kp2/6p1/3pP2p/2pP1P2/4K1P1/P3N2P/8 w - - 0 1",                     // 7   17 f5 d13 без нулевого нашел
                  "2kr1bnr/pbpq4/2n1pp2/3p3p/3P1P1B/2N2N1Q/PPP3PP/2KR1B1R w - - 0 1",       // 8   18 f5 не очевидный
                  "3rr1k1/pp3pp1/1qn2np1/8/3p4/PP1R1P2/2P1NQPP/R1B3K1 b - -  0 1",          // 9   19 Ne5  d10 нашел, d11 понял такт 
                  "r2q1rk1/4bppp/p2p4/2pP4/3pP3/3Q4/PP1B1PPP/R3R1K1 w - - 0 1",             // 12  20 b4 не очевидный
                  "r1bq1rk1/pp2ppbp/2np2p1/2n5/P3PP2/N1P2N2/1PB3PP/R1B1QRK1 b - - 0 1",     // 17  21 Nb3 не очевидный
                  "r4k2/pb2bp1r/1p1qp2p/3pNp2/3P1P2/2N3P1/PPP1Q2P/2KRR3 w - - 0 1",         // 19  22 g4 d9 no
                  "r1bqk2r/pp2bppp/2p5/3pP3/P2Q1P2/2N1B3/1PP3PP/R4RK1 b kq - 0 1",          // 22  23 f6 не очевидный
            ];

            let fen_best_move_test_stack = [
                  // pvs d8 OK; lmr d8 -1(13); npm d8 OK; rfp d8 -1(6); all d8 -1(7);  all d10 -1(8,13,+19); 
                  // lmr d9 -1(9); lmr d8 -1(13) ; lmr+npm d9 OK
                  //                             d5ab d8ab  d8
                  "bestmove ♟f6-f5 ", // 2   0  +    +     + f5
                  "bestmove ♝d7-f5 ", // 11  1  +    +     + Bf5
                  "bestmove ♕d1-d2 ", // 13  2  +    +     + Qd2 Qe1 ♕d1-e1
                  "bestmove ♕g4xg7 ", // 14  3  +    +     + Qxg7
                  "bestmove ♘f5-h6 ", // 20  4  +    +     + Nh6
                  "bestmove ♙f2-f4 ", // 23  5  +    +     + f4
                  "bestmove ♛d6-d1 ", // 0   6  -    +     + Qd1+ id BK.01
                  "bestmove ♘h5-f6 ", // 6   7  -    +     + Nf6
                  "bestmove ♙f2-f4 ", // 10  8  -    +     + f4
                  "bestmove ♘d2-e4 ", // 15  9  -    +     + Ne4 
                  "bestmove ♟h7-h5 ", // 16  10 -    +     + h5
                  "bestmove ♜e8xe4 ", // 18  11 -    +     + Rxe4
                  "bestmove ♝b7xe4 ", // 21  12 -    +     + Bxe4
                  "bestmove ♘c3-d5 ", // 4   13 -    +     + Nd5 a4

                  "bestmove ♙d4-d5 ", // 1   14 -    -     - d5  слишком сложный 
                  "bestmove ♙e5-e6 ", // 3   15 -    -     - e6  +
                  "bestmove ♙g5-g6 ", // 5   16 -    -     - g6  +
                  "bestmove ♙f4-f5 ", // 7   17 -    -     - f5  ++
                  "bestmove ♙f4-f5 ", // 8   18 -    -     - f5  + не очевидный
                  "bestmove ♞c6-e5 ", // 9   19 -    -     - Ne5 ++ 
                  "bestmove ♙b2-b4 ", // 12  20 -    -     - b4  + не очевидный 
                  "bestmove ♞c5-b3 ", // 17  21 -    -     - Nb3 + не очевидный
                  "bestmove ♙g3-g4 ", // 19  22 -    -     - g4  +
                  "bestmove ♟f7-f6 ", // 22  23 -    -     - f6  + не очевидный
                  //                             s6   s14 
            ]

            for (let fen_number = 0; fen_number < 24; fen_number++) {

                  fen_test = fen_test_stack[fen_number];

                  return_search_result = searching_iterative_deepening_r(chessEngine_0x88_O, fen_test, depth_max);

                  let best_move = return_search_result.best_move_f;

                  console.log(" ");
                  console.log("===================================================");
                  console.log("bratko_kopec_tests.js -> fen_best_move_test_stack != best_move fen_number = " + fen_number);

                  if ((fen_best_move_test_stack[fen_number] == best_move)
                        || ((fen_number == 2) && (best_move == "bestmove ♕d1-e1 "))                        
                        || ((fen_number == 13) && (best_move == "bestmove ♙a2-a4 "))

                  ) {
                        success = success + 1;
                        console.log(" ");
                        console.log("success = " + success);
                        console.log("SUCCESS");

                        set_board_from_fen_0x88_cb(fen_test, chess_board_0x88_start_from_fen);
                        test_print_piece_0x88_f_cb(chess_board_0x88_start_from_fen);

                        console.log("bratko_kopec_tests.js -> fen_best_move_test_stack[fen_number] = " + fen_best_move_test_stack[fen_number]);
                        console.log("bratko_kopec_tests.js -> best_move = " + best_move);
                        if (fen_number == 13) console.log("bratko_kopec_tests.js -> 2 best_move = " + "bestmove ♙a2-a4 ");                        
                        if (fen_number == 2) console.log("bratko_kopec_tests.js -> 2 best_move = " + "bestmove ♕d1-e1 ");

                  } else {

                        failure = failure + 1;
                        console.log("failure = " + failure);
                        console.log("FAILURE");

                        set_board_from_fen_0x88_cb(fen_test, chess_board_0x88_start_from_fen);
                        test_print_piece_0x88_f_cb(chess_board_0x88_start_from_fen);

                        console.log("bratko_kopec_tests.js -> fen_best_move_test_stack[fen_number] = " + fen_best_move_test_stack[fen_number]);
                        console.log("bratko_kopec_tests.js -> best_move = " + best_move);
                  }
            }
            console.log("failure = " + failure);
            console.log("success = " + success);
      }

}//



export { Tests_B_K }

// 1k1r4/pp1b1R2/3q2pp/4p3/2B5/4Q3/PPP2B2/2K5 b - - bm Qd1+; id "BK.01";
// 3r1k2/4npp1/1ppr3p/p6P/P2PPPP1/1NR5/5K2/2R5 w - - bm d5; id "BK.02";
// 2q1rr1k/3bbnnp/p2p1pp1/2pPp3/PpP1P1P1/1P2BNNP/2BQ1PRK/7R b - - bm f5; id "BK.03";
// rnbqkb1r/p3pppp/1p6/2ppP3/3N4/2P5/PPP1QPPP/R1B1KB1R w KQkq - bm e6; id "BK.04";
// r1b2rk1/2q1b1pp/p2ppn2/1p6/3QP3/1BN1B3/PPP3PP/R4RK1 w - - bm Nd5 a4; id "BK.05";
// 2r3k1/pppR1pp1/4p3/4P1P1/5P2/1P4K1/P1P5/8 w - - bm g6; id "BK.06";
// 1nk1r1r1/pp2n1pp/4p3/q2pPp1N/b1pP1P2/B1P2R2/2P1B1PP/R2Q2K1 w - - bm Nf6; id "BK.07";
// 4b3/p3kp2/6p1/3pP2p/2pP1P2/4K1P1/P3N2P/8 w - - bm f5; id "BK.08";
// 2kr1bnr/pbpq4/2n1pp2/3p3p/3P1P1B/2N2N1Q/PPP3PP/2KR1B1R w - - bm f5; id "BK.09";
// 3rr1k1/pp3pp1/1qn2np1/8/3p4/PP1R1P2/2P1NQPP/R1B3K1 b - - bm Ne5; id "BK.10";
// 2r1nrk1/p2q1ppp/bp1p4/n1pPp3/P1P1P3/2PBB1N1/4QPPP/R4RK1 w - - bm f4; id "BK.11";
// r3r1k1/ppqb1ppp/8/4p1NQ/8/2P5/PP3PPP/R3R1K1 b - - bm Bf5; id "BK.12";
// r2q1rk1/4bppp/p2p4/2pP4/3pP3/3Q4/PP1B1PPP/R3R1K1 w - - bm b4; id "BK.13";
// rnb2r1k/pp2p2p/2pp2p1/q2P1p2/8/1Pb2NP1/PB2PPBP/R2Q1RK1 w - - bm Qd2 Qe1; id "BK.14";
// 2r3k1/1p2q1pp/2b1pr2/p1pp4/6Q1/1P1PP1R1/P1PN2PP/5RK1 w - - bm Qxg7+; id "BK.15";
// r1bqkb1r/4npp1/p1p4p/1p1pP1B1/8/1B6/PPPN1PPP/R2Q1RK1 w kq - bm Ne4; id "BK.16";
// r2q1rk1/1ppnbppp/p2p1nb1/3Pp3/2P1P1P1/2N2N1P/PPB1QP2/R1B2RK1 b - - bm h5; id "BK.17";
// r1bq1rk1/pp2ppbp/2np2p1/2n5/P3PP2/N1P2N2/1PB3PP/R1B1QRK1 b - - bm Nb3; id "BK.18";
// 3rr3/2pq2pk/p2p1pnp/8/2QBPP2/1P6/P5PP/4RRK1 b - - bm Rxe4; id "BK.19";
// r4k2/pb2bp1r/1p1qp2p/3pNp2/3P1P2/2N3P1/PPP1Q2P/2KRR3 w - - bm g4; id "BK.20";
// 3rn2k/ppb2rpp/2ppqp2/5N2/2P1P3/1P5Q/PB3PPP/3RR1K1 w - - bm Nh6; id "BK.21";
// 2r2rk1/1bqnbpp1/1p1ppn1p/pP6/N1P1P3/P2B1N1P/1B2QPP1/R2R2K1 b - - bm Bxe4; id "BK.22";
// r1bqk2r/pp2bppp/2p5/3pP3/P2Q1P2/2N1B3/1PP3PP/R4RK1 b kq - bm f6; id "BK.23";
// r2qnrnk/p2b2b1/1p1p2pp/2pPpp2/1PP1P3/PRNBB3/3QNPPP/5RK1 w - - bm f4; id "BK.24";