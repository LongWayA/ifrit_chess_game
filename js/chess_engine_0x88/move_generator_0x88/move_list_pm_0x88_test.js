// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_pm_0x88_test.js
 * @version created 20.06m.2026 
 * 
*/

import {
    LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    MOVE_NO_ML
} from "../move_generator_0x88/move_list_0x88.js";

/**
 * НАЗНАЧЕНИЕ
    pm - packing moves
*/
// генерация ходов из позиции r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -
let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

// отсортированные ходы для проверки sorting_list_ml. число типа хода идет по возрастающей.
let packing_moves_sorting_true = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

// в начало вставлен ход взятия для проверки set_move_in_0_ml
let packing_moves_capture_in_0_true = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

// в начало вставлен тихий ход для проверки set_move_in_0_ml
let packing_moves_move_in_0_true = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

// после взятий добавляем два киллера. для проверки set_move_after_the_captures_ml
let packing_moves_k1_k2_true = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

// после взятий добавляем два киллера. для проверки set_move_after_the_captures_ml
let packing_moves_history_true = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);



// Position 2
// r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -
// a  b  c  d  e  f  g  h
// ♜          ♚       ♜
// ♟    ♟ ♟ ♛  ♟ ♝ 
// ♝ ♞       ♟  ♞ ♟ 
//          ♙ ♘   
//    ♟       ♙   
//       ♘       ♕    ♟
// ♙ ♙ ♙ ♗  ♗ ♙ ♙ ♙
// ♖          ♔       ♖
// a  b  c  d  e  f  g  h

//|12|0 |0 |0 |14|0 |0 |12
//|9 |0 |9 |9 |13|9 |11|0
//|11|10|0 |0 |9 |10|9 |0
//|0 |0 |0 |1 |2 |0 |0 |0
//|0 |9 |0 |0 |1 |0 |0 |0
//|0 |0 |2 |0 |0 |5 |0 |9
//|1 |1 |1 |3 |3 |1 |1 |1
//|4 |0 |0 |0 |6 |0 |0 |4
// a  b  c  d  e  f  g  h

// несортированный список

// type_move[0] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[0] = 51
// to[0] = 36
// name_capture_piece_i[0] = 9
//d5-e6
packing_moves[0] = 153367341;

// type_move[1] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[1] = 52
// to[1] = 19
// name_capture_piece_i[1] = 9
// e5-d7
packing_moves[1] = 152253487

// type_move[2] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[2] = 52
// to[2] = 21
// name_capture_piece_i[2] = 9
// e5-f7
packing_moves[2] = 152384559

// type_move[3] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[3] = 52
// to[3] = 38
// name_capture_piece_i[3] = 9
// e5-g6
packing_moves[3] = 153498671

// type_move[4] = 40 nm = CAPTURES_QUEEN_KNIGHT_ML
// from[4] = 85
// to[4] = 37
// name_capture_piece_i[4] = 10
// f3-f6
packing_moves[4] = 170218792

// type_move[5] = 50 nm = CAPTURES_QUEEN_PAWN_ML
// from[5] = 85
// to[5] = 87
// name_capture_piece_i[5] = 9
// f3-h3
packing_moves[5] = 156718386


// type_move[6] = 32 nm = CAPTURES_BISHOP_BISHOP_ML
// from[6] = 100
// to[6] = 32
// name_capture_piece_i[6] = 11
// e2-a6
packing_moves[6] = 186672160

// type_move[7] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[7] = 102
// to[7] = 87
// name_capture_piece_i[7] = 9
// g2-h3
packing_moves[7] = 156722733

// type_move[8] = 57 nm = MOVE_PAWN_ML
// from[8] = 51
// to[8] = 35
// name_capture_piece_i[8] = 0
// d5-d6
packing_moves[8] = 2306873

// type_move[9] = 55 nm = MOVE_KNIGHT_ML
// from[9] = 52
// to[9] = 70
// name_capture_piece_i[9] = 0
// e5-g4
packing_moves[9] = 4600887

// type_move[10] = 55 nm = MOVE_KNIGHT_ML
// from[10] = 52
// to[10] = 83
// name_capture_piece_i[10] = 0
// e5-d3
packing_moves[10] = 5452855

// type_move[11] = 55 nm = MOVE_KNIGHT_ML
// from[11] = 52
// to[11] = 66
// name_capture_piece_i[11] = 0
// e5-c4
packing_moves[11] = 4338743

// type_move[12] = 55 nm = MOVE_KNIGHT_ML
// from[12] = 52
// to[12] = 34
// name_capture_piece_i[12] = 0
// e5-c6
packing_moves[12] = 2241591

// type_move[13] = 55 nm = MOVE_KNIGHT_ML
// from[13] = 82
// to[13] = 49
// name_capture_piece_i[13] = 0
// c3-b5
packing_moves[13] = 3232311

// type_move[14] = 55 nm = MOVE_KNIGHT_ML
// from[14] = 82
// to[14] = 115
// name_capture_piece_i[14] = 0
// c3-d1
packing_moves[14] = 7557687

// type_move[15] = 55 nm = MOVE_KNIGHT_ML
// from[15] = 82
// to[15] = 113
// name_capture_piece_i[15] = 0
// c3-b1
packing_moves[15] = 7426615

// type_move[16] = 55 nm = MOVE_KNIGHT_ML
// from[16] = 82
// to[16] = 64
// name_capture_piece_i[16] = 0
// c3-a4
packing_moves[16] = 4215351

// type_move[17] = 52 nm = MOVE_QUEEN_ML
// from[17] = 85
// to[17] = 69
// name_capture_piece_i[17] = 0
// f3-f4
packing_moves[17] = 4543796

// type_move[18] = 52 nm = MOVE_QUEEN_ML
// from[18] = 85
// to[18] = 53
// name_capture_piece_i[18] = 0
// f3-f5
packing_moves[18] = 3495220

// type_move[19] = 52 nm = MOVE_QUEEN_ML
// from[19] = 85
// to[19] = 70
// name_capture_piece_i[19] = 0
// f3-g4
packing_moves[19] = 4609332

// type_move[20] = 52 nm = MOVE_QUEEN_ML
// from[20] = 85
// to[20] = 55
// name_capture_piece_i[20] = 0
// f3-h5
packing_moves[20] = 3626292

// type_move[21] = 52 nm = MOVE_QUEEN_ML
// from[21] = 85
// to[21] = 86
// name_capture_piece_i[21] = 0
// f3-g3
packing_moves[21] = 5657908

// type_move[22] = 52 nm = MOVE_QUEEN_ML
// from[22] = 85
// to[22] = 84
// name_capture_piece_i[22] = 0
// f3-e3
packing_moves[22] = 5526836

// type_move[23] = 52 nm = MOVE_QUEEN_ML
// from[23] = 85
// to[23] = 83
// name_capture_piece_i[23] = 0
// f3-d3
packing_moves[23] = 5461300

// type_move[24] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[24] = 96
// to[24] = 64
// name_capture_piece_i[24] = 0
// a2-a4
packing_moves[24] = 4218938

// type_move[25] = 57 nm = MOVE_PAWN_ML
// from[25] = 96
// to[25] = 80
// name_capture_piece_i[25] = 0
// a2-a3
packing_moves[25] = 5267513

// type_move[26] = 57 nm = MOVE_PAWN_ML
// from[26] = 97
// to[26] = 81
// name_capture_piece_i[26] = 0
// b2-b3
packing_moves[26] = 5333305

// type_move[27] = 54 nm = MOVE_BISHOP_ML
// from[27] = 99
// to[27] = 84
// name_capture_piece_i[27] = 0
// d2-e3
packing_moves[27] = 5530422

// type_move[28] = 54 nm = MOVE_BISHOP_ML
// from[28] = 99
// to[28] = 69
// name_capture_piece_i[28] = 0
// d2-f4
packing_moves[28] = 4547382

// type_move[29] = 54 nm = MOVE_BISHOP_ML
// from[29] = 99
// to[29] = 54
// name_capture_piece_i[29] = 0
// d2-g5
packing_moves[29] = 3564342

// type_move[30] = 54 nm = MOVE_BISHOP_ML
// from[30] = 99
// to[30] = 39
// name_capture_piece_i[30] = 0
// d2-h6
packing_moves[30] = 2581302

// type_move[31] = 54 nm = MOVE_BISHOP_ML
// from[31] = 99
// to[31] = 114
// name_capture_piece_i[31] = 0
// d2-c1
packing_moves[31] = 7496502

// type_move[32] = 54 nm = MOVE_BISHOP_ML
// from[32] = 100
// to[32] = 117
// name_capture_piece_i[32] = 0
// e2-f1
packing_moves[32] = 7693366

