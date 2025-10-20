/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name ifrit_chess_game.js
 * @version created 26.09m.2025 
 * last modified 27.09m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
*/
// корневой объект программы. поэтому объект, а не класс
let IfritChessGame_R = {

    chessEngine_0x88_O: new ChessEngine_0x88_С(),// встроенный шахматный движок на доске 0x88
    chessBoard_8x8_O: new ChessBoard_8x8_C(),// доска 8x8 для графического отображения в браузере
    draw_O: new Draw_С(),// рисуем в браузере   
    mouse_R: Mouse_R, // это мышка работающая в граф окне

    NAME: "IfritChessGame_R",

    X_START: 15,
    Y_START: 10,

    SQUARES_WIDTH: 50,
    SQUARES_HEIGHT: 50,

    START_FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",

    one_click_on_squares: 0,
    one_click_on_squares_x: 0,
    one_click_on_squares_y: 0,



    iniM() {
        //console.log('IfritChessGame_R->iniM');       
        IfritChessGame_R.chessEngine_0x88_O.iniM();
        IfritChessGame_R.chessBoard_8x8_O.iniM(IfritChessGame_R.X_START, IfritChessGame_R.Y_START,
            IfritChessGame_R.SQUARES_WIDTH, IfritChessGame_R.SQUARES_HEIGHT);
        IfritChessGame_R.draw_O.iniM();
        IfritChessGame_R.mouse_R.iniM(IfritChessGame_R.draw_O.html5Canvas_O.idCanvas, IfritChessGame_R);
    },

    startGame() {
        //console.log('IfritChessGame_R->startGame');
        IfritChessGame_R.updateGame();
        IfritChessGame_R.drawGame();
    },

    updateGame() {
        //console.log('IfritChessGame_R->updateGame');
        IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.set_0x88_from_8x8(IfritChessGame_R.chessBoard_8x8_O);
        // комп за белых        
        //IfritChessGame_R.chessEngine_0x88_O.go();
        //IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(IfritChessGame_R.chessEngine_0x88_O.search_0x88_O.chess_board_0x88_O_move);
        //IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.set_0x88_from_8x8(IfritChessGame_R.chessBoard_8x8_O);
    },

    drawGame() {
        //console.log('IfritChessGame_R->drawGame');
        IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O);
    },


    mouseMove(x, y) {

    },

    mouseDown(x, y) {

        IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.set_0x88_from_8x8(IfritChessGame_R.chessBoard_8x8_O);

        //console.log('IfritChessGame_R->mouseDown x ' + x + " y " + y);
        let undo_0x88_O = new Undo_0x88_C();

        let x_b_n = -1; // номер клетки по х
        let y_b_n = -1; // номер клетки по у

        x_b_n = Math.floor((x - IfritChessGame_R.chessBoard_8x8_O.x_start) / IfritChessGame_R.chessBoard_8x8_O.squares_width);
        y_b_n = Math.floor((y - IfritChessGame_R.chessBoard_8x8_O.y_start) / IfritChessGame_R.chessBoard_8x8_O.squares_height);

        //console.log("ChessBoard_8x8_C->click(mouseDown) x " + x + " y " + y);
        //console.log("ChessBoard_8x8_C->click(mouseDown) x_b_n " + x_b_n + " y_b_n " + y_b_n);

        if (IfritChessGame_R.one_click_on_squares == 1) {// это уже второй клик
            if ((x_b_n < 8) && (y_b_n < 8)) {// 
                IfritChessGame_R.one_click_on_squares = 0;
                // если это второй клик по той же самой клетке то выделение снимаем
                if ((IfritChessGame_R.one_click_on_squares_x == x_b_n) &&
                    (IfritChessGame_R.one_click_on_squares_y == y_b_n)) {

                    // рисуем доску
                    IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O);

                } else if (IfritChessGame_R.chessEngine_0x88_O.move_is_legal(IfritChessGame_R.one_click_on_squares_x,
                    IfritChessGame_R.one_click_on_squares_y, x_b_n, y_b_n)) { // это второй клик по другой клетке значит делаем ход

                    let from = IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.x07_y07_to_0x88(IfritChessGame_R.one_click_on_squares_x,
                        IfritChessGame_R.one_click_on_squares_y);
                    let to = IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.x07_y07_to_0x88(x_b_n, y_b_n);

                    IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O.clear_list();

                    IfritChessGame_R.chessEngine_0x88_O.move_generator_0x88_O.generated_pseudo_legal_moves_one_piece_for_gui(from,
                        IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O, IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O,
                        IfritChessGame_R.chessEngine_0x88_O.move_generator_0x88_O);

                    let move_i = IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O.return_i_move(from, to);

                    IfritChessGame_R.chessEngine_0x88_O.search_0x88_O.make_move_0x88_O.do_moves(move_i,
                        IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O,
                        IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O, undo_0x88_O);
                    //режим без ответа компа   
                    //IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);

                    IfritChessGame_R.chessEngine_0x88_O.go();
                    console.log("ChessBoard_8x8_C->click(mouseDown) +++++++++++++++++++++++++++++++++++++++++++++++++++++");
                    //режим без ответа компа                    
                    ///IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.test_print_0x88();
                    ///IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.test_print_0x88_color();
                    ///////////////////
                    // с ответом компа                   
                    IfritChessGame_R.chessEngine_0x88_O.search_0x88_O.chess_board_0x88_O_move.test_print_0x88();
                    IfritChessGame_R.chessEngine_0x88_O.search_0x88_O.chess_board_0x88_O_move.test_print_0x88_color();

                    IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(IfritChessGame_R.chessEngine_0x88_O.search_0x88_O.chess_board_0x88_O_move);

                    // рисуем доску                    
                    IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O);

                    //console.log("ChessBoard_8x8_C->рисуем квадратик кликнутой клетки хода ");                         
                    // рисуем квадратик кликнутой клетки хода
                    IfritChessGame_R.draw_O.draw_rect(IfritChessGame_R.chessBoard_8x8_O, x_b_n, y_b_n, Html5Canvas_C.GREEN);

                } else {
                    // рисуем доску                     
                    IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O);
                }
            }
        } else { // это первый клик
            if ((x_b_n < 8) && (y_b_n < 8) && (IfritChessGame_R.chessBoard_8x8_O.sq_piece_color_8x8[y_b_n][x_b_n] ==
                IfritChessGame_R.chessBoard_8x8_O.side_to_move)
                && (IfritChessGame_R.chessBoard_8x8_O.sq_piece_8x8[y_b_n][x_b_n] != 0)) {//  
                // запоминаем координаты клетки и то что сделали клик
                IfritChessGame_R.one_click_on_squares = 1;
                IfritChessGame_R.one_click_on_squares_x = x_b_n;
                IfritChessGame_R.one_click_on_squares_y = y_b_n;

                // считаем возможные ходы фигуры и рисуем квадратики ходов
                IfritChessGame_R.chessEngine_0x88_O.draw_rect_move(x_b_n, y_b_n, IfritChessGame_R.chessBoard_8x8_O, IfritChessGame_R.draw_O);

                // рисуем квадратик кликнутой клетки
                IfritChessGame_R.draw_O.draw_rect(IfritChessGame_R.chessBoard_8x8_O, x_b_n, y_b_n, Html5Canvas_C.GREEN);
            }
        }

    },

    mouseUp(x, y) {
        //console.log('IfritChessGame_R->mouseUp x ' + x + " y " + y);
    },

};