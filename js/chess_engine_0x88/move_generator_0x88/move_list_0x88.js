// @ts-check
/** 
 * @copyright Copyright (c_ML) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name move_list_0x88.js
 * @version created 24.01m.2026 
 * Code review: Qwen3.7-Max AI
*/

//+
// проверить: sorting_list_history_heuristic_ml

import {
    s_0x88_to_x07_cb, s_0x88_to_y07_cb,
    LET_COOR_CB,
    PIECE_NO_CB, W_PAWN_CB, W_KNIGHT_CB, W_BISHOP_CB, W_ROOK_CB, W_QUEEN_CB, W_KING_CB, B_PAWN_CB,
    B_KNIGHT_CB, B_BISHOP_CB, B_ROOK_CB, B_QUEEN_CB, B_KING_CB, SQUARE_128_to_64_CB
} from "./chess_board_0x88.js";


/**
* НАЗНАЧЕНИЕ

 Список содержит псевдолегальные ходы, т.е. есть ходы под шах, открывающие шах
 и рокировки через битые поля.

 Ход содержит:

 let packing_moves = new Int32Array(LENGTH_LIST = 260).fill(MOVE_NO);

 Каждый ход упакован в одно 32-битное число по такой схеме: 
 Биты:  31........24  23.......16  15.......8   7.......0
        ┌──────────┐  ┌─────────┐  ┌────────┐  ┌────────┐
        │ capture  │  │   to    │  │  from  │  │  type  │
        │  (8 бит) │  │ (8 бит) │  │ (8 бит)│  │ (8 бит)│
        └──────────┘  └─────────┘  └────────┘  └────────┘

  индексы массива от 0 до 256 зарезервированы для упакованого хода:
  packing_moves[i]
  8 бит для type_move - тип хода. всего 60 разных типов ходов
  8 бит для from - откуда ходит фигура на 128 клеточном поле
  8 бит для to - куда ходит фигура на 128 клеточном поле
  8 бит для name_capture_piece - имя взятой фигуры

  индексы массива зарезервированы для: 
  257 - piece_color - цвет ходяшей фигуры: 0 - черная, 1 - белая.
  258 - number_captures_move - количество взятий
  259 - number_move - количество всех записаных ходов

  распакованные типы не знаю пока куда поместить, но точно не в тот же массив:
   для type_move - тип хода. всего 60 разных типов ходов
   для from - откуда ходит фигура на 128 клеточном поле
   для to - куда ходит фигура на 128 клеточном поле
   для name_capture_piece - имя взятой фигуры
*/

const LENGTH_LIST_ML = 260;// максимально возможная длина списка ходов

const IND_PIECE_COLOR_ML = 257; // индекс для цвета ходящей стороны
const IND_NUMBER_CAPTURES_MOVE_ML = 258; // индекс для колличества взятий
const IND_NUMBER_MOVE_ML = 259; // индекс для количества ходов

// что это такое?
const IND_PROMO_QUEEN_ML = 0;
const IND_PROMO_ROOK_ML = 1;
const IND_PROMO_BISHOP_ML = 2;
const IND_PROMO_KNIGHT_ML = 3;

//---------------------------------------------------------------------------

// расписал все возможные типы ходов. всего получилось 61 типа ходов(нет хода по настоянию Квена тоже посчитал :)
// теперь каждый тип хода имеет свой обработчик

const MOVE_NO_ML = 0;// нет хода

// абсолютный приоритет. пешка берет да еще превращается в фигуру
// превращение в ферзь
// взятие пешкой фигуры и превращение в фигуру
const CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML = 1;//
const CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML = 2;// пешка берет ладью и превращается в ферзь
const CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML = 3;//
const CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML = 4;//
// превращение в ладью
const CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML = 5;//
const CAPTURES_PAWN_ROOK_PROMO_ROOK_ML = 6;//
const CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML = 7;//
const CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML = 8;//
// превращение в слона
const CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML = 9;//
const CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML = 10;//
const CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML = 11;//
const CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML = 12;//
// превращение в коня
const CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML = 13;//
const CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML = 14;//
const CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML = 15;//
const CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML = 16;//

// ходы пешки с превращением
const MOVE_PAWN_PROMO_QUEEN_ML = 17;//
const MOVE_PAWN_PROMO_ROOK_ML = 18;// 
const MOVE_PAWN_PROMO_BISHOP_ML = 19;//
const MOVE_PAWN_PROMO_KNIGHT_ML = 20;//

// взятая фигура дороже чем та, что берет
const CAPTURES_PAWN_QUEEN_ML = 21;// пешка берет ферзь
const CAPTURES_PAWN_ROOK_ML = 22;//
const CAPTURES_PAWN_BISHOP_ML = 23;//
const CAPTURES_PAWN_KNIGHT_ML = 24;//

const CAPTURES_KNIGHT_QUEEN_ML = 25;//
const CAPTURES_KNIGHT_ROOK_ML = 26;//

const CAPTURES_BISHOP_QUEEN_ML = 27;//
const CAPTURES_BISHOP_ROOK_ML = 28;//

const CAPTURES_ROOK_QUEEN_ML = 29;//

// фигуры равнозначны
const CAPTURES_KNIGHT_BISHOP_ML = 30;//  
const CAPTURES_KNIGHT_KNIGHT_ML = 31;//

const CAPTURES_BISHOP_BISHOP_ML = 32;//
const CAPTURES_BISHOP_KNIGHT_ML = 33;//

const CAPTURES_ROOK_ROOK_ML = 34;//
const CAPTURES_QUEEN_QUEEN_ML = 35;//

// взятая фигура дешевле той что берет
const CAPTURES_ROOK_BISHOP_ML = 36;//
const CAPTURES_ROOK_KNIGHT_ML = 37;//

const CAPTURES_QUEEN_ROOK_ML = 38;//
const CAPTURES_QUEEN_BISHOP_ML = 39;//
const CAPTURES_QUEEN_KNIGHT_ML = 40;//
/* 
Qwen3.7-Max AI:
"В реальности QxP (выигрыш материала + безопасность) — это отличный ход, 
а KxN — почти всегда нелегальный ход (конь под защитой), который ведет к потере короля.
По правилу MVV/LVA (Most Valuable Victim / Least Valuable Attacker), атакующий 
Король — самая дорогая фигура, поэтому взятия королем должны иметь САМЫЙ НИЗКИЙ 
приоритет среди всех взятий (стоять в самом конце списка взятий, перед тихими ходами)."

Я пока оставлю как есть.
Взятия королем случай очень редкий и не думаю что это как то скажется на скорости игры.
*/

// взятия королем
const CAPTURES_KING_QUEEN_ML = 41;//
const CAPTURES_KING_ROOK_ML = 42;//
const CAPTURES_KING_BISHOP_ML = 43;//
const CAPTURES_KING_KNIGHT_ML = 44;//

// взятия пешек
const CAPTURES_PAWN_PAWN_ML = 45;//
const EP_CAPTURES_ML = 46;// взятие на проходе
const CAPTURES_KNIGHT_PAWN_ML = 47;//
const CAPTURES_BISHOP_PAWN_ML = 48;//
const CAPTURES_ROOK_PAWN_ML = 49;//
const CAPTURES_QUEEN_PAWN_ML = 50;//
const CAPTURES_KING_PAWN_ML = 51;//

/////////////////////////////////////////////////// 

const MOVE_QUEEN_ML = 52;// ход ферзем
const MOVE_ROOK_ML = 53;// ход ладьей
const MOVE_BISHOP_ML = 54;// ход слоном
const MOVE_KNIGHT_ML = 55;// ход конем
const MOVE_KING_ML = 56;// простой ход королем

const MOVE_PAWN_ML = 57;// ход пешкой
const MOVE_DOUBLE_PAWN_ML = 58;// ход пешкой на две клетки

const MOVE_KING_CASTLE_ML = 59;// короткая рокировка
const MOVE_KING_QUEEN_CASTLE_ML = 60;// длинная рокировка

//-----------------------------------------------------------------

