// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name transposition_table_0x88.js
 * @version created 02.11m.2025 
*/

import {
    x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
    test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
    save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
    IND_MAX, SIDE_TO_MOVE, LET_COOR,
    BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
    IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
    IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK
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
const IND_TM_TT = 1;
const IND_SC_TT = 2;
const IND_FROM_TT = 3;
const IND_TO_TT = 4;
const IND_DD_TT = 5;

const out_tt = [-1, -1, -1, -1, -1, -1];

// 64 битный ключ позиции   
const key_64_tt = new BigUint64Array(MAX_TABLE_LENTH_TT);

// записанный упакованный ход
const packing_move_tt = new Uint32Array(MAX_TABLE_LENTH_TT);


// оценка позиции
const score_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// тип записанного хода. улучшение альфы-беты или отсечка по альфе-бете или точная оценка
const type_save_move_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// test_fen_board ----------------------------------------------------------------------------------
// тестовый фен позиции. смотрим насколько адекватный получается ключ позиции
//test_fen = new Array(MAX_TABLE_LENTH); // тип хода в записанной позиции

//
let max_lenth_tt = MAX_TABLE_LENTH_TT - 1;

// трехмерный массив ключей положения разных 
const key_array_64_tt = new Array(2);// положений фигур на разных полях 2 * 7 * 64 = 896

//key_64_equal = 0;// совпадающие ключи
//key_64_not_equal = 0;

//add_position_p = 0;// зашли чтобы попытаться добавить позицию

//add_position_key_64_true = 0;// ключ при добавлении позиции уже есть

//add_position_new = 0;// добавили позицию по новой
//add_position_rew = 0;// добавили позицию перезаписав старую   

//is_save_position_p = 0;

//is_save_key_64_true = 0;// зашли по индексу но ключ не совпал
//is_save_key_64_false = 0;// зашли по индексу и ключ совпал

//is_save_delta_depth_ok = 0;// глубина поиска из таблицы больше чем в узле

//collision_fen = 0;// зашли по индексу но фен не совпал
//no_collision_fen = 0;// зашли по индексу и фен совпал


const clear_out_tt = function () {

    out_tt[IND_TN_TT] = -1;
    out_tt[IND_TM_TT] = -1;
    out_tt[IND_SC_TT] = -1;
    out_tt[IND_FROM_TT] = -1;
    out_tt[IND_TO_TT] = -1;
    out_tt[IND_DD_TT] = -1;
}

const ini_key_array_64_tt = function () {

    //console.log("Transposition_table_0x88_C -> iniM");

    // инициализируем трехмерный массив 2*7*64 = 896 ячеек
    for (let color = 0; color < 2; color++) {

        key_array_64_tt[color] = new Array(7);

        for (let name = 0; name < 7; name++) {

            key_array_64_tt[color][name] = new BigUint64Array(64);
        }
    }

    clear_hash_tt();
    //key_64_equal = 0; // test  
    //key_64_not_equal = 0; // test
    ini_random_key_array_64_tt();
    max_lenth_tt = MAX_TABLE_LENTH_TT - 1;

    clear_out_tt();

    // test
    //add_position_p = 0;// зашли чтобы попытаться добавить позицию
    //add_position_key_64_true = 0;// ключ при добавлении позиции уже есть
    //add_position_new = 0;// добавили позицию по новой
    //add_position_rew = 0;// добавили позицию перезаписав старую  
    //is_save_position_p = 0;
    //is_save_key_64_true = 0;// зашли по индексу но ключ не совпал
    //is_save_key_64_false = 0;// зашли по индексу и ключ совпал
    //is_save_delta_depth_ok = 0;// глубина поиска из таблицы больше чем в узле
    //collision_fen = 0;// зашли по индексу но фен не совпал
    //no_collision_fen = 0;// зашли по индексу и фен совпал


}

const clear_hash_tt = function () {
    for (let i = 0; i < MAX_TABLE_LENTH_TT; i++) {

        key_64_tt[i] = 0n; //            
        packing_move_tt[i] = 0; // 
        score_tt[i] = 0; // 
        type_save_move_tt[i] = 0; //

        // test_fen_board ----------------------------------------------------------------------------------
        //test_fen[i] = ""; //  
    }
    //max_lenth = 0;
}

// сколько позиций записано
const test_uses_hash_tt = function () {

    let save_position = 0;
    let not_save_position = 0;

    for (let i = 0; i < MAX_TABLE_LENTH_TT; i++) {

        if (key_64_tt[i] != 0n) {
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
* @param {number} type_nodes
* @param {number} type_move
* @param {number} score
* @param {number} from_128
* @param {number} to_128
* @param {number} depth
* @param {number} max_depth
* @param {Chess_board_0x88_C} chess_board_0x88_O 
* @returns {void}
*/
const add_position_tt = function (key_64_chess_board, type_nodes, score, depth, max_depth) {

    //add_position_p = add_position_p + 1;// зашли что бы попытаться добавить позицию

    //test
    //if (type_nodes == 0) console.log("Transposition_table_0x88_C-> type_nodes == 0 !!!! depth " + depth);
    //if (type_move == -1) console.log("Transposition_table_0x88_C-> type_move == -1 !!!! depth " + depth);
    //if (from_128 == -1) console.log("Transposition_table_0x88_C-> from_128 == -1 !!!! depth " + depth);
    //if (to_128 == -1) console.log("Transposition_table_0x88_C-> to_128 == -1 !!!! depth " + depth);                     

    // текущей позиции.
    let key_64_chess_board_tt = key_64_chess_board;
    //console.log("Transposition_table_0x88_C -> key_64_board " + key_64_board);

    // определяем по ключу индекс для доступа к таблице
    let index_key_64_board = key_64_board & BigInt(MAX_TABLE_LENTH - 1);//
    //console.log("Transposition_table_0x88_C -> index_key_64_board " + index_key_64_board);  
    //console.log("Transposition_table_0x88_C -> MAX_TABLE_LENTH - 1 " + (MAX_TABLE_LENTH - 1).toString(2));              

    let delta_depth_board = max_depth - depth;

    //test      
    //test(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth_board);

    /////////////////////////////////////////////////// 
    // ключ совпал значит мы видимо эту позицию когда то смотрели      
    if (key_64_board == key_64[Number(index_key_64_board)]) {

        //add_position_key_64_true = add_position_key_64_true + 1;// ключ при добавлении позиции уже есть

        // распаковываем move выделяя delta_depth_move
        let delta_depth_move = move[Number(index_key_64_board)] & 127; //

        // место уже было записано. надо проверить глубину записи
        if (delta_depth_move <= delta_depth_board) {

            //add_position_rew = add_position_rew + 1;// добавили позицию перезаписав старую

            // запаковываем move
            packing_to_move(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth_board);

            score[Number(index_key_64_board)] = score;

            //test     out = { tn: -1, tm: -1, sc: -1, from: -1, to: -1, dd: -1 };
            // unpacking_from_move(index_key_64_board);
            // if (out.tn == 0) console.log("add res Transposition_table_0x88_C-> tn == 0 !!!! dd " + out.dd);
            // if (out.tm == -1) console.log("add res Transposition_table_0x88_C-> tm == -1 !!!! dd " + out.dd);
            // if (out.from == -1) console.log("add res Transposition_table_0x88_C-> from == -1 !!!! dd " + out.dd);
            // if (out.to == -1) console.log("add res Transposition_table_0x88_C-> to == -1 !!!! dd " + out.dd);

            // test_fen_board ----------------------------------------------------------------------------------                
            //test_fen[index_key_64_board] = chess_board_0x88_O.set_fen_from_0x88();
        }
    } else {

        //add_position_new = add_position_new + 1;// добавили позицию по новой

        key_64[Number(index_key_64_board)] = key_64_board;

        // запаковываем move
        packing_to_move(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth_board);

        score[Number(index_key_64_board)] = score;

        //test     out = { tn: -1, tm: -1, sc: -1, from: -1, to: -1, dd: -1 };
        // unpacking_from_move(index_key_64_board);
        // if (out.tn == 0) console.log("add Transposition_table_0x88_C-> tn == 0 !!!! dd " + out.dd);
        // if (out.tm == -1) console.log("add Transposition_table_0x88_C-> tm == -1 !!!! dd " + out.dd);
        // if (out.from == -1) console.log("add Transposition_table_0x88_C-> from == -1 !!!! dd " + out.dd);
        // if (out.to == -1) console.log("add Transposition_table_0x88_C-> to == -1 !!!! dd " + out.dd);

        // test_fen_board ----------------------------------------------------------------------------------            
        //test_fen[index_key_64_board] = chess_board_0x88_O.set_fen_from_0x88();
    }

}

// смотрим есть ли у нас в таблице такая позиция и если есть извлекаем ход
/**
* @param {Chess_board_0x88_C} chess_board_0x88_O 
* @param {number} depth
* @param {number} max_depth 
* @returns {out}
*/
const is_save_position = function (chess_board_0x88_O, depth, max_depth) {

    // всего было обращений в запись
    //is_save_position_p = is_save_position_p + 1;

    // ключ текущей позиции.
    let key_64_board = chess_board_0x88_O.key_64;

    // test
    // let key_64_board2 = set_key_from_board_0x88(chess_board_0x88_O);               
    // if (key_64_board != key_64_board2) {
    //     console.log("Transposition_table_0x88_C -> NOT key_64 !");
    //     console.log("Transposition_table_0x88_C -> chess_board_0x88_O.key_64 " + chess_board_0x88_O.key_64);
    //     console.log("Transposition_table_0x88_C -> key_64_board " + key_64_board);
    //     chess_board_0x88_O.test_print_0x88();
    // }

    // определяем по ключу индекс для доступа к таблице
    let index_key_64_board = key_64_board & BigInt(MAX_TABLE_LENTH - 1);//&

    let key_64_table = key_64[Number(index_key_64_board)];

    // если ключ совпал
    if (key_64_board == key_64_table) {

        // зашли по индексу и ключ совпал
        //is_save_key_64_true = is_save_key_64_true + 1;

        let delta_depth_board = max_depth - depth;
        // распаковываем move выделяя delta_depth_move
        let delta_depth_move = move[Number(index_key_64_board)] & 127; //            

        // проверяем что глубина поиска позиции из таблицы больше или равна
        if (delta_depth_move >= delta_depth_board) {

            // прошли тест по глубине поиска
            //is_save_delta_depth_ok = is_save_delta_depth_ok + 1;

            // // test_fen_board ----------------------------------------------------------------------------------   
            // let test_fen_board = chess_board_0x88_O.set_fen_from_0x88();
            // let test_fen = test_fen[index_key_64_board];

            // if (test_fen === test_fen_board) {
            //     no_collision_fen = no_collision_fen + 1;// зашли по индексу и фен совпал
            // } else {//if (fen === fen_test) {
            //     collision_fen = collision_fen + 1;// зашли по индексу но фен не совпал
            // }//if (fen === fen_test) {

            //распаковываем
            unpacking_from_move(index_key_64_board);

            out.sc = score[Number(index_key_64_board)];

            //test     out = { tn: -1, tm: -1, sc: -1, from: -1, to: -1, dd: -1 };
            // if (out.tn == 0) console.log("Transposition_table_0x88_C-> tn == 0 !!!! dd " + out.dd);
            // if (out.tm == -1) console.log("Transposition_table_0x88_C-> tm == -1 !!!! dd " + out.dd);
            // if (out.from == -1) console.log("Transposition_table_0x88_C-> from == -1 !!!! dd " + out.dd);
            // if (out.to == -1) console.log("Transposition_table_0x88_C-> to == -1 !!!! dd " + out.dd);


            return out;

        } else {//if (delta_depth <= (max_depth - depth)) {

            //распаковываем
            unpacking_from_move(index_key_64_board);

            //console.log("----Transposition_table_0x88_C -> out.tn " + out.tn);

            if ((out.tn == ALPHA_UPDATE) || (out.tn == BETA_UPDATE)) {

                // // test_fen_board ----------------------------------------------------------------------------------   
                // let test_fen_board = chess_board_0x88_O.set_fen_from_0x88();
                // let test_fen = test_fen[index_key_64_board];

                // if (test_fen === test_fen_board) {
                //     no_collision_fen = no_collision_fen + 1;// зашли по индексу и фен совпал
                // } else {//if (fen === fen_test) {
                //     collision_fen = collision_fen + 1;// зашли по индексу но фен не совпал
                // }//if (fen === fen_test) {

                //console.log("AB----Transposition_table_0x88_C -> out.tn " + out.tn);

            } else {
                clear_out();
            }

            return out;
        }//if (delta_depth <= (max_depth - depth)) {

    } else {//if (lo_key === lo_key_board_0x88) {
        // зашли по индексу но ключ не совпал
        //is_save_key_64_false = is_save_key_64_false + 1;
        // такой позиции нет
        clear_out();

        return out;
    }//if (lo_key === lo_key_board_0x88) {
}

// простой ход и взятия. принципиальный момент обработка фигуры которую берем.
/**
* @param {number} from128
* @param {number} to128
* @param {number} piece_from
* @param {number} piece_to
* @param {number} piece_color 
* @param {Chess_board_0x88_C} chess_board_0x88_O 
* @returns {void}
*/
const key_update_do_move_0x88 = function (from128, to128, piece_from, piece_to, piece_color, chess_board_0x88_O) {

    let from64 = Chess_board_0x88_C.SQUARE_128_to_64[from128];
    let to64 = Chess_board_0x88_C.SQUARE_128_to_64[to128];


    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][piece_from][from64];
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][piece_from][to64];

    // если есть фигура которую берем ее надо убрать из хеш ключа
    if (piece_to != 0) {
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1 - piece_color][piece_to][to64];
    }

    // side_to_move
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1][6][10];
}

