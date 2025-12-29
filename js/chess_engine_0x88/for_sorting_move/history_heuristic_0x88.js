/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name history_heuristic_0x88.js
 * @version created 05.11m.2025 
 * last modified 05.11m.2025
*/

import { Chess_board_0x88_C } from "../move_generator/chess_board_0x88.js";

/**
* НАЗНАЧЕНИЕ
 Мне кажется, что это дальнейшее обобщение killer heuristic

 Заполняем массив history[color][from][to]
 количество ячеек 2 * 64 * 64 = 8_192
 значениями вида (depth_max - depth) * (depth_max - depth)
 таким образом, что если ход вызвал отсечку по альфе или бете то 
 history[color][from][to] = history[color][from][to] + (depth_max - depth) * (depth_max - depth);
 Максимальное значение сейчас 100_000. если оно превышено то все значения делим на 2.
 Взятия мы не пишем.

*/
//+
//

class History_heuristic_0x88_C {

  static NAME = "History_heuristic_0x88_C";

  // тут все на 1 больше последней позиции потому что есть 0
  static MAX_COLOR = 2;
  static MAX_COORDINATE = 64;
  static MAX_HISTORY = 100_000;

  history = new Array(History_heuristic_0x88_C.MAX_COLOR);  // [цвет фигуры][поле откуда фигура ходит][поле куда фигура ходит]

  constructor() {

  }

  // создаем трехмерный массив color, from, to
  iniM() {
    for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
      this.history[color] = new Array(History_heuristic_0x88_C.MAX_COORDINATE);
      for (let from = 0; from < History_heuristic_0x88_C.MAX_COORDINATE; from++) {
        this.history[color][from] = new Int32Array(History_heuristic_0x88_C.MAX_COORDINATE);
      }
    }
    this.clear_history();
  }

  // очищаем историю
  clear_history() {
    //let g = 0;
    for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
      for (let from = 0; from < History_heuristic_0x88_C.MAX_COORDINATE; from++) {
        for (let to = 0; to < History_heuristic_0x88_C.MAX_COORDINATE; to++) {
          //g = g + 1;
          this.history[color][from][to] = 0;//-1 g
        }
      }
    }
  }

  // 
  ini_test_history() {// 64
    for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
      for (let from = 0; from < History_heuristic_0x88_C.MAX_COORDINATE; from++) {
        for (let to = 0; to < History_heuristic_0x88_C.MAX_COORDINATE; to++) {

          this.history[color][from][to] = 100 * from + to;//
        }
      }
    }
  }


  // записываем хороший ход
  history_good_save(color, from_128, to_128, depth, depth_max) {

    let delta_depth = depth_max - depth;

    // преобразование Chess_board_0x88_C.SQUARE_128_to_64[] переводит 128-клеточную доску в 64-клеточную 
    // так как нам в масиве не нужны 64 дополнительные неиспользуемые в данном случае клетки. 
    // напомню что 128 клеточная доска нужна что бы в одну операцию (SquareIndex & 0x88 == 0 - мы еще на доске) 
    // оперделять выход за пределы доски

    let from_64 = Chess_board_0x88_C.SQUARE_128_to_64[from_128];
    let to_64 = Chess_board_0x88_C.SQUARE_128_to_64[to_128];

    this.history[color][from_64][to_64] = this.history[color][from_64][to_64] + delta_depth * delta_depth; 

    // console.log("History_heuristic_0x88_C-> from_64 " + from_64 + " to_64 " + to_64 + " color " + color);
    // console.log("History_heuristic_0x88_C-> history " + this.history[color][from_64][to_64]);    

    // если запись в ячейку истории превысила лимит все делим на два  
    if (this.history[color][from_64][to_64] > History_heuristic_0x88_C.MAX_HISTORY) {

      for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
        for (let from = 0; from < History_heuristic_0x88_C.MAX_COORDINATE; from++) {
          for (let to = 0; to < History_heuristic_0x88_C.MAX_COORDINATE; to++) {
            this.history[color][from][to] = this.history[color][from][to] / 2;
          }
        }
      }
    }
  }

  // записываем плохой ход
  history_bad_save(color, from_128, to_128, depth, depth_max) {

    let delta_depth = depth_max - depth;

    // преобразование Chess_board_0x88_C.SQUARE_128_to_64[] переводит 128-клеточную доску в 64-клеточную 
    // так как нам в масиве не нужны 64 дополнительные неиспользуемые в данном случае клетки. 
    // напомню что 128 клеточная доска нужна что бы в одну операцию (SquareIndex & 0x88 == 0 - мы еще на доске) 
    // оперделять выход за пределы доски

    let from_64 = Chess_board_0x88_C.SQUARE_128_to_64[from_128];
    let to_64 = Chess_board_0x88_C.SQUARE_128_to_64[to_128];

    this.history[color][from_64][to_64] = this.history[color][from_64][to_64] - delta_depth * delta_depth; 

    // console.log("History_heuristic_0x88_C-> from_64 " + from_64 + " to_64 " + to_64 + " color " + color);
    // console.log("History_heuristic_0x88_C-> history " + this.history[color][from_64][to_64]);    

    // если запись в ячейку истории превысила лимит все делим на два  
    if (this.history[color][from_64][to_64] < -1 * History_heuristic_0x88_C.MAX_HISTORY) {

      for (let color = 0; color < History_heuristic_0x88_C.MAX_COLOR; color++) {
        for (let from = 0; from < History_heuristic_0x88_C.MAX_COORDINATE; from++) {
          for (let to = 0; to < History_heuristic_0x88_C.MAX_COORDINATE; to++) {
            this.history[color][from][to] = this.history[color][from][to] / 2;
          }
        }
      }
    }
  }  
}

export { History_heuristic_0x88_C };