// тут по номеру типа хода можно получить его название
const TYPE_MOVE_NAME_ML = [
    "MOVE_NO_ML",
    "CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML",
    "CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML",
    "CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML",
    "CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML",
    "CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML",
    "CAPTURES_PAWN_ROOK_PROMO_ROOK_ML",
    "CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML",
    "CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML",
    "CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML",
    "CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML",
    "CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML",
    "CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML",
    "CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML",
    "CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML",
    "CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML",
    "CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML",
    "MOVE_PAWN_PROMO_QUEEN_ML",
    "MOVE_PAWN_PROMO_ROOK_ML",
    "MOVE_PAWN_PROMO_BISHOP_ML",
    "MOVE_PAWN_PROMO_KNIGHT_ML",
    "CAPTURES_PAWN_QUEEN_ML",
    "CAPTURES_PAWN_ROOK_ML",
    "CAPTURES_PAWN_BISHOP_ML",
    "CAPTURES_PAWN_KNIGHT_ML",
    "CAPTURES_KNIGHT_QUEEN_ML",
    "CAPTURES_KNIGHT_ROOK_ML",
    "CAPTURES_BISHOP_QUEEN_ML",
    "CAPTURES_BISHOP_ROOK_ML",
    "CAPTURES_ROOK_QUEEN_ML",
    "CAPTURES_KNIGHT_BISHOP_ML",
    "CAPTURES_KNIGHT_KNIGHT_ML",
    "CAPTURES_BISHOP_BISHOP_ML",
    "CAPTURES_BISHOP_KNIGHT_ML",
    "CAPTURES_ROOK_ROOK_ML",
    "CAPTURES_QUEEN_QUEEN_ML",
    "CAPTURES_ROOK_BISHOP_ML",
    "CAPTURES_ROOK_KNIGHT_ML",
    "CAPTURES_QUEEN_ROOK_ML",
    "CAPTURES_QUEEN_BISHOP_ML",
    "CAPTURES_QUEEN_KNIGHT_ML",
    "CAPTURES_KING_QUEEN_ML",
    "CAPTURES_KING_ROOK_ML",
    "CAPTURES_KING_BISHOP_ML",
    "CAPTURES_KING_KNIGHT_ML",
    "CAPTURES_PAWN_PAWN_ML",
    "EP_CAPTURES_ML",
    "CAPTURES_KNIGHT_PAWN_ML",
    "CAPTURES_BISHOP_PAWN_ML",
    "CAPTURES_ROOK_PAWN_ML",
    "CAPTURES_QUEEN_PAWN_ML",
    "CAPTURES_KING_PAWN_ML",
    "MOVE_QUEEN_ML",
    "MOVE_ROOK_ML",
    "MOVE_BISHOP_ML",
    "MOVE_KNIGHT_ML",
    "MOVE_KING_ML",
    "MOVE_PAWN_ML",
    "MOVE_DOUBLE_PAWN_ML",
    "MOVE_KING_CASTLE_ML",
    "MOVE_KING_QUEEN_CASTLE_ML",
];


//--------------------------------------------------------------
// код от Qwen3.7-Max AI
// используем в функции return_type_simple_move_ml
// 1. Создаем плоский массив. 
// Размер: 16x16 = 256. (Предполагаем, что ID фигур не превышают 15. Если B_KING_CB больше, увеличь до 32).
const PIECE_LUT_SIZE = 16;
const SIMPLE_MOVE_LUT = new Int32Array(PIECE_LUT_SIZE * PIECE_LUT_SIZE).fill(MOVE_NO_ML);

// Вспомогательная функция для удобного заполнения (вызывается только при инициализации модуля)
/**
* @param {number} p1 - фигура которая ходит
* @param {number} p2 - взятая фигура, или пустая клетка
* @param {number} val - тип хода
*/
const L = (p1, p2, val) => { SIMPLE_MOVE_LUT[p1 * PIECE_LUT_SIZE + p2] = val; };

// Заполняем LUT
// Короли
L(W_KING_CB, PIECE_NO_CB, MOVE_KING_ML);
L(W_KING_CB, B_QUEEN_CB, CAPTURES_KING_QUEEN_ML);
L(W_KING_CB, B_ROOK_CB, CAPTURES_KING_ROOK_ML); L(W_KING_CB, B_BISHOP_CB, CAPTURES_KING_BISHOP_ML);
L(W_KING_CB, B_KNIGHT_CB, CAPTURES_KING_KNIGHT_ML); L(W_KING_CB, B_PAWN_CB, CAPTURES_KING_PAWN_ML);

L(B_KING_CB, PIECE_NO_CB, MOVE_KING_ML);
L(B_KING_CB, W_QUEEN_CB, CAPTURES_KING_QUEEN_ML);
L(B_KING_CB, W_ROOK_CB, CAPTURES_KING_ROOK_ML); L(B_KING_CB, W_BISHOP_CB, CAPTURES_KING_BISHOP_ML);
L(B_KING_CB, W_KNIGHT_CB, CAPTURES_KING_KNIGHT_ML); L(B_KING_CB, W_PAWN_CB, CAPTURES_KING_PAWN_ML);

// Ферзи
L(W_QUEEN_CB, PIECE_NO_CB, MOVE_QUEEN_ML);
L(W_QUEEN_CB, B_QUEEN_CB, CAPTURES_QUEEN_QUEEN_ML);
L(W_QUEEN_CB, B_ROOK_CB, CAPTURES_QUEEN_ROOK_ML); L(W_QUEEN_CB, B_BISHOP_CB, CAPTURES_QUEEN_BISHOP_ML);
L(W_QUEEN_CB, B_KNIGHT_CB, CAPTURES_QUEEN_KNIGHT_ML); L(W_QUEEN_CB, B_PAWN_CB, CAPTURES_QUEEN_PAWN_ML);

L(B_QUEEN_CB, PIECE_NO_CB, MOVE_QUEEN_ML);
L(B_QUEEN_CB, W_QUEEN_CB, CAPTURES_QUEEN_QUEEN_ML);
L(B_QUEEN_CB, W_ROOK_CB, CAPTURES_QUEEN_ROOK_ML); L(B_QUEEN_CB, W_BISHOP_CB, CAPTURES_QUEEN_BISHOP_ML);
L(B_QUEEN_CB, W_KNIGHT_CB, CAPTURES_QUEEN_KNIGHT_ML); L(B_QUEEN_CB, W_PAWN_CB, CAPTURES_QUEEN_PAWN_ML);

// Ладьи
L(W_ROOK_CB, PIECE_NO_CB, MOVE_ROOK_ML);
L(W_ROOK_CB, B_QUEEN_CB, CAPTURES_ROOK_QUEEN_ML);
L(W_ROOK_CB, B_ROOK_CB, CAPTURES_ROOK_ROOK_ML); L(W_ROOK_CB, B_BISHOP_CB, CAPTURES_ROOK_BISHOP_ML);
L(W_ROOK_CB, B_KNIGHT_CB, CAPTURES_ROOK_KNIGHT_ML); L(W_ROOK_CB, B_PAWN_CB, CAPTURES_ROOK_PAWN_ML);

L(B_ROOK_CB, PIECE_NO_CB, MOVE_ROOK_ML);
L(B_ROOK_CB, W_QUEEN_CB, CAPTURES_ROOK_QUEEN_ML);
L(B_ROOK_CB, W_ROOK_CB, CAPTURES_ROOK_ROOK_ML); L(B_ROOK_CB, W_BISHOP_CB, CAPTURES_ROOK_BISHOP_ML);
L(B_ROOK_CB, W_KNIGHT_CB, CAPTURES_ROOK_KNIGHT_ML); L(B_ROOK_CB, W_PAWN_CB, CAPTURES_ROOK_PAWN_ML);

// Слоны
L(W_BISHOP_CB, PIECE_NO_CB, MOVE_BISHOP_ML);
L(W_BISHOP_CB, B_QUEEN_CB, CAPTURES_BISHOP_QUEEN_ML);
L(W_BISHOP_CB, B_ROOK_CB, CAPTURES_BISHOP_ROOK_ML); L(W_BISHOP_CB, B_BISHOP_CB, CAPTURES_BISHOP_BISHOP_ML);
L(W_BISHOP_CB, B_KNIGHT_CB, CAPTURES_BISHOP_KNIGHT_ML); L(W_BISHOP_CB, B_PAWN_CB, CAPTURES_BISHOP_PAWN_ML);

L(B_BISHOP_CB, PIECE_NO_CB, MOVE_BISHOP_ML);
L(B_BISHOP_CB, W_QUEEN_CB, CAPTURES_BISHOP_QUEEN_ML);
L(B_BISHOP_CB, W_ROOK_CB, CAPTURES_BISHOP_ROOK_ML); L(B_BISHOP_CB, W_BISHOP_CB, CAPTURES_BISHOP_BISHOP_ML);
L(B_BISHOP_CB, W_KNIGHT_CB, CAPTURES_BISHOP_KNIGHT_ML); L(B_BISHOP_CB, W_PAWN_CB, CAPTURES_BISHOP_PAWN_ML);

