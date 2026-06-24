// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_0x88_test.js
 * @version created 12.06m.2026 
 * 
*/

import {
    clear_list_ml, add_packing_move_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml, set_color_ml,
    set_number_captures_move_ml, sorting_list_ml, test_compare_list_from_ml, test_print_i_move_list_ml, test_print_list_ml,
    save_list_from_ml, move_is_found_ml, return_i_move_ml, move_to_string_uci_ml, return_type_captures_pawn_promo_ml,
    return_type_simple_move_ml, type_move_to_name_piece_ml, type_move_to_name_piece_f_ml, return_promo_piece_from_type_move_ml,
    set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml, test_print_list_history_ml,
    LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    IND_PROMO_QUEEN_ML, IND_PROMO_ROOK_ML, IND_PROMO_BISHOP_ML, IND_PROMO_KNIGHT_ML,
    MOVE_NO_ML, CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML, CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML, CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML, CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML, CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML, CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML, CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML, CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML, MOVE_PAWN_PROMO_QUEEN_ML, MOVE_PAWN_PROMO_ROOK_ML, MOVE_PAWN_PROMO_BISHOP_ML,
    MOVE_PAWN_PROMO_KNIGHT_ML, CAPTURES_PAWN_QUEEN_ML, CAPTURES_PAWN_ROOK_ML, CAPTURES_PAWN_BISHOP_ML, CAPTURES_PAWN_KNIGHT_ML,
    CAPTURES_KNIGHT_QUEEN_ML, CAPTURES_KNIGHT_ROOK_ML, CAPTURES_BISHOP_QUEEN_ML, CAPTURES_BISHOP_ROOK_ML, CAPTURES_ROOK_QUEEN_ML,
    CAPTURES_KNIGHT_BISHOP_ML, CAPTURES_KNIGHT_KNIGHT_ML, CAPTURES_BISHOP_BISHOP_ML, CAPTURES_BISHOP_KNIGHT_ML, CAPTURES_ROOK_ROOK_ML,
    CAPTURES_QUEEN_QUEEN_ML, CAPTURES_ROOK_BISHOP_ML, CAPTURES_ROOK_KNIGHT_ML, CAPTURES_QUEEN_ROOK_ML, CAPTURES_QUEEN_BISHOP_ML,
    CAPTURES_QUEEN_KNIGHT_ML, CAPTURES_KING_QUEEN_ML, CAPTURES_KING_ROOK_ML, CAPTURES_KING_BISHOP_ML, CAPTURES_KING_KNIGHT_ML,
    CAPTURES_PAWN_PAWN_ML, EP_CAPTURES_ML, CAPTURES_KNIGHT_PAWN_ML, CAPTURES_BISHOP_PAWN_ML, CAPTURES_ROOK_PAWN_ML,
    CAPTURES_QUEEN_PAWN_ML, CAPTURES_KING_PAWN_ML, MOVE_QUEEN_ML, MOVE_ROOK_ML, MOVE_BISHOP_ML, MOVE_KNIGHT_ML, MOVE_KING_ML, MOVE_PAWN_ML,
    MOVE_DOUBLE_PAWN_ML, MOVE_KING_CASTLE_ML, MOVE_KING_QUEEN_CASTLE_ML, TYPE_MOVE_NAME_ML
} from "../move_generator_0x88/move_list_0x88.js";

import {
    packing_moves, packing_moves_sorting_true, packing_moves_capture_in_0_true,
    packing_moves_move_in_0_true, packing_moves_k1_k2_true, packing_moves_history_true
} from "../move_generator_0x88/move_list_pm_0x88_test.js";

import {
    PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB
} from "./chess_board_0x88.js";

/**
 * НАЗНАЧЕНИЕ
 * Тестируем модуль списка ходов move_list_0x88.js
*/

/**
 * Класс.
 * @class
 */
class Move_list_0x88_TEST_С {


    static NAME = "Move_list_0x88_TEST_С";


