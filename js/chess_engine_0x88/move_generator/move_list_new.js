// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_0x88.js
 * @version created 24.01m.2026 
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";
import { History_heuristic_0x88_C } from "../for_sorting_move/history_heuristic_0x88.js";

/**
* НАЗНАЧЕНИЕ
 Список содержит псевдолегальные ходы, т.е. есть ходы под шах, открывающие шах
 и рокировки через битые поля.
 Ход содержит:
  type_move[i] - тип хода. всего 60 разных типов ходов
  from[i] - откуда ходит фигура на 128 клеточном поле
  to[i] - куда ходит фигура на 128 клеточном поле
  piece_color - цвет ходяшей фигуры: 0 - черная, 1 - белая.
  number_captures_move - количество взятий
  number_move - количество всех записаных ходов
  LENGTH_LIST = 256 - максимально возможная длина списка ходов.
*/
//+
// тут все прозрачно. идей пока нет

/**
 * Класс.
 * @class
 */
class Move_list_0x88_С {

    static NAME = "Move_list_0x88_С";

    // расписал все возможные типы ходов. всего получилось 60 типов ходов
    // теперь каждый тип хода имеет свой обработчик


    static MOVE_NO = 0;// нет хода

    // абсолютный приоритет. пешка берет да еще превращается в фигуру
    // превращение в ферзь
    // взятие пешкой фигуры и превращение в фигуру
    static CAPTURES_PAWN_QUEEN_PROMO_QUEEN = 1;//
    static CAPTURES_PAWN_ROOK_PROMO_QUEEN = 2;// пешка берет ладью и превращается в ферзь
    static CAPTURES_PAWN_BISHOP_PROMO_QUEEN = 3;//
    static CAPTURES_PAWN_KNIGHT_PROMO_QUEEN = 4;//
    // превращение в ладью
    static CAPTURES_PAWN_QUEEN_PROMO_ROOK = 5;//
    static CAPTURES_PAWN_ROOK_PROMO_ROOK = 6;//
    static CAPTURES_PAWN_BISHOP_PROMO_ROOK = 7;//
    static CAPTURES_PAWN_KNIGHT_PROMO_ROOK = 8;//
    // превращение в слона
    static CAPTURES_PAWN_QUEEN_PROMO_BISHOP = 9;//
    static CAPTURES_PAWN_ROOK_PROMO_BISHOP = 10;//
    static CAPTURES_PAWN_BISHOP_PROMO_BISHOP = 11;//
    static CAPTURES_PAWN_KNIGHT_PROMO_BISHOP = 12;//
    // превращение в коня
    static CAPTURES_PAWN_QUEEN_PROMO_KNIGHT = 13;//
    static CAPTURES_PAWN_ROOK_PROMO_KNIGHT = 14;//
    static CAPTURES_PAWN_BISHOP_PROMO_KNIGHT = 15;//
    static CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT = 16;//

    // ходы пешки с превращением
    static MOVE_PAWN_PROMO_QUEEN = 17;//
    static MOVE_PAWN_PROMO_ROOK = 18;// 
    static MOVE_PAWN_PROMO_BISHOP = 19;//
    static MOVE_PAWN_PROMO_KNIGHT = 20;//

