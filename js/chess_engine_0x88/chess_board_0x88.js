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

    //The number of halfmoves since the last capture or pawn advance, 
    // used for the fifty-move rule.(from wikipedia)
    halfmove_clock = -1;

    //Fullmove number: The number of the full moves. 
    // It starts at 1 and is incremented after Black's move.(from wikipedia)   
    fullmove_number = -1;

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

    // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    // "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    // SET BOARD инициируем позицию из фена
    set_0x88_from_fen(fen) {
        //console.log('ChessBoard_0x88_C->set_0x88_from_fen');

        let char = "";
        let x = 0;
        let y = 0;
        let void_f = 0;
        let x07_en_passant = -1;
        let y07_en_passant = -1;

        this.side_to_move = -1;

        this.en_passant_yes = -1;
        this.en_passant_target_square = -1;

        this.iniPositionFor_0();

        //console.log('fen.length ' + fen.length);

        // for (let i_fen = 0; fen[i_fen] != undefined ; i_fen++) {            
        for (let i_fen = 0; i_fen < fen.length; i_fen++) {

            char = fen[i_fen];
            //console.log('fen[' + i_fen + '] ' + char);

            if (char == "/") { // переходим на следующую горизонталь шахматной доски
                y = y + 1;
                x = 0;
            } else if (char == " ") {// обрабатываем пробелы. каждый пробел это переход к следующей ступени разбора строки. 
                void_f = void_f + 1;

            } else if (void_f == 0) {// разбираем положение фигур на доске
                x = x + this.char_fen_to_board(char, x, y);
                //console.log('fen[' + i_fen + '] ' + char);
                //console.log('x ' + x + 'y ' + y);


            } else if (void_f == 1) {// цвет хода 0 - черные,1 - белые
                if (char == "w") {
                    this.side_to_move = Chess_board_0x88_C.WHITE;
                } else if (char == "b") {
                    this.side_to_move = Chess_board_0x88_C.BLACK;
                }

            } else if (void_f == 2) {// рокировки
                if (char == "K") { // короткая рокировка белых 
                    this.castling_K = 1;
                } else if (char == "Q") {// длинная рокировка белых
                    this.castling_Q = 1;
                } else if (char == "k") {// короткая рокировка черных
                    this.castling_k = 1;
                } else if (char == "q") {// длинная рокировка черных
                    this.castling_q = 1;
                }

            } else if (void_f == 3) {// взятие на проходе
                console.log('fen[' + i_fen + '] ' + char);

                if (char == "-") {
                    this.en_passant_yes = 0;
                    this.en_passant_target_square = 0;
                } else {
                    // 
                    if (x07_en_passant == -1) {
                        x07_en_passant = this.letter_to_x_coordinate(char);
                    } else {
                        y07_en_passant = 8 - Number(char);
                        this.en_passant_yes = 1;
                        // сразу для доски 0x88 потому что для 8х8 информация все равно не используется
                        this.en_passant_target_square = this.x07_y07_to_0x88(x07_en_passant, y07_en_passant);
                        //console.log('x07_en_passant ' + x07_en_passant);
                        //console.log('y07_en_passant ' + y07_en_passant);
                        //console.log('this.en_passant_target_square ' + this.en_passant_target_square);
                    }
                }

            } else if (void_f == 4) {//Halfmove clock: The number of halfmoves since the last capture or pawn advance, 
                // used for the fifty-move rule.(from wikipedia)
                if ((char != "-") && (char != "")) {
                    //this.halfmove_clock = Number(char);
                }
            } else if (void_f == 5) {//Fullmove number: The number of the full moves. 
                // It starts at 1 and is incremented after Black's move.(from wikipedia)
                if ((char != "-") && (char != "")) {
                    //this.fullmove_number = Number(char);
                }
            }
        }

    }

    // переводим букву в координату
    letter_to_x_coordinate(letter) {
        if (letter == "a") return 0;
        if (letter == "b") return 1;
        if (letter == "c") return 2;
        if (letter == "d") return 3;
        if (letter == "e") return 4;
        if (letter == "f") return 5;
        if (letter == "g") return 6;
        if (letter == "h") return 7;
        return -1;
    }


    //
    char_fen_to_board(char, x, y) {

        let delta_x = 1;
        let z_0x88 = this.x07_y07_to_0x88(x, y);

        // смотрим символ из фен строки
        switch (char) {
            //черные фигуры
            case "k":// король
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.KING;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.BLACK;
                break;
            case "q":// ферзь
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.QUEEN;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.BLACK;
                break;
            case "r":// ладья
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.ROOK;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.BLACK;
                break;
            case "b":// слон
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.BISHOP;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.BLACK;
                break;
            case "n":// конь
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.KNIGHT;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.BLACK;
                break;
            case "p":// пешка
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.PAWN;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.BLACK;
                break;

            //белые фигуры
            case "K":// король
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.KING;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.WHITE;
                break;
            case "Q":// ферзь
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.QUEEN;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.WHITE;
                break;
            case "R":// ладья
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.ROOK;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.WHITE;
                break;
            case "B":// слон
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.BISHOP;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.WHITE;
                break;
            case "N":// конь
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.KNIGHT;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.WHITE;
                break;
            case "P":// пешка
                this.sq_piece_0x88[z_0x88] = Chess_board_0x88_C.PAWN;
                this.sq_piece_color_0x88[z_0x88] = Chess_board_0x88_C.WHITE;
                break;

            // количество пустых клеток   
            default://
                delta_x = Number(char);
        }

        return delta_x;
    }


    // "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    // SET FEN инициируем фен из позиции    
    set_fen_from_0x88() {//
        //console.log('Chess_board_0x88_C->set_fen_from_8x8************************');
        let fen = "";
        let z = 0;
        let i = 0;
        //i = chess_board_0x88_O.x07_y07_to_0x88(x, y);
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {

                z = this.x07_y07_to_0x88(x, y);

                if (this.sq_piece_0x88[z] != Chess_board_0x88_C.PIECE_NO) {
                    if (i == 0) {
                        // фигура есть. символ добавляем 
                        fen = fen + this.fen_piece_to_char(z);
                    } else {
                        fen = fen + i;
                        i = 0;
                        fen = fen + this.fen_piece_to_char(z);
                    }
                } else {
                    i = i + 1;
                }
            }
            if (i != 0) {
                fen = fen + i;
                i = 0;
            }
            if (y != 7) fen = fen + "/";
        }
        fen = fen + " ";
        if (this.side_to_move == Chess_board_0x88_C.WHITE) {
            fen = fen + "w";
        } else {
            fen = fen + "b";
        }
        fen = fen + " ";
        let c = 0;
        if (this.castling_K == 1) {
            c = 1;
            fen = fen + "K";
        }
        if (this.castling_Q == 1) {
            c = 1;
            fen = fen + "Q";
        }
        if (this.castling_k == 1) {
            c = 1;
            fen = fen + "k";
        }
        if (this.castling_q == 1) {
            c = 1;
            fen = fen + "q";
        }
        if (c == 1) {
            fen = fen + " ";
        } else {
            fen = fen + "-";
            fen = fen + " ";
        }

        let yy = 8 - this.s_0x88_to_y07(this.en_passant_target_square);
        if (this.en_passant_yes == 1) {

            fen = fen + Chess_board_0x88_C.LET_COOR[this.s_0x88_to_x07(this.en_passant_target_square)];
            fen = fen + yy;
        } else {
            fen = fen + "-";
        }
        fen = fen + " ";

        return fen;

    }

    //
    fen_piece_to_char(z) {
        let char = "";
        // KING
        if (this.sq_piece_0x88[z] == Chess_board_0x88_C.KING) {
            if (this.sq_piece_color_0x88[z] == Chess_board_0x88_C.BLACK) {
                char = "k";
                return char;
            } else {
                char = "K";
                return char;
            }
        }
        // QUEEN
        if (this.sq_piece_0x88[z] == Chess_board_0x88_C.QUEEN) {
            if (this.sq_piece_color_0x88[z] == Chess_board_0x88_C.BLACK) {
                char = "q";
                return char;
            } else {
                char = "Q";
                return char;
            }
        }
        // ROOK
        if (this.sq_piece_0x88[z] == Chess_board_0x88_C.ROOK) {
            if (this.sq_piece_color_0x88[z] == Chess_board_0x88_C.BLACK) {
                char = "r";
                return char;
            } else {
                char = "R";
                return char;
            }
        }
        // BISHOP
        if (this.sq_piece_0x88[z] == Chess_board_0x88_C.BISHOP) {
            if (this.sq_piece_color_0x88[z] == Chess_board_0x88_C.BLACK) {
                char = "b";
                return char;
            } else {
                char = "B";
                return char;
            }
        }
        // KNIGHT
        if (this.sq_piece_0x88[z] == Chess_board_0x88_C.KNIGHT) {
            if (this.sq_piece_color_0x88[z] == Chess_board_0x88_C.BLACK) {
                char = "n";
                return char;
            } else {
                char = "N";
                return char;
            }
        }
        // PAWN
        if (this.sq_piece_0x88[z] == Chess_board_0x88_C.PAWN) {
            if (this.sq_piece_color_0x88[z] == Chess_board_0x88_C.BLACK) {
                char = "p";
                return char;
            } else {
                char = "P";
                return char;
            }
        }

        return char;
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

    //
    iniPositionFor_0() {

        // раставляем фигуры
        this.sq_piece_0x88 = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        // инициируем цвет фигур
        this.sq_piece_color_0x88 = [
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        ];

        // цвет хода 0 - черные 1 - белые
        this.side_to_move = 0;
        // разрешение взятия на проходе 1/0
        this.en_passant_yes = 0;
        // координата битого поля
        this.en_passant_target_square = 0;
        // рокировка белых в длинную сторону   1/0
        this.castling_Q = 0;
        // рокировка белых в короткую сторону  1/0
        this.castling_K = 0;
        // рокировка черных в длинную сторону  1/0
        this.castling_q = 0;
        // рокировка черных в короткую сторону 1/0
        this.castling_k = 0;
        // оценка позиции
        this.score = -1;
    }
}