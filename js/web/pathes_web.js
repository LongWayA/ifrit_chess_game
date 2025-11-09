/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name pathes_web.js
 * @version created 12.09m.2025 
 * last modified 12.09m.2025
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

let PathesWeb_R = {

      NAME: "PathesWeb_R",

      HOME: 1,
      SERVER: 2,

      //isServer:true,
      isServer:false,
      pathesState: 0, // 

// counter.js

       //counter_js_isA20:true,
      counter_js_isA20:false,       
      counter_js_counterGet: 'no',

      iniM() {

            //console.log('PathesWeb_R->iniM');

            if (PathesWeb_R.isServer){ 
                  PathesWeb_R.pathesState = PathesWeb_R.SERVER;
            } else {
                   PathesWeb_R.pathesState = PathesWeb_R.HOME;
            }

            if (PathesWeb_R.pathesState == PathesWeb_R.HOME) {

                  //PathesWeb_R.counterGet_counter_js = '/0_0_SQL_base/CountRequestsGet.php/?name=requests_double_shadow';
				  PathesWeb_R.counter_js_counterGet = '../0_0_SQL_base/test.php';

            } else if (PathesWeb_R.pathesState == PathesWeb_R.SERVER) {

               PathesWeb_R.counter_js_counterGet = 'https://alphagameset.ru/0_0_SQL_base/CountRequestsGet.php/?name=requests_ifrit_chess_game';

            }

      },
};

PathesWeb_R.iniM();

export{PathesWeb_R};