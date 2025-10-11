/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name mouse.js
 * @version created 19.07m.2025 
 * last modified 19.07m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

let Mouse_R = {

    ifritChessGame_R: 0,// при инициализации переприсваеваем.

    NAME: "Mouse_R",

    mouseMoveIsChange: false,
    mouseMove_x: 0,
    mouseMove_y: 0,

    mouseDownIsChange: false,
    mouseDown_x: 0,
    mouseDown_y: 0,

    mouseUpIsChange: false,
    mouseUp_x: 0,
    mouseUp_y: 0,


    iniM(idCanvas, IfritChessGame_R) {

        this.ifritChessGame_R = IfritChessGame_R;


        idCanvas.addEventListener('mousemove', (event) => {
            Mouse_R.mouseMoveIsChange = true;
            Mouse_R.mouseMove_x = event.offsetX;
            Mouse_R.mouseMove_y = event.offsetY;
            Mouse_R.mouseMove();
        });
        idCanvas.addEventListener('mousedown', (event) => {
            Mouse_R.mouseDownIsChange = true;
            Mouse_R.mouseDown_x = event.offsetX;
            Mouse_R.mouseDown_y = event.offsetY;
            Mouse_R.mouseDown();
        });
        idCanvas.addEventListener('mouseup', (event) => {
            Mouse_R.mouseUpIsChange = true;
            Mouse_R.mouseUp_x = event.offsetX;
            Mouse_R.mouseUp_y = event.offsetY;
            Mouse_R.mouseUp();
        });
    },

    mouseMove() {
        this.ifritChessGame_R.mouseMove(Mouse_R.mouseMove_x, Mouse_R.mouseMove_y);
    },

    mouseDown() {
        this.ifritChessGame_R.mouseDown(Mouse_R.mouseDown_x, Mouse_R.mouseDown_y);
    },

    mouseUp() {
        this.ifritChessGame_R.mouseUp(Mouse_R.mouseUp_x, Mouse_R.mouseUp_y);
    },
}
