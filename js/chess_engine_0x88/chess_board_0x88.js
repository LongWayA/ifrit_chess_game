/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_board_0x88.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 * Используем доску 0x88. Размер 128.
 * 0,   1,   2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12,  13,  14,  15,
 * 16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,
 * 32,  33,  34,  35,  36,  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,
 * 48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,
 * 64,  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,  78,  79,
 * 80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,  91,  92,  93,  94,  95,
 * 96,  97,  98,  99,  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
 * 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127
 * 
 * Что бы не делать много работы для проверки выхода за пределы доски
 * делаем только одну операцию проверяем SquareIndex & 0x88 == 0 если
 * равно 0 значит мы на доске, иначе вышли за пределы. 
 * Для этого и нужна такая доска.
 * Например:
 * 7 & 0x88 = 0
 * 8 & 0x88 = 8
 * 10 & 0x88 = 8
 * 18 & 0x88 = 0
 * 
 * Перевод координат доски ху в линейную: 
 * s_0x88 = 16 * y_07 + x_07;
 * И обратно:
 * x_07 = s_0x88 & 7;
 * y_07 = s_0x88 >> 4; // s_0x88 / 16
*/

class Chess_board_0x88_C {

    static NAME = "Chess_board_0x88_C";

    static BLACK = 0;
    static WHITE = 1;

    static PIECE_NO = 0; // нет фигуры
    static PAWN = 1;     // пешка 
    static KNIGHT = 2;   // конь
    static BISHOP = 3;   // слон
    static ROOK = 4;     // ладья
    static QUEEN = 5;    // ферзь
    static KING = 6;     // король

    static PIECE_NAME = [
        "PIECE_NO", "PAWN", "KNIGHT", "BISHOP", "ROOK", "QUEEN", "KING"
    ];

    // letter coordinate
    static LET_COOR = [
        "a", "b", "c", "d", "e", "f", "g", "h"
    ];

    sq_piece_0x88 = new Array(128).fill(-1);// доска 0x88 с фигурами
    sq_piece_color_0x88 = new Array(128).fill(-1);// доска 0x88 с цветом фигур

    // ВСПОМОГАТЕЛЬНАЯ ИНФОРМАЦИЯ
    // цвет хода 0 - черные 1 - белые
    side_to_move = 0;

    // разрешение взятия на проходе 1/0
    en_passant_yes = 0;

    // координата битого поля
    en_passant_target_square = 0;

    // рокировка белых в длинную сторону   1/0
    castling_Q = 1;

    // рокировка белых в короткую сторону  1/0
    castling_K = 1;

    // рокировка черных в длинную сторону  1/0
    castling_q = 1;

    // рокировка черных в короткую сторону 1/0
    castling_k = 1;

    // оценка позиции
    score = -1;

    constructor() {
    }

    iniM() {

        this.iniStartPositionForWhite();

    }

    // переводим координаты х и у в линейную координату доски 128(0x88)
    x07_y07_to_0x88(x07, y07) {//rank07, file07
        let s_0x88 = 16 * y07 + x07;
        return s_0x88;
    }

    // переводим линейную координату доски 128(0x88) в х
    s_0x88_to_x07(s_0x88) {//rank07, file07
        let x07 = s_0x88 & 7;
        return x07;
    }

    // переводим линейную координату доски 128(0x88) в у
    s_0x88_to_y07(s_0x88) {//rank07, file07
        let y07 = s_0x88 >> 4; // s_0x88 / 16    
        return y07;
    }

    // рисуем доску на консоле браузера (для тестирования)
    test_print_any_0x88() {
        console.log("test_print_any_0x88 ****************");
        console.log("side_to_move " + this.side_to_move);
        console.log("en_passant_yes " + this.en_passant_yes);
        console.log("en_passant_target_square " + this.en_passant_target_square);
        console.log("castling_Q " + this.castling_Q);
        console.log("castling_K " + this.castling_K);
        console.log("castling_q " + this.castling_q);
        console.log("castling_k " + this.castling_k);
        console.log("score " + this.score);
        console.log("**************** test_print_any_0x88");
    }


