// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name make_move_0x88.js
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
    generated_pseudo_legal_captures_mgc, generated_pseudo_legal_captures_one_piece_for_gui_mgc, check_detected_mgc
} from "./move_generator_captures_0x88.js";

import {     
  generated_pseudo_legal_quiet_moves_mgq, generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq,
  A1_MGQ, B1_MGQ, C1_MGQ , D1_MGQ, E1_MGQ, F1_MGQ, G1_MGQ, H1_MGQ, 
  A8_MGQ, B8_MGQ, C8_MGQ, D8_MGQ, E8_MGQ, F8_MGQ, G8_MGQ, H8_MGQ 
} from "../move_generator_0x88/move_generator_quiet_0x88.js";

import { set_undo } from "./undo_0x88.js";

import {
  ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
  key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
  key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep2_0x88_tk, key_update_QqKk_0x88_tk
} from "../for_sorting_move/transposition_key_0x88.js";


/**
* НАЗНАЧЕНИЕ
 как нибудь надо добавить отслеживание короля
 чтобы не искать его после каждого хода

если в результате хода король под шахом то is_moove_legal = 0  
если сделать рокировку не смогли из за битых полей то is_moove_legal = 2
если ход прошел то is_moove_legal = 1

*/


// делаем ход на доске chess_board_0x88
/**
* @param {Int32Array} chess_board_0x88
* @param {BigUint64Array} chess_board_key_64
* @param {BigUint64Array} chess_board_key_64_save
* @param {Int32Array} undo
* @param {number} type_move
* @param {number} from
* @param {number} to
* @param {number} piece_color
* @returns {number}
*/
const do_moves_mm = function (chess_board_0x88, chess_board_key_64, chess_board_key_64_save, undo, type_move, from, to, piece_color) {
  //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);
  let is_moove_legal = 1;// по умолчанию ход считаем легальным.
  set_undo(undo, chess_board_0x88);// заполняем вспогательную структуру для возврата хода

  chess_board_key_64_save[0] = chess_board_key_64[0];

  // смотрим 
  switch (type_move) {

    case MOVE_NO_ML:

      is_moove_legal = 2;
      break;
    // взятие на проходе обнуляю вообще везде, кроме регистрации при двойном ходе пешки. как по другому пока не знаю

    ///////////////////////////////////////////////////////      
    // простые ходы
    // MOVE
    // ходит король. обнуляем связанные с ним рокировки
    case MOVE_KING_ML:

      if (piece_color == 1) {
        chess_board_0x88[IND_KING_FROM_WHITE_CB] = to;
        //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88.king_from_white);
      } else {
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = to;
        //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88.king_from_white);
      }

      // делаем простой ход. он одинаковый для всех фигур
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);

      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      // если король ходил то отменяем зависимые рокировки
      stop_king_castle_move_king_0x88_mm(chess_board_0x88, chess_board_key_64, from);
      break;

    // ходит ладья. обнуляем все связанные с ней рокировки  
    case MOVE_ROOK_ML:
      // делаем простой ход. он одинаковый для всех фигур
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      // если ладья ходила то отменяем зависимые рокировки
      stop_king_castle_move_rook_0x88_mm(chess_board_0x88, chess_board_key_64, from);
      break;

    // эти ходы не влияют на рокировку или превращения  
    case MOVE_QUEEN_ML:
    //  break;
    case MOVE_BISHOP_ML:
    //  break;
    case MOVE_KNIGHT_ML:
    //  break;
    case MOVE_PAWN_ML:
      // делаем простой ход. он одинаковый для всех фигур
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);
      // обнуляем взятие на проходе.
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;

    ///////////////////////////////////////////////////////  
    // взятия
    // CAPTURES_KING_...
    // взятия королем, отменяем все связанные с ним рокировки
    case CAPTURES_KING_QUEEN_ML:
    //break;        
    case CAPTURES_KING_BISHOP_ML:
    //break;
    case CAPTURES_KING_KNIGHT_ML:
    //break;
    case CAPTURES_KING_PAWN_ML:

      if (piece_color == 1) {
        chess_board_0x88[IND_KING_FROM_WHITE_CB] = to;
      } else {
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = to;
      }
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      // если король ходил то отменяем зависимые рокировки
      stop_king_castle_move_king_0x88_mm(chess_board_0x88, chess_board_key_64, from);
      break;

    // CAPTURES_ROOK_...
    // взятия ладьей. отменяем все связанные с ней рокировки
    case CAPTURES_ROOK_QUEEN_ML:
    //break;        
    case CAPTURES_ROOK_BISHOP_ML:
    //break;
    case CAPTURES_ROOK_KNIGHT_ML:
    //break;
    case CAPTURES_ROOK_PAWN_ML:
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      // если ладья ходила то отменяем зависимые рокировки
      stop_king_castle_move_rook_0x88_mm(chess_board_0x88, chess_board_key_64, from);
      break;

    // эти взятия не влияют на рокировку и превращения  
    // CAPTURES_QUEEN
    case CAPTURES_QUEEN_QUEEN_ML:
    //break;        
    case CAPTURES_QUEEN_BISHOP_ML:
    //break;
    case CAPTURES_QUEEN_KNIGHT_ML:
    //break;
    case CAPTURES_QUEEN_PAWN_ML:
    //break;

    // CAPTURES_BISHOP
    case CAPTURES_BISHOP_QUEEN_ML:
    //break;
    case CAPTURES_BISHOP_BISHOP_ML:
    //break;
    case CAPTURES_BISHOP_KNIGHT_ML:
    //break;
    case CAPTURES_BISHOP_PAWN_ML:
    //break;

    // CAPTURES_KNIGHT
    case CAPTURES_KNIGHT_QUEEN_ML:
    //break;
    case CAPTURES_KNIGHT_BISHOP_ML:
    //break;
    case CAPTURES_KNIGHT_KNIGHT_ML:
    //break;
    case CAPTURES_KNIGHT_PAWN_ML:
    //break;

    // CAPTURES_PAWN
    case CAPTURES_PAWN_QUEEN_ML:
    //break;
    case CAPTURES_PAWN_BISHOP_ML:
    //break;
    case CAPTURES_PAWN_KNIGHT_ML:
    //break;
    case CAPTURES_PAWN_PAWN_ML:
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;

    //////////////////////////////////////////////
    // взятия ладьи. отменяем рокировку с участием взятой ладьи  
    // CAPTURES_..._ROOK   
    case CAPTURES_QUEEN_ROOK_ML:
    //break;
    case CAPTURES_BISHOP_ROOK_ML:
    //break;
    case CAPTURES_KNIGHT_ROOK_ML:
    //break;
    case CAPTURES_PAWN_ROOK_ML:
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      stop_king_castle_captures_rook_0x88_mm(chess_board_0x88, chess_board_key_64, to);
      break;

    // тут особый случай ладья берет ладью. отменяем рокировки с участием обеих фигур. 
    case CAPTURES_ROOK_ROOK_ML:
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      stop_king_castle_captures_rook_0x88_mm(chess_board_0x88, chess_board_key_64, to);
      // если ладья ходила то отменяем зависимые рокировки
      stop_king_castle_move_rook_0x88_mm(chess_board_0x88, chess_board_key_64, from);
      break;

    // еще один особый случай. ладью берет король. отменяем рокировки и для ладьи и для короля. 
    // хотя если король добежал до вражеской ладьи то наверное у него уже нет рокировок но вдруг 
    // ладья сама пришла к королю тогда это у нее уже нет рокировок. как все запутано :))
    case CAPTURES_KING_ROOK_ML:
      if (piece_color == 1) {
        chess_board_0x88[IND_KING_FROM_WHITE_CB] = to;
      } else {
        chess_board_0x88[IND_KING_FROM_BLACK_CB] = to;
      }

      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      stop_king_castle_captures_rook_0x88_mm(chess_board_0x88, chess_board_key_64, to);
      // если король ходил то отменяем зависимые рокировки
      stop_king_castle_move_king_0x88_mm(chess_board_0x88, chess_board_key_64, from);
      break;

    //////////////////////////////////////////////
    // специальные ходы рокировки. отмена рокировки прописана внутри функций
    // MOVE_KING_CASTLE
    case MOVE_KING_CASTLE_ML:
      is_moove_legal = make_king_castle_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, piece_color);
      // разрешение взятия на проходе 1/0
      if (is_moove_legal != 2) {
        if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          key_update_ep_0x88_tk(chess_board_key_64);
        }
      }

      if (is_moove_legal != 2) {

        if (piece_color == 1) {
          chess_board_0x88[IND_KING_FROM_WHITE_CB] = to;
        } else {
          chess_board_0x88[IND_KING_FROM_BLACK_CB] = to;
        }
      }

      break;

    // MOVE_KING_QUEEN_CASTLE   
    case MOVE_KING_QUEEN_CASTLE_ML:

      is_moove_legal = make_king_queen_castle_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, piece_color);
      if (is_moove_legal != 2) {
        if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          key_update_ep_0x88_tk(chess_board_key_64);
        }
      }

      if (is_moove_legal != 2) {

        if (piece_color == 1) {
          chess_board_0x88[IND_KING_FROM_WHITE_CB] = to;
        } else {
          chess_board_0x88[IND_KING_FROM_BLACK_CB] = to;
        }
      }

      break;

    //////////////////////////////////////////////
    // специальные ходы все про пешки 
    // MOVE_DOUBLE_PAWN       
    case MOVE_DOUBLE_PAWN_ML:
      make_simple_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      key_update_ep2_0x88_tk(chess_board_key_64, chess_board_0x88);

      // двойное продвижение пешки открывает возможность взятия на проходе
      if (piece_color == 1) {
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = from - 16;
      } else {
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] = from + 16;
      }
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 0) {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }

      chess_board_0x88[IND_EN_PASSANT_YES_CB] = 1;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      key_update_ep2_0x88_tk(chess_board_key_64, chess_board_0x88);
      break;

    // EP_CAPTURES
    case EP_CAPTURES_ML:
      // здесь отмена взятия на проходе есть уже в функции
      make_en_passant_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, piece_color);
      break;

    // MOVE PAWN PROMO  
    case MOVE_PAWN_PROMO_QUEEN_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_QUEEN_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_QUEEN_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;
    case MOVE_PAWN_PROMO_ROOK_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_ROOK_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_ROOK_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;
    case MOVE_PAWN_PROMO_BISHOP_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_BISHOP_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_BISHOP_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {

        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
      }
      break;
    case MOVE_PAWN_PROMO_KNIGHT_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_KNIGHT_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_KNIGHT_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;

    //CAPTURES PAWN PROMO
    //CAPTURES_PROMO_QUEEN
    case CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML:
    //break;
    case CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML:
    //break;
    case CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_QUEEN_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_QUEEN_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;

    // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей  
    case CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_QUEEN_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_QUEEN_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      stop_king_castle_captures_rook_0x88_mm(chess_board_0x88, chess_board_key_64, to);
      break;

    //CAPTURES_PROMO_ROOK
    case CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML:
    //break;
    case CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML:
    //break;
    case CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_ROOK_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_ROOK_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;

    // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей         
    case CAPTURES_PAWN_ROOK_PROMO_ROOK_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_ROOK_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_ROOK_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      stop_king_castle_captures_rook_0x88_mm(chess_board_0x88, chess_board_key_64, to);
      break;

    //CAPTURES_PROMO_BISHOP
    case CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML:
    //break;
    case CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML:
    //break;
    case CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_BISHOP_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_BISHOP_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;

    // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей.         
    case CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_BISHOP_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_BISHOP_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      stop_king_castle_captures_rook_0x88_mm(chess_board_0x88, chess_board_key_64, to);
      break;

    // CAPTURES_PROMO_KNIGHT
    case CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML:
    //break;
    case CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML:
    //break;
    case CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_KNIGHT_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_KNIGHT_CB);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      break;

    // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей.        
    case CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML:
      if (piece_color == WHITE_CB) {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, W_KNIGHT_CB);
      } else {
        make_promo_move_0x88_mm(chess_board_0x88, chess_board_key_64, from, to, B_KNIGHT_CB);
      }
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        key_update_ep_0x88_tk(chess_board_key_64);
      }
      stop_king_castle_captures_rook_0x88_mm(chess_board_0x88, chess_board_key_64, to);
      break;


    default://
    // console.log("default");
  }

  // если легальность хода не обнулили выше тогда остается проверить не под шахом ли наш король 
  // легальность отменяется если рокировки не прошли т.к. поля или король под боем
  if (is_moove_legal == 1) {

    let from_king = 0;

    let piece_color_king = piece_color;

    if (piece_color == 1) {
      from_king = chess_board_0x88[IND_KING_FROM_WHITE_CB];
    } else {
      from_king = chess_board_0x88[IND_KING_FROM_BLACK_CB];
    }

    if (check_detected_mgc(from_king, piece_color_king, chess_board_0x88) != 0) {

      //console.log("check_detected " + check_detected(from_king, piece_color_king, chess_board_0x88));

      is_moove_legal = 0;
    }
  }

  // есть три случая: 
  // 1 - ход легальный. мы сделали ход и король не под шахом 
  // 2 - ход не легальный мы не сделали рокировку из за битых полей 
  // 0 - ход не легальный. мы сделали ход а король оказался или остался под шахом

  return is_moove_legal;
}

