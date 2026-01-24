// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_gen_2_quiet_0x88.js
 * @version created 24.01m.2026 
*/

import {
    SIDE_TO_MOVE, SHIFT_COLOR,
    PIECE_NO, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING,
    IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k
} from "./chess_board_new.js";

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

// нужно для рокировок и превращений пешек
// именуем поля на первой линии
const A1 = 112;
const B1 = 113;
const C1 = 114;
const D1 = 115;
const E1 = 116;
const F1 = 117;
const G1 = 118;
const H1 = 119;

// именуем поля на последней линии   
const A8 = 0;
const B8 = 1;
const C8 = 2;
const D8 = 3;
const E8 = 4;
const F8 = 5;
const G8 = 6;
const H8 = 7;

/*
0   1   2
16  17  18
32  33  34    
*/
// ходы короля. так же ходит ферзь
const moves_king = [-16, -15, 1, 17, 16, 15, -1, -17];
const moves_queen = moves_king;
/*
 1      
16 17 18
 33
*/
// ходы ладьи
const moves_rook = [-16, 1, 16, -1];
/*
 0    2     
   17
 32   34
*/
// ходы слона
const moves_bishop = [-15, 17, 15, -17];
/*
     1---3    
 16    |   20
  |---34---|
 48    |   52     
    65---67
*/
// ходы коня
const moves_knight = [-33, -31, -14, 18, 33, 31, 14, -18];