// взятие на проходе
/**
* @param {number} from128
* @param {number} to128
* @param {number} ep128
* @param {number} piece_to
* @param {number} piece_color 
* @param {Chess_board_0x88_C} chess_board_0x88_O 
* @returns {void}
*/
const key_update_ep_move_0x88 = function (from128, to128, ep128, piece_to, piece_color, chess_board_0x88_O) {

    let from64 = Chess_board_0x88_C.SQUARE_128_to_64[from128];
    let to64 = Chess_board_0x88_C.SQUARE_128_to_64[to128];
    let ep64 = Chess_board_0x88_C.SQUARE_128_to_64[ep128];

    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][piece_to][from64];
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][piece_to][to64];
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1 - piece_color][piece_to][ep64];

    // side_to_move
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1][6][10];
}

// превращение и превращение с взятием. принципиальный момент обработка фигуры которую берем.
/**
* @param {number} from128
* @param {number} to128
* @param {number} piece_promo
* @param {number} piece_to
* @param {number} piece_color 
* @param {Chess_board_0x88_C} chess_board_0x88_O 
* @returns {void}
*/
const key_update_promo_move_0x88 = function (from128, to128, piece_promo, piece_to, piece_color, chess_board_0x88_O) {

    let from64 = Chess_board_0x88_C.SQUARE_128_to_64[from128];
    let to64 = Chess_board_0x88_C.SQUARE_128_to_64[to128];


    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][Chess_board_0x88_C.PAWN][from64];
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][piece_promo][to64];

    // если есть фигура которую берем ее надо убрать из хеш ключа
    if (piece_to != 0) {
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1 - piece_color][piece_to][to64];
    }

    // side_to_move
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1][6][10];
}

