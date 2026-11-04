// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name generator_move_quiet_0x88_test.js
 * @version created 03.07m.2026 
 * 
*/

import {
  generated_pseudo_legal_quiet_moves_mgq, generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq
} from "./generator_move_quiet_0x88.js";

import {
    set_board_from_fen_0x88_cb,
    BOARD_SIZE_CB, PIECE_NO_CB,
     W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB
} from "../chess_board_0x88_t/chess_board_0x88.js";

import {
    test_print_list_ml,
    LENGTH_LIST_ML, IND_NUMBER_MOVE_ML,
    MOVE_NO_ML
} from "../move_list_0x88_t/move_list_0x88.js";

import {
    packing_moves, packing_moves_f
} from "./generator_move_quiet_pm_0x88_test.js";

/**
 * НАЗНАЧЕНИЕ
   // Тестируем модуль
*/

/**
 * Класс.
 * @class
 */
class generator_move_quiet_0x88_TEST_С {

 
    static NAME = "generator_move_quiet_0x88_TEST_С";


    constructor() {

    }

    iniM() {
 
    }

    //=======================================================================================
    /*
     * считаем ходы одной фигуры из конкретной позиции. сделал для работы гуи
     * 
    */
    generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq_test() {

        let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);

        let packing_moves_l = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

        let from = 52;// белый конь

        let is_print = 0;

        let fen = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);


        generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq(from, chess_board_0x88, packing_moves_l);

        //
        for (let i = 0; i < packing_moves_l[IND_NUMBER_MOVE_ML]; i++) {

            if (packing_moves[i] != packing_moves_l[i]) {

                is_print = 1;
                console.log("Move_list_0x88_TEST_С -> set_move_after_the_captures_ml_test-> packing_moves[" + i + "] = "
                    + packing_moves[i]);
                console.log("Move_list_0x88_TEST_С -> set_move_after_the_captures_ml_test-> packing_moves_l[" + i + "] = "
                    + packing_moves_l[i]);
            }

        }

        if (is_print == 1) {
            console.log("move list-----------");
            test_print_list_ml(packing_moves_l);
        }
    }
    //======================================================================================= 

    //=======================================================================================
    /*
     * считаем ходы из конкретной позиции.
    */
    generated_pseudo_legal_quiet_moves_mgq_test() {

        let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);

        let packing_moves_l = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);


        let is_print = 0;

        let fen = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);

        generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves_l);

        //
        for (let i = 0; i < packing_moves_l[IND_NUMBER_MOVE_ML]; i++) {

            if (packing_moves_f[i] != packing_moves_l[i]) {

                is_print = 1;
                console.log("Move_list_0x88_TEST_С -> set_move_after_the_captures_ml_test-> packing_moves_f[" + i + "] = "
                    + packing_moves_f[i]);
                console.log("Move_list_0x88_TEST_С -> set_move_after_the_captures_ml_test-> packing_moves_l[" + i + "] = "
                    + packing_moves_l[i]);
            }

        }

        if (is_print == 1) {
            console.log("move list-----------");
            test_print_list_ml(packing_moves_l);
        }

    }
    //======================================================================================= 



    go() {
 
       this.generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq_test();
       this.generated_pseudo_legal_quiet_moves_mgq_test();       

    }


}

export { generator_move_quiet_0x88_TEST_С };