    // взятая фигура дороже чем та, что берет
    static CAPTURES_PAWN_QUEEN = 21;// пешка берет ферзь
    static CAPTURES_PAWN_ROOK = 22;//
    static CAPTURES_PAWN_BISHOP = 23;//
    static CAPTURES_PAWN_KNIGHT = 24;//
    static CAPTURES_KNIGHT_QUEEN = 25;//
    static CAPTURES_KNIGHT_ROOK = 26;//
    static CAPTURES_BISHOP_QUEEN = 27;//
    static CAPTURES_BISHOP_ROOK = 28;//
    static CAPTURES_ROOK_QUEEN = 29;//
    // фигуры равнозначны
    static CAPTURES_KNIGHT_BISHOP = 30;//  
    static CAPTURES_KNIGHT_KNIGHT = 31;//
    static CAPTURES_BISHOP_BISHOP = 32;//
    static CAPTURES_BISHOP_KNIGHT = 33;//
    static CAPTURES_ROOK_ROOK = 34;//
    static CAPTURES_QUEEN_QUEEN = 35;//
    // взятая фигура дешевле той что берет
    static CAPTURES_ROOK_BISHOP = 36;//
    static CAPTURES_ROOK_KNIGHT = 37;//
    static CAPTURES_QUEEN_ROOK = 38;//
    static CAPTURES_QUEEN_BISHOP = 39;//
    static CAPTURES_QUEEN_KNIGHT = 40;//
    // взятия королем
    static CAPTURES_KING_QUEEN = 41;//
    static CAPTURES_KING_ROOK = 42;//
    static CAPTURES_KING_BISHOP = 43;//
    static CAPTURES_KING_KNIGHT = 44;//

    // взятия пешек
    static CAPTURES_PAWN_PAWN = 45;//
    static EP_CAPTURES = 46;// взятие на проходе
    static CAPTURES_KNIGHT_PAWN = 47;//
    static CAPTURES_BISHOP_PAWN = 48;//
    static CAPTURES_ROOK_PAWN = 49;//
    static CAPTURES_QUEEN_PAWN = 50;//
    static CAPTURES_KING_PAWN = 51;//

    /////////////////////////////////////////////////// 

    static MOVE_QUEEN = 52;// ход ферзем
    static MOVE_ROOK = 53;// ход ладьей
    static MOVE_BISHOP = 54;// ход слоном
    static MOVE_KNIGHT = 55;// ход конем
    static MOVE_KING = 56;// простой ход королем

    static MOVE_PAWN = 57;// ход пешкой
    static MOVE_DOUBLE_PAWN = 58;// ход пешкой на две клетки

    static MOVE_KING_CASTLE = 59;// короткая рокировка
    static MOVE_KING_QUEEN_CASTLE = 60;// длинная рокировка

    static LENGTH_LIST = 256;// максимально возможная длина списка ходов

    // тут по номеру типа хода можно получить его название
    static TYPE_MOVE_NAME = [
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

    // тип хода. выше видно как он задан. это изюминка данного генератора. 
    // в типе хода записана фигура которая берет, которую берут, в которую превращаются 
    // и которую берут с превращением. так что имя взятой фигуры отдельно не нужно.
    // вообще тут все возможные типы ходов.
    //type_move = new Array(Move_list_0x88_С.LENGTH_LIST).fill(Move_list_0x88_С.MOVE_NO);
    type_move = new Int32Array(Move_list_0x88_С.LENGTH_LIST).fill(Move_list_0x88_С.MOVE_NO);

    // откуда ходит фигура
    //from = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);
    from = new Int32Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);

