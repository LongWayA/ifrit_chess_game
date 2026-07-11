// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_board_0x88_test.js
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

/**
 * НАЗНАЧЕНИЕ
   // Тестируем модуль шахматной доски chess_board_0x88.js
*/

/**
 * Класс.
 * @class
 */
class Сhess_board_0x88_TEST_С {


    static NAME = "Сhess_board_0x88_TEST_С";


    constructor() {

    }

    iniM() {

    }

    //=======================================================================================
    /*
    Функция переводит две координаты доски x,y в одну z
    */
    x07_y07_to_0x88_cb_test() {

        let x_0_7 = 0;
        let y_0_7 = 0;
        let z_0_127 = 0;
        let z_0_127_true = 0;

        // Пробежим 4 граничных случая
        x_0_7 = 0;
        y_0_7 = 0;
        z_0_127_true = 0;

        z_0_127 = x07_y07_to_0x88_cb(x_0_7, y_0_7);
        if (z_0_127 != z_0_127_true) {
            console.log("Сhess_board_0x88_TEST_С -> x07_y07_to_0x88_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: x = " + x_0_7 + " ," + " y = " + y_0_7 + ", z = " +
                z_0_127_true + "; реально z = " + z_0_127);
        }

        x_0_7 = 7;
        y_0_7 = 0;
        z_0_127_true = 7;

        z_0_127 = x07_y07_to_0x88_cb(x_0_7, y_0_7);
        if (z_0_127 != z_0_127_true) {
            console.log("Сhess_board_0x88_TEST_С -> x07_y07_to_0x88_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: x = " + x_0_7 + " ," + " y = " + y_0_7 + ", z = " +
                z_0_127_true + "; реально z = " + z_0_127);
        }

        x_0_7 = 0;
        y_0_7 = 7;
        z_0_127_true = 112;

        z_0_127 = x07_y07_to_0x88_cb(x_0_7, y_0_7);
        if (z_0_127 != z_0_127_true) {
            console.log("Сhess_board_0x88_TEST_С -> x07_y07_to_0x88_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: x = " + x_0_7 + " ," + " y = " + y_0_7 + ", z = " +
                z_0_127_true + "; реально z = " + z_0_127);
        }

        x_0_7 = 7;
        y_0_7 = 7;
        z_0_127_true = 119;

        z_0_127 = x07_y07_to_0x88_cb(x_0_7, y_0_7);
        if (z_0_127 != z_0_127_true) {
            console.log("Сhess_board_0x88_TEST_С -> x07_y07_to_0x88_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: x = " + x_0_7 + " ," + " y = " + y_0_7 + ", z = " +
                z_0_127_true + "; реально z = " + z_0_127);
        }

    }
    //=======================================================================================

    //=======================================================================================    
    /*
        Функция переводит линейную координату доски 128(0x88) в х
        */
    s_0x88_to_x07_cb_test() {

        let z_0_127 = 0;
        let x_0_7 = 0;
        let x_0_7_true = 0;

        // Пробежим 4 граничных случая        
        z_0_127 = 0;
        x_0_7_true = 0;

        x_0_7 = s_0x88_to_x07_cb(z_0_127);
        if (x_0_7 != x_0_7_true) {
            console.log("Сhess_board_0x88_TEST_С -> s_0x88_to_x07_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: z = " + z_0_127 + " ," + " x = " + x_0_7_true + "; реально x = " + x_0_7);
        }

        z_0_127 = 7;
        x_0_7_true = 7;

        x_0_7 = s_0x88_to_x07_cb(z_0_127);
        if (x_0_7 != x_0_7_true) {
            console.log("Сhess_board_0x88_TEST_С -> s_0x88_to_x07_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: z = " + z_0_127 + " ," + " x = " + x_0_7_true + "; реально x = " + x_0_7);
        }

        z_0_127 = 112;
        x_0_7_true = 0;

        x_0_7 = s_0x88_to_x07_cb(z_0_127);
        if (x_0_7 != x_0_7_true) {
            console.log("Сhess_board_0x88_TEST_С -> s_0x88_to_x07_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: z = " + z_0_127 + " ," + " x = " + x_0_7_true + "; реально x = " + x_0_7);
        }

        z_0_127 = 119;
        x_0_7_true = 7;

        x_0_7 = s_0x88_to_x07_cb(z_0_127);
        if (x_0_7 != x_0_7_true) {
            console.log("Сhess_board_0x88_TEST_С -> s_0x88_to_x07_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: z = " + z_0_127 + " ," + " x = " + x_0_7_true + "; реально x = " + x_0_7);
        }
    }
    //=======================================================================================

