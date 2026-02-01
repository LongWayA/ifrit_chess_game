// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_0x88.js
 * @version created 24.01m.2026 
*/

import {
    s_0x88_to_x07, s_0x88_to_y07,
    LET_COOR, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
} from "./chess_board_new.js";


/**
* НАЗНАЧЕНИЕ

 Список содержит псевдолегальные ходы, т.е. есть ходы под шах, открывающие шах
 и рокировки через битые поля.

 Ход содержит:

 let packing_moves = new Uint32Array(LENGTH_LIST = 260).fill(MOVE_NO);

  индексы массива от 0 до 256 зарезервированы для упакованого хода:
  packing_moves[i]
  8 бит для type_move - тип хода. всего 60 разных типов ходов
  8 бит для from - откуда ходит фигура на 128 клеточном поле
  8 бит для to - куда ходит фигура на 128 клеточном поле
  8 бит для name_capture_piece - имя взятой фигуры

  индексы массива зарезервированы для: 
  257 - piece_color - цвет ходяшей фигуры: 0 - черная, 1 - белая.
  258 - number_captures_move - количество взятий
  259 - number_move - количество всех записаных ходов

  распакованные типы не знаю пока куда поместить, но точно не в тот же массив:
   для type_move - тип хода. всего 60 разных типов ходов
   для from - откуда ходит фигура на 128 клеточном поле
   для to - куда ходит фигура на 128 клеточном поле
   для name_capture_piece - имя взятой фигуры
*/

const LENGTH_LIST = 260;// максимально возможная длина списка ходов

const IND_PIESE_COLOR = 257; //
const IND_NUMBER_CAPTURES_MOVE = 258; //
const IND_NUMBER_MOVE = 259; //

const IND_PROMO_QUEEN = 0;
const IND_PROMO_ROOK = 1;
const IND_PROMO_BISHOP = 2;
const IND_PROMO_KNIGHT = 3;

//---------------------------------------------------------------------------

// расписал все возможные типы ходов. всего получилось 60 типов ходов
// теперь каждый тип хода имеет свой обработчик

const MOVE_NO = 0;// нет хода

// абсолютный приоритет. пешка берет да еще превращается в фигуру
// превращение в ферзь
// взятие пешкой фигуры и превращение в фигуру
const CAPTURES_PAWN_QUEEN_PROMO_QUEEN = 1;//
const CAPTURES_PAWN_ROOK_PROMO_QUEEN = 2;// пешка берет ладью и превращается в ферзь
const CAPTURES_PAWN_BISHOP_PROMO_QUEEN = 3;//
const CAPTURES_PAWN_KNIGHT_PROMO_QUEEN = 4;//
// превращение в ладью
const CAPTURES_PAWN_QUEEN_PROMO_ROOK = 5;//
const CAPTURES_PAWN_ROOK_PROMO_ROOK = 6;//
const CAPTURES_PAWN_BISHOP_PROMO_ROOK = 7;//
const CAPTURES_PAWN_KNIGHT_PROMO_ROOK = 8;//
// превращение в слона
const CAPTURES_PAWN_QUEEN_PROMO_BISHOP = 9;//
const CAPTURES_PAWN_ROOK_PROMO_BISHOP = 10;//
const CAPTURES_PAWN_BISHOP_PROMO_BISHOP = 11;//
const CAPTURES_PAWN_KNIGHT_PROMO_BISHOP = 12;//
// превращение в коня
const CAPTURES_PAWN_QUEEN_PROMO_KNIGHT = 13;//
const CAPTURES_PAWN_ROOK_PROMO_KNIGHT = 14;//
const CAPTURES_PAWN_BISHOP_PROMO_KNIGHT = 15;//
const CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT = 16;//

// ходы пешки с превращением
const MOVE_PAWN_PROMO_QUEEN = 17;//
const MOVE_PAWN_PROMO_ROOK = 18;// 
const MOVE_PAWN_PROMO_BISHOP = 19;//
const MOVE_PAWN_PROMO_KNIGHT = 20;//

// взятая фигура дороже чем та, что берет
const CAPTURES_PAWN_QUEEN = 21;// пешка берет ферзь
const CAPTURES_PAWN_ROOK = 22;//
const CAPTURES_PAWN_BISHOP = 23;//
const CAPTURES_PAWN_KNIGHT = 24;//
const CAPTURES_KNIGHT_QUEEN = 25;//
const CAPTURES_KNIGHT_ROOK = 26;//
const CAPTURES_BISHOP_QUEEN = 27;//
const CAPTURES_BISHOP_ROOK = 28;//
const CAPTURES_ROOK_QUEEN = 29;//
// фигуры равнозначны
const CAPTURES_KNIGHT_BISHOP = 30;//  
const CAPTURES_KNIGHT_KNIGHT = 31;//
const CAPTURES_BISHOP_BISHOP = 32;//
const CAPTURES_BISHOP_KNIGHT = 33;//
const CAPTURES_ROOK_ROOK = 34;//
const CAPTURES_QUEEN_QUEEN = 35;//
// взятая фигура дешевле той что берет
const CAPTURES_ROOK_BISHOP = 36;//
const CAPTURES_ROOK_KNIGHT = 37;//
const CAPTURES_QUEEN_ROOK = 38;//
const CAPTURES_QUEEN_BISHOP = 39;//
const CAPTURES_QUEEN_KNIGHT = 40;//
// взятия королем
const CAPTURES_KING_QUEEN = 41;//
const CAPTURES_KING_ROOK = 42;//
const CAPTURES_KING_BISHOP = 43;//
const CAPTURES_KING_KNIGHT = 44;//

