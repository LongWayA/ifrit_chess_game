/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name mousedown.js
 * @version created 27.09m.2025 
 * last modified 27.09m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Mousedown_С {

     chessBoard_O = new ChessBoard_C();// при инициализации переприсваеваем.    
     mouseDownIsChange = false;

    x = 0;
    y = 0; 


    constructor() {

    }

    iniM(chessBoard_O) {
        this.mouseDownIsChange = false;
        this.chessBoard_O = chessBoard_O;        
    }

    down() {
        //console.log('Mousemove_С->down');


        
    }
}