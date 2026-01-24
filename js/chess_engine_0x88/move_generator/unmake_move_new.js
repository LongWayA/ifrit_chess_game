// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name unmake_move_0x88.js
 * @version created 24.01m.2026 
*/

import { Move_list_0x88_С } from "./move_list_new.js";

import {
    SIDE_TO_MOVE, SHIFT_COLOR,
    BLACK, PIECE_NO, PAWN, KNIGHT, BISHOP, ROOK, QUEEN,
    IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
    IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK } from "./chess_board_new.js";

import { check_detected,
     H1, H8, A1, A8, E1, E8, F1, F8, G1, G8, D1, D8, C1, C8 } from "./move_generator_captures_new.js";

import { get_undo } from "../move_generator/undo_new.js";

/**
* НАЗНАЧЕНИЕ
 Отменяем сделанный ход.
*/

  // возврат хода
/**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O
* @param {Uint8Array} undo
* @returns {void}
*/
  const undo_moves = function (move_i, chess_board_0x88, move_list_0x88_O, undo) {
    //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);

    let type_move = move_list_0x88_O.type_move[move_i];

    get_undo(chess_board_0x88, undo);

    // смотрим 
    switch (type_move) {

      case Move_list_0x88_С.MOVE_NO:
        break;
      ////////////////////////////////////////////////
      // простые ходы
      // MOVE
      case Move_list_0x88_С.MOVE_KING:
      //  break;
      case Move_list_0x88_С.MOVE_ROOK:
      //  break;  
      case Move_list_0x88_С.MOVE_QUEEN:
      //  break;
      case Move_list_0x88_С.MOVE_BISHOP:
      //  break;
      case Move_list_0x88_С.MOVE_KNIGHT:
      //  break;
      case Move_list_0x88_С.MOVE_PAWN:
        // возвращаем простой ход.
        unmake_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      ///////////////////////////////////////////////////////  
      // взятия
      // CAPTURES_KING_...
      case Move_list_0x88_С.CAPTURES_KING_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_KING_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_KING_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_KING_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, PAWN);
        break;

      // CAPTURES_ROOK_...
      case Move_list_0x88_С.CAPTURES_ROOK_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_ROOK_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_ROOK_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_ROOK_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, PAWN);
        break;

      // CAPTURES_QUEEN
      case Move_list_0x88_С.CAPTURES_QUEEN_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_QUEEN_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_QUEEN_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, PAWN);
        break;

      // CAPTURES_BISHOP
      case Move_list_0x88_С.CAPTURES_BISHOP_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_BISHOP_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_BISHOP_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, PAWN);
        break;

      // CAPTURES_KNIGHT
      case Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, PAWN);
        break;

      // CAPTURES_PAWN
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, PAWN);
        break;

      // CAPTURES_..._ROOK   
      case Move_list_0x88_С.CAPTURES_QUEEN_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_BISHOP_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK:
      //break;

      // тут особый случай ладья берет ладью. отменяем рокировки с участием обеих фигур. 
      case Move_list_0x88_С.CAPTURES_ROOK_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_KING_ROOK:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        unmake_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, ROOK)
        break;

      //////////////////////////////////////////////
      // MOVE_KING_CASTLE
      case Move_list_0x88_С.MOVE_KING_CASTLE:
        unmake_king_castle_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // MOVE_KING_QUEEN_CASTLE   
      case Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE:
        unmake_king_queen_castle_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      //////////////////////////////////////////////
      // специальный ходы все про пешки 
      // MOVE_DOUBLE_PAWN       
      case Move_list_0x88_С.MOVE_DOUBLE_PAWN:
        unmake_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // EP_CAPTURES
      case Move_list_0x88_С.EP_CAPTURES:
        unmake_en_passant_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // MOVE PAWN PROMO  
      case Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT:
        unmake_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      //CAPTURES PAWN PROMO
      //CAPTURES_PROMO_QUEEN
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, ROOK);
        break;

      //CAPTURES_PROMO_ROOK
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, ROOK);
        break;

      //CAPTURES_PROMO_BISHOP
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, ROOK);
        break;

      // CAPTURES_PROMO_KNIGHT
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT:
        unmake_promo_captures_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, ROOK);
        break;

      default://
      // console.log("default");
    }

  }

  // возврат хода рисуем фигуру на старом месте и стираем на новом. это и просто ход.
  /**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
  const unmake_simple_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    // записываем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом  месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR];

    // стираем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] = PIECE_NO;// 0

    // стираем цвет фигуры на новом месте 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] = BLACK;// 0
  }


  // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
  /**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O
* @param {number} captures_piece  
* @returns {void}
*/    
  const unmake_captures_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O, captures_piece) {

    // записываем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом  месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR];

    // востанавливаем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] = captures_piece;//

    // востанавливаем цвет фигуры на новом месте цвет взятой фигуры противоположен цвету берущей
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] = 1 -
      chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];//
  }


  // возврат короткой рокировки
   /**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O  
* @returns {void}
*/     
  const unmake_king_castle_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    //   move_list_0x88_O.test_print_i_move_list(move_i, chess_board_0x88);
    //   console.log("sq_piece from " + chess_board_0x88[move_list_0x88_O.from[move_i]]);
    //   console.log("sq_piece to " + chess_board_0x88[move_list_0x88_O.to[move_i]]);

    // перемещаем назад короля. его ход прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR];

    // стираем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] = PIECE_NO;// 0

    // стираем цвет фигуры на новом месте 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] = BLACK;// 0

    // if (move_list_0x88_O.piece_color != chess_board_0x88[move_list_0x88_O.from[move_i]]) {
    //   console.log("ЦВЕТА НЕ СОВПАДАЮТ!----------------------------------");
    //   console.log("piece_color " + move_list_0x88_O.piece_color);
    //   console.log("sq_piece_color " + chess_board_0x88[move_list_0x88_O.from[move_i]]);
    //   console.log("sq_piece " + chess_board_0x88[move_list_0x88_O.from[move_i]]);
    // }

    if (move_list_0x88_O.piece_color == 1) {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на старом месте
      chess_board_0x88[H1] = chess_board_0x88[F1];

      // записываем цвет фигуры на старом месте 
      chess_board_0x88[H1 + SHIFT_COLOR] =
        chess_board_0x88[F1 + SHIFT_COLOR];

      // стираем имя фигуры на новом месте
      chess_board_0x88[F1] = PIECE_NO;//

      // стираем цвет фигуры на новом месте 
      chess_board_0x88[F1 + SHIFT_COLOR] = BLACK;//

    } else {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на старом месте
      chess_board_0x88[H8] = chess_board_0x88[F8 ];

      // записываем цвет фигуры на старом месте 
      chess_board_0x88[H8 + SHIFT_COLOR] =
        chess_board_0x88[F8 + SHIFT_COLOR];

      // стираем имя фигуры на новом месте
      chess_board_0x88[F8] = PIECE_NO;// 0

      // стираем цвет фигуры на новом месте 
      chess_board_0x88[F8 + SHIFT_COLOR] = BLACK;// 0   
    }
  }

  // возврат длинной рокировки
   /**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O 
* @returns {void}
*/     
  const unmake_king_queen_castle_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    // перемещаем назад короля. его ход прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR];

    // стираем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] = PIECE_NO;// 0

    // стираем цвет фигуры на новом месте 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] = BLACK;// 0

    if (move_list_0x88_O.piece_color == 1) {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на старом месте
      chess_board_0x88[A1] = chess_board_0x88[D1];

      // записываем цвет фигуры на старом месте 
      chess_board_0x88[A1 + SHIFT_COLOR] =
        chess_board_0x88[D1 + SHIFT_COLOR];

      // стираем имя фигуры на новом месте
      chess_board_0x88[D1] = PIECE_NO;// 0

      // стираем цвет фигуры на новом месте 
      chess_board_0x88[D1 + SHIFT_COLOR] = BLACK;// 0

    } else {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на старом месте
      chess_board_0x88[A8] = chess_board_0x88[D8];

      // записываем цвет фигуры на старом месте 
      chess_board_0x88[A8 + SHIFT_COLOR] =
        chess_board_0x88[D8 + SHIFT_COLOR];

      // стираем имя фигуры на новом месте
      chess_board_0x88[D8] = PIECE_NO;// 0

      // стираем цвет фигуры на новом месте 
      chess_board_0x88[D8 + SHIFT_COLOR] = BLACK;// 0   

    }// 

  }

  // остались пешки
  // возврат взятия на проходе 
  /**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O 
* @returns {void}
*/      
  const unmake_en_passant_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    // записываем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR];

    // стираем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] = PIECE_NO;//

    // стираем цвет фигуры на новом месте 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] = BLACK;//

    if (move_list_0x88_O.piece_color == 1) {
      // востанавливаем имя битой на проходе пешки
      chess_board_0x88[move_list_0x88_O.to[move_i] + 16] = PAWN;//
      // востанавливаем цвет битой на проходе пешки 
      chess_board_0x88[move_list_0x88_O.to[move_i] + 16 + SHIFT_COLOR] =
        1 - chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];//
    } else {
      chess_board_0x88[move_list_0x88_O.to[move_i] - 16] = PAWN;//
      chess_board_0x88[move_list_0x88_O.to[move_i] - 16 + SHIFT_COLOR] =
        1 - chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];//
    }
  }

  //возврат простого хода превращения
  /**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O 
* @returns {void}
*/      
  const unmake_promo_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    // записываем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] = PAWN;

    // записываем цвет фигуры на старом месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR];

    // стираем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] = PIECE_NO;// 0

    // стираем цвет фигуры на новом месте 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] = BLACK;// 0
  }

  //возврат  хода превращения со взятием
   /**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O
* @param {number} captures_piece  
* @returns {void}
*/     
  const unmake_promo_captures_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O, captures_piece) {

    // записываем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] = PAWN;

    // записываем цвет фигуры на старом месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR];

    // записываем имя взятой фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] = captures_piece;//

    // записываем цвет взятой фигуры на новом месте. цвет противоположен цвету берущей фигуры 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] =
      1 - chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];// 0
  }

export { undo_moves };