// Кони
L(W_KNIGHT_CB, PIECE_NO_CB, MOVE_KNIGHT_ML);
L(W_KNIGHT_CB, B_QUEEN_CB, CAPTURES_KNIGHT_QUEEN_ML);
L(W_KNIGHT_CB, B_ROOK_CB, CAPTURES_KNIGHT_ROOK_ML); L(W_KNIGHT_CB, B_BISHOP_CB, CAPTURES_KNIGHT_BISHOP_ML);
L(W_KNIGHT_CB, B_KNIGHT_CB, CAPTURES_KNIGHT_KNIGHT_ML); L(W_KNIGHT_CB, B_PAWN_CB, CAPTURES_KNIGHT_PAWN_ML);

L(B_KNIGHT_CB, PIECE_NO_CB, MOVE_KNIGHT_ML);
L(B_KNIGHT_CB, W_QUEEN_CB, CAPTURES_KNIGHT_QUEEN_ML);
L(B_KNIGHT_CB, W_ROOK_CB, CAPTURES_KNIGHT_ROOK_ML); L(B_KNIGHT_CB, W_BISHOP_CB, CAPTURES_KNIGHT_BISHOP_ML);
L(B_KNIGHT_CB, W_KNIGHT_CB, CAPTURES_KNIGHT_KNIGHT_ML); L(B_KNIGHT_CB, W_PAWN_CB, CAPTURES_KNIGHT_PAWN_ML);

// Пешки
// Qwen3.7-Max AI:
//"Ваш SIMPLE_MOVE_LUT для пешки, бьющей на пустую клетку (W_PAWN_CB, PIECE_NO_CB), вернет MOVE_PAWN_ML (обычный ход).
// Но при взятии на проходе целевая клетка пуста, а тип хода должен быть EP_CAPTURES_ML!"

//Я: Замечание правильное. Обрабатываю этот случай в реализаторе ходов. 
L(W_PAWN_CB, PIECE_NO_CB, MOVE_PAWN_ML);
L(W_PAWN_CB, B_QUEEN_CB, CAPTURES_PAWN_QUEEN_ML);
L(W_PAWN_CB, B_ROOK_CB, CAPTURES_PAWN_ROOK_ML); L(W_PAWN_CB, B_BISHOP_CB, CAPTURES_PAWN_BISHOP_ML);
L(W_PAWN_CB, B_KNIGHT_CB, CAPTURES_PAWN_KNIGHT_ML); L(W_PAWN_CB, B_PAWN_CB, CAPTURES_PAWN_PAWN_ML);

L(B_PAWN_CB, PIECE_NO_CB, MOVE_PAWN_ML);
L(B_PAWN_CB, W_QUEEN_CB, CAPTURES_PAWN_QUEEN_ML);
L(B_PAWN_CB, W_ROOK_CB, CAPTURES_PAWN_ROOK_ML); L(B_PAWN_CB, W_BISHOP_CB, CAPTURES_PAWN_BISHOP_ML);
L(B_PAWN_CB, W_KNIGHT_CB, CAPTURES_PAWN_KNIGHT_ML); L(B_PAWN_CB, W_PAWN_CB, CAPTURES_PAWN_PAWN_ML);

//--------------------------------------------------------------
// код от Qwen3.7-Max AI
// используем в функции return_type_captures_pawn_promo_ml

/** @type {Array<Int32Array>} */
const PROMO_CAPTURES_LUT = [];

// Вспомогательная функция для создания массива превращений
// код от Qwen3.7-Max AI
/**
* @param {number} q
* @param {number} r
* @param {number} b
* @param {number} n
*/
const create_promo_array = (q, r, b, n) => {
    const arr = new Int32Array(4);
    arr[IND_PROMO_QUEEN_ML] = q;
    arr[IND_PROMO_ROOK_ML] = r;
    arr[IND_PROMO_BISHOP_ML] = b;
    arr[IND_PROMO_KNIGHT_ML] = n;
    return arr;
};

// Заполняем LUT для всех возможных взятых фигур
// Ферзи
PROMO_CAPTURES_LUT[W_QUEEN_CB] = create_promo_array(
    CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML,
    CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML,
    CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML
);
PROMO_CAPTURES_LUT[B_QUEEN_CB] = PROMO_CAPTURES_LUT[W_QUEEN_CB]; // Те же константы

// Ладьи
PROMO_CAPTURES_LUT[W_ROOK_CB] = create_promo_array(
    CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML,
    CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML,
    CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML
);
PROMO_CAPTURES_LUT[B_ROOK_CB] = PROMO_CAPTURES_LUT[W_ROOK_CB];

// Слоны
PROMO_CAPTURES_LUT[W_BISHOP_CB] = create_promo_array(
    CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML,
    CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML,
    CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML
);
PROMO_CAPTURES_LUT[B_BISHOP_CB] = PROMO_CAPTURES_LUT[W_BISHOP_CB];

// Кони
PROMO_CAPTURES_LUT[W_KNIGHT_CB] = create_promo_array(
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML
);
PROMO_CAPTURES_LUT[B_KNIGHT_CB] = PROMO_CAPTURES_LUT[W_KNIGHT_CB];

// Добавь в конец инициализации PROMO_CAPTURES_LUT2:
const DEFAULT_PROMO_ARRAY = create_promo_array(
    MOVE_PAWN_PROMO_QUEEN_ML,
    MOVE_PAWN_PROMO_ROOK_ML,
    MOVE_PAWN_PROMO_BISHOP_ML,
    MOVE_PAWN_PROMO_KNIGHT_ML
);

//--------------------------------------------------------------
// код от Qwen3.7-Max AI
// используем в функции return_promo_piece_from_type_move_ml
// Создаём массив строк для всех типов ходов
const PROMO_PIECE_LUT = new Array(61).fill("");

// Заполняем только для ходов с превращением
PROMO_PIECE_LUT[MOVE_PAWN_PROMO_QUEEN_ML] = "q";
PROMO_PIECE_LUT[MOVE_PAWN_PROMO_ROOK_ML] = "r";
PROMO_PIECE_LUT[MOVE_PAWN_PROMO_BISHOP_ML] = "b";
PROMO_PIECE_LUT[MOVE_PAWN_PROMO_KNIGHT_ML] = "n";

PROMO_PIECE_LUT[CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML] = "q";
PROMO_PIECE_LUT[CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML] = "r";
PROMO_PIECE_LUT[CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML] = "b";
PROMO_PIECE_LUT[CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML] = "n";

PROMO_PIECE_LUT[CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML] = "q";
PROMO_PIECE_LUT[CAPTURES_PAWN_ROOK_PROMO_ROOK_ML] = "r";
PROMO_PIECE_LUT[CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML] = "b";
PROMO_PIECE_LUT[CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML] = "n";

PROMO_PIECE_LUT[CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML] = "q";
PROMO_PIECE_LUT[CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML] = "r";
PROMO_PIECE_LUT[CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML] = "b";
PROMO_PIECE_LUT[CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML] = "n";

PROMO_PIECE_LUT[CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML] = "q";
PROMO_PIECE_LUT[CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML] = "r";
PROMO_PIECE_LUT[CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML] = "b";
PROMO_PIECE_LUT[CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML] = "n";
//--------------------------------------------------------------

/**
* не тестирую
* 
* очищаем список ходов
* @param {Int32Array} packing_moves
* @returns {void}
*/
const clear_list_ml = (packing_moves) => {
    packing_moves[IND_NUMBER_MOVE_ML] = 0;
    packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = 0;
    packing_moves[IND_PIECE_COLOR_ML] = 0;
};

/**
* 
* 
* добавляем ход в список
* количество ходов увеличиваем на один
* @param {Int32Array} packing_moves
* @param {number} type_move
* @param {number} from
* @param {number} to
* @param {number} name_capture_piece
* @returns {number}
*/
const add_packing_move_ml = (packing_moves, type_move, from, to, name_capture_piece) => {
    //console.log('add_move->');

    //if (name_capture_piece == -1) console.log('WARNING!!! add_packing_move_ml->name_capture_piece = ' + name_capture_piece);

    const move = (name_capture_piece << 24) | (to << 16) | (from << 8) | type_move;

    let i = packing_moves[IND_NUMBER_MOVE_ML]; // количество уже записанных ходов. используем как индекс для нового хода

    packing_moves[i] = move; // сохраняем ход

    // if (name_capture_piece != 0) {
    //     packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] + 1; // увеличиваем количество взятий
    // }

    packing_moves[IND_NUMBER_MOVE_ML] = i + 1; // увеличиваем количество ходов

    return packing_moves[IND_NUMBER_MOVE_ML];
};

