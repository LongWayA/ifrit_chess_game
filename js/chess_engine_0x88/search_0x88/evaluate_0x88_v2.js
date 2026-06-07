// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name evaluate_0x88.js
 * @version created 29.11m.2026 
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

import {
  ini_random_key_array_64_tk, ini_key_array_64_tk, set_key_from_board_0x88_tk, test_chess_board_key_64_tk,
  key_update_do_move_0x88_tk, key_update_ep_move_0x88_tk, key_update_promo_move_0x88_tk,
  key_update_castle_move_0x88_tk, key_update_ep_0x88_tk, key_update_ep_sq_0x88_tk, key_update_QqKk_0x88_tk,
  test_generation_key_64_tk
} from "../for_sorting_move_0x88/transposition_key_0x88.js";

/**
* НАЗНАЧЕНИЕ

*/

// оценки фигур
const PAWN_SCORE_E = 100;  // пешка 
const KNIGHT_SCORE_E = 400;  // конь
const BISHOP_SCORE_E = 400;  // слон
const ROOK_SCORE_E = 600;  // ладья
const QUEEN_SCORE_E = 1200; // ферзь
const KING_SCORE_E = 5000;// король

// Имена фигур закодированы цифрами: 
// 0- нет фигуры, 
// 1- пешка, 2-конь, 3-слон, 4-ладья,  5-ферзь,  6-король <- белые фигуры 
// 9- пешка, 10-конь, 11-слон, 12-ладья, 13-ферзь, 14-король <- черные фигуры 
//                     0  1             2               3               4             5              6             7  8
const PIECE_SCORE_E = [0, PAWN_SCORE_E, KNIGHT_SCORE_E, BISHOP_SCORE_E, ROOK_SCORE_E, QUEEN_SCORE_E, KING_SCORE_E, 0, 0,
  //9             10              11              12            13             14   
  PAWN_SCORE_E, KNIGHT_SCORE_E, BISHOP_SCORE_E, ROOK_SCORE_E, QUEEN_SCORE_E, KING_SCORE_E];

// Веса фигур для определения фазы игры (Ферзь=4, Ладья=2, Легкая=1, Пешка/Король=0)
// Индексы соответствуют ID фигур: 0-6 белые, 9-14 черные
const PHASE_WEIGHTS = new Int32Array([
  0, 0, 1, 1, 2, 4, 0, // 0-6 (Белые)
  0, 0,                // 7-8 (Заполнители)
  0, 1, 1, 2, 4, 0     // 9-14 (Черные)
]);

const MAX_PHASE_MATERIAL = 24; 
const PST_EMPTY = new Int32Array(128);

// =========================================================================
// 1. УЛУЧШЕННЫЕ ТАБЛИЦЫ ДЛЯ МИТТЕЛЬШПИЛЯ (MG)
// =========================================================================

// Пешки: сильный стимул захвата центра и продвижения вперед
const MG_W_PAWN = new Int32Array([
    0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0,
  150, 150, 150, 150, 150, 150, 150, 150,  0,0,0,0,0,0,0,0,
  110, 110, 115, 120, 120, 115, 110, 110,  0,0,0,0,0,0,0,0,
  105, 105, 110, 125, 125, 110, 105, 105,  0,0,0,0,0,0,0,0,
  100, 100, 105, 120, 120, 105, 100, 100,  0,0,0,0,0,0,0,0,
  105,  95,  90, 100, 100,  90,  95, 105,  0,0,0,0,0,0,0,0,
  105, 110, 110,  80,  80, 110, 110, 105,  0,0,0,0,0,0,0,0,
    0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0
]);

// Кони: ненавидят края (штраф), обожают форпосты в центре на 4-5 горизонталях
const MG_W_KNIGHT = new Int32Array([
  360, 370, 375, 375, 375, 375, 370, 360,  0,0,0,0,0,0,0,0,
  370, 380, 390, 395, 395, 390, 380, 370,  0,0,0,0,0,0,0,0,
  375, 395, 410, 415, 415, 410, 395, 375,  0,0,0,0,0,0,0,0,
  375, 400, 415, 430, 430, 415, 400, 375,  0,0,0,0,0,0,0,0,
  370, 395, 415, 425, 425, 415, 395, 370,  0,0,0,0,0,0,0,0,
  365, 385, 400, 410, 410, 400, 385, 365,  0,0,0,0,0,0,0,0,
  350, 370, 380, 385, 385, 380, 370, 350,  0,0,0,0,0,0,0,0,
  330, 350, 365, 365, 365, 365, 350, 330,  0,0,0,0,0,0,0,0
]);

// Слоны: активная игра по диагоналям, поощряем фианкетто (g2/b2)
const MG_W_BISHOP = new Int32Array([
  380, 385, 385, 385, 385, 385, 380, 380,  0,0,0,0,0,0,0,0,
  385, 405, 400, 400, 400, 400, 405, 385,  0,0,0,0,0,0,0,0,
  385, 400, 405, 410, 410, 405, 400, 385,  0,0,0,0,0,0,0,0,
  385, 405, 410, 415, 415, 410, 405, 385,  0,0,0,0,0,0,0,0,
  385, 400, 410, 415, 415, 410, 400, 385,  0,0,0,0,0,0,0,0,
  390, 410, 405, 405, 405, 405, 410, 390,  0,0,0,0,0,0,0,0,
  390, 415, 400, 400, 400, 400, 415, 390,  0,0,0,0,0,0,0,0,
  380, 385, 390, 390, 390, 390, 385, 380,  0,0,0,0,0,0,0,0
]);