// взятия пешек
const CAPTURES_PAWN_PAWN = 45;//
const EP_CAPTURES = 46;// взятие на проходе
const CAPTURES_KNIGHT_PAWN = 47;//
const CAPTURES_BISHOP_PAWN = 48;//
const CAPTURES_ROOK_PAWN = 49;//
const CAPTURES_QUEEN_PAWN = 50;//
const CAPTURES_KING_PAWN = 51;//

/////////////////////////////////////////////////// 

const MOVE_QUEEN = 52;// ход ферзем
const MOVE_ROOK = 53;// ход ладьей
const MOVE_BISHOP = 54;// ход слоном
const MOVE_KNIGHT = 55;// ход конем
const MOVE_KING = 56;// простой ход королем

const MOVE_PAWN = 57;// ход пешкой
const MOVE_DOUBLE_PAWN = 58;// ход пешкой на две клетки

const MOVE_KING_CASTLE = 59;// короткая рокировка
const MOVE_KING_QUEEN_CASTLE = 60;// длинная рокировка

//-----------------------------------------------------------------

// тут по номеру типа хода можно получить его название
const TYPE_MOVE_NAME = [
    "MOVE_NO",
    "CAPTURES_PAWN_QUEEN_PROMO_QUEEN",
    "CAPTURES_PAWN_ROOK_PROMO_QUEEN",
    "CAPTURES_PAWN_BISHOP_PROMO_QUEEN",
    "CAPTURES_PAWN_KNIGHT_PROMO_QUEEN",
    "CAPTURES_PAWN_QUEEN_PROMO_ROOK",
    "CAPTURES_PAWN_ROOK_PROMO_ROOK",
    "CAPTURES_PAWN_BISHOP_PROMO_ROOK",
    "CAPTURES_PAWN_KNIGHT_PROMO_ROOK",
    "CAPTURES_PAWN_QUEEN_PROMO_BISHOP",
    "CAPTURES_PAWN_ROOK_PROMO_BISHOP",
    "CAPTURES_PAWN_BISHOP_PROMO_BISHOP",
    "CAPTURES_PAWN_KNIGHT_PROMO_BISHOP",
    "CAPTURES_PAWN_QUEEN_PROMO_KNIGHT",
    "CAPTURES_PAWN_ROOK_PROMO_KNIGHT",
    "CAPTURES_PAWN_BISHOP_PROMO_KNIGHT",
    "CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT",
    "MOVE_PAWN_PROMO_QUEEN",
    "MOVE_PAWN_PROMO_ROOK",
    "MOVE_PAWN_PROMO_BISHOP",
    "MOVE_PAWN_PROMO_KNIGHT",
    "CAPTURES_PAWN_QUEEN",
    "CAPTURES_PAWN_ROOK",
    "CAPTURES_PAWN_BISHOP",
    "CAPTURES_PAWN_KNIGHT",
    "CAPTURES_KNIGHT_QUEEN",
    "CAPTURES_KNIGHT_ROOK",
    "CAPTURES_BISHOP_QUEEN",
    "CAPTURES_BISHOP_ROOK",
    "CAPTURES_ROOK_QUEEN",
    "CAPTURES_KNIGHT_BISHOP",
    "CAPTURES_KNIGHT_KNIGHT",
    "CAPTURES_BISHOP_BISHOP",
    "CAPTURES_BISHOP_KNIGHT",
    "CAPTURES_ROOK_ROOK",
    "CAPTURES_QUEEN_QUEEN",
    "CAPTURES_ROOK_BISHOP",
    "CAPTURES_ROOK_KNIGHT",
    "CAPTURES_QUEEN_ROOK",
    "CAPTURES_QUEEN_BISHOP",
    "CAPTURES_QUEEN_KNIGHT",
    "CAPTURES_KING_QUEEN",
    "CAPTURES_KING_ROOK",
    "CAPTURES_KING_BISHOP",
    "CAPTURES_KING_KNIGHT",
    "CAPTURES_PAWN_PAWN",
    "EP_CAPTURES",
    "CAPTURES_KNIGHT_PAWN",
    "CAPTURES_BISHOP_PAWN",
    "CAPTURES_ROOK_PAWN",
    "CAPTURES_QUEEN_PAWN",
    "CAPTURES_KING_PAWN",
    "MOVE_QUEEN",
    "MOVE_ROOK",
    "MOVE_BISHOP",
    "MOVE_KNIGHT",
    "MOVE_KING",
    "MOVE_PAWN",
    "MOVE_DOUBLE_PAWN",
    "MOVE_KING_CASTLE",
    "MOVE_KING_QUEEN_CASTLE",
];

/**
* очищаем список ходов
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const clear_list = function (packing_moves) {
    for (let i = 0; i < LENGTH_LIST; i++) {
        packing_moves[i] = MOVE_NO;
    }
}

/**
* добавляем ход в список
* количество ходов увеличиваем на один
* @param {Uint32Array} packing_moves
* @param {number} type_move
* @param {number} from
* @param {number} to
* @param {number} name_capture_piece
* @returns {void}
*/
const add_packing_move = function (packing_moves, type_move, from, to, name_capture_piece) {
    //console.log('add_move->');

    let move = 0; // 

    //name_capture_piece
    move = move | name_capture_piece;
    move = move << 8;

    //to
    move = move | to;
    move = move << 8;

    //from
    move = move | from;
    move = move << 8;

    // type_move
    move = move | type_move;

    let i = packing_moves[IND_NUMBER_MOVE];// индекс хода

    packing_moves[i] = move;

    packing_moves[IND_NUMBER_MOVE] = i + 1;
}

