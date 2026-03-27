// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name evaluate_0x88.js
 * @version created 29.11m.2026 
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
} from "../move_generator_0x88/chess_board_0x88.js";

import {
  ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
  key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
  key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep2_0x88_tk, key_update_QqKk_0x88_tk,
  test_generation_key_64_tk
} from "../for_sorting_move/transposition_key_0x88.js";

/**
* НАЗНАЧЕНИЕ

*/

const PAWN_SCORE_E = 100;  // пешка 
const KNIGHT_SCORE_E = 400;  // конь
const BISHOP_SCORE_E = 400;  // слон
const ROOK_SCORE_E = 600;  // ладья
const QUEEN_SCORE_E = 1200; // ферзь
const KING_SCORE_E = 10000;// король

const PIECE_SCORE_E = [0, 100, 400, 400, 600, 1200, 10000, 0, 0, 100, 400, 400, 600, 1200, 10000];

const center_0x88_e = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  10, 20, 20, 20, 20, 20, 20, 10, 0, 0, 0, 0, 0, 0, 0, 0,
  15, 20, 25, 30, 30, 25, 20, 15, 0, 0, 0, 0, 0, 0, 0, 0,
  15, 20, 25, 30, 30, 25, 20, 15, 0, 0, 0, 0, 0, 0, 0, 0,
  10, 15, 20, 25, 25, 20, 15, 10, 0, 0, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const center_queen_0x88_e = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];


const white_king_0x88_e = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 5, 10, 0, 0, 0, 20, 5, 0, 0, 0, 0, 0, 0, 0, 0,
];

const black_king_0x88_e = [
  0, 5, 10, 0, 0, 0, 20, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const white_pawn_0x88_e = [
  100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0,
  30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0,
  25, 25, 25, 25, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0,
  20, 20, 20, 20, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0,
  15, 15, 15, 15, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0,
  10, 10, 10, 10, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const black_pawn_0x88_e = [
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
* @param {Int32Array} chess_board_0x88 
* @param {BigUint64Array} chess_board_key_64
* @returns {number}
*/
const score_position_e = function (chess_board_0x88, chess_board_key_64) {

  let color_piece = 0;
  let score_piece = 0;
  let index_piece = 0;
  let score = 0;

  // const chess_board_key_64_save = new BigUint64Array(1);

  // set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_save);

  //   if(chess_board_key_64_save[0] != chess_board_key_64[0]) {

  //       console.log("score_position -> chess_board_key_64_save != chess_board_key_64");
  //       console.log("score_position -> chess_board_key_64_save[0] " + chess_board_key_64_save[0]); 
  //       console.log("score_position ->      chess_board_key_64[0] " + chess_board_key_64[0]);
  //   }


  for (let sq = 0; sq < 128; sq++) {
    if ((sq & 136) == 0) {// 136 0x88

      index_piece = chess_board_0x88[sq];
      score_piece = PIECE_SCORE_E[index_piece];
      //color_piece = (index_piece > W_KING) ? BLACK : WHITE;
      color_piece = 1 - (index_piece >> 3);

      // есть фигура на доске
      if (index_piece != 0) {
        if (color_piece == 1) {// белая фигура
          score = score + score_piece;
          if (index_piece == W_KING_CB) {
            score = score + white_king_0x88_e[sq];
          } else if (index_piece == W_QUEEN_CB) {
            score = score + center_queen_0x88_e[sq];
          } else if (index_piece == W_ROOK_CB) {

          } else if (index_piece == W_BISHOP_CB) {
            score = score + center_0x88_e[sq];
          } else if (index_piece == W_KNIGHT_CB) {
            score = score + center_0x88_e[sq];
          } else if (index_piece == W_PAWN_CB) {
            score = score + white_pawn_0x88_e[sq];
          }
        } else {// черная фигура
          score = score - score_piece;
          if (index_piece == B_KING_CB) {
            score = score - black_king_0x88_e[sq];
          } else if (index_piece == B_QUEEN_CB) {
            score = score - center_queen_0x88_e[sq];
          } else if (index_piece == B_ROOK_CB) {

          } else if (index_piece == B_BISHOP_CB) {
            score = score - center_0x88_e[sq];
          } else if (index_piece == B_KNIGHT_CB) {
            score = score - center_0x88_e[sq];
          } else if (index_piece == B_PAWN_CB) {
            score = score - black_pawn_0x88_e[sq];
          }
        }//if (color_piece == 1) {// белая фигура
      }//if (index_piece != 0) {

    }// if ((sq & 136) == 0) {// 136 0x88
  }//for (let sq = 0; sq < 128; sq++) {

  // тестируем запись в фен
  //test_fen(chess_board_0x88);
  //test_print_piese_0x88(chess_board_0x88);
  //console.log("score_position -> score " + score);

  return score;
}//score_position(chess_board_0x88_O) {


// тестируем фен. то что правильно в него записывается позиция и наоборот - считывается
/**
* @param {Int32Array} chess_board_0x88
* @returns {void}
*/
const test_fen_e = function (chess_board_0x88) {

  let chess_board_0x88_O_save = new Int32Array(IND_MAX_CB).fill(0);// доска 0x88 с фигурами

  // записали доску чтобы потом сравнить
  save_chess_board_0x88_cb(chess_board_0x88_O_save, chess_board_0x88);

  // // загнали позицию в фен
  let fen_save_1 = set_fen_from_0x88_cb(chess_board_0x88);

  // // возвращаем позицию из фена
  set_board_from_fen_0x88_cb(fen_save_1, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_2 = set_fen_from_0x88_cb(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88_cb(fen_save_2, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_3 = set_fen_from_0x88_cb(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88_cb(fen_save_3, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_4 = set_fen_from_0x88_cb(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88_cb(fen_save_4, chess_board_0x88);


  if ((fen_save_1 != fen_save_2) && (fen_save_2 != fen_save_3) && (fen_save_3 != fen_save_4)) {
    console.log("test_fen " + fen_save_1 + " != " + fen_save_2 + " != " + fen_save_3 + " != " + fen_save_4);
  }

  // загнали позицию в фен повторно
  let fen_save_5 = set_fen_from_0x88_cb(chess_board_0x88_O_save);


  // сравниваем записанную доску и ту что получилась из фена. если что то не так будет вывод на консоль
  
  test_compare_chess_board_0x88_cb(chess_board_0x88_O_save, chess_board_0x88);

}

export { score_position_e, PAWN_SCORE_E };