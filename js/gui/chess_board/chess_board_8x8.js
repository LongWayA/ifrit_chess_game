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

    static COLOR_NO = -1;
    static BLACK = 0;
    static WHITE = 1;

    static PIECE_NO = 0; // нет фигуры
    static PAWN = 1;     // пешка 
    static KNIGHT = 2;   // конь
    static BISHOP = 3;   // слон
    static ROOK = 4;     // ладья
    static QUEEN = 5;    // ферзь
    static KING = 6;     // король

    squares8x8 = new Array(8);

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

    x_start = 10;
    y_start = 10;

    squares_width = 0;//32
    squares_height = 0;

    constructor() {
        for (let i = 0; i < this.squares8x8.length; i++) {
            this.squares8x8[i] = new Array(8);
        }
    }

    iniM(x_start, y_start, squares_width, squares_height, html5Sprites_O) {

        this.html5Sprites_O = html5Sprites_O;

        this.x_start = x_start;
        this.y_start = y_start;
        this.squares_width = squares_width;
        this.squares_height = squares_height;


        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                this.squares8x8[y][x] = new BoardSquare_C();
            }
        }
        this.iniSquare();
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

    drow() {

        let xx;
        let yy;
        let sp;
        let cs;
        let cp;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                xx = this.x_start + this.squares_width * this.squares8x8[y][x].x_square;
                yy = this.y_start + this.squares_height * this.squares8x8[y][x].y_square;
                sp = this.squares8x8[y][x].square_piece;
                cs = this.squares8x8[y][x].color_square;
                cp = this.squares8x8[y][x].color_piece;
                if (cp == -1) cp = 0;// осбенность графики клеток доски. там только два цвета фигур белые и черные
                                     //и даже где их нет все равно черные, а не -1 как задано в движке для скорости генерации ходов
                //this.html5Sprites_O.drowSprite(cs, cp, sp, xx, yy);
                this.html5Sprites_O.drowSprite(cs, cp, sp, xx, yy, this.squares_width, this.squares_height);
                this.html5Sprites_O.html5Canvas_R.drawText(y, xx, yy, this.html5Sprites_O.html5Canvas_R.ITALIC_20PX_SANS_SERIF,
                    this.html5Sprites_O.html5Canvas_R.WHITE, 1);

            }
        }
    }


    iniSquare() {
        let color = ChessBoard_8x8_C.WHITE;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                this.squares8x8[y][x].color_square = color;
                this.squares8x8[y][x].x_square = x;
                this.squares8x8[y][x].y_square = y;
                color = 1 - color;
            }
            color = 1 - color;
        }

    }

    iniStartPosition() {
        let yy = 0;
        let xx = 0;

        // 0
        yy = 0;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.ROOK;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KNIGHT;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.BISHOP;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.QUEEN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KING;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.BISHOP;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KNIGHT;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.ROOK;
        // 1
        yy = 1;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;

        // 2
        yy = 2;
        xx = 0;



        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        // 3
        yy = 3;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        // 4
        yy = 4;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        // 5
        yy = 5;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        // 6
        yy = 6;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        // 7
        yy = 7;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.ROOK;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KNIGHT;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.BISHOP;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.QUEEN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KING;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.BISHOP;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KNIGHT;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.ROOK;
    }


    iniStartPositionInvert() {
        let yy = 0;
        let xx = 0;

        // 0
        yy = 0;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.ROOK;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KNIGHT;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.BISHOP;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KING;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.QUEEN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.BISHOP;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KNIGHT;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.ROOK;
        // 1
        yy = 1;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.WHITE;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;

        // 2
        yy = 2;
        xx = 0;



        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        // 3
        yy = 3;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        // 4
        yy = 4;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        // 5
        yy = 5;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.COLOR_NO;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PIECE_NO;
        // 6
        yy = 6;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.PAWN;
        // 7
        yy = 7;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.ROOK;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KNIGHT;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.BISHOP;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KING;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.QUEEN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.BISHOP;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.KNIGHT;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = ChessBoard_8x8_C.BLACK;
        this.squares8x8[yy][xx].square_piece = ChessBoard_8x8_C.ROOK;
    }
}