/**
 * тестирую совместно с add_packing_move_ml 
 * 
 * присвоить списку цвет фигуры он же цвет ходящей стороны
 * @param {Int32Array} packing_moves
 * @param {number} piece_color
 * @returns {void}
 */
const set_color_ml = (packing_moves, piece_color) => {
    packing_moves[IND_PIECE_COLOR_ML] = piece_color;
}

/**
 * тестирую совместно с add_packing_move_ml 
 * 
 * присвоить количество взятий в списке
 * @param {Int32Array} packing_moves
 * @param {number} number_captures_move
 * @returns {void}
 */
const set_number_captures_move_ml = (packing_moves, number_captures_move) => {
    packing_moves[IND_NUMBER_CAPTURES_MOVE_ML] = number_captures_move;
}


/**
 * тестирую совместно с add_packing_move_ml
 * 
 * @param {number} i
 * @param {Int32Array} packing_moves
 * @returns {number}
 */
const get_type_move_ml = (i, packing_moves) => packing_moves[i] & 0xFF;//0xFF =255 это 8 бит ->  11111111

/**
 * тестирую совместно с add_packing_move_ml
 * 
 * @param {number} i
 * @param {Int32Array} packing_moves
 * @returns {number}
 */
const get_from_ml = (i, packing_moves) => (packing_moves[i] >> 8) & 0xFF;

/**
 * тестирую совместно с add_packing_move_ml 
 * 
 * @param {number} i
 * @param {Int32Array} packing_moves
 * @returns {number}
 */
const get_to_ml = (i, packing_moves) => (packing_moves[i] >> 16) & 0xFF;

/**
 * тестирую совместно с add_packing_move_ml 
 * 
 * @param {number} i
 * @param {Int32Array} packing_moves
 * @returns {number}
 */
const get_name_capture_piece_ml = (i, packing_moves) => (packing_moves[i] >>> 24) & 0xFF;

// SORTING
/////////////////////////////////////////////////////////////////////////

// сортировка по типу хода. 
// взятия с превращением самые первые 
// дальше просто превращения
// дальше хорошие взятия (т.е.взятая фигура дороже чем та, что берет)
// дальше нейтральные взятия (т.е.взятая фигура равнозначна той, что берет)
// дальше плохие взятия (т.е.взятая фигура дешевле чем та, что берет)
// дальше взятия королем
// дальше взятия пешек   
// дальше простые ходы фигур 
// дальше простые ходы пешек
// и самые последние рокировки 
// взятия раньше других ходов для удобства поиска и сортировки тихих ходов

//В шахматных движках для сортировки ходов используют 
//Insertion Sort (Сортировка вставками) или просто встроенный 
//Array.prototype.sort(), который в V8 оптимизирован (Timsort).
/* 
Каждый ход упакован в одно 32-битное число по такой схеме: 
Биты:  31........24  23.......16  15.......8   7.......0
       ┌──────────┐  ┌─────────┐  ┌────────┐  ┌────────┐
       │ capture  │  │   to    │  │  from  │  │  type  │
       │  (8 бит) │  │ (8 бит) │  │ (8 бит)│  │ (8 бит)│
       └──────────┘  └─────────┘  └────────┘  └────────┘
type_move занимает младшие 8 бит (биты 0-7). Именно по нему мы хотим сортировать, 
потому что в type_move уже зашита эвристика MVV/LVA:
1-20 — взятия с превращением (самый высокий приоритет)
21-51 — обычные взятия
52-60 — тихие ходы

arr.subarray это НЕ копирование данных! Это создание представления (view) на часть исходного Int32Array
const arr = new Int32Array([10, 20, 30, 40, 50, 99, 99]);
const view = arr.subarray(0, 3);  // [10, 20, 30]

view[0] = 100;  // Меняем через view
console.log(arr[0]);  // 100 — оригинал тоже изменился!

0xFF в двоичном виде — это 00000000 00000000 00000000 11111111 (255 в десятичной).
Операция битовое И (&) с маской 0xFF обнуляет все биты, кроме младших 8. 
То есть из 32-битного упакованного хода мы "вытаскиваем" только type_move.

Мы получили type_move = 21 за одну CPU-инструкцию вместо вызова функции get_type_move_ml()

Компаратор (a & 0xFF) - (b & 0xFF)
Это стандартный трюк для сортировки по возрастанию:
Если результат < 0 → a ставится перед b
Если результат = 0 → порядок не меняется
Если результат > 0 → b ставится перед a
*/
/**
 * сортировка по типу хода
 * чем меньше число, тем выше приоритет хода
 * исправленная Qwen3.7-Max AI версия
 * @param {Int32Array} packing_moves
 * @returns {void}
 */
const sorting_list_ml = function (packing_moves) {
    const number_move = packing_moves[IND_NUMBER_MOVE_ML];
    // Встроенная сортировка V8 работает на Int32Array очень быстро
    // Мы сортируем только занятую часть массива
    const subArray = packing_moves.subarray(0, number_move);
    subArray.sort((a, b) => (a & 0xFF) - (b & 0xFF));
}

// это для киллеров. 
// находм ход по from, to
// и ставим сразу после взятий. 
/**
 * это для киллеров
 * @param {Int32Array} packing_moves
 * @param {Int32Array} packing_moves_k
 * @param {number} depth
 * @returns {number}
 */
const set_move_after_the_captures_ml = function (packing_moves, packing_moves_k, depth) {

    let save_move = -1;
    let s_m;// индекс найденного хода киллера

    let number_move = packing_moves[IND_NUMBER_MOVE_ML];// количество ходов
    let start = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML];// тут первый ход после взятий(вообще это количество взятий нач с 0)
    let move_k = packing_moves_k[depth];// ход киллер

    if (packing_moves[start] == move_k) return -1;// ход и так на первом месте(после всех взятий)

    //console.log("Move_list_0x88_С-> UP -----------------------------------");
    // 1 ищем ход в списке
    for (s_m = start; s_m < number_move; s_m++) {// 
        if (packing_moves[s_m] == move_k) {
            // ход нашли и записали
            save_move = packing_moves[s_m];
            break;
        }
    }
    // console.log("Move_list_0x88_С-> UP 2 start " + start);
    //console.log("Move_list_0x88_С-> UP 2 s_m " + s_m);

    // ход не нашли
    if (save_move == -1) return -1;

    // вот мы нашли ход на каком то индексе s_m и записали его
    // теперь надо все позиции сдвинуть вниз до стартовой. start
    // первым мы перезаписываем ячейку s_m значением из s_m-1

    // 2 сдвигаем позиции выше найденной вниз
    // for (let i = s_m; i > start; i--) {
    //     // если на позиции есть взятая фигура
    //     // пишем на позицию
    //     packing_moves[i] = packing_moves[i - 1];
    // }

    // array.copyWithin(target, start, end)
    // Сдвигает элементы [start, s_m) на позицию start + 1
    packing_moves.copyWithin(start + 1, start, s_m);

    // сюда пишем начальную позицию. т.о. две позиции меняются местами
    packing_moves[start] = save_move;

    return 0;
}//

/**
 * Сортировка тихих ходов по эвристике истории.
 * Оптимизированная версия: Insertion Sort + плоский массив + кэширование.
 * 
 * @param {Int32Array} packing_moves
 * @param {Int32Array} history - плоский массив [2 * 64 * 64]
 * @returns {void}
 */
const sorting_list_history_heuristic_ml = function (packing_moves, history) {
    const number_move = packing_moves[IND_NUMBER_MOVE_ML];
    const start = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML];
    const count = number_move - start;

    if (count < 2) return; // Нечего сортировать

    // Кэшируем смещение цвета (color * 4096)
    const color_shift = packing_moves[IND_PIECE_COLOR_ML] << 12;

    // Insertion Sort — идеален для малых массивов
    for (let i = start + 1; i < number_move; i++) {
        const move_i = packing_moves[i];

        // Быстрый доступ к плоскому массиву: color*4096 + from*64 + to
        const hist_i = history[color_shift |
            (SQUARE_128_to_64_CB[(move_i >> 8) & 255] << 6) |
            SQUARE_128_to_64_CB[(move_i >> 16) & 255]];

        let j = i - 1;

        while (j >= start) {
            const move_j = packing_moves[j];
            const hist_j = history[color_shift |
                (SQUARE_128_to_64_CB[(move_j >> 8) & 255] << 6) |
                SQUARE_128_to_64_CB[(move_j >> 16) & 255]];

            if (hist_j > hist_i) {
                packing_moves[j + 1] = move_j;
                j--;
            } else {
                break;
            }
        }
        packing_moves[j + 1] = move_i;
    }
}


