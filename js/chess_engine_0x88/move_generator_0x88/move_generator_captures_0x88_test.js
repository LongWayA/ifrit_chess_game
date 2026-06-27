// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_generator_captures_0x88_test.js
 * @version created 12.06m.2026 
 * 
*/

import {
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piece_0x88_cb, test_print_piece_color_0x88_cb, test_print_piece_in_line_0x88_cb,
    test_compare_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb,
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    s_0x88_out_of_bounds_cb, get_piece_color_cb, get_piece_type_cb,
    BOARD_SIZE_CB, OUT_OF_BOUNDS_MASK_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB,
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
} from "./chess_board_0x88.js";

import {
    clear_list_ml, add_packing_move_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml, set_color_ml,
    set_number_captures_move_ml, sorting_list_ml, test_compare_list_from_ml, test_print_i_move_list_ml, test_print_list_ml,
    save_list_from_ml, move_is_found_ml, return_i_move_ml, move_to_string_uci_ml, return_type_captures_pawn_promo_ml,
    return_type_simple_move_ml, type_move_to_name_piece_ml, type_move_to_name_piece_f_ml, return_promo_piece_from_type_move_ml,
    set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml, test_print_list_history_ml,
    LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    IND_PROMO_QUEEN_ML, IND_PROMO_ROOK_ML, IND_PROMO_BISHOP_ML, IND_PROMO_KNIGHT_ML,
    MOVE_NO_ML, CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML, CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML, CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML, CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML, CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML, CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML, CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML, CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML, MOVE_PAWN_PROMO_QUEEN_ML, MOVE_PAWN_PROMO_ROOK_ML, MOVE_PAWN_PROMO_BISHOP_ML,
    MOVE_PAWN_PROMO_KNIGHT_ML, CAPTURES_PAWN_QUEEN_ML, CAPTURES_PAWN_ROOK_ML, CAPTURES_PAWN_BISHOP_ML, CAPTURES_PAWN_KNIGHT_ML,
    CAPTURES_KNIGHT_QUEEN_ML, CAPTURES_KNIGHT_ROOK_ML, CAPTURES_BISHOP_QUEEN_ML, CAPTURES_BISHOP_ROOK_ML, CAPTURES_ROOK_QUEEN_ML,
    CAPTURES_KNIGHT_BISHOP_ML, CAPTURES_KNIGHT_KNIGHT_ML, CAPTURES_BISHOP_BISHOP_ML, CAPTURES_BISHOP_KNIGHT_ML, CAPTURES_ROOK_ROOK_ML,
    CAPTURES_QUEEN_QUEEN_ML, CAPTURES_ROOK_BISHOP_ML, CAPTURES_ROOK_KNIGHT_ML, CAPTURES_QUEEN_ROOK_ML, CAPTURES_QUEEN_BISHOP_ML,
    CAPTURES_QUEEN_KNIGHT_ML, CAPTURES_KING_QUEEN_ML, CAPTURES_KING_ROOK_ML, CAPTURES_KING_BISHOP_ML, CAPTURES_KING_KNIGHT_ML,
    CAPTURES_PAWN_PAWN_ML, EP_CAPTURES_ML, CAPTURES_KNIGHT_PAWN_ML, CAPTURES_BISHOP_PAWN_ML, CAPTURES_ROOK_PAWN_ML,
    CAPTURES_QUEEN_PAWN_ML, CAPTURES_KING_PAWN_ML, MOVE_QUEEN_ML, MOVE_ROOK_ML, MOVE_BISHOP_ML, MOVE_KNIGHT_ML, MOVE_KING_ML, MOVE_PAWN_ML,
    MOVE_DOUBLE_PAWN_ML, MOVE_KING_CASTLE_ML, MOVE_KING_QUEEN_CASTLE_ML, TYPE_MOVE_NAME_ML
} from "../move_generator_0x88/move_list_0x88.js";

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
     * считаем ходы одной фигуры из конкретной позиции. сделал для работы гуи
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


    go() {

        this.generated_pseudo_legal_captures_one_piece_for_gui_mgc_test();
        this.generated_pseudo_legal_captures_mgc_test();        

    }


}

export { Move_generator_captures_0x88_TEST_С };