/**
 * @param {number} i
 * @param {Uint32Array} packing_moves
 * @returns {number}
 */
const get_type_move = function (i, packing_moves) {
    //255 это 8 бит ->  11111111
    let move = packing_moves[i]; //
    let type_move = move & 255;
    return type_move;
}

/**
 * @param {number} i
 * @param {Uint32Array} packing_moves
 * @returns {number}
 */
const get_from = function (i, packing_moves) {
    //255 это 8 бит ->  11111111
    let move = packing_moves[i]; //
    move = move >> 8;
    let from = move & 255;
    return from;
}

/**
 * @param {number} i
 * @param {Uint32Array} packing_moves
 * @returns {number}
 */
const get_to = function (i, packing_moves) {
    //255 это 8 бит ->  11111111
    let move = packing_moves[i]; //
    move = move >> 16;
    let to = move & 255;
    return to;
}

/**
 * @param {number} i
 * @param {Uint32Array} packing_moves
 * @returns {number}
 */
const get_name_capture_piece = function (i, packing_moves) {
    //255 это 8 бит ->  11111111
    let move = packing_moves[i]; //
    move = move >> 24;
    let name_capture_piece = move & 255;
    return name_capture_piece;
}

/**
 * присвоить списку цвет фигуры он же цвет ходящей стороны
 * @param {Uint32Array} packing_moves
 * @param {number} piece_color
 * @returns {void}
 */
const set_color = function (packing_moves, piece_color) {
    packing_moves[IND_PIESE_COLOR] = piece_color;
}

/**
 * присвоить количество взятий в списке
 * @param {Uint32Array} packing_moves
 * @param {number} number_captures_move
 * @returns {void}
 */
const set_number_captures_move = function (packing_moves, number_captures_move) {
    packing_moves[IND_NUMBER_CAPTURES_MOVE] = number_captures_move;
}


// SORTING

// сортировка по типу хода. 
// взятия с превращением самые первые 
// дальше просто превращения
// дальше хорошие взятия (т.е.взятая фигура дороже чем та, что берет)
// дальше нейтральные взятия (т.е.взятая фигура равнозначна той, что берет)
// дальше плохие взятия (т.е.взятая фигура дешевле чем та, что берет)
// дальше взятия королем
// дальше взятия пешек   
// дальше простые ходы фигур 
// дальше простые ходы пешек
// и самые последние рокировки 
// взятия раньше других ходов для удобства поиска и сортировки тихих ходов
/**
 * сортировка по типу хода
 * @param {Uint32Array} packing_moves
 * @returns {void}
 */
const sorting_list = function (packing_moves) {

    let number_move = packing_moves[IND_NUMBER_MOVE];

    let type_move_i;
    let type_move_j;

    let save_packing_move;

    //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
    // 
    for (let i = 0; i < number_move; i++) {
        for (let j = i + 1; j < number_move; j++) {//
            // 
            type_move_i = get_type_move(i, packing_moves);
            type_move_j = get_type_move(j, packing_moves);

            if (type_move_i >= type_move_j) {

                // сохраняем позицию на которую будем писать
                save_packing_move = packing_moves[i];

                // пишем на позицию
                packing_moves[i] = packing_moves[j];

                // сюда пишем начальную позицию. т.о. две позиции меняются местами
                packing_moves[j] = save_packing_move;
            }
        }
    }
}

// это для киллеров. 
// находм ход по from, to
// и ставим сразу после взятий. 
/**
 * это для киллеров
 * @param {Uint32Array} packing_moves
 * @param {Uint32Array} packing_moves_k
 * @param {number} depth
 * @returns {number}
 */
const set_move_after_the_captures = function (packing_moves, packing_moves_k, depth) {

    let save_move = -1;
    let s_m;

    let number_move = packing_moves[IND_NUMBER_MOVE];   
    let start = packing_moves[IND_NUMBER_CAPTURES_MOVE];
    let move_k = packing_moves_k[depth];

    if (packing_moves[start] == move_k) return -1;// ход и так на первом месте(после всех взятий)

    //console.log("Move_list_0x88_С-> UP -----------------------------------");
    // 1 ищем ход в списке
    for (s_m = start; s_m < number_move; s_m++) {// 
        if (packing_moves[s_m] == move_k) {
            // ход нашли и записали
            save_move = packing_moves[s_m];
            break;
        }
    }
    // console.log("Move_list_0x88_С-> UP 2 start " + start);
    //console.log("Move_list_0x88_С-> UP 2 s_m " + s_m);

    // ход не нашли
    if (save_move == -1) return -1;

    // 2 сдвигаем позиции выше найденной вниз
    for (let i = s_m; i > start; i--) {
        // если на позиции есть взятая фигура
        // пишем на позицию
        packing_moves[i] = packing_moves[i - 1];
    }

    // сюда пишем начальную позицию. т.о. две позиции меняются местами
    packing_moves[start] = save_move;

    return 0;
}//


///////////////////////////////////////////////////////////////////
// TEST

