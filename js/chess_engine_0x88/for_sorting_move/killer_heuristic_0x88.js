/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name killer_heuristic_0x88.js
 * @version created 04.11m.2025 
 * last modified 04.11m.2025
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

class killer_heuristic_0x88_O {

  static NAME = "killer_heuristic_0x88_O";

  static MAX_DEPTH = 100;

  killer_moves_from_1 = new Int32Array(killer_heuristic_0x88_O.MAX_DEPTH).fill(-1);
  killer_moves_to_1 = new Int32Array(killer_heuristic_0x88_O.MAX_DEPTH).fill(-1);

  killer_moves_from_2 = new Int32Array(killer_heuristic_0x88_O.MAX_DEPTH).fill(-1);
  killer_moves_to_2 = new Int32Array(killer_heuristic_0x88_O.MAX_DEPTH).fill(-1);

  depth_max = 0|0;

  constructor() {

  }

  iniM() {

  }

  // очищаем список
  clear_list() {
    for (let i = 0; i < killer_heuristic_0x88_O.MAX_DEPTH; i++) {
      this.killer_moves_from_1[i] = -1;
      this.killer_moves_to_1[i] = -1;
      this.killer_moves_from_2[i] = -1;
      this.killer_moves_to_2[i] = -1;
    }
    this.depth_max = 0;
  }

  // записываем не взятия вызвавшие отсечку 
  add_move(from, to, depth) {

    //console.log('killer_heuristic_0x88_O->add_move depth ' + depth +" type_move " + type_move);
    if (this.killer_moves_from_1[depth] != from) {// если такой ход еще не записан
      // записанный до этого ход перезаписываем на второй ход
      this.killer_moves_from_2[depth] = this.killer_moves_from_1[depth];
      this.killer_moves_to_2[depth] = this.killer_moves_to_1[depth];
      // записываем ход      
      this.killer_moves_from_1[depth] = from;
      this.killer_moves_to_1[depth] = to;
    }
    // увеличиваем количество записанных по глубине позиций
    if (depth > this.depth_max) this.depth_max = depth;
  }
}

export { killer_heuristic_0x88_O };