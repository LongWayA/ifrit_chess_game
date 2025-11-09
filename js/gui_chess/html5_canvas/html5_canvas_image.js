/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name html5_canvas_image.js
 * @version created 19.07m.2025 
 * last modified 19.07m.2025
*/

class Html5CanvasImage_C {
    static NAME = "Html5CanvasImage_C";
    idCanvas = null;
    contextCanvas = null;
    static DRAW_MIRROR = true;
    constructor() {
    }

    iniM(idCanvas, contextCanvas) {
        this.idCanvas = idCanvas;
        this.contextCanvas = contextCanvas;
    }

    drawImage_(image, left, top) {
        this.contextCanvas.drawImage(image, left, top);
    }

    drawImage_w_h(image, left, top, width, height) {
        this.contextCanvas.drawImage(image, left, top, width, height);
    }

    scale() {
        this.contextCanvas.scale(-1, 1);
    }

    drawImage(image, left, top, width, height, mirror) {
        /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
           The void operator is often used merely to obtain the undefined primitive value, 
           usually using void(0) (which is equivalent to void 0). 
           In these cases, the global variable undefined can be used.
           Оператор void часто используется только для получения примитивного значения undefined, 
           обычно с помощью void(0) (что эквивалентно void 0). 
           В таких случаях можно использовать глобальную переменную undefined.
        */
        if (width === void 0) {
            width = 0;
        }
        if (height === void 0) {
            height = 0;
        }
        if (mirror === void 0) {
            mirror = !Html5CanvasImage_C.DRAW_MIRROR;
        }
        if ((width == 0) || (height == 0)) {
            this.drawImage_(image, left, top);
        } else {
            if (mirror == Html5CanvasImage_C.DRAW_MIRROR) {
                left = left + width;
                left = -left;
                this.scale();
            }
            this.drawImage_w_h(image, left, top, width, height);
            if (mirror == Html5CanvasImage_C.DRAW_MIRROR) {
                this.scale();
            }
        }
    }
}
export{Html5CanvasImage_C};