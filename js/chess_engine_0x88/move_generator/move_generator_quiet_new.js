// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_gen_2_quiet_0x88.js
 * @version created 24.01m.2026 
*/

import {
    x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
    test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
    save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
    IND_MAX, SIDE_TO_MOVE, LET_COOR,
    BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
    IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
    IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK
} from "./chess_board_new.js";

import {
    clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
    sorting_list, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
    return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
    return_piece_name_captures_from_type_move, type_move_to_name_piese, type_move_to_name_piese_f,
    return_promo_piece_from_type_move,
    LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_CAPTURES_MOVE, IND_NUMBER_MOVE,
    IND_PROMO_QUEEN, IND_PROMO_ROOK, IND_PROMO_BISHOP, IND_PROMO_KNIGHT, MOVE_NO,
    EP_CAPTURES, MOVE_KING_CASTLE,MOVE_KING_QUEEN_CASTLE, MOVE_PAWN, MOVE_DOUBLE_PAWN,  
    MOVE_PAWN_PROMO_QUEEN, MOVE_PAWN_PROMO_ROOK, MOVE_PAWN_PROMO_BISHOP, MOVE_PAWN_PROMO_KNIGHT
} from "../move_generator/move_list_new.js";

/**
* НАЗНАЧЕНИЕ
  Проходим по доске chess_board_0x88 и пишем в список packing_moves только ходы не взятия.
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
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_quiet_moves = function (chess_board_0x88, packing_moves) {
    //console.log('Move_generator_quiet_0x88_С->generated_pseudo_legal_moves');
    let side_to_move = chess_board_0x88[SIDE_TO_MOVE];
    for (let from = 0; from < 128; from++) {
        generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88, packing_moves);
    }
}

//  считаем ходы одной фигуры из конкретной позиции
/**
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_moves_one_piece_for_gui = function (from, chess_board_0x88, packing_moves) {
    //console.log('Move_generator_quiet_0x88_С->generated_pseudo_legal_moves');
    let side_to_move = chess_board_0x88[SIDE_TO_MOVE];
    generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88, packing_moves);
}


//  считаем ходы одной фигуры из конкретной позиции
/**
* @param {number} from
* @param {number} side_to_move
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_moves_one_piece = function (from, side_to_move, chess_board_0x88, packing_moves) {

    let piece_name = -1;
    let piece_color = -1;

    // если мы не вышли за пределы доски
    if ((from & 136) == 0) {// 136 0x88
        piece_name = chess_board_0x88[from];
        piece_color =  (chess_board_0x88[from] > W_KING) ? BLACK : WHITE;

        // если фигура иммеет цвет ходящей стороны
        if (piece_color == side_to_move) {

            // смотрим фигуру на доске
            switch (piece_name) {
                case W_KING:// KING
                    // считаем взятия королем и заполняем список move_list_0x88_O
                    generated_quiet_moves_king(W_KING, WHITE, from, chess_board_0x88, packing_moves);
                    generated_moves_castle_king(W_KING, WHITE, from, chess_board_0x88, packing_moves); 
                    break;                                       
                case B_KING:// KING                
                    // считаем взятия королем и заполняем список move_list_0x88_O
                    generated_quiet_moves_king(B_KING, BLACK, from, chess_board_0x88, packing_moves);
                    generated_moves_castle_king(B_KING, BLACK, from, chess_board_0x88, packing_moves);                    
                    break;
                case W_QUEEN://QUEEN
                    generated_quiet_moves_queen(W_QUEEN, WHITE, from, chess_board_0x88, packing_moves);
                    break;                    
                case B_QUEEN://QUEEN                
                    generated_quiet_moves_queen(B_QUEEN, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_ROOK://ROOK
                    generated_quiet_moves_rook(W_ROOK, WHITE, from, chess_board_0x88, packing_moves);
                    break;                    
                case B_ROOK://ROOK               
                    generated_quiet_moves_rook(B_ROOK, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_BISHOP://BISHOP
                    generated_quiet_moves_bishop(W_BISHOP, WHITE, from, chess_board_0x88, packing_moves);
                    break;                    
                case B_BISHOP://BISHOP                
                    generated_quiet_moves_bishop(B_BISHOP, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_KNIGHT://KNIGHT
                    generated_quiet_moves_knight(W_KNIGHT, WHITE, from, chess_board_0x88, packing_moves);
                    break;                    
                case B_KNIGHT://KNIGHT                
                    generated_quiet_moves_knight(B_KNIGHT, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_PAWN://PAWN
                    generated_quiet_moves_pawn(W_PAWN, WHITE, from, chess_board_0x88, packing_moves);
                    break;                    
                case B_PAWN://PAWN                
                    generated_quiet_moves_pawn(B_PAWN, BLACK, from, chess_board_0x88, packing_moves);
                    break;
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
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {number}
*/
const add_quiet_move = function (piece_name, piece_color, from, to, chess_board_0x88, packing_moves) {
    let piece_to = chess_board_0x88[to];
    let piece_color_to =  (chess_board_0x88[to] > W_KING) ? BLACK : WHITE;
    let type_move;

    if (piece_to == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
        type_move = return_type_simple_move(piece_name, PIECE_NO);
        add_packing_move(packing_moves, type_move, from, to, PIECE_NO);
        return 0;// можно продолжать луч
    } else if (piece_color != piece_color_to) {// мы уже знаем что тут есть фигура и если цвет отличен, то это взятие
        return 1;// луч прерываем на вражеской фигуре включительно
    } else {//на свою фигуру не прыгаем. хода нет. 
        return 1;// луч прерываем на своей фигуре не включительно
    }
}

