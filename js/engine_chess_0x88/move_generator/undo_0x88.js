/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name undo_0x88.js
 * @version created 12.10m.2025 
 * last modified 12.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Undo_0x88_C {

  static NAME = "Undo_0x88_C";

  // цвет хода 0 - черные 1 - белые
  side_to_move = 0;

  // разрешение взятия на проходе 1/0
  en_passant_yes = 0;

  // координата битого поля
  en_passant_target_square = 0;

  // рокировка белых в длинную сторону   1/0
  castling_Q = 1;

  // рокировка белых в короткую сторону  1/0
  castling_K = 1;

  // рокировка черных в длинную сторону  1/0
  castling_q = 1;

  // рокировка черных в короткую сторону 1/0
  castling_k = 1;

  // оценка позиции
  score = 0;

  name_capture_piece = 0;
  color_capture_piece = 0;

  constructor() {

  }

  iniM() {
  }

  set_undo(chess_board_0x88_O) {
      // цвет хода 0 - черные 1 - белые
    this.side_to_move = chess_board_0x88_O.side_to_move;
    // разрешение взятия на проходе 1/0
    this.en_passant_yes = chess_board_0x88_O.en_passant_yes;
    // координата битого поля
    this.en_passant_target_square = chess_board_0x88_O.en_passant_target_square;
    // рокировка белых в длинную сторону   1/0
    this.castling_Q = chess_board_0x88_O.castling_Q;
    // рокировка белых в короткую сторону  1/0
    this.castling_K = chess_board_0x88_O.castling_K;
    // рокировка черных в длинную сторону  1/0
    this.castling_q = chess_board_0x88_O.castling_q;
    // рокировка черных в короткую сторону 1/0
    this.castling_k = chess_board_0x88_O.castling_k;
    // оценка позиции
    this.score = chess_board_0x88_O.score;
  }

  get_undo(chess_board_0x88_O) {

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88_O.side_to_move = this.side_to_move;
    // разрешение взятия на проходе 1/0
    chess_board_0x88_O.en_passant_yes = this.en_passant_yes;
    // координата битого поля
    chess_board_0x88_O.en_passant_target_square = this.en_passant_target_square;
    // рокировка белых в длинную сторону   1/0
    chess_board_0x88_O.castling_Q = this.castling_Q;
    // рокировка белых в короткую сторону  1/0
    chess_board_0x88_O.castling_K = this.castling_K;
    // рокировка черных в длинную сторону  1/0
    chess_board_0x88_O.castling_q = this.castling_q;
    // рокировка черных в короткую сторону 1/0
    chess_board_0x88_O.castling_k = this.castling_k;
    // оценка позиции
    chess_board_0x88_O.score = this.score;

  }
}

export{Undo_0x88_C};
