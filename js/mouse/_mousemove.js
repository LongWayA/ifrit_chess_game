/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name mousemove.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Mousemove_С {

    chessBoard_O = new ChessBoard_C();// при инициализации переприсваеваем.   
    mouseMoveIsChange = false;

    x = 0;
    y = 0; 


    constructor() {

    }

    iniM(chessBoard_O) {
        this.mouseMoveIsChange = false;
        this.chessBoard_O = chessBoard_O;        
    }

    move() {
        //console.log('Mousemove_С->move');
    }
}