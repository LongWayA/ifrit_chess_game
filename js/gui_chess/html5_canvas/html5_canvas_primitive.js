/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name html5_canvas_primitive.js
 * @version created 19.07m.2025 
 * last modified 19.07m.2025
*/

class Html5CanvasPrimitive_C {
    static NAME = "html5CanvasPrimitive_R";
    idCanvas = null;
    contextCanvas = null;
    // Цвет   
    static WHITE = 'white';
    static BLACK = 'black';
    static RED = 'red';
    static GREEN = 'green';
    static BLUE = 'blue';
    //Толщина линии   
    static LINE_WIDTH_1 = 1;
    static LINE_WIDTH_2 = 2;
    static LINE_WIDTH_3 = 3;
    static LINE_WIDTH_4 = 4;
    
    constructor() {
    }

    iniM(idCanvas, contextCanvas) {
        this.idCanvas = idCanvas;
        this.contextCanvas = contextCanvas;
    }

    set_fillStyle(color) {
        this.contextCanvas.fillStyle = color;
    }

    get_fillStyle() {
        return this.contextCanvas.fillStyle;
    }

    set_strokeStyle(_color) {
        this.contextCanvas.strokeStyle = _color;
    }

    set_lineWidth(_lineWidth) {
        this.contextCanvas.lineWidth = _lineWidth;
    }

    get_lineWidth() {
        return this.contextCanvas.lineWidth;
    }

    clearRect_(left, top, width, height) {
        this.contextCanvas.clearRect(left, top, width, height);
    }

    fillRect(left, top, width, height) {
        this.contextCanvas.fillRect(left, top, width, height);
    }

    strokeRect(left, top, width, height) {
        this.contextCanvas.strokeRect(left, top, width, height);
    }

    circle(centerX, centerY, radius, startAngle, endAngle, clockwise) {
        this.contextCanvas.beginPath();
        this.contextCanvas.arc(centerX, centerY, radius, startAngle, endAngle, clockwise);
        this.contextCanvas.closePath();
        this.contextCanvas.stroke();
    }

    drawCreaturesCircle_(centerX, centerY, radius, angle) {
        let p = 2;
        let x = radius * Math.cos(angle) - 0 * Math.sin(angle);
        let y = radius * Math.sin(angle) + 0 * Math.cos(angle);
        x = x + centerX;
        y = y + centerY;
        this.contextCanvas.strokeRect(centerX, centerY, p, p);
        this.contextCanvas.strokeRect(x, y, p, p);
        this.contextCanvas.beginPath();
        this.contextCanvas.moveTo(x, y);
        this.contextCanvas.lineTo(centerX, centerY);
        this.contextCanvas.closePath();
        this.contextCanvas.stroke();
        this.contextCanvas.beginPath();
        this.contextCanvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
        this.contextCanvas.closePath();
        this.contextCanvas.stroke();
    }

    drawSmile() {
        this.contextCanvas.beginPath();
        this.contextCanvas.fill();
        this.contextCanvas.fillStyle = "yellow";
        this.contextCanvas.beginPath();
        this.contextCanvas.arc(160, 130, 100, 0, 2 * Math.PI);
        this.contextCanvas.fill();
        this.contextCanvas.beginPath();
        this.contextCanvas.moveTo(100, 160);
        this.contextCanvas.quadraticCurveTo(160, 250, 220, 160);
        this.contextCanvas.closePath();
        this.contextCanvas.fillStyle = "red";
        this.contextCanvas.fill();
        this.contextCanvas.lineWidth = 2;
        this.contextCanvas.strokeStyle = "black";
        this.contextCanvas.stroke();
        this.contextCanvas.fillStyle = "#FFFFFF";
        this.contextCanvas.fillRect(140, 160, 15, 15);
        this.contextCanvas.fillRect(170, 160, 15, 15);
        this.contextCanvas.beginPath();
        this.contextCanvas.arc(130, 90, 20, 0, 2 * Math.PI);
        this.contextCanvas.fillStyle = "#333333";
        this.contextCanvas.fill();
        this.contextCanvas.closePath();
        this.contextCanvas.beginPath();
        this.contextCanvas.arc(190, 90, 20, 0, 2 * Math.PI);
        this.contextCanvas.fillStyle = "#333333";
        this.contextCanvas.fill();
        this.contextCanvas.closePath();
    }

    setColor(color) {
        let style = '#ffffff';
        switch (color) {
            case Html5CanvasPrimitive_C.WHITE:
                style = '#ffffff';
                break;
            case Html5CanvasPrimitive_C.BLACK:
                style = '#000000';
                break;
            case Html5CanvasPrimitive_C.RED:
                style = '#ff0000';
                break;
            case Html5CanvasPrimitive_C.GREEN:
                style = '#008000';
                break;
            case Html5CanvasPrimitive_C.BLUE:
                style = '#0000ff';
                break;
        }
        this.set_fillStyle(style);
        this.set_strokeStyle(style);
    }

    clearRect(left, top, width, height) {
        this.clearRect_(left, top, width, height);
    }

    drawRect(left, top, width, height, lineWidth, color, fillYes) {
        let style_r = this.get_fillStyle();
        let lineWidth_r = this.get_lineWidth();
        this.set_lineWidth(lineWidth);
        this.setColor(color);
        if (fillYes == 1) {
            this.fillRect(left, top, width, height);
        }
        else {
            this.strokeRect(left, top, width, height);
        }
        this.set_fillStyle(style_r);
        this.set_strokeStyle(style_r);
        this.set_lineWidth(lineWidth_r);
    }

    drawCircle(centerX, centerY, radius, sAngle, eAngle, clockwise, lineWidth, color) {
        let style_r = this.get_fillStyle();
        let lineWidth_r = this.get_lineWidth();
        this.set_lineWidth(lineWidth);
        this.setColor(color);
        this.circle(centerX, centerY, radius, sAngle, eAngle, clockwise);
        this.set_fillStyle(style_r);
        this.set_strokeStyle(style_r);
        this.set_lineWidth(lineWidth_r);
    }
    
    drawCreaturesCircle(centerX, centerY, radius, angle, lineWidth, color) {
        let style_r = this.get_fillStyle();
        let lineWidth_r = this.get_lineWidth();
        this.set_lineWidth(lineWidth);
        this.setColor(color);
        this.drawCreaturesCircle_(centerX, centerY, radius, angle);
        this.set_fillStyle(style_r);
        this.set_strokeStyle(style_r);
        this.set_lineWidth(lineWidth_r);
    }
}

export{Html5CanvasPrimitive_C};
