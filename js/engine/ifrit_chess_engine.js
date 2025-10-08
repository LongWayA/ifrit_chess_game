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

    move_list_det_0x88_O = new Move_list_det_0x88_С();   
    move_detector_0x88_O = new Move_detector_0x88_С();   

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
        this.move_list_0x88_O.print_list(IfritChessGame_R.ifritChessEngine_O.chess_board_0x88_O);
    }
  //this.one_click_on_squares_x, this.one_click_on_squares_y, x_b_n, y_b_n
   move_is_legal(from_x, from_y, to_x, to_y) {
 
     let from = this.chess_board_0x88_O.x07_y07_to_0x88(from_x, from_y);
     let to =  this.chess_board_0x88_O.x07_y07_to_0x88(to_x, to_y);
     this.move_list_det_0x88_O.clear_list();
     this.move_detector_0x88_O.detected_pseudo_legal_moves(from, this.chess_board_0x88_O,
         this.move_list_det_0x88_O, this.move_generator_0x88_O);

    console.log("IfritChessEngine_С-> print_list---------- ");
    this.move_list_det_0x88_O.print_list(this.chess_board_0x88_O); 

    let ret = this.move_list_det_0x88_O.move_is_legal(from,to);

    //console.log("IfritChessEngine_С-> from_x " + from_x + " from_y " + from_y +" to_x " + to_x + " to_y " + to_y);
    //console.log("IfritChessEngine_С-> from " + from + " to " + to);
    //console.log("IfritChessEngine_С-> ret " + ret);

         return ret;

   }

   detected_drow(from_x, from_y, html5Sprites_O, chessBoard_8x8_O) {

     let from = this.chess_board_0x88_O.x07_y07_to_0x88(from_x, from_y);
     this.move_list_det_0x88_O.clear_list();
     this.move_detector_0x88_O.detected_pseudo_legal_moves(from, this.chess_board_0x88_O,
         this.move_list_det_0x88_O, this.move_generator_0x88_O);

       this.move_list_det_0x88_O.detected_drow(html5Sprites_O, this.chess_board_0x88_O, chessBoard_8x8_O);
   }
}