/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name killer_heuristic_0x88.js
 * @version created 04.11m.2025 
 * last modified 04.11m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Killer_heuristic_0x88_C {

  static NAME = "Killer_heuristic_0x88_C";

  static MAX_DEPTH = 100;

  killer_moves_1 = new Array(Killer_heuristic_0x88_C.MAX_DEPTH).fill(-1);
  killer_moves_2 = new Array(Killer_heuristic_0x88_C.MAX_DEPTH).fill(-1);

  depth_max = 0;

  constructor() {

  }

  iniM() {

  }

  clear_list() {
    for (let i = 0; i < Killer_heuristic_0x88_C.MAX_DEPTH; i++) {
      this.killer_moves_1[i] = -1;
      this.killer_moves_2[i] = -1;
    }
    this.depth_max = 0;
  }

  // 
  add_move(type_move, depth) {

    if (type_move > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
      //console.log('Killer_heuristic_0x88_C->add_move depth ' + depth +" type_move " + type_move);
      if (this.killer_moves_1[depth] != type_move) {
        this.killer_moves_2[depth] = this.killer_moves_1[depth];
        this.killer_moves_1[depth] = type_move;
      }
      if (depth > this.depth_max) this.depth_max = depth;
    }
  }
}

