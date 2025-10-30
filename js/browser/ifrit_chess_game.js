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

const checkbox_is_black_game = document.getElementById('is_black_game');
const input_max_depth = document.getElementById('max_depth');
const input_set_fen = document.getElementById('set_fen');

const text_chess_game = document.getElementById('text_chess_game');
const text_engine = document.getElementById('text_engine');


// корневой объект программы. поэтому объект, а не класс
let IfritChessGame_R = {

    chessEngine_0x88_O: new ChessEngine_0x88_С(),// встроенный шахматный движок на доске 0x88
    chessBoard_8x8_O: new ChessBoard_8x8_C(),// доска 8x8 для графического отображения в браузере
    draw_O: new Draw_С(),// рисуем в браузере   
    mouse_R: Mouse_R, // это мышка работающая в граф окне

    NAME: "IfritChessGame_R",

    X_START: 15,
    Y_START: 5,

    SQUARES_WIDTH: 50,
    SQUARES_HEIGHT: 50,

    TEST_POSITION_FEN: "",

    depth_max: -1,

    one_click_on_squares: 0,
    one_click_on_squares_x: 0,
    one_click_on_squares_y: 0,

    stop_click: 0,
    stop_click_2: 0,

    fen_position: "no",

    nodes: 0,
    score: 0,
    pv_line_str: " no",
    is_white: 1,
    nomber_move: 0,

    test: 1,
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
        // test = 1 просто генерация ходов и просмотр в консоле
        // test = 2 запуск полного перебора minmax     
        // test = 3 alpha beta 
        // test = 4 alpha beta fail hard         
        // test = 5 iterative deepening with PVS
        // test = 6 message_to_engine(message) работа с воркером
        IfritChessGame_R.test = 6;//3

        // задаем глубину перебора во время игры или обсчета тестовых позиций на количество узлов
        IfritChessGame_R.depth_max = 4;
        input_max_depth.value = IfritChessGame_R.depth_max;

        IfritChessGame_R.TEST_POSITION_FEN = IfritChessGame_R.INITIAL_POSITION_FEN;
        //IfritChessGame_R.TEST_POSITION_FEN = IfritChessGame_R.POSITION_FEN_6;//

        //IfritChessGame_R.TEST_POSITION_FEN = IfritChessGame_R.POSITION_FEN_MAT;//
        //IfritChessGame_R.TEST_POSITION_FEN = IfritChessGame_R.POSITION_FEN_PROMO;//
        //IfritChessGame_R.TEST_POSITION_FEN = IfritChessGame_R.POSITION_FEN_CASTLE_3;       
        // выбираем различные тестовые позиции чтобы проверить генератор ходов
        // 
        //console.log('IfritChessGame_R->iniM');       
        IfritChessGame_R.chessEngine_0x88_O.iniM();
        IfritChessGame_R.chessBoard_8x8_O.iniM(IfritChessGame_R.X_START, IfritChessGame_R.Y_START,
            IfritChessGame_R.SQUARES_WIDTH, IfritChessGame_R.SQUARES_HEIGHT);
        IfritChessGame_R.draw_O.iniM();
        IfritChessGame_R.mouse_R.iniM(IfritChessGame_R.draw_O.html5Canvas_O.idCanvas, IfritChessGame_R);
        IfritChessGame_R.stop_click = 0;
        IfritChessGame_R.stop_click_2 = 0;
        this.is_white = 1;
        this.nomber_move = 0;
    },

    startGame() {
        //console.log('IfritChessGame_R->startGame');
        IfritChessGame_R.updateGame();
        IfritChessGame_R.drawGame();
    },

    updateGame() {
        //console.log('IfritChessGame_R->updateGame');
        // проверяем правильность полного перебора. что все правила соблюдены.
        IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_fen(IfritChessGame_R.TEST_POSITION_FEN);

        IfritChessGame_R.chessEngine_0x88_O.position(IfritChessGame_R.chessBoard_8x8_O);
        if (IfritChessGame_R.test == 1) {
            // тестируем начальные позиции еще до хода        
            // режим тестовой игры движок отвечает на наш ход 

            //let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_mm(IfritChessGame_R.depth_max);
            let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_ab(IfritChessGame_R.depth_max);
            //let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_abfh(IfritChessGame_R.depth_max);            
            this.score = info_return_g.score;
            this.nodes = info_return_g.node_count;
            //console.log("ChessEngine_0x88_С->А ЧТО В ГЛАВНОМ ВАРИАНТЕ?");
            //this.pv_line_0x88_O.test_print_pv_line(this.chess_board_0x88_O);
            // копируем доску движка с найденным ходом в игровую
            //IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(info_return_g.chess_board_0x88_O_save_gui);
        }
    },

    drawGame() {
        //console.log('IfritChessGame_R->drawGame');
        IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

        if (IfritChessGame_R.test == 1) {
            text_engine.value = " max depth " + IfritChessGame_R.depth_max +
                " nodes " + this.nodes + " score " + this.score;
        }
        text_chess_game.value = " Версия js от 30 10м 25";
        text_chess_game.value += "\n Для обновления нажмите ctrl+f5 в chrome";
        text_chess_game.value += "\n Кнопка стоп не работает.";
        text_chess_game.value += "\n Записи игры пока нет.";
        text_chess_game.value += "\n Вернуть ход не получится.";
        text_chess_game.value += "\n Game: ";
    },

    mouseMove(x, y) {

    },

    // функция работы с движком запущенным в отдельном потоке.
    message_egnine_to_gui(message) {
        //console.log('TO GUI message ' + message);

        if (message.includes("position fen ")) {
            let end = message.length;
            let fen = message.slice(13, end);
            input_set_fen.value = fen;
            //console.log('g fen from engine : ' + fen);
            IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_fen(fen, IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);
        }

        if (message.includes("score ")) {
            let end = message.length;
            let score_s = message.slice(6, end);
            //console.log('Gg score ' + score_s);
            this.score = Number(score_s);
            //console.log('g score ' + this.score);            
        }

        if (message.includes("node ")) {
            let end = message.length;
            let node_s = message.slice(5, end);
            //console.log('g node ' + node_s);
            this.nodes = Number(node_s);
            //console.log('g node ' + this.nodes);           
        }

        if (message.includes("PV line: ")) {
            this.pv_line_str = message;

        }

        if (message.includes("go")) {
            //console.log('g go');
            // рисуем доску                 
            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

            let f = IfritChessGame_R.chessBoard_8x8_O.set_fen_from_8x8(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);

            text_engine.value = " max depth " + IfritChessGame_R.depth_max + " nodes " + this.nodes + " score " + this.score +
                "\n " + this.pv_line_str + "\n fen " + f;



            if (this.is_white == 1) {
                text_chess_game.value += this.pv_line_str.slice(11, 18);
            } else {
                this.nomber_move = this.nomber_move + 1;                
                text_chess_game.value += this.nomber_move + "." + this.pv_line_str.slice(11, 18);
            }

            IfritChessGame_R.stop_click = 0;
            IfritChessGame_R.stop_click_2 = 0;
        }
    },

    mouseDown(x, y) {

        // чтобы игроки не кликали пока прога считает
        if (IfritChessGame_R.stop_click == 0) {

            IfritChessGame_R.stop_click = 1;
            IfritChessGame_R.mouseDown_2(x, y);

            if (IfritChessGame_R.test != 6) {
                IfritChessGame_R.stop_click = 0;
            } else {
                if (IfritChessGame_R.stop_click_2 == 0) {
                    IfritChessGame_R.stop_click = 0;
                }
            }
        }
    },


    mouseDown_2(x, y) {
        //console.log("ChessBoard_8x8_C->click(mouseDown) START ========================= START ");
        //console.log('IfritChessGame_R->mouseDown x ' + x + " y " + y);

        let x_b_n = -1; // номер клетки по х
        let y_b_n = -1; // номер клетки по у

        x_b_n = Math.floor((x - IfritChessGame_R.chessBoard_8x8_O.x_start) / IfritChessGame_R.chessBoard_8x8_O.squares_width);
        y_b_n = Math.floor((y - IfritChessGame_R.chessBoard_8x8_O.y_start) / IfritChessGame_R.chessBoard_8x8_O.squares_height);

        // если играем за черных то разворачиваем доску. клики зеркалятся по х и у.
        if (this.is_white == 0) y_b_n = 7 - y_b_n;
        if (this.is_white == 0) x_b_n = 7 - x_b_n;

        //console.log("ChessBoard_8x8_C->click(mouseDown) x " + x + " y " + y);
        //console.log("ChessBoard_8x8_C->click(mouseDown) x_b_n " + x_b_n + " y_b_n " + y_b_n);


        if (IfritChessGame_R.one_click_on_squares == 1) {// это уже второй клик
            //console.log("ChessBoard_8x8_C->click(mouseDown) one_click_on_squares == 1 второй клик");
            if ((0 <= x_b_n) && (0 <= y_b_n) && (x_b_n < 8) && (y_b_n < 8)) {// 
                //console.log("ChessBoard_8x8_C->click(mouseDown) попали по доске");
                IfritChessGame_R.one_click_on_squares = 0;

                // если это второй клик по той же самой клетке то выделение снимаем
                if ((IfritChessGame_R.one_click_on_squares_x == x_b_n) &&
                    (IfritChessGame_R.one_click_on_squares_y == y_b_n)) {
                    //console.log("ChessBoard_8x8_C->click(mouseDown) снова кликнули по той же клетке");
                    // рисуем доску
                    IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

                    // это второй клик по другой клетке значит делаем ход
                    // смотрим допустим ли ход но это ход из списка псевдолегальных ходов
                } else if (IfritChessGame_R.chessEngine_0x88_O.pseudo_move_is_ok(IfritChessGame_R.one_click_on_squares_x,
                    IfritChessGame_R.one_click_on_squares_y, x_b_n, y_b_n, IfritChessGame_R.chessBoard_8x8_O)) {
                    //console.log("ChessBoard_8x8_C->click(mouseDown) кликнули по другой клетке");
                    //console.log("ChessBoard_8x8_C->click(mouseDown) после пройденной проверки на легальность хода из списка");

                    let is_moove_legal = IfritChessGame_R.chessEngine_0x88_O.move_is_legal(IfritChessGame_R.one_click_on_squares_x,
                        IfritChessGame_R.one_click_on_squares_y, x_b_n, y_b_n, IfritChessGame_R.chessBoard_8x8_O);

                    // console.log("ChessBoard_8x8_C->click(mouseDown) после сделанного во время проверки хода");
                    // console.log("ChessBoard_8x8_C->click(mouseDown) side_to_move "
                    //     + IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.side_to_move);

                    // обсчитали ход и выдали вердикт легальный ли он ****************************************************
                    if (is_moove_legal == 0) {
                        //console.log("ChessBoard_8x8_C->click(mouseDown) MOVE NOT LEGAL");
                        // если ход не легальный то восстанавливаем доску из chess_board_0x88_O_save_gui
                        //IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.save_chess_board_0x88(
                        //    IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O_save_gui);
                    } else {

                        IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O_gui);
                        //console.log("ChessBoard_8x8_C->click(mouseDown) +++++++++++++++++++++++++++");
                        // console.log("ChessBoard_8x8_C->click(mouseDown) MOVE LEGAL");
                        //console.log("ChessBoard_8x8_C->click(mouseDown) side_to_move "
                        //    + IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O.side_to_move);
                        // тут ход уже сделан на доске движка chess_board_0x88_O и мы считаем ответ
                        if (IfritChessGame_R.test == 1) {// test просто генерируем избыточные ходы (без проверки на шах)
                            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);
                            // // копируем доску движка в игровую
                            // IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);
                            IfritChessGame_R.chessEngine_0x88_O.position(IfritChessGame_R.chessBoard_8x8_O);
                            //let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_mm(IfritChessGame_R.depth_max);
                            let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_ab(IfritChessGame_R.depth_max);
                            //let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_abfh(IfritChessGame_R.depth_max);   
                            this.score = info_return_g.score;
                            this.nodes = info_return_g.node_count;

                        } else if (IfritChessGame_R.test == 2) {// test minmax запуск полного перебора                  
                            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);
                            IfritChessGame_R.chessEngine_0x88_O.position(IfritChessGame_R.chessBoard_8x8_O);
                            // режим тестовой игры движок отвечает на наш ход 
                            //let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_mm(IfritChessGame_R.depth_max);
                            //let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_ab(IfritChessGame_R.depth_max);  
                            let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_abfh(IfritChessGame_R.depth_max);

                            this.score = info_return_g.score;
                            this.nodes = info_return_g.node_count
                            // копируем доску движка с найденным ходом в игровую
                            IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(info_return_g.chess_board_0x88_O_move);

                        } else if (IfritChessGame_R.test == 3) { // test  alpha beta
                            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);
                            IfritChessGame_R.chessEngine_0x88_O.position(IfritChessGame_R.chessBoard_8x8_O);
                            // режим тестовой игры движок отвечает на наш ход 
                            let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_ab(IfritChessGame_R.depth_max);
                            this.score = info_return_g.score;
                            this.nodes = info_return_g.node_count
                            // копируем доску движка с найденным ходом в игровую
                            IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(info_return_g.chess_board_0x88_O_move);
                            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

                            text_engine.value = " max depth " + IfritChessGame_R.depth_max +
                                " nodes " + this.nodes + " score " + this.score +
                                "\n " + info_return_g.pv_line_str;
                            // PV line: это 9
                            this.nomber_move = this.nomber_move + 1;
                            text_chess_game.value += this.nomber_move + "." +
                                IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O.move_to_string(IfritChessGame_R.chessEngine_0x88_O.i_move,
                                    info_return_g.chess_board_0x88_O_move) +
                                info_return_g.pv_line_str.slice(11, 18);


                        } else if (IfritChessGame_R.test == 4) { // test alpha beta fail hard
                            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);
                            IfritChessGame_R.chessEngine_0x88_O.position(IfritChessGame_R.chessBoard_8x8_O);
                            // режим тестовой игры движок отвечает на наш ход 
                            let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_abfh(IfritChessGame_R.depth_max);
                            this.score = info_return_g.score;
                            this.nodes = info_return_g.node_count
                            // копируем доску движка с найденным ходом в игровую
                            IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(info_return_g.chess_board_0x88_O_move);

                        } else if (IfritChessGame_R.test == 5) {  // iterative deepening with PVS
                            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

                            // text_engine.value = "max depth " + IfritChessGame_R.depth_max +
                            //     " nodes " + this.nodes + " score " + this.score;

                            text_engine.value = " 2 После Вашего хода Ифрит будет думать. На это время доска зависнет < 30 сек.";

                            IfritChessGame_R.chessEngine_0x88_O.position(IfritChessGame_R.chessBoard_8x8_O);
                            let info_return_g = IfritChessGame_R.chessEngine_0x88_O.go_depth_id(IfritChessGame_R.depth_max);
                            this.score = info_return_g.score;
                            this.nodes = info_return_g.node_count

                            // копируем доску движка с найденным ходом в игровую
                            IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(info_return_g.chess_board_0x88_O_move);

                        } else if (IfritChessGame_R.test == 6) { // игра в режиме отдельного потока

                            IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

                            text_engine.value = " Ифрит изволит думать. В это время фигуры недоступны";

                            // message_gui_to_engine    
                            let fen = IfritChessGame_R.chessBoard_8x8_O.set_fen_from_8x8(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);
                            let message = "position fen " + fen;
                            worker_egine_0x88.postMessage(message);
                            message = "go depth " + IfritChessGame_R.depth_max;
                            worker_egine_0x88.postMessage(message);

                            if (this.is_white == 1) {
                                this.nomber_move = this.nomber_move + 1;
                                text_chess_game.value += this.nomber_move + "." +
                                    IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O.move_to_string(IfritChessGame_R.chessEngine_0x88_O.i_move,
                                        IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O_gui);                                

                            } else {
                                text_chess_game.value += 
                                    IfritChessGame_R.chessEngine_0x88_O.move_list_gui_0x88_O.move_to_string(IfritChessGame_R.chessEngine_0x88_O.i_move,
                                        IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O_gui);

                            }
                            IfritChessGame_R.stop_click_2 = 1;

                        }
                    }

                    let f = "f";
                    f = IfritChessGame_R.chessBoard_8x8_O.set_fen_from_8x8(IfritChessGame_R.chessEngine_0x88_O.chess_board_0x88_O);
                    //console.log("ChessBoard_8x8_C->click(mouseDown) f " + f);
                    //console.log("ChessBoard_8x8_C->click(mouseDown) side_to_move " + IfritChessGame_R.chessBoard_8x8_O.side_to_move);
                    text_engine.value += "\n fen " + f;

                    if (is_moove_legal == 0) {
                        text_engine.value = " Недопустимый ход.";
                    }

                } else {
                    //console.log("ChessBoard_8x8_C->click(mouseDown) кликнули по другой клетке");
                    //console.log("ChessBoard_8x8_C->click(mouseDown) проверка на легальность хода из списка не пройдена");
                    // рисуем доску если ход не легальный                    
                    IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

                    text_engine.value = " Недопустимый ход";
                }
            }
        } else { // это первый клик
            //console.log("ChessBoard_8x8_C->click(mouseDown) one_click_on_squares != 1 первый клик");
            if ((0 <= x_b_n) && (0 <= y_b_n) && (x_b_n < 8) && (y_b_n < 8)) {// 
                if ((IfritChessGame_R.chessBoard_8x8_O.sq_piece_color_8x8[y_b_n][x_b_n] == IfritChessGame_R.chessBoard_8x8_O.side_to_move) &&
                    (IfritChessGame_R.chessBoard_8x8_O.sq_piece_8x8[y_b_n][x_b_n] != 0)) {//                     
                    //console.log("ChessBoard_8x8_C->click(mouseDown) попали по клетке и есть фигура нужного цвета");
                    // запоминаем координаты клетки и то что сделали клик
                    IfritChessGame_R.one_click_on_squares = 1;
                    IfritChessGame_R.one_click_on_squares_x = x_b_n;
                    IfritChessGame_R.one_click_on_squares_y = y_b_n;

                    IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);
                    // считаем возможные ходы фигуры и рисуем квадратики ходов                   
                    IfritChessGame_R.chessEngine_0x88_O.draw_rect_move(x_b_n, y_b_n, IfritChessGame_R.chessBoard_8x8_O,
                        IfritChessGame_R.draw_O, this.is_white);

                    // обратно зеркалим что бы рисовать квадратики на старом месте
                    if (this.is_white == 0) y_b_n = 7 - y_b_n;
                    if (this.is_white == 0) x_b_n = 7 - x_b_n;
                    // console.log("y_b_n " + y_b_n);                        
                    // рисуем квадратик кликнутой клетки
                    IfritChessGame_R.draw_O.draw_rect(IfritChessGame_R.chessBoard_8x8_O, x_b_n, y_b_n, Html5Canvas_C.GREEN,);

                    text_engine.value = " После Вашего хода Ифрит будет думать. Меньше 30 сек";

                }
            }
        }

    },

    mouseUp(x, y) {
        //console.log('IfritChessGame_R->mouseUp x ' + x + " y " + y);
    },

    startGameButton() {

        if (isNaN(parseInt(input_max_depth.value))) {
            IfritChessGame_R.depth_max = 1;
            input_max_depth.value = IfritChessGame_R.depth_max;
        } else {
            IfritChessGame_R.depth_max = parseInt(input_max_depth.value);
            if (IfritChessGame_R.depth_max <= 0) IfritChessGame_R.depth_max = 1;
            if (IfritChessGame_R.depth_max > 5) IfritChessGame_R.depth_max = 5;
            input_max_depth.value = IfritChessGame_R.depth_max;
        }

        IfritChessGame_R.TEST_POSITION_FEN = IfritChessGame_R.INITIAL_POSITION_FEN;
        IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_fen(IfritChessGame_R.TEST_POSITION_FEN);

        if (checkbox_is_black_game.checked) {
            this.is_white = 0;
            if (IfritChessGame_R.test != 6) {
                IfritChessGame_R.chessEngine_0x88_O.position(IfritChessGame_R.chessBoard_8x8_O);
                // режим тестовой игры движок отвечает на наш ход 
                let info_return_g = IfritChessGame_R.chessEngine_0x88_O.test_go_depth_ab(IfritChessGame_R.depth_max);
                this.score = info_return_g.score;
                this.nodes = info_return_g.node_count;
                this.pv_line_str = info_return_g.pv_line_str;
                // копируем доску движка с найденным ходом в игровую
                IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_0x88(info_return_g.chess_board_0x88_O_move);
            } else {
                // message_gui_to_engine    
                let fen = IfritChessGame_R.TEST_POSITION_FEN;
                let message = "position fen " + fen;
                worker_egine_0x88.postMessage(message);
                message = "go depth " + IfritChessGame_R.depth_max;
                worker_egine_0x88.postMessage(message);

                IfritChessGame_R.stop_click_2 = 1;
            }
        } else {
            this.is_white = 1;
        }

        IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

        text_engine.value = " max depth " + IfritChessGame_R.depth_max +
            " nodes " + this.nodes + " score " + this.score +
            "\n " + this.pv_line_str;

        text_engine.value += "\n Новая игра";
        text_chess_game.value = "Новая игра";
        text_chess_game.value += "\n Game: ";
        this.nomber_move = 0;


    },

    stopGameButton() {

    },

    fenGameButton() {

        IfritChessGame_R.depth_max = Number(input_max_depth.value);

        IfritChessGame_R.TEST_POSITION_FEN = input_set_fen.value;
        IfritChessGame_R.chessBoard_8x8_O.set_8x8_from_fen(IfritChessGame_R.TEST_POSITION_FEN);
        IfritChessGame_R.chessEngine_0x88_O.position(IfritChessGame_R.chessBoard_8x8_O);
        IfritChessGame_R.draw_O.draw_chess_board_8x8(IfritChessGame_R.chessBoard_8x8_O, this.is_white);

        if (isNaN(parseInt(input_max_depth.value))) {
            IfritChessGame_R.depth_max = 1;
            input_max_depth.value = IfritChessGame_R.depth_max;
        } else {
            IfritChessGame_R.depth_max = parseInt(input_max_depth.value);
            if (IfritChessGame_R.depth_max <= 0) IfritChessGame_R.depth_max = 1;
            if (IfritChessGame_R.depth_max > 5) IfritChessGame_R.depth_max = 5;
            input_max_depth.value = IfritChessGame_R.depth_max;
        }

        text_engine.value = " max depth " + IfritChessGame_R.depth_max +
            " nodes " + this.nodes + " score " + this.score;
        text_engine.value += "\n Позиция задана из fen. Сами следите за его корректностью. Новая игра";

    },
};

const worker_egine_0x88 = new Worker('js/worker_chess_engine_0x88/w_chess_engine_0x88.js');

worker_egine_0x88.onmessage = function (event) {
    //console.log('Сообщение от движка : ', event.data);
    IfritChessGame_R.message_egnine_to_gui(event.data);
};