/**
* сравнение двух списков ходов.
* если есть отличия то печатем в консоль предупреждение
* @param {Uint32Array} packing_moves_original
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const test_compare_list_from = function (packing_moves_original, packing_moves) {

    let number_move_original = packing_moves_original[IND_NUMBER_MOVE];
    let number_move = packing_moves[IND_NUMBER_MOVE];

    let number_captures_move_original = packing_moves_original[IND_NUMBER_CAPTURES_MOVE];
    let number_captures_move = packing_moves[IND_NUMBER_CAPTURES_MOVE];

    let piece_color_original = packing_moves_original[IND_PIESE_COLOR];
    let piece_color = packing_moves[IND_PIESE_COLOR];

    let type_move_i;
    let type_move_j;

    let from_i;
    let from_j;

    let to_i;
    let to_j;

    let name_capture_piece_i;
    let name_capture_piece_j;

    let number_move_equal = 0;
    let number_move_not_equal = 0;

    for (let i = 0; i < number_move_original; i++) {
        for (let j = 0; j < number_move_original; j++) {

            type_move_i = get_type_move(i, packing_moves);
            type_move_j = get_type_move(j, packing_moves);

            from_i = get_from(i, packing_moves);
            from_j = get_from(j, packing_moves);

            to_i = get_to(i, packing_moves);
            to_j = get_to(j, packing_moves);

            name_capture_piece_i = get_name_capture_piece(i, packing_moves);
            name_capture_piece_j = get_name_capture_piece(j, packing_moves);

            if (
                (type_move_i == type_move_j) && (from_i == from_j) &&
                (to_i == to_j) && (name_capture_piece_i == name_capture_piece_j)
            ) {
                number_move_equal = number_move_equal + 1;

            } else {
                number_move_not_equal = number_move_not_equal + 1;
            }
        }
    }


    if (piece_color_original != piece_color) {
        console.log("test_compare_list_from->piece_color original" + piece_color_original +
            "test_compare_list_from->piece_color  " + piece_color);
    }

    if (number_captures_move_original != number_captures_move) {
        console.log("test_compare_list_from->number_captures_move original" + number_captures_move_original +
            "test_compare_list_from->number_captures_move  " + number_captures_move);
    }

    if (number_move_original != number_move) {
        console.log("test_compare_list_from->number_move original" + number_move_original +
            "test_compare_list_from->number_move  " + number_move);
    }

    if (number_move_original != number_move_equal) {
        console.log('Move_list_0x88_С->this.number_move ' + number_move_original);
        console.log('Move_list_0x88_С->number_move_equal ' + number_move_equal);
        console.log('Move_list_0x88_С->number_move_not_equal ' + number_move_not_equal);
    }
}

/**
 * печатаем в консоль ход из списка под заданным номером
 * @param {number} i
 * @param {Uint32Array} packing_moves
 * @returns {void}
 */
const test_print_i_move_list = function (i, packing_moves) {

    let type_move_i = get_type_move(i, packing_moves);
    let from_i = get_from(i, packing_moves);
    let to_i = get_to(i, packing_moves);
    let name_capture_piece_i = get_name_capture_piece(i, packing_moves);

    let number_move = packing_moves[IND_NUMBER_MOVE];
    let number_captures_move = packing_moves[IND_NUMBER_CAPTURES_MOVE];
    let piece_color = packing_moves[IND_PIESE_COLOR];


    console.log("test_print_i_move_list ********");
    console.log("type_move[" + i + "] = " + type_move_i + " nm = " + TYPE_MOVE_NAME[type_move_i]);
    console.log("from[" + i + "] = " + from_i);
    console.log("to[" + i + "] = " + to_i);
    console.log("name_capture_piece_i[" + i + "] = " + name_capture_piece_i);

    console.log(LET_COOR[s_0x88_to_x07(from_i)] + "" +
        (8 - s_0x88_to_y07(from_i)) + "-" +
        LET_COOR[s_0x88_to_x07(to_i)] + "" +
        (8 - s_0x88_to_y07(to_i)));

    console.log("piece_color = " + piece_color);
    console.log("number_captures_move = " + number_captures_move);
    console.log("number_move = " + number_move);

    console.log("---- ");
    console.log("*********** test_print_i_move_list");
}

/**
 * печатаем в консоль весь список ходов
 * @param {Uint32Array} packing_moves
 * @returns {void}
 */
const test_print_list = function (packing_moves) {

    let type_move_i;
    let from_i;
    let to_i;
    let name_capture_piece_i;

    let number_move = packing_moves[IND_NUMBER_MOVE];
    let number_captures_move = packing_moves[IND_NUMBER_CAPTURES_MOVE];
    let piece_color = packing_moves[IND_PIESE_COLOR];


    console.log("test_print_list ********");
    for (let i = 0; i < number_move; i++) {

        type_move_i = get_type_move(i, packing_moves);
        from_i = get_from(i, packing_moves);
        to_i = get_to(i, packing_moves);
        name_capture_piece_i = get_name_capture_piece(i, packing_moves);

        console.log("type_move[" + i + "] = " + type_move_i + " nm = " + TYPE_MOVE_NAME[type_move_i]);
        console.log("from[" + i + "] = " + from_i);
        console.log("to[" + i + "] = " + to_i);
        console.log("name_capture_piece_i[" + i + "] = " + name_capture_piece_i);

        console.log(LET_COOR[s_0x88_to_x07(from_i)] + "" +
            (8 - s_0x88_to_y07(from_i)) + "-" +
            LET_COOR[s_0x88_to_x07(to_i)] + "" +
            (8 - s_0x88_to_y07(to_i)));

        console.log("---- ");
    }

    console.log("piece_color = " + piece_color);
    console.log("number_captures_move = " + number_captures_move);
    console.log("number_move = " + number_move);
    console.log("*********** test_print_list");
}

//////////////////////////////////////////////////

