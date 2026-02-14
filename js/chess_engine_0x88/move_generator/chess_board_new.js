// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_board_0x88.js
 * @version created 24.01m.2026 
*/

/**
 * НАЗНАЧЕНИЕ
 * 
 * Что бы не делать много работы для проверки выхода за пределы доски
 * делаем только одну операцию проверяем SquareIndex & 0x88 == 0 если
 * равно 0 значит мы на доске, иначе вышли за пределы.
 * * Например: 7 & 0x88 = 0, 8 & 0x88 = 8, 10 & 0x88 = 8, 18 & 0x88 = 0
 * 
 * ИИ от Гугла сказал: "Ваш текущий выбор Int32Array(128) для доски 0x88 — это практически идеал для шахмат на JavaScript."
 * 
 * Uint8Array	Целое 8-бит (без знака)	0 ... 255
 * 
 *  let chess_board_0x88 = new Uint8Array(137).fill(0);// доска 0x88 с фигурами
 * 
 * Имена фигур закодированы цифрами: 
 * 0- нет фигуры, 
 * 1- пешка, 2-конь, 3-слон, 4-ладья,  5-ферзь,  6-король <- белые фигуры 
 * 7- пешка, 8-конь, 9-слон, 10-ладья, 11-ферзь, 12-король <- черные фигуры 
 * 
 * Используем доску 0x88. Размер 128. Это для фигур
 * 0,   1,   2,   3,   4,   5,   6,   7,     8,   9,   10,  11,  12,  13,  14,  15,
 * 16,  17,  18,  19,  20,  21,  22,  23,    24,  25,  26,  27,  28,  29,  30,  31,
 * 32,  33,  34,  35,  36,  37,  38,  39,    40,  41,  42,  43,  44,  45,  46,  47,
 * 48,  49,  50,  51,  52,  53,  54,  55,    56,  57,  58,  59,  60,  61,  62,  63,
 * 64,  65,  66,  67,  68,  69,  70,  71,    72,  73,  74,  75,  76,  77,  78,  79,
 * 80,  81,  82,  83,  84,  85,  86,  87,    88,  89,  90,  91,  92,  93,  94,  95,
 * 96,  97,  98,  99,  100, 101, 102, 103,   104, 105, 106, 107, 108, 109, 110, 111,
 * 112, 113, 114, 115, 116, 117, 118, 119,   120, 121, 122, 123, 124, 125, 126, 127
 * 
 * т.е диапазон от 0 до 127 используем для доски записи фигур. это 128 позиций
 * 
 * диапазон от 128 до 136 используем для вспомогательной информации
 * 
 *  128 это side_to_move, цвет хода 0-1 (0 - черные 1 - белые)
 * 
 *  129 это castling_Q, рокировка белых в длинную сторону 0-1 (0-не возможна 1-возможна)
 *  130 это castling_q, рокировка белых в короткую сторону 0-1
 *  131 это castling_K, рокировка черных в длинную сторону 0-1
 *  132 это castling_k, рокировка черных в короткую сторону 0-1 
 * 
 *  133 это en_passant_yes, разрешение взятия на проходе 0-1 
 *  134 en_passant_target_square, координата битого поля от 0 до 119 
 * 
 *  135 king_from_white, положение белого короля от 0 до 119
 *  136 king_from_black, положение черного короля от 0 до 119
 
 * 
 * Перевод координат доски ху в линейную: 
 * s_0x88 = 16 * y_07 + x_07;
 * И обратно:
 * x_07 = s_0x88 & 7;
 * y_07 = s_0x88 >> 4; // s_0x88 / 16
 * 
 *
*/

//
const BLACK = 0;
const WHITE = 1;

// 
const PIECE_NO = 0; // нет фигуры

// WHITE PIECE
const W_PAWN = 1;     // пешка 
const W_KNIGHT = 2;   // конь
const W_BISHOP = 3;   // слон
const W_ROOK = 4;     // ладья
const W_QUEEN = 5;    // ферзь
const W_KING = 6;     // король

// BLACK PIECE
const B_PAWN = 7;     // пешка 
const B_KNIGHT = 8;   // конь
const B_BISHOP = 9;   // слон
const B_ROOK = 10;     // ладья
const B_QUEEN = 11;    // ферзь
const B_KING = 12;     // король

