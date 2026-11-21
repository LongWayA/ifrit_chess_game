// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_nm_ab_0x88.js
 * @version created 16.05m.2026 
 * Code review: Qwen3.7-Max AI, Gemini 4 Hydrogen
*/

/**
* НАЗНАЧЕНИЕ

*/

import {
  x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
  test_print_any_0x88_cb, test_print_piece_0x88_cb, test_print_piece_color_0x88_cb, test_print_piece_in_line_0x88_cb,
  test_compare_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb,
  searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
  s_0x88_out_of_bounds_cb, get_piece_color_cb, get_piece_type_cb, test_print_piece_0x88_f_cb,
  //create_piece_cb,
  BOARD_SIZE_CB, OUT_OF_BOUNDS_MASK_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
  BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
  B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
  IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB,
  IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
  SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_list_ml, add_packing_move_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml, set_color_ml,
  set_number_captures_move_ml, sorting_list_ml, test_compare_list_from_ml, test_print_i_move_list_ml, test_print_list_ml,
  save_list_from_ml, move_is_found_ml, return_i_move_ml, move_to_string_uci_ml, return_type_captures_pawn_promo_ml,
  return_type_simple_move_ml, type_move_to_name_piece_ml, type_move_to_name_piece_f_ml, return_promo_piece_from_type_move_ml,
  set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml, test_print_list_history_ml,
  LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
  IND_PROMO_QUEEN_ML, IND_PROMO_ROOK_ML, IND_PROMO_BISHOP_ML, IND_PROMO_KNIGHT_ML,
  MOVE_NO_ML, CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML, CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
  CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML, CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML, CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
  CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML, CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML, CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
  CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML, CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
  CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML, CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML,
  CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML, MOVE_PAWN_PROMO_QUEEN_ML, MOVE_PAWN_PROMO_ROOK_ML, MOVE_PAWN_PROMO_BISHOP_ML,
  MOVE_PAWN_PROMO_KNIGHT_ML, CAPTURES_PAWN_QUEEN_ML, CAPTURES_PAWN_ROOK_ML, CAPTURES_PAWN_BISHOP_ML, CAPTURES_PAWN_KNIGHT_ML,
  CAPTURES_KNIGHT_QUEEN_ML, CAPTURES_KNIGHT_ROOK_ML, CAPTURES_BISHOP_QUEEN_ML, CAPTURES_BISHOP_ROOK_ML, CAPTURES_ROOK_QUEEN_ML,
  CAPTURES_KNIGHT_BISHOP_ML, CAPTURES_KNIGHT_KNIGHT_ML, CAPTURES_BISHOP_BISHOP_ML, CAPTURES_BISHOP_KNIGHT_ML, CAPTURES_ROOK_ROOK_ML,
  CAPTURES_QUEEN_QUEEN_ML, CAPTURES_ROOK_BISHOP_ML, CAPTURES_ROOK_KNIGHT_ML, CAPTURES_QUEEN_ROOK_ML, CAPTURES_QUEEN_BISHOP_ML,
  CAPTURES_QUEEN_KNIGHT_ML, CAPTURES_KING_QUEEN_ML, CAPTURES_KING_ROOK_ML, CAPTURES_KING_BISHOP_ML, CAPTURES_KING_KNIGHT_ML,
  CAPTURES_PAWN_PAWN_ML, EP_CAPTURES_ML, CAPTURES_KNIGHT_PAWN_ML, CAPTURES_BISHOP_PAWN_ML, CAPTURES_ROOK_PAWN_ML,
  CAPTURES_QUEEN_PAWN_ML, CAPTURES_KING_PAWN_ML, MOVE_QUEEN_ML, MOVE_ROOK_ML, MOVE_BISHOP_ML, MOVE_KNIGHT_ML, MOVE_KING_ML, MOVE_PAWN_ML,
  MOVE_DOUBLE_PAWN_ML, MOVE_KING_CASTLE_ML, MOVE_KING_QUEEN_CASTLE_ML, TYPE_MOVE_NAME_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
  add_move_to_pv_line_pv, save_pv_line_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV
} from "../core_0x88_t/pv_line_0x88.js";

import {
  generated_pseudo_legal_captures_mgc, check_detected_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm, do_null_move_mm} from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";

import { score_position_e } from "../evaluate_0x88/evaluate_0x88.js";

import {
  set_key_from_board_0x88_tk, test_chess_board_key_64_tk, key_update_side_0x88_tk
} from "../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

import { qs_quiescence_search } from "../quiescence_search_0x88/quiescence_search_0x88.js";

import { add_move_kh, MAX_DEPTH_KH } from "../heuristic_0x88/killer_heuristic_0x88/killer_heuristic_0x88.js";

import { history_good_save_hh, get_history_hh } from "../heuristic_0x88/history_heuristic_0x88/history_heuristic_0x88.js";