/**
 * копируем в наш список список из параметров функции
 * т.е. тот что задан в скобках тот и копируем
* @param {Uint32Array} packing_moves_to
* @param {Uint32Array} packing_moves_from
* @returns {void}
*/
const save_list_from = function (packing_moves_to, packing_moves_from) {

    let number_move_from = LENGTH_LIST;

    for (let i = 0; i < number_move_from; i++) {
        packing_moves_to[i] = packing_moves_from[i];
    }
}

/**
 * если ход from, to 
 * нашли в списке ходов
 * в случае превращений это первое попавшееся
* @param {Uint32Array} packing_moves
* @param {number} from
* @param {number} to
* @returns {boolean}
*/
const move_is_found = function (packing_moves, from, to) {

    let found = false;

    let from_i;
    let to_i;
    let number_move = packing_moves[IND_NUMBER_MOVE];


    for (let i = 0; i < number_move; i++) {

        from_i = get_from(i, packing_moves);
        to_i = get_to(i, packing_moves);

        if ((from_i == from) && (to_i == to)) {
            found = true;
            return found;
        }
    }

    return found;
}

/**
* находим и возвращаем порядковый номер хода
* по ходу from, to, promo
* в том числе и в случае превращений
* @param {Uint32Array} packing_moves
* @param {number} from
* @param {number} to
* @returns {number}
*/
const return_i_move = function (packing_moves, from, to, promo = "") {

    let i_move = -1;

    let type_move_i;
    let from_i;
    let to_i;
    let number_move = packing_moves[IND_NUMBER_MOVE];

    for (let i = 0; i < number_move; i++) {

        from_i = get_from(i, packing_moves);
        to_i = get_to(i, packing_moves);


        if ((from_i == from) && (to_i == to)) {
            if (promo == "") {
                i_move = i;
                return i_move;
            } else {

                type_move_i = get_type_move(i, packing_moves);

                if (promo == return_promo_piece_from_type_move(type_move_i)) {
                    i_move = i;
                    return i_move;
                }
                continue;
            }
        }
    }

    return i_move;
}

/**
* возвращем ход из списка на заданной позиции
* в виде строки вида e2e4, e7e8q
* @param {number} i
* @param {Uint32Array} packing_moves
* @returns {string}
*/
const move_to_string_uci = function (i, packing_moves) {

    let type_move_i = get_type_move(i, packing_moves);

    let promo = return_promo_piece_from_type_move(type_move_i);
    let from_i = get_from(i, packing_moves);
    let to_i = get_to(i, packing_moves);


    let move_str = "" +
        LET_COOR[s_0x88_to_x07(from_i)] +
        (8 - s_0x88_to_y07(from_i)) +
        LET_COOR[s_0x88_to_x07(to_i)] +
        (8 - s_0x88_to_y07(to_i)) + promo;

    return move_str;
}

// это нужно для работы генератора взятий. это очень важная функция и конечно полностью проверена
// возвращаем название хода превращения пешки со взятием по взятой фигуре 
// т.е. пешка берет коня KNIGHT тогда будет множестов превращений со взятием коня, 
// это 
// PROMO_QUEEN = CAPTURES_PAWN_KNIGHT_PROMO_QUEEN;
// PROMO_ROOK = CAPTURES_PAWN_KNIGHT_PROMO_ROOK;
// PROMO_BISHOP = CAPTURES_PAWN_KNIGHT_PROMO_BISHOP;
// PROMO_KNIGHT = CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT;
// 
/**
* @param {number} piece_name_captures
* @returns {out}
*/
//+
const return_type_captures_pawn_promo = function (piece_name_captures) {

    let out = [0, 0, 0, 0];

    if ((piece_name_captures == W_QUEEN) || (piece_name_captures == B_QUEEN)) {
        out[IND_PROMO_QUEEN] = CAPTURES_PAWN_QUEEN_PROMO_QUEEN;
        out[IND_PROMO_ROOK] = CAPTURES_PAWN_QUEEN_PROMO_ROOK;
        out[IND_PROMO_BISHOP] = CAPTURES_PAWN_QUEEN_PROMO_BISHOP;
        out[IND_PROMO_KNIGHT] = CAPTURES_PAWN_QUEEN_PROMO_KNIGHT;
    };

    if ((piece_name_captures == W_ROOK) || (piece_name_captures == B_ROOK)) {
        out[IND_PROMO_QUEEN] = CAPTURES_PAWN_ROOK_PROMO_QUEEN;
        out[IND_PROMO_ROOK] = CAPTURES_PAWN_ROOK_PROMO_ROOK;
        out[IND_PROMO_BISHOP] = CAPTURES_PAWN_ROOK_PROMO_BISHOP;
        out[IND_PROMO_KNIGHT] = CAPTURES_PAWN_ROOK_PROMO_KNIGHT;
    };

    if ((piece_name_captures == W_BISHOP) || (piece_name_captures == B_BISHOP)) {
        out[IND_PROMO_QUEEN] = CAPTURES_PAWN_BISHOP_PROMO_QUEEN;
        out[IND_PROMO_ROOK] = CAPTURES_PAWN_BISHOP_PROMO_ROOK;
        out[IND_PROMO_BISHOP] = CAPTURES_PAWN_BISHOP_PROMO_BISHOP;
        out[IND_PROMO_KNIGHT] = CAPTURES_PAWN_BISHOP_PROMO_KNIGHT;
    };

    if ((piece_name_captures == W_KNIGHT) || (piece_name_captures == B_KNIGHT)) {
        out[IND_PROMO_QUEEN] = CAPTURES_PAWN_KNIGHT_PROMO_QUEEN;
        out[IND_PROMO_ROOK] = CAPTURES_PAWN_KNIGHT_PROMO_ROOK;
        out[IND_PROMO_BISHOP] = CAPTURES_PAWN_KNIGHT_PROMO_BISHOP;
        out[IND_PROMO_KNIGHT] = CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT;
    };

    return out;
}