    //=======================================================================================    
    /*
        Функция переводит линейную координату доски 128(0x88) в y
    */
    s_0x88_to_y07_cb_test() {

        let z_0_127 = 0;
        let y_0_7 = 0;
        let y_0_7_true = 0;

        // Пробежим 4 граничных случая        
        z_0_127 = 0;
        y_0_7_true = 0;

        y_0_7 = s_0x88_to_y07_cb(z_0_127);
        if (y_0_7 != y_0_7_true) {
            console.log("Сhess_board_0x88_TEST_С -> s_0x88_to_y07_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: z = " + z_0_127 + " ," + " y = " + y_0_7_true + "; реально y = " + y_0_7);
        }

        z_0_127 = 7;
        y_0_7_true = 0;

        y_0_7 = s_0x88_to_y07_cb(z_0_127);
        if (y_0_7 != y_0_7_true) {
            console.log("Сhess_board_0x88_TEST_С -> s_0x88_to_y07_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: z = " + z_0_127 + " ," + " y = " + y_0_7_true + "; реально y = " + y_0_7);
        }

        z_0_127 = 112;
        y_0_7_true = 7;

        y_0_7 = s_0x88_to_y07_cb(z_0_127);
        if (y_0_7 != y_0_7_true) {
            console.log("Сhess_board_0x88_TEST_С -> s_0x88_to_y07_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: z = " + z_0_127 + " ," + " y = " + y_0_7_true + "; реально y = " + y_0_7);
        }

        z_0_127 = 119;
        y_0_7_true = 7;

        y_0_7 = s_0x88_to_y07_cb(z_0_127);
        if (y_0_7 != y_0_7_true) {
            console.log("Сhess_board_0x88_TEST_С -> s_0x88_to_y07_cb");
            console.log("Сhess_board_0x88_TEST_С -> Ошибка: z = " + z_0_127 + " ," + " y = " + y_0_7_true + "; реально y = " + y_0_7);
        }
    }
    //=======================================================================================

