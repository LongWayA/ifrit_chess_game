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
  clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
  sorting_list_ml, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
  return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
  type_move_to_name_piese, type_move_to_name_piese_f, return_promo_piece_from_type_move, set_move_after_the_captures_ml,
  sorting_list_history_heuristic_ml,
  LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_CAPTURES_MOVE, IND_NUMBER_MOVE,
  IND_PROMO_QUEEN, IND_PROMO_ROOK, IND_PROMO_BISHOP, IND_PROMO_KNIGHT,
  MOVE_NO, CAPTURES_PAWN_QUEEN_PROMO_QUEEN, CAPTURES_PAWN_ROOK_PROMO_QUEEN, CAPTURES_PAWN_BISHOP_PROMO_QUEEN,
  CAPTURES_PAWN_KNIGHT_PROMO_QUEEN, CAPTURES_PAWN_QUEEN_PROMO_ROOK, CAPTURES_PAWN_ROOK_PROMO_ROOK,
  CAPTURES_PAWN_BISHOP_PROMO_ROOK, CAPTURES_PAWN_KNIGHT_PROMO_ROOK, CAPTURES_PAWN_QUEEN_PROMO_BISHOP,
  CAPTURES_PAWN_ROOK_PROMO_BISHOP, CAPTURES_PAWN_BISHOP_PROMO_BISHOP, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP,
  CAPTURES_PAWN_QUEEN_PROMO_KNIGHT, CAPTURES_PAWN_ROOK_PROMO_KNIGHT, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT,
  CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT, MOVE_PAWN_PROMO_QUEEN, MOVE_PAWN_PROMO_ROOK, MOVE_PAWN_PROMO_BISHOP,
  MOVE_PAWN_PROMO_KNIGHT, CAPTURES_PAWN_QUEEN, CAPTURES_PAWN_ROOK, CAPTURES_PAWN_BISHOP, CAPTURES_PAWN_KNIGHT,
  CAPTURES_KNIGHT_QUEEN, CAPTURES_KNIGHT_ROOK, CAPTURES_BISHOP_QUEEN, CAPTURES_BISHOP_ROOK, CAPTURES_ROOK_QUEEN,
  CAPTURES_KNIGHT_BISHOP, CAPTURES_KNIGHT_KNIGHT, CAPTURES_BISHOP_BISHOP, CAPTURES_BISHOP_KNIGHT, CAPTURES_ROOK_ROOK,
  CAPTURES_QUEEN_QUEEN, CAPTURES_ROOK_BISHOP, CAPTURES_ROOK_KNIGHT, CAPTURES_QUEEN_ROOK, CAPTURES_QUEEN_BISHOP,
  CAPTURES_QUEEN_KNIGHT, CAPTURES_KING_QUEEN, CAPTURES_KING_ROOK, CAPTURES_KING_BISHOP, CAPTURES_KING_KNIGHT,
  CAPTURES_PAWN_PAWN, EP_CAPTURES, CAPTURES_KNIGHT_PAWN, CAPTURES_BISHOP_PAWN, CAPTURES_ROOK_PAWN,
  CAPTURES_QUEEN_PAWN, CAPTURES_KING_PAWN, MOVE_QUEEN, MOVE_ROOK, MOVE_BISHOP, MOVE_KNIGHT, MOVE_KING, MOVE_PAWN,
  MOVE_DOUBLE_PAWN, MOVE_KING_CASTLE, MOVE_KING_QUEEN_CASTLE, TYPE_MOVE_NAME
} from "../chess_engine_0x88/move_generator/move_list_new.js";

import {
  x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
  save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite, letter_to_x_coordinate,
  IND_MAX, SIDE_TO_MOVE, LET_COOR,
  BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK,
  SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
} from "../chess_engine_0x88/move_generator/chess_board_new.js";


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
 * @param {Uint32Array} packing_moves
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


        for (let i = 0; i < packing_moves[IND_NUMBER_MOVE]; i++) {

            to = get_to(i, packing_moves);

            x_b_n = s_0x88_to_x07(to);
            y_b_n = s_0x88_to_y07(to);
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