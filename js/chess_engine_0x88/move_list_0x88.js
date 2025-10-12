/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_0x88.js
 * @version created 29.09m.2025 
 * last modified 29.09m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Move_list_0x88_С {

    static NAME = "Move_list_0x88_С";

    static NO_MOVE = 0;// нет хода

    static PAWN_CAPTURES = 1;// взятие пешкой
    static KNIGHT_CAPTURES = 2;// взятие конем
    static BISHOP_CAPTURES = 3;// взятие слоном
    static ROOK_CAPTURES = 4;// взятие ладьей
    static QUEEN_CAPTURES = 5;// взятие ферзем
    static KING_CAPTURES = 6;// взятие королем
    static EP_CAPTURES = 7;// взятие на проходе

    static PAWN_MOVE = 8;// ход пешкой
    static KNIGHT_MOVE = 9;// ход конем
    static BISHOP_MOVE = 10;// ход слоном
    static ROOK_MOVE = 11;// ход ладьей
    static QUEEN_MOVE = 12;// ход ферзем
    static KING_MOVE = 13;// простой ход королем

    static PAWN_DOUBLE_PUSH = 14;// ход пешкой на две клетки

    static KING_CASTLE = 15;// короткая рокировка
    static KING_QUEEN_CASTLE = 16;// длинная рокировка

    static KNIGHT_PROMO_CAPTURE = 17;// взятие пешкой с превращением в коня
    static BISHOP_PROMO_CAPTURE = 18;// взятие пешкой с превращением в слона
    static ROOK_PROMO_CAPTURE = 19;// взятие пешкой с превращением в ладью
    static QUEEN_PROMO_CAPTURE = 20;// взятие пешкой с превращением в ферзя

    static KNIGHT_PROMOTION = 21;// пешка превращается в коня
    static BISHOP_PROMOTION = 22;// пешка превращается в в слона
    static ROOK_PROMOTION = 23;// пешка превращается в в ладью
    static QUEEN_PROMOTION = 24;// пешка превращается в ферзя

    static LENGTH_LIST = 256;//

    static TYPE_MOVE_NAME = [
        "NO_MOVE",
        "PAWN_CAPTURES", "KNIGHT_CAPTURES", "BISHOP_CAPTURES", "ROOK_CAPTURES", "QUEEN_CAPTURES", "KING_CAPTURES", "EP_CAPTURES",
        "PAWN_MOVE", "KNIGHT_MOVE", "BISHOP_MOVE", "ROOK_MOVE", "QUEEN_MOVE", "KING_MOVE", "PAWN_DOUBLE_PUSH",
        "KING_CASTLE", "KING_QUEEN_CASTLE",
        "KNIGHT_PROMO_CAPTURE", "BISHOP_PROMO_CAPTURE", "ROOK_PROMO_CAPTURE", "QUEEN_PROMO_CAPTURE",
        "KNIGHT_PROMOTION", "BISHOP_PROMOTION", "ROOK_PROMOTION", "QUEEN_PROMOTION"
    ];

    type_move = new Array(this.LENGTH_LIST).fill(this.NO_MOVE);
    from = new Array(this.LENGTH_LIST).fill(-1);
    to = new Array(this.LENGTH_LIST).fill(-1);

    name_piece = new Array(this.LENGTH_LIST).fill(-1);
    piece_color = new Array(this.LENGTH_LIST).fill(-1);

    name_capture_piece = new Array(this.LENGTH_LIST).fill(-1);

    score_move = new Array(this.LENGTH_LIST).fill(-1);

    number_move = 0;

    constructor() {

    }

    iniM() {
        this.number_move = 0;
    }

    // 
    add_captures_move(type_move, piece, piece_color, capture_piece, from, to) {
        //console.log('Move_list_0x88_С->add_move');
        this.type_move[this.number_move] = type_move;
        this.from[this.number_move] = from;
        this.to[this.number_move] = to;

        this.name_piece[this.number_move] = piece;
        this.piece_color[this.number_move] = piece_color;

        this.name_capture_piece[this.number_move] = capture_piece;

        this.score_move[this.number_move] = 0;

        this.number_move = this.number_move + 1;
    }

    add_simple_move(type_move, piece, piece_color, from, to) {
        //console.log('Move_list_0x88_С->add_move');
        this.type_move[this.number_move] = type_move;
        this.from[this.number_move] = from;
        this.to[this.number_move] = to;

        this.name_piece[this.number_move] = piece;
        this.piece_color[this.number_move] = piece_color;

        this.name_capture_piece[this.number_move] = 0;

        this.score_move[this.number_move] = 0;

        this.number_move = this.number_move + 1;

    }

    test_print_list(chess_board_0x88_O) {
        console.log(" ");
        console.log("print list");

        for (let i = 0; i < this.number_move; i++) {
            console.log("type_move[" + i + "] = " + this.type_move[i] + " nm = " + Move_list_0x88_С.TYPE_MOVE_NAME[this.type_move[i]]);
            console.log("from[" + i + "] = " + this.from[i]);
            console.log("to[" + i + "] = " + this.to[i]);
            console.log(Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" +
                (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i])) + "-" +
                Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
                (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])));
            console.log("name_piece[" + i + "] = " + this.name_piece[i] + " np = " + Chess_board_0x88_C.PIECE_NAME[this.name_piece[i]]);
            console.log("piece_color[" + i + "] = " + this.piece_color[i]);
            console.log("name_capture_piece[" + i + "] = " + this.name_capture_piece[i] +
                " cnp = " + Chess_board_0x88_C.PIECE_NAME[this.name_capture_piece[i]]);
            console.log(" ");
        }
    }

    clear_list() {
        for (let i = 0; i < Move_list_0x88_С.LENGTH_LIST; i++) {
            this.type_move[i] = 0;
            this.from[i] = -1;
            this.to[i] = -1;
            this.name_piece[i] = -1;
            this.piece_color[i] = -1;
            this.name_capture_piece[i] = -1;
            this.score_move[i] = 0;
        }

        this.number_move = 0;
    }

   move_is_legal(from, to) {

        let ret = false;

        for (let i = 0; i < this.number_move; i++) {
            if ((this.from[i] == from) && (this.to[i] == to)) ret = true;
        }

        //console.log("Move_list_det_0x88_С-> from " + from + " to " + to);
        //console.log("Move_list_det_0x88_С-> ret " + ret);

        return ret;
    }
}