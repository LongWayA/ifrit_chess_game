// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name transposition_table_0x88.js
 * @version created 07.02m.2026 
*/

import {
    x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
    test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
    save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
    IND_MAX, SIDE_TO_MOVE, LET_COOR,
    BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
    IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
    IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK,
    SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
} from "../move_generator/chess_board_new.js";

import {
    clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
    sorting_list_ml, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
    return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
    type_move_to_name_piese, type_move_to_name_piese_f, return_promo_piece_from_type_move, set_move_after_the_captures_ml,
    sorting_list_history_heuristic_ml,
    LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_CAPTURES_MOVE, IND_NUMBER_MOVE,
    IND_PROMO_QUEEN, IND_PROMO_ROOK, IND_PROMO_BISHOP, IND_PROMO_KNIGHT,
    MOVE_NO, CAPTURES_PAWN_QUEEN_PROMO_QUEEN, CAPTURES_PAWN_ROOK_PROMO_QUEEN, CAPTURES_PAWN_BISHOP_PROMO_QUEEN,
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN, CAPTURES_PAWN_QUEEN_PROMO_ROOK, CAPTURES_PAWN_ROOK_PROMO_ROOK,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK, CAPTURES_PAWN_KNIGHT_PROMO_ROOK, CAPTURES_PAWN_QUEEN_PROMO_BISHOP,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP, CAPTURES_PAWN_BISHOP_PROMO_BISHOP, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT, CAPTURES_PAWN_ROOK_PROMO_KNIGHT, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT, MOVE_PAWN_PROMO_QUEEN, MOVE_PAWN_PROMO_ROOK, MOVE_PAWN_PROMO_BISHOP,
    MOVE_PAWN_PROMO_KNIGHT, CAPTURES_PAWN_QUEEN, CAPTURES_PAWN_ROOK, CAPTURES_PAWN_BISHOP, CAPTURES_PAWN_KNIGHT,
    CAPTURES_KNIGHT_QUEEN, CAPTURES_KNIGHT_ROOK, CAPTURES_BISHOP_QUEEN, CAPTURES_BISHOP_ROOK, CAPTURES_ROOK_QUEEN,
    CAPTURES_KNIGHT_BISHOP, CAPTURES_KNIGHT_KNIGHT, CAPTURES_BISHOP_BISHOP, CAPTURES_BISHOP_KNIGHT, CAPTURES_ROOK_ROOK,
    CAPTURES_QUEEN_QUEEN, CAPTURES_ROOK_BISHOP, CAPTURES_ROOK_KNIGHT, CAPTURES_QUEEN_ROOK, CAPTURES_QUEEN_BISHOP,
    CAPTURES_QUEEN_KNIGHT, CAPTURES_KING_QUEEN, CAPTURES_KING_ROOK, CAPTURES_KING_BISHOP, CAPTURES_KING_KNIGHT,
    CAPTURES_PAWN_PAWN, EP_CAPTURES, CAPTURES_KNIGHT_PAWN, CAPTURES_BISHOP_PAWN, CAPTURES_ROOK_PAWN,
    CAPTURES_QUEEN_PAWN, CAPTURES_KING_PAWN, MOVE_QUEEN, MOVE_ROOK, MOVE_BISHOP, MOVE_KNIGHT, MOVE_KING, MOVE_PAWN,
    MOVE_DOUBLE_PAWN, MOVE_KING_CASTLE, MOVE_KING_QUEEN_CASTLE, TYPE_MOVE_NAME
} from "../move_generator/move_list_new.js";


// nnnnnnnnnnnnnnnnnnnnnn
//import crypto from 'node:crypto';

/**
* НАЗНАЧЕНИЕ

*/

let key_64_equal = 0;// совпадающие ключи
let key_64_not_equal = 0;

//const chess_board_key_64_tk = new BigUint64Array(1);
//chess_board_key_64_tk[0] = 0n;

// трехмерный массив ключей положения разных 
const key_array_64_tk = new Array(13);// положений фигур на разных полях 2 * 7 * 64 = 896

