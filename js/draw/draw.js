/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name draw.js
 * @version created 11.10m.2025 
 * last modified 11.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

class Draw_С {

    html5Canvas_O = new Html5Canvas_C();// методы 2д рисования в браузере
    html5Sprites_O = new Html5Sprites_C();// рисуем спрайты, в том числе доску. 

    static NAME = "Draw_С";


    constructor() {

    }

    iniM() {
        this.html5Canvas_O.iniM();
        this.html5Sprites_O.iniM(this.html5Canvas_O);
    }

    draw_chess_board_8x8(chessBoard_8x8_O) {

        //this.html5Canvas_O.clearRect(0, 0, 50 * 7, 50 * 7);
        this.html5Canvas_O.clearRect(0, 0, 800, 600);        

        let xx;
        let yy;
        let sp;
        let cs;
        let cp;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                xx = chessBoard_8x8_O.x_start + chessBoard_8x8_O.squares_width * x;
                yy = chessBoard_8x8_O.y_start + chessBoard_8x8_O.squares_height * y;
                sp = chessBoard_8x8_O.sq_piece_8x8[y][x];
                cp = chessBoard_8x8_O.sq_piece_color_8x8[y][x];
                cs = chessBoard_8x8_O.squares_color_8x8[y][x];

                this.html5Sprites_O.drawSprite(cs, cp, sp, xx, yy, chessBoard_8x8_O.squares_width, chessBoard_8x8_O.squares_height);
                //this.html5Sprites_O.html5Canvas_R.drawText(y, xx, yy, Html5Canvas_C.ITALIC_20PX_SANS_SERIF,
                //  Html5Canvas_C.WHITE, 1);

                this.html5Sprites_O.html5Canvas_R.drawText((8 - y), (chessBoard_8x8_O.x_start - 15), (yy + 15), Html5Canvas_C.ITALIC_20PX_SANS_SERIF,
                    Html5Canvas_C.BLACK, 1);
            }
        }
        let abc = "   a       b       c        d       e       f       g        h";
        this.html5Sprites_O.html5Canvas_R.drawText(abc, chessBoard_8x8_O.x_start,
            (chessBoard_8x8_O.y_start + chessBoard_8x8_O.squares_height * 8), Html5Canvas_C.ITALIC_20PX_SANS_SERIF,
            Html5Canvas_C.BLACK, 1);

    }

    draw_rect(chessBoard_8x8_O, x_b_n, y_b_n, color) {

        //console.log("Draw_С->draw_rect");
        let left;
        let top;
        let lineWidth = 2;
        let fillYes = 0;
        let width = chessBoard_8x8_O.squares_width;
        let height = chessBoard_8x8_O.squares_height;

        left = x_b_n * width + chessBoard_8x8_O.x_start;
        top = y_b_n * height + chessBoard_8x8_O.y_start;
        //console.log("draw_rect->color = " + color);
        this.html5Sprites_O.html5Canvas_R.drawRect(left, top, width, height, lineWidth, color, fillYes);
    }

    //color = Html5Canvas_C.BLUE;//
    draw_rect_move(move_list_0x88_O, chess_board_0x88_O, chessBoard_8x8_O, color) {

        let left;
        let top;
        let width = chessBoard_8x8_O.squares_width;
        let height = chessBoard_8x8_O.squares_height;
        let lineWidth = 2;
        let fillYes = 0;

        let x_b_n = -1; // номер клетки по х
        let y_b_n = -1; // номер клетки по у

        for (let i = 0; i < move_list_0x88_O.number_move; i++) {

            x_b_n = chess_board_0x88_O.s_0x88_to_x07(move_list_0x88_O.to[i]);
            y_b_n = chess_board_0x88_O.s_0x88_to_y07(move_list_0x88_O.to[i]);

            // рисуем квадратик клетки хода
            left = x_b_n * chessBoard_8x8_O.squares_width + chessBoard_8x8_O.x_start;
            top = y_b_n * chessBoard_8x8_O.squares_height + chessBoard_8x8_O.y_start;
            //console.log("color = " + color);
            this.html5Sprites_O.html5Canvas_R.drawRect(left, top, width, height, lineWidth, color, fillYes);
        }


    }

}