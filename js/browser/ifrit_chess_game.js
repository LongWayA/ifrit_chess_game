/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name ifrit_chess_game.js
 * @version created 26.09m.2025 
 * last modified 27.09m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
*/
// корневой объект программы. поэтому объект, а не класс
let IfritChessGame_R = {
   
    chessEngine_0x88_O: new ChessEngine_0x88_С(),// встроенный шахматный движок на доске 0x88
    chessBoard_8x8_O: new ChessBoard_8x8_C(),// доска 8x8 для графического отображения в браузере
    draw_O: new Draw_С(),// рисуем в браузере   
    mouse_R: Mouse_R, // это мышка работающая в граф окне

    NAME: "IfritChessGame_R",

    StartFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",   

    iniM() {
        //console.log('IfritChessGame_R->iniM');       
        IfritChessGame_R.chessEngine_0x88_O.iniM();
        IfritChessGame_R.chessBoard_8x8_O.iniM(10, 10, 50, 50);//32
        IfritChessGame_R.draw_O.iniM();        
        IfritChessGame_R.mouse_R.iniM(IfritChessGame_R.draw_O.html5Canvas_O.idCanvas, IfritChessGame_R);
    },

    startGame() {
        //console.log('IfritChessGame_R->startGame');
        IfritChessGame_R.drowGame();
        IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.ini_0x88_from_8x8(IfritChessGame_R.chessBoard_8x8_O);
        IfritChessGame_R.chessEngine_0x88_O.go();
    },

    updateGame() {
        //console.log('IfritChessGame_R->updateGame');
        IfritChessGame_R.drowGame();

    },

    drowGame() {
        //console.log('IfritChessGame_R->drowGame');
        IfritChessGame_R.draw_O.drow_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O);
    },


    mouseMove(x, y) {

    },

    mouseDown(x, y) {

        //console.log('IfritChessGame_R->mouseDown x ' + x + " y " + y);
        IfritChessGame_R.chessBoard_8x8_O.clickDown( x, y, IfritChessGame_R.draw_O, IfritChessGame_R.chessEngine_0x88_O);
            
    },

    mouseUp(x, y) {
        //console.log('IfritChessGame_R->mouseUp x ' + x + " y " + y);
      //  IfritChessGame_R.chessBoard_8x8_O.click(2, x, y,
      //      IfritChessGame_R.draw_O.html5Sprites_O, IfritChessGame_R.chessEngine_0x88_O);
    },

};