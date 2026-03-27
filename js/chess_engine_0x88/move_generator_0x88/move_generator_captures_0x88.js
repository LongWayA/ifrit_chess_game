// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_generator_captures_0x88.js
 * @version created 24.01m.2026 
*/

import {
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piese_0x88_cb, test_print_piese_color_0x88_cb, test_print_piese_in_line_0x88_cb,
    test_compare_chess_board_0x88_cb, save_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb,
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    IND_MAX_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB,
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
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
  Проходим по доске chess_board_0x88 и пишем в список packing_moves только взятия.
  Списка фигур нет. Максимально простой, на мой взгляд, генератор.
  Ходы псевдолегальные, т.е. тут есть ходы под шах или открывающие шах.
*/

const STOP_BEAM_TRUE_MGC = 1;
const STOP_BEAM_FALSE_MGC = 0;
/*
0   1   2
16  17  18
32  33  34    
*/
// ходы короля. так же ходит ферзь
const moves_king_mgc = new Int32Array([-16, -15, 1, 17, 16, 15, -1, -17]);
const moves_queen = moves_king_mgc;
/*
 1      
16 17 18
 33
*/
// ходы ладьи
const moves_rook_mgc = new Int32Array([-16, 1, 16, -1]);
/*
 0    2     
   17
 32   34
*/
// ходы слона
const moves_bishop_mgc = new Int32Array([-15, 17, 15, -17]);
/*
     1---3    
 16    |   20
  |---34---|
 48    |   52     
    65---67
*/
// ходы коня
const moves_knight_mgc = new Int32Array([-33, -31, -14, 18, 33, 31, 14, -18]);

/** генерируем всевозможные ходы, но не учитываем шахи и вскрытые шахи.
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_captures_mgc = function (chess_board_0x88, packing_moves) {
    //console.log('->generated_pseudo_legal_moves');
    // вывели из цикла чтобы определить один раз
    let side_to_move = chess_board_0x88[SIDE_TO_MOVE_CB];

    clear_list_ml(packing_moves);
    packing_moves[IND_PIESE_COLOR_ML] = side_to_move;

    // бежим по доске
    for (let from = 0; from < 128; from++) {
        // если мы не вышли за пределы доски
        if ((from & 136) == 0) {// 136 0x88
            generated_pseudo_legal_captures_one_piece_mgc(from, side_to_move, chess_board_0x88, packing_moves);
        }
    }
    // все ходы которые мы нашли это взятия. так что количество взятий равно количеству ходов
    packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = packing_moves[IND_NUMBER_MOVE_ML];
}

/** считаем ходы одной фигуры из конкретной позиции. сделал для работы гуи
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_captures_one_piece_for_gui_mgc = function (from, chess_board_0x88, packing_moves) {
    //console.log('->generated_pseudo_legal_moves');
    // тут определяем чтобы не менять вызов generated_pseudo_legal_moves_one_piece(from, side_to_move, ...
    let side_to_move = chess_board_0x88[SIDE_TO_MOVE_CB];

    clear_list_ml(packing_moves);
    packing_moves[IND_PIESE_COLOR_ML] = side_to_move;
    // если мы не вышли за пределы доски
    if ((from & 136) == 0) {// 136 0x88
        generated_pseudo_legal_captures_one_piece_mgc(from, side_to_move, chess_board_0x88, packing_moves);
    }
}



/**  считаем ходы одной фигуры из конкретной позиции
* @param {number} from
* @param {number} side_to_move
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_captures_one_piece_mgc = function (from, side_to_move, chess_board_0x88, packing_moves) {

    let piece_name = -1;// имя фигуры типа 1,2,...,6, 9,...,14
    let piece_color = -1;// цвет фигуры 0 или 1


    piece_name = chess_board_0x88[from];
    //piece_color = (chess_board_0x88[from] > W_KING) ? BLACK : WHITE;
    piece_color = 1 - (chess_board_0x88[from] >> 3);// тут магия 8( в битах это 00001000) (подсказал ИИ от Гугла) 1 для белых и 0 для черных.

    // если фигура иммеет цвет ходящей стороны
    if (piece_color == side_to_move) {

        // смотрим фигуру на доске
        switch (piece_name) {
            case W_KING_CB:// белый король
                generated_captures_moves_king_mgc(W_KING_CB, WHITE_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_KING_CB:// черный король              
                generated_captures_moves_king_mgc(B_KING_CB, BLACK_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_QUEEN_CB:// белый ферзь
                generated_captures_moves_queen_mgc(W_QUEEN_CB, WHITE_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_QUEEN_CB:// черный ферзь            
                generated_captures_moves_queen_mgc(B_QUEEN_CB, BLACK_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_ROOK_CB:// белая ладья 
                generated_captures_moves_rook_mgc(W_ROOK_CB, WHITE_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_ROOK_CB:// черная ладья              
                generated_captures_moves_rook_mgc(B_ROOK_CB, BLACK_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_BISHOP_CB:// белый слон
                generated_captures_moves_bishop_mgc(W_BISHOP_CB, WHITE_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_BISHOP_CB:// черный слон              
                generated_captures_moves_bishop_mgc(B_BISHOP_CB, BLACK_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_KNIGHT_CB:// белый конь
                generated_captures_moves_knight_mgc(W_KNIGHT_CB, WHITE_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_KNIGHT_CB:// черный слон            
                generated_captures_moves_knight_mgc(B_KNIGHT_CB, BLACK_CB, from, chess_board_0x88, packing_moves);
                break;
            case W_PAWN_CB:// белая пешка
                generated_captures_moves_pawn_mgc(W_PAWN_CB, WHITE_CB, from, chess_board_0x88, packing_moves);
                break;
            case B_PAWN_CB:// черная пешка            
                generated_captures_moves_pawn_mgc(B_PAWN_CB, BLACK_CB, from, chess_board_0x88, packing_moves);
                break;
            default://
            // console.log("default");
        }
    }
}


/** смотрим ход from, to и если это взятие добавляем в список.
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {number} to
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {number} 0-можно продолжить луч, 1-прерываем луч (stop_beam)
*/
const add_captures_move_mgc = function (piece_name, piece_color, from, to, chess_board_0x88, packing_moves) {

    let piece_captures = chess_board_0x88[to];// имя взятой фигуры
    let piece_color_captures;// цвет взятой фигуры
    let type_move;// тип хода

    if (piece_captures == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
        return STOP_BEAM_FALSE_MGC;// можно продолжать луч
    }

    //piece_color_captures = (chess_board_0x88[to] > W_KING) ? BLACK : WHITE;// цвет взятой фигуры
    piece_color_captures = 1 - (chess_board_0x88[to] >> 3);

    if (piece_color != piece_color_captures) {// мы уже знаем что тут есть фигура и если цвет отличен, то это взятие  
        // определяем тип простых взятий по имени фигуры и имени взятой фигуры
        type_move = return_type_simple_move_ml(piece_name, piece_captures);

        // добавляем взятие в список
        add_packing_move_ml(packing_moves, type_move, from, to, piece_captures);
    }

    return STOP_BEAM_TRUE_MGC;// луч прерываем на фигуре
}


/** взятия королем
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_king_mgc = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //moves_king  = [-16, -15, 1, 17, 16, 15, -1, -17];
    let to;
    let stop_beam;
    // просматриваем все поля вокруг короля
    for (let j = 0; j < 8; j++) {
        to = from + moves_king_mgc[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            stop_beam = add_captures_move_mgc(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
        }
    }
}

/** взятия ферзем
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_queen_mgc = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //    moves_king = [-16, -15, 1, 17, 16, 15, -1, -17];
    //    moves_queen = this.moves_king;
    let to;
    let stop_beam;

    for (let j = 0; j < 8; j++) {
        to = from + moves_queen[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                // проверяем каждую клетку хода на фигуру. если есть фигура противника то добавляем взятие
                // в список, если это наша фигура то прерываем поиск на этом луче иначе идем дальше
                stop_beam = add_captures_move_mgc(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == STOP_BEAM_TRUE_MGC) break;// уперлись в фигуру
                to = to + moves_queen[j];
                if ((to & 136) != 0) break;// конец доски прерываем поиск на этом луче
            }
        }
    }
}


/** взятия ладьей
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_rook_mgc = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //moves_rook = [-16, 1, 16, -1];
    let to;
    let stop_beam;

    for (let j = 0; j < 4; j++) {
        to = from + moves_rook_mgc[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                stop_beam = add_captures_move_mgc(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == STOP_BEAM_TRUE_MGC) break;
                to = to + moves_rook_mgc[j];
                if ((to & 136) != 0) break;
            }
        }
    }
}


/** взятия слоном
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_bishop_mgc = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //moves_bishop = [-15, 17, 15, -17];
    let to;
    let stop_beam;

    for (let j = 0; j < 4; j++) {
        to = from + moves_bishop_mgc[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                stop_beam = add_captures_move_mgc(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == STOP_BEAM_TRUE_MGC) break;
                to = to + moves_bishop_mgc[j];
                if ((to & 136) != 0) break;
            }
        }
    }

}


/** взятие конем
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_knight_mgc = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //moves_knight = [-33, -31, -14, 18, 33, 31, 14, -18];
    let to;
    let stop_beam;

    for (let j = 0; j < 8; j++) {
        to = from + moves_knight_mgc[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            stop_beam = add_captures_move_mgc(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
        }
    }
}


/** взятия пешкой
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_pawn_mgc = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {

    if (piece_color == 1) {// белая пешка
        // взятие белой пешкой
        generated_captures_moves_pawn_white_mgc(piece_name, piece_color, from, chess_board_0x88, packing_moves);
    } else {
        // взятие черной пешкой
        generated_captures_moves_pawn_black_mgc(piece_name, piece_color, from, chess_board_0x88, packing_moves);
    }
}

/** взятия белой пешкой
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_pawn_white_mgc = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    if (Math.floor(from / 16) == 1) {// белая пешка на на предпоследней позиции(7-ая линия из 8). можно смотреть взятие с превращением
        // смотрим и если есть добавляем взятия пешкой с превращением
        generated_captures_moves_pawn_promo_mgc(piece_name, from, (from - 17), (from - 15),
            piece_color, chess_board_0x88, packing_moves);
    } else {
        // простое взятие пешкой
        generated_moves_pawn_captures_mgc(piece_name, from, (from - 17), (from - 15),
            piece_color, chess_board_0x88, packing_moves);
    }
}


/** взятия черной пешкой
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_pawn_black_mgc = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    if (Math.floor(from / 16) == 6) {// черная пешка на на предпоследней позиции(2-ая линия из 8). можно смотреть взятие с превращением
        generated_captures_moves_pawn_promo_mgc(piece_name, from, (from + 15), (from + 17),
            piece_color, chess_board_0x88, packing_moves);
    } else {
        generated_moves_pawn_captures_mgc(piece_name, from, (from + 15), (from + 17),
            piece_color, chess_board_0x88, packing_moves);
    }

}


/** простые взятия пешкой как белой так и черной
* @param {number} piece_name
* @param {number} from
* @param {number} to_left
* @param {number} to_right
* @param {number} piece_color 
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_moves_pawn_captures_mgc = function (piece_name, from, to_left, to_right, piece_color, chess_board_0x88, packing_moves) {
    let piece_color_captures;
    let piece_captures;
    let type_move;

    if ((to_left & 136) == 0) {// взятия налево если мы на доске
        piece_captures = chess_board_0x88[to_left];
        //piece_color_captures = (chess_board_0x88[to_left] > W_KING) ? BLACK : WHITE;
        piece_color_captures = 1 - (chess_board_0x88[to_left] >> 3);
        if (piece_captures != 0) {// если есть фигура
            if (piece_color != piece_color_captures) {// и если цвет фигуры не наш тогда берем фигуру
                type_move = return_type_simple_move_ml(piece_name, piece_captures);
                add_packing_move_ml(packing_moves, type_move, from, to_left, piece_captures);
            }
        // иначе смотрим активен ли флаг взятия на проходе и если активен то смотрим совпадет ли поле взятия с полем нашего хода,
        // если да то пишем ход взятия на проходе
        } else if ((chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) && (chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] == to_left)) {
            type_move = EP_CAPTURES_ML;
            add_packing_move_ml(packing_moves, type_move, from, to_left, piece_captures);
        }
    }
    if ((to_right & 136) == 0) {// 136 0x88    
        piece_captures = chess_board_0x88[to_right];
        //piece_color_captures = (chess_board_0x88[to_right] > W_KING) ? BLACK : WHITE;
        piece_color_captures = 1 - (chess_board_0x88[to_right] >> 3);
        if (piece_captures != 0) {// 
            if (piece_color != piece_color_captures) {// 
                type_move = return_type_simple_move_ml(piece_name, piece_captures);
                add_packing_move_ml(packing_moves, type_move, from, to_right, piece_captures);
            }
        } else if ((chess_board_0x88[IND_EN_PASSANT_YES_CB] == 1) && (chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE_CB] == to_right)) {
            type_move = EP_CAPTURES_ML;
            add_packing_move_ml(packing_moves, type_move, from, to_right, piece_captures);
        }
    }

}


/** взятие пешкой с превращением
* @param {number} piece_name 
* @param {number} from
* @param {number} to_left
* @param {number} to_right
* @param {number} piece_color 
* @param {Int32Array} chess_board_0x88
* @param {Int32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_pawn_promo_mgc = function (piece_name, from, to_left, to_right, piece_color, chess_board_0x88, packing_moves) {
    let piece_color_captures;
    let piece_captures;
    let type_move;

    // взятие пешкой влево с превращением
    if ((to_left & 136) == 0) {// 136 0x88                
        piece_captures = chess_board_0x88[to_left];
        //piece_color_captures = (chess_board_0x88[to_left] > W_KING) ? BLACK : WHITE;
        piece_color_captures = 1 - (chess_board_0x88[to_left] >> 3);

        if ((piece_captures != 0) && (piece_color != piece_color_captures)) {//
            // по взятой фигуре возвращаем тип хода взятия с превращением
            let out = return_type_captures_pawn_promo_ml(piece_captures);

            type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
            add_packing_move_ml(packing_moves, type_move, from, to_left, piece_captures);
            type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
            add_packing_move_ml(packing_moves, type_move, from, to_left, piece_captures);
            type_move = out[IND_PROMO_BISHOP_ML];
            add_packing_move_ml(packing_moves, type_move, from, to_left, piece_captures);
            type_move = out[IND_PROMO_KNIGHT_ML];
            add_packing_move_ml(packing_moves, type_move, from, to_left, piece_captures);

        }
    }
    // взятие пешкой вправо с превращением
    if ((to_right & 136) == 0) {// 136 0x88      
        piece_captures = chess_board_0x88[to_right];
        //piece_color_captures = (chess_board_0x88[to_right] > W_KING) ? BLACK : WHITE;
        piece_color_captures = 1 - (chess_board_0x88[to_right] >> 3);

        if ((piece_captures != 0) && (piece_color != piece_color_captures)) {// 
            let out = return_type_captures_pawn_promo_ml(piece_captures);

            type_move = out[IND_PROMO_QUEEN_ML];// взятие с превращением в ферзь
            add_packing_move_ml(packing_moves, type_move, from, to_right, piece_captures);
            type_move = out[IND_PROMO_ROOK_ML];// взятие с превращением в ладью
            add_packing_move_ml(packing_moves, type_move, from, to_right, piece_captures);
            type_move = out[IND_PROMO_BISHOP_ML];
            add_packing_move_ml(packing_moves, type_move, from, to_right, piece_captures);
            type_move = out[IND_PROMO_KNIGHT_ML];
            add_packing_move_ml(packing_moves, type_move, from, to_right, piece_captures);
        }
    }
}

////////////////////////////////
// детектор шахов

/** у нас нету хода взятия короля, поэтому пришлось специально прописывать функцию обнаружения короля на дистанции хода короля
* @param {number} from
* @param {number} piece_color 
* @param {Int32Array} chess_board_0x88
* @returns {number}
*/
const check_detected_generated_moves_king_mgc = function (from, piece_color, chess_board_0x88) {
    let to;
    let check = -1;

    for (let j = 0; j < 8; j++) {
        to = from + moves_king_mgc[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            // если на клетке хода обнаружили короля проверим цвет, так как детектором и рокировки проверяем, а там свой король тусуется :)
            if ((chess_board_0x88[to] == B_KING_CB) && (piece_color == WHITE_CB)) {
                check = B_KING_CB;
                return check;
            }
            if ((chess_board_0x88[to] == W_KING_CB) && (piece_color == BLACK_CB)) {
                check = W_KING_CB;
                return check;
            }
        }
    }
    return check;
}


/** ищем шахи
* @param {number} from
* @param {number} piece_color 
* @param {Int32Array} chess_board_0x88
* @returns {number}
*/
const check_detected_mgc = function (from, piece_color, chess_board_0x88) {

    let check = -1;
    let packing_moves_in = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    let number_move;

    if (piece_color == WHITE_CB) {

        clear_list_ml(packing_moves_in);
        // 1 шах от короля это если подошли к королю противника вплотную
        if (check_detected_generated_moves_king_mgc(from, piece_color, chess_board_0x88) == B_KING_CB) {
            check = B_KING_CB;
            return check;
        }


        clear_list_ml(packing_moves_in);
        // 2 шах от коня
        generated_captures_moves_knight_mgc(W_KNIGHT_CB, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE_ML];

        for (let i = 0; i < number_move; i++) {


            if (get_name_capture_piece_ml(i, packing_moves_in) == B_KNIGHT_CB) {
                check = B_KNIGHT_CB;
                return check;
            }
        }

        clear_list_ml(packing_moves_in);
        // 3 шах от слона + 1/2 шах от половины ходов ферзя как у слона
        generated_captures_moves_bishop_mgc(W_BISHOP_CB, piece_color, from, chess_board_0x88, packing_moves_in)

        number_move = packing_moves_in[IND_NUMBER_MOVE_ML];

        for (let i = 0; i < number_move; i++) {

            if (get_name_capture_piece_ml(i, packing_moves_in) == B_BISHOP_CB) {
                check = B_BISHOP_CB;
                return check;
            }
            if (get_name_capture_piece_ml(i, packing_moves_in) == B_QUEEN_CB) {
                check = B_QUEEN_CB;
                return check;
            }
        }

        clear_list_ml(packing_moves_in);
        // 4 шах от ладьи + 1/2 шах от половины ходов ферзя как у ладьи
        generated_captures_moves_rook_mgc(W_ROOK_CB, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE_ML];

        for (let i = 0; i < number_move; i++) {

            if (get_name_capture_piece_ml(i, packing_moves_in) == B_ROOK_CB) {
                check = B_ROOK_CB;
                return check;
            }
            if (get_name_capture_piece_ml(i, packing_moves_in) == B_QUEEN_CB) {
                check = B_QUEEN_CB;
                return check;
            }
        }

        clear_list_ml(packing_moves_in);
        // 5 шах от пешек
        generated_captures_moves_pawn_mgc(W_PAWN_CB, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE_ML];

        for (let i = 0; i < number_move; i++) {

            if (get_name_capture_piece_ml(i, packing_moves_in) == B_PAWN_CB) {
                check = B_PAWN_CB;
                return check;
            }
        }
    } else { // то же для черных
        
        clear_list_ml(packing_moves_in);
        // 1 шах от короля это если подошли к королю противника вплотную
        if (check_detected_generated_moves_king_mgc(from, piece_color, chess_board_0x88) == W_KING_CB) {
            check = W_KING_CB;
            return check;
        }

        clear_list_ml(packing_moves_in);
        // 2 шах от коня
        generated_captures_moves_knight_mgc(B_KNIGHT_CB, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE_ML];

        for (let i = 0; i < number_move; i++) {

            if (get_name_capture_piece_ml(i, packing_moves_in) == W_KNIGHT_CB) {
                check = W_KNIGHT_CB;
                return check;
            }
        }

        clear_list_ml(packing_moves_in);
        // 3 шах от слона + 1/2 шах от половины ходов ферзя как у слона
        generated_captures_moves_bishop_mgc(B_BISHOP_CB, piece_color, from, chess_board_0x88, packing_moves_in)

        number_move = packing_moves_in[IND_NUMBER_MOVE_ML];

        for (let i = 0; i < number_move; i++) {

            if (get_name_capture_piece_ml(i, packing_moves_in) == W_BISHOP_CB) {
                check = W_BISHOP_CB;
                return check;
            }
            if (get_name_capture_piece_ml(i, packing_moves_in) == W_QUEEN_CB) {
                check = W_QUEEN_CB;
                return check;
            }
        }

        clear_list_ml(packing_moves_in);
        // 4 шах от ладьи + 1/2 шах от половины ходов ферзя как у ладьи
        generated_captures_moves_rook_mgc(B_ROOK_CB, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE_ML];

        for (let i = 0; i < number_move; i++) {

            if (get_name_capture_piece_ml(i, packing_moves_in) == W_ROOK_CB) {
                check = W_ROOK_CB;
                return check;
            }
            if (get_name_capture_piece_ml(i, packing_moves_in) == W_QUEEN_CB) {
                check = W_QUEEN_CB;
                return check;
            }
        }

        clear_list_ml(packing_moves_in);
        // 5 шах от пешек
        generated_captures_moves_pawn_mgc(B_PAWN_CB, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE_ML];

        for (let i = 0; i < number_move; i++) {

            if (get_name_capture_piece_ml(i, packing_moves_in) == W_PAWN_CB) {
                check = W_PAWN_CB;
                return check;
            }
        }

    }
    check = 0;// нет шаха
    return check;
}

export {
    generated_pseudo_legal_captures_mgc, generated_pseudo_legal_captures_one_piece_for_gui_mgc, check_detected_mgc
};