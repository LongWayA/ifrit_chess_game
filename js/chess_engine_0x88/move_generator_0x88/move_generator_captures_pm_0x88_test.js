// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_generator_captures_pm_0x88_test.js
 * @version created 27.06m.2026 
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
// генерация ходов коня на 52  из позиции r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -
let packing_moves = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

// генерация ходов из позиции r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -
let packing_moves_f = new Int32Array(LENGTH_LIST_ML).fill(MOVE_NO_ML);

// type_move[0] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[0] = 52
// to[0] = 19
// name_capture_piece_i[0] = 9
// e5-d7
packing_moves[0] = 152253487

// type_move[1] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[1] = 52
// to[1] = 21
// name_capture_piece_i[1] = 9
// e5-f7
packing_moves[1] = 152384559

// type_move[2] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
// from[2] = 52
// to[2] = 38
// name_capture_piece_i[2] = 9
// e5-g6
packing_moves[2] = 153498671

packing_moves[IND_PIECE_COLOR_ML] = 1;
packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = 3;
packing_moves[IND_NUMBER_MOVE_ML] = 3;// количество ходов  

//---------------------------------------------------------------

packing_moves_f[0] = 153367341
//1123 type_move[0] = 45 nm = CAPTURES_PAWN_PAWN_ML
//1124 from[0] = 51
//1125 to[0] = 36
//1126 name_capture_piece_i[0] = 9
//1128 d5-e6
//1133 ---- 
packing_moves_f[1] = 152253487
//1123 type_move[1] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
//1124 from[1] = 52
//1125 to[1] = 19
//1126 name_capture_piece_i[1] = 9
//1128 e5-d7
//1133 ---- 
packing_moves_f[2] = 152384559
//1123 type_move[2] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
//1124 from[2] = 52
//1125 to[2] = 21
//1126 name_capture_piece_i[2] = 9
//1128 e5-f7
//1133 ---- 
packing_moves_f[3] = 153498671
//1123 type_move[3] = 47 nm = CAPTURES_KNIGHT_PAWN_ML
//1124 from[3] = 52
//1125 to[3] = 38
//1126 name_capture_piece_i[3] = 9
//1128 e5-g6
//1133 ---- 
packing_moves_f[4] = 170218792
//1123 type_move[4] = 40 nm = CAPTURES_QUEEN_KNIGHT_ML
//1124 from[4] = 85
//1125 to[4] = 37
//1126 name_capture_piece_i[4] = 10
//1128 f3-f6
//1133 ---- 
packing_moves_f[5] = 156718386
//1123 type_move[5] = 50 nm = CAPTURES_QUEEN_PAWN_ML
//1124 from[5] = 85
//1125 to[5] = 87
//1126 name_capture_piece_i[5] = 9
//1128 f3-h3
//1133 ---- 
packing_moves_f[6] = 186672160
//1123 type_move[6] = 32 nm = CAPTURES_BISHOP_BISHOP_ML
//1124 from[6] = 100
//1125 to[6] = 32
//1126 name_capture_piece_i[6] = 11
//1128 e2-a6
//1133 ---- 
packing_moves_f[7] = 156722733
//1123 type_move[7] = 45 nm = CAPTURES_PAWN_PAWN_ML
//1124 from[7] = 102
//1125 to[7] = 87
//1126 name_capture_piece_i[7] = 9
//1128 g2-h3

packing_moves_f[IND_PIECE_COLOR_ML] = 1;
packing_moves_f[IND_NUMBER_CAPTURES_MOVE_ML] = 8;
packing_moves_f[IND_NUMBER_MOVE_ML] = 8;// количество ходов  


//---------------------------------------------------------------




//-----------------------------------------------------------------------------------------




export { packing_moves, packing_moves_f

 };