// @ts-check
/**
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_nm_0x88.js
 * @version refactored 2026
 */

import {
    test_compare_chess_board_0x88_cb,
    BOARD_SIZE_CB, SIDE_TO_MOVE_CB,
    WHITE_CB,
    IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
    get_type_move_ml, get_from_ml, get_to_ml,
    sorting_list_ml,
    set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml,
    LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    MOVE_NO_ML, CAPTURES_KING_PAWN_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
    add_move_to_pv_line_pv, save_pv_line_pv,
    MAX_DEPTH_PV, IND_DEPTH_MAT_PV
} from "../search_negamax_0x88/pv_line_0x88.js";

import {
    generated_pseudo_legal_captures_mgc, check_detected_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
    generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";
import { score_position_e, PAWN_SCORE_E } from "../evaluate_0x88/evaluate_0x88.js";
import { quiescence_search } from "../quiescence_search_0x88/quiescence_search_0x88.js";
import { add_move_kh, MAX_DEPTH_KH } from "../heuristic_0x88/killer_heuristic_0x88/killer_heuristic_0x88.js";
import { history_good_save_hh, get_history_hh } from "../heuristic_0x88/history_heuristic_0x88/history_heuristic_0x88.js";
import {
    set_position_in_tt, get_position_from_tt,
    ALPHA_UPDATE_TT, BETA_CUT_TT,
    IND_TN_TT, IND_SC_TT
} from "../heuristic_0x88/transposition_table_0x88/transposition_table_0x88.js";

// ============================================================================
// КОНСТАНТЫ И КОНФИГУРАЦИЯ
// ============================================================================

const MATE_AB = -30000;
const INIT_EVAL_AB = -40000;
const MAX_DEPTH_SEARCH = 128;

/**
 * @typedef {Object} SearchConfig
 * @property {boolean} useQuiescence
 * @property {boolean} useAlphaBeta
 * @property {boolean} usePVS
 * @property {boolean} useKillerHeuristic
 * @property {boolean} useHistoryHeuristic
 * @property {boolean} useTT
 * @property {boolean} useRazoring
 * @property {boolean} useLMR
 */

/** @type {Readonly<SearchConfig>} */
const DEFAULT_SEARCH_CONFIG = Object.freeze({
    useQuiescence: true,
    useAlphaBeta: true,
    usePVS: true,
    useKillerHeuristic: true,
    useHistoryHeuristic: true,
    useTT: true,
    useRazoring: false,
    useLMR: false,
});

/**
 * @typedef {Object} SearchState
 * @property {number} nodes
 * @property {boolean} stopSearch
 * @property {Int32Array} killers1
 * @property {Int32Array} killers2
 * @property {BigUint64Array} repetitionHistory
 * @property {Int32Array[]} movesStack
 * @property {Int32Array[]} pvLineStack
 * @property {BigUint64Array[]} keyUndoStack
 * @property {Int32Array[]} boardUndoStack
 * @property {Int32Array[]} ttMoveStack
 * @property {number[][]} ttOutStack
 * @property {Int32Array} boardTestBuffer
 * @property {{ saveAlphaUp: number, saveBetaCut: number, useAlphaUp: number, useBetaCut: number }} ttStats
 */

/** @returns {SearchState} */
function createSearchState() {
    /** @type {Int32Array[]} */
    const movesStack = new Array(MAX_DEPTH_SEARCH);
    /** @type {Int32Array[]} */
    const pvLineStack = new Array(MAX_DEPTH_SEARCH);
    /** @type {BigUint64Array[]} */
    const keyUndoStack = new Array(MAX_DEPTH_SEARCH);
    /** @type {Int32Array[]} */
    const boardUndoStack = new Array(MAX_DEPTH_SEARCH);
    /** @type {Int32Array[]} */
    const ttMoveStack = new Array(MAX_DEPTH_SEARCH);
    /** @type {number[][]} */
    const ttOutStack = new Array(MAX_DEPTH_SEARCH);

    for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {
        movesStack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
        pvLineStack[depth] = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
        keyUndoStack[depth] = new BigUint64Array(1);
        boardUndoStack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
        ttMoveStack[depth] = new Int32Array(1).fill(MOVE_NO_ML);
        ttOutStack[depth] = [-1, -1, -1];
    }

    return {
        nodes: 0,
        stopSearch: false,
        killers1: new Int32Array(MAX_DEPTH_KH).fill(MOVE_NO_ML),
        killers2: new Int32Array(MAX_DEPTH_KH).fill(MOVE_NO_ML),
        repetitionHistory: new BigUint64Array(MAX_DEPTH_SEARCH).fill(0n),
        movesStack,
        pvLineStack,
        keyUndoStack,
        boardUndoStack,
        ttMoveStack,
        ttOutStack,
        boardTestBuffer: new Int32Array(BOARD_SIZE_CB).fill(0),
        ttStats: { saveAlphaUp: 0, saveBetaCut: 0, useAlphaUp: 0, useBetaCut: 0 }
    };
}

const defaultSearchState = createSearchState();

// Совместимость со старыми экспортами
let node_ab = 0;
let is_history_heuristic_use_ab = DEFAULT_SEARCH_CONFIG.useHistoryHeuristic ? 1 : 0;
let save_alpha_up_test_tt = 0;
let save_beta_cut_test_tt = 0;
let use_alpha_up_test_tt = 0;
let use_beta_cut_test_tt = 0;

function syncLegacyGlobals(state = defaultSearchState) {
    node_ab = state.nodes;
    save_alpha_up_test_tt = state.ttStats.saveAlphaUp;
    save_beta_cut_test_tt = state.ttStats.saveBetaCut;
    use_alpha_up_test_tt = state.ttStats.useAlphaUp;
    use_beta_cut_test_tt = state.ttStats.useBetaCut;
}

const ini_stack_ab = function () {
    Object.assign(defaultSearchState, createSearchState());
    syncLegacyGlobals();
};

const set_stop_search_in_1_ab = function () { defaultSearchState.stopSearch = true; };
const set_stop_search_in_0_ab = function () { defaultSearchState.stopSearch = false; };
const set_node_in_0_ab = function () { defaultSearchState.nodes = 0; node_ab = 0; };

const clear_test_tt = function () {
    defaultSearchState.ttStats = { saveAlphaUp: 0, saveBetaCut: 0, useAlphaUp: 0, useBetaCut: 0 };
    syncLegacyGlobals();
};

/**
 * @param {BigUint64Array} history
 * @param {bigint} currentKey
 * @param {number} depth
 * @returns {boolean}
 */
function isPositionRepeated(history, currentKey, depth) {
    if (depth < 2) return false;
    for (let i = depth - 2; i >= 0; i -= 2) {
        if (history[i] === currentKey) return true;
    }
    return false;
}

/**
 * @param {Int32Array} board
 * @param {Int32Array} movesList
 * @param {number} depth
 * @param {number} ttFlag
 * @param {Int32Array} ttMove
 * @param {SearchConfig} config
 * @param {SearchState} state
 */
function generateAndOrderMoves(board, movesList, depth, ttFlag, ttMove, config, state) {
    generated_pseudo_legal_captures_mgc(board, movesList);
    generated_pseudo_legal_quiet_moves_mgq(board, movesList);

    sorting_list_ml(movesList);

    if (config.useHistoryHeuristic) {
        sorting_list_history_heuristic_ml(movesList, get_history_hh());
    }

    if (config.useKillerHeuristic) {
        if (state.killers2[depth] !== 0) {
            set_move_after_the_captures_ml(movesList, state.killers2, depth);
        }
        if (state.killers1[depth] !== 0) {
            set_move_after_the_captures_ml(movesList, state.killers1, depth);
        }
    }

    if (config.useTT && ttFlag === ALPHA_UPDATE_TT) {
        set_move_in_0_ml(movesList, ttMove);
        state.ttStats.useAlphaUp++;
    }
}

/**
 * @param {number} moveIndex
 * @param {Int32Array} movesList
 * @param {BigUint64Array} boardKey
 * @param {number} score
 * @param {number} depth
 * @param {number} depthMax
 * @param {string} fen
 * @param {SearchConfig} config
 * @param {SearchState} state
 */
function handleBetaCutoff(moveIndex, movesList, boardKey, score, depth, depthMax, fen, config, state) {
    const moveType = get_type_move_ml(moveIndex, movesList);
    if (moveType > CAPTURES_KING_PAWN_ML) {
        if (config.useHistoryHeuristic) {
            history_good_save_hh(moveIndex, movesList, depth, depthMax);
        }
        if (config.useKillerHeuristic) {
            add_move_kh(movesList, state.killers1, state.killers2, moveIndex, depth);
        }
    }

    if (config.useTT) {
        set_position_in_tt(boardKey, movesList, BETA_CUT_TT, score, depth, depthMax, moveIndex, fen);
        state.ttStats.saveBetaCut++;
    }
}

/**
 * @param {number} alpha
 * @param {number} beta
 * @param {Int32Array} chess_board_0x88
 * @param {BigUint64Array} chess_board_key_64
 * @param {Int32Array} packing_pv_line
 * @param {number} depth
 * @param {number} depth_max
 * @param {number} isPV
 * @returns {number}
 */
const searching_negamax_alpha_beta_id_ab = function (
    alpha, beta, chess_board_0x88, chess_board_key_64, packing_pv_line, depth, depth_max, isPV
) {
    const state = defaultSearchState;
    const config = DEFAULT_SEARCH_CONFIG;

    if (state.stopSearch) return 0;

    const currentKey = chess_board_key_64[0];
    state.repetitionHistory[depth] = currentKey;

    if (isPositionRepeated(state.repetitionHistory, currentKey, depth)) {
        return 0;
    }

    if (depth >= depth_max) {
        state.nodes++;
        syncLegacyGlobals(state);
        if (!config.useQuiescence) {
            return score_position_e(chess_board_0x88);
        }
        state.boardTestBuffer.set(chess_board_0x88);
        const qScore = quiescence_search(alpha, beta, chess_board_0x88, chess_board_key_64, depth);
        test_compare_chess_board_0x88_cb(state.boardTestBuffer, chess_board_0x88);
        return qScore;
    }

    const ttMove = state.ttMoveStack[depth];
    let ttOut = state.ttOutStack[depth];
    const fen = "";

    if (config.useTT) {
        ttOut = get_position_from_tt(chess_board_key_64, ttMove, depth, depth_max, fen);
        if (ttOut[IND_TN_TT] === BETA_CUT_TT && ttOut[IND_SC_TT] >= beta) {
            state.ttStats.useBetaCut++;
            syncLegacyGlobals(state);
            return ttOut[IND_SC_TT];
        }
    }

    if (config.useRazoring && isPV === 0 && (depth_max - depth) < 3 && alpha < 5000) {
        const staticEval = score_position_e(chess_board_0x88);
        const razorMargin = PAWN_SCORE_E * (depth_max - depth);

        if (staticEval + razorMargin < alpha) {
            const sideToMove = chess_board_0x88[SIDE_TO_MOVE_CB];
            const kingSquare = (sideToMove === WHITE_CB)
                ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
                : chess_board_0x88[IND_KING_FROM_BLACK_CB];

            if (!check_detected_mgc(kingSquare, sideToMove, chess_board_0x88)) {
                const razorScore = quiescence_search(alpha, alpha + 1, chess_board_0x88, chess_board_key_64, depth);
                if (razorScore <= alpha) return razorScore;
            }
        }
    }

    const movesList = state.movesStack[depth];
    const localBestPvLine = state.pvLineStack[depth];
    const boardUndo = state.boardUndoStack[depth];
    const keyUndo = state.keyUndoStack[depth];

    generateAndOrderMoves(chess_board_0x88, movesList, depth, ttOut[IND_TN_TT], ttMove, config, state);

    let bestScore = INIT_EVAL_AB;
    let legalMovesCount = 0;
    let isPvUpdated = false;

    const totalMoves = movesList[IND_NUMBER_MOVE_ML];
    const pieceColor = movesList[IND_PIECE_COLOR_ML];
    const lmrThresholdIndex = movesList[IND_NUMBER_CAPTURES_MOVE_ML] + 4;

    for (let moveIdx = 0; moveIdx < totalMoves; moveIdx++) {
        const moveType = get_type_move_ml(moveIdx, movesList);
        const fromSq = get_from_ml(moveIdx, movesList);
        const toSq = get_to_ml(moveIdx, movesList);

        boardUndo.set(chess_board_0x88);
        keyUndo[0] = chess_board_key_64[0];

        const legality = do_moves_mm(chess_board_0x88, chess_board_key_64, moveType, fromSq, toSq, pieceColor);

        if (legality === 0) {
            chess_board_0x88.set(boardUndo);
            chess_board_key_64[0] = keyUndo[0];
            continue;
        }
        if (legality === 2) {
            continue;
        }

        legalMovesCount++;
        add_move_to_pv_line_pv(moveIdx, movesList, packing_pv_line, depth);

        let score = 0;

        if (!config.usePVS || (moveIdx === 0 && isPV === 1)) {
            score = -searching_negamax_alpha_beta_id_ab(
                -beta, -alpha, chess_board_0x88, chess_board_key_64, packing_pv_line,
                depth + 1, depth_max, 1
            );
        } else {
            const applyLMR = config.useLMR && (moveIdx > lmrThresholdIndex) && ((depth_max - depth) > 4);
            const reducedDepthMax = applyLMR ? depth_max - 1 : depth_max;

            score = -searching_negamax_alpha_beta_id_ab(
                -(alpha + 1), -alpha, chess_board_0x88, chess_board_key_64, packing_pv_line,
                depth + 1, reducedDepthMax, 0
            );

            if (score > alpha && score < beta) {
                score = -searching_negamax_alpha_beta_id_ab(
                    -beta, -alpha, chess_board_0x88, chess_board_key_64, packing_pv_line,
                    depth + 1, depth_max, 1
                );
            }
        }

        chess_board_0x88.set(boardUndo);
        chess_board_key_64[0] = keyUndo[0];

        if (score > bestScore) {
            bestScore = score;

            if (config.useAlphaBeta) {
                if (score >= beta) {
                    handleBetaCutoff(moveIdx, movesList, chess_board_key_64, score, depth, depth_max, fen, config, state);
                    syncLegacyGlobals(state);
                    return score;
                }

                if (score > alpha) {
                    alpha = score;

                    if (config.useTT) {
                        set_position_in_tt(chess_board_key_64, movesList, ALPHA_UPDATE_TT, score, depth, depth_max, moveIdx, fen);
                        state.ttStats.saveAlphaUp++;
                    }

                    if (isPV === 1) {
                        save_pv_line_pv(localBestPvLine, packing_pv_line);
                        isPvUpdated = true;
                    }
                }
            } else if (isPV === 1) {
                save_pv_line_pv(localBestPvLine, packing_pv_line);
                isPvUpdated = true;
            }
        }
    }

    if (isPvUpdated) {
        save_pv_line_pv(packing_pv_line, localBestPvLine);
    }

    syncLegacyGlobals(state);

    if (legalMovesCount === 0) {
        const sideToMove = chess_board_0x88[SIDE_TO_MOVE_CB];
        const kingSquare = (sideToMove === WHITE_CB)
            ? chess_board_0x88[IND_KING_FROM_WHITE_CB]
            : chess_board_0x88[IND_KING_FROM_BLACK_CB];

        packing_pv_line[IND_DEPTH_MAT_PV] = depth - 1 + 500;
        const isCheckmate = check_detected_mgc(kingSquare, sideToMove, chess_board_0x88) !== 0;
        return isCheckmate ? MATE_AB + depth : 0;
    }

    return bestScore;
};

export {
    searching_negamax_alpha_beta_id_ab, set_stop_search_in_1_ab, set_stop_search_in_0_ab, set_node_in_0_ab,
    node_ab, is_history_heuristic_use_ab, ini_stack_ab,
    INIT_EVAL_AB,
    save_alpha_up_test_tt, save_beta_cut_test_tt,
    use_alpha_up_test_tt, use_beta_cut_test_tt,
    clear_test_tt
};
