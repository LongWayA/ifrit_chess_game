/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name make_move_0x88.js
 * @version created 12.10m.2025 
 * last modified 12.10m.2025
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
      case Move_list_0x88_С.NO_MOVE:// нет хода
        break;

      // взятия
      case Move_list_0x88_С.PAWN_CAPTURES:// взятие пешкой
      case Move_list_0x88_С.KNIGHT_CAPTURES:// взятие конем
      case Move_list_0x88_С.BISHOP_CAPTURES:// взятие слоном
      case Move_list_0x88_С.ROOK_CAPTURES:// взятие ладьей
      case Move_list_0x88_С.QUEEN_CAPTURES:// взятие ферзем
      case Move_list_0x88_С.KING_CAPTURES://  взятие королем
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        this.stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      //простые ходы
      case Move_list_0x88_С.PAWN_MOVE:// ход пешкой
      case Move_list_0x88_С.KNIGHT_MOVE:// ход конем
      case Move_list_0x88_С.BISHOP_MOVE:// ход слоном
      case Move_list_0x88_С.ROOK_MOVE:// ход ладьей
      case Move_list_0x88_С.QUEEN_MOVE:// ход ферзем
      case Move_list_0x88_С.KING_MOVE:// простой ход королем
        this.make_simple_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        this.stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      // специальные ходы
      case Move_list_0x88_С.PAWN_DOUBLE_PUSH:// ход пешкой на две клетки
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

      case Move_list_0x88_С.EP_CAPTURES:// взятие на проходе
        //console.log("EP_CAPTURES");
        this.make_en_passant_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);        
        break;

      case Move_list_0x88_С.KING_CASTLE:// короткая рокировка
        is_moove_legal = this.make_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, move_generator_0x88_O);
        this.stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;
      //
      case Move_list_0x88_С.KING_QUEEN_CASTLE:// длинная рокировка
        is_moove_legal = this.make_king_queen_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, move_generator_0x88_O);
        this.stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      // пешка - взятия с превращением
      case Move_list_0x88_С.KNIGHT_PROMO_CAPTURE:// взятие пешкой с превращением в коня
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
                this.stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;
      //
      case Move_list_0x88_С.BISHOP_PROMO_CAPTURE:// взятие пешкой с превращением в слона
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
                this.stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;
      //
      case Move_list_0x88_С.ROOK_PROMO_CAPTURE:// взятие пешкой с превращением в ладью
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK);
                this.stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;
      //
      case Move_list_0x88_С.QUEEN_PROMO_CAPTURE:// взятие пешкой с превращением в ферзя
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
                this.stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O);
        break;

      // превращения пешки
      case Move_list_0x88_С.KNIGHT_PROMOTION:// пешка превращается в коня
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.KNIGHT);
        break;
      //
      case Move_list_0x88_С.BISHOP_PROMOTION:// пешка превращается в в слона
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.BISHOP);
        break;
      //
      case Move_list_0x88_С.ROOK_PROMOTION:// пешка превращается в в ладью
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.ROOK);
        break;
      //
      case Move_list_0x88_С.QUEEN_PROMOTION:// пешка превращается в ферзя 
        this.make_promo_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O, Chess_board_0x88_C.QUEEN);
        break;

      default://
      // console.log("default");
    }

    // если ход не отменили выше тогда остается проверить не под шахом ли наш король
    if (is_moove_legal == 1) {
      let piece_color_king = move_list_0x88_O.piece_color[move_i];
      let from_king = chess_board_0x88_O.searching_king(piece_color_king);
      //console.log("piece_color_king " + piece_color_king);      
      //console.log("from_king " + from_king);
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

    chess_board_0x88_O.en_passant_yes = 0;

  }

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

  stop_king_castle_move_0x88(move_i, chess_board_0x88_O, move_list_0x88_O) {

    if (chess_board_0x88_O.castling_K == 1) {
      // если ходит фигура с н1 то это белая ладья. отменяем рокировку в короткую сторону для белых
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.H1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_K = 0;
      }
      // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.E1) {
        chess_board_0x88_O.castling_K = 0;
        chess_board_0x88_O.castling_Q = 0;
      }
    }

    if (chess_board_0x88_O.castling_Q == 1) {
      // если ходит фигура с a1 то это белая ладья. отменяем рокировку в длинную сторону для белых
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.A1) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_Q = 0;
      }
      // если ходит фигура с e1 то это белый король. отменяем все рокировки для белых
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.E1) {
        chess_board_0x88_O.castling_K = 0;
        chess_board_0x88_O.castling_Q = 0;
      }
    }

    if (chess_board_0x88_O.castling_k == 1) {
      // если ходит фигура с н8 то это черная ладья. отменяем рокировку в короткую сторону для черных
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.H8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_k = 0;
      }
      // если ходит фигура с e8 то это черный король. отменяем все рокировки для черных
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.E8) {
        chess_board_0x88_O.castling_k = 0;
        chess_board_0x88_O.castling_q = 0;
      }
    }

    if (chess_board_0x88_O.castling_q == 1) {
      // если ходит фигура с a8 то это черная ладья. отменяем рокировку в длинную сторону для черных
      if (move_list_0x88_O.from[move_i] == Move_generator_0x88_С.A8) {
        // рокировка белых в короткую сторону  1/0
        chess_board_0x88_O.castling_q = 0;
      }
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

      // разрешение взятия на проходе 1/0
      chess_board_0x88_O.en_passant_yes = 0;

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

      // разрешение взятия на проходе 1/0
      chess_board_0x88_O.en_passant_yes = 0;

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

    // разрешение взятия на проходе 1/0
    chess_board_0x88_O.en_passant_yes = 0;

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