// очень важная функция. используется в генераторе взятий и тихих ходов.
// возвращем тип хода взятия по ходящей фигуре и по взятой фигуре
// например KING, QUEEN -> CAPTURES_KING_QUEEN
/**
* @param {number} piece_name
* @param {number} piece_name_captures
* @returns {number}
*/
//+
const return_type_simple_move = function (piece_name, piece_name_captures) {
    switch (piece_name) {
        case W_KING://
            if (piece_name_captures == PIECE_NO) return MOVE_KING;
            if (piece_name_captures == B_QUEEN) return CAPTURES_KING_QUEEN;
            if (piece_name_captures == B_ROOK) return CAPTURES_KING_ROOK;
            if (piece_name_captures == B_BISHOP) return CAPTURES_KING_BISHOP;
            if (piece_name_captures == B_KNIGHT) return CAPTURES_KING_KNIGHT;
            if (piece_name_captures == B_PAWN) return CAPTURES_KING_PAWN;
            break;
        case B_KING://
            if (piece_name_captures == PIECE_NO) return MOVE_KING;
            if (piece_name_captures == W_QUEEN) return CAPTURES_KING_QUEEN;
            if (piece_name_captures == W_ROOK) return CAPTURES_KING_ROOK;
            if (piece_name_captures == W_BISHOP) return CAPTURES_KING_BISHOP;
            if (piece_name_captures == W_KNIGHT) return CAPTURES_KING_KNIGHT;
            if (piece_name_captures == W_PAWN) return CAPTURES_KING_PAWN;
            break;

        case W_QUEEN://
            if (piece_name_captures == PIECE_NO) return MOVE_QUEEN;
            if (piece_name_captures == B_QUEEN) return CAPTURES_QUEEN_QUEEN;
            if (piece_name_captures == B_ROOK) return CAPTURES_QUEEN_ROOK;
            if (piece_name_captures == B_BISHOP) return CAPTURES_QUEEN_BISHOP;
            if (piece_name_captures == B_KNIGHT) return CAPTURES_QUEEN_KNIGHT;
            if (piece_name_captures == B_PAWN) return CAPTURES_QUEEN_PAWN;
            break;
        case B_QUEEN://
            if (piece_name_captures == PIECE_NO) return MOVE_QUEEN;
            if (piece_name_captures == W_QUEEN) return CAPTURES_QUEEN_QUEEN;
            if (piece_name_captures == W_ROOK) return CAPTURES_QUEEN_ROOK;
            if (piece_name_captures == W_BISHOP) return CAPTURES_QUEEN_BISHOP;
            if (piece_name_captures == W_KNIGHT) return CAPTURES_QUEEN_KNIGHT;
            if (piece_name_captures == W_PAWN) return CAPTURES_QUEEN_PAWN;
            break;

        case W_ROOK://
            if (piece_name_captures == PIECE_NO) return MOVE_ROOK;
            if (piece_name_captures == B_QUEEN) return CAPTURES_ROOK_QUEEN;
            if (piece_name_captures == B_ROOK) return CAPTURES_ROOK_ROOK;
            if (piece_name_captures == B_BISHOP) return CAPTURES_ROOK_BISHOP;
            if (piece_name_captures == B_KNIGHT) return CAPTURES_ROOK_KNIGHT;
            if (piece_name_captures == B_PAWN) return CAPTURES_ROOK_PAWN;
            break;
        case B_ROOK://
            if (piece_name_captures == PIECE_NO) return MOVE_ROOK;
            if (piece_name_captures == W_QUEEN) return CAPTURES_ROOK_QUEEN;
            if (piece_name_captures == W_ROOK) return CAPTURES_ROOK_ROOK;
            if (piece_name_captures == W_BISHOP) return CAPTURES_ROOK_BISHOP;
            if (piece_name_captures == W_KNIGHT) return CAPTURES_ROOK_KNIGHT;
            if (piece_name_captures == W_PAWN) return CAPTURES_ROOK_PAWN;
            break;

        case W_BISHOP://
            if (piece_name_captures == PIECE_NO) return MOVE_BISHOP;
            if (piece_name_captures == B_QUEEN) return CAPTURES_BISHOP_QUEEN;
            if (piece_name_captures == B_ROOK) return CAPTURES_BISHOP_ROOK;
            if (piece_name_captures == B_BISHOP) return CAPTURES_BISHOP_BISHOP;
            if (piece_name_captures == B_KNIGHT) return CAPTURES_BISHOP_KNIGHT;
            if (piece_name_captures == B_PAWN) return CAPTURES_BISHOP_PAWN;
            break;
        case B_BISHOP://
            if (piece_name_captures == PIECE_NO) return MOVE_BISHOP;
            if (piece_name_captures == W_QUEEN) return CAPTURES_BISHOP_QUEEN;
            if (piece_name_captures == W_ROOK) return CAPTURES_BISHOP_ROOK;
            if (piece_name_captures == W_BISHOP) return CAPTURES_BISHOP_BISHOP;
            if (piece_name_captures == W_KNIGHT) return CAPTURES_BISHOP_KNIGHT;
            if (piece_name_captures == W_PAWN) return CAPTURES_BISHOP_PAWN;
            break;

        case W_KNIGHT://
            if (piece_name_captures == PIECE_NO) return MOVE_KNIGHT;
            if (piece_name_captures == B_QUEEN) return CAPTURES_KNIGHT_QUEEN;
            if (piece_name_captures == B_ROOK) return CAPTURES_KNIGHT_ROOK;
            if (piece_name_captures == B_BISHOP) return CAPTURES_KNIGHT_BISHOP;
            if (piece_name_captures == B_KNIGHT) return CAPTURES_KNIGHT_KNIGHT;
            if (piece_name_captures == B_PAWN) return CAPTURES_KNIGHT_PAWN;
            break;
        case B_KNIGHT://
            if (piece_name_captures == PIECE_NO) return MOVE_KNIGHT;
            if (piece_name_captures == W_QUEEN) return CAPTURES_KNIGHT_QUEEN;
            if (piece_name_captures == W_ROOK) return CAPTURES_KNIGHT_ROOK;
            if (piece_name_captures == W_BISHOP) return CAPTURES_KNIGHT_BISHOP;
            if (piece_name_captures == W_KNIGHT) return CAPTURES_KNIGHT_KNIGHT;
            if (piece_name_captures == W_PAWN) return CAPTURES_KNIGHT_PAWN;
            break;

        case W_PAWN://
            if (piece_name_captures == PIECE_NO) return MOVE_PAWN;
            if (piece_name_captures == B_QUEEN) return CAPTURES_PAWN_QUEEN;
            if (piece_name_captures == B_ROOK) return CAPTURES_PAWN_ROOK;
            if (piece_name_captures == B_BISHOP) return CAPTURES_PAWN_BISHOP;
            if (piece_name_captures == B_KNIGHT) return CAPTURES_PAWN_KNIGHT;
            if (piece_name_captures == B_PAWN) return CAPTURES_PAWN_PAWN;
            break;
        case B_PAWN://
            if (piece_name_captures == PIECE_NO) return MOVE_PAWN;
            if (piece_name_captures == W_QUEEN) return CAPTURES_PAWN_QUEEN;
            if (piece_name_captures == W_ROOK) return CAPTURES_PAWN_ROOK;
            if (piece_name_captures == W_BISHOP) return CAPTURES_PAWN_BISHOP;
            if (piece_name_captures == W_KNIGHT) return CAPTURES_PAWN_KNIGHT;
            if (piece_name_captures == W_PAWN) return CAPTURES_PAWN_PAWN;
            break;
        default://
        // console.log("default");
    }
    return -1;
}