// const sorting_list_history_heuristic_ml = function (packing_moves, history) {
//     let piece_color = packing_moves[IND_PIECE_COLOR_ML];
//     let number_move = packing_moves[IND_NUMBER_MOVE_ML];
//     let start = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML];

//     // Insertion Sort (намного быстрее на малых массивах)
//     for (let i = start + 1; i < number_move; i++) {
//         let move_i = packing_moves[i];
//         let from_128 = (move_i >> 8) & 255;
//         let to_128 = (move_i >> 16) & 255;
//         let hist_i = history[piece_color][SQUARE_128_to_64_CB[from_128]][SQUARE_128_to_64_CB[to_128]];

//         let j = i - 1;
//         while (j >= start) {
//             let move_j = packing_moves[j];
//             let hist_j = history[piece_color][SQUARE_128_to_64_CB[(move_j >> 8) & 255]][SQUARE_128_to_64_CB[(move_j >> 16) & 255]];

//             if (hist_j < hist_i) {
//                 packing_moves[j + 1] = move_j;
//                 j--;
//             } else {
//                 break;
//             }
//         }
//         packing_moves[j + 1] = move_i;
//     }
// }

// /**
// * это для сортировки по истории
// * сортируем все не взятия по оценке присвоенной в массиве истории.
// * чем больше оценка тем выше ход но не выше всех взятий, даже плохих
// * потому что так быстрее и движуху смотрим в первую очередь.
// * что такое эвристика истории смотреть в файле с этой эвристикой.
// * исправленная Qwen3.7-Max AI версия
// * @param {Int32Array} packing_moves
// * @param {Int32Array[][]} history
// * @returns {void}
// */
// const sorting_list_history_heuristic_ml = function (packing_moves, history) {
//     let piece_color = packing_moves[IND_PIECE_COLOR_ML];
//     let number_move = packing_moves[IND_NUMBER_MOVE_ML];
//     let start = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML];

//     // выводим в начало списка тихих ходов ходы с максимальной оценкой по истории.
//     // т.е. отсортированные тихие ходы идут после взятий
//     for (let i = start; i < number_move; i++) {
//         // Инлайним распаковку вместо вызовов функций
//         let move_i = packing_moves[i];
//         let from_128_i = (move_i >> 8) & 255;
//         let to_128_i = (move_i >> 16) & 255;

//         let from_64_i = SQUARE_128_to_64_CB[from_128_i];
//         let to_64_i = SQUARE_128_to_64_CB[to_128_i];

//         // Кэшируем значение истории для текущего элемента
//         let hist_i = history[piece_color][from_64_i][to_64_i];

//         // Ищем глобальный максимум в оставшейся части массива
//         let max_idx = i;
//         let max_hist = hist_i;

//         for (let j = i + 1; j < number_move; j++) {
//             // Инлайним распаковку
//             let move_j = packing_moves[j];
//             let from_128_j = (move_j >> 8) & 255;
//             let to_128_j = (move_j >> 16) & 255;

//             let from_64_j = SQUARE_128_to_64_CB[from_128_j];
//             let to_64_j = SQUARE_128_to_64_CB[to_128_j];

//             let hist_j = history[piece_color][from_64_j][to_64_j];

//             // Ищем ГЛОБАЛЬНЫЙ максимум, а не просто "лучше чем i"
//             if (hist_j > max_hist) {
//                 max_hist = hist_j;
//                 max_idx = j;
//             }
//         }

//         // Делаем swap только один раз за проход, если нашли элемент лучше
//         if (max_idx !== i) {
//             let temp = packing_moves[i];
//             packing_moves[i] = packing_moves[max_idx];
//             packing_moves[max_idx] = temp;
//         }
//     }
// }

/**
 * это вставки хода из кеш таблицы на первое место
 * @param {Int32Array} packing_moves
 * @param {Int32Array} packing_moves_1_tt
 * @returns {number}
 */

const set_move_in_0_ml = function (packing_moves, packing_moves_1_tt) {

    let save_move = -1;
    let s_m;

    let number_move = packing_moves[IND_NUMBER_MOVE_ML];
    let start = 0;
    let move_tt = packing_moves_1_tt[0];

    if (packing_moves[start] == move_tt) return -1;// ход и так на первом месте(после всех взятий)

    //console.log("Move_list_0x88_С-> UP -----------------------------------");
    // 1 ищем ход в списке
    for (s_m = start; s_m < number_move; s_m++) {// 
        if (packing_moves[s_m] == move_tt) {
            // ход нашли и записали
            save_move = packing_moves[s_m];
            break;
        }
    }
    // console.log("Move_list_0x88_С-> UP 2 start " + start);
    //console.log("Move_list_0x88_С-> UP 2 s_m " + s_m);

    // ход не нашли
    if (save_move == -1) return -1;

    // // 2 сдвигаем позиции выше найденной вниз
    // for (let i = s_m; i > start; i--) {
    //     // если на позиции есть взятая фигура
    //     // пишем на позицию
    //     packing_moves[i] = packing_moves[i - 1];
    // }

    // array.copyWithin(target, start, end)
    // Сдвигает элементы [start, s_m) на позицию start + 1
    packing_moves.copyWithin(start + 1, start, s_m);


    // сюда пишем начальную позицию. т.о. две позиции меняются местами
    packing_moves[start] = save_move;

    return 0;
}//

/////////////////////////////////////////////////////////////////////////
// SORTING


/**
 * копируем в наш список список из параметров функции
 * т.е. тот что задан в скобках тот и копируем
* @param {Int32Array} packing_moves_to
* @param {Int32Array} packing_moves_from
* @returns {void}
*/
const save_list_from_ml = (packing_moves_to, packing_moves_from) => {
    packing_moves_to.set(packing_moves_from);
}


/**
 * если ход from, to 
 * нашли в списке ходов
 * в случае превращений это первое попавшееся
* @param {Int32Array} packing_moves
* @param {number} from
* @param {number} to
* @returns {boolean}
*/
const move_is_found_ml = function (packing_moves, from, to) {

    let found = false;

    let from_i;
    let to_i;
    let number_move = packing_moves[IND_NUMBER_MOVE_ML];


    for (let i = 0; i < number_move; i++) {

        from_i = get_from_ml(i, packing_moves);
        to_i = get_to_ml(i, packing_moves);

        if ((from_i === from) && (to_i === to)) {
            found = true;
            return found;
        }
    }

    return found;
}

/**
* находим и возвращаем порядковый номер хода
* по ходу from, to, promo
* в том числе и в случае превращений
* @param {Int32Array} packing_moves
* @param {number} from
* @param {number} to
* @returns {number}
*/
const return_i_move_ml = function (packing_moves, from, to, promo = "") {

    let i_move = -1;

    let type_move_i;
    let from_i;
    let to_i;
    let number_move = packing_moves[IND_NUMBER_MOVE_ML];

    for (let i = 0; i < number_move; i++) {

        from_i = get_from_ml(i, packing_moves);
        to_i = get_to_ml(i, packing_moves);


        if ((from_i === from) && (to_i === to)) {
            if (promo == "") {
                i_move = i;
                return i_move;
            } else {

                type_move_i = get_type_move_ml(i, packing_moves);

                if (promo === return_promo_piece_from_type_move_ml(type_move_i)) {
                    i_move = i;
                    return i_move;
                }
                continue;
            }
        }
    }

    return i_move;
}

/**
* возвращем ход из списка на заданной позиции
* в виде строки вида e2e4, e7e8q
* @param {number} i
* @param {Int32Array} packing_moves
* @returns {string}
*/
const move_to_string_uci_ml = function (i, packing_moves) {

    let type_move_i = get_type_move_ml(i, packing_moves);

    let promo = return_promo_piece_from_type_move_ml(type_move_i);
    let from_i = get_from_ml(i, packing_moves);
    let to_i = get_to_ml(i, packing_moves);


    let move_str = "" +
        LET_COOR_CB[s_0x88_to_x07_cb(from_i)] +
        (8 - s_0x88_to_y07_cb(from_i)) +
        LET_COOR_CB[s_0x88_to_x07_cb(to_i)] +
        (8 - s_0x88_to_y07_cb(to_i)) + promo;

    return move_str;
}