import {
  clear_out_tt, ini_tt, clear_hash_tt, test_uses_hash_tt, set_position_in_tt, get_position_from_tt, print_test_set_get_position_tt,
  MAX_TABLE_LENTH_TT, MAX_SCORE_UPDATE_TT, ALPHA_UPDATE_TT, BETA_CUT_TT, IND_TN_TT, IND_SC_TT, IND_DD_TT, TT_IS_TEST_FEN
} from "../heuristic_0x88/transposition_table_0x88/transposition_table_0x88.js";


// TESTS ////////////////////////////////////////////
//const IS_TEST_KEY_64 = true;//
const IS_TEST_KEY_64 = false; //

//const AB_IS_TEST_BOARD_SCORE = true;//
const AB_IS_TEST_BOARD_SCORE = false;//
//////////////////////////////////////////// TESTS

const IS_EVALUATE_USE = true;// 
//const IS_EVALUATE_USE = false;// 

const IS_QUIESCENCE_USE = true;// используем просмотр выгодных взятий до конца
//const IS_QUIESCENCE_USE = false;// используем просмотр выгодных взятий до конца

const IS_AB_USE = true;// используем альфа-бета оптимизацию
//const IS_AB_USE = false;// используем альфа-бета оптимизацию

const IS_KILLER_USE = true;// is_killer_heuristic_use_ab   использование двух киллеров, т.е. лучших ходов на этой глубине
//const IS_KILLER_USE = false;// is_killer_heuristic_use_ab   использование двух киллеров, т.е. лучших ходов на этой глубине

const IS_HISTORY_USE = true;// использование сортировки по частоте отсечений.
//const IS_HISTORY_USE = false;// использование сортировки по частоте отсечений.

let IS_TT_USE = true;// сортировка и отсечка по таблице перестановок(хеш-таблице)
//let IS_TT_USE = false;// сортировка и отсечка по таблице перестановок(хеш-таблице)

const IS_PVS_USE = true;// 
//const IS_PVS_USE = false;// 

const IS_LMR_USE = true;//
//const IS_LMR_USE = false;//

const IS_NMP_USE = true; // Null Move Pruning
//const IS_NMP_USE = false; // 

//const IS_CHECK_EXT_USE = true; // Check Extensions (продление поиска при шахе)
const IS_CHECK_EXT_USE = false;

const IS_RFP_USE = true; // Reverse Futility Pruning (отсечение по статической оценке)
//const IS_RFP_USE = false;

const IS_LMR_HISTORY_USE = true; // Учёт таблицы истории при расчёте редукции LMR
//const IS_LMR_HISTORY_USE = true; 

//////////////////////////////

// это два киллера
let packing_moves_k1 = new Int32Array(MAX_DEPTH_KH).fill(MOVE_NO_ML);// список ходов. ход упакован в одно число Uint32
let packing_moves_k2 = new Int32Array(MAX_DEPTH_KH).fill(MOVE_NO_ML);// список ходов. ход упакован в одно число Uint32

// test_tt
let ab_save_alpha_up_test_tt = 0;
let ab_save_beta_cut_test_tt = 0;
//let save_score_up_test_tt = 0;

let ab_use_alpha_up_test_tt = 0;
let ab_use_beta_cut_test_tt = 0;
//let use_score_test_tt = 0;

let ab_use_alpha_up_not_move_test_tt = 0;

const ab_clear_test_tt = function () {
  ab_save_alpha_up_test_tt = 0;//
  ab_save_beta_cut_test_tt = 0;//
  //save_score_up_test_tt = 0;

  ab_use_alpha_up_test_tt = 0;//
  ab_use_beta_cut_test_tt = 0;
  //use_score_test_tt = 0;

  ab_use_alpha_up_not_move_test_tt = 0;
}

/////////////////////////////////////////////
// FULL SEARCH

// максимум который в принципе не достижим для полного перебора.
const MAX_DEPTH_SEARCH = 129;

let chess_board_undo_stack = new Array(MAX_DEPTH_SEARCH);// для каждой глубины записанная позиция. что бы восстановить 
// позицию после выныривания с глубины
// AB_IS_TEST_BOARD_SCORE
let chess_board_save_stack_score = new Array(MAX_DEPTH_SEARCH);// позиция соответствующая найденной оценке 


let chess_board_key_64_undo_stack = new Array(MAX_DEPTH_SEARCH);// для каждой глубины записанный ключ. что бы восстановить 
// ключ после выныривания с глубины

// что бы не создавать масивы во время поиска делаем массив массивов к которым обращаемся по глубине
// таким образом это стек. у нас не дерево позиций а линия позиций с доступом по глубине
let packing_moves_stack = new Array(MAX_DEPTH_SEARCH); // стек массива списков запакованых ходов
// для каждой позиции есть список ходов. мы его насчитываем.

let best_packing_pv_line_stack = new Array(MAX_DEPTH_SEARCH);// тут линии варинтов которые тоже вертикальные по глубине

// FULL SEARCH
/////////////////////////////////////////////

let packing_move_arr_stack = new Array(MAX_DEPTH_SEARCH);
let out_tt_stack = new Array(MAX_DEPTH_SEARCH);


