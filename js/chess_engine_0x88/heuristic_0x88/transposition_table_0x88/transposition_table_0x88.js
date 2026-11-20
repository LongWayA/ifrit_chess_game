// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name transposition_table_0x88.js
 * @version created 07.02m.2026 
 * Code review: Gemini 4 Hydrogen
*/

/**
* НАЗНАЧЕНИЕ
 начало цитаты
   https://www.chessprogramming.org/Zobrist_Hashing
   В 32-битном хеше коллизия может возникнуть, если вычислить sqrt(2^32) == 2^16, 
   то есть около 65 тысяч позиций. В 64-битном хеше коллизия может возникнуть примерно 
   через 2^32, то есть около 4 миллиардов позиций.
 конец цитаты

 И так у нас есть 64 битный ключ который мы вписываем в размер таблицы через индекс получаемый из ключа путем
 index_key_64_board = key_64_board & (MAX_TABLE_LENTH - 1);//
 Размер таблицы обязательно должен быть вида 2 в степени n минус 1. т.е. 2**n-1
 тогда он имеет вид 0001111111 и операцией битого "и" т.е. &  мы отрезаем лишние старшие биты
 что то вида 10100...1011101 & 0000...11111 = 0000...11101.

 В таблицу пишем:
 key_64_chess_board_tt - 64 битный хеш ключ позиции
 packing_move_tt       - упакованный ход записанный для этой позиции
 score_tt              - оценка варианта с первым записанным ходом для этой позиции
 type_save_node_tt     - тип хода записанный для этой позиции. здесь тип хода значит отношение к альфа бете 
 delta_depth_tt        - глубина на которую посмотрели позицию
 test_fen_tt           - записали фен для этой позиции. нужно для тестирования коллизий с ключом

 Понятно что три значения(score_tt, type_save_node_tt, delta_depth_tt) можно упаковать в одно, но пока вроде не критично

*/
//-

// TESTS ////////////////////////////////////////////
//const TT_IS_TEST_FEN = true;//
const TT_IS_TEST_FEN = false; //
////////////////////////////////////////////// TESTS


//8 388 480
//const MAX_TABLE_LENTH = 1_048_576;
//const MAX_TABLE_LENTH = 2_097_152;//2_097_152; 4_194_304; 8_388_608; 16_777_216
//const MAX_TABLE_LENTH = 16_777_216;//

//const MAX_TABLE_LENTH = 16_384;//1_024 2_048 4_096 8_192 16_384 32_768 65_536
//const MAX_TABLE_LENTH_TT = 65_536;
const MAX_TABLE_LENTH_TT = 1_048_576;

const MAX_SCORE_UPDATE_TT = 1;// не использую. флаг записи точной оценки позиции

const ALPHA_UPDATE_TT = 2;// флаг записи хода который улучшил альфу

const BETA_CUT_TT = 3;// флаг записи хода приведшего к отсечке по бете

// индексы для доступа к массиву out_tt
const IND_TN_TT = 0;// индекс для записи типа узла (улучшение альфы или отсечка и т.д.)
const IND_SC_TT = 1;// индекс для записи оценки хода
const IND_DD_TT = 2;// индекс для записи на сколько ходов смотрели позицию delta_depth = max_depth - depth

// массив нужен для возвращения значений из функции get_position_from_tt(записанный ход передается через параметр)
// в нем записаны: тип узла, оценка хода, delta_depth
const out_tt = [-1, -1, -1];//

// 64 битный ключ позиции   
const key_64_chess_board_tt = new BigUint64Array(MAX_TABLE_LENTH_TT);

// записанный упакованный ход
const packing_move_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// оценка позиции
const score_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// тип записанного хода. улучшение альфы или отсечка по бете или точная оценка
const type_save_node_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// глубина на которую посмотрели позицию
const delta_depth_tt = new Int32Array(MAX_TABLE_LENTH_TT);

// test_fen_board ----------------------------------------------------------------------------------
// тестовый фен позиции. смотрим насколько адекватный получается ключ позиции
const test_fen_tt = new Array(MAX_TABLE_LENTH_TT); // тип хода в записанной позиции

// test
let input_to__set_position_in_tt = 0;// зашли чтобы попытаться добавить позицию
let input_to__get_position_from_tt = 0;// зашли чтобы попытаться считать позицию
//-----------------
let key_64_found__set_position_in_tt = 0;// ключ при добавлении позиции уже есть

