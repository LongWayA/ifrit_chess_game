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

    squares_color_8x8 = null;// цвет клеток
    sq_piece_8x8 = null;// фигуры
    sq_piece_color_8x8 = null;//цвет фигур

    // ВСПОМОГАТЕЛЬНАЯ ИНФОРМАЦИЯ
    // цвет хода 0 - черные 1 - белые
    side_to_move = 1;

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

    x_start = -1;
    y_start = -1;

    squares_width = -1;
    squares_height = -1;

    constructor() {
        // инициируем цвет клеток
        this.squares_color_8x8 = [
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

        this.iniStartPositionForWhite();

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
        // оценка позиции
        this.score = -1;

        this.halfmove_clock = -1;
        this.fullmove_number = -1;
    }


    iniStartPositionForWhite() {

        // раставляем фигуры
        this.sq_piece_8x8 = [
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
        this.sq_piece_color_8x8 = [
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

    iniPosition_0() {

        // раставляем фигуры
        this.sq_piece_8x8 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];

        // инициируем цвет фигур
        this.sq_piece_color_8x8 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    // инициализируем двумерную доску оболочки из одномерной доски движка
    set_8x8_from_0x88(chess_board_0x88_O) {
        //console.log("ini_0x88_from_8x8");
        let i = -1;

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                i = chess_board_0x88_O.x07_y07_to_0x88(x, y);
                this.sq_piece_8x8[y][x] = chess_board_0x88_O.sq_piece_0x88[i];
                this.sq_piece_color_8x8[y][x] = chess_board_0x88_O.sq_piece_color_0x88[i];
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
        // оценка позиции
        this.score = chess_board_0x88_O.score;
    }

    // "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    set_8x8_from_fen(fen, chess_board_0x88_O) {
        console.log('ChessBoard_8x8_C->set_8x8_from_fen');
        let char = "";
        let x = 0;
        let y = 0;
        let void_f = 0;
        let x07_en_passant;
        let y07_en_passant;

        this.side_to_move = -1;

        this.en_passant_yes = -1;
        this.en_passant_target_square = -1;

        // по умолчанию все по нулям
        // рокировка белых в длинную сторону   1/0
        this.castling_Q = 0;
        // рокировка белых в короткую сторону  1/0
        this.castling_K = 0;
        // рокировка черных в длинную сторону  1/0
        this.castling_q = 0;
        // рокировка черных в короткую сторону 1/0
        this.castling_k = 0;

        this.halfmove_clock = -1;
        this.fullmove_number = -1;

        this.iniPosition_0();       

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

            } else if (void_f == 1) {// цвет хода 0 - черные,1 - белые
                if (char == "w") {
                    this.side_to_move = ChessBoard_8x8_C.WHITE;
                } else if (char == "b") {
                    this.side_to_move = ChessBoard_8x8_C.BLACK;
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
                if (char == "-") {
                    this.en_passant_yes = 0;
                    this.en_passant_target_square = 0;
                } else {
                    x07_en_passant = letter_to_x_coordinate(char);
                    y07_en_passant = 8 - Number(fen[i_fen + 1]);
                    this.en_passant_yes = 1;
                    // сразу для доски 0x88 потому что для 8х8 информация все равно не используется
                    this.en_passant_target_square = chess_board_0x88_O.x07_y07_to_0x88(x07_en_passant, y07_en_passant);
                }

            } else if (void_f == 4) {//Halfmove clock: The number of halfmoves since the last capture or pawn advance, 
                // used for the fifty-move rule.(from wikipedia)
                if ((char != "-") && (char != "")) {
                    this.halfmove_clock = Number(char);
                }
            } else if (void_f == 5) {//Fullmove number: The number of the full moves. 
                // It starts at 1 and is incremented after Black's move.(from wikipedia)
                if ((char != "-") && (char != "")) {
                    this.fullmove_number = Number(char);
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

        // смотрим символ из фен строки
        switch (char) {
            //черные фигуры
            case "k":// король
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.KING;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.BLACK;
                break;
            case "q":// ферзь
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.QUEEN;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.BLACK;
                break;
            case "r":// ладья
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.ROOK;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.BLACK;
                break;
            case "b":// слон
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.BISHOP;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.BLACK;
                break;
            case "n":// конь
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.KNIGHT;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.BLACK;
                break;
            case "p":// пешка
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.PAWN;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.BLACK;
                break;

            //белые фигуры
            case "K":// король
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.KING;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.WHITE;
                break;
            case "Q":// ферзь
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.QUEEN;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.WHITE;
                break;
            case "R":// ладья
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.ROOK;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.WHITE;
                break;
            case "B":// слон
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.BISHOP;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.WHITE;
                break;
            case "N":// конь
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.KNIGHT;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.WHITE;
                break;
            case "P":// пешка
                this.sq_piece_8x8[y][x] = ChessBoard_8x8_C.PAWN;
                this.sq_piece_color_8x8[y][x] = ChessBoard_8x8_C.WHITE;
                break;

            // количество пустых клеток   
            default://
                delta_x = Number(char);
        }

        return delta_x;
    }



}