/* =========================================================================
 * СТЕКИ
 *  Мы идём по дереву вариантов, но храним не дерево, а ЛИНИЮ позиций:
 *  на каждую глубину свой набор буферов. Поэтому во время поиска нет
 *  ни одной аллокации — всё создано один раз в ini_stack().
 * ========================================================================= */
// ini
const ab_ini_stack = () => {

  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {

    /////////////////////////////////////////////
    // FULL SEARCH

    chess_board_undo_stack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);// записанная доска

    // AB_IS_TEST_BOARD_SCORE
    chess_board_save_stack_score[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);// позиция соответствующая найденной оценке

    // массивом в том числе что бы передавать как ссылочный параметр
    chess_board_key_64_undo_stack[depth] = new BigUint64Array(1);// записанный ключ

    packing_moves_stack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML); // в списке индексы массива 
    // от 0 до 256 зарезервированы для упакованого хода

    best_packing_pv_line_stack[depth] = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);// записанная линия варианта

    // FULL SEARCH
    /////////////////////////////////////////////

    packing_move_arr_stack[depth] = new Int32Array(1).fill(MOVE_NO_ML);
    out_tt_stack[depth] = [-1, -1, -1];

  }
}

// FULL SEARCH/////////////////////////////////////////////
// IS_TEST_KEY_64
// тестируем ключи. этот генерируем прямо из позиции. что бы потом сравнить с тем что изменяется во время поиска
let chess_board_key_64_test = new BigUint64Array(1);

const MATE = -30000;
///////////////////////////////////////////// FULL SEARCH

// AB SEARCH/////////////////////////////////////////////
const AB_INIT_EVAL = -40000;// матовая оценка всегда должна обновлять INIT_EVAL 
// и при - и при + на следющей глубине поиска (-30000 > -40000) и (30000 > -40000)
///////////////////////////////////////////// AB SEARCH SEARCH

/**
 * searching_alpha_beta_fail_soft
 * @param {number} alpha
 * @param {number} beta
 * @param {Int32Array} chess_board_0x88 - позиция
 * @param {Int32Array} chess_board_0x88_score - позиция 
 * @param {BigUint64Array} chess_board_key_64 - зобрист ключ позиции
 * @param {Int32Array} packing_pv_line - линия варианта лучшая на данный момент
 * @param {number} depth - текущая глубина поиска
 * @param {number} depth_max - максимальная глубина поиска
 * @param {Int32Array} node_mm - 
 * @param {number} isPV
 * @returns {number} - оценка позиции
 */
