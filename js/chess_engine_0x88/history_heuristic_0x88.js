/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name history_heuristic_0x88.js
 * @version created 05.11m.2025 
 * last modified 05.11m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class History_heuristic_0x88_C {

  static NAME = "History_heuristic_0x88_C";

  // тут все на 1 больше последней позиции потому что есть 0
  static MAX_COLOR = 2;
  static MAX_TYPE_MOVE = 61;
  static MAX_COORDINATE = 64;
  static MAX_HISTORY = 100000;

  history = new Array(History_heuristic_0x88_C.MAX_COLOR);  // [фигура][поле куда фигура ходит]

  constructor() {

  }

  iniM() {
    for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
      this.history[color] = new Array(History_heuristic_0x88_C.MAX_TYPE_MOVE);
      for (let type_move = 1; type_move < History_heuristic_0x88_C.MAX_TYPE_MOVE; type_move++) {
        this.history[color][type_move] = new Array(History_heuristic_0x88_C.MAX_COORDINATE);
      }
    }
  }

  clear_history() {
    for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
      for (let type_move = 1; type_move < History_heuristic_0x88_C.MAX_TYPE_MOVE; type_move++) {
        for (let sq = 1; sq < History_heuristic_0x88_C.MAX_COORDINATE; sq++) {
          this.history[color][type_move][sq] = -1;
        }
      }
    }
  }

  history_good_save(color, type_move, to, depth, depth_max) {

    let delta_depth = depth_max - depth;

    this.history[color][type_move][to] = this.history[color][type_move][to] + delta_depth * delta_depth;

    if (this.history[color][type_move][to] > History_heuristic_0x88_C.MAX_HISTORY) {
      for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
        for (let type_move = 1; type_move < History_heuristic_0x88_C.MAX_TYPE_MOVE; type_move++) {
          for (let sq = 1; sq < History_heuristic_0x88_C.MAX_COORDINATE; sq++) {
            this.history[color][type_move][sq] = this.history[color][type_move][sq]/2;
          }
        }
      }
    }
  }

  history_bad_save(color, type_move, to, depth, depth_max) {

    let delta_depth = depth_max - depth;

    this.history[color][type_move][to] = this.history[color][type_move][to] - delta_depth * delta_depth;

    if (this.history[color][type_move][to] < -1 * History_heuristic_0x88_C.MAX_HISTORY) {
      for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
        for (let type_move = 1; type_move < History_heuristic_0x88_C.MAX_TYPE_MOVE; type_move++) {
          for (let sq = 1; sq < History_heuristic_0x88_C.MAX_COORDINATE; sq++) {
            this.history[color][type_move][sq] = this.history[color][type_move][sq]/2;
          }
        }
      }
    }
  }

}

