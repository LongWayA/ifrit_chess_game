// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name make_move_0x88_test.js
 * @version created 12.06m.2026 
 * 
*/

import {
    set_board_from_fen_0x88_cb, test_print_piece_0x88_cb,
    BOARD_SIZE_CB, PIECE_NO_CB,
    W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB
} from "../chess_board_0x88_t/chess_board_0x88.js";

import {
    do_moves_mm,
    MOOVE_IS_LEGAL_MM, MOOVE_IS_NOT_LEGAL_CHECK_MM, MOOVE_IS_NOT_LEGAL_CASTLING_MM
} from "./make_move_0x88.js";

import {
    ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
    key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
    key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep_sq_0x88_tk, key_update_QqKk_0x88_tk,
    test_generation_key_64_tk
} from "../../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

/**
 * НАЗНАЧЕНИЕ
   // Тестируем модуль
*/

/**
 * Класс.
 * @class
 */
class Make_move_0x88_TEST_С {


    static NAME = "Make_move_0x88_TEST_С";


    constructor() {

    }

    iniM() {

    }


    //=======================================================================================
    /*
     * 
     * 
    */
    do_moves_mm_test() {

        let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);
        let chess_board_0x88_save = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);

        let chess_board_key_64 = new BigUint64Array(1);
        let chess_board_key_64_1 = new BigUint64Array(1);
        let chess_board_key_64_true = new BigUint64Array(1);
        let type_move = 4218938;
        let from = 96;
        let to = 64;
        let piece_color = 1;
        let is_move_legal = 0;

        ini_random_key_array_64_tk();

        let fen = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);


        //-------------------------------------------------------------
        type_move = 58;// MOVE_DOUBLE_PAWN_ML a2-a4
        from = 96;
        to = 64;
        piece_color = 1;
        chess_board_0x88_save.set(chess_board_0x88);
        set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);
        chess_board_key_64_1[0] = chess_board_key_64[0];
        is_move_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, piece_color);

        set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_true);

        if (is_move_legal != MOOVE_IS_LEGAL_MM) {
        //if (1) {            

            test_print_piece_0x88_cb(chess_board_0x88_save);
            console.log("MOOVE_IS_LEGAL_MM = 1, MOOVE_IS_NOT_LEGAL_CHECK_MM = 0, MOOVE_IS_NOT_LEGAL_CASTLING_MM = 2 ");
            console.log("is_move_legal = " + is_move_legal);
            test_print_piece_0x88_cb(chess_board_0x88);
        }

        if (chess_board_key_64[0] != chess_board_key_64_true[0]) {
        //if (1) {            

            console.log("1 chess_board_key_64_1 = " + chess_board_key_64_1);
            console.log("2 chess_board_key_64 = " + chess_board_key_64);
            console.log("2 chess_board_key_64_true = " + chess_board_key_64_true);            

            test_chess_board_key_64_tk(chess_board_key_64_true, chess_board_key_64);
        }
        //-------------------------------------------------------------

        //-------------------------------------------------------------
        type_move = 55;// MOVE_KNIGHT_ML b6-c4
        from = 33;
        to = 66;
        piece_color = 1;
        chess_board_0x88_save.set(chess_board_0x88);
        set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);
        chess_board_key_64_1[0] = chess_board_key_64[0];
        is_move_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, piece_color);

        set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_true);

        if (is_move_legal != MOOVE_IS_LEGAL_MM) {
        //if (1) {            

            test_print_piece_0x88_cb(chess_board_0x88_save);
            console.log("MOOVE_IS_LEGAL_MM = 1, MOOVE_IS_NOT_LEGAL_CHECK_MM = 0, MOOVE_IS_NOT_LEGAL_CASTLING_MM = 2 ");
            console.log("is_move_legal = " + is_move_legal);
            test_print_piece_0x88_cb(chess_board_0x88);
        }

        if (chess_board_key_64[0] != chess_board_key_64_true[0]) {
        //if (1) {            

            console.log("1 chess_board_key_64_1 = " + chess_board_key_64_1);
            console.log("2 chess_board_key_64 = " + chess_board_key_64);
            console.log("2 chess_board_key_64_true = " + chess_board_key_64_true);            

            test_chess_board_key_64_tk(chess_board_key_64_true, chess_board_key_64);
        }
        //-------------------------------------------------------------


    }
    //======================================================================================= 


    go() {

        this.do_moves_mm_test();

    }


}

export { Make_move_0x88_TEST_С };