// генерируем всевозможные ходы, но не учитываем шахи и вскрытые шахи.
/**
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_pseudo_legal_quiet_moves = function (chess_board_0x88_O, move_list_0x88_O) {
    //console.log('Move_generator_quiet_0x88_С->generated_pseudo_legal_moves');
    let side_to_move = chess_board_0x88_O[SIDE_TO_MOVE];
    for (let from = 0; from < 128; from++) {
        generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88_O, move_list_0x88_O);
    }
}

//  считаем ходы одной фигуры из конкретной позиции
/**
* @param {number} from
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_pseudo_legal_moves_one_piece_for_gui = function (from, chess_board_0x88_O, move_list_0x88_O) {
    //console.log('Move_generator_quiet_0x88_С->generated_pseudo_legal_moves');
    let side_to_move = chess_board_0x88_O[SIDE_TO_MOVE];
    generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88_O, move_list_0x88_O);
}


//  считаем ходы одной фигуры из конкретной позиции
/**
* @param {number} from
* @param {number} side_to_move
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_pseudo_legal_moves_one_piece = function (from, side_to_move, chess_board_0x88_O, move_list_0x88_O) {

    let piece_name = -1;
    let piece_color = -1;

    // если мы не вышли за пределы доски
    if ((from & 136) == 0) {// 136 0x88
        piece_name = chess_board_0x88_O[from];
        piece_color = chess_board_0x88_O[from + SHIFT_COLOR];

        // если фигура иммеет цвет ходящей стороны
        if (piece_color == side_to_move) {

            // смотрим фигуру на доске
            switch (piece_name) {
                case KING:// KING
                    generated_quiet_moves_king(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                    generated_moves_castle_king(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                    break;

                case QUEEN://QUEEN
                    generated_quiet_moves_queen(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                    break;
                case ROOK://ROOK
                    generated_quiet_moves_rook(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                    break;
                case BISHOP://BISHOP
                    generated_quiet_moves_bishop(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                    break;
                case KNIGHT://KNIGHT
                    generated_quiet_moves_knight(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
                    break;
                case PAWN://PAWN
                    generated_quiet_moves_pawn(piece_color, from, chess_board_0x88_O, move_list_0x88_O);
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
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {number}
*/
const add_quiet_move = function (piece_name, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O) {
    let piece_to = chess_board_0x88_O[to];
    let piece_color_to = chess_board_0x88_O[to + SHIFT_COLOR];
    let type_move;

    if (piece_to == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
        type_move = move_list_0x88_O.return_type_simple_move(piece_name, PIECE_NO);
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
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_king = function (piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
    //console.log("king " + piece + " c " + piece_color + " f " + from);
    //console.log("king");
    //console.log("from = " + from);
    //console.log("piece = " + piece);
    //console.log("piece_color = " + piece_color);
    //moves_king  = [-16, -15, 1, 17, 16, 15, -1, -17];
    let to = -1;
    let bre_ak = -1;
    for (let j = 0; j < 8; j++) {
        to = from + moves_king[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            bre_ak = add_quiet_move(KING, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
        }
    }
}

// простые ходы ферзя (т.е. не взятия)
/**
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_queen = function (piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
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
        to = from + moves_queen[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                bre_ak = add_quiet_move(QUEEN, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                if (bre_ak == 1) break;// уперлись в фигуру
                to = to + moves_queen[j];
                if ((to & 136) != 0) break;// конец доски
            }
        }
    }
}

// простые ходы ладьи
/**
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_rook = function (piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
    //console.log("rook " + piece + " c " + piece_color + " f " + from);
    //console.log("rook");
    //console.log("from = " + from);
    //console.log("piece = " + piece);
    //console.log("piece_color = " + piece_color);

    //moves_rook = [-16, 1, 16, -1];
    let to = -1;
    let bre_ak = -1;

    for (let j = 0; j < 4; j++) {
        to = from + moves_rook[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                bre_ak = add_quiet_move(ROOK, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                if (bre_ak == 1) break;
                to = to + moves_rook[j];
                if ((to & 136) != 0) break;
            }
        }
    }
}

// простые ходы слона
/**
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_bishop = function (piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
    //console.log("bishop " + piece + " c " + piece_color + " f " + from);
    //console.log("bishop");
    //console.log("from = " + from);
    //console.log("piece = " + piece);
    //console.log("piece_color = " + piece_color);

    //moves_bishop = [-15, 17, 15, -17];
    let to = -1;
    let bre_ak = -1;

    for (let j = 0; j < 4; j++) {
        to = from + moves_bishop[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                bre_ak = add_quiet_move(BISHOP, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
                if (bre_ak == 1) break;
                to = to + moves_bishop[j];
                if ((to & 136) != 0) break;
            }
        }
    }

}

// простые ходы коня
/**
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_knight = function (piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
    //console.log("knight " + piece + " c " + piece_color + " f " + from);
    //console.log("knight");
    //console.log("from = " + from);
    //console.log("piece = " + piece);
    //console.log("piece_color = " + piece_color);
    //moves_knight = [-33, -31, -14, 18, 33, 31, 14, -18];
    let to = -1;
    let bre_ak = -1;

    for (let j = 0; j < 8; j++) {
        to = from + moves_knight[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            bre_ak = add_quiet_move(KNIGHT, piece_color, from, to, chess_board_0x88_O, move_list_0x88_O);
        }
    }
}

// рокировки короля. черного, белого, длинные, короткие
/**
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_moves_castle_king = function (piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
    let to = -1;
    let piece_to_1 = -1;
    let piece_to_2 = -1;
    let piece_to_3 = -1;
    let type_move = -1;

    if (from == E1) {// король стоит на стартовой позиции
        if (piece_color == 1) {// король белый
            if (chess_board_0x88_O[IND_CASTLING_Q] == 1) {// рокировка белых в длинную сторону   1/0
                piece_to_1 = chess_board_0x88_O[B1];
                piece_to_2 = chess_board_0x88_O[C1];
                piece_to_3 = chess_board_0x88_O[D1];
                if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                    to = C1;
                    type_move = Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE;
                    move_list_0x88_O.add_move(type_move, from, to);
                }
            }

            if (chess_board_0x88_O[IND_CASTLING_K] == 1) {// рокировка белых в короткую сторону  1/0
                piece_to_1 = chess_board_0x88_O[F1];
                piece_to_2 = chess_board_0x88_O[G1];
                if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                    to = G1;
                    type_move = Move_list_0x88_С.MOVE_KING_CASTLE;
                    move_list_0x88_O.add_move(type_move, from, to);
                }
            }
        }

    } else if (from == E8) {// король стоит на стартовой позиции
        if (piece_color == 0) {// король черный
            if (chess_board_0x88_O[IND_CASTLING_q] == 1) {// рокировка черных в длинную сторону   1/0
                piece_to_1 = chess_board_0x88_O[B8];
                piece_to_2 = chess_board_0x88_O[C8];
                piece_to_3 = chess_board_0x88_O[D8];
                if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                    to = C8;
                    type_move = Move_list_0x88_С.MOVE_KING_QUEEN_CASTLE;
                    move_list_0x88_O.add_move(type_move, from, to);
                }
            }

            if (chess_board_0x88_O[IND_CASTLING_k] == 1) {// рокировка черных в короткую сторону  1/0
                piece_to_1 = chess_board_0x88_O[F8];
                piece_to_2 = chess_board_0x88_O[G8];
                if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                    to = G8;
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
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_pawn = function (piece_color, from, chess_board_0x88_O, move_list_0x88_O) {
    //console.log("pawn " + piece + " c " + piece_color + " f " + from);
    //console.log("pawn");
    //console.log("from = " + from);
    //console.log("piece = " + piece);
    //console.log("piece_color = " + piece_color);

    if (piece_color == 1) {// белая пешка
        generated_quiet_moves_pawn_white(from, chess_board_0x88_O, move_list_0x88_O);
    } else if (piece_color == 0) {
        generated_quiet_moves_pawn_black(from, chess_board_0x88_O, move_list_0x88_O);
    }
}


// простые ходы белых пешек
/**
* @param {number} from
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_pawn_white = function (from, chess_board_0x88_O, move_list_0x88_O) {

    if (Math.floor(from / 16) == 6) {// белая пешка на стартовой позиции(2-ая линия). можно ходить на две клетки
        generated_moves_pawn_double(from, (from - 16), (from - 32),
            chess_board_0x88_O, move_list_0x88_O);
    }
    if (Math.floor(from / 16) == 1) {// белая пешка на на предпоследней позиции(7-ая линия). можно ходить с превращением
        generated_quiet_moves_pawn_promo(from, (from - 16),
            chess_board_0x88_O, move_list_0x88_O);
    } else {
        generated_moves_pawn_one(from, (from - 16), chess_board_0x88_O, move_list_0x88_O);
    }

}

// простые ходы черных пешек
/**
* @param {number} from
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_pawn_black = function (from, chess_board_0x88_O, move_list_0x88_O) {

    if (Math.floor(from / 16) == 1) {// белые пешки на стартовой позиции. можно ходить на две клетки
        generated_moves_pawn_double(from, (from + 16), (from + 32),
            chess_board_0x88_O, move_list_0x88_O);
    }
    if (Math.floor(from / 16) == 6) {// 136 0x88
        generated_quiet_moves_pawn_promo(from, (from + 16),
            chess_board_0x88_O, move_list_0x88_O);
    } else {
        generated_moves_pawn_one(from, (from + 16), chess_board_0x88_O, move_list_0x88_O);
    }

}

// ход пешки на одну клетку
/**
* @param {number} from
* @param {number} to
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_moves_pawn_one = function (from, to, chess_board_0x88_O, move_list_0x88_O) {
    let piece_to = -1;
    let type_move = -1;

    piece_to = chess_board_0x88_O[to];
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
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_moves_pawn_double = function (from, to_void, to, chess_board_0x88_O, move_list_0x88_O) {
    let piece_to = -1;
    let piece_to_void = -1;
    let type_move = -1;

    piece_to = chess_board_0x88_O[to];
    piece_to_void = chess_board_0x88_O[to_void];
    if ((piece_to == 0) && (piece_to_void == 0)) {// фигур там нет. можно ходить. это спокойный ход
        type_move = Move_list_0x88_С.MOVE_DOUBLE_PAWN;
        move_list_0x88_O.add_move(type_move, from, to);
    }
}

// ходы пешки с превращением
/**
* @param {number} from
* @param {number} to_center
* @param {Uint8Array} chess_board_0x88_O
* @param {Move_list_0x88_С} move_list_0x88_O
* @returns {void}
*/
const generated_quiet_moves_pawn_promo = function (from, to_center, chess_board_0x88_O, move_list_0x88_O) {
    let piece_to = -1;
    let type_move = -1;

    // ход с превращением
    piece_to = chess_board_0x88_O[to_center];
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

export {generated_pseudo_legal_quiet_moves};