// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name make_move_0x88.js
 * @version created 24.01m.2026 
*/

//import { Move_list_0x88_С } from "./move_list_new.js";
import { Move_list_0x88_С } from "./move_list_0x88.js";

import {
    SIDE_TO_MOVE, SHIFT_COLOR,
    BLACK, PIECE_NO, KNIGHT, BISHOP, ROOK, QUEEN,
    IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
    IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK } from "./chess_board_new.js";

import { check_detected,
     H1, H8, A1, A8, E1, E8, F1, F8, G1, G8, D1, D8, C1, C8 } from "./move_generator_captures_new.js";

import { set_undo } from "../move_generator/undo_new.js";

/**
* НАЗНАЧЕНИЕ
 как нибудь надо добавить отслеживание короля
 чтобы не искать его после каждого хода

если в результате хода король под шахом то is_moove_legal = 0  
если сделать рокировку не смогли из за битых полей то is_moove_legal = 2
если ход прошел то is_moove_legal = 1

*/


  // делаем ход под номером move_i из списка move_list_0x88_O на доске chess_board_0x88
/**
* @param {number} move_i
* @param {Uint8Array} chess_board_0x88
* @param {Move_list_0x88_С} move_list_0x88_O
* @param {Uint8Array} undo
* @returns {number}
*/
  const do_moves = function (move_i, chess_board_0x88, move_list_0x88_O, undo) {
    //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);
    let is_moove_legal = 1;// по умолчанию ход считаем легальным.
    let type_move = move_list_0x88_O.type_move[move_i];// тип хода
    set_undo(undo, chess_board_0x88);// заполняем вспогательную структуру для возврата хода

    //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88.king_from_white);
    //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88.king_from_white);
    // смотрим 
    switch (type_move) {

      case Move_list_0x88_С.MOVE_NO:
        break;
      // взятие на проходе обнуляю вообще везде, кроме регистрации при двойном ходе пешки. как по другому пока не знаю

      ///////////////////////////////////////////////////////      
      // простые ходы
      // MOVE
      // ходит король. обнуляем связанные с ним рокировки
      case Move_list_0x88_С.MOVE_KING:

        if (move_list_0x88_O.piece_color == 1) {
          chess_board_0x88[IND_KING_FROM_WHITE] = move_list_0x88_O.to[move_i];
          //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88.king_from_white);
        } else {
          chess_board_0x88[IND_KING_FROM_BLACK] = move_list_0x88_O.to[move_i];
          //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88.king_from_white);
        }

        // делаем простой ход. он одинаковый для всех фигур
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);

        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        // если король ходил то отменяем зависимые рокировки
        stop_king_castle_move_king_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // ходит ладья. обнуляем все связанные с ней рокировки  
      case Move_list_0x88_С.MOVE_ROOK:
        // делаем простой ход. он одинаковый для всех фигур
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        // если ладья ходила то отменяем зависимые рокировки
        stop_king_castle_move_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // эти ходы не влияют на рокировку или превращения  
      case Move_list_0x88_С.MOVE_QUEEN:
      //  break;
      case Move_list_0x88_С.MOVE_BISHOP:
      //  break;
      case Move_list_0x88_С.MOVE_KNIGHT:
      //  break;
      case Move_list_0x88_С.MOVE_PAWN:
        // делаем простой ход. он одинаковый для всех фигур
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // обнуляем взятие на проходе.
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;

      ///////////////////////////////////////////////////////  
      // взятия
      // CAPTURES_KING_...
      // взятия королем, отменяем все связанные с ним рокировки
      case Move_list_0x88_С.CAPTURES_KING_QUEEN:
      //break;        
      case Move_list_0x88_С.CAPTURES_KING_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_KING_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_KING_PAWN:

        if (move_list_0x88_O.piece_color == 1) {
          chess_board_0x88[IND_KING_FROM_WHITE] = move_list_0x88_O.to[move_i];
        } else {
          chess_board_0x88[IND_KING_FROM_BLACK] = move_list_0x88_O.to[move_i];
        }
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        // если король ходил то отменяем зависимые рокировки
        stop_king_castle_move_king_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // CAPTURES_ROOK_...
      // взятия ладьей. отменяем все связанные с ней рокировки
      case Move_list_0x88_С.CAPTURES_ROOK_QUEEN:
      //break;        
      case Move_list_0x88_С.CAPTURES_ROOK_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_ROOK_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_ROOK_PAWN:
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        // если ладья ходила то отменяем зависимые рокировки
        stop_king_castle_move_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // эти взятия не влияют на рокировку и превращения  
      // CAPTURES_QUEEN
      case Move_list_0x88_С.CAPTURES_QUEEN_QUEEN:
      //break;        
      case Move_list_0x88_С.CAPTURES_QUEEN_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_QUEEN_PAWN:
      //break;

      // CAPTURES_BISHOP
      case Move_list_0x88_С.CAPTURES_BISHOP_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_BISHOP_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_BISHOP_PAWN:
      //break;

      // CAPTURES_KNIGHT
      case Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_PAWN:
      //break;

      // CAPTURES_PAWN
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_PAWN:
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;

      //////////////////////////////////////////////
      // взятия ладьи. отменяем рокировку с участием взятой ладьи  
      // CAPTURES_..._ROOK   
      case Move_list_0x88_С.CAPTURES_QUEEN_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_BISHOP_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK:
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // тут особый случай ладья берет ладью. отменяем рокировки с участием обеих фигур. 
      case Move_list_0x88_С.CAPTURES_ROOK_ROOK:
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // если ладья ходила то отменяем зависимые рокировки
        stop_king_castle_move_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // еще один особый случай. ладью берет король. отменяем рокировки и для ладьи и для короля. 
      // хотя если король добежал до вражеской ладьи то наверное у него уже нет рокировок но вдруг 
      // ладья сама пришла к королю тогда это у нее уже нет рокировок. как все запутано :))
      case Move_list_0x88_С.CAPTURES_KING_ROOK:

        if (move_list_0x88_O.piece_color == 1) {
          chess_board_0x88[IND_KING_FROM_WHITE] = move_list_0x88_O.to[move_i];
        } else {
          chess_board_0x88[IND_KING_FROM_BLACK] = move_list_0x88_O.to[move_i];
        }
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0
        }
        stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // если король ходил то отменяем зависимые рокировки
        stop_king_castle_move_king_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      //////////////////////////////////////////////
      // специальный ходы рокировки. отмена рокировки прописана внутри функций
      // MOVE_KING_CASTLE
      case Move_list_0x88_С.MOVE_KING_CASTLE:
        is_moove_legal = make_king_castle_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // разрешение взятия на проходе 1/0
        if (is_moove_legal != 2) {
          if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
            chess_board_0x88[IND_EN_PASSANT_YES] = 0;
          }
        }

        if (is_moove_legal != 2) {
          if (move_list_0x88_O.piece_color == 1) {
            chess_board_0x88[IND_KING_FROM_WHITE] = move_list_0x88_O.to[move_i];
          } else {
            chess_board_0x88[IND_KING_FROM_BLACK] = move_list_0x88_O.to[move_i];
          }
        }

        break;

      // MOVE_KING_QUEEN_CASTLE   
      case Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE:

        is_moove_legal = make_king_queen_castle_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        if (is_moove_legal != 2) {
          if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
            chess_board_0x88[IND_EN_PASSANT_YES] = 0;
          }
        }

        if (is_moove_legal != 2) {
          if (move_list_0x88_O.piece_color == 1) {
            chess_board_0x88[IND_KING_FROM_WHITE] = move_list_0x88_O.to[move_i];
          } else {
            chess_board_0x88[IND_KING_FROM_BLACK] = move_list_0x88_O.to[move_i];
          }
        }

        break;

      //////////////////////////////////////////////
      // специальный ходы все про пешки 
      // MOVE_DOUBLE_PAWN       
      case Move_list_0x88_С.MOVE_DOUBLE_PAWN:
        make_simple_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        // двойное продвижение пешки открывает возможность взятия на проходе
        if (move_list_0x88_O.piece_color == 1) {
          // координата битого поля
          chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = move_list_0x88_O.from[move_i] - 16;
        } else {
          chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] = move_list_0x88_O.from[move_i] + 16;
        }
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 0) {
        }
        chess_board_0x88[IND_EN_PASSANT_YES] = 1;

        //console.log("PAWN_DOUBLE_PUSH");
        //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> piece_color " + move_list_0x88_O.piece_color);
        //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> chess_board_0x88.en_passant_target_square "
        //  + chess_board_0x88.en_passant_target_square);        
        break;

      // EP_CAPTURES
      case Move_list_0x88_С.EP_CAPTURES:
        // здесь отмена взятия на проходе есть уже в функции
        make_en_passant_move_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // MOVE PAWN PROMO  
      case Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, ROOK);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {

          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;

      //CAPTURES PAWN PROMO
      //CAPTURES_PROMO_QUEEN
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;

      // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей  
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, QUEEN);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      //CAPTURES_PROMO_ROOK
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, ROOK);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;

      // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей         
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, ROOK);
        // разрешение взятия на проходе 1/0
         if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      //CAPTURES_PROMO_BISHOP
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;

      // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей.         
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, BISHOP);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;

      // CAPTURES_PROMO_KNIGHT
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        break;

      // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей.        
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT:
        make_promo_move_0x88(move_i, chess_board_0x88, move_list_0x88_O, KNIGHT);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88[IND_EN_PASSANT_YES] == 1) {
          chess_board_0x88[IND_EN_PASSANT_YES] = 0;
        }
        stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88, move_list_0x88_O);
        break;


      default://
      // console.log("default");
    }

    // если легальность хода не обнулили выше тогда остается проверить не под шахом ли наш король 
    // легальность отменяется если рокировки не прошли т.к. поля или король под боем
    if (is_moove_legal == 1) {

      let from_king = 0;

      let piece_color_king = move_list_0x88_O.piece_color;

      if (move_list_0x88_O.piece_color == 1) {
        from_king = chess_board_0x88[IND_KING_FROM_WHITE];
      } else {
        from_king = chess_board_0x88[IND_KING_FROM_BLACK];
      }


      // поиск короля после каждого хода это что то сильно неправильное. надо будет прописать положение короля
      //  и его отслеживание. но это как нибудь потом. сейчас и других вопросов хватает (19.11м.25) 
      // прописал положение короля (25.11m.25)
      //let from_king2 = chess_board_0x88.searching_king(piece_color_king);
      //console.log("from_king " + from_king);
      //console.log("piece_color_king " + piece_color_king);      ;
      //console.log("check_detected " + move_generator_captures_0x88_O.check_detected(from_king, piece_color_king, chess_board_0x88));

      // if (from_king != from_king2) {
      //   console.log("Make_move_0x88_C NO KING! ");
      //   console.log("from_king " + from_king);
      //   console.log("from_king2 " + from_king2);
      //   chess_board_0x88.test_print_0x88();
      // }

      if (check_detected(from_king, piece_color_king, chess_board_0x88) != 0) {
        is_moove_legal = 0;
      }
    }

    // TEST key_64
    // // генерируем ключ текущей позиции.
    // let key_64_board = transposition_table_0x88_O.set_key_from_board_0x88(chess_board_0x88);

    // if (chess_board_0x88.key_64 != key_64_board) {
    //   console.log("Make_move_0x88_C -> NOT key_64 !");
    //   console.log("Make_move_0x88_C -> type_move " + Move_list_0x88_С.TYPE_MOVE_NAME[type_move]);
    //   console.log("Make_move_0x88_C -> chess_board_0x88.key_64 " + chess_board_0x88.key_64);
    //   console.log("Make_move_0x88_C -> key_64_board " + key_64_board);
    //  chess_board_0x88.test_print_0x88();
    //}

    // есть три случая: 
    // 1 - ход легальный. мы сделали ход и король не под шахом 
    // 2 - ход не легальный мы не сделали рокировку из за битых полей 
    // 0 - ход не легальный. мы сделали ход а король оказался или остался под шахом

    return is_moove_legal;
  }

  // рисуем фигуру на новом месте и стираем на старом. это и просто ход и взятие. 
  /**
   * @param {number} move_i
   * @param {Uint8Array} chess_board_0x88
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
  const make_simple_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    // записываем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] =
      chess_board_0x88[move_list_0x88_O.from[move_i]];

    // записываем цвет фигуры на новом месте 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];

    // стираем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] = PIECE_NO;// 0

    // стираем цвет фигуры на старом месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] = BLACK;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];

  }

  // если берется ладья на исходном месте то отменяем флаг возможности связанной с ней рокировки
  /**
   * @param {number} move_i
   * @param {Uint8Array} chess_board_0x88
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */  
  const stop_king_castle_captures_rook_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    if (chess_board_0x88[IND_CASTLING_K] == 1) {
      // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
      if (move_list_0x88_O.to[move_i] == H1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K] = 0;
        // Q, q, K, k,
      }
    }

    if (chess_board_0x88[IND_CASTLING_Q] == 1) {
      // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
      if (move_list_0x88_O.to[move_i] == A1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_Q] = 0;
        // Q, q, K, k,
      }
    }

    if (chess_board_0x88[IND_CASTLING_k] == 1) {
      // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
      if (move_list_0x88_O.to[move_i] == H8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_k] = 0;
        // Q, q, K, k,        
      }
    }

    if (chess_board_0x88[IND_CASTLING_q] == 1) {
      // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
      if (move_list_0x88_O.to[move_i] == A8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_q] = 0;
        // Q, q, K, k,        
      }
    }
  }

  // отмена флага возможности рокировок из за хода ладьи
  /**
   * @param {number} move_i
   * @param {Uint8Array} chess_board_0x88
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */  
  const stop_king_castle_move_rook_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    if (chess_board_0x88[IND_CASTLING_K] == 1) {
      // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
      if (move_list_0x88_O.from[move_i] == H1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_K] = 0;
        // Q, q, K, k,
      }
    }

    if (chess_board_0x88[IND_CASTLING_Q] == 1) {
      // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
      if (move_list_0x88_O.from[move_i] == A1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_Q] = 0;
        // Q, q, K, k,
      }
    }

    if (chess_board_0x88[IND_CASTLING_k] == 1) {
      // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
      if (move_list_0x88_O.from[move_i] == H8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_k] = 0;
        // Q, q, K, k,
      }
    }

    if (chess_board_0x88[IND_CASTLING_q] == 1) {
      // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
      if (move_list_0x88_O.from[move_i] == A8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88[IND_CASTLING_q] = 0;
        // Q, q, K, k,
      }
    }
  }

  // отмена флагов возможности рокировок из за хода короля
  /**
   * @param {number} move_i
   * @param {Uint8Array} chess_board_0x88
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */  
  const stop_king_castle_move_king_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    if (chess_board_0x88[IND_CASTLING_K] == 1) {
      // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
      if (move_list_0x88_O.from[move_i] == E1) {
        chess_board_0x88[IND_CASTLING_K] = 0;
        // Q, q, K, k,
      }
    }

    if (chess_board_0x88[IND_CASTLING_Q] == 1) {
      // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
      if (move_list_0x88_O.from[move_i] == E1) {
        chess_board_0x88[IND_CASTLING_Q] = 0;
        // Q, q, K, k,
      }
    }

    if (chess_board_0x88[IND_CASTLING_k] == 1) {
      // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
      if (move_list_0x88_O.from[move_i] == E8) {
        chess_board_0x88[IND_CASTLING_k] = 0;
        // Q, q, K, k,
      }
    }

    if (chess_board_0x88[IND_CASTLING_q] == 1) {
      // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
      if (move_list_0x88_O.from[move_i] == E8) {
        chess_board_0x88[IND_CASTLING_q] = 0;
        // Q, q, K, k,
      }
    }
  }

  // короткая рокировка
  /**
   * @param {number} move_i
   * @param {Uint8Array} chess_board_0x88
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {number}
   */  
  const make_king_castle_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    let is_moove_legal = 1;

    let piece_color_sq = chess_board_0x88[move_list_0x88_O.from[move_i] +SHIFT_COLOR];

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
      chess_board_0x88[move_list_0x88_O.to[move_i]] =
        chess_board_0x88[move_list_0x88_O.from[move_i]];

      // записываем цвет фигуры на новом месте 
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] =
        chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];

      // стираем имя фигуры на старом месте
      chess_board_0x88[move_list_0x88_O.from[move_i]] = PIECE_NO;// 0

      // стираем цвет фигуры на старом месте 
      chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] = BLACK;// 0

      // цвет хода 0 - черные 1 - белые
      chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];


      if (move_list_0x88_O.piece_color == 1) {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88[F1] = chess_board_0x88[H1];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88[F1 + SHIFT_COLOR] = chess_board_0x88[H1 + SHIFT_COLOR];

        // стираем имя фигуры на старом месте
        chess_board_0x88[H1] = PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88[H1 + SHIFT_COLOR] = BLACK;// 0

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

        // записываем цвет фигуры на новом месте 
        chess_board_0x88[F8 + SHIFT_COLOR] = chess_board_0x88[H8 + SHIFT_COLOR];

        // стираем имя фигуры на старом месте
        chess_board_0x88[H8] = PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88[H8 + SHIFT_COLOR] = BLACK;// 0   

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
   * @param {number} move_i
   * @param {Uint8Array} chess_board_0x88
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {void} move_generator_captures_0x88_O
   * @returns {number}
   */    
  const make_king_queen_castle_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O, move_generator_captures_0x88_O) {

    let is_moove_legal = 1;

    let piece_color_sq = chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];

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
      chess_board_0x88[move_list_0x88_O.to[move_i]] =
        chess_board_0x88[move_list_0x88_O.from[move_i]];

      // записываем цвет фигуры на новом месте 
      chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] =
        chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];

      // стираем имя фигуры на старом месте
      chess_board_0x88[move_list_0x88_O.from[move_i]] = PIECE_NO;// 0

      // стираем цвет фигуры на старом месте 
      chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] = BLACK;// 0

      // цвет хода 0 - черные 1 - белые
      chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];

      if (move_list_0x88_O.piece_color == 1) {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88[D1] = chess_board_0x88[A1];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88[D1 + SHIFT_COLOR] = chess_board_0x88[A1 + SHIFT_COLOR];

        // стираем имя фигуры на старом месте
        chess_board_0x88[A1] = PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88[A1 + SHIFT_COLOR] = BLACK;// 0

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

        // записываем цвет фигуры на новом месте 
        chess_board_0x88[D8 + SHIFT_COLOR] = chess_board_0x88[A8 + SHIFT_COLOR];

        // стираем имя фигуры на старом месте
        chess_board_0x88[A8] = PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88[A8 + SHIFT_COLOR] = BLACK;// 0   

        // рокировка черных в длинную сторону  1/0
        chess_board_0x88[IND_CASTLING_q] = 0;
        //Q, q, K, k

        if (chess_board_0x88[IND_CASTLING_k] == 1) {
          // рокировка черных в короткую сторону 1/0
          chess_board_0x88[IND_CASTLING_k] = 0;
          //Q, q, K, k
        }

      }// if (move_list_0x88_O.piece_color == 1) {
    } // if (is_moove_legal == 1) {

    return is_moove_legal;
  }

  // остались пешки
  //  взятие на проходе
  /**
   * @param {number} move_i
   * @param {Uint8Array} chess_board_0x88
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */    
  const make_en_passant_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O) {

    // записываем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] =
      chess_board_0x88[move_list_0x88_O.from[move_i]];

    // записываем цвет фигуры на новом месте 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];

    // стираем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] = PIECE_NO;// 0

    // стираем цвет фигуры на старом месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] = BLACK;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];
    //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> piece_color " + move_list_0x88_O.piece_color);
    //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> move_list_0x88_O.to[move_i] " + move_list_0x88_O.to[move_i]);
    if (move_list_0x88_O.piece_color == 1) {
      // стираем имя битой на проходе пешки
      chess_board_0x88[move_list_0x88_O.to[move_i] + 16] = PIECE_NO;// 0
      // стираем цвет битой на проходе пешки 
      chess_board_0x88[move_list_0x88_O.to[move_i] + 16 + SHIFT_COLOR] = BLACK;// 0
    } else {
      chess_board_0x88[move_list_0x88_O.to[move_i] - 16] = PIECE_NO;// 0
      chess_board_0x88[move_list_0x88_O.to[move_i] - 16 + SHIFT_COLOR] = BLACK;// 0
    }

    chess_board_0x88[IND_EN_PASSANT_YES] = 0;
  }

  // ход пешки с превращением
  /**
   * @param {number} move_i
   * @param {Uint8Array} chess_board_0x88
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {number} promo_piece 
   * @returns {void}
   */      
  const make_promo_move_0x88 = function (move_i, chess_board_0x88, move_list_0x88_O, promo_piece) {

    // записываем имя фигуры на новом месте
    chess_board_0x88[move_list_0x88_O.to[move_i]] = promo_piece;

    // записываем цвет фигуры на новом месте 
    chess_board_0x88[move_list_0x88_O.to[move_i] + SHIFT_COLOR] =
      chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR];

    // стираем имя фигуры на старом месте
    chess_board_0x88[move_list_0x88_O.from[move_i]] = PIECE_NO;// 0

    // стираем цвет фигуры на старом месте 
    chess_board_0x88[move_list_0x88_O.from[move_i] + SHIFT_COLOR] = BLACK;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88[SIDE_TO_MOVE] = 1 - chess_board_0x88[SIDE_TO_MOVE];

  }

export { do_moves };
