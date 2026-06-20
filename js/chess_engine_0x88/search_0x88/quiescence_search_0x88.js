// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name quiescence_search_0x88.js
 * @version created 31.01m.2026 
 * Code review: DeepSeek AI
*/

import {
    BOARD_SIZE_CB
} from "../move_generator_0x88/chess_board_0x88.js";

import {
    get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml,
    sorting_list_ml,
    LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_MOVE_ML,
    MOVE_NO_ML
} from "../move_generator_0x88/move_list_0x88.js";

import {

} from "./pv_line_0x88.js";

import {
  generated_pseudo_legal_captures_mgc
} from "../move_generator_0x88/move_generator_captures_0x88.js";

import { do_moves_mm } from "../move_generator_0x88/make_move_0x88.js";

import { score_position_e, PIECE_SCORE_E } from "./evaluate_0x88.js";

/**
* НАЗНАЧЕНИЕ

*/

let node_qs = 0;

// Стоимость фигур (примерная)
const PIECE_VALUES = [0, 100, 300, 325, 500, 975, 10000]; 

const SAFETY_MARGIN = 200; // запас на случай позиционных изменений (например, проход пешки)

const MAX_DEPTH_SEARCH = 128;

let packing_moves_stack = new Array(MAX_DEPTH_SEARCH);
let chess_board_save_stack = new Array(MAX_DEPTH_SEARCH);
let chess_board_key_64_undo_stack = new Array(MAX_DEPTH_SEARCH);

const ini_stack_qs = function () {

  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {

    packing_moves_stack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    chess_board_save_stack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
    chess_board_key_64_undo_stack[depth] = new BigUint64Array(1);
  }
}


/**
* @param {number} alpha
* @param {number} beta
* @param {Int32Array} chess_board_0x88
* @param {BigUint64Array} chess_board_key_64
* @param {number} depth
 
* @returns {number}
*  
 
  */

const quiescence_search = function (alpha, beta, chess_board_0x88, chess_board_key_64, depth) {

  let packing_moves = packing_moves_stack[depth];

  let chess_board_save = chess_board_save_stack[depth];

  const chess_board_key_64_undo = chess_board_key_64_undo_stack[depth];

  let score = 0;// текущая оценка позиции
  let best_value;// максимальная оценка позиции

  let is_moove_legal = -1;

  let type_move;// тип хода
  let from;// откуда ход
  let to;// куда ход
  let name_capture_piece;// имя взятой фигуры
  let piece_color;// цвет хода

  // Защита от переполнения стека
  if (depth >= MAX_DEPTH_SEARCH - 1) {
    return score_position_e(chess_board_0x88);
  }

  node_qs = node_qs + 1;

  // Stand Pat =====================================
  let static_eval = score_position_e(chess_board_0x88);

  best_value = static_eval;

  if (best_value >= beta)
    return best_value;

  if (best_value > alpha)
    alpha = best_value;
  // ===================================== Stand Pat

  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);

  // если ходов нет
  if (packing_moves[IND_NUMBER_MOVE_ML] == 0) {
    //console.log("quiescence_search-> moves = 0 depth " + depth);
    return best_value;
  }

  sorting_list_ml(packing_moves);

  //console.log("quiescence_search-> moves = " + packing_moves[IND_NUMBER_MOVE] + " depth " + depth);

  for (let move_i = 0; move_i < packing_moves[IND_NUMBER_MOVE_ML]; move_i++) {

    type_move = get_type_move_ml(move_i, packing_moves);// тип хода
    from = get_from_ml(move_i, packing_moves);
    to = get_to_ml(move_i, packing_moves);
    name_capture_piece = get_name_capture_piece_ml(move_i, packing_moves);
    piece_color = packing_moves[IND_PIECE_COLOR_ML];

    // Delta Pruning
    // Если текущая оценка + стоимость съедаемой фигуры + запас все равно меньше alpha
    if (static_eval + PIECE_SCORE_E[name_capture_piece] + SAFETY_MARGIN < alpha) {
      continue; // Этот ход можно даже не делать и не проверять легальность!
    }

    chess_board_save.set(chess_board_0x88);
    chess_board_key_64_undo[0] = chess_board_key_64[0];

    is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, piece_color);

    if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл

      chess_board_0x88.set(chess_board_save);
      chess_board_key_64[0] = chess_board_key_64_undo[0];

      continue;

    } else if (is_moove_legal == 2) {// нелегальные рокировки не генерируются. просто пропускаем ход
      continue;
    }

    score = -quiescence_search(-beta, -alpha, chess_board_0x88, chess_board_key_64, (depth + 1));

    chess_board_0x88.set(chess_board_save);
    chess_board_key_64[0] = chess_board_key_64_undo[0];

    if (score >= beta) {
      return score;
    }
    if (score > best_value)
      best_value = score;

    if (score > alpha)
      alpha = score;
  }

  return best_value;
}

export { quiescence_search, ini_stack_qs };

/*
https://www.chessprogramming.org/Quiescence_Search

int Quiesce( int alpha, int beta ) {
    int static_eval = Evaluate();

    // Stand Pat
    int best_value = static_eval;
    if( best_value >= beta )
        return best_value;
    if( best_value > alpha )
        alpha = best_value;

    until( every_capture_has_been_examined )  {
        MakeCapture();
        score = -Quiesce( -beta, -alpha );
        TakeBackMove();

        if( score >= beta )
            return score;
        if( score > best_value )
            best_value = score;
        if( score > alpha )
            alpha = score;
    }

    return best_value;
}


*/