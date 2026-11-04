// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name generator_move_quiet_pm_0x88_test.js
 * @version created 03.07m.2026
 * 
*/

import {
    LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    MOVE_NO_ML
} from "../move_list_0x88_t/move_list_0x88.js";

/**
 * НАЗНАЧЕНИЕ
    pm - packing moves
*/
// генерация ходов коня на 52  из позиции r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -
let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

// генерация ходов из позиции r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -
let packing_moves_f = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

//1123 type_move[9] = 55 nm = MOVE_KNIGHT_ML
//1124 from[9] = 52
//1125 to[9] = 70
//1126 name_capture_piece_i[9] = 0
//1128 e5-g4
packing_moves[0] = 4600887 

//1123 type_move[10] = 55 nm = MOVE_KNIGHT_ML
//1124 from[10] = 52
//1125 to[10] = 83
//1126 name_capture_piece_i[10] = 0
//1128 e5-d3
packing_moves[1] = 5452855 

//1123 type_move[11] = 55 nm = MOVE_KNIGHT_ML
//1124 from[11] = 52
//1125 to[11] = 66
//1126 name_capture_piece_i[11] = 0
//1128 e5-c4
packing_moves[2] = 4338743 

//1123 type_move[12] = 55 nm = MOVE_KNIGHT_ML
//1124 from[12] = 52
//1125 to[12] = 34
//1126 name_capture_piece_i[12] = 0
//1128 e5-c6
packing_moves[3] = 2241591 

packing_moves[IND_PIECE_COLOR_ML] = 1;
packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = 0;
packing_moves[IND_NUMBER_MOVE_ML] = 4;// количество ходов  

//---------------------------------------------------------------

//1123 type_move[8] = 57 nm = MOVE_PAWN_ML
//1124 from[8] = 51
//1125 to[8] = 35
//1126 name_capture_piece_i[8] = 0
//1128 d5-d6
packing_moves_f[0] = 2306873 

//1123 type_move[9] = 55 nm = MOVE_KNIGHT_ML
//1124 from[9] = 52
//1125 to[9] = 70
//1126 name_capture_piece_i[9] = 0
//1128 e5-g4
packing_moves_f[1] = 4600887 

//1123 type_move[10] = 55 nm = MOVE_KNIGHT_ML
//1124 from[10] = 52
//1125 to[10] = 83
//1126 name_capture_piece_i[10] = 0
//1128 e5-d3
packing_moves_f[2] = 5452855 

//1123 type_move[11] = 55 nm = MOVE_KNIGHT_ML
//1124 from[11] = 52
//1125 to[11] = 66
//1126 name_capture_piece_i[11] = 0
//1128 e5-c4
packing_moves_f[3] = 4338743 

//1123 type_move[12] = 55 nm = MOVE_KNIGHT_ML
//1124 from[12] = 52
//1125 to[12] = 34
//1126 name_capture_piece_i[12] = 0
//1128 e5-c6
packing_moves_f[4] = 2241591 

//1123 type_move[13] = 55 nm = MOVE_KNIGHT_ML
//1124 from[13] = 82
//1125 to[13] = 49
//1126 name_capture_piece_i[13] = 0
//1128 c3-b5
packing_moves_f[5] = 3232311 

//1123 type_move[14] = 55 nm = MOVE_KNIGHT_ML
//1124 from[14] = 82
//1125 to[14] = 115
//1126 name_capture_piece_i[14] = 0
//1128 c3-d1
packing_moves_f[6] = 7557687 

//1123 type_move[15] = 55 nm = MOVE_KNIGHT_ML
//1124 from[15] = 82
//1125 to[15] = 113
//1126 name_capture_piece_i[15] = 0
//1128 c3-b1
packing_moves_f[7] = 7426615 

//1123 type_move[16] = 55 nm = MOVE_KNIGHT_ML
//1124 from[16] = 82
//1125 to[16] = 64
//1126 name_capture_piece_i[16] = 0
//1128 c3-a4
packing_moves_f[8] = 4215351

