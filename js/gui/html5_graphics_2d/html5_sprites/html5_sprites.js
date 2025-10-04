/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name html5_sprites.js
 * @version created 19.07m.2025 
 * last modified 27.09m.2025
*/

/**
* НАЗНАЧЕНИЕ
*/

class Html5Sprites_C {
    html5Canvas_R = null;
    html5SpritesChessPieces_R = new Html5SpritesChessPieces_C();
    static NAME = "html5Sprites_R";

    constructor() {
    }

    iniM(html5Canvas_R) {
        this.html5Canvas_R = html5Canvas_R;
        this.html5SpritesChessPieces_R.iniM();
    }

    drowSprite(color_square, color_piece, index, imageLeft, imageTop, imageWidth = 0, imageHeight = 0) {
        let image = this.html5SpritesChessPieces_R.getSprite(color_square, color_piece, index);
        this.html5Canvas_R.drawImage(image, imageLeft, imageTop, imageWidth, imageHeight, false);
    }
}