    // рисуем доску на консоле браузера (для тестирования)
    test_print_0x88() {
        console.log("test_print_0x88 ****************");
        let l = 0;// 
        let line = "";//
        // бежим по доске и добавляем в линию фигуры с доски. как достигли 
        // конца доски с фигурами печатаем линию и все по новой
        for (let i = 0; i < 128; i++) {
            if ((i & 136) == 0) {// 136 0x88
                l = 1;
                line = line + "|" + String(this.sq_piece_0x88[i]);
            } else if (l == 1) {
                l = 0;
                console.log(line);
                //console.log( "\n");
                line = "";
            }
        }
        console.log("side_to_move = " + this.side_to_move);
        console.log("score = " + this.score);
        console.log("**************** test_print_0x88");
    }

    // рисуем доску на консоле браузера (для тестирования)
    test_print_0x88_color() {
        console.log("test_print_0x88_color ****************");
        let l = 0;// только один раз должен сработать перевод строки
        let line = "";//

        for (let i = 0; i < 128; i++) {
            if ((i & 136) == 0) {// 136 0x88
                l = 1;
                line = line + "|" + String(this.sq_piece_color_0x88[i]);
            } else if (l == 1) {
                l = 0;
                console.log(line);
                line = "";
            }
        }
        console.log("**************** test_print_0x88_color");
    }

    test_print_0x88_line() {
        console.log("test_print_0x88_line ****************");
        let line = "";//
        for (let i = 0; i < 128; i++) {
            line = line + String(this.sq_piece_0x88[i]) + ",";
        }
        console.log(line);
        console.log("**************** test_print_0x88_line");
    }

    //
    test_compare_chess_board_0x88(chess_board_0x88_O) {

        let is_test_ok = 1;
        //console.log("test_compare_chess_board_0x88****************");
        for (let i = 0; i < 128; i++) {
            if (this.sq_piece_0x88[i] != chess_board_0x88_O.sq_piece_0x88[i]) {
                is_test_ok = 0;
                console.log("this sq_piece_0x88[" + i + "] " + this.sq_piece_0x88[i]);
                console.log("out this.sq_piece_0x88[" + i + "] " + chess_board_0x88_O.sq_piece_0x88[i]);
            };
            if (this.sq_piece_color_0x88[i] != chess_board_0x88_O.sq_piece_color_0x88[i]) {
                is_test_ok = 0;
                console.log("this sq_piece_color_0x88[" + i + "] " + this.sq_piece_color_0x88[i]);
                console.log("out sq_piece_color_0x88[" + i + "] " + chess_board_0x88_O.sq_piece_color_0x88[i]);
            };
        }

        // цвет хода 0 - черные 1 - белые
        if (this.side_to_move != chess_board_0x88_O.side_to_move) {
            is_test_ok = 0;
            console.log("this side_to_move " + this.side_to_move);
            console.log("out side_to_move " + chess_board_0x88_O.side_to_move);
        };
        if (this.en_passant_yes != chess_board_0x88_O.en_passant_yes) {
            is_test_ok = 0;
            console.log("this en_passant_yes " + this.en_passant_yes);
            console.log("out en_passant_yes " + chess_board_0x88_O.en_passant_yes);
        };
        if (this.en_passant_target_square != chess_board_0x88_O.en_passant_target_square) {
            is_test_ok = 0;
            console.log("this en_passant_target_square " + this.en_passant_target_square);
            console.log("out en_passant_target_square " + chess_board_0x88_O.en_passant_target_square);
        };

        if (this.castling_Q != chess_board_0x88_O.castling_Q) {
            is_test_ok = 0;
            console.log("this castling_Q " + this.castling_Q);
            console.log("out castling_Q " + chess_board_0x88_O.castling_Q);
        };
        if (this.castling_K != chess_board_0x88_O.castling_K) {
            is_test_ok = 0;
            console.log("this castling_K " + this.castling_K);
            console.log("out castling_K " + chess_board_0x88_O.castling_K);
        };
        if (this.castling_q != chess_board_0x88_O.castling_q) {
            is_test_ok = 0;
            console.log("this castling_q " + this.castling_q);
            console.log("out castling_q " + chess_board_0x88_O.castling_q);
        };
        if (this.castling_k != chess_board_0x88_O.castling_k) {
            is_test_ok = 0;
            console.log("this castling_k " + this.castling_k);
            console.log("out castling_k " + chess_board_0x88_O.castling_k);
        };
        if (this.score != chess_board_0x88_O.score) {
            is_test_ok = 0;
            console.log("this score " + this.score);
            console.log("out score " + chess_board_0x88_O.score);
        };
        //console.log("**************** test_compare_chess_board_0x88");

        return is_test_ok;
    }


