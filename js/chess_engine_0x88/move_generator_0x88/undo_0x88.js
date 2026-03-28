// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name undo_0x88.js
 * @version created 24.01m.2026 
*/

import {
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piese_0x88_cb, test_print_piese_color_0x88_cb, test_print_piese_in_line_0x88_cb, 
    test_compare_chess_board_0x88_cb,save_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb, 
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    IND_MAX_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB, 
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB, 
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB,  SQUARE_128_to_64_CB
} from "./chess_board_0x88.js";

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


/** сохраняем значения из доски
 * @param {Int32Array} undo
 * @param {Int32Array} chess_board_0x88
 * @returns {void}
 */
const set_undo = function (undo, chess_board_0x88) {
  // цвет хода 0 - черные 1 - белые
  undo[UNDO_SIDE_TO_MOVE] = chess_board_0x88[SIDE_TO_MOVE_CB];

  // разрешение взятия на проходе 1/0
  undo[UNDO_EN_PASSANT_YES] = chess_board_0x88[IND_EN_PASSANT_YES_CB];

  // координата битого поля
  undo[UNDO_EN_PASSANT_TARGET_SQUARE] = chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB];

  // рокировка белых в длинную сторону   1/0
  undo[UNDO_CASTLING_Q] = chess_board_0x88[IND_CASTLING_Q_CB];

  // рокировка белых в короткую сторону  1/0
  undo[UNDO_CASTLING_K] = chess_board_0x88[IND_CASTLING_K_CB];

  // рокировка черных в длинную сторону  1/0
  undo[UNDO_CASTLING_q] = chess_board_0x88[IND_CASTLING_q_CB];

  // рокировка черных в короткую сторону 1/0
  undo[UNDO_CASTLING_k] = chess_board_0x88[IND_CASTLING_k_CB];

  undo[UNDO_KING_FROM_WHITE] = chess_board_0x88[IND_KING_FROM_WHITE_CB];
  undo[UNDO_KING_FROM_BLACK] = chess_board_0x88[IND_KING_FROM_BLACK_CB];

}

// возвращаем доске записанные значения
/**
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} undo 
* @returns {void}
*/
const get_undo = function (chess_board_0x88, undo) {

  // цвет хода 0 - черные 1 - белые
  chess_board_0x88[SIDE_TO_MOVE_CB] = undo[UNDO_SIDE_TO_MOVE];

  // разрешение взятия на проходе 1/0
  chess_board_0x88[IND_EN_PASSANT_YES_CB] = undo[UNDO_EN_PASSANT_YES];

  // координата битого поля
  chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = undo[UNDO_EN_PASSANT_TARGET_SQUARE];
  // рокировка белых в длинную сторону   1/0
  chess_board_0x88[IND_CASTLING_Q_CB] = undo[UNDO_CASTLING_Q];
  // рокировка белых в короткую сторону  1/0
  chess_board_0x88[IND_CASTLING_K_CB] = undo[UNDO_CASTLING_K];
  // рокировка черных в длинную сторону  1/0
  chess_board_0x88[IND_CASTLING_q_CB] = undo[UNDO_CASTLING_q];
  // рокировка черных в короткую сторону 1/0
  chess_board_0x88[IND_CASTLING_k_CB] = undo[UNDO_CASTLING_k];

  chess_board_0x88[IND_KING_FROM_WHITE_CB] = undo[UNDO_KING_FROM_WHITE];
  chess_board_0x88[IND_KING_FROM_BLACK_CB] = undo[UNDO_KING_FROM_BLACK];

}

export { set_undo, get_undo, UNDO_MAX};