    constructor() {

    }

    iniM() {

    }

    //=======================================================================================
    /**
    * сравниваем параметры type_move, from, to, name_capture_piece до и после запаковки. 
    * если есть отличия то печатаем их 
    * 
    * @param {Int32Array} packing_moves
    * @param {number} j
    * @param {number} type_move
    * @param {number} from
    * @param {number} to
    * @param {number} name_capture_piece
    * @returns {number}
    */
    test_compare_parametr_from_unpack(packing_moves, j, type_move, from, to, name_capture_piece) {

        let w = 0;

        let type_move_un = get_type_move_ml(j, packing_moves);
        let from_un = get_from_ml(j, packing_moves);
        let to_un = get_to_ml(j, packing_moves);
        let name_capture_piece_un = get_name_capture_piece_ml(j, packing_moves);

        if (type_move_un != type_move) {
            w = 1;
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> j = " + j);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> type_move = " + type_move);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> type_move_un = " + type_move_un);
        }

        if (from_un != from) {
            w = 1;
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> j = " + j);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> from = " + from);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> from_un = " + from_un);
        }

        if (to_un != to) {
            w = 1;
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> j = " + j);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> to = " + to);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> to_un = " + to_un);
        }

        if (name_capture_piece_un != name_capture_piece) {
            w = 1;
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> j = " + j);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> name_capture_piece = " + name_capture_piece);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> name_capture_piece_un = " + name_capture_piece_un);
        }

        return w;

    }
    //=======================================================================================

    //=======================================================================================
    /*
    * добавляем ход в список
    * количество ходов увеличиваем на один
    */
    add_packing_move_ml_test() {

        //Каждый ход упакован в одно 32-битное число по такой схеме: 
        // Биты:  31........24  23.......16  15.......8   7.......0
        //        ┌──────────┐  ┌─────────┐  ┌────────┐  ┌────────┐
        //        │ capture  │  │   to    │  │  from  │  │  type  │
        //        │  (8 бит) │  │ (8 бит) │  │ (8 бит)│  │ (8 бит)│
        //        └──────────┘  └─────────┘  └────────┘  └────────┘
        let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
        let packing_moves_true = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

        let type_move = 0;// тип хода 0..60
        let from = 0;// откуда ход 0..119
        let to = 0;// куда ход 0..119
        let name_capture_piece = 0;// имя взятой фигуры

        let piece_color = 0;// чей ход черных(0) или белых(1)
        let number_captures_move = 0;// количество взятий        

        let j = 0;

        let w = 0;

        //------------------------------------------------------------------------------------
        // e2-e4
        j = 0;
        type_move = MOVE_PAWN_ML;
        from = 100;
        to = 84;
        name_capture_piece = 0;

        piece_color = 1;
        number_captures_move = 0;

        packing_moves_true[j] = 5530681;// запакованый ход (int 32)
        packing_moves_true[IND_PIECE_COLOR_ML] = piece_color;
        packing_moves_true[IND_NUMBER_CAPTURES_MOVE_ML] = number_captures_move;
        packing_moves_true[IND_NUMBER_MOVE_ML] = j + 1;// количество ходов      

        // добавляем ход в список
        j = add_packing_move_ml(packing_moves, type_move, from, to, name_capture_piece);

        j = j - 1;// из количества ходов делаем индекс последнего хода 

        set_color_ml(packing_moves, piece_color);

        set_number_captures_move_ml(packing_moves, number_captures_move);

        if (packing_moves_true[j] != packing_moves[j]) {
            w = w + 1;
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> packing_moves_true[" + j + "] = " + packing_moves_true[j]);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> packing_moves[" + j + "] = " + packing_moves[j]);
        }

        // сравнение двух списков ходов
        // если есть отличия то печатем в консоль предупреждение
        test_compare_list_from_ml(packing_moves_true, packing_moves);

        // сравниваем параметры type_move, from, to, name_capture_piece до и после запаковки. 
        // если есть отличия то печатаем их 
        w = w + this.test_compare_parametr_from_unpack(packing_moves, j, type_move, from, to, name_capture_piece);
        //------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------
        // e7-e5
        j = 1;
        type_move = MOVE_DOUBLE_PAWN_ML;
        from = 20;
        to = 52;
        name_capture_piece = 0;

        piece_color = 0;
        number_captures_move = 0;

        packing_moves_true[j] = 3413050;
        packing_moves_true[IND_PIECE_COLOR_ML] = piece_color;
        packing_moves_true[IND_NUMBER_CAPTURES_MOVE_ML] = number_captures_move;
        packing_moves_true[IND_NUMBER_MOVE_ML] = j + 1;

        // добавляем ход в список
        j = add_packing_move_ml(packing_moves, type_move, from, to, name_capture_piece);

        j = j - 1;// из количества ходов делаем индекс последнего хода 

        set_color_ml(packing_moves, piece_color);

        set_number_captures_move_ml(packing_moves, number_captures_move);

        if (packing_moves_true[j] != packing_moves[j]) {
            w = w + 1;
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> packing_moves_true[" + j + "] = " + packing_moves_true[j]);
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> packing_moves[" + j + "] = " + packing_moves[j]);
        }

        // сравнение двух списков ходов
        // если есть отличия то печатем в консоль предупреждение
        test_compare_list_from_ml(packing_moves_true, packing_moves);

        // сравниваем параметры type_move, from, to, name_capture_piece до и после запаковки. 
        // если есть отличия то печатаем их 
        w = w + this.test_compare_parametr_from_unpack(packing_moves, j, type_move, from, to, name_capture_piece);
        //------------------------------------------------------------------------------------

        if (w != 0) {
            console.log("Move_list_0x88_TEST_С -> add_packing_move_ml_test-> PRINT LIST");
            // печатаем в консоль весь список ходов
            test_print_list_ml(packing_moves);
        }

    }
    //=======================================================================================

    //=======================================================================================
    /*
    * сортировка по типу хода
    * чем меньше число, тем выше приоритет хода
    * 
    */
    sorting_list_ml_test() {

        let is_print = 0;

        let packing_moves_save = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

        //записываем список до сортировки что бы потом можно было распечатать исходный если есть ошибки
        save_list_from_ml(packing_moves_save, packing_moves);

        // проверяем работу функции save_list_from_ml
        test_compare_list_from_ml(packing_moves_save, packing_moves);

        //----------------------------------------------------------
        sorting_list_ml(packing_moves);
        //----------------------------------------------------------

        for (let i = 0; i < packing_moves[IND_NUMBER_MOVE_ML]; i++) {

            if (packing_moves_sorting_true[i] != packing_moves[i]) {

                is_print = 1;
                console.log("Move_list_0x88_TEST_С -> sorting_list_ml_test-> packing_moves_sorting_true[" + i + "] = " + packing_moves_sorting_true[i]);
                console.log("Move_list_0x88_TEST_С -> sorting_list_ml_test-> packing_moves[" + i + "] = " + packing_moves[i]);
            }

        }

        if (is_print == 1) {
            console.log("-----------");
            console.log("Move_list_0x88_TEST_С -> sorting_list_ml_test-> packing_moves");
            test_print_list_ml(packing_moves);
            console.log("-----------");
            console.log("Move_list_0x88_TEST_С -> sorting_list_ml_test-> PRINT packing_moves_save");
            test_print_list_ml(packing_moves_save);
            console.log("-----------");
            console.log("test_compare_list-----------");
            test_compare_list_from_ml(packing_moves_sorting_true, packing_moves);
        }


    }
    //=======================================================================================

    //=======================================================================================
    /*
    * это вставки хода из кеш таблицы на первое место
    * 
    */
    set_move_in_0_ml_test() {

        let packing_moves_1_tt = new Int32Array(1).fill(MOVE_NO_ML);

        let packing_moves_save = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

        let is_print = 0;

        // записываем в начало взятие

        //записываем список до сортировки что бы потом можно было распечатать исходный если есть ошибки
        save_list_from_ml(packing_moves_save, packing_moves_sorting_true);

        // type_move[5] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
        // from[5] = 52
        // to[5] = 21
        // name_capture_piece_i[5] = 9
        // e5-f7
        packing_moves_1_tt[0] = 152384559;
        set_move_in_0_ml(packing_moves_save, packing_moves_1_tt);

        //
        for (let i = 0; i < packing_moves_save[IND_NUMBER_MOVE_ML]; i++) {

            if (packing_moves_capture_in_0_true[i] != packing_moves_save[i]) {

                is_print = 1;
                console.log("Move_list_0x88_TEST_С -> set_move_in_0_ml_test-> packing_moves_capture_in_0_true[" + i + "] = "
                    + packing_moves_capture_in_0_true[i]);
                console.log("Move_list_0x88_TEST_С -> set_move_in_0_ml_test-> packing_moves_save[" + i + "] = " + packing_moves_save[i]);
            }

        }

        if (is_print == 1) {
            console.log("-----------");
            console.log("capture-----------");
            test_print_list_ml(packing_moves_save);
        }

        // записываем в начало простой ход

        //записываем список до сортировки что бы потом можно было распечатать исходный если есть ошибки
        save_list_from_ml(packing_moves_save, packing_moves_sorting_true);

        // type_move[11] = 52 nm = MOVE_QUEEN_ML
        // from[11] = 85
        // to[11] = 55
        // name_capture_piece_i[11] = 0
        // f3-h5
        packing_moves_1_tt[0] = 3626292;
        set_move_in_0_ml(packing_moves_save, packing_moves_1_tt);

        is_print = 0;

        //
        for (let i = 0; i < packing_moves_save[IND_NUMBER_MOVE_ML]; i++) {

            if (packing_moves_move_in_0_true[i] != packing_moves_save[i]) {

                is_print = 1;
                console.log("Move_list_0x88_TEST_С -> set_move_in_0_ml_test-> packing_moves_move_in_0_true[" + i + "] = "
                    + packing_moves_move_in_0_true[i]);
                console.log("Move_list_0x88_TEST_С -> set_move_in_0_ml_test-> packing_moves_save[" + i + "] = " + packing_moves_save[i]);
            }

        }

        if (is_print == 1) {
            console.log("-----------");
            console.log("move-----------");
            test_print_list_ml(packing_moves_save);
        }


    }
    //=======================================================================================

    //=======================================================================================
    /*
     * это для киллеров
     * находм ход по from, to
     * и ставим сразу после взятий.
    */
    set_move_after_the_captures_ml_test() {

        let packing_moves_k = new Int32Array(1).fill(MOVE_NO_ML);// список ходов. ход упакован в одно число Uint32        

        let move_k1 = 5530422; // 54 nm = MOVE_BISHOP_ML
        let move_k2 = 5461300; // 52 nm = MOVE_QUEEN_ML        

        let depth = 0;

        let is_print = 0;

        packing_moves_k[depth] = move_k1;// ход киллер
        set_move_after_the_captures_ml(packing_moves_sorting_true, packing_moves_k, depth);

        packing_moves_k[depth] = move_k2;// ход киллер
        set_move_after_the_captures_ml(packing_moves_sorting_true, packing_moves_k, depth);

        //
        for (let i = 0; i < packing_moves_sorting_true[IND_NUMBER_MOVE_ML]; i++) {

            if (packing_moves_k1_k2_true[i] != packing_moves_sorting_true[i]) {

                is_print = 1;
                console.log("Move_list_0x88_TEST_С -> set_move_after_the_captures_ml_test-> packing_moves_k1_k2_true[" + i + "] = "
                    + packing_moves_k1_k2_true[i]);
                console.log("Move_list_0x88_TEST_С -> set_move_after_the_captures_ml_test-> packing_moves_sorting_true[" + i + "] = "
                    + packing_moves_sorting_true[i]);
            }

        }

        if (is_print == 1) {
            console.log("-----------");
            console.log("move killer-----------");
            test_print_list_ml(packing_moves_sorting_true);
        }


    }
    //=======================================================================================

    //=======================================================================================
    /*
     * Сортировка тихих ходов по эвристике истории.
     * Оптимизированная версия: Insertion Sort + плоский массив + кэширование.
    */
    sorting_list_history_heuristic_ml_test() {

        const MAX_COLOR_HH = 2;          // 0 - черные, 1 - белые
        const MAX_COORDINATE_HH = 64;    // размер 64-клеточной доски

        // Размер плоского массива: 2 * 64 * 64 = 8192
        const HISTORY_ARRAY_SIZE = MAX_COLOR_HH * MAX_COORDINATE_HH * MAX_COORDINATE_HH;//8192

        let history = new Int32Array(HISTORY_ARRAY_SIZE);

        let h = 0;

        let is_print = 0;

        for (let color = 0; color < MAX_COLOR_HH; color++) {
            const color_shift = color << 12;  // color * 4096
            for (let from = 0; from < MAX_COORDINATE_HH; from++) {
                const from_shift = from << 6; // from * 64
                for (let to = 0; to < MAX_COORDINATE_HH; to++) {
                    h = 100 * from + to;
                    history[color_shift | from_shift | to] = h;
                    //console.log("h(" + from + "," + to + ") = " + h);
                }
            }
        }


        sorting_list_history_heuristic_ml(packing_moves_sorting_true, history);

        //
        for (let i = 0; i < packing_moves_sorting_true[IND_NUMBER_MOVE_ML]; i++) {

            if (packing_moves_history_true[i] != packing_moves_sorting_true[i]) {

                is_print = 1;
                console.log("Move_list_0x88_TEST_С -> sorting_list_history_heuristic_ml_test-> packing_moves_history_true[" + i + "] = "
                    + packing_moves_history_true[i]);
                console.log("Move_list_0x88_TEST_С -> sorting_list_history_heuristic_ml_test-> packing_moves_sorting_true[" + i + "] = "
                    + packing_moves_sorting_true[i]);
            }

        }

        if (is_print == 1) {
            console.log("-----------");
            console.log("history-----------");
            //test_print_list_ml(packing_moves_sorting_true);
            test_print_list_history_ml(packing_moves_sorting_true, history);
        }

    }
    //=======================================================================================    

    //=======================================================================================
    /*
    * это нужно для работы генератора взятий. это очень важная функция и конечно полностью проверена
    * возвращаем название хода превращения пешки со взятием по взятой фигуре
    * т.е. пешка берет коня KNIGHT тогда будет множестов превращений со взятием коня,
    * это
    * PROMO_QUEEN = CAPTURES_PAWN_KNIGHT_PROMO_QUEEN;
    * PROMO_ROOK = CAPTURES_PAWN_KNIGHT_PROMO_ROOK;
    * PROMO_BISHOP = CAPTURES_PAWN_KNIGHT_PROMO_BISHOP;
    * PROMO_KNIGHT = CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT;
    *
    * ВАЖНО: Возвращает ссылку на существующий массив, НЕ создаёт новый!
    * 
    * функция используется только в генераторе взятий и случай нет взятой фигуры невозможен
    * также как взятая пешка и взятый король.
    * тем не менее эти случаи обрабатываются. надо подумать чтобы их убрать.
    * 
    */
    return_type_captures_pawn_promo_ml_test() {

        // "1n1n3k/2P5/8/8/8/8/3p4/2B1B2K w - - 0 1" nodes:34582222 d: 7
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

        let type_move;
        let piece_name_captures;
        let out;


        //--------------------------------------------
        // невозможный ход как будто просто ход        
        piece_name_captures = PIECE_NO_CB;// нет фигуры
        //console.log("-----------");        
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 0) {
            console.log("-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 0) {
            console.log("-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 0) {
            console.log("-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 0) {
            console.log("-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        // невозможный ход взятие пешки с превращением такое же как будто просто ход
        piece_name_captures = W_PAWN_CB;//
        //console.log("-----------");          
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 0) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 0) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 0) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 0) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        piece_name_captures = W_KNIGHT_CB;
        //console.log("w-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 4) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 8) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 12) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 16) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        piece_name_captures = W_BISHOP_CB;
        //console.log("w-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 3) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 7) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 11) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 15) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        piece_name_captures = W_ROOK_CB;
        //console.log("w-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 2) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }
        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 6) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 10) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 14) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        piece_name_captures = W_QUEEN_CB;
        //console.log("w-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 1) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 5) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 9) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 13) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        // невозможный ход взятие короля с превращением такое же как будто просто ход        
        piece_name_captures = W_KING_CB;
        //console.log("w-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 0) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 0) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 0) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 0) {
            console.log("w-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        /////////////////////////////////////////////

        //--------------------------------------------
        // невозможный ход взятие пешки с превращением такое же как будто просто ход
        piece_name_captures = B_PAWN_CB;//
        //console.log("b-----------");          
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 0) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 0) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 0) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 0) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        piece_name_captures = B_KNIGHT_CB;
        //console.log("b-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 4) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 8) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 12) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 16) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        piece_name_captures = B_BISHOP_CB;
        //console.log("b-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 3) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 7) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 11) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 15) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        piece_name_captures = B_ROOK_CB;
        //console.log("b-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 2) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }
        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 6) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 10) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 14) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        piece_name_captures = B_QUEEN_CB;
        //console.log("b-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 1) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 5) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 9) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 13) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        //--------------------------------------------
        // невозможный ход взятие короля с превращением такое же как будто просто ход        
        piece_name_captures = B_KING_CB;
        //console.log("b-----------");         
        //console.log("piece_name_captures = " + piece_name_captures);

        out = return_type_captures_pawn_promo_ml(piece_name_captures);

        type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
        if (type_move != 0) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
        if (type_move != 0) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_BISHOP_ML];
        if (type_move != 0) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }

        type_move = out[IND_PROMO_KNIGHT_ML];
        if (type_move != 0) {
            console.log("b-----------");
            console.log("piece_name_captures = " + piece_name_captures);
            console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
        }
    }
    //=======================================================================================   

    //=======================================================================================
    /*
     * очень важная функция. используется в генераторе взятий и тихих ходов.
     * возвращем тип хода взятия по ходящей фигуре и по взятой фигуре
     * например KING, QUEEN -> CAPTURES_KING_QUEEN
     * 
    */
    return_type_simple_move_ml_test() {

        let type_simple_move;
        let piece_name = 0;
        let piece_name_captures = 0;
        let type_move


        type_simple_move = return_type_simple_move_ml(piece_name, piece_name_captures);

        type_simple_move = return_type_simple_move_ml(W_KING_CB, PIECE_NO_CB);
        type_move = MOVE_KING_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KING_CB, B_QUEEN_CB);
        type_move = CAPTURES_KING_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KING_CB, B_ROOK_CB);
        type_move = CAPTURES_KING_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KING_CB, B_BISHOP_CB);
        type_move = CAPTURES_KING_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KING_CB, B_KNIGHT_CB);
        type_move = CAPTURES_KING_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KING_CB, B_PAWN_CB);
        type_move = CAPTURES_KING_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KING_CB, PIECE_NO_CB);
        type_move = MOVE_KING_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KING_CB, W_QUEEN_CB);
        type_move = CAPTURES_KING_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KING_CB, W_ROOK_CB);
        type_move = CAPTURES_KING_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KING_CB, W_BISHOP_CB);
        type_move = CAPTURES_KING_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KING_CB, W_KNIGHT_CB);
        type_move = CAPTURES_KING_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KING_CB, W_PAWN_CB);
        type_move = CAPTURES_KING_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        // Ферзи
        type_simple_move = return_type_simple_move_ml(W_QUEEN_CB, PIECE_NO_CB);
        type_move = MOVE_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_QUEEN_CB, B_QUEEN_CB);
        type_move = CAPTURES_QUEEN_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_QUEEN_CB, B_ROOK_CB);
        type_move = CAPTURES_QUEEN_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_QUEEN_CB, B_BISHOP_CB);
        type_move = CAPTURES_QUEEN_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_QUEEN_CB, B_KNIGHT_CB);
        type_move = CAPTURES_QUEEN_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_QUEEN_CB, B_PAWN_CB);
        type_move = CAPTURES_QUEEN_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);


        type_simple_move = return_type_simple_move_ml(B_QUEEN_CB, PIECE_NO_CB);
        type_move = MOVE_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_QUEEN_CB, W_QUEEN_CB);
        type_move = CAPTURES_QUEEN_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_QUEEN_CB, W_ROOK_CB);
        type_move = CAPTURES_QUEEN_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_QUEEN_CB, W_BISHOP_CB);
        type_move = CAPTURES_QUEEN_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_QUEEN_CB, W_KNIGHT_CB);
        type_move = CAPTURES_QUEEN_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_QUEEN_CB, W_PAWN_CB);
        type_move = CAPTURES_QUEEN_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        // Ладьи
        type_simple_move = return_type_simple_move_ml(W_ROOK_CB, PIECE_NO_CB);
        type_move = MOVE_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_ROOK_CB, B_QUEEN_CB);
        type_move = CAPTURES_ROOK_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_ROOK_CB, B_ROOK_CB);
        type_move = CAPTURES_ROOK_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_ROOK_CB, B_BISHOP_CB);
        type_move = CAPTURES_ROOK_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_ROOK_CB, B_KNIGHT_CB);
        type_move = CAPTURES_ROOK_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_ROOK_CB, B_PAWN_CB);
        type_move = CAPTURES_ROOK_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);


        type_simple_move = return_type_simple_move_ml(B_ROOK_CB, PIECE_NO_CB);
        type_move = MOVE_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_ROOK_CB, W_QUEEN_CB);
        type_move = CAPTURES_ROOK_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_ROOK_CB, W_ROOK_CB);
        type_move = CAPTURES_ROOK_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_ROOK_CB, W_BISHOP_CB);
        type_move = CAPTURES_ROOK_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_ROOK_CB, W_KNIGHT_CB);
        type_move = CAPTURES_ROOK_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_ROOK_CB, W_PAWN_CB);
        type_move = CAPTURES_ROOK_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);


        // Слоны
        type_simple_move = return_type_simple_move_ml(W_BISHOP_CB, PIECE_NO_CB);
        type_move = MOVE_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_BISHOP_CB, B_QUEEN_CB);
        type_move = CAPTURES_BISHOP_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_BISHOP_CB, B_ROOK_CB);
        type_move = CAPTURES_BISHOP_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_BISHOP_CB, B_BISHOP_CB);
        type_move = CAPTURES_BISHOP_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_BISHOP_CB, B_KNIGHT_CB);
        type_move = CAPTURES_BISHOP_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_BISHOP_CB, B_PAWN_CB);
        type_move = CAPTURES_BISHOP_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);


        type_simple_move = return_type_simple_move_ml(B_BISHOP_CB, PIECE_NO_CB);
        type_move = MOVE_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_BISHOP_CB, W_QUEEN_CB);
        type_move = CAPTURES_BISHOP_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_BISHOP_CB, W_ROOK_CB);
        type_move = CAPTURES_BISHOP_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_BISHOP_CB, W_BISHOP_CB);
        type_move = CAPTURES_BISHOP_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_BISHOP_CB, W_KNIGHT_CB);
        type_move = CAPTURES_BISHOP_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_BISHOP_CB, W_PAWN_CB);
        type_move = CAPTURES_BISHOP_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);


        // Кони
        type_simple_move = return_type_simple_move_ml(W_KNIGHT_CB, PIECE_NO_CB);
        type_move = MOVE_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KNIGHT_CB, B_QUEEN_CB);
        type_move = CAPTURES_KNIGHT_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KNIGHT_CB, B_ROOK_CB);
        type_move = CAPTURES_KNIGHT_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KNIGHT_CB, B_BISHOP_CB);
        type_move = CAPTURES_KNIGHT_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KNIGHT_CB, B_KNIGHT_CB);
        type_move = CAPTURES_KNIGHT_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_KNIGHT_CB, B_PAWN_CB);
        type_move = CAPTURES_KNIGHT_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);


        type_simple_move = return_type_simple_move_ml(B_KNIGHT_CB, PIECE_NO_CB);
        type_move = MOVE_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KNIGHT_CB, W_QUEEN_CB);
        type_move = CAPTURES_KNIGHT_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KNIGHT_CB, W_ROOK_CB);
        type_move = CAPTURES_KNIGHT_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KNIGHT_CB, W_BISHOP_CB);
        type_move = CAPTURES_KNIGHT_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KNIGHT_CB, W_KNIGHT_CB);
        type_move = CAPTURES_KNIGHT_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_KNIGHT_CB, W_PAWN_CB);
        type_move = CAPTURES_KNIGHT_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);


        // Пешки
        // Qwen3.7-Max AI:
        //"Ваш SIMPLE_MOVE_LUT для пешки, бьющей на пустую клетку (W_PAWN_CB, PIECE_NO_CB), вернет MOVE_PAWN_ML (обычный ход).
        // Но при взятии на проходе целевая клетка пуста, а тип хода должен быть EP_CAPTURES_ML!"
        //Я: Замечание правильное. Обрабатываю этот случай в реализаторе ходов. 

        type_simple_move = return_type_simple_move_ml(W_PAWN_CB, PIECE_NO_CB);
        type_move = MOVE_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_PAWN_CB, B_QUEEN_CB);
        type_move = CAPTURES_PAWN_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_PAWN_CB, B_ROOK_CB);
        type_move = CAPTURES_PAWN_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_PAWN_CB, B_BISHOP_CB);
        type_move = CAPTURES_PAWN_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_PAWN_CB, B_KNIGHT_CB);
        type_move = CAPTURES_PAWN_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(W_PAWN_CB, B_PAWN_CB);
        type_move = CAPTURES_PAWN_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);


        type_simple_move = return_type_simple_move_ml(B_PAWN_CB, PIECE_NO_CB);
        type_move = MOVE_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_PAWN_CB, W_QUEEN_CB);
        type_move = CAPTURES_PAWN_QUEEN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_PAWN_CB, W_ROOK_CB);
        type_move = CAPTURES_PAWN_ROOK_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_PAWN_CB, W_BISHOP_CB);
        type_move = CAPTURES_PAWN_BISHOP_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_PAWN_CB, W_KNIGHT_CB);
        type_move = CAPTURES_PAWN_KNIGHT_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);

        type_simple_move = return_type_simple_move_ml(B_PAWN_CB, W_PAWN_CB);
        type_move = CAPTURES_PAWN_PAWN_ML;
        if (type_simple_move != type_move) console.log("type_move = " + type_move + " nm = " + TYPE_MOVE_NAME_ML[type_move]);
    }
    //=======================================================================================  

    //=======================================================================================
    go() {

        this.add_packing_move_ml_test();
        this.sorting_list_ml_test();
        this.set_move_in_0_ml_test();
        this.set_move_after_the_captures_ml_test();
        this.sorting_list_history_heuristic_ml_test();
        this.return_type_captures_pawn_promo_ml_test();
        this.return_type_simple_move_ml_test();
        
    }
    //=======================================================================================


}

export { Move_list_0x88_TEST_С };