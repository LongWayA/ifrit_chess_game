// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name i_search_root_0x88.js
 * @version refactored 2026
 */

import {
    get_type_move_ml, get_from_ml, get_to_ml,
    sorting_list_ml, return_i_move_ml, move_to_string_uci_ml,
    LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_MOVE_ML, MOVE_NO_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
    x07_y07_to_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb,
    test_print_piece_0x88_f_cb, letter_to_x_coordinate_cb, BOARD_SIZE_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
    clear_pv_line_pv, add_move_to_pv_line_pv, save_pv_line_pv,
    pv_line_to_uci_string_pv, MAX_DEPTH_PV, IND_TYPE_VARIANT_PV
} from "../search_negamax_0x88/pv_line_0x88.js";

import {
    generated_pseudo_legal_captures_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
    generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";

import {
    searching_negamax, ini_stack, chess_board_0x88_found_best_score, node_mm
} from "../search_negamax_0x88/search_negamax_0x88.js";

import {
    searching_negamax_alpha_beta_id_ab, set_stop_search_in_1_ab, set_stop_search_in_0_ab, set_node_in_0_ab,
    node_ab, is_history_heuristic_use_ab, ini_stack_ab,
    INIT_EVAL_AB,
    save_alpha_up_test_tt, save_beta_cut_test_tt,
    use_alpha_up_test_tt, use_beta_cut_test_tt,
    clear_test_tt
} from "./search_nm_ab_0x88.js";

import {
    sorting_list_top_max_score_lr, add_score_lr
} from "../search_negamax_0x88/move_list_root_0x88.js";

import {
    ini_Array_hh
} from "../heuristic_0x88/history_heuristic_0x88/history_heuristic_0x88.js";

import {
    ini_random_key_array_64_tk, set_key_from_board_0x88_tk,
    test_chess_board_key_64_tk, test_generation_key_64_tk
} from "../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

import {
    ini_tt, test_uses_hash_tt, print_test_set_get_position_tt
} from "../heuristic_0x88/transposition_table_0x88/transposition_table_0x88.js";

import { Timer_C } from "../../browser/timer.js";
import { ChessEngine_0x88_С } from "../i_chess_engine_0x88.js";
import { ini_stack_qs } from "../quiescence_search_0x88/quiescence_search_0x88.js";
import { score_position_e } from "../evaluate_0x88/evaluate_0x88.js";

// ============================================================================
// КОНСТАНТЫ И ТИПЫ
// ============================================================================

const ALPHA_SCORE_R = -50000;
const BETA_SCORE_R = 50000;

/**
 * @typedef {Object} uci_return_search
 * @property {string} fen_start
 * @property {string} fen_end
 * @property {string} info
 * @property {string} best_move
 */

const timer_O = new Timer_C();
let stop_search_root = 0;

const set_stop_search_in_1_r = function () {
    set_stop_search_in_1_ab();
    stop_search_root = 1;
};

const set_stop_search_in_0_r = function () {
    set_stop_search_in_0_ab();
    stop_search_root = 0;
};

const test_tt = function () {
    console.log("-------------------------------------- ");
    console.log("save_alpha_up_test_tt " + save_alpha_up_test_tt);
    console.log("use_alpha_up_test_tt " + use_alpha_up_test_tt);
    console.log("----- ");
    console.log("save_beta_cut_test_tt " + save_beta_cut_test_tt);
    console.log("use_beta_cut_test_tt " + use_beta_cut_test_tt);
    console.log("-------------------------------------- ");
};

/**
 * @param {string} fenStart
 * @param {string} fenEnd
 * @param {number} depth
 * @param {number} scoreCp
 * @param {number} nodes
 * @param {number} elapsedMs
 * @param {string} pvString
 * @param {string} bestMoveStr
 * @returns {uci_return_search}
 */
function buildUciResult(fenStart, fenEnd, depth, scoreCp, nodes, elapsedMs, pvString, bestMoveStr) {
    const elapsedSec = Math.max(elapsedMs / 1000, 0.001);
    const nps = Math.round(nodes / elapsedSec);

    return {
        fen_start: fenStart,
        fen_end: fenEnd,
        info: `info depth ${depth} score cp ${scoreCp} nodes ${nodes} nps ${nps} pv ${pvString}`,
        best_move: bestMoveStr ? `bestmove ${bestMoveStr}` : "bestmove no"
    };
}

/**
 * @param {string} fen_start
 * @param {number} depth_max
 * @returns {uci_return_search}
 */
const start_search_negamax_r = function (fen_start, depth_max) {
    const chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(0);
    const chess_board_0x88_score = new Int32Array(BOARD_SIZE_CB).fill(0);
    const chess_board_key_64 = new BigUint64Array(1);
    const packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);

    ini_stack();
    ini_random_key_array_64_tk();

    const timeStart = timer_O.getCurrentTimeMs();

    set_board_from_fen_0x88_cb(fen_start, chess_board_0x88);
    chess_board_key_64[0] = 0n;
    set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);

    const best_score = searching_negamax(
        chess_board_0x88, chess_board_0x88_score, chess_board_key_64, packing_pv_line, 0, depth_max
    );
    const timeElapsed = timer_O.getCurrentTimeMs() - timeStart;

    test_print_piece_0x88_f_cb(chess_board_0x88_found_best_score);
    test_print_piece_0x88_f_cb(chess_board_0x88_score);
    console.log("start_search_negamax_r -> score = " + score_position_e(chess_board_0x88_score));
    console.log("start_search_negamax_r -> node " + node_mm);

    const fenEnd = set_fen_from_0x88_cb(chess_board_0x88_found_best_score);
    const pv = pv_line_to_uci_string_pv(packing_pv_line, best_score);

    return buildUciResult(fen_start, fenEnd, depth_max, best_score, node_mm, timeElapsed, pv, "");
};


