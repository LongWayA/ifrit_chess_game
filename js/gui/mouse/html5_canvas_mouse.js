/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name html5_canvas_mouse.js
 * @version created 19.07m.2025 
 * last modified 19.07m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

let Html5CanvasMouse_R = {

    ifritChessGame_R: 0,// при инициализации переприсваеваем.

    NAME: "Html5CanvasMouse_R",

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
            Html5CanvasMouse_R.mouseMoveIsChange = true;
            Html5CanvasMouse_R.mouseMove_x = event.offsetX;
            Html5CanvasMouse_R.mouseMove_y = event.offsetY;
            Html5CanvasMouse_R.mouseMove();
        });
        idCanvas.addEventListener('mousedown', (event) => {
            Html5CanvasMouse_R.mouseDownIsChange = true;
            Html5CanvasMouse_R.mouseDown_x = event.offsetX;
            Html5CanvasMouse_R.mouseDown_y = event.offsetY;
            Html5CanvasMouse_R.mouseDown();
        });
        idCanvas.addEventListener('mouseup', (event) => {
            Html5CanvasMouse_R.mouseUpIsChange = true;
            Html5CanvasMouse_R.mouseUp_x = event.offsetX;
            Html5CanvasMouse_R.mouseUp_y = event.offsetY;
            Html5CanvasMouse_R.mouseUp();
        });
    },

    mouseMove() {
        this.ifritChessGame_R.mouseMove(Html5CanvasMouse_R.mouseMove_x, Html5CanvasMouse_R.mouseMove_y);
    },

    mouseDown() {
        this.ifritChessGame_R.mouseDown(Html5CanvasMouse_R.mouseDown_x, Html5CanvasMouse_R.mouseDown_y);
    },

    mouseUp() {
        this.ifritChessGame_R.mouseUp(Html5CanvasMouse_R.mouseUp_x, Html5CanvasMouse_R.mouseUp_y);
    },
}
