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

let IfritChessGame_R = {

    ifritChessEngine_O: new IfritChessEngine_С(),
    html5Canvas_O: new Html5Canvas_C(),
    html5Sprites_O: new Html5Sprites_C(),
    chessBoard_8x8_O: new ChessBoard_8x8_C(),

    html5CanvasMouse_R: Html5CanvasMouse_R,
    StartFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",


    NAME: "IfritChessGame_R",

    DONT_GAME: 0,
    START_GAME: 1,
    CONTINUE_GAME: 2,
    PAUSE_GAME: 3,
    END_GAME: 4,

    gameState: 0, // состояния игры. может быть: нет игры, старт, продолжение , пауза, конец.
    step: -1,


    iniM() {
        console.log('IfritChessGame_R->iniM');
        IfritChessGame_R.gameState = IfritChessGame_R.DONT_GAME;
        IfritChessGame_R.ifritChessEngine_O.iniM();
        IfritChessGame_R.html5Canvas_O.iniM();
        IfritChessGame_R.html5Sprites_O.iniM(IfritChessGame_R.html5Canvas_O);
        IfritChessGame_R.chessBoard_8x8_O.iniM(10, 10, 50, 50);//32
        IfritChessGame_R.html5CanvasMouse_R.iniM(IfritChessGame_R.html5Canvas_O.idCanvas, IfritChessGame_R);
        IfritChessGame_R.step = 1;
    },

    drowGame() {
        console.log('IfritChessGame_R->drowGame');
        IfritChessGame_R.chessBoard_8x8_O.drow(IfritChessGame_R.html5Sprites_O);

    },

    startGame() {
        console.log('IfritChessGame_R->startMenu');
        IfritChessGame_R.drowGame();
        IfritChessGame_R.ifritChessEngine_O.chess_board_0x88_O.ini_0x88_from_8x8(IfritChessGame_R.chessBoard_8x8_O);
        IfritChessGame_R.ifritChessEngine_O.go();
    },

    updateGame() {
        console.log('IfritChessGame_R->updateGame');
        IfritChessGame_R.drowGame();

    },

    mouseMove(x, y) {

    },

    mouseDown(x, y) {

        //console.log('IfritChessGame_R->mouseDown x ' + x + " y " + y);
        IfritChessGame_R.chessBoard_8x8_O.click(1, x, y, IfritChessGame_R.step,
            IfritChessGame_R.html5Sprites_O, IfritChessGame_R.ifritChessEngine_O);
    },

    mouseUp(x, y) {
        //console.log('IfritChessGame_R->mouseUp x ' + x + " y " + y);
      //  IfritChessGame_R.chessBoard_8x8_O.click(2, x, y, IfritChessGame_R.step,
      //      IfritChessGame_R.html5Sprites_O, IfritChessGame_R.ifritChessEngine_O);
    },

};