const PIECE_NAME = [
    "PIECE_NO", "W_PAWN", "W_KNIGHT", "W_BISHOP", "W_ROOK", "W_QUEEN", "W_KING",
    "B_PAWN", "B_KNIGHT", "B_BISHOP", "B_ROOK", "B_QUEEN", "B_KING"
];

const SIDE_TO_MOVE = 128; // положение в массиве цвета хода

const IND_CASTLING_Q = 129; // положение в массиве рокировки белых в длинную сторону 0-1
const IND_CASTLING_q = 130; // положение в массиве рокировки белых в короткую сторону 0-1
const IND_CASTLING_K = 131; // положение в массиве рокировки черных в длинную сторону 0-1
const IND_CASTLING_k = 132; // положение в массиве рокировки черных в короткую сторону 0-1

const IND_EN_PASSANT_YES = 133; // положение в массиве разрешение взятия на проходе 0-1
const IND_EN_PASSANT_TARGET_SQUARE = 134; // положение в массиве координата битого поля от 0 до 119

const IND_KING_FROM_WHITE = 135; // положение в массиве положение белого короля от 0 до 119
const IND_KING_FROM_BLACK = 136; // положение в массиве положение черного короля от 0 до 119

const IND_MAX = 137;

// нужно для взятия на проходе при перевода позиции в фен
const LET_COOR = [
    "a", "b", "c", "d", "e", "f", "g", "h"
];

// перевод 64 позиций в 127
const SQUARE_64_to_128_CB = [
    0, 1, 2, 3, 4, 5, 6, 7,
    16, 17, 18, 19, 20, 21, 22, 23,
    32, 33, 34, 35, 36, 37, 38, 39,
    48, 49, 50, 51, 52, 53, 54, 55,
    64, 65, 66, 67, 68, 69, 70, 71,
    80, 81, 82, 83, 84, 85, 86, 87,
    96, 97, 98, 99, 100, 101, 102, 103,
    112, 113, 114, 115, 116, 117, 118, 119
];

// перевод 128 позиции в 64
const SQUARE_128_to_64_CB = [
    0, 1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
    8, 9, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0,
    16, 17, 18, 19, 20, 21, 22, 23, 0, 0, 0, 0, 0, 0, 0, 0,
    24, 25, 26, 27, 28, 29, 30, 31, 0, 0, 0, 0, 0, 0, 0, 0,
    32, 33, 34, 35, 36, 37, 38, 39, 0, 0, 0, 0, 0, 0, 0, 0,
    40, 41, 42, 43, 44, 45, 46, 47, 0, 0, 0, 0, 0, 0, 0, 0,
    48, 49, 50, 51, 52, 53, 54, 55, 0, 0, 0, 0, 0, 0, 0, 0,
    56, 57, 58, 59, 60, 61, 62, 63, 0, 0, 0, 0, 0, 0, 0, 0
];

/**
* переводим координаты х и у в линейную координату доски 128(0x88)
* @param {number} x07
* @param {number} y07
* @returns {number}
*/
const x07_y07_to_0x88 = function (x07, y07) {//rank07, file07
    let s_0x88 = 16 * y07 + x07;
    return s_0x88;
}

/**
* переводим линейную координату доски 128(0x88) в х
* @param {number} s_0x88
* @returns {number}
*/
const s_0x88_to_x07 = function (s_0x88) {//rank07, file07
    let x07 = s_0x88 & 7;
    return x07;
}

/** 
 * переводим линейную координату доски 128(0x88) в у
* @param {number} s_0x88
* @returns {number}
*/
const s_0x88_to_y07 = function (s_0x88) {//rank07, file07
    let y07 = s_0x88 >> 4; // s_0x88 / 16    
    return y07;
}

