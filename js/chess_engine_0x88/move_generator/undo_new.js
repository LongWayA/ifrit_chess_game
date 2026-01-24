// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name undo_0x88.js
 * @version created 24.01m.2026 
*/

import {
  SIDE_TO_MOVE,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK
} from "./chess_board_new.js";

/**
* НАЗНАЧЕНИЕ
 Записываем информацию нужную для быстрой отмены хода.
*/

const UNDO_SIDE_TO_MOVE = 0; // положение в массиве цвета хода

const UNDO_CASTLING_Q = 1; // положение в массиве рокировки белых в длинную сторону 0-1
const UNDO_CASTLING_q = 2; // положение в массиве рокировки белых в короткую сторону 0-1
const UNDO_CASTLING_K = 3; // положение в массиве рокировки черных в длинную сторону 0-1
const UNDO_CASTLING_k = 4; // положение в массиве рокировки черных в короткую сторону 0-1

const UNDO_EN_PASSANT_YES = 5; // положение в массиве разрешение взятия на проходе 0-1
const UNDO_EN_PASSANT_TARGET_SQUARE = 6; // положение в массиве координата битого поля от 0 до 119
const UNDO_KING_FROM_WHITE = 7; // положение в массиве положение белого короля от 0 до 119
const UNDO_KING_FROM_BLACK = 8; // положение в массиве положение черного короля от 0 до 119

const UNDO_MAX = 9;

// сохраняем значения из доски
/**
 * @param {Uint8Array} undo
 * @param {Uint8Array} chess_board_0x88
 * @returns {void}
 */
const set_undo = function (undo, chess_board_0x88) {
  // цвет хода 0 - черные 1 - белые
  undo[UNDO_SIDE_TO_MOVE] = chess_board_0x88[SIDE_TO_MOVE];

  // разрешение взятия на проходе 1/0
  undo[UNDO_EN_PASSANT_YES] = chess_board_0x88[IND_EN_PASSANT_YES];

  // координата битого поля
  undo[UNDO_EN_PASSANT_TARGET_SQUARE] = chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE];

  // рокировка белых в длинную сторону   1/0
  undo[UNDO_CASTLING_Q] = chess_board_0x88[IND_CASTLING_Q];

  // рокировка белых в короткую сторону  1/0
  undo[UNDO_CASTLING_K] = chess_board_0x88[IND_CASTLING_K];

  // рокировка черных в длинную сторону  1/0
  undo[UNDO_CASTLING_q] = chess_board_0x88[IND_CASTLING_q];

  // рокировка черных в короткую сторону 1/0
  undo[UNDO_CASTLING_k] = chess_board_0x88[IND_CASTLING_k];

  undo[UNDO_KING_FROM_WHITE] = chess_board_0x88[IND_KING_FROM_WHITE];
  undo[UNDO_KING_FROM_BLACK] = chess_board_0x88[IND_KING_FROM_BLACK];

}

// возвращаем доске записанные значения
/**
* @param {Uint8Array} chess_board_0x88
* @param {Uint8Array} undo 
* @returns {void}
*/
const get_undo = function (chess_board_0x88, undo) {

  // цвет хода 0 - черные 1 - белые
  chess_board_0x88[SIDE_TO_MOVE] = undo[UNDO_SIDE_TO_MOVE];

  // разрешение взятия на проходе 1/0
  chess_board_0x88[IND_EN_PASSANT_YES] = undo[UNDO_EN_PASSANT_YES];

  // координата битого поля
  chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = undo[UNDO_EN_PASSANT_TARGET_SQUARE];
  // рокировка белых в длинную сторону   1/0
  chess_board_0x88[IND_CASTLING_Q] = undo[UNDO_CASTLING_Q];
  // рокировка белых в короткую сторону  1/0
  chess_board_0x88[IND_CASTLING_K] = undo[UNDO_CASTLING_K];
  // рокировка черных в длинную сторону  1/0
  chess_board_0x88[IND_CASTLING_q] = undo[UNDO_CASTLING_q];
  // рокировка черных в короткую сторону 1/0
  chess_board_0x88[IND_CASTLING_k] = undo[UNDO_CASTLING_k];

  chess_board_0x88[IND_KING_FROM_WHITE] = undo[UNDO_KING_FROM_WHITE];
  chess_board_0x88[IND_KING_FROM_BLACK] = undo[UNDO_KING_FROM_BLACK];

}

export { set_undo, get_undo, UNDO_MAX};
