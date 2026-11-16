// @ts-check
/**
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name search_negamax_0x88.js
 * @version created 16.05m.2026
 * 
 * @description
 * Модуль полного перебора дерева игры по алгоритму Negamax для представления доски 0x88.
 * Использует преаллоцированные стеки состояния (make/unmake без аллокаций в куче)
 * и сбор главной линии вариантов (Principal Variation, PV).
 */

import {
  BOARD_SIZE_CB,
  SIDE_TO_MOVE_CB,
  BLACK_CB,
  WHITE_CB,
  IND_KING_FROM_WHITE_CB,
  IND_KING_FROM_BLACK_CB
} from "../core_0x88_t/chess_board_0x88_t/chess_board_0x88.js";

import {
  clear_list_ml,
  get_type_move_ml,
  get_from_ml,
  get_to_ml,
  LENGTH_LIST_ML,
  IND_PIECE_COLOR_ML,
  IND_NUMBER_MOVE_ML,
  MOVE_NO_ML
} from "../core_0x88_t/move_list_0x88_t/move_list_0x88.js";

import {
  add_move_to_pv_line_pv,
  save_pv_line_pv,
  MAX_DEPTH_PV,
  IND_TYPE_VARIANT_PV,
  IND_DEPTH_MAT_PV
} from "./pv_line_0x88.js";

import {
  generated_pseudo_legal_captures_mgc,
  check_detected_mgc
} from "../core_0x88_t/generator_move_0x88_t/generator_move_captures_0x88.js";

import {
  generated_pseudo_legal_quiet_moves_mgq
} from "../core_0x88_t/generator_move_0x88_t/generator_move_quiet_0x88.js";

import { do_moves_mm } from "../core_0x88_t/make_move_0x88_t/make_move_0x88.js";
import { score_position_e } from "../evaluate_0x88/evaluate_0x88.js";
import {
  set_key_from_board_0x88_tk,
  test_chess_board_key_64_tk
} from "../heuristic_0x88/transposition_table_0x88/transposition_key_0x88.js";

// ============================================================================
// КОНСТАНТЫ ПОИСКА
// ============================================================================

/** Максимально возможная глубина дерева поиска (размер преаллоцированных стеков) */
const MAX_DEPTH_SEARCH = 129;

/** Базовая оценка мата (меньше любой позиционной оценки) */
const MATE_SCORE = -30000;

/** Начальное значение лучшей оценки (ниже оценки мата на любой глубине) */
const INITIAL_BEST_SCORE = -40000;

/** Смещение для кодирования глубины мата в линии PV (отличает мат на 1-м полуходе от 0) */
const PV_MATE_DEPTH_OFFSET = 500;

/** Коды возврата функции выполнения хода do_moves_mm */
const MOVE_STATUS = {
  ILLEGAL_KING_IN_CHECK: 0, // Ход оставляет своего короля под шахом (нужен откат доски)
  LEGAL: 1,                 // Легальный ход
  ILLEGAL_NOT_EXECUTED: 2   // Нелегальная рокировка или взятие короля (доска не менялась)
};

// ============================================================================
// ПРЕАЛЛОЦИРОВАННЫЕ СТЕКИ СОСТОЯНИЯ (Zero-Allocation в процессе поиска)
// ============================================================================

/** @type {Int32Array[]} Стек копий доски для быстрого отката хода на каждой глубине */
const boardUndoStack = new Array(MAX_DEPTH_SEARCH);

/** @type {BigUint64Array[]} Стек Зобрист-ключей для отката хеша позиции */
const zobristKeyUndoStack = new Array(MAX_DEPTH_SEARCH);

/** @type {Int32Array[]} Стек списков сгенерированных псевдо-легальных ходов */
const moveListStack = new Array(MAX_DEPTH_SEARCH);

/** @type {Int32Array[]} Стек лучших линий вариантов (PV) для каждого уровня рекурсии */
const bestPvLineStack = new Array(MAX_DEPTH_SEARCH);

/** @type {Int32Array[]} [DEBUG] Стек позиций, соответствующих лучшей найденной оценке */
const debugBestScoreBoardStack = new Array(MAX_DEPTH_SEARCH);

/** @type {Int32Array} Позиция на доске после выполнения лучшего хода в корне (depth === 0) */
const chess_board_0x88_found_best_score = new Int32Array(BOARD_SIZE_CB).fill(0);

/** @type {BigUint64Array} [DEBUG] Временный буфер для сверки инкрементального Зобрист-ключа */
const debugZobristKeyBuffer = new BigUint64Array(1);

