// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_generator_quiet_0x88.js
 * @version created 24.01m.2026 
*/

import {
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piese_0x88_cb, test_print_piese_color_0x88_cb, test_print_piese_in_line_0x88_cb, 
    test_compare_chess_board_0x88_cb,save_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb, 
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    IND_MAX_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB, 
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB, 
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB,  SQUARE_128_to_64_CB
} from "./chess_board_0x88.js";

import {
    clear_list_ml, add_packing_move_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml, set_color_ml, 
    set_number_captures_move_ml, sorting_list_ml, test_compare_list_from_ml, test_print_i_move_list_ml, test_print_list_ml, 
    save_list_from_ml, move_is_found_ml, return_i_move_ml, move_to_string_uci_ml, return_type_captures_pawn_promo_ml, 
    return_type_simple_move_ml, type_move_to_name_piese_ml, type_move_to_name_piese_f_ml, return_promo_piece_from_type_move_ml, 
    set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml,
    LENGTH_LIST_ML, IND_PIESE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    IND_PROMO_QUEEN_ML, IND_PROMO_ROOK_ML, IND_PROMO_BISHOP_ML, IND_PROMO_KNIGHT_ML,
    MOVE_NO_ML, CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML, CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML, CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML, CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML, CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML, CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML, CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML, CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML, MOVE_PAWN_PROMO_QUEEN_ML, MOVE_PAWN_PROMO_ROOK_ML, MOVE_PAWN_PROMO_BISHOP_ML,
    MOVE_PAWN_PROMO_KNIGHT_ML, CAPTURES_PAWN_QUEEN_ML, CAPTURES_PAWN_ROOK_ML, CAPTURES_PAWN_BISHOP_ML, CAPTURES_PAWN_KNIGHT_ML,
    CAPTURES_KNIGHT_QUEEN_ML, CAPTURES_KNIGHT_ROOK_ML, CAPTURES_BISHOP_QUEEN_ML, CAPTURES_BISHOP_ROOK_ML, CAPTURES_ROOK_QUEEN_ML,
    CAPTURES_KNIGHT_BISHOP_ML, CAPTURES_KNIGHT_KNIGHT_ML, CAPTURES_BISHOP_BISHOP_ML, CAPTURES_BISHOP_KNIGHT_ML, CAPTURES_ROOK_ROOK_ML,
    CAPTURES_QUEEN_QUEEN_ML, CAPTURES_ROOK_BISHOP_ML, CAPTURES_ROOK_KNIGHT_ML, CAPTURES_QUEEN_ROOK_ML, CAPTURES_QUEEN_BISHOP_ML,
    CAPTURES_QUEEN_KNIGHT_ML, CAPTURES_KING_QUEEN_ML, CAPTURES_KING_ROOK_ML, CAPTURES_KING_BISHOP_ML, CAPTURES_KING_KNIGHT_ML,
    CAPTURES_PAWN_PAWN_ML, EP_CAPTURES_ML, CAPTURES_KNIGHT_PAWN_ML, CAPTURES_BISHOP_PAWN_ML, CAPTURES_ROOK_PAWN_ML,
    CAPTURES_QUEEN_PAWN_ML, CAPTURES_KING_PAWN_ML, MOVE_QUEEN_ML, MOVE_ROOK_ML, MOVE_BISHOP_ML, MOVE_KNIGHT_ML, MOVE_KING_ML, MOVE_PAWN_ML,
    MOVE_DOUBLE_PAWN_ML, MOVE_KING_CASTLE_ML, MOVE_KING_QUEEN_CASTLE_ML, TYPE_MOVE_NAME_ML
} from "./move_list_0x88.js";

/**
* НАЗНАЧЕНИЕ
  Проходим по доске chess_board_0x88 и пишем в список packing_moves только ходы не взятия.
  Списка фигур нет. Максимально простой, на мой взгляд, генератор.
  Ходы псевдолегальные, т.е. тут есть ходы под шах или открывающие шах, а также рокировки 
  через битые поля.
*/
//+
// тут все прозрачно. идей пока нет

