/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name game_line_0x88.js
 * @version created 08.11m.2025 
 * last modified 08.11m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Game_line_0x88_C {

  static NAME = "Game_line_0x88_C";

  static MAX_LENTH = 1000;

  type_move = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);
  piece_name = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);
  piece_color = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);
  capture_piece = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);
  score_move = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);

  from = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);
  to = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);

  fen = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);

  lenth_game = 0;


  constructor() {

  }

  iniM() {

  }

  clear_list() {
    for (let i = 0; i < Game_line_0x88_C.MAX_LENTH; i++) {
      this.type_move[i] = -1;
      this.piece_name[i] = -1;      
      this.piece_color[i] = 0;
      this.capture_piece[i] = -1;      
      this.score_move[i] = -1;
      this.from[i] = -1;
      this.to[i] = -1;
      this.fen[i] = "";

    }
    this.lenth_game = 0;
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

  test_print_game_line(chess_board_0x88_O) {
    console.log("test_print_pv_line ********");

    for (let i = 0; i < this.depth_max + 1; i++) {
      console.log("type_move[" + i + "] = " + this.type_move[i] + " " + Move_list_0x88_С.TYPE_MOVE_NAME[this.type_move[i]]);
      console.log("piece_name[" + i + "] = " + this.piece_name[i]);      
      console.log("piece_color[" + i + "] = " + this.piece_color[i]);
      console.log("score_move[" + i + "] = " + this.score_move[i]);
      console.log("capture_piece[" + i + "] = " + this.capture_piece[i]);      
      console.log("from[" + i + "] = " + this.from[i]);
      console.log("to[" + i + "] = " + this.to[i]);

      console.log(Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" +
        (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i])) + "-" +
        Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
        (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])));

      console.log("fen[" + i + "] = " + this.fen[i]);

      //console.log(" ");
    }
    console.log("lenth_game = " + this.lenth_game);
    console.log("******** test_print_pv_line");
  }

  line_to_string(chess_board_0x88_O, move_list_0x88_O) {

    let pv_line_str = "Game line: ";
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

export{Game_line_0x88_C};