// рокировки
/**
* @param {number} from128
* @param {number} to128
* @param {number} r_from128
* @param {number} r_to128
* @param {number} piece_color 
* @param {Chess_board_0x88_C} chess_board_0x88_O 
* @returns {void}
*/
const key_update_castle_move_0x88 = function (from128, to128, r_from128, r_to128, piece_color, chess_board_0x88_O) {

    let from64 = Chess_board_0x88_C.SQUARE_128_to_64[from128];
    let to64 = Chess_board_0x88_C.SQUARE_128_to_64[to128];
    let r_from64 = Chess_board_0x88_C.SQUARE_128_to_64[r_from128];
    let r_to64 = Chess_board_0x88_C.SQUARE_128_to_64[r_to128];

    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][Chess_board_0x88_C.KING][from64];
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][Chess_board_0x88_C.KING][to64];

    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][Chess_board_0x88_C.ROOK][r_from64];
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[piece_color][Chess_board_0x88_C.ROOK][r_to64];

    // side_to_move
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1][6][10];
}


// это переключение флага взятия на проходе
/**
 * @param {Chess_board_0x88_C} chess_board_0x88_O 
 * @returns {void}
*/
const key_update_ep_0x88 = function (chess_board_0x88_O) {
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1][5][20];
}

// это переключени поля взятия на проходе
/**
 * @param {Chess_board_0x88_C} chess_board_0x88_O 
 * @returns {void}
*/
const key_update_ep2_0x88 = function (chess_board_0x88_O) {
    chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^
        BigInt(chess_board_0x88_O.en_passant_target_square) ^ key_array_64[1][5][25];
}