let key_64_new_save__set_position_in_tt = 0;// добавили позицию по новой
let key_64_rewrite__set_position_in_tt = 0;// добавили позицию перезаписав старую   
//-----------------

let key_64_found__get_position_from_tt = 0;// зашли по индексу но ключ не совпал
let key_64_not_found__get_position_from_tt = 0;// зашли по индексу и ключ совпал
let delta_depth_use__get_position_from_tt = 0;// глубина поиска из таблицы больше чем в узле
//-----------------

let yes_collision_fen = 0;// зашли по индексу но фен не совпал
let no_collision_fen = 0;// зашли по индексу и фен совпал


const print_test_set_get_position_tt = () => {

    //  if (yes_collision_fen != 0) {
    if (TT_IS_TEST_FEN) {

        console.log("set---------------------");
        console.log("зашли чтобы попытаться добавить позицию " + input_to__set_position_in_tt);// зашли чтобы попытаться добавить позицию
        console.log("ключ при добавлении позиции уже есть " + key_64_found__set_position_in_tt);// ключ при добавлении позиции уже есть
        console.log("добавили позицию по новой " + key_64_new_save__set_position_in_tt);// добавили позицию по новой
        console.log("добавили позицию перезаписав старую " + key_64_rewrite__set_position_in_tt);// добавили позицию перезаписав старую 

        console.log("get---------------------");
        console.log("зашли чтобы попытаться использовать позицию " + input_to__get_position_from_tt);// зашли чтобы попытаться использовать позицию
        console.log("зашли по индексу и ключ совпал " + key_64_found__get_position_from_tt)// зашли по индексу и ключ  совпал
        console.log("зашли по индексу но ключ не совпал " + key_64_not_found__get_position_from_tt)// зашли по индексу но ключ не совпал
        console.log("глубина поиска из таблицы больше чем в узле " + delta_depth_use__get_position_from_tt)// глубина поиска из таблицы больше чем в узле
        console.log("зашли по индексу но фен не совпал " + yes_collision_fen)// зашли по индексу но фен не совпал
        console.log("зашли по индексу и фен совпал " + no_collision_fen)// зашли по индексу и фен совпал
    }
}

const clear_out_tt = () => {

    out_tt[IND_TN_TT] = -1;// типа узла (улучшение альфы или отсечка и т.д.)
    out_tt[IND_SC_TT] = -1;// оценка хода
    out_tt[IND_DD_TT] = -1;// на сколько ходов смотрели позицию delta_depth = max_depth - depth
}

const clear_hash_tt = () => {
    for (let i = 0; i < MAX_TABLE_LENTH_TT; i++) {

        key_64_chess_board_tt[i] = 0n; //            
        packing_move_tt[i] = 0; // 
        score_tt[i] = 0; // 
        type_save_node_tt[i] = 0; //
        delta_depth_tt[i] = 0; //

        // test_fen_board ----------------
        test_fen_tt[i] = ""; //  
    }
}


const ini_tt = () => {

    //console.log("ini_tt -> " + MAX_TABLE_LENTH_TT.toString(2));

    clear_hash_tt();

    clear_out_tt();

    // test
    input_to__set_position_in_tt = 0;// зашли чтобы попытаться добавить позицию
    key_64_found__set_position_in_tt = 0;// ключ при добавлении позиции уже есть
    key_64_new_save__set_position_in_tt = 0;// добавили позицию по новой
    key_64_rewrite__set_position_in_tt = 0;// добавили позицию перезаписав старую  

    input_to__get_position_from_tt = 0;// зашли чтобы попытаться считать позицию
    key_64_found__get_position_from_tt = 0;// зашли по индексу и ключ совпал
    key_64_not_found__get_position_from_tt = 0;//  зашли по индексу но ключ не совпал
    delta_depth_use__get_position_from_tt = 0;// глубина поиска из таблицы больше или равна записанной в узле
    yes_collision_fen = 0;// зашли по индексу но фен не совпал
    no_collision_fen = 0;// зашли по индексу и фен совпал
}

