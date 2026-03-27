// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name unmake_move_0x88.js
 * @version created 24.01m.2026 
*/

import {
    LENGTH_LIST_ML, IND_PIESE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    IND_PROMO_QUEEN_ML, IND_PROMO_ROOK_ML, IND_PROMO_BISHOP_ML, IND_PROMO_KNIGHT_ML,
    MOVE_NO_ML, CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML, CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML, CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML, CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML, CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML, CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML, CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML, CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML, MOVE_PAWN_PROMO_QUEEN_ML, MOVE_PAWN_PROMO_ROOK_ML, MOVE_PAWN_PROMO_BISHOP_ML,
    MOVE_PAWN_PROMO_KNIGHT_ML, CAPTURES_PAWN_QUEEN_ML, CAPTURES_PAWN_ROOK_ML, CAPTURES_PAWN_BISHOP_ML, CAPTURES_PAWN_KNIGHT_ML,
    CAPTURES_KNIGHT_QUEEN_ML, CAPTURES_KNIGHT_ROOK_ML, CAPTURES_BISHOP_QUEEN_ML, CAPTURES_BISHOP_ROOK_ML, CAPTURES_ROOK_QUEEN_ML,
    CAPTURES_KNIGHT_BISHOP_ML, CAPTURES_KNIGHT_KNIGHT_ML, CAPTURES_BISHOP_BISHOP_ML, CAPTURES_BISHOP_KNIGHT_ML, CAPTURES_ROOK_ROOK_ML,
    CAPTURES_QUEEN_QUEEN_ML, CAPTURES_ROOK_BISHOP_ML, CAPTURES_ROOK_KNIGHT_ML, CAPTURES_QUEEN_ROOK_ML, CAPTURES_QUEEN_BISHOP_ML,
    CAPTURES_QUEEN_KNIGHT_ML, CAPTURES_KING_QUEEN_ML, CAPTURES_KING_ROOK_ML, CAPTURES_KING_BISHOP_ML, CAPTURES_KING_KNIGHT_ML,
    CAPTURES_PAWN_PAWN_ML, EP_CAPTURES_ML, CAPTURES_KNIGHT_PAWN_ML, CAPTURES_BISHOP_PAWN_ML, CAPTURES_ROOK_PAWN_ML,
    CAPTURES_QUEEN_PAWN_ML, CAPTURES_KING_PAWN_ML, MOVE_QUEEN_ML, MOVE_ROOK_ML, MOVE_BISHOP_ML, MOVE_KNIGHT_ML, MOVE_KING_ML, MOVE_PAWN_ML,
    MOVE_DOUBLE_PAWN_ML, MOVE_KING_CASTLE_ML, MOVE_KING_QUEEN_CASTLE_ML, TYPE_MOVE_NAME_ML
} from "./move_list_0x88.js";

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

import {     
  generated_pseudo_legal_quiet_moves_mgq, generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq,
  A1_MGQ, B1_MGQ, C1_MGQ , D1_MGQ, E1_MGQ, F1_MGQ, G1_MGQ, H1_MGQ, 
  A8_MGQ, B8_MGQ, C8_MGQ, D8_MGQ, E8_MGQ, F8_MGQ, G8_MGQ, H8_MGQ 
} from "../move_generator_0x88/move_generator_quiet_0x88.js";

import { get_undo } from "./undo_0x88.js";

/**
* НАЗНАЧЕНИЕ
 Отменяем сделанный ход.
*/