    //
    save_chess_board_0x88(chess_board_0x88_O) {
        //console.log("Make_move_0x88_C->do_undo_moves");
        for (let i = 0; i < 128; i++) {
            this.sq_piece_0x88[i] = chess_board_0x88_O.sq_piece_0x88[i];
            this.sq_piece_color_0x88[i] = chess_board_0x88_O.sq_piece_color_0x88[i];
        }

        // цвет хода 0 - черные 1 - белые
        this.side_to_move = chess_board_0x88_O.side_to_move;
        // разрешение взятия на проходе 1/0
        this.en_passant_yes = chess_board_0x88_O.en_passant_yes;
        // координата битого поля
        this.en_passant_target_square = chess_board_0x88_O.en_passant_target_square;
        // рокировка белых в длинную сторону   1/0
        this.castling_Q = chess_board_0x88_O.castling_Q;
        // рокировка белых в короткую сторону  1/0
        this.castling_K = chess_board_0x88_O.castling_K;
        // рокировка черных в длинную сторону  1/0
        this.castling_q = chess_board_0x88_O.castling_q;
        // рокировка черных в короткую сторону 1/0
        this.castling_k = chess_board_0x88_O.castling_k;
        // оценка позиции
        this.score = chess_board_0x88_O.score;
    }


    // инициализируем одномерную доску движка из двумерной доски оболочки
    set_0x88_from_8x8(chessBoard_8x8_O) {
        //console.log("ini_0x88_from_8x8");
        let i = -1;

        this.iniStartPositionForWhite();
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                i = this.x07_y07_to_0x88(x, y);
                this.sq_piece_0x88[i] = chessBoard_8x8_O.sq_piece_8x8[y][x];
                this.sq_piece_color_0x88[i] = chessBoard_8x8_O.sq_piece_color_8x8[y][x];
            }
        }
        // цвет хода 0 - черные 1 - белые
        this.side_to_move = chessBoard_8x8_O.side_to_move;
        // разрешение взятия на проходе 1/0
        this.en_passant_yes = chessBoard_8x8_O.en_passant_yes;
        // координата битого поля
        this.en_passant_target_square = chessBoard_8x8_O.en_passant_target_square;
        // рокировка белых в длинную сторону   1/0
        this.castling_Q = chessBoard_8x8_O.castling_Q;
        // рокировка белых в короткую сторону  1/0
        this.castling_K = chessBoard_8x8_O.castling_K;
        // рокировка черных в длинную сторону  1/0
        this.castling_q = chessBoard_8x8_O.castling_q;
        // рокировка черных в короткую сторону 1/0
        this.castling_k = chessBoard_8x8_O.castling_k;

        this.score = chessBoard_8x8_O.score;
    }

    searching_king(piece_color) {
        for (let i = 0; i < 128; i++) {
            if ((i & 136) == 0) {// 136 0x88
                if (this.sq_piece_0x88[i] == Chess_board_0x88_C.KING) {
                    if (this.sq_piece_color_0x88[i] == piece_color) {
                        return i;
                    }
                }
            }
        }
        // короля не нашли
        return -1;
    }

    //
    iniStartPositionForWhite() {

        /*
         имя фигуры
         0 - нет фигуры
         1 - пешка 
         2 - конь 
         3 - слон
         4 - ладья 
         5 - ферзь 
         6 - король
        */
        // раставляем фигуры
        this.sq_piece_0x88 = [
            4, 2, 3, 5, 6, 3, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            4, 2, 3, 5, 6, 3, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        // инициируем цвет фигур
        this.sq_piece_color_0x88 = [
            0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1,
            0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
            1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1
        ];

        // цвет хода 0 - черные 1 - белые
        this.side_to_move = 1;
        // разрешение взятия на проходе 1/0
        this.en_passant_yes = 0;
        // координата битого поля
        this.en_passant_target_square = 0;
        // рокировка белых в длинную сторону   1/0
        this.castling_Q = 1;
        // рокировка белых в короткую сторону  1/0
        this.castling_K = 1;
        // рокировка черных в длинную сторону  1/0
        this.castling_q = 1;
        // рокировка черных в короткую сторону 1/0
        this.castling_k = 1;
        // оценка позиции
        this.score = -1;
    }
}