const ab_searching_negamax_alpha_beta_id = (alpha, beta, chess_board_0x88, chess_board_0x88_score, chess_board_key_64, packing_pv_line,
  depth, depth_max, node_mm, isPV, allow_null = 1) => {

  const chess_board_0x88_undo = chess_board_undo_stack[depth];

  // AB_IS_TEST_BOARD_SCORE
  const chess_board_0x88_save_score = chess_board_save_stack_score[depth];

  const chess_board_key_64_undo = chess_board_key_64_undo_stack[depth];

  const packing_moves = packing_moves_stack[depth];
  const best_packing_pv_line = best_packing_pv_line_stack[depth];

  let score = 0;// текущая оценка позиции
  let found_score;// максимальная найденная в данном узле оценка позиции
  let update_alpha = -1;// номер хода который обновил максимальную оценку

  let is_moove_legal = -1;// есть ли легальные ходы
  let number_move_legal = 0;// колличество легальных ходов  

  let type_move;// тип хода
  let from; // откуда ход
  let to;// куда ход

  let piece_color;// цвет ходящей фигуры или стороны

  let type_move_killer;// тип хода, проверяем что ход не взятие перед записью в киллер

  let out_tt = out_tt_stack[depth];

  let packing_move_arr_tt = packing_move_arr_stack[depth];// список ходов. ход упакован в одно число Uint32

  let fen = "";

  let isPVnode = 0;

  let in_check = false;

  // Определяем, находится ли наш король под шахом (нужно для Check Extensions, LMR и NMP)
  if (IS_CHECK_EXT_USE || IS_LMR_USE || IS_NMP_USE) {
    const my_color = chess_board_0x88[SIDE_TO_MOVE_CB];
    const my_king_sq = (my_color == WHITE_CB)
      ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
      : chess_board_0x88[IND_KING_FROM_BLACK_CB];

    in_check = (check_detected_mgc(my_king_sq, my_color, chess_board_0x88) != 0);
  }

  // Продление глубины на 1 полуход, если мы под шахом
  if (IS_CHECK_EXT_USE && in_check && depth < (MAX_DEPTH_SEARCH - 2)) {
    depth_max = depth_max + 1;
  }

  // достигли предельной глубины. вызываем статичискую оценку позиции
  if (depth >= depth_max) {

    //
    if (IS_QUIESCENCE_USE) {
      found_score = qs_quiescence_search(alpha, beta, chess_board_0x88, chess_board_key_64, depth);
    } else {
      if (IS_EVALUATE_USE) {
        // по входящей позиции генерируем ее оценку
        found_score = score_position_e(chess_board_0x88);
      } else {
        found_score = 0;
      }
    }
    //console.log("searching_negamax->found_score " + found_score);

    node_mm[0] = node_mm[0] + 1;

    // TEST
    if (AB_IS_TEST_BOARD_SCORE) {
      chess_board_0x88_score.set(chess_board_0x88);
    }

    // TEST
    if (IS_TEST_KEY_64) {
      // сравниваем ключи сохраненный и измененный
      // тестируем ключи. этот генерируем прямо из позиции. что бы потом сравнить с тем что изменяется во время поиска
      set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_test);
      test_chess_board_key_64_tk(chess_board_key_64_test, chess_board_key_64);
    }

    return found_score;

  }
  //console.log("searching_negamax->depth " + depth);

  // используем хеш таблицу ====================================================   
  if (IS_TT_USE) {

    // ищем позицию в хеш таблице
    // *************************************************************************************************************fen
    if (TT_IS_TEST_FEN) {
      fen = set_fen_from_0x88_cb(chess_board_0x88);
      out_tt = get_position_from_tt(chess_board_key_64, packing_move_arr_tt, depth, depth_max, fen);
    } else {
      out_tt = get_position_from_tt(chess_board_key_64, packing_move_arr_tt, depth, depth_max);
    }

    if (out_tt[IND_TN_TT] == BETA_CUT_TT) {// если узел был записан при отсечеке по бете

      if (out_tt[IND_SC_TT] >= beta) {// проверяем что оценка действительно вызывает отсечку 

        if (TT_IS_TEST_FEN) {
          ab_use_beta_cut_test_tt = ab_use_beta_cut_test_tt + 1;
        }

        return out_tt[IND_SC_TT];
      }
    }
  }
  // ==================================================== используем хеш таблицу   

  // LMR======================================================
  // if (IS_LMR_USE || IS_NMP_USE) {
  //   const my_color = chess_board_0x88[SIDE_TO_MOVE_CB];
  //   const my_king_sq = (my_color == WHITE_CB)
  //     ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
  //     : chess_board_0x88[IND_KING_FROM_BLACK_CB];

  //   in_check = (check_detected_mgc(my_king_sq, my_color, chess_board_0x88) != 0);
  // }
  //===========================================================

  // REVERSE FUTILITY PRUNING =============================================
  if (IS_RFP_USE && IS_EVALUATE_USE && !in_check && isPV == 0) {
    const remaining_depth = depth_max - depth;

    if (remaining_depth > 0 && remaining_depth <= 3) {
      const static_eval = score_position_e(chess_board_0x88);
      // Запас прочности (margin): 120 сантипешек на каждый оставшийся полуход
      const rfp_margin = 120 * remaining_depth;

      if ((static_eval - rfp_margin) >= beta) {
        return static_eval - rfp_margin; // Fail-soft возврат
      }
    }
  }
  // ============================================= REVERSE FUTILITY PRUNING



  // NULL MOVE PRUNING ====================================================
  if (IS_NMP_USE && allow_null == 1 && !in_check && isPV == 0 && (depth_max - depth) >= 3) {
    const my_color = chess_board_0x88[SIDE_TO_MOVE_CB];

    if (has_non_pawn_material_ab(chess_board_0x88, my_color)) {
      // 1. Сохраняем доску и ключ в стек текущей глубины
      chess_board_0x88_undo.set(chess_board_0x88);
      chess_board_key_64_undo[0] = chess_board_key_64[0];

      // 2. Делаем нулевой ход
      do_null_move_mm(chess_board_0x88, chess_board_key_64);

      // 3. Редукция R = 2 (или 3 при большой глубине)
      const R = ((depth_max - depth) >= 6) ? 3 : 2;
      let next_depth = depth + 1 + R;
      if (next_depth >= depth_max) next_depth = depth_max;

      // 4. Ищем с нулевым окном (-beta, -beta + 1) и запретом повторного null move (allow_null = 0)
      const null_score = -ab_searching_negamax_alpha_beta_id(
        -beta, -beta + 1,
        chess_board_0x88, chess_board_0x88_score,
        chess_board_key_64, packing_pv_line,
        next_depth, depth_max, node_mm, 0, 0
      );

      // 5. Восстанавливаем доску и ключ
      chess_board_0x88.set(chess_board_0x88_undo);
      chess_board_key_64[0] = chess_board_key_64_undo[0];

      // 6. Если оценка >= beta — отсекаем ветку
      if (null_score >= beta) {
        // Не возвращаем недоказанный мат из редуцированного поиска
        if (null_score >= 29000) return beta;
        return null_score;
      }
    }
  }
  // ==================================================== NULL MOVE PRUNING

  found_score = AB_INIT_EVAL;// минимальная стартовая оценка позиции

  // сгенерировали список ходов тут и взятия и тихие ходы
  generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);

  // сортировка по взятиям и типу других ходов
  sorting_list_ml(packing_moves);

  // используем историю ====================================================    
  // сортировка по истории
  if (IS_HISTORY_USE) {
    // console.log("1 Search_0x88_C->NOT SORTING HIS depth " + depth);
    //  move_list_0x88_O.test_print_list(chess_board_0x88_O);
    sorting_list_history_heuristic_ml(packing_moves, get_history_hh());
    // console.log("1 Search_0x88_C->SORTING HIS depth " + depth);
    // move_list_0x88_O.test_print_list(chess_board_0x88_O);
  }
  //==================================================== используем историю 

  // используем киллеры ==================================================== 
  if (IS_KILLER_USE) {
    // если второй киллер записан то выводим его на позицию после взятий
    if (packing_moves_k2[depth] != 0) {

      set_move_after_the_captures_ml(packing_moves, packing_moves_k2, depth);
      //test_print_list(packing_moves);
      //console.log("Search_0x88_C->type_move[0] после " + move_list_0x88_O.type_move[0]);
    };

    // если первый киллер записан то выводим его на позицию после взятий и перед вторым   
    if (packing_moves_k1[depth] != 0) {
      // console.log(" киллер depth " + depth + " k1= " + packing_moves_k1[depth]);
      // console.log(" киллер depth " + depth + " k2= " + packing_moves_k2[depth]);
      // test_print_i_move_list(depth, packing_moves_k1);
      // console.log("до вставки киллера depth " + depth);
      // test_print_list(packing_moves);
      set_move_after_the_captures_ml(packing_moves, packing_moves_k1, depth);
      // console.log("после вставки киллера depth " + depth);
      // test_print_list(packing_moves);
      //console.log("Search_0x88_C->type_move[0] после " + move_list_0x88_O.type_move[0]);
    };
  }
  // ==================================================== используем киллеры

  // используем хеш таблицу ====================================================
  // 
  if (IS_TT_USE) {
    // if (out_tt[IND_TN_TT] == ALPHA_UPDATE_TT){
    if ((out_tt[IND_TN_TT] == ALPHA_UPDATE_TT) || (out_tt[IND_TN_TT] == BETA_CUT_TT)) {

      if (TT_IS_TEST_FEN) {
        let test_set_move = set_move_in_0_ml(packing_moves, packing_move_arr_tt);
        if (test_set_move == 0) {
          if (packing_moves[0] != packing_move_arr_tt[0]) {
            console.log("ХОД ИЗ КЕШ ТАБЛИЦЫ НЕ СТАЛ ПЕРВЫМ! ");
            console.log("set_move_in_0_ml packing_moves[0] = " + packing_moves[0]); IND_PIECE_COLOR_ML
            console.log("set_move_in_0_ml packing_moves[0] color = " + packing_moves[IND_PIECE_COLOR_ML]);
            console.log("set_move_in_0_ml packing_move_arr_tt[0] = " + packing_move_arr_tt[0]);
            console.log("set_move_in_0_ml test_set_move = " + test_set_move);
            console.log("set_move_in_0_ml ab_use_alpha_up_test_tt + 1 = " + ab_use_alpha_up_test_tt + 1);
            console.log("set_move_in_0_ml depth " + depth);
          }
        }

        if (test_set_move == -1) {
          ab_use_alpha_up_not_move_test_tt = ab_use_alpha_up_not_move_test_tt + 1;
        }
        ab_use_alpha_up_test_tt = ab_use_alpha_up_test_tt + 1;
      } else {
        set_move_in_0_ml(packing_moves, packing_move_arr_tt);
      }
    }
  }
  //==================================================== используем хеш таблицу


  // бежим по списку избыточных ходов
  for (let move_number = 0; move_number < packing_moves[IND_NUMBER_MOVE_ML]; move_number++) {

    chess_board_0x88_undo.set(chess_board_0x88);// записали позицию
    chess_board_key_64_undo[0] = chess_board_key_64[0];// записали зобрист ключ позиции

    type_move = get_type_move_ml(move_number, packing_moves);// тип хода
    from = get_from_ml(move_number, packing_moves);
    to = get_to_ml(move_number, packing_moves);
    piece_color = packing_moves[IND_PIECE_COLOR_ML];

    // делаем ход
    is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, piece_color);


    if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
      chess_board_0x88.set(chess_board_0x88_undo);// восстановили позицию
      chess_board_key_64[0] = chess_board_key_64_undo[0];// восстановили зобрист ключ позиции
      continue;

    } else if (is_moove_legal == 2) {// нелегальные рокировки и взятия короля не генерируются. просто пропускаем ход
      continue;
    }

    // добавляем ход в линию варианта. дальше мы будем спускатья вниз и этот ход уже должнен быть записан, а иначе как
    //  нижние узлы узнают какой ход привел к ним.
    add_move_to_pv_line_pv(move_number, packing_moves, packing_pv_line, depth);

    number_move_legal = number_move_legal + 1;

    if (!IS_PVS_USE) {
      score = -ab_searching_negamax_alpha_beta_id(-beta, -alpha, chess_board_0x88, chess_board_0x88_score,
        chess_board_key_64, packing_pv_line, (depth + 1), depth_max, node_mm, isPV);
    }

    /////////////////////////////////////////////
    // LMR======================================================
    if (IS_LMR_USE) {
      const remaining_depth = depth_max - depth;
      const is_quiet = (type_move >= MOVE_QUEEN_ML && type_move <= MOVE_DOUBLE_PAWN_ML);
      const current_move = packing_moves[move_number];
      const is_killer = (current_move === packing_moves_k1[depth]) || (current_move === packing_moves_k2[depth]);

      if (IS_PVS_USE) {
        if ((move_number == 0) && (isPV == 1)) {
          isPVnode = 1;
          score = -ab_searching_negamax_alpha_beta_id(-beta, -alpha, chess_board_0x88, chess_board_0x88_score,
            chess_board_key_64, packing_pv_line, (depth + 1), depth_max, node_mm, isPVnode);
        } else {
          isPVnode = 0;
          let reduction = 0;

          // Предварительная проверка условий LMR (без вызова check_detected_mgc)
          if (IS_LMR_USE && !in_check && isPV == 0 && remaining_depth >= 3 && number_move_legal >= 4 && is_quiet && !is_killer) {

            // Проверяем, не поставил ли наш ход шах сопернику (после do_moves_mm сторона хода уже сменилась)
            const opp_color = chess_board_0x88[SIDE_TO_MOVE_CB];
            const opp_king_sq = (opp_color == WHITE_CB)
              ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
              : chess_board_0x88[IND_KING_FROM_BLACK_CB];
            const gives_check = (check_detected_mgc(opp_king_sq, opp_color, chess_board_0x88) != 0);

            // if (!gives_check) {
            //   reduction = 1;
            //   if (remaining_depth >= 6 && number_move_legal >= 10) {
            //     reduction = 2;
            //   }
            //   // Не перепрыгиваем depth_max, чтобы не уйти сразу в оценку без QS или с отрицательной глубиной
            //   if (depth + 1 + reduction >= depth_max) {
            //     reduction = depth_max - depth - 1;
            //   }
            // }

//////////////
            if (!gives_check) {
              reduction = 1;
              if (remaining_depth >= 6 && number_move_legal >= 10) {
                reduction = 2;
              }

              // Корректируем редукцию по таблице истории (History Heuristic)
              if (IS_LMR_HISTORY_USE && IS_HISTORY_USE) {
                const history_table = get_history_hh();
                const hist_idx = (piece_color << 12) | (SQUARE_128_to_64_CB[from] << 6) | SQUARE_128_to_64_CB[to];
                const hist_score = history_table[hist_idx];

                // Если ход зарекомендовал себя хорошо (часто вызывал отсечки) — режем меньше
                if (hist_score > 0) {
                  reduction = reduction - 1;
                }
                // Если история нулевая на глубоких узлах — можно резать смелее
                else if (hist_score === 0 && remaining_depth >= 4 && number_move_legal >= 6) {
                  reduction = reduction + 1;
                }
              }

              // Защита границ редукции
              if (reduction < 0) reduction = 0;
              if (depth + 1 + reduction >= depth_max) {
                reduction = depth_max - depth - 1;
              }
            }


//////////////

          }

          // 1. Поиск с нулевым окном (с редукцией или без)
          score = -ab_searching_negamax_alpha_beta_id(-alpha - 1, -alpha, chess_board_0x88, chess_board_0x88_score,
            chess_board_key_64, packing_pv_line, (depth + 1 + reduction), depth_max, node_mm, isPVnode);

          // 2. Пересчет на полной глубине с нулевым окном, если редуцированный ход оказался хорошим
          if (reduction > 0 && score > alpha) {
            score = -ab_searching_negamax_alpha_beta_id(-alpha - 1, -alpha, chess_board_0x88, chess_board_0x88_score,
              chess_board_key_64, packing_pv_line, (depth + 1), depth_max, node_mm, isPVnode);
          }

          // 3. Полный пересчет окна для PV-узла (если сработает на move_number > 0 при isPV == 1)
          if ((score > alpha) && (score < beta)) {
            isPVnode = 1;
            score = -ab_searching_negamax_alpha_beta_id(-beta, -alpha, chess_board_0x88, chess_board_0x88_score,
              chess_board_key_64, packing_pv_line, (depth + 1), depth_max, node_mm, isPVnode);
          }
        }
      }

      /////////////////////////////////////////////
    } else {

      if (IS_PVS_USE) {
        if ((move_number == 0) && (isPV == 1)) {// проверка (isPV == 1) нужна потому что тут мы задаем isPVnode = 1;
          // Первый ход считаем с полным окном если мы на главной линии
          isPVnode = 1;
          score = -ab_searching_negamax_alpha_beta_id(-beta, -alpha, chess_board_0x88, chess_board_0x88_score,
            chess_board_key_64, packing_pv_line, (depth + 1), depth_max, node_mm, isPVnode);
        } else {
          // Остальные — с нулевым окном (проверка, хуже ли они)
          isPVnode = 0;
          score = -ab_searching_negamax_alpha_beta_id(-alpha - 1, -alpha, chess_board_0x88, chess_board_0x88_score,
            chess_board_key_64, packing_pv_line, (depth + 1), depth_max, node_mm, isPVnode);

          if ((score > alpha) && (score < beta)) {
            // Если ход оказался лучше alpha (и не вызвал бета-отсечение),
            // делаем полный пересчет
            isPVnode = 1;
            score = -ab_searching_negamax_alpha_beta_id(-beta, -alpha, chess_board_0x88, chess_board_0x88_score,
              chess_board_key_64, packing_pv_line, (depth + 1), depth_max, node_mm, isPVnode);
          }
        }
      }
    }

    //Fail-Soft Alpha-Beta
    if (score > found_score) {
      found_score = score;

      //console.log("Search_0x88_C->score > max_score depth " + depth + " found_score " + found_score);

      //
      if (IS_AB_USE) {

        // lower bound
        if (score >= beta) {
          // используем киллеры ==================================================== 
          if (IS_KILLER_USE) {
            type_move_killer = get_type_move_ml(move_number, packing_moves);
            if (type_move_killer > CAPTURES_KING_PAWN_ML) {// ход не взятие
              add_move_kh(packing_moves, packing_moves_k1, packing_moves_k2, move_number, depth);

              // console.log(" вставили киллер для белых depth " + depth + " k= " + packing_moves[move_i]);
              // console.log(" киллер depth " + depth + " k1= " + packing_moves_k1[depth]);
              // console.log(" киллер depth " + depth + " k2= " + packing_moves_k2[depth]);
              // test_print_i_move_list(move_i, packing_moves);                
            }
          }
          // ==================================================== используем киллеры

          // используем историю ====================================================    
          if (IS_HISTORY_USE) {
            // записываем ход в историю
            type_move_killer = get_type_move_ml(move_number, packing_moves);
            if (type_move_killer > CAPTURES_KING_PAWN_ML) {// ход не взятие

              history_good_save_hh(move_number, packing_moves, depth, depth_max);
            }
          }
          //==================================================== используем историю 


          // используем хеш таблицу ====================================================
          if (IS_TT_USE) {
            // записываем ход в хеш  
            // *************************************************************************************************************fen
            if (TT_IS_TEST_FEN) {
              fen = set_fen_from_0x88_cb(chess_board_0x88_undo);//_undo
              set_position_in_tt(chess_board_key_64_undo, packing_moves, BETA_CUT_TT, score, depth, depth_max, move_number, fen);
              ab_save_beta_cut_test_tt = ab_save_beta_cut_test_tt + 1;
            } else {
              set_position_in_tt(chess_board_key_64_undo, packing_moves, BETA_CUT_TT, score, depth, depth_max, move_number);
            }
          }
          //==================================================== используем хеш таблицу

          return score;   // 
        }// if (score >= beta) {

        if (score > alpha) {
          alpha = score; //
          update_alpha = move_number;

          if (IS_PVS_USE) {
            // тут записываем в узловой кеш всю линию которая привела к такой оценке.
            // т.е. особо отмечу пишется линия от самого максимума глубины до верха. 
            // тут записаны все ходы приведшие к позиции с оценкой
            if (isPV == 1) save_pv_line_pv(best_packing_pv_line, packing_pv_line);

            // TEST
            if (AB_IS_TEST_BOARD_SCORE) {
              // с глубины вернулась не только оценка, но и позиция соответствующая оценки 
              // ее мы тоже записываем в узловой кеш
              if (isPV == 1) chess_board_0x88_save_score.set(chess_board_0x88_score);//записываем позицию соответствующую лучшей оценке
            }
          } else {
            // тут записываем в узловой кеш всю линию которая привела к такой оценке.
            // т.е. особо отмечу пишется линия от самого максимума глубины до верха. 
            // тут записаны все ходы приведшие к позиции с оценкой
            save_pv_line_pv(best_packing_pv_line, packing_pv_line);

            // TEST
            if (AB_IS_TEST_BOARD_SCORE) {
              // с глубины вернулась не только оценка, но и позиция соответствующая оценки 
              // ее мы тоже записываем в узловой кеш
              chess_board_0x88_save_score.set(chess_board_0x88_score);//записываем позицию соответствующую лучшей оценке
            }
          }

        }// if (score > alpha) {
      }


    }//if (score > found_score) {

    // восстановили позицию и ключ
    chess_board_0x88.set(chess_board_0x88_undo);
    chess_board_key_64[0] = chess_board_key_64_undo[0];


  }//for (let move_number = 0; move_number < move_list_0x88_O.number_move; move_number++) {

  // если во время поиска лучшую оценку обновили то записываем соответствующий ей вариант
  if (update_alpha != -1) {

    // используем хеш таблицу ====================================================
    if (IS_TT_USE) {
      // записываем ход в хеш 
      // *************************************************************************************************************fen
      // update_alpha содержит ход(move_number) приведший к улучшению альфы, в момент улчшения alpha = score
      if (TT_IS_TEST_FEN) {
        fen = set_fen_from_0x88_cb(chess_board_0x88_undo);
        set_position_in_tt(chess_board_key_64_undo, packing_moves, ALPHA_UPDATE_TT, alpha, depth, depth_max, update_alpha, fen);
        ab_save_alpha_up_test_tt = ab_save_alpha_up_test_tt + 1;
      } else {
        set_position_in_tt(chess_board_key_64_undo, packing_moves, ALPHA_UPDATE_TT, alpha, depth, depth_max, update_alpha);
      }
    }
    //==================================================== используем хеш таблицу


    if (IS_PVS_USE) {
      // тут мы вернем все ходы которые привели к лучшей в узле оценке. это ходы до финальной позиции 
      // которую оценили статически
      if (isPV == 1) save_pv_line_pv(packing_pv_line, best_packing_pv_line);

      // TEST
      if (AB_IS_TEST_BOARD_SCORE) {
        // а это та самая финальная позиция которую оценили статически
        if (isPV == 1) chess_board_0x88_score.set(chess_board_0x88_save_score);// возвращаем лучшую записанную позицию соотв. лучшей оценке
      }
    } else {
      // тут мы вернем все ходы которые привели к лучшей в узле оценке. это ходы до финальной позиции 
      // которую оценили статически
      save_pv_line_pv(packing_pv_line, best_packing_pv_line);

      // TEST
      if (AB_IS_TEST_BOARD_SCORE) {
        // а это та самая финальная позиция которую оценили статически
        chess_board_0x88_score.set(chess_board_0x88_save_score);// возвращаем лучшую записанную позицию соотв. лучшей оценке
      }
    }
  }

  //это мат или пат
  if (number_move_legal == 0) {

    // TEST
    if (AB_IS_TEST_BOARD_SCORE) {
      chess_board_0x88_score.set(chess_board_0x88);// возвращаем лучшую записанную позицию соотв. лучшей оценке
    }

    let mat = MATE + depth;

    if (chess_board_0x88[SIDE_TO_MOVE_CB] == WHITE_CB) {//

      // ход белых. а ходов нет. это 0 пат, если же белый король под шахом это мат
      if (check_detected_mgc(chess_board_0x88[IND_KING_FROM_WHITE_CB], WHITE_CB, chess_board_0x88) != 0) {

        //console.log("searching_alpha_beta_id_ab-> W chek ");

        // тут пишем глубину на которой записали последний ход варианта ведущего к мату
        // бежим по списку и используем "<=" а не "<" (let i = 0; i <= depth_max; i++)
        // почему depth - 1,  потому что на этой глубине мы ход не записывали
        // почему + 500 потому что если depth = 1 то получим 0, и не сработает детектор 
        // потому что только если значение != 0 мы считаем что мат. а 500 мы дальше отнимаем.
        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

        return mat;
      }

    } else {//if (chess_board_0x88_O.side_to_move == 1) {
      //  console.log("Search_0x88_C-> B pat ");
      if (check_detected_mgc(chess_board_0x88[IND_KING_FROM_BLACK_CB], BLACK_CB, chess_board_0x88) != 0) {

        //console.log("searching_alpha_beta_id_ab-> B chek ");

        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;//

        return mat;
      }

    }//if (chess_board_0x88_O.side_to_move == 1) {

    packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

    return 0;

  }// if (number_move_legal == 0) {

  return found_score;

}//searching_minmax(pv_line_0x88_O, chess_board_0x88,