// TEST==================================================================================
/**
* выводим дополнительную информацию по позиции на консоль браузера (для тестирования)
* @param {Uint8Array} chess_board_0x88
* @returns {void}
*/
const test_print_any_0x88 = function (chess_board_0x88) {
    console.log("test_print_any_0x88 ****************");
    console.log("side_to_move " + chess_board_0x88[SIDE_TO_MOVE]);
    console.log("en_passant_yes " + chess_board_0x88[IND_EN_PASSANT_YES]);
    console.log("en_passant_target_square " + chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE]);
    console.log("castling_Q " + chess_board_0x88[IND_CASTLING_Q]);
    console.log("castling_q " + chess_board_0x88[IND_CASTLING_q]);
    console.log("castling_K " + chess_board_0x88[IND_CASTLING_K]);
    console.log("castling_k " + chess_board_0x88[IND_CASTLING_k]);
    console.log("king_from_white " + chess_board_0x88[IND_KING_FROM_WHITE]);
    console.log("king_from_black " + chess_board_0x88[IND_KING_FROM_BLACK]);
    console.log("**************** test_print_any_0x88");
}

/**
* печатаем имена фигур на позиции в консоле браузера (для тестирования)
* @param {Uint8Array} chess_board_0x88
* @returns {void}
*/
const test_print_piese_0x88 = function (chess_board_0x88) {
    console.log("test_print_piese_0x88 ****************");
    let l = 0;// 
    let line = "";//
    // бежим по доске и добавляем в линию фигуры с доски. как достигли 
    // конца доски с фигурами печатаем линию и все по новой
    for (let i = 0; i < 128; i++) {
        if ((i & 136) == 0) {// 136 0x88
            l = 1;
            line = line + "|" + String(chess_board_0x88[i]);
        } else if (l == 1) {
            l = 0;
            console.log(line);
            //console.log( "\n");
            line = "";
        }
    }
    console.log("side_to_move = " + chess_board_0x88[SIDE_TO_MOVE]);
    console.log("**************** test_print_0x88");
}

/**
* печатаем цвета фигур на позиции в консоле браузера (для тестирования)
* @param {Uint8Array} chess_board_0x88
* @returns {void}
*/
const test_print_piese_color_0x88 = function (chess_board_0x88) {
    console.log("test_print_0x88_color ****************");
    let l = 0;// только один раз должен сработать перевод строки
    let line = "";//
    let color = 0;

    for (let i = 0; i < 128; i++) {
        if ((i & 136) == 0) {// 136 0x88
            l = 1;

            // если имя фигуры больше 6 то это черная фигура так как они 7-черная пешка, и т.д.
            color = (chess_board_0x88[i] > W_KING) ? BLACK : WHITE;

            line = line + "|" + String(color);
        } else if (l == 1) {
            l = 0;
            console.log(line);
            line = "";
        }
    }
    console.log("**************** test_print_0x88_color");
}

/**
* выводим позицию в одну линию на консоль браузера (для тестирования)
* @param {Uint8Array} chess_board_0x88
* @returns {void}
*/
const test_print_piese_in_line_0x88 = function (chess_board_0x88) {
    console.log("test_print_0x88_line ****************");
    let line = "";//
    for (let i = 0; i < 128; i++) {
        if ((i & 136) == 0) {// 136 0x88       
            line = line + String(chess_board_0x88[i]) + ",";
        }
    }
    console.log(line);
    console.log("**************** test_print_0x88_line");
}