    // куда ходит фигура
    //to = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);
    to = new Int32Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);

    // цвет ходяшей фигуры. 
    piece_color = 0;

    // количество взятий
    number_captures_move = 0;

    // количество всех ходов
    number_move = 0;

    constructor() {

    }

    iniM() {
        this.clear_list();
    }

    // очищаем список ходов
    clear_list() {
        for (let i = 0; i < Move_list_0x88_С.LENGTH_LIST; i++) {
            this.type_move[i] = Move_list_0x88_С.MOVE_NO;
            this.from[i] = -1;
            this.to[i] = -1;
        }
        this.piece_color = 0;
        this.number_captures_move = 0;
        this.number_move = 0;
    }

    // добавляем ход в список 
    // количество ходов увеличиваем на один
    /**
    * @param {number} type_move
    * @param {number} from
    * @param {number} to
    * @returns {void}
    */
    add_move(type_move, from, to) {
        //console.log('Move_list_0x88_С->add_move');
        this.type_move[this.number_move] = type_move;
        this.from[this.number_move] = from;
        this.to[this.number_move] = to;

        this.number_move = this.number_move + 1;
    }

    // присвоить списку цвет фигуры он же цвет ходящей стороны
    /**
     * @param {number} piece_color
     * @returns {void}
     */
    set_color(piece_color) {
        this.piece_color = piece_color;
    }

    // присвоить количество взятий в списке
    /**
     * @param {number} number_captures_move
     * @returns {void}
     */
    set_number_captures_move(number_captures_move) {
        this.number_captures_move = number_captures_move;
    }


    // SORTING

    // это для хеш-ходов
    // ставим ход найденный по type_move(искать так быстрее всего) 
    // и подтвержденный по from, to ход на первую позицию. индекс 0 
    // подтверждение нужно потому что допустим два коня ходят на одинаковую клетку 
    // или один конь ходит на разные клетки и непонятно какой из ходов имелся в виду, 
    // а просто откуда и куда для случаев превращения недостаточно
    // остальные сдвигаем вниз 

    /**
    * @param {number} from
    * @param {number} to
    * @returns {number}
    */
    set_tt_move_in_0(from, to) {

        let save_type_move = -1;
        let save_from = -1;
        let save_to = -1;

        let s_m;// save move - индекс найденного и записанного хода

        if (this.from[0] == from) return -1;

        //console.log("Move_list_0x88_С-> UP -----------------------------------");
        // 1 ищем ход в списке
        for (s_m = 0; s_m < this.number_move; s_m++) {//
            if ((this.from[s_m] == from) && (this.to[s_m] == to)) {
                // ход нашли и записали
                save_type_move = this.type_move[s_m];
                save_from = this.from[s_m];
                save_to = this.to[s_m];
                break;// нашли ход. идем дальше
            }
        }

        // ход не нашли
        if (save_from == -1) return -1;

        //console.log("Move_list_0x88_С-> UP 2 s_m " + s_m);        

        // 2 сдвигаем позиции выше найденной вниз
        for (let i = s_m; i > 0; i--) {
            // если на позиции есть взятая фигура
            // пишем на позицию
            this.type_move[i] = this.type_move[i - 1];
            this.from[i] = this.from[i - 1];
            this.to[i] = this.to[i - 1];

        }

        // сюда пишем начальную позицию. т.о. две позиции меняются местами
        this.type_move[0] = save_type_move;
        this.from[0] = save_from;
        this.to[0] = save_to;

        return 0;
    }//

    // это для сортировки по истории
    // сортируем все не взятия по оценке присвоенной в массиве истории. 
    // чем больше оценка тем выше ход но не выше всех взятий, даже плохих 
    // потому что так быстрее и движуху смотрим в первую очередь.
    // что такое эвристика истории смотреть в файле с этой эвристикой.
    /**
    * @param {History_heuristic_0x88_C} history_heuristic_0x88_O
    * @returns {void}
    */
    sorting_list_history_heuristic(history_heuristic_0x88_O) {

        let save_type_move;

        let save_from;
        let save_to;

        let start = this.number_captures_move;

        let from_64_i;
        let to_64_i;

        let from_64_j;
        let to_64_j;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка тихих ходов ходы с максимальной оценкой по истории. 
        // т.е. отсортированные тихие ходы идут после взятий
        for (let i = start; i < this.number_move; i++) {

            from_64_i = Chess_board_0x88_C.SQUARE_128_to_64[this.from[i]];
            to_64_i = Chess_board_0x88_C.SQUARE_128_to_64[this.to[i]];
            // console.log("Move_list_0x88_С-> SORTING from_64_i " + from_64_i + " to_64_i " + to_64_i);
            // console.log("Move_list_0x88_С-> SORTING history i " +
            //     history_heuristic_0x88_O.history[this.piece_color][from_64_i][to_64_i]);

            for (let j = i + 1; j < this.number_move; j++) {//
                // 
                from_64_j = Chess_board_0x88_C.SQUARE_128_to_64[this.from[j]];
                to_64_j = Chess_board_0x88_C.SQUARE_128_to_64[this.to[j]];


                // console.log("Move_list_0x88_С-> SORTING from_64_j " + from_64_j + " to_64_j " + to_64_j);                
                // console.log("Move_list_0x88_С-> SORTING history j " +
                //     history_heuristic_0x88_O.history[this.piece_color][from_64_j][to_64_j]);                    

                if (history_heuristic_0x88_O.history[this.piece_color][from_64_i][to_64_i] <
                    history_heuristic_0x88_O.history[this.piece_color][from_64_j][to_64_j]) {

                    //                    console.log("Move_list_0x88_С-> SORTING -----------------------------------");     
                    // сохраняем позицию на которую будем писать
                    save_type_move = this.type_move[i];
                    save_from = this.from[i];
                    save_to = this.to[i];

                    // пишем на позицию
                    this.type_move[i] = this.type_move[j];
                    this.from[i] = this.from[j];
                    this.to[i] = this.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.type_move[j] = save_type_move;
                    this.from[j] = save_from;
                    this.to[j] = save_to;
                }
            }
        }
    }

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
    sorting_list() {

        let save_type_move;

        let save_from;
        let save_to;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // 
        for (let i = 0; i < this.number_move; i++) {
            for (let j = i + 1; j < this.number_move; j++) {//
                // 
                if (this.type_move[i] >= this.type_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_type_move = this.type_move[i];
                    save_from = this.from[i];
                    save_to = this.to[i];

                    // пишем на позицию
                    this.type_move[i] = this.type_move[j];
                    this.from[i] = this.from[j];
                    this.to[i] = this.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.type_move[j] = save_type_move;
                    this.from[j] = save_from;
                    this.to[j] = save_to;
                }
            }
        }
    }

    // это для киллеров. 
    // находм ход по from, to
    // и ставим сразу после взятий. 
    /**
    * @param {number} from
    * @param {number} to
    * @returns {number}
    */
    set_move_after_the_captures(from, to) {

        let save_type_move = -1;

        let save_from = -1;
        let save_to = -1;

        let s_m;
        let start = this.number_captures_move;


        if (this.from[start] == from) return -1;// ход и так на первом месте(после всех взятий)

        //console.log("Move_list_0x88_С-> UP -----------------------------------");
        // 1 ищем ход в списке
        for (s_m = start; s_m < this.number_move; s_m++) {// 
            if ((this.from[s_m] == from) && (this.to[s_m] == to)) {
                // ход нашли и записали
                save_type_move = this.type_move[s_m];
                save_from = this.from[s_m];
                save_to = this.to[s_m];
                break;
            }
        }
        // console.log("Move_list_0x88_С-> UP 2 start " + start);
        //console.log("Move_list_0x88_С-> UP 2 s_m " + s_m);

        // ход не нашли
        if (save_from == -1) return -1;

        // 2 сдвигаем позиции выше найденной вниз
        for (let i = s_m; i > start; i--) {
            // если на позиции есть взятая фигура
            // пишем на позицию
            this.type_move[i] = this.type_move[i - 1];
            this.from[i] = this.from[i - 1];
            this.to[i] = this.to[i - 1];

        }

        // сюда пишем начальную позицию. т.о. две позиции меняются местами
        this.type_move[start] = save_type_move;
        this.from[start] = save_from;
        this.to[start] = save_to;

        return 0;
    }//

    ///////////////////////////////////////////////////////////////////
    // TEST

    // сравнение двух списков ходов. 
    // если есть отличия то печатем в консоль предупреждение
    /**
    * @param {Move_list_0x88_С} move_list_0x88_O
    * @returns {void}
    */
    test_compare_list_from(move_list_0x88_O) {

        let number_move_equal = 0;
        let number_move_not_equal = 0;

        for (let i = 0; i < this.number_move; i++) {
            for (let j = 0; j < this.number_move; j++) {
                if (
                    (this.type_move[i] == move_list_0x88_O.type_move[j]) &&
                    (this.from[i] == move_list_0x88_O.from[j]) &&
                    (this.to[i] == move_list_0x88_O.to[j])
                ) {
                    number_move_equal = number_move_equal + 1;
                    // console.log('Move_list_0x88_С->i ' + i + " j " + j);
                    // console.log('Move_list_0x88_С->this.from[i] ' + this.from[i] +
                    //     " this.to[i] " + this.to[i]);

                } else {
                    number_move_not_equal = number_move_not_equal + 1;
                }
            }
        }


        if (this.piece_color != move_list_0x88_O.piece_color) {
            console.log('Move_list_0x88_С->this.piece_color ' + this.piece_color +
                " move_list_0x88_O.piece_color " + move_list_0x88_O.piece_color);
        }

        //console.log('Move_list_0x88_С-> test_compare_list_from');
        if (this.number_captures_move != move_list_0x88_O.number_captures_move) {
            console.log('Move_list_0x88_С->this.number_captures_move ' + this.number_captures_move +
                " move_list_0x88_O.number_captures_move " + move_list_0x88_O.number_captures_move);
        }

        if (this.number_move != move_list_0x88_O.number_move) {
            console.log('Move_list_0x88_С->this.number_move ' + this.number_move +
                " move_list_0x88_O.number_move " + move_list_0x88_O.number_move);
        }

        if (this.number_move != number_move_equal) {
            console.log('Move_list_0x88_С->this.number_move ' + this.number_move);
            console.log('Move_list_0x88_С->number_move_equal ' + number_move_equal);
            console.log('Move_list_0x88_С->number_move_not_equal ' + number_move_not_equal);
        }
    }

    // печатаем в консоль ход из списка под заданным номером
    /**
   * @param {number} i
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @returns {void}
   */
    test_print_i_move_list(i, chess_board_0x88_O) {
        console.log("test_print_i_move_list ********");
        console.log("type_move[" + i + "] = " + this.type_move[i] + " nm = " + Move_list_0x88_С.TYPE_MOVE_NAME[this.type_move[i]]);
        console.log("from[" + i + "] = " + this.from[i]);
        console.log("to[" + i + "] = " + this.to[i]);

        console.log(Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" +
            (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i])) + "-" +
            Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
            (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])));

        console.log("piece_color = " + this.piece_color);
        console.log("number_captures_move = " + this.number_captures_move);
        console.log("number_move = " + this.number_move);

        console.log("---- ");
        console.log("*********** test_print_i_move_list");
    }

    // печатаем в консоль весь список ходов
    /**
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @returns {void}
   */
    test_print_list(chess_board_0x88_O) {
        console.log("test_print_list ********");
        for (let i = 0; i < this.number_move; i++) {
            console.log("type_move[" + i + "] = " + this.type_move[i] + " nm = " + Move_list_0x88_С.TYPE_MOVE_NAME[this.type_move[i]]);
            console.log("from[" + i + "] = " + this.from[i]);
            console.log("to[" + i + "] = " + this.to[i]);

            console.log(Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" +
                (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i])) + "-" +
                Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
                (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])));

            console.log("---- ");
        }

        console.log("piece_color = " + this.piece_color);
        console.log("number_captures_move = " + this.number_captures_move);
        console.log("number_move = " + this.number_move);
        console.log("*********** test_print_list");
    }

    //////////////////////////////////////////////////

    // копируем в наш список список из параметров функции 
    // т.е. тот что задан в скобках тот и копируем
    /**
    * @param {Move_list_0x88_С} move_list_0x88_O
    * @returns {void}
    */
    save_list_from(move_list_0x88_O) {
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            this.type_move[i] = move_list_0x88_O.type_move[i];
            this.from[i] = move_list_0x88_O.from[i];
            this.to[i] = move_list_0x88_O.to[i];
        }

        this.piece_color = move_list_0x88_O.piece_color;
        this.number_captures_move = move_list_0x88_O.number_captures_move;
        this.number_move = move_list_0x88_O.number_move;

    }

    // если ход from, to 
    // нашли в списке ходов 
    // в случае превращений это первое попавшееся
    /**
    * @param {number} from
    * @param {number} to
    * @returns {boolean}
    */
    move_is_found(from, to) {

        let found = false;

        for (let i = 0; i < this.number_move; i++) {
            if ((this.from[i] == from) && (this.to[i] == to)) {
                found = true;
                return found;
            }
        }

        //console.log("Move_list_det_0x88_С-> from " + from + " to " + to);
        //console.log("Move_list_det_0x88_С-> ret " + ret);

        return found;
    }

    // находим и возвращаем порядковый номер хода 
    // по ходу from, to, promo
    // в том числе и в случае превращений 
    /**
    * @param {number} from
    * @param {number} to
    * @returns {number}
    */
    return_i_move(from, to, promo = "") {

        let i_move = -1;

        for (let i = 0; i < this.number_move; i++) {
            if ((this.from[i] == from) && (this.to[i] == to)) {
                if (promo == "") {
                    i_move = i;
                    return i_move;
                } else {

                    if (promo == this.return_promo_piece_from_type_move(this.type_move[i])) {
                        i_move = i;
                        return i_move;
                    }
                    continue;
                }
            }
        }

        //console.log("Move_list_det_0x88_С-> from " + from + " to " + to);
        //console.log("Move_list_det_0x88_С-> ret " + ret);

        return i_move;
    }

    // возвращем ход из списка на заданной позиции 
    // в виде строки вида Pe2-e4, Pe7-e8q 
    // move_to_string(i_move, chess_board_0x88_O) {

    //     let promo = this.return_promo_piece_from_type_move(this.type_move[i_move]);

    //     let move_str = "" + this.type_move_to_name_piese(this.type_move[i_move]) +
    //         Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i_move])] +
    //         (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i_move]));

    //     let l1 = (this.type_move[i_move] > 0) && (this.type_move[i_move] < 17);
    //     let l2 = (this.type_move[i_move] > 20) && (this.type_move[i_move] < 52);

    //     if (l1 || l2) {// это взятия
    //         move_str = move_str + "x";
    //     } else {
    //         move_str = move_str + "-";
    //     }

    //     move_str = move_str + Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i_move])] +
    //         (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i_move])) + promo + " ";

    //     return move_str;
    // }

    // возвращем ход из списка на заданной позиции 
    // в виде строки вида e2e4, e7e8q 
    /**
  * @param {number} i_move
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @returns {string}
  */
    move_to_string_uci(i_move, chess_board_0x88_O) {

        let promo = this.return_promo_piece_from_type_move(this.type_move[i_move]);

        let move_str = "" +
            Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i_move])] +
            (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i_move])) +
            Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i_move])] +
            (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i_move])) + promo;

        return move_str;
    }

    // это нужно для работы генератора взятий. это очень важная функция и конечно полностью проверена
    // возвращаем название хода превращения пешки со взятием по взятой фигуре 
    // т.е. пешка берет коня Chess_board_0x88_C.KNIGHT тогда будет множестов превращений со взятием коня, 
    // это 
    // PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN;
    // PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK;
    // PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP;
    // PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT;
    // 
    /**
    * @param {number} piece_name_captures
    * @returns {out}
    */
    return_type_captures_pawn_promo(piece_name_captures) {

        //console.log("Move_list_0x88_С->return_type_captures_pawn_promo piece_name_captures " + piece_name_captures);
        /**
          * 
          * @typedef {Object} out
          * @property {number} PROMO_QUEEN
          * @property {number} PROMO_ROOK
          * @property {number} PROMO_BISHOP
          * @property {number} PROMO_KNIGHT
          */
        let out = {
            PROMO_QUEEN: 0,
            PROMO_ROOK: 0,
            PROMO_BISHOP: 0,
            PROMO_KNIGHT: 0
        };

        if (piece_name_captures == Chess_board_0x88_C.QUEEN) {
            out.PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN;
            out.PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK;
            out.PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP;
            out.PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT;
        };

        if (piece_name_captures == Chess_board_0x88_C.ROOK) {
            out.PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN;
            out.PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK;
            out.PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP;
            out.PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT;
        };
        if (piece_name_captures == Chess_board_0x88_C.BISHOP) {
            out.PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN;
            out.PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK;
            out.PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP;
            out.PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT;
        };
        if (piece_name_captures == Chess_board_0x88_C.KNIGHT) {
            out.PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN;
            out.PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK;
            out.PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP;
            out.PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT;
        };

        //console.log("Move_list_0x88_С->return_type_captures_pawn_promo out.PROMO_QUEEN " + out.PROMO_QUEEN);
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
    return_type_simple_move(piece_name, piece_name_captures) {
        switch (piece_name) {
            case Chess_board_0x88_C.KING://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_KING;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_KING_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_KING_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_KING_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_KING_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_KING_PAWN;
                break;
            case Chess_board_0x88_C.QUEEN://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_QUEEN_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_QUEEN_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_QUEEN_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_QUEEN_PAWN;
                break;
            case Chess_board_0x88_C.ROOK://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_ROOK_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_ROOK_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_ROOK_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_ROOK_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_ROOK_PAWN;
                break;
            case Chess_board_0x88_C.BISHOP://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_BISHOP_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_BISHOP_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_BISHOP_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_BISHOP_PAWN;
                break;
            case Chess_board_0x88_C.KNIGHT://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_KNIGHT_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_KNIGHT_PAWN;
                break;
            case Chess_board_0x88_C.PAWN://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_PAWN;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_PAWN_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_PAWN_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_PAWN_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_PAWN_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_PAWN_PAWN;
                break;

            default://
            // console.log("default");
        }
        return -1;
    }

    // используем в генераторе взятий для детектора шахов. незаменимая, в данный момент, функция
    // возвращем имя взятой фигуры по типу хода
    // например CAPTURES_KING_QUEEN -> QUEEN  
    /**
    * @param {number} type_move
    * @returns {number}
    */       
    return_piece_name_captures_from_type_move(type_move) {

        //KING
        if (type_move == Move_list_0x88_С.MOVE_KING) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_PAWN) return Chess_board_0x88_C.PAWN;

        //QUEEN
        if (type_move == Move_list_0x88_С.MOVE_QUEEN) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_PAWN) return Chess_board_0x88_C.PAWN;

        //ROOK
        if (type_move == Move_list_0x88_С.MOVE_ROOK) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_PAWN) return Chess_board_0x88_C.PAWN;

        //BISHOP
        if (type_move == Move_list_0x88_С.MOVE_BISHOP) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_PAWN) return Chess_board_0x88_C.PAWN;

        //KNIGHT
        if (type_move == Move_list_0x88_С.MOVE_KNIGHT) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_PAWN) return Chess_board_0x88_C.PAWN;

        //PAWN
        if (type_move == Move_list_0x88_С.MOVE_PAWN) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_PAWN) return Chess_board_0x88_C.PAWN;
        return -1;        
    }


    // используем для строкового представления фигуры в ходах
    /**
    * @param {number} type_move
    * @returns {string}
    */      
    type_move_to_name_piese(type_move) {
        if (type_move == Move_list_0x88_С.MOVE_NO) return "NO";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT) return "P";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN) return "P";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK) return "P";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP) return "P";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN) return "N";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_ROOK) return "N";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_QUEEN) return "B";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_ROOK) return "B";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_QUEEN) return "R";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP) return "N";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT) return "N";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_BISHOP) return "B";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT) return "B";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_ROOK) return "R";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_QUEEN) return "Q";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_BISHOP) return "R";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_KNIGHT) return "R";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_ROOK) return "Q";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_BISHOP) return "Q";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT) return "Q";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_QUEEN) return "K";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_ROOK) return "K";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_BISHOP) return "K";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_KNIGHT) return "K";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_PAWN) return "P";
        if (type_move == Move_list_0x88_С.EP_CAPTURES) return "P";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_PAWN) return "N";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_PAWN) return "B";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_PAWN) return "R";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_PAWN) return "Q";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_PAWN) return "K";
        if (type_move == Move_list_0x88_С.MOVE_QUEEN) return "Q";
        if (type_move == Move_list_0x88_С.MOVE_ROOK) return "R";
        if (type_move == Move_list_0x88_С.MOVE_BISHOP) return "B";
        if (type_move == Move_list_0x88_С.MOVE_KNIGHT) return "N";
        if (type_move == Move_list_0x88_С.MOVE_KING) return "K";
        if (type_move == Move_list_0x88_С.MOVE_PAWN) return "P";
        if (type_move == Move_list_0x88_С.MOVE_DOUBLE_PAWN) return "P";
        if (type_move == Move_list_0x88_С.MOVE_KING_CASTLE) return "K";
        if (type_move == Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE) return "K";
        return "";
    }

    /**
    * @param {number} type_move
    * @returns {string}
    */   
    type_move_to_name_piese_f(type_move) {
        if (type_move == Move_list_0x88_С.MOVE_NO) return "NO";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT) return "PAWN";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN) return "PAWN";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK) return "PAWN";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP) return "PAWN";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN) return "KNIGHT";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_ROOK) return "KNIGHT";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_QUEEN) return "BISHOP";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_ROOK) return "BISHOP";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_QUEEN) return "ROOK";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP) return "KNIGHT";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT) return "KNIGHT";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_BISHOP) return "BISHOP";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT) return "BISHOP";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_ROOK) return "ROOK";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_QUEEN) return "QUEEN";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_BISHOP) return "ROOK";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_KNIGHT) return "ROOK";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_ROOK) return "QUEEN";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_BISHOP) return "QUEEN";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT) return "QUEEN";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_QUEEN) return "KING";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_ROOK) return "KING";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_BISHOP) return "KING";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_KNIGHT) return "KING";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_PAWN) return "PAWN";
        if (type_move == Move_list_0x88_С.EP_CAPTURES) return "PAWN";
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_PAWN) return "KNIGHT";
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_PAWN) return "BISHOP";
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_PAWN) return "ROOK";
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_PAWN) return "QUEEN";
        if (type_move == Move_list_0x88_С.CAPTURES_KING_PAWN) return "KING";
        if (type_move == Move_list_0x88_С.MOVE_QUEEN) return "QUEEN";
        if (type_move == Move_list_0x88_С.MOVE_ROOK) return "ROOK";
        if (type_move == Move_list_0x88_С.MOVE_BISHOP) return "BISHOP";
        if (type_move == Move_list_0x88_С.MOVE_KNIGHT) return "KNIGHT";
        if (type_move == Move_list_0x88_С.MOVE_KING) return "KING";
        if (type_move == Move_list_0x88_С.MOVE_PAWN) return "PAWN";
        if (type_move == Move_list_0x88_С.MOVE_DOUBLE_PAWN) return "PAWN";
        if (type_move == Move_list_0x88_С.MOVE_KING_CASTLE) return "KING";
        if (type_move == Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE) return "KING";
        return "";
    }

    // возвращаем фигуру в которую превращается пешка по типу хода
    /**
    * @param {number} type_move
    * @returns {string}
    */       
    return_promo_piece_from_type_move(type_move) {

        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN) return "q";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK) return "r";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP) return "b";
        if (type_move == Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT) return "n";

        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN) return "q";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK) return "r";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP) return "b";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT) return "n";

        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN) return "q";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK) return "r";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP) return "b";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT) return "n";

        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN) return "q";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK) return "r";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP) return "b";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT) return "n";

        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN) return "q";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK) return "r";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP) return "b";
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT) return "n";
        return "";
    }

}

export { Move_list_0x88_С };