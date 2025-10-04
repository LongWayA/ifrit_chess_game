/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name html5_canvas_text.js
 * @version created 19.07m.2025 
 * last modified 19.07m.2025
*/

class Html5CanvasText_C {
    static NAME = "html5CanvasText_R";
    idCanvas = null;
    contextCanvas = null;
    //Цвет   
    static WHITE = 'white';
    static BLACK = 'black';
    static RED = 'red';
    static GREEN = 'green';
    static BLUE = 'blue';
    //Шрифт   
    static ITALIC_20PX_SANS_SERIF = 'italic 20px sans-serif';
    static ITALIC_15PT_ARIAL = 'italic 15pt Arial';
    static ITALIC_30PT_ARIAL = 'italic 30pt Arial';
    static BOLD_30PX_SANS_SERIF = 'bold 30px sans-serif';
    //Толщина линии    
    static LINE_WIDTH_1 = 1;
    static LINE_WIDTH_2 = 2;
    static LINE_WIDTH_3 = 3;
    static LINE_WIDTH_4 = 4;
    load = 0;
    constructor() {
    }

    iniM(idCanvas, contextCanvas) {
        this.idCanvas = idCanvas;
        this.contextCanvas = contextCanvas;
        this.set_fillStyle('#0000ff');
        this.set_strokeStyle('#0000ff');
        this.set_lineWidth(Html5CanvasText_C.LINE_WIDTH_1);
        this.set_font(Html5CanvasText_C.ITALIC_15PT_ARIAL);
    }

    set_fillStyle(_color) {
        this.contextCanvas.fillStyle = _color;
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

    set_font(_font) {
        this.contextCanvas.font = _font;
    }

    get_font() {
        return this.contextCanvas.font;
    }

    set_textBaseline(_textBaseline) {
        this.contextCanvas.textBaseline = _textBaseline;
    }

    fillText(_text, _left, _top) {
        this.contextCanvas.fillText(_text, _left, _top);
    }

    strokeText(_text, _left, _top) {
        this.contextCanvas.strokeText(_text, _left, _top);
    }

    setColor(color) {
        let style = '#ffffff';
        switch (color) {
            case Html5CanvasText_C.WHITE:
                style = '#ffffff';
                break;
            case Html5CanvasText_C.BLACK:
                style = '#000000';
                break;
            case Html5CanvasText_C.RED:
                style = '#ff0000';
                break;
            case Html5CanvasText_C.GREEN:
                style = '#008000';
                break;
            case Html5CanvasText_C.BLUE:
                style = '#0000ff';
                break;
        }
        this.set_fillStyle(style);
        this.set_strokeStyle(style);
    }

    setFont(font) {
        this.set_textBaseline('top');
        switch (font) {
            case Html5CanvasText_C.ITALIC_20PX_SANS_SERIF:
                this.set_font(font);
                break;
            case Html5CanvasText_C.ITALIC_30PT_ARIAL:
                this.set_font(font);
                break;
            case Html5CanvasText_C.BOLD_30PX_SANS_SERIF:
                this.set_font(font);
                break;
        }
    }
    
    // возможно установить:
    // HTML5_Canvas_text_2.ITALIC_20PX_SANS_SERIF, HTML5_Canvas_text_2.ITALIC_30PT_ARIAL, HTML5_Canvas_text_2.BOLD_30PX_SANS_SERIF
    //HTML5_Canvas_text_2.WHITE, HTML5_Canvas_text_2.BLACK, HTML5_Canvas_text_2.RED, HTML5_Canvas_text_2.GREEN, HTML5_Canvas_text_2.BLUE
    // HTML5_Canvas_text_2.Text.drawText("text", 10, 5, HTML5_Canvas_text_2.ITALIC_30PT_ARIAL, HTML5_Canvas_text_2.GREEN, 1);   
    drawText(text, left, top, font, color, fillYes) {
        let style_r = this.get_fillStyle();
        let font_r = this.get_font();
        this.setColor(color);
        this.setFont(font);
        if (fillYes == 1) {
            this.fillText(text, left, top);
        }
        else {
            this.strokeText(text, left, top);
        }
        this.set_fillStyle(style_r);
        this.set_strokeStyle(style_r);
        this.set_font(font_r);
    }
}
