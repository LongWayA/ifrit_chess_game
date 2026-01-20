// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_gen_2_quiet_0x88.js
 * @version created 22.10m.2025 
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";
import { Move_list_0x88_С } from "./move_list_0x88.js";

/**
* НАЗНАЧЕНИЕ
  Проходим по доске chess_board_0x88_O и пишем в список move_list_0x88_O только ходы не взятия.
  Списка фигур нет. Максимально простой, на мой взгляд, генератор.
  Ходы псевдолегальные, т.е. тут есть ходы под шах или открывающие шах, а также рокировки 
  через битые поля.
*/
//+
// тут все прозрачно. идей пока нет

/**
 * Класс.
 * @class
 */
class Move_generator_quiet_0x88_С {

    static NAME = "Move_generator_quiet_0x88_С";
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
    /**
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
    generated_pseudo_legal_moves(chess_board_0x88_O, move_list_0x88_O) {
        //console.log('Move_generator_quiet_0x88_С->generated_pseudo_legal_moves');
        let side_to_move = chess_board_0x88_O.side_to_move;
        for (let from = 0; from < 128; from++) {
            this.generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88_O, move_list_0x88_O);
        }
    }

    //  считаем ходы одной фигуры из конкретной позиции
    /**
  * @param {number} from
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */
    generated_pseudo_legal_moves_one_piece_for_gui(from, chess_board_0x88_O, move_list_0x88_O) {
        //console.log('Move_generator_quiet_0x88_С->generated_pseudo_legal_moves');
        let side_to_move = chess_board_0x88_O.side_to_move;
        this.generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88_O, move_list_0x88_O);
    }


    //  считаем ходы одной фигуры из конкретной позиции
    /**
   * @param {number} from
   * @param {number} side_to_move
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
    generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88_O, move_list_0x88_O) {

        let piece_name = -1;
        let piece_color = -1;

        // если мы не вышли за пределы доски
        if ((from & 136) == 0) {// 136 0x88
            piece_name = chess_board_0x88_O.sq_piece_0x88[from];
            piece_color = chess_board_0x88_O.sq_piece_color_0x88[from];

            // если фигура иммеет цвет ходящей стороны
            if (piece_color == side_to_move) {

                // смотрим фигуру на доске
                switch (piece_name) {
                    case Chess_board_0x88_C.KING:// KING
                        this.generated_quiet_moves_king(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        this.generated_moves_castle_king(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;

                    case Chess_board_0x88_C.QUEEN://QUEEN
                        this.generated_quiet_moves_queen(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.ROOK://ROOK
                        this.generated_quiet_moves_rook(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.BISHOP://BISHOP
                        this.generated_quiet_moves_bishop(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.KNIGHT://KNIGHT
                        this.generated_quiet_moves_knight(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.PAWN://PAWN
                        this.generated_quiet_moves_pawn(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;

                    default://
                    // console.log("default");
                }
            }
        }
    }

    // смотрим и если находим простые ходы то добавляем в список ходов
    /**
  * @param {number} piece_name
  * @param {number} piece_color
  * @param {number} from
  * @param {number} to
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {number}
  */
    add_quiet_move(piece_name, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        let piece_color_to = chess_board_0x88_O.sq_piece_color_0x88[to];
        let type_move;

        if (piece_to == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
            type_move = move_list_0x88_O.return_type_simple_move(piece_name, Chess_board_0x88_C.PIECE_NO);
            move_list_0x88_O.add_move(type_move, from, to);
            return 0;// можно продолжать луч
        } else if (piece_color != piece_color_to) {// мы уже знаем что тут есть фигура и если цвет отличен, то это взятие
            return 1;// луч прерываем на вражеской фигуре включительно
        } else {//на свою фигуру не прыгаем. хода нет. 
            return 1;// луч прерываем на своей фигуре не включительно
        }
    }

    // простые ходы короля (т.е. не взятия и не рокировки)
    /**
   * @param {number} piece_color
   * @param {number} from
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
    generated_quiet_moves_king(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                bre_ak = this.add_quiet_move(Chess_board_0x88_C.KING, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
            }
        }
    }

    // простые ходы ферзя (т.е. не взятия)
    /**
* @param {number} piece_color
* @param {number} from
* @param {Chess_board_0x88_C} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
    generated_quiet_moves_queen(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                    bre_ak = this.add_quiet_move(Chess_board_0x88_C.QUEEN, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;// уперлись в фигуру
                    to = to + this.moves_queen[j];
                    if ((to & 136) != 0) break;// конец доски
                }
            }
        }
    }

    // простые ходы ладьи
    /**
* @param {number} piece_color
* @param {number} from
* @param {Chess_board_0x88_C} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
    generated_quiet_moves_rook(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                    bre_ak = this.add_quiet_move(Chess_board_0x88_C.ROOK, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_rook[j];
                    if ((to & 136) != 0) break;
                }
            }
        }
    }

    // простые ходы слона
    /**
* @param {number} piece_color
* @param {number} from
* @param {Chess_board_0x88_C} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
    generated_quiet_moves_bishop(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                    bre_ak = this.add_quiet_move(Chess_board_0x88_C.BISHOP, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_bishop[j];
                    if ((to & 136) != 0) break;
                }
            }
        }

    }

    // простые ходы коня
    /**
* @param {number} piece_color
* @param {number} from
* @param {Chess_board_0x88_C} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
    generated_quiet_moves_knight(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                bre_ak = this.add_quiet_move(Chess_board_0x88_C.KNIGHT, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
            }
        }
    }

    // рокировки короля. черного, белого, длинные, короткие
    /**
* @param {number} piece_color
* @param {number} from
* @param {Chess_board_0x88_C} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
    generated_moves_castle_king(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
        let to = -1;
        let piece_to_1 = -1;
        let piece_to_2 = -1;
        let piece_to_3 = -1;
        let type_move = -1;

        if (from == Move_generator_quiet_0x88_С.E1) {// король стоит на стартовой позиции
            if (piece_color == 1) {// король белый
                if (chess_board_0x88_O.castling_Q == 1) {// рокировка белых в длинную сторону   1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.B1];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.C1];
                    piece_to_3 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.D1];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                        to = Move_generator_quiet_0x88_С.C1;
                        type_move = Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE;
                        move_list_0x88_O.add_move(type_move, from, to);
                    }
                }

                if (chess_board_0x88_O.castling_K == 1) {// рокировка белых в короткую сторону  1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.F1];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.G1];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                        to = Move_generator_quiet_0x88_С.G1;
                        type_move = Move_list_0x88_С.MOVE_KING_CASTLE;
                        move_list_0x88_O.add_move(type_move, from, to);
                    }
                }
            }

        } else if (from == Move_generator_quiet_0x88_С.E8) {// король стоит на стартовой позиции
            if (piece_color == 0) {// король черный
                if (chess_board_0x88_O.castling_q == 1) {// рокировка черных в длинную сторону   1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.B8];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.C8];
                    piece_to_3 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.D8];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                        to = Move_generator_quiet_0x88_С.C8;
                        type_move = Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE;
                        move_list_0x88_O.add_move(type_move, from, to);
                    }
                }

                if (chess_board_0x88_O.castling_k == 1) {// рокировка черных в короткую сторону  1/0
                    piece_to_1 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.F8];
                    piece_to_2 = chess_board_0x88_O.sq_piece_0x88[Move_generator_quiet_0x88_С.G8];
                    if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                        to = Move_generator_quiet_0x88_С.G8;
                        type_move = Move_list_0x88_С.MOVE_KING_CASTLE;
                        move_list_0x88_O.add_move(type_move, from, to);
                    }
                }
            }
        }
    }

    // простые ходы пешек белых и черных
    /**
* @param {number} piece_color
* @param {number} from
* @param {Chess_board_0x88_C} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
    generated_quiet_moves_pawn(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
        //console.log("pawn " + piece + " c " + piece_color + " f " + from);
        //console.log("pawn");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);

        if (piece_color == 1) {// белая пешка
            this.generated_quiet_moves_pawn_white(from, chess_board_0x88_O, move_list_0x88_O);
        } else if (piece_color == 0) {
            this.generated_quiet_moves_pawn_black(from, chess_board_0x88_O, move_list_0x88_O);
        }
    }


    // простые ходы белых пешек
    /**
  * @param {number} from
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */
    generated_quiet_moves_pawn_white(from, chess_board_0x88_O, move_list_0x88_O) {

        if (Math.floor(from / 16) == 6) {// белая пешка на стартовой позиции(2-ая линия). можно ходить на две клетки
            this.generated_moves_pawn_double(from, (from - 16), (from - 32),
                chess_board_0x88_O, move_list_0x88_O);
        }
        if (Math.floor(from / 16) == 1) {// белая пешка на на предпоследней позиции(7-ая линия). можно ходить с превращением
            this.generated_quiet_moves_pawn_promo(from, (from - 16),
                chess_board_0x88_O, move_list_0x88_O);
        } else {
            this.generated_moves_pawn_one(from, (from - 16), chess_board_0x88_O, move_list_0x88_O);
        }

    }

    // простые ходы черных пешек
   /**
  * @param {number} from
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */    
    generated_quiet_moves_pawn_black(from, chess_board_0x88_O, move_list_0x88_O) {

        if (Math.floor(from / 16) == 1) {// белые пешки на стартовой позиции. можно ходить на две клетки
            this.generated_moves_pawn_double(from, (from + 16), (from + 32),
                chess_board_0x88_O, move_list_0x88_O);
        }
        if (Math.floor(from / 16) == 6) {// 136 0x88
            this.generated_quiet_moves_pawn_promo(from, (from + 16),
                chess_board_0x88_O, move_list_0x88_O);
        } else {
            this.generated_moves_pawn_one(from, (from + 16), chess_board_0x88_O, move_list_0x88_O);
        }

    }

    // ход пешки на одну клетку
    /**
  * @param {number} from
  * @param {number} to
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */   
    generated_moves_pawn_one(from, to, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let type_move = -1;

        piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход 
            type_move = Move_list_0x88_С.MOVE_PAWN;
            move_list_0x88_O.add_move(type_move, from, to);
        }
    }

    // ход пешки на две клетки
     /**
  * @param {number} from
  * @param {number} to_void
  * @param {number} to
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */      
    generated_moves_pawn_double(from, to_void, to, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let piece_to_void = -1;
        let type_move = -1;

        piece_to = chess_board_0x88_O.sq_piece_0x88[to];
        piece_to_void = chess_board_0x88_O.sq_piece_0x88[to_void];
        if ((piece_to == 0) && (piece_to_void == 0)) {// фигур там нет. можно ходить. это спокойный ход
            type_move = Move_list_0x88_С.MOVE_DOUBLE_PAWN;
            move_list_0x88_O.add_move(type_move, from, to);
        }
    }

    // ходы пешки с превращением
    /**
  * @param {number} from
  * @param {number} to_center
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */         
    generated_quiet_moves_pawn_promo(from, to_center, chess_board_0x88_O, move_list_0x88_O) {
        let piece_to = -1;
        let type_move = -1;

        // ход с превращением
        piece_to = chess_board_0x88_O.sq_piece_0x88[to_center];
        if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
            type_move = Move_list_0x88_С.MOVE_PAWN_PROMO_QUEEN;
            move_list_0x88_O.add_move(type_move, from, to_center);
            type_move = Move_list_0x88_С.MOVE_PAWN_PROMO_ROOK;
            move_list_0x88_O.add_move(type_move, from, to_center);
            type_move = Move_list_0x88_С.MOVE_PAWN_PROMO_BISHOP;
            move_list_0x88_O.add_move(type_move, from, to_center);
            type_move = Move_list_0x88_С.MOVE_PAWN_PROMO_KNIGHT;
            move_list_0x88_O.add_move(type_move, from, to_center);
        }
    }
}

export { Move_generator_quiet_0x88_С };