// код от Qwen3.7-Max AI
/**
это нужно для работы генератора взятий. это очень важная функция и конечно полностью проверена
возвращаем название хода превращения пешки со взятием по взятой фигуре
т.е. пешка берет коня KNIGHT тогда будет множестов превращений со взятием коня,
это
PROMO_QUEEN = CAPTURES_PAWN_KNIGHT_PROMO_QUEEN;
PROMO_ROOK = CAPTURES_PAWN_KNIGHT_PROMO_ROOK;
PROMO_BISHOP = CAPTURES_PAWN_KNIGHT_PROMO_BISHOP;
PROMO_KNIGHT = CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT;

ВАЖНО: Возвращает ссылку на существующий массив, НЕ создаёт новый!
@param {number} piece_name_captures
@returns {Int32Array}
*/
const return_type_captures_pawn_promo_ml = (piece_name_captures) =>
    PROMO_CAPTURES_LUT[piece_name_captures] || DEFAULT_PROMO_ARRAY;

// это нужно для работы генератора взятий. это очень важная функция и конечно полностью проверена
// возвращаем название хода превращения пешки со взятием по взятой фигуре 
// т.е. пешка берет коня KNIGHT тогда будет множестов превращений со взятием коня, 
// это 
// PROMO_QUEEN = CAPTURES_PAWN_KNIGHT_PROMO_QUEEN;
// PROMO_ROOK = CAPTURES_PAWN_KNIGHT_PROMO_ROOK;
// PROMO_BISHOP = CAPTURES_PAWN_KNIGHT_PROMO_BISHOP;
// PROMO_KNIGHT = CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT;
// 
// /**
// * @param {number} piece_name_captures
// * @returns {out}
// */
// //+
// const return_type_captures_pawn_promo_ml = function (piece_name_captures) {

//     let out = [0, 0, 0, 0];

//     if ((piece_name_captures == W_QUEEN_CB) || (piece_name_captures == B_QUEEN_CB)) {
//         out[IND_PROMO_QUEEN_ML] = CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML;
//         out[IND_PROMO_ROOK_ML] = CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML;
//         out[IND_PROMO_BISHOP_ML] = CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML;
//         out[IND_PROMO_KNIGHT_ML] = CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML;
//     };

//     if ((piece_name_captures == W_ROOK_CB) || (piece_name_captures == B_ROOK_CB)) {
//         out[IND_PROMO_QUEEN_ML] = CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML;
//         out[IND_PROMO_ROOK_ML] = CAPTURES_PAWN_ROOK_PROMO_ROOK_ML;
//         out[IND_PROMO_BISHOP_ML] = CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML;
//         out[IND_PROMO_KNIGHT_ML] = CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML;
//     };

//     if ((piece_name_captures == W_BISHOP_CB) || (piece_name_captures == B_BISHOP_CB)) {
//         out[IND_PROMO_QUEEN_ML] = CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML;
//         out[IND_PROMO_ROOK_ML] = CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML;
//         out[IND_PROMO_BISHOP_ML] = CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML;
//         out[IND_PROMO_KNIGHT_ML] = CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML;
//     };

//     if ((piece_name_captures == W_KNIGHT_CB) || (piece_name_captures == B_KNIGHT_CB)) {
//         out[IND_PROMO_QUEEN_ML] = CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML;
//         out[IND_PROMO_ROOK_ML] = CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML;
//         out[IND_PROMO_BISHOP_ML] = CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML;
//         out[IND_PROMO_KNIGHT_ML] = CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML;
//     };

//     return out;
// }

// очень важная функция. используется в генераторе взятий и тихих ходов.
// возвращем тип хода взятия по ходящей фигуре и по взятой фигуре
// например KING, QUEEN -> CAPTURES_KING_QUEEN
// код от Qwen3.7-Max AI
/**
* @param {number} piece_name
* @param {number} piece_name_captures
* @returns {number}
*/
//+
// Qwen3.7-Max AI: "Взятие на проходе (En Passant) не работает через LUT
// Ваш SIMPLE_MOVE_LUT для пешки, бьющей на пустую клетку (W_PAWN_CB, PIECE_NO_CB), вернет MOVE_PAWN_ML (обычный ход)."
// Я: это понятно и в реализаторе ходов это учтено. Получается, что простой ход пешкой может быть взятием на проходе.
const return_type_simple_move_ml = (piece_name, piece_name_captures) =>
    SIMPLE_MOVE_LUT[piece_name * PIECE_LUT_SIZE + piece_name_captures];


// используем для строкового представления фигуры в ходах
/**
* @param {number} type_move
* @returns {string}
*/
//+
const type_move_to_name_piece_ml = function (type_move) {
    if (type_move == MOVE_NO_ML) return "NO";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML) return "P";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_ROOK_ML) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML) return "P";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML) return "P";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML) return "P";
    if (type_move == MOVE_PAWN_PROMO_QUEEN_ML) return "P";
    if (type_move == MOVE_PAWN_PROMO_ROOK_ML) return "P";
    if (type_move == MOVE_PAWN_PROMO_BISHOP_ML) return "P";
    if (type_move == MOVE_PAWN_PROMO_KNIGHT_ML) return "P";
    if (type_move == CAPTURES_PAWN_QUEEN_ML) return "P";
    if (type_move == CAPTURES_PAWN_ROOK_ML) return "P";
    if (type_move == CAPTURES_PAWN_BISHOP_ML) return "P";
    if (type_move == CAPTURES_PAWN_KNIGHT_ML) return "P";
    if (type_move == CAPTURES_KNIGHT_QUEEN_ML) return "N";
    if (type_move == CAPTURES_KNIGHT_ROOK_ML) return "N";
    if (type_move == CAPTURES_BISHOP_QUEEN_ML) return "B";
    if (type_move == CAPTURES_BISHOP_ROOK_ML) return "B";
    if (type_move == CAPTURES_ROOK_QUEEN_ML) return "R";
    if (type_move == CAPTURES_KNIGHT_BISHOP_ML) return "N";
    if (type_move == CAPTURES_KNIGHT_KNIGHT_ML) return "N";
    if (type_move == CAPTURES_BISHOP_BISHOP_ML) return "B";
    if (type_move == CAPTURES_BISHOP_KNIGHT_ML) return "B";
    if (type_move == CAPTURES_ROOK_ROOK_ML) return "R";
    if (type_move == CAPTURES_QUEEN_QUEEN_ML) return "Q";
    if (type_move == CAPTURES_ROOK_BISHOP_ML) return "R";
    if (type_move == CAPTURES_ROOK_KNIGHT_ML) return "R";
    if (type_move == CAPTURES_QUEEN_ROOK_ML) return "Q";
    if (type_move == CAPTURES_QUEEN_BISHOP_ML) return "Q";
    if (type_move == CAPTURES_QUEEN_KNIGHT_ML) return "Q";
    if (type_move == CAPTURES_KING_QUEEN_ML) return "K";
    if (type_move == CAPTURES_KING_ROOK_ML) return "K";
    if (type_move == CAPTURES_KING_BISHOP_ML) return "K";
    if (type_move == CAPTURES_KING_KNIGHT_ML) return "K";
    if (type_move == CAPTURES_PAWN_PAWN_ML) return "P";
    if (type_move == EP_CAPTURES_ML) return "P";
    if (type_move == CAPTURES_KNIGHT_PAWN_ML) return "N";
    if (type_move == CAPTURES_BISHOP_PAWN_ML) return "B";
    if (type_move == CAPTURES_ROOK_PAWN_ML) return "R";
    if (type_move == CAPTURES_QUEEN_PAWN_ML) return "Q";
    if (type_move == CAPTURES_KING_PAWN_ML) return "K";
    if (type_move == MOVE_QUEEN_ML) return "Q";
    if (type_move == MOVE_ROOK_ML) return "R";
    if (type_move == MOVE_BISHOP_ML) return "B";
    if (type_move == MOVE_KNIGHT_ML) return "N";
    if (type_move == MOVE_KING_ML) return "K";
    if (type_move == MOVE_PAWN_ML) return "P";
    if (type_move == MOVE_DOUBLE_PAWN_ML) return "P";
    if (type_move == MOVE_KING_CASTLE_ML) return "K";
    if (type_move == MOVE_KING_QUEEN_CASTLE_ML) return "K";
    return "";
}