/** Счетчик посещенных терминальных узлов (листьев дерева) за последний поиск */
let node_mm = 0;

// ============================================================================
// ИНИЦИАЛИЗАЦИЯ И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================================

/**
 * Выделяет память под все стеки поиска один раз до старта движка.
 * Исключает сборку мусора (GC) во время перебора вариантов.
 */
const ini_stack = function () {
  for (let depth = 0; depth < MAX_DEPTH_SEARCH; depth++) {
    boardUndoStack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
    zobristKeyUndoStack[depth] = new BigUint64Array(1);
    moveListStack[depth] = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);
    bestPvLineStack[depth] = new Int32Array(MAX_DEPTH_PV).fill(MOVE_NO_ML);
    debugBestScoreBoardStack[depth] = new Int32Array(BOARD_SIZE_CB).fill(MOVE_NO_ML);
  }
};

/**
 * [DEBUG] Проверяет целостность инкрементально обновляемого Зобрист-ключа,
 * сравнивая его с ключом, вычисленным «с нуля» по текущей позиции.
 * 
 * @param {Int32Array} board - Текущая доска 0x88
 * @param {BigUint64Array} incrementalKey64 - Инкрементальный Зобрист-ключ
 */
const verifyZobristKeyIntegrity = function (board, incrementalKey64) {
  set_key_from_board_0x88_tk(board, debugZobristKeyBuffer);
  test_chess_board_key_64_tk(debugZobristKeyBuffer, incrementalKey64);
};

/**
 * Вычисляет итоговую оценку терминального узла, в котором у стороны нет легальных ходов.
 * Различает Мат (король под шахом) и Пат (шаха нет).
 * 
 * @param {Int32Array} board - Текущая позиция 0x88
 * @param {Int32Array} pvLine - Текущая линия вариантов
 * @param {number} depth - Текущая глубина от корня
 * @returns {number} Оценка мата (MATE_SCORE + depth) или пата (0)
 */
const evaluateCheckmateOrStalemate = function (board, pvLine, depth) {
  // Фиксируем глубину окончания партии в линии PV (depth - 1, так как на текущем уровне ход не сделан)
  pvLine[IND_DEPTH_MAT_PV] = depth - 1 + PV_MATE_DEPTH_OFFSET;

  const sideToMove = board[SIDE_TO_MOVE_CB];
  const kingSquare = sideToMove === WHITE_CB
    ? board[IND_KING_FROM_WHITE_CB]
    : board[IND_KING_FROM_BLACK_CB];

  const isKingInCheck = check_detected_mgc(kingSquare, sideToMove, board) !== 0;

  // Чем ближе мат к корню (меньше depth), тем хуже оценка для проигрывающей стороны
  return isKingInCheck ? (MATE_SCORE + depth) : 0;
};
// ============================================================================
// ОСНОВНОЙ АЛГОРИТМ ПОИСКА (NEGAMAX)
// ============================================================================

/**
 * Рекурсивный поиск лучшего хода методом Negamax.
 * 
 * @param {Int32Array} chess_board_0x88 - Текущая шахматная доска (мутируется при ходе и откатывается назад)
 * @param {Int32Array} chess_board_0x88_score - [DEBUG] Буфер для сохранения листовой позиции лучшей оценки
 * @param {BigUint64Array} chess_board_key_64 - Текущий 64-битный Зобрист-ключ позиции (элемент)
 * @param {Int32Array} packing_pv_line - Буфер для записи текущей и лучшей главной линии (PV)
 * @param {number} depth - Текущая глубина погружения (0 в корне)
 * @param {number} depth_max - Целевая глубина горизонта поиска
 * @returns {number} Оценка позиции в сантипешках с точки зрения активной стороны
 */
