/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name mouseup.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Mouseup_С {

     chessBoard_O = new ChessBoard_C();// при инициализации переприсваеваем.
     mouseUpIsChange = false;

    x = 0;
    y = 0; 


    constructor() {

    }

    iniM(chessBoard_O) {
        this.mouseUpIsChange = false;
        this.chessBoard_O = chessBoard_O;
    }

    up() {
        //console.log('Mouseup_С->up');
    }
}