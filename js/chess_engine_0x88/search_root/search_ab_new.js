// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_0x88.js
 * @version created 31.01m.2026 
*/

import {
  x07_y07_to_0x88, s_0x88_to_x07, s_0x88_to_y07,
  test_print_any_0x88, test_print_piese_0x88, test_print_piese_color_0x88, test_print_piese_in_line_0x88, test_compare_chess_board_0x88,
  save_chess_board_0x88, set_board_from_fen_0x88, set_fen_from_0x88, searching_king, iniStartPositionForWhite,
  IND_MAX, SIDE_TO_MOVE, LET_COOR,
  BLACK, WHITE, PIECE_NO, W_PAWN, W_KNIGHT, W_BISHOP, W_ROOK, W_QUEEN, W_KING, B_PAWN, B_KNIGHT, B_BISHOP, B_ROOK, B_QUEEN, B_KING,
  IND_CASTLING_Q, IND_CASTLING_q, IND_CASTLING_K, IND_CASTLING_k,
  IND_EN_PASSANT_YES, IND_EN_PASSANT_TARGET_SQUARE, IND_KING_FROM_WHITE, IND_KING_FROM_BLACK
} from "../move_generator/chess_board_new.js";

import {
  clear_list, add_packing_move, get_type_move, get_from, get_to, get_name_capture_piece, set_color, set_number_captures_move,
  sorting_list_ml, test_compare_list_from, test_print_i_move_list, test_print_list, save_list_from, move_is_found,
  return_i_move, move_to_string_uci, return_type_captures_pawn_promo, return_type_simple_move,
  type_move_to_name_piese, type_move_to_name_piese_f, return_promo_piece_from_type_move, set_move_after_the_captures_ml,
  sorting_list_history_heuristic_ml,
  LENGTH_LIST, IND_PIESE_COLOR, IND_NUMBER_CAPTURES_MOVE, IND_NUMBER_MOVE,
  IND_PROMO_QUEEN, IND_PROMO_ROOK, IND_PROMO_BISHOP, IND_PROMO_KNIGHT,
  MOVE_NO, CAPTURES_PAWN_QUEEN_PROMO_QUEEN, CAPTURES_PAWN_ROOK_PROMO_QUEEN, CAPTURES_PAWN_BISHOP_PROMO_QUEEN,
  CAPTURES_PAWN_KNIGHT_PROMO_QUEEN, CAPTURES_PAWN_QUEEN_PROMO_ROOK, CAPTURES_PAWN_ROOK_PROMO_ROOK,
  CAPTURES_PAWN_BISHOP_PROMO_ROOK, CAPTURES_PAWN_KNIGHT_PROMO_ROOK, CAPTURES_PAWN_QUEEN_PROMO_BISHOP,
  CAPTURES_PAWN_ROOK_PROMO_BISHOP, CAPTURES_PAWN_BISHOP_PROMO_BISHOP, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP,
  CAPTURES_PAWN_QUEEN_PROMO_KNIGHT, CAPTURES_PAWN_ROOK_PROMO_KNIGHT, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT,
  CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT, MOVE_PAWN_PROMO_QUEEN, MOVE_PAWN_PROMO_ROOK, MOVE_PAWN_PROMO_BISHOP,
  MOVE_PAWN_PROMO_KNIGHT, CAPTURES_PAWN_QUEEN, CAPTURES_PAWN_ROOK, CAPTURES_PAWN_BISHOP, CAPTURES_PAWN_KNIGHT,
  CAPTURES_KNIGHT_QUEEN, CAPTURES_KNIGHT_ROOK, CAPTURES_BISHOP_QUEEN, CAPTURES_BISHOP_ROOK, CAPTURES_ROOK_QUEEN,
  CAPTURES_KNIGHT_BISHOP, CAPTURES_KNIGHT_KNIGHT, CAPTURES_BISHOP_BISHOP, CAPTURES_BISHOP_KNIGHT, CAPTURES_ROOK_ROOK,
  CAPTURES_QUEEN_QUEEN, CAPTURES_ROOK_BISHOP, CAPTURES_ROOK_KNIGHT, CAPTURES_QUEEN_ROOK, CAPTURES_QUEEN_BISHOP,
  CAPTURES_QUEEN_KNIGHT, CAPTURES_KING_QUEEN, CAPTURES_KING_ROOK, CAPTURES_KING_BISHOP, CAPTURES_KING_KNIGHT,
  CAPTURES_PAWN_PAWN, EP_CAPTURES, CAPTURES_KNIGHT_PAWN, CAPTURES_BISHOP_PAWN, CAPTURES_ROOK_PAWN,
  CAPTURES_QUEEN_PAWN, CAPTURES_KING_PAWN, MOVE_QUEEN, MOVE_ROOK, MOVE_BISHOP, MOVE_KNIGHT, MOVE_KING, MOVE_PAWN,
  MOVE_DOUBLE_PAWN, MOVE_KING_CASTLE, MOVE_KING_QUEEN_CASTLE, TYPE_MOVE_NAME
} from "../move_generator/move_list_new.js";

