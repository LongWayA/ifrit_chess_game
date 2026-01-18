// @ts-check
/** 
 * @copyright Copyright (c) 2025, AnBr75 and/or its affiliates. All rights reserved.
 * @author AnBr75
 * @name timer.js
 * @version created 18.07m.2025 
*/

/**
 * НАЗНАЧЕНИЕ
 *  
 *  
*/

class Timer_C {
    static NAME = "Timer_C";

    // пустой тик выполняется не быстрее 5 мс, т.е. максимальный фпс выдаваемый браузером это 200
    static TICKS_PER_SECOND_02 = 0.2;// 1 ticks per 5 sec
    static TICKS_PER_SECOND_05 = 0.5;// 1 ticks per 2 sec
    static TICKS_PER_SECOND_1 = 1;// 1 ticks per 1 sec
    static TICKS_PER_SECOND_2 = 2;
    static TICKS_PER_SECOND_3 = 3;
    static TICKS_PER_SECOND_4 = 4;
    static TICKS_PER_SECOND_5 = 5;
    static TICKS_PER_SECOND_6 = 6;
    static TICKS_PER_SECOND_7 = 7;
    static TICKS_PER_SECOND_8 = 8;
    static TICKS_PER_SECOND_9 = 9;
    static TICKS_PER_SECOND_10 = 10;
    static TICKS_PER_SECOND_15 = 15;
    static TICKS_PER_SECOND_20 = 20;
    static TICKS_PER_SECOND_30 = 30;
    static TICKS_PER_SECOND_40 = 40;
    static TICKS_PER_SECOND_50 = 50;
    static TICKS_PER_SECOND_60 = 60;
    static TICKS_PER_SECOND_62 = 62;
    static TICKS_PER_SECOND_70 = 70;

    // 1000 задержка в секунду. т.е тысяча милисекунд это секунда
    // 60 кадров это 0,01(6) sek = 16,(6) millis
    // 30 кадров это 0,03(3) sek = 30,(3) millis
    // 25 кадров это 0,04 sek = 40 millis
    // 10 кадров это 0,1 sek = 100 millis

    ticksPerSecond = 0;
    tick_timeNeedOnAllMs = 0;// время отведенное на один тик
    tick_timeStartMs = 0;// фиксируем время начала тика
    tick_OldTimeStartMs = 0;// время начала предыдущего тика, нужно для вычисления времени полного круга цикла   
    tick_timeEndMs = 0;// фиксируем время конца тика
    tick_timeEndMs_minus_timeStartMs = 0;// время тика, в это время идет обсчет и отрисовка игры
    tick_timeThreadSleepGameMs = 0;// время бездействия потока игры, мы все сделали и оставшееся время бездействуем
    tick_OldTimeStartMs_minus_timeStartMs = 0;// время прошедшее за полный круг цикла игры
    currentTimeMs = 0;

    constructor() {
    }

    iniM() {
        this.iniTicksPerSecond(Timer_C.TICKS_PER_SECOND_05);
    }
    /**
     * обновляется только в одном месте цикла игры
     * в главном цикле окна перед всеми вычислениями и выводами
     * именно здесь вычисляем промежуток времени прошедший за весь цикл
     * включая и время сна
     * это время должно стремиться к tickMustTimeMs = 1000 /(long)ticksPerSecond
     * например если ticksPerSecond зададим 60 в сек
     * то получим tickMustTimeMs = 16,(6)  msec
     * если ticksPerSecond = 30  в сек
     * получим tickMustTimeMs = 33,(3) msec
    */
    updateTimeBeforeTick() {
        this.tick_OldTimeStartMs = this.tick_timeStartMs;
        this.tick_timeStartMs = (new Date).getTime();
        // получаем время которое ушло на полный цикл игры
        this.tick_OldTimeStartMs_minus_timeStartMs = this.tick_timeStartMs - this.tick_OldTimeStartMs;
    }
    /**
      * timeAfterTickMs время потраченное на один тик игры
      * тут мы не учитываем время сна
      * высчитываем время сколько мы должны спать для того что бы получить
      * нужное время одного цикла а это tickMustTimeMs
      * если время сна timeSleepGame_RMs оказывается отрицательным или просто меньше 10
      * то делаем его 10
      * отрицательное когда задержка в цикле больше чем отведено на цикл
    */
    updateTimeAfterTick() {
        this.tick_timeEndMs = (new Date).getTime();
        //время ушедшее на реализацию одного тика игры
        this.tick_timeEndMs_minus_timeStartMs = this.tick_timeEndMs - this.tick_timeStartMs;
        this.tick_timeThreadSleepGameMs = this.tick_timeNeedOnAllMs - this.tick_timeEndMs_minus_timeStartMs;
        this.tick_timeThreadSleepGameMs = (this.tick_timeThreadSleepGameMs < 10) ? 10 : this.tick_timeThreadSleepGameMs;
    }
    // стартовая инициализация таймера
    /**
    * @param {number} ticksPerSecond
    * @returns {void}
    */
    iniTicksPerSecond(ticksPerSecond) {
        this.ticksPerSecond = ticksPerSecond;
        //тысяча милисекунд это секунда
        this.tick_timeNeedOnAllMs = 1000 / this.ticksPerSecond;
        //console.log('Timer-> iniTicksPerSecond = ' + ticksPerSecond);
    }

    getTickTimeOnAllMs() {
        return this.tick_timeNeedOnAllMs;
    }

    getTickTimeStartMs() {
        return this.tick_timeStartMs;
    }

    getTickTimeEndMs() {
        return this.tick_timeEndMs;
    }

    getTickTimeEndMsMinusTimeStartMs() {
        return this.tick_timeEndMs_minus_timeStartMs;
    }

    getTickTimeThreadSleepGameMs() {
        return this.tick_timeThreadSleepGameMs;
    }

    getTickOldTimeStartMs() {
        return this.tick_OldTimeStartMs;
    }
    getTickOldTimeStartMinusTimeStartMs() {
        return this.tick_OldTimeStartMs_minus_timeStartMs;
    }

    getCurrentTimeMs() {
        this.currentTimeMs = (new Date).getTime();
        return this.currentTimeMs;
    }
}

export{Timer_C};