/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name evaluate_0x88.js
 * @version created 12.10m.2025 
 * last modified 12.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Evaluate_0x88_C {

  static NAME = "Evaluate_0x88_C";
  /*
   имя фигуры
   0 - нет фигуры
   1 - пешка 
   2 - конь 
   3 - слон
   4 - ладья 
   5 - ферзь 
   6 - король
  */
  static PIECE_SCORE = [0, 100, 400, 400, 600, 1200, 10000];

  d = 0;// 



  constructor() {

  }

  iniM() {

  }

  score_position(chess_board_0x88_O) {

    let color_piece = 0;
    let score_piece = 0;
    let index_piece = 0;    
    let value = 0;

    for (let sq = 0; sq < 128; sq++) {
      if ((sq & 136) == 0) {// 136 0x88
        index_piece = chess_board_0x88_O.sq_piece_0x88[sq];
        score_piece = Evaluate_0x88_C.PIECE_SCORE[index_piece];
        color_piece = chess_board_0x88_O.sq_piece_color_0x88[sq];

        if (color_piece == 1) {// белая фигура
           value = value + score_piece;
        } else {// черная фигура
           value = value - score_piece;
        }
      }
    }
    if (chess_board_0x88_O.side_to_move == 0) value = -1 * value;
    return value;
  }

}