    //=======================================================================================    
    /*
        Инициализируем позицию из FEN-строки
    */
    set_board_from_fen_0x88_cb_test() {

        let fen = " ";
        let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);
        let chess_board_0x88_true = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);
        let is_test_ok = 0;

        chess_board_0x88_true.set([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88_true[IND_KING_FROM_WHITE_CB] = 0;
        chess_board_0x88_true[IND_KING_FROM_BLACK_CB] = 0;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88_true[SIDE_TO_MOVE_CB] = 0;
        // разрешение взятия на проходе 1/0
        chess_board_0x88_true[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88_true[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_true[IND_CASTLING_Q_CB] = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_true[IND_CASTLING_K_CB] = 0;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_true[IND_CASTLING_q_CB] = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_true[IND_CASTLING_k_CB] = 0;

        chess_board_0x88_true[IND_SCORE_CB] = -1;

        chess_board_0x88_true[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88_true[IND_FULLMOVE_NUMBER_CB] = 0;

        // ================================================================================
        // Initial Position
        // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
        chess_board_0x88_true.set([
        B_ROOK_CB, B_KNIGHT_CB, B_BISHOP_CB, B_QUEEN_CB, B_KING_CB, B_BISHOP_CB, B_KNIGHT_CB, B_ROOK_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        B_PAWN_CB, B_PAWN_CB,   B_PAWN_CB,   B_PAWN_CB,  B_PAWN_CB, B_PAWN_CB,   B_PAWN_CB,   B_PAWN_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        0,         0,           0,           0,          0,         0,           0,           0,         0, 0, 0, 0, 0, 0, 0, 0,
        0,         0,           0,           0,          0,         0,           0,           0,         0, 0, 0, 0, 0, 0, 0, 0,
        0,         0,           0,           0,          0,         0,           0,           0,         0, 0, 0, 0, 0, 0, 0, 0,                
        0,         0,           0,           0,          0,         0,           0,           0,         0, 0, 0, 0, 0, 0, 0, 0,
        W_PAWN_CB, W_PAWN_CB,   W_PAWN_CB,   W_PAWN_CB,  W_PAWN_CB, W_PAWN_CB,   W_PAWN_CB,   W_PAWN_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        W_ROOK_CB, W_KNIGHT_CB, W_BISHOP_CB, W_QUEEN_CB, W_KING_CB, W_BISHOP_CB, W_KNIGHT_CB, W_ROOK_CB, 0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88_true[IND_KING_FROM_WHITE_CB] = 116;
        chess_board_0x88_true[IND_KING_FROM_BLACK_CB] = 4;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88_true[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88_true[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88_true[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_true[IND_CASTLING_Q_CB] = 1;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_true[IND_CASTLING_K_CB] = 1;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_true[IND_CASTLING_q_CB] = 1;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_true[IND_CASTLING_k_CB] = 1;

        chess_board_0x88_true[IND_SCORE_CB] = -1;

        chess_board_0x88_true[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88_true[IND_FULLMOVE_NUMBER_CB] = 1;

        fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        is_test_ok = test_compare_chess_board_0x88_cb(chess_board_0x88_true, chess_board_0x88);
        if (is_test_ok == 0) {
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Initial Position");
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->TRUE");
            test_print_piece_0x88_cb(chess_board_0x88_true);
            test_print_any_0x88_cb(chess_board_0x88_true);
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->FROM FEN");
            test_print_piece_0x88_cb(chess_board_0x88);
            test_print_any_0x88_cb(chess_board_0x88);            
        }
        // ================================================================================

        // ================================================================================
        // Position 2
        // r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1
        
        chess_board_0x88_true.set([
        12, 0,  0, 0, 14, 0,  0,  12, 0, 0, 0, 0, 0, 0, 0, 0,            
        9,  0,  9, 9, 13, 9,  11, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        11, 10, 0, 0, 9,  10, 9,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0, 1, 2,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  9,  0, 0, 1,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  2, 0, 0,  5,  0,  9,  0, 0, 0, 0, 0, 0, 0, 0,
        1,  1,  1, 3, 3,  1,  1,  1,  0, 0, 0, 0, 0, 0, 0, 0,
        4,  0,  0, 0, 6,  0,  0,  4,  0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88_true[IND_KING_FROM_WHITE_CB] = 116;
        chess_board_0x88_true[IND_KING_FROM_BLACK_CB] = 4;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88_true[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88_true[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88_true[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_true[IND_CASTLING_Q_CB] = 1;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_true[IND_CASTLING_K_CB] = 1;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_true[IND_CASTLING_q_CB] = 1;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_true[IND_CASTLING_k_CB] = 1;

        chess_board_0x88_true[IND_SCORE_CB] = -1;

        chess_board_0x88_true[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88_true[IND_FULLMOVE_NUMBER_CB] = 1;

        fen = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        is_test_ok = test_compare_chess_board_0x88_cb(chess_board_0x88_true, chess_board_0x88);
        if (is_test_ok == 0) {
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 2");            
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->TRUE");
            test_print_piece_0x88_cb(chess_board_0x88_true);
            test_print_any_0x88_cb(chess_board_0x88_true);
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->FROM FEN");
            test_print_piece_0x88_cb(chess_board_0x88);
            test_print_any_0x88_cb(chess_board_0x88);            
        }
        // ================================================================================

        // ================================================================================
        // Position 3
        // 8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1

        chess_board_0x88_true.set([
        0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0,  
        0, 0, 9, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0,                  
        0, 0, 0, 9, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        6, 1, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 4, 0, 0, 0, 9, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 1, 0, 1, 0,  0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88_true[IND_KING_FROM_WHITE_CB] = 48;
        chess_board_0x88_true[IND_KING_FROM_BLACK_CB] = 71;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88_true[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88_true[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88_true[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_true[IND_CASTLING_Q_CB] = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_true[IND_CASTLING_K_CB] = 0;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_true[IND_CASTLING_q_CB] = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_true[IND_CASTLING_k_CB] = 0;

        chess_board_0x88_true[IND_SCORE_CB] = -1;

        chess_board_0x88_true[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88_true[IND_FULLMOVE_NUMBER_CB] = 1;

        fen = "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        is_test_ok = test_compare_chess_board_0x88_cb(chess_board_0x88_true, chess_board_0x88);
        if (is_test_ok == 0) {
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 3");            
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->TRUE");
            test_print_piece_0x88_cb(chess_board_0x88_true);
            test_print_any_0x88_cb(chess_board_0x88_true);
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->FROM FEN");
            test_print_piece_0x88_cb(chess_board_0x88);
            test_print_any_0x88_cb(chess_board_0x88);            
        }
        // ================================================================================                 

        // ================================================================================
        // Position 4
        // r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1

        chess_board_0x88_true.set([
        12, 0,  0, 0, 14, 0,  0,  12, 0, 0, 0, 0, 0, 0, 0, 0,  
        1,  9,  9, 9, 0,  9,  9,  9,  0, 0, 0, 0, 0, 0, 0, 0,                  
        0,  11, 0, 0, 0,  10, 11, 2,  0, 0, 0, 0, 0, 0, 0, 0,
        10, 1,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        3,  3,  1, 0, 1,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        13, 0,  0, 0, 0,  2,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 
        1,  9,  0, 1, 0,  0,  1,  1,  0, 0, 0, 0, 0, 0, 0, 0, 
        4,  0,  0, 5, 0,  4,  6,  0,  0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88_true[IND_KING_FROM_WHITE_CB] = 118;
        chess_board_0x88_true[IND_KING_FROM_BLACK_CB] = 4;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88_true[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88_true[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88_true[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_true[IND_CASTLING_Q_CB] = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_true[IND_CASTLING_K_CB] = 0;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_true[IND_CASTLING_q_CB] = 1;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_true[IND_CASTLING_k_CB] = 1;

        chess_board_0x88_true[IND_SCORE_CB] = -1;

        chess_board_0x88_true[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88_true[IND_FULLMOVE_NUMBER_CB] = 1;

        fen = "r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        is_test_ok = test_compare_chess_board_0x88_cb(chess_board_0x88_true, chess_board_0x88);
        if (is_test_ok == 0) {
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 3");            
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->TRUE");
            test_print_piece_0x88_cb(chess_board_0x88_true);
            test_print_any_0x88_cb(chess_board_0x88_true);
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->FROM FEN");
            test_print_piece_0x88_cb(chess_board_0x88);
            test_print_any_0x88_cb(chess_board_0x88);            
        }
        // ================================================================================   

        // ================================================================================
        // Position 5
        // rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8

        chess_board_0x88_true.set([
        12, 10, 11, 13, 0,  14, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0,  
        9,  9,  0,  1,  11, 9,  9, 9,  0, 0, 0, 0, 0, 0, 0, 0,                  
        0,  0,  9,  0,  0,  0,  0, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0,  0,  0, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  3,  0,  0,  0,  0, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0,  0,  0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 
        1,  1,  1,  0,  2,  10, 1, 1,  0, 0, 0, 0, 0, 0, 0, 0, 
        4,  2,  3,  5,  6,  0,  0, 4,  0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88_true[IND_KING_FROM_WHITE_CB] = 116;
        chess_board_0x88_true[IND_KING_FROM_BLACK_CB] = 5;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88_true[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88_true[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88_true[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_true[IND_CASTLING_Q_CB] = 1;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_true[IND_CASTLING_K_CB] = 1;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_true[IND_CASTLING_q_CB] = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_true[IND_CASTLING_k_CB] = 0;

        chess_board_0x88_true[IND_SCORE_CB] = -1;

        chess_board_0x88_true[IND_HALFMOVE_CLOCK_CB] = 1;
        chess_board_0x88_true[IND_FULLMOVE_NUMBER_CB] = 8;

        fen = "rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        is_test_ok = test_compare_chess_board_0x88_cb(chess_board_0x88_true, chess_board_0x88);
        if (is_test_ok == 0) {
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 3");            
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->TRUE");
            test_print_piece_0x88_cb(chess_board_0x88_true);
            test_print_any_0x88_cb(chess_board_0x88_true);
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->FROM FEN");
            test_print_piece_0x88_cb(chess_board_0x88);
            test_print_any_0x88_cb(chess_board_0x88);            
        }
        // ================================================================================ 


        // ================================================================================
        // Position 6
        // r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10

        chess_board_0x88_true.set([
        12, 0, 0,  0, 0,  12, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0,  
        0,  9, 9,  0, 13, 9,  9,  9, 0, 0, 0, 0, 0, 0, 0, 0,                  
        9,  0, 10, 9, 0,  10, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,  0, 11, 0, 9,  0,  3,  0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  3, 0, 1,  0,  11, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,  0,  2, 1, 0,  2,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0,  1,  1, 0, 5,  1,  1,  1, 0, 0, 0, 0, 0, 0, 0, 0, 
        4,  0,  0, 0, 0,  4,  6,  0, 0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88_true[IND_KING_FROM_WHITE_CB] = 118;
        chess_board_0x88_true[IND_KING_FROM_BLACK_CB] = 6;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88_true[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88_true[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88_true[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_true[IND_CASTLING_Q_CB] = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_true[IND_CASTLING_K_CB] = 0;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_true[IND_CASTLING_q_CB] = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_true[IND_CASTLING_k_CB] = 0;

        chess_board_0x88_true[IND_SCORE_CB] = -1;

        chess_board_0x88_true[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88_true[IND_FULLMOVE_NUMBER_CB] = 10;

        fen = "r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10";
        set_board_from_fen_0x88_cb(fen, chess_board_0x88);
        is_test_ok = test_compare_chess_board_0x88_cb(chess_board_0x88_true, chess_board_0x88);
        if (is_test_ok == 0) {
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 3");            
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->TRUE");
            test_print_piece_0x88_cb(chess_board_0x88_true);
            test_print_any_0x88_cb(chess_board_0x88_true);
            console.log("Сhess_board_0x88_TEST_С -> set_board_from_fen_0x88_cb_test->FROM FEN");
            test_print_piece_0x88_cb(chess_board_0x88);
            test_print_any_0x88_cb(chess_board_0x88);            
        }
        // ================================================================================         
    }
    //=======================================================================================


    //=======================================================================================    
    /*
        Генерируем FEN-строку по текущей позиции на доске 0x88
    */
    set_fen_from_0x88_cb_test() {

        let fen = " ";
        let fen_true = " ";        
        let chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(PIECE_NO_CB);

        chess_board_0x88.set([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88[IND_KING_FROM_WHITE_CB] = 0;
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = 0;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88[SIDE_TO_MOVE_CB] = 0;
        // разрешение взятия на проходе 1/0
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88[IND_CASTLING_Q_CB] = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K_CB] = 0;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88[IND_CASTLING_q_CB] = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k_CB] = 0;

        chess_board_0x88[IND_SCORE_CB] = -1;

        chess_board_0x88[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88[IND_FULLMOVE_NUMBER_CB] = 0;

        //=============================================================================
        // Initial Position
        // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
        chess_board_0x88.set([
        B_ROOK_CB, B_KNIGHT_CB, B_BISHOP_CB, B_QUEEN_CB, B_KING_CB, B_BISHOP_CB, B_KNIGHT_CB, B_ROOK_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        B_PAWN_CB, B_PAWN_CB,   B_PAWN_CB,   B_PAWN_CB,  B_PAWN_CB, B_PAWN_CB,   B_PAWN_CB,   B_PAWN_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        0,         0,           0,           0,          0,         0,           0,           0,         0, 0, 0, 0, 0, 0, 0, 0,
        0,         0,           0,           0,          0,         0,           0,           0,         0, 0, 0, 0, 0, 0, 0, 0,
        0,         0,           0,           0,          0,         0,           0,           0,         0, 0, 0, 0, 0, 0, 0, 0,                
        0,         0,           0,           0,          0,         0,           0,           0,         0, 0, 0, 0, 0, 0, 0, 0,
        W_PAWN_CB, W_PAWN_CB,   W_PAWN_CB,   W_PAWN_CB,  W_PAWN_CB, W_PAWN_CB,   W_PAWN_CB,   W_PAWN_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        W_ROOK_CB, W_KNIGHT_CB, W_BISHOP_CB, W_QUEEN_CB, W_KING_CB, W_BISHOP_CB, W_KNIGHT_CB, W_ROOK_CB, 0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88[IND_KING_FROM_WHITE_CB] = 116;
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = 4;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88[IND_CASTLING_Q_CB] = 1;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K_CB] = 1;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88[IND_CASTLING_q_CB] = 1;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k_CB] = 1;

        chess_board_0x88[IND_SCORE_CB] = -1;

        chess_board_0x88[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88[IND_FULLMOVE_NUMBER_CB] = 1;        
        
        fen_true = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

        fen = set_fen_from_0x88_cb(chess_board_0x88);

        if (fen_true != fen) {
            console.log("Сhess_board_0x88_TEST_С -> set_fen_from_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Initial Position");
            console.log("Сhess_board_0x88_TEST_С -> fen_true = " + fen_true);
            console.log("Сhess_board_0x88_TEST_С -> fen      = " + fen);
        }
        //=============================================================================

        //=============================================================================
        // Position 2
        // r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1
        
        chess_board_0x88.set([
        12, 0,  0, 0, 14, 0,  0,  12, 0, 0, 0, 0, 0, 0, 0, 0,            
        9,  0,  9, 9, 13, 9,  11, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        11, 10, 0, 0, 9,  10, 9,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0, 1, 2,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  9,  0, 0, 1,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  2, 0, 0,  5,  0,  9,  0, 0, 0, 0, 0, 0, 0, 0,
        1,  1,  1, 3, 3,  1,  1,  1,  0, 0, 0, 0, 0, 0, 0, 0,
        4,  0,  0, 0, 6,  0,  0,  4,  0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88[IND_KING_FROM_WHITE_CB] = 116;
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = 4;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88[IND_CASTLING_Q_CB] = 1;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K_CB] = 1;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88[IND_CASTLING_q_CB] = 1;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k_CB] = 1;

        chess_board_0x88[IND_SCORE_CB] = -1;

        chess_board_0x88[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88[IND_FULLMOVE_NUMBER_CB] = 1;

        fen_true = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1";

        fen = set_fen_from_0x88_cb(chess_board_0x88);

        if (fen_true != fen) {
            console.log("Сhess_board_0x88_TEST_С -> set_fen_from_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 2");
            console.log("Сhess_board_0x88_TEST_С -> fen_true = " + fen_true);
            console.log("Сhess_board_0x88_TEST_С -> fen      = " + fen);
        }
        //=============================================================================


        //=============================================================================
         // Position 3
        // 8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1

        chess_board_0x88.set([
        0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0,  
        0, 0, 9, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0,                  
        0, 0, 0, 9, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        6, 1, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 4, 0, 0, 0, 9, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 1, 0, 1, 0,  0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88[IND_KING_FROM_WHITE_CB] = 48;
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = 71;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88[IND_CASTLING_Q_CB] = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K_CB] = 0;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88[IND_CASTLING_q_CB] = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k_CB] = 0;

        chess_board_0x88[IND_SCORE_CB] = -1;

        chess_board_0x88[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88[IND_FULLMOVE_NUMBER_CB] = 1;

        fen_true = "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1";

        fen = set_fen_from_0x88_cb(chess_board_0x88);

        if (fen_true != fen) {
            console.log("Сhess_board_0x88_TEST_С -> set_fen_from_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 3");
            console.log("Сhess_board_0x88_TEST_С -> fen_true = " + fen_true);
            console.log("Сhess_board_0x88_TEST_С -> fen      = " + fen);
        }
        //=============================================================================

        //=============================================================================
        // Position 4
        // r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1

        chess_board_0x88.set([
        12, 0,  0, 0, 14, 0,  0,  12, 0, 0, 0, 0, 0, 0, 0, 0,  
        1,  9,  9, 9, 0,  9,  9,  9,  0, 0, 0, 0, 0, 0, 0, 0,                  
        0,  11, 0, 0, 0,  10, 11, 2,  0, 0, 0, 0, 0, 0, 0, 0,
        10, 1,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        3,  3,  1, 0, 1,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        13, 0,  0, 0, 0,  2,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 
        1,  9,  0, 1, 0,  0,  1,  1,  0, 0, 0, 0, 0, 0, 0, 0, 
        4,  0,  0, 5, 0,  4,  6,  0,  0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88[IND_KING_FROM_WHITE_CB] = 118;
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = 4;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88[IND_CASTLING_Q_CB] = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K_CB] = 0;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88[IND_CASTLING_q_CB] = 1;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k_CB] = 1;

        chess_board_0x88[IND_SCORE_CB] = -1;

        chess_board_0x88[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88[IND_FULLMOVE_NUMBER_CB] = 1;

        fen_true = "r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1";

        fen = set_fen_from_0x88_cb(chess_board_0x88);

        if (fen_true != fen) {
            console.log("Сhess_board_0x88_TEST_С -> set_fen_from_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 4");
            console.log("Сhess_board_0x88_TEST_С -> fen_true = " + fen_true);
            console.log("Сhess_board_0x88_TEST_С -> fen      = " + fen);
        }
        //=============================================================================

        //=============================================================================
        // Position 5
        // rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8

        chess_board_0x88.set([
        12, 10, 11, 13, 0,  14, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0,  
        9,  9,  0,  1,  11, 9,  9, 9,  0, 0, 0, 0, 0, 0, 0, 0,                  
        0,  0,  9,  0,  0,  0,  0, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0,  0,  0, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  3,  0,  0,  0,  0, 0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0,  0,  0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 
        1,  1,  1,  0,  2,  10, 1, 1,  0, 0, 0, 0, 0, 0, 0, 0, 
        4,  2,  3,  5,  6,  0,  0, 4,  0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88[IND_KING_FROM_WHITE_CB] = 116;
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = 5;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88[IND_CASTLING_Q_CB] = 1;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K_CB] = 1;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88[IND_CASTLING_q_CB] = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k_CB] = 0;

        chess_board_0x88[IND_SCORE_CB] = -1;

        chess_board_0x88[IND_HALFMOVE_CLOCK_CB] = 1;
        chess_board_0x88[IND_FULLMOVE_NUMBER_CB] = 8;

        fen_true = "rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8";

        fen = set_fen_from_0x88_cb(chess_board_0x88);

        if (fen_true != fen) {
            console.log("Сhess_board_0x88_TEST_С -> set_fen_from_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 5");
            console.log("Сhess_board_0x88_TEST_С -> fen_true = " + fen_true);
            console.log("Сhess_board_0x88_TEST_С -> fen      = " + fen);
        }
        //=============================================================================

        //=============================================================================
        // Position 6
        // r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10

        chess_board_0x88.set([
        12, 0, 0,  0, 0,  12, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0,  
        0,  9, 9,  0, 13, 9,  9,  9, 0, 0, 0, 0, 0, 0, 0, 0,                  
        9,  0, 10, 9, 0,  10, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,  0, 11, 0, 9,  0,  3,  0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  3, 0, 1,  0,  11, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,  0,  2, 1, 0,  2,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0,  1,  1, 0, 5,  1,  1,  1, 0, 0, 0, 0, 0, 0, 0, 0, 
        4,  0,  0, 0, 0,  4,  6,  0, 0, 0, 0, 0, 0, 0, 0, 0
        ]);

        chess_board_0x88[IND_KING_FROM_WHITE_CB] = 118;
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = 6;

        // цвет хода 0 - черные 1 - белые
        chess_board_0x88[SIDE_TO_MOVE_CB] = 1;
        // разрешение взятия на проходе 1/0
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
        // рокировка белых в длинную сторону   1/0
        chess_board_0x88[IND_CASTLING_Q_CB] = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K_CB] = 0;
        // рокировка черных в длинную сторону  1/0
        chess_board_0x88[IND_CASTLING_q_CB] = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k_CB] = 0;

        chess_board_0x88[IND_SCORE_CB] = -1;

        chess_board_0x88[IND_HALFMOVE_CLOCK_CB] = 0;
        chess_board_0x88[IND_FULLMOVE_NUMBER_CB] = 10;

        fen_true = "r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10";
        fen = set_fen_from_0x88_cb(chess_board_0x88);

        if (fen_true != fen) {
            console.log("Сhess_board_0x88_TEST_С -> set_fen_from_0x88_cb_test");
            console.log("Сhess_board_0x88_TEST_С -> Position 6");
            console.log("Сhess_board_0x88_TEST_С -> fen_true = " + fen_true);
            console.log("Сhess_board_0x88_TEST_С -> fen      = " + fen);
        }
        //=============================================================================
    }
    //=======================================================================================


    //=======================================================================================
    go() {

        this.x07_y07_to_0x88_cb_test();// проверяем перевод х у из доски 8х8 в координату одномерной доски 128
        this.s_0x88_to_x07_cb_test();// проверяем перевод координаты одномерной доски 128 в коородинату х двухмерной доски(8х8)
        this.s_0x88_to_y07_cb_test();// проверяем перевод координаты одномерной доски 128 в коородинату у двухмерной доски(8х8)

        this.set_board_from_fen_0x88_cb_test();// проверяем генерацию доски из фена
        this.set_fen_from_0x88_cb_test();// проверяем генерацию фена из доски

    }
    //=======================================================================================

}

export { Сhess_board_0x88_TEST_С };