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
  eval = 0;

  name_capture_piece = 0;
  color_capture_piece = 0;

  constructor() {

  }

  iniM() {
  }

}