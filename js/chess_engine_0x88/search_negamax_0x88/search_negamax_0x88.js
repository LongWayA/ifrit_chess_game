// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_negamax_0x88.js
 * @version created 16.05m.2026 
 * Code review: Qwen3.7-Max AI
*/

/**
* НАЗНАЧЕНИЕ

*/

import {
  BOARD_SIZE_CB, SIDE_TO_MOVE_CB,
  BLACK_CB, WHITE_CB,
  IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_list_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml,
  sorting_list_ml, test_print_list_ml,
  LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
  MOVE_NO_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
  add_move_to_pv_line_pv, save_pv_line_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV
} from "./pv_line_0x88.js";

import {
  generated_pseudo_legal_captures_mgc, check_detected_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";

import { score_position_e, PAWN_SCORE_E } from "../evaluate_0x88/evaluate_0x88.js";

import {
  set_key_from_board_0x88_tk, test_chess_board_key_64_tk
} from "../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

// максимум который в принципе не достижим для полного перебора.
const MAX_DEPTH_SEARCH = 129;

let chess_board_save_stack = new Array(MAX_DEPTH_SEARCH);// для каждой глубины записанная позиция. что бы восстановить 
                                                         // позицию после выныривания с глубины
// TEST
let chess_board_save_stack_score = new Array(MAX_DEPTH_SEARCH);// позиция соответствующая найденной оценке 


let chess_board_key_64_undo_stack = new Array(MAX_DEPTH_SEARCH);// для каждой глубины записанный ключ. что бы восстановить 
                                                                // ключ после выныривания с глубины

// что бы не создавать масивы во время поиска делаем массив массивов к которым обращаемся по глубине
// таким образом это стек. у нас не дерево позиций а линия позиций с доступом по глубине
let packing_moves_stack = new Array(MAX_DEPTH_SEARCH); // стек массива списков запакованых ходов
                                                       // для каждой позиции есть список ходов. мы его насчитываем.

let best_packing_pv_line_stack = new Array(MAX_DEPTH_SEARCH);// тут линии варинтов которые тоже вертикальные по глубине

const ini_stack = function () {

  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {

    chess_board_save_stack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);// записанная доска

    // TEST
    chess_board_save_stack_score[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);// позиция соответствующая найденной оценке

    chess_board_key_64_undo_stack[depth] = new BigUint64Array(1);// записанный ключ

    packing_moves_stack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML); // в списке индексы массива 
                                                                                  // от 0 до 256 зарезервированы для упакованого хода

    best_packing_pv_line_stack[depth] = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);// записанная линия варианта

  
  }
}

// это позиция соответствующая найденному лучшему ходу.
let chess_board_0x88_found_best_score = new Int32Array(BOARD_SIZE_CB).fill(0);// доска 0x88 с фигурами;

// тестируем ключи. этот генерируем прямо из позиции. что бы потом сравнить с тем что изменяется во время поиска
let chess_board_key_64_test = new BigUint64Array(1);

const MATE = -30000;
const INIT_EVAL = -40000;// матовая оценка всегда должна обновлять INIT_EVAL 
                         // и при - и при + на следющей глубине поиска (-30000 > -40000) и (30000 > -40000)

let node_mm = 0;

/**
 * 
 * tp
 * 
 * @param {Int32Array} chess_board_0x88 - позиция
 * @param {Int32Array} chess_board_0x88_score - позиция 
 * @param {BigUint64Array} chess_board_key_64 - зобрист ключ позиции
 * @param {Int32Array} packing_pv_line - линия варианта лучшая на данный момент
 * @param {number} depth - текущая глубина поиска
 * @param {number} depth_max - максимальная глубина поиска
 * @returns {number} - оценка позиции
 */
const searching_negamax = function (chess_board_0x88, chess_board_0x88_score, chess_board_key_64, packing_pv_line, depth, depth_max) {

  const chess_board_save = chess_board_save_stack[depth];

  // TEST
  const chess_board_save_score = chess_board_save_stack_score[depth];

  const chess_board_key_64_undo = chess_board_key_64_undo_stack[depth];

  const packing_moves = packing_moves_stack[depth];
  const best_packing_pv_line = best_packing_pv_line_stack[depth];

  let score = 0;// текущая оценка позиции
  let found_score;// максимальная найденная в данном узле оценка позиции
  let update_found_score = -1;// номер хода который обновил максимальную оценку

  let is_moove_legal = -1;// есть ли легальные ходы
  let number_move_legal = 0;// колличество легальных ходов  

  let type_move;// тип хода
  let from; // откуда ход
  let to;// куда ход
  let name_capture_piece;// взятая фигура или 0

  let piece_color;// цвет ходящей фигуры или стороны

  if (depth == 0) {
    node_mm = 0;
    chess_board_0x88_found_best_score.set(chess_board_0x88);
  }

  // достигли предельной глубины. вызываем статичискую оценку позиции
  if (depth >= depth_max) {

    // по входящей позиции генерируем ее оценку
    found_score = score_position_e(chess_board_0x88);

    //console.log("searching_negamax->found_score " + found_score);
    //found_score = 0;
    node_mm = node_mm + 1;

    // TEST
    chess_board_0x88_score.set(chess_board_0x88);

    // сравниваем ключи сохраненный и измененный
    // тестируем ключи. этот генерируем прямо из позиции. что бы потом сравнить с тем что изменяется во время поиска
    set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_test);
    test_chess_board_key_64_tk(chess_board_key_64_test, chess_board_key_64);

    return found_score;

  }
  //console.log("searching_negamax->depth " + depth);

  found_score = INIT_EVAL;// минимальная стартовая оценка позиции

  // сбросить счётчик ходов
  // мы постоянно перезаписываем уже существующий список ходов 
  // потому что идем по дереву вариантов, а используем стек на линию вариантов
  clear_list_ml(packing_moves);
  //packing_moves[IND_NUMBER_MOVE_ML] = 0;
  //packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = 0;

  // сгенерировали список ходов тут и взятия и тихие ходы
  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

 // тестирую сортировки ходов 
