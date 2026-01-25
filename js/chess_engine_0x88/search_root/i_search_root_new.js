// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_search_root_0x88.js
 * @version created 24.01m.2026 
*/

import { Chess_board_0x88_C } from "../move_generator/chess_board_0x88.js";


import { test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88,
test_compare_chess_board_0x88, save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, 
searching_king, iniStartPositionForWhite, IND_MAX, SIDE_TO_MOVE, WHITE  } from "../move_generator/chess_board_new.js";

//import { Move_list_0x88_С } from "../move_generator/move_list_new.js";
import { Move_list_0x88_С } from "../move_generator/move_list_0x88.js";

import { PV_line_0x88_C } from "../move_generator/pv_line_new.js";

import { searching_minmax, chess_board_0x88_end_original, node_mm} from "./search_minmax_new.js";

import { Timer_C } from "../../browser/timer.js";

/**
* НАЗНАЧЕНИЕ
* Есть два режима поиска: 
* searching_iterative_deepening(fen_start, depth_max) - основной поиск
* start_search_minmax(fen_start, depth_max) - тестирование перебора
*
* Поиск начинается с присланой в виде fen позиции fen_start
* и максимальной глубины перебора depth_max
* Из fen мы заполняем chess_board_0x88_O_start.
*
* Во время поиска идет циклическое погружение и на каждой просчитанной глубине
* возвращается заполненный объект uci_return_search
* Конечно есть финальная позиция fen_end
* Так что поиск начинается со стартового fen и заканчивается
* финальным.
* Конечно же выводим строку с информацией info : "info depth 1 score cp 17 nodes 20 nps 20000 pv e2e4 "
* тут и глубина перебора  и оценка и колличество узлов и скорость перебора и лучший вариант 
*
* Выводим так же лучший ход best_move
*
* Думаю этот интерфейс останется надолго. Добавление эвристик и даже замена генератора
* на него влиять не должны.
*/
 
/**
    * 
    * @typedef {Object} uci_return_search
    * @property {string} fen_start - начальная позиция в виде fen передаваемая на вход движка
    * @property {string} fen_end - конечная позиция в виде fen возникшая после хода движка
    * @property {string} info - info depth 1 score cp 17 nodes 20 nps 20000 pv e2e4 
    * @property {string} best_move - bestmove e2e4 ponder e7e6
    */


  const timer_O = new Timer_C();

  const uci_return_search = {
    fen_start: "-",// начальная позиция в виде fen передаваемая на вход движка
    fen_end: "-",// конечная позиция в виде fen возникшая после хода движка
    info: "-",// info depth 1 seldepth 2 multipv 1 score cp 17 nodes 20 nps 20000 hashfull 0 tbhits 0 time 1 pv e2e4        
    best_move: "-",// bestmove e2e4 ponder e7e6
  };


  /** minmax
   * @param {string} fen_start
   * @param {number} depth_max
   * @returns {uci_return_search}
   */
  const start_search_minmax = function(fen_start, depth_max) {
    let depth = 0;

    let chess_board_0x88_test = new Chess_board_0x88_C();

    let chess_board_0x88_O = new Uint8Array(IND_MAX).fill(0);// доска 0x88 с фигурами;
    let chess_board_0x88_O_start = new Uint8Array(IND_MAX).fill(0);// доска 0x88 с фигурами
    let chess_board_0x88_O_end = new Uint8Array(IND_MAX).fill(0);// доска 0x88 с фигурами
    let chess_board_0x88_O_save_test = new Uint8Array(IND_MAX).fill(0);// доска 0x88 с фигурами

    let move_list_0x88_O_for_pv_line = new Move_list_0x88_С();

    let pv_line_0x88_O = new PV_line_0x88_C();

    let time_start = 0;
    let time_end = 0;
    let time_delta = 0;

    time_start = timer_O.getCurrentTimeMs();

    let num = new Int32Array(2).fill(0);

    num[1] = 255;

    console.log("start_search_minmax->num " + num[1].toString(2));

    console.log("start_search_minmax->fen_start " + fen_start);

    set_board_from_fen_0x88(fen_start, chess_board_0x88_O_start);

    save_chess_board_0x88(chess_board_0x88_O, chess_board_0x88_O_start);
    save_chess_board_0x88( chess_board_0x88_O_save_test, chess_board_0x88_O);

    console.log("start_search_minmax ");

    //
    let node = 0;

    let best_score = searching_minmax(pv_line_0x88_O, chess_board_0x88_O, depth, depth_max);

    node = node + node_mm;

    //console.log("=========================================================================");
    //console.log("Search_0x88_C->start_search 22222 =============================================");

    //chess_board_0x88_O_save_test.test_compare_chess_board_0x88(chess_board_0x88_O);
    save_chess_board_0x88(chess_board_0x88_O_end, chess_board_0x88_end_original);

    time_end = timer_O.getCurrentTimeMs();
    time_delta = (time_end - time_start) / 1000;

    let w = (chess_board_0x88_O_start[SIDE_TO_MOVE] == WHITE) ? 1 : -1;

    uci_return_search.fen_start = fen_start;
    //uci_return_search.fen_end = set_fen_from_0x88(chess_board_0x88_O_end);
    uci_return_search.fen_end = fen_start;

    let depth_uci = String(depth_max);
    let score_cp = String(w * best_score);
    let nodes = String(node);
    let nps = String(Math.round(node / time_delta));
    let pv = pv_line_0x88_O.pv_line_to_uci_string(chess_board_0x88_test, move_list_0x88_O_for_pv_line);

    //info depth 3 seldepth 4 multipv 1 score cp 42 nodes 72 nps 36000 hashfull 0 tbhits 0 time 2 pv e2e4
    //info depth 3 score cp 42 nodes 72 nps 36000 pv e2e4        
    uci_return_search.info = "info depth " + depth_uci + " score cp " + score_cp +
      " nodes " + nodes + " nps " + nps + " pv " + pv;

    uci_return_search.best_move = "bestmove no";


    //console.log("Search_0x88_C->start_print_pv_line ***************************************");
    //this.info_return_search.pv_line.test_print_pv_line(chess_board_0x88_O);
    //pv_line_0x88_O.test_print_pv_line(chess_board_0x88_O);

    console.log("start_search_minmax node " + node);

    return uci_return_search;
  }

export { start_search_minmax };