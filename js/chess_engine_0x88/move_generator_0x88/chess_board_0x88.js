// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_board_0x88.js
 * @version created 24.01m.2026 
 * Code review: Gemini AI
*/

//+

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
 * Int32Array	Целое 32-бит
 * 
 *  let chess_board_0x88 = new Int32Array(128).fill(0);// доска 0x88 с фигурами
 * 
 * Имена фигур закодированы цифрами: 
 * 0- нет фигуры, 
 * 1- пешка, 2-конь, 3-слон, 4-ладья,  5-ферзь,  6-король <- белые фигуры 
 * 9- пешка, 10-конь, 11-слон, 12-ладья, 13-ферзь, 14-король <- черные фигуры 
 * 1-00000001, 2 -00000010, 3 -00000011, 4 -00000100, 5 -00000101, 6 -00000110
 * 9-00001001, 10-00001010, 11-00001011, 12-00001100, 13-00001101, 14-00001110
 * ИИ от Гугла подсказал использовать магию 8 это 00001000, т.е черные начинаются с 9 а не с 7 как у меня было
 * тогда 
 * side = piece >> 3; 0 для белых, 1 для черных
 * а я привык что 1-белый, 0-черный так что делаем color = 1 - (piece >> 3)
 * type = piece & 7; Всегда вернет 1-6, независимо от цвета (7-00000111)
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
 * так как мы проверяем (index & 0x88) == 0, а значит никогда не используем часть клеток доски
 * то я решил хранить в них дополнительные данные позиции
 * 
 *  8 это side_to_move, цвет хода 0-1 (0 - черные 1 - белые)
 * 
 *  9 это castling_Q, рокировка белых в длинную сторону 0-1 (0-не возможна 1-возможна)
 *  10 это castling_K, рокировка белых в короткую сторону 0-1
 *  11 это castling_q, рокировка черных в длинную сторону 0-1
 *  12 это castling_k, рокировка черных в короткую сторону 0-1 
 * 
 *  13 это en_passant_yes, разрешение взятия на проходе 0-1 
 *  14 en_passant_target_square, координата битого поля от 0 до 119 
 * 
 *  15 king_from_white, положение белого короля от 0 до 119
 *  24 king_from_black, положение черного короля от 0 до 119
 * 
 *  25 halfmove_clock, The number of halfmoves since the last capture or pawn advance,
 *      used for the fifty-move rule.(from wikipedia)
 * 
 *  26 fullmove_number, The number of the full moves. It starts at 1 and is incremented after Black's move.(from wikipedia)
 *  27 score, оценка позиции
 * 
 * 
 * Перевод координат доски ху в линейную: 
 * s_0x88 = 16 * y_07 + x_07;
 * И обратно:
 * x_07 = s_0x88 & 7;
 * y_07 = s_0x88 >> 4; // s_0x88 / 16
 * 
 * Соглашение о суффиксах:
 *    _cb → chess_board (разграничение экспортов в многомодульной сборке)
 * 
 * что тут еще? Вроде все. Никаких списков фигур, вся доска только в этом маленьком массиве. 
*/

//
const BLACK_CB = 0;
const WHITE_CB = 1;

// 
const PIECE_NO_CB = 0; // нет фигуры

// WHITE PIECE
const W_PAWN_CB = 1;     // пешка 
const W_KNIGHT_CB = 2;   // конь
const W_BISHOP_CB = 3;   // слон
const W_ROOK_CB = 4;     // ладья
const W_QUEEN_CB = 5;    // ферзь
const W_KING_CB = 6;     // король

// BLACK PIECE
const B_PAWN_CB = 9;     // пешка 
const B_KNIGHT_CB = 10;   // конь
const B_BISHOP_CB = 11;   // слон
const B_ROOK_CB = 12;     // ладья
const B_QUEEN_CB = 13;    // ферзь
const B_KING_CB = 14;     // король