//   if (depth == 0) {

//     console.log("searching_negamax -> before sorting_list");

  //   // печатаем в консоль весь список ходов
     //test_print_list_ml(packing_moves);

  //   // сортировка списка ходов по типу хода
  //   sorting_list_ml(packing_moves);

  //   console.log("searching_negamax -> after sorting_list");

  //   // печатаем в консоль весь список ходов
 //   test_print_list_ml(packing_moves);
//   }

  // бежим по списку избыточных ходов
  for (let move_number = 0; move_number < packing_moves[IND_NUMBER_MOVE_ML]; move_number++) {

    type_move = get_type_move_ml(move_number, packing_moves);// тип хода
    from = get_from_ml(move_number, packing_moves);
    to = get_to_ml(move_number, packing_moves);
    name_capture_piece = get_name_capture_piece_ml(move_number, packing_moves);
    piece_color = packing_moves[IND_PIECE_COLOR_ML];

    chess_board_save.set(chess_board_0x88);// записали позицию
    chess_board_key_64_undo[0] = chess_board_key_64[0];// записали зобрист ключ позиции

    // делаем ход
    is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, piece_color);


    if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
      chess_board_0x88.set(chess_board_save);// восстановили позицию
      chess_board_key_64[0] = chess_board_key_64_undo[0];// восстановили зобрист ключ позиции
      continue;

    } else if (is_moove_legal == 2) {// нелегальные рокировки и взятия короля не генерируются. просто пропускаем ход
      continue;
    }

    add_move_to_pv_line_pv(move_number, packing_moves, packing_pv_line, depth);

    number_move_legal = number_move_legal + 1;

    // зачем это делаю не помню
    if (depth == 0) packing_pv_line[IND_TYPE_VARIANT_PV] = 1;

    score = -searching_negamax(chess_board_0x88, chess_board_0x88_score, chess_board_key_64, packing_pv_line,  (depth + 1), depth_max);


    if (score > found_score) {
      found_score = score;
      update_found_score = move_number;
      save_pv_line_pv(best_packing_pv_line, packing_pv_line);

      // TEST
      chess_board_save_score.set(chess_board_0x88_score);//записываем позицию соответствующую лучшей оценке

      if (depth == 0) chess_board_0x88_found_best_score.set(chess_board_0x88);// записываем позицию лучшего хода
      //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);
    }//if (score > found_score) {

    // восстановили позицию и ключ
    chess_board_0x88.set(chess_board_save);
    chess_board_key_64[0] = chess_board_key_64_undo[0];


  }//for (let move_number = 0; move_number < move_list_0x88_O.number_move; move_number++) {

  // если во время поиска лучшую оценку обновили то записываем соответствующий ей вариант
  if (update_found_score != -1){ 
    save_pv_line_pv(packing_pv_line, best_packing_pv_line);

    // TEST
    chess_board_0x88_score.set(chess_board_save_score);// возвращаем лучшую записанную позицию соотв. лучшей оценке
  }

  //это мат или пат
  if (number_move_legal == 0) {

    let mat = MATE + depth;

    if (chess_board_0x88[SIDE_TO_MOVE_CB] == WHITE_CB) {//

      // ход белых. а ходов нет. это 0 пат, если же белый король под шахом это мат
      if (check_detected_mgc(chess_board_0x88[IND_KING_FROM_WHITE_CB], WHITE_CB, chess_board_0x88) != 0) {

        //console.log("searching_alpha_beta_id_ab-> W chek ");

        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

        return mat;
      }
      packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

      return 0;

    } else {//if (chess_board_0x88_O.side_to_move == 1) {
      //  console.log("Search_0x88_C-> B pat ");
      if (check_detected_mgc(chess_board_0x88[IND_KING_FROM_BLACK_CB], BLACK_CB, chess_board_0x88) != 0) {

        //console.log("searching_alpha_beta_id_ab-> B chek ");

        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;// обхожу ноль. так как на 1 глубине -> depth - 1 = 0

        return mat;
      }

      packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

      return 0;
    }//if (chess_board_0x88_O.side_to_move == 1) {
  }// if (number_move_legal == 0) {

  return found_score;

}//searching_minmax(pv_line_0x88_O, chess_board_0x88,

export { searching_negamax, ini_stack, chess_board_0x88_found_best_score, node_mm };