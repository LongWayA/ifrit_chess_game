/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name html5_sprites_chess_pieces.js
 * @version created 19.07m.2025 
 * last modified 26.09m.2025
*/

import { Square_С } from "./html5_square_c.js";
import { PathesBrowser_R } from "../../browser/pathes_browser.js";

/**
* НАЗНАЧЕНИЕ

*/


class Html5SpritesChessPieces_C {

    static NAME = "Html5SpritesChessPieces_C";

    static PATH_TO_IMAGES = PathesBrowser_R.html5_sprites_chess_pieces_js_pathToImages;

    // здесь выбираем цвет клетки доски: 1 - белый цвет, 0- черный цвет
    chess_pieces = new Array(2);

    constructor() {

        // здесь выбираем цвет фигуры: 1 - белый цвет, 0- черный цвет
        this.chess_pieces[0] = new Array(2);
        this.chess_pieces[1] = new Array(2);
    }

    iniM() {
 
         //инициализируем массивы с картинками 

         //белые фигуры 
         let cs = 1;// color square цвет поля белый
         let cp = 1;// color piece  цвет фигур белый  

         cs = 1;// цвет поля белый
         cp = 1;// цвет фигур белый 
         this.iniSprite(cs, cp);
         cs = 1;// цвет поля белый
         cp = 0;// цвет фигур черный 
         this.iniSprite(cs, cp);
         cs = 0;// цвет поля черный
         cp = 1;// цвет фигур белый 
         this.iniSprite(cs, cp);
         cs = 0;// цвет поля черный
         cp = 0;// цвет фигур черный 
         this.iniSprite(cs, cp);                
    }

    iniSprite(cs, cp) {
        let cs_s = "n";// color square цвет поля белый
        let cp_s = "n";// color piece  цвет фигур белый 

        if (cs == 1 ) cs_s = "w";
        if (cs == 0 ) cs_s = "b"; 

        if (cp == 1 ) cp_s = "w";
        if (cp == 0 ) cp_s = "b"; 


       this.chess_pieces[cs][cp] = new Array(7);
       let path = Html5SpritesChessPieces_C.PATH_TO_IMAGES + "/chess_pieces/";

         // https://developer.mozilla.org/ru/docs/Web/API/HTMLImageElement :
         // "The Image() constructor, taking two optional unsigned long, 
         // the width and the height of the resource, creates an instance 
         // of HTMLImageElement not inserted in a DOM tree."
         
         // загружаем фигуры
         for (let i = 0; i < 7; i++) {
            this.chess_pieces[cs][cp][i] = new Square_С();
            this.chess_pieces[cs][cp][i].Image = document.createElement('img');
            this.chess_pieces[cs][cp][i].PathToImage = path + cs_s + cp_s + i + ".gif";
            this.chess_pieces[cs][cp][i].Image.src = this.chess_pieces[cs][cp][i].PathToImage;
            this.chess_pieces[cs][cp][i].NameImage = "Image str (картинка №) = " + i;
        }
    }



    getSprite(cs, cp, index) {
        return this.chess_pieces[cs][cp][index].Image;
    }
    getSpriteString(cs, cp, index) {
        return this.chess_pieces[cs][cp][index].NameImage;
    }
    getHeightSprite(cs, cp, index) {
        return this.chess_pieces[cs][cp][index].Image.height;
    }
    getWidthSprite(cs, cp, index) {
        return this.chess_pieces[cs][cp][index].Image.width;
    }
    getLeftSprite(cs, cp, index, middle) {
        let width = this.chess_pieces[cs][cp][index].Image.width;
        let left = middle - width / 2;
        return left;
    }

    //инициализируем массивы с картинками   
    iniSpriteString() {
       //GROUNDS
        // массив по номерам тайлов  имена тайлов для слоя земли        
        this.chess_pieces[0].NameImage = "nothing(пустая область)";

 
    }
}

export{Html5SpritesChessPieces_C};