const STOP_BEAM_TRUE_MGQ = 1;
const STOP_BEAM_FALSE_MGQ = 0;

// нужно для рокировок и превращений пешек
// именуем поля на первой линии
const A1_MGQ = 112;
const B1_MGQ = 113;
const C1_MGQ = 114;
const D1_MGQ = 115;
const E1_MGQ = 116;
const F1_MGQ = 117;
const G1_MGQ = 118;
const H1_MGQ = 119;

// именуем поля на последней линии   
const A8_MGQ = 0;
const B8_MGQ = 1;
const C8_MGQ = 2;
const D8_MGQ = 3;
const E8_MGQ = 4;
const F8_MGQ = 5;
const G8_MGQ = 6;
const H8_MGQ = 7;

/*
0   1   2
16  17  18
32  33  34    
*/
// ходы короля. так же ходит ферзь
const moves_king_mgq = new Int32Array([-16, -15, 1, 17, 16, 15, -1, -17]);
const moves_queen = moves_king_mgq;
/*
 1      
16 17 18
 33
*/
// ходы ладьи
const moves_rook_mgq = new Int32Array([-16, 1, 16, -1]);
/*
 0    2     
   17
 32   34
*/
// ходы слона
const moves_bishop_mgq = new Int32Array([-15, 17, 15, -17]);
/*
     1---3    
 16    |   20
  |---34---|
 48    |   52     
    65---67
*/
// ходы коня
const moves_knight_mgq = new Int32Array([-33, -31, -14, 18, 33, 31, 14, -18]);


/** генерируем всевозможные ходы, но не учитываем шахи и вскрытые шахи.
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_quiet_moves_mgq = function (chess_board_0x88, packing_moves) {
    //console.log('Move_generator_quiet_0x88_С->generated_pseudo_legal_moves');
    let side_to_move = chess_board_0x88[SIDE_TO_MOVE_CB];
    for (let from = 0; from < 128; from++) {
        // если мы не вышли за пределы доски
        if ((from & 136) == 0) {// 136 0x88
            generated_pseudo_legal_quiet_moves_one_piece_mgq(from, side_to_move, chess_board_0x88, packing_moves);
        }
    }
}


/**  считаем ходы одной фигуры из конкретной позиции
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq = function (from, chess_board_0x88, packing_moves) {
    //console.log('Move_generator_quiet_0x88_С->generated_pseudo_legal_moves');
    let side_to_move = chess_board_0x88[SIDE_TO_MOVE_CB];
    // если мы не вышли за пределы доски
    if ((from & 136) == 0) {// 136 0x88
        generated_pseudo_legal_quiet_moves_one_piece_mgq(from, side_to_move, chess_board_0x88, packing_moves);
    }
}



/** считаем ходы одной фигуры из конкретной позиции
* @param {number} from
* @param {number} side_to_move
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_quiet_moves_one_piece_mgq = function (from, side_to_move, chess_board_0x88, packing_moves) {

    let piece_name;
    let piece_color;

    piece_name = chess_board_0x88[from];
    //piece_color = (chess_board_0x88[from] > W_KING) ? BLACK : WHITE;
    piece_color = 1 - (chess_board_0x88[from] >> 3);// тут магия 8( в битах это 00001000) (подсказал ИИ от Гугла) 1 для белых и 0 для черных.

    // если фигура иммеет цвет ходящей стороны
    if (piece_color == side_to_move) {

        // смотрим фигуру на доске
        switch (piece_name) {
            case W_KING_CB:// белый король
                // считаем взятия королем и заполняем список move_list_0x88_O
                generated_quiet_moves_king_mgq(W_KING_CB, from, chess_board_0x88, packing_moves);
                generated_moves_castle_king_mgq(WHITE_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_KING_CB:// черный король            
                // считаем взятия королем и заполняем список move_list_0x88_O
                generated_quiet_moves_king_mgq(B_KING_CB, from, chess_board_0x88, packing_moves);
                generated_moves_castle_king_mgq(BLACK_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_QUEEN_CB:// белый ферзь
                generated_quiet_moves_queen_mgq(W_QUEEN_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_QUEEN_CB:// черный ферзь              
                generated_quiet_moves_queen_mgq(B_QUEEN_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_ROOK_CB:// белая ладья
                generated_quiet_moves_rook_mgq(W_ROOK_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_ROOK_CB:// черная ладья               
                generated_quiet_moves_rook_mgq(B_ROOK_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_BISHOP_CB:// белый слон
                generated_quiet_moves_bishop_mgq(W_BISHOP_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_BISHOP_CB:// черный слон                
                generated_quiet_moves_bishop_mgq(B_BISHOP_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_KNIGHT_CB:// белый конь
                generated_quiet_moves_knight_mgq(W_KNIGHT_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_KNIGHT_CB:// черный конь              
                generated_quiet_moves_knight_mgq(B_KNIGHT_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_PAWN_CB:// белая пешка
                generated_quiet_moves_pawn_mgq(WHITE_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_PAWN_CB:// черная пешка               
                generated_quiet_moves_pawn_mgq(BLACK_CB, from, chess_board_0x88, packing_moves);
                break;
        }
    }
}


/** смотрим и если находим простые ходы то добавляем в список ходов
* @param {number} piece_name
* @param {number} from
* @param {number} to
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {number}
*/
const add_quiet_move_mgq = function (piece_name, from, to, chess_board_0x88, packing_moves) {

    let piece_to = chess_board_0x88[to];
    let type_move;

    if (piece_to == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
        type_move = return_type_simple_move_ml(piece_name, PIECE_NO_CB);
        add_packing_move_ml(packing_moves, type_move, from, to, PIECE_NO_CB);
        return STOP_BEAM_FALSE_MGQ;// можно продолжать луч
    }
    return STOP_BEAM_TRUE_MGQ;// луч прерываем
}