// проверяем совпадение двух позиций. нужно для тестирования
/**
* @param {Uint8Array} chess_board_0x88_original
* @param {Uint8Array} chess_board_0x88
* @returns {number}
*/
const test_compare_chess_board_0x88 = function (chess_board_0x88_original, chess_board_0x88) {

    let is_test_ok = 1;
    //console.log("test_compare_chess_board_0x88****************");
    for (let i = 0; i < 128; i++) {
        if (chess_board_0x88_original[i] != chess_board_0x88[i]) {
            is_test_ok = 0;
            console.log("this piece chess_board_0x88_original[" + i + "] " + chess_board_0x88_original[i]);
            console.log("out piece chess_board_0x88[" + i + "] " + chess_board_0x88[i]);
        };
    }

    // цвет хода 0 - черные 1 - белые
    if (chess_board_0x88_original[SIDE_TO_MOVE] != chess_board_0x88[SIDE_TO_MOVE]) {
        is_test_ok = 0;
        console.log("this side_to_move original" + chess_board_0x88_original[SIDE_TO_MOVE]);
        console.log("out side_to_move " + chess_board_0x88[SIDE_TO_MOVE]);
    };
    if (chess_board_0x88_original[IND_EN_PASSANT_YES] != chess_board_0x88[IND_EN_PASSANT_YES]) {
        is_test_ok = 0;
        console.log("this en_passant_yes original" + chess_board_0x88_original[IND_EN_PASSANT_YES]);
        console.log("out en_passant_yes " + chess_board_0x88[IND_EN_PASSANT_YES]);
    };

    if (chess_board_0x88_original[IND_EN_PASSANT_YES] == 1) {
        if (chess_board_0x88_original[IND_EN_PASSANT_TARGET_SQUARE] != chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE]) {
            is_test_ok = 0;
            console.log("this en_passant_target_square original" + chess_board_0x88_original[IND_EN_PASSANT_TARGET_SQUARE]);
            console.log("out en_passant_target_square " + chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE]);
        };
    };

    if (chess_board_0x88_original[IND_CASTLING_Q] != chess_board_0x88[IND_CASTLING_Q]) {
        is_test_ok = 0;
        console.log("this castling_Q original" + chess_board_0x88_original[IND_CASTLING_Q]);
        console.log("out castling_Q " + chess_board_0x88[IND_CASTLING_Q]);
    };
    if (chess_board_0x88_original[IND_CASTLING_K] != chess_board_0x88[IND_CASTLING_K]) {
        is_test_ok = 0;
        console.log("this castling_K " + chess_board_0x88_original[IND_CASTLING_K]);
        console.log("out castling_K " + chess_board_0x88[IND_CASTLING_K]);
    };
    if (chess_board_0x88_original[IND_CASTLING_q] != chess_board_0x88[IND_CASTLING_q]) {
        is_test_ok = 0;
        console.log("this castling_q original" + chess_board_0x88_original[IND_CASTLING_q]);
        console.log("out castling_q " + chess_board_0x88[IND_CASTLING_q]);
    };
    if (chess_board_0x88_original[IND_CASTLING_k] != chess_board_0x88[IND_CASTLING_k]) {
        is_test_ok = 0;
        console.log("this castling_k original" + chess_board_0x88_original[IND_CASTLING_k]);
        console.log("out castling_k " + chess_board_0x88[IND_CASTLING_k]);
    };
    if (chess_board_0x88_original[IND_KING_FROM_WHITE] != chess_board_0x88[IND_KING_FROM_WHITE]) {
        is_test_ok = 0;
        console.log("this king_from_white original" + chess_board_0x88_original[IND_KING_FROM_WHITE]);
        console.log("out king_from_white " + chess_board_0x88[IND_KING_FROM_WHITE]);
    };
    if (chess_board_0x88_original[IND_KING_FROM_BLACK] != chess_board_0x88[IND_KING_FROM_BLACK]) {
        is_test_ok = 0;
        console.log("this king_from_black original" + chess_board_0x88_original[IND_KING_FROM_BLACK]);
        console.log("out king_from_black " + chess_board_0x88[IND_KING_FROM_BLACK]);
    };

    //console.log("**************** test_compare_chess_board_0x88");

    return is_test_ok;
}
// ==================================================================================TEST


// 
/**
* записываем одну позицию в другую (копируем массив и вспомогательную информацию)
* @param {Uint8Array} chess_board_0x88_to
* @param {Uint8Array} chess_board_0x88_from
* @returns {void}
*/
const save_chess_board_0x88 = function (chess_board_0x88_to, chess_board_0x88_from) {
    //console.log("Make_move_0x88_C->do_undo_moves");
    for (let i = 0; i < 128; i++) {
        chess_board_0x88_to[i] = chess_board_0x88_from[i];
    }

    chess_board_0x88_to[IND_KING_FROM_WHITE] = chess_board_0x88_from[IND_KING_FROM_WHITE];
    chess_board_0x88_to[IND_KING_FROM_BLACK] = chess_board_0x88_from[IND_KING_FROM_BLACK];

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88_to[SIDE_TO_MOVE] = chess_board_0x88_from[SIDE_TO_MOVE];
    // разрешение взятия на проходе 1/0
    chess_board_0x88_to[IND_EN_PASSANT_YES] = chess_board_0x88_from[IND_EN_PASSANT_YES];
    // координата битого поля
    chess_board_0x88_to[IND_EN_PASSANT_TARGET_SQUARE] = chess_board_0x88_from[IND_EN_PASSANT_TARGET_SQUARE];
    // рокировка белых в длинную сторону   1/0
    chess_board_0x88_to[IND_CASTLING_Q] = chess_board_0x88_from[IND_CASTLING_Q];
    // рокировка белых в короткую сторону  1/0
    chess_board_0x88_to[IND_CASTLING_K] = chess_board_0x88_from[IND_CASTLING_K];
    // рокировка черных в длинную сторону  1/0
    chess_board_0x88_to[IND_CASTLING_q] = chess_board_0x88_from[IND_CASTLING_q];
    // рокировка черных в короткую сторону 1/0
    chess_board_0x88_to[IND_CASTLING_k] = chess_board_0x88_from[IND_CASTLING_k];
}

