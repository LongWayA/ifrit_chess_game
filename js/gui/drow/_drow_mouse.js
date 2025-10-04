/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name drow_mouse.js
 * @version created 20.07m.2025 
 * last modified 20.07m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

class DrowMouse_C {
    html5Canvas_R = null;
    html5CanvasMouse_R = null;

    static NAME = "DrowMouse_C";
    constructor() {
    }
    iniM(html5Canvas, html5CanvasMouse) {
        this.html5Canvas_R = html5Canvas;
        this.html5CanvasMouse_R = html5CanvasMouse;
    }
    drow() {
        let X0 = 550;
        let Y0 = +510;
        let left = X0;
        let top = Y0 - 2;
        let width = 350;
        let height = 22;
        this.printText('mousemove', this.html5CanvasMouse_R.get_mouseMoveCoordinate().X, this.html5CanvasMouse_R.get_mouseMoveCoordinate().Y, left, top, width, height, X0, Y0);
        let X0_2 = X0;
        let Y0_2 = Y0 + 25;
        let left_2 = X0_2;
        let top_2 = Y0_2 - 2;
        let width_2 = 350;
        let height_2 = 22;
        this.printText('mousedown', this.html5CanvasMouse_R.get_mouseDownCoordinate().X, this.html5CanvasMouse_R.get_mouseDownCoordinate().Y, left_2, top_2, width_2, height_2, X0_2, Y0_2);
        let X0_3 = X0;
        let Y0_3 = Y0_2 + 25;
        let left_3 = X0_3;
        let top_3 = Y0_3 - 2;
        let width_3 = 350;
        let height_3 = 22;
        this.printText('mouseup', this.html5CanvasMouse_R.get_mouseUpCoordinate().X, this.html5CanvasMouse_R.get_mouseUpCoordinate().Y, left_3, top_3, width_3, height_3, X0_3, Y0_3);
    }
    printText(textEvent, offsetX, offsetY, left, top, width, height, X0, Y0) {
        this.html5Canvas_R.clearRect(left, top, width, height);
        this.html5Canvas_R.drawRect(left, top, width, height, 1, 'red', 0);
        this.html5Canvas_R.drawText(textEvent + ": x = "
            + offsetX + " y = " + offsetY, X0, Y0, 'italic 20px sans-serif', 'red', 1);
    }
}
