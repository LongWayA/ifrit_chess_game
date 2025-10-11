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

    one_click_on_squares = 0;
    one_click_on_squares_x = 0;
    one_click_on_squares_y = 0;

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

    //
    clickDown(x, y, draw_O, ifritChessEngine_O) {

        let x_b_n = -1; // номер клетки по х
        let y_b_n = -1; // номер клетки по у

        x_b_n = Math.floor((x - this.x_start) / this.squares_width);
        y_b_n = Math.floor((y - this.y_start) / this.squares_height);

//        console.log("ChessBoard_8x8_C->click(mouseDown) x " + x + " y " + y);
//        console.log("ChessBoard_8x8_C->click(mouseDown) x_b_n " + x_b_n + " y_b_n " + y_b_n);

        if (this.one_click_on_squares == 1) {// это уже второй клик
            if ((x_b_n < 8) && (y_b_n < 8)) {// 
                this.one_click_on_squares = 0;
                // если это второй клик по той же самой клетке то выделение снимаем
                if ((this.one_click_on_squares_x == x_b_n) && (this.one_click_on_squares_y == y_b_n)) {

                    // рисуем доску
                    draw_O.drow_chess_board_8x8(this);

                } else if (ifritChessEngine_O.move_is_legal(this.one_click_on_squares_x,
                    this.one_click_on_squares_y, x_b_n, y_b_n)) { // это второй клик по другой клетке значит делаем ход

                    this.squares_p_8x8[y_b_n][x_b_n] = this.squares_p_8x8[this.one_click_on_squares_y][this.one_click_on_squares_x];
                    this.squares_pc_8x8[y_b_n][x_b_n] = this.squares_pc_8x8[this.one_click_on_squares_y][this.one_click_on_squares_x];
                    this.squares_p_8x8[this.one_click_on_squares_y][this.one_click_on_squares_x] = 0;
                    this.squares_pc_8x8[this.one_click_on_squares_y][this.one_click_on_squares_x] = 0;
                    this.side_to_move = 1 - this.side_to_move;

                    // рисуем доску                    
                    draw_O.drow_chess_board_8x8(this);

                    //console.log("ChessBoard_8x8_C->рисуем квадратик кликнутой клетки хода ");                         
                    // рисуем квадратик кликнутой клетки хода
                    draw_O.draw_rect(this, x_b_n, y_b_n, Html5Canvas_C.GREEN);

                    ifritChessEngine_O.chess_board_0x88_O.ini_0x88_from_8x8(this);
                    ifritChessEngine_O.go();
                } else {
                    // рисуем доску                     
                    draw_O.drow_chess_board_8x8(this);
                }
            }
        } else { // это первый клик
            if ((x_b_n < 8) && (y_b_n < 8) && (this.squares_pc_8x8[y_b_n][x_b_n] == this.side_to_move)
                && (this.squares_p_8x8[y_b_n][x_b_n] != 0)) {//  
                // запоминаем координаты клетки и то что сделали клик
                this.one_click_on_squares = 1;
                this.one_click_on_squares_x = x_b_n;
                this.one_click_on_squares_y = y_b_n;

                // считаем возможные ходы фигуры и рисуем квадратики ходов
                ifritChessEngine_O.draw_rect_move(x_b_n, y_b_n, this, draw_O);

                // рисуем квадратик кликнутой клетки
                draw_O.draw_rect(this, x_b_n, y_b_n, Html5Canvas_C.GREEN);
            }
        }
    }
}
