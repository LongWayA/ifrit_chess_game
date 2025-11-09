/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name hash_table_0x88.js
 * @version created 02.11m.2025 
 * last modified 02.11m.2025
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";

/**
* НАЗНАЧЕНИЕ
https://www.chessprogramming.org/Zobrist_Hashing
 В 32-битном хеше коллизия может возникнуть, если вычислить sqrt(2^32) == 2^16, 
 то есть около 65 тысяч позиций. В 64-битном хеше коллизия может возникнуть примерно 
 через 2^32, то есть около 4 миллиардов позиций.
*/

class Hash_table_0x88_C {

    static NAME = "Hash_table_0x88_C";
    //8 388 480
    // static MAX_TABLE_LENTH = 1_048_576;
    //static MAX_TABLE_LENTH = 2_097_152;//2_097_152; 4_194_304; 8_388_608; 16_777_216
    //static MAX_TABLE_LENTH = 16_777_216;//

    static MAX_TABLE_LENTH = 16_384;//1_024 2_048 4_096 8_192 16_384 32_768 65_536

    static ALPHA_CUT = 1;
    static BETA_CUT = 2;

    static ALPHA_UPDATE = 3;
    static BETA_UPDATE = 4;

    static BEST_UPDATE = 5;


    hi_random_piece_color_name_sq = new Array(2);// трехмерный массив ключей положения разных 
    lo_random_piece_color_name_sq = new Array(2);// трехмерный массив ключей положения разных 
    // положений фигур на разных полях 2*6*64 = 768

