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

// nnnnnnnnnnnnnnnnnnnnnn
//import crypto from 'node:crypto';

/**
* НАЗНАЧЕНИЕ
 начало цитаты
   https://www.chessprogramming.org/Zobrist_Hashing
   В 32-битном хеше коллизия может возникнуть, если вычислить sqrt(2^32) == 2^16, 
   то есть около 65 тысяч позиций. В 64-битном хеше коллизия может возникнуть примерно 
   через 2^32, то есть около 4 миллиардов позиций.
 конец цитаты


 И так у нас есть 64 битный ключ который мы вписываем в размер таблицы через индекс получаемый из ключа путем
 index_key_64_board = key_64_board & (MAX_TABLE_LENTH - 1);//
 Размер таблицы обязательно должен быть вида 2 в степени n минус 1. т.е. 2**n-1
 тогда он имеет вид 0001111111 и операцией битого "и" т.е. &  мы отрезаем лишние старшие биты
 что то вида 10100...1011101 & 0000...11111 = 0000...11101.

 Размер ячейки таблицы имеет очень большое значение, поэтому пришлось все упаковать в одно число.
 Сейчас элемент массива выглядит следующим образом:
 key_64[i] - 32 битный ключ
 move[i]   - упакованный ход
 test_fen[i] - фен представление позиции. жрет дико много места (в массиве на милион это около гигабайта памяти)
 поэтому включаю только для тестирования

 В число move упаковываем:
    move = move | type_nodes; (0..5) тип записываемого узла. это либо улучшение альфы или беты или отсечка по альфе или бете
    move = move << 7; - число сдвигаем на 7 бит влево чтобы освободить место для следующей позииции которая занимает
                        не больше 7 бит

    move = move | type_move; (0..60) тип хода. тут все понятно, а если нет смотрите описание списка и генератора ходов
    move = move << 7;

    from_64 = Chess_board_0x88_C.SQUARE_128_to_64[from_128] - в списке ходы пишутся для 128 клеточной доски. 
                                                              мы же используем 64 для экономии
    move = move | from_64; (0..63)- откуда ходит фигура
    move = move << 7;

    to_64 = Chess_board_0x88_C.SQUARE_128_to_64[to_128]
    move = move | to_64; (0..63)- куда ходит фигура
    move = move << 7;

    move = move | delta_depth; 
    тут у нас delta_depth = max_depth - depth 
    Почему именно так а не просто depth?
    Мы перезаписываем узлы рассмотренные на большую или такую же глубину. 
    Так что нам нужна не просто глубина, а дельта.
 
    Распаковываем обратно:

        delta_depth = move & 127 - тут 127 имеет вид 00..1111111 - самая доступная потому что при
                                   перезаписи узла нас интересует на какой глубину он был просчитан

        move = move >> 7; сдвигаем направо для следующей порции
        to_64 = move & 127;
        to_128 = Chess_board_0x88_C.SQUARE_64_to_128[to_64]

        move = move >> 7; сдвигаем направо для следующей порции
        from_64 = move & 127
        from_128 = Chess_board_0x88_C.SQUARE_64_to_128[from_64];

        move = move >> 7; сдвигаем направо для следующей порции
        type_move = move & 127;

        move = move >> 7; сдвигаем направо для следующей порции
        type_nodes = move & 127;

        В начале записывал оценку позиции и использовал для отсечения по альфе бете, однако
        из за такого большого количества коллизий(1 из 50) оставил только сортировку ходов,
        а для этого оценка не нужна.

    Записываем ходы приведшие к улучшению альфы беты или к отсечке по альфе бете
    и если позиция одинаковая то этот ход из таблицы находим в списке и ставим на первое место.
    Т.о. коллизии нам не вредят, если позиция не та, то этот ход просто не приведет к ускорению или 
    мы его вообще не найдем в списке.
*/
//-
// надо еще много думать над этим :) BigUint64Array Uint32Array const bitboards = new BigUint64Array(8)

