// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_generator_captures_new.js
 * @version created 24.01m.2026 
*/

import {
 SIDE_TO_MOVE,
    BLACK, WHITE, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
    IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE
} from "./chess_board_new.js";

import {
    clear_list, add_packing_move,  get_name_capture_piece, 
    return_type_captures_pawn_promo, return_type_simple_move,
    LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_CAPTURES_MOVE, IND_NUMBER_MOVE,
    IND_PROMO_QUEEN, IND_PROMO_ROOK, IND_PROMO_BISHOP, IND_PROMO_KNIGHT, MOVE_NO,
    EP_CAPTURES
} from "../move_generator/move_list_new.js";

/**
* НАЗНАЧЕНИЕ
  Проходим по доске chess_board_0x88 и пишем в список move_list_0x88_O только взятия.
  Списка фигур нет. Максимально простой, на мой взгляд, генератор.
  Ходы псевдолегальные, т.е. тут есть ходы под шах или открывающие шах.
*/

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
const generated_pseudo_legal_captures = function (chess_board_0x88, packing_moves) {
    //console.log('->generated_pseudo_legal_moves');
    // вывели из цикла чтобы определить один раз
    let side_to_move = chess_board_0x88[SIDE_TO_MOVE];

    clear_list(packing_moves);
    packing_moves[IND_PIESE_COLOR] = side_to_move;

    for (let from = 0; from < 128; from++) {
        generated_pseudo_legal_moves_one_piece(from, side_to_move, chess_board_0x88, packing_moves);
    }
    packing_moves[IND_NUMBER_CAPTURES_MOVE] = packing_moves[IND_NUMBER_MOVE];
}

//  считаем ходы одной фигуры из конкретной позиции
/**
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_pseudo_legal_moves_one_piece_for_gui = function (from, chess_board_0x88, packing_moves) {
    //console.log('->generated_pseudo_legal_moves');
    // тут определяем чтобы не менять вызов generated_pseudo_legal_moves_one_piece(from, side_to_move, ...
    let side_to_move = chess_board_0x88[SIDE_TO_MOVE];

    clear_list(packing_moves);
    packing_moves[IND_PIESE_COLOR] = side_to_move;

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

    let piece_name = -1;// имя фигуры типа 1,2, ...,6
    let piece_color = -1;// цвет фигуры 0 или 1

    // если мы не вышли за пределы доски
    if ((from & 136) == 0) {// 136 0x88
        piece_name = chess_board_0x88[from];
        piece_color = (chess_board_0x88[from] > W_KING) ? BLACK : WHITE;

        // если фигура иммеет цвет ходящей стороны
        if (piece_color == side_to_move) {

            // смотрим фигуру на доске
            switch (piece_name) {
                case W_KING:// KING
                    // считаем взятия королем и заполняем список move_list_0x88_O
                    generated_captures_moves_king(W_KING, WHITE, from, chess_board_0x88, packing_moves);
                    break;
                case B_KING:// KING                
                    // считаем взятия королем и заполняем список move_list_0x88_O
                    generated_captures_moves_king(B_KING, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_QUEEN://QUEEN
                    generated_captures_moves_queen(W_QUEEN, WHITE, from, chess_board_0x88, packing_moves);
                    break;
                case B_QUEEN://QUEEN                
                    generated_captures_moves_queen(B_QUEEN, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_ROOK://ROOK
                    generated_captures_moves_rook(W_ROOK, WHITE, from, chess_board_0x88, packing_moves);
                    break;
                case B_ROOK://ROOK               
                    generated_captures_moves_rook(B_ROOK, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_BISHOP://BISHOP
                    generated_captures_moves_bishop(W_BISHOP, WHITE, from, chess_board_0x88, packing_moves);
                    break;
                case B_BISHOP://BISHOP                
                    generated_captures_moves_bishop(B_BISHOP, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_KNIGHT://KNIGHT
                    generated_captures_moves_knight(W_KNIGHT, WHITE, from, chess_board_0x88, packing_moves);
                    break;
                case B_KNIGHT://KNIGHT                
                    generated_captures_moves_knight(B_KNIGHT, BLACK, from, chess_board_0x88, packing_moves);
                    break;
                case W_PAWN://PAWN
                    generated_captures_moves_pawn(W_PAWN, WHITE, from, chess_board_0x88, packing_moves);
                    break;
                case B_PAWN://PAWN                
                    generated_captures_moves_pawn(B_PAWN, BLACK, from, chess_board_0x88, packing_moves);
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
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {number}
*/
const add_captures_move = function (piece_name, piece_color, from, to, chess_board_0x88, packing_moves) {

    let piece_captures = chess_board_0x88[to];// имя взятой фигуры
    let piece_color_captures;// цвет взятой фигуры
    let type_move;// тип хода

    if (piece_captures == 0) {// проверяем клетку куда ходим. Если там нет фигур то можно ходить
        return 0;// можно продолжать луч
    } 
    piece_color_captures = (chess_board_0x88[to] > W_KING) ? BLACK : WHITE;// цвет взятой фигуры

    if (piece_color != piece_color_captures) {// мы уже знаем что тут есть фигура и если цвет отличен, то это взятие  
        // определяем тип простых взятий по имени фигуры и имени взятой фигуры
        type_move = return_type_simple_move(piece_name, piece_captures);
        // добавляем взятие в список
        add_packing_move(packing_moves, type_move, from, to, piece_captures);
        return 1;// луч прерываем на вражеской фигуре включительно
    } else {//на свою фигуру не прыгаем. хода нет. 
        return 1;// луч прерываем на своей фигуре не включительно
    }
}