const searching_negamax = function (
  chess_board_0x88,
  chess_board_0x88_score,
  chess_board_key_64,
  packing_pv_line,
  depth,
  depth_max
) {
  if (depth === 0) {
    node_mm = 0;
  }

  // 1. БАЗОВЫЙ СЛУЧАЙ: Достигнут горизонт поиска -> статическая оценка позиции
  if (depth >= depth_max) {
    node_mm += 1;
    chess_board_0x88_score.set(chess_board_0x88);
    verifyZobristKeyIntegrity(chess_board_0x88, chess_board_key_64);

    return score_position_e(chess_board_0x88);
  }

  // Получаем рабочие массивы из преаллоцированного стека для текущей глубины
  const boardUndo = boardUndoStack[depth];
  const key64Undo = zobristKeyUndoStack[depth];
  const moveList = moveListStack[depth];
  const bestPvLine = bestPvLineStack[depth];
  const debugBestScoreBoard = debugBestScoreBoardStack[depth];

  // 2. ГЕНЕРАЦИЯ ХОДОВ: Сначала взятия, затем тихие ходы
  clear_list_ml(moveList);
  generated_pseudo_legal_captures_mgc(chess_board_0x88, moveList);
  generated_pseudo_legal_quiet_moves_mgq(chess_board_0x88, moveList);

  const totalPseudoMoves = moveList[IND_NUMBER_MOVE_ML];
  const activeColor = moveList[IND_PIECE_COLOR_ML];

  let bestScore = INITIAL_BEST_SCORE;
  let hasFoundBetterMove = false;
  let legalMovesCount = 0;

  // 3. ПЕРЕБОР ВСЕХ СГЕНЕРИРОВАННЫХ ХОДОВ
  for (let moveIdx = 0; moveIdx < totalPseudoMoves; moveIdx++) {
    // Сохраняем состояние доски и Зобрист-ключ (по индексу) перед ходом
    boardUndo.set(chess_board_0x88);
    key64Undo[0] = chess_board_key_64[0];

    const moveType = get_type_move_ml(moveIdx, moveList);
    const fromSquare = get_from_ml(moveIdx, moveList);
    const toSquare = get_to_ml(moveIdx, moveList);

    // Пытаемся применить ход к доске
    const moveStatus = do_moves_mm(
      chess_board_0x88,
      chess_board_key_64,
      moveType,
      fromSquare,
      toSquare,
      activeColor
    );

    // Фильтрация нелегальных ходов
    if (moveStatus === MOVE_STATUS.ILLEGAL_KING_IN_CHECK) {
      chess_board_0x88.set(boardUndo);
      chess_board_key_64[0] = key64Undo[0];
      continue;
    }
    if (moveStatus === MOVE_STATUS.ILLEGAL_NOT_EXECUTED) {
      continue;
    }

    // Ход легален: обновляем счетчик и записываем ход в текущую линию вариантов (PV)
    legalMovesCount += 1;
    add_move_to_pv_line_pv(moveIdx, moveList, packing_pv_line, depth);

    // Помечаем линию PV как валидный игровой вариант при старте ветки из корня
    if (depth === 0) {
      packing_pv_line[IND_TYPE_VARIANT_PV] = 1;
    }

    // Рекурсивный спуск на следующий полуход (инвертируем знак оценки по принципу Negamax)
    const childScore = -searching_negamax(
      chess_board_0x88,
      chess_board_0x88_score,
      chess_board_key_64,
      packing_pv_line,
      depth + 1,
      depth_max
    );

    // 4. ОБНОВЛЕНИЕ ЛУЧШЕЙ ОЦЕНКИ И ГЛАВНОЙ ЛИНИИ (PV) — строго ДО отката доски!
    if (childScore > bestScore) {
      bestScore = childScore;
      hasFoundBetterMove = true;

      save_pv_line_pv(bestPvLine, packing_pv_line);
      debugBestScoreBoard.set(chess_board_0x88_score);

      // Фиксируем позицию ПОСЛЕ лучшего хода в корне (для визуализации доски)
      if (depth === 0) {
        chess_board_0x88_found_best_score.set(chess_board_0x88);
      }
    }

    // 5. ОТКАТ СОСТОЯНИЯ ДОСКИ И ЗОБРИСТ-КЛЮЧА ПОСЛЕ ВОЗВРАТА ИЗ РЕКУРСИИ
    chess_board_0x88.set(boardUndo);
    chess_board_key_64[0] = key64Undo[0];
  }

  // 6. ПРОВЕРКА НА МАТ ИЛИ ПАТ (если ни один ход не оказался легальным)
  if (legalMovesCount === 0) {
    if (depth === 0) {
      chess_board_0x88_found_best_score.set(chess_board_0x88);
    }
    chess_board_0x88_score.set(chess_board_0x88);

    return evaluateCheckmateOrStalemate(chess_board_0x88, packing_pv_line, depth);
  }

  // 7. ФИКСАЦИЯ ЛУЧШЕГО ВАРИАНТА НА ТЕКУЩЕМ УРОВНЕ
  if (hasFoundBetterMove) {
    save_pv_line_pv(packing_pv_line, bestPvLine);
    chess_board_0x88_score.set(debugBestScoreBoard);
  }

  return bestScore;
};

export {
  searching_negamax,
  ini_stack,
  chess_board_0x88_found_best_score,
  node_mm
};
