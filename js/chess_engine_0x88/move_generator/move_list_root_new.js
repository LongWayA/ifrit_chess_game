// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_root_0x88.js
 * @version created 31.01m.2026 
*/


/**
* НАЗНАЧЕНИЕ
 Содержит оценку каждого хода. 
 Нужно для сортирвки по оценке в корне поиска.
*/
//+
// тут все прозрачно. идей пока нет



    const LENGTH_LIST_R = 256;//
    const IND_NUMBER_MOVE_R = 255; //

    /** SORTING W
     * @param {Int32Array} list_score_move
     * @returns {void}
     */
    const sorting_list_top_max_score = function (list_score_move) {

        let save_score_move;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка ходы с максимальной оценкой. нужно белым
        for (let i = 0; i < list_score_move[IND_NUMBER_MOVE_R]; i++) {
            for (let j = i + 1; j < list_score_move[IND_NUMBER_MOVE_R]; j++) {// перебираем оставшийся список
                // если на позиции есть взятая фигура
                if (list_score_move[i] < list_score_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_score_move = list_score_move[i];

                    // пишем на позицию
                    list_score_move[i] = list_score_move[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    list_score_move[j] = save_score_move;
                }
            }
        }
    }

    /** SORTING B
     * @param {Int32Array} list_score_move
     * @returns {void}
     */
    const sorting_list_top_min_score = function (list_score_move) {

        let save_score_move;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка ходы с максимальной оценкой. нужно белым
        for (let i = 0; i < list_score_move[IND_NUMBER_MOVE_R]; i++) {
            for (let j = i + 1; j < list_score_move[IND_NUMBER_MOVE_R]; j++) {// перебираем оставшийся список
                // если на позиции есть взятая фигура
                if (list_score_move[i] > list_score_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_score_move = list_score_move[i];

                    // пишем на позицию
                    list_score_move[i] = list_score_move[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    list_score_move[j] = save_score_move;
                }
            }
        }
    }

  /**
   * @param {number} move_i
   * @param {Int32Array} list_score_move
   * @param {number} score_move
   * @returns {void}
   */
    const add_score_r = function (move_i, list_score_move, score_move) {
        //console.log('Move_list_0x88_С->add_move');
        list_score_move[move_i] = score_move;

        if(move_i > list_score_move[IND_NUMBER_MOVE_R]) list_score_move[IND_NUMBER_MOVE_R] = move_i;
    }

     /**
     * @param {Int32Array} list_score_move
     * @returns {void}
     */   
    const clear_list_r = function (list_score_move) {
        for (let i = 0; i < LENGTH_LIST_R; i++) {
            list_score_move[i] = 0;
        }
    }

export {sorting_list_top_max_score, sorting_list_top_min_score, add_score_r,  clear_list_r, 
    LENGTH_LIST_R, IND_NUMBER_MOVE_R  
};