// рисуем фигуру на новом месте и стираем на старом. это и просто ход и взятие. 
/**
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} from
 * @param {number} to 
 * @returns {void}
 */
const make_simple_move_0x88_mm = function (chess_board_0x88, chess_board_key_64, from, to) {

  let piece_from = chess_board_0x88[from];
  let piece_to = chess_board_0x88[to];
  let piece_color = (piece_from > W_KING_CB) ? BLACK_CB : WHITE_CB;// цвет взятой фигуры;;

  key_update_do_move_0x88_tk(from, to, piece_from, piece_to, chess_board_key_64);


  // записываем имя фигуры на новом месте
  chess_board_0x88[to] =
    chess_board_0x88[from];

  // стираем имя фигуры на старом месте
  chess_board_0x88[from] = PIECE_NO_CB;// 0

  // цвет хода 0 - черные 1 - белые
  chess_board_0x88[SIDE_TO_MOVE_CB] = 1 - chess_board_0x88[SIDE_TO_MOVE_CB];

}

// если берется ладья на исходном месте то отменяем флаг возможности связанной с ней рокировки
/**
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64 
 * @param {number} to 
 * @returns {void}
 */
const stop_king_castle_captures_rook_0x88_mm = function (chess_board_0x88, chess_board_key_64, to) {

  if (chess_board_0x88[IND_CASTLING_K_CB] == 1) {
    // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
    if (to == H1_MGQ) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_K_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(0, 0, 1, 0, chess_board_key_64);
    }
  }

  if (chess_board_0x88[IND_CASTLING_Q_CB] == 1) {
    // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
    if (to == A1_MGQ) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_Q_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(1, 0, 0, 0, chess_board_key_64);
    }
  }

  if (chess_board_0x88[IND_CASTLING_k_CB] == 1) {
    // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
    if (to == H8_MGQ) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_k_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(0, 0, 0, 1, chess_board_key_64);

    }
  }

  if (chess_board_0x88[IND_CASTLING_q_CB] == 1) {
    // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
    if (to == A8_MGQ) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_q_CB] = 0;
      // Q, q, K, k,  
      key_update_QqKk_0x88_tk(0, 1, 0, 0, chess_board_key_64);
    }
  }
}