// type_move[33] = 54 nm = MOVE_BISHOP_ML
// from[33] = 100
// to[33] = 115
// name_capture_piece_i[33] = 0
// e2-d1
packing_moves[33] = 7562294

// type_move[34] = 54 nm = MOVE_BISHOP_ML
// from[34] = 100
// to[34] = 83
// name_capture_piece_i[34] = 0
// e2-d3
packing_moves[34] = 5465142

// type_move[35] = 54 nm = MOVE_BISHOP_ML
// from[35] = 100
// to[35] = 66
// name_capture_piece_i[35] = 0
// e2-c4
packing_moves[35] = 4351030

// type_move[36] = 54 nm = MOVE_BISHOP_ML
// from[36] = 100
// to[36] = 49
// name_capture_piece_i[36] = 0
// e2-b5
packing_moves[36] = 3236918

// type_move[37] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[37] = 102
// to[37] = 70
// name_capture_piece_i[37] = 0
// g2-g4
packing_moves[37] = 4613690

// type_move[38] = 57 nm = MOVE_PAWN_ML
// from[38] = 102
// to[38] = 86
// name_capture_piece_i[38] = 0
// g2-g3
packing_moves[38] = 5662265

// type_move[39] = 53 nm = MOVE_ROOK_ML
// from[39] = 112
// to[39] = 113
// name_capture_piece_i[39] = 0
// a1-b1
packing_moves[39] = 7434293

// type_move[40] = 53 nm = MOVE_ROOK_ML
// from[40] = 112
// to[40] = 114
// name_capture_piece_i[40] = 0
// a1-c1
packing_moves[40] = 7499829

// type_move[41] = 53 nm = MOVE_ROOK_ML
// from[41] = 112
// to[41] = 115
// name_capture_piece_i[41] = 0
// a1-d1
packing_moves[41] = 7565365

// type_move[42] = 56 nm = MOVE_KING_ML
// from[42] = 116
// to[42] = 117
// name_capture_piece_i[42] = 0
// e1-f1
packing_moves[42] = 7697464

// type_move[43] = 56 nm = MOVE_KING_ML
// from[43] = 116
// to[43] = 115
// name_capture_piece_i[43] = 0
// e1-d1
packing_moves[43] = 7566392

// type_move[44] = 60 nm = MOVE_KING_QUEEN_CASTLE_ML
// from[44] = 116
// to[44] = 114
// name_capture_piece_i[44] = 0
// e1-c1
packing_moves[44] = 7500860

// type_move[45] = 59 nm = MOVE_KING_CASTLE_ML
// from[45] = 116
// to[45] = 118
// name_capture_piece_i[45] = 0
// e1-g1
packing_moves[45] = 7763003

// type_move[46] = 53 nm = MOVE_ROOK_ML
// from[46] = 119
// to[46] = 118
// name_capture_piece_i[46] = 0
// h1-g1
packing_moves[46] = 7763765

// type_move[47] = 53 nm = MOVE_ROOK_ML
// from[47] = 119
// to[47] = 117
// name_capture_piece_i[47] = 0
// h1-f1
packing_moves[47] = 7698229

packing_moves[IND_PIECE_COLOR_ML] = 1;
packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = 8;
packing_moves[IND_NUMBER_MOVE_ML] = 48;// количество ходов  


//----------------------------------------------------------------------------------------------------------
// отсортированный список - через sorting_list_ml
// сортировка по типу хода
// чем меньше число, тем выше приоритет хода
// меньшее число должно стоять раньше
// type_move 0..60

// type_move[0] = 32 nm = CAPTURES_BISHOP_BISHOP_ML
// from[0] = 100
// to[0] = 32
// name_capture_piece_i[0] = 11
// e2-a6
packing_moves_sorting_true[0] = 186672160;


// type_move[1] = 40 nm = CAPTURES_QUEEN_KNIGHT_ML
// from[1] = 85
// to[1] = 37
// name_capture_piece_i[1] = 10
// f3-f6
packing_moves_sorting_true[1] = 170218792


// type_move[2] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[2] = 51
// to[2] = 36
// name_capture_piece_i[2] = 9
// d5-e6
packing_moves_sorting_true[2] = 153367341

// type_move[3] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[3] = 102
// to[3] = 87
// name_capture_piece_i[3] = 9
// g2-h3
packing_moves_sorting_true[3] = 156722733

// type_move[4] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[4] = 52
// to[4] = 19
// name_capture_piece_i[4] = 9
// e5-d7
packing_moves_sorting_true[4] = 152253487

// type_move[5] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[5] = 52
// to[5] = 21
// name_capture_piece_i[5] = 9
// e5-f7
packing_moves_sorting_true[5] = 152384559

// type_move[6] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[6] = 52
// to[6] = 38
// name_capture_piece_i[6] = 9
// e5-g6
packing_moves_sorting_true[6] = 153498671

// type_move[7] = 50 nm = CAPTURES_QUEEN_PAWN_ML
// from[7] = 85
// to[7] = 87
// name_capture_piece_i[7] = 9
// f3-h3
packing_moves_sorting_true[7] = 156718386

// type_move[8] = 52 nm = MOVE_QUEEN_ML
// from[8] = 85
// to[8] = 69
// name_capture_piece_i[8] = 0
// f3-f4
packing_moves_sorting_true[8] = 4543796

// type_move[9] = 52 nm = MOVE_QUEEN_ML
// from[9] = 85
// to[9] = 53
// name_capture_piece_i[9] = 0
// f3-f5
packing_moves_sorting_true[9] = 3495220

// type_move[10] = 52 nm = MOVE_QUEEN_ML
// from[10] = 85
// to[10] = 70
// name_capture_piece_i[10] = 0
// f3-g4
packing_moves_sorting_true[10] = 4609332

// type_move[11] = 52 nm = MOVE_QUEEN_ML
// from[11] = 85
// to[11] = 55
// name_capture_piece_i[11] = 0
// f3-h5
packing_moves_sorting_true[11] = 3626292

// type_move[12] = 52 nm = MOVE_QUEEN_ML
// from[12] = 85
// to[12] = 86
// name_capture_piece_i[12] = 0
// f3-g3
packing_moves_sorting_true[12] = 5657908

// type_move[13] = 52 nm = MOVE_QUEEN_ML
// from[13] = 85
// to[13] = 84
// name_capture_piece_i[13] = 0
// f3-e3
packing_moves_sorting_true[13] = 5526836

// type_move[14] = 52 nm = MOVE_QUEEN_ML
// from[14] = 85
// to[14] = 83
// name_capture_piece_i[14] = 0
// f3-d3
packing_moves_sorting_true[14] = 5461300

// type_move[15] = 53 nm = MOVE_ROOK_ML
// from[15] = 112
// to[15] = 113
// name_capture_piece_i[15] = 0
// a1-b1
packing_moves_sorting_true[15] = 7434293

// type_move[16] = 53 nm = MOVE_ROOK_ML
// from[16] = 112
// to[16] = 114
// name_capture_piece_i[16] = 0
// a1-c1
packing_moves_sorting_true[16] = 7499829

// type_move[17] = 53 nm = MOVE_ROOK_ML
// from[17] = 112
// to[17] = 115
// name_capture_piece_i[17] = 0
// a1-d1
packing_moves_sorting_true[17] = 7565365

// type_move[18] = 53 nm = MOVE_ROOK_ML
// from[18] = 119
// to[18] = 118
// name_capture_piece_i[18] = 0
// h1-g1
packing_moves_sorting_true[18] = 7763765

// type_move[19] = 53 nm = MOVE_ROOK_ML
// from[19] = 119
// to[19] = 117
// name_capture_piece_i[19] = 0
// h1-f1
packing_moves_sorting_true[19] = 7698229

// type_move[20] = 54 nm = MOVE_BISHOP_ML
// from[20] = 99
// to[20] = 84
// name_capture_piece_i[20] = 0
// d2-e3
packing_moves_sorting_true[20] = 5530422

// type_move[21] = 54 nm = MOVE_BISHOP_ML
// from[21] = 99
// to[21] = 69
// name_capture_piece_i[21] = 0
// d2-f4
packing_moves_sorting_true[21] = 4547382

// type_move[22] = 54 nm = MOVE_BISHOP_ML
// from[22] = 99
// to[22] = 54
// name_capture_piece_i[22] = 0
// d2-g5
packing_moves_sorting_true[22] = 3564342

// type_move[23] = 54 nm = MOVE_BISHOP_ML
// from[23] = 99
// to[23] = 39
// name_capture_piece_i[23] = 0
// d2-h6
packing_moves_sorting_true[23] = 2581302

