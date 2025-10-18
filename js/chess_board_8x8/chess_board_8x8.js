/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_board_8x8.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

class ChessBoard_8x8_C {

    html5Sprites_O = null;// при инициализации переприсваеваем.
    static NAME = "ChessBoard_C";

    static BLACK = 0;
    static WHITE = 1;

    static PIECE_NO = 0; // нет фигуры
    static PAWN = 1;     // пешка 
    static KNIGHT = 2;   // конь
    static BISHOP = 3;   // слон
    static ROOK = 4;     // ладья
    static QUEEN = 5;    // ферзь
    static KING = 6;     // король

    squares_c_8x8 = null;// цвет клеток
    squares_p_8x8 = null;// фигуры
    squares_pc_8x8 = null;//цвет фигур

    // ВСПОМОГАТЕЛЬНАЯ ИНФОРМАЦИЯ
    // цвет хода 0 - черные 1 - белые
    side_to_move = -1;

    // разрешение взятия на проходе 1/0
    en_passant_yes = -1;

    // координата битого поля
    en_passant_target_square = -1;

    // рокировка белых в длинную сторону   1/0
    castling_Q = -1;

    // рокировка белых в короткую сторону  1/0
    castling_K = -1;

    // рокировка черных в длинную сторону  1/0
    castling_q = -1;

    // рокировка черных в короткую сторону 1/0
    castling_k = -1;

    x_start = -1;
    y_start = -1;

    squares_width = -1;//32
    squares_height = -1;

    constructor() {
        // инициируем цвет клеток
        this.squares_c_8x8 = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
        ];
    }

    iniM(x_start, y_start, squares_width, squares_height) {

        this.x_start = x_start;
        this.y_start = y_start;
        this.squares_width = squares_width;
        this.squares_height = squares_height;

        this.iniStartPosition();

        //this.iniStartPositionInvert();
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
    }


    iniStartPosition() {

        // раставляем фигуры
        this.squares_p_8x8 = [
            [4, 2, 3, 5, 6, 3, 2, 4],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [4, 2, 3, 5, 6, 3, 2, 4],
        ];

        // инициируем цвет фигур
        this.squares_pc_8x8 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
    }

    // инициализируем двумерную доску оболочки из одномерной доски движка
    set_8x8_from_0x88(chess_board_0x88_O) {
        //console.log("ini_0x88_from_8x8");
        let i = -1;

        this.iniStartPosition();
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                i = chess_board_0x88_O.x07_y07_to_0x88(x, y);
                this.squares_p_8x8[y][x] = chess_board_0x88_O.sq_piece_0x88[i];
                this.squares_pc_8x8[y][x] = chess_board_0x88_O.sq_piece_color_0x88[i];
            }
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
    }

}