const PIECE_NAME_CB = [
    "PIECE_NO_CB",
    "W_PAWN_CB", "W_KNIGHT_CB", "W_BISHOP_CB", "W_ROOK_CB", "W_QUEEN_CB", "W_KING_CB",
    "PIECE_NO_CB", "PIECE_NO_CB",
    "B_PAWN_CB", "B_KNIGHT_CB", "B_BISHOP_CB", "B_ROOK_CB", "B_QUEEN_CB", "B_KING_CB"
];

// так как мы проверяем (index & 0x88) == 0 и значит никогда не используем часть клеток доски
// то я решил использовать их для хранения данных позиции

const SIDE_TO_MOVE_CB = 8; // положение в массиве цвета хода 0-1

const IND_CASTLING_Q_CB = 9; // положение в массиве рокировки белых в длинную сторону 0-1
const IND_CASTLING_K_CB = 10; // положение в массиве рокировки белых в короткую сторону 0-1
const IND_CASTLING_q_CB = 11; // положение в массиве рокировки черных в длинную сторону 0-1
const IND_CASTLING_k_CB = 12; // положение в массиве рокировки черных в короткую сторону 0-1

const IND_EN_PASSANT_YES_CB = 13; // положение в массиве разрешение взятия на проходе 0-1
const IND_EN_PASSANT_TARGET_SQUARE_CB = 14; // положение в массиве координата битого поля от 0 до 119

const IND_KING_FROM_WHITE_CB = 15; // положение в массиве положения белого короля от 0 до 119
const IND_KING_FROM_BLACK_CB = 24; // положение в массиве положения черного короля от 0 до 119

const IND_HALFMOVE_CLOCK_CB = 25; // The number of halfmoves since the last capture or pawn advance,
// used for the fifty-move rule.(from wikipedia)

const IND_FULLMOVE_NUMBER_CB = 26; // The number of the full moves. It starts at 1 and is incremented after Black's move.(from wikipedia)

const IND_SCORE_CB = 27; // положение в массиве оценки позиции

//////////////////////////////////

const BOARD_SIZE_CB = 128;// размер доски: от 0 до 127
const OUT_OF_BOUNDS_MASK_CB = 0x88; // 136 в десятичной, но лучше использовать hex для читаемости битовой логики

const PIECE_TYPE_MASK_CB = 0x07;     // 00000111
const COLOR_SHIFT_CB = 3;

