/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_0x88.js
 * @version created 22.10m.2025 
 * last modified 22.10m.2025
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";

/**
* НАЗНАЧЕНИЕ

*/

class Move_list_0x88_С {

    static NAME = "Move_list_0x88_С";

    static MOVE_NO = 0;// нет хода

    // абсолютный приоритет. пешка берет да еще превращается в фигуру
    // превращение в ферзь
    static CAPTURES_PAWN_QUEEN_PROMO_QUEEN = 1;//
    static CAPTURES_PAWN_ROOK_PROMO_QUEEN = 2;//
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
    static CAPTURES_PAWN_QUEEN = 21;//
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

    static LENGTH_LIST = 256;//

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

    type_move = new Array(Move_list_0x88_С.LENGTH_LIST).fill(Move_list_0x88_С.MOVE_NO);
    piece_color = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);
    from = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);
    to = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);
    score_move = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);

    number_captures_move = 0;
    number_move = 0;

    constructor() {

    }

    iniM() {
        this.number_captures_move = 0;
        this.number_move = 0;
    }



    // SORTING

    // ставим ход на первую позицию. это для хеш-ходов
    set_move_in_0(type_move, from, to) {

        let save_type_move;
        let save_piece_color;
        let save_score_move;

        let save_from = -1;
        let save_to;

        let s_m;


        if (this.from[0] == from) return -1;

        //console.log("Move_list_0x88_С-> UP -----------------------------------");
        // 1 ищем ход в списке
        for (s_m = 0; s_m < this.number_move; s_m++) {// перебираем оставшийся список
            if ((this.type_move[s_m] == type_move) && (this.from[s_m] == from) && (this.to[s_m] == to)) {
                // ход нашли и записали
                save_type_move = this.type_move[s_m];
                save_piece_color = this.piece_color[s_m];
                save_score_move = this.score_move[s_m];
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
        for (let i = s_m; i > 0; i--) {
            // если на позиции есть взятая фигура
            // пишем на позицию
            this.type_move[i] = this.type_move[i - 1];
            this.piece_color[i] = this.piece_color[i - 1];
            this.score_move[i] = this.score_move[i - 1];
            this.from[i] = this.from[i - 1];
            this.to[i] = this.to[i - 1];

        }

        // сюда пишем начальную позицию. т.о. две позиции меняются местами
        this.type_move[start] = save_type_move;
        this.piece_color[start] = save_piece_color;
        this.score_move[start] = save_score_move;
        this.from[start] = save_from;
        this.to[start] = save_to;

    }//



    sorting_list_history_heuristic(history_heuristic_0x88_O) {

        let save_type_move;
        let save_piece_color;
        let save_score_move;

        let save_from;
        let save_to;

        let start = this.number_captures_move;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка ходы с максимальной оценкой. нужно белым
        for (let i = start; i < this.number_move; i++) {
            for (let j = i + 1; j < this.number_move; j++) {// перебираем оставшийся список
                // 

                if (history_heuristic_0x88_O.history[this.piece_color[i]][this.type_move[i]][this.to[i]] <
                    history_heuristic_0x88_O.history[this.piece_color[j]][this.type_move[j]][this.to[j]]) {
                    // сохраняем позицию на которую будем писать
                    save_type_move = this.type_move[i];
                    save_piece_color = this.piece_color[i];
                    save_score_move = this.score_move[i];
                    save_from = this.from[i];
                    save_to = this.to[i];

                    // пишем на позицию
                    this.type_move[i] = this.type_move[j];
                    this.piece_color[i] = this.piece_color[j];
                    this.score_move[i] = this.score_move[j];
                    //this.score_move[i] = history_heuristic_0x88_O.history[this.piece_color[j]][this.type_move[j]][this.to[j]];
                    this.from[i] = this.from[j];
                    this.to[i] = this.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.type_move[j] = save_type_move;
                    this.piece_color[j] = save_piece_color;
                    this.score_move[j] = save_score_move;
                    this.from[j] = save_from;
                    this.to[j] = save_to;
                }
            }
        }
    }

    sorting_list() {

        let save_type_move;
        let save_piece_color;
        let save_score_move;

        let save_from;
        let save_to;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка отсортированные взятия. так что самая слабая берущая фигура в самом начале
        for (let i = 0; i < this.number_move; i++) {
            for (let j = i + 1; j < this.number_move; j++) {// перебираем оставшийся список
                // если на позиции есть взятая фигура
                if (this.type_move[i] >= this.type_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_type_move = this.type_move[i];
                    save_piece_color = this.piece_color[i];
                    save_score_move = this.score_move[i];
                    save_from = this.from[i];
                    save_to = this.to[i];

                    // пишем на позицию
                    this.type_move[i] = this.type_move[j];
                    this.piece_color[i] = this.piece_color[j];
                    this.score_move[i] = this.score_move[j];
                    this.from[i] = this.from[j];
                    this.to[i] = this.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.type_move[j] = save_type_move;
                    this.piece_color[j] = save_piece_color;
                    this.score_move[j] = save_score_move;
                    this.from[j] = save_from;
                    this.to[j] = save_to;
                }
            }
        }
    }

    // ставим сразу после взятий. это для киллеров
    set_move_after_the_captures(from, to) {

        let save_type_move;
        let save_piece_color;
        let save_score_move;

        let save_from = -1;
        let save_to;

        let s_m;
        let start = this.number_captures_move;


        if (this.from[start] == from) return -1;

        //console.log("Move_list_0x88_С-> UP -----------------------------------");
        // 1 ищем ход в списке
        for (s_m = start; s_m < this.number_move; s_m++) {// перебираем оставшийся список
            if ((this.from[s_m] == from) && (this.to[s_m] == to)) {
                // ход нашли и записали
                save_type_move = this.type_move[s_m];
                save_piece_color = this.piece_color[s_m];
                save_score_move = this.score_move[s_m];
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
            this.piece_color[i] = this.piece_color[i - 1];
            this.score_move[i] = this.score_move[i - 1];
            this.from[i] = this.from[i - 1];
            this.to[i] = this.to[i - 1];

        }

        // сюда пишем начальную позицию. т.о. две позиции меняются местами
        this.type_move[start] = save_type_move;
        this.piece_color[start] = save_piece_color;
        this.score_move[start] = save_score_move;
        this.from[start] = save_from;
        this.to[start] = save_to;

    }//

    sorting_list_top_max_score() {

        let save_type_move;
        let save_piece_color;
        let save_score_move;

        let save_from;
        let save_to;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка ходы с максимальной оценкой. нужно белым
        for (let i = 0; i < this.number_move; i++) {
            for (let j = i + 1; j < this.number_move; j++) {// перебираем оставшийся список
                // если на позиции есть взятая фигура
                if (this.score_move[i] < this.score_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_type_move = this.type_move[i];
                    save_piece_color = this.piece_color[i];
                    save_score_move = this.score_move[i];
                    save_from = this.from[i];
                    save_to = this.to[i];

                    // пишем на позицию
                    this.type_move[i] = this.type_move[j];
                    this.piece_color[i] = this.piece_color[j];
                    this.score_move[i] = this.score_move[j];
                    this.from[i] = this.from[j];
                    this.to[i] = this.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.type_move[j] = save_type_move;
                    this.piece_color[j] = save_piece_color;
                    this.score_move[j] = save_score_move;
                    this.from[j] = save_from;
                    this.to[j] = save_to;
                }
            }
        }
    }

    sorting_list_top_min_score() {

        let save_type_move;
        let save_piece_color;
        let save_score_move;

        let save_from;
        let save_to;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка ходы с максимальной оценкой. нужно белым
        for (let i = 0; i < this.number_move; i++) {
            for (let j = i + 1; j < this.number_move; j++) {// перебираем оставшийся список
                // если на позиции есть взятая фигура
                if (this.score_move[i] > this.score_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_type_move = this.type_move[i];
                    save_piece_color = this.piece_color[i];
                    save_score_move = this.score_move[i];
                    save_from = this.from[i];
                    save_to = this.to[i];

                    // пишем на позицию
                    this.type_move[i] = this.type_move[j];
                    this.piece_color[i] = this.piece_color[j];
                    this.score_move[i] = this.score_move[j];
                    this.from[i] = this.from[j];
                    this.to[i] = this.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.type_move[j] = save_type_move;
                    this.piece_color[j] = save_piece_color;
                    this.score_move[j] = save_score_move;
                    this.from[j] = save_from;
                    this.to[j] = save_to;
                }
            }
        }

    }

///////////////////////////////////////////////////////////////////
    // TEST

    test_compare_list_from(move_list_0x88_O) {

        let number_move_equal = 0;
        let number_move_not_equal = 0;

        for (let i = 0; i < this.number_move; i++) {
            for (let j = 0; j < this.number_move; j++) {
                if (
                    (this.type_move[i] == move_list_0x88_O.type_move[j]) &&
                    (this.piece_color[i] == move_list_0x88_O.piece_color[j]) &&
                    (this.score_move[i] == move_list_0x88_O.score_move[j]) &&
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
        this.number_captures_move = move_list_0x88_O.number_captures_move;
        this.number_move = move_list_0x88_O.number_move;

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

    test_print_i_move_list(i, chess_board_0x88_O) {
        console.log("test_print_i_move_list ********");
        console.log("type_move[" + i + "] = " + this.type_move[i] + " nm = " + Move_list_0x88_С.TYPE_MOVE_NAME[this.type_move[i]]);
        console.log("piece_color[" + i + "] = " + this.piece_color[i]);
        console.log("score_move[" + i + "] = " + this.score_move[i]);

        console.log("from[" + i + "] = " + this.from[i]);
        console.log("to[" + i + "] = " + this.to[i]);

        console.log(Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" +
            (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i])) + "-" +
            Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
            (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])));

        console.log("---- ");
        console.log("*********** test_print_i_move_list");
    }


    test_print_list(chess_board_0x88_O) {
        console.log("test_print_list ********");
        for (let i = 0; i < this.number_move; i++) {
            console.log("type_move[" + i + "] = " + this.type_move[i] + " nm = " + Move_list_0x88_С.TYPE_MOVE_NAME[this.type_move[i]]);
            console.log("piece_color[" + i + "] = " + this.piece_color[i]);
            console.log("score_move[" + i + "] = " + this.score_move[i]);

            console.log("from[" + i + "] = " + this.from[i]);
            console.log("to[" + i + "] = " + this.to[i]);

            console.log(Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" +
                (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i])) + "-" +
                Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
                (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])));

            console.log("---- ");
        }
        console.log("number_captures_move = " + this.number_captures_move);
        console.log("number_move = " + this.number_move);
        console.log("*********** test_print_list");
    }

