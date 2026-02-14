// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name ifrit_node_js.js
 * @version created 17.12m.2025 
*/

//const readline = require('node:readline');
// @ts-ignore
import * as readline from 'node:readline';
//import { writeFile } from 'node:fs/promises';

// @ts-ignore
import { appendFile } from 'node:fs/promises';

import { ChessEngine_0x88_С } from "../chess_engine_0x88/i_chess_engine_0x88.js";

/**
* НАЗНАЧЕНИЕ
* Все объяснил и помог сделать заготовку ИИ от Google
*/

let chessEngine_0x88_O = new ChessEngine_0x88_С();// встроенный шахматный движок на доске 0x88

chessEngine_0x88_O.iniM();

let fen_start = "";
let depth_max = -1;

  /**
   * @param {string} command
   * @returns {Promise<void>}
   */
async function save_command(command) {
  try {
    //await writeFile('ifrit_save_command.txt', command, 'utf8');
    await appendFile('ifrit_save_command.txt', '\n' + command);
  } catch (err) {
    console.error('Ошибка записи:', err);
  }
}


// Создаем интерфейс для чтения из стандартного ввода (stdin) 
// и записи в стандартный вывод (stdout)
const rl = readline.createInterface({

  // @ts-ignore
  input: process.stdin,

  // @ts-ignore
  output: process.stdout,
  terminal: false
});

// Обработка каждой новой строки от оболочки
// @ts-ignore
rl.on('line', (line) => {
  const command = line.trim();

  save_command(command);

  if (command === 'uci') {
    console.log('id name Ifrit_js_1302m26');
    console.log('id author AnBr75');
    console.log('uciok');
  }

  else if (command === 'isready') {
    chessEngine_0x88_O.iniM();
    console.log('readyok');
  }

  else if (command.startsWith('position startpos')) {

    const START_POSITION_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    // Здесь обычно парсят позицию (например, "position startpos moves e2e4")
    let move_str = command.slice(18);

    fen_start = START_POSITION_FEN;

    fen_start = chessEngine_0x88_O.move_str_to_board(fen_start, move_str);
  }

  else if (command.startsWith('position fen')) {
    //position fen 8/1B6/8/5p2/8/8/5Qrq/1K1R2bk w - - 0 1
    let firstIndex = command.indexOf("moves");

    if (firstIndex == -1) {

      fen_start = command.slice(13);
      //console.log('fen_start ' + fen_start);

    } else {
      fen_start = command.slice(13, firstIndex - 1);
      let move_str = command.slice(firstIndex);

      fen_start = chessEngine_0x88_O.move_str_to_board(fen_start, move_str);
    }
  }

  // else if (command.startsWith('go')) {
  //   // Ответ на запрос начать поиск хода
  //   console.log('bestmove e2e4');
  // }

  else if (command.startsWith('go depth')) {
    depth_max = command.slice(9);
    //console.log('depth_max ' + depth_max);
    //console.log('2 fen_start ' + fen_start);
    let info_return_search = chessEngine_0x88_O.go_depth_id(fen_start, depth_max);

    // console.log("info depth "+ info_return_search.depth_max_search_str + " score cp " + info_return_search.best_score_str 
    // + " nodes " + info_return_search.node_count_str + " nps " + info_return_search.nodes_per_second_str 
    // + " pv " + info_return_search.pv_line_uci_str);

    console.log('bestmove ' + info_return_search.best_move);
  }

  else if (command === 'stop') {
    chessEngine_0x88_O.set_stop_search_in_1();
  }

  else if (command === 'quit') {
    rl.close();

    // @ts-ignore
    process.exit(0);
  }
});