/** простые ходы короля (т.е. не взятия и не рокировки)
* @param {number} piece_name 
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_king_mgq = function (piece_name, from, chess_board_0x88, packing_moves) {
    //moves_king  = [-16, -15, 1, 17, 16, 15, -1, -17];
    let to;
    let stop_beam;
    for (let j = 0; j < 8; j++) {
        to = from + moves_king_mgq[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            stop_beam = add_quiet_move_mgq(piece_name, from, to, chess_board_0x88, packing_moves);
        }
    }
}


/** простые ходы ферзя (т.е. не взятия)
* @param {number} piece_name 
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_queen_mgq = function (piece_name, from, chess_board_0x88, packing_moves) {
    //    moves_king = [-16, -15, 1, 17, 16, 15, -1, -17];
    //    moves_queen = this.moves_king;
    let to;
    let stop_beam;

    for (let j = 0; j < 8; j++) {
        to = from + moves_queen[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                stop_beam = add_quiet_move_mgq(piece_name, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == STOP_BEAM_TRUE_MGQ) break;// уперлись в фигуру
                to = to + moves_queen[j];
                if ((to & 136) != 0) break;// конец доски
            }
        }
    }
}


/** простые ходы ладьи
* @param {number} piece_name 
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_rook_mgq = function (piece_name, from, chess_board_0x88, packing_moves) {
    //moves_rook = [-16, 1, 16, -1];
    let to;
    let stop_beam;

    for (let j = 0; j < 4; j++) {
        to = from + moves_rook_mgq[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                stop_beam = add_quiet_move_mgq(piece_name, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == STOP_BEAM_TRUE_MGQ) break;
                to = to + moves_rook_mgq[j];
                if ((to & 136) != 0) break;
            }
        }
    }
}


/** простые ходы слона
* @param {number} piece_name 
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_bishop_mgq = function (piece_name, from, chess_board_0x88, packing_moves) {
    //moves_bishop = [-15, 17, 15, -17];
    let to;
    let stop_beam;

    for (let j = 0; j < 4; j++) {
        to = from + moves_bishop_mgq[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                stop_beam = add_quiet_move_mgq(piece_name, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == STOP_BEAM_TRUE_MGQ) break;
                to = to + moves_bishop_mgq[j];
                if ((to & 136) != 0) break;
            }
        }
    }
}


/** простые ходы коня
* @param {number} piece_name 
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_knight_mgq = function (piece_name, from, chess_board_0x88, packing_moves) {
    //moves_knight = [-33, -31, -14, 18, 33, 31, 14, -18];
    let to;
    let stop_beam;

    for (let j = 0; j < 8; j++) {
        to = from + moves_knight_mgq[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            stop_beam = add_quiet_move_mgq(piece_name, from, to, chess_board_0x88, packing_moves);
        }
    }
}


/** рокировки короля. черного, белого, длинные, короткие
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_moves_castle_king_mgq = function (piece_color, from, chess_board_0x88, packing_moves) {
    let to;//        C1_MGQ G1_MGQ
    let piece_to_1;//B1_MGQ F1_MGQ
    let piece_to_2;//C1_MGQ G1_MGQ
    let piece_to_3;//D1_MGQ
    let type_move;

    if (from == E1_MGQ) {//  король стоит на стартовой позиции
        if (piece_color == WHITE_CB) {// король белый
            if (chess_board_0x88[IND_CASTLING_Q_CB] == 1) {// рокировка белых в длинную сторону   1/0
                piece_to_1 = chess_board_0x88[B1_MGQ];
                piece_to_2 = chess_board_0x88[C1_MGQ];
                piece_to_3 = chess_board_0x88[D1_MGQ];
                if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                    to = C1_MGQ;
                    type_move = MOVE_KING_QUEEN_CASTLE_ML;
                    add_packing_move_ml(packing_moves, type_move, from, to, PIECE_NO_CB);
                }
            }

            if (chess_board_0x88[IND_CASTLING_K_CB] == 1) {// рокировка белых в короткую сторону  1/0
                piece_to_1 = chess_board_0x88[F1_MGQ];
                piece_to_2 = chess_board_0x88[G1_MGQ];
                if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                    to = G1_MGQ;
                    type_move = MOVE_KING_CASTLE_ML;
                    add_packing_move_ml(packing_moves, type_move, from, to, PIECE_NO_CB);
                }
            }
        }

    } else if (from == E8_MGQ) {// король стоит на стартовой позиции
        if (piece_color == BLACK_CB) {// король черный
            if (chess_board_0x88[IND_CASTLING_q_CB] == 1) {// рокировка черных в длинную сторону   1/0
                piece_to_1 = chess_board_0x88[B8_MGQ];
                piece_to_2 = chess_board_0x88[C8_MGQ];
                piece_to_3 = chess_board_0x88[D8_MGQ];
                if ((piece_to_1 == 0) && (piece_to_2 == 0) && (piece_to_3 == 0)) {//
                    to = C8_MGQ;
                    type_move = MOVE_KING_QUEEN_CASTLE_ML;
                    add_packing_move_ml(packing_moves, type_move, from, to, PIECE_NO_CB);
                }
            }

            if (chess_board_0x88[IND_CASTLING_k_CB] == 1) {// рокировка черных в короткую сторону  1/0
                piece_to_1 = chess_board_0x88[F8_MGQ];
                piece_to_2 = chess_board_0x88[G8_MGQ];
                if ((piece_to_1 == 0) && (piece_to_2 == 0)) {//
                    to = G8_MGQ;
                    type_move = MOVE_KING_CASTLE_ML;
                    add_packing_move_ml(packing_moves, type_move, from, to, PIECE_NO_CB);
                }
            }
        }
    }
}


/** простые ходы пешек белых и черных
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_pawn_mgq = function (piece_color, from, chess_board_0x88, packing_moves) {

    if (piece_color == 1) {// белая пешка
        generated_quiet_moves_pawn_white_mgq(from, chess_board_0x88, packing_moves);
    } else if (piece_color == 0) {
        generated_quiet_moves_pawn_black_mgq(from, chess_board_0x88, packing_moves);
    }
}



/** простые ходы белых пешек
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_pawn_white_mgq = function (from, chess_board_0x88, packing_moves) {

    if (Math.floor(from / 16) == 6) {// белая пешка на стартовой позиции(2-ая линия снизу). можно ходить на две клетки
        generated_moves_pawn_double_mgq(from, (from - 16), (from - 32),
            chess_board_0x88, packing_moves);
    }
    if (Math.floor(from / 16) == 1) {// белая пешка на предпоследней позиции(7-ая линия снизу). можно ходить с превращением
        generated_quiet_moves_pawn_promo_mgq(from, (from - 16),
            chess_board_0x88, packing_moves);
    } else { //ходы белой пешки на одну клетку
        generated_moves_pawn_one_mgq(from, (from - 16), chess_board_0x88, packing_moves);
    }

}


/** простые ходы черных пешек
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_pawn_black_mgq = function (from, chess_board_0x88, packing_moves) {

    if (Math.floor(from / 16) == 1) {// черная пешка на стартовой позиции(7-ая линия снизу). можно ходить на две клетки
        generated_moves_pawn_double_mgq(from, (from + 16), (from + 32),
            chess_board_0x88, packing_moves);
    }
    if (Math.floor(from / 16) == 6) {// черная пешка на предпоследней позиции(2-ая линия снизу). можно ходить с превращением
        generated_quiet_moves_pawn_promo_mgq(from, (from + 16),
            chess_board_0x88, packing_moves);
    } else { //ходы черной пешки на одну клетку
        generated_moves_pawn_one_mgq(from, (from + 16), chess_board_0x88, packing_moves);
    }

}


/** ход пешки на одну клетку
* @param {number} from
* @param {number} to
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_moves_pawn_one_mgq = function (from, to, chess_board_0x88, packing_moves) {
    let piece_to;
    let type_move;

    piece_to = chess_board_0x88[to];
    if (piece_to == 0) {// фигуры там нет. можно ходить. это спокойный ход 
        type_move = MOVE_PAWN_ML;
        add_packing_move_ml(packing_moves, type_move, from, to, PIECE_NO_CB);
    }
}


/** ход пешки на две клетки
* @param {number} from
* @param {number} to_void
* @param {number} to
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_moves_pawn_double_mgq = function (from, to_void, to, chess_board_0x88, packing_moves) {
    let piece_to;
    let piece_to_void;
    let type_move;

    piece_to = chess_board_0x88[to];
    piece_to_void = chess_board_0x88[to_void];
    if ((piece_to == 0) && (piece_to_void == 0)) {// фигур там нет. можно ходить. это спокойный ход
        type_move = MOVE_DOUBLE_PAWN_ML;
        add_packing_move_ml(packing_moves, type_move, from, to, PIECE_NO_CB);
    }
}


/** ходы пешки с превращением
* @param {number} from
* @param {number} to_center
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_quiet_moves_pawn_promo_mgq = function (from, to_center, chess_board_0x88, packing_moves) {
    let piece_to;
    let type_move;

    // ход с превращением 
    piece_to = chess_board_0x88[to_center];
    if (piece_to == 0) {// цвет не задан и значит фигуры там нет. можно ходить. это спокойный ход
        type_move = MOVE_PAWN_PROMO_QUEEN_ML;
        add_packing_move_ml(packing_moves, type_move, from, to_center, PIECE_NO_CB);
        type_move = MOVE_PAWN_PROMO_ROOK_ML;
        add_packing_move_ml(packing_moves, type_move, from, to_center, PIECE_NO_CB);
        type_move = MOVE_PAWN_PROMO_BISHOP_ML;
        add_packing_move_ml(packing_moves, type_move, from, to_center, PIECE_NO_CB);
        type_move = MOVE_PAWN_PROMO_KNIGHT_ML;
        add_packing_move_ml(packing_moves, type_move, from, to_center, PIECE_NO_CB);
    }
}

export { 
    generated_pseudo_legal_quiet_moves_mgq, generated_pseudo_legal_quiet_moves_one_piece_for_gui_mgq,
    A1_MGQ, B1_MGQ, C1_MGQ , D1_MGQ, E1_MGQ, F1_MGQ, G1_MGQ, H1_MGQ, 
    A8_MGQ, B8_MGQ, C8_MGQ, D8_MGQ, E8_MGQ, F8_MGQ, G8_MGQ, H8_MGQ
};