// type_move[24] = 54 nm = MOVE_BISHOP_ML
// from[24] = 99
// to[24] = 114
// name_capture_piece_i[24] = 0
// d2-c1
packing_moves_sorting_true[24] = 7496502

// type_move[25] = 54 nm = MOVE_BISHOP_ML
// from[25] = 100
// to[25] = 117
// name_capture_piece_i[25] = 0
// e2-f1
packing_moves_sorting_true[25] = 7693366

// type_move[26] = 54 nm = MOVE_BISHOP_ML
// from[26] = 100
// to[26] = 115
// name_capture_piece_i[26] = 0
// e2-d1
packing_moves_sorting_true[26] = 7562294

// type_move[27] = 54 nm = MOVE_BISHOP_ML
// from[27] = 100
// to[27] = 83
// name_capture_piece_i[27] = 0
// e2-d3
packing_moves_sorting_true[27] = 5465142

// type_move[28] = 54 nm = MOVE_BISHOP_ML
// from[28] = 100
// to[28] = 66
// name_capture_piece_i[28] = 0
// e2-c4
packing_moves_sorting_true[28] = 4351030

// type_move[29] = 54 nm = MOVE_BISHOP_ML
// from[29] = 100
// to[29] = 49
// name_capture_piece_i[29] = 0
// e2-b5
packing_moves_sorting_true[29] = 3236918

// type_move[30] = 55 nm = MOVE_KNIGHT_ML
// from[30] = 52
// to[30] = 70
// name_capture_piece_i[30] = 0
// e5-g4
packing_moves_sorting_true[30] = 4600887

// type_move[31] = 55 nm = MOVE_KNIGHT_ML
// from[31] = 52
// to[31] = 83
// name_capture_piece_i[31] = 0
// e5-d3
packing_moves_sorting_true[31] = 5452855

// type_move[32] = 55 nm = MOVE_KNIGHT_ML
// from[32] = 52
// to[32] = 66
// name_capture_piece_i[32] = 0
// e5-c4
packing_moves_sorting_true[32] = 4338743

// type_move[33] = 55 nm = MOVE_KNIGHT_ML
// from[33] = 52
// to[33] = 34
// name_capture_piece_i[33] = 0
// e5-c6
packing_moves_sorting_true[33] = 2241591

// type_move[34] = 55 nm = MOVE_KNIGHT_ML
// from[34] = 82
// to[34] = 49
// name_capture_piece_i[34] = 0
// c3-b5
packing_moves_sorting_true[34] = 3232311

// type_move[35] = 55 nm = MOVE_KNIGHT_ML
// from[35] = 82
// to[35] = 115
// name_capture_piece_i[35] = 0
// c3-d1
packing_moves_sorting_true[35] = 7557687

// type_move[36] = 55 nm = MOVE_KNIGHT_ML
// from[36] = 82
// to[36] = 113
// name_capture_piece_i[36] = 0
// c3-b1
packing_moves_sorting_true[36] = 7426615

// type_move[37] = 55 nm = MOVE_KNIGHT_ML
// from[37] = 82
// to[37] = 64
// name_capture_piece_i[37] = 0
// c3-a4
packing_moves_sorting_true[37] = 4215351

// type_move[38] = 56 nm = MOVE_KING_ML
// from[38] = 116
// to[38] = 117
// name_capture_piece_i[38] = 0
// e1-f1
packing_moves_sorting_true[38] = 7697464

// type_move[39] = 56 nm = MOVE_KING_ML
// from[39] = 116
// to[39] = 115
// name_capture_piece_i[39] = 0
// e1-d1
packing_moves_sorting_true[39] = 7566392

// type_move[40] = 57 nm = MOVE_PAWN_ML
// from[40] = 51
// to[40] = 35
// name_capture_piece_i[40] = 0
// d5-d6
packing_moves_sorting_true[40] = 2306873

// type_move[41] = 57 nm = MOVE_PAWN_ML
// from[41] = 96
// to[41] = 80
// name_capture_piece_i[41] = 0
// a2-a3
packing_moves_sorting_true[41] = 5267513

// type_move[42] = 57 nm = MOVE_PAWN_ML
// from[42] = 97
// to[42] = 81
// name_capture_piece_i[42] = 0
// b2-b3
packing_moves_sorting_true[42] = 5333305

// type_move[43] = 57 nm = MOVE_PAWN_ML
// from[43] = 102
// to[43] = 86
// name_capture_piece_i[43] = 0
// g2-g3
packing_moves_sorting_true[43] = 5662265

// type_move[44] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[44] = 96
// to[44] = 64
// name_capture_piece_i[44] = 0
// a2-a4
packing_moves_sorting_true[44] = 4218938

// type_move[45] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[45] = 102
// to[45] = 70
// name_capture_piece_i[45] = 0
// g2-g4
packing_moves_sorting_true[45] = 4613690

// type_move[46] = 59 nm = MOVE_KING_CASTLE_ML
// from[46] = 116
// to[46] = 118
// name_capture_piece_i[46] = 0
// e1-g1
packing_moves_sorting_true[46] = 7763003

// type_move[47] = 60 nm = MOVE_KING_QUEEN_CASTLE_ML
// from[47] = 116
// to[47] = 114
// name_capture_piece_i[47] = 0
// e1-c1
packing_moves_sorting_true[47] = 7500860

packing_moves_sorting_true[IND_PIECE_COLOR_ML] = 1;
packing_moves_sorting_true[IND_NUMBER_CAPTURES_MOVE_ML] = 8;
packing_moves_sorting_true[IND_NUMBER_MOVE_ML] = 48;// количество ходов  

//-----------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------
// отсортированный список - через sorting_list_ml
// сортировка по типу хода
// чем меньше число, тем выше приоритет хода
// меньшее число должно стоять раньше
// type_move 0..60

// в начало вставлен ход взятия для проверки set_move_in_0_ml


// type_move[5] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[5] = 52
// to[5] = 21
// name_capture_piece_i[5] = 9
// e5-f7
packing_moves_capture_in_0_true[0] = 152384559

// type_move[0] = 32 nm = CAPTURES_BISHOP_BISHOP_ML
// from[0] = 100
// to[0] = 32
// name_capture_piece_i[0] = 11
// e2-a6
packing_moves_capture_in_0_true[1] = 186672160;

// type_move[1] = 40 nm = CAPTURES_QUEEN_KNIGHT_ML
// from[1] = 85
// to[1] = 37
// name_capture_piece_i[1] = 10
// f3-f6
packing_moves_capture_in_0_true[2] = 170218792


// type_move[2] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[2] = 51
// to[2] = 36
// name_capture_piece_i[2] = 9
// d5-e6
packing_moves_capture_in_0_true[3] = 153367341

// type_move[3] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[3] = 102
// to[3] = 87
// name_capture_piece_i[3] = 9
// g2-h3
packing_moves_capture_in_0_true[4] = 156722733

// type_move[4] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[4] = 52
// to[4] = 19
// name_capture_piece_i[4] = 9
// e5-d7
packing_moves_capture_in_0_true[5] = 152253487

// type_move[6] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[6] = 52
// to[6] = 38
// name_capture_piece_i[6] = 9
// e5-g6
packing_moves_capture_in_0_true[6] = 153498671

// type_move[7] = 50 nm = CAPTURES_QUEEN_PAWN_ML
// from[7] = 85
// to[7] = 87
// name_capture_piece_i[7] = 9
// f3-h3
packing_moves_capture_in_0_true[7] = 156718386

// type_move[8] = 52 nm = MOVE_QUEEN_ML
// from[8] = 85
// to[8] = 69
// name_capture_piece_i[8] = 0
// f3-f4
packing_moves_capture_in_0_true[8] = 4543796

// type_move[9] = 52 nm = MOVE_QUEEN_ML
// from[9] = 85
// to[9] = 53
// name_capture_piece_i[9] = 0
// f3-f5
packing_moves_capture_in_0_true[9] = 3495220

// type_move[10] = 52 nm = MOVE_QUEEN_ML
// from[10] = 85
// to[10] = 70
// name_capture_piece_i[10] = 0
// f3-g4
packing_moves_capture_in_0_true[10] = 4609332

// type_move[11] = 52 nm = MOVE_QUEEN_ML
// from[11] = 85
// to[11] = 55
// name_capture_piece_i[11] = 0
// f3-h5
packing_moves_capture_in_0_true[11] = 3626292

// type_move[12] = 52 nm = MOVE_QUEEN_ML
// from[12] = 85
// to[12] = 86
// name_capture_piece_i[12] = 0
// f3-g3
packing_moves_capture_in_0_true[12] = 5657908

// type_move[13] = 52 nm = MOVE_QUEEN_ML
// from[13] = 85
// to[13] = 84
// name_capture_piece_i[13] = 0
// f3-e3
packing_moves_capture_in_0_true[13] = 5526836

