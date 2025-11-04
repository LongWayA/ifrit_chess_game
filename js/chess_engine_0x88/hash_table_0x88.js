/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name hash_table_0x88.js
 * @version created 02.11m.2025 
 * last modified 02.11m.2025
*/

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
    static MAX_MAX_LENTH = 8_388_608;//2 097 152; 4 194 304; 8 388 608; 16 777 216

    static ALPHA_UPDATE = 1;
    static BETA_UPDATE = 2;
    static ALPHA_CUT = 3;
    static BETA_CUT = 4;



    hi_key_piece_color_name_sq = new Array(2);// трехмерный массив ключей положения разных 
    lo_key_piece_color_name_sq = new Array(2);// трехмерный массив ключей положения разных 
    // положений фигур на разных полях 2*6*64 = 768

    hash_table_lo_key = new Array(Hash_table_0x88_C.MAX_MAX_LENTH + 1).fill(-1); // тип хода в записанной позиции
    hash_table_type_move = new Array(Hash_table_0x88_C.MAX_MAX_LENTH + 1).fill(-1); // тип хода в записанной позиции
    hash_table_i_move = new Array(Hash_table_0x88_C.MAX_MAX_LENTH + 1).fill(-1); // номер хода в записанной позиции 
    hash_table_score = new Array(Hash_table_0x88_C.MAX_MAX_LENTH + 1).fill(-1); // оценка записанной позиции      
    hash_table_delta_depth = new Array(Hash_table_0x88_C.MAX_MAX_LENTH + 1).fill(-1);// дельта просчитанной глубины max_depth - depth

    hash_table_fen = new Array(Hash_table_0x88_C.MAX_MAX_LENTH + 1).fill(""); // тип хода в записанной позиции

    hash_table_max_lenth = 10;

    colz = 0;
    no_colz = 0;
    z = 0;
    z_add = 0;

    constructor() {

    }

    iniM() {
        // инициализируем трехмерный массив 2*7*64 = 896 ячеек
        for (let color = 0; color < 2; color++) {
            this.hi_key_piece_color_name_sq[color] = new Array(7);
            this.lo_key_piece_color_name_sq[color] = new Array(7);
            for (let name = 1; name < 7; name++) {
                this.hi_key_piece_color_name_sq[color][name] = new Array(64);
                this.lo_key_piece_color_name_sq[color][name] = new Array(64);
            }
        }
        this.ini_key_piece_color_name_sq();
        this.colz = 0;
        this.no_colz = 0;
        this.z = 0;
        this.z_add = 0;
    }

    is_save_position(chess_board_0x88_O, depth, max_depth) {

        this.z = this.z + 1;

        // это у нас данные текущей позиции.
        let hi_key_board_0x88 = this.set_key_from_board_0x88(chess_board_0x88_O).hi;
        let lo_key_board_0x88 = this.set_key_from_board_0x88(chess_board_0x88_O).lo;
        let fen_test = chess_board_0x88_O.set_fen_from_0x88();

        // переводим ключ в индекс доступа хеш таблицы. MAX_MAX_LENTH должен быть вида 2 в степени н
        // чтобы обрезать лишенне (001111)
        //let hi_key = hi_key_board_0x88 & Hash_table_0x88_C.MAX_MAX_LENTH;
        let hi_key = hi_key_board_0x88 % Hash_table_0x88_C.MAX_MAX_LENTH;
        //let hi_key = hi_key_board_0x88;        
        //Math.floor();

        if (hi_key > Hash_table_0x88_C.MAX_MAX_LENTH) {
            console.log("Hash_table_0x88_C -> при чтении превышен максимальный размер хеш таблицы ");
            console.log("Hash_table_0x88_C -> hi_key " + hi_key);
            return 0;
        }

        // заходим в таблицу по найденому адресу. это у нас hi часть ключа 
        let lo_key = this.hash_table_lo_key[hi_key];
        let type_move = this.hash_table_type_move[hi_key];
        let delta_depth = this.hash_table_delta_depth[hi_key];
        let fen = this.hash_table_fen[hi_key];


        // если ключ совпал
        if (lo_key === lo_key_board_0x88) {
            // если тип хода не пустой
            if (type_move != -1) {
                // проверяем что глубина поиска позиции из таблицы больше или равна
                if (delta_depth <= (max_depth - depth)) {
                    if (fen === fen_test) {
                        // console.log("Hash_table_0x88_C-> НЕТ КОЛЛИЗИИ=================");
                        // console.log("Hash_table_0x88_C-> fen      " + fen);
                        // console.log("Hash_table_0x88_C-> fen_test " + fen_test);
                        this.no_colz = this.no_colz + 1;
                        return { tm: type_move, kb: hi_key_board_0x88, fn: fen };

                    } else {//if (fen === fen_test) {
                        // console.log("Hash_table_0x88_C-> КОЛЛИЗИЯ--------------------");
                        // console.log("Hash_table_0x88_C-> fen      " + fen);
                        // console.log("Hash_table_0x88_C-> fen_test " + fen_test);
                        this.colz = this.colz + 1;
                        return { tm: -1, kb: hi_key_board_0x88, fn: fen };
                    }//if (fen === fen_test) {

                } else {//if (delta_depth <= (max_depth - depth)) {
                    return { tm: -1, kb: hi_key_board_0x88, fn: fen };
                }//if (delta_depth <= (max_depth - depth)) {

            }//if (type_move != -1) {
        } else {//if (lo_key === lo_key_board_0x88) {
            return { tm: -1, kb: hi_key_board_0x88, fn: fen };
        }//if (lo_key === lo_key_board_0x88) {
    }


    add_position(type_move, i_move, depth, max_depth, score, chess_board_0x88_O) {

        this.z_add = this.z_add + 1;

        let hi_key_board_0x88 = this.set_key_from_board_0x88(chess_board_0x88_O).hi;
        let lo_key_board_0x88 = this.set_key_from_board_0x88(chess_board_0x88_O).lo;

        // для 16 битных чисел & не работает
        //let hi_key = hi_key_board_0x88 & Hash_table_0x88_C.MAX_MAX_LENTH;
        let hi_key = hi_key_board_0x88 % Hash_table_0x88_C.MAX_MAX_LENTH;
        //let hi_key = hi_key_board_0x88;

        //console.log("Hash_table_0x88_C -> hi_key " + hi_key + " hi_key_board_0x88 " + hi_key_board_0x88);

        if (hi_key > Hash_table_0x88_C.MAX_MAX_LENTH) {
            console.log("Hash_table_0x88_C -> при чтении превышен максимальный размер хеш таблицы ");
            console.log("Hash_table_0x88_C -> hi_key " + hi_key);
            return 0;
        }

        if (hi_key > this.hash_table_max_lenth) {

            let max_lenth_2;
            for (max_lenth_2 = 2; max_lenth_2 < hi_key; max_lenth_2 = max_lenth_2 * 2);

            if (max_lenth_2 > Hash_table_0x88_C.MAX_MAX_LENTH) {
                console.log("Hash_table_0x88_C -> достигнут предел расширения массива ");
                console.log("Hash_table_0x88_C -> hi_key " + hi_key);
                this.hash_table_max_lenth = Hash_table_0x88_C.MAX_MAX_LENTH;
            } else {
                console.log("Hash_table_0x88_C -> расширяем массив ");
                console.log("Hash_table_0x88_C -> hi_key " + hi_key);

                // расширяем массив
                // for (let h = this.hash_table_max_lenth; h < (max_lenth_2 + 1); h++) {
                //     this.hash_table_lo_key[h] = -1;
                //     this.hash_table_type_move[h] = -1;
                //     this.hash_table_i_move[h] = -1;
                //     this.hash_table_score[h] = -1;
                //     this.hash_table_delta_depth[h] = -1;
                //     this.hash_table_fen[h] = "";
                // }
                this.hash_table_max_lenth = max_lenth_2;
            }

        }

        if (lo_key_board_0x88 == this.hash_table_lo_key[hi_key]) {
            // место уже было записано. надо проверить глубину записи
            if (this.hash_table_delta_depth[hi_key] <= (max_depth - depth)) {
                this.hash_table_lo_key[hi_key] = lo_key_board_0x88;
                this.hash_table_type_move[hi_key] = type_move;
                this.hash_table_i_move[hi_key] = i_move;
                this.hash_table_score[hi_key] = score;
                this.hash_table_delta_depth[hi_key] = (max_depth - depth);
                this.hash_table_fen[hi_key] = chess_board_0x88_O.set_fen_from_0x88();
            }
        } else {
            this.hash_table_lo_key[hi_key] = lo_key_board_0x88;
            this.hash_table_type_move[hi_key] = type_move;
            this.hash_table_i_move[hi_key] = i_move;
            this.hash_table_score[hi_key] = score;
            this.hash_table_delta_depth[hi_key] = (max_depth - depth);
            this.hash_table_fen[hi_key] = chess_board_0x88_O.set_fen_from_0x88();
        }

    }
    /////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////
    // здесь каждому положению каждой фигуры каждого цвета присваивается число 
    // на данный момент это просто color * name * sq, сейчас числа от 1 до 768
    ini_key_piece_color_name_sq() {

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


                    this.hi_key_piece_color_name_sq[color][name][sq] = hi * (color + 1) * name * (sq + 1);
                    this.lo_key_piece_color_name_sq[color][name][sq] = lo * (color + 1) * name * (sq + 1);
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

                hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_key_piece_color_name_sq[piece_color][piece][sq];
                lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_key_piece_color_name_sq[piece_color][piece][sq];

            }
        }

        if (chess_board_0x88_O.side_to_move == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_key_piece_color_name_sq[1][6][10];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_key_piece_color_name_sq[1][6][10];
        }

        if (chess_board_0x88_O.en_passant_yes == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_key_piece_color_name_sq[1][5][20];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_key_piece_color_name_sq[1][5][20];
        }

        if (chess_board_0x88_O.castling_Q == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_key_piece_color_name_sq[1][4][30];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_key_piece_color_name_sq[1][4][30];
        }

        if (chess_board_0x88_O.castling_K == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_key_piece_color_name_sq[1][4][40];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_key_piece_color_name_sq[1][4][40];
        }

        if (chess_board_0x88_O.castling_q == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_key_piece_color_name_sq[0][4][30];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_key_piece_color_name_sq[0][4][30];
        }

        if (chess_board_0x88_O.castling_k == 1) {
            hi_key_board_0x88 = hi_key_board_0x88 ^ this.hi_key_piece_color_name_sq[0][4][40];
            lo_key_board_0x88 = lo_key_board_0x88 ^ this.lo_key_piece_color_name_sq[0][4][40];
        }
        // if (hi_key_board_0x88 > Hash_table_0x88_C.MAX_MAX_LENTH) {
        //     console.log("Hash_table_0x88_C -> при генерации превышен размер ключа позиции ");
        //     console.log("Hash_table_0x88_C -> hi_key_board_0x88 " + hi_key_board_0x88);
        // }

        return { hi: hi_key_board_0x88, lo: lo_key_board_0x88 };
    }
}

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