/**
 * Проверяем, есть ли у стороны хотя бы одна фигура (конь, слон, ладья или ферзь)
 * Нужно для защиты от цугцванга при Null Move Pruning
 * @param {Int32Array} chess_board_0x88
 * @param {number} color - WHITE_CB (1) или BLACK_CB (0)
 * @returns {boolean}
 */
const has_non_pawn_material_ab = (chess_board_0x88, color) => {
  for (let sq = 0; sq < 128; sq++) {
    if ((sq & 0x88) === 0) {
      const piece = chess_board_0x88[sq];
      if (piece !== PIECE_NO_CB) {
        const piece_color = 1 - (piece >> 3);
        if (piece_color === color) {
          const piece_type = piece & 7;
          // 2 = конь, 3 = слон, 4 = ладья, 5 = ферзь
          if (piece_type >= 2 && piece_type <= 5) {
            return true;
          }
        }
      }
    }
  }
  return false;
};


export {
  ab_searching_negamax_alpha_beta_id, ab_ini_stack, ab_clear_test_tt,
  AB_INIT_EVAL, AB_IS_TEST_BOARD_SCORE,
  ab_save_alpha_up_test_tt, ab_save_beta_cut_test_tt, //save_score_up_test_tt,
  ab_use_alpha_up_test_tt, ab_use_beta_cut_test_tt, //use_score_test_tt,
  ab_use_alpha_up_not_move_test_tt
};