import {
  clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv, test_print_pv_line_pv, pv_line_to_uci_string_pv,
  MAX_DEPTH_PV, IND_TYPE_VARIANT_PV, IND_DEPTH_MAT_PV, IND_DEPTH_PV
} from "../move_generator/pv_line_new.js";

import {
  generated_pseudo_legal_captures, check_detected,
  H1, H8, A1, A8, E1, E8, F1, F8, G1, G8, D1, D8, C1, C8
} from "../move_generator/move_generator_captures_new.js";

import { generated_pseudo_legal_quiet_moves } from "../move_generator/move_generator_quiet_new.js";

import { do_moves_mm } from "../move_generator/make_move_new.js";
import { undo_moves_um } from "../move_generator/unmake_move_new.js";

import { UNDO_MAX } from "../move_generator/undo_new.js";

import { score_position, PAWN_SCORE_E} from "./evaluate_new.js";

import { quiescence_search } from "./quiescence_search_new.js";

import { clear_packing_moves_k, add_move_k, MAX_DEPTH_K, IND_DEPTH_K } from "../for_sorting_move/killer_heuristic_new.js";

import {
  ini_Array_hh, clear_history_hh, ini_test_history_hh, history_good_save_hh, history_bad_save_hh, get_history_hh,
  MAX_COLOR_HH, MAX_COORDINATE_HH, MAX_HISTORY_HH
} from "../for_sorting_move/history_heuristic_new.js";


/**
* НАЗНАЧЕНИЕ


*/

const MAT_SCORE_MOD_AB = 10000;
const BEST_SCORE_MOD_AB = 20000;

let node_ab = 0;// считаем узлы

///////////////////////////////////////
let is_quiescence_use = 1;// используем просмотр выгодных взятий до конца
let is_ab_use = 1;// используем альфа-бета оптимизацию

let is_PVS_use = 1;// использование полного поиска в основном варианте

// sorting
let is_killer_heuristic_use_ab = 1;// использование двух киллеров, т.е. лучших ходов на этой глубине
let is_history_heuristic_use_ab = 1;// использование сортировки по частоте отсечений. 
//let is_TT_use = 0;// сортировка и отсечка по таблице перестановок(хеш-таблице)

// pruning
let is_lmr_use = 1;// уменьшаем глубину поиска ходов после всех взятий и двух киллеров, но не меньше 4 полухода 
let is_razoring_use = 1;// не смотрим очень плохие для нас позиции. отключаем если нашли мат.
//let is_futility_pruning_use = 0;// not working

let stop_search = 0;

const set_stop_search_in_1_ab = function () {
  stop_search = 1;
}

const set_stop_search_in_0_ab = function () {
  stop_search = 0;
}

const set_node_in_0_ab = function () {
  node_ab = 0;
}