// нужно для взятия на проходе при переводе позиции в фен
const LET_COOR_CB = [
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

// Создаем быстрый типизированный массив для всех ASCII символов (выносим в глобальную область)
const FEN_PIECES_ARRAY_CB = new Int32Array(128); 
// По умолчанию заполняем нулями (или -1), чтобы отличать цифры от фигур
// Заполняем его один раз при старте движка:
FEN_PIECES_ARRAY_CB[107] = B_KING_CB;   // 'k'.charCodeAt(0) === 107
FEN_PIECES_ARRAY_CB[113] = B_QUEEN_CB;  // 'q'.charCodeAt(0) === 113
FEN_PIECES_ARRAY_CB[114] = B_ROOK_CB;   // 'r'.charCodeAt(0) === 114
FEN_PIECES_ARRAY_CB[98]  = B_BISHOP_CB; // 'b'.charCodeAt(0) === 98
FEN_PIECES_ARRAY_CB[110] = B_KNIGHT_CB; // 'n'.charCodeAt(0) === 110
FEN_PIECES_ARRAY_CB[112] = B_PAWN_CB;   // 'p'.charCodeAt(0) === 112

FEN_PIECES_ARRAY_CB[75]  = W_KING_CB;   // 'K'.charCodeAt(0) === 75
FEN_PIECES_ARRAY_CB[81]  = W_QUEEN_CB;  // 'Q'.charCodeAt(0) === 81
FEN_PIECES_ARRAY_CB[82]  = W_ROOK_CB;   // 'R'.charCodeAt(0) === 82
FEN_PIECES_ARRAY_CB[66]  = W_BISHOP_CB; // 'B'.charCodeAt(0) === 66
FEN_PIECES_ARRAY_CB[78]  = W_KNIGHT_CB; // 'N'.charCodeAt(0) === 78
FEN_PIECES_ARRAY_CB[80]  = W_PAWN_CB;   // 'P'.charCodeAt(0) === 80


/**
* переводим координаты х и у в линейную координату доски 128(0x88)
* @example 
* x07_y07_to_0x88_cb(rank07, file07); // return s_0x88
*
* @param {number} x07
* @param {number} y07
* @returns {number}
*/
const x07_y07_to_0x88_cb = (x07, y07) => (y07 << 4) + x07;

/**
* переводим линейную координату доски 128(0x88) в х
* @param {number} s_0x88
* @returns {number}
*/
const s_0x88_to_x07_cb = (s_0x88) => s_0x88 & 7;

/** 
 * переводим линейную координату доски 128(0x88) в у
* @param {number} s_0x88
* @returns {number}
*/
const s_0x88_to_y07_cb = (s_0x88) => s_0x88 >> 4;

/** 
 * смотрим валидность клетки доски 128(0x88) если 0 то мы на доске
* @param {number} index
* @returns {number}
*/
const s_0x88_out_of_bounds_cb = (index) => index & 0x88;

/**
 * Получаем цвет фигуры (1 - белый, 0 - черный)
 * @param {number} piece 
 * @returns {number}
 */
const get_piece_color_cb = (piece) => (piece >> 3) ^ 1;

/**
 * Получаем тип фигуры (0 - пусто, 1 - пешка, ..., 6 - король)
 * @param {number} piece 
 * @returns {number}
 */
const get_piece_type_cb = (piece) => piece & 7;

/**
 * Создаем код фигуры по её типу и цвету (1 - белый, 0 - черный)
 * @param {number} type - тип от 1 до 6
 * @param {number} color - 1 (белый) или 0 (черный)
 * @returns {number} код фигуры (1-6 или 9-14)
 */
const create_piece_cb = (type, color) => ((color ^ 1) << 3) | type;

// FEN -------------------------------------------------------------------------

// https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
// "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
// 
/**
 * Инициализируем позицию из FEN-строки
 * @param {string} fen 
 * @param {Int32Array} chess_board_0x88
 * @returns {void}
 */
const set_board_from_fen_0x88_cb = (fen, chess_board_0x88) => {

    iniPositionFor_0_cb(chess_board_0x88);

    // Разделяем FEN на 6 стандартных полей
    const parts = fen.split(' ');
    const placement = parts[0];
    const side = parts[1];
    const castling = parts[2];
    const enPassant = parts[3];
    // Поля 4 и 5 (счетчики) пока не используются
    const halfmoves = parts[4];
    const fullmove = parts[5]; // undefined

    //console.log('set_board_from_fen_0x88_cb->halfmoves = ' + halfmoves);
    //console.log('set_board_from_fen_0x88_cb->fullmove = ' + fullmove);

    // --- 1. РАССТАНОВКА ФИГУР ---
    let x = 0;
    let y = 0;

    for (let i = 0; i < placement.length; i++) {

        const code = placement.charCodeAt(i);

        if (code === 47) { // Символ '/'
            y++;
            x = 0;
        } else {
            const piece = FEN_PIECES_ARRAY_CB[code];

            if (piece === 0) {
                x += (code - 48); // Из ASCII кода цифры получаем число ('1'-'8')
            } else {
                const z_0x88 = (y << 4) + x;
                chess_board_0x88[z_0x88] = piece;

                // Быстрое обновление индексов королей
                if (piece === W_KING_CB) chess_board_0x88[IND_KING_FROM_WHITE_CB] = z_0x88;
                else if (piece === B_KING_CB) chess_board_0x88[IND_KING_FROM_BLACK_CB] = z_0x88;

                x++;
            }
        }
    }

    // --- 2. ЦВЕТ ХОДА ---
    if (side) {
        chess_board_0x88[SIDE_TO_MOVE_CB] = (side.charCodeAt(0) === 119) ? WHITE_CB : BLACK_CB; // 119 это 'w'
    }

    // --- 3. РОКИРОВКИ ---
    if (castling && castling !== '-') {
        for (let i = 0; i < castling.length; i++) {
            const code = castling.charCodeAt(i);
            if (code === 75) chess_board_0x88[IND_CASTLING_K_CB] = 1;      // 'K'
            else if (code === 81) chess_board_0x88[IND_CASTLING_Q_CB] = 1; // 'Q'
            else if (code === 107) chess_board_0x88[IND_CASTLING_k_CB] = 1; // 'k'
            else if (code === 113) chess_board_0x88[IND_CASTLING_q_CB] = 1; // 'q'
        }
    }

    // --- 4. ВЗЯТИЕ НА ПРОХОДЕ ---
    if (enPassant && enPassant !== '-') {
        const ep_x = enPassant.charCodeAt(0) - 97;         // 'a'-'h' -> 0-7
        const ep_y = 8 - (enPassant.charCodeAt(1) - 48);    // '1'-'8' -> Инвертируем под вашу разметку доски
        
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 1;
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = (ep_y << 4) + ep_x;
    } else {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = 0;
    }
};

/**
 * Переводим букву вертикали (a-h) в координату X (0-7)
 * @param {string} letter
 * @returns {number} Координата от 0 до 7, или -1 если символ некорректный
 */
const letter_to_x_coordinate_cb = (letter) => {
    const x = letter.charCodeAt(0) - 97; // 97 — это ASCII-код буквы 'a'
    return x >= 0 && x <= 7 ? x : -1;
};

// Индексы:               0   1    2    3    4    5    6   7   8    9    10   11   12   13   14
const PIECES_CHARS_CB = ["", "P", "N", "B", "R", "Q", "K", "", "", "p", "n", "b", "r", "q", "k"];

/**
 * Генерируем FEN-строку по текущей позиции на доске 0x88
 * @param {Int32Array} chess_board_0x88 
 * @returns {string} FEN-строка
 */
const set_fen_from_0x88_cb = (chess_board_0x88) => {
    const fenParts = [];
    let emptyCount = 0;

    // --- 1. СБОРКА ФИГУР ---
    for (let y = 0; y < 8; y++) {
        const rowOffset = y << 4; // Инлайним (y * 16) для скорости
        
        for (let x = 0; x < 8; x++) {
            const z = rowOffset + x;
            const piece = chess_board_0x88[z];

            if (piece !== PIECE_NO_CB) {
                if (emptyCount > 0) {
                    fenParts.push(emptyCount);
                    emptyCount = 0;
                }
                fenParts.push(PIECES_CHARS_CB[piece]); // Используем прямой доступ к нашему быстрому массиву символов
            } else {
                emptyCount++;
            }
        }

        if (emptyCount > 0) {
            fenParts.push(emptyCount);
            emptyCount = 0;
        }

        if (y !== 7) {
            fenParts.push("/");
        }
    }

    // --- 2. ЦВЕТ ХОДА ---
    fenParts.push(chess_board_0x88[SIDE_TO_MOVE_CB] === WHITE_CB ? " w " : " b ");

    // --- 3. РОКИРОВКИ ---
    let castlingRights = "";
    if (chess_board_0x88[IND_CASTLING_K_CB] === 1) castlingRights += "K";
    if (chess_board_0x88[IND_CASTLING_Q_CB] === 1) castlingRights += "Q";
    if (chess_board_0x88[IND_CASTLING_k_CB] === 1) castlingRights += "k";
    if (chess_board_0x88[IND_CASTLING_q_CB] === 1) castlingRights += "q";
    
    fenParts.push(castlingRights || "-");
    fenParts.push(" ");

    // --- 4. ВЗЯТИЕ НА ПРОХОДЕ ---
    if (chess_board_0x88[IND_EN_PASSANT_YES_CB] === 1) {
        const epSquare = chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB];
        const ep_x = epSquare & 7;       // Быстрое s_0x88_to_x07
        const ep_y = 8 - (epSquare >> 4); // Быстрое 8 - s_0x88_to_y07
        
        fenParts.push(LET_COOR_CB[ep_x], ep_y);
    } else {
        fenParts.push("-");
    }

    // Добавляем финальный пробел в конце строки
    fenParts.push(" ");

    return fenParts.join('');
};

