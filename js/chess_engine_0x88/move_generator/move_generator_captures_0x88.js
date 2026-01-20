// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_gen_1_captures_0x88.js
 * @version created 27.10m.2025 
*/

import { Chess_board_0x88_C } from "./chess_board_0x88.js";
import { Move_list_0x88_С } from "./move_list_0x88.js";

/**
* НАЗНАЧЕНИЕ
  Проходим по доске chess_board_0x88_O и пишем в список move_list_0x88_O только взятия.
  Списка фигур нет. Максимально простой, на мой взгляд, генератор.
  Ходы псевдолегальные, т.е. тут есть ходы под шах или открывающие шах.
*/
//+
// тут все прозрачно. идей пока нет

/**
 * Класс.
 * @class
 */

class Move_generator_captures_0x88_С {

    static NAME = "Move_generator_captures_0x88_С";

    // 0,   1,   2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12,  13,  14,  15,
    // 16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,
    // 32,  33,  34,  35,  36,  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,
    // 48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,
    // 64,  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,  78,  79,
    // 80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,  91,  92,  93,  94,  95,
    // 96,  97,  98,  99,  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
    // 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127

    // нужно для рокировок и превращений пешек
    // именуем поля на первой линии
    static A1 = 112;
    static B1 = 113;
    static C1 = 114;
    static D1 = 115;
    static E1 = 116;
    static F1 = 117;
    static G1 = 118;
    static H1 = 119;

    // именуем поля на последней линии   
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
    // ходы короля. так же ходит ферзь
    moves_king = [-16, -15, 1, 17, 16, 15, -1, -17];
    moves_queen = this.moves_king;
    /*
     1      
  16 17 18
     33
  */
    // ходы ладьи
    moves_rook = [-16, 1, 16, -1];
    /*
     0    2     
       17
     32   34
    */
    // ходы слона
    moves_bishop = [-15, 17, 15, -17];
    /*
         1---3    
     16    |   20
      |---34---|
     48    |   52     
        65---67
    */
    // ходы коня
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
        //console.log('->generated_pseudo_legal_moves');
        // вывели из цикла чтобы определить один раз
        let side_to_move = chess_board_0x88_O.side_to_move;

        move_list_0x88_O.clear_list();
        move_list_0x88_O.piece_color = chess_board_0x88_O.side_to_move;