//1123 type_move[17] = 52 nm = MOVE_QUEEN_ML
//1124 from[17] = 85
//1125 to[17] = 69
//1126 name_capture_piece_i[17] = 0
//1128 f3-f4
packing_moves_f[9] = 4543796 

//1123 type_move[18] = 52 nm = MOVE_QUEEN_ML
//1124 from[18] = 85
//1125 to[18] = 53
//1126 name_capture_piece_i[18] = 0
//1128 f3-f5
packing_moves_f[10] = 3495220 

//1123 type_move[19] = 52 nm = MOVE_QUEEN_ML
//1124 from[19] = 85
//1125 to[19] = 70
//1126 name_capture_piece_i[19] = 0
//1128 f3-g4
packing_moves_f[11] = 4609332

//1123 type_move[20] = 52 nm = MOVE_QUEEN_ML
//1124 from[20] = 85
//1125 to[20] = 55
//1126 name_capture_piece_i[20] = 0
//1128 f3-h5
packing_moves_f[12] = 3626292

//1123 type_move[21] = 52 nm = MOVE_QUEEN_ML
//1124 from[21] = 85
//1125 to[21] = 86
//1126 name_capture_piece_i[21] = 0
//1128 f3-g3
packing_moves_f[13] = 5657908

//1123 type_move[22] = 52 nm = MOVE_QUEEN_ML
//1124 from[22] = 85
//1125 to[22] = 84
//1126 name_capture_piece_i[22] = 0
//1128 f3-e3
packing_moves_f[14] = 5526836

//1123 type_move[23] = 52 nm = MOVE_QUEEN_ML
//1124 from[23] = 85
//1125 to[23] = 83
//1126 name_capture_piece_i[23] = 0
//1128 f3-d3
packing_moves_f[15] = 5461300 

//1123 type_move[24] = 58 nm = MOVE_DOUBLE_PAWN_ML
//1124 from[24] = 96
//1125 to[24] = 64
//1126 name_capture_piece_i[24] = 0
//1128 a2-a4
packing_moves_f[16] = 4218938 

//1123 type_move[25] = 57 nm = MOVE_PAWN_ML
//1124 from[25] = 96
//1125 to[25] = 80
//1126 name_capture_piece_i[25] = 0
//1128 a2-a3
packing_moves_f[17] = 5267513

//1123 type_move[26] = 57 nm = MOVE_PAWN_ML
//1124 from[26] = 97
//1125 to[26] = 81
//1126 name_capture_piece_i[26] = 0
//1128 b2-b3
packing_moves_f[18] = 5333305

//1123 type_move[27] = 54 nm = MOVE_BISHOP_ML
//1124 from[27] = 99
//1125 to[27] = 84
//1126 name_capture_piece_i[27] = 0
//1128 d2-e3
packing_moves_f[19] = 5530422 

//1123 type_move[28] = 54 nm = MOVE_BISHOP_ML
//1124 from[28] = 99
//1125 to[28] = 69
//1126 name_capture_piece_i[28] = 0
//1128 d2-f4
packing_moves_f[20] = 4547382 

//1123 type_move[29] = 54 nm = MOVE_BISHOP_ML
//1124 from[29] = 99
//1125 to[29] = 54
//1126 name_capture_piece_i[29] = 0
//1128 d2-g5
packing_moves_f[21] = 3564342 

//1123 type_move[30] = 54 nm = MOVE_BISHOP_ML
//1124 from[30] = 99
//1125 to[30] = 39
//1126 name_capture_piece_i[30] = 0
//1128 d2-h6
packing_moves_f[22] = 2581302 

//1123 type_move[31] = 54 nm = MOVE_BISHOP_ML
//1124 from[31] = 99
//1125 to[31] = 114
//1126 name_capture_piece_i[31] = 0
//1128 d2-c1
packing_moves_f[23] = 7496502 

//1123 type_move[32] = 54 nm = MOVE_BISHOP_ML
//1124 from[32] = 100
//1125 to[32] = 117
//1126 name_capture_piece_i[32] = 0
//1128 e2-f1
packing_moves_f[24] = 7693366 

