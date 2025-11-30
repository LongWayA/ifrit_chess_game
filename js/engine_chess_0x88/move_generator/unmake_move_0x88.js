/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name unmake_move_0x88.js
 * @version created 24.10m.2025 
 * last modified 24.10m.2025
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";
import { Move_list_0x88_С } from "./move_list_0x88.js";
import { Move_gen_1_captures_0x88_С } from "./move_gen_1_captures_0x88.js";

/**
* НАЗНАЧЕНИЕ
 Отменяем сделанный ход.
*/
//+
// тут все прозрачно. идей пока нет

class Unmake_move_0x88_C {

  static NAME = "Unmake_move_0x88_C";


  constructor() {

  }

  iniM() {

  }

  // возврат хода
  undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O) {
    //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);
    let type_move = move_list_0x88_O.type_move[move_i];
    undo_0x88_O.get_undo(chess_board_0x88_O);

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
        this.unmake_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      ///////////////////////////////////////////////////////  
      // взятия
      // CAPTURES_KING_...
      case Move_list_0x88_С.CAPTURES_KING_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_KING_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_KING_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_KING_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.PAWN);
        break;

      // CAPTURES_ROOK_...
      case Move_list_0x88_С.CAPTURES_ROOK_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_ROOK_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_ROOK_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_ROOK_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.PAWN);
        break;

      // CAPTURES_QUEEN
      case Move_list_0x88_С.CAPTURES_QUEEN_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_QUEEN_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_QUEEN_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.PAWN);
        break;

      // CAPTURES_BISHOP
      case Move_list_0x88_С.CAPTURES_BISHOP_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_BISHOP_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_BISHOP_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.PAWN);
        break;

      // CAPTURES_KNIGHT
      case Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_KNIGHT_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.PAWN);
        break;

      // CAPTURES_PAWN
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_PAWN:
        // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.PAWN);
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
        this.unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK)
        break;

      //////////////////////////////////////////////
      // MOVE_KING_CASTLE
      case Move_list_0x88_С.MOVE_KING_CASTLE:
        this.unmake_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      // MOVE_KING_QUEEN_CASTLE   
      case Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE:
        this.unmake_king_queen_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      //////////////////////////////////////////////
      // специальный ходы все про пешки 
      // MOVE_DOUBLE_PAWN       
      case Move_list_0x88_С.MOVE_DOUBLE_PAWN:
        this.unmake_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      // EP_CAPTURES
      case Move_list_0x88_С.EP_CAPTURES:
        this.unmake_en_passant_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      // MOVE PAWN PROMO  
      case Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT:
        this.unmake_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      //CAPTURES PAWN PROMO
      //CAPTURES_PROMO_QUEEN
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK);
        break;

      //CAPTURES_PROMO_ROOK
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK);
        break;

      //CAPTURES_PROMO_BISHOP
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK);
        break;

      // CAPTURES_PROMO_KNIGHT
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT:
        this.unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK);
        break;

      default://
      // console.log("default");
    }

  }

  // возврат хода рисуем фигуру на старом месте и стираем на новом. это и просто ход.
  unmake_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

    // записываем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом  месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]];

    // стираем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

    // стираем цвет фигуры на новом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.BLACK;// 0
  }


  // возврат хода рисуем фигуру на старом месте и востанавливаем взятую на новом.
  unmake_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, captures_piece) {

    // записываем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом  месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]];

    // востанавливаем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] = captures_piece;//

    // востанавливаем цвет фигуры на новом месте цвет взятой фигуры противоположен цвету берущей
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] = 1 -
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];//
  }


  // возврат короткой рокировки
  unmake_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

    //   move_list_0x88_O.test_print_i_move_list(move_i, chess_board_0x88_O);
    //   console.log("sq_piece from " + chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]]);
    //   console.log("sq_piece to " + chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]]);

    // перемещаем назад короля. его ход прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]];

    // стираем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

    // стираем цвет фигуры на новом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.BLACK;// 0

    // if (move_list_0x88_O.piece_color != chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]]) {
    //   console.log("ЦВЕТА НЕ СОВПАДАЮТ!----------------------------------");
    //   console.log("piece_color " + move_list_0x88_O.piece_color);
    //   console.log("sq_piece_color " + chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]]);
    //   console.log("sq_piece " + chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]]);
    // }

    if (move_list_0x88_O.piece_color == 1) {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на старом месте
      chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.H1] =
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.F1];

      // записываем цвет фигуры на старом месте 
      chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.H1] =
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.F1];

      // стираем имя фигуры на новом месте
      chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.F1] = Chess_board_0x88_C.PIECE_NO;//

      // стираем цвет фигуры на новом месте 
      chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.F1] = Chess_board_0x88_C.BLACK;//

    } else {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на старом месте
      chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.H8] =
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.F8];

      // записываем цвет фигуры на старом месте 
      chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.H8] =
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.F8];

      // стираем имя фигуры на новом месте
      chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.F8] = Chess_board_0x88_C.PIECE_NO;// 0

      // стираем цвет фигуры на новом месте 
      chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.F8] = Chess_board_0x88_C.BLACK;// 0   
    }
  }

  // возврат длинной рокировки
  unmake_king_queen_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

    // перемещаем назад короля. его ход прописан в списке ходов
    // записываем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]];

    // стираем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

    // стираем цвет фигуры на новом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.BLACK;// 0

    if (move_list_0x88_O.piece_color == 1) {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на старом месте
      chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.A1] =
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.D1];

      // записываем цвет фигуры на старом месте 
      chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.A1] =
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.D1];

      // стираем имя фигуры на новом месте
      chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.D1] = Chess_board_0x88_C.PIECE_NO;// 0

      // стираем цвет фигуры на новом месте 
      chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.D1] = Chess_board_0x88_C.BLACK;// 0

    } else {

      // перемещаем ладью. ее ход не прописан в списке ходов
      // записываем имя фигуры на старом месте
      chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.A8] =
        chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.D8];

      // записываем цвет фигуры на старом месте 
      chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.A8] =
        chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.D8];

      // стираем имя фигуры на новом месте
      chess_board_0x88_O.sq_piece_0x88[Move_gen_1_captures_0x88_С.D8] = Chess_board_0x88_C.PIECE_NO;// 0

      // стираем цвет фигуры на новом месте 
      chess_board_0x88_O.sq_piece_color_0x88[Move_gen_1_captures_0x88_С.D8] = Chess_board_0x88_C.BLACK;// 0   

    }// 

  }

  // остались пешки
  // возврат взятия на проходе 
  unmake_en_passant_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

    // записываем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]];

    // записываем цвет фигуры на старом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]];

    // стираем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.PIECE_NO;//

    // стираем цвет фигуры на новом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.BLACK;//

    if (move_list_0x88_O.piece_color == 1) {
      // востанавливаем имя битой на проходе пешки
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i] + 16] = Chess_board_0x88_C.PAWN;//
      // востанавливаем цвет битой на проходе пешки 
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i] + 16] =
        1 - chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];//
    } else {
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i] - 16] = Chess_board_0x88_C.PAWN;//
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i] - 16] =
        1 - chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];//
    }
  }

  //возврат простого хода превращения
  unmake_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

    // записываем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.PAWN;

    // записываем цвет фигуры на старом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]];

    // стираем имя фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.PIECE_NO;// 0

    // стираем цвет фигуры на новом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] = Chess_board_0x88_C.BLACK;// 0
  }

  //возврат  хода превращения со взятием
  unmake_promo_captures_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, captures_piece) {

    // записываем имя фигуры на старом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.from[move_i]] = Chess_board_0x88_C.PAWN;

    // записываем цвет фигуры на старом месте 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]] =
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]];

    // записываем имя взятой фигуры на новом месте
    chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]] = captures_piece;//

    // записываем цвет взятой фигуры на новом месте. цвет противоположен цвету берущей фигуры 
    chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]] =
      1 - chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];// 0
  }
}

export { Unmake_move_0x88_C };