let packing_moves_k1 = new Uint32Array(MAX_DEPTH_K).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32
let packing_moves_k2 = new Uint32Array(MAX_DEPTH_K).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32

let chess_board_0x88_test = new Uint8Array(IND_MAX).fill(0);// записываем доску с ходом

let new_depth_max = 0;
let i_lmr = 0;


// searching_alpha_beta_fail_soft
/**
 * @param {number} alpha
 * @param {number} beta
 * @param {Uint8Array} chess_board_0x88
 * @param {Uint32Array} packing_pv_line 
 * @param {number} depth
 * @param {number} depth_max
 * @param {number} isPV
 * @returns {number}
 */

const searching_alpha_beta_id_ab = function (alpha, beta, chess_board_0x88, packing_pv_line, depth, depth_max, isPV) {

  let packing_moves = new Uint32Array(LENGTH_LIST).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32
  let best_packing_pv_line = new Uint32Array(MAX_DEPTH_PV).fill(MOVE_NO);// линия лучших ходов для конкретного узла
  let undo = new Uint8Array(UNDO_MAX).fill(0);// для отмены хода

  let number_move_legal = 0;

  let score = 0;// текущая оценка позиции
  let best_score = 0;// лучшая оценка позиции

  let type_move;// тип хода
  let from;// откуда ход
  let to;// куда ход
  let name_capture_piece;// имя взятой фигуры
  let piece_color;// цвет хода

  let is_moove_legal = -1;// является ли ход легальным
  let is_update_pv_line = 0;// максимальная оценка позиции    
  let isPV_node = 1;// является ли узел основным вариантом
  let type_move_k;

  // экстренный выход
  if (stop_search == 1) return 0;

  // поиск на максимальной глубине-----------------------------------
  if (depth >= depth_max) {

    if (is_quiescence_use == 0) {
      best_score = score_position(chess_board_0x88);
    } else {
      //this.quiescence_search_0x88_O.node = 0;
      save_chess_board_0x88(chess_board_0x88_test, chess_board_0x88);
      best_score = quiescence_search(alpha, beta, chess_board_0x88, depth);
      test_compare_chess_board_0x88(chess_board_0x88_test, chess_board_0x88);
      //node_ab = node_ab + node_qs;
    }
    node_ab = node_ab + 1;

    return best_score;
  }
  // -----------------------------------поиск на максимальной глубине

  // razoring ====================================================    
    if (is_razoring_use == 1) {

      if ((isPV == 0) && ((depth_max - depth) <= 5)) {

        score = score_position(chess_board_0x88);

        let raz = PAWN_SCORE_E * (depth_max - depth);

        if (chess_board_0x88[SIDE_TO_MOVE] == WHITE) {

          // если нашли мат то альфа настолько большая, что любые ходы режутся 
          // и вместо матовой оценки получаем обычную
          // что бы это предотвратить добавил условие 5000 > alpha.
          if (((score + raz) < alpha) && (5000 > alpha)) {

            score = quiescence_search(alpha, beta, chess_board_0x88, depth);

            if (score <= alpha) return score;
          }
        } else {

          if (((score - raz) > beta) && (-5000 < beta)) {

            score = quiescence_search(alpha, beta, chess_board_0x88, depth);

            if (score >= beta) return score;
          }
        }
      }
    }
    // ==================================================== razoring

  if (chess_board_0x88[SIDE_TO_MOVE] == WHITE) {
    best_score = -BEST_SCORE_MOD_AB;// максимальная оценка позиции
  } else {
    best_score = BEST_SCORE_MOD_AB;// максимальная оценка позиции
  }

  is_moove_legal = -1;

  //TEST
  //test_print_piese_0x88(chess_board_0x88);
  //test_print_any_0x88(chess_board_0x88);
  //out = out + 1;
  //console.log("in searching_alpha_beta_id->depth " + depth + " out " + out);

  generated_pseudo_legal_captures(chess_board_0x88, packing_moves);
  generated_pseudo_legal_quiet_moves(chess_board_0x88, packing_moves);


  // сортировка по взятиям и типу других ходов
  sorting_list_ml(packing_moves);


  // используем историю ====================================================    
  // сортировка по истории
  if (is_history_heuristic_use_ab == 1) {
    // console.log("1 Search_0x88_C->NOT SORTING HIS depth " + depth);
    //  move_list_0x88_O.test_print_list(chess_board_0x88_O);
    sorting_list_history_heuristic_ml(packing_moves, get_history_hh());
    // console.log("1 Search_0x88_C->SORTING HIS depth " + depth);
    // move_list_0x88_O.test_print_list(chess_board_0x88_O);
  }
  //==================================================== используем историю 

  // используем киллеры ====================================================
  if (is_killer_heuristic_use_ab == 1) {
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
  //==================================================== используем киллеры

    new_depth_max = depth_max;

    if (is_lmr_use == 1) {
      i_lmr = packing_moves[IND_NUMBER_CAPTURES_MOVE] + 2;//(3) взятия два киллера и тт ход не сокращаем 
    }


  for (let move_i = 0; move_i < packing_moves[IND_NUMBER_MOVE]; move_i++) {

    type_move = get_type_move(move_i, packing_moves);// тип хода
    from = get_from(move_i, packing_moves);
    to = get_to(move_i, packing_moves);
    name_capture_piece = get_name_capture_piece(move_i, packing_moves);
    piece_color = packing_moves[IND_PIESE_COLOR];

    is_moove_legal = do_moves_mm(chess_board_0x88, undo, type_move, from, to, piece_color);

    if (is_moove_legal == 0) { // король под шахом. отменяем ход и пропускаем этот цикл
      undo_moves_um(chess_board_0x88, undo, type_move, from, to, name_capture_piece, piece_color);
      continue;
    } else if (is_moove_legal == 2) {// нелегальные рокировки и взятия короля не генерируются. просто пропускаем ход
      continue;
    }

    add_move_to_pv_line_pv(move_i, packing_moves, packing_pv_line, depth);

    number_move_legal = number_move_legal + 1;

    if (is_PVS_use == 0) {
      isPV_node = 1;
      score = searching_alpha_beta_id_ab(alpha, beta, chess_board_0x88, packing_pv_line, (depth + 1), depth_max, isPV_node);
    }

    if (is_PVS_use == 1) {

      if ((move_i == 0) && (isPV == 1)) {
        isPV_node = 1;
        score = searching_alpha_beta_id_ab(alpha, beta, chess_board_0x88, packing_pv_line, (depth + 1), depth_max, isPV_node);

      } else {

        if (is_lmr_use == 1) {
          if ((move_i > i_lmr) && ((depth_max - depth) > 4)) new_depth_max = depth_max - 1;
        }

        if (packing_moves[IND_PIESE_COLOR] == WHITE) {
          isPV_node = 0;
          score = searching_alpha_beta_id_ab(alpha, (alpha + 1), chess_board_0x88, packing_pv_line, (depth + 1), new_depth_max, isPV_node);
        } else {
          isPV_node = 0;
          score = searching_alpha_beta_id_ab((beta - 1), beta, chess_board_0x88, packing_pv_line, (depth + 1), new_depth_max, isPV_node);
        }

        if ((score > alpha) && (score < beta)) {
          isPV_node = 1;
          //console.log("Search_0x88_C->depth " + depth + " пересчет ");
          score = searching_alpha_beta_id_ab(alpha, beta, chess_board_0x88, packing_pv_line, (depth + 1), depth_max, isPV_node);
        }
      }
    }


    // восстановили доску
    undo_moves_um(chess_board_0x88, undo, type_move, from, to, name_capture_piece, piece_color);

    if (packing_moves[IND_PIESE_COLOR] == WHITE) {

      // alpha < value < beta => exact value
      if (score > best_score) {

        best_score = score;

        if (is_ab_use == 1) {

          // lower bound
          if (score >= beta) {

            // записываем ход в историю color, from_128, to_128, depth, depth_max
            if (is_history_heuristic_use_ab == 1) {
              type_move_k = get_type_move(move_i, packing_moves);
              if (type_move_k > CAPTURES_KING_PAWN) {// ход не взятие

                history_good_save_hh(move_i, packing_moves, depth, depth_max);

                //this.test_hh.add_b_cnt_h_move = this.test_hh.add_b_cnt_h_move + 1;
              }
            }

            // записываем ход в киллер 
            if (is_killer_heuristic_use_ab == 1) {

              type_move_k = get_type_move(move_i, packing_moves);
              if (type_move_k > CAPTURES_KING_PAWN) {// ход не взятие
                add_move_k(packing_moves, packing_moves_k1, packing_moves_k2, move_i, depth);

                // console.log(" вставили киллер для белых depth " + depth + " k= " + packing_moves[move_i]);
                // console.log(" киллер depth " + depth + " k1= " + packing_moves_k1[depth]);
                // console.log(" киллер depth " + depth + " k2= " + packing_moves_k2[depth]);
                // test_print_i_move_list(move_i, packing_moves);                
              }
            }// if (is_killer_heuristic_use == 1) {

            return score;   // 
          }//

          if (score > alpha) {
            alpha = score; //

            if (isPV == 1) {
              save_pv_line_pv(best_packing_pv_line, packing_pv_line);
              is_update_pv_line = 1;
            }
          }

        } else {//if (this.is_ab_use == 1) {
          if (isPV == 1) {
            save_pv_line_pv(best_packing_pv_line, packing_pv_line);
            is_update_pv_line = 1;
          }
        }//if (this.is_ab_use == 1) {

      }//if (score > best_score) {

    } else {// if (packing_moves[IND_PIESE_COLOR] == WHITE) {

      if (score < best_score) {

        best_score = score;

        if (is_ab_use == 1) {

          // upper bound
          if (score <= alpha) {

            // записываем ход в киллер 
            if (is_killer_heuristic_use_ab == 1) {
              type_move_k = get_type_move(move_i, packing_moves)
              if (type_move_k > CAPTURES_KING_PAWN) {// ход не взятие
                add_move_k(packing_moves, packing_moves_k1, packing_moves_k2, move_i, depth);

                // console.log(" вставили киллер для черных depth " + depth + " k= " + packing_moves[move_i]);
                // console.log(" киллер depth " + depth + " k1= " + packing_moves_k1[depth]);
                // console.log(" киллер depth " + depth + " k2= " + packing_moves_k2[depth]);
                // test_print_i_move_list(move_i, packing_moves);
              }
            }

            return score;   // 
          }//

          if (score < beta) {
            beta = score; //

            if (isPV == 1) {
              save_pv_line_pv(best_packing_pv_line, packing_pv_line);
              is_update_pv_line = 1;
            }
          }

        } else {//if (is_ab_use == 1) {
          if (isPV == 1) {
            save_pv_line_pv(best_packing_pv_line, packing_pv_line);
            is_update_pv_line = 1;
          }
        }//if (is_ab_use == 1) {

      }// 

    }//if (chess_board_0x88_O.side_to_move == 1) {

  }//for (let move_i = 0; move_i < move_list_0x88_O.number_move; move_i++) {

  if (is_update_pv_line == 1) save_pv_line_pv(packing_pv_line, best_packing_pv_line);

  //это мат или пат
  if (number_move_legal == 0) {

    let mat = MAT_SCORE_MOD_AB - depth;

    if (chess_board_0x88[SIDE_TO_MOVE] == WHITE) {//

      // ход белых. а ходов нет. это 0 пат, если же белый король под шахом это мат
      if (check_detected(chess_board_0x88[IND_KING_FROM_WHITE], WHITE, chess_board_0x88) != 0) {

        //console.log("searching_alpha_beta_id_ab-> W chek ");

        // тут ход белых, но они выставляют минус. Потому что мат это максимально плохое событие 
        // для белых и оно должно быть с минимально возможной оценкой         
        mat = -1 * mat;

        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;


        return mat;
      }
      packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

      return 0;

    } else {//if (chess_board_0x88_O.side_to_move == 1) {
      //  console.log("Search_0x88_C-> B pat ");
      if (check_detected(chess_board_0x88[IND_KING_FROM_BLACK], BLACK, chess_board_0x88) != 0) {

        //console.log("searching_alpha_beta_id_ab-> B chek ");

        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;// обхожу ноль. так как на 1 глубине -> depth - 1 = 0

        return mat;
      }

      packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;

      return 0;
    }//if (chess_board_0x88_O.side_to_move == 1) {
  }// if (number_move_legal == 0) {

  return best_score;//best_score
}

export {
  searching_alpha_beta_id_ab, set_stop_search_in_1_ab, set_stop_search_in_0_ab, set_node_in_0_ab,
  node_ab, is_history_heuristic_use_ab,
  BEST_SCORE_MOD_AB
};

// from Alexandria_src=====================
// Reverse futility pruning -> (eval - futilityMargin) >= beta return (eval - futilityMargin)

// Razoring
//        if (depth <= 5 && eval + razoringCoeff() * depth < alpha){
//            const int razorScore = Quiescence<false>(alpha, beta, 0, td, ss);
//            if (razorScore <= alpha)
//                return razorScore; }

// Conditions to consider LMR. Calculate how much we should reduce the search depth.
//if (totalMoves > 1 && depth >= 3 && (isQuiet || !ttPv)) {

// =====================from Alexandria_src 

// from Stockfish_src=====================
// Step 4. Transposition table lookup
// Step 5. Tablebases probe
// Step 6. const evaluation of the position
// Step 7. Razoring
// If eval is really low, skip search entirely and return the qsearch value.
// For PvNodes, we must have a guard against mates being returned.
// if (!PvNode && eval < alpha - 514 - 294 * depth * depth)
//    return qsearch<NonPV>(pos, ss, alpha, beta);
// Step 8. Futility pruning: child node
// The depth condition is important for mate finding.
// if (!ss->ttPv && depth < 14 && eval - futility_margin(depth) >= beta && eval >= beta
//   && (!ttData.move || ttCapture) && !is_loss(beta) && !is_win(eval))
//    return (2 * beta + eval) / 3;
// Step 9. Null move search with verification search
// Step 10. Internal iterative reductions
// At sufficient depth, reduce depth for PV/Cut nodes without a TTMove.
// (*Scaler) Especially if they make IIR less aggressive.
// if (!allNode && depth >= 6 && !ttData.move && priorReduction <= 3)
// depth--;
// Step 11. ProbCut
// If we have a good enough capture (or queen promotion) and a reduced search
// returns a value much above beta, we can (almost) safely prune the previous move.
// Step 12. A small Probcut idea
// Step 13. Loop through all pseudo-legal moves until no moves remain
// or a beta cutoff occurs.
// Step 14. Pruning at shallow depth.
// Depth conditions are important for mate finding.
// Step 15. Extensions
// Singular extension search. If all moves but one
// fail low on a search of (alpha-s, beta-s), and just one fails high on
// (alpha, beta), then that move is singular and should be extended. To
// verify this we do a reduced search on the position excluding the ttMove
// and if the result is lower than ttValue minus a margin, then we will
// extend the ttMove. Recursive singular search is avoided.

// (*Scaler) Generally, higher singularBeta (i.e closer to ttValue)
// and lower extension margins scale well.
// Step 16. Make the move
// Step 17. Late moves reduction / extension (LMR)
//if (depth >= 2 && moveCount > 1)
//{
// In general we want to cap the LMR depth search at newDepth, but when
// reduction is negative, we allow this move a limited search extension
// beyond the first move depth.
// To prevent problems when the max value is less than the min value,
// std::clamp has been replaced by a more robust implementation.
// Step 18. Full-depth search when LMR is skipped
// Step 19. Undo move
// Step 20. Check for a new best move
// Finished searching the move. If a stop occurred, the return value of
// the search cannot be trusted, and we return immediately without updating
// best move, principal variation nor transposition table.
// Step 21. Check for mate and stalemate
// All legal moves have been searched and if there are no legal moves, it
// must be a mate or a stalemate. If we are in a singular extension search then
// return a fail low score.

// =====================from Stockfish_src 

//for tactical and quiet moves

/*
  // searching_alpha_beta_fail_hard
  ////////////////////////////////////////
https://www.chessprogramming.org/Alpha-Beta

  PVS
  value = PVS(-(alpha+1),-alpha)
  if(value > alpha && value < beta) {
  value = PVS(-beta,-alpha);


number of leaves with depth n and b = 40
depth n	    bn	                b⌈n/2⌉ + b⌊n/2⌋ - 1
      0	    1	                  1
      1	    40	                40
      2	    1,600	              79
      3	    64,000	            1,639
      4	    2,560,000	          3,199
      5	    102,400,000	        65,569
      6	    4,096,000,000	      127,999
      7	    163,840,000,000	    2,623,999
      8	    6,553,600,000,000	  5,119,999

Fail soft

int alphaBetaMax( int alpha, int beta, int depthleft ) {
   if ( depthleft == 0 ) return evaluate();
   bestValue = -infinity;
   for ( all moves) {
      score = alphaBetaMin( alpha, beta, depthleft - 1 );
      if( score > bestValue )
      {
         bestValue = score;
         if( score > alpha )
            alpha = score; // alpha acts like max in MiniMax
      }
      if( score >= beta )
         return score;   // fail soft beta-cutoff
   }
   return bestValue;
}

int alphaBetaMin( int alpha, int beta, int depthleft ) {
   if ( depthleft == 0 ) return -evaluate();
   bestValue = infinity;
   for ( all moves) {
      score = alphaBetaMax( alpha, beta, depthleft - 1 );
      if( score < bestValue)
      {
         bestValue = score;
         if( score < beta )
            beta = score; // beta acts like min in MiniMax
      }
      if( score <= alpha )
         return score; // fail soft alpha-cutoff, break can also be used here
   }
   return bestValue;
}


Negamax
int alphaBeta( int alpha, int beta, int depthleft ) {
   if( depthleft == 0 ) return quiesce( alpha, beta );
   bestValue = -infinity;
   for ( all moves)  {
      score = -alphaBeta( -beta, -alpha, depthleft - 1 );
      if( score > bestValue )
      {
         bestValue = score;
         if( score > alpha )
            alpha = score; // alpha acts like max in MiniMax
      }
      if( score >= beta )
         return bestValue;   //  fail soft beta-cutoff, existing the loop here is also fine
   }
   return bestValue;
}

Fail hard
Negamax

int alphaBeta( int alpha, int beta, int depthleft ) {
   if( depthleft == 0 ) return quiesce( alpha, beta );
   for ( all moves)  {
      score = -alphaBeta( -beta, -alpha, depthleft - 1 );
      if( score >= beta )
         return beta;   //  fail hard beta-cutoff
      if( score > alpha )
         alpha = score; // alpha acts like max in MiniMax
   }
   return alpha;
}

 что выгоднее в chess engine alpha beta fail soft или alpha beta fail_hard ?
  ответ от  Google AI:
  В современных шахматных движках, которые активно используют PVS и таблицы перестановок, 
  fail-soft является стандартом де-факто, так как он обеспечивает 
  более быструю и точную работу алгоритма.
  ----------------------
  
  ответ от  Google AI:
  Примерная оценка: В реальных тестах, при хорошем упорядочивании ходов, 
  PVS может потребовать примерно на 10% меньше вычислений (или узлов для поиска), 
  чем стандартный альфа-бета алгоритм. В некоторых случаях сообщалось о 
  сокращении общего числа узлов и времени примерно на 33%.
*/