// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name quiescence_search_0x88.js
 * @version created 31.01m.2026 
*/

import {
  x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
  save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
  IND_MAX, SIDE_TO_MOVE, LET_COOR,
  BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK
} from "../move_generator/chess_board_new.js";

import {
  clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
  sorting_list_ml, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
  return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
  type_move_to_name_piese, type_move_to_name_piese_f, return_promo_piece_from_type_move,
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
  MOVE_DOUBLE_PAWN, MOVE_KING_CASTLE, MOVE_KING_QUEEN_CASTLE, TYPE_MOVE_NAME
} from "../move_generator/move_list_new.js";

import {
  clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV, IND_DEPTH_PV
} from "../move_generator/pv_line_new.js";

import {
  generated_pseudo_legal_captures, check_detected,
  H1, H8, A1, A8, E1, E8, F1, F8, G1, G8, D1, D8, C1, C8
} from "../move_generator/move_generator_captures_new.js";

import { generated_pseudo_legal_quiet_moves } from "../move_generator/move_generator_quiet_new.js";

import { do_moves_mm } from "../move_generator/make_move_new.js";
import { undo_moves_um } from "../move_generator/unmake_move_new.js";

import { UNDO_MAX } from "../move_generator/undo_new.js";

import { score_position } from "./evaluate_new.js";

/**
* НАЗНАЧЕНИЕ

*/


let node_qs = 0;



/**
* @param {number} alpha
* @param {number} beta
* @param {Uint8Array} chess_board_0x88
* @param {BigUint64Array} chess_board_key_64
* @param {number} depth
 
* @returns {number}
*  
 
  */

const quiescence_search = function (alpha, beta, chess_board_0x88, chess_board_key_64, depth) {

  let packing_moves = new Uint32Array(LENGTH_LIST).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32
  let undo = new Uint8Array(UNDO_MAX).fill(0);// для отмены хода

  const chess_board_key_64_undo = new BigUint64Array(1);

  let score = 0;// текущая оценка позиции
  let best_value;// максимальная оценка позиции

  let is_moove_legal = -1;

  let type_move;// тип хода
  let from;// откуда ход
  let to;// куда ход
  let name_capture_piece;// имя взятой фигуры
  let piece_color;// цвет хода

  let static_eval = score_position(chess_board_0x88, chess_board_key_64);
  node_qs = node_qs + 1;

  // Stand Pat =====================================
  best_value = static_eval;

  if (chess_board_0x88[SIDE_TO_MOVE] == WHITE) {
    if (best_value >= beta) return best_value;
    if (best_value > alpha) alpha = best_value;
  } else {
    if (best_value <= alpha) return best_value;
    if (best_value < beta) alpha = best_value;
  }
  // ===================================== Stand Pat
  //clear_list(packing_moves);
  generated_pseudo_legal_captures(chess_board_0x88, packing_moves);

  if (packing_moves[IND_NUMBER_MOVE] == 0) {
    //console.log("quiescence_search-> moves = 0 depth " + depth);
    return best_value;
  }

  sorting_list_ml(packing_moves);

  //console.log("quiescence_search-> moves = " + packing_moves[IND_NUMBER_MOVE] + " depth " + depth);

  for (let move_i = 0; move_i < packing_moves[IND_NUMBER_MOVE]; move_i++) {

    type_move = get_type_move(move_i, packing_moves);// тип хода
    from = get_from(move_i, packing_moves);
    to = get_to(move_i, packing_moves);
    name_capture_piece = get_name_capture_piece(move_i, packing_moves);
    piece_color = packing_moves[IND_PIESE_COLOR];

    // TEST 
    // if ((type_move == MOVE_NO) || (type_move < MOVE_NO) || (type_move > MOVE_KING_QUEEN_CASTLE)) {
    //   console.log("quiescence_search-> type_move !!!! depth " + depth + " type_move " + type_move);
    //   console.log("quiescence_search-> depth " + depth + " packing_moves[" + move_i + "] = " + packing_moves[move_i]);

    //   //test_print_piese_0x88(chess_board_0x88);
    //   //test_print_any_0x88(chess_board_0x88);
    // }
    // if (name_capture_piece == 0) {
    //   console.log("quiescence_search-> name_capture_piece == 0 depth " + depth);
    // }

    // if (from == to) {
    //   console.log("quiescence_search-> from == to depth " + depth + " type_move " + type_move + " from " + from);
    // }


    is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, piece_color);

    if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
      undo_moves_um(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, name_capture_piece, piece_color);
      continue;
    } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
      continue;
    }

    score = quiescence_search(alpha, beta, chess_board_0x88, chess_board_key_64, (depth + 1));

    if (packing_moves[IND_PIESE_COLOR] == WHITE) {
      if (score >= beta) {
        undo_moves_um(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, name_capture_piece, piece_color);
        return score;
      }
      if (score > best_value) best_value = score;
      if (score > alpha) alpha = score;
    } else {

      if (score <= alpha) {
        undo_moves_um(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, name_capture_piece, piece_color);
        return score;
      }
      if (score < best_value) best_value = score;
      if (score < beta) alpha = score;
    }

    undo_moves_um(chess_board_0x88, chess_board_key_64, chess_board_key_64_undo, undo, type_move, from, to, name_capture_piece, piece_color);
  }

  return best_value;
}

export { quiescence_search };

/*
https://www.chessprogramming.org/Quiescence_Search

int Quiesce( int alpha, int beta ) {
    int static_eval = Evaluate();

    // Stand Pat
    int best_value = static_eval;
    if( best_value >= beta )
        return best_value;
    if( best_value > alpha )
        alpha = best_value;

    until( every_capture_has_been_examined )  {
        MakeCapture();
        score = -Quiesce( -beta, -alpha );
        TakeBackMove();

        if( score >= beta )
            return score;
        if( score > best_value )
            best_value = score;
        if( score > alpha )
            alpha = score;
    }

    return best_value;
}


*/