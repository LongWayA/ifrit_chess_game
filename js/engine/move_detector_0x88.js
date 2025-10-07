/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_detector_0x88.js
 * @version created 07.10m.2025 
 * last modified 07.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Move_detector_0x88_С {

    static NAME = "Move_detector_0x88_С";
    // 0,   1,   2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12,  13,  14,  15,
    // 16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,
    // 32,  33,  34,  35,  36,  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,
    // 48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,
    // 64,  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,  78,  79,
    // 80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,  91,  92,  93,  94,  95,
    // 96,  97,  98,  99,  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
    // 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127


    constructor() {

    }

    iniM() {
    }

    //  не учитываем шахи и вскрытые шахи.
    detected_pseudo_legal_moves(from, chess_board_0x88_O, move_list_0x88_O, move_generator_0x88_O) {
 
        //console.log('Move_generator_0x88_С->generated_pseudo_legal_moves');
        let piece_color = -1;
        let piece = -1;
        let side_to_move = -1;

        move_list_0x88_O.clear_list();

        // если мы не вышли за пределы доски
        if ((from & 136) == 0) {// 136 0x88

            side_to_move = chess_board_0x88_O.side_to_move;
            piece_color = chess_board_0x88_O.sq_piece_color_0x88[from];
            piece = chess_board_0x88_O.sq_piece_0x88[from];

            // если фигура иммеет цвет ходящей стороны
            if (piece_color == side_to_move) {
                // смотрим фигуру на доске
                switch (piece) {
                    case 6:// KING
                        move_generator_0x88_O.generated_moves_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        move_generator_0x88_O.generated_moves_castle_king(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case 5://QUEEN
                        move_generator_0x88_O.generated_moves_queen(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case 4://ROOK
                        move_generator_0x88_O.generated_moves_rook(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case 3://BISHOP
                        move_generator_0x88_O.generated_moves_bishop(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case 2://KNIGHT
                        move_generator_0x88_O.generated_moves_knight(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;
                    case 1://PAWN
                        move_generator_0x88_O.generated_moves_pawn(from, piece, piece_color, chess_board_0x88_O, move_list_0x88_O);
                        break;

                    default://
                    // console.log("default");
                }
            }
        }//if ((from & 136) == 0) {// 136 0x88
    }

}