/**
 * @param {ChessEngine_0x88_С} chessEngine_0x88_O
 * @param {string} fen_start
 * @param {number} depth_max
 * @returns {uci_return_search}
 */
const searching_iterative_deepening_r = function (chessEngine_0x88_O, fen_start, depth_max) {
    ini_random_key_array_64_tk();
    ini_tt();
    clear_test_tt();
    ini_stack_qs();
    ini_stack_ab();

    if (is_history_heuristic_use_ab === 1) {
        ini_Array_hh();
    }

    set_stop_search_in_0_r();

    const chess_board_0x88 = new Int32Array(BOARD_SIZE_CB).fill(0);
    const chess_board_0x88_save = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
    const chess_board_0x88_get_move = new Int32Array(BOARD_SIZE_CB).fill(0);

    const chess_board_key_64 = new BigUint64Array(1);
    const chess_board_key_64_undo = new BigUint64Array(1);
    const chess_board_key_64_save_test = new BigUint64Array(1);
    const chess_board_key_64_test = new BigUint64Array(1);

    set_board_from_fen_0x88_cb(fen_start, chess_board_0x88);
    chess_board_0x88_get_move.set(chess_board_0x88);

    chess_board_key_64[0] = 0n;
    set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64);

    const packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    const list_score_move = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    const packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
    const best_packing_pv_line = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);

    generated_pseudo_legal_captures_mgc(chess_board_0x88, packing_moves);
    generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, packing_moves);
    sorting_list_ml(packing_moves);

    /** @type {uci_return_search} */
    let uciResult = buildUciResult(fen_start, fen_start, 0, 0, 0, 1, "no", "");

    const totalMoves = packing_moves[IND_NUMBER_MOVE_ML];
    const pieceColor = packing_moves[IND_PIECE_COLOR_ML];

    for (let depth_max_current = 1; depth_max_current <= depth_max; depth_max_current++) {
        const timeStart = timer_O.getCurrentTimeMs();

        let alpha = ALPHA_SCORE_R;
        const beta = BETA_SCORE_R;
        let best_score = INIT_EVAL_AB;
        let best_move_i = -1;
        let number_move_legal = 0;
        let node_root = 0;

        clear_pv_line_pv(packing_pv_line);

        for (let move_i = 0; move_i < totalMoves; move_i++) {
            const type_move = get_type_move_ml(move_i, packing_moves);
            const from = get_from_ml(move_i, packing_moves);
            const to = get_to_ml(move_i, packing_moves);

            chess_board_0x88_save.set(chess_board_0x88);
            chess_board_key_64_undo[0] = chess_board_key_64[0];

            const is_moove_legal = do_moves_mm(chess_board_0x88, chess_board_key_64, type_move, from, to, pieceColor);

            if (is_moove_legal === 0) {
                chess_board_0x88.set(chess_board_0x88_save);
                chess_board_key_64[0] = chess_board_key_64_undo[0];
                continue;
            }
            if (is_moove_legal === 2) {
                continue;
            }

            number_move_legal++;
            add_move_to_pv_line_pv(move_i, packing_moves, packing_pv_line, 0);

            set_node_in_0_ab();
            chess_board_key_64_save_test[0] = chess_board_key_64[0];

            const score = -searching_negamax_alpha_beta_id_ab(
                -beta, -alpha, chess_board_0x88, chess_board_key_64, packing_pv_line,
                1, depth_max_current, 1
            );

            test_chess_board_key_64_tk(chess_board_key_64_save_test, chess_board_key_64);
            set_key_from_board_0x88_tk(chess_board_0x88, chess_board_key_64_test);
            test_generation_key_64_tk(chess_board_key_64_test, chess_board_key_64, packing_moves, move_i, "root");

            node_root += node_ab;
            add_score_lr(move_i, list_score_move, score);

            if (score > best_score) {
                best_score = score;
                best_move_i = move_i;

                save_pv_line_pv(best_packing_pv_line, packing_pv_line);
                chess_board_0x88_get_move.set(chess_board_0x88);

                if (score > alpha) {
                    alpha = score;
                }
            }

            chess_board_0x88.set(chess_board_0x88_save);
            chess_board_key_64[0] = chess_board_key_64_undo[0];
        }

        if (best_move_i !== -1) {
            save_pv_line_pv(packing_pv_line, best_packing_pv_line);
        }

        const timeElapsed = timer_O.getCurrentTimeMs() - timeStart;
        const fenEnd = set_fen_from_0x88_cb(chess_board_0x88_get_move);

        if (number_move_legal !== 0) {
            sorting_list_top_max_score_lr(list_score_move);

            const pv = pv_line_to_uci_string_pv(packing_pv_line, best_score);
            const bestMoveStr = move_to_string_uci_ml(best_move_i, best_packing_pv_line);

            uciResult = buildUciResult(
                fen_start, fenEnd, depth_max_current, best_score,
                node_root, timeElapsed, pv, bestMoveStr
            );

            chessEngine_0x88_O?.message_search_root_to_engine(uciResult);
        } else {
            uciResult = buildUciResult(fen_start, fenEnd, depth_max_current, 0, 0, 1, "no", "");

            chessEngine_0x88_O?.message_search_root_to_engine(uciResult);
            chessEngine_0x88_O?.info_from_depth_uci(uciResult);
        }

        if (stop_search_root === 1) {
            return uciResult;
        }
    }

    print_test_set_get_position_tt();
    test_uses_hash_tt();
    test_tt();

    return uciResult;
};

