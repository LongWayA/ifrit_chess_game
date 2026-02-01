// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name unmake_move_0x88.js
 * @version created 24.01m.2026 
*/

import {
  MOVE_NO, CAPTURES_PAWN_QUEEN_PROMO_QUEEN, CAPTURES_PAWN_ROOK_PROMO_QUEEN, CAPTURES_PAWN_BISHOP_PROMO_QUEEN,
  CAPTURES_PAWN_KNIGHT_PROMO_QUEEN, CAPTURES_PAWN_QUEEN_PROMO_ROOK, CAPTURES_PAWN_ROOK_PROMO_ROOK,
  CAPTURES_PAWN_BISHOP_PROMO_ROOK, CAPTURES_PAWN_KNIGHT_PROMO_ROOK, CAPTURES_PAWN_QUEEN_PROMO_BISHOP,
  CAPTURES_PAWN_ROOK_PROMO_BISHOP, CAPTURES_PAWN_BISHOP_PROMO_BISHOP, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP,
  CAPTURES_PAWN_QUEEN_PROMO_KNIGHT, CAPTURES_PAWN_ROOK_PROMO_KNIGHT, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT,
  CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT, MOVE_PAWN_PROMO_QUEEN, MOVE_PAWN_PROMO_ROOK, MOVE_PAWN_PROMO_BISHOP,
  MOVE_PAWN_PROMO_KNIGHT, CAPTURES_PAWN_QUEEN, CAPTURES_PAWN_ROOK, CAPTURES_PAWN_BISHOP, CAPTURES_PAWN_KNIGHT,
  CAPTURES_KNIGHT_QUEEN, CAPTURES_KNIGHT_ROOK, CAPTURES_BISHOP_QUEEN, CAPTURES_BISHOP_ROOK, CAPTURES_ROOK_QUEEN,
  CAPTURES_KNIGHT_BISHOP, CAPTURES_KNIGHT_KNIGHT, CAPTURES_BISHOP_BISHOP, CAPTURES_BISHOP_KNIGHT, CAPTURES_ROOK_ROOK,
  CAPTURES_QUEEN_QUEEN, CAPTURES_ROOK_BISHOP, CAPTURES_ROOK_KNIGHT, CAPTURES_QUEEN_ROOK, CAPTURES_QUEEN_BISHOP,
  CAPTURES_QUEEN_KNIGHT, CAPTURES_KING_QUEEN, CAPTURES_KING_ROOK, CAPTURES_KING_BISHOP, CAPTURES_KING_KNIGHT,
  CAPTURES_PAWN_PAWN, EP_CAPTURES, CAPTURES_KNIGHT_PAWN, CAPTURES_BISHOP_PAWN, CAPTURES_ROOK_PAWN,
  CAPTURES_QUEEN_PAWN, CAPTURES_KING_PAWN, MOVE_QUEEN, MOVE_ROOK, MOVE_BISHOP, MOVE_KNIGHT, MOVE_KING, MOVE_PAWN,
  MOVE_DOUBLE_PAWN, MOVE_KING_CASTLE, MOVE_KING_QUEEN_CASTLE
} from "./move_list_new.js";

import {
  PIECE_NO, W_PAWN, W_ROOK, B_PAWN,
} from "./chess_board_new.js";

import {
  H1, H8, A1, A8, F1, F8, D1, D8
} from "./move_generator_captures_new.js";

import { get_undo } from "../move_generator/undo_new.js";

/**
* НАЗНАЧЕНИЕ
 Отменяем сделанный ход.
*/