// взятия королем
/**
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_king = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //moves_king  = [-16, -15, 1, 17, 16, 15, -1, -17];
    let to;
    let stop_beam;
    for (let j = 0; j < 8; j++) {
        to = from + moves_king[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            stop_beam = add_captures_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
        }
    }
}

// взятия ферзем
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_queen = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
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
                stop_beam = add_captures_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == 1) break;// уперлись в фигуру
                to = to + moves_queen[j];
                if ((to & 136) != 0) break;// конец доски прерываем поиск на этом луче
            }
        }
    }
}

// взятия ладьей
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_rook = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //moves_rook = [-16, 1, 16, -1];
    let to;
    let stop_beam;

    for (let j = 0; j < 4; j++) {
        to = from + moves_rook[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                stop_beam = add_captures_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == 1) break;
                to = to + moves_rook[j];
                if ((to & 136) != 0) break;
            }
        }
    }
}

// взятия слоном
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_bishop = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //moves_bishop = [-15, 17, 15, -17];
    let to;
    let stop_beam;

    for (let j = 0; j < 4; j++) {
        to = from + moves_bishop[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            while (true) {
                stop_beam = add_captures_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
                if (stop_beam == 1) break;
                to = to + moves_bishop[j];
                if ((to & 136) != 0) break;
            }
        }
    }

}

// взятие конем
/**
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_knight = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    //moves_knight = [-33, -31, -14, 18, 33, 31, 14, -18];
    let to;
    let stop_beam;

    for (let j = 0; j < 8; j++) {
        to = from + moves_knight[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            stop_beam = add_captures_move(piece_name, piece_color, from, to, chess_board_0x88, packing_moves);
        }
    }
}

// взятия пешкой
/**
* @param {number} piece_name 
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_pawn = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    
    if (piece_color == 1) {// белая пешка
        // взятие белой пешкой
        generated_captures_moves_pawn_white(piece_name, piece_color, from, chess_board_0x88, packing_moves);
    } else {
        // взятие черной пешкой
        generated_captures_moves_pawn_black(piece_name, piece_color, from, chess_board_0x88, packing_moves);
    }
}

///////////////////////////////////////

// взятия белой пешкой
/**
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_pawn_white = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    if (Math.floor(from / 16) == 1) {// белая пешка на на предпоследней позиции(7-ая линия из 8). можно смотреть взятие с превращением
        // смотрим и если есть добавляем взятия пешкой с превращением
        generated_captures_moves_pawn_promo(piece_name, from, (from - 17), (from - 15),
            piece_color, chess_board_0x88, packing_moves);
    } else {
        // простое взятие пешкой
        generated_moves_pawn_captures(piece_name, from, (from - 17), (from - 15),
            piece_color, chess_board_0x88, packing_moves);
    }
}

// взятия черной пешкой
/**
* @param {number} piece_name
* @param {number} piece_color
* @param {number} from
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_pawn_black = function (piece_name, piece_color, from, chess_board_0x88, packing_moves) {
    if (Math.floor(from / 16) == 6) {// черная пешка на на предпоследней позиции(2-ая линия из 8). можно смотреть взятие с превращением
        generated_captures_moves_pawn_promo(piece_name, from, (from + 15), (from + 17), piece_color,
            chess_board_0x88, packing_moves);
    } else {
        generated_moves_pawn_captures(piece_name, from, (from + 15), (from + 17), piece_color, chess_board_0x88, packing_moves);
    }

}

// простые взятия пешкой как белой так и черной
/**
* @param {number} piece_name
* @param {number} from
* @param {number} to_left
* @param {number} to_right
* @param {number} piece_color 
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_moves_pawn_captures = function (piece_name, from, to_left, to_right, piece_color, chess_board_0x88, packing_moves) {
    let piece_color_captures;
    let piece_captures;
    let type_move;

    if ((to_left & 136) == 0) {// взятия налево если мы на доске
        piece_captures = chess_board_0x88[to_left];
        piece_color_captures = (chess_board_0x88[to_left] > W_KING) ? BLACK : WHITE;
        if ((piece_captures != 0) && (piece_color != piece_color_captures)) {// 
            type_move = return_type_simple_move(piece_name, piece_captures);
            add_packing_move(packing_moves, type_move, from, to_left, piece_captures);
        } else if ((chess_board_0x88[IND_EN_PASSANT_YES] == 1) && (chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] == to_left)) {
            type_move = EP_CAPTURES;
            add_packing_move(packing_moves, type_move, from, to_left, piece_captures);
        }
    }
    if ((to_right & 136) == 0) {// 136 0x88    
        piece_captures = chess_board_0x88[to_right];
        piece_color_captures = (chess_board_0x88[to_right] > W_KING) ? BLACK : WHITE;
        if ((piece_captures != 0) && (piece_color != piece_color_captures)) {// 
            type_move = return_type_simple_move(piece_name, piece_captures);
            add_packing_move(packing_moves, type_move, from, to_right, piece_captures);
        } else if ((chess_board_0x88[IND_EN_PASSANT_YES] == 1) && (chess_board_0x88[IND_EN_PASSANT_TARGET_SQUARE] == to_right)) {
            type_move = EP_CAPTURES;
            add_packing_move(packing_moves, type_move, from, to_right, piece_captures);
        }
    }

}

// взятие пешкой с превращением
/**
* @param {number} piece_name 
* @param {number} from
* @param {number} to_left
* @param {number} to_right
* @param {number} piece_color 
* @param {Uint8Array} chess_board_0x88
* @param {Uint32Array} packing_moves
* @returns {void}
*/
const generated_captures_moves_pawn_promo = function (piece_name, from, to_left, to_right, piece_color, chess_board_0x88, packing_moves) {
    let piece_color_captures;
    let piece_captures;
    let type_move;

    // взятие пешкой влево с превращением
    if ((to_left & 136) == 0) {// 136 0x88                
        piece_captures = chess_board_0x88[to_left];
        piece_color_captures = (chess_board_0x88[to_left] > W_KING) ? BLACK : WHITE;
        if ((piece_captures != 0) && (piece_color != piece_color_captures)) {//
            // по взятой фигуре возвращаем тип хода взятия с превращением
            let out = return_type_captures_pawn_promo(piece_captures);

            type_move = out[IND_PROMO_QUEEN];// взятие с превращением в ферзь
            add_packing_move(packing_moves, type_move, from, to_left, piece_captures);
            type_move = out[IND_PROMO_ROOK];// взятие с превращением в ладью
            add_packing_move(packing_moves, type_move, from, to_left, piece_captures);
            type_move = out[IND_PROMO_BISHOP];
            add_packing_move(packing_moves, type_move, from, to_left, piece_captures);
            type_move = out[IND_PROMO_KNIGHT];
            add_packing_move(packing_moves, type_move, from, to_left, piece_captures);

        }
    }
    // взятие пешкой вправо с превращением
    if ((to_right & 136) == 0) {// 136 0x88      
        piece_captures = chess_board_0x88[to_right];
        piece_color_captures = (chess_board_0x88[to_right] > W_KING) ? BLACK : WHITE;
        if ((piece_captures != 0) && (piece_color != piece_color_captures)) {// 
            let out = return_type_captures_pawn_promo(piece_captures);

            type_move = out[IND_PROMO_QUEEN];// взятие с превращением в ферзь
            add_packing_move(packing_moves, type_move, from, to_right, piece_captures);
            type_move = out[IND_PROMO_ROOK];// взятие с превращением в ладью
            add_packing_move(packing_moves, type_move, from, to_right, piece_captures);
            type_move = out[IND_PROMO_BISHOP];
            add_packing_move(packing_moves, type_move, from, to_right, piece_captures);
            type_move = out[IND_PROMO_KNIGHT];
            add_packing_move(packing_moves, type_move, from, to_right, piece_captures);
        }
    }
}

