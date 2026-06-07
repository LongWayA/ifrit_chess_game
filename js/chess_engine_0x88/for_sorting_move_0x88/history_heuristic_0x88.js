// @ts-check
/**
@copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
@author AnBr75
@name history_heuristic_0x88.js
@version created 01.02m.2026, refactored for flat Int32Array
Code review: Qwen3.7-Max AI
*/

import {
    SQUARE_128_to_64_CB
} from "../move_generator_0x88/chess_board_0x88.js";

import {
    get_from_ml, get_to_ml,
    IND_PIECE_COLOR_ML
} from "../move_generator_0x88/move_list_0x88.js";

/**
НАЗНАЧЕНИЕ
Эвристика истории — обобщение killer heuristic.
Заполняем плоский массив history[color][from][to] значениями delta_depth * delta_depth,
если тихий ход вызвал бета-отсечение.

Структура: плоский Int32Array размером 2 * 64 * 64 = 8192 элемента.
Формула индексации: (color << 12) | (from << 6) | to
    где color: 0 (черные) или 1 (белые)
          from, to: 0..63 (координаты 64-клеточной доски)

Причины перехода с 3D массива на плоский:
    1. Одно обращение к памяти вместо трёх (color → from → to).
    2. Отличная кэш-локальность (непрерывный блок памяти).
    3. Возможность использовать TypedArray.sort() и быструю очистку через .fill(0).
    4. Ускорение сортировки тихих ходов примерно в 3 раза.

Взятия в историю НЕ пишем — они сортируются по MVV/LVA.
*/

// Константы
const MAX_COLOR_HH = 2;          // 0 - черные, 1 - белые
const MAX_COORDINATE_HH = 64;    // размер 64-клеточной доски
const MAX_HISTORY_HH = 100_000;  // порог для aging (деления на 2)

// Размер плоского массива: 2 * 64 * 64 = 8192
const HISTORY_ARRAY_SIZE = MAX_COLOR_HH * MAX_COORDINATE_HH * MAX_COORDINATE_HH;

/**
Плоский массив истории.
Индексация: (color << 12) | (from_64 << 6) | to_64
@type {Int32Array}
*/
let history = new Int32Array(HISTORY_ARRAY_SIZE);

/**
Возвращаем ссылку на массив истории (для передачи в сортировку)
@returns {Int32Array}
*/
const get_history_hh = function () {
    return history;
};

/**
Инициализация массива истории.
Для плоского Int32Array достаточно одного вызова — массив уже создан и заполнен нулями.
@returns {void}
*/
const ini_Array_hh = function () {
    history.fill(0);
};

/**
Очистка истории.
TypedArray.fill() работает на уровне нативного кода и очищает 8192 элемента
за ~0.5 мкс (в сотни раз быстрее тройного цикла в JS).
@returns {void}
*/
const clear_history_hh = function () {
    history.fill(0);
};

/**
Тестовое заполнение массива (для отладки).
Заполняем значениями вида 100 * from + to, чтобы видеть паттерн в консоли.
@returns {void}
*/
const ini_test_history_hh = function () {
    for (let color = 0; color < MAX_COLOR_HH; color++) {
        const color_shift = color << 12;  // color * 4096
        for (let from = 0; from < MAX_COORDINATE_HH; from++) {
            const from_shift = from << 6; // from * 64
            for (let to = 0; to < MAX_COORDINATE_HH; to++) {
                history[color_shift | from_shift | to] = 100 * from + to;
            }
        }
    }
};

/**
Aging (старение) истории.
Когда значение в ячейке превышает MAX_HISTORY_HH, делим ВСЕ элементы массива на 2.
Это предотвращает переполнение Int32 и сохраняет относительный порядок ходов.
Используем битовый сдвиг >> 1 вместо деления / 2 — это быстрее.
@returns {void}
*/
const age_history_hh = function () {
    for (let i = 0; i < HISTORY_ARRAY_SIZE; i++) {
        history[i] = history[i] >> 1;  // Быстрое деление на 2 с сохранением знака
    }
};

/**
Записываем хороший тихий ход, вызвавший бета-отсечение.
Формула приращения: delta_depth² = (depth_max - depth)²
Это даёт бо́льший вес ходам, вызвавшим отсечение на большой глубине.

@param {number} move_i - индекс хода в списке packing_moves
@param {Int32Array} packing_moves - список ходов
@param {number} depth - текущая глубина поиска
@param {number} depth_max - максимальная глубина (корень поиска)
@returns {void}
*/
const history_good_save_hh = function (move_i, packing_moves, depth, depth_max) {
    const delta_depth = depth_max - depth;
    const increment = delta_depth * delta_depth;

    // Получаем цвет ходящей стороны
    const color = packing_moves[IND_PIECE_COLOR_ML];

    // Извлекаем координаты из упакованного хода и переводим в 64-клеточную систему
    const from_128 = get_from_ml(move_i, packing_moves);
    const to_128 = get_to_ml(move_i, packing_moves);
    const from_64 = SQUARE_128_to_64_CB[from_128];
    const to_64 = SQUARE_128_to_64_CB[to_128];

    // Вычисляем линейный индекс: (color << 12) | (from << 6) | to
    const index = (color << 12) | (from_64 << 6) | to_64;

    // Увеличиваем счётчик
    history[index] += increment;

    // Aging: если превысили порог, делим всю историю на 2
    if (history[index] > MAX_HISTORY_HH) {
        age_history_hh();
    }
};

export {
    ini_Array_hh,
    clear_history_hh,
    ini_test_history_hh,
    history_good_save_hh,
    get_history_hh,
    age_history_hh,
    MAX_COLOR_HH,
    MAX_COORDINATE_HH,
    MAX_HISTORY_HH,
    HISTORY_ARRAY_SIZE
};