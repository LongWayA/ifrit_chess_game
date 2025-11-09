/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name killer_heuristic_0x88.js
 * @version created 04.11m.2025 
 * last modified 04.11m.2025
*/

import { Move_list_0x88_С } from "./move_list_0x88.js";

/**
* НАЗНАЧЕНИЕ

*/

class killer_heuristic_0x88_O {

  static NAME = "killer_heuristic_0x88_O";

  static MAX_DEPTH = 100;

  killer_moves_from_1 = new Array(killer_heuristic_0x88_O.MAX_DEPTH).fill(-1);
  killer_moves_to_1 = new Array(killer_heuristic_0x88_O.MAX_DEPTH).fill(-1);
  killer_moves_from_2 = new Array(killer_heuristic_0x88_O.MAX_DEPTH).fill(-1);
  killer_moves_to_2 = new Array(killer_heuristic_0x88_O.MAX_DEPTH).fill(-1);

  depth_max = 0;

  constructor() {

  }

  iniM() {

  }

  clear_list() {
    for (let i = 0; i < killer_heuristic_0x88_O.MAX_DEPTH; i++) {
      this.killer_moves_from_1[i] = -1;
      this.killer_moves_to_1[i] = -1;
      this.killer_moves_from_2[i] = -1;
      this.killer_moves_to_2[i] = -1;
    }
    this.depth_max = 0;
  }

  // 
  add_move(type_move, from, to, depth) {

    if (type_move > Move_list_0x88_С.CAPTURES_KING_PAWN) {// ход не взятие
      //console.log('killer_heuristic_0x88_O->add_move depth ' + depth +" type_move " + type_move);
      if (this.killer_moves_from_1[depth] != from) {
        this.killer_moves_from_2[depth] = this.killer_moves_from_1[depth];
         this.killer_moves_to_2[depth] = this.killer_moves_to_1[depth];       
        this.killer_moves_from_1[depth] = from;
        this.killer_moves_to_1[depth] = to;
      }
      if (depth > this.depth_max) this.depth_max = depth;
    }
  }
}

export{killer_heuristic_0x88_O};