// здесь каждому положению каждой фигуры каждого цвета присваивается случайное число 
const ini_random_key_array_64_tk = function () {
    //console.log("Transposition_table_0x88_C -> ini_random_key_array_32");
    let uint_a_64 = new BigUint64Array(1);
    let uint64 = 0n;

    // заполняем трехмерный массив 13*64 = 768 состояний.
    for (let name = PIECE_NO; name < (B_KING + 1); name++) {// 0;13
        for (let sq = 0; sq < 64; sq++) {

            // nnnnnnnnnnnnnnnnnnnnnn
            //crypto.getRandomValues(uint_a_64);
            self.crypto.getRandomValues(uint_a_64);
            //window.crypto.getRandomValues(hi_lo);
            uint64 = uint_a_64[0];//

            key_array_64_tk[name][sq] = uint64;
        }
    }

    // поищем совпадение ключей
    for (let name1 = PIECE_NO; name1 < (B_KING + 1); name1++) {
        for (let sq1 = 0; sq1 < 64; sq1++) {

            //key_64_not_equal = key_64_not_equal + 1;

            for (let name2 = PIECE_NO; name2 < (B_KING + 1); name2++) {
                for (let sq2 = 0; sq2 < 64; sq2++) {
                    //768
                    if ((name1 == name2) && (sq1 == sq2)) {
                        key_64_not_equal = key_64_not_equal + 1;
                    } else {
                        if (key_array_64_tk[name1][sq1] == key_array_64_tk[name2][sq2]) {
                            key_64_equal = key_64_equal + 1;
                        } else {
                            key_64_not_equal = key_64_not_equal + 1;
                        }
                    }
                }
            }
        }
    }
    console.log("Transposition_table_0x88_C key_64_equal " + key_64_equal);

}


const ini_key_array_64_tk = function () {

    //console.log("Transposition_table_0x88_C -> iniM");

    // инициализируем трехмерный массив 13*64 = 896 ячеек

    for (let name = PIECE_NO; name < (B_KING + 1); name++) {

        key_array_64_tk[name] = new BigUint64Array(64);
    }

    ini_random_key_array_64_tk();
}

// 
/**
 * по позиции генерируем ключ
 * @param {Uint8Array} chess_board_0x88 
 * @param {BigUint64Array} chess_board_key_64
 * @returns {void} 
*/
const set_key_from_board_0x88_tk = function (chess_board_0x88, chess_board_key_64) {

    let sq_0x88;
    let piece;
    let piece_color;
    let key_64 = 0n;

    // бежим по шахматной доске
    for (let sq = 0; sq < 64; sq++) {

        sq_0x88 = SQUARE_64_to_128_CB[sq];
        piece = chess_board_0x88[sq_0x88];

        if (piece != 0) {
            key_64 = key_64 ^ key_array_64_tk[piece][sq];
        }
    }

    if (chess_board_0x88[SIDE_TO_MOVE] == 1) {
        key_64 = key_64 ^ key_array_64_tk[6][10];
    }

    if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        key_64 = key_64 ^ key_array_64_tk[5][20];
    }

    key_64 = key_64 ^ BigInt(chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE]) ^ key_array_64_tk[5][25];


    if (chess_board_0x88[IND_CASTLING_Q] == 1) {
        key_64 = key_64 ^ key_array_64_tk[4][30];
    }

    if (chess_board_0x88[IND_CASTLING_K] == 1) {
        key_64 = key_64 ^ key_array_64_tk[4][40];
    }

    if (chess_board_0x88[IND_CASTLING_q] == 1) {
        key_64 = key_64 ^ key_array_64_tk[4][50];
    }

    if (chess_board_0x88[IND_CASTLING_k] == 1) {
        key_64 = key_64 ^ key_array_64_tk[4][60];
    }

    chess_board_key_64[0] = key_64;
}

///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * простой ход и взятия. принципиальный момент обработка фигуры которую берем.
* @param {BigUint64Array} chess_board_key_64_save 
* @param {BigUint64Array} chess_board_key_64
* @returns {void}
*/
const test_chess_board_key_64_tk = function (chess_board_key_64_save, chess_board_key_64) {

    if (chess_board_key_64_save[0] != chess_board_key_64[0]) {

        console.log("test_chess_board_key_64_tk -> chess_board_key_64_save != chess_board_key_64");
        console.log("test_chess_board_key_64_tk -> chess_board_key_64_save[0] " + chess_board_key_64_save[0]);
        console.log("test_chess_board_key_64_tk ->      chess_board_key_64[0] " + chess_board_key_64[0]);
    }

}