/**
* @param {number} type_move
* @returns {string}
*/
//+
const type_move_to_name_piece_f_ml = function (type_move) {
    if (type_move == MOVE_NO_ML) return "NO";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_ROOK_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML) return "PAWN";
    if (type_move == MOVE_PAWN_PROMO_QUEEN_ML) return "PAWN";
    if (type_move == MOVE_PAWN_PROMO_ROOK_ML) return "PAWN";
    if (type_move == MOVE_PAWN_PROMO_BISHOP_ML) return "PAWN";
    if (type_move == MOVE_PAWN_PROMO_KNIGHT_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_QUEEN_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_ROOK_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_BISHOP_ML) return "PAWN";
    if (type_move == CAPTURES_PAWN_KNIGHT_ML) return "PAWN";
    if (type_move == CAPTURES_KNIGHT_QUEEN_ML) return "KNIGHT";
    if (type_move == CAPTURES_KNIGHT_ROOK_ML) return "KNIGHT";
    if (type_move == CAPTURES_BISHOP_QUEEN_ML) return "BISHOP";
    if (type_move == CAPTURES_BISHOP_ROOK_ML) return "BISHOP";
    if (type_move == CAPTURES_ROOK_QUEEN_ML) return "ROOK";
    if (type_move == CAPTURES_KNIGHT_BISHOP_ML) return "KNIGHT";
    if (type_move == CAPTURES_KNIGHT_KNIGHT_ML) return "KNIGHT";
    if (type_move == CAPTURES_BISHOP_BISHOP_ML) return "BISHOP";
    if (type_move == CAPTURES_BISHOP_KNIGHT_ML) return "BISHOP";
    if (type_move == CAPTURES_ROOK_ROOK_ML) return "ROOK";
    if (type_move == CAPTURES_QUEEN_QUEEN_ML) return "QUEEN";
    if (type_move == CAPTURES_ROOK_BISHOP_ML) return "ROOK";
    if (type_move == CAPTURES_ROOK_KNIGHT_ML) return "ROOK";
    if (type_move == CAPTURES_QUEEN_ROOK_ML) return "QUEEN";
    if (type_move == CAPTURES_QUEEN_BISHOP_ML) return "QUEEN";
    if (type_move == CAPTURES_QUEEN_KNIGHT_ML) return "QUEEN";
    if (type_move == CAPTURES_KING_QUEEN_ML) return "KING";
    if (type_move == CAPTURES_KING_ROOK_ML) return "KING";
    if (type_move == CAPTURES_KING_BISHOP_ML) return "KING";
    if (type_move == CAPTURES_KING_KNIGHT_ML) return "KING";
    if (type_move == CAPTURES_PAWN_PAWN_ML) return "PAWN";
    if (type_move == EP_CAPTURES_ML) return "PAWN";
    if (type_move == CAPTURES_KNIGHT_PAWN_ML) return "KNIGHT";
    if (type_move == CAPTURES_BISHOP_PAWN_ML) return "BISHOP";
    if (type_move == CAPTURES_ROOK_PAWN_ML) return "ROOK";
    if (type_move == CAPTURES_QUEEN_PAWN_ML) return "QUEEN";
    if (type_move == CAPTURES_KING_PAWN_ML) return "KING";
    if (type_move == MOVE_QUEEN_ML) return "QUEEN";
    if (type_move == MOVE_ROOK_ML) return "ROOK";
    if (type_move == MOVE_BISHOP_ML) return "BISHOP";
    if (type_move == MOVE_KNIGHT_ML) return "KNIGHT";
    if (type_move == MOVE_KING_ML) return "KING";
    if (type_move == MOVE_PAWN_ML) return "PAWN";
    if (type_move == MOVE_DOUBLE_PAWN_ML) return "PAWN";
    if (type_move == MOVE_KING_CASTLE_ML) return "KING";
    if (type_move == MOVE_KING_QUEEN_CASTLE_ML) return "KING";
    return "";
}


// код от Qwen3.7-Max AI
// возвращаем фигуру в которую превращается пешка по типу хода
/**
* @param {number} type_move
* @returns {string}
*/
const return_promo_piece_from_type_move_ml = (type_move) => PROMO_PIECE_LUT[type_move] || "";

// возвращаем фигуру в которую превращается пешка по типу хода
// /**
// * @param {number} type_move
// * @returns {string}
// */
// //+
// const return_promo_piece_from_type_move_ml = function (type_move) {

//     if (type_move == MOVE_PAWN_PROMO_QUEEN_ML) return "q";
//     if (type_move == MOVE_PAWN_PROMO_ROOK_ML) return "r";
//     if (type_move == MOVE_PAWN_PROMO_BISHOP_ML) return "b";
//     if (type_move == MOVE_PAWN_PROMO_KNIGHT_ML) return "n";

//     if (type_move == CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML) return "q";
//     if (type_move == CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML) return "r";
//     if (type_move == CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML) return "b";
//     if (type_move == CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML) return "n";

//     if (type_move == CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML) return "q";
//     if (type_move == CAPTURES_PAWN_ROOK_PROMO_ROOK_ML) return "r";
//     if (type_move == CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML) return "b";
//     if (type_move == CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML) return "n";

//     if (type_move == CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML) return "q";
//     if (type_move == CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML) return "r";
//     if (type_move == CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML) return "b";
//     if (type_move == CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML) return "n";

//     if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML) return "q";
//     if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML) return "r";
//     if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML) return "b";
//     if (type_move == CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML) return "n";
//     return "";
// }

// TEST
///////////////////////////////////////////////////////////////////

/**
* тестирую совместно с add_packing_move_ml 
* 
* сравнение двух списков ходов.
* если есть отличия то печатем в консоль предупреждение
* @param {Int32Array} packing_moves_original
* @param {Int32Array} packing_moves
* @returns {void}
*/
const test_compare_list_from_ml = function (packing_moves_original, packing_moves) {

    let number_move_original = packing_moves_original[IND_NUMBER_MOVE_ML];
    let number_move = packing_moves[IND_NUMBER_MOVE_ML];

    let number_captures_move_original = packing_moves_original[IND_NUMBER_CAPTURES_MOVE_ML];
    let number_captures_move = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML];

    let piece_color_original = packing_moves_original[IND_PIECE_COLOR_ML];
    let piece_color = packing_moves[IND_PIECE_COLOR_ML];

    let type_move_or_i;
    let type_move_j;

    let from_or_i;
    let from_j;

    let to_or_i;
    let to_j;

    let name_capture_piece_or_i;
    let name_capture_piece_j;

    let number_move_equal = 0;
    let number_move_not_equal = 0;

    let found = false;

    for (let i = 0; i < number_move_original; i++) {

        type_move_or_i = get_type_move_ml(i, packing_moves_original);
        from_or_i = get_from_ml(i, packing_moves_original);
        to_or_i = get_to_ml(i, packing_moves_original);
        name_capture_piece_or_i = get_name_capture_piece_ml(i, packing_moves_original);

        found = false;

        for (let j = 0; j < number_move; j++) {

            type_move_j = get_type_move_ml(j, packing_moves);
            from_j = get_from_ml(j, packing_moves);
            to_j = get_to_ml(j, packing_moves);
            name_capture_piece_j = get_name_capture_piece_ml(j, packing_moves);

            if (
                (type_move_or_i == type_move_j) && (from_or_i == from_j) &&
                (to_or_i == to_j) && (name_capture_piece_or_i == name_capture_piece_j)
            ) {
                found = true;
                break; // Нашли, выходим из внутреннего цикла
            }
        }

        if (found) {
            number_move_equal = number_move_equal + 1;
        } else {
            number_move_not_equal = number_move_not_equal + 1;
        }
    }

    // цвет хода
    if (piece_color_original != piece_color) {
        console.log("test_compare_list_from->piece_color original = " + piece_color_original);
        console.log("test_compare_list_from->piece_color          = " + piece_color);            
    }

    // количество взятий
    if (number_captures_move_original != number_captures_move) {
        console.log("test_compare_list_from->number_captures_move original = " + number_captures_move_original);
        console.log("test_compare_list_from->number_captures_move          = " + number_captures_move);            
    }

    // количество ходов
    if (number_move_original != number_move) {
        console.log("test_compare_list_from->number_move original = " + number_move_original);
        console.log("test_compare_list_from->number_move          = " + number_move);          
    }

    // нашли несовпадающие ходы
    if (number_move_original != number_move_equal) {
        console.log('Move_list_0x88_С->this.number_move      = ' + number_move_original);
        console.log('Move_list_0x88_С->number_move_equal     = ' + number_move_equal);
        console.log('Move_list_0x88_С->number_move_not_equal = ' + number_move_not_equal);
    }
}