// у нас нету хода взятия короля, поэтому пришлось специально прописывать функцию обнаружения короля на дистанции хода короля
/**
* @param {number} from
* @param {number} piece_color 
* @param {Uint8Array} chess_board_0x88
* @returns {number}
*/
const check_detected_generated_moves_king = function (from, piece_color, chess_board_0x88) {
    let to;
    let check = -1;

    for (let j = 0; j < 8; j++) {
        to = from + moves_king[j];
        if ((to & 136) == 0) {// если мы не вышли за пределы доски
            // если на клетке хода обнаружили короля проверим цвет, так как детектором и рокировки проверяем, а там свой король тусуется :)
            if ((chess_board_0x88[to] == W_KING) && (piece_color == 1)) {
                check = W_KING;
                return check;
            }
            if ((chess_board_0x88[to] == B_KING) && (piece_color == 0)) {
                check = B_KING;
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
* @param {Uint8Array} chess_board_0x88
* @returns {number}
*/
const check_detected = function (from, piece_color, chess_board_0x88) {

    let check = -1;
    let packing_moves_in = new Uint32Array(LENGTH_LIST).fill(MOVE_NO);
    let number_move;

    if (piece_color == WHITE) {

    clear_list(packing_moves_in);
    // 1 шах от короля это если подошли к королю противника вплотную
    if (check_detected_generated_moves_king(from, piece_color, chess_board_0x88) == B_KING) {
        check = B_KING;
        return check;
    }


        clear_list(packing_moves_in);
        // 2 шах от коня
        generated_captures_moves_knight(W_KNIGHT, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE];

        for (let i = 0; i < number_move; i++) {
            
            
            if (get_name_capture_piece(i, packing_moves_in) == B_KNIGHT) {
                check = B_KNIGHT;
                return check;
            }
        }

        clear_list(packing_moves_in);
        // 3 шах от слона + 1/2 шах от половины ходов ферзя как у слона
        generated_captures_moves_bishop(W_BISHOP, piece_color, from, chess_board_0x88, packing_moves_in)

        number_move = packing_moves_in[IND_NUMBER_MOVE];

        for (let i = 0; i < number_move; i++) {
            
            if (get_name_capture_piece(i, packing_moves_in) == B_BISHOP) {
                check = B_BISHOP;
                return check;
            }
            if (get_name_capture_piece(i, packing_moves_in) == B_QUEEN) {
                check = B_QUEEN;
                return check;
            }
        }

        clear_list(packing_moves_in);
        // 4 шах от ладьи + 1/2 шах от половины ходов ферзя как у ладьи
        generated_captures_moves_rook(W_ROOK, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE];

        for (let i = 0; i < number_move; i++) {
            
            if (get_name_capture_piece(i, packing_moves_in) == B_ROOK) {
                check = B_ROOK;
                return check;
            }
            if (get_name_capture_piece(i, packing_moves_in) == B_QUEEN) {
                check = B_QUEEN;
                return check;
            }
        }

        clear_list(packing_moves_in);
        // 5 шах от пешек
        generated_captures_moves_pawn(W_PAWN, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE];

        for (let i = 0; i < number_move; i++) {
            
            if (get_name_capture_piece(i, packing_moves_in) == B_PAWN) {
                check = B_PAWN;
                return check;
            }
        }
    } else {

    clear_list(packing_moves_in);
    // 1 шах от короля это если подошли к королю противника вплотную
    if (check_detected_generated_moves_king(from, piece_color, chess_board_0x88) == W_KING) {
        check = W_KING;
        return check;
    }

        clear_list(packing_moves_in);
        // 2 шах от коня
        generated_captures_moves_knight(B_KNIGHT, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE];

        for (let i = 0; i < number_move; i++) {
            
            if (get_name_capture_piece(i, packing_moves_in) == W_KNIGHT) {
                check = W_KNIGHT;
                return check;
            }
        }

        clear_list(packing_moves_in);
        // 3 шах от слона + 1/2 шах от половины ходов ферзя как у слона
        generated_captures_moves_bishop(B_BISHOP, piece_color, from, chess_board_0x88, packing_moves_in)

        number_move = packing_moves_in[IND_NUMBER_MOVE];

        for (let i = 0; i < number_move; i++) {
            
            if (get_name_capture_piece(i, packing_moves_in) == W_BISHOP) {
                check = W_BISHOP;
                return check;
            }
            if (get_name_capture_piece(i, packing_moves_in) == W_QUEEN) {
                check = W_QUEEN;
                return check;
            }
        }

        clear_list(packing_moves_in);
        // 4 шах от ладьи + 1/2 шах от половины ходов ферзя как у ладьи
        generated_captures_moves_rook(B_ROOK, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE];

        for (let i = 0; i < number_move; i++) {
            
            if (get_name_capture_piece(i, packing_moves_in) == W_ROOK) {
                check = W_ROOK;
                return check;
            }
            if (get_name_capture_piece(i, packing_moves_in) == W_QUEEN) {
                check = W_QUEEN;
                return check;
            }
        }

        clear_list(packing_moves_in);
        // 5 шах от пешек
        generated_captures_moves_pawn(B_PAWN, piece_color, from, chess_board_0x88, packing_moves_in);

        number_move = packing_moves_in[IND_NUMBER_MOVE];

        for (let i = 0; i < number_move; i++) {

            if (get_name_capture_piece(i, packing_moves_in) == W_PAWN) {
                check = W_PAWN;
                return check;
            }
        }

    }
    check = 0;// нет шаха
    return check;
}

export {
    generated_pseudo_legal_captures, check_detected,
    H1, H8, A1, A8, E1, E8, F1, F8, G1, G8, D1, D8, C1, C8
};