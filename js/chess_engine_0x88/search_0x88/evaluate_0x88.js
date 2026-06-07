// @ts-check
/**
@copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
@author AnBr75
@name evaluate_0x88.js
@version created 29.11m.2026, 07.06m.2026
Code review: Qwen3.7-Max AI
Qwen3.7-Max AI: FIXED: PST now contain relative bonuses only
*/
import {
    x07_y07_to_0x88_cb, s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    test_print_any_0x88_cb, test_print_piece_0x88_cb, test_print_piece_color_0x88_cb, test_print_piece_in_line_0x88_cb,
    test_compare_chess_board_0x88_cb, set_board_from_fen_0x88_cb, set_fen_from_0x88_cb,
    searching_king_cb, iniStartPositionForWhite_cb, letter_to_x_coordinate_cb,
    s_0x88_out_of_bounds_cb, get_piece_color_cb, get_piece_type_cb, create_piece_cb,
    BOARD_SIZE_CB, OUT_OF_BOUNDS_MASK_CB, SIDE_TO_MOVE_CB, LET_COOR_CB,
    BLACK_CB, WHITE_CB, PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, IND_CASTLING_Q_CB, IND_CASTLING_q_CB, IND_CASTLING_K_CB,
    IND_CASTLING_k_CB, IND_HALFMOVE_CLOCK_CB, IND_FULLMOVE_NUMBER_CB, PIECE_NAME_CB, IND_EN_PASSANT_YES_CB,
    IND_EN_PASSANT_TARGET_SQUARE_CB, IND_KING_FROM_WHITE_CB, IND_KING_FROM_BLACK_CB, IND_SCORE_CB,
    SQUARE_64_to_128_CB, SQUARE_128_to_64_CB
} from "../move_generator_0x88/chess_board_0x88.js";

/**
НАЗНАЧЕНИЕ
Оценочная функция с Tapered Eval (интерполяция MG/EG).

ИСПРАВЛЕНИЯ (v3):
  - КРИТИЧЕСКИЙ баг: PST теперь содержат ТОЛЬКО позиционные бонусы (-50...+50),
    а не абсолютные значения (300-5000).
  - Базовый материал (PIECE_SCORE_MG/EG) добавляется ОТДЕЛЬНО.
  - До исправления движок показывал оценку 21000+ вместо ~0 в стартовой позиции.
*/

// =============================================================================
// БАЗОВЫЕ ВЕСА ФИГУР (добавляются ОТДЕЛЬНО от PST)
// =============================================================================
const PAWN_SCORE_E = 100;
const KNIGHT_SCORE_E = 320;
const BISHOP_SCORE_E = 330;
const ROOK_SCORE_E = 500;
const QUEEN_SCORE_E = 900;
const KING_SCORE_E = 20000;

// ИСПРАВЛЕННЫЙ КОД:
const PIECE_SCORE_MG = new Int32Array([
    0,  100, 320, 330, 500, 900, 20000,  0,  // ← 8 элементов (индексы 0-7)
    0, -100,-320,-330,-500,-900,-20000       // ← 7 элементов (индексы 8-14)
]);

const PIECE_SCORE_EG = new Int32Array([
    0,  100, 310, 320, 500, 900, 20000,  0,  // ← 8 элементов
    0, -100,-310,-320,-500,-900,-20000       // ← 7 элементов
]);

// Legacy export
const PIECE_SCORE_E = [
    0, PAWN_SCORE_E, KNIGHT_SCORE_E, BISHOP_SCORE_E, ROOK_SCORE_E, QUEEN_SCORE_E, KING_SCORE_E, 0, 0,
    -PAWN_SCORE_E, -KNIGHT_SCORE_E, -BISHOP_SCORE_E, -ROOK_SCORE_E, -QUEEN_SCORE_E, -KING_SCORE_E
];

// =============================================================================
// ФАЗА ИГРЫ (Tapered Eval)
// =============================================================================
const PHASE_WEIGHTS = new Int32Array([
    0, 0, 1, 1, 2, 4, 0,   // 0-6 (Белые)
    0, 0,                   // 7-8 (Заполнители)
    0, 1, 1, 2, 4, 0        // 9-14 (Черные)
]);
const MAX_PHASE_MATERIAL = 24;

