// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_generator_captures_0x88_test.js
 * @version created 12.06m.2026 
 * 
*/

import {
    set_board_from_fen_0x88_cb,
    BOARD_SIZE_CB, PIECE_NO_CB,
     W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB
} from "./chess_board_0x88.js";

import {
    test_print_list_ml,
    LENGTH_LIST_ML, IND_NUMBER_MOVE_ML,
    MOVE_NO_ML
} from "../move_generator_0x88_t/move_list_0x88.js";

import {
    generated_pseudo_legal_captures_mgc, generated_pseudo_legal_captures_one_piece_for_gui_mgc, check_detected_mgc
} from "./move_generator_captures_0x88.js";

import {
    packing_moves, packing_moves_f
} from "./move_generator_captures_pm_0x88_test.js";


/**
 * НАЗНАЧЕНИЕ
   // Тестируем модуль 
*/

/**
 * Класс.
 * @class
 */
class Move_generator_captures_0x88_TEST_С {


    static NAME = "Move_generator_captures_0x88_TEST_С";


    constructor() {

    }

    iniM() {

    }

    //=======================================================================================
    /*
     * считаем ходы одной фигуры из конкретной позиции. сделал для работы гуи
     * 
    */
    generated_pseudo_legal_captures_one_piece_for_gui_mgc_test() {

        let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);

        let packing_moves_l = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

        let from = 52;// белый конь

        let is_print = 0;

        let fen = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);

        generated_pseudo_legal_captures_one_piece_for_gui_mgc(from, chess_board_0x88, packing_moves_l);

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
     * 
    */
    generated_pseudo_legal_captures_mgc_test() {

        let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);

        let packing_moves_l = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);


        let is_print = 0;

        let fen = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);

        generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves_l);

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

    //=======================================================================================
    /*
     * проверяем детектор шахов
     * 
    */
    check_detected_mgc_test() {

        let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);

        let fen = " ";        

        let from = 0;//

        let piece_color = 0;    
        
        let type_piece = 0;        

        let is_print = 0;

        //-----------------------------------------------------------------------
        // W_KING_CB
        fen = "8/8/8/8/3K1k2/8/8/8 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        from = 52;
        piece_color = 0;  
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != W_KING_CB) console.log("W_KING_CB(6) type_piece = " + type_piece);

        // B_KING_CB
        fen = "8/8/8/8/3K1k2/8/8/8 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        from = 68;
        piece_color = 1; 
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != B_KING_CB) console.log("B_KING_CB(14) type_piece = " + type_piece);
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        // W_KNIGHT_CB
        fen = "8/2N5/1n6/8/8/8/8/4k1K1 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        from = 0;
        piece_color = 0;  
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != W_KNIGHT_CB) console.log("W_KNIGHT_CB(2) type_piece = " + type_piece);

        // B_KNIGHT_CB
        fen = "8/2N5/1n6/8/8/8/8/4k1K1 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        from = 0;
        piece_color = 1; 
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != B_KNIGHT_CB) console.log("B_KNIGHT_CB(10) type_piece = " + type_piece);
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        // W_BISHOP_CB
        fen = "8/8/2BBbb2/8/8/8/8/2K1k3 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        piece_color = 0;  
        from = 0;
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != W_BISHOP_CB) console.log("W W_BISHOP_CB(3) type_piece = " + type_piece);
        from = 1;
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != W_BISHOP_CB) console.log("B W_BISHOP_CB(3) type_piece = " + type_piece);

        // B_BISHOP_CB
        fen = "8/8/2BBbb2/8/8/8/8/2K1k3 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        piece_color = 1; 
        from = 2;
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != B_BISHOP_CB) console.log("W B_BISHOP_CB(11) type_piece = " + type_piece);
        from = 3;
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != B_BISHOP_CB) console.log("B B_BISHOP_CB(11) type_piece = " + type_piece);        
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        // W_ROOK_CB
        fen = "7R/8/8/8/8/8/r7/2K1k3 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        from = 0;
        piece_color = 0;  
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != W_ROOK_CB) console.log("W_ROOK_CB(4) type_piece = " + type_piece);

        // B_ROOK_CB
        fen = "7R/8/8/8/8/8/r7/2K1k3 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        from = 0;
        piece_color = 1; 
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != B_ROOK_CB) console.log("B_ROOK_CB(12) type_piece = " + type_piece);
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        // W_QUEEN_CB
        fen = "8/8/2Q4q/8/8/8/8/4k1K1 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        piece_color = 0;        
        from = 0;  
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != W_QUEEN_CB) console.log("B W_QUEEN_CB(5) type_piece = " + type_piece);
        from = 2;  
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != W_QUEEN_CB) console.log("R W_QUEEN_CB(5) type_piece = " + type_piece);

        // B_QUEEN_CB
        fen = "8/8/2Q4q/8/8/8/8/4k1K1 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        piece_color = 1;        
        from = 5; 
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != B_QUEEN_CB) console.log("B B_QUEEN_CB(13) type_piece = " + type_piece);
        from = 7; 
        type_piece = check_detected_mgc(from, piece_color, chess_board_0x88)
        if(type_piece != B_QUEEN_CB) console.log("R B_QUEEN_CB(13) type_piece = " + type_piece);        
        //-----------------------------------------------------------------------


    }
    //=======================================================================================         


    go() {

        this.generated_pseudo_legal_captures_one_piece_for_gui_mgc_test();
        this.generated_pseudo_legal_captures_mgc_test();
        this.check_detected_mgc_test();
    }


}

export { Move_generator_captures_0x88_TEST_С };