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

  d = 0;// 



  constructor() {

  }

  iniM() {

  }

  make_any_move_0x88(move_i, chess_board_0x88_O, undo_0x88_O, move_list_0x88_O) {
    //undo <
    // цвет хода 0 - черные 1 - белые
    undo_0x88_O.side_to_move = chess_board_0x88_O.side_to_move;
    // разрешение взятия на проходе 1/0
    undo_0x88_O.en_passant_yes = chess_board_0x88_O.en_passant_yes;
    // координата битого поля
    undo_0x88_O.en_passant_target_square = chess_board_0x88_O.en_passant_target_square;
    // рокировка белых в длинную сторону   1/0
    undo_0x88_O.castling_Q = chess_board_0x88_O.castling_Q;
    // рокировка белых в короткую сторону  1/0
    undo_0x88_O.castling_K = chess_board_0x88_O.castling_K;
    // рокировка черных в длинную сторону  1/0
    undo_0x88_O.castling_q = chess_board_0x88_O.castling_q;
    // рокировка черных в короткую сторону 1/0
    undo_0x88_O.castling_k = chess_board_0x88_O.castling_k;
    // оценка позиции
    undo_0x88_O.eval = chess_board_0x88_O.eval;

    undo_0x88_O.name_capture_piece = chess_board_0x88_O.sq_piece_0x88[move_list_0x88_O.to[move_i]];
    undo_0x88_O.color_capture_piece = chess_board_0x88_O.sq_piece_color_0x88[move_list_0x88_O.to[move_i]];
    // > undo 

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

    // this.piece_color[this.number_move] = piece_color;
    // this.name_capture_piece[this.number_move] = capture_piece;

  }

  do_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O) {
console.log("Make_move_0x88_C->do_moves  move_i " + move_i);
    let type_move = move_list_0x88_O.type_move[move_i];

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
        this.make_any_move_0x88(move_i, chess_board_0x88_O, undo_0x88_O, move_list_0x88_O);
        break;
      case Move_list_0x88_С.EP_CAPTURES:// взятие на проходе


        break;

      //простые ходы
      case Move_list_0x88_С.PAWN_MOVE:// ход пешкой
      case Move_list_0x88_С.KNIGHT_MOVE:// ход конем
      case Move_list_0x88_С.BISHOP_MOVE:// ход слоном
      case Move_list_0x88_С.ROOK_MOVE:// ход ладьей
      case Move_list_0x88_С.QUEEN_MOVE:// ход ферзем
      case Move_list_0x88_С.KING_MOVE:// простой ход королем
        this.make_any_move_0x88(move_i, chess_board_0x88_O, undo_0x88_O, move_list_0x88_O);
        break;

      // специальные ходы
      case Move_list_0x88_С.PAWN_DOUBLE_PUSH:// ход пешкой на две клетки
        this.make_any_move_0x88(move_i, chess_board_0x88_O, undo_0x88_O, move_list_0x88_O);
        chess_board_0x88_O.en_passant_yes = 1;
        if (move_list_0x88_O.piece_color[move_i] == 1) {
          // координата битого поля
          chess_board_0x88_O.en_passant_target_square = move_list_0x88_O.from[move_i] - 16;
        } else {
          chess_board_0x88_O.en_passant_target_square = move_list_0x88_O.from[move_i] + 16;
        }
        break;

      case Move_list_0x88_С.KING_CASTLE:// короткая рокировка

        break;
      //
      case Move_list_0x88_С.KING_QUEEN_CASTLE:// длинная рокировка

        break;

      // пешка - взятия с превращением
      case Move_list_0x88_С.KNIGHT_PROMO_CAPTURE:// взятие пешкой с превращением в коня

        break;
      //
      case Move_list_0x88_С.BISHOP_PROMO_CAPTURE:// взятие пешкой с превращением в слона

        break;
      //
      case Move_list_0x88_С.ROOK_PROMO_CAPTURE:// взятие пешкой с превращением в ладью

        break;
      //
      case Move_list_0x88_С.QUEEN_PROMO_CAPTURE:// взятие пешкой с превращением в ферзя

        break;

      // превращения пешки
      case Move_list_0x88_С.KNIGHT_PROMOTION:// пешка превращается в коня

        break;
      //
      case Move_list_0x88_С.BISHOP_PROMOTION:// пешка превращается в в слона

        break;
      //
      case Move_list_0x88_С.ROOK_PROMOTION:// пешка превращается в в ладью

        break;
      //
      case Move_list_0x88_С.QUEEN_PROMOTION:// пешка превращается в ферзя 

        break;

      default://
      // console.log("default");
    }
  }

  do_undo_moves(chess_board_0x88_O, chess_board_0x88_O_s) {
    console.log("Make_move_0x88_C->do_undo_moves");
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
    chess_board_0x88_O_s.eval = chess_board_0x88_O.eval;
  }

  //  undo_moves(move_i, chess_board_0x88_O, move_list_0x88_O, undo_0x88_O) {
  undo_moves(chess_board_0x88_O, chess_board_0x88_O_s) {
   console.log("Make_move_0x88_C->undo_moves");
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
    chess_board_0x88_O.eval = chess_board_0x88_O_s.eval;


    // let type_move = move_list_0x88_O.type_move[move_i];

    // // смотрим 
    // switch (type_move) {
    //   case Move_list_0x88_С.NO_MOVE:// нет хода
    //     break;

    //   // CAPTURES  
    //   case Move_list_0x88_С.PAWN_CAPTURES:// взятие пешкой

    //     break;
    //   case Move_list_0x88_С.KNIGHT_CAPTURES:// взятие конем

    //     break;
    //   case Move_list_0x88_С.BISHOP_CAPTURES:// взятие слоном

    //     break;
    //   case Move_list_0x88_С.ROOK_CAPTURES:// взятие ладьей

    //     break;
    //   case Move_list_0x88_С.QUEEN_CAPTURES:// взятие ферзем

    //     break;
    //   case Move_list_0x88_С.KING_CAPTURES://  взятие королем

    //     break;
    //   case Move_list_0x88_С.EP_CAPTURES:// взятие на проходе

    //     break;

    //   //MOVE
    //   case Move_list_0x88_С.PAWN_MOVE:// ход пешкой

    //     break;
    //   case Move_list_0x88_С.KNIGHT_MOVE:// ход конем

    //     break;

    //   case Move_list_0x88_С.BISHOP_MOVE:// ход слоном

    //     break;
    //   case Move_list_0x88_С.ROOK_MOVE:// ход ладьей

    //     break;

    //   case Move_list_0x88_С.QUEEN_MOVE:// ход ферзем

    //     break;
    //   case Move_list_0x88_С.KING_MOVE:// простой ход королем

    //     break;

    //   // специальные ходы
    //   case Move_list_0x88_С.PAWN_DOUBLE_PUSH:// ход пешкой на две клетки

    //     break;

    //   case Move_list_0x88_С.KING_CASTLE:// короткая рокировка

    //     break;
    //   //
    //   case Move_list_0x88_С.KING_QUEEN_CASTLE:// длинная рокировка

    //     break;

    //   // пешка - взятия с превращением
    //   case Move_list_0x88_С.KNIGHT_PROMO_CAPTURE:// взятие пешкой с превращением в коня

    //     break;
    //   //
    //   case Move_list_0x88_С.BISHOP_PROMO_CAPTURE:// взятие пешкой с превращением в слона

    //     break;
    //   //
    //   case Move_list_0x88_С.ROOK_PROMO_CAPTURE:// взятие пешкой с превращением в ладью

    //     break;
    //   //
    //   case Move_list_0x88_С.QUEEN_PROMO_CAPTURE:// взятие пешкой с превращением в ферзя

    //     break;

    //   // превращения пешки
    //   case Move_list_0x88_С.KNIGHT_PROMOTION:// пешка превращается в коня

    //     break;
    //   //
    //   case Move_list_0x88_С.BISHOP_PROMOTION:// пешка превращается в в слона

    //     break;
    //   //
    //   case Move_list_0x88_С.ROOK_PROMOTION:// пешка превращается в в ладью

    //     break;
    //   //
    //   case Move_list_0x88_С.QUEEN_PROMOTION:// пешка превращается в ферзя 

    //     break;

    //   default://
    //   // console.log("default");
    // }
  }
}