// =============================================================================
// PIECE-SQUARE TABLES (ОТНОСИТЕЛЬНЫЕ бонусы для MG, БЕЗ базового материала!)
// Принципы: развитие > вывод ферзя > рокировка > контроль центра
// =============================================================================
const PST_EMPTY = new Int32Array(128);

// --- ПЕШКИ MG: контроль центра, штрафы за крайние пешки ---
const MG_W_PAWN = new Int32Array([
      0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0,  // rank 0 (8-я, превращение)
     50,  50,  50,  50,  50,  50,  50,  50,  0,0,0,0,0,0,0,0,  // rank 1 (7-я, перед превращением)
     10,  10,  20,  30,  30,  20,  10,  10,  0,0,0,0,0,0,0,0,  // rank 2 (6-я)
      5,   5,  10,  20,  20,  10,   5,   5,  0,0,0,0,0,0,0,0,  // rank 3 (5-я)
      0,   0,   5,  15,  15,   5,   0,   0,  0,0,0,0,0,0,0,0,  // rank 4 (4-я: e4,d4 = +15!)
      0,  -5,  -5,   0,   0,  -5,  -5,   0,  0,0,0,0,0,0,0,0,  // rank 5 (3-я)
      5,  10,  10, -15, -15,  10,  10,   5,  0,0,0,0,0,0,0,0,  // rank 6 (2-я: e2,d2 = -15, не двигай без нужды)
      0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0   // rank 7 (1-я)
]);

// --- КОНИ MG: ОГРОМНЫЙ бонус за f3/c3, штраф за края и стартовую позицию ---
const MG_W_KNIGHT = new Int32Array([
    -50, -40, -30, -20, -20, -30, -40, -50,  0,0,0,0,0,0,0,0,  // rank 0 (8-я)
    -40, -20,   0,   5,   5,   0, -20, -40,  0,0,0,0,0,0,0,0,  // rank 1 (7-я)
    -30,   0,  10,  15,  15,  10,   0, -30,  0,0,0,0,0,0,0,0,  // rank 2 (6-я)
    -20,   5,  15,  25,  25,  15,   5, -20,  0,0,0,0,0,0,0,0,  // rank 3 (5-я: центр!)
    -20,   5,  15,  25,  25,  15,   5, -20,  0,0,0,0,0,0,0,0,  // rank 4 (4-я: центр!)
    -30,   0,  15,  20,  20,  15,   0, -30,  0,0,0,0,0,0,0,0,  // rank 5 (3-я: c3,f3 = +15-20!)
    -40, -20,   0,   5,   5,   0, -20, -40,  0,0,0,0,0,0,0,0,  // rank 6 (2-я)
    -50, -40, -30, -20, -20, -30, -40, -50,  0,0,0,0,0,0,0,0   // rank 7 (1-я: b1,g1 = -40, штраф!)
]);

// --- СЛОНЫ MG: фианкетто, активные диагонали, штраф за пассивность ---
const MG_W_BISHOP = new Int32Array([
    -20, -10, -10, -10, -10, -10, -10, -20,  0,0,0,0,0,0,0,0,
    -10,   0,   0,   0,   0,   0,   0, -10,  0,0,0,0,0,0,0,0,
    -10,   0,  10,  10,  10,  10,   0, -10,  0,0,0,0,0,0,0,0,
    -10,   5,   5,  15,  15,   5,   5, -10,  0,0,0,0,0,0,0,0,
    -10,   5,  10,  15,  15,  10,   5, -10,  0,0,0,0,0,0,0,0,
    -10,  10,  10,  10,  10,  10,  10, -10,  0,0,0,0,0,0,0,0,  // rank 5: c4,f4,b5,g5 = +10
    -10,  10,   5,   5,   5,   5,  10, -10,  0,0,0,0,0,0,0,0,  // rank 6: b2,g2 = +10 (фианкетто!)
    -20, -10, -10, -10, -10, -10, -10, -20,  0,0,0,0,0,0,0,0   // rank 7: c1,f1 = -10 (заперт!)
]);

