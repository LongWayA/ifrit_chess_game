// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name evaluate_0x88.js
 * @version created 29.11m.2026 
*/

import {
  test_compare_chess_board_0x88,
  save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88,
  IND_MAX,
  BLACK, WHITE, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
} from "../move_generator/chess_board_new.js";

/**
* НАЗНАЧЕНИЕ

*/

const PAWN_SCORE = 100;  // пешка 
const KNIGHT_SCORE = 400;  // конь
const BISHOP_SCORE = 400;  // слон
const ROOK_SCORE = 600;  // ладья
const QUEEN_SCORE = 1200; // ферзь
const KING_SCORE = 10000;// король

const PIECE_SCORE = [0, 100, 400, 400, 600, 1200, 10000, 100, 400, 400, 600, 1200, 10000];

const center_0x88 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  10, 20, 20, 20, 20, 20, 20, 10, 0, 0, 0, 0, 0, 0, 0, 0,
  15, 20, 25, 30, 30, 25, 20, 15, 0, 0, 0, 0, 0, 0, 0, 0,
  15, 20, 25, 30, 30, 25, 20, 15, 0, 0, 0, 0, 0, 0, 0, 0,
  10, 15, 20, 25, 25, 20, 15, 10, 0, 0, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const center_queen_0x88 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];


const white_king_0x88 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 5, 10, 0, 0, 0, 20, 5, 0, 0, 0, 0, 0, 0, 0, 0,
];

const black_king_0x88 = [
  0, 5, 10, 0, 0, 0, 20, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const white_pawn_0x88 = [
  100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0,
  30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0,
  25, 25, 25, 25, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0,
  20, 20, 20, 20, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0,
  15, 15, 15, 15, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0,
  10, 10, 10, 10, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const black_pawn_0x88 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  10, 10, 10, 10, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  20, 20, 20, 20, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0,
  25, 25, 25, 25, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0,
  30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0,
  100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0,
];

/**
* @param {Uint8Array} chess_board_0x88 
* @returns {number}
*/
const score_position = function (chess_board_0x88) {

  let color_piece = 0;
  let score_piece = 0;
  let index_piece = 0;
  let score = 0;

  for (let sq = 0; sq < 128; sq++) {
    if ((sq & 136) == 0) {// 136 0x88

      index_piece = chess_board_0x88[sq];
      score_piece = PIECE_SCORE[index_piece];
      color_piece = (index_piece > W_KING) ? BLACK : WHITE;

      // есть фигура на доске
      if (index_piece != 0) {
        if (color_piece == 1) {// белая фигура
          score = score + score_piece;
          if (index_piece == W_KING) {
            score = score + white_king_0x88[sq];
          } else if (index_piece == W_QUEEN) {
            score = score + center_queen_0x88[sq];
          } else if (index_piece == W_ROOK) {

          } else if (index_piece == W_BISHOP) {
            score = score + center_0x88[sq];
          } else if (index_piece == W_KNIGHT) {
            score = score + center_0x88[sq];
          } else if (index_piece == W_PAWN) {
            score = score + white_pawn_0x88[sq];
          }
        } else {// черная фигура
          score = score - score_piece;
          if (index_piece == B_KING) {
            score = score - black_king_0x88[sq];
          } else if (index_piece == B_QUEEN) {
            score = score - center_queen_0x88[sq];
          } else if (index_piece == B_ROOK) {

          } else if (index_piece == B_BISHOP) {
            score = score - center_0x88[sq];
          } else if (index_piece == B_KNIGHT) {
            score = score - center_0x88[sq];
          } else if (index_piece == B_PAWN) {
            score = score - black_pawn_0x88[sq];
          }
        }//if (color_piece == 1) {// белая фигура
      }//if (index_piece != 0) {

    }// if ((sq & 136) == 0) {// 136 0x88
  }//for (let sq = 0; sq < 128; sq++) {

  // тестируем запись в фен
  //test_fen(chess_board_0x88_O);


  return score;
}//score_position(chess_board_0x88_O) {


// тестируем фен. то что правильно в него записывается позиция и наоборот - считывается
/**
* @param {Uint8Array} chess_board_0x88
* @returns {void}
*/
const test_fen = function (chess_board_0x88) {

  let chess_board_0x88_O_save = new Uint8Array(IND_MAX).fill(0);// доска 0x88 с фигурами

  // записали доску чтобы потом сравнить
  save_chess_board_0x88(chess_board_0x88_O_save, chess_board_0x88);

  // // загнали позицию в фен
  let fen_save_1 = set_fen_from_0x88(chess_board_0x88);

  // // возвращаем позицию из фена
  set_board_from_fen_0x88(fen_save_1, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_2 = set_fen_from_0x88(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88(fen_save_2, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_3 = set_fen_from_0x88(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88(fen_save_3, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_4 = set_fen_from_0x88(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88(fen_save_4, chess_board_0x88);


  if ((fen_save_1 != fen_save_2) && (fen_save_2 != fen_save_3) && (fen_save_3 != fen_save_4)) {
    console.log("test_fen " + fen_save_1 + " != " + fen_save_2 + " != " + fen_save_3 + " != " + fen_save_4);
  }

  // загнали позицию в фен повторно
  let fen_save_5 = set_fen_from_0x88(chess_board_0x88_O_save);


  // сравниваем записанную доску и ту что получилась из фена. если что то не так будет вывод на консоль
  
  test_compare_chess_board_0x88(chess_board_0x88_O_save, chess_board_0x88);

}

export { score_position };