//  -------------------------------------------------------------------------FEN

/**
 * стартовая позиция
 * @param {Int32Array} chess_board_0x88 
 * @returns {void}
*/
const iniStartPositionForWhite_cb = function (chess_board_0x88) {

    // 0- нет фигуры, 
    // 1- пешка, 2-конь, 3-слон, 4-ладья,  5-ферзь,  6-король <- белые фигуры 
    // 9- пешка, 10-конь, 11-слон, 12-ладья, 13-ферзь, 14-король <- черные фигуры 

    // раставляем фигуры
    chess_board_0x88.set([
        B_ROOK_CB, B_KNIGHT_CB, B_BISHOP_CB, B_QUEEN_CB, B_KING_CB, B_BISHOP_CB, B_KNIGHT_CB, B_ROOK_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        B_PAWN_CB, B_PAWN_CB, B_PAWN_CB, B_PAWN_CB, B_PAWN_CB, B_PAWN_CB, B_PAWN_CB, B_PAWN_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        W_PAWN_CB, W_PAWN_CB, W_PAWN_CB, W_PAWN_CB, W_PAWN_CB, W_PAWN_CB, W_PAWN_CB, W_PAWN_CB, 0, 0, 0, 0, 0, 0, 0, 0,
        W_ROOK_CB, W_KNIGHT_CB, W_BISHOP_CB, W_QUEEN_CB, W_KING_CB, W_BISHOP_CB, W_KNIGHT_CB, W_ROOK_CB, 0, 0, 0, 0, 0, 0, 0, 0
    ]);


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

    chess_board_0x88[IND_KING_FROM_WHITE_CB] = 116;
    chess_board_0x88[IND_KING_FROM_BLACK_CB] = 4;

    chess_board_0x88[IND_SCORE_CB] = -1;
}

