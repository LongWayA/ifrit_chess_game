// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name transposition_table_0x88.js
 * @version created 07.02m.2026 
*/

import {
    SIDE_TO_MOVE_CB,
     W_PAWN_CB,  W_ROOK_CB, W_KING_CB, B_PAWN_CB,
     B_ROOK_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_EN_PASSANT_YES_CB,
    IND_EN_PASSANT_TARGET_SQUARE_CB
} from "../move_generator_0x88/chess_board_0x88.js";

import {
    test_print_i_move_list_ml
} from "../move_generator_0x88/move_list_0x88.js";


// nnnnnnnnnnnnnnnnnnnnnn
// import crypto from 'node:crypto';

/**
* НАЗНАЧЕНИЕ
  Работаем с кеш ключом шахматной доски.
  Каждой позиции присваеваем уникальный 64 битный ключ.
*/

let key_64_equal = 0;// совпадающие ключи
let key_64_not_equal = 0;// не совпадающие ключи

//const chess_board_key_64_tk = new BigUint64Array(1);
//chess_board_key_64_tk[0] = 0n;

// трехмерный массив ключей положения разных 
const key_array_64_tk = new Array(15);// положений фигур на разных полях 2 * 7 * 64 = 896

// инициализируем трехмерный массив 15*64 = 832 ячеек
const ini_key_array_64_tk = function () {

    //console.log("Transposition_table_0x88_C -> iniM");

    // инициализируем трехмерный массив 15*64 = 832 ячеек

    for (let name = 0; name < 15; name++) {// по количеству имен фигур

        key_array_64_tk[name] = new BigUint64Array(128).fill(0n);
    }
}


// здесь каждому положению каждой фигуры каждого цвета присваивается случайное число 
const ini_random_key_array_64_tk = function () {
    //console.log("Transposition_table_0x88_C -> ini_random_key_array_32");
    let uint_a_64 = new BigUint64Array(1);
    let uint64 = 0n;

    ini_key_array_64_tk();

    // заполняем трехмерный массив 15*64 = 832 ключей.  15*128 = 1 664 ячеек.
    for (let name = 0; name < 15; name++) {// 0;15
        for (let sq = 0; sq < 128; sq++) {

            // если мы не вышли за пределы доски
            if ((sq & 136) == 0) {// 136 0x88
                // nnnnnnnnnnnnnnnnnnnnnn
                //crypto.getRandomValues(uint_a_64);
                self.crypto.getRandomValues(uint_a_64);

                uint64 = uint_a_64[0];//

                key_array_64_tk[name][sq] = uint64;
            }
        }
    }

    // поищем совпадение ключей
    for (let name1 = 0; name1 < 15; name1++) {
        for (let sq1 = 0; sq1 < 128; sq1++) {

            //key_64_not_equal = key_64_not_equal + 1;

            for (let name2 = 0; name2 < (15); name2++) {
                for (let sq2 = 0; sq2 < 128; sq2++) {

                    if (((sq1 & 136) == 0) && ((sq2 & 136) == 0)) {

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
    }

    if (key_64_equal != 0) {
        // если нет совпадений то 692 224
        console.log("Transposition_table_0x88_C key_64_not_equal " + key_64_not_equal);
        console.log("Transposition_table_0x88_C key_64_equal " + key_64_equal);
    }

}

// 
/**
 * по позиции генерируем ключ
 * sm16 ep32 epsq70 Q48 K64 q80 k96
 * @param {Int32Array} chess_board_0x88 
 * @param {BigUint64Array} chess_board_key_64
 * @returns {void} 
*/
const set_key_from_board_0x88_tk = function (chess_board_0x88, chess_board_key_64) {

    let piece;
    let key_64 = 0n;

    // бежим по шахматной доске
    for (let sq = 0; sq < 128; sq++) {

        if ((sq & 136) == 0) {// 136 0x88
            piece = chess_board_0x88[sq];

            if (piece != 0) {
                key_64 = key_64 ^ key_array_64_tk[piece][sq];
            }
        }
    }

    if (chess_board_0x88[SIDE_TO_MOVE_CB] == 1) {
        key_64 = key_64 ^ key_array_64_tk[6][16];
    }

    if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        key_64 = key_64 ^ key_array_64_tk[5][32];
    }

    key_64 = key_64 ^ BigInt(chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB]) ^ key_array_64_tk[5][70];

    // sm16 ep32 epsq70 Q48 K64 q80 k96
    if (chess_board_0x88[IND_CASTLING_Q_CB] == 1) {
        key_64 = key_64 ^ key_array_64_tk[4][48];
    }

    if (chess_board_0x88[IND_CASTLING_K_CB] == 1) {
        key_64 = key_64 ^ key_array_64_tk[4][64];
    }

    if (chess_board_0x88[IND_CASTLING_q_CB] == 1) {
        key_64 = key_64 ^ key_array_64_tk[4][80];
    }

    if (chess_board_0x88[IND_CASTLING_k_CB] == 1) {
        key_64 = key_64 ^ key_array_64_tk[4][96];
    }

    chess_board_key_64[0] = key_64;
}

///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * проверяем кеш ключ доски на совпадение. если не совпал то печатем значения
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
* @param {number} from
* @param {number} to
* @param {number} piece_from
* @param {number} piece_to
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_do_move_0x88_tk = function (from, to, piece_from, piece_to, chess_board_key_64) {

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_from][from];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_from][to];

    // если есть фигура которую берем ее надо убрать из хеш ключа
    if (piece_to != 0) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_to][to];
    }

    // side_to_move
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[6][16];
}

