// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name transposition_table_0x88.js
 * @version created 07.02m.2026 
*/

import {
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piese_0x88_cb, test_print_piese_color_0x88_cb, test_print_piese_in_line_0x88_cb, 
    test_compare_chess_board_0x88_cb,save_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb, 
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    IND_MAX_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB, 
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB, 
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB,  SQUARE_128_to_64_CB
} from "../move_generator_0x88/chess_board_0x88.js";

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

 В таблицу пишем:
 key_64_chess_board_tt - 64 битный хеш ключ позиции
 packing_move_tt       - упакованный ход записанный для этой позиции
 score_tt              - оценка варианта с первым записанным ходом для этой позиции
 type_save_node_tt     - тип хода записанный для этой позиции. здесь тип хода значит отношение к альфа бете 
 delta_depth_tt        - глубина на которую посмотрели позицию
 test_fen_tt           - записали фен для этой позиции. нужно для тестирования коллизий с ключом

 Понятно что три значения(score_tt, type_save_node_tt, delta_depth_tt) можно упаковать в одно, но пока вроде не критично

*/
//-

//8 388 480
//const MAX_TABLE_LENTH = 1_048_576;
//const MAX_TABLE_LENTH = 2_097_152;//2_097_152; 4_194_304; 8_388_608; 16_777_216
//const MAX_TABLE_LENTH = 16_777_216;//

//const MAX_TABLE_LENTH = 16_384;//1_024 2_048 4_096 8_192 16_384 32_768 65_536
const MAX_TABLE_LENTH_TT = 65_536;

const MAX_SCORE_UPDATE_TT = 1;// не использую. флаг записи точной оценки позиции

const ALPHA_UPDATE_TT = 2;// флаг записи хода который улучшил альфу
const BETA_UPDATE_TT = 3;// флаг записи хода который улучшил бету

const ALPHA_CUT_TT = 4;// флаг записи хода приведшего к отсечке по альфе
const BETA_CUT_TT = 5;// флаг записи хода приведшего к отсечке по бете

// индексы для доступа к массиву out_tt
const IND_TN_TT = 0;// индекс для записи типа узла (улучшение альфы или отсечка и т.д.)
const IND_SC_TT = 1;// индекс для записи оценки хода
const IND_DD_TT = 2;// индекс для записи на сколько ходов смотрели позицию delta_depth = max_depth - depth

// массив нужен для возвращения значений из функции get_position_from_tt(записанный ход передается через параметр)
// в нем записаны: типа узла, оценка хода, delta_depth
const out_tt = [-1, -1, -1];//

// 64 битный ключ позиции   
const key_64_chess_board_tt = new BigUint64Array(MAX_TABLE_LENTH_TT);

// записанный упакованный ход
const packing_move_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// оценка позиции
const score_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// тип записанного хода. улучшение альфы-беты или отсечка по альфе-бете или точная оценка
const type_save_node_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// глубина на которую посмотрели позицию
const delta_depth_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// test_fen_board ----------------------------------------------------------------------------------
// тестовый фен позиции. смотрим насколько адекватный получается ключ позиции
const test_fen_tt = new Array(MAX_TABLE_LENTH_TT); // тип хода в записанной позиции

// test
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

    if (yes_collision_fen != 0) {

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

/**
* добавляем ход в таблицу
* @param {BigUint64Array} chess_board_key_64
* @param {Int32Array} packing_moves
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

/**
* смотрим есть ли у нас в таблице такая позиция и если есть извлекаем ход
* @param {BigUint64Array} chess_board_key_64
* @param {Int32Array} packing_moves_1
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