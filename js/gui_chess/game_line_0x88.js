/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name game_line_0x88.js
 * @version created 31.12m.2025 
 * last modified 31.12m.2025
*/


/**
* НАЗНАЧЕНИЕ

*/

class Game_line_0x88_C {

  static NAME = "Game_line_0x88_C";

  static MAX_LENTH = 1000;

  fen = new Array(Game_line_0x88_C.MAX_LENTH).fill(-1);

  pv_line_str = new Array(Game_line_0x88_C.MAX_LENTH).fill("");

  number_move = new Array(Game_line_0x88_C.MAX_LENTH).fill(0);

  current_position = 0;

  lenth_game = 0;

  full_game = "";

  constructor() {

  }

  iniM() {
    this.clear_line()
  }

  clear_line() {
    for (let i = 0; i < Game_line_0x88_C.MAX_LENTH; i++) {

      this.fen[i] = "";
      this.pv_line_str[i] = "";
      this.number_move[i] = 0;
    }

    this.current_position = 0;
    this.lenth_game = 0;
  }


  left() {
    if (this.current_position > 1) this.current_position = this.current_position - 1;
  }

  rigt() {
    if (this.current_position < this.lenth_game) this.current_position = this.current_position + 1;
  }

  start_position(fen) {
    //console.log('Game_line_0x88_C->start_position ');

    this.current_position = 1;

    this.fen[this.current_position] = fen;

    this.pv_line_str[this.current_position] = "Game:";

     this.number_move[this.current_position] = 0;

    this.lenth_game = this.current_position;

  }



  // 
  add_position(fen) {
    //console.log('Game_line_0x88_C->add_position this.current_position ' + this.current_position);

    if (this.current_position < Game_line_0x88_C.MAX_LENTH) this.current_position = this.current_position + 1;

    this.fen[this.current_position] = fen;

    this.lenth_game = this.current_position;

  }

  // 
  add_pv_line_str(pv_line_str, number_move, w) {
    // console.log('Game_line_0x88_C->add_pv_line_str');

    // console.log('Game_line_0x88_C->pv_line_str ' + pv_line_str);
    // console.log('Game_line_0x88_C->number_move ' + number_move);
    // console.log('Game_line_0x88_C->w ' + w);

    this.pv_line_str[this.current_position] = this.pv_line_str[this.current_position - 1] + pv_line_str;
    if (w == 1) {
      this.number_move[this.current_position] = number_move;
    } else {
      this.number_move[this.current_position] = number_move + 1;
    }

    //console.log('Game_line_0x88_C->pv_line_str[' + this.current_position + '] ' + this.pv_line_str[this.current_position]);
    //console.log('Game_line_0x88_C->pv_line_str[' + (this.current_position - 1) + '] ' + this.pv_line_str[this.current_position - 1]);
  }

  get_number_move() {
    return this.number_move[this.current_position];
  }

  get_pv_line_str() {
    return this.pv_line_str[this.current_position];
  }

  get_position() {
    return this.fen[this.current_position];
  }

}

export { Game_line_0x88_C };