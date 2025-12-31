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

  nomber_move = new Array(Game_line_0x88_C.MAX_LENTH).fill(0);

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
      this.nomber_move[i] = 0;
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

  // 
  add_position(fen, move) {
    //console.log('Game_line_0x88_C->add_position');

    if (this.current_position < Game_line_0x88_C.MAX_LENTH) this.current_position = this.current_position + 1;

    this.fen[this.current_position] = fen;

    this.lenth_game = this.current_position;

    this.full_game = this.full_game + move;

  }

  // 
  add_pv_line_str(pv_line_str, nomber_move, w) {
    //console.log('Game_line_0x88_C->add_position');

    this.pv_line_str[this.current_position] = this.pv_line_str[this.current_position - 1] + pv_line_str;
    if (w == 1) {
      this.nomber_move[this.current_position] = nomber_move;
    } else {
      this.nomber_move[this.current_position] = nomber_move;
    }
  }

  get_nomber_move() {
    return this.nomber_move[this.current_position];
  }

  get_pv_line_str() {
    return this.pv_line_str[this.current_position];
  }

  get_position() {
    return this.fen[this.current_position];
  }

}

export { Game_line_0x88_C };