// возврат хода
/**
* @param {Uint8Array} chess_board_0x88
* @param {Uint8Array} undo
* @param {number} type_move
* @param {number} from
* @param {number} to
* @param {number} name_capture_piece
* @param {number} piece_color
* @returns {void}
*/
const undo_moves_um = function (chess_board_0x88, undo, type_move, from, to, name_capture_piece, piece_color) {
  //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);

  get_undo(chess_board_0x88, undo);

  // смотрим 
  switch (type_move) {

    case MOVE_NO:
      break;
    ////////////////////////////////////////////////
    // простые ходы
    // MOVE
    case MOVE_KING:
    case MOVE_ROOK: 
    case MOVE_QUEEN:
    case MOVE_BISHOP:
    case MOVE_KNIGHT:
    case MOVE_PAWN:
      // возвращаем простой ход.
      unmake_simple_move_0x88(chess_board_0x88, from, to);
      break;

    ///////////////////////////////////////////////////////  
    // взятия
    // CAPTURES_KING_...
    case CAPTURES_KING_QUEEN:
    case CAPTURES_KING_BISHOP:
    case CAPTURES_KING_KNIGHT:
    case CAPTURES_KING_PAWN:

    // CAPTURES_ROOK_...
    case CAPTURES_ROOK_QUEEN:
    case CAPTURES_ROOK_BISHOP:
    case CAPTURES_ROOK_KNIGHT:
    case CAPTURES_ROOK_PAWN:

    // CAPTURES_QUEEN
    case CAPTURES_QUEEN_QUEEN:
    case CAPTURES_QUEEN_BISHOP:
    case CAPTURES_QUEEN_KNIGHT:
    case CAPTURES_QUEEN_PAWN:

    // CAPTURES_BISHOP
    case CAPTURES_BISHOP_QUEEN:
    case CAPTURES_BISHOP_BISHOP:
    case CAPTURES_BISHOP_KNIGHT:
    case CAPTURES_BISHOP_PAWN:

    // CAPTURES_KNIGHT
    case CAPTURES_KNIGHT_QUEEN:
    case CAPTURES_KNIGHT_BISHOP:
    case CAPTURES_KNIGHT_KNIGHT:
    case CAPTURES_KNIGHT_PAWN:

    // CAPTURES_PAWN
    case CAPTURES_PAWN_QUEEN:
    case CAPTURES_PAWN_BISHOP:
    case CAPTURES_PAWN_KNIGHT:
    case CAPTURES_PAWN_PAWN:

    // CAPTURES_..._ROOK   
    case CAPTURES_QUEEN_ROOK:
    case CAPTURES_BISHOP_ROOK:
    case CAPTURES_KNIGHT_ROOK:
    case CAPTURES_PAWN_ROOK:

    case CAPTURES_ROOK_ROOK:
    case CAPTURES_KING_ROOK:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);     
      break;

    //////////////////////////////////////////////
    // MOVE_KING_CASTLE
    case MOVE_KING_CASTLE:
      unmake_king_castle_move_0x88(chess_board_0x88, from, to, piece_color);
      break;

    // MOVE_KING_QUEEN_CASTLE   
    case MOVE_KING_QUEEN_CASTLE:
      unmake_king_queen_castle_move_0x88(chess_board_0x88, from, to, piece_color);
      break;

    //////////////////////////////////////////////
    // специальный ходы все про пешки 
    // MOVE_DOUBLE_PAWN       
    case MOVE_DOUBLE_PAWN:
      unmake_simple_move_0x88(chess_board_0x88, from, to);
      break;

    // EP_CAPTURES
    case EP_CAPTURES:
      unmake_en_passant_move_0x88(chess_board_0x88, from, to, piece_color);
      break;

    // MOVE PAWN PROMO  
    case MOVE_PAWN_PROMO_QUEEN:
    case MOVE_PAWN_PROMO_ROOK:
    case MOVE_PAWN_PROMO_BISHOP:
    case MOVE_PAWN_PROMO_KNIGHT:
      unmake_promo_move_0x88(chess_board_0x88, from, to, piece_color);
      break;

    //CAPTURES PAWN PROMO
    //CAPTURES_PROMO_QUEEN
    case CAPTURES_PAWN_QUEEN_PROMO_QUEEN:
    case CAPTURES_PAWN_BISHOP_PROMO_QUEEN:
    case CAPTURES_PAWN_KNIGHT_PROMO_QUEEN:
    case CAPTURES_PAWN_ROOK_PROMO_QUEEN:

    //CAPTURES_PROMO_ROOK
    case CAPTURES_PAWN_QUEEN_PROMO_ROOK:
    case CAPTURES_PAWN_BISHOP_PROMO_ROOK:
    case CAPTURES_PAWN_KNIGHT_PROMO_ROOK:
    case CAPTURES_PAWN_ROOK_PROMO_ROOK:

    //CAPTURES_PROMO_BISHOP
    case CAPTURES_PAWN_QUEEN_PROMO_BISHOP:
    case CAPTURES_PAWN_BISHOP_PROMO_BISHOP:
    case CAPTURES_PAWN_KNIGHT_PROMO_BISHOP:
    case CAPTURES_PAWN_ROOK_PROMO_BISHOP:

    // CAPTURES_PROMO_KNIGHT
    case CAPTURES_PAWN_QUEEN_PROMO_KNIGHT:
    case CAPTURES_PAWN_BISHOP_PROMO_KNIGHT:
    case CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT:
    case CAPTURES_PAWN_ROOK_PROMO_KNIGHT:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);
      break;

    default://
    // console.log("default");
  }

}

