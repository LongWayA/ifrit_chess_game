/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name evaluate_0x88.js
 * @version created 12.10m.2025 
 * last modified 12.10m.2025
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";

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

  white_king_0x88 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 5, 10, 0, 0, 0, 20, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  black_king_0x88 = [
    0, 5, 10, 0, 0, 0, 20, 5, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  white_pawn_0x88 = [
    100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    20, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  black_pawn_0x88 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    20, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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

    for (let sq = 0; sq < 128; sq++) {
      if ((sq & 136) == 0) {// 136 0x88
        index_piece = chess_board_0x88_O.sq_piece_0x88[sq];
        score_piece = Evaluate_0x88_C.PIECE_SCORE[index_piece];
        color_piece = chess_board_0x88_O.sq_piece_color_0x88[sq];

        // есть фигура на доске
        if (index_piece != 0) {
          if (color_piece == 1) {// белая фигура
            score = score + score_piece;
            if (index_piece == Chess_board_0x88_C.KING) {
              score = score + this.white_king_0x88[sq];
            } else if (index_piece == Chess_board_0x88_C.QUEEN) {

            } else if (index_piece == Chess_board_0x88_C.ROOK) {

            } else if (index_piece == Chess_board_0x88_C.BISHOP) {
              score = score + this.center_0x88[sq];
            } else if (index_piece == Chess_board_0x88_C.KNIGHT) {
              score = score + this.center_0x88[sq];
            } else if (index_piece == Chess_board_0x88_C.PAWN) {
              score = score + this.white_pawn_0x88[sq];
            }
          } else {// черная фигура
            score = score - score_piece;
            if (index_piece == Chess_board_0x88_C.KING) {
              score = score - this.black_king_0x88[sq];
            } else if (index_piece == Chess_board_0x88_C.QUEEN) {

            } else if (index_piece == Chess_board_0x88_C.ROOK) {

            } else if (index_piece == Chess_board_0x88_C.BISHOP) {
              score = score - this.center_0x88[sq];
            } else if (index_piece == Chess_board_0x88_C.KNIGHT) {
              score = score - this.center_0x88[sq];
            } else if (index_piece == Chess_board_0x88_C.PAWN) {
              score = score - this.black_pawn_0x88[sq];
            }
          }//if (color_piece == 1) {// белая фигура
        }//if (index_piece != 0) {

        // if (color_piece == 1) {// белая фигура
        //   score = score + score_piece;
        //   if (index_piece != 0) score = score + this.center_0x88[sq];
        // } else {// черная фигура
        //   score = score - score_piece;
        //   if (index_piece != 0) score = score - this.center_0x88[sq];
        // }
      }// if ((sq & 136) == 0) {// 136 0x88
    }//for (let sq = 0; sq < 128; sq++) {

    // совершенно точно, что если ход черных тогда умножаем на минус один 
    // потому что сходили белые и к ним оценка вернется умноженная на минус один, а это плюс 
    // белые оценивают абсолютную оценку потому что белые фигуры в плюс.
    //if (chess_board_0x88_O.side_to_move == Chess_board_0x88_C.BLACK) score = -1 * score;
    chess_board_0x88_O.score = score;   
    return score;
  }//score_position(chess_board_0x88_O) {
}

export{Evaluate_0x88_C};

/*
score = materialWeight * (numWhitePieces - numBlackPieces) * who2move 
where who2move = 1 for white, and who2move = -1 for black.
*/