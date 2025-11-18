/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_notation.js
 * @version created 17.11m.2025 
 * last modified 17.11m.2025
*/

import { Chess_board_0x88_C } from "./move_generator/chess_board_0x88.js";
import { Move_list_0x88_С } from "./move_generator/move_list_0x88.js";
import { PV_line_0x88_C } from "./pv_line_0x88.js";

import { Move_gen_1_captures_0x88_С } from "./move_generator/move_gen_1_captures_0x88.js";
import { Move_gen_2_quiet_0x88_С } from "./move_generator/move_gen_2_quiet_0x88.js";
import { Make_move_0x88_C } from "./move_generator/make_move_0x88.js";
import { Unmake_move_0x88_C } from "./move_generator/unmake_move_0x88.js";
import { Undo_0x88_C } from "./move_generator/undo_0x88.js";

/**
* НАЗНАЧЕНИЕ
*
*/



class Chess_notation_C {

  move_gen_1_captures_0x88_O = new Move_gen_1_captures_0x88_С();
  move_gen_2_quiet_0x88_O = new Move_gen_2_quiet_0x88_С();

  make_move_0x88_O = new Make_move_0x88_C();
  unmake_move_0x88_O = new Unmake_move_0x88_C();

  static NAME = "Chess_notation_C";


  info_return_search = {
    chess_board_0x88_O_start: null,//
    chess_board_0x88_O_end: null,//
    score: 0,//
    pv_line: null,//
    node_count: 0,//
    depth_search: 0//
  };

  constructor() {

  }

  iniM() {
 
  }

  message_engine_to_search_start(message) {
       
  }

}

export { Chess_notation_C };