/**
 * взятие на проходе
* @param {number} from
* @param {number} to
* @param {number} ep
* @param {number} piece_from
* @param {number} piece_ep
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_ep_move_0x88_tk = function (from, to, ep, piece_from, piece_ep, chess_board_key_64) {

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_from][from];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_from][to];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_ep][ep];

    // side_to_move
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[6][16];
}

// 
/**
 * превращение и превращение с взятием. принципиальный момент обработка фигуры которую берем.
* @param {number} from
* @param {number} to
* @param {number} piece_promo
* @param {number} piece_to
* @param {number} piece_color 
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_promo_move_0x88_tk = function (from, to, piece_promo, piece_to, piece_color, chess_board_key_64) {

    let nf = (piece_color == 1) ? W_PAWN_CB : B_PAWN_CB;

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nf][from];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_promo][to];

    // если есть фигура которую берем ее надо убрать из хеш ключа
    if (piece_to != 0) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[piece_to][to];
    }

    // side_to_move
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[6][16];
}

/**
 * рокировки
* @param {number} from
* @param {number} to
* @param {number} r_from
* @param {number} r_to
* @param {number} piece_color 
* @param {BigUint64Array} chess_board_key_64 
* @returns {void}
*/
const key_update_castle_move_0x88_tk = function (from, to, r_from, r_to, piece_color, chess_board_key_64) {

    let nfk = (piece_color == 1) ? W_KING_CB : B_KING_CB;
    let nfr = (piece_color == 1) ? W_ROOK_CB : B_ROOK_CB;

    //console.log("key_update_castle_move_0x88_tk -> nfk " + nfk);
    //console.log("key_update_castle_move_0x88_tk -> nfr " + nfr);

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nfk][from];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nfk][to];

    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nfr][r_from];
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[nfr][r_to];

    // side_to_move
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[6][16];
}

/**
 * это переключение флага взятия на проходе
 * @param {BigUint64Array} chess_board_key_64 
 * @returns {void}
*/
const key_update_ep_0x88_tk = function (chess_board_key_64) {
    // sm16 ep32 epsq70 Q48 K64 q80 k96
    chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[5][32];
}

/**
 * это переключение поля взятия на проходе
 * @param {BigUint64Array} chess_board_key_64 
 * @param {Int32Array} chess_board_0x88
 * @returns {void}
*/
const key_update_ep_sq_0x88_tk = function (chess_board_key_64, chess_board_0x88) {
    // sm16 ep32 epsq70 Q48 K64 q80 k96
    chess_board_key_64[0] = chess_board_key_64[0] ^
        BigInt(chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB]) ^ key_array_64_tk[5][70];
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

   // sm16 ep32 epsq70 Q48 K64 q80 k96 
    if (Q == 1) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[4][48];
    }

    if (K == 1) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[4][64];
    }

    if (q == 1) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[4][80];
    }

    if (k == 1) {
        chess_board_key_64[0] = chess_board_key_64[0] ^ key_array_64_tk[4][96];
    }
}

/**
 * проверяем кеш ключ доски на совпадение. если не совпал то печатем значения 
 * и ход который привел к отклонению
* @param {BigUint64Array} chess_board_key_64_test 
* @param {BigUint64Array} chess_board_key_64
* @param {Int32Array} packing_moves
* @param {number} move_i
* @param {string} is
* @returns {void}
*/
const test_generation_key_64_tk = function (chess_board_key_64_test, chess_board_key_64, packing_moves, move_i, is) {

    if (chess_board_key_64_test[0] != chess_board_key_64[0]) {

        console.log("test_generation_key_64_tk -> This is " + is);
        console.log("test_generation_key_64_tk -> chess_board_key_64_save != chess_board_key_64");
        console.log("test_generation_key_64_tk -> chess_board_key_64_test[0] " + chess_board_key_64_test[0]);
        console.log("test_generation_key_64_tk ->      chess_board_key_64[0] " + chess_board_key_64[0]);
        test_print_i_move_list_ml(move_i, packing_moves);
    }

}


export {
    ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
    key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
    key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep_sq_0x88_tk, key_update_QqKk_0x88_tk,
    test_generation_key_64_tk
};