//1123 type_move[33] = 54 nm = MOVE_BISHOP_ML
//1124 from[33] = 100
//1125 to[33] = 115
//1126 name_capture_piece_i[33] = 0
//1128 e2-d1
packing_moves_f[25] = 7562294

//1123 type_move[34] = 54 nm = MOVE_BISHOP_ML
//1124 from[34] = 100
//1125 to[34] = 83
//1126 name_capture_piece_i[34] = 0
//1128 e2-d3
packing_moves_f[26] = 5465142 

//1123 type_move[35] = 54 nm = MOVE_BISHOP_ML
//1124 from[35] = 100
//1125 to[35] = 66
//1126 name_capture_piece_i[35] = 0
//1128 e2-c4
packing_moves_f[27] = 4351030 

//1123 type_move[36] = 54 nm = MOVE_BISHOP_ML
//1124 from[36] = 100
//1125 to[36] = 49
//1126 name_capture_piece_i[36] = 0
//1128 e2-b5
packing_moves_f[28] = 3236918 

//1123 type_move[37] = 58 nm = MOVE_DOUBLE_PAWN_ML
//1124 from[37] = 102
//1125 to[37] = 70
//1126 name_capture_piece_i[37] = 0
//1128 g2-g4
packing_moves_f[29] = 4613690

//1123 type_move[38] = 57 nm = MOVE_PAWN_ML
//1124 from[38] = 102
//1125 to[38] = 86
//1126 name_capture_piece_i[38] = 0
//1128 g2-g3
packing_moves_f[30] = 5662265 

//1123 type_move[39] = 53 nm = MOVE_ROOK_ML
//1124 from[39] = 112
//1125 to[39] = 113
//1126 name_capture_piece_i[39] = 0
//1128 a1-b1
packing_moves_f[31] = 7434293 

//1123 type_move[40] = 53 nm = MOVE_ROOK_ML
//1124 from[40] = 112
//1125 to[40] = 114
//1126 name_capture_piece_i[40] = 0
//1128 a1-c1
packing_moves_f[32] = 7499829 

//1123 type_move[41] = 53 nm = MOVE_ROOK_ML
//1124 from[41] = 112
//1125 to[41] = 115
//1126 name_capture_piece_i[41] = 0
//1128 a1-d1
packing_moves_f[33] = 7565365 

//1123 type_move[42] = 56 nm = MOVE_KING_ML
//1124 from[42] = 116
//1125 to[42] = 117
//1126 name_capture_piece_i[42] = 0
//1128 e1-f1
packing_moves_f[34] = 7697464 

//1123 type_move[43] = 56 nm = MOVE_KING_ML
//1124 from[43] = 116
//1125 to[43] = 115
//1126 name_capture_piece_i[43] = 0
//1128 e1-d1
packing_moves_f[35] = 7566392 

//1123 type_move[44] = 60 nm = MOVE_KING_QUEEN_CASTLE_ML
//1124 from[44] = 116
//1125 to[44] = 114
//1126 name_capture_piece_i[44] = 0
//1128 e1-c1
packing_moves_f[36] = 7500860 

//1123 type_move[45] = 59 nm = MOVE_KING_CASTLE_ML
//1124 from[45] = 116
//1125 to[45] = 118
//1126 name_capture_piece_i[45] = 0
//1128 e1-g1
packing_moves_f[37] = 7763003

//1123 type_move[46] = 53 nm = MOVE_ROOK_ML
//1124 from[46] = 119
//1125 to[46] = 118
//1126 name_capture_piece_i[46] = 0
//1128 h1-g1
packing_moves_f[38] = 7763765

//1123 type_move[47] = 53 nm = MOVE_ROOK_ML
//1124 from[47] = 119
//1125 to[47] = 117
//1126 name_capture_piece_i[47] = 0
//1128 h1-f1
packing_moves_f[39] = 7698229

packing_moves_f[IND_PIECE_COLOR_ML] = 1;
packing_moves_f[IND_NUMBER_CAPTURES_MOVE_ML] = 0;
packing_moves_f[IND_NUMBER_MOVE_ML] = 40;// количество ходов  


//---------------------------------------------------------------

//-----------------------------------------------------------------------------------------




export { packing_moves, packing_moves_f

 };