// https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
// "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
// инициируем позицию из фена
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {string} fen 
 * @returns {void}
*/
const set_board_from_fen_0x88 = function (fen, chess_board_0x88) {
    //console.log('ChessBoard_0x88_C->set_0x88_from_fen');

    let char = "";
    let x = 0;
    let y = 0;
    let void_f = 0;
    let x07_en_passant = -1;
    let y07_en_passant = -1;

    iniPositionFor_0(chess_board_0x88);

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
            x = x + char_fen_to_board(char, x, y, chess_board_0x88);
            //console.log('fen[' + i_fen + '] ' + char);
            //console.log('x ' + x + 'y ' + y);


        } else if (void_f == 1) {// цвет хода 0 - черные,1 - белые
            if (char == "w") {
                chess_board_0x88[SIDE_TO_MOVE] = WHITE;
            } else if (char == "b") {
                chess_board_0x88[SIDE_TO_MOVE] = BLACK;
            }

        } else if (void_f == 2) {// рокировки
            if (char == "K") { // короткая рокировка белых 
                chess_board_0x88[IND_CASTLING_K] = 1;
            } else if (char == "Q") {// длинная рокировка белых
                chess_board_0x88[IND_CASTLING_Q] = 1;
            } else if (char == "k") {// короткая рокировка черных
                chess_board_0x88[IND_CASTLING_k] = 1;
            } else if (char == "q") {// длинная рокировка черных
                chess_board_0x88[IND_CASTLING_q] = 1;
            }

        } else if (void_f == 3) {// взятие на проходе
            //console.log('fen[' + i_fen + '] ' + char);

            if (char == "-") {
                chess_board_0x88[IND_EN_PASSANT_YES] = 0;
                chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = 0;
            } else {
                // 
                if (x07_en_passant == -1) {
                    x07_en_passant = letter_to_x_coordinate(char);
                } else {
                    y07_en_passant = 8 - Number(char);
                    chess_board_0x88[IND_EN_PASSANT_YES] = 1;
                    // 
                    chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = x07_y07_to_0x88(x07_en_passant, y07_en_passant);
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
    //console.log("ChessBoard_0x88_C set_0x88_from_fen king_from_white = " + this.king_from_white);
    //console.log("ChessBoard_0x88_C set_0x88_from_fen king_from_white = " + this.king_from_white);
}

// переводим букву в координату
/**
 * @param {string} letter
 * @returns {number}
*/
const letter_to_x_coordinate = function (letter) {
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


// по букве из фена ставим фигуру на позицию. 
// если вместо буквы цифра то перводим ее в количество пустых клеток 
// так сделано потому что запись фена вида /1p6/8/
/**
 * @param {string} char
 * @param {number} x
 * @param {number} y 
 * @param {Uint8Array} chess_board_0x88 
 * @returns {number}
*/
const char_fen_to_board = function (char, x, y, chess_board_0x88) {

    let delta_x = 1;
    let z_0x88 = x07_y07_to_0x88(x, y);

    // смотрим символ из фен строки
    switch (char) {
        //черные фигуры
        case "k":// король
            chess_board_0x88[z_0x88] = B_KING;
            chess_board_0x88[IND_KING_FROM_BLACK] = z_0x88;
            break;
        case "q":// ферзь
            chess_board_0x88[z_0x88] = B_QUEEN;
            break;
        case "r":// ладья
            chess_board_0x88[z_0x88] = B_ROOK;
            break;
        case "b":// слон
            chess_board_0x88[z_0x88] = B_BISHOP;
            break;
        case "n":// конь
            chess_board_0x88[z_0x88] = B_KNIGHT;
            break;
        case "p":// пешка
            chess_board_0x88[z_0x88] = B_PAWN;
            break;

        //белые фигуры
        case "K":// король
            chess_board_0x88[z_0x88] = W_KING;
            chess_board_0x88[IND_KING_FROM_WHITE] = z_0x88;
            break;
        case "Q":// ферзь
            chess_board_0x88[z_0x88] = W_QUEEN;
            break;
        case "R":// ладья
            chess_board_0x88[z_0x88] = W_ROOK;
            break;
        case "B":// слон
            chess_board_0x88[z_0x88] = W_BISHOP;
            break;
        case "N":// конь
            chess_board_0x88[z_0x88] = W_KNIGHT;
            break;
        case "P":// пешка
            chess_board_0x88[z_0x88] = W_PAWN;
            break;

        // количество пустых клеток   
        default://
            delta_x = Number(char);
    }

    return delta_x;
}


// "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
/**
 * пишем фен по позиции
* @param {Uint8Array} chess_board_0x88 
* @returns {string}
*/
const set_fen_from_0x88 = function (chess_board_0x88) {//
    //console.log('Chess_board_0x88_C->set_fen_from_8x8************************');
    let z = 0;
    let i = 0;
    let fen = "";
    //i = chess_board_0x88_O.x07_y07_to_0x88(x, y);
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            // перводим координаты х,у в координату одномерного массива
            z = x07_y07_to_0x88(x, y);

            if (chess_board_0x88[z] != PIECE_NO) {
                if (i == 0) {
                    // фигура есть. символ добавляем 
                    fen = fen + fen_piece_to_char(chess_board_0x88, z);
                } else {
                    fen = fen + i;
                    i = 0;
                    fen = fen + fen_piece_to_char(chess_board_0x88, z);
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

    // цвет хода
    if (chess_board_0x88[SIDE_TO_MOVE] == WHITE) {
        fen = fen + "w";
    } else {
        fen = fen + "b";
    }
    fen = fen + " ";
    let c = 0;
    // разрешения на рокировки. в данном случае короткая для белых
    if (chess_board_0x88[IND_CASTLING_K] == 1) {
        c = 1;
        fen = fen + "K";
    }
    //длинная для белых
    if (chess_board_0x88[IND_CASTLING_Q] == 1) {
        c = 1;
        fen = fen + "Q";
    }
    // короткая для черных
    if (chess_board_0x88[IND_CASTLING_k] == 1) {
        c = 1;
        fen = fen + "k";
    }
    // длинная для черных
    if (chess_board_0x88[IND_CASTLING_q] == 1) {
        c = 1;
        fen = fen + "q";
    }
    // случай когда рокировк одна или нет разрешенных
    if (c == 1) {
        fen = fen + " ";
    } else {
        fen = fen + "-";
        fen = fen + " ";
    }
    // взятие на проходе. пишем вида a3
    let yy = 8 - s_0x88_to_y07(chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE]);
    if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {

        fen = fen + LET_COOR[s_0x88_to_x07(chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE])];
        fen = fen + yy;
    } else {
        fen = fen + "-";
    }
    fen = fen + " ";

    return fen;

}

// первод имени фигуры в виде цифры в букву для фена
/**
* @param {Uint8Array} chess_board_0x88
* @param {number} z 
* @returns {string}
*/
const fen_piece_to_char = function (chess_board_0x88, z) {
    let char = "";
    // KING
    if (chess_board_0x88[z] == W_KING) {
        char = "K";
        return char;
    }
    if (chess_board_0x88[z] == B_KING) {
        char = "k";
        return char;
    }

    // QUEEN
     if (chess_board_0x88[z] == W_QUEEN) {
        char = "Q";
        return char;
    }
    if (chess_board_0x88[z] == B_QUEEN) {
        char = "q";
        return char;
    }

    // ROOK
    if (chess_board_0x88[z] == W_ROOK) {
        char = "R";
        return char;
    }
    if (chess_board_0x88[z] == B_ROOK) {
        char = "r";
        return char;
    }

    // BISHOP
    if (chess_board_0x88[z] == W_BISHOP) {
        char = "B";
        return char;
    }
    if (chess_board_0x88[z] == B_BISHOP) {
        char = "b";
        return char;
    }

    // KNIGHT
    if (chess_board_0x88[z] == W_KNIGHT) {
        char = "N";
        return char;
    }
    if (chess_board_0x88[z] == B_KNIGHT) {
        char = "n";
        return char;
    }

    // PAWN
    if (chess_board_0x88[z] == W_PAWN) {
        char = "P";
        return char;
    }
    if (chess_board_0x88[z] == B_PAWN) {
        char = "p";
        return char;
    }

    return char;
}

// ищем короля заданного цвета. нужно для обнаружения шаха
/**
 * @param {Uint8Array} chess_board_0x88 
 * @param {number} piece_color
 * @returns {number}
*/
const searching_king = function (chess_board_0x88, piece_color) {

    for (let i = 0; i < 128; i++) {
        if ((i & 136) == 0) {// 136 0x88
            if (chess_board_0x88[i] == W_KING) {
                if (piece_color == 1) {
                    return i;
                }
            }
            if (chess_board_0x88[i] == B_KING) {
                if (piece_color == 0) {
                    return i;
                }
            }            
        }
    }
    // короля не нашли
    return -1;
}

// стартовая позиция
/**
 * @param {Uint8Array} chess_board_0x88 
 * @returns {void}
*/
const iniStartPositionForWhite = function (chess_board_0x88) {

// 0- нет фигуры, 
// 1- пешка, 2-конь, 3-слон, 4-ладья,  5-ферзь,  6-король <- белые фигуры 
// 7- пешка, 8-конь, 9-слон, 10-ладья, 11-ферзь, 12-король <- черные фигуры 

    // раставляем фигуры
    chess_board_0x88.set([
        10, 8, 9, 11, 12, 9, 8, 10, 0, 0, 0, 0, 0, 0, 0, 0,
        7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        4, 2, 3, 5, 6, 3, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0
    ]);

    chess_board_0x88[IND_KING_FROM_WHITE] = 116;
    chess_board_0x88[IND_KING_FROM_BLACK] = 4;

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE] = 1;
    // разрешение взятия на проходе 1/0
    chess_board_0x88[IND_EN_PASSANT_YES] = 0;
    // координата битого поля
    chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = 0;
    // рокировка белых в длинную сторону   1/0
    chess_board_0x88[IND_CASTLING_Q] = 1;
    // рокировка белых в короткую сторону  1/0
    chess_board_0x88[IND_CASTLING_K] = 1;
    // рокировка черных в длинную сторону  1/0
    chess_board_0x88[IND_CASTLING_q] = 1;
    // рокировка черных в короткую сторону 1/0
    chess_board_0x88[IND_CASTLING_k] = 1;
}

// нулевая позиция. нужна когда мы раставляем фигуры по фену
/**
 * @param {Uint8Array} chess_board_0x88 
 * @returns {void}
*/
const iniPositionFor_0 = function (chess_board_0x88) {

    // раставляем фигуры
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

    chess_board_0x88[IND_KING_FROM_WHITE] = 0;
    chess_board_0x88[IND_KING_FROM_BLACK] = 0;

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE] = 0;
    // разрешение взятия на проходе 1/0
    chess_board_0x88[IND_EN_PASSANT_YES] = 0;
    // координата битого поля
    chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = 0;
    // рокировка белых в длинную сторону   1/0
    chess_board_0x88[IND_CASTLING_Q] = 0;
    // рокировка белых в короткую сторону  1/0
    chess_board_0x88[IND_CASTLING_K] = 0;
    // рокировка черных в длинную сторону  1/0
    chess_board_0x88[IND_CASTLING_q] = 0;
    // рокировка черных в короткую сторону 1/0
    chess_board_0x88[IND_CASTLING_k] = 0;
}

export {
    x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
    test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
    save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite, letter_to_x_coordinate,
    IND_MAX, SIDE_TO_MOVE, LET_COOR,
    BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
    IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
    IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK,
    SQUARE_64_to_128_CB,  SQUARE_128_to_64_CB
};