// --- ЛАДЬИ MG: 7-я горизонталь, связь после рокировки ---
const MG_W_ROOK = new Int32Array([
      0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0,
     20,  20,  20,  20,  20,  20,  20,  20,  0,0,0,0,0,0,0,0,  // rank 1: 7-я горизонталь!
     -5,   0,   0,   0,   0,   0,   0,  -5,  0,0,0,0,0,0,0,0,
     -5,   0,   0,   0,   0,   0,   0,  -5,  0,0,0,0,0,0,0,0,
     -5,   0,   0,   0,   0,   0,   0,  -5,  0,0,0,0,0,0,0,0,
     -5,   0,   0,   0,   0,   0,   0,  -5,  0,0,0,0,0,0,0,0,
     -5,   0,   0,   0,   0,   0,   0,  -5,  0,0,0,0,0,0,0,0,
      0,   0,   0,  10,  10,   0,   0,   0,  0,0,0,0,0,0,0,0   // rank 7: d1,e1 = +10 (связь после рокировки)
]);

// --- ФЕРЗИ MG: ШТРАФ за ранний вывод! Все центральные поля отрицательные ---
const MG_W_QUEEN = new Int32Array([
    -30, -25, -25, -20, -20, -25, -25, -30,  0,0,0,0,0,0,0,0,  // rank 0: глубокий тыл
    -25, -15, -10,  -5,  -5, -10, -15, -25,  0,0,0,0,0,0,0,0,  // rank 1: 7-я (атака в эндшпиле)
    -20, -10,  -5,   0,   0,  -5, -10, -20,  0,0,0,0,0,0,0,0,  // rank 2
    -15,  -5,   0,   5,   5,   0,  -5, -15,  0,0,0,0,0,0,0,0,  // rank 3
    -15,  -5,   0,   5,   5,   0,  -5, -15,  0,0,0,0,0,0,0,0,  // rank 4: центр = +5, но мало!
    -20, -10,  -5,   0,   0,  -5, -10, -20,  0,0,0,0,0,0,0,0,  // rank 5
    -25, -15, -10, -10, -10, -10, -15, -25,  0,0,0,0,0,0,0,0,  // rank 6: 2-я горизонталь
    -30, -25, -20, -15, -15, -20, -25, -30,  0,0,0,0,0,0,0,0   // rank 7: d1 = -15 (держи дома!)
]);

// --- КОРОЛИ MG: РОКИРОВКА ИЛИ СМЕРТЬ! Огромный бонус за g1/c1 ---
const MG_W_KING = new Int32Array([
    -50, -40, -30, -20, -20, -30, -40, -50,  0,0,0,0,0,0,0,0,
    -40, -30, -20, -10, -10, -20, -30, -40,  0,0,0,0,0,0,0,0,
    -30, -20, -10,   0,   0, -10, -20, -30,  0,0,0,0,0,0,0,0,
    -30, -20, -10,   0,   0, -10, -20, -30,  0,0,0,0,0,0,0,0,
    -30, -20, -10,   0,   0, -10, -20, -30,  0,0,0,0,0,0,0,0,
    -30, -20, -10,   0,   0, -10, -20, -30,  0,0,0,0,0,0,0,0,
    -30, -20, -10,   0,   0, -10, -20, -30,  0,0,0,0,0,0,0,0,
    -30, -20, -10, -20, -20, -10,  20, -30,  0,0,0,0,0,0,0,0   // g1 = +20, c1 = +10 (рокировка!), e1 = -20 (плохо!)
]);

// --- ПЕШКИ EG: проходные экстремально ценны ---
const EG_W_PAWN = new Int32Array([
      0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0,
     80,  80,  80,  80,  80,  80,  80,  80,  0,0,0,0,0,0,0,0,  // Почти ферзь!
     10,  10,  15,  20,  20,  15,  10,  10,  0,0,0,0,0,0,0,0,
    -30, -30, -20, -10, -10, -20, -30, -30,  0,0,0,0,0,0,0,0,
    -40, -40, -30, -20, -20, -30, -40, -40,  0,0,0,0,0,0,0,0,
    -40, -40, -30, -20, -20, -30, -40, -40,  0,0,0,0,0,0,0,0,
    -40, -40, -40, -40, -40, -40, -40, -40,  0,0,0,0,0,0,0,0,
      0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0
]);