// type_move[14] = 52 nm = MOVE_QUEEN_ML
// from[14] = 85
// to[14] = 83
// name_capture_piece_i[14] = 0
// f3-d3
packing_moves_capture_in_0_true[14] = 5461300

// type_move[15] = 53 nm = MOVE_ROOK_ML
// from[15] = 112
// to[15] = 113
// name_capture_piece_i[15] = 0
// a1-b1
packing_moves_capture_in_0_true[15] = 7434293

// type_move[16] = 53 nm = MOVE_ROOK_ML
// from[16] = 112
// to[16] = 114
// name_capture_piece_i[16] = 0
// a1-c1
packing_moves_capture_in_0_true[16] = 7499829

// type_move[17] = 53 nm = MOVE_ROOK_ML
// from[17] = 112
// to[17] = 115
// name_capture_piece_i[17] = 0
// a1-d1
packing_moves_capture_in_0_true[17] = 7565365

// type_move[18] = 53 nm = MOVE_ROOK_ML
// from[18] = 119
// to[18] = 118
// name_capture_piece_i[18] = 0
// h1-g1
packing_moves_capture_in_0_true[18] = 7763765

// type_move[19] = 53 nm = MOVE_ROOK_ML
// from[19] = 119
// to[19] = 117
// name_capture_piece_i[19] = 0
// h1-f1
packing_moves_capture_in_0_true[19] = 7698229

// type_move[20] = 54 nm = MOVE_BISHOP_ML
// from[20] = 99
// to[20] = 84
// name_capture_piece_i[20] = 0
// d2-e3
packing_moves_capture_in_0_true[20] = 5530422

// type_move[21] = 54 nm = MOVE_BISHOP_ML
// from[21] = 99
// to[21] = 69
// name_capture_piece_i[21] = 0
// d2-f4
packing_moves_capture_in_0_true[21] = 4547382

// type_move[22] = 54 nm = MOVE_BISHOP_ML
// from[22] = 99
// to[22] = 54
// name_capture_piece_i[22] = 0
// d2-g5
packing_moves_capture_in_0_true[22] = 3564342

// type_move[23] = 54 nm = MOVE_BISHOP_ML
// from[23] = 99
// to[23] = 39
// name_capture_piece_i[23] = 0
// d2-h6
packing_moves_capture_in_0_true[23] = 2581302

// type_move[24] = 54 nm = MOVE_BISHOP_ML
// from[24] = 99
// to[24] = 114
// name_capture_piece_i[24] = 0
// d2-c1
packing_moves_capture_in_0_true[24] = 7496502

// type_move[25] = 54 nm = MOVE_BISHOP_ML
// from[25] = 100
// to[25] = 117
// name_capture_piece_i[25] = 0
// e2-f1
packing_moves_capture_in_0_true[25] = 7693366

// type_move[26] = 54 nm = MOVE_BISHOP_ML
// from[26] = 100
// to[26] = 115
// name_capture_piece_i[26] = 0
// e2-d1
packing_moves_capture_in_0_true[26] = 7562294

// type_move[27] = 54 nm = MOVE_BISHOP_ML
// from[27] = 100
// to[27] = 83
// name_capture_piece_i[27] = 0
// e2-d3
packing_moves_capture_in_0_true[27] = 5465142

// type_move[28] = 54 nm = MOVE_BISHOP_ML
// from[28] = 100
// to[28] = 66
// name_capture_piece_i[28] = 0
// e2-c4
packing_moves_capture_in_0_true[28] = 4351030

// type_move[29] = 54 nm = MOVE_BISHOP_ML
// from[29] = 100
// to[29] = 49
// name_capture_piece_i[29] = 0
// e2-b5
packing_moves_capture_in_0_true[29] = 3236918

// type_move[30] = 55 nm = MOVE_KNIGHT_ML
// from[30] = 52
// to[30] = 70
// name_capture_piece_i[30] = 0
// e5-g4
packing_moves_capture_in_0_true[30] = 4600887

// type_move[31] = 55 nm = MOVE_KNIGHT_ML
// from[31] = 52
// to[31] = 83
// name_capture_piece_i[31] = 0
// e5-d3
packing_moves_capture_in_0_true[31] = 5452855

// type_move[32] = 55 nm = MOVE_KNIGHT_ML
// from[32] = 52
// to[32] = 66
// name_capture_piece_i[32] = 0
// e5-c4
packing_moves_capture_in_0_true[32] = 4338743

// type_move[33] = 55 nm = MOVE_KNIGHT_ML
// from[33] = 52
// to[33] = 34
// name_capture_piece_i[33] = 0
// e5-c6
packing_moves_capture_in_0_true[33] = 2241591

// type_move[34] = 55 nm = MOVE_KNIGHT_ML
// from[34] = 82
// to[34] = 49
// name_capture_piece_i[34] = 0
// c3-b5
packing_moves_capture_in_0_true[34] = 3232311

// type_move[35] = 55 nm = MOVE_KNIGHT_ML
// from[35] = 82
// to[35] = 115
// name_capture_piece_i[35] = 0
// c3-d1
packing_moves_capture_in_0_true[35] = 7557687

// type_move[36] = 55 nm = MOVE_KNIGHT_ML
// from[36] = 82
// to[36] = 113
// name_capture_piece_i[36] = 0
// c3-b1
packing_moves_capture_in_0_true[36] = 7426615

// type_move[37] = 55 nm = MOVE_KNIGHT_ML
// from[37] = 82
// to[37] = 64
// name_capture_piece_i[37] = 0
// c3-a4
packing_moves_capture_in_0_true[37] = 4215351

// type_move[38] = 56 nm = MOVE_KING_ML
// from[38] = 116
// to[38] = 117
// name_capture_piece_i[38] = 0
// e1-f1
packing_moves_capture_in_0_true[38] = 7697464

// type_move[39] = 56 nm = MOVE_KING_ML
// from[39] = 116
// to[39] = 115
// name_capture_piece_i[39] = 0
// e1-d1
packing_moves_capture_in_0_true[39] = 7566392

// type_move[40] = 57 nm = MOVE_PAWN_ML
// from[40] = 51
// to[40] = 35
// name_capture_piece_i[40] = 0
// d5-d6
packing_moves_capture_in_0_true[40] = 2306873

// type_move[41] = 57 nm = MOVE_PAWN_ML
// from[41] = 96
// to[41] = 80
// name_capture_piece_i[41] = 0
// a2-a3
packing_moves_capture_in_0_true[41] = 5267513

// type_move[42] = 57 nm = MOVE_PAWN_ML
// from[42] = 97
// to[42] = 81
// name_capture_piece_i[42] = 0
// b2-b3
packing_moves_capture_in_0_true[42] = 5333305

// type_move[43] = 57 nm = MOVE_PAWN_ML
// from[43] = 102
// to[43] = 86
// name_capture_piece_i[43] = 0
// g2-g3
packing_moves_capture_in_0_true[43] = 5662265

// type_move[44] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[44] = 96
// to[44] = 64
// name_capture_piece_i[44] = 0
// a2-a4
packing_moves_capture_in_0_true[44] = 4218938

// type_move[45] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[45] = 102
// to[45] = 70
// name_capture_piece_i[45] = 0
// g2-g4
packing_moves_capture_in_0_true[45] = 4613690

// type_move[46] = 59 nm = MOVE_KING_CASTLE_ML
// from[46] = 116
// to[46] = 118
// name_capture_piece_i[46] = 0
// e1-g1
packing_moves_capture_in_0_true[46] = 7763003

// type_move[47] = 60 nm = MOVE_KING_QUEEN_CASTLE_ML
// from[47] = 116
// to[47] = 114
// name_capture_piece_i[47] = 0
// e1-c1
packing_moves_capture_in_0_true[47] = 7500860

packing_moves_capture_in_0_true[IND_PIECE_COLOR_ML] = 1;
packing_moves_capture_in_0_true[IND_NUMBER_CAPTURES_MOVE_ML] = 8;
packing_moves_capture_in_0_true[IND_NUMBER_MOVE_ML] = 48;// количество ходов  

//-----------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------
// отсортированный список - через sorting_list_ml
// сортировка по типу хода
// чем меньше число, тем выше приоритет хода
// меньшее число должно стоять раньше
// type_move 0..60

// в начало вставлен тихий ход для проверки set_move_in_0_ml

// type_move[11] = 52 nm = MOVE_QUEEN_ML
// from[11] = 85
// to[11] = 55
// name_capture_piece_i[11] = 0
// f3-h5
packing_moves_move_in_0_true[0] = 3626292