/**
 * нулевая позиция. нужна когда мы раставляем фигуры по фену
 * @param {Int32Array} chess_board_0x88 
 * @returns {void}
*/
const iniPositionFor_0_cb = function (chess_board_0x88) {

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
}

// FOR TEST----------------------------------------------------------------------

/**
* выводим дополнительную информацию по позиции на консоль браузера (для тестирования)
* @param {Int32Array} chess_board_0x88
* @returns {void}
*/
const test_print_any_0x88_cb = function (chess_board_0x88) {
    console.log("test_print_any_0x88 ****************");
    console.log("side_to_move " + chess_board_0x88[SIDE_TO_MOVE_CB]);
    console.log("en_passant_yes " + chess_board_0x88[IND_EN_PASSANT_YES_CB]);
    console.log("en_passant_target_square " + chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB]);
    console.log("castling_Q " + chess_board_0x88[IND_CASTLING_Q_CB]);
    console.log("castling_q " + chess_board_0x88[IND_CASTLING_q_CB]);
    console.log("castling_K " + chess_board_0x88[IND_CASTLING_K_CB]);
    console.log("castling_k " + chess_board_0x88[IND_CASTLING_k_CB]);
    console.log("king_from_white " + chess_board_0x88[IND_KING_FROM_WHITE_CB]);
    console.log("king_from_black " + chess_board_0x88[IND_KING_FROM_BLACK_CB]);
    console.log("score " + chess_board_0x88[IND_SCORE_CB]);
    console.log("**************** test_print_any_0x88");
}

/**
* печатаем имена фигур на позиции в консоле браузера (для тестирования)
* @param {Int32Array} chess_board_0x88
* @returns {void}
*/
const test_print_piese_0x88_cb = function (chess_board_0x88) {
    console.log("test_print_piese_0x88 ****************");
    /** @type {number} */
    let l = 0;// 
    let line = "";//
    // бежим по доске и добавляем в линию фигуры с доски. как достигли 
    // конца доски с фигурами печатаем линию и все по новой
    for (let i = 0; i < BOARD_SIZE_CB; i++) {
        if ((i & OUT_OF_BOUNDS_MASK_CB) == 0) {// 136 0x88
            l = 1;
            line = line + "|" + String(chess_board_0x88[i]);
        } else if (l == 1) {
            l = 0;
            console.log(line);
            //console.log( "\n");
            line = "";
        }
    }
    console.log("side_to_move = " + chess_board_0x88[SIDE_TO_MOVE_CB]);
    console.log("**************** test_print_0x88");
}

