/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_chess_engine_0x88.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

import { Search_root_0x88_C } from "./search_root/i_search_root_0x88.js";
import { Uci_C } from "../uci/uci.js";


/**
* НАЗНАЧЕНИЕ
что должен уметь делать движок?
принимать фен нотацию позиции
принимать команды на старт обсчета позиции и остановку
выдавать вариант приведший к лучшему ходу с оценкой каждого хода варианта
         выдавать лучший ход
         выдавать оценку лучшего хода
выдавать количество рассмотренных позиций
выдавать фен позиции
*/

class ChessEngine_0x88_С {

  static NAME = "ChessEngine_0x88";

  worker_chessEngine_0x88_O = null;

  search_root_0x88_O = new Search_root_0x88_C();
  uci_O = new Uci_C();

  //---------

  score = 0;
  i_move = 0;

  constructor() {

  }

  iniM(worker_chessEngine_0x88_O) {

    this.worker_chessEngine_0x88_O = worker_chessEngine_0x88_O;

    this.search_root_0x88_O.iniM(this);
    this.uci_O.iniM();
  }

  set_stop_search_in_1() {
    this.search_root_0x88_O.set_stop_search_in_1();
  }

  info_from_depth_uci(info_return_search){
     let str = "info depth "+ info_return_search.depth_max_search_str + " score cp " + info_return_search.best_score_uci_str + 
     " nodes " + info_return_search.node_count_str + " nps " + info_return_search.nodes_per_second_str + 
     " pv " + info_return_search.pv_line_uci_str;
     console.log(str);
  }

  info_currmove_uci(move,  move_i, depth_max_current){
     let str = "info currmove "+  move + " currmovenumber " + move_i + " depth "+ depth_max_current;
     console.log(str);
  }

  // сообщение поиска движку
  message_search_root_to_engine(info_return_search) {
    let message = info_return_search.pv_line_str;
     
    this.worker_chessEngine_0x88_O.message_chessEngine_0x88_to_worker_chessEngine_0x88_O(message);
  }

  // запуск полного перебора minmax
  // тут можно проверить корректность игрового движка с помощью perf_t. как правильно он генерирует позиции.
  go_depth_minmax(fen_start, depth_max) {
    //console.log("ChessEngine_0x88_С->test_go_depth_nm --------");
    let info_return_search = this.search_root_0x88_O.start_search_minmax(fen_start, depth_max);

    return info_return_search;
  }

  // iterative deepening
  go_depth_id(fen_start, depth_max) {
    //console.log("ChessEngine_0x88_С->go_depth_id depth_max " + depth_max);
    let info_return_search = this.search_root_0x88_O.searching_iterative_deepening(fen_start, depth_max);

    return info_return_search;
  }
}

export { ChessEngine_0x88_С };