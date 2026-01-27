// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name unmake_move_0x88.js
 * @version created 24.01m.2026 
*/

import {
  clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
  sorting_list, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
  return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
  return_piece_name_captures_from_type_move, type_move_to_name_piese, type_move_to_name_piese_f,
  return_promo_piece_from_type_move,
  LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_CAPTURES_MOVE, IND_NUMBER_MOVE,
  IND_PROMO_QUEEN, IND_PROMO_ROOK, IND_PROMO_BISHOP, IND_PROMO_KNIGHT,
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
  x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
  save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
  IND_MAX, SIDE_TO_MOVE, LET_COOR,
  BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK
} from "./chess_board_new.js";

import {
  check_detected,
  H1, H8, A1, A8, E1, E8, F1, F8, G1, G8, D1, D8, C1, C8
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
const undo_moves = function (chess_board_0x88, undo, type_move, from, to, name_capture_piece, piece_color) {
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
    //  break;
    case MOVE_ROOK:
    //  break;  
    case MOVE_QUEEN:
    //  break;
    case MOVE_BISHOP:
    //  break;
    case MOVE_KNIGHT:
    //  break;
    case MOVE_PAWN:
      // возвращаем простой ход.
      unmake_simple_move_0x88(chess_board_0x88, from, to);
      break;

    ///////////////////////////////////////////////////////  
    // взятия
    // CAPTURES_KING_...
    case CAPTURES_KING_QUEEN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);
      break;
    case CAPTURES_KING_BISHOP:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);      
      break;
    case CAPTURES_KING_KNIGHT:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece); 
      break;
    case CAPTURES_KING_PAWN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);     
      break;

    // CAPTURES_ROOK_...
    case CAPTURES_ROOK_QUEEN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);    
      break;
    case CAPTURES_ROOK_BISHOP:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);    
      break;
    case CAPTURES_ROOK_KNIGHT:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);  
      break;
    case CAPTURES_ROOK_PAWN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);  
      break;

    // CAPTURES_QUEEN
    case CAPTURES_QUEEN_QUEEN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);   
      break;
    case CAPTURES_QUEEN_BISHOP:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece); 
      break;
    case CAPTURES_QUEEN_KNIGHT:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);   
      break;
    case CAPTURES_QUEEN_PAWN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece); 
      break;

    // CAPTURES_BISHOP
    case CAPTURES_BISHOP_QUEEN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);   
      break;
    case CAPTURES_BISHOP_BISHOP:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);   
      break;
    case CAPTURES_BISHOP_KNIGHT:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);   
      break;
    case CAPTURES_BISHOP_PAWN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);
      break;

    // CAPTURES_KNIGHT
    case CAPTURES_KNIGHT_QUEEN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);  
      break;
    case CAPTURES_KNIGHT_BISHOP:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece); 
      break;
    case CAPTURES_KNIGHT_KNIGHT:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece); 
      break;
    case CAPTURES_KNIGHT_PAWN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);  
      break;

    // CAPTURES_PAWN
    case CAPTURES_PAWN_QUEEN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);  
      break;
    case CAPTURES_PAWN_BISHOP:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);  
      break;
    case CAPTURES_PAWN_KNIGHT:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);   
      break;
    case CAPTURES_PAWN_PAWN:
      unmake_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece);  
      break;

    // CAPTURES_..._ROOK   
    case CAPTURES_QUEEN_ROOK:
    //break;
    case CAPTURES_BISHOP_ROOK:
    //break;
    case CAPTURES_KNIGHT_ROOK:
    //break;
    case CAPTURES_PAWN_ROOK:
    //break;

    // тут особый случай ладья берет ладью. отменяем рокировки с участием обеих фигур. 
    case CAPTURES_ROOK_ROOK:
    //break;
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
    //break;
    case MOVE_PAWN_PROMO_ROOK:
    //break;
    case MOVE_PAWN_PROMO_BISHOP:
    //break;
    case MOVE_PAWN_PROMO_KNIGHT:
      unmake_promo_move_0x88(chess_board_0x88, from, to, piece_color);
      break;

    //CAPTURES PAWN PROMO
    //CAPTURES_PROMO_QUEEN
    case CAPTURES_PAWN_QUEEN_PROMO_QUEEN:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);
      break;
    case CAPTURES_PAWN_BISHOP_PROMO_QUEEN:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color); 
      break;
    case CAPTURES_PAWN_KNIGHT_PROMO_QUEEN:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);   
      break;
    case CAPTURES_PAWN_ROOK_PROMO_QUEEN:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);    
      break;

    //CAPTURES_PROMO_ROOK
    case CAPTURES_PAWN_QUEEN_PROMO_ROOK:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);    
      break;
    case CAPTURES_PAWN_BISHOP_PROMO_ROOK:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);  
      break;
    case CAPTURES_PAWN_KNIGHT_PROMO_ROOK:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);
      break;
    case CAPTURES_PAWN_ROOK_PROMO_ROOK:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);   
      break;

    //CAPTURES_PROMO_BISHOP
    case CAPTURES_PAWN_QUEEN_PROMO_BISHOP:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);   
      break;
    case CAPTURES_PAWN_BISHOP_PROMO_BISHOP:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);  
      break;
    case CAPTURES_PAWN_KNIGHT_PROMO_BISHOP:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color); 
      break;
    case CAPTURES_PAWN_ROOK_PROMO_BISHOP:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, W_ROOK, piece_color);   
      break;

    // CAPTURES_PROMO_KNIGHT
    case CAPTURES_PAWN_QUEEN_PROMO_KNIGHT:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);  
      break;
    case CAPTURES_PAWN_BISHOP_PROMO_KNIGHT:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color); 
      break;
    case CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT:
      unmake_promo_captures_move_0x88(chess_board_0x88, from, to, name_capture_piece, piece_color);
      break;
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

  //   packing_moves.test_print_i_move_list(move_i, chess_board_0x88);
  //   console.log("sq_piece from " + chess_board_0x88[from]);
  //   console.log("sq_piece to " + chess_board_0x88[to]);

  // перемещаем назад короля. его ход прописан в списке ходов
  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO;// 0

  // if (piece_color != chess_board_0x88[from]) {
  //   console.log("ЦВЕТА НЕ СОВПАДАЮТ!----------------------------------");
  //   console.log("piece_color " + piece_color);
  //   console.log("sq_piece_color " + chess_board_0x88[from]);
  //   console.log("sq_piece " + chess_board_0x88[from]);
  // }

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

export { undo_moves };