        for (let from = 0; from < 128; from++) {
            this.generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88_O, move_list_0x88_O);
        }
        move_list_0x88_O.number_captures_move = move_list_0x88_O.number_move;
    }

    //  считаем ходы одной фигуры из конкретной позиции
    /**
  * @param {number} from
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */
    generated_pseudo_legal_moves_one_piece_for_gui(from, chess_board_0x88_O, move_list_0x88_O) {
        //console.log('->generated_pseudo_legal_moves');
        // тут определяем чтобы не менять вызов generated_pseudo_legal_moves_one_piece(from, side_to_move, ...
        let side_to_move = chess_board_0x88_O.side_to_move;

        move_list_0x88_O.clear_list();
        move_list_0x88_O.piece_color = chess_board_0x88_O.side_to_move;

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

        let piece_name = -1;// имя фигуры типа 1,2, ...,6
        let piece_color = -1;// цвет фигуры 0 или 1

        // если мы не вышли за пределы доски
        if ((from & 136) == 0) {// 136 0x88
            piece_name = chess_board_0x88_O.sq_piece_0x88[from];
            piece_color = chess_board_0x88_O.sq_piece_color_0x88[from];

            // если фигура иммеет цвет ходящей стороны
            if (piece_color == side_to_move) {

                // смотрим фигуру на доске
                switch (piece_name) {
                    case Chess_board_0x88_C.KING:// KING
                        // считаем взятия королем и заполняем список move_list_0x88_O
                        this.generated_captures_moves_king(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.QUEEN://QUEEN
                        this.generated_captures_moves_queen(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.ROOK://ROOK
                        this.generated_captures_moves_rook(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.BISHOP://BISHOP
                        this.generated_captures_moves_bishop(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.KNIGHT://KNIGHT
                        this.generated_captures_moves_knight(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case Chess_board_0x88_C.PAWN://PAWN
                        this.generated_captures_moves_pawn(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                        break;

                    default://
                    // console.log("default");
                }
            }
        }
    }

    // смотрим ход from, to и если это взятие добавляем в список.
    /**
   * @param {number} piece_name
   * @param {number} piece_color
   * @param {number} from
   * @param {number} to
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {number}
   */
    add_captures_move(piece_name, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O) {

        let piece_captures = chess_board_0x88_O.sq_piece_0x88[to];// имя взятой фигуры
        let piece_color_captures = chess_board_0x88_O.sq_piece_color_0x88[to];// цвет взятой фигуры
        let type_move;// тип хода

        if (piece_captures == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
            return 0;// можно продолжать луч
        } else if (piece_color != piece_color_captures) {// мы уже знаем что тут есть фигура и если цвет отличен, то это взятие  
            // определяем тип простых взятий по имени фигуры и имени взятой фигуры
            type_move = move_list_0x88_O.return_type_simple_move(piece_name, piece_captures);
            // добавляем взятие в список
            move_list_0x88_O.add_move(type_move, from, to);
            return 1;// луч прерываем на вражеской фигуре включительно
        } else {//на свою фигуру не прыгаем. хода нет. 
            return 1;// луч прерываем на своей фигуре не включительно
        }
    }

    // взятия королем
    /**
   * @param {number} piece_color
   * @param {number} from
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
    generated_captures_moves_king(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                bre_ak = this.add_captures_move(Chess_board_0x88_C.KING, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
            }
        }
    }

    // взятия ферзем
    /**
   * @param {number} piece_color
   * @param {number} from
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
    generated_captures_moves_queen(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                    // проверяем каждую клетку хода на фигуру. если есть фигура противника то добавляем взятие
                    // в список, если это наша фигура то прерываем поиск на этом луче иначе идем дальше
                    bre_ak = this.add_captures_move(Chess_board_0x88_C.QUEEN, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;// уперлись в фигуру
                    to = to + this.moves_queen[j];
                    if ((to & 136) != 0) break;// конец доски прерываем поиск на этом луче
                }
            }
        }
    }

    // взятия ладьей
    /**
  * @param {number} piece_color
  * @param {number} from
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */
    generated_captures_moves_rook(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                    bre_ak = this.add_captures_move(Chess_board_0x88_C.ROOK, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_rook[j];
                    if ((to & 136) != 0) break;
                }
            }
        }
    }

    // взятия слоном
    /**
  * @param {number} piece_color
  * @param {number} from
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */
    generated_captures_moves_bishop(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                    bre_ak = this.add_captures_move(Chess_board_0x88_C.BISHOP, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                    if (bre_ak == 1) break;
                    to = to + this.moves_bishop[j];
                    if ((to & 136) != 0) break;
                }
            }
        }

    }

    // взятие конем
    /**
  * @param {number} piece_color
  * @param {number} from
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */
    generated_captures_moves_knight(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
                bre_ak = this.add_captures_move(Chess_board_0x88_C.KNIGHT, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
            }
        }
    }

    // взятия пешкой
    /**
  * @param {number} piece_color
  * @param {number} from
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @param {Move_list_0x88_С} move_list_0x88_O
  * @returns {void}
  */
    generated_captures_moves_pawn(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
        //console.log("pawn " + piece + " c " + piece_color + " f " + from);
        //console.log("pawn");
        //console.log("from = " + from);
        //console.log("piece = " + piece);
        //console.log("piece_color = " + piece_color);

        if (piece_color == 1) {// белая пешка
            // взятие белой пешкой
            this.generated_captures_moves_pawn_white(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
        } else if (piece_color == 0) {
            // взятие черной пешкой
            this.generated_captures_moves_pawn_black(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
        }
    }

    ///////////////////////////////////////

    // взятия белой пешкой
    /**
   * @param {number} piece_color
   * @param {number} from
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
    generated_captures_moves_pawn_white(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
        if (Math.floor(from / 16) == 1) {// белая пешка на на предпоследней позиции(7-ая линия из 8). можно смотреть взятие с превращением
            // смотрим и если есть добавляем взятия пешкой с превращением
            this.generated_captures_moves_pawn_promo(from, (from - 17), (from - 15),
                piece_color, chess_board_0x88_O, move_list_0x88_O);
        } else {
            // простое взятие пешкой
            this.generated_moves_pawn_captures(from, (from - 17), (from - 15),
                piece_color, chess_board_0x88_O, move_list_0x88_O);
        }
    }

    // взятия черной пешкой
    /**
   * @param {number} piece_color
   * @param {number} from
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
    generated_captures_moves_pawn_black(piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
        if (Math.floor(from / 16) == 6) {// черная пешка на на предпоследней позиции(2-ая линия из 8). можно смотреть взятие с превращением
            this.generated_captures_moves_pawn_promo(from, (from + 15), (from + 17), piece_color,
                chess_board_0x88_O, move_list_0x88_O);
        } else {
            this.generated_moves_pawn_captures(from, (from + 15), (from + 17), piece_color, chess_board_0x88_O, move_list_0x88_O);
        }

    }

    // простые взятия пешкой как белой так и черной
    /**
   * @param {number} from
   * @param {number} to_left
   * @param {number} to_right
   * @param {number} piece_color 
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @param {Move_list_0x88_С} move_list_0x88_O
   * @returns {void}
   */
    generated_moves_pawn_captures(from, to_left, to_right, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_color_captures = -1;
        let piece_captures = -1;
        let type_move = -1;

        if ((to_left & 136) == 0) {// взятия налево если мы на доске
            piece_captures = chess_board_0x88_O.sq_piece_0x88[to_left];
            piece_color_captures = chess_board_0x88_O.sq_piece_color_0x88[to_left];
            if ((piece_captures != 0) && (piece_color != piece_color_captures)) {// 
                type_move = move_list_0x88_O.return_type_simple_move(Chess_board_0x88_C.PAWN, piece_captures);
                move_list_0x88_O.add_move(type_move, from, to_left);
            } else if ((chess_board_0x88_O.en_passant_yes == 1) && (chess_board_0x88_O.en_passant_target_square == to_left)) {
                type_move = Move_list_0x88_С.EP_CAPTURES;
                move_list_0x88_O.add_move(type_move, from, to_left);
            }
        }
        if ((to_right & 136) == 0) {// 136 0x88    
            piece_captures = chess_board_0x88_O.sq_piece_0x88[to_right];
            piece_color_captures = chess_board_0x88_O.sq_piece_color_0x88[to_right];
            if ((piece_captures != 0) && (piece_color != piece_color_captures)) {// 
                type_move = move_list_0x88_O.return_type_simple_move(Chess_board_0x88_C.PAWN, piece_captures);
                move_list_0x88_O.add_move(type_move, from, to_right);
            } else if ((chess_board_0x88_O.en_passant_yes == 1) && (chess_board_0x88_O.en_passant_target_square == to_right)) {
                type_move = Move_list_0x88_С.EP_CAPTURES;
                move_list_0x88_O.add_move(type_move, from, to_right);
            }
        }

    }

    // взятие пешкой с превращением
    /**
    * @param {number} from
    * @param {number} to_left
    * @param {number} to_right
    * @param {number} piece_color 
    * @param {Chess_board_0x88_C} chess_board_0x88_O
    * @param {Move_list_0x88_С} move_list_0x88_O
    * @returns {void}
    */
    generated_captures_moves_pawn_promo(from, to_left, to_right, piece_color, chess_board_0x88_O, move_list_0x88_O) {
        let piece_color_captures = -1;
        let piece_captures = -1;
        let type_move = -1;

        // взятие пешкой влево с превращением
        if ((to_left & 136) == 0) {// 136 0x88                
            piece_captures = chess_board_0x88_O.sq_piece_0x88[to_left];
            piece_color_captures = chess_board_0x88_O.sq_piece_color_0x88[to_left];
            if ((piece_captures != 0) && (piece_color != piece_color_captures)) {//
                // по взятой фигуре возвращаем тип хода взятия с превращением
                let out = move_list_0x88_O.return_type_captures_pawn_promo(piece_captures);

                type_move = out.PROMO_QUEEN;// взятие с превращением в ферзь
                move_list_0x88_O.add_move(type_move, from, to_left);
                type_move = out.PROMO_ROOK;// взятие с превращением в ладью
                move_list_0x88_O.add_move(type_move, from, to_left);
                type_move = out.PROMO_BISHOP;
                move_list_0x88_O.add_move(type_move, from, to_left);
                type_move = out.PROMO_KNIGHT;
                move_list_0x88_O.add_move(type_move, from, to_left);

            }
        }
        // взятие пешкой вправо с превращением
        if ((to_right & 136) == 0) {// 136 0x88      
            piece_captures = chess_board_0x88_O.sq_piece_0x88[to_right];
            piece_color_captures = chess_board_0x88_O.sq_piece_color_0x88[to_right];
            if ((piece_captures != 0) && (piece_color != piece_color_captures)) {// 
                let out = move_list_0x88_O.return_type_captures_pawn_promo(piece_captures);

                type_move = out.PROMO_QUEEN;
                move_list_0x88_O.add_move(type_move, from, to_right);
                type_move = out.PROMO_ROOK;
                move_list_0x88_O.add_move(type_move, from, to_right);
                type_move = out.PROMO_BISHOP;
                move_list_0x88_O.add_move(type_move, from, to_right);
                type_move = out.PROMO_KNIGHT;
                move_list_0x88_O.add_move(type_move, from, to_right);
            }
        }
    }

    // у нас нету хода взятия короля, поэтому пришлось специально прописывать функцию обнаружения короля на дистанции хода короля
    /**
   * @param {number} from
   * @param {number} piece_color 
   * @param {Chess_board_0x88_C} chess_board_0x88_O
   * @returns {number}
   */
    check_detected_generated_moves_king(from, piece_color, chess_board_0x88_O) {
        let to = -1;
        let check = -1;
        for (let j = 0; j < 8; j++) {
            to = from + this.moves_king[j];
            if ((to & 136) == 0) {// если мы не вышли за пределы доски
                // если на клетке хода обнаружили короля проверим цвет, так как детектором и рокировки проверям, а там свой король тусуется :)
                if ((chess_board_0x88_O.sq_piece_0x88[to] == Chess_board_0x88_C.KING) &&
                    (chess_board_0x88_O.sq_piece_color_0x88[to] != piece_color)) {
                    check = Chess_board_0x88_C.KING;
                    return check;
                }
            }
        }
        return check;
    }

    // ищем шахи
    /**
  * @param {number} from
  * @param {number} piece_color 
  * @param {Chess_board_0x88_C} chess_board_0x88_O
  * @returns {number}
  */
    check_detected(from, piece_color, chess_board_0x88_O) {

        let move_list_0x88_O = new Move_list_0x88_С();
        let check = -1;

        move_list_0x88_O.clear_list();
        // 1 шах от короля это если подошли к королю противника вплотную
        if (this.check_detected_generated_moves_king(from, piece_color, chess_board_0x88_O) == Chess_board_0x88_C.KING) {
            check = Chess_board_0x88_C.KING;
            return check;
        }

        move_list_0x88_O.clear_list();
        // 2 шах от коня
        this.generated_captures_moves_knight(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            if (move_list_0x88_O.return_piece_name_captures_from_type_move(move_list_0x88_O.type_move[i]) == Chess_board_0x88_C.KNIGHT) {
                check = Chess_board_0x88_C.KNIGHT;
                return check;
            }
        }

        move_list_0x88_O.clear_list();
        // 3 шах от слона + 1/2 шах от половины ходов ферзя как у слона
        this.generated_captures_moves_bishop(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            if (move_list_0x88_O.return_piece_name_captures_from_type_move(move_list_0x88_O.type_move[i]) == Chess_board_0x88_C.BISHOP) {
                check = Chess_board_0x88_C.BISHOP;
                return check;
            }
            if (move_list_0x88_O.return_piece_name_captures_from_type_move(move_list_0x88_O.type_move[i]) == Chess_board_0x88_C.QUEEN) {
                check = Chess_board_0x88_C.QUEEN;
                return check;
            }
        }

        move_list_0x88_O.clear_list();
        // 4 шах от ладьи + 1/2 шах от половины ходов ферзя как у ладьи
        this.generated_captures_moves_rook(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {

            if (move_list_0x88_O.return_piece_name_captures_from_type_move(move_list_0x88_O.type_move[i]) == Chess_board_0x88_C.ROOK) {
                check = Chess_board_0x88_C.ROOK;
                return check;
            }
            if (move_list_0x88_O.return_piece_name_captures_from_type_move(move_list_0x88_O.type_move[i]) == Chess_board_0x88_C.QUEEN) {
                check = Chess_board_0x88_C.QUEEN;
                return check;
            }
        }

        move_list_0x88_O.clear_list();
        // 5 шах от пешек
        this.generated_captures_moves_pawn(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
        for (let i = 0; i < move_list_0x88_O.number_move; i++) {
            if (move_list_0x88_O.return_piece_name_captures_from_type_move(move_list_0x88_O.type_move[i]) == Chess_board_0x88_C.PAWN) {
                check = Chess_board_0x88_C.PAWN;
                return check;
            }
        }

        check = 0;// нет шаха
        return check;
    }
}

export { Move_generator_captures_0x88_С };