// --- КОРОЛИ EG: активный король идёт в центр ---
const EG_W_KING = new Int32Array([
    -40, -30, -20, -10, -10, -20, -30, -40,  0,0,0,0,0,0,0,0,
    -30, -10,   0,  10,  10,   0, -10, -30,  0,0,0,0,0,0,0,0,
    -20,   0,  20,  30,  30,  20,   0, -20,  0,0,0,0,0,0,0,0,
    -10,  10,  30,  50,  50,  30,  10, -10,  0,0,0,0,0,0,0,0,
    -10,  10,  30,  50,  50,  30,  10, -10,  0,0,0,0,0,0,0,0,
    -20,   0,  20,  30,  30,  20,   0, -20,  0,0,0,0,0,0,0,0,
    -30, -10,   0,  10,  10,   0, -10, -30,  0,0,0,0,0,0,0,0,
    -40, -30, -20, -10, -10, -20, -30, -40,  0,0,0,0,0,0,0,0
]);

// Для остальных фигур в EG используем те же PST что и в MG
const EG_W_KNIGHT = new Int32Array(MG_W_KNIGHT);
const EG_W_BISHOP = new Int32Array(MG_W_BISHOP);
const EG_W_ROOK   = new Int32Array(MG_W_ROOK);
const EG_W_QUEEN  = new Int32Array(MG_W_QUEEN);

// =============================================================================
// ОТЗЕРКАЛИВАНИЕ ДЛЯ ЧЁРНЫХ (ИСПРАВЛЕНО!)
// =============================================================================
/**
 * Отзеркаливает белую PST для чёрных: rank 0..7 -> 7..0, меняет знак.
 * ИСПРАВЛЕНО: теперь правильно зеркалирует координаты!
 * @param {Int32Array} whitePST
 * @returns {Int32Array}
 */
function makeBlackPST(whitePST) {
    const black = new Int32Array(128);
    for (let r = 0; r < 8; r++) {
        const whiteRank = (7 - r) * 16;  // ИСПРАВЛЕНО: зеркалим правильно!
        const blackRank = r * 16;
        for (let f = 0; f < 8; f++) {
            black[blackRank + f] = -whitePST[whiteRank + f];
        }
    }
    return black;
}

const MG_B_PAWN   = makeBlackPST(MG_W_PAWN);
const MG_B_KNIGHT = makeBlackPST(MG_W_KNIGHT);
const MG_B_BISHOP = makeBlackPST(MG_W_BISHOP);
const MG_B_ROOK   = makeBlackPST(MG_W_ROOK);
const MG_B_QUEEN  = makeBlackPST(MG_W_QUEEN);
const MG_B_KING   = makeBlackPST(MG_W_KING);

const EG_B_PAWN   = makeBlackPST(EG_W_PAWN);
const EG_B_KNIGHT = makeBlackPST(EG_W_KNIGHT);
const EG_B_BISHOP = makeBlackPST(EG_W_BISHOP);
const EG_B_ROOK   = makeBlackPST(EG_W_ROOK);
const EG_B_QUEEN  = makeBlackPST(EG_W_QUEEN);
const EG_B_KING   = makeBlackPST(EG_W_KING);

// Сборные массивы для O(1)-доступа по piece ID
const ALL_MG_PST = [
    PST_EMPTY, MG_W_PAWN, MG_W_KNIGHT, MG_W_BISHOP, MG_W_ROOK, MG_W_QUEEN, MG_W_KING,
    PST_EMPTY, PST_EMPTY,
    MG_B_PAWN, MG_B_KNIGHT, MG_B_BISHOP, MG_B_ROOK, MG_B_QUEEN, MG_B_KING
];
const ALL_EG_PST = [
    PST_EMPTY, EG_W_PAWN, EG_W_KNIGHT, EG_W_BISHOP, EG_W_ROOK, EG_W_QUEEN, EG_W_KING,
    PST_EMPTY, PST_EMPTY,
    EG_B_PAWN, EG_B_KNIGHT, EG_B_BISHOP, EG_B_ROOK, EG_B_QUEEN, EG_B_KING
];