/**
 * Применяет последовательность UCI-ходов (например "moves e2e4 e7e5") к позиции FEN.
 * @param {string} fen_start
 * @param {string} move_str
 * @returns {string}
 */
const move_str_to_board_r = function (fen_start, move_str) {
    const chess_board_0x88_uci = new Int32Array(BOARD_SIZE_CB).fill(0);
    const packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    const chess_board_key_64 = new BigUint64Array(1);

    chess_board_key_64[0] = 0n;

    ini_random_key_array_64_tk();
    set_board_from_fen_0x88_cb(fen_start, chess_board_0x88_uci);

    const moveTokens = move_str
        .replace(/^moves\s*/i, "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    for (const uciMove of moveTokens) {
        if (uciMove.length < 4) return "-1";

        generated_pseudo_legal_captures_mgc(chess_board_0x88_uci, packing_moves);
        generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88_uci, packing_moves);

        const fromX = letter_to_x_coordinate_cb(uciMove.charAt(0));
        const fromY = 8 - Number(uciMove.charAt(1));
        const from = x07_y07_to_0x88_cb(fromX, fromY);

        const toX = letter_to_x_coordinate_cb(uciMove.charAt(2));
        const toY = 8 - Number(uciMove.charAt(3));
        const to = x07_y07_to_0x88_cb(toX, toY);

        const promo = uciMove.charAt(4) || "";
        const i_move = return_i_move_ml(packing_moves, from, to, promo);

        if (i_move < 0) return "-1";

        const type_move = get_type_move_ml(i_move, packing_moves);
        const piece_color = packing_moves[IND_PIECE_COLOR_ML];

        const is_moove_legal = do_moves_mm(chess_board_0x88_uci, chess_board_key_64, type_move, from, to, piece_color);

        if (is_moove_legal === 0 || is_moove_legal === 2) {
            return "-1";
        }
    }

    return set_fen_from_0x88_cb(chess_board_0x88_uci);
};

export {
    start_search_negamax_r,
    searching_iterative_deepening_r,
    set_stop_search_in_1_r,
    set_stop_search_in_0_r,
    test_tt,
    move_str_to_board_r
};