// сколько позиций записано
const test_uses_hash_tt = () => {

    let save_position = 0;
    let not_save_position = 0;

    for (let i = 0; i < MAX_TABLE_LENTH_TT; i++) {

        if (key_64_chess_board_tt[i] != 0n) {
            save_position = save_position + 1;
        } else {
            not_save_position = not_save_position + 1;
        }
    }

    console.log("test_uses_hash_tt -> save_position " + save_position +
        " not_save_position " + not_save_position);
    if (TT_IS_TEST_FEN) {
        console.log("yes collision_fen " + yes_collision_fen)// зашли по индексу но фен не совпал
        console.log("no_collision_fen " + no_collision_fen)// зашли по индексу и фен совпал       
    }
}

/**
* добавляем ход в таблицу
* вычисляем индекс по кеш-ключу 
* прверяем есть ли такой ключ по этому индексу
* если есть то пишем если текущая длина рассмотренного варианта больше или равна записанной
* иначе просто пишем
* записываем в следующие массивы:
* key_64_chess_board_tt[idx] - кеш ключ позиции, если пишем первый раз            
* packing_move_tt[idx] - упакованный ход
* score_tt[idx] - оценка позиции
* type_save_node_tt[idx] - тип записи позиции: улучшение альфы или отсечка по бете
* delta_depth_tt[idx] - глубина варианта max_depth - depth
* test_fen_tt[idx] - в тестовом режиме пишем фен
* @param {BigUint64Array} chess_board_key_64 кеш ключ позиции
* @param {Int32Array} packing_moves список избыточных ходов в узле
* @param {number} type_nodes тип записи в узел: улучшение альфы или отсечка по бете
* @param {number} score оценка позиции
* @param {number} depth глубина варианта max_depth - depth
* @param {number} max_depth глубина поиска
* @param {number} i индекс записываемого хода
* @param {string} [fen] фен позиция для теста
* @returns {void}
*/
const set_position_in_tt = (chess_board_key_64, packing_moves, type_nodes, score, depth, max_depth, i, fen) => {

    input_to__set_position_in_tt = input_to__set_position_in_tt + 1;// зашли что бы попытаться добавить позицию


    // определяем по ключу индекс для доступа к таблице
    let index_key_64 = chess_board_key_64[0] & BigInt(MAX_TABLE_LENTH_TT - 1);//          

    // Вычисляем индекс один раз как обычный number
    const idx = Number(index_key_64);

    let delta_depth = max_depth - depth;

    /////////////////////////////////////////////////// 
    // ключ совпал значит мы эту позицию когда то записали      
    if (chess_board_key_64[0] == key_64_chess_board_tt[idx]) {

        key_64_found__set_position_in_tt = key_64_found__set_position_in_tt + 1;// ключ при добавлении позиции уже есть

        // 
        let delta_depth_tt_ = delta_depth_tt[idx]; //

        // место уже было записано. надо проверить глубину записи
        if (delta_depth_tt_ <= delta_depth) {

            key_64_rewrite__set_position_in_tt = key_64_rewrite__set_position_in_tt + 1;// добавили позицию перезаписав старую

            packing_move_tt[idx] = packing_moves[i];// упакованный ход
            score_tt[idx] = score;// оценка узла
            type_save_node_tt[idx] = type_nodes;// тип записи узла: улучшение альфы или отсечка по бете
            delta_depth_tt[idx] = delta_depth;// глубина варината max_depth - depth
            if (TT_IS_TEST_FEN) {
                if (fen != undefined) test_fen_tt[idx] = fen;//
            }
        }
    } else {

        key_64_new_save__set_position_in_tt = key_64_new_save__set_position_in_tt + 1;// добавили позицию по новой

        key_64_chess_board_tt[idx] = chess_board_key_64[0];// кеш ключ позиции, если пишем первый раз
        packing_move_tt[idx] = packing_moves[i];
        score_tt[idx] = score;
        type_save_node_tt[idx] = type_nodes;
        delta_depth_tt[idx] = delta_depth;
        if (TT_IS_TEST_FEN) {
            if (fen != undefined) test_fen_tt[idx] = fen;
        }
    }
}