// Ладьи: стремятся на 7-ю горизонталь (бонус +25) и на центральные вертикали
const MG_W_ROOK = new Int32Array([
  600, 600, 600, 605, 605, 600, 600, 600,  0,0,0,0,0,0,0,0,
  620, 625, 625, 625, 625, 625, 625, 620,  0,0,0,0,0,0,0,0, // 7-я горизонталь!
  595, 600, 600, 605, 605, 600, 600, 595,  0,0,0,0,0,0,0,0,
  595, 600, 600, 605, 605, 600, 600, 595,  0,0,0,0,0,0,0,0,
  595, 600, 600, 605, 605, 600, 600, 595,  0,0,0,0,0,0,0,0,
  595, 600, 600, 605, 605, 600, 600, 595,  0,0,0,0,0,0,0,0,
  595, 600, 600, 605, 605, 600, 600, 595,  0,0,0,0,0,0,0,0,
  600, 600, 600, 610, 610, 600, 600, 600,  0,0,0,0,0,0,0,0
]);

// Ферзь: аккуратное развитие, не лезет вперед раньше времени
const MG_W_QUEEN = new Int32Array([
  1195,1195,1195,1195,1195,1195,1195,1195,  0,0,0,0,0,0,0,0,
  1195,1200,1200,1200,1200,1200,1200,1195,  0,0,0,0,0,0,0,0,
  1195,1200,1205,1205,1205,1205,1200,1195,  0,0,0,0,0,0,0,0,
  1195,1200,1205,1210,1210,1205,1200,1195,  0,0,0,0,0,0,0,0,
  1195,1200,1205,1210,1210,1205,1200,1195,  0,0,0,0,0,0,0,0,
  1195,1200,1205,1205,1205,1205,1200,1195,  0,0,0,0,0,0,0,0,
  1195,1200,1200,1200,1200,1200,1200,1195,  0,0,0,0,0,0,0,0,
  1190,1195,1195,1200,1200,1195,1195,1190,  0,0,0,0,0,0,0,0
]);

// Король: ШТРАФ за нахождение в центре (е1, d1), поощрение за рокировку в угол (g1, c1)
const MG_W_KING = new Int32Array([
  4900,4900,4900,4900,4900,4900,4900,4900,  0,0,0,0,0,0,0,0,
  4900,4900,4900,4900,4900,4900,4900,4900,  0,0,0,0,0,0,0,0,
  4910,4910,4910,4910,4910,4910,4910,4910,  0,0,0,0,0,0,0,0,
  4910,4920,4920,4920,4920,4920,4920,4910,  0,0,0,0,0,0,0,0,
  4920,4930,4930,4930,4930,4930,4930,4920,  0,0,0,0,0,0,0,0,
  4930,4940,4940,4945,4945,4940,4940,4930,  0,0,0,0,0,0,0,0,
  4950,4955,4955,4950,4950,4955,4955,4950,  0,0,0,0,0,0,0,0,
  5010,5020,5005,4970,4970,4980,5025,5015,  0,0,0,0,0,0,0,0 // Обожает g1 (5025) и c1 (5020)
]);


