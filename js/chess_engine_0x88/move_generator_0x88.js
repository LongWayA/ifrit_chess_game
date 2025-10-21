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

    static A1 = 112;    
    static B1 = 113;
    static C1 = 114;
    static D1 = 115;
    static E1 = 116;
    static F1 = 117;
    static G1 = 118;
    static H1 = 119;    

    static A8 = 0;   
    static B8 = 1;
    static C8 = 2;
    static D8 = 3;
    static E8 = 4;
    static F8 = 5;
    static G8 = 6;
    static H8 = 7;
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
            this.generated_pseudo_legal_moves_one_piece(from, chess_board_0x88_O, move_list_0x88_O, piece, piece_color, side_to_move);
        }
    }

    //  считаем ходы одной фигуры из конкретной позиции
    generated_pseudo_legal_moves_one_piece_for_gui(from, chess_board_0x88_O, move_list_0x88_O) {
        //console.log('Move_generator_0x88_С->generated_pseudo_legal_moves');
        let piece_color = -1;
        let piece = -1;
        let side_to_move = -1;
        move_list_0x88_O.clear_list();
        this.generated_pseudo_legal_moves_one_piece(from, chess_board_0x88_O, move_list_0x88_O, piece, piece_color, side_to_move);
    }


    //  считаем ходы одной фигуры из конкретной позиции
    generated_pseudo_legal_moves_one_piece(from, chess_board_0x88_O, move_list_0x88_O, piece, piece_color, side_to_move) {

        // если мы не вышли за пределы доски
        if ((from & 136) == 0) {// 136 0x88

            side_to_move = chess_board_0x88_O.side_to_move;
            piece_color = chess_board_0x88_O.sq_piece_color_0x88[from];
            piece = chess_board_0x88_O.sq_piece_0x88[from];

            // если фигура иммеет цвет ходящей стороны
            if (piece_color == side_to_move) {

                // смотрим фигуру на доске
                switch (piece) {
                    case Chess_board_0x88_C.KING:// KING
                        this.generated_moves_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        this.generated_moves_castle_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.QUEEN://QUEEN
                        this.generated_moves_queen(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.ROOK://ROOK
                        this.generated_moves_rook(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.BISHOP://BISHOP
                        this.generated_moves_bishop(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.KNIGHT://KNIGHT
                        this.generated_moves_knight(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.PAWN://PAWN
                        this.generated_moves_pawn(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;

                    default://
                    // console.log("default");
                }
            }
        }
    }

    // могут быть простые ходы, а могут быть взятия
    add_move(type_move, type_captures_move, from, to, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let piece_color_to = -1;
        let capture_piece = -1;
        piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to];

        if (piece_to == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to, 0);
            return 0;// можно продолжать луч
        } else if (piece_color != piece_color_to) {// мы уже знаем что тут есть фигура и если цвет отличен, то это взятие  
            capture_piece = piece_to;
            move_list_0x88_O.add_captures_move(type_captures_move, piece, piece_color, capture_piece, from, to, 0);
            return 1;// луч прерываем на вражеской фигуре включительно
        } else {//на свою фигуру не прыгаем. хода нет. 
            return 1;// луч прерываем на своей фигуре не включительно
        }
    }

    generated_moves_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        //console.log("king " + piece + " c " + piece_color + " f " + from);
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
                bre_ak = this.add_move(Move_list_0x88_С.KING_MOVE, Move_list_0x88_С.KING_CAPTURES, from, to, piece, piece_color,
                    chess_board_0x88_O, move_list_0x88_O);
            }
        }
    }

    generated_moves_queen(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        //console.log("queen " + piece + " c " + piece_color + " f " + from);
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
                    bre_ak = this.add_move(Move_list_0x88_С.QUEEN_MOVE, Move_list_0x88_С.QUEEN_CAPTURES, from, to, piece, piece_color,
                        chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;// уперлись в фигуру
                    to = to + this.moves_queen[j];
                    if ((to & 136) != 0) break;// конец доски
                }
            }
        }
    }

    generated_moves_rook(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        //console.log("rook " + piece + " c " + piece_color + " f " + from);
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
                    bre_ak = this.add_move(Move_list_0x88_С.ROOK_MOVE, Move_list_0x88_С.ROOK_CAPTURES, from, to, piece, piece_color,
                        chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_rook[j];
                    if ((to & 136) != 0) break;
                }
            }
        }
    }

    generated_moves_bishop(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        //console.log("bishop " + piece + " c " + piece_color + " f " + from);
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
                    bre_ak = this.add_move(Move_list_0x88_С.BISHOP_MOVE, Move_list_0x88_С.BISHOP_CAPTURES, from, to, piece, piece_color,
                        chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_bishop[j];
                    if ((to & 136) != 0) break;
                }
            }
        }

    }

    generated_moves_knight(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        //console.log("knight " + piece + " c " + piece_color + " f " + from);
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
                bre_ak = this.add_move(Move_list_0x88_С.KNIGHT_MOVE, Move_list_0x88_С.KNIGHT_CAPTURES, from, to, piece, piece_color,
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

        if (from == Move_generator_0x88_С.E1) {// король стоит на стартовой позиции
            if (piece_color == 1) {// король белый
                if (chess_board_0x88_O.castling_Q == 1) {// рокировка белых в длинную сторону   1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.B1];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.C1];
                    piece_to_3 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.D1];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                        type_move = Move_list_0x88_С.KING_QUEEN_CASTLE;
                        to = Move_generator_0x88_С.C1;
                        move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to, 0);
                    }
                }

                if (chess_board_0x88_O.castling_K == 1) {// рокировка белых в короткую сторону  1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.F1];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.G1];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                        type_move = Move_list_0x88_С.KING_CASTLE;
                        to = Move_generator_0x88_С.G1;
                        move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to, 0);
                    }
                }
            }

        } else if (from == Move_generator_0x88_С.E8) {// король стоит на стартовой позиции
            if (piece_color == 0) {// король черный
                if (chess_board_0x88_O.castling_q == 1) {// рокировка черных в длинную сторону   1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.B8];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.C8];
                    piece_to_3 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.D8];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                        type_move = Move_list_0x88_С.KING_QUEEN_CASTLE;
                        to = Move_generator_0x88_С.C8;
                        move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to, 0);
                    }
                }

                if (chess_board_0x88_O.castling_k == 1) {// рокировка черных в короткую сторону  1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.F8];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[Move_generator_0x88_С.G8];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                        type_move = Move_list_0x88_С.KING_CASTLE;
                        to = Move_generator_0x88_С.G8;
                        move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to, 0);
                    }
                }
            }
        }
    }

    generated_moves_pawn(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        //console.log("pawn " + piece + " c " + piece_color + " f " + from);
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

        if (Math.floor(from / 16) == 6) {// белая пешка на стартовой позиции(2-ая линия). можно ходить на две клетки
            this.generated_moves_pawn_double(from, (from - 16), (from - 32), piece, piece_color,
                chess_board_0x88_O, move_list_0x88_O);
        }
        if (Math.floor(from / 16) == 1) {// белая пешка на на предпоследней позиции(7-ая линия). можно ходить с превращением
            this.generated_moves_pawn_promo(from, (from - 17), (from - 16), (from - 15), piece,
                piece_color, chess_board_0x88_O, move_list_0x88_O);
        } else {
            this.generated_moves_pawn_one(from, (from - 16), piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
            this.generated_moves_pawn_captures(from, (from - 17), (from - 15), piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
        }

    }

    //
    generated_moves_pawn_black(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {

        if (Math.floor(from / 16) == 1) {// белые пешки на стартовой позиции. можно ходить на две клетки
            this.generated_moves_pawn_double(from, (from + 16), (from + 32), piece, piece_color,
                chess_board_0x88_O, move_list_0x88_O);
        }
        if (Math.floor(from / 16) == 6) {// 136 0x88
            this.generated_moves_pawn_promo(from, (from + 15), (from + 16), (from + 17), piece, piece_color,
                chess_board_0x88_O, move_list_0x88_O);
        } else {
            this.generated_moves_pawn_one(from, (from + 16), piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
            this.generated_moves_pawn_captures(from, (from + 15), (from + 17), piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
        }

    }

    // ход пешки на одну клетку
    generated_moves_pawn_one(from, to, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let type_move = -1;
        piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
            type_move = Move_list_0x88_С.PAWN_MOVE;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O, 0);
        }
    }

    // ход пешки на две клетки
    generated_moves_pawn_double(from, to_void, to, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let piece_to_void = -1;
        let type_move = -1;
        piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        piece_to_void = chess_board_0x88_O.sq_piece_0x88[to_void];
        if ((piece_to == 0) && (piece_to_void == 0)) {// фигур там нет. можно ходить. это спокойный ход
            type_move = Move_list_0x88_С.PAWN_DOUBLE_PUSH;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O, 0);
        }
    }

    generated_moves_pawn_captures(from, to_left, to_right, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_color_to = -1;
        let piece_to = -1;
        let capture_piece = -1;
        let type_move = -1;

        if ((to_left & 136) == 0) {// 136 0x88
            piece_to = chess_board_0x88_O.sq_piece_0x88[to_left];
            piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to_left];
            if ((piece_to != 0) && (piece_color != piece_color_to)) {// 
                type_move = Move_list_0x88_С.PAWN_CAPTURES;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to_left];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_left);
            } else if ((chess_board_0x88_O.en_passant_yes == 1) && (chess_board_0x88_O.en_passant_target_square == to_left)) {
                type_move = Move_list_0x88_С.EP_CAPTURES;
                capture_piece = 0;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_left);
            }
        }
        if ((to_right & 136) == 0) {// 136 0x88    
            piece_to = chess_board_0x88_O.sq_piece_0x88[to_right];
            piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to_right];
            if ((piece_to != 0) && (piece_color != piece_color_to)) {// 
                type_move = Move_list_0x88_С.PAWN_CAPTURES;
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to_right];
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_right);
            } else if ((chess_board_0x88_O.en_passant_yes == 1) && (chess_board_0x88_O.en_passant_target_square == to_right)) {
                type_move = Move_list_0x88_С.EP_CAPTURES;
                capture_piece = 0;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_right);
            }
        }

    }

    generated_moves_pawn_promo(from, to_left, to_center, to_right, piece, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_color_to = -1;
        let piece_to = -1;
        let capture_piece = -1;
        let type_move = -1;

        // ход с превращением
        piece_to = chess_board_0x88_O.sq_piece_0x88[to_center];
        if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
            type_move = Move_list_0x88_С.QUEEN_PROMOTION;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to_center, 0);
            type_move = Move_list_0x88_С.ROOK_PROMOTION;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to_center, 0);
            type_move = Move_list_0x88_С.BISHOP_PROMOTION;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to_center, 0);
            type_move = Move_list_0x88_С.KNIGHT_PROMOTION;
            move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to_center, 0);
        }

        // взятие пешкой влево с превращением
        if ((to_left & 136) == 0) {// 136 0x88                
            piece_to = chess_board_0x88_O.sq_piece_0x88[to_left];
            piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to_left];
            if ((piece_to != 0) && (piece_color != piece_color_to)) {// 
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to_left];
                type_move = Move_list_0x88_С.QUEEN_PROMO_CAPTURE;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_left);
                type_move = Move_list_0x88_С.ROOK_PROMO_CAPTURE;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_left);
                type_move = Move_list_0x88_С.BISHOP_PROMO_CAPTURE;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_left);
                type_move = Move_list_0x88_С.KNIGHT_PROMO_CAPTURE;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_left);
            }
        }
        // взятие пешкой вправо с превращением
        if ((to_right & 136) == 0) {// 136 0x88      
            piece_to = chess_board_0x88_O.sq_piece_0x88[to_right];
            piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to_right];
            if ((piece_to != 0) && (piece_color != piece_color_to)) {// 
                capture_piece = chess_board_0x88_O.sq_piece_0x88[to_right];
                type_move = Move_list_0x88_С.QUEEN_PROMO_CAPTURE;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_right);
                type_move = Move_list_0x88_С.ROOK_PROMO_CAPTURE;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_right);
                type_move = Move_list_0x88_С.BISHOP_PROMO_CAPTURE;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_right);
                type_move = Move_list_0x88_С.KNIGHT_PROMO_CAPTURE;
                move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to_right);
            }
        }
    }

    // ищем шахи
    check_detected(from, piece_color, chess_board_0x88_O) {

        let move_list_0x88_O = new Move_list_0x88_С();
        let check = -1;

        // 1 knight
        move_list_0x88_O.clear_list();       
        this.generated_moves_knight(from, Chess_board_0x88_C.KNIGHT, piece_color, chess_board_0x88_O, move_list_0x88_O);
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            if (move_list_0x88_O.name_capture_piece[i] == Chess_board_0x88_C.KNIGHT) {
                check = Chess_board_0x88_C.KNIGHT;
                return check;
            }
        }

        // 2 bishop + 1/2 queen
        move_list_0x88_O.clear_list();        
        this.generated_moves_bishop(from, Chess_board_0x88_C.BISHOP, piece_color, chess_board_0x88_O, move_list_0x88_O);
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            if (move_list_0x88_O.name_capture_piece[i] == Chess_board_0x88_C.BISHOP) {
                check = Chess_board_0x88_C.BISHOP;
                return check;
            }
            if (move_list_0x88_O.name_capture_piece[i] == Chess_board_0x88_C.QUEEN) {
                check = Chess_board_0x88_C.QUEEN;
                return check;
            }
        }

        // 3 rook + 1/2 queen
        move_list_0x88_O.clear_list();        
        this.generated_moves_rook(from, Chess_board_0x88_C.ROOK, piece_color, chess_board_0x88_O, move_list_0x88_O);
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {

            if (move_list_0x88_O.name_capture_piece[i] == Chess_board_0x88_C.ROOK) {
                check = Chess_board_0x88_C.ROOK;
                return check;
            }
            if (move_list_0x88_O.name_capture_piece[i] == Chess_board_0x88_C.QUEEN) {
                check = Chess_board_0x88_C.QUEEN;
                return check;
            }
        }

        // 1 pawn
        move_list_0x88_O.clear_list();        
        this.generated_moves_pawn(from, Chess_board_0x88_C.PAWN, piece_color, chess_board_0x88_O, move_list_0x88_O);
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            if (move_list_0x88_O.name_capture_piece[i] == Chess_board_0x88_C.PAWN) {
                check = Chess_board_0x88_C.PAWN;
                return check;
            }
        }

        check = 0;// нет шаха
        return check;
    }
}