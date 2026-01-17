// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name make_move_0x88.js
 * @version created 22.10m.2025 
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";
import { Move_list_0x88_С } from "./move_list_0x88.js";
import { Move_gen_1_captures_0x88_С } from "./move_gen_1_captures_0x88.js";
import { Undo_0x88_C } from "../move_generator/undo_0x88.js";
import { Transposition_table_0x88_C } from "../for_sorting_move/transposition_table_0x88.js";

/**
* НАЗНАЧЕНИЕ
 как нибудь надо добавить отслеживание короля
 чтобы не искать его после каждого хода

если в результате хода король под шахом то is_moove_legal = 0  
если сделать рокировку не смогли из за битых полей то is_moove_legal = 2
если ход прошел то is_moove_legal = 1

*/
//+
// тут все прозрачно. идей пока нет

/**
 * Класс.
 * @class
 */
class Make_move_0x88_C {

  static NAME = "Make_move_0x88_C";


  constructor() {

  }

  iniM() {

  }

  // делаем ход под номером move_i из списка move_list_0x88_O на доске chess_board_0x88_O
  /**
* @param {number} move_i
* @param {Chess_board_0x88_C} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @param {Undo_0x88_C} undo_0x88_O 
* @param {Move_gen_1_captures_0x88_С} move_gen_1_captures_0x88_O
* @param {Transposition_table_0x88_C} transposition_table_0x88_O 
* @returns {number}
*/
  do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_gen_1_captures_0x88_O, transposition_table_0x88_O) {
    //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);
    let is_moove_legal = 1;// по умолчанию ход считаем легальным.
    let type_move = move_list_0x88_O.type_move[move_i];// тип хода
    undo_0x88_O.set_undo(chess_board_0x88_O);// заполняем вспогательную структуру для возврата хода

    //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88_O.king_from_white);
    //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88_O.king_from_white);
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
          chess_board_0x88_O.king_from_white = move_list_0x88_O.to[move_i];
          //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88_O.king_from_white);
        } else {
          chess_board_0x88_O.king_from_black = move_list_0x88_O.to[move_i];
          //console.log("Make_move_0x88_C king_from_white[" + move_i + "] = " + chess_board_0x88_O.king_from_white);
        }

        // делаем простой ход. он одинаковый для всех фигур
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);

        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        // если король ходил то отменяем зависимые рокировки
        this.stop_king_castle_move_king_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        break;

      // ходит ладья. обнуляем все связанные с ней рокировки  
      case Move_list_0x88_С.MOVE_ROOK:
        // делаем простой ход. он одинаковый для всех фигур
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        // если ладья ходила то отменяем зависимые рокировки
        this.stop_king_castle_move_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
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
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // обнуляем взятие на проходе.
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
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
          chess_board_0x88_O.king_from_white = move_list_0x88_O.to[move_i];
        } else {
          chess_board_0x88_O.king_from_black = move_list_0x88_O.to[move_i];
        }
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        // если король ходил то отменяем зависимые рокировки
        this.stop_king_castle_move_king_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
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
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        // если ладья ходила то отменяем зависимые рокировки
        this.stop_king_castle_move_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
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
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
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
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        this.stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        break;

      // тут особый случай ладья берет ладью. отменяем рокировки с участием обеих фигур. 
      case Move_list_0x88_С.CAPTURES_ROOK_ROOK:
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        this.stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // если ладья ходила то отменяем зависимые рокировки
        this.stop_king_castle_move_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        break;

      // еще один особый случай. ладью берет король. отменяем рокировки и для ладьи и для короля. 
      // хотя если король добежал до вражеской ладьи то наверное у него уже нет рокировок но вдруг 
      // ладья сама пришла к королю тогда это у нее уже нет рокировок. как все запутано :))
      case Move_list_0x88_С.CAPTURES_KING_ROOK:

        if (move_list_0x88_O.piece_color == 1) {
          chess_board_0x88_O.king_from_white = move_list_0x88_O.to[move_i];
        } else {
          chess_board_0x88_O.king_from_black = move_list_0x88_O.to[move_i];
        }
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0
        }
        this.stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // если король ходил то отменяем зависимые рокировки
        this.stop_king_castle_move_king_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        break;

      //////////////////////////////////////////////
      // специальный ходы рокировки. отмена рокировки прописана внутри функций
      // MOVE_KING_CASTLE
      case Move_list_0x88_С.MOVE_KING_CASTLE:
        is_moove_legal = this.make_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O,
          move_gen_1_captures_0x88_O, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (is_moove_legal != 2) {
          if (chess_board_0x88_O.en_passant_yes == 1) {
            transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
            chess_board_0x88_O.en_passant_yes = 0;
          }
        }

        if (is_moove_legal != 2) {
          if (move_list_0x88_O.piece_color == 1) {
            chess_board_0x88_O.king_from_white = move_list_0x88_O.to[move_i];
          } else {
            chess_board_0x88_O.king_from_black = move_list_0x88_O.to[move_i];
          }
        }

        break;

      // MOVE_KING_QUEEN_CASTLE   
      case Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE:

        is_moove_legal = this.make_king_queen_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O,
          move_gen_1_captures_0x88_O, transposition_table_0x88_O);
        if (is_moove_legal != 2) {
          if (chess_board_0x88_O.en_passant_yes == 1) {
            transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
            chess_board_0x88_O.en_passant_yes = 0;
          }
        }

        if (is_moove_legal != 2) {
          if (move_list_0x88_O.piece_color == 1) {
            chess_board_0x88_O.king_from_white = move_list_0x88_O.to[move_i];
          } else {
            chess_board_0x88_O.king_from_black = move_list_0x88_O.to[move_i];
          }
        }

        break;

      //////////////////////////////////////////////
      // специальный ходы все про пешки 
      // MOVE_DOUBLE_PAWN       
      case Move_list_0x88_С.MOVE_DOUBLE_PAWN:
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        // двойное продвижение пешки открывает возможность взятия на проходе
        transposition_table_0x88_O.key_update_ep2_0x88(chess_board_0x88_O);
        if (move_list_0x88_O.piece_color == 1) {
          // координата битого поля
          chess_board_0x88_O.en_passant_target_square = move_list_0x88_O.from[move_i] - 16;
        } else {
          chess_board_0x88_O.en_passant_target_square = move_list_0x88_O.from[move_i] + 16;
        }
        if (chess_board_0x88_O.en_passant_yes == 0) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
        }
        chess_board_0x88_O.en_passant_yes = 1;

        transposition_table_0x88_O.key_update_ep2_0x88(chess_board_0x88_O);

        //console.log("PAWN_DOUBLE_PUSH");
        //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> piece_color " + move_list_0x88_O.piece_color);
        //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> chess_board_0x88_O.en_passant_target_square "
        //  + chess_board_0x88_O.en_passant_target_square);        
        break;

      // EP_CAPTURES
      case Move_list_0x88_С.EP_CAPTURES:
        // здесь отмена взятия на проходе есть уже в функции
        this.make_en_passant_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        break;

      // MOVE PAWN PROMO  
      case Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        break;

      //CAPTURES PAWN PROMO
      //CAPTURES_PROMO_QUEEN
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        break;

      // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей  
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        this.stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        break;

      //CAPTURES_PROMO_ROOK
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        break;

      // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей         
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        this.stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        break;

      //CAPTURES_PROMO_BISHOP
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        break;

      // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей.         
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        this.stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
        break;

      // CAPTURES_PROMO_KNIGHT
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT, transposition_table_0x88_O);
        // разрешение взятия на проходе 1/0
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        break;

      // осбый случай. пешка съела ладью и превратилась. отменяем рокировку с этой ладьей.        
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT, transposition_table_0x88_O);
        // обнуляем взятие на проходе. 
        if (chess_board_0x88_O.en_passant_yes == 1) {
          transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
          chess_board_0x88_O.en_passant_yes = 0;
        }
        this.stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O);
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
        from_king = chess_board_0x88_O.king_from_white;
      } else {
        from_king = chess_board_0x88_O.king_from_black;
      }


      // поиск короля после каждого хода это что то сильно неправильное. надо будет прописать положение короля
      //  и его отслеживание. но это как нибудь потом. сейчас и других вопросов хватает (19.11м.25) 
      // прописал положение короля (25.11m.25)
      //let from_king2 = chess_board_0x88_O.searching_king(piece_color_king);
      //console.log("from_king " + from_king);
      //console.log("piece_color_king " + piece_color_king);      ;
      //console.log("check_detected " + move_gen_1_captures_0x88_O.check_detected(from_king, piece_color_king, chess_board_0x88_O));

      // if (from_king != from_king2) {
      //   console.log("Make_move_0x88_C NO KING! ");
      //   console.log("from_king " + from_king);
      //   console.log("from_king2 " + from_king2);
      //   chess_board_0x88_O.test_print_0x88();
      // }

      if (move_gen_1_captures_0x88_O.check_detected(from_king, piece_color_king, chess_board_0x88_O) != 0) {
        is_moove_legal = 0;
      }
    }

    // TEST key_64
    // // генерируем ключ текущей позиции.
    // let key_64_board = transposition_table_0x88_O.set_key_from_board_0x88(chess_board_0x88_O);

    // if (chess_board_0x88_O.key_64 != key_64_board) {
    //   console.log("Make_move_0x88_C -> NOT key_64 !");
    //   console.log("Make_move_0x88_C -> type_move " + Move_list_0x88_С.TYPE_MOVE_NAME[type_move]);
    //   console.log("Make_move_0x88_C -> chess_board_0x88_O.key_64 " + chess_board_0x88_O.key_64);
    //   console.log("Make_move_0x88_C -> key_64_board " + key_64_board);
    //  chess_board_0x88_O.test_print_0x88();
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
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {Transposition_table_0x88_C} transposition_table_0x88_O 
   * @returns {void}
   */
  make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O) {

    let piece_to = chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]];
    let piece_from = chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]];
    let piece_color = chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];
    transposition_table_0x88_O.key_update_do_move_0x88(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i],
      piece_from, piece_to, piece_color, chess_board_0x88_O);


    // записываем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] =
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]];

    // записываем цвет фигуры на новом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

    // стираем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

    // стираем цвет фигуры на старом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.BLACK;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88_O.side_to_move = 1 - chess_board_0x88_O.side_to_move;

  }

  // если берется ладья на исходном месте то отменяем флаг возможности связанной с ней рокировки
  /**
   * @param {number} move_i
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {Transposition_table_0x88_C} transposition_table_0x88_O 
   * @returns {void}
   */  
  stop_king_castle_captures_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O) {

    if (chess_board_0x88_O.castling_K == 1) {
      // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
      if (move_list_0x88_O.to[move_i] == Move_gen_1_captures_0x88_С.H1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_K = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 1, 0, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_Q == 1) {
      // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
      if (move_list_0x88_O.to[move_i] == Move_gen_1_captures_0x88_С.A1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_Q = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(1, 0, 0, 0, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_k == 1) {
      // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
      if (move_list_0x88_O.to[move_i] == Move_gen_1_captures_0x88_С.H8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_k = 0;
        // Q, q, K, k,        
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 0, 1, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_q == 1) {
      // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
      if (move_list_0x88_O.to[move_i] == Move_gen_1_captures_0x88_С.A8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_q = 0;
        // Q, q, K, k,        
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 1, 0, 0, chess_board_0x88_O);
      }
    }
  }

  // отмена флага возможности рокировок из за хода ладьи
  /**
   * @param {number} move_i
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {Transposition_table_0x88_C} transposition_table_0x88_O 
   * @returns {void}
   */  
  stop_king_castle_move_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O) {

    if (chess_board_0x88_O.castling_K == 1) {
      // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
      if (move_list_0x88_O.from[move_i] == Move_gen_1_captures_0x88_С.H1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_K = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 1, 0, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_Q == 1) {
      // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
      if (move_list_0x88_O.from[move_i] == Move_gen_1_captures_0x88_С.A1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_Q = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(1, 0, 0, 0, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_k == 1) {
      // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
      if (move_list_0x88_O.from[move_i] == Move_gen_1_captures_0x88_С.H8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_k = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 0, 1, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_q == 1) {
      // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
      if (move_list_0x88_O.from[move_i] == Move_gen_1_captures_0x88_С.A8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_q = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 1, 0, 0, chess_board_0x88_O);
      }
    }
  }

  // отмена флагов возможности рокировок из за хода короля
  /**
   * @param {number} move_i
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {Transposition_table_0x88_C} transposition_table_0x88_O 
   * @returns {void}
   */  
  stop_king_castle_move_king_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O) {

    if (chess_board_0x88_O.castling_K == 1) {
      // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
      if (move_list_0x88_O.from[move_i] == Move_gen_1_captures_0x88_С.E1) {
        chess_board_0x88_O.castling_K = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 1, 0, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_Q == 1) {
      // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
      if (move_list_0x88_O.from[move_i] == Move_gen_1_captures_0x88_С.E1) {
        chess_board_0x88_O.castling_Q = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(1, 0, 0, 0, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_k == 1) {
      // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
      if (move_list_0x88_O.from[move_i] == Move_gen_1_captures_0x88_С.E8) {
        chess_board_0x88_O.castling_k = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 0, 1, chess_board_0x88_O);
      }
    }

    if (chess_board_0x88_O.castling_q == 1) {
      // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
      if (move_list_0x88_O.from[move_i] == Move_gen_1_captures_0x88_С.E8) {
        chess_board_0x88_O.castling_q = 0;
        // Q, q, K, k,
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 1, 0, 0, chess_board_0x88_O);
      }
    }
  }

  // короткая рокировка
  /**
   * @param {number} move_i
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {Move_gen_1_captures_0x88_С} move_gen_1_captures_0x88_O
   * @param {Transposition_table_0x88_C} transposition_table_0x88_O 
   * @returns {number}
   */  
  make_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, move_gen_1_captures_0x88_O, transposition_table_0x88_O) {

    let is_moove_legal = 1;

    let piece_color_sq = chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

    // проверяем не под шахом ли поля
    if (piece_color_sq == 1) {
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.E1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.F1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.G1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
    } else {
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.E8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.F8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.G8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
    }

    if (is_moove_legal == 1) {

      // перемещаем короля. его ход прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] =
        chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]];

      // записываем цвет фигуры на новом месте 
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] =
        chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

      // стираем имя фигуры на старом месте
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

      // стираем цвет фигуры на старом месте 
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.BLACK;// 0

      // цвет хода 0 - черные 1 - белые
      chess_board_0x88_O.side_to_move = 1 - chess_board_0x88_O.side_to_move;


      if (move_list_0x88_O.piece_color == 1) {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.F1] =
          chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.H1];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.F1] =
          chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.H1];

        // стираем имя фигуры на старом месте
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.H1] = Chess_board_0x88_C.PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.H1] = Chess_board_0x88_C.BLACK;// 0

        // рокировка белых в длинную сторону   1/0
        if (chess_board_0x88_O.castling_Q == 1) {
          chess_board_0x88_O.castling_Q = 0;
          //Q, q, K, k
          transposition_table_0x88_O.key_update_QqKk_0x88(1, 0, 0, 0, chess_board_0x88_O);
        }

        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_K = 0;
        //Q, q, K, k
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 1, 0, chess_board_0x88_O);

        transposition_table_0x88_O.key_update_castle_move_0x88(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i],
          Move_gen_1_captures_0x88_С.H1, Move_gen_1_captures_0x88_С.F1,
          1, chess_board_0x88_O);

      } else {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.F8] =
          chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.H8];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.F8] =
          chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.H8];

        // стираем имя фигуры на старом месте
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.H8] = Chess_board_0x88_C.PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.H8] = Chess_board_0x88_C.BLACK;// 0   

        // рокировка черных в длинную сторону  1/0
        if (chess_board_0x88_O.castling_q == 1) {
          chess_board_0x88_O.castling_q = 0;
          //Q, q, K, k
          transposition_table_0x88_O.key_update_QqKk_0x88(0, 1, 0, 0, chess_board_0x88_O);
        }

        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_O.castling_k = 0;
        //Q, q, K, k
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 0, 1, chess_board_0x88_O);

        transposition_table_0x88_O.key_update_castle_move_0x88(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i],
          Move_gen_1_captures_0x88_С.H8, Move_gen_1_captures_0x88_С.F8,
          0, chess_board_0x88_O);

      }
    }

    return is_moove_legal;

  }

  // длинная рокировка
  /**
   * @param {number} move_i
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {Move_gen_1_captures_0x88_С} move_gen_1_captures_0x88_O
   * @param {Transposition_table_0x88_C} transposition_table_0x88_O 
   * @returns {number}
   */    
  make_king_queen_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, move_gen_1_captures_0x88_O, transposition_table_0x88_O) {

    let is_moove_legal = 1;

    let piece_color_sq = chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

    if (piece_color_sq == 1) {
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.E1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.D1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.C1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
    } else {
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.E8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.D8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
      if (move_gen_1_captures_0x88_O.check_detected(Move_gen_1_captures_0x88_С.C8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 2;
    }//if (piece_color_sq == 1) {

    // проверяем не под шахом ли поля
    if (is_moove_legal == 1) {


      // перемещаем короля. его ход прописан в списке ходов
      // записываем имя фигуры на новом месте
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] =
        chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]];

      // записываем цвет фигуры на новом месте 
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] =
        chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

      // стираем имя фигуры на старом месте
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

      // стираем цвет фигуры на старом месте 
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.BLACK;// 0

      // цвет хода 0 - черные 1 - белые
      chess_board_0x88_O.side_to_move = 1 - chess_board_0x88_O.side_to_move;

      if (move_list_0x88_O.piece_color == 1) {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.D1] =
          chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.A1];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.D1] =
          chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.A1];

        // стираем имя фигуры на старом месте
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.A1] = Chess_board_0x88_C.PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.A1] = Chess_board_0x88_C.BLACK;// 0

        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_O.castling_Q = 0;
        //Q, q, K, k
        transposition_table_0x88_O.key_update_QqKk_0x88(1, 0, 0, 0, chess_board_0x88_O);

        // рокировка белых в короткую сторону  1/0
        if (chess_board_0x88_O.castling_K == 1) {
          chess_board_0x88_O.castling_K = 0;
          //Q, q, K, k
          transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 1, 0, chess_board_0x88_O);
        }

        transposition_table_0x88_O.key_update_castle_move_0x88(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i],
          Move_gen_1_captures_0x88_С.A1, Move_gen_1_captures_0x88_С.D1,
          1, chess_board_0x88_O);



      } else {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.D8] =
          chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.A8];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.D8] =
          chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.A8];

        // стираем имя фигуры на старом месте
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.A8] = Chess_board_0x88_C.PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.A8] = Chess_board_0x88_C.BLACK;// 0   

        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_O.castling_q = 0;
        //Q, q, K, k
        transposition_table_0x88_O.key_update_QqKk_0x88(0, 1, 0, 0, chess_board_0x88_O);

        if (chess_board_0x88_O.castling_k == 1) {
          // рокировка черных в короткую сторону 1/0
          chess_board_0x88_O.castling_k = 0;
          //Q, q, K, k
          transposition_table_0x88_O.key_update_QqKk_0x88(0, 0, 0, 1, chess_board_0x88_O);
        }

        transposition_table_0x88_O.key_update_castle_move_0x88(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i],
          Move_gen_1_captures_0x88_С.A8, Move_gen_1_captures_0x88_С.D8,
          0, chess_board_0x88_O);

      }// if (move_list_0x88_O.piece_color == 1) {
    } // if (is_moove_legal == 1) {

    return is_moove_legal;
  }

  // остались пешки
  //  взятие на проходе
  /**
   * @param {number} move_i
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {Transposition_table_0x88_C} transposition_table_0x88_O 
   * @returns {void}
   */    
  make_en_passant_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, transposition_table_0x88_O) {

    // записываем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] =
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]];

    // записываем цвет фигуры на новом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

    // стираем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

    // стираем цвет фигуры на старом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.BLACK;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88_O.side_to_move = 1 - chess_board_0x88_O.side_to_move;
    //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> piece_color " + move_list_0x88_O.piece_color);
    //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> move_list_0x88_O.to[move_i] " + move_list_0x88_O.to[move_i]);
    if (move_list_0x88_O.piece_color == 1) {
      // стираем имя битой на проходе пешки
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i] + 16] = Chess_board_0x88_C.PIECE_NO;// 0
      // стираем цвет битой на проходе пешки 
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i] + 16] = Chess_board_0x88_C.BLACK;// 0
    } else {
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i] - 16] = Chess_board_0x88_C.PIECE_NO;// 0
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i] - 16] = Chess_board_0x88_C.BLACK;// 0
    }

    chess_board_0x88_O.en_passant_yes = 0;

    if (move_list_0x88_O.piece_color == 1) {
      transposition_table_0x88_O.key_update_ep_move_0x88(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i],
        (move_list_0x88_O.to[move_i] + 16), Chess_board_0x88_C.PAWN, 1, chess_board_0x88_O);
    } else {
      transposition_table_0x88_O.key_update_ep_move_0x88(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i],
        (move_list_0x88_O.to[move_i] - 16), Chess_board_0x88_C.PAWN, 0, chess_board_0x88_O);
    }

    transposition_table_0x88_O.key_update_ep_0x88(chess_board_0x88_O);
  }

  // ход пешки с превращением
  /**
   * @param {number} move_i
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @param {number} promo_piece 
   * @param {Transposition_table_0x88_C} transposition_table_0x88_O 
   * @returns {void}
   */      
  make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, promo_piece, transposition_table_0x88_O) {

    let piece_to = chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]];
    let piece_promo = promo_piece;
    let piece_color = chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

    transposition_table_0x88_O.key_update_promo_move_0x88(move_list_0x88_O.from[move_i], move_list_0x88_O.to[move_i],
      piece_promo, piece_to, piece_color, chess_board_0x88_O);


    // записываем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] = promo_piece;

    // записываем цвет фигуры на новом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

    // стираем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

    // стираем цвет фигуры на старом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.BLACK;// 0

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88_O.side_to_move = 1 - chess_board_0x88_O.side_to_move;

  }
}

export { Make_move_0x88_C };
