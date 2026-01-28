// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name make_move_0x88.js
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
SIDE_TO_MOVE,
  BLACK, WHITE, PIECE_NO, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK
} from "./chess_board_new.js";

import {
  check_detected,
  H1, H8, A1, A8, E1, E8, F1, F8, G1, G8, D1, D8, C1, C8
} from "./move_generator_captures_new.js";

import { set_undo } from "../move_generator/undo_new.js";

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
* @param {Uint8Array} chess_board_0x88
* @param {Uint8Array} undo
* @param {number} type_move
* @param {number} from
* @param {number} to
* @param {number} piece_color
* @returns {number}
*/
const do_moves = function (chess_board_0x88, undo, type_move, from, to, piece_color) {
  //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);
  let is_moove_legal = 1;// по умолчанию ход считаем легальным.
  set_undo(undo, chess_board_0x88);// заполняем вспогательную структуру для возврата хода

  // смотрим 
  switch (type_move) {

    case MOVE_NO:
      break;
    // взятие на проходе обнуляю вообще везде, кроме регистрации при двойном ходе пешки. как по другому пока не знаю

    ///////////////////////////////////////////////////////      
    // простые ходы
    // MOVE
    // ходит король. обнуляем связанные с ним рокировки
    case MOVE_KING:

      if (piece_color == 1) {
        chess_board_0x88[IND_KING_FROM_WHITE] = to;
        //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88.king_from_white);
      } else {
        chess_board_0x88[IND_KING_FROM_BLACK] = to;
        //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88.king_from_white);
      }

      // делаем простой ход. он одинаковый для всех фигур
      make_simple_move_0x88(chess_board_0x88, from, to);

      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      // если король ходил то отменяем зависимые рокировки
      stop_king_castle_move_king_0x88(chess_board_0x88, from);
      break;

    // ходит ладья. обнуляем все связанные с ней рокировки  
    case MOVE_ROOK:
      // делаем простой ход. он одинаковый для всех фигур
      make_simple_move_0x88(chess_board_0x88, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      // если ладья ходила то отменяем зависимые рокировки
      stop_king_castle_move_rook_0x88(chess_board_0x88, from);
      break;

    // эти ходы не влияют на рокировку или превращения  
    case MOVE_QUEEN:
    //  break;
    case MOVE_BISHOP:
    //  break;
    case MOVE_KNIGHT:
    //  break;
    case MOVE_PAWN:
      // делаем простой ход. он одинаковый для всех фигур
      make_simple_move_0x88(chess_board_0x88, from, to);
      // обнуляем взятие на проходе.
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;

    ///////////////////////////////////////////////////////  
    // взятия
    // CAPTURES_KING_...
    // взятия королем, отменяем все связанные с ним рокировки
    case CAPTURES_KING_QUEEN:
    //break;        
    case CAPTURES_KING_BISHOP:
    //break;
    case CAPTURES_KING_KNIGHT:
    //break;
    case CAPTURES_KING_PAWN:

      if (piece_color == 1) {
        chess_board_0x88[IND_KING_FROM_WHITE] = to;
      } else {
        chess_board_0x88[IND_KING_FROM_BLACK] = to;
      }
      make_simple_move_0x88(chess_board_0x88, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      // если король ходил то отменяем зависимые рокировки
      stop_king_castle_move_king_0x88(chess_board_0x88, from);
      break;

    // CAPTURES_ROOK_...
    // взятия ладьей. отменяем все связанные с ней рокировки
    case CAPTURES_ROOK_QUEEN:
    //break;        
    case CAPTURES_ROOK_BISHOP:
    //break;
    case CAPTURES_ROOK_KNIGHT:
    //break;
    case CAPTURES_ROOK_PAWN:
      make_simple_move_0x88(chess_board_0x88, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      // если ладья ходила то отменяем зависимые рокировки
      stop_king_castle_move_rook_0x88(chess_board_0x88, from);
      break;

    // эти взятия не влияют на рокировку и превращения  
    // CAPTURES_QUEEN
    case CAPTURES_QUEEN_QUEEN:
    //break;        
    case CAPTURES_QUEEN_BISHOP:
    //break;
    case CAPTURES_QUEEN_KNIGHT:
    //break;
    case CAPTURES_QUEEN_PAWN:
    //break;

    // CAPTURES_BISHOP
    case CAPTURES_BISHOP_QUEEN:
    //break;
    case CAPTURES_BISHOP_BISHOP:
    //break;
    case CAPTURES_BISHOP_KNIGHT:
    //break;
    case CAPTURES_BISHOP_PAWN:
    //break;

    // CAPTURES_KNIGHT
    case CAPTURES_KNIGHT_QUEEN:
    //break;
    case CAPTURES_KNIGHT_BISHOP:
    //break;
    case CAPTURES_KNIGHT_KNIGHT:
    //break;
    case CAPTURES_KNIGHT_PAWN:
    //break;

    // CAPTURES_PAWN
    case CAPTURES_PAWN_QUEEN:
    //break;
    case CAPTURES_PAWN_BISHOP:
    //break;
    case CAPTURES_PAWN_KNIGHT:
    //break;
    case CAPTURES_PAWN_PAWN:
      make_simple_move_0x88(chess_board_0x88, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;

    //////////////////////////////////////////////
    // взятия ладьи. отменяем рокировку с участием взятой ладьи  
    // CAPTURES_..._ROOK   
    case CAPTURES_QUEEN_ROOK:
    //break;
    case CAPTURES_BISHOP_ROOK:
    //break;
    case CAPTURES_KNIGHT_ROOK:
    //break;
    case CAPTURES_PAWN_ROOK:
      make_simple_move_0x88(chess_board_0x88, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      stop_king_castle_captures_rook_0x88(chess_board_0x88, to);
      break;

    // тут особый случай ладья берет ладью. отменяем рокировки с участием обеих фигур. 
    case CAPTURES_ROOK_ROOK:
      make_simple_move_0x88(chess_board_0x88, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      stop_king_castle_captures_rook_0x88(chess_board_0x88, to);
      // если ладья ходила то отменяем зависимые рокировки
      stop_king_castle_move_rook_0x88(chess_board_0x88, from);
      break;

    // еще один особый случай. ладью берет король. отменяем рокировки и для ладьи и для короля. 
    // хотя если король добежал до вражеской ладьи то наверное у него уже нет рокировок но вдруг 
    // ладья сама пришла к королю тогда это у нее уже нет рокировок. как все запутано :))
    case CAPTURES_KING_ROOK:
      if (piece_color == 1) {
        chess_board_0x88[IND_KING_FROM_WHITE] = to;
      } else {
        chess_board_0x88[IND_KING_FROM_BLACK] = to;
      }

      make_simple_move_0x88(chess_board_0x88, from, to);
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0
      }
      stop_king_castle_captures_rook_0x88(chess_board_0x88, to);
      // если король ходил то отменяем зависимые рокировки
      stop_king_castle_move_king_0x88(chess_board_0x88, from);
      break;

    //////////////////////////////////////////////
    // специальные ходы рокировки. отмена рокировки прописана внутри функций
    // MOVE_KING_CASTLE
    case MOVE_KING_CASTLE:
      is_moove_legal = make_king_castle_move_0x88(chess_board_0x88, from, to, piece_color);
      // разрешение взятия на проходе 1/0
      if (is_moove_legal != 2) {
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
      }

      if (is_moove_legal != 2) {

        if (piece_color == 1) {
          chess_board_0x88[IND_KING_FROM_WHITE] = to;
        } else {
          chess_board_0x88[IND_KING_FROM_BLACK] = to;
        }
      }

      break;

    // MOVE_KING_QUEEN_CASTLE   
    case MOVE_KING_QUEEN_CASTLE:

      is_moove_legal = make_king_queen_castle_move_0x88(chess_board_0x88, from, to, piece_color);
      if (is_moove_legal != 2) {
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
      }

      if (is_moove_legal != 2) {

        if (piece_color == 1) {
          chess_board_0x88[IND_KING_FROM_WHITE] = to;
        } else {
          chess_board_0x88[IND_KING_FROM_BLACK] = to;
        }
      }

      break;

    //////////////////////////////////////////////
    // специальные ходы все про пешки 
    // MOVE_DOUBLE_PAWN       
    case MOVE_DOUBLE_PAWN:
      make_simple_move_0x88(chess_board_0x88, from, to);
      // двойное продвижение пешки открывает возможность взятия на проходе
      if (piece_color == 1) {
        // координата битого поля
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = from - 16;
      } else {
        chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = from + 16;
      }
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 0) {
      }
      chess_board_0x88[IND_EN_PASSANT_YES] = 1;
     
      break;

    // EP_CAPTURES
    case EP_CAPTURES:
      // здесь отмена взятия на проходе есть уже в функции
      make_en_passant_move_0x88(chess_board_0x88, from, to, piece_color);
      break;

    // MOVE PAWN PROMO  
    case MOVE_PAWN_PROMO_QUEEN:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_QUEEN);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_QUEEN);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;
    case MOVE_PAWN_PROMO_ROOK:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_ROOK);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_ROOK);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;
    case MOVE_PAWN_PROMO_BISHOP:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_BISHOP);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_BISHOP);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {

        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;
    case MOVE_PAWN_PROMO_KNIGHT:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_KNIGHT);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_KNIGHT);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;

    //CAPTURES PAWN PROMO
    //CAPTURES_PROMO_QUEEN
    case CAPTURES_PAWN_QUEEN_PROMO_QUEEN:
    //break;
    case CAPTURES_PAWN_BISHOP_PROMO_QUEEN:
    //break;
    case CAPTURES_PAWN_KNIGHT_PROMO_QUEEN:
       if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_QUEEN);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_QUEEN);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;

    // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей  
    case CAPTURES_PAWN_ROOK_PROMO_QUEEN:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_QUEEN);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_QUEEN);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      stop_king_castle_captures_rook_0x88(chess_board_0x88, to);
      break;

    //CAPTURES_PROMO_ROOK
    case CAPTURES_PAWN_QUEEN_PROMO_ROOK:
    //break;
    case CAPTURES_PAWN_BISHOP_PROMO_ROOK:
    //break;
    case CAPTURES_PAWN_KNIGHT_PROMO_ROOK:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_ROOK);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_ROOK);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;

    // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей         
    case CAPTURES_PAWN_ROOK_PROMO_ROOK:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_ROOK);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_ROOK);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      stop_king_castle_captures_rook_0x88(chess_board_0x88, to);
      break;

    //CAPTURES_PROMO_BISHOP
    case CAPTURES_PAWN_QUEEN_PROMO_BISHOP:
    //break;
    case CAPTURES_PAWN_BISHOP_PROMO_BISHOP:
    //break;
    case CAPTURES_PAWN_KNIGHT_PROMO_BISHOP:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_BISHOP);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_BISHOP);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;

    // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей.         
    case CAPTURES_PAWN_ROOK_PROMO_BISHOP:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_BISHOP);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_BISHOP);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      stop_king_castle_captures_rook_0x88(chess_board_0x88, to);
      break;

    // CAPTURES_PROMO_KNIGHT
    case CAPTURES_PAWN_QUEEN_PROMO_KNIGHT:
    //break;
    case CAPTURES_PAWN_BISHOP_PROMO_KNIGHT:
    //break;
    case CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_KNIGHT);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_KNIGHT);
      }
      // разрешение взятия на проходе 1/0
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      break;

    // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей.        
    case CAPTURES_PAWN_ROOK_PROMO_KNIGHT:
      if (piece_color == WHITE) {
        make_promo_move_0x88(chess_board_0x88, from, to, W_KNIGHT);
      } else {
        make_promo_move_0x88(chess_board_0x88, from, to, B_KNIGHT);
      }
      // обнуляем взятие на проходе. 
      if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
        chess_board_0x88[IND_EN_PASSANT_YES] = 0;
      }
      stop_king_castle_captures_rook_0x88(chess_board_0x88, to);
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
      from_king = chess_board_0x88[IND_KING_FROM_WHITE];
    } else {
      from_king = chess_board_0x88[IND_KING_FROM_BLACK];
    }

    if (check_detected(from_king, piece_color_king, chess_board_0x88) != 0) {

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
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @returns {void}
 */
const make_simple_move_0x88 = function (chess_board_0x88, from, to) {

  // записываем имя фигуры на новом месте
  chess_board_0x88[to] =
    chess_board_0x88[from];

  // стираем имя фигуры на старом месте
  chess_board_0x88[from] = PIECE_NO;// 0

  // цвет хода 0 - черные 1 - белые
  chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];

}