//8 388 480
//const MAX_TABLE_LENTH = 1_048_576;
//const MAX_TABLE_LENTH = 2_097_152;//2_097_152; 4_194_304; 8_388_608; 16_777_216
//const MAX_TABLE_LENTH = 16_777_216;//

//const MAX_TABLE_LENTH = 16_384;//1_024 2_048 4_096 8_192 16_384 32_768 65_536
const MAX_TABLE_LENTH_TT = 65_536;

const MAX_SCORE_UPDATE_TT = 1;

const ALPHA_UPDATE_TT = 2;
const BETA_UPDATE_TT = 3;

const ALPHA_CUT_TT = 4;
const BETA_CUT_TT = 5;


const IND_TN_TT = 0;
const IND_SC_TT = 1;
const IND_DD_TT = 2;

const out_tt = [-1, -1, -1];

// 64 битный ключ позиции   
const key_64_chess_board_tt = new BigUint64Array(MAX_TABLE_LENTH_TT);

// записанный упакованный ход
const packing_move_tt = new Uint32Array(MAX_TABLE_LENTH_TT);

// оценка позиции
const score_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// тип записанного хода. улучшение альфы-беты или отсечка по альфе-бете или точная оценка
const type_save_node_tt = new Int32Array(MAX_TABLE_LENTH_TT);

const delta_depth_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// test_fen_board ----------------------------------------------------------------------------------
// тестовый фен позиции. смотрим насколько адекватный получается ключ позиции
const test_fen_tt = new Array(MAX_TABLE_LENTH_TT); // тип хода в записанной позиции


let input_to__set_position_in_tt = 0;// зашли чтобы попытаться добавить позицию
let input_to__get_position_from_tt = 0;// зашли чтобы попытаться считать позицию
//-----------------
let key_64_found__set_position_in_tt = 0;// ключ при добавлении позиции уже есть

let key_64_new_save__set_position_in_tt = 0;// добавили позицию по новой
let key_64_rewrite__set_position_in_tt = 0;// добавили позицию перезаписав старую   
//-----------------

let key_64_found__get_position_from_tt = 0;// зашли по индексу но ключ не совпал
let key_64_not_found__get_position_from_tt = 0;// зашли по индексу и ключ совпал
let delta_depth_use__get_position_from_tt = 0;// глубина поиска из таблицы больше чем в узле
//-----------------

let yes_collision_fen = 0;// зашли по индексу но фен не совпал
let no_collision_fen = 0;// зашли по индексу и фен совпал


const print_test_set_get_position_tt = function () {

    console.log("set---------------------");
    console.log("input_to__set_position_in_tt " + input_to__set_position_in_tt);// зашли чтобы попытаться добавить позицию
    console.log("key_64_found__set_position_in_tt " + key_64_found__set_position_in_tt);// ключ при добавлении позиции уже есть
    console.log("key_64_new_save__set_position_in_tt " + key_64_new_save__set_position_in_tt);// добавили позицию по новой
    console.log("key_64_rewrite__set_position_in_tt " + key_64_rewrite__set_position_in_tt);// добавили позицию перезаписав старую 

    console.log("get---------------------");
    console.log("input_to__get_position_from_tt " + input_to__get_position_from_tt);
    console.log("key_64_found__get_position_from_tt " + key_64_found__get_position_from_tt)// зашли по индексу но ключ не совпал
    console.log("key_64_not_found__get_position_from_tt " + key_64_not_found__get_position_from_tt)// зашли по индексу и ключ совпал
    console.log("delta_depth_use__get_position_from_tt " + delta_depth_use__get_position_from_tt)// глубина поиска из таблицы больше чем в узле
    console.log("yes collision_fen " + yes_collision_fen)// зашли по индексу но фен не совпал
    console.log("no_collision_fen " + no_collision_fen)// зашли по индексу и фен совпал
}