    // два ключа по 32 байт
    hi_key = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH); // 
    lo_key = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH); // 

    // записываем что это за ход - отсечка по альфе-бете или улучшение альфы-беты 
    // или ход улучшающий локальный максимум или минимум(для черных)
    //  откуда и куда ходит фигура однозначно определяют ход.
    why_save = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH); // тип хода в записанной позиции    
    type_move = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH); // тип хода в записанной позиции
    from = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH); //
    to = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH); //      

    score = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH); // оценка записанной позиции  

    delta_depth = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH);// дельта просчитанной глубины max_depth - depth

    fen = new Array(Hash_table_0x88_C.MAX_TABLE_LENTH); // тип хода в записанной позиции

    max_lenth = 0;

    colz = 0;
    no_colz = 0;
    z = 0;
    z_add = 0;

    constructor() {

    }

    iniM() {
        // инициализируем трехмерный массив 2*7*64 = 896 ячеек
        for (let color = 0; color < 2; color++) {
            this.hi_random_piece_color_name_sq[color] = new Array(7);
            this.lo_random_piece_color_name_sq[color] = new Array(7);
            for (let name = 1; name < 7; name++) {
                this.hi_random_piece_color_name_sq[color][name] = new Array(64);
                this.lo_random_piece_color_name_sq[color][name] = new Array(64);
            }
        }

        this.clear_hash();
        this.ini_random_piece_color_name_sq();

        this.colz = 0;
        this.no_colz = 0;
        this.z = 0;
        this.z_add = 0;
    }

    clear_hash() {
        for (let i = 0; i < Hash_table_0x88_C.MAX_TABLE_LENTH; i++) {

            this.hi_key[i] = -1; // 
            this.lo_key[i] = -1; //
            this.why_save[i] = -1; //             
            this.type_move[i] = -1; //
            this.from[i] = -1; //
            this.to[i] = -1; //      
            this.score[i] = -1; //
            this.delta_depth[i] = -1;// 
            this.fen[i] = ""; // тип хода в записанной позиции
        }
        this.max_lenth = 0;
    }


    test_uses_hash() {

        let us = 0;
        let not_us = 0;

        for (let i = 0; i < Hash_table_0x88_C.MAX_TABLE_LENTH; i++) {

            //if (this.why_save[i] != -1) {
            if (this.type_move[i] != -1) {                
                us = us + 1;
            } else {
                not_us = not_us + 1;
            }
        }

        console.log("Hash_table_0x88_C -> us " + us + " not_us " + not_us);

    }


    is_save_position(chess_board_0x88_O, depth, max_depth) {

        this.z = this.z + 1;

        // это у нас данные текущей позиции.
        let hi_key_board = this.set_key_from_board_0x88(chess_board_0x88_O).hi;
        let lo_key_board = this.set_key_from_board_0x88(chess_board_0x88_O).lo;
        let fen_board = chess_board_0x88_O.set_fen_from_0x88();

        // переводим ключ в индекс доступа хеш таблицы. MAX_TABLE_LENTH должен быть вида 2 в степени н
        // чтобы обрезать лишенне (001111)
        //let hi_key = hi_key_board_0x88 & Hash_table_0x88_C.MAX_TABLE_LENTH;
        let index_hi_key_board = hi_key_board % Hash_table_0x88_C.MAX_TABLE_LENTH;
        //let hi_key = hi_key_board_0x88;        
        //Math.floor();

        if (index_hi_key_board > Hash_table_0x88_C.MAX_TABLE_LENTH) {
            // console.log("Hash_table_0x88_C -> при чтении превышен максимальный размер хеш таблицы ");
            // console.log("Hash_table_0x88_C -> hi_key " + hi_key);
            return 0;
        }

        // если ключ совпал
        let hi_key_from_table = this.hi_key[index_hi_key_board];
        let lo_key_from_table = this.lo_key[index_hi_key_board];
        if ((hi_key_from_table == hi_key_board) && (lo_key_from_table == lo_key_board)) {
            // если тип хода не пустой
            let why_save_from_table = this.why_save[index_hi_key_board];
            if (why_save_from_table != -1) {
                // проверяем что глубина поиска позиции из таблицы больше или равна
                let delta_depth_from_table = this.delta_depth[index_hi_key_board];
                if (delta_depth_from_table <= (max_depth - depth)) {
                    let fen_from_table = this.fen[index_hi_key_board];
                    if (fen_from_table === fen_board) {
                        // console.log("Hash_table_0x88_C-> НЕТ КОЛЛИЗИИ=================");
                        // console.log("Hash_table_0x88_C-> fen_from_table" + fen_from_table);
                        // console.log("Hash_table_0x88_C-> fen_board     " + fen_board);
                        let type_move_from_table = this.type_move[index_hi_key_board];
                        let from_from_table = this.from[index_hi_key_board];
                        let to_from_table = this.to[index_hi_key_board];
                        let score_from_table = this.score[index_hi_key_board];

                        this.no_colz = this.no_colz + 1;
                        return {
                            ws: why_save_from_table, tm: type_move_from_table, sk: score_from_table,
                            from: from_from_table, to: to_from_table
                        };

                    } else {//if (fen === fen_test) {
                        // console.log("Hash_table_0x88_C-> КОЛЛИЗИЯ--------------------");
                        // console.log("Hash_table_0x88_C-> fen      " + fen);
                        // console.log("Hash_table_0x88_C-> fen_test " + fen_test);
                        this.colz = this.colz + 1;
                        // коллизия. ключи совпали, однако, фен запись показала что доски разные
                        return { ws: -1, tm: -1, sk: -1, from: -1, to: -1 };
                    }//if (fen === fen_test) {

                } else {//if (delta_depth <= (max_depth - depth)) {
                    // не прошло по глубине
                    return { ws: -1, tm: -1, sk: -1, from: -1, to: -1 };
                }//if (delta_depth <= (max_depth - depth)) {

            }//if (type_move != -1) {
        } else {//if (lo_key === lo_key_board_0x88) {
            // такой позиции нет
            return { ws: -1, tm: -1, sk: -1, from: -1, to: -1 };
        }//if (lo_key === lo_key_board_0x88) {
    }


    add_position(why_save, type_move, from, to, score, depth, max_depth, chess_board_0x88_O) {

        this.z_add = this.z_add + 1;

        // это у нас данные текущей позиции.
        let hi_key_board = this.set_key_from_board_0x88(chess_board_0x88_O).hi;
        let lo_key_board = this.set_key_from_board_0x88(chess_board_0x88_O).lo;

        let index_hi_key_board = hi_key_board % Hash_table_0x88_C.MAX_TABLE_LENTH;


        if (index_hi_key_board > Hash_table_0x88_C.MAX_TABLE_LENTH) {
            // console.log("Hash_table_0x88_C -> при чтении превышен максимальный размер хеш таблицы ");
            // console.log("Hash_table_0x88_C -> hi_key " + hi_key);
            return 0;
        }

        // если размер ключа больше используемого размера таблицы то увеличиваем размер таблицы.    
        if (index_hi_key_board > this.max_lenth) {

            let max_lenth_2;
            // новый используемый размер таблицы должен быть степенью 2
            for (max_lenth_2 = 2; max_lenth_2 < index_hi_key_board; max_lenth_2 = max_lenth_2 * 2);

            // если новый используемый размер больше максимального то присваеваем макс.
            if (max_lenth_2 > Hash_table_0x88_C.MAX_TABLE_LENTH) {
                //  console.log("Hash_table_0x88_C -> достигнут предел расширения массива ");
                //  console.log("Hash_table_0x88_C -> hi_key " + hi_key);
                this.hash_table_max_lenth = Hash_table_0x88_C.MAX_TABLE_LENTH;
            } else {

                this.max_lenth = max_lenth_2;
            }
        }

        if ((hi_key_board == this.hi_key[index_hi_key_board]) &&
            (lo_key_board == this.lo_key[index_hi_key_board])) {
            // место уже было записано. надо проверить глубину записи
            if (this.delta_depth[index_hi_key_board] <= (max_depth - depth)) {

                this.why_save[index_hi_key_board] = why_save;
                this.type_move[index_hi_key_board] = type_move;
                this.from[index_hi_key_board] = from;
                this.to[index_hi_key_board] = to;
                this.score[index_hi_key_board] = score;
                this.delta_depth[index_hi_key_board] = max_depth - depth;
                this.fen[index_hi_key_board] = chess_board_0x88_O.set_fen_from_0x88();
            }
        } else {
            this.hi_key[index_hi_key_board] = hi_key_board;
            this.lo_key[index_hi_key_board] = lo_key_board;

            this.why_save[index_hi_key_board] = why_save;
            this.type_move[index_hi_key_board] = type_move;
            this.from[index_hi_key_board] = from;
            this.from[index_hi_key_board] = to;
            this.score[index_hi_key_board] = score;
            this.delta_depth[index_hi_key_board] = max_depth - depth;
            this.fen[index_hi_key_board] = chess_board_0x88_O.set_fen_from_0x88();
        }

    }
    /////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////
    // здесь каждому положению каждой фигуры каждого цвета присваивается число 
    // на данный момент это просто color * name * sq, сейчас числа от 1 до 768
    ini_random_piece_color_name_sq() {

        let hi_lo = new Uint32Array(2);

        // заполняем трехмерный массив 2*6*64 = 768 состояний.
        for (let color = 0; color < 2; color++) {
            for (let name = 1; name < 7; name++) {
                for (let sq = 0; sq < 64; sq++) {

                    // Максимальное беззнаковое 16-битное число равно 65 535
                    // Math.floor преобразует число к целому так же как | 0      
                    // Math.random() диапазон от [0,1), причем 0 включается а 1 нет.
                    // 
                    // ключ 5 111 808 если делить на 10, чило 51 118 080 для 16 разрядного
                    //  ключа после умнож. на цвет поле и фигуру
                    //let hi = Math.floor(Math.random() * 65536);//65536   1302
                    //let lo = Math.floor(Math.random() * 65536);//65536   1302

                    self.crypto.getRandomValues(hi_lo);                   
                    //window.crypto.getRandomValues(hi_lo);
                    let hi = hi_lo[0];//
                    let lo = hi_lo[1];//


                    this.hi_random_piece_color_name_sq[color][name][sq] = hi * (color + 1) * name * (sq + 1);
                    this.lo_random_piece_color_name_sq[color][name][sq] = lo * (color + 1) * name * (sq + 1);
                }
            }
        }
    }

    set_key_from_board_0x88(chess_board_0x88_O) {

        let sq_0x88;
        let piece;
        let piece_color;
        let hi_key_board_0x88 = 0;
        let lo_key_board_0x88 = 0;

        // бежим по шахматной доске
        for (let sq = 0; sq < 64; sq++) {

            sq_0x88 = Chess_board_0x88_C.SQUARE_64[sq];
            piece = chess_board_0x88_O.sq_piece_0x88[sq_0x88];

            if (piece != 0) {
                piece_color = chess_board_0x88_O.sq_piece_color_0x88[sq_0x88];

                hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_random_piece_color_name_sq[piece_color][piece][sq];
                lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_random_piece_color_name_sq[piece_color][piece][sq];

            }
        }

        if (chess_board_0x88_O.side_to_move == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_random_piece_color_name_sq[1][6][10];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_random_piece_color_name_sq[1][6][10];
        }

        if (chess_board_0x88_O.en_passant_yes == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_random_piece_color_name_sq[1][5][20];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_random_piece_color_name_sq[1][5][20];
        }

        if (chess_board_0x88_O.castling_Q == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_random_piece_color_name_sq[1][4][30];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_random_piece_color_name_sq[1][4][30];
        }

        if (chess_board_0x88_O.castling_K == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_random_piece_color_name_sq[1][4][40];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_random_piece_color_name_sq[1][4][40];
        }

        if (chess_board_0x88_O.castling_q == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_random_piece_color_name_sq[0][4][30];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_random_piece_color_name_sq[0][4][30];
        }

        if (chess_board_0x88_O.castling_k == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_random_piece_color_name_sq[0][4][40];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_random_piece_color_name_sq[0][4][40];
        }
        // if (hi_key_board_0x88 > Hash_table_0x88_C.MAX_TABLE_LENTH) {
        //     console.log("Hash_table_0x88_C -> при генерации превышен размер ключа позиции ");
        //     console.log("Hash_table_0x88_C -> hi_key_board_0x88 " + hi_key_board_0x88);
        // }

        return { hi: hi_key_board_0x88, lo: lo_key_board_0x88 };
    }
}

export{Hash_table_0x88_C};

/*
где то скопировал. не помню где
var zobrist = new Uint32Array(13 * 2 * 64 * 2) // pieces * colors * fields * 64/32
for (var i=0; i<zobrist.length; i++)
    zobrist[i] = Math.random() * 4294967296;

var table = new Uint32Array(3 * tablesize);

function hash(hi, lo, piece, color, field) {
    hi ^= zobrist[piece * 128 + color * 64 + field];
    lo ^= zobrist[piece * 128 + color * 64 + field + 1];

    var i = lo % tablesize;
    if (table[i] == hi && table[i+1] == lo) {
        // collision
    } else {
        table[i] = hi; table[i+1] = lo;
        // do what you want with table[i+2]
    }
}

*/