// type_move[0] = 32 nm = CAPTURES_BISHOP_BISHOP_ML
// from[0] = 100
// to[0] = 32
// name_capture_piece_i[0] = 11
// e2-a6
packing_moves_move_in_0_true[1] = 186672160;


// type_move[1] = 40 nm = CAPTURES_QUEEN_KNIGHT_ML
// from[1] = 85
// to[1] = 37
// name_capture_piece_i[1] = 10
// f3-f6
packing_moves_move_in_0_true[2] = 170218792


// type_move[2] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[2] = 51
// to[2] = 36
// name_capture_piece_i[2] = 9
// d5-e6
packing_moves_move_in_0_true[3] = 153367341

// type_move[3] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[3] = 102
// to[3] = 87
// name_capture_piece_i[3] = 9
// g2-h3
packing_moves_move_in_0_true[4] = 156722733

// type_move[4] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[4] = 52
// to[4] = 19
// name_capture_piece_i[4] = 9
// e5-d7
packing_moves_move_in_0_true[5] = 152253487

// type_move[5] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[5] = 52
// to[5] = 21
// name_capture_piece_i[5] = 9
// e5-f7
packing_moves_move_in_0_true[6] = 152384559

// type_move[6] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[6] = 52
// to[6] = 38
// name_capture_piece_i[6] = 9
// e5-g6
packing_moves_move_in_0_true[7] = 153498671

// type_move[7] = 50 nm = CAPTURES_QUEEN_PAWN_ML
// from[7] = 85
// to[7] = 87
// name_capture_piece_i[7] = 9
// f3-h3
packing_moves_move_in_0_true[8] = 156718386

// type_move[8] = 52 nm = MOVE_QUEEN_ML
// from[8] = 85
// to[8] = 69
// name_capture_piece_i[8] = 0
// f3-f4
packing_moves_move_in_0_true[9] = 4543796

// type_move[9] = 52 nm = MOVE_QUEEN_ML
// from[9] = 85
// to[9] = 53
// name_capture_piece_i[9] = 0
// f3-f5
packing_moves_move_in_0_true[10] = 3495220

// type_move[10] = 52 nm = MOVE_QUEEN_ML
// from[10] = 85
// to[10] = 70
// name_capture_piece_i[10] = 0
// f3-g4
packing_moves_move_in_0_true[11] = 4609332

// type_move[12] = 52 nm = MOVE_QUEEN_ML
// from[12] = 85
// to[12] = 86
// name_capture_piece_i[12] = 0
// f3-g3
packing_moves_move_in_0_true[12] = 5657908

// type_move[13] = 52 nm = MOVE_QUEEN_ML
// from[13] = 85
// to[13] = 84
// name_capture_piece_i[13] = 0
// f3-e3
packing_moves_move_in_0_true[13] = 5526836

// type_move[14] = 52 nm = MOVE_QUEEN_ML
// from[14] = 85
// to[14] = 83
// name_capture_piece_i[14] = 0
// f3-d3
packing_moves_move_in_0_true[14] = 5461300

// type_move[15] = 53 nm = MOVE_ROOK_ML
// from[15] = 112
// to[15] = 113
// name_capture_piece_i[15] = 0
// a1-b1
packing_moves_move_in_0_true[15] = 7434293

// type_move[16] = 53 nm = MOVE_ROOK_ML
// from[16] = 112
// to[16] = 114
// name_capture_piece_i[16] = 0
// a1-c1
packing_moves_move_in_0_true[16] = 7499829

// type_move[17] = 53 nm = MOVE_ROOK_ML
// from[17] = 112
// to[17] = 115
// name_capture_piece_i[17] = 0
// a1-d1
packing_moves_move_in_0_true[17] = 7565365

// type_move[18] = 53 nm = MOVE_ROOK_ML
// from[18] = 119
// to[18] = 118
// name_capture_piece_i[18] = 0
// h1-g1
packing_moves_move_in_0_true[18] = 7763765

// type_move[19] = 53 nm = MOVE_ROOK_ML
// from[19] = 119
// to[19] = 117
// name_capture_piece_i[19] = 0
// h1-f1
packing_moves_move_in_0_true[19] = 7698229

// type_move[20] = 54 nm = MOVE_BISHOP_ML
// from[20] = 99
// to[20] = 84
// name_capture_piece_i[20] = 0
// d2-e3
packing_moves_move_in_0_true[20] = 5530422

// type_move[21] = 54 nm = MOVE_BISHOP_ML
// from[21] = 99
// to[21] = 69
// name_capture_piece_i[21] = 0
// d2-f4
packing_moves_move_in_0_true[21] = 4547382

// type_move[22] = 54 nm = MOVE_BISHOP_ML
// from[22] = 99
// to[22] = 54
// name_capture_piece_i[22] = 0
// d2-g5
packing_moves_move_in_0_true[22] = 3564342

// type_move[23] = 54 nm = MOVE_BISHOP_ML
// from[23] = 99
// to[23] = 39
// name_capture_piece_i[23] = 0
// d2-h6
packing_moves_move_in_0_true[23] = 2581302

// type_move[24] = 54 nm = MOVE_BISHOP_ML
// from[24] = 99
// to[24] = 114
// name_capture_piece_i[24] = 0
// d2-c1
packing_moves_move_in_0_true[24] = 7496502

// type_move[25] = 54 nm = MOVE_BISHOP_ML
// from[25] = 100
// to[25] = 117
// name_capture_piece_i[25] = 0
// e2-f1
packing_moves_move_in_0_true[25] = 7693366

// type_move[26] = 54 nm = MOVE_BISHOP_ML
// from[26] = 100
// to[26] = 115
// name_capture_piece_i[26] = 0
// e2-d1
packing_moves_move_in_0_true[26] = 7562294

// type_move[27] = 54 nm = MOVE_BISHOP_ML
// from[27] = 100
// to[27] = 83
// name_capture_piece_i[27] = 0
// e2-d3
packing_moves_move_in_0_true[27] = 5465142

// type_move[28] = 54 nm = MOVE_BISHOP_ML
// from[28] = 100
// to[28] = 66
// name_capture_piece_i[28] = 0
// e2-c4
packing_moves_move_in_0_true[28] = 4351030

// type_move[29] = 54 nm = MOVE_BISHOP_ML
// from[29] = 100
// to[29] = 49
// name_capture_piece_i[29] = 0
// e2-b5
packing_moves_move_in_0_true[29] = 3236918

// type_move[30] = 55 nm = MOVE_KNIGHT_ML
// from[30] = 52
// to[30] = 70
// name_capture_piece_i[30] = 0
// e5-g4
packing_moves_move_in_0_true[30] = 4600887

// type_move[31] = 55 nm = MOVE_KNIGHT_ML
// from[31] = 52
// to[31] = 83
// name_capture_piece_i[31] = 0
// e5-d3
packing_moves_move_in_0_true[31] = 5452855

// type_move[32] = 55 nm = MOVE_KNIGHT_ML
// from[32] = 52
// to[32] = 66
// name_capture_piece_i[32] = 0
// e5-c4
packing_moves_move_in_0_true[32] = 4338743

// type_move[33] = 55 nm = MOVE_KNIGHT_ML
// from[33] = 52
// to[33] = 34
// name_capture_piece_i[33] = 0
// e5-c6
packing_moves_move_in_0_true[33] = 2241591

// type_move[34] = 55 nm = MOVE_KNIGHT_ML
// from[34] = 82
// to[34] = 49
// name_capture_piece_i[34] = 0
// c3-b5
packing_moves_move_in_0_true[34] = 3232311

// type_move[35] = 55 nm = MOVE_KNIGHT_ML
// from[35] = 82
// to[35] = 115
// name_capture_piece_i[35] = 0
// c3-d1
packing_moves_move_in_0_true[35] = 7557687

// type_move[36] = 55 nm = MOVE_KNIGHT_ML
// from[36] = 82
// to[36] = 113
// name_capture_piece_i[36] = 0
// c3-b1
packing_moves_move_in_0_true[36] = 7426615

// type_move[37] = 55 nm = MOVE_KNIGHT_ML
// from[37] = 82
// to[37] = 64
// name_capture_piece_i[37] = 0
// c3-a4
packing_moves_move_in_0_true[37] = 4215351

// type_move[38] = 56 nm = MOVE_KING_ML
// from[38] = 116
// to[38] = 117
// name_capture_piece_i[38] = 0
// e1-f1
packing_moves_move_in_0_true[38] = 7697464

// type_move[39] = 56 nm = MOVE_KING_ML
// from[39] = 116
// to[39] = 115
// name_capture_piece_i[39] = 0
// e1-d1
packing_moves_move_in_0_true[39] = 7566392

