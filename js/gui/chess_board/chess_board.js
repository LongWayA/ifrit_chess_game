/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_board.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

class ChessBoard_8x8_C {

    html5Sprites_O = new Html5Sprites_C();// при инициализации переприсваеваем.
    static NAME = "ChessBoard_C";

    squares8x8 = new Array(8);

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
                //this.html5Sprites_O.drowSprite(cs, cp, sp, xx, yy);
                this.html5Sprites_O.drowSprite(cs, cp, sp, xx, yy, this.squares_width, this.squares_height);
                this.html5Sprites_O.html5Canvas_R.drawText(y, xx, yy, this.html5Sprites_O.html5Canvas_R.ITALIC_20PX_SANS_SERIF, 
                    this.html5Sprites_O.html5Canvas_R.WHITE, 1);

            }
        }
    }


    iniSquare() {
        let color = BoardSquare_C.WHITE;
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
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.ROOK;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KNIGHT;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.BISHOP;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.QUEEN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KING;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.BISHOP;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KNIGHT;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.ROOK;
        // 1
        yy = 1;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;

        // 2
        yy = 2;
        xx = 0;



        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        // 3
        yy = 3;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        // 4
        yy = 4;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        // 5
        yy = 5;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        // 6
        yy = 6;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        // 7
        yy = 7;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.ROOK;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KNIGHT;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.BISHOP;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.QUEEN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KING;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.BISHOP;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KNIGHT;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.ROOK;
    }


    iniStartPositionInvert() {
        let yy = 0;
        let xx = 0;

        // 0
        yy = 0;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.ROOK;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KNIGHT;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.BISHOP;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KING;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.QUEEN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.BISHOP;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KNIGHT;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.ROOK;
        // 1
        yy = 1;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.WHITE;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;

        // 2
        yy = 2;
        xx = 0;



        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        // 3
        yy = 3;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        // 4
        yy = 4;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        // 5
        yy = 5;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PIECE_NO;
        // 6
        yy = 6;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.PAWN;
        // 7
        yy = 7;
        xx = 0;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.ROOK;
        xx = 1;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KNIGHT;
        xx = 2;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.BISHOP;
        xx = 3;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KING;
        xx = 4;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.QUEEN;
        xx = 5;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.BISHOP;
        xx = 6;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.KNIGHT;
        xx = 7;
        this.squares8x8[yy][xx].color_piece = BoardSquare_C.BLACK;
        this.squares8x8[yy][xx].square_piece = BoardSquare_C.ROOK;
    }
}
