/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name counter.js
 * @version created 07.09m.2025 
 * last modified 07.09m.2025
*/

import { PathesWeb_R } from "./pathes_web";

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

let get_text_requests = document.getElementById("text_requests");

if (PathesWeb_R.counter_js_isA20) {

  // 1. Создаём новый объект XMLHttpRequest
  var xhr = new XMLHttpRequest();

  //console.log('PathesWeb_R.counter_js_counterGet = ' + PathesWeb_R.counter_js_counterGet);

  // 2. Конфигурируем его: GET-запрос на URL
  xhr.open('GET', PathesWeb_R.counter_js_counterGet, false);
  //xhr.open('GET','/0_0_SQL_base/test.php', false);

  // 3. Отсылаем запрос
  xhr.send();

  // 4. Если код ответа сервера не 200, то это ошибка
  if (xhr.status != 200) {
    // обработать ошибку
    alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    get_text_requests.value = xhr.status + ': ' + xhr.statusText;
  } else {
    // вывести результат
    //document.write('Запросов к странице = ' + xhr.response);// xhr.responseText по старому
    get_text_requests.value = "Запросов: " + xhr.response;
  }
}

export{get_text_requests};