// type_move[40] = 57 nm = MOVE_PAWN_ML
// from[40] = 51
// to[40] = 35
// name_capture_piece_i[40] = 0
// d5-d6
packing_moves_move_in_0_true[40] = 2306873

// type_move[41] = 57 nm = MOVE_PAWN_ML
// from[41] = 96
// to[41] = 80
// name_capture_piece_i[41] = 0
// a2-a3
packing_moves_move_in_0_true[41] = 5267513

// type_move[42] = 57 nm = MOVE_PAWN_ML
// from[42] = 97
// to[42] = 81
// name_capture_piece_i[42] = 0
// b2-b3
packing_moves_move_in_0_true[42] = 5333305

// type_move[43] = 57 nm = MOVE_PAWN_ML
// from[43] = 102
// to[43] = 86
// name_capture_piece_i[43] = 0
// g2-g3
packing_moves_move_in_0_true[43] = 5662265

// type_move[44] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[44] = 96
// to[44] = 64
// name_capture_piece_i[44] = 0
// a2-a4
packing_moves_move_in_0_true[44] = 4218938

// type_move[45] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[45] = 102
// to[45] = 70
// name_capture_piece_i[45] = 0
// g2-g4
packing_moves_move_in_0_true[45] = 4613690

// type_move[46] = 59 nm = MOVE_KING_CASTLE_ML
// from[46] = 116
// to[46] = 118
// name_capture_piece_i[46] = 0
// e1-g1
packing_moves_move_in_0_true[46] = 7763003

// type_move[47] = 60 nm = MOVE_KING_QUEEN_CASTLE_ML
// from[47] = 116
// to[47] = 114
// name_capture_piece_i[47] = 0
// e1-c1
packing_moves_move_in_0_true[47] = 7500860

packing_moves_move_in_0_true[IND_PIECE_COLOR_ML] = 1;
packing_moves_move_in_0_true[IND_NUMBER_CAPTURES_MOVE_ML] = 8;
packing_moves_move_in_0_true[IND_NUMBER_MOVE_ML] = 48;// количество ходов  

//-----------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------
// отсортированный список - через sorting_list_ml
// сортировка по типу хода
// чем меньше число, тем выше приоритет хода
// меньшее число должно стоять раньше
// type_move 0..60
// добавлены два киллера после взятий
// 
// type_move[14] = 52 nm = MOVE_QUEEN_ML
// type_move[20] = 54 nm = MOVE_BISHOP_ML

// type_move[0] = 32 nm = CAPTURES_BISHOP_BISHOP_ML
// from[0] = 100
// to[0] = 32
// name_capture_piece_i[0] = 11
// e2-a6
packing_moves_k1_k2_true[0] = 186672160;


// type_move[1] = 40 nm = CAPTURES_QUEEN_KNIGHT_ML
// from[1] = 85
// to[1] = 37
// name_capture_piece_i[1] = 10
// f3-f6
packing_moves_k1_k2_true[1] = 170218792


// type_move[2] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[2] = 51
// to[2] = 36
// name_capture_piece_i[2] = 9
// d5-e6
packing_moves_k1_k2_true[2] = 153367341

// type_move[3] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[3] = 102
// to[3] = 87
// name_capture_piece_i[3] = 9
// g2-h3
packing_moves_k1_k2_true[3] = 156722733

// type_move[4] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[4] = 52
// to[4] = 19
// name_capture_piece_i[4] = 9
// e5-d7
packing_moves_k1_k2_true[4] = 152253487

// type_move[5] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[5] = 52
// to[5] = 21
// name_capture_piece_i[5] = 9
// e5-f7
packing_moves_k1_k2_true[5] = 152384559

// type_move[6] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[6] = 52
// to[6] = 38
// name_capture_piece_i[6] = 9
// e5-g6
packing_moves_k1_k2_true[6] = 153498671

// type_move[7] = 50 nm = CAPTURES_QUEEN_PAWN_ML
// from[7] = 85
// to[7] = 87
// name_capture_piece_i[7] = 9
// f3-h3
packing_moves_k1_k2_true[7] = 156718386

// type_move[14] = 52 nm = MOVE_QUEEN_ML
// from[14] = 85
// to[14] = 83
// name_capture_piece_i[14] = 0
// f3-d3
packing_moves_k1_k2_true[8] = 5461300

// type_move[20] = 54 nm = MOVE_BISHOP_ML
// from[20] = 99
// to[20] = 84
// name_capture_piece_i[20] = 0
// d2-e3
packing_moves_k1_k2_true[9] = 5530422

// type_move[8] = 52 nm = MOVE_QUEEN_ML
// from[8] = 85
// to[8] = 69
// name_capture_piece_i[8] = 0
// f3-f4
packing_moves_k1_k2_true[10] = 4543796

// type_move[9] = 52 nm = MOVE_QUEEN_ML
// from[9] = 85
// to[9] = 53
// name_capture_piece_i[9] = 0
// f3-f5
packing_moves_k1_k2_true[11] = 3495220

// type_move[10] = 52 nm = MOVE_QUEEN_ML
// from[10] = 85
// to[10] = 70
// name_capture_piece_i[10] = 0
// f3-g4
packing_moves_k1_k2_true[12] = 4609332

// type_move[11] = 52 nm = MOVE_QUEEN_ML
// from[11] = 85
// to[11] = 55
// name_capture_piece_i[11] = 0
// f3-h5
packing_moves_k1_k2_true[13] = 3626292

// type_move[12] = 52 nm = MOVE_QUEEN_ML
// from[12] = 85
// to[12] = 86
// name_capture_piece_i[12] = 0
// f3-g3
packing_moves_k1_k2_true[14] = 5657908

// type_move[13] = 52 nm = MOVE_QUEEN_ML
// from[13] = 85
// to[13] = 84
// name_capture_piece_i[13] = 0
// f3-e3
packing_moves_k1_k2_true[15] = 5526836

// type_move[15] = 53 nm = MOVE_ROOK_ML
// from[15] = 112
// to[15] = 113
// name_capture_piece_i[15] = 0
// a1-b1
packing_moves_k1_k2_true[16] = 7434293

// type_move[16] = 53 nm = MOVE_ROOK_ML
// from[16] = 112
// to[16] = 114
// name_capture_piece_i[16] = 0
// a1-c1
packing_moves_k1_k2_true[17] = 7499829

// type_move[17] = 53 nm = MOVE_ROOK_ML
// from[17] = 112
// to[17] = 115
// name_capture_piece_i[17] = 0
// a1-d1
packing_moves_k1_k2_true[18] = 7565365

// type_move[18] = 53 nm = MOVE_ROOK_ML
// from[18] = 119
// to[18] = 118
// name_capture_piece_i[18] = 0
// h1-g1
packing_moves_k1_k2_true[19] = 7763765

// type_move[19] = 53 nm = MOVE_ROOK_ML
// from[19] = 119
// to[19] = 117
// name_capture_piece_i[19] = 0
// h1-f1
packing_moves_k1_k2_true[20] = 7698229

// type_move[21] = 54 nm = MOVE_BISHOP_ML
// from[21] = 99
// to[21] = 69
// name_capture_piece_i[21] = 0
// d2-f4
packing_moves_k1_k2_true[21] = 4547382

// type_move[22] = 54 nm = MOVE_BISHOP_ML
// from[22] = 99
// to[22] = 54
// name_capture_piece_i[22] = 0
// d2-g5
packing_moves_k1_k2_true[22] = 3564342

// type_move[23] = 54 nm = MOVE_BISHOP_ML
// from[23] = 99
// to[23] = 39
// name_capture_piece_i[23] = 0
// d2-h6
packing_moves_k1_k2_true[23] = 2581302

// type_move[24] = 54 nm = MOVE_BISHOP_ML
// from[24] = 99
// to[24] = 114
// name_capture_piece_i[24] = 0
// d2-c1
packing_moves_k1_k2_true[24] = 7496502

// type_move[25] = 54 nm = MOVE_BISHOP_ML
// from[25] = 100
// to[25] = 117
// name_capture_piece_i[25] = 0
// e2-f1
packing_moves_k1_k2_true[25] = 7693366

// type_move[26] = 54 nm = MOVE_BISHOP_ML
// from[26] = 100
// to[26] = 115
// name_capture_piece_i[26] = 0
// e2-d1
packing_moves_k1_k2_true[26] = 7562294

// type_move[27] = 54 nm = MOVE_BISHOP_ML
// from[27] = 100
// to[27] = 83
// name_capture_piece_i[27] = 0
// e2-d3
packing_moves_k1_k2_true[27] = 5465142

// type_move[28] = 54 nm = MOVE_BISHOP_ML
// from[28] = 100
// to[28] = 66
// name_capture_piece_i[28] = 0
// e2-c4
packing_moves_k1_k2_true[28] = 4351030

