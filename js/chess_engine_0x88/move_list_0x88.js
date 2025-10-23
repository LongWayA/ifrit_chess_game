/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_0x88.js
 * @version created 22.10m.2025 
 * last modified 22.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Move_list_0x88_С {

    static NAME = "Move_list_0x88_С";

    static MOVE_NO = 0;// нет хода

    // абсолютный приоритет. пешка берет да еще превращается в фигуру
    // превращение в ферзь
    static CAPTURES_PAWN_QUEEN_PROMO_QUEEN = 1;//
    static CAPTURES_PAWN_ROOK_PROMO_QUEEN = 2;//
    static CAPTURES_PAWN_BISHOP_PROMO_QUEEN = 3;//
    static CAPTURES_PAWN_KNIGHT_PROMO_QUEEN = 4;//
    // превращение в ладью
    static CAPTURES_PAWN_QUEEN_PROMO_ROOK = 5;//
    static CAPTURES_PAWN_ROOK_PROMO_ROOK = 6;//
    static CAPTURES_PAWN_BISHOP_PROMO_ROOK = 7;//
    static CAPTURES_PAWN_KNIGHT_PROMO_ROOK = 8;//
    // превращение в слона
    static CAPTURES_PAWN_QUEEN_PROMO_BISHOP = 9;//
    static CAPTURES_PAWN_ROOK_PROMO_BISHOP = 10;//
    static CAPTURES_PAWN_BISHOP_PROMO_BISHOP = 11;//
    static CAPTURES_PAWN_KNIGHT_PROMO_BISHOP = 12;//
    // превращение в коня
    static CAPTURES_PAWN_QUEEN_PROMO_KNIGHT = 13;//
    static CAPTURES_PAWN_ROOK_PROMO_KNIGHT = 14;//
    static CAPTURES_PAWN_BISHOP_PROMO_KNIGHT = 15;//
    static CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT = 16;//

    // ходы пешки с превращением
    static MOVE_PAWN_PROMO_QUEEN = 17;//
    static MOVE_PAWN_PROMO_ROOK = 18;// 
    static MOVE_PAWN_PROMO_BISHOP = 19;//
    static MOVE_PAWN_PROMO_KNIGHT = 20;//

    // взятая фигура дороже чем та, что берет
    static CAPTURES_PAWN_QUEEN = 21;//
    static CAPTURES_PAWN_ROOK = 22;//
    static CAPTURES_PAWN_BISHOP = 23;//
    static CAPTURES_PAWN_KNIGHT = 24;//
    static CAPTURES_KNIGHT_QUEEN = 25;//
    static CAPTURES_KNIGHT_ROOK = 26;//
    static CAPTURES_BISHOP_QUEEN = 27;//
    static CAPTURES_BISHOP_ROOK = 28;//
    static CAPTURES_ROOK_QUEEN = 29;//
    // фигуры равнозначны
    static CAPTURES_KNIGHT_BISHOP = 30;//  
    static CAPTURES_KNIGHT_KNIGHT = 31;//
    static CAPTURES_BISHOP_BISHOP = 32;//
    static CAPTURES_BISHOP_KNIGHT = 33;//
    static CAPTURES_ROOK_ROOK = 34;//
    static CAPTURES_QUEEN_QUEEN = 35;//
    // взятая фигура дешевле той что берет
    static CAPTURES_ROOK_BISHOP = 36;//
    static CAPTURES_ROOK_KNIGHT = 37;//
    static CAPTURES_QUEEN_ROOK = 38;//
    static CAPTURES_QUEEN_BISHOP = 39;//
    static CAPTURES_QUEEN_KNIGHT = 40;//
    // взятия королем
    static CAPTURES_KING_QUEEN = 41;//
    static CAPTURES_KING_ROOK = 42;//
    static CAPTURES_KING_BISHOP = 43;//
    static CAPTURES_KING_KNIGHT = 44;//

    // взятия пешек
    static CAPTURES_PAWN_PAWN = 45;//
    static EP_CAPTURES = 46;// взятие на проходе
    static CAPTURES_KNIGHT_PAWN = 47;//
    static CAPTURES_BISHOP_PAWN = 48;//
    static CAPTURES_ROOK_PAWN = 49;//
    static CAPTURES_QUEEN_PAWN = 50;//
    static CAPTURES_KING_PAWN = 51;//

    /////////////////////////////////////////////////// 

    static MOVE_QUEEN = 52;// ход ферзем
    static MOVE_ROOK = 53;// ход ладьей
    static MOVE_BISHOP = 54;// ход слоном
    static MOVE_KNIGHT = 55;// ход конем
    static MOVE_KING = 56;// простой ход королем

    static MOVE_PAWN = 57;// ход пешкой
    static MOVE_DOUBLE_PAWN = 58;// ход пешкой на две клетки

    static MOVE_KING_CASTLE = 59;// короткая рокировка
    static MOVE_KING_QUEEN_CASTLE = 60;// длинная рокировка

    static LENGTH_LIST = 256;//

    static TYPE_MOVE_NAME = [
        "MOVE_NO",
        "CAPTURES_PAWN_QUEEN_PROMO_QUEEN",
        "CAPTURES_PAWN_ROOK_PROMO_QUEEN",
        "CAPTURES_PAWN_BISHOP_PROMO_QUEEN",
        "CAPTURES_PAWN_KNIGHT_PROMO_QUEEN",
        "CAPTURES_PAWN_QUEEN_PROMO_ROOK",
        "CAPTURES_PAWN_ROOK_PROMO_ROOK",
        "CAPTURES_PAWN_BISHOP_PROMO_ROOK",
        "CAPTURES_PAWN_KNIGHT_PROMO_ROOK",
        "CAPTURES_PAWN_QUEEN_PROMO_BISHOP",
        "CAPTURES_PAWN_ROOK_PROMO_BISHOP",
        "CAPTURES_PAWN_BISHOP_PROMO_BISHOP",
        "CAPTURES_PAWN_KNIGHT_PROMO_BISHOP",
        "CAPTURES_PAWN_QUEEN_PROMO_KNIGHT",
        "CAPTURES_PAWN_ROOK_PROMO_KNIGHT",
        "CAPTURES_PAWN_BISHOP_PROMO_KNIGHT",
        "CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT",
        "MOVE_PAWN_PROMO_QUEEN",
        "MOVE_PAWN_PROMO_ROOK",
        "MOVE_PAWN_PROMO_BISHOP",
        "MOVE_PAWN_PROMO_KNIGHT",
        "CAPTURES_PAWN_QUEEN",
        "CAPTURES_PAWN_ROOK",
        "CAPTURES_PAWN_BISHOP",
        "CAPTURES_PAWN_KNIGHT",
        "CAPTURES_KNIGHT_QUEEN",
        "CAPTURES_KNIGHT_ROOK",
        "CAPTURES_BISHOP_QUEEN",
        "CAPTURES_BISHOP_ROOK",
        "CAPTURES_ROOK_QUEEN",
        "CAPTURES_KNIGHT_BISHOP",
        "CAPTURES_KNIGHT_KNIGHT",
        "CAPTURES_BISHOP_BISHOP",
        "CAPTURES_BISHOP_KNIGHT",
        "CAPTURES_ROOK_ROOK",
        "CAPTURES_QUEEN_QUEEN",
        "CAPTURES_ROOK_BISHOP",
        "CAPTURES_ROOK_KNIGHT",
        "CAPTURES_QUEEN_ROOK",
        "CAPTURES_QUEEN_BISHOP",
        "CAPTURES_QUEEN_KNIGHT",
        "CAPTURES_KING_QUEEN",
        "CAPTURES_KING_ROOK",
        "CAPTURES_KING_BISHOP",
        "CAPTURES_KING_KNIGHT",
        "CAPTURES_PAWN_PAWN",
        "EP_CAPTURES",
        "CAPTURES_KNIGHT_PAWN",
        "CAPTURES_BISHOP_PAWN",
        "CAPTURES_ROOK_PAWN",
        "CAPTURES_QUEEN_PAWN",
        "CAPTURES_KING_PAWN",
        "MOVE_QUEEN",
        "MOVE_ROOK",
        "MOVE_BISHOP",
        "MOVE_KNIGHT",
        "MOVE_KING",
        "MOVE_PAWN",
        "MOVE_DOUBLE_PAWN",
        "MOVE_KING_CASTLE",
        "MOVE_KING_QUEEN_CASTLE",
    ];

    type_move = new Array(Move_list_0x88_С.LENGTH_LIST).fill(Move_list_0x88_С.MOVE_NO);
    piece_color = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);
    from = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);
    to = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);
    score_move = new Array(Move_list_0x88_С.LENGTH_LIST).fill(-1);

    number_move = 0;

    constructor() {

    }

    iniM() {
        this.number_move = 0;
    }

    // 
    add_move(type_move, piece_color, score_move, from, to) {
        //console.log('Move_list_0x88_С->add_move');
        this.type_move[this.number_move] = type_move;
        this.piece_color[this.number_move] = piece_color;
        this.from[this.number_move] = from;
        this.to[this.number_move] = to;
        this.score_move[this.number_move] = score_move;

        this.number_move = this.number_move + 1;
    }

    test_print_list(chess_board_0x88_O) {
        console.log("test_print_list ********");
        for (let i = 0; i < this.number_move; i++) {
            console.log("type_move[" + i + "] = " + this.type_move[i] + " nm = " + Move_list_0x88_С.TYPE_MOVE_NAME[this.type_move[i]]);
            console.log("piece_color[" + i + "] = " + this.piece_color[i]);
            console.log("score_move[" + i + "] = " + this.score_move[i]);

            console.log("from[" + i + "] = " + this.from[i]);
            console.log("to[" + i + "] = " + this.to[i]);

            console.log(Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.from[i])] + "" +
                (8 - chess_board_0x88_O.s_0x88_to_y07(this.from[i])) + "-" +
                Chess_board_0x88_C.LET_COOR[chess_board_0x88_O.s_0x88_to_x07(this.to[i])] + "" +
                (8 - chess_board_0x88_O.s_0x88_to_y07(this.to[i])));

            console.log("---- ");
        }
        console.log("*********** test_print_list");
    }

    clear_list() {
        for (let i = 0; i < Move_list_0x88_С.LENGTH_LIST; i++) {
            this.type_move[i] = -1;
            this.piece_color[i] = -1;
            this.score_move[i] = -1;
            this.from[i] = -1;
            this.to[i] = -1;
        }

        this.number_move = 0;
    }

    move_is_legal(from, to) {

        let ret = false;

        for (let i = 0; i < this.number_move; i++) {
            if ((this.from[i] == from) && (this.to[i] == to)){ 
                ret = true;
                return ret;
            }
        }

        //console.log("Move_list_det_0x88_С-> from " + from + " to " + to);
        //console.log("Move_list_det_0x88_С-> ret " + ret);

        return ret;
    }


    return_i_move(from, to) {

        let i_move = -1;

        for (let i = 0; i < this.number_move; i++) {
            if ((this.from[i] == from) && (this.to[i] == to)) {
                i_move = i;
                return i_move;
            }
        }

        //console.log("Move_list_det_0x88_С-> from " + from + " to " + to);
        //console.log("Move_list_det_0x88_С-> ret " + ret);

        return i_move;
    }

    sorting_list() {

        let save_type_move;
        let save_piece_color;
        let save_score_move;

        let save_from;
        let save_to;

        //console.log("Move_list_0x88_С-> SORTING -----------------------------------");
        // выводим в начало списка отсортированные взятия. так что самая слабая берущая фигура в самом начале
        for (let i = 0; i < this.number_move; i++) {
            for (let j = i + 1; j < this.number_move; j++) {// перебираем оставшийся список
                // если на позиции есть взятая фигура
                if (this.type_move[i] > this.type_move[j]) {
                    // сохраняем позицию на которую будем писать
                    save_type_move = this.type_move[i];
                    save_piece_color = this.piece_color[i];
                    save_score_move = this.score_move[i];
                    save_from = this.from[i];
                    save_to = this.to[i];

                    // пишем на позицию
                    this.type_move[i] = this.type_move[j];
                    this.piece_color[i] = this.piece_color[j];
                    this.score_move[i] = this.score_move[j];
                    this.from[i] = this.from[j];
                    this.to[i] = this.to[j];

                    // сюда пишем начальную позицию. т.о. две позиции меняются местами
                    this.type_move[j] = save_type_move;
                    this.piece_color[j] = save_piece_color;
                    this.score_move[j] = save_score_move;
                    this.from[j] = save_from;
                    this.to[j] = save_to;
                }
            }
        }

    }

    // возвращаем название хода превращения пешки со взятием по взятой фигуре
    // например CAPTURES_PAWN_QUEEN_PROMO_QUEEN -> QUEEN; CAPTURES_PAWN_ROOK_PROMO_QUEEN -> QUEEN
    return_type_captures_pawn_promo(piece_name_captures) {

        //console.log("Move_list_0x88_С->return_type_captures_pawn_promo piece_name_captures " + piece_name_captures);
        let out = {
            PROMO_QUEEN: null,
            PROMO_ROOK: null,
            PROMO_BISHOP: null,
            PROMO_KNIGHT: null
        };

        if (piece_name_captures == Chess_board_0x88_C.QUEEN) {
            out.PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_QUEEN;
            out.PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_ROOK;
            out.PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_BISHOP;
            out.PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_QUEEN_PROMO_KNIGHT;
        };

        if (piece_name_captures == Chess_board_0x88_C.ROOK) {
            out.PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_QUEEN;
            out.PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_ROOK;
            out.PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_BISHOP;
            out.PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_ROOK_PROMO_KNIGHT;
        };
        if (piece_name_captures == Chess_board_0x88_C.BISHOP) {
            out.PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_QUEEN;
            out.PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_ROOK;
            out.PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_BISHOP;
            out.PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_BISHOP_PROMO_KNIGHT;
        };
        if (piece_name_captures == Chess_board_0x88_C.KNIGHT) {
            out.PROMO_QUEEN = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_QUEEN;
            out.PROMO_ROOK = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_ROOK;
            out.PROMO_BISHOP = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_BISHOP;
            out.PROMO_KNIGHT = Move_list_0x88_С.CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT;
        };

            //console.log("Move_list_0x88_С->return_type_captures_pawn_promo out.PROMO_QUEEN " + out.PROMO_QUEEN);
        return out;
    }

    // возвращем тип хода взятия по ходящей фигуре и по взятой фигуре
    // например KING, QUEEN -> CAPTURES_KING_QUEEN
    return_type_simple_move(piece_name, piece_name_captures) {
        switch (piece_name) {
            case Chess_board_0x88_C.KING://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_KING;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_KING_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_KING_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_KING_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_KING_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_KING_PAWN;
                break;
            case Chess_board_0x88_C.QUEEN://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_QUEEN_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_QUEEN_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_QUEEN_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_QUEEN_PAWN;
                break;
            case Chess_board_0x88_C.ROOK://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_ROOK_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_ROOK_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_ROOK_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_ROOK_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_ROOK_PAWN;
                break;
            case Chess_board_0x88_C.BISHOP://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_BISHOP_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_BISHOP_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_BISHOP_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_BISHOP_PAWN;
                break;
            case Chess_board_0x88_C.KNIGHT://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_KNIGHT_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_KNIGHT_PAWN;
                break;
            case Chess_board_0x88_C.PAWN://
                if (piece_name_captures == Chess_board_0x88_C.PIECE_NO) return Move_list_0x88_С.MOVE_PAWN;
                if (piece_name_captures == Chess_board_0x88_C.QUEEN) return Move_list_0x88_С.CAPTURES_PAWN_QUEEN;
                if (piece_name_captures == Chess_board_0x88_C.ROOK) return Move_list_0x88_С.CAPTURES_PAWN_ROOK;
                if (piece_name_captures == Chess_board_0x88_C.BISHOP) return Move_list_0x88_С.CAPTURES_PAWN_BISHOP;
                if (piece_name_captures == Chess_board_0x88_C.KNIGHT) return Move_list_0x88_С.CAPTURES_PAWN_KNIGHT;
                if (piece_name_captures == Chess_board_0x88_C.PAWN) return Move_list_0x88_С.CAPTURES_PAWN_PAWN;
                break;

            default://
            // console.log("default");
        }

    }

    // возвращем имя взятой фигуры по типу хода
    // например CAPTURES_KING_QUEEN -> QUEEN   
    return_piece_name_captures_from_type_move(type_move) {

        //KING
        if (type_move == Move_list_0x88_С.MOVE_KING) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_KING_PAWN) return Chess_board_0x88_C.PAWN;

        //QUEEN
        if (type_move == Move_list_0x88_С.MOVE_QUEEN) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_QUEEN_PAWN) return Chess_board_0x88_C.PAWN;

        //ROOK
        if (type_move == Move_list_0x88_С.MOVE_ROOK) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_ROOK_PAWN) return Chess_board_0x88_C.PAWN;

        //BISHOP
        if (type_move == Move_list_0x88_С.MOVE_BISHOP) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_BISHOP_PAWN) return Chess_board_0x88_C.PAWN;

        //KNIGHT
        if (type_move == Move_list_0x88_С.MOVE_KNIGHT) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_KNIGHT_PAWN) return Chess_board_0x88_C.PAWN;

        //PAWN
        if (type_move == Move_list_0x88_С.MOVE_PAWN) return Chess_board_0x88_C.PIECE_NO;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_QUEEN) return Chess_board_0x88_C.QUEEN;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_ROOK) return Chess_board_0x88_C.ROOK;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_BISHOP) return Chess_board_0x88_C.BISHOP;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_KNIGHT) return Chess_board_0x88_C.KNIGHT;
        if (type_move == Move_list_0x88_С.CAPTURES_PAWN_PAWN) return Chess_board_0x88_C.PAWN;

    }
}