/**
 * простой ход и взятия. принципиальный момент обработка фигуры которую берем.
* @param {number} from128
* @param {number} to128
* @param {number} piece_from
* @param {number} piece_to
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_do_move_0x88_tk = function (from128, to128, piece_from, piece_to, chess_board_key_64) {

    let from64 = SQUARE_128_to_64_CB[from128];
    let to64 = SQUARE_128_to_64_CB[to128];


    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_from][from64];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_from][to64];

    // если есть фигура которую берем ее надо убрать из хеш ключа
    if (piece_to != 0) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_to][to64];
    }

    // side_to_move
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[6][10];
}

/**
 * взятие на проходе
* @param {number} from128
* @param {number} to128
* @param {number} ep128
* @param {number} piece_from
* @param {number} piece_ep
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_ep_move_0x88_tk = function (from128, to128, ep128, piece_from, piece_ep, chess_board_key_64) {

    let from64 = SQUARE_128_to_64_CB[from128];
    let to64 = SQUARE_128_to_64_CB[to128];
    let ep64 = SQUARE_128_to_64_CB[ep128];

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_from][from64];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_from][to64];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_ep][ep64];

    // side_to_move
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[6][10];
}

// 
/**
 * превращение и превращение с взятием. принципиальный момент обработка фигуры которую берем.
* @param {number} from128
* @param {number} to128
* @param {number} piece_promo
* @param {number} piece_to
* @param {number} piece_color 
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_promo_move_0x88_tk = function (from128, to128, piece_promo, piece_to, piece_color, chess_board_key_64) {

    let from64 = SQUARE_128_to_64_CB[from128];
    let to64 = SQUARE_128_to_64_CB[to128];

    let nf = (piece_color == 1) ? W_PAWN : B_PAWN;

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nf][from64];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_promo][to64];

    // если есть фигура которую берем ее надо убрать из хеш ключа
    if (piece_to != 0) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_to][to64];
    }

    // side_to_move
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[6][10];
}

/**
 * рокировки
* @param {number} from128
* @param {number} to128
* @param {number} r_from128
* @param {number} r_to128
* @param {number} piece_color 
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_castle_move_0x88_tk = function (from128, to128, r_from128, r_to128, piece_color, chess_board_key_64) {

    let from64 = SQUARE_128_to_64_CB[from128];
    let to64 = SQUARE_128_to_64_CB[to128];
    let r_from64 = SQUARE_128_to_64_CB[r_from128];
    let r_to64 = SQUARE_128_to_64_CB[r_to128];

    let nfk = (piece_color == 1) ? W_KING : B_KING;
    let nfr = (piece_color == 1) ? W_ROOK : B_ROOK;

    //console.log("key_update_castle_move_0x88_tk -> nfk " + nfk);
    //console.log("key_update_castle_move_0x88_tk -> nfr " + nfr);

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nfk][from64];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nfk][to64];

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nfr][r_from64];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nfr][r_to64];

    // side_to_move
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[6][10];
}

/**
 * это переключение флага взятия на проходе
 * @param {BigUint64Array} chess_board_key_64 
 * @returns {void}
*/
const key_update_ep_0x88_tk = function (chess_board_key_64) {
     chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[5][20];
}

/**
 * это переключение поля взятия на проходе
 * @param {BigUint64Array} chess_board_key_64 
 * @param {Uint8Array} chess_board_0x88
 * @returns {void}
*/
const key_update_ep2_0x88_tk = function (chess_board_key_64, chess_board_0x88) {
     chess_board_key_64[0] = chess_board_key_64[0] ^
         BigInt(chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE]) ^ key_array_64_tk[5][25];
}

/**
 * обрабатываем флаги возможности рокировок
* @param {number} Q
* @param {number} q
* @param {number} K
* @param {number} k
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_QqKk_0x88_tk = function (Q, q, K, k, chess_board_key_64) {

    if (Q == 1) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[4][30];
    }

    if (K == 1) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[4][40];
    }

    if (q == 1) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[4][50];
    }

    if (k == 1) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[4][60];
    }
}

/**
 * простой ход и взятия. принципиальный момент обработка фигуры которую берем.
* @param {BigUint64Array} chess_board_key_64_test 
* @param {BigUint64Array} chess_board_key_64
* @param {Uint32Array} packing_moves
* @param {number} move_i
* @param {string} is
* @returns {void}
*/
const test_generation_key_64_tk = function (chess_board_key_64_test, chess_board_key_64, packing_moves, move_i, is) {

    if (chess_board_key_64_test[0] != chess_board_key_64[0]) {

        console.log("test_chess_board_key_64_tk -> This is " + is);
        console.log("test_chess_board_key_64_tk -> chess_board_key_64_save != chess_board_key_64");
        console.log("test_chess_board_key_64_tk -> chess_board_key_64_test[0] " + chess_board_key_64_test[0]);
        console.log("test_chess_board_key_64_tk ->      chess_board_key_64[0] " + chess_board_key_64[0]);
        test_print_i_move_list(move_i, packing_moves);
    }

}


export {
    ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
    key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
    key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep2_0x88_tk, key_update_QqKk_0x88_tk,
    test_generation_key_64_tk
};