// возврат хода
/**
* @param {Int32Array} chess_board_0x88
* @param {BigUint64Array} chess_board_key_64
* @param {BigUint64Array} chess_board_key_64_save
* @param {Int32Array} undo
* @param {number} type_move
* @param {number} from
* @param {number} to
* @param {number} name_capture_piece
* @param {number} piece_color
* @returns {void}
*/
const undo_moves_um = function (chess_board_0x88, chess_board_key_64, chess_board_key_64_save, undo, type_move, 
  from, to, name_capture_piece, piece_color) {
  //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);

  get_undo(chess_board_0x88, undo);

  chess_board_key_64[0] = chess_board_key_64_save[0];

  // смотрим 
  switch (type_move) {

    case MOVE_NO_ML:
      break;
    ////////////////////////////////////////////////
    // простые ходы
    // MOVE
    case MOVE_KING_ML:
    case MOVE_ROOK_ML: 
    case MOVE_QUEEN_ML:
    case MOVE_BISHOP_ML:
    case MOVE_KNIGHT_ML:
    case MOVE_PAWN_ML:
      // возвращаем простой ход.
      unmake_simple_move_0x88_um(chess_board_0x88, from, to);
      break;

    ///////////////////////////////////////////////////////  
    // взятия
    // CAPTURES_KING_...
    case CAPTURES_KING_QUEEN_ML:
    case CAPTURES_KING_BISHOP_ML:
    case CAPTURES_KING_KNIGHT_ML:
    case CAPTURES_KING_PAWN_ML:

    // CAPTURES_ROOK_...
    case CAPTURES_ROOK_QUEEN_ML:
    case CAPTURES_ROOK_BISHOP_ML:
    case CAPTURES_ROOK_KNIGHT_ML:
    case CAPTURES_ROOK_PAWN_ML:

    // CAPTURES_QUEEN
    case CAPTURES_QUEEN_QUEEN_ML:
    case CAPTURES_QUEEN_BISHOP_ML:
    case CAPTURES_QUEEN_KNIGHT_ML:
    case CAPTURES_QUEEN_PAWN_ML:

    // CAPTURES_BISHOP
    case CAPTURES_BISHOP_QUEEN_ML:
    case CAPTURES_BISHOP_BISHOP_ML:
    case CAPTURES_BISHOP_KNIGHT_ML:
    case CAPTURES_BISHOP_PAWN_ML:

    // CAPTURES_KNIGHT
    case CAPTURES_KNIGHT_QUEEN_ML:
    case CAPTURES_KNIGHT_BISHOP_ML:
    case CAPTURES_KNIGHT_KNIGHT_ML:
    case CAPTURES_KNIGHT_PAWN_ML:

    // CAPTURES_PAWN
    case CAPTURES_PAWN_QUEEN_ML:
    case CAPTURES_PAWN_BISHOP_ML:
    case CAPTURES_PAWN_KNIGHT_ML:
    case CAPTURES_PAWN_PAWN_ML:

    // CAPTURES_..._ROOK   
    case CAPTURES_QUEEN_ROOK_ML:
    case CAPTURES_BISHOP_ROOK_ML:
    case CAPTURES_KNIGHT_ROOK_ML:
    case CAPTURES_PAWN_ROOK_ML:

    case CAPTURES_ROOK_ROOK_ML:
    case CAPTURES_KING_ROOK_ML:
      unmake_captures_move_0x88_um(chess_board_0x88, from, to, name_capture_piece);     
      break;

    //////////////////////////////////////////////
    // MOVE_KING_CASTLE
    case MOVE_KING_CASTLE_ML:
      unmake_king_castle_move_0x88_um(chess_board_0x88, from, to, piece_color);
      break;

    // MOVE_KING_QUEEN_CASTLE   
    case MOVE_KING_QUEEN_CASTLE_ML:
      unmake_king_queen_castle_move_0x88_um(chess_board_0x88, from, to, piece_color);
      break;

    //////////////////////////////////////////////
    // специальный ходы все про пешки 
    // MOVE_DOUBLE_PAWN       
    case MOVE_DOUBLE_PAWN_ML:
      unmake_simple_move_0x88_um(chess_board_0x88, from, to);
      break;

    // EP_CAPTURES
    case EP_CAPTURES_ML:
      unmake_en_passant_move_0x88_um(chess_board_0x88, from, to, piece_color);
      break;

    // MOVE PAWN PROMO  
    case MOVE_PAWN_PROMO_QUEEN_ML:
    case MOVE_PAWN_PROMO_ROOK_ML:
    case MOVE_PAWN_PROMO_BISHOP_ML:
    case MOVE_PAWN_PROMO_KNIGHT_ML:
      unmake_promo_move_0x88_um(chess_board_0x88, from, to, piece_color);
      break;

    //CAPTURES PAWN PROMO
    //CAPTURES_PROMO_QUEEN
    case CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML:
    case CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML:
    case CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML:
    case CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML:

    //CAPTURES_PROMO_ROOK
    case CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML:
    case CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML:
    case CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML:
    case CAPTURES_PAWN_ROOK_PROMO_ROOK_ML:

    //CAPTURES_PROMO_BISHOP
    case CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML:
    case CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML:
    case CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML:
    case CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML:

    // CAPTURES_PROMO_KNIGHT
    case CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML:
    case CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML:
    case CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML:
    case CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML:
      unmake_promo_captures_move_0x88_um(chess_board_0x88, from, to, name_capture_piece, piece_color);
      break;

    default://
    // console.log("default");
  }

}