// type_move[29] = 54 nm = MOVE_BISHOP_ML
// from[29] = 100
// to[29] = 49
// name_capture_piece_i[29] = 0
// e2-b5
packing_moves_k1_k2_true[29] = 3236918

// type_move[30] = 55 nm = MOVE_KNIGHT_ML
// from[30] = 52
// to[30] = 70
// name_capture_piece_i[30] = 0
// e5-g4
packing_moves_k1_k2_true[30] = 4600887

// type_move[31] = 55 nm = MOVE_KNIGHT_ML
// from[31] = 52
// to[31] = 83
// name_capture_piece_i[31] = 0
// e5-d3
packing_moves_k1_k2_true[31] = 5452855

// type_move[32] = 55 nm = MOVE_KNIGHT_ML
// from[32] = 52
// to[32] = 66
// name_capture_piece_i[32] = 0
// e5-c4
packing_moves_k1_k2_true[32] = 4338743

// type_move[33] = 55 nm = MOVE_KNIGHT_ML
// from[33] = 52
// to[33] = 34
// name_capture_piece_i[33] = 0
// e5-c6
packing_moves_k1_k2_true[33] = 2241591

// type_move[34] = 55 nm = MOVE_KNIGHT_ML
// from[34] = 82
// to[34] = 49
// name_capture_piece_i[34] = 0
// c3-b5
packing_moves_k1_k2_true[34] = 3232311

// type_move[35] = 55 nm = MOVE_KNIGHT_ML
// from[35] = 82
// to[35] = 115
// name_capture_piece_i[35] = 0
// c3-d1
packing_moves_k1_k2_true[35] = 7557687

// type_move[36] = 55 nm = MOVE_KNIGHT_ML
// from[36] = 82
// to[36] = 113
// name_capture_piece_i[36] = 0
// c3-b1
packing_moves_k1_k2_true[36] = 7426615

// type_move[37] = 55 nm = MOVE_KNIGHT_ML
// from[37] = 82
// to[37] = 64
// name_capture_piece_i[37] = 0
// c3-a4
packing_moves_k1_k2_true[37] = 4215351

// type_move[38] = 56 nm = MOVE_KING_ML
// from[38] = 116
// to[38] = 117
// name_capture_piece_i[38] = 0
// e1-f1
packing_moves_k1_k2_true[38] = 7697464

// type_move[39] = 56 nm = MOVE_KING_ML
// from[39] = 116
// to[39] = 115
// name_capture_piece_i[39] = 0
// e1-d1
packing_moves_k1_k2_true[39] = 7566392

// type_move[40] = 57 nm = MOVE_PAWN_ML
// from[40] = 51
// to[40] = 35
// name_capture_piece_i[40] = 0
// d5-d6
packing_moves_k1_k2_true[40] = 2306873

// type_move[41] = 57 nm = MOVE_PAWN_ML
// from[41] = 96
// to[41] = 80
// name_capture_piece_i[41] = 0
// a2-a3
packing_moves_k1_k2_true[41] = 5267513

// type_move[42] = 57 nm = MOVE_PAWN_ML
// from[42] = 97
// to[42] = 81
// name_capture_piece_i[42] = 0
// b2-b3
packing_moves_k1_k2_true[42] = 5333305

// type_move[43] = 57 nm = MOVE_PAWN_ML
// from[43] = 102
// to[43] = 86
// name_capture_piece_i[43] = 0
// g2-g3
packing_moves_k1_k2_true[43] = 5662265

// type_move[44] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[44] = 96
// to[44] = 64
// name_capture_piece_i[44] = 0
// a2-a4
packing_moves_k1_k2_true[44] = 4218938

// type_move[45] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[45] = 102
// to[45] = 70
// name_capture_piece_i[45] = 0
// g2-g4
packing_moves_k1_k2_true[45] = 4613690

// type_move[46] = 59 nm = MOVE_KING_CASTLE_ML
// from[46] = 116
// to[46] = 118
// name_capture_piece_i[46] = 0
// e1-g1
packing_moves_k1_k2_true[46] = 7763003

// type_move[47] = 60 nm = MOVE_KING_QUEEN_CASTLE_ML
// from[47] = 116
// to[47] = 114
// name_capture_piece_i[47] = 0
// e1-c1
packing_moves_k1_k2_true[47] = 7500860

packing_moves_k1_k2_true[IND_PIECE_COLOR_ML] = 1;
packing_moves_k1_k2_true[IND_NUMBER_CAPTURES_MOVE_ML] = 8;
packing_moves_k1_k2_true[IND_NUMBER_MOVE_ML] = 48;// количество ходов  

//-----------------------------------------------------------------------------------------


packing_moves_history_true[0] = 186672160
// type_move[0] = 32 nm = CAPTURES_BISHOP_BISHOP_ML
// from[0] = 100
// to[0] = 32
// name_capture_piece_i[0] = 11
// e2-a6
// h[0](52,16) = 5216
  
packing_moves_history_true[1] = 170218792
// type_move[1] = 40 nm = CAPTURES_QUEEN_KNIGHT_ML
// from[1] = 85
// to[1] = 37
// name_capture_piece_i[1] = 10
// f3-f6
// h[1](45,21) = 4521
  
packing_moves_history_true[2] = 153367341
// type_move[2] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[2] = 51
// to[2] = 36
// name_capture_piece_i[2] = 9
// d5-e6
// h[2](27,20) = 2720
  
packing_moves_history_true[3] = 156722733
// type_move[3] = 45 nm = CAPTURES_PAWN_PAWN_ML
// from[3] = 102
// to[3] = 87
// name_capture_piece_i[3] = 9
// g2-h3
// h[3](54,47) = 5447
  
packing_moves_history_true[4] = 152253487
// type_move[4] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[4] = 52
// to[4] = 19
// name_capture_piece_i[4] = 9
// e5-d7
// h[4](28,11) = 2811
  
packing_moves_history_true[5] = 152384559
// type_move[5] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[5] = 52
// to[5] = 21
// name_capture_piece_i[5] = 9
// e5-f7
// h[5](28,13) = 2813
  
packing_moves_history_true[6] = 153498671
// type_move[6] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[6] = 52
// to[6] = 38
// name_capture_piece_i[6] = 9
// e5-g6
// h[6](28,22) = 2822
  
packing_moves_history_true[7] = 156718386
// type_move[7] = 50 nm = CAPTURES_QUEEN_PAWN_ML
// from[7] = 85
// to[7] = 87
// name_capture_piece_i[7] = 9
// f3-h3
// h[7](45,47) = 4547
  
packing_moves_history_true[8] = 2306873
// type_move[8] = 57 nm = MOVE_PAWN_ML
// from[8] = 51
// to[8] = 35
// name_capture_piece_i[8] = 0
// d5-d6
// h[8](27,19) = 2719
  
packing_moves_history_true[9] = 2241591
// type_move[9] = 55 nm = MOVE_KNIGHT_ML
// from[9] = 52
// to[9] = 34
// name_capture_piece_i[9] = 0
// e5-c6
// h[9](28,18) = 2818
  
packing_moves_history_true[10] = 4338743
// type_move[10] = 55 nm = MOVE_KNIGHT_ML
// from[10] = 52
// to[10] = 66
// name_capture_piece_i[10] = 0
// e5-c4
// h[10](28,34) = 2834
  
packing_moves_history_true[11] = 4600887
// type_move[11] = 55 nm = MOVE_KNIGHT_ML
// from[11] = 52
// to[11] = 70
// name_capture_piece_i[11] = 0
// e5-g4
// h[11](28,38) = 2838
  
packing_moves_history_true[12] = 5452855
// type_move[12] = 55 nm = MOVE_KNIGHT_ML
// from[12] = 52
// to[12] = 83
// name_capture_piece_i[12] = 0
// e5-d3
// h[12](28,43) = 2843
  
packing_moves_history_true[13] = 3232311
// type_move[13] = 55 nm = MOVE_KNIGHT_ML
// from[13] = 82
// to[13] = 49
// name_capture_piece_i[13] = 0
// c3-b5
// h[13](42,25) = 4225
  
packing_moves_history_true[14] = 4215351
// type_move[14] = 55 nm = MOVE_KNIGHT_ML
// from[14] = 82
// to[14] = 64
// name_capture_piece_i[14] = 0
// c3-a4
// h[14](42,32) = 4232
  
packing_moves_history_true[15] = 7426615
// type_move[15] = 55 nm = MOVE_KNIGHT_ML
// from[15] = 82
// to[15] = 113
// name_capture_piece_i[15] = 0
// c3-b1
// h[15](42,57) = 4257
  
