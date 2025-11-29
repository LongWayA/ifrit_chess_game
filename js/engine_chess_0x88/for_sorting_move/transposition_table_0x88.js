/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name transposition_table_0x88.js
 * @version created 02.11m.2025 
 * last modified 02.11m.2025
*/

import { Chess_board_0x88_C } from "../move_generator/chess_board_0x88.js?v=2911m25";

/**
* НАЗНАЧЕНИЕ
 начало цитаты
   https://www.chessprogramming.org/Zobrist_Hashing
   В 32-битном хеше коллизия может возникнуть, если вычислить sqrt(2^32) == 2^16, 
   то есть около 65 тысяч позиций. В 64-битном хеше коллизия может возникнуть примерно 
   через 2^32, то есть около 4 миллиардов позиций.
 конец цитаты


 И так у нас есть 64 битный ключ который мы вписываем в размер таблицы через индекс получаемый из ключа путем
 index_key_64_board = key_64_board & (Transposition_table_0x88_C.MAX_TABLE_LENTH - 1);//
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
// надо еще много думать над этим :)


class Transposition_table_0x88_C {

    static NAME = "Transposition_table_0x88_C";
    //8 388 480
    //static MAX_TABLE_LENTH = 1_048_576;
    //static MAX_TABLE_LENTH = 2_097_152;//2_097_152; 4_194_304; 8_388_608; 16_777_216
    //static MAX_TABLE_LENTH = 16_777_216;//

    //static MAX_TABLE_LENTH = 16_384;//1_024 2_048 4_096 8_192 16_384 32_768 65_536
    static MAX_TABLE_LENTH = 65_536;

    static MAX_SCORE_UPDATE = 1;

    static ALPHA_UPDATE = 2;
    static BETA_UPDATE = 3;

    static ALPHA_CUT = 4;
    static BETA_CUT = 5;

    out = { tn: -1, tm: -1, sc: -1, from: -1, to: -1, dd: -1 };

    // 64 битный ключ позиции   
    key_64 = new Array(Transposition_table_0x88_C.MAX_TABLE_LENTH);

    // упакованная информация tn, tm, from, to, dd 
    // используется в сортировке ходов. ход выводится на первое место
    move = new Array(Transposition_table_0x88_C.MAX_TABLE_LENTH);

    // оценку позиции не буду использовать при отсечках по альфе и бете  
    // пока что слишком много коллизий. только сортировка, а для нее нужен только ход. 
    //  сейчас уже не актуально. коллизий в худшем случае 1 на миллион. 
    // сейчас 64 битный ключ плюс убрал ошибку.
    // было много коллизий потому что не учитывал поле взятия на проходе.

    score = new Array(Transposition_table_0x88_C.MAX_TABLE_LENTH);

    // test_fen_board ----------------------------------------------------------------------------------
    // тестовый фен позиции. смотрим насколько адекватный получается ключ позиции
    //test_fen = new Array(Transposition_table_0x88_C.MAX_TABLE_LENTH); // тип хода в записанной позиции

    //
    max_lenth = Transposition_table_0x88_C.MAX_TABLE_LENTH - 1;

    // трехмерный массив ключей положения разных 
    key_array_64 = new Array(2);// положений фигур на разных полях 2 * 7 * 64 = 896

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


    constructor() {

    }

    clear_out() {
        this.out.tn = -1;
        this.out.tm = -1;
        this.out.sc = -1;
        this.out.from = -1;
        this.out.to = -1;
        this.out.dd = -1;
    }

    iniM() {

        //console.log("Transposition_table_0x88_C -> iniM");

        // инициализируем трехмерный массив 2*7*64 = 896 ячеек
        for (let color = 0; color < 2; color++) {

            this.key_array_64[color] = new Array(7);

            for (let name = 0; name < 7; name++) {

                this.key_array_64[color][name] = new Array(64);
            }
        }

        this.clear_hash();
        //this.key_64_equal = 0; // test  
        //this.key_64_not_equal = 0; // test
        this.ini_random_key_array_64();
        this.max_lenth = Transposition_table_0x88_C.MAX_TABLE_LENTH - 1;

        this.clear_out();

        // test

        //this.add_position_p = 0;// зашли чтобы попытаться добавить позицию
        //this.add_position_key_64_true = 0;// ключ при добавлении позиции уже есть
        //this.add_position_new = 0;// добавили позицию по новой
        //this.add_position_rew = 0;// добавили позицию перезаписав старую  
        //this.is_save_position_p = 0;
        //this.is_save_key_64_true = 0;// зашли по индексу но ключ не совпал
        //this.is_save_key_64_false = 0;// зашли по индексу и ключ совпал
        //this.is_save_delta_depth_ok = 0;// глубина поиска из таблицы больше чем в узле
        //this.collision_fen = 0;// зашли по индексу но фен не совпал
        //this.no_collision_fen = 0;// зашли по индексу и фен совпал


    }

    clear_hash() {
        for (let i = 0; i < Transposition_table_0x88_C.MAX_TABLE_LENTH; i++) {

            this.key_64[i] = -1n; //            
            this.move[i] = -1; // 
            this.score[i] = -1; // 

            // test_fen_board ----------------------------------------------------------------------------------
            //this.test_fen[i] = ""; //  
        }
        //this.max_lenth = 0;
    }

    // сколько позиций записано
    test_uses_hash() {

        let save_position = 0;
        let not_save_position = 0;

        for (let i = 0; i < Transposition_table_0x88_C.MAX_TABLE_LENTH; i++) {

            if (this.key_64[i] != -1) {
                save_position = save_position + 1;
            } else {
                not_save_position = not_save_position + 1;
            }
        }

        console.log("Transposition_table_0x88_C -> save_position " + save_position +
            " not_save_position " + not_save_position);
    }

    // запаковываем тип узла, тип хода, откуда ходит, куда ходит, рассмотренная глубина
    packing_to_move(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth) {

        this.move[index_key_64_board] = 0; // 
        //
        this.move[index_key_64_board] = this.move[index_key_64_board] | type_nodes;
        this.move[index_key_64_board] = this.move[index_key_64_board] << 7;
        //
        this.move[index_key_64_board] = this.move[index_key_64_board] | type_move;
        this.move[index_key_64_board] = this.move[index_key_64_board] << 7;

        //
        let from_64 = Chess_board_0x88_C.SQUARE_128_to_64[from_128];
        this.move[index_key_64_board] = this.move[index_key_64_board] | from_64;
        this.move[index_key_64_board] = this.move[index_key_64_board] << 7;

        //
        let to_64 = Chess_board_0x88_C.SQUARE_128_to_64[to_128];
        this.move[index_key_64_board] = this.move[index_key_64_board] | to_64;
        this.move[index_key_64_board] = this.move[index_key_64_board] << 7;

        //
        this.move[index_key_64_board] = this.move[index_key_64_board] | delta_depth;
    }

    // распаковываем ход
    unpacking_from_move(index_key_64_board) {

        let delta_depth = this.move[index_key_64_board] & 127; //

        this.move[index_key_64_board] = this.move[index_key_64_board] >> 7;
        let to_64 = this.move[index_key_64_board] & 127;
        let to_128 = Chess_board_0x88_C.SQUARE_64_to_128[to_64];

        this.move[index_key_64_board] = this.move[index_key_64_board] >> 7;
        let from_64 = this.move[index_key_64_board] & 127;
        let from_128 = Chess_board_0x88_C.SQUARE_64_to_128[from_64];

        this.move[index_key_64_board] = this.move[index_key_64_board] >> 7;
        let type_move = this.move[index_key_64_board] & 127;

        this.move[index_key_64_board] = this.move[index_key_64_board] >> 7;
        let type_nodes = this.move[index_key_64_board] & 127;

        this.out.tn = type_nodes;
        this.out.tm = type_move;

        this.out.from = from_128;
        this.out.to = to_128;

        this.out.dd = delta_depth;

    }

    // для проверки что после цикла запаковки - распаковки параметры не изменились
    test(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth_board) {

        console.log("Transposition_table_0x88_C ->START");

        console.log("  packing type_nodes " + type_nodes + " type_move " + type_move +
            " from_128 " + from_128 + " to_128 " + to_128 +
            " delta_depth " + delta_depth_board);

        this.packing_to_move(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth_board);
        this.unpacking_from_move(index_key_64_board);

        console.log("unpacking type_nodes " + this.out.tn + " type_move " + this.out.tm +
            " from_128 " + this.out.from + " to_128 " + this.out.to +
            " delta_depth " + this.out.dd);

    }

    // добавляем ход в таблицу
    add_position(type_nodes, type_move, score, from_128, to_128, depth, max_depth, chess_board_0x88_O) {

        //this.add_position_p = this.add_position_p + 1;// зашли чтобы попытаться добавить позицию

        // генерируем ключ текущей позиции.
        //let key_64_board = this.set_key_from_board_0x88(chess_board_0x88_O);
        let key_64_board = chess_board_0x88_O.key_64;
        //console.log("Transposition_table_0x88_C -> key_64_board " + key_64_board);

        // определяем по ключу индекс для доступа к таблице
        let index_key_64_board = key_64_board & BigInt(Transposition_table_0x88_C.MAX_TABLE_LENTH - 1);//
        //console.log("Transposition_table_0x88_C -> index_key_64_board " + index_key_64_board);  
        //console.log("Transposition_table_0x88_C -> Transposition_table_0x88_C.MAX_TABLE_LENTH - 1 " + (Transposition_table_0x88_C.MAX_TABLE_LENTH - 1).toString(2));              

        //let delta_depth_board = max_depth - depth;
        //this.test(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth_board);

        /////////////////////////////////////////////////// 
        // ключ совпал значит мы видимо эту позицию когда то смотрели      
        if (key_64_board == this.key_64[index_key_64_board]) {

            //this.add_position_key_64_true = this.add_position_key_64_true + 1;// ключ при добавлении позиции уже есть

            // распаковываем move выделяя delta_depth_move
            let delta_depth_move = this.move[index_key_64_board] & 127; //

            let delta_depth_board = max_depth - depth;

            // место уже было записано. надо проверить глубину записи
            if (delta_depth_move <= delta_depth_board) {

                //this.add_position_rew = this.add_position_rew + 1;// добавили позицию перезаписав старую

                // запаковываем move
                this.packing_to_move(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth_board);

                this.score[index_key_64_board] = score;

                // test_fen_board ----------------------------------------------------------------------------------                
                //this.test_fen[index_key_64_board] = chess_board_0x88_O.set_fen_from_0x88();

            }
        } else {

            //this.add_position_new = this.add_position_new + 1;// добавили позицию по новой

            this.key_64[index_key_64_board] = key_64_board;

            let delta_depth_board = max_depth - depth;

            // запаковываем move
            this.packing_to_move(index_key_64_board, type_nodes, type_move, from_128, to_128, delta_depth_board);

            this.score[index_key_64_board] = score;

            // test_fen_board ----------------------------------------------------------------------------------            
            //this.test_fen[index_key_64_board] = chess_board_0x88_O.set_fen_from_0x88();
        }

    }

    // смотрим есть ли у нас в таблице такая позиция и если есть извлекаем ход
    is_save_position(chess_board_0x88_O, depth, max_depth) {

        // всего было обращений в запись
        //this.is_save_position_p = this.is_save_position_p + 1;

        // генерируем ключ текущей позиции.
        //let key_64_board = this.set_key_from_board_0x88(chess_board_0x88_O);
        let key_64_board = chess_board_0x88_O.key_64;
        // let key_64_board2 = this.set_key_from_board_0x88(chess_board_0x88_O);               

        // if (key_64_board != key_64_board2) {
        //     console.log("Transposition_table_0x88_C -> NOT key_64 !");
        //     console.log("Transposition_table_0x88_C -> chess_board_0x88_O.key_64 " + chess_board_0x88_O.key_64);
        //     console.log("Transposition_table_0x88_C -> key_64_board " + key_64_board);
        //     chess_board_0x88_O.test_print_0x88();
        // }

        // определяем по ключу индекс для доступа к таблице
        let index_key_64_board = key_64_board & BigInt(Transposition_table_0x88_C.MAX_TABLE_LENTH - 1);//&

        //let key_64_table = this.key_32[index_key_64_board];
        let key_64_table = this.key_64[index_key_64_board];

        // если ключ совпал
        if (key_64_board == key_64_table) {

            // зашли по индексу и ключ совпал
            //this.is_save_key_64_true = this.is_save_key_64_true + 1;

            let delta_depth_board = max_depth - depth;
            // распаковываем move выделяя delta_depth_move
            let delta_depth_move = this.move[index_key_64_board] & 127; //

            // проверяем что глубина поиска позиции из таблицы больше или равна
            if (delta_depth_move >= delta_depth_board) {

                // прошли тест по глубине поиска
                //this.is_save_delta_depth_ok = this.is_save_delta_depth_ok + 1;

                // // test_fen_board ----------------------------------------------------------------------------------   
                // let test_fen_board = chess_board_0x88_O.set_fen_from_0x88();
                // let test_fen = this.test_fen[index_key_64_board];

                // if (test_fen === test_fen_board) {
                //     this.no_collision_fen = this.no_collision_fen + 1;// зашли по индексу и фен совпал
                // } else {//if (fen === fen_test) {
                //     this.collision_fen = this.collision_fen + 1;// зашли по индексу но фен не совпал
                // }//if (fen === fen_test) {

                //распаковываем
                this.unpacking_from_move(index_key_64_board);

                this.out.sc = this.score[index_key_64_board];

                return this.out;

            } else {//if (delta_depth <= (max_depth - depth)) {

                //распаковываем
                this.unpacking_from_move(index_key_64_board);

                if ((this.out.tn == Transposition_table_0x88_C.ALPHA_UPDATE) || (this.out.tn == Transposition_table_0x88_C.BETA_UPDATE)) {

                    // // test_fen_board ----------------------------------------------------------------------------------   
                    // let test_fen_board = chess_board_0x88_O.set_fen_from_0x88();
                    // let test_fen = this.test_fen[index_key_64_board];

                    // if (test_fen === test_fen_board) {
                    //     this.no_collision_fen = this.no_collision_fen + 1;// зашли по индексу и фен совпал
                    // } else {//if (fen === fen_test) {
                    //     this.collision_fen = this.collision_fen + 1;// зашли по индексу но фен не совпал
                    // }//if (fen === fen_test) {

                    this.out.sc = this.score[index_key_64_board];
                } else {
                    this.clear_out();
                }

                return this.out;
            }//if (delta_depth <= (max_depth - depth)) {

        } else {//if (lo_key === lo_key_board_0x88) {
            // зашли по индексу но ключ не совпал
            //this.is_save_key_64_false = this.is_save_key_64_false + 1;
            // такой позиции нет
            this.clear_out();
            return this.out;
        }//if (lo_key === lo_key_board_0x88) {
    }

    // простой ход и взятия. принципиальный момент обработка фигуры которую берем.
    key_update_do_move_0x88(from128, to128, piece_from, piece_to, piece_color, chess_board_0x88_O) {

        let from64 = Chess_board_0x88_C.SQUARE_128_to_64[from128];
        let to64 = Chess_board_0x88_C.SQUARE_128_to_64[to128];


        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][piece_from][from64];
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][piece_from][to64];

        // если есть фигура которую берем ее надо убрать из хеш ключа
        if (piece_to != 0) {
            chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1 - piece_color][piece_to][to64];
        }

        // side_to_move
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1][6][10];
    }

    // взятие на проходе
    key_update_ep_move_0x88(from128, to128, ep128, piece_to, piece_color, chess_board_0x88_O) {

        let from64 = Chess_board_0x88_C.SQUARE_128_to_64[from128];
        let to64 = Chess_board_0x88_C.SQUARE_128_to_64[to128];
        let ep64 = Chess_board_0x88_C.SQUARE_128_to_64[ep128];

        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][piece_to][from64];
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][piece_to][to64];
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1 - piece_color][piece_to][ep64];

        // side_to_move
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1][6][10];
    }

    // превращение и превращение с взятием. принципиальный момент обработка фигуры которую берем.
    key_update_promo_move_0x88(from128, to128, piece_promo, piece_to, piece_color, chess_board_0x88_O) {

        let from64 = Chess_board_0x88_C.SQUARE_128_to_64[from128];
        let to64 = Chess_board_0x88_C.SQUARE_128_to_64[to128];


        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][Chess_board_0x88_C.PAWN][from64];
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][piece_promo][to64];

        // если есть фигура которую берем ее надо убрать из хеш ключа
        if (piece_to != 0) {
            chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1 - piece_color][piece_to][to64];
        }

        // side_to_move
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1][6][10];
    }

    // рокировки
    key_update_castle_move_0x88(from128, to128, r_from128, r_to128, piece_color, chess_board_0x88_O) {

        let from64 = Chess_board_0x88_C.SQUARE_128_to_64[from128];
        let to64 = Chess_board_0x88_C.SQUARE_128_to_64[to128];
        let r_from64 = Chess_board_0x88_C.SQUARE_128_to_64[r_from128];
        let r_to64 = Chess_board_0x88_C.SQUARE_128_to_64[r_to128];

        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][Chess_board_0x88_C.KING][from64];
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][Chess_board_0x88_C.KING][to64];

        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][Chess_board_0x88_C.ROOK][r_from64];
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[piece_color][Chess_board_0x88_C.ROOK][r_to64];

        // side_to_move
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1][6][10];
    }


    // это переключение флага взятия на проходе
    key_update_ep_0x88(chess_board_0x88_O) {
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1][5][20];
    }

    // это переключени поля взятия на проходе
    key_update_ep2_0x88(chess_board_0x88_O) {
        chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^
            BigInt(chess_board_0x88_O.en_passant_target_square) ^ this.key_array_64[1][5][25];
    }

    // обрабатываем флаги возможности рокировок
    key_update_QqKk_0x88(Q, q, K, k, chess_board_0x88_O) {

        if (Q == 1) {
            chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1][4][30];
        }

        if (K == 1) {
            chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[1][4][40];
        }

        if (q == 1) {
            chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[0][4][30];
        }

        if (k == 1) {
            chess_board_0x88_O.key_64 = chess_board_0x88_O.key_64 ^ this.key_array_64[0][4][40];
        }
    }


    //////////////////////////////////////////////////////////////////////////////

    // здесь каждому положению каждой фигуры каждого цвета присваивается случайное число 
    ini_random_key_array_64() {
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

                    self.crypto.getRandomValues(uint_a_64);
                    //window.crypto.getRandomValues(hi_lo);
                    uint64 = uint_a_64[0];//

                    this.key_array_64[color][name][sq] = uint64;
                }
            }
        }

        // поищем совпадение ключей
        for (let color1 = 0; color1 < 2; color1++) {
            for (let name1 = 1; name1 < 7; name1++) {
                for (let sq1 = 0; sq1 < 64; sq1++) {

                    //this.key_64_not_equal = this.key_64_not_equal + 1;

                    for (let color2 = 0; color2 < 2; color2++) {
                        for (let name2 = 1; name2 < 7; name2++) {
                            for (let sq2 = 0; sq2 < 64; sq2++) {
                                //768
                                if ((color1 == color2) && (name1 == name2) && (sq1 == sq2)) {
                                    //this.key_64_not_equal = this.key_64_not_equal + 1;
                                } else {
                                    if (this.key_array_64[color1][name1][sq1] == this.key_array_64[color2][name2][sq2]) {
                                        this.key_64_equal = this.key_64_equal + 1;
                                    } else {
                                        this.key_64_not_equal = this.key_64_not_equal + 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //console.log("Transposition_table_0x88_C key_64_equal " + this.key_64_equal);

    }

    // по позиции генерируем ключ
    set_key_from_board_0x88(chess_board_0x88_O) {

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

                key_64 = key_64 ^ this.key_array_64[piece_color][piece][sq];
            }
        }

        if (chess_board_0x88_O.side_to_move == 1) {
            key_64 = key_64 ^ this.key_array_64[1][6][10];
        }

        if (chess_board_0x88_O.en_passant_yes == 1) {
            key_64 = key_64 ^ this.key_array_64[1][5][20];
        }

        key_64 = key_64 ^ BigInt(chess_board_0x88_O.en_passant_target_square) ^ this.key_array_64[1][5][25];


        if (chess_board_0x88_O.castling_Q == 1) {
            key_64 = key_64 ^ this.key_array_64[1][4][30];
        }

        if (chess_board_0x88_O.castling_K == 1) {
            key_64 = key_64 ^ this.key_array_64[1][4][40];
        }

        if (chess_board_0x88_O.castling_q == 1) {
            key_64 = key_64 ^ this.key_array_64[0][4][30];
        }

        if (chess_board_0x88_O.castling_k == 1) {
            key_64 = key_64 ^ this.key_array_64[0][4][40];
        }

        return key_64;
    }
}

export { Transposition_table_0x88_C };