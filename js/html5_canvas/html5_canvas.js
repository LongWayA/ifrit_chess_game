/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name html5_canvas.js
 * @version created 19.07m.2025 
 * last modified 19.07m.2025
*/

/**
* НАЗНАЧЕНИЕ
*  Работаем с HTML5 Canvas
*  Canvas (англ. canvas — «холст», рус. канва́с) — элемент HTML5,
*  предназначенный для создания растрового двухмерного изображения при помощи скриптов,
*  обычно на языке JavaScript[1].
*  Из Википедии https://ru.wikipedia.org/wiki/Canvas_(HTML)
*/

class Html5Canvas_C {
    html5CanvasText_R = new Html5CanvasText_C();
    html5CanvasPrimitive_R = new Html5CanvasPrimitive_C();
    html5CanvasImage_R = new Html5CanvasImage_C();
    static NAME = "html5Canvas_C";
    // "2d" создаем объекта CanvasRenderingContext2D,
    //  представляющий двумерный контекст.   
    idCanvas = null;
    contextCanvas = null;
    widthCanvas = 0;
    heightCanvas = 0;
    // Цвет(Color)
    static WHITE = 'white';
    static BLACK = 'black';
    static RED = 'red';
    static GREEN = 'green';
    static BLUE = 'blue';
    // Шрифт
    static ITALIC_20PX_SANS_SERIF = Html5CanvasText_C.ITALIC_20PX_SANS_SERIF;
    static ITALIC_15PT_ARIAL = Html5CanvasText_C.ITALIC_15PT_ARIAL;
    static ITALIC_30PT_ARIAL = Html5CanvasText_C.ITALIC_30PT_ARIAL;
    static BOLD_30PX_SANS_SERIF = Html5CanvasText_C.BOLD_30PX_SANS_SERIF;
    //  Толщина линии
    static LINE_WIDTH_1 = 1;
    static LINE_WIDTH_2 = 2;
    static LINE_WIDTH_3 = 3;
    static LINE_WIDTH_4 = 4;
    constructor() {
    }
    iniM() {
        this.idCanvas = document.getElementById('game-canvas');
        this.contextCanvas = this.idCanvas.getContext('2d');
        this.widthCanvas = this.get_widthCanvas();
        this.heightCanvas = this.get_heightCanvas();
        this.html5CanvasText_R.iniM(this.idCanvas, this.contextCanvas);
        this.html5CanvasPrimitive_R.iniM(this.idCanvas, this.contextCanvas);
        this.html5CanvasImage_R.iniM(this.idCanvas, this.contextCanvas);
    }
    get_widthCanvas() {
        return this.idCanvas.width;
    }
    get_heightCanvas() {
        return this.idCanvas.height;
    }

    // TEXT

    // Устанавливаем два параметра fillStyle, strokeStyle
    // fillStyle – для задания цвета заливки и strokeStyle – для задания цвета обводки.
    // Задаваемые цвета WHITE: 'white', BLACK: 'black', RED: 'red', GREEN: 'green', BLUE: 'blue',
    // Пример задаем черный цвет
    // this.setColor(this.BLACK);
    setColor(color) {
        this.html5CanvasText_R.setColor(color);
    }
    setFont(font) {
        this.html5CanvasText_R.setFont(font);
    }
    // Печатаем текст на экране средствами HTML5 Canvas
    // _text - любой текст в ковычках вида "Пример текста"
    // _left - задание расположения текста, отсчитывается от левого края 
    // _top  - задание расположения текста, отсчитывается от верхнего края
    //    Задание расположения имеет особенности. Точка привязки это не левый верхний край как у картинок
    //    и это следует учитывать.
    // _font - задаем тип шрифта. Виды шрифтов ITALIC_20PX_SANS_SERIF, ITALIC_15PT_ARIAL, 
    //     ITALIC_30PT_ARIAL, BOLD_30PX_SANS_SERIF
    // _color - задем цвет текста. Задаваемые цвета WHITE, BLACK, RED, GREEN, BLUE
    // _fillYes - закрашены буквы -1 или пустые - остальные цифры
    // Пример. Печатаем былым цветом и шрифтом италик предложение "Это тестовый вывод" по координатам х 100, у 200
    // this.drawText ("Это тестовый вывод", 100, 200, this.ITALIC_20PX_SANS_SERIF,
    // this.WHITE, 1);   
    drawText(text, left, top, font, color, fillYes) {
        this.html5CanvasText_R.drawText(text, left, top, font, color, fillYes);
    }

    //PRIMITIVE

    // Очищаем заданную область экрана в виде прямоугольника
    // _left, _top - координаты левого верхнего угла прямоугольника
    // _width, _height - ширина и высота очищаемого прямоугольника   
    clearRect(left, top, width, height) {
        this.html5CanvasPrimitive_R.clearRect(left, top, width, height);
    }
    // Рисуем прямоугольник
    // _left, _top - координаты левого верхнего угла прямоугольника
    // _width, _height - ширина и высота прямоугольника
    // _lineWidth - тольщина линии прямоугольника
    // _color - цвет прямоугольника. Задаваемые цвета WHITE, BLACK, RED, GREEN, BLUE
    // _fillYes - закрашиваем ли прямоугольник   
    drawRect(left, top, width, height, lineWidth, color, fillYes) {
        this.html5CanvasPrimitive_R.drawRect(left, top, width, height, lineWidth, color, fillYes);
    }
    drawCircle(centerX, centerY, radius, sAngle, eAngle, clockwise, lineWidth, color) {
        this.html5CanvasPrimitive_R.drawCircle(centerX, centerY, radius, sAngle, eAngle, clockwise, lineWidth, color);
    }
    drawCreaturesCircle(centerX, centerY, radius, angle, lineWidth, color) {
        this.html5CanvasPrimitive_R.drawCreaturesCircle(centerX, centerY, radius, angle, lineWidth, color);
    }
    drawSmile() {
    }

    // IMAGE

    // Рисуем прямоугольную картинку
    // _image - HTMLImageElement 
    // _left, _top - координаты левого верхнего угла картинки
    // _width, _height - ширина и высота картинки
    // _mirror - следует ли отзеркалить картинку   
    drawImage(image, left, top, width, height, mirror) {
        this.html5CanvasImage_R.drawImage(image, left, top, width, height, mirror);
    }
}