const clear_out_tt = function () {

    out_tt[IND_TN_TT] = -1;
    out_tt[IND_SC_TT] = -1;
    out_tt[IND_DD_TT] = -1;
}

const clear_hash_tt = function () {
    for (let i = 0; i < MAX_TABLE_LENTH_TT; i++) {

        key_64_chess_board_tt[i] = 0n; //            
        packing_move_tt[i] = 0; // 
        score_tt[i] = 0; // 
        type_save_node_tt[i] = 0; //
        delta_depth_tt[i] = 0; //

        // test_fen_board ----------------------------------------------------------------------------------
        test_fen_tt[i] = ""; //  
    }
}


const ini_tt = function () {

    //console.log("ini_tt -> " + MAX_TABLE_LENTH_TT.toString(2));

    clear_hash_tt();

    clear_out_tt();

    // test
    input_to__set_position_in_tt = 0;// зашли чтобы попытаться добавить позицию
    input_to__get_position_from_tt = 0;

    key_64_found__set_position_in_tt = 0;// ключ при добавлении позиции уже есть
    key_64_new_save__set_position_in_tt = 0;// добавили позицию по новой
    key_64_rewrite__set_position_in_tt = 0;// добавили позицию перезаписав старую  

    key_64_found__get_position_from_tt = 0;// зашли по индексу но ключ не совпал
    key_64_not_found__get_position_from_tt = 0;// зашли по индексу и ключ совпал
    delta_depth_use__get_position_from_tt = 0;// глубина поиска из таблицы больше чем в узле
    yes_collision_fen = 0;// зашли по индексу но фен не совпал
    no_collision_fen = 0;// зашли по индексу и фен совпал
}

// сколько позиций записано
const test_uses_hash_tt = function () {

    let save_position = 0;
    let not_save_position = 0;

    for (let i = 0; i < MAX_TABLE_LENTH_TT; i++) {

        if (key_64_chess_board_tt[i] != 0n) {
            save_position = save_position + 1;
        } else {
            not_save_position = not_save_position + 1;
        }
    }

    console.log("test_uses_hash_tt -> save_position " + save_position +
        " not_save_position " + not_save_position);
}


// добавляем ход в таблицу
/**
* @param {BigUint64Array} chess_board_key_64
* @param {Uint32Array} packing_moves
* @param {number} type_nodes
* @param {number} score
* @param {number} depth
* @param {number} max_depth
* @param {number} i
* @param {string} fen
* @returns {void}
*/
const set_position_in_tt = function (chess_board_key_64, packing_moves, type_nodes, score, depth, max_depth, i, fen) {

    input_to__set_position_in_tt = input_to__set_position_in_tt + 1;// зашли что бы попытаться добавить позицию


    // определяем по ключу индекс для доступа к таблице
    let index_key_64 = chess_board_key_64[0] & BigInt(MAX_TABLE_LENTH_TT - 1);//          

    let delta_depth = max_depth - depth;

    /////////////////////////////////////////////////// 
    // ключ совпал значит мы видимо эту позицию когда то смотрели      
    if (chess_board_key_64[0] == key_64_chess_board_tt[Number(index_key_64)]) {

        key_64_found__set_position_in_tt = key_64_found__set_position_in_tt + 1;// ключ при добавлении позиции уже есть

        // распаковываем move выделяя delta_depth_move
        let delta_depth_tt_ = delta_depth_tt[Number(index_key_64)]; //

        // место уже было записано. надо проверить глубину записи
        if (delta_depth_tt_ < delta_depth) {

            key_64_rewrite__set_position_in_tt = key_64_rewrite__set_position_in_tt + 1;// добавили позицию перезаписав старую

            packing_move_tt[Number(index_key_64)] = packing_moves[i];
            score_tt[Number(index_key_64)] = score;
            type_save_node_tt[Number(index_key_64)] = type_nodes;
            delta_depth_tt[Number(index_key_64)] = delta_depth;
            test_fen_tt[Number(index_key_64)] = fen;
        }
    } else {

        key_64_new_save__set_position_in_tt = key_64_new_save__set_position_in_tt + 1;// добавили позицию по новой

        key_64_chess_board_tt[Number(index_key_64)] = chess_board_key_64[0];
        packing_move_tt[Number(index_key_64)] = packing_moves[i];
        score_tt[Number(index_key_64)] = score;
        type_save_node_tt[Number(index_key_64)] = type_nodes;
        delta_depth_tt[Number(index_key_64)] = delta_depth;
        test_fen_tt[Number(index_key_64)] = fen;
    }
}

