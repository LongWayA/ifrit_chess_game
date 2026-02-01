// @ts-check
/** 
 * @copyright Copyright (c) 2026, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name killer_heuristic_0x88.js
 * @version created 01.02m.2026 
*/

/**
* НАЗНАЧЕНИЕ
  ход не должен быть взятием. для взятий своя, более эффективная сортировка.
  записываем ходы вызвавшие бетта отсечку за белых и альфа за черных
  работаем с ходами на одной глубине поэтому цвет запоминать не надо
  т.е. записываем два хода вызвавшие отсечки и ставим их после взятий.
  так как хода только два писать что то еще кроме отсечки не стоит.
*/
//+
// тут все прозрачно. идей пока нет

  //let packing_moves_k1 = new Uint32Array(MAX_DEPTH_K).fill(MOVE_NO);// список ходов. ход упакован в одно число Uint32

  const MAX_DEPTH_K = 104;
  const IND_DEPTH_K = 103;
  
  

  /**
  * очищаем список ходов
  * @param {Uint32Array} packing_moves_k
  * @returns {void}
  */
  const clear_packing_moves_k = function (packing_moves_k) {
    for (let i = 0; i < MAX_DEPTH_K; i++) {
      packing_moves_k[i] = 0;
  
    }
  }

  // записываем не взятия вызвавшие отсечку 
   /**
   * @param {Uint32Array} packing_moves 
   * @param {Uint32Array} packing_moves_k1
   * @param {Uint32Array} packing_moves_k2 
   * @param {number} move_i
   * @param {number} depth
   * @returns {void}
   */ 
  const add_move_k = function (packing_moves, packing_moves_k1, packing_moves_k2, move_i, depth) {

    //console.log('killer_heuristic_0x88_O->add_move depth ' + depth +" type_move " + type_move);
    if (packing_moves_k1[depth] != packing_moves[move_i]) {// если такой ход еще не записан
      // записанный до этого ход перезаписываем на второй ход
      packing_moves_k2[depth] = packing_moves_k1[depth];
      // записываем ход      
      packing_moves_k1[depth] = packing_moves[move_i];
    }
    // увеличиваем количество записанных по глубине позиций
    if (depth > packing_moves_k1[IND_DEPTH_K]) packing_moves_k1[IND_DEPTH_K] = depth;
  }

export { clear_packing_moves_k, add_move_k ,MAX_DEPTH_K, IND_DEPTH_K};