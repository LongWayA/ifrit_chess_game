/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name pv_line_0x88.js
 * @version created 22.10m.2025 
 * last modified 22.10m.2025
*/

import { Chess_board_0x88_C } from "./move_generator/chess_board_0x88.js";

/**
* НАЗНАЧЕНИЕ

*/

class PV_line_0x88_C {

  static NAME = "PV_line_0x88_2_C";

  static MAX_DEPTH = 100;

  type_move = new Array(PV_line_0x88_C.MAX_DEPTH).fill(-1);
  piece_color = new Array(PV_line_0x88_C.MAX_DEPTH).fill(-1);

  from = new Array(PV_line_0x88_C.MAX_DEPTH).fill(-1);
  to = new Array(PV_line_0x88_C.MAX_DEPTH).fill(-1);

  type_variant = new Array(PV_line_0x88_C.MAX_DEPTH).fill(-1);

  score_depth_max = -1;
  depth_max = 0;


  constructor() {

  }

  iniM() {

  }

  clear_list() {
    for (let i = 0; i < PV_line_0x88_C.MAX_DEPTH; i++) {
      this.type_move[i] = -1;
      this.piece_color[i] = -1;
      this.from[i] = -1;
      this.to[i] = -1;
      this.type_variant[i] = -1;

    }
    this.score_depth_max = -1;
    this.depth_max = 0;
  }

  save_list(pv_line_0x88_O) {
    for (let i = 0; i <= pv_line_0x88_O.depth_max; i++) {
      this.type_move[i] = pv_line_0x88_O.type_move[i];
      this.piece_color[i] = pv_line_0x88_O.piece_color[i];
      this.from[i] = pv_line_0x88_O.from[i];
      this.to[i] = pv_line_0x88_O.to[i];
      this.type_variant[i] = pv_line_0x88_O.type_variant[i];

      // if(this.type_move[i] == -1)  {
      // console.log('Move_list_0x88_С->save_list ALLERT  type_move -1 !!!!!!!!!!!!!');
      // console.log('Move_list_0x88_С->save_list ' + i);  
      // }    

    }
    this.score_depth_max = pv_line_0x88_O.score_depth_max;
    this.depth_max = pv_line_0x88_O.depth_max;
  }

  // 
  add_move(move_i, move_list_0x88_O, depth) {
    //console.log('Move_list_0x88_С->add_move');
    this.type_move[depth] = move_list_0x88_O.type_move[move_i];
    this.piece_color[depth] = move_list_0x88_O.piece_color;
    this.from[depth] = move_list_0x88_O.from[move_i];
    this.to[depth] = move_list_0x88_O.to[move_i];

    if (depth > this.depth_max) this.depth_max = depth;

    // if(this.type_move[depth] == -1)  {
    //   console.log('Move_list_0x88_С->add_move ALLERT type_move -1 !!!!!!!!!!!!!');
    //   console.log('Move_list_0x88_С->add_move move_i ' + move_i);  
    // }

  }

  test_print_pv_line(chess_board_0x88_O) {
    console.log("test_print_pv_line ********");

    for (let i = 0; i < this.depth_max + 1; i++) {
      console.log("type_move[" + i + "] = " + this.type_move[i] + " " + Move_list_0x88_С.TYPE_MOVE_NAME[this.type_move[i]]);
      console.log("from[" + i + "] = " + this.from[i]);
      console.log("to[" + i + "] = " + this.to[i]);

      console.log(Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" +
        (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i])) + "-" +
        Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
        (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])));

      console.log("type_variant[" + i + "] = " + this.type_variant[i]);

      //console.log(" ");
    }
    console.log("piece_color = " + this.piece_color);
    console.log("score_depth_max = " + this.score_depth_max);
    console.log("depth_max = " + this.depth_max);
    console.log("******** test_print_pv_line");
  }

  pv_line_to_string(chess_board_0x88_O, move_list_0x88_O) {

    let pv_line_str = "PV line: ";
    let v = 0;
    let v_i = 0;

    for (let i = 0; i < this.depth_max + 1; i++) {

      if (v == 0) {
        v = 1;
        v_i = v_i + 1;
        pv_line_str = pv_line_str + (v_i) + ".";

      } else {
        v = 0;
      }

      pv_line_str = pv_line_str + move_list_0x88_O.type_move_to_name_piese(this.type_move[i]) + "" +
        Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" + 
        (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i]));

      if (this.type_move[i] < 52) {// это взятия
        pv_line_str = pv_line_str + "x";

      } else {
        pv_line_str = pv_line_str + "-";

      }
      pv_line_str = pv_line_str +         
        Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
        (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])) + " ";
    }
    pv_line_str = pv_line_str + "val = " + this.score_depth_max;
    return pv_line_str;
  }
}

export{PV_line_0x88_C};