// Helper-функция для безопасного построчного отзеркаливания белых таблиц в черные (0x88-совместимая)
/**
* @param {Int32Array} whitePST 
* @returns {Int32Array}
*/
function makeBlackPST(whitePST) {
  const black = new Int32Array(128);
  for (let r = 0; r < 8; r++) {
    const whiteRank = r * 16;
    const blackRank = (7 - r) * 16;
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

// =========================================================================
// 2. УЛУЧШЕННЫЕ ТАБЛИЦЫ ДЛЯ ЭНДШПИЛЯ (EG)
// =========================================================================

// Проходные пешки ценятся экстремально дорого ближе к краю превращения!
const EG_W_PAWN = new Int32Array([
    0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0,
  240, 240, 240, 240, 240, 240, 240, 240,  0,0,0,0,0,0,0,0, // Почти ферзь!
  180, 180, 185, 190, 190, 185, 180, 180,  0,0,0,0,0,0,0,0,
  140, 140, 145, 155, 155, 145, 140, 140,  0,0,0,0,0,0,0,0,
  120, 120, 120, 125, 125, 120, 120, 120,  0,0,0,0,0,0,0,0,
  105, 105, 105, 105, 105, 105, 105, 105,  0,0,0,0,0,0,0,0,
  100, 100, 100, 100, 100, 100, 100, 100,  0,0,0,0,0,0,0,0,
    0,   0,   0,   0,   0,   0,   0,   0,  0,0,0,0,0,0,0,0
]);

const EG_W_KNIGHT = new Int32Array(MG_W_KNIGHT);
const EG_W_BISHOP = new Int32Array(MG_W_BISHOP);
const EG_W_ROOK   = new Int32Array(MG_W_ROOK);
const EG_W_QUEEN  = new Int32Array(MG_W_QUEEN);

// Король в эндшпиле: Агрессивно идет вперед давить чужого монарха
const EG_W_KING = new Int32Array([
  4930,4940,4940,4940,4940,4940,4940,4930,  0,0,0,0,0,0,0,0,
  4940,4960,4960,4960,4960,4960,4960,4940,  0,0,0,0,0,0,0,0,
  4940,4960,4980,4990,4990,4980,4960,4940,  0,0,0,0,0,0,0,0,
  4940,4960,4990,5030,5030,4990,4960,4940,  0,0,0,0,0,0,0,0,
  4940,4960,4990,5030,5030,4990,4960,4940,  0,0,0,0,0,0,0,0,
  4940,4960,4980,4990,4990,4980,4960,4940,  0,0,0,0,0,0,0,0,
  4940,4950,4950,4960,4960,4950,4950,4940,  0,0,0,0,0,0,0,0,
  4920,4930,4930,4930,4930,4930,4930,4920,  0,0,0,0,0,0,0,0
]);

const EG_B_PAWN   = makeBlackPST(EG_W_PAWN);
const EG_B_KNIGHT = makeBlackPST(EG_W_KNIGHT);
const EG_B_BISHOP = makeBlackPST(EG_W_BISHOP);
const EG_B_ROOK   = makeBlackPST(EG_W_ROOK);
const EG_B_QUEEN  = makeBlackPST(EG_W_QUEEN);
const EG_B_KING   = makeBlackPST(EG_W_KING);

// Сборные структуры для прямого O(1) маппинга по ID фигуры
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

/**
* @param {Int32Array} chess_board_0x88 
* @param {BigUint64Array} chess_board_key_64
* @returns {number}
*/
const score_position_e = function (chess_board_0x88, chess_board_key_64) {
  let mg_score = 0;
  let eg_score = 0;
  let game_phase_material = 0;

  // Безопасный проход строго по валидным клеткам 0x88 доски
  for (let rank = 0; rank < 128; rank += 16) {
    for (let sq = rank; sq < rank + 8; sq++) {
      const piece = chess_board_0x88[sq];
      
      mg_score += ALL_MG_PST[piece][sq];
      eg_score += ALL_EG_PST[piece][sq];
      game_phase_material += PHASE_WEIGHTS[piece];
    }
  }

  // Защита от переполнения фазы (например, при превращении пешек в ферзей)
  if (game_phase_material > MAX_PHASE_MATERIAL) {
    game_phase_material = MAX_PHASE_MATERIAL;
  }

  // Линейная интерполяция между стадиями игры
  const mg_weight = game_phase_material;
  const eg_weight = MAX_PHASE_MATERIAL - mg_weight;
  let final_score = Math.trunc((mg_score * mg_weight + eg_score * eg_weight) / MAX_PHASE_MATERIAL);

  // Оценка под текущего игрока
  if (chess_board_0x88[SIDE_TO_MOVE_CB] === BLACK_CB) {
    return -final_score;
  }
  return final_score;
};

// тестируем фен. то что правильно в него записывается позиция и наоборот - считывается
/**
* @param {Int32Array} chess_board_0x88
* @returns {void}
*/
const test_fen_e = function (chess_board_0x88) {

  let chess_board_0x88_O_save = new Int32Array(BOARD_SIZE_CB).fill(0);// доска 0x88 с фигурами

  // записали доску чтобы потом сравнить
  chess_board_0x88_O_save.set(chess_board_0x88);

  // // загнали позицию в фен
  let fen_save_1 = set_fen_from_0x88_cb(chess_board_0x88);

  // // возвращаем позицию из фена
  set_board_from_fen_0x88_cb(fen_save_1, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_2 = set_fen_from_0x88_cb(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88_cb(fen_save_2, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_3 = set_fen_from_0x88_cb(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88_cb(fen_save_3, chess_board_0x88);

  // загнали позицию в фен повторно
  let fen_save_4 = set_fen_from_0x88_cb(chess_board_0x88);

  // возвращаем позицию из фена
  set_board_from_fen_0x88_cb(fen_save_4, chess_board_0x88);


  if ((fen_save_1 != fen_save_2) && (fen_save_2 != fen_save_3) && (fen_save_3 != fen_save_4)) {
    console.log("test_fen " + fen_save_1 + " != " + fen_save_2 + " != " + fen_save_3 + " != " + fen_save_4);
  }

  // загнали позицию в фен повторно
  let fen_save_5 = set_fen_from_0x88_cb(chess_board_0x88_O_save);


  // сравниваем записанную доску и ту что получилась из фена. если что то не так будет вывод на консоль

  test_compare_chess_board_0x88_cb(chess_board_0x88_O_save, chess_board_0x88);

}

export { score_position_e, test_fen_e, PAWN_SCORE_E, PIECE_SCORE_E };