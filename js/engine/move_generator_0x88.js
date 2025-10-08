/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_generator_0x88.js
 * @version created 29.09m.2025 
 * last modified 29.09m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Move_generator_0x88_С {

    static NAME = "Move_generator_0x88_С";
    // 0,   1,   2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12,  13,  14,  15,
    // 16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,
    // 32,  33,  34,  35,  36,  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,
    // 48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,
    // 64,  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,  78,  79,
    // 80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,  91,  92,  93,  94,  95,
    // 96,  97,  98,  99,  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
    // 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127

    /*
    0   1   2
    16  17  18
    32  33  34    
    */
    moves_king = [-16, -15, 1, 17, 16, 15, -1, -17];
    moves_queen = this.moves_king;
    /*
       1      
  16 17 18
     33
  */
    moves_rook = [-16, 1, 16, -1];
    /*
     0    2     
       17
     32   34
    */
    moves_bishop = [-15, 17, 15, -17];
    /*
         1---3    
     16    |   20
      |---34---|
     48    |   52     
        65---67
    */
    moves_knight = [-33, -31, -14, 18, 33, 31, 14, -18];

    constructor() {

    }

    iniM() {
    }

    // генерируем всевозможные ходы, но не учитываем шахи и вскрытые шахи.
    generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O) {

        //console.log('Move_generator_0x88_С->generated_pseudo_legal_moves');
        let piece_color = -1;
        let piece = -1;
        let side_to_move = -1;

        move_list_0x88_O.clear_list();

        for (let from = 0; from < 128; from++) {
            // если мы не вышли за пределы доски
            if ((from & 136) == 0) {// 136 0x88

                side_to_move = chess_board_0x88_O.side_to_move;
                piece_color = chess_board_0x88_O.sq_piece_color_0x88[from];
                piece = chess_board_0x88_O.sq_piece_0x88[from];

                // если фигура иммеет цвет ходящей стороны
                if (piece_color == side_to_move) {
                    // смотрим фигуру на доске
                    switch (piece) {
                        case 6:// KING
                            this.generated_moves_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                            this.generated_moves_castle_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                            break;
                        case 5://QUEEN
                            this.generated_moves_queen(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                            break;
                        case 4://ROOK
                            this.generated_moves_rook(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                            break;
                        case 3://BISHOP
                            this.generated_moves_bishop(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                            break;
                        case 2://KNIGHT
                            this.generated_moves_knight(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                            break;
                        case 1://PAWN
                            this.generated_moves_pawn(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                            break;

                        default://
                        // console.log("default");
                    }
                }
            }
        }
    }

    add_move(type_move, from, to, piece, piece_color, type_captures_move, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let piece_color_to = -1;
        let capture_piece = -1;
        piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to];

        if (piece_to == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
            return 0;// можно продолжать луч
        } else if (piece_color != piece_color_to) {// мы уже знаем что тут есть фигура и если цвет отличен, то это взятие  
            capture_piece = piece_to;
            move_list_0x88_O.add_captures_move(type_captures_move, piece, piece_color, capture_piece, from, to);
            return 1;// луч прерываем на вражеской фигуре включительно
        } else {//на свою фигуру не прыгаем. хода нет. 
            return 1;// луч прерываем на своей фигуре не включительно
        }
    }

    generated_moves_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        console.log("king " + piece + " c " + piece_color + " f " + from);
        //console.log("king");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);

        //moves_king  = [-16, -15, 1, 17, 16, 15, -1, -17];
        let to = -1;
        let bre_ak = -1;
        for (let j = 0; j < 8; j++) {
            to = from + this.moves_king[j];
            if ((to & 136) == 0) {// если мы не вышли за пределы доски
                bre_ak = this.add_move(Move_list_0x88_С.KING_MOVE, from, to, piece, piece_color, Move_list_0x88_С.KING_CAPTURES,
                    chess_board_0x88_O, move_list_0x88_O);
            }
        }
    }

    generated_moves_queen(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        console.log("queen " + piece + " c " + piece_color + " f " + from);
        //console.log("queen");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);

        //    moves_king = [-16, -15, 1, 17, 16, 15, -1, -17];
        //    moves_queen = this.moves_king;
        let to = -1;
        let bre_ak = -1;

        for (let j = 0; j < 8; j++) {
            to = from + this.moves_queen[j];
            if ((to & 136) == 0) {// если мы не вышли за пределы доски
                while (true) {
                    bre_ak = this.add_move(Move_list_0x88_С.QUEEN_MOVE, from, to, piece, piece_color, Move_list_0x88_С.QUEEN_CAPTURES
                        , chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_queen[j];
                    if ((to & 136) != 0) break;
                }
            }
        }
    }

    generated_moves_rook(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        console.log("rook " + piece + " c " + piece_color + " f " + from);
        //console.log("rook");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);

        //moves_rook = [-16, 1, 16, -1];
        let to = -1;
        let bre_ak = -1;

        for (let j = 0; j < 4; j++) {
            to = from + this.moves_rook[j];
            if ((to & 136) == 0) {// если мы не вышли за пределы доски
                while (true) {
                    bre_ak = this.add_move(Move_list_0x88_С.ROOK_MOVE, from, to, piece, piece_color, Move_list_0x88_С.ROOK_CAPTURES,
                        chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_rook[j];
                    if ((to & 136) != 0) break;
                }
            }
        }
    }

    generated_moves_bishop(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        console.log("bishop " + piece + " c " + piece_color + " f " + from);
        //console.log("bishop");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);

        //moves_bishop = [-15, 17, 15, -17];
        let to = -1;
        let bre_ak = -1;

        for (let j = 0; j < 4; j++) {
            to = from + this.moves_bishop[j];
            if ((to & 136) == 0) {// если мы не вышли за пределы доски
                while (true) {
                    bre_ak = this.add_move(Move_list_0x88_С.BISHOP_MOVE, from, to, piece, piece_color, Move_list_0x88_С.BISHOP_CAPTURES,
                        chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_bishop[j];
                    if ((to & 136) != 0) break;
                }
            }
        }

    }

    generated_moves_knight(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        console.log("knight " + piece + " c " + piece_color + " f " + from);
        //console.log("knight");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);
        //moves_knight = [-33, -31, -14, 18, 33, 31, 14, -18];
        let to = -1;
        let bre_ak = -1;

        for (let j = 0; j < 8; j++) {
            to = from + this.moves_knight[j];
            if ((to & 136) == 0) {// если мы не вышли за пределы доски
                bre_ak = this.add_move(Move_list_0x88_С.KNIGHT_MOVE, from, to, piece, piece_color, Move_list_0x88_С.KNIGHT_CAPTURES,
                    chess_board_0x88_O, move_list_0x88_O);
            }
        }
    }

    generated_moves_castle_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let to = -1;
        let piece_to_1 = -1;
        let piece_to_2 = -1;
        let piece_to_3 = -1;
        let type_move = -1;

        if (from == 116) {// король стоит на стартовой позиции
            if (piece_color == 1) {// король белый
                if (chess_board_0x88_O.castling_Q == 1) {// рокировка белых в длинную сторону   1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[113];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[114];
                    piece_to_3 = chess_board_0x88_O.sq_piece_0x88[115];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                        type_move = Move_list_0x88_С.KING_QUEEN_CASTLE;
                        to = 114;
                        move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    }
                }

                if (chess_board_0x88_O.castling_K == 1) {// рокировка белых в короткую сторону  1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[117];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[118];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                        type_move = Move_list_0x88_С.KING_CASTLE;
                        to = 118;
                        move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    }
                }
            }
        } else if (from == 4) {// король стоит на стартовой позиции
            if (piece_color == 0) {// король черный
                if (chess_board_0x88_O.castling_q == 1) {// рокировка черных в длинную сторону   1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[1];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[2];
                    piece_to_3 = chess_board_0x88_O.sq_piece_0x88[3];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                        type_move = Move_list_0x88_С.KING_QUEEN_CASTLE;
                        to = 2;
                        move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    }
                }

                if (chess_board_0x88_O.castling_k == 1) {// рокировка черных в короткую сторону  1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[5];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[6];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                        type_move = Move_list_0x88_С.KING_CASTLE;
                        to = 6;
                        move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    }
                }
            }
        }
    }

    generated_moves_pawn(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        console.log("pawn " + piece + " c " + piece_color + " f " + from);
        //console.log("pawn");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);

        if (piece_color == 1) {// белая пешка
            this.generated_moves_pawn_white(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
        } else if (piece_color == 0) {
            this.generated_moves_pawn_black(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
        }
    }

    //
    generated_moves_pawn_white(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {

        if (Math.floor(from / 16) == 6) {// белые пешки на стартовой позиции. можно ходить на две клетки
            this.generated_moves_pawn_double(from, (from - 16), (from - 32), piece, piece_color,
                chess_board_0x88_O, move_list_0x88_O);
        }
        if (Math.floor(from / 16) == 1) {// 136 0x88
            this.generated_moves_pawn_promo(from, (from - 16), (from - 17), (from - 15), piece,
                piece_color, chess_board_0x88_O, move_list_0x88_O);
        } else {
            this.generated_moves_pawn_one(from, (from - 16), piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
        }
        this.generated_moves_pawn_captures(from, (from - 17), (from - 15), piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
    }

    //
    generated_moves_pawn_black(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {

        if (Math.floor(from / 16) == 1) {// белые пешки на стартовой позиции. можно ходить на две клетки
            this.generated_moves_pawn_double(from, (from + 16), (from + 32), piece, piece_color,
                chess_board_0x88_O, move_list_0x88_O);
        }
        if (Math.floor(from / 16) == 6) {// 136 0x88
            this.generated_moves_pawn_promo(from, (from + 16), (from + 17), (from + 15), piece, piece_color,
                chess_board_0x88_O, move_list_0x88_O);
        } else {
            this.generated_moves_pawn_one(from, (from + 16), piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
        }
        this.generated_moves_pawn_captures(from, (from + 17), (from + 15), piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
    }



    // ход пешки на одну клетку
    generated_moves_pawn_one(from, to, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let type_move = -1;
        piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
            type_move = Move_list_0x88_С.PAWN_MOVE;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
        }
    }

    // ход пешки на две клетки
    generated_moves_pawn_double(from, to, to2, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let piece_to2 = -1;
        let type_move = -1;
        piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        piece_to2 = chess_board_0x88_O.sq_piece_0x88[to2];
        if ((piece_to == 0) && (piece_to2 == 0)) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
            type_move = Move_list_0x88_С.PAWN_MOVE;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to2, chess_board_0x88_O, move_list_0x88_O);
            chess_board_0x88_O.en_passant_yes = 1;
            chess_board_0x88_O.en_passant_target_square = to;
        }
    }

    generated_moves_pawn_captures(from, to1, to2, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_color_to = -1;
        let piece_to = -1;
        let capture_piece = -1;
        let type_move = -1;

        if ((to1 & 136) == 0) {// 136 0x88
            piece_to = chess_board_0x88_O.sq_piece_0x88[to1];
            piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to1];
            if ((piece_to != 0) && (piece_color != piece_color_to)) {// 
                type_move = Move_list_0x88_С.PAWN_CAPTURES;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to1];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to1);
            } else if ((chess_board_0x88_O.en_passant_yes = 1) && (chess_board_0x88_O.en_passant_target_square == to1)) {
                type_move = Move_list_0x88_С.EP_CAPTURES;
                capture_piece = -1;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to1);
            }
        }
        if ((to2 & 136) == 0) {// 136 0x88    
            piece_to = chess_board_0x88_O.sq_piece_0x88[to2];
            piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to2];
            if ((piece_to != 0) && (piece_color != piece_color_to)) {// 
                type_move = Move_list_0x88_С.PAWN_CAPTURES;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to2];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to2);
            } else if ((chess_board_0x88_O.en_passant_yes = 1) && (chess_board_0x88_O.en_passant_target_square == to2)) {
                type_move = Move_list_0x88_С.EP_CAPTURES;
                capture_piece = -1;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to2);
            }
        }

    }

    generated_moves_pawn_promo(from, to1, to2, to3, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_color_to = -1;
        let piece_to = -1;
        let capture_piece = -1;
        let type_move = -1;

        // ход с превращением
        piece_to = chess_board_0x88_O.sq_piece_0x88[to1];
        if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
            type_move = Move_list_0x88_С.QUEEN_PROMOTION;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to1);
            type_move = Move_list_0x88_С.ROOK_PROMOTION;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to1);
            type_move = Move_list_0x88_С.BISHOP_PROMOTION;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to1);
            type_move = Move_list_0x88_С.KNIGHT_PROMOTION;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to1);
        }

        // взятие пешкой влево с превращением
        if ((to2 & 136) == 0) {// 136 0x88                
            piece_to = chess_board_0x88_O.sq_piece_0x88[to2];
            piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to2];
            if ((piece_to != 0) && (piece_color != piece_color_to)) {// 
                type_move = Move_list_0x88_С.QUEEN_PROMO_CAPTURE;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to2];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to2);
                type_move = Move_list_0x88_С.ROOK_PROMO_CAPTURE;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to2];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to2);
                type_move = Move_list_0x88_С.BISHOP_PROMO_CAPTURE;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to2];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to2);
                type_move = Move_list_0x88_С.KNIGHT_PROMO_CAPTURE;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to2];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to2);
            }
        }
        // взятие пешкой вправо с превращением
        if ((to3 & 136) == 0) {// 136 0x88      
            piece_to = chess_board_0x88_O.sq_piece_0x88[to3];
            piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to3];
            if ((piece_to != 0) && (piece_color != piece_color_to)) {// 
                type_move = Move_list_0x88_С.QUEEN_PROMO_CAPTURE;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to3];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to3);
                type_move = Move_list_0x88_С.ROOK_PROMO_CAPTURE;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to3];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to3);
                type_move = Move_list_0x88_С.BISHOP_PROMO_CAPTURE;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to3];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to3);
                type_move = Move_list_0x88_С.KNIGHT_PROMO_CAPTURE;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to3];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to3);
            }
        }
    }
}