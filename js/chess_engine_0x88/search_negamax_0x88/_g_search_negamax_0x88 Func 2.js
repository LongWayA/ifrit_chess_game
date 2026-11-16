// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_negamax_0x88.js
 * @version created 16.05m.2026 (Functional Core / Imperative Shell edition)
*/

import {
  BOARD_SIZE_CB, SIDE_TO_MOVE_CB,
  BLACK_CB, WHITE_CB,
  IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_list_ml, get_type_move_ml, get_from_ml, get_to_ml,
  LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_MOVE_ML,
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
import { score_position_e } from "../evaluate_0x88/evaluate_0x88.js";
import {
  set_key_from_board_0x88_tk, test_chess_board_key_64_tk
} from "../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

const MATE = -30000;
const INIT_EVAL = -40000;

// ============================================================================
// 1. ВНЕШНИЙ КОНТРАКТ (Совместимость с остальными модулями вашего движка)
// ============================================================================

// Оставляем экспортируемые переменные и ini_stack, чтобы внешние модули не падали при импорте
let chess_board_0x88_found_best_score = new Int32Array(BOARD_SIZE_CB).fill(0);
let node_mm = 0;

// В функциональной версии стеки не нужны (нет мутаций и откатов), но функция оставлена как заглушка для совместимости
const ini_stack = function () {
  // Иммутабельный поиск не требует предварительной аллокации стеков отката
};

/**
 * Описание неизменяемого результата одного узла дерева поиска
 * @typedef {Object} NodeResult
 * @property {number} score - Оценка позиции
 * @property {Int32Array} pvLine - Лучшая линия вариантов
 * @property {Int32Array} scoreBoard - Позиция на листе, соответствующая этой оценке
 * @property {Int32Array|null} rootBestBoard - Позиция после лучшего хода на depth === 0
 * @property {number} nodesCount - Количество просмотренных листьев в поддереве
 */

// ============================================================================
// 2. ФУНКЦИОНАЛЬНОЕ ЯДРО (Чистые функции без мутации аргументов)
// ============================================================================

/**
 * Чистая генерация списка псевдо-легальных ходов.
 * Создает новый массив ходов, заполняет его через ваши генераторы и возвращает наружу.
 * @param {Int32Array} board 
 * @returns {Int32Array}
 */
const generateMovesPure = (board) => {
  const moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
  clear_list_ml(moves);
  generated_pseudo_legal_captures_mgc(board, moves);
  generated_pseudo_legal_quiet_moves_mgq(board, moves);
  return moves;
};

/**
 * Чистое выполнение хода на копии доски и копии ключа.
 * Заменяет связку: сохранение в undo_stack -> do_moves_mm -> восстановление из undo_stack.
 * @param {Int32Array} board 
 * @param {BigUint64Array} key64 
 * @param {number} moveIndex 
 * @param {Int32Array} movesList 
 * @returns {{ isLegal: boolean, nextBoard: Int32Array, nextKey64: BigUint64Array }}
 */
const tryMakeMovePure = (board, key64, moveIndex, movesList) => {
  // Клонируем доску и ключ — исходные данные остаются нетронутыми
  const nextBoard = new Int32Array(board);
  const nextKey64 = new BigUint64Array(key64);

  const typeMove = get_type_move_ml(moveIndex, movesList);
  const from = get_from_ml(moveIndex, movesList);
  const to = get_to_ml(moveIndex, movesList);
  const pieceColor = movesList[IND_PIECE_COLOR_ML];

  const moveStatus = do_moves_mm(nextBoard, nextKey64, typeMove, from, to, pieceColor);

  // Легальным является только ход со статусом 1 (0 - шах королю, 2 - нелегальная рокировка)
  return {
    isLegal: moveStatus === 1,
    nextBoard,
    nextKey64
  };
};

/**
 * Чистая оценка терминального узла (Мат или Пат, когда легальных ходов нет).
 * @param {Int32Array} board 
 * @param {Int32Array} currentPvLine 
 * @param {number} depth 
 * @returns {NodeResult}
 */
const evaluateTerminalPure = (board, currentPvLine, depth) => {
  const nextPvLine = new Int32Array(currentPvLine);
  nextPvLine[IND_DEPTH_MAT_PV] = depth - 1 + 500;

  const sideToMove = board[SIDE_TO_MOVE_CB];
  const kingSquare = sideToMove === WHITE_CB
    ? board[IND_KING_FROM_WHITE_CB]
    : board[IND_KING_FROM_BLACK_CB];

  const isCheck = check_detected_mgc(kingSquare, sideToMove, board) !== 0;

  return {
    score: isCheck ? (MATE + depth) : 0,
    pvLine: nextPvLine,
    scoreBoard: new Int32Array(board),
    rootBestBoard: depth === 0 ? new Int32Array(board) : null,
    nodesCount: 0
  };
};

/**
 * Чистая рекурсивная функция Negamax.
 * Внутри нет циклов for, нет мутаций переданных массивов и нет обращения к глобальным переменным.
 * 
 * @param {Int32Array} board 
 * @param {BigUint64Array} key64 
 * @param {Int32Array} pvLine 
 * @param {number} depth 
 * @param {number} depthMax 
 * @returns {NodeResult}
 */
const negamaxPure = (board, key64, pvLine, depth, depthMax) => {
  // Базовый случай: достигли предельной глубины поиска
  if (depth >= depthMax) {
    // Сохраняем вашу проверку целостности Зобрист-ключа на листьях дерева
    const key64Test = new BigUint64Array(1);
    set_key_from_board_0x88_tk(board, key64Test);
    test_chess_board_key_64_tk(key64Test, key64);

    return {
      score: score_position_e(board),
      pvLine: new Int32Array(pvLine),
      scoreBoard: new Int32Array(board),
      rootBestBoard: null,
      nodesCount: 1
    };
  }

  // Генерируем псевдо-легальные ходы и превращаем их в массив индексов [0, 1, ..., N-1]
  const movesList = generateMovesPure(board);
  const moveIndices = Array.from({ length: movesList[IND_NUMBER_MOVE_ML] }, (_, i) => i);

  // Конвейер преобразований:
  // 1. Делаем каждый ход на копии доски (.map)
  // 2. Оставляем только легальные позиции (.filter)
  const legalMoves = moveIndices
    .map((moveIndex) => ({
      moveIndex,
      ...tryMakeMovePure(board, key64, moveIndex, movesList)
    }))
    .filter((move) => move.isLegal);

  // Если легальных ходов нет — это мат или пат
  if (legalMoves.length === 0) {
    return evaluateTerminalPure(board, pvLine, depth);
  }

  // Нейтральный элемент моноида для свертки результатов ветвей дерева
  /** @type {NodeResult} */
  const neutralResult = {
    score: INIT_EVAL,
    pvLine: new Int32Array(pvLine),
    scoreBoard: new Int32Array(board),
    rootBestBoard: null,
    nodesCount: 0
  };

  // Свертка (reduce) всех легальных ходов в один лучший результат
  return legalMoves.reduce((bestAcc, move) => {
    // Создаем копию линии вариантов для погружения глубже
    const branchPvLine = new Int32Array(pvLine);
    add_move_to_pv_line_pv(move.moveIndex, movesList, branchPvLine, depth);
    if (depth === 0) {
      branchPvLine[IND_TYPE_VARIANT_PV] = 1;
    }

    // Рекурсивный спуск
    const childResult = negamaxPure(
      move.nextBoard,
      move.nextKey64,
      branchPvLine,
      depth + 1,
      depthMax
    );

    const currentScore = -childResult.score;
    const totalNodes = bestAcc.nodesCount + childResult.nodesCount;

    // Если текущий ход дал оценку лучше — возвращаем новый объект-аккумулятор
    if (currentScore > bestAcc.score) {
      return {
        score: currentScore,
        pvLine: childResult.pvLine,
        scoreBoard: childResult.scoreBoard,
        rootBestBoard: depth === 0 ? move.nextBoard : bestAcc.rootBestBoard,
        nodesCount: totalNodes
      };
    }

    // Иначе сохраняем прежний лучший ход, но прибавляем количество просмотренных узлов
    return {
      ...bestAcc,
      nodesCount: totalNodes
    };
  }, neutralResult);
};

// ============================================================================
// 3. АДАПТЕР (Императивная оболочка для совместимости с вашим движком)
// ============================================================================

/**
 * Точка входа с вашей оригинальной сигнатурой.
 * Запускает чистое функциональное ядро и записывает итоговый результат в мутируемые
 * буферы (`chess_board_0x88_score`, `packing_pv_line` и т.д.), которые ожидает вызывающий код.
 * 
 * @param {Int32Array} chess_board_0x88 - позиция
 * @param {Int32Array} chess_board_0x88_score - позиция, соответствующая лучшей оценке
 * @param {BigUint64Array} chess_board_key_64 - зобрист ключ позиции
 * @param {Int32Array} packing_pv_line - линия варианта лучшая на данный момент
 * @param {number} depth - текущая глубина поиска
 * @param {number} depth_max - максимальная глубина поиска
 * @returns {number} - оценка позиции
 */
const searching_negamax = function (
  chess_board_0x88,
  chess_board_0x88_score,
  chess_board_key_64,
  packing_pv_line,
  depth,
  depth_max
) {
  // Запускаем чистый функциональный поиск
  const result = negamaxPure(
    chess_board_0x88,
    chess_board_key_64,
    packing_pv_line,
    depth,
    depth_max
  );

  // Синхронизируем внешние буферы и переменные так, как это делал ваш оригинальный код
  if (depth === 0) {
    node_mm = result.nodesCount;
    if (result.rootBestBoard !== null) {
      chess_board_0x88_found_best_score.set(result.rootBestBoard);
    }
  }

  chess_board_0x88_score.set(result.scoreBoard);
  save_pv_line_pv(packing_pv_line, result.pvLine);

  return result.score;
};

export { searching_negamax, ini_stack, chess_board_0x88_found_best_score, node_mm };