/**
 * печатаем в консоль ход из списка под заданным номером
 * @param {number} i
 * @param {Int32Array} packing_moves
 * @returns {void}
 */
const test_print_i_move_list_ml = function (i, packing_moves) {

    let type_move_i = get_type_move_ml(i, packing_moves);
    let from_i = get_from_ml(i, packing_moves);
    let to_i = get_to_ml(i, packing_moves);
    let name_capture_piece_i = get_name_capture_piece_ml(i, packing_moves);

    let number_move = packing_moves[IND_NUMBER_MOVE_ML];
    let number_captures_move = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML];
    let piece_color = packing_moves[IND_PIECE_COLOR_ML];


    console.log("test_print_i_move_list ********");
    console.log("type_move[" + i + "] = " + type_move_i + " nm = " + TYPE_MOVE_NAME_ML[type_move_i]);
    console.log("from[" + i + "] = " + from_i);
    console.log("to[" + i + "] = " + to_i);
    console.log("name_capture_piece_i[" + i + "] = " + name_capture_piece_i);

    console.log(LET_COOR_CB[s_0x88_to_x07_cb(from_i)] + "" +
        (8 - s_0x88_to_y07_cb(from_i)) + "-" +
        LET_COOR_CB[s_0x88_to_x07_cb(to_i)] + "" +
        (8 - s_0x88_to_y07_cb(to_i)));

    console.log("piece_color = " + piece_color);
    console.log("number_captures_move = " + number_captures_move);
    console.log("number_move = " + number_move);

    console.log("---- ");
    console.log("*********** test_print_i_move_list");
}

/**
 * тестирую совместно с add_packing_move_ml 
 * 
 * печатаем в консоль весь список ходов
 * @param {Int32Array} packing_moves
 * @returns {void}
 */
const test_print_list_ml = function (packing_moves) {

    let type_move_i;
    let from_i;
    let to_i;
    let name_capture_piece_i;

    let number_move = packing_moves[IND_NUMBER_MOVE_ML];
    let number_captures_move = packing_moves[IND_NUMBER_CAPTURES_MOVE_ML];
    let piece_color = packing_moves[IND_PIECE_COLOR_ML];


    console.log("test_print_list ********");
    for (let i = 0; i < number_move; i++) {

        type_move_i = get_type_move_ml(i, packing_moves);
        from_i = get_from_ml(i, packing_moves);
        to_i = get_to_ml(i, packing_moves);
        name_capture_piece_i = get_name_capture_piece_ml(i, packing_moves);

        console.log("type_move[" + i + "] = " + type_move_i + " nm = " + TYPE_MOVE_NAME_ML[type_move_i]);
        console.log("from[" + i + "] = " + from_i);
        console.log("to[" + i + "] = " + to_i);
        console.log("name_capture_piece_i[" + i + "] = " + name_capture_piece_i);

        console.log(LET_COOR_CB[s_0x88_to_x07_cb(from_i)] + "" +
            (8 - s_0x88_to_y07_cb(from_i)) + "-" +
            LET_COOR_CB[s_0x88_to_x07_cb(to_i)] + "" +
            (8 - s_0x88_to_y07_cb(to_i)));

        console.log("---- ");
    }

    console.log("piece_color = " + piece_color);
    console.log("number_captures_move = " + number_captures_move);
    console.log("number_move = " + number_move);
    console.log("*********** test_print_list");
}

//////////////////////////////////////////////////
// TEST



//return_piece_name_captures_from_type_move, 
export {
    clear_list_ml, add_packing_move_ml, get_type_move_ml, get_from_ml, get_to_ml, get_name_capture_piece_ml, set_color_ml,
    set_number_captures_move_ml, sorting_list_ml, test_compare_list_from_ml, test_print_i_move_list_ml, test_print_list_ml,
    save_list_from_ml, move_is_found_ml, return_i_move_ml, move_to_string_uci_ml, return_type_captures_pawn_promo_ml,
    return_type_simple_move_ml, type_move_to_name_piece_ml, type_move_to_name_piece_f_ml, return_promo_piece_from_type_move_ml,
    set_move_after_the_captures_ml, sorting_list_history_heuristic_ml, set_move_in_0_ml,
    LENGTH_LIST_ML, IND_PIECE_COLOR_ML, IND_NUMBER_CAPTURES_MOVE_ML, IND_NUMBER_MOVE_ML,
    IND_PROMO_QUEEN_ML, IND_PROMO_ROOK_ML, IND_PROMO_BISHOP_ML, IND_PROMO_KNIGHT_ML,
    MOVE_NO_ML, CAPTURES_PAWN_QUEEN_PROMO_QUEEN_ML, CAPTURES_PAWN_ROOK_PROMO_QUEEN_ML, CAPTURES_PAWN_BISHOP_PROMO_QUEEN_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_QUEEN_ML, CAPTURES_PAWN_QUEEN_PROMO_ROOK_ML, CAPTURES_PAWN_ROOK_PROMO_ROOK_ML,
    CAPTURES_PAWN_BISHOP_PROMO_ROOK_ML, CAPTURES_PAWN_KNIGHT_PROMO_ROOK_ML, CAPTURES_PAWN_QUEEN_PROMO_BISHOP_ML,
    CAPTURES_PAWN_ROOK_PROMO_BISHOP_ML, CAPTURES_PAWN_BISHOP_PROMO_BISHOP_ML, CAPTURES_PAWN_KNIGHT_PROMO_BISHOP_ML,
    CAPTURES_PAWN_QUEEN_PROMO_KNIGHT_ML, CAPTURES_PAWN_ROOK_PROMO_KNIGHT_ML, CAPTURES_PAWN_BISHOP_PROMO_KNIGHT_ML,
    CAPTURES_PAWN_KNIGHT_PROMO_KNIGHT_ML, MOVE_PAWN_PROMO_QUEEN_ML, MOVE_PAWN_PROMO_ROOK_ML, MOVE_PAWN_PROMO_BISHOP_ML,
    MOVE_PAWN_PROMO_KNIGHT_ML, CAPTURES_PAWN_QUEEN_ML, CAPTURES_PAWN_ROOK_ML, CAPTURES_PAWN_BISHOP_ML, CAPTURES_PAWN_KNIGHT_ML,
    CAPTURES_KNIGHT_QUEEN_ML, CAPTURES_KNIGHT_ROOK_ML, CAPTURES_BISHOP_QUEEN_ML, CAPTURES_BISHOP_ROOK_ML, CAPTURES_ROOK_QUEEN_ML,
    CAPTURES_KNIGHT_BISHOP_ML, CAPTURES_KNIGHT_KNIGHT_ML, CAPTURES_BISHOP_BISHOP_ML, CAPTURES_BISHOP_KNIGHT_ML, CAPTURES_ROOK_ROOK_ML,
    CAPTURES_QUEEN_QUEEN_ML, CAPTURES_ROOK_BISHOP_ML, CAPTURES_ROOK_KNIGHT_ML, CAPTURES_QUEEN_ROOK_ML, CAPTURES_QUEEN_BISHOP_ML,
    CAPTURES_QUEEN_KNIGHT_ML, CAPTURES_KING_QUEEN_ML, CAPTURES_KING_ROOK_ML, CAPTURES_KING_BISHOP_ML, CAPTURES_KING_KNIGHT_ML,
    CAPTURES_PAWN_PAWN_ML, EP_CAPTURES_ML, CAPTURES_KNIGHT_PAWN_ML, CAPTURES_BISHOP_PAWN_ML, CAPTURES_ROOK_PAWN_ML,
    CAPTURES_QUEEN_PAWN_ML, CAPTURES_KING_PAWN_ML, MOVE_QUEEN_ML, MOVE_ROOK_ML, MOVE_BISHOP_ML, MOVE_KNIGHT_ML, MOVE_KING_ML, MOVE_PAWN_ML,
    MOVE_DOUBLE_PAWN_ML, MOVE_KING_CASTLE_ML, MOVE_KING_QUEEN_CASTLE_ML, TYPE_MOVE_NAME_ML
};