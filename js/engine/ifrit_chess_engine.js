/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name ifrit_chess_engine.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class IfritChessEngine_С {

    static NAME = "IfritChessEngine_С";
    chess_board_0x88_O = new Chess_board_0x88_C();
    move_list_0x88_O = new Move_list_0x88_С();
    move_generator_0x88_O = new Move_generator_0x88_С();

    static StartFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";


    constructor() {

    }

    iniM() {
        this.chess_board_0x88_O.iniM();
        this.move_list_0x88_O.iniM();
        this.move_generator_0x88_O.iniM();
    }


    go() {
        this.chess_board_0x88_O.drow0x88();
        this.chess_board_0x88_O.drow0x88_color();       
        this.move_generator_0x88_O.generated_pseudo_legal_moves( this.chess_board_0x88_O, this.move_list_0x88_O);
        //this.move_list_0x88_O.print_list(IfritChessGame_R.ifritChessEngine_O.chess_board_0x88_O);
    }
}