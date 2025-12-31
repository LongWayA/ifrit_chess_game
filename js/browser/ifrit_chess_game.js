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

// browser
import { Mouse_R } from "./mouse.js";
import { checkbox_R } from "./checkbox.js";

// gui_chess
import { Gui_chess_C } from "../gui_chess/i_gui_chess.js";

// engine_chess_0x88
import { ChessEngine_0x88_С } from "../chess_engine_0x88/i_chess_engine_0x88.js";

// web
import { get_text_requests } from "../web/counter.js";

//---
import { Html5Canvas_C } from "../gui_chess/html5_canvas/html5_canvas.js";



// корневой объект программы. поэтому объект, а не класс
let IfritChessGame_R = {

    chessEngine_0x88_O: new ChessEngine_0x88_С(),// встроенный шахматный движок на доске 0x88
    gui_chess_O: new Gui_chess_C(),//
    mouse_O: Mouse_R, // это мышка работающая в граф окне    
    checkbox_O: checkbox_R,


    NAME: "IfritChessGame_R",

    POSITION_FEN: "",

    fen_position: "no",

    // тестовые позиции с сайта:
    // https://www.chessprogramming.org/Perft_Results
    INITIAL_POSITION_FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    // ok d1 20, d2 400, d3 8.902, d4 197.281, d5 4.865.609 t17sec, d6 119.060.324 t7min10sec
    // глубже(7 и больше) проверять слишком долго
    // ~277kNs/sec
    POSITION_FEN_2: "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -",
    // ok d1 48, d2 2.039, d3 97.862, d4 4.085.603, d5 193.690.690
    // глубже(6 и больше) проверять слишком долго
    POSITION_FEN_3: "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1",
    // ok d1 14, d2 191, d3 2.812, d4 43.238, d5 674.624, d6 11.030.083, d7 178.633.661
    // глубже(8 и больше) проверять слишком долго
    POSITION_FEN_4: "r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1",
    // ok d1 6, d2 264, d3 9.467, d4 422.333, d5 15.833.292
    // глубже(6 и больше) проверять слишком долго
    POSITION_FEN_5: "rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8",
    // ok d1 44, d2 1.486, d3 62.379, d4 2.103.487, d5 89.941.194
    //   
    POSITION_FEN_6: "r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10",
    // ok d1 46, d2 2.079, d3 89.890, d4 3.894.594 d5


    // настраивал движок
    POSITION_FEN_PROMO: "n1b1r1q1/1P1P1P1P/8/8/1k1K4/8/1p1p1p1p/B1N1R1Q1 w - - 0 1",
    POSITION_FEN_CHEK: "3B4/8/3N4/8/3K1k2/R7/8/3Q4 b - - 0 1",
    POSITION_FEN_CASTLE_1: "r3k2r/8/p6p/8/8/P6P/8/R3K2R w KQkq - 0 1",
    POSITION_FEN_CASTLE_2: "r3k2r/8/p6p/8/3BB3/P6P/8/R3K2R w KQkq - 0 1",
    POSITION_FEN_CASTLE_3: "r3k2r/8/p6p/8/3bb3/P6P/8/R3K2R b KQkq - 0 1",
    POSITION_FEN_MAT: "7Q/8/8/1R6/R7/4k3/8/8 b - - 0 1",

    iniM() {

        console.log('IfritChessGame_R->iniM get_text_requests.value ' + get_text_requests.value);

        IfritChessGame_R.gui_chess_O.iniM(IfritChessGame_R);

        IfritChessGame_R.POSITION_FEN = IfritChessGame_R.INITIAL_POSITION_FEN;

        //IfritChessGame_R.gui_chess_O.mode_game = Gui_chess_C.MINMAX;// полный перебор        
        IfritChessGame_R.gui_chess_O.mode_game = Gui_chess_C.ID;// циклическое погружение со всеми эвристиками      

        // задаем глубину перебора во время игры
        IfritChessGame_R.gui_chess_O.depth_max = 6;
        IfritChessGame_R.checkbox_O.set_input_max_depth_value(IfritChessGame_R.gui_chess_O.depth_max);

        //console.log('IfritChessGame_R->iniM');       
        IfritChessGame_R.chessEngine_0x88_O.iniM(IfritChessGame_R);
        IfritChessGame_R.mouse_O.iniM(IfritChessGame_R.gui_chess_O.draw_O.html5Canvas_O.idCanvas, IfritChessGame_R);
        IfritChessGame_R.checkbox_O.iniM(IfritChessGame_R);

    },

    // запускаем при старте игры в штмл
    startGame() {
        //console.log('IfritChessGame_R->startGame');
        IfritChessGame_R.updateGame();
        IfritChessGame_R.drawGame();

    },

    updateGame() {
        //console.log('IfritChessGame_R->updateGame');
        // проверяем правильность полного перебора. что все правила соблюдены.
        IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(IfritChessGame_R.POSITION_FEN);

        IfritChessGame_R.gui_chess_O.game_line_0x88_O.add_position(IfritChessGame_R.POSITION_FEN, "move0");
    },

    drawGame() {
        //console.log('IfritChessGame_R->drawGame');
        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.is_white);

        IfritChessGame_R.checkbox_O.set_text_chess_game(" Game: ");
    },

    mouseMove(x, y) {

    },

    mouseDown(x, y) {

        // клики по доске игнорируются, пока Ифрит не сходит
        if (IfritChessGame_R.gui_chess_O.click_is_stop == Gui_chess_C.CLICK_NOT_STOP) {

            console.log('IfritChessGame_R->mouseDown click_is_stop ' + IfritChessGame_R.gui_chess_O.click_is_stop);

            IfritChessGame_R.mouseDown_2(x, y);
        }
    },

    mouseDown_2(x, y) {
        //console.log("ChessBoard_8x8_C->click(mouseDown) START ========================= START ");
        //console.log('IfritChessGame_R->mouseDown2 x ' + x + " y " + y);

        // переводим координаты мышки xy в номер клетки по xy (this.click_on_squares_x)
        IfritChessGame_R.gui_chess_O.xy_to_squares_xy(x, y);

        // если играем за черных то разворачиваем доску. клики зеркалятся по х и у.
        IfritChessGame_R.gui_chess_O.squares_xy_mirror();

        // первый клик по доске
        if (IfritChessGame_R.gui_chess_O.click_state == Gui_chess_C.CLICK_NO) {

            console.log('IfritChessGame_R->mouseDown2 click_on_squares_x ' + IfritChessGame_R.gui_chess_O.click_on_squares_x +
                " click_on_squares_y " + IfritChessGame_R.gui_chess_O.click_on_squares_y);

            // попали по доске
            if (IfritChessGame_R.gui_chess_O.is_click_to_board()) {//

                // фигура цвета ходящей стороны и фигура есть 
                if (IfritChessGame_R.gui_chess_O.is_click_to_our_piece(IfritChessGame_R.gui_chess_O.click_on_squares_x,
                    IfritChessGame_R.gui_chess_O.click_on_squares_y)) {//                     
                    //console.log("ChessBoard_8x8_C->click(mouseDown) попали по клетке и есть фигура нужного цвета");

                    // пишем, что один раз кликнули
                    IfritChessGame_R.gui_chess_O.click_state = Gui_chess_C.CLICK_ONE;

                    // запоминаем координаты клетки по которой сделали клик
                    IfritChessGame_R.gui_chess_O.squares_xy_save();

                    // обрабатываем первый клик
                    //
                    //
                    IfritChessGame_R.click_first();

                    console.log('IfritChessGame_R->mouseDown2 x ' + x + " y " + y);
                }
            }
        } // второй клик по доске
        else if (IfritChessGame_R.gui_chess_O.click_state == Gui_chess_C.CLICK_ONE) {
            // попали по доске
            if (IfritChessGame_R.gui_chess_O.is_click_to_board()) {//

                IfritChessGame_R.gui_chess_O.click_state = Gui_chess_C.CLICK_NO;

                // если это второй клик по той же самой клетке то выделение снимаем                
                if (IfritChessGame_R.gui_chess_O.is_click_to_square_again(IfritChessGame_R.gui_chess_O.click_save_on_squares_x,
                    IfritChessGame_R.gui_chess_O.click_save_on_squares_y, IfritChessGame_R.gui_chess_O.click_on_squares_x,
                    IfritChessGame_R.gui_chess_O.click_on_squares_y)) {

                    // скидываем метку клика. сейчас как будто еще не кликали
                    IfritChessGame_R.gui_chess_O.click_state = Gui_chess_C.CLICK_NO;
                    IfritChessGame_R.click_cancel();
                } else {
                    // скидываем метку клика. сейчас как будто еще не кликали
                    //IfritChessGame_R.gui_chess_O.click_state = Gui_chess_C.CLICK_NO;
                    IfritChessGame_R.click_second();
                }
            }

        }
    },

    // отменяем клик
    click_cancel() {
        // рисуем доску
        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.is_white);
    },

    // первый клик
    click_first() {

        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.is_white);

        // считаем возможные ходы фигуры и рисуем квадратики ходов                   
        IfritChessGame_R.gui_chess_O.guiLegalMove_0x88_O.draw_rect_move(IfritChessGame_R.gui_chess_O.click_on_squares_x,
            IfritChessGame_R.gui_chess_O.click_on_squares_y, IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.draw_O, IfritChessGame_R.gui_chess_O.is_white);

        // обратно зеркалим что бы рисовать квадратики на старом месте
        IfritChessGame_R.gui_chess_O.squares_xy_mirror();

        // console.log("y_b_n " + y_b_n);                        
        // рисуем квадратик кликнутой клетки
        IfritChessGame_R.gui_chess_O.draw_O.draw_rect(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.click_on_squares_x,
            IfritChessGame_R.gui_chess_O.click_on_squares_y, Html5Canvas_C.GREEN,);

        IfritChessGame_R.checkbox_O.set_text_engine(" После Вашего хода Ифрит будет думать.");

        IfritChessGame_R.gui_chess_O.click_state = Gui_chess_C.CLICK_ONE;
    },

    // второй клик
    click_second() {

        // можно делать ход
        if (IfritChessGame_R.gui_chess_O.is_legal_move()) {
            IfritChessGame_R.make_move();
        }
        else { //нельзя делать ход
            IfritChessGame_R.checkbox_O.set_text_engine(" Недопустимый ход.");
            IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
                IfritChessGame_R.gui_chess_O.is_white);
        }
    },

    // тут особенность. нам надо сделать ход на доске.
    make_move() {

        // мы уже сделали ход на вспомогательной доске движка. и до этого проверили его на легальность 
        // теперь пишем фен
        let fen = IfritChessGame_R.gui_chess_O.guiLegalMove_0x88_O.chess_board_0x88_O_gui.set_fen_from_0x88();

        IfritChessGame_R.gui_chess_O.game_line_0x88_O.add_position(fen, "move0");

        // обновляем доску оболочки по раннее записанному фену
        IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(fen);

        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.is_white);

        IfritChessGame_R.checkbox_O.set_text_engine(" Ифрит думает.");

        let side_to_move = IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.side_to_move;

        // тут ход уже сделан на доске движка chess_board_0x88_O и мы считаем ответ
        if (IfritChessGame_R.gui_chess_O.mode_game == Gui_chess_C.MINMAX) {// test minmax запуск полного перебора 
            console.log("IfritChessGame_R -> MINMAX");

            IfritChessGame_R.gui_chess_O.click_is_stop = Gui_chess_C.CLICK_YES_STOP;

            IfritChessGame_R.gui_chess_O.GuiStartWorker_O.test_message(fen, IfritChessGame_R.gui_chess_O.depth_max, side_to_move,
                1, Gui_chess_C.MINMAX);


        } else if (IfritChessGame_R.gui_chess_O.mode_game == Gui_chess_C.ID) {  // iterative deepening
            console.log("IfritChessGame_R -> ID");

            IfritChessGame_R.gui_chess_O.click_is_stop = Gui_chess_C.CLICK_YES_STOP;

            IfritChessGame_R.gui_chess_O.GuiStartWorker_O.test_message(fen, IfritChessGame_R.gui_chess_O.depth_max, side_to_move,
                1, Gui_chess_C.ID);

        }

    },

    mouseUp(x, y) {
        //console.log('IfritChessGame_R->mouseUp x ' + x + " y " + y);
    },

    startGameButton() {

        IfritChessGame_R.gui_chess_O.game_line_0x88_O.iniM();

        // инициализируем доску из фена
        IfritChessGame_R.POSITION_FEN = IfritChessGame_R.INITIAL_POSITION_FEN;
        IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(IfritChessGame_R.POSITION_FEN);

        IfritChessGame_R.gui_chess_O.game_line_0x88_O.add_position(IfritChessGame_R.POSITION_FEN, "move0");


        // выводим фен в окошко
        IfritChessGame_R.checkbox_O.set_input_set_fen(IfritChessGame_R.POSITION_FEN);

        // счетчик выведенных парных ходов в 0
        IfritChessGame_R.gui_chess_O.nomber_move = 0;

        // если играем за черных то понятно, что белые должны сделать ход.
        if (IfritChessGame_R.gui_chess_O.is_white == Gui_chess_C.BLACK) {
            // message_gui_to_engine    

            let side_to_move = IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.side_to_move;

            // тут ход уже сделан на доске движка chess_board_0x88_O и мы считаем ответ
            if (IfritChessGame_R.gui_chess_O.mode_game == Gui_chess_C.MINMAX) {// test minmax запуск полного перебора 
                console.log("IfritChessGame_R -> MINMAX");
                IfritChessGame_R.gui_chess_O.GuiStartWorker_O.test_message(IfritChessGame_R.POSITION_FEN,
                    IfritChessGame_R.gui_chess_O.depth_max, side_to_move, 1, Gui_chess_C.MINMAX);

            } else if (IfritChessGame_R.gui_chess_O.mode_game == Gui_chess_C.ID) {  // iterative deepening
                console.log("IfritChessGame_R -> ID");
                IfritChessGame_R.gui_chess_O.GuiStartWorker_O.test_message(IfritChessGame_R.POSITION_FEN,
                    IfritChessGame_R.gui_chess_O.depth_max, side_to_move, 1, Gui_chess_C.ID);

            }
        }

        IfritChessGame_R.checkbox_O.set_text_engine("\n Новая игра");
        IfritChessGame_R.checkbox_O.set_text_chess_game("Новая игра");
        IfritChessGame_R.checkbox_O.add_text_chess_game("\n Game: ");

        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.is_white);

    },

    goGameButton() {

        let fen = IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.set_fen_from_8x8();

        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.is_white);

        IfritChessGame_R.checkbox_O.set_text_engine(" Ифрит думает.");

        let side_to_move = IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.side_to_move;

        // тут ход уже сделан на доске движка chess_board_0x88_O и мы считаем ответ
        if (IfritChessGame_R.gui_chess_O.mode_game == Gui_chess_C.MINMAX) {// test minmax запуск полного перебора 
            console.log("IfritChessGame_R -> MINMAX");

            IfritChessGame_R.gui_chess_O.click_is_stop = Gui_chess_C.CLICK_YES_STOP;

            IfritChessGame_R.gui_chess_O.GuiStartWorker_O.test_message(fen, IfritChessGame_R.gui_chess_O.depth_max, side_to_move,
                0, Gui_chess_C.MINMAX);


        } else if (IfritChessGame_R.gui_chess_O.mode_game == Gui_chess_C.ID) {  // iterative deepening
            console.log("IfritChessGame_R -> ID");

            IfritChessGame_R.gui_chess_O.click_is_stop = Gui_chess_C.CLICK_YES_STOP;

            IfritChessGame_R.gui_chess_O.GuiStartWorker_O.test_message(fen, IfritChessGame_R.gui_chess_O.depth_max, side_to_move,
                0, Gui_chess_C.ID);

        }
    },

    fenGameButton() {

        IfritChessGame_R.gui_chess_O.game_line_0x88_O.iniM();

        IfritChessGame_R.POSITION_FEN = IfritChessGame_R.checkbox_O.get_input_set_fen();
        IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(IfritChessGame_R.POSITION_FEN);

        IfritChessGame_R.gui_chess_O.game_line_0x88_O.add_position(IfritChessGame_R.POSITION_FEN, "move0");

        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O, IfritChessGame_R.gui_chess_O.is_white);

        IfritChessGame_R.checkbox_O.set_text_engine(
            " max depth " + IfritChessGame_R.gui_chess_O.depth_max +
            " nodes " + IfritChessGame_R.gui_chess_O.nodes + " score " + IfritChessGame_R.gui_chess_O.score);

        IfritChessGame_R.checkbox_O.set_text_engine("\n Позиция задана из fen. Сами следите за его корректностью. Новая игра");

    },

    left() {
        IfritChessGame_R.gui_chess_O.game_line_0x88_O.left();
        let fen = IfritChessGame_R.gui_chess_O.game_line_0x88_O.get_position();
        IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(fen);
        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.is_white);

        IfritChessGame_R.checkbox_O.set_text_chess_game(IfritChessGame_R.gui_chess_O.game_line_0x88_O.get_pv_line_str());

        IfritChessGame_R.gui_chess_O.nomber_move = IfritChessGame_R.gui_chess_O.game_line_0x88_O.get_nomber_move();
    },

    right() {
        IfritChessGame_R.gui_chess_O.game_line_0x88_O.rigt();
        let fen = IfritChessGame_R.gui_chess_O.game_line_0x88_O.get_position();
        IfritChessGame_R.gui_chess_O.chessBoard_8x8_O.set_8x8_from_fen(fen);
        IfritChessGame_R.gui_chess_O.draw_O.draw_chess_board_8x8(IfritChessGame_R.gui_chess_O.chessBoard_8x8_O,
            IfritChessGame_R.gui_chess_O.is_white);

        IfritChessGame_R.checkbox_O.set_text_chess_game(IfritChessGame_R.gui_chess_O.game_line_0x88_O.get_pv_line_str()); 
        
        IfritChessGame_R.gui_chess_O.nomber_move = IfritChessGame_R.gui_chess_O.game_line_0x88_O.get_nomber_move();        
    },

};

export { IfritChessGame_R };

/*
const table = new Uint32Array(1024);
table.fill(0); // Очень быстрая очистка на уровне памяти

// Представление всех белых пешек
const whitePawns = new Uint32Array(2); 
// whitePawns[0] — нижние 32 клетки, whitePawns[1] — верхние 32 клетки

Для принудительного приведения числа к 32-битному целому (Int32) используйте операцию x | 0

.set([


*/