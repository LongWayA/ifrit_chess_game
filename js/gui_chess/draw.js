// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name draw.js
 * @version created 11.10m.2025 
*/

/**
* НАЗНАЧЕНИЕ

*/

import { Html5Canvas_C } from "./html5_canvas/html5_canvas.js";
import { Html5Sprites_C } from "./html5_sprites/html5_sprites.js";

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
} from "../chess_engine_0x88/move_generator_0x88/move_list_0x88.js";

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
} from "../chess_engine_0x88/move_generator_0x88/chess_board_0x88.js";


/**
 * Класс.
 * @class
 */
class Draw_С {

    html5Canvas_O = new Html5Canvas_C();// методы 2д рисования в браузере
    html5Sprites_O = new Html5Sprites_C();// рисуем спрайты, в том числе доску. 

    static NAME = "Draw_С";


    constructor() {

    }

    iniM() {
        this.html5Canvas_O.iniM();
        this.html5Sprites_O.iniM(this.html5Canvas_O);
    }
    /**
     * @param {any} chessBoard_8x8_O
     * @param {number} is_white
     * @returns {void}
     */
    draw_chess_board_8x8(chessBoard_8x8_O, is_white) {

        //this.html5Canvas_O.clearRect(0, 0, 50 * 7, 50 * 7);
        this.html5Canvas_O.clearRect(0, 0, 800, 600);

        let xx;
        let yy;
        let sp;
        let cs;
        let cp;
        let abc;

        if (is_white == 1) {
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    xx = chessBoard_8x8_O.x_start + chessBoard_8x8_O.squares_width * x;
                    yy = chessBoard_8x8_O.y_start + chessBoard_8x8_O.squares_height * y;
                    sp = chessBoard_8x8_O.sq_piece_8x8[y][x];
                    cp = chessBoard_8x8_O.sq_piece_color_8x8[y][x];
                    cs = chessBoard_8x8_O.squares_color_8x8[y][x];

                    this.html5Sprites_O.drawSprite(cs, cp, sp, xx, yy, chessBoard_8x8_O.squares_width, chessBoard_8x8_O.squares_height);
                    //this.html5Sprites_O.html5Canvas_R.drawText(y, xx, yy, Html5Canvas_C.ITALIC_20PX_SANS_SERIF,
                    //  Html5Canvas_C.WHITE, 1);

                    // @ts-ignore
                    this.html5Sprites_O.html5Canvas_R.drawText((8 - y), (chessBoard_8x8_O.x_start - 15), (yy + 15), Html5Canvas_C.ITALIC_20PX_SANS_SERIF,
                        Html5Canvas_C.BLACK, 1);
                }
            }
            abc = "   a       b       c        d       e       f       g        h";
        } else {
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    xx = chessBoard_8x8_O.x_start + chessBoard_8x8_O.squares_width * x;
                    yy = chessBoard_8x8_O.y_start + chessBoard_8x8_O.squares_height * y;
                    sp = chessBoard_8x8_O.sq_piece_8x8[7 - y][7 - x];
                    cp = chessBoard_8x8_O.sq_piece_color_8x8[7 - y][7 - x];
                    cs = chessBoard_8x8_O.squares_color_8x8[y][x];

                    this.html5Sprites_O.drawSprite(cs, cp, sp, xx, yy, chessBoard_8x8_O.squares_width, chessBoard_8x8_O.squares_height);
                    //this.html5Sprites_O.html5Canvas_R.drawText(y, xx, yy, Html5Canvas_C.ITALIC_20PX_SANS_SERIF,
                    //  Html5Canvas_C.WHITE, 1);

                    // @ts-ignore
                    this.html5Sprites_O.html5Canvas_R.drawText((y + 1), (chessBoard_8x8_O.x_start - 15), (yy + 15), Html5Canvas_C.ITALIC_20PX_SANS_SERIF,
                        Html5Canvas_C.BLACK, 1);
                }
            }
            abc = "   h       g       f        e       d       c       b        a";
        }

        // @ts-ignore
        this.html5Sprites_O.html5Canvas_R.drawText(abc, chessBoard_8x8_O.x_start,
            (chessBoard_8x8_O.y_start + chessBoard_8x8_O.squares_height * 8), Html5Canvas_C.ITALIC_20PX_SANS_SERIF,
            Html5Canvas_C.BLACK, 1);

    }
    /**
     * @param {any} chessBoard_8x8_O
     * @param {number} x_b_n
     * @param {number} y_b_n
     * @param {number} color
     * @returns {void}
     */
    draw_rect(chessBoard_8x8_O, x_b_n, y_b_n, color) {

        //console.log("Draw_С->draw_rect");
        let left;
        let top;
        let lineWidth = 2;
        let fillYes = 0;
        let width = chessBoard_8x8_O.squares_width;
        let height = chessBoard_8x8_O.squares_height;

        left = x_b_n * width + chessBoard_8x8_O.x_start;
        top = y_b_n * height + chessBoard_8x8_O.y_start;
        //console.log("draw_rect->color = " + color);

        // @ts-ignore
        this.html5Sprites_O.html5Canvas_R.drawRect(left, top, width, height, lineWidth, color, fillYes);
    }

    //color = Html5Canvas_C.BLUE;//
    /**
 * @param {Int32Array} packing_moves
 * @param {any} chessBoard_8x8_O
 * @param {string} color
 * @param {number} is_white
 * @returns {void}
 */
    draw_rect_move(packing_moves, chessBoard_8x8_O, color, is_white) {

        let left;
        let top;
        let width = chessBoard_8x8_O.squares_width;
        let height = chessBoard_8x8_O.squares_height;
        let lineWidth = 2;
        let fillYes = 0;

        let x_b_n = -1; // номер клетки по х
        let y_b_n = -1; // номер клетки по у

        let to;


        for (let i = 0; i < packing_moves[IND_NUMBER_MOVE_ML]; i++) {

            to = get_to_ml(i, packing_moves);

            x_b_n = s_0x88_to_x07_cb(to);
            y_b_n = s_0x88_to_y07_cb(to);
            if (is_white == 0) y_b_n = 7 - y_b_n;
            if (is_white == 0) x_b_n = 7 - x_b_n;
            //console.log("is_white = " + is_white);
            // рисуем квадратик клетки хода
            left = x_b_n * chessBoard_8x8_O.squares_width + chessBoard_8x8_O.x_start;
            top = y_b_n * chessBoard_8x8_O.squares_height + chessBoard_8x8_O.y_start;
            //console.log("color = " + color);

            // @ts-ignore
            this.html5Sprites_O.html5Canvas_R.drawRect(left, top, width, height, lineWidth, color, fillYes);
        }


    }

}

export { Draw_С };