// используем для строкового представления фигуры в ходах
/**
* @param {number} type_move
* @returns {string}
*/
//+
const type_move_to_name_piese = function (type_move) {
    if (type_move == MOVE_NO) return "NO";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_QUEEN) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_QUEEN) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_QUEEN) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_QUEEN) return "P";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_ROOK) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_ROOK) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_ROOK) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_ROOK) return "P";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_BISHOP) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_BISHOP) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_BISHOP) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_BISHOP) return "P";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_KNIGHT) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_KNIGHT) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_KNIGHT) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT) return "P";
    if (type_move == MOVE_PAWN_PROMO_QUEEN) return "P";
    if (type_move == MOVE_PAWN_PROMO_ROOK) return "P";
    if (type_move == MOVE_PAWN_PROMO_BISHOP) return "P";
    if (type_move == MOVE_PAWN_PROMO_KNIGHT) return "P";
    if (type_move == CAPTURES_PAWN_QUEEN) return "P";
    if (type_move == CAPTURES_PAWN_ROOK) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT) return "P";
    if (type_move == CAPTURES_KNIGHT_QUEEN) return "N";
    if (type_move == CAPTURES_KNIGHT_ROOK) return "N";
    if (type_move == CAPTURES_BISHOP_QUEEN) return "B";
    if (type_move == CAPTURES_BISHOP_ROOK) return "B";
    if (type_move == CAPTURES_ROOK_QUEEN) return "R";
    if (type_move == CAPTURES_KNIGHT_BISHOP) return "N";
    if (type_move == CAPTURES_KNIGHT_KNIGHT) return "N";
    if (type_move == CAPTURES_BISHOP_BISHOP) return "B";
    if (type_move == CAPTURES_BISHOP_KNIGHT) return "B";
    if (type_move == CAPTURES_ROOK_ROOK) return "R";
    if (type_move == CAPTURES_QUEEN_QUEEN) return "Q";
    if (type_move == CAPTURES_ROOK_BISHOP) return "R";
    if (type_move == CAPTURES_ROOK_KNIGHT) return "R";
    if (type_move == CAPTURES_QUEEN_ROOK) return "Q";
    if (type_move == CAPTURES_QUEEN_BISHOP) return "Q";
    if (type_move == CAPTURES_QUEEN_KNIGHT) return "Q";
    if (type_move == CAPTURES_KING_QUEEN) return "K";
    if (type_move == CAPTURES_KING_ROOK) return "K";
    if (type_move == CAPTURES_KING_BISHOP) return "K";
    if (type_move == CAPTURES_KING_KNIGHT) return "K";
    if (type_move == CAPTURES_PAWN_PAWN) return "P";
    if (type_move == EP_CAPTURES) return "P";
    if (type_move == CAPTURES_KNIGHT_PAWN) return "N";
    if (type_move == CAPTURES_BISHOP_PAWN) return "B";
    if (type_move == CAPTURES_ROOK_PAWN) return "R";
    if (type_move == CAPTURES_QUEEN_PAWN) return "Q";
    if (type_move == CAPTURES_KING_PAWN) return "K";
    if (type_move == MOVE_QUEEN) return "Q";
    if (type_move == MOVE_ROOK) return "R";
    if (type_move == MOVE_BISHOP) return "B";
    if (type_move == MOVE_KNIGHT) return "N";
    if (type_move == MOVE_KING) return "K";
    if (type_move == MOVE_PAWN) return "P";
    if (type_move == MOVE_DOUBLE_PAWN) return "P";
    if (type_move == MOVE_KING_CASTLE) return "K";
    if (type_move == MOVE_KING_QUEEN_CASTLE) return "K";
    return "";
}