// возврат хода рисуем фигуру на старом месте и стираем на новом. это и просто ход.
/**
 * @param {Int32Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @returns {void}
 */
const unmake_simple_move_0x88_um = function (chess_board_0x88, from, to) {

  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO_CB;// 0
}


// возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
/**
 * @param {Int32Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} captures_piece 
 * @returns {void}
 */
const unmake_captures_move_0x88_um = function (chess_board_0x88, from, to, captures_piece) {

  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // востанавливаем имя фигуры на новом месте
  chess_board_0x88[to] = captures_piece;//
}


// возврат короткой рокировки
/**
 * @param {Int32Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_king_castle_move_0x88_um = function (chess_board_0x88, from, to, piece_color) {

  // перемещаем назад короля. его ход прописан в списке ходов
  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO_CB;// 0

  if (piece_color == 1) {

    // перемещаем ладью. ее ход не прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[H1_MGQ] = chess_board_0x88[F1_MGQ];

    // стираем имя фигуры на новом месте
    chess_board_0x88[F1_MGQ] = PIECE_NO_CB;//

  } else {

    // перемещаем ладью. ее ход не прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[H8_MGQ] = chess_board_0x88[F8_MGQ];

    // стираем имя фигуры на новом месте
    chess_board_0x88[F8_MGQ] = PIECE_NO_CB;// 0

  }
}

// возврат длинной рокировки
/**
 * @param {Int32Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_king_queen_castle_move_0x88_um = function (chess_board_0x88, from, to, piece_color) {

  // перемещаем назад короля. его ход прописан в списке ходов
  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO_CB;// 0

  if (piece_color == 1) {

    // перемещаем ладью. ее ход не прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[A1_MGQ] = chess_board_0x88[D1_MGQ];

    // стираем имя фигуры на новом месте
    chess_board_0x88[D1_MGQ] = PIECE_NO_CB;// 0

  } else {

    // перемещаем ладью. ее ход не прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88[A8_MGQ] = chess_board_0x88[D8_MGQ];

    // стираем имя фигуры на новом месте
    chess_board_0x88[D8_MGQ] = PIECE_NO_CB;// 0

  }// 

}

// остались пешки
// возврат взятия на проходе 
/**
 * @param {Int32Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_en_passant_move_0x88_um = function (chess_board_0x88, from, to, piece_color) {

  // записываем имя фигуры на старом месте
  chess_board_0x88[from] =
    chess_board_0x88[to];

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO_CB;//

  if (piece_color == 1) {
    // востанавливаем имя битой на проходе пешки
    chess_board_0x88[to + 16] = B_PAWN_CB;//
  } else {
    chess_board_0x88[to - 16] = W_PAWN_CB;//
  }
}

//возврат простого хода превращения
/**
 * @param {Int32Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_promo_move_0x88_um = function (chess_board_0x88, from, to, piece_color) {

  if (piece_color == 1) {
    chess_board_0x88[from] = W_PAWN_CB;//
  } else {
    chess_board_0x88[from] = B_PAWN_CB;//
  }

  // стираем имя фигуры на новом месте
  chess_board_0x88[to] = PIECE_NO_CB;// 0

}

//возврат  хода превращения со взятием
/**
 * @param {Int32Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} captures_piece
 * @param {number} piece_color 
 * @returns {void}
 */
const unmake_promo_captures_move_0x88_um = function (chess_board_0x88, from, to, captures_piece, piece_color) {

  if (piece_color == 1) {
    chess_board_0x88[from] = W_PAWN_CB;//
  } else {
    chess_board_0x88[from] = B_PAWN_CB;//
  }

  // записываем имя взятой фигуры на новом месте
  chess_board_0x88[to] = captures_piece;//
}

export { undo_moves_um };