// если берется ладья на исходном месте то отменяем флаг возможности связанной с ней рокировки
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} to 
 * @returns {void}
 */
const stop_king_castle_captures_rook_0x88 = function (chess_board_0x88, to) {

  if (chess_board_0x88[IND_CASTLING_K] == 1) {
    // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
    if (to == H1) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_K] = 0;
      // Q, q, K, k,
    }
  }

  if (chess_board_0x88[IND_CASTLING_Q] == 1) {
    // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
    if (to == A1) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_Q] = 0;
      // Q, q, K, k,
    }
  }

  if (chess_board_0x88[IND_CASTLING_k] == 1) {
    // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
    if (to == H8) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_k] = 0;
      // Q, q, K, k,        
    }
  }

  if (chess_board_0x88[IND_CASTLING_q] == 1) {
    // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
    if (to == A8) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_q] = 0;
      // Q, q, K, k,        
    }
  }
}

// отмена флага возможности рокировок из за хода ладьи
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @returns {void}
 */
const stop_king_castle_move_rook_0x88 = function (chess_board_0x88, from) {

  if (chess_board_0x88[IND_CASTLING_K] == 1) {
    // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
    if (from == H1) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_K] = 0;
      // Q, q, K, k,
    }
  }

  if (chess_board_0x88[IND_CASTLING_Q] == 1) {
    // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
    if (from == A1) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_Q] = 0;
      // Q, q, K, k,
    }
  }

  if (chess_board_0x88[IND_CASTLING_k] == 1) {
    // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
    if (from == H8) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_k] = 0;
      // Q, q, K, k,
    }
  }

  if (chess_board_0x88[IND_CASTLING_q] == 1) {
    // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
    if (from == A8) {
      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_q] = 0;
      // Q, q, K, k,
    }
  }
}