// =============================================================================
// ГЛАВНАЯ ФУНКЦИЯ ОЦЕНКИ (ИСПРАВЛЕНО!)
// =============================================================================
/**
 * Основная оценка позиции с Tapered Eval.
 * ИСПРАВЛЕНО: теперь базовый материал добавляется ОТДЕЛЬНО от PST.
 *
 * @param {Int32Array} chess_board_0x88
 * @returns {number} оценка в сантипешках (с точки зрения ходящей стороны)
 */
const score_position_e = function (chess_board_0x88) {
    let mg_score = 0;
    let eg_score = 0;
    let game_phase = 0;

    // === ПРОХОД ПО ДОСКЕ ===
    for (let rank = 0; rank < 128; rank += 16) {
        for (let sq = rank; sq < rank + 8; sq++) {
            const piece = chess_board_0x88[sq];
            if (piece === PIECE_NO_CB) continue;

            // ★★★ ИСПРАВЛЕНИЕ: Базовый материал добавляется ОТДЕЛЬНО ★★★
            mg_score += PIECE_SCORE_MG[piece];
            eg_score += PIECE_SCORE_EG[piece];

            // Позиционные бонусы из PST (теперь относительные!)
            mg_score += ALL_MG_PST[piece][sq];
            eg_score += ALL_EG_PST[piece][sq];

            game_phase += PHASE_WEIGHTS[piece];
        }
    }

    // Защита от переполнения фазы
    if (game_phase > MAX_PHASE_MATERIAL) game_phase = MAX_PHASE_MATERIAL;

    // === TAPERED EVAL ===
    const mg_weight = game_phase;
    const eg_weight = MAX_PHASE_MATERIAL - mg_weight;
    const final_score = ((mg_score * mg_weight + eg_score * eg_weight) / MAX_PHASE_MATERIAL) | 0;

    // Side-to-move
    return (chess_board_0x88[SIDE_TO_MOVE_CB] === BLACK_CB) ? -final_score : final_score;
};

// =============================================================================
// ТЕСТЫ
// =============================================================================
// тестируем фен. то что правильно в него записывается позиция и наоборот - считывается
/**
* @param {Int32Array} chess_board_0x88
* @returns {void}
*/
const test_fen_e = function (chess_board_0x88) {
    let chess_board_0x88_O_save = new Int32Array(BOARD_SIZE_CB).fill(0);
    chess_board_0x88_O_save.set(chess_board_0x88);

    let fen_save_1 = set_fen_from_0x88_cb(chess_board_0x88);
    set_board_from_fen_0x88_cb(fen_save_1, chess_board_0x88);

    let fen_save_2 = set_fen_from_0x88_cb(chess_board_0x88);
    set_board_from_fen_0x88_cb(fen_save_2, chess_board_0x88);

    let fen_save_3 = set_fen_from_0x88_cb(chess_board_0x88);
    set_board_from_fen_0x88_cb(fen_save_3, chess_board_0x88);

    let fen_save_4 = set_fen_from_0x88_cb(chess_board_0x88);
    set_board_from_fen_0x88_cb(fen_save_4, chess_board_0x88);

    if ((fen_save_1 != fen_save_2) && (fen_save_2 != fen_save_3) && (fen_save_3 != fen_save_4)) {
        console.log("test_fen " + fen_save_1 + " != " + fen_save_2 + " != " + fen_save_3 + " != " + fen_save_4);
    }

    let fen_save_5 = set_fen_from_0x88_cb(chess_board_0x88_O_save);
    test_compare_chess_board_0x88_cb(chess_board_0x88_O_save, chess_board_0x88);
}

export { score_position_e, test_fen_e, PAWN_SCORE_E, PIECE_SCORE_E };