packing_moves_history_true[16] = 7557687
// type_move[16] = 55 nm = MOVE_KNIGHT_ML
// from[16] = 82
// to[16] = 115
// name_capture_piece_i[16] = 0
// c3-d1
// h[16](42,59) = 4259
  
packing_moves_history_true[17] = 3495220
// type_move[17] = 52 nm = MOVE_QUEEN_ML
// from[17] = 85
// to[17] = 53
// name_capture_piece_i[17] = 0
// f3-f5
// h[17](45,29) = 4529
  
packing_moves_history_true[18] = 3626292
// type_move[18] = 52 nm = MOVE_QUEEN_ML
// from[18] = 85
// to[18] = 55
// name_capture_piece_i[18] = 0
// f3-h5
// h[18](45,31) = 4531
  
packing_moves_history_true[19] = 4543796
// type_move[19] = 52 nm = MOVE_QUEEN_ML
// from[19] = 85
// to[19] = 69
// name_capture_piece_i[19] = 0
// f3-f4
// h[19](45,37) = 4537
  
packing_moves_history_true[20] = 4609332
// type_move[20] = 52 nm = MOVE_QUEEN_ML
// from[20] = 85
// to[20] = 70
// name_capture_piece_i[20] = 0
// f3-g4
// h[20](45,38) = 4538
  
packing_moves_history_true[21] = 5461300
// type_move[21] = 52 nm = MOVE_QUEEN_ML
// from[21] = 85
// to[21] = 83
// name_capture_piece_i[21] = 0
// f3-d3
// h[21](45,43) = 4543
  
packing_moves_history_true[22] = 5526836
// type_move[22] = 52 nm = MOVE_QUEEN_ML
// from[22] = 85
// to[22] = 84
// name_capture_piece_i[22] = 0
// f3-e3
// h[22](45,44) = 4544
  
packing_moves_history_true[23] = 5657908
// type_move[23] = 52 nm = MOVE_QUEEN_ML
// from[23] = 85
// to[23] = 86
// name_capture_piece_i[23] = 0
// f3-g3
// h[23](45,46) = 4546
  
packing_moves_history_true[24] = 4218938
// type_move[24] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[24] = 96
// to[24] = 64
// name_capture_piece_i[24] = 0
// a2-a4
// h[24](48,32) = 4832
  
packing_moves_history_true[25] = 5267513
// type_move[25] = 57 nm = MOVE_PAWN_ML
// from[25] = 96
// to[25] = 80
// name_capture_piece_i[25] = 0
// a2-a3
// h[25](48,40) = 4840
  
packing_moves_history_true[26] = 5333305
// type_move[26] = 57 nm = MOVE_PAWN_ML
// from[26] = 97
// to[26] = 81
// name_capture_piece_i[26] = 0
// b2-b3
// h[26](49,41) = 4941
  
packing_moves_history_true[27] = 2581302
// type_move[27] = 54 nm = MOVE_BISHOP_ML
// from[27] = 99
// to[27] = 39
// name_capture_piece_i[27] = 0
// d2-h6
// h[27](51,23) = 5123
  
packing_moves_history_true[28] = 3564342
// type_move[28] = 54 nm = MOVE_BISHOP_ML
// from[28] = 99
// to[28] = 54
// name_capture_piece_i[28] = 0
// d2-g5
// h[28](51,30) = 5130
  
packing_moves_history_true[29] = 4547382
// type_move[29] = 54 nm = MOVE_BISHOP_ML
// from[29] = 99
// to[29] = 69
// name_capture_piece_i[29] = 0
// d2-f4
// h[29](51,37) = 5137
  
packing_moves_history_true[30] = 5530422
// type_move[30] = 54 nm = MOVE_BISHOP_ML
// from[30] = 99
// to[30] = 84
// name_capture_piece_i[30] = 0
// d2-e3
// h[30](51,44) = 5144
  
packing_moves_history_true[31] = 7496502
// type_move[31] = 54 nm = MOVE_BISHOP_ML
// from[31] = 99
// to[31] = 114
// name_capture_piece_i[31] = 0
// d2-c1
// h[31](51,58) = 5158
  
packing_moves_history_true[32] = 3236918
// type_move[32] = 54 nm = MOVE_BISHOP_ML
// from[32] = 100
// to[32] = 49
// name_capture_piece_i[32] = 0
// e2-b5
// h[32](52,25) = 5225
  
packing_moves_history_true[33] = 4351030
// type_move[33] = 54 nm = MOVE_BISHOP_ML
// from[33] = 100
// to[33] = 66
// name_capture_piece_i[33] = 0
// e2-c4
// h[33](52,34) = 5234
  
packing_moves_history_true[34] = 5465142
// type_move[34] = 54 nm = MOVE_BISHOP_ML
// from[34] = 100
// to[34] = 83
// name_capture_piece_i[34] = 0
// e2-d3
// h[34](52,43) = 5243
  
packing_moves_history_true[35] = 7562294
// type_move[35] = 54 nm = MOVE_BISHOP_ML
// from[35] = 100
// to[35] = 115
// name_capture_piece_i[35] = 0
// e2-d1
// h[35](52,59) = 5259
  
packing_moves_history_true[36] = 7693366
// type_move[36] = 54 nm = MOVE_BISHOP_ML
// from[36] = 100
// to[36] = 117
// name_capture_piece_i[36] = 0
// e2-f1
// h[36](52,61) = 5261
  
packing_moves_history_true[37] = 4613690
// type_move[37] = 58 nm = MOVE_DOUBLE_PAWN_ML
// from[37] = 102
// to[37] = 70
// name_capture_piece_i[37] = 0
// g2-g4
// h[37](54,38) = 5438
  
packing_moves_history_true[38] = 5662265
// type_move[38] = 57 nm = MOVE_PAWN_ML
// from[38] = 102
// to[38] = 86
// name_capture_piece_i[38] = 0
// g2-g3
// h[38](54,46) = 5446
  
packing_moves_history_true[39] = 7434293
// type_move[39] = 53 nm = MOVE_ROOK_ML
// from[39] = 112
// to[39] = 113
// name_capture_piece_i[39] = 0
// a1-b1
// h[39](56,57) = 5657
  
packing_moves_history_true[40] = 7499829
// type_move[40] = 53 nm = MOVE_ROOK_ML
// from[40] = 112
// to[40] = 114
// name_capture_piece_i[40] = 0
// a1-c1
// h[40](56,58) = 5658
  
packing_moves_history_true[41] = 7565365
// type_move[41] = 53 nm = MOVE_ROOK_ML
// from[41] = 112
// to[41] = 115
// name_capture_piece_i[41] = 0
// a1-d1
// h[41](56,59) = 5659
  
packing_moves_history_true[42] = 7500860
// type_move[42] = 60 nm = MOVE_KING_QUEEN_CASTLE_ML
// from[42] = 116
// to[42] = 114
// name_capture_piece_i[42] = 0
// e1-c1
// h[42](60,58) = 6058
  
packing_moves_history_true[43] = 7566392
// type_move[43] = 56 nm = MOVE_KING_ML
// from[43] = 116
// to[43] = 115
// name_capture_piece_i[43] = 0
// e1-d1
// h[43](60,59) = 6059
  
packing_moves_history_true[44] = 7697464
// type_move[44] = 56 nm = MOVE_KING_ML
// from[44] = 116
// to[44] = 117
// name_capture_piece_i[44] = 0
// e1-f1
// h[44](60,61) = 6061
  
packing_moves_history_true[45] = 7763003
// type_move[45] = 59 nm = MOVE_KING_CASTLE_ML
// from[45] = 116
// to[45] = 118
// name_capture_piece_i[45] = 0
// e1-g1
// h[45](60,62) = 6062
  
packing_moves_history_true[46] = 7698229
// type_move[46] = 53 nm = MOVE_ROOK_ML
// from[46] = 119
// to[46] = 117
// name_capture_piece_i[46] = 0
// h1-f1
// h[46](63,61) = 6361
  
packing_moves_history_true[47] = 7763765
// type_move[47] = 53 nm = MOVE_ROOK_ML
// from[47] = 119
// to[47] = 118
// name_capture_piece_i[47] = 0
// h1-g1
// h[47](63,62) = 6362

packing_moves_history_true[IND_PIECE_COLOR_ML] = 1;
packing_moves_history_true[IND_NUMBER_CAPTURES_MOVE_ML] = 8;
packing_moves_history_true[IND_NUMBER_MOVE_ML] = 48;// количество ходов 


export { packing_moves, packing_moves_sorting_true, packing_moves_capture_in_0_true,
     packing_moves_move_in_0_true, packing_moves_k1_k2_true, packing_moves_history_true };