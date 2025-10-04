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

    chess_board_0x88_O = null;
    move_list_0x88_O = null;
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
        this.chess_board_0x88_O = chess_board_0x88_O;
        this.move_list_0x88_O = move_list_0x88_O;
        //console.log('Move_generator_0x88_С->generated_pseudo_legal_moves');
        let piece_color = -1;
        let piece = -1;
        let side_to_move = -1;

        for (let from = 0; from < 128; from++) {
            // если мы не вышли за пределы доски
            if ((from & 136) == 0) {// 136 0x88

                side_to_move = this.chess_board_0x88_O.side_to_move;
                piece_color = this.chess_board_0x88_O.sq_piece_color_0x88[from];
                piece = this.chess_board_0x88_O.sq_piece_0x88[from];

                // если фигура иммеет цвет ходящей стороны
                if (piece_color == side_to_move) {
                    // смотрим фигуру на доске
                    switch (piece) {
                        case 6:// KING
                            this.generated_moves_king(from, piece, piece_color);
                            this.generated_moves_castle_king(from, piece, piece_color);
                            break;
                        case 5://QUEEN
                            this.generated_moves_queen(from, piece, piece_color);
                            break;
                        case 4://ROOK
                            this.generated_moves_rook(from, piece, piece_color);
                            break;
                        case 3://BISHOP
                            this.generated_moves_bishop(from, piece, piece_color);
                            break;
                        case 2://KNIGHT
                            this.generated_moves_knight(from, piece, piece_color);
                            break;
                        case 1://PAWN
                            this.generated_moves_pawn(from, piece, piece_color);
                            break;

                        default://
                            console.log("default");
                    }
                }
            }
        }
    }

    add_move(type_move, from, to, piece, piece_color, type_captures_move) {
        let piece_color_to = -1;
        let capture_piece = -1;
        piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];

        if (piece_color_to == -1) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
            this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
            return 0;// можно продолжать луч
        } else if (piece_color_to != piece_color) {// мы уже знаем что тут есть фигура и если цвет отличен то это взятие  
            capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
            this.move_list_0x88_O.add_captures_move(type_captures_move, piece, piece_color, capture_piece, from, to);
            return 1;// луч прерываем на вражеской фигуре включительно
        } else {//на свою фигуру не прыгаем. хода нет. 
            return 1;// луч прерываем на своей фигуре не включительно
        }
    }

    generated_moves_king(from, piece, piece_color) {
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
                bre_ak = this.add_move(Move_list_0x88_С.KING_MOVE, from, to, piece, piece_color, Move_list_0x88_С.KING_CAPTURES);
            }
        }
    }

    generated_moves_queen(from, piece, piece_color) {
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
                    bre_ak = this.add_move(Move_list_0x88_С.QUEEN_MOVE, from, to, piece, piece_color, Move_list_0x88_С.QUEEN_CAPTURES);
                    if (bre_ak == 1) break;
                    to = to + this.moves_queen[j];
                }
            }
        }
    }

    generated_moves_rook(from, piece, piece_color) {
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
                    bre_ak = this.add_move(Move_list_0x88_С.ROOK_MOVE, from, to, piece, piece_color, Move_list_0x88_С.ROOK_CAPTURES);
                    if (bre_ak == 1) break;
                    to = to + this.moves_rook[j];
                }
            }
        }
    }

    generated_moves_bishop(from, piece, piece_color) {
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
                    bre_ak = this.add_move(Move_list_0x88_С.BISHOP_MOVE, from, to, piece, piece_color, Move_list_0x88_С.BISHOP_CAPTURES);
                    if (bre_ak == 1) break;
                    to = to + this.moves_bishop[j];
                }
            }
        }

    }

    generated_moves_knight(from, piece, piece_color) {
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
                bre_ak = this.add_move(Move_list_0x88_С.KNIGHT_MOVE, from, to, piece, piece_color, Move_list_0x88_С.KNIGHT_CAPTURES);
            }
        }
    }

    generated_moves_castle_king(from, piece, piece_color) {
        let to = -1;
        let piece_color_to_1 = -1;
        let piece_color_to_2 = -1;
        let piece_color_to_3 = -1;
        let type_move = -1;

        if (from == 116) {// король стоит на стартовой позиции
            if (piece_color == 1) {// король белый
                if (this.chess_board_0x88_O.castling_Q == 1) {// рокировка белых в длинную сторону   1/0
                    piece_color_to_1 = this.chess_board_0x88_O.sq_piece_color_0x88[113];
                    piece_color_to_2 = this.chess_board_0x88_O.sq_piece_color_0x88[114];
                    piece_color_to_3 = this.chess_board_0x88_O.sq_piece_color_0x88[115];
                    if ((piece_color_to_1 == -1) && (piece_color_to_2 == -1) && (piece_color_to_3 == -1)) {//
                        type_move = Move_list_0x88_С.KING_QUEEN_CASTLE;
                        to = 114;
                        this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    }
                }

                if (this.chess_board_0x88_O.castling_K == 1) {// рокировка белых в короткую сторону  1/0
                    piece_color_to_1 = this.chess_board_0x88_O.sq_piece_color_0x88[117];
                    piece_color_to_2 = this.chess_board_0x88_O.sq_piece_color_0x88[118];
                    if ((piece_color_to_1 == -1) && (piece_color_to_2 == -1)) {//
                        type_move = Move_list_0x88_С.KING_CASTLE;
                        to = 118;
                        this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    }
                }
            }
        } else if (from == 4) {// король стоит на стартовой позиции
            if (piece_color == 0) {// король черный
                if (this.chess_board_0x88_O.castling_q == 1) {// рокировка черных в длинную сторону   1/0
                    piece_color_to_1 = this.chess_board_0x88_O.sq_piece_color_0x88[1];
                    piece_color_to_2 = this.chess_board_0x88_O.sq_piece_color_0x88[2];
                    piece_color_to_3 = this.chess_board_0x88_O.sq_piece_color_0x88[3];
                    if ((piece_color_to_1 == -1) && (piece_color_to_2 == -1) && (piece_color_to_3 == -1)) {//
                        type_move = Move_list_0x88_С.KING_QUEEN_CASTLE;
                        to = 2;
                        this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    }
                }

                if (this.chess_board_0x88_O.castling_k == 1) {// рокировка черных в короткую сторону  1/0
                    piece_color_to_1 = this.chess_board_0x88_O.sq_piece_color_0x88[5];
                    piece_color_to_2 = this.chess_board_0x88_O.sq_piece_color_0x88[6];
                    if ((piece_color_to_1 == -1) && (piece_color_to_2 == -1)) {//
                        type_move = Move_list_0x88_С.KING_CASTLE;
                        to = 6;
                        this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    }
                }
            }
        }
    }

    generated_moves_pawn(from, piece, piece_color) {
        console.log("pawn " + piece + " c " + piece_color + " f " + from);
        //console.log("pawn");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);

        let to = -1;
        let to2 = -1;
        let piece_color_to = -1;
        let piece_color_to2 = -1;
        let capture_piece = -1;
        let type_move = -1;


        if (piece_color == 1) {// белая пешка
            if (Math.floor(from / 16) == 6) {// белые пешки на стартовой позиции. можно ходить на две клетки
                to = from - 16;// ход белой пешки на одну клетку
                to2 = from - 32;// ход белой пешки на одну клетку
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                piece_color_to2 = this.chess_board_0x88_O.sq_piece_color_0x88[to2];
                if ((piece_color_to == -1) && (piece_color_to2 == -1)) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
                    type_move = Move_list_0x88_С.PAWN_MOVE;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to2);
                    this.chess_board_0x88_O.en_passant_yes = 1;
                    this.chess_board_0x88_O.en_passant_target_square = to;

                }
            }
            if (Math.floor(from / 16) == 1) {// 136 0x88
                // превращение пешки просто и со взятием
                to = from - 16;// ход белой пешки на одну клетку
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                if (piece_color_to == -1) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
                    type_move = Move_list_0x88_С.QUEEN_PROMOTION;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    type_move = Move_list_0x88_С.ROOK_PROMOTION;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    type_move = Move_list_0x88_С.BISHOP_PROMOTION;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    type_move = Move_list_0x88_С.KNIGHT_PROMOTION;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                }
                to = from - 17;// взятие белой пешкой влево
                if ((from & 136) == 0) {// 136 0x88                
                    piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                    if (piece_color_to == 0) {// 
                        type_move = Move_list_0x88_С.QUEEN_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.ROOK_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.BISHOP_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.KNIGHT_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                    }
                }
                to = from - 15;// взятие белой пешкой влево
                if ((from & 136) == 0) {// 136 0x88               
                    piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                    if (piece_color_to == 0) {// 
                        type_move = Move_list_0x88_С.QUEEN_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.ROOK_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.BISHOP_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.KNIGHT_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                    }
                }
            } else {
                to = from - 16;// ход белой пешки на одну клетку
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                if (piece_color_to == -1) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
                    type_move = Move_list_0x88_С.PAWN_MOVE;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                }
            }
            to = from - 17;// взятие белой пешкой влево
            if ((from & 136) == 0) {// 136 0x88
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                if (piece_color_to == 0) {// 
                    type_move = Move_list_0x88_С.PAWN_CAPTURES;
                    capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                    this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                } else if ((this.chess_board_0x88_O.en_passant_yes = 1) && (this.chess_board_0x88_O.en_passant_target_square == to)) {
                    type_move = Move_list_0x88_С.EP_CAPTURES;
                    capture_piece = -1;
                    this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                }
            }
            to = from - 15;// взятие белой пешкой вправо
            if ((from & 136) == 0) {// 136 0x88            
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                if (piece_color_to == 0) {// 
                    type_move = Move_list_0x88_С.PAWN_CAPTURES;
                    capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                    this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                } else if ((this.chess_board_0x88_O.en_passant_yes = 1) && (this.chess_board_0x88_O.en_passant_target_square == to)) {
                    type_move = Move_list_0x88_С.EP_CAPTURES;
                    capture_piece = -1;
                    this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                }
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } else if (piece_color == 0) {
            if (Math.floor(from / 16) == 6) {// белые пешки на стартовой позиции. можно ходить на две клетки
                to = from - 16;// ход белой пешки на одну клетку
                to2 = from - 32;// ход белой пешки на одну клетку
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                piece_color_to2 = this.chess_board_0x88_O.sq_piece_color_0x88[to2];
                if ((piece_color_to == -1) && (piece_color_to2 == -1)) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
                    type_move = Move_list_0x88_С.PAWN_MOVE;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to2);
                    this.chess_board_0x88_O.en_passant_yes = 1;
                    this.chess_board_0x88_O.en_passant_target_square = to;

                }
            }
            if (Math.floor(from / 16) == 1) {// 136 0x88
                // превращение пешки просто и со взятием
                to = from - 16;// ход белой пешки на одну клетку
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                if (piece_color_to == -1) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
                    type_move = Move_list_0x88_С.QUEEN_PROMOTION;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    type_move = Move_list_0x88_С.ROOK_PROMOTION;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    type_move = Move_list_0x88_С.BISHOP_PROMOTION;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                    type_move = Move_list_0x88_С.KNIGHT_PROMOTION;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                }
                to = from - 17;// взятие белой пешкой влево
                if ((from & 136) == 0) {// 136 0x88                
                    piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                    if (piece_color_to == 0) {// 
                        type_move = Move_list_0x88_С.QUEEN_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.ROOK_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.BISHOP_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.KNIGHT_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                    }
                }
                to = from - 15;// взятие белой пешкой влево
                if ((from & 136) == 0) {// 136 0x88               
                    piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                    if (piece_color_to == 0) {// 
                        type_move = Move_list_0x88_С.QUEEN_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.ROOK_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.BISHOP_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                        type_move = Move_list_0x88_С.KNIGHT_PROMO_CAPTURE;
                        capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                        this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                    }
                }
            } else {
                to = from - 16;// ход белой пешки на одну клетку
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                if (piece_color_to == -1) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
                    type_move = Move_list_0x88_С.PAWN_MOVE;
                    this.move_list_0x88_O.add_simple_move(type_move, piece, piece_color, from, to);
                }
            }
            to = from - 17;// взятие белой пешкой влево
            if ((from & 136) == 0) {// 136 0x88
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                if (piece_color_to == 0) {// 
                    type_move = Move_list_0x88_С.PAWN_CAPTURES;
                    capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                    this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                } else if ((this.chess_board_0x88_O.en_passant_yes = 1) && (this.chess_board_0x88_O.en_passant_target_square == to)) {
                    type_move = Move_list_0x88_С.EP_CAPTURES;
                    capture_piece = -1;
                    this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                }
            }
            to = from - 15;// взятие белой пешкой вправо
            if ((from & 136) == 0) {// 136 0x88            
                piece_color_to = this.chess_board_0x88_O.sq_piece_color_0x88[to];
                if (piece_color_to == 0) {// 
                    type_move = Move_list_0x88_С.PAWN_CAPTURES;
                    capture_piece = this.chess_board_0x88_O.sq_piece_0x88[to];
                    this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                } else if ((this.chess_board_0x88_O.en_passant_yes = 1) && (this.chess_board_0x88_O.en_passant_target_square == to)) {
                    type_move = Move_list_0x88_С.EP_CAPTURES;
                    capture_piece = -1;
                    this.move_list_0x88_O.add_captures_move(type_move, piece, piece_color, capture_piece, from, to);
                }
            }
        }
    }

//pawn_move_white


}