// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name evaluate_0x88.js
 * @version created 29.11m.2026 
*/

import {     x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
    test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
    save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
    IND_MAX, SIDE_TO_MOVE, LET_COOR,
    BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
    IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
    IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK } from "../move_generator/chess_board_new.js";

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
        color_piece =  (index_piece > W_KING) ? BLACK : WHITE;

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


    // chess_board_0x88_O_save.test_print_0x88();
    // chess_board_0x88_O_save.test_print_0x88_color();
    // chess_board_0x88_O.test_print_0x88();
    // chess_board_0x88_O.test_print_0x88_color();

    // сравниваем записанную доску и ту что получилась из фена. если что то не так будет вывод на консоль
    //   console.log("Evaluate_0x88_C ?????????????????????????");
    test_compare_chess_board_0x88(chess_board_0x88_O_save, chess_board_0x88 );

    //   console.log("Evaluate_0x88_C 1 =" + fen_save_1);
    //chess_board_0x88_O_save.test_print_any_0x88();  
    //chess_board_0x88_O.test_print_any_0x88();      
    //    console.log("Evaluate_0x88_C 5 =" + fen_save_5);
  }

export {score_position };