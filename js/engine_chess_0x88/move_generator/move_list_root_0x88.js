/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_root_0x88.js
 * @version created 22.10m.2025 
 * last modified 17.11m.2025
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";

/**
* НАЗНАЧЕНИЕ

*/

class Move_list_root_0x88_С {

    static NAME = "Move_list_root_0x88_С";

    static LENGTH_LIST = 256;//

    score_move = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);

    number_move = 0;

    constructor() {

    }

    iniM() {
        this.number_move = 0;
    }



    // SORTING

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

    // 
    add_move(score_move) {
        //console.log('Move_list_0x88_С->add_move');
        this.score_move[this.number_move] = score_move;
        this.number_move = this.number_move + 1;
    }

    clear_list() {
        for (let i = 0; i < Move_list_0x88_С.LENGTH_LIST; i++) {
            this.score_move[i] = -1;
        }
        this.number_captures_move = 0;
        this.number_move = 0;
    }
}

export{Move_list_root_0x88_С};