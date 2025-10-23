Move_list_0x88_С/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name make_move_0x88.js
 * @version created 22.10m.2025 
 * last modified 22.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Make_move_0x88_C {

  static NAME = "Make_move_0x88_C";


  constructor() {

  }

  iniM() {

  }

  do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O, move_generator_0x88_O) {
    //console.log("Make_move_0x88_C->do_moves  move_i " + move_i);
    let is_moove_legal = 1;
    let type_move = move_list_0x88_O.type_move[move_i];
    undo_0x88_O.set_undo(chess_board_0x88_O);

    // смотрим 
    switch (type_move) {

      case Move_list_0x88_С.MOVE_NO:
        break;

      ////////////////////////////////////////////////
      // простые ходы
      case Move_list_0x88_С.MOVE_KING:
        // делаем простой ход. он одинаковый для всех фигур
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        chess_board_0x88_O.en_passant_yes = 0
        // если король ходил то отменяем зависимые рокировки
        this.stop_king_castle_move_king_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;
      case Move_list_0x88_С.MOVE_ROOK:
        // делаем простой ход. он одинаковый для всех фигур
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        chess_board_0x88_O.en_passant_yes = 0
        // если ладья ходила то отменяем зависимые рокировки
        this.stop_king_castle_move_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;
      case Move_list_0x88_С.MOVE_QUEEN:
      //  break;
      case Move_list_0x88_С.MOVE_BISHOP:
      //  break;
      case Move_list_0x88_С.MOVE_KNIGHT:
      //  break;
      case Move_list_0x88_С.MOVE_PAWN:
        // делаем простой ход. он одинаковый для всех фигур
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        chess_board_0x88_O.en_passant_yes = 0;
        break;

      ///////////////////////////////////////////////////////  
      // взятия
      // CAPTURES_KING
      case Move_list_0x88_С.CAPTURES_KING_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_KING_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_KING_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_KING_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_KING_PAWN:
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        chess_board_0x88_O.en_passant_yes = 0;
        // если король ходил то отменяем зависимые рокировки
        this.stop_king_castle_move_king_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      // CAPTURES_ROOK
      case Move_list_0x88_С.CAPTURES_ROOK_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_ROOK_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_ROOK_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_ROOK_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_ROOK_PAWN:
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        chess_board_0x88_O.en_passant_yes = 0;
        // если ладья ходила то отменяем зависимые рокировки
        this.stop_king_castle_move_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      // CAPTURES_QUEEN
      case Move_list_0x88_С.CAPTURES_QUEEN_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_QUEEN_ROOK:
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
      case Move_list_0x88_С.CAPTURES_BISHOP_ROOK:
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
      case Move_list_0x88_С.CAPTURES_KNIGHT_ROOK:
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
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_PAWN:
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        // обнуляем взятие на проходе. 
        chess_board_0x88_O.en_passant_yes = 0;
        break;

      //////////////////////////////////////////////
      // специальный ходы рокировки
      case Move_list_0x88_С.MOVE_KING_CASTLE:
        is_moove_legal = this.make_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, move_generator_0x88_O);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;
      case Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE:
        is_moove_legal = this.make_king_queen_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, move_generator_0x88_O);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;

      //////////////////////////////////////////////
      // специальный ходы все про пешки        
      case Move_list_0x88_С.MOVE_DOUBLE_PAWN:
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        // двойное продвижение пешки открывает возможность взятия на проходе
        chess_board_0x88_O.en_passant_yes = 1;
        if (move_list_0x88_O.piece_color[move_i] == 1) {
          // координата битого поля
          chess_board_0x88_O.en_passant_target_square = move_list_0x88_O.from[move_i] - 16;
        } else {
          chess_board_0x88_O.en_passant_target_square = move_list_0x88_O.from[move_i] + 16;
        }
        //console.log("PAWN_DOUBLE_PUSH");
        //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> piece_color " + move_list_0x88_O.piece_color[move_i]);
        //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> chess_board_0x88_O.en_passant_target_square "
        //  + chess_board_0x88_O.en_passant_target_square);        
        break;

      case Move_list_0x88_С.EP_CAPTURES:
        this.make_en_passant_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        // здесь отмена взятия на проходе есть уже в функции
        //chess_board_0x88_O.en_passant_yes = 0
        break;

      // MOVE PAWN PROMO  
      case Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;
      case Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;

      // CAPTURES PAWN PROMO
      // CAPTURES_PAWN_QUEEN
      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;

      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;

      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
      //break;

      case Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT:
      //break;
      case Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT:
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        // разрешение взятия на проходе 1/0
        chess_board_0x88_O.en_passant_yes = 0;
        break;

      default://
      // console.log("default");
    }

    // если ход не отменили выше тогда остается проверить не под шахом ли наш король
    if (is_moove_legal == 1) {
      let piece_color_king = move_list_0x88_O.piece_color[move_i];
      let from_king = chess_board_0x88_O.searching_king(piece_color_king);
      //console.log("from_king " + from_king);
      //console.log("piece_color_king " + piece_color_king);      ;
      //console.log("check_detected " + move_generator_0x88_O.check_detected(from_king, piece_color_king, chess_board_0x88_O));

      if (move_generator_0x88_O.check_detected(from_king, piece_color_king, chess_board_0x88_O) != 0) {
        is_moove_legal = 0;
      }
    }

    return is_moove_legal;
  }

  // рисуем фигуру на новом месте и стираем на старом. это и просто ход и взятие.  
  make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

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

  //
  stop_king_castle_move_rook_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

    if (chess_board_0x88_O.castling_K == 1) {
      // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.H1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_K = 0;
      }
    }

    if (chess_board_0x88_O.castling_Q == 1) {
      // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.A1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_Q = 0;
      }
    }

    if (chess_board_0x88_O.castling_k == 1) {
      // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.H8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_k = 0;
      }
    }

    if (chess_board_0x88_O.castling_q == 1) {
      // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.A8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_q = 0;
      }
    }
  }

  //
  stop_king_castle_move_king_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

    if (chess_board_0x88_O.castling_K == 1) {
      // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.E1) {
        chess_board_0x88_O.castling_K = 0;
        chess_board_0x88_O.castling_Q = 0;
      }
    }

    if (chess_board_0x88_O.castling_Q == 1) {
      // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.E1) {
        chess_board_0x88_O.castling_K = 0;
        chess_board_0x88_O.castling_Q = 0;
      }
    }

    if (chess_board_0x88_O.castling_k == 1) {
      // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.E8) {
        chess_board_0x88_O.castling_k = 0;
        chess_board_0x88_O.castling_q = 0;
      }
    }

    if (chess_board_0x88_O.castling_q == 1) {
      // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.E8) {
        chess_board_0x88_O.castling_k = 0;
        chess_board_0x88_O.castling_q = 0;
      }
    }
  }

  // 
  make_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, move_generator_0x88_O) {

    let is_moove_legal = 1;

    let piece_color_sq = chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

    if (piece_color_sq == 1) {
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.E1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.F1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.G1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
    } else {
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.E8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.F8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.G8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
    }

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


      if (move_list_0x88_O.piece_color[move_i] == 1) {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.F1] =
          chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.H1];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.F1] =
          chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.H1];

        // стираем имя фигуры на старом месте
        chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.H1] = Chess_board_0x88_C.PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.H1] = Chess_board_0x88_C.BLACK;// 0

        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_O.castling_Q = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_K = 0;

      } else {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.F8] =
          chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.H8];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.F8] =
          chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.H8];

        // стираем имя фигуры на старом месте
        chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.H8] = Chess_board_0x88_C.PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.H8] = Chess_board_0x88_C.BLACK;// 0   

        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_O.castling_q = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_O.castling_k = 0;
      }
    }

    return is_moove_legal;

  }

  //
  make_king_queen_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, move_generator_0x88_O) {

    let is_moove_legal = 1;

    let piece_color_sq = chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.from[move_i]];

    if (piece_color_sq == 1) {
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.E1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.D1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.C1, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
    } else {
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.E8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.D8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
      if (move_generator_0x88_O.check_detected(Move_generator_0x88_С.C8, piece_color_sq, chess_board_0x88_O) != 0) is_moove_legal = 0;
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

      if (move_list_0x88_O.piece_color[move_i] == 1) {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.D1] =
          chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.A1];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.D1] =
          chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.A1];

        // стираем имя фигуры на старом месте
        chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.A1] = Chess_board_0x88_C.PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.A1] = Chess_board_0x88_C.BLACK;// 0

        // рокировка белых в длинную сторону   1/0
        chess_board_0x88_O.castling_Q = 0;
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_K = 0;

      } else {

        // перемещаем ладью. ее ход не прописан в списке ходов
        // записываем имя фигуры на новом месте
        chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.D8] =
          chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.A8];

        // записываем цвет фигуры на новом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.D8] =
          chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.A8];

        // стираем имя фигуры на старом месте
        chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.A8] = Chess_board_0x88_C.PIECE_NO;// 0

        // стираем цвет фигуры на старом месте 
        chess_board_0x88_O.sq_piece_color_0x88[Move_generator_0x88_С.A8] = Chess_board_0x88_C.BLACK;// 0   

        // рокировка черных в длинную сторону  1/0
        chess_board_0x88_O.castling_q = 0;
        // рокировка черных в короткую сторону 1/0
        chess_board_0x88_O.castling_k = 0;
      }// if (move_list_0x88_O.piece_color[move_i] == 1) {
    } // if (is_moove_legal == 1) {

    return is_moove_legal;
  }

  // остались пешки
  //  
  make_en_passant_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

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
    //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> piece_color " + move_list_0x88_O.piece_color[move_i]);
    //console.log("Make_move_0x88_C->make_en_passant_move_0x88-> move_list_0x88_O.to[move_i] " + move_list_0x88_O.to[move_i]);
    if (move_list_0x88_O.piece_color[move_i] == 1) {
      // стираем имя битой на проходе пешки
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i] + 16] = Chess_board_0x88_C.PIECE_NO;// 0
      // стираем цвет битой на проходе пешки 
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i] + 16] = Chess_board_0x88_C.BLACK;// 0
    } else {
      chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i] - 16] = Chess_board_0x88_C.PIECE_NO;// 0
      chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i] - 16] = Chess_board_0x88_C.BLACK;// 0
    }

    chess_board_0x88_O.en_passant_yes = 0;
  }

  //
  make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, promo_piece) {

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


  //
  save_chess_board_0x88(chess_board_0x88_O, chess_board_0x88_O_s) {
    //console.log("Make_move_0x88_C->do_undo_moves");
    for (let i = 0; i < 128; i++) {
      chess_board_0x88_O_s.sq_piece_0x88[i] = chess_board_0x88_O.sq_piece_0x88[i];
      chess_board_0x88_O_s.sq_piece_color_0x88[i] = chess_board_0x88_O.sq_piece_color_0x88[i];
    }

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88_O_s.side_to_move = chess_board_0x88_O.side_to_move;
    // разрешение взятия на проходе 1/0
    chess_board_0x88_O_s.en_passant_yes = chess_board_0x88_O.en_passant_yes;
    // координата битого поля
    chess_board_0x88_O_s.en_passant_target_square = chess_board_0x88_O.en_passant_target_square;
    // рокировка белых в длинную сторону   1/0
    chess_board_0x88_O_s.castling_Q = chess_board_0x88_O.castling_Q;
    // рокировка белых в короткую сторону  1/0
    chess_board_0x88_O_s.castling_K = chess_board_0x88_O.castling_K;
    // рокировка черных в длинную сторону  1/0
    chess_board_0x88_O_s.castling_q = chess_board_0x88_O.castling_q;
    // рокировка черных в короткую сторону 1/0
    chess_board_0x88_O_s.castling_k = chess_board_0x88_O.castling_k;
    // оценка позиции
    chess_board_0x88_O_s.score = chess_board_0x88_O.score;
  }

  //  undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O) {
  restore_chess_board_0x88(chess_board_0x88_O, chess_board_0x88_O_s) {
    //console.log("Make_move_0x88_C->undo_moves");
    for (let i = 0; i < 128; i++) {
      chess_board_0x88_O.sq_piece_0x88[i] = chess_board_0x88_O_s.sq_piece_0x88[i];
      chess_board_0x88_O.sq_piece_color_0x88[i] = chess_board_0x88_O_s.sq_piece_color_0x88[i];
    }

    // цвет хода 0 - черные 1 - белые
    chess_board_0x88_O.side_to_move = chess_board_0x88_O_s.side_to_move;
    // разрешение взятия на проходе 1/0
    chess_board_0x88_O.en_passant_yes = chess_board_0x88_O_s.en_passant_yes;
    // координата битого поля
    chess_board_0x88_O.en_passant_target_square = chess_board_0x88_O_s.en_passant_target_square;
    // рокировка белых в длинную сторону   1/0
    chess_board_0x88_O.castling_Q = chess_board_0x88_O_s.castling_Q;
    // рокировка белых в короткую сторону  1/0
    chess_board_0x88_O.castling_K = chess_board_0x88_O_s.castling_K;
    // рокировка черных в длинную сторону  1/0
    chess_board_0x88_O.castling_q = chess_board_0x88_O_s.castling_q;
    // рокировка черных в короткую сторону 1/0
    chess_board_0x88_O.castling_k = chess_board_0x88_O_s.castling_k;
    // оценка позиции
    chess_board_0x88_O.score = chess_board_0x88_O_s.score;

  }
}