// обрабатываем флаги возможности рокировок
/**
* @param {number} Q
* @param {number} q
* @param {number} K
* @param {number} k
* @param {Chess_board_0x88_C} chess_board_0x88_O 
* @returns {void}
*/
const key_update_QqKk_0x88 = function (Q, q, K, k, chess_board_0x88_O) {

    if (Q == 1) {
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1][4][30];
    }

    if (K == 1) {
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[1][4][40];
    }

    if (q == 1) {
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[0][4][30];
    }

    if (k == 1) {
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ key_array_64[0][4][40];
    }
}


//////////////////////////////////////////////////////////////////////////////

// здесь каждому положению каждой фигуры каждого цвета присваивается случайное число 
const ini_random_key_array_64 = function () {
    //console.log("Transposition_table_0x88_C -> ini_random_key_array_32");
    let uint_a_64 = new BigUint64Array(1);
    let uint64 = 0n;

    // заполняем трехмерный массив 2*6*64 = 768 состояний.
    for (let color = 0; color < 2; color++) {
        for (let name = 1; name < 7; name++) {
            for (let sq = 0; sq < 64; sq++) {

                // Максимальное беззнаковое 16-битное число равно 65 535
                // Math.floor преобразует число к целому так же как | 0      
                // Math.random() диапазон от [0,1), причем 0 включается а 1 нет.

                //let hi = Math.floor(Math.random() * 65536);//65536   1302
                //let lo = Math.floor(Math.random() * 65536);//65536   1302
                // nnnnnnnnnnnnnnnnnnnnnn
                //crypto.getRandomValues(uint_a_64);
                self.crypto.getRandomValues(uint_a_64);
                //window.crypto.getRandomValues(hi_lo);
                uint64 = uint_a_64[0];//

                key_array_64[color][name][sq] = uint64;
            }
        }
    }

    // поищем совпадение ключей
    for (let color1 = 0; color1 < 2; color1++) {
        for (let name1 = 1; name1 < 7; name1++) {
            for (let sq1 = 0; sq1 < 64; sq1++) {

                //key_64_not_equal = key_64_not_equal + 1;

                for (let color2 = 0; color2 < 2; color2++) {
                    for (let name2 = 1; name2 < 7; name2++) {
                        for (let sq2 = 0; sq2 < 64; sq2++) {
                            //768
                            if ((color1 == color2) && (name1 == name2) && (sq1 == sq2)) {
                                //key_64_not_equal = key_64_not_equal + 1;
                            } else {
                                if (key_array_64[color1][name1][sq1] == key_array_64[color2][name2][sq2]) {
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
    }
    //console.log("Transposition_table_0x88_C key_64_equal " + key_64_equal);

}

// по позиции генерируем ключ
/**
 * @param {Chess_board_0x88_C} chess_board_0x88_O 
 * @returns {bigint}
*/
const set_key_from_board_0x88 = function (chess_board_0x88_O) {

    let sq_0x88;
    let piece;
    let piece_color;
    let key_64 = 0n;

    // бежим по шахматной доске
    for (let sq = 0; sq < 64; sq++) {

        sq_0x88 = Chess_board_0x88_C.SQUARE_64_to_128[sq];
        piece = chess_board_0x88_O.sq_piece_0x88[sq_0x88];

        if (piece != 0) {
            piece_color = chess_board_0x88_O.sq_piece_color_0x88[sq_0x88];

            key_64 = key_64 ^ key_array_64[piece_color][piece][sq];
        }
    }

    if (chess_board_0x88_O.side_to_move == 1) {
        key_64 = key_64 ^ key_array_64[1][6][10];
    }

    if (chess_board_0x88_O.en_passant_yes == 1) {
        key_64 = key_64 ^ key_array_64[1][5][20];
    }

    key_64 = key_64 ^ BigInt(chess_board_0x88_O.en_passant_target_square) ^ key_array_64[1][5][25];


    if (chess_board_0x88_O.castling_Q == 1) {
        key_64 = key_64 ^ key_array_64[1][4][30];
    }

    if (chess_board_0x88_O.castling_K == 1) {
        key_64 = key_64 ^ key_array_64[1][4][40];
    }

    if (chess_board_0x88_O.castling_q == 1) {
        key_64 = key_64 ^ key_array_64[0][4][30];
    }

    if (chess_board_0x88_O.castling_k == 1) {
        key_64 = key_64 ^ key_array_64[0][4][40];
    }

    return key_64;
}

export { };