// отмена флага возможности рокировок из за хода ладьи
/**
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} from
 * @returns {void}
 */
const stop_king_castle_move_rook_0x88_mm = function (chess_board_0x88, chess_board_key_64, from) {

  if (chess_board_0x88[IND_CASTLING_K_CB] == 1) {
    // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
    if (from == H1_MGQ) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_K_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(0, 0, 1, 0, chess_board_key_64);
    }
  }

  if (chess_board_0x88[IND_CASTLING_Q_CB] == 1) {
    // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
    if (from == A1_MGQ) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_Q_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(1, 0, 0, 0, chess_board_key_64);
    }
  }

  if (chess_board_0x88[IND_CASTLING_k_CB] == 1) {
    // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
    if (from == H8_MGQ) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_k_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(0, 0, 0, 1, chess_board_key_64);
    }
  }

  if (chess_board_0x88[IND_CASTLING_q_CB] == 1) {
    // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
    if (from == A8_MGQ) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_q_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(0, 1, 0, 0, chess_board_key_64);
    }
  }
}

// отмена флагов возможности рокировок из за хода короля
/**
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} from
 * @returns {void}
 */
const stop_king_castle_move_king_0x88_mm = function (chess_board_0x88, chess_board_key_64, from) {

  if (chess_board_0x88[IND_CASTLING_K_CB] == 1) {
    // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
    if (from == E1_MGQ) {
      chess_board_0x88[IND_CASTLING_K_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(0, 0, 1, 0, chess_board_key_64);
    }
  }

  if (chess_board_0x88[IND_CASTLING_Q_CB] == 1) {
    // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
    if (from == E1_MGQ) {
      chess_board_0x88[IND_CASTLING_Q_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(1, 0, 0, 0, chess_board_key_64);
    }
  }

  if (chess_board_0x88[IND_CASTLING_k_CB] == 1) {
    // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
    if (from == E8_MGQ) {
      chess_board_0x88[IND_CASTLING_k_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(0, 0, 0, 1, chess_board_key_64);
    }
  }

  if (chess_board_0x88[IND_CASTLING_q_CB] == 1) {
    // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
    if (from == E8_MGQ) {
      chess_board_0x88[IND_CASTLING_q_CB] = 0;
      // Q, q, K, k,
      key_update_QqKk_0x88_tk(0, 1, 0, 0, chess_board_key_64);
    }
  }
}

// короткая рокировка
/**
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64 
 * @param {number} from
 * @param {number} to
 * @param {number} piece_color  
 * @returns {number}
 */
const make_king_castle_move_0x88_mm = function (chess_board_0x88, chess_board_key_64, from, to, piece_color) {

  let is_moove_legal = 1;

  //let piece_color_sq = (chess_board_0x88[from] > W_KING) ? BLACK : WHITE;
  let piece_color_sq =  1 - (chess_board_0x88[from] >> 3);

  // проверяем не под шахом ли поля
  if (piece_color_sq == 1) {
    if (check_detected_mgc(E1_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected_mgc(F1_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected_mgc(G1_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
  } else {
    if (check_detected_mgc(E8_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected_mgc(F8_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected_mgc(G8_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
  }

  if (is_moove_legal == 1) {

    // перемещаем короля. его ход прописан в списке ходов
    // записываем имя фигуры на новом месте
    chess_board_0x88[to] =
      chess_board_0x88[from];

    // стираем имя фигуры на старом месте
    chess_board_0x88[from] = PIECE_NO_CB;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE_CB] = 1 - chess_board_0x88[SIDE_TO_MOVE_CB];


    if (piece_color == 1) {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88[F1_MGQ] = chess_board_0x88[H1_MGQ];

      // стираем имя фигуры на старом месте
      chess_board_0x88[H1_MGQ] = PIECE_NO_CB;// 0

      // рокировка белых в длинную сторону   1/0
      if (chess_board_0x88[IND_CASTLING_Q_CB] == 1) {
        chess_board_0x88[IND_CASTLING_Q_CB] = 0;
        //Q, q, K, k
        key_update_QqKk_0x88_tk(1, 0, 0, 0, chess_board_key_64);
      }

      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_K_CB] = 0;
      //Q, q, K, k
      key_update_QqKk_0x88_tk(0, 0, 1, 0, chess_board_key_64);

      ////////////////////////////////////////////////////////////////////////////////////////////////////      
      key_update_castle_move_0x88_tk(from, to, H1_MGQ, F1_MGQ, piece_color, chess_board_key_64);

    } else {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88[F8_MGQ] = chess_board_0x88[H8_MGQ];

      // стираем имя фигуры на старом месте
      chess_board_0x88[H8_MGQ] = PIECE_NO_CB;// 0  

      // рокировка черных в длинную сторону  1/0
      if (chess_board_0x88[IND_CASTLING_q_CB] == 1) {
        chess_board_0x88[IND_CASTLING_q_CB] = 0;
        //Q, q, K, k
        key_update_QqKk_0x88_tk(0, 1, 0, 0, chess_board_key_64);
      }

      // рокировка черных в короткую сторону 1/0
      chess_board_0x88[IND_CASTLING_k_CB] = 0;
      //Q, q, K, k
      key_update_QqKk_0x88_tk(0, 0, 0, 1, chess_board_key_64);

      ////////////////////////////////////////////////////////////////////////////////////////////////////
      key_update_castle_move_0x88_tk(from, to, H8_MGQ, F8_MGQ, piece_color, chess_board_key_64);

    }
  }

  return is_moove_legal;

}

// длинная рокировка
/**
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64  
 * @param {number} from
 * @param {number} to
 * @param {number} piece_color  
 * @returns {number}
 */
const make_king_queen_castle_move_0x88_mm = function (chess_board_0x88, chess_board_key_64, from, to, piece_color) {

  let is_moove_legal = 1;

  //let piece_color_sq = (chess_board_0x88[from] > W_KING) ? BLACK : WHITE;
  let piece_color_sq = 1 - (chess_board_0x88[from] >> 3);// тут магия 8( в битах это 00001000) (подсказал ИИ от Гугла) 1 для белых и 0 для черных.

  if (piece_color_sq == 1) {
    if (check_detected_mgc(E1_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected_mgc(D1_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected_mgc(C1_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
  } else {
    if (check_detected_mgc(E8_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected_mgc(D8_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected_mgc(C8_MGQ, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
  }//if (piece_color_sq == 1) {

  // проверяем не под шахом ли поля
  if (is_moove_legal == 1) {


    // перемещаем короля. его ход прописан в списке ходов
    // записываем имя фигуры на новом месте
    chess_board_0x88[to] =
      chess_board_0x88[from];

    // стираем имя фигуры на старом месте
    chess_board_0x88[from] = PIECE_NO_CB;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE_CB] = 1 - chess_board_0x88[SIDE_TO_MOVE_CB];

    if (piece_color == 1) {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88[D1_MGQ] = chess_board_0x88[A1_MGQ];

      // стираем имя фигуры на старом месте
      chess_board_0x88[A1_MGQ] = PIECE_NO_CB;// 0

      // рокировка белых в длинную сторону   1/0
      chess_board_0x88[IND_CASTLING_Q_CB] = 0;
      //Q, q, K, k
      key_update_QqKk_0x88_tk(1, 0, 0, 0, chess_board_key_64);

      // рокировка белых в короткую сторону  1/0
      if (chess_board_0x88[IND_CASTLING_K_CB] == 1) {
        chess_board_0x88[IND_CASTLING_K_CB] = 0;
        //Q, q, K, k
        key_update_QqKk_0x88_tk(0, 0, 1, 0, chess_board_key_64);
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////
       key_update_castle_move_0x88_tk(from, to, A1_MGQ, D1_MGQ, piece_color, chess_board_key_64);

    } else {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88[D8_MGQ] = chess_board_0x88[A8_MGQ];

      // стираем имя фигуры на старом месте
      chess_board_0x88[A8_MGQ] = PIECE_NO_CB;// 0 

      // рокировка черных в длинную сторону  1/0
      chess_board_0x88[IND_CASTLING_q_CB] = 0;
      //Q, q, K, k
      key_update_QqKk_0x88_tk(0, 1, 0, 0, chess_board_key_64);

      if (chess_board_0x88[IND_CASTLING_k_CB] == 1) {
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k_CB] = 0;
        //Q, q, K, k
        key_update_QqKk_0x88_tk(0, 0, 0, 1, chess_board_key_64);
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////      
       key_update_castle_move_0x88_tk(from, to, A8_MGQ, D8_MGQ, piece_color, chess_board_key_64);


    }// if (packing_moves.piece_color == 1) {
  } // if (is_moove_legal == 1) {

  return is_moove_legal;
}

// остались пешки
//  взятие на проходе
/**
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64
 * @param {number} from
 * @param {number} to
 * @param {number} piece_color  
 * @returns {void}
 */
const make_en_passant_move_0x88_mm = function (chess_board_0x88, chess_board_key_64, from, to, piece_color) {

  let piece_from = chess_board_0x88[from];
  let piece_to16;

  // записываем имя фигуры на новом месте
  chess_board_0x88[to] =
    chess_board_0x88[from];

  // стираем имя фигуры на старом месте
  chess_board_0x88[from] = PIECE_NO_CB;// 0

  // цвет хода 0 - черные 1 - белые
  chess_board_0x88[SIDE_TO_MOVE_CB] = 1 - chess_board_0x88[SIDE_TO_MOVE_CB];

  if (piece_color == 1) {
    // стираем имя битой на проходе пешки
    piece_to16 = chess_board_0x88[to + 16];
    chess_board_0x88[to + 16] = PIECE_NO_CB;// 0
    key_update_ep_move_0x88_tk(from, to, (to + 16), piece_from, piece_to16,  chess_board_key_64);
  } else {
    piece_to16 = chess_board_0x88[to - 16];    
    chess_board_0x88[to - 16] = PIECE_NO_CB;// 0
    key_update_ep_move_0x88_tk(from, to, (to - 16), piece_from, piece_to16, chess_board_key_64);
  }

  chess_board_0x88[IND_EN_PASSANT_YES_CB] = 0;
   key_update_ep_0x88_tk(chess_board_key_64);
}

// ход пешки с превращением
/**
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64 
 * @param {number} from
 * @param {number} to 
 * @param {number} promo_piece  
 * @returns {void}
 */
const make_promo_move_0x88_mm = function (chess_board_0x88, chess_board_key_64, from, to, promo_piece) {
  
  let piece_to = chess_board_0x88[to];
  //let piece_color = (piece_from > W_KING) ? BLACK : WHITE;// цвет взятой фигуры;
  let piece_color = 1 - (chess_board_0x88[from] >> 3);


    key_update_promo_move_0x88_tk(from, to, promo_piece, piece_to, piece_color, chess_board_key_64); 

  // записываем имя фигуры на новом месте
  chess_board_0x88[to] = promo_piece;

  // стираем имя фигуры на старом месте
  chess_board_0x88[from] = PIECE_NO_CB;// 0

  // цвет хода 0 - черные 1 - белые
  chess_board_0x88[SIDE_TO_MOVE_CB] = 1 - chess_board_0x88[SIDE_TO_MOVE_CB];

}

export { do_moves_mm };