// смотрим есть ли у нас в таблице такая позиция и если есть извлекаем ход
/**
* @param {BigUint64Array} chess_board_key_64
* @param {Uint32Array} packing_moves_1
* @param {number} depth
* @param {number} max_depth
* @param {string} fen
* @returns {number[]}
*/
const get_position_from_tt = function (chess_board_key_64, packing_moves_1, depth, max_depth, fen) {

    // всего было обращений в запись
    input_to__get_position_from_tt = input_to__get_position_from_tt + 1;

    // определяем по ключу индекс для доступа к таблице
    let index_key_64 = chess_board_key_64[0] & BigInt(MAX_TABLE_LENTH_TT - 1);//


    // если ключ совпал
    if (chess_board_key_64[0] == key_64_chess_board_tt[Number(index_key_64)]) {

        // зашли по индексу и ключ совпал
        key_64_found__get_position_from_tt = key_64_found__get_position_from_tt + 1;

        if (fen === test_fen_tt[Number(index_key_64)]) {
            no_collision_fen = no_collision_fen + 1;// зашли по индексу и фен совпал
        } else {//if (fen === fen_test) {
            yes_collision_fen = yes_collision_fen + 1;// зашли по индексу но фен не совпал
        }//if (fen === fen_test) {

        let delta_depth = max_depth - depth;

        // распаковываем move выделяя delta_depth_move
        let delta_depth_tt_ = delta_depth_tt[Number(index_key_64)]; //            

        packing_moves_1[0] = packing_move_tt[Number(index_key_64)];

        out_tt[IND_SC_TT] = score_tt[Number(index_key_64)];
        out_tt[IND_TN_TT] = type_save_node_tt[Number(index_key_64)];
        out_tt[IND_DD_TT] = delta_depth_tt[Number(index_key_64)];

        // проверяем что глубина поиска позиции из таблицы больше или равна
        if (delta_depth_tt_ >= delta_depth) {

            // прошли тест по глубине поиска
            delta_depth_use__get_position_from_tt = delta_depth_use__get_position_from_tt + 1;

            return out_tt;

        } else {//if (delta_depth_tt_ >= delta_depth) {

            if ((out_tt[IND_TN_TT] == ALPHA_UPDATE_TT) || (out_tt[IND_TN_TT] == BETA_UPDATE_TT)) {

            } else {
                clear_out_tt();
            }

            return out_tt;
        }//if (delta_depth_tt_ >= delta_depth) {

    } else {//if (chess_board_key_64[0] == key_64_chess_board_tt[Number(index_key_64)]) {
        // зашли по индексу но ключ не совпал
        key_64_not_found__get_position_from_tt = key_64_not_found__get_position_from_tt + 1;
        // такой позиции нет
        clear_out_tt();

        return out_tt;
    }//if (chess_board_key_64[0] == key_64_chess_board_tt[Number(index_key_64)]) {
}

export {
    clear_out_tt, ini_tt, clear_hash_tt, test_uses_hash_tt, set_position_in_tt, get_position_from_tt, print_test_set_get_position_tt,
    MAX_TABLE_LENTH_TT, MAX_SCORE_UPDATE_TT, ALPHA_UPDATE_TT, BETA_UPDATE_TT, ALPHA_CUT_TT, BETA_CUT_TT,
    IND_TN_TT, IND_SC_TT, IND_DD_TT
};