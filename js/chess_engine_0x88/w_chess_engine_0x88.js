/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name chess_engine_0x88.js
 * @version created 25.10m.2025 
 * last modified 25.10m.2025
*/

/**
* НАЗНАЧЕНИЕ

*/

importScripts("../chess_engine_0x88/chess_board_0x88.js");
importScripts("../chess_engine_0x88/hash_table_0x88.js");
importScripts("../chess_engine_0x88/move_list_0x88.js");
importScripts("../chess_engine_0x88/move_gen_1_captures_0x88.js");
importScripts("../chess_engine_0x88/move_gen_2_quiet_0x88.js");
importScripts("../chess_engine_0x88/undo_0x88.js");
importScripts("../chess_engine_0x88/make_move_0x88.js");
importScripts("../chess_engine_0x88/unmake_move_0x88.js");
importScripts("../chess_engine_0x88/evaluate_0x88.js");
importScripts("../chess_engine_0x88/pv_line_0x88.js");
importScripts("../chess_engine_0x88/quiescence_search_0x88.js");
importScripts("../chess_engine_0x88/search_negamax_0x88.js");
importScripts("../chess_engine_0x88/search_ab_0x88.js");
importScripts("../chess_engine_0x88/search_start_0x88.js");
importScripts("../chess_engine_0x88/chess_engine_0x88.js");

class W_ChessEngine_0x88_С {

  chessEngine_0x88_O = new ChessEngine_0x88_С();// встроенный шахматный движок на доске 0x88

  static NAME = "W_ChessEngine_0x88";

  constructor() {
  }

  iniM() {
      this.chessEngine_0x88_O.iniM();
  }

  message_to_engine(message) {
    //console.log('e message : ' + message);
    let fen;
    if (message.includes("position fen ")) {
      let end = message.length;
      fen = message.slice(13, end);
      //console.log('e fen from gui : ' + fen);

      w_chessEngine_0x88_O.chessEngine_0x88_O.chess_board_0x88_O.set_0x88_from_fen(fen);
      
     //console.log("e-> ini chess_board_0x88_O");
     //w_chessEngine_0x88_O.chessEngine_0x88_O.chess_board_0x88_O.test_print_0x88();
     //w_chessEngine_0x88_O.chessEngine_0x88_O.chess_board_0x88_O.test_print_0x88_color();
     //w_chessEngine_0x88_O.chessEngine_0x88_O.chess_board_0x88_O.test_print_any_0x88();

    } else if (message.includes("go depth ")) {
      let end = message.length;
      let depth_max_s = message.slice(9, end); 
      let depth_max = Number(depth_max_s);

      //let info_return_e = w_chessEngine_0x88_O.chessEngine_0x88_O.test_go_depth_nm(depth_max);      
      //let info_return_e = w_chessEngine_0x88_O.chessEngine_0x88_O.test_go_depth_ab(depth_max);
      let info_return_e = w_chessEngine_0x88_O.chessEngine_0x88_O.go_depth_id(depth_max);      

      //console.log("e-> info_return_e");
     //info_return_e.chess_board_0x88_O_move.test_print_0x88();
     //info_return_e.chess_board_0x88_O_move.test_print_0x88_color();
     //info_return_e.chess_board_0x88_O_move.test_print_any_0x88();

      fen = info_return_e.chess_board_0x88_O_move.set_fen_from_0x88();
      //console.log('e fen to gui : ' + fen); 
      postMessage("position fen " + fen);
      postMessage("score " + info_return_e.score);
      postMessage("node " + info_return_e.node_count);
      postMessage(info_return_e.pv_line_str);      
      postMessage("go");                  
    }
  }
}

let w_chessEngine_0x88_O = new W_ChessEngine_0x88_С();
w_chessEngine_0x88_O.iniM();

onmessage = function (event) {
  //console.log('Сообщение от оболочки : ', event.data);
  w_chessEngine_0x88_O.message_to_engine(event.data);
};

/*
https://official-stockfish.github.io/docs/stockfish-wiki/UCI-&-Commands.html
Universal Chess Interface (UCI) for Stockfish

Standard commands
  quit
        Quit the program as soon as possible.
  uci
        Examples:
        > uci
        id name Stockfish 16.1
        id author the Stockfish developers (see AUTHORS file)
        ...
        uciok
  setoption

  position
        Usage: position [fen <fenstring> | startpos ] moves <move1> .... <movei>
        Set up the position described in fenstring.
        If the game was played from the start position the string startpos must be sent.
        Examples:
        > position startpos
        > position startpos moves e2e4 e7e5 g1f3 b8c6 f1b5
        > position fen 8/1B6/8/5p2/8/8/5Qrq/1K1R2bk w - - 0 1
        > position fen 8/3P3k/n2K3p/2p3n1/1b4N1/2p1p1P1/8/3B4 w - - 0 1 moves g4f6 h7g7 f6h5 g7g6 d1c2

  ucinewgame
  > ucinewgame
        Examples:
        > isready
        readyok
        > position startpos
        > go depth 1
        info string NNUE evaluation using nn-ad9b42354671.nnue enabled
        info depth 1 seldepth 1 multipv 1 score cp 18 nodes 20 nps 10000 hashfull 0 tbhits 0 time 2 pv e2e4
        bestmove e2e4
        > ucinewgame
        > isready
        readyok
        > position fen r2q1rk1/p2bbppp/Q7/2p1P2P/8/2p1B3/PPP2P1P/2KR3R w - - 0 17
  isready
        This is used to synchronize the engine with the GUI.
        Examples:
        > isready
        readyok           
  go
  go infinite
        Examples:
        > position startpos
        > go infinite
        info depth 1 seldepth 1 multipv 1 score cp 18 nodes 20 nps 4000 hashfull 0 tbhits 0 time 5 pv e2e4
        > stop       
        info depth 2 seldepth 2 multipv 1 score cp 46 nodes 66 nps 11000 hashfull 0 tbhits 0 time 6 pv d2d4
        ....
        bestmove e2e4 ponder e7e6
  go depth
        Examples:
        > position startpos
        > go depth 5
        info depth 1 seldepth 2 multipv 1 score cp 17 nodes 20 nps 20000 hashfull 0 tbhits 0 time 1 pv e2e4
        info depth 2 seldepth 3 multipv 1 score cp 34 nodes 45 nps 22500 hashfull 0 tbhits 0 time 2 pv e2e4
        info depth 3 seldepth 4 multipv 1 score cp 42 nodes 72 nps 36000 hashfull 0 tbhits 0 time 2 pv e2e4
        info depth 4 seldepth 7 multipv 1 score cp 39 nodes 512 nps 128000 hashfull 0 tbhits 0 time 4 pv g1f3 d7d5 d2d4
        info depth 5 seldepth 7 multipv 1 score cp 58 nodes 609 nps 152250 hashfull 0 tbhits 0 time 4 pv e2e4
        bestmove e2e4 ponder d7d6        
  stop
        Stop calculating as soon as possible
  ponderhit
  

Non-standard commands
  bench
  speedtest
  d
  eval
  compiler
  export_net [filenameBigNet] [filenameSmallNet]
  flip
  help
  license
*/