// возврат хода рисуем фигуру на старом месте и стираем на новом. это и просто ход.
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @returns {void}
 */
const unmake_simple_move_0x88 = function (chess_board_0x88, from, to) {

  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO;// 0
}


// возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} captures_piece 
 * @returns {void}
 */
const unmake_captures_move_0x88 = function (chess_board_0x88, from, to, captures_piece) {

  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // востанавливаем имя фигуры на новом месте
  chess_board_0x88[to] = captures_piece;//
}


// возврат короткой рокировки
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_king_castle_move_0x88 = function (chess_board_0x88, from, to, piece_color) {

  // перемещаем назад короля. его ход прописан в списке ходов
  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO;// 0

  if (piece_color == 1) {

    // перемещаем ладью. ее ход не прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[H1] = chess_board_0x88[F1];

    // стираем имя фигуры на новом месте
    chess_board_0x88[F1] = PIECE_NO;//

  } else {

    // перемещаем ладью. ее ход не прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[H8] = chess_board_0x88[F8];

    // стираем имя фигуры на новом месте
    chess_board_0x88[F8] = PIECE_NO;// 0

  }
}

// возврат длинной рокировки
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_king_queen_castle_move_0x88 = function (chess_board_0x88, from, to, piece_color) {

  // перемещаем назад короля. его ход прописан в списке ходов
  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO;// 0

  if (piece_color == 1) {

    // перемещаем ладью. ее ход не прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[A1] = chess_board_0x88[D1];

    // стираем имя фигуры на новом месте
    chess_board_0x88[D1] = PIECE_NO;// 0

  } else {

    // перемещаем ладью. ее ход не прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[A8] = chess_board_0x88[D8];

    // стираем имя фигуры на новом месте
    chess_board_0x88[D8] = PIECE_NO;// 0

  }// 

}

// остались пешки
// возврат взятия на проходе 
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_en_passant_move_0x88 = function (chess_board_0x88, from, to, piece_color) {

  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO;//

  if (piece_color == 1) {
    // востанавливаем имя битой на проходе пешки
    chess_board_0x88[to + 16] = B_PAWN;//
  } else {
    chess_board_0x88[to - 16] = W_PAWN;//
  }
}

//возврат простого хода превращения
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_promo_move_0x88 = function (chess_board_0x88, from, to, piece_color) {

  if (piece_color == 1) {
    chess_board_0x88[from] = W_PAWN;//
  } else {
    chess_board_0x88[from] = B_PAWN;//
  }

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO;// 0

}

//возврат  хода превращения со взятием
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} captures_piece
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_promo_captures_move_0x88 = function (chess_board_0x88, from, to, captures_piece, piece_color) {

  if (piece_color == 1) {
    chess_board_0x88[from] = W_PAWN;//
  } else {
    chess_board_0x88[from] = B_PAWN;//
  }

  // записываем имя взятой фигуры на новом месте
  chess_board_0x88[to] = captures_piece;//
}

export { undo_moves_um };