// отмена флагов возможности рокировок из за хода короля
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @returns {void}
 */
const stop_king_castle_move_king_0x88 = function (chess_board_0x88, from) {

  if (chess_board_0x88[IND_CASTLING_K] == 1) {
    // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
    if (from == E1) {
      chess_board_0x88[IND_CASTLING_K] = 0;
      // Q, q, K, k,
    }
  }

  if (chess_board_0x88[IND_CASTLING_Q] == 1) {
    // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
    if (from == E1) {
      chess_board_0x88[IND_CASTLING_Q] = 0;
      // Q, q, K, k,
    }
  }

  if (chess_board_0x88[IND_CASTLING_k] == 1) {
    // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
    if (from == E8) {
      chess_board_0x88[IND_CASTLING_k] = 0;
      // Q, q, K, k,
    }
  }

  if (chess_board_0x88[IND_CASTLING_q] == 1) {
    // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
    if (from == E8) {
      chess_board_0x88[IND_CASTLING_q] = 0;
      // Q, q, K, k,
    }
  }
}

// короткая рокировка
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to
 * @param {number} piece_color  
 * @returns {number}
 */
const make_king_castle_move_0x88 = function (chess_board_0x88, from, to, piece_color) {

  let is_moove_legal = 1;

  let piece_color_sq = (chess_board_0x88[from] > W_KING) ? BLACK : WHITE;

  // проверяем не под шахом ли поля
  if (piece_color_sq == 1) {
    if (check_detected(E1, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected(F1, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected(G1, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
  } else {
    if (check_detected(E8, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected(F8, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected(G8, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
  }

  if (is_moove_legal == 1) {

    // перемещаем короля. его ход прописан в списке ходов
    // записываем имя фигуры на новом месте
    chess_board_0x88[to] =
      chess_board_0x88[from];

    // стираем имя фигуры на старом месте
    chess_board_0x88[from] = PIECE_NO;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];


    if (piece_color == 1) {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88[F1] = chess_board_0x88[H1];

      // стираем имя фигуры на старом месте
      chess_board_0x88[H1] = PIECE_NO;// 0

      // рокировка белых в длинную сторону   1/0
      if (chess_board_0x88[IND_CASTLING_Q] == 1) {
        chess_board_0x88[IND_CASTLING_Q] = 0;
        //Q, q, K, k
      }

      // рокировка белых в короткую сторону  1/0
      chess_board_0x88[IND_CASTLING_K] = 0;
      //Q, q, K, k

    } else {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88[F8] = chess_board_0x88[H8];

      // стираем имя фигуры на старом месте
      chess_board_0x88[H8] = PIECE_NO;// 0  

      // рокировка черных в длинную сторону  1/0
      if (chess_board_0x88[IND_CASTLING_q] == 1) {
        chess_board_0x88[IND_CASTLING_q] = 0;
        //Q, q, K, k
      }

      // рокировка черных в короткую сторону 1/0
      chess_board_0x88[IND_CASTLING_k] = 0;
      //Q, q, K, k

    }
  }

  return is_moove_legal;

}

// длинная рокировка
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to
 * @param {number} piece_color  
 * @returns {number}
 */
const make_king_queen_castle_move_0x88 = function (chess_board_0x88, from, to, piece_color) {

  let is_moove_legal = 1;

  let piece_color_sq = (chess_board_0x88[from] > W_KING) ? BLACK : WHITE;

  if (piece_color_sq == 1) {
    if (check_detected(E1, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected(D1, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected(C1, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
  } else {
    if (check_detected(E8, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected(D8, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
    if (check_detected(C8, piece_color_sq, chess_board_0x88) != 0) is_moove_legal = 2;
  }//if (piece_color_sq == 1) {

  // проверяем не под шахом ли поля
  if (is_moove_legal == 1) {


    // перемещаем короля. его ход прописан в списке ходов
    // записываем имя фигуры на новом месте
    chess_board_0x88[to] =
      chess_board_0x88[from];

    // стираем имя фигуры на старом месте
    chess_board_0x88[from] = PIECE_NO;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];

    if (piece_color == 1) {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88[D1] = chess_board_0x88[A1];

      // стираем имя фигуры на старом месте
      chess_board_0x88[A1] = PIECE_NO;// 0

      // рокировка белых в длинную сторону   1/0
      chess_board_0x88[IND_CASTLING_Q] = 0;
      //Q, q, K, k

      // рокировка белых в короткую сторону  1/0
      if (chess_board_0x88[IND_CASTLING_K] == 1) {
        chess_board_0x88[IND_CASTLING_K] = 0;
        //Q, q, K, k
      }

    } else {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88[D8] = chess_board_0x88[A8];

      // стираем имя фигуры на старом месте
      chess_board_0x88[A8] = PIECE_NO;// 0 

      // рокировка черных в длинную сторону  1/0
      chess_board_0x88[IND_CASTLING_q] = 0;
      //Q, q, K, k

      if (chess_board_0x88[IND_CASTLING_k] == 1) {
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88[IND_CASTLING_k] = 0;
        //Q, q, K, k
      }

    }// if (packing_moves.piece_color == 1) {
  } // if (is_moove_legal == 1) {

  return is_moove_legal;
}

// остались пешки
//  взятие на проходе
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to
 * @param {number} piece_color  
 * @returns {void}
 */
const make_en_passant_move_0x88 = function (chess_board_0x88, from, to, piece_color) {

  // записываем имя фигуры на новом месте
  chess_board_0x88[to] =
    chess_board_0x88[from];

  // стираем имя фигуры на старом месте
  chess_board_0x88[from] = PIECE_NO;// 0

  // цвет хода 0 - черные 1 - белые
  chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];

  if (piece_color == 1) {
    // стираем имя битой на проходе пешки
    chess_board_0x88[to + 16] = PIECE_NO;// 0
  } else {
    chess_board_0x88[to - 16] = PIECE_NO;// 0
  }

  chess_board_0x88[IND_EN_PASSANT_YES] = 0;
}

// ход пешки с превращением
/**
 * @param {Uint8Array} chess_board_0x88
 * @param {number} from
 * @param {number} to 
 * @param {number} promo_piece  
 * @returns {void}
 */
const make_promo_move_0x88 = function (chess_board_0x88, from, to, promo_piece) {

  // записываем имя фигуры на новом месте
  chess_board_0x88[to] = promo_piece;

  // стираем имя фигуры на старом месте
  chess_board_0x88[from] = PIECE_NO;// 0

  // цвет хода 0 - черные 1 - белые
  chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];

}

export { do_moves };