/**
* смотрим есть ли у нас в таблице такая позиция и если есть извлекаем ход
* по ключу позиции получаем индекс, заходим и смотрим совпадение ключей.
* если ключ совпал то в тестовом режиме смотрим совпадение фен позиций
* дальше считываем ход в packing_move_arr и инициализруем out_tt
* если глубина варианта больше или равна нашей то выдаем out_tt,) доступ 
* к packing_move_arr ссылочный в параметрах)
* иначе смотрим если запись была при апгрейде альфы то выдаем out_tt
* так как для сортировки подойдет любой результат
* иначе [-1,-1,-1] так как для отсечки глубина недостаточна, она меньше текущей
* если же ключ не совпал то выдаем [-1,-1,-1]
* 
* @param {BigUint64Array} chess_board_key_64 кеш ключ позиции
* @param {Int32Array} packing_move_arr возвращаем записанный ход, это массив из одного хода что бы передавать по ссылке
* @param {number} depth глубина узла из которого идет запрос
* @param {number} max_depth глубина поиска
* @param {string} [fen] фен позиция для теста
* @returns {number[]} возвращаем массив out_tt, в нем выдаем: 
* out_tt[IND_TN_TT] - типа узла (улучшение альфы или отсечка и т.д.)
* out_tt[IND_SC_TT] - оценка хода
* out_tt[IND_DD_TT] - на сколько ходов смотрели позицию delta_depth = max_depth - depth
*/
const get_position_from_tt = (chess_board_key_64, packing_move_arr, depth, max_depth, fen) => {

    // всего было обращений в запись
    input_to__get_position_from_tt = input_to__get_position_from_tt + 1;

    // определяем по ключу индекс для доступа к таблице
    let index_key_64 = chess_board_key_64[0] & BigInt(MAX_TABLE_LENTH_TT - 1);//

    // Вычисляем индекс один раз как обычный number
    const idx = Number(index_key_64);

    // если ключ совпал
    if (chess_board_key_64[0] == key_64_chess_board_tt[idx]) {

        // зашли по индексу и ключ совпал
        key_64_found__get_position_from_tt = key_64_found__get_position_from_tt + 1;

        if (TT_IS_TEST_FEN) {
            if (fen != undefined) {
                if (fen === test_fen_tt[idx]) {
                    no_collision_fen = no_collision_fen + 1;// зашли по индексу и фен совпал
                } else {//if (fen === fen_test) {
                    yes_collision_fen = yes_collision_fen + 1;// зашли по индексу но фен не совпал
                }//if (fen === fen_test) {
            }
        }

        let delta_depth = max_depth - depth;

        // 
        let delta_depth_tt_ = delta_depth_tt[idx]; //            

        packing_move_arr[0] = packing_move_tt[idx];

        out_tt[IND_SC_TT] = score_tt[idx];
        out_tt[IND_TN_TT] = type_save_node_tt[idx];
        out_tt[IND_DD_TT] = delta_depth_tt[idx];

        // проверяем что глубина поиска позиции из таблицы больше или равна
        if (delta_depth_tt_ >= delta_depth) {

            // прошли тест по глубине поиска
            delta_depth_use__get_position_from_tt = delta_depth_use__get_position_from_tt + 1;

            return out_tt;

        } else {//if (delta_depth_tt_ >= delta_depth) {

            // если это узел не ALPHA_UPDATE_TT выдаем [-1,-1,-1]
            if (out_tt[IND_TN_TT] != ALPHA_UPDATE_TT) clear_out_tt();

            return out_tt;
        }//if (delta_depth_tt_ >= delta_depth) {

    } else {//if (chess_board_key_64[0] == key_64_chess_board_tt[Number(index_key_64)]) {
        // зашли по индексу но ключ не совпал
        key_64_not_found__get_position_from_tt = key_64_not_found__get_position_from_tt + 1;
        // такой позиции нет
        clear_out_tt();
        return out_tt;// выдаем [-1,-1,-1]
    }//if (chess_board_key_64[0] == key_64_chess_board_tt[Number(index_key_64)]) {
}

export {
    clear_out_tt, ini_tt, clear_hash_tt, test_uses_hash_tt, set_position_in_tt, get_position_from_tt, print_test_set_get_position_tt,
    MAX_TABLE_LENTH_TT, MAX_SCORE_UPDATE_TT, ALPHA_UPDATE_TT, BETA_CUT_TT, IND_TN_TT, IND_SC_TT, IND_DD_TT, TT_IS_TEST_FEN
};