/**
* @param {number} type_move
* @returns {string}
*/
//+
const type_move_to_name_piese_f = function (type_move) {
    if (type_move == MOVE_NO) return "NO";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_QUEEN) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_QUEEN) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_QUEEN) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_QUEEN) return "PAWN";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_ROOK) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_ROOK) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_ROOK) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_ROOK) return "PAWN";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_BISHOP) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_BISHOP) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_BISHOP) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_BISHOP) return "PAWN";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_KNIGHT) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_KNIGHT) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_KNIGHT) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT) return "PAWN";
    if (type_move == MOVE_PAWN_PROMO_QUEEN) return "PAWN";
    if (type_move == MOVE_PAWN_PROMO_ROOK) return "PAWN";
    if (type_move == MOVE_PAWN_PROMO_BISHOP) return "PAWN";
    if (type_move == MOVE_PAWN_PROMO_KNIGHT) return "PAWN";
    if (type_move == CAPTURES_PAWN_QUEEN) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT) return "PAWN";
    if (type_move == CAPTURES_KNIGHT_QUEEN) return "KNIGHT";
    if (type_move == CAPTURES_KNIGHT_ROOK) return "KNIGHT";
    if (type_move == CAPTURES_BISHOP_QUEEN) return "BISHOP";
    if (type_move == CAPTURES_BISHOP_ROOK) return "BISHOP";
    if (type_move == CAPTURES_ROOK_QUEEN) return "ROOK";
    if (type_move == CAPTURES_KNIGHT_BISHOP) return "KNIGHT";
    if (type_move == CAPTURES_KNIGHT_KNIGHT) return "KNIGHT";
    if (type_move == CAPTURES_BISHOP_BISHOP) return "BISHOP";
    if (type_move == CAPTURES_BISHOP_KNIGHT) return "BISHOP";
    if (type_move == CAPTURES_ROOK_ROOK) return "ROOK";
    if (type_move == CAPTURES_QUEEN_QUEEN) return "QUEEN";
    if (type_move == CAPTURES_ROOK_BISHOP) return "ROOK";
    if (type_move == CAPTURES_ROOK_KNIGHT) return "ROOK";
    if (type_move == CAPTURES_QUEEN_ROOK) return "QUEEN";
    if (type_move == CAPTURES_QUEEN_BISHOP) return "QUEEN";
    if (type_move == CAPTURES_QUEEN_KNIGHT) return "QUEEN";
    if (type_move == CAPTURES_KING_QUEEN) return "KING";
    if (type_move == CAPTURES_KING_ROOK) return "KING";
    if (type_move == CAPTURES_KING_BISHOP) return "KING";
    if (type_move == CAPTURES_KING_KNIGHT) return "KING";
    if (type_move == CAPTURES_PAWN_PAWN) return "PAWN";
    if (type_move == EP_CAPTURES) return "PAWN";
    if (type_move == CAPTURES_KNIGHT_PAWN) return "KNIGHT";
    if (type_move == CAPTURES_BISHOP_PAWN) return "BISHOP";
    if (type_move == CAPTURES_ROOK_PAWN) return "ROOK";
    if (type_move == CAPTURES_QUEEN_PAWN) return "QUEEN";
    if (type_move == CAPTURES_KING_PAWN) return "KING";
    if (type_move == MOVE_QUEEN) return "QUEEN";
    if (type_move == MOVE_ROOK) return "ROOK";
    if (type_move == MOVE_BISHOP) return "BISHOP";
    if (type_move == MOVE_KNIGHT) return "KNIGHT";
    if (type_move == MOVE_KING) return "KING";
    if (type_move == MOVE_PAWN) return "PAWN";
    if (type_move == MOVE_DOUBLE_PAWN) return "PAWN";
    if (type_move == MOVE_KING_CASTLE) return "KING";
    if (type_move == MOVE_KING_QUEEN_CASTLE) return "KING";
    return "";
}

// возвращаем фигуру в которую превращается пешка по типу хода
/**
* @param {number} type_move
* @returns {string}
*/
//+
const return_promo_piece_from_type_move = function (type_move) {

    if (type_move == MOVE_PAWN_PROMO_QUEEN) return "q";
    if (type_move == MOVE_PAWN_PROMO_ROOK) return "r";
    if (type_move == MOVE_PAWN_PROMO_BISHOP) return "b";
    if (type_move == MOVE_PAWN_PROMO_KNIGHT) return "n";

    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_QUEEN) return "q";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_ROOK) return "r";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_BISHOP) return "b";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_KNIGHT) return "n";

    if (type_move == CAPTURES_PAWN_ROOK_PROMO_QUEEN) return "q";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_ROOK) return "r";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_BISHOP) return "b";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_KNIGHT) return "n";

    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_QUEEN) return "q";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_ROOK) return "r";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_BISHOP) return "b";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_KNIGHT) return "n";

    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_QUEEN) return "q";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_ROOK) return "r";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_BISHOP) return "b";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT) return "n";
    return "";
}

//return_piece_name_captures_from_type_move, 
export {
    clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
    sorting_list, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
    return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
    type_move_to_name_piese, type_move_to_name_piese_f, return_promo_piece_from_type_move, set_move_after_the_captures,
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
};