// простые ходы короля (т.е. не взятия и не рокировки)
/**
* @param {number} piece_name 
* @param {number} piece_color 
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_king = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
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
            bre_ak = add_quiet_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
        }
    }
}

// простые ходы ферзя (т.е. не взятия)
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_queen = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
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
                bre_ak = add_quiet_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (bre_ak == 1) break;// уперлись в фигуру
                to = to + moves_queen[j];
                if ((to & 136) != 0) break;// конец доски
            }
        }
    }
}

// простые ходы ладьи
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_rook = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
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
                bre_ak = add_quiet_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (bre_ak == 1) break;
                to = to + moves_rook[j];
                if ((to & 136) != 0) break;
            }
        }
    }
}

// простые ходы слона
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_bishop = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
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
                bre_ak = add_quiet_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (bre_ak == 1) break;
                to = to + moves_bishop[j];
                if ((to & 136) != 0) break;
            }
        }
    }

}

// простые ходы коня
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_knight = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
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
            bre_ak = add_quiet_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
        }
    }
}

// рокировки короля. черного, белого, длинные, короткие
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_moves_castle_king = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    let to = -1;
    let piece_to_1 = -1;
    let piece_to_2 = -1;
    let piece_to_3 = -1;
    let type_move = -1;

    if (from == E1) {// король стоит на стартовой позиции
        if (piece_color == 1) {// король белый
            if (chess_board_0x88[IND_CASTLING_Q] == 1) {// рокировка белых в длинную сторону   1/0
                piece_to_1 = chess_board_0x88[B1];
                piece_to_2 = chess_board_0x88[C1];
                piece_to_3 = chess_board_0x88[D1];
                if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                    to = C1;
                    type_move = MOVE_KING_QUEEN_CASTLE;
                    add_packing_move(packing_moves, type_move, from, to, PIECE_NO);
                }
            }

            if (chess_board_0x88[IND_CASTLING_K] == 1) {// рокировка белых в короткую сторону  1/0
                piece_to_1 = chess_board_0x88[F1];
                piece_to_2 = chess_board_0x88[G1];
                if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                    to = G1;
                    type_move = MOVE_KING_CASTLE;
                    add_packing_move(packing_moves, type_move, from, to, PIECE_NO);
                }
            }
        }

    } else if (from == E8) {// король стоит на стартовой позиции
        if (piece_color == 0) {// король черный
            if (chess_board_0x88[IND_CASTLING_q] == 1) {// рокировка черных в длинную сторону   1/0
                piece_to_1 = chess_board_0x88[B8];
                piece_to_2 = chess_board_0x88[C8];
                piece_to_3 = chess_board_0x88[D8];
                if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                    to = C8;
                    type_move = MOVE_KING_QUEEN_CASTLE;
                    add_packing_move(packing_moves, type_move, from, to, PIECE_NO);
                }
            }

            if (chess_board_0x88[IND_CASTLING_k] == 1) {// рокировка черных в короткую сторону  1/0
                piece_to_1 = chess_board_0x88[F8];
                piece_to_2 = chess_board_0x88[G8];
                if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                    to = G8;
                    type_move = MOVE_KING_CASTLE;
                    add_packing_move(packing_moves, type_move, from, to, PIECE_NO);
                }
            }
        }
    }
}

// простые ходы пешек белых и черных
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_pawn = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //console.log("pawn " + piece + " c " + piece_color + " f " + from);
    //console.log("pawn");
    //console.log("from = " + from);
    //console.log("piece = " + piece);
    //console.log("piece_color = " + piece_color);

    if (piece_color == 1) {// белая пешка
        generated_quiet_moves_pawn_white(piece_name, from, chess_board_0x88, packing_moves);
    } else if (piece_color == 0) {
        generated_quiet_moves_pawn_black(piece_name, from, chess_board_0x88, packing_moves);
    }
}


// простые ходы белых пешек
/**
* @param {number} piece_name 
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_pawn_white = function (piece_name, from, chess_board_0x88, packing_moves) {

    if (Math.floor(from / 16) == 6) {// белая пешка на стартовой позиции(2-ая линия). можно ходить на две клетки
        generated_moves_pawn_double(from, (from - 16), (from - 32),
            chess_board_0x88, packing_moves);
    }
    if (Math.floor(from / 16) == 1) {// белая пешка на на предпоследней позиции(7-ая линия). можно ходить с превращением
        generated_quiet_moves_pawn_promo(from, (from - 16),
            chess_board_0x88, packing_moves);
    } else {
        generated_moves_pawn_one(from, (from - 16), chess_board_0x88, packing_moves);
    }

}

// простые ходы черных пешек
/**
* @param {number} piece_name 
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_pawn_black = function (piece_name, from, chess_board_0x88, packing_moves) {

    if (Math.floor(from / 16) == 1) {// белые пешки на стартовой позиции. можно ходить на две клетки
        generated_moves_pawn_double(from, (from + 16), (from + 32),
            chess_board_0x88, packing_moves);
    }
    if (Math.floor(from / 16) == 6) {// 136 0x88
        generated_quiet_moves_pawn_promo(from, (from + 16),
            chess_board_0x88, packing_moves);
    } else {
        generated_moves_pawn_one(from, (from + 16), chess_board_0x88, packing_moves);
    }

}

// ход пешки на одну клетку
/**
* @param {number} from
* @param {number} to
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_moves_pawn_one = function (from, to, chess_board_0x88, packing_moves) {
    let piece_to = -1;
    let type_move = -1;

    piece_to = chess_board_0x88[to];
    if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход 
        type_move = MOVE_PAWN;
        add_packing_move(packing_moves, type_move, from, to, PIECE_NO);
    }
}

// ход пешки на две клетки
/**
* @param {number} from
* @param {number} to_void
* @param {number} to
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_moves_pawn_double = function (from, to_void, to, chess_board_0x88, packing_moves) {
    let piece_to = -1;
    let piece_to_void = -1;
    let type_move = -1;

    piece_to = chess_board_0x88[to];
    piece_to_void = chess_board_0x88[to_void];
    if ((piece_to == 0) && (piece_to_void == 0)) {// фигур там нет. можно ходить. это спокойный ход
        type_move = MOVE_DOUBLE_PAWN;
        add_packing_move(packing_moves, type_move, from, to, PIECE_NO);
    }
}

// ходы пешки с превращением
/**
* @param {number} from
* @param {number} to_center
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_pawn_promo = function (from, to_center, chess_board_0x88, packing_moves) {
    let piece_to = -1;
    let type_move = -1;

    // ход с превращением 
    piece_to = chess_board_0x88[to_center];
    if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
        type_move = MOVE_PAWN_PROMO_QUEEN;
        add_packing_move(packing_moves, type_move, from, to_center, PIECE_NO);
        type_move = MOVE_PAWN_PROMO_ROOK;
        add_packing_move(packing_moves, type_move, from, to_center, PIECE_NO);
        type_move = MOVE_PAWN_PROMO_BISHOP;
        add_packing_move(packing_moves, type_move, from, to_center, PIECE_NO);
        type_move = MOVE_PAWN_PROMO_KNIGHT;
        add_packing_move(packing_moves, type_move, from, to_center, PIECE_NO);
    }
}

export {generated_pseudo_legal_quiet_moves};