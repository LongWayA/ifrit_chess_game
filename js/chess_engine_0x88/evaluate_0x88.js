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

  center_0x88 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
    10, 20, 20, 20, 20, 20, 20, 10, 0, 0, 0, 0, 0, 0, 0, 0,
    15, 20, 25, 30, 30, 25, 20, 15, 0, 0, 0, 0, 0, 0, 0, 0,
    15, 20, 25, 30, 30, 25, 20, 15, 0, 0, 0, 0, 0, 0, 0, 0,
    10, 15, 20, 25, 25, 20, 15, 10, 0, 0, 0, 0, 0, 0, 0, 0,
    5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];



  constructor() {

  }

  iniM() {

  }

  score_position(chess_board_0x88_O) {

    let color_piece = 0;
    let score_piece = 0;
    let index_piece = 0;
    let score = 0;
    let center = 0;

    for (let sq = 0; sq < 128; sq++) {
      if ((sq & 136) == 0) {// 136 0x88
        index_piece = chess_board_0x88_O.sq_piece_0x88[sq];
        score_piece = Evaluate_0x88_C.PIECE_SCORE[index_piece];
        color_piece = chess_board_0x88_O.sq_piece_color_0x88[sq];

        if (color_piece == 1) {// белая фигура
          score = score + score_piece;
          if (index_piece != 0) score = score + this.center_0x88[sq];
        } else {// черная фигура
          score = score - score_piece;
          if (index_piece != 0) score = score - this.center_0x88[sq];
        }
      }
    }

    chess_board_0x88_O.score = score;
    return score;
  }



}