//////////////////////////////////////////////////

    save_list_from(move_list_0x88_O) {
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            this.type_move[i] = move_list_0x88_O.type_move[i];
            this.piece_color[i] = move_list_0x88_O.piece_color[i];
            this.score_move[i] = move_list_0x88_O.score_move[i];
            this.from[i] = move_list_0x88_O.from[i];
            this.to[i] = move_list_0x88_O.to[i];
        }
        this.number_captures_move = move_list_0x88_O.number_captures_move;
        this.number_move = move_list_0x88_O.number_move;

    }
    // 
    add_move(type_move, piece_color, score_move, from, to) {
        //console.log('Move_list_0x88_С->add_move');
        this.type_move[this.number_move] = type_move;
        this.piece_color[this.number_move] = piece_color;
        this.from[this.number_move] = from;
        this.to[this.number_move] = to;
        this.score_move[this.number_move] = score_move;

        this.number_move = this.number_move + 1;
    }


    clear_list() {
        for (let i = 0; i < Move_list_0x88_С.LENGTH_LIST; i++) {
            this.type_move[i] = -1;
            this.piece_color[i] = -1;
            this.score_move[i] = -1;
            this.from[i] = -1;
            this.to[i] = -1;
        }
        this.number_captures_move = 0;
        this.number_move = 0;
    }

    move_is_legal(from, to) {

        let ret = false;

        for (let i = 0; i < this.number_move; i++) {
            if ((this.from[i] == from) && (this.to[i] == to)) {
                ret = true;
                return ret;
            }
        }

        //console.log("Move_list_det_0x88_С-> from " + from + " to " + to);
        //console.log("Move_list_det_0x88_С-> ret " + ret);

        return ret;
    }


    return_i_move(from, to) {

        let i_move = -1;

        for (let i = 0; i < this.number_move; i++) {
            if ((this.from[i] == from) && (this.to[i] == to)) {
                i_move = i;
                return i_move;
            }
        }

        //console.log("Move_list_det_0x88_С-> from " + from + " to " + to);
        //console.log("Move_list_det_0x88_С-> ret " + ret);

        return i_move;
    }

    move_to_string(i_move, chess_board_0x88_O) {

        let move_str = "" + this.type_move_to_name_piese(this.type_move[i_move]) + "" +
            //pv_line_str = pv_line_str + this.type_move[i] + "" +       
            Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i_move])] + "" +
            (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i_move])) + "-" +
            Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i_move])] + "" +
            (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i_move])) + " ";

        return move_str;
    }




    // возвращаем название хода превращения пешки со взятием по взятой фигуре
    // например CAPTURES_PAWN_QUEEN_PROMO_QUEEN -> QUEEN; CAPTURES_PAWN_ROOK_PROMO_QUEEN -> QUEEN
    return_type_captures_pawn_promo(piece_name_captures) {

        //console.log("Move_list_0x88_С->return_type_captures_pawn_promo piece_name_captures " + piece_name_captures);
        let out = {
            PROMO_QUEEN: null,
            PROMO_ROOK: null,
            PROMO_BISHOP: null,
            PROMO_KNIGHT: null
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

    // возвращем тип хода взятия по ходящей фигуре и по взятой фигуре
    // например KING, QUEEN -> CAPTURES_KING_QUEEN
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

    }

    // возвращем имя взятой фигуры по типу хода
    // например CAPTURES_KING_QUEEN -> QUEEN   
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
    }

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
    }

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
    }
}

export{Move_list_0x88_С};