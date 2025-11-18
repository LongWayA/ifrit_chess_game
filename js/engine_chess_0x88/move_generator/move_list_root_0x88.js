/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_root_0x88.js
 * @version created 22.10m.2025 
 * last modified 17.11m.2025
*/


/**
* НАЗНАЧЕНИЕ

*/

class Move_list_root_0x88_С {

    static NAME = "Move_list_root_0x88_С";

    static LENGTH_LIST = 256;//

    score_move = new Array(Move_list_root_0x88_С.LENGTH_LIST).fill(-1);

    number_move = 0;

    constructor() {

    }

    iniM() {
        this.number_move = 0;
    }



    // SORTING

    sorting_list_top_max_score(move_list_0x88_O) {

        let save_type_move;
        let save_score_move;

        let save_from;
        let save_to;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка ходы с максимальной оценкой. нужно белым
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            for (let j = i + 1; j < move_list_0x88_O.number_move; j++) {// перебираем оставшийся список
                // если на позиции есть взятая фигура
                if (this.score_move[i] < this.score_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_score_move = this.score_move[i];

                    save_type_move = move_list_0x88_O.type_move[i];
                    save_from = move_list_0x88_O.from[i];
                    save_to = move_list_0x88_O.to[i];

                    // пишем на позицию
                    this.score_move[i] = this.score_move[j];

                    move_list_0x88_O.type_move[i] = move_list_0x88_O.type_move[j];
                    move_list_0x88_O.from[i] = move_list_0x88_O.from[j];
                    move_list_0x88_O.to[i] = move_list_0x88_O.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.score_move[j] = save_score_move;

                    move_list_0x88_O.type_move[j] = save_type_move;
                    move_list_0x88_O.from[j] = save_from;
                    move_list_0x88_O.to[j] = save_to;
                }
            }
        }
    }

    sorting_list_top_min_score(move_list_0x88_O) {
        let save_type_move;
        let save_score_move;

        let save_from;
        let save_to;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка ходы с максимальной оценкой. нужно белым
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            for (let j = i + 1; j < move_list_0x88_O.number_move; j++) {// перебираем оставшийся список
                // если на позиции есть взятая фигура
                if (this.score_move[i] > this.score_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_score_move = this.score_move[i];

                    save_type_move = move_list_0x88_O.type_move[i];
                    save_from = move_list_0x88_O.from[i];
                    save_to = move_list_0x88_O.to[i];

                    // пишем на позицию
                    this.score_move[i] = this.score_move[j];

                    move_list_0x88_O.type_move[i] = move_list_0x88_O.type_move[j];
                    move_list_0x88_O.from[i] = move_list_0x88_O.from[j];
                    move_list_0x88_O.to[i] = move_list_0x88_O.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.score_move[j] = save_score_move;

                    move_list_0x88_O.type_move[j] = save_type_move;
                    move_list_0x88_O.from[j] = save_from;
                    move_list_0x88_O.to[j] = save_to;
                }
            }
        }
    }

    // 
    add_score(score_move) {
        //console.log('Move_list_0x88_С->add_move');
        this.score_move[this.number_move] = score_move;
        this.number_move = this.number_move + 1;
    }

    clear_list() {
        for (let i = 0; i < Move_list_root_0x88_С.LENGTH_LIST; i++) {
            this.score_move[i] = -1;
        }
        this.number_captures_move = 0;
        this.number_move = 0;
    }
}

export { Move_list_root_0x88_С };