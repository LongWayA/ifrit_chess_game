// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name undo_0x88.js
 * @version created 12.10m.2025 
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";

/**
* НАЗНАЧЕНИЕ
 Записываем информацию нужную для быстрой отмены хода.
*/
//+
// тут все прозрачно. идей пока нет

/**
 * Класс.
 * @class
 */
class Undo_0x88_C {

  static NAME = "Undo_0x88_C";

  // цвет хода 0 - черные 1 - белые
  side_to_move = 0|0;

  // разрешение взятия на проходе 1/0
  en_passant_yes = 0|0;

  // координата битого поля
  en_passant_target_square = 0|0;

  // рокировка белых в длинную сторону   1/0
  castling_Q = 1|0;

  // рокировка белых в короткую сторону  1/0
  castling_K = 1|0;

  // рокировка черных в длинную сторону  1/0
  castling_q = 1|0;

  // рокировка черных в короткую сторону 1/0
  castling_k = 1|0;

  // оценка позиции
  score = 0|0;

  name_capture_piece = 0|0;
  color_capture_piece = 0|0;

  king_from_white = -1|0;
  king_from_black = -1|0;

  // 64 битный ключ позиции   
  key_64 = 0n;

  constructor() {

  }

  iniM() {
  }

  // сохраняем значения из доски
  /**
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @returns {void}
   */  
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

    // 64 битный ключ позиции   
    this.key_64 = chess_board_0x88_O.key_64;

    this.king_from_white = chess_board_0x88_O.king_from_white;
    this.king_from_black = chess_board_0x88_O.king_from_black;

  }

  // возвращаем доске записанные значения
   /**
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @returns {void}
   */   
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

    // 64 битный ключ позиции   
    chess_board_0x88_O.key_64 = this.key_64;

    chess_board_0x88_O.king_from_white = this.king_from_white;
    chess_board_0x88_O.king_from_black = this.king_from_black;

  }
}

export { Undo_0x88_C };
