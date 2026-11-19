// @ts-check
/**
 * Функциональная версия модуля поиска Negamax (0x88)
 * Принципы:
 * 1. Иммутабельность: ни один массив (доска, ключ, линия PV) не изменяется на месте.
 * 2. Отсутствие глобального состояния: все данные передаются через аргументы и возвращаются в объекте результата.
 * 3. Декларативность: вместо циклов for и ручного управления стеком используются map, filter и reduce.
 */

import {
  BOARD_SIZE_CB, SIDE_TO_MOVE_CB,
  BLACK_CB, WHITE_CB,
  IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_list_ml, get_type_move_ml, get_from_ml, get_to_ml,
  LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_MOVE_ML, MOVE_NO_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
  add_move_to_pv_line_pv,
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

const MATE = -30000;
const INIT_EVAL = -40000;

/**
 * Описываем тип результата поиска (в ФП функция возвращает все изменения наружу, а не мутирует аргументы)
 * @typedef {Object} SearchResult
 * @property {number} score - Оценка позиции
 * @property {Int32Array} pvLine - Лучшая линия вариантов
 * @property {Int32Array} bestScoreBoard - Позиция на листе дерева, давшая эту оценку
 * @property {Int32Array|null} rootBestMoveBoard - Позиция после лучшего хода на depth == 0
 * @property {number} nodes - Количество просмотренных узлов (замена глобальной node_mm)
 */

/**
 * ЧИСТАЯ ОБЕРТКА 1: Генерация списка псевдо-легальных ходов.
 * Так как ваши генераторы мутируют переданный массив, в ФП мы прячем мутацию 
 * внутри чистой функции, которая создает новый массив и возвращает его наружу.
 * 
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
 * ЧИСТАЯ ОБЕРТКА 2: Выполнение хода без изменения исходной доски.
 * Заменяет связку: chess_board_undo.set(...) -> do_moves_mm(...) -> восстановление.
 * Мы просто клонируем доску и ключ перед ходом.
 * 
 * @param {Int32Array} board 
 * @param {BigUint64Array} key64 
 * @param {number} moveIndex 
 * @param {Int32Array} movesList 
 * @returns {{ isLegal: boolean, nextBoard: Int32Array, nextKey64: BigUint64Array }}
 */
const makeMovePure = (board, key64, moveIndex, movesList) => {
  // Клонируем состояние, чтобы не портить данные родительского узла
  const nextBoard = new Int32Array(board);
  const nextKey64 = new BigUint64Array(key64);

  const typeMove = get_type_move_ml(moveIndex, movesList);
  const from = get_from_ml(moveIndex, movesList);
  const to = get_to_ml(moveIndex, movesList);
  const pieceColor = movesList[IND_PIECE_COLOR_ML];

  const legalityFlag = do_moves_mm(nextBoard, nextKey64, typeMove, from, to, pieceColor);

  // В вашей логике легальным считается только ход, вернувший 1 (не 0 и не 2)
  return {
    isLegal: legalityFlag === 1,
    nextBoard,
    nextKey64
  };
};

/**
 * ЧИСТАЯ ФУНКЦИЯ: Обработка терминального узла, когда нет ни одного легального хода (Мат или Пат).
 * 
 * @param {Int32Array} board 
 * @param {Int32Array} currentPvLine 
 * @param {number} depth 
 * @returns {SearchResult}
 */
const evaluateTerminalPosition = (board, currentPvLine, depth) => {
  const nextPvLine = new Int32Array(currentPvLine);
  // Сохраняем вашу логику детектора глубины мата (+ 500)
  nextPvLine[IND_DEPTH_MAT_PV] = depth - 1 + 500;

  const sideToMove = board[SIDE_TO_MOVE_CB];
  const kingSquare = sideToMove === WHITE_CB 
    ? board[IND_KING_FROM_WHITE_CB] 
    : board[IND_KING_FROM_BLACK_CB];

  const isInCheck = check_detected_mgc(kingSquare, sideToMove, board) !== 0;

  return {
    score: isInCheck ? (MATE + depth) : 0, // Если шах — мат, иначе пат (0)
    pvLine: nextPvLine,
    bestScoreBoard: new Int32Array(board),
    rootBestMoveBoard: depth === 0 ? new Int32Array(board) : null,
    nodes: 0
  };
};

/**
 * ГЛАВНАЯ ФУНКЦИЯ ПОИСКА (NEGAMAX) В ФУНКЦИОНАЛЬНОМ СТИЛЕ
 * Обратите внимание: здесь нет ни одного `let` и ни одного цикла `for`.
 * 
 * @param {Int32Array} board - Текущая позиция
 * @param {BigUint64Array} key64 - Зобрист-ключ
 * @param {Int32Array} pvLine - Текущая линия варианта
 * @param {number} depth - Текущая глубина
 * @param {number} depthMax - Максимальная глубина
 * @returns {SearchResult}
 */
const searchingNegamaxFP = (board, key64, pvLine, depth, depthMax) => {
  // 1. Базовый случай рекурсии: достигли максимальной глубины
  if (depth >= depthMax) {
    return {
      score: score_position_e(board),
      pvLine: new Int32Array(pvLine),
      bestScoreBoard: new Int32Array(board),
      rootBestMoveBoard: null,
      nodes: 1 // Возвращаем 1 посещенный лист вместо мутации глобальной node_mm
    };
  }

  // 2. Генерируем список псевдо-легальных ходов
  const movesList = generateMovesPure(board);
  const totalMovesCount = movesList[IND_NUMBER_MOVE_ML];

  // Создаем массив индексов [0, 1, 2, ... totalMovesCount - 1] для декларативной обработки
  const moveIndices = Array.from({ length: totalMovesCount }, (_, idx) => idx);

  // 3. КОНВЕЙЕР ОБРАБОТКИ ХОДОВ (вместо цикла for с continue):
  // Шаг А (.map): пробуем сделать каждый ход на копии доски
  // Шаг Б (.filter): отбрасываем нелегальные ходы (где король под шахом или битая рокировка)
  const legalTransitions = moveIndices
    .map((moveIndex) => ({
      moveIndex,
      ...makeMovePure(board, key64, moveIndex, movesList)
    }))
    .filter((transition) => transition.isLegal);

  // 4. Если легальных ходов не осталось — возвращаем оценку мата или пата
  if (legalTransitions.length === 0) {
    return evaluateTerminalPosition(board, pvLine, depth);
  }

  // 5. Начальное состояние аккумулятора (нейтральный элемент для поиска максимума)
  /** @type {SearchResult} */
  const initialAcc = {
    score: INIT_EVAL,
    pvLine: new Int32Array(pvLine),
    bestScoreBoard: new Int32Array(board),
    rootBestMoveBoard: null,
    nodes: 0
  };

  // 6. СВЕРТКА (REDUCE): проходим по всем легальным переходам и выбираем лучший
  return legalTransitions.reduce((bestAcc, transition) => {
    // Готовим копию линии PV для погружения на глубину + 1
    const branchPvLine = new Int32Array(pvLine);
    add_move_to_pv_line_pv(transition.moveIndex, movesList, branchPvLine, depth);
    if (depth === 0) {
      branchPvLine[IND_TYPE_VARIANT_PV] = 1;
    }

    // Рекурсивный вызов для дочерней позиции
    const childResult = searchingNegamaxFP(
      transition.nextBoard,
      transition.nextKey64,
      branchPvLine,
      depth + 1,
      depthMax
    );

    // Инвертируем оценку для Negamax
    const currentScore = -childResult.score;
    // Суммируем счетчик узлов (моноид сложения!)
    const totalNodes = bestAcc.nodes + childResult.nodes;

    // Если нашли ход лучше, обновляем аккумулятор (возвращаем новый объект)
    if (currentScore > bestAcc.score) {
      return {
        score: currentScore,
        pvLine: childResult.pvLine,
        bestScoreBoard: childResult.bestScoreBoard,
        rootBestMoveBoard: depth === 0 ? transition.nextBoard : bestAcc.rootBestMoveBoard,
        nodes: totalNodes
      };
    }

    // Иначе оставляем старый лучший результат, но обновляем общее число просмотренных узлов
    return {
      ...bestAcc,
      nodes: totalNodes
    };
  }, initialAcc);
};

export { searchingNegamaxFP };