/**
* печатаем цвета фигур на позиции в консоле браузера (для тестирования)
* @param {Int32Array} chess_board_0x88
* @returns {void}
*/
const test_print_piese_color_0x88_cb = function (chess_board_0x88) {
    console.log("test_print_0x88_color ****************");
    let l = 0;// только один раз должен сработать перевод строки
    let line = "";//
    let color = 0;

    for (let i = 0; i < BOARD_SIZE_CB; i++) {
        if ((i & OUT_OF_BOUNDS_MASK_CB) == 0) {// 136 0x88
            l = 1;

            // если имя фигуры больше 6 то это черная фигура так как они 9-черная пешка, и т.д.
            //color = (chess_board_0x88[i] > W_KING) ? BLACK : WHITE;
            color = 1 - (chess_board_0x88[i] >> 3);// тут магия 8( в битах это 00001000) (подсказал ИИ от Гугла) 1 для белых и 0 для черных.


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
* @param {Int32Array} chess_board_0x88
* @returns {void}
*/
const test_print_piese_in_line_0x88_cb = function (chess_board_0x88) {
    console.log("test_print_0x88_line ****************");
    let line = "";//
    for (let i = 0; i < BOARD_SIZE_CB; i++) {
        if ((i & OUT_OF_BOUNDS_MASK_CB) == 0) {// 136 0x88       
            line = line + String(chess_board_0x88[i]) + ",";
        }
    }
    console.log(line);
    console.log("**************** test_print_0x88_line");
}

/**
* проверяем совпадение двух позиций. нужно для тестирования
* @param {Int32Array} chess_board_0x88_original
* @param {Int32Array} chess_board_0x88
* @returns {number}
*/
const test_compare_chess_board_0x88_cb = function (chess_board_0x88_original, chess_board_0x88) {

    let is_test_ok = 1;
    //console.log("test_compare_chess_board_0x88****************");
    for (let i = 0; i < BOARD_SIZE_CB; i++) {
        if (chess_board_0x88_original[i] != chess_board_0x88[i]) {
            is_test_ok = 0;
            console.log("this piece chess_board_0x88_original[" + i + "] " + chess_board_0x88_original[i]);
            console.log("out piece chess_board_0x88[" + i + "] " + chess_board_0x88[i]);
        };
    }

    // цвет хода 0 - черные 1 - белые
    if (chess_board_0x88_original[SIDE_TO_MOVE_CB] != chess_board_0x88[SIDE_TO_MOVE_CB]) {
        is_test_ok = 0;
        console.log("this side_to_move original " + chess_board_0x88_original[SIDE_TO_MOVE_CB]);
        console.log("out side_to_move " + chess_board_0x88[SIDE_TO_MOVE_CB]);
    };
    if (chess_board_0x88_original[IND_EN_PASSANT_YES_CB] != chess_board_0x88[IND_EN_PASSANT_YES_CB]) {
        is_test_ok = 0;
        console.log("this en_passant_yes original " + chess_board_0x88_original[IND_EN_PASSANT_YES_CB]);
        console.log("out en_passant_yes " + chess_board_0x88[IND_EN_PASSANT_YES_CB]);
    };

    if (chess_board_0x88_original[IND_EN_PASSANT_YES_CB] == 1) {
        if (chess_board_0x88_original[IND_EN_PASSANT_TARGET_SQUARE_CB] != chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB]) {
            is_test_ok = 0;
            console.log("this en_passant_target_square original " + chess_board_0x88_original[IND_EN_PASSANT_TARGET_SQUARE_CB]);
            console.log("out en_passant_target_square " + chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB]);
        };
    };

    if (chess_board_0x88_original[IND_CASTLING_Q_CB] != chess_board_0x88[IND_CASTLING_Q_CB]) {
        is_test_ok = 0;
        console.log("this castling_Q original " + chess_board_0x88_original[IND_CASTLING_Q_CB]);
        console.log("out castling_Q " + chess_board_0x88[IND_CASTLING_Q_CB]);
    };
    if (chess_board_0x88_original[IND_CASTLING_K_CB] != chess_board_0x88[IND_CASTLING_K_CB]) {
        is_test_ok = 0;
        console.log("this castling_K " + chess_board_0x88_original[IND_CASTLING_K_CB]);
        console.log("out castling_K " + chess_board_0x88[IND_CASTLING_K_CB]);
    };
    if (chess_board_0x88_original[IND_CASTLING_q_CB] != chess_board_0x88[IND_CASTLING_q_CB]) {
        is_test_ok = 0;
        console.log("this castling_q original " + chess_board_0x88_original[IND_CASTLING_q_CB]);
        console.log("out castling_q " + chess_board_0x88[IND_CASTLING_q_CB]);
    };
    if (chess_board_0x88_original[IND_CASTLING_k_CB] != chess_board_0x88[IND_CASTLING_k_CB]) {
        is_test_ok = 0;
        console.log("this castling_k original " + chess_board_0x88_original[IND_CASTLING_k_CB]);
        console.log("out castling_k " + chess_board_0x88[IND_CASTLING_k_CB]);
    };
    if (chess_board_0x88_original[IND_KING_FROM_WHITE_CB] != chess_board_0x88[IND_KING_FROM_WHITE_CB]) {
        is_test_ok = 0;
        console.log("this king_from_white original " + chess_board_0x88_original[IND_KING_FROM_WHITE_CB]);
        console.log("out king_from_white " + chess_board_0x88[IND_KING_FROM_WHITE_CB]);
    };
    if (chess_board_0x88_original[IND_KING_FROM_BLACK_CB] != chess_board_0x88[IND_KING_FROM_BLACK_CB]) {
        is_test_ok = 0;
        console.log("this king_from_black original " + chess_board_0x88_original[IND_KING_FROM_BLACK_CB]);
        console.log("out king_from_black " + chess_board_0x88[IND_KING_FROM_BLACK_CB]);
    };
    if (chess_board_0x88_original[IND_SCORE_CB] != chess_board_0x88[IND_SCORE_CB]) {
        is_test_ok = 0;
        console.log("this score original " + chess_board_0x88_original[IND_SCORE_CB]);
        console.log("out score " + chess_board_0x88[IND_SCORE_CB]);
    };

    //console.log("**************** test_compare_chess_board_0x88");

    return is_test_ok;
}

// только для тестов
/**
 * ищем короля заданного цвета. нужно для обнаружения шаха
 * эта функция нужна для тестирования верности записи положения королей
 * @param {Int32Array} chess_board_0x88 
 * @param {number} piece_color
 * @returns {number}
*/
const searching_king_cb = function (chess_board_0x88, piece_color) {

    for (let i = 0; i < BOARD_SIZE_CB; i++) {
        if ((i & OUT_OF_BOUNDS_MASK_CB) == 0) {// 136 0x88
            if (chess_board_0x88[i] == W_KING_CB) {
                if (piece_color == 1) {
                    return i;
                }
            }
            if (chess_board_0x88[i] == B_KING_CB) {
                if (piece_color == 0) {
                    return i;
                }
            }
        }
    }
    // короля не нашли
    return -1;
}

// ----------------------------------------------------------------------FOR TEST

export {
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piese_0x88_cb, test_print_piese_color_0x88_cb, test_print_piese_in_line_0x88_cb,
    test_compare_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb,
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    s_0x88_out_of_bounds_cb, get_piece_color_cb, get_piece_type_cb, create_piece_cb,
    BOARD_SIZE_CB, OUT_OF_BOUNDS_MASK_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB,
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
};