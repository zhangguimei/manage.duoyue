/*
 * Created on 2016-03-17 14:57
 *
 * By Susan Su
 */

'use strict';

const Utils = {
  bindMethods(thisObject, ...methods) {
    methods.forEach((method)=> {
      thisObject[method] = thisObject[method].bind(thisObject);
    });
  },
  timeFormat(time) {
    let hours, minutes, seconds;
    let intTime = Math.floor(time);
    hours = Math.floor(intTime / 3600);
    minutes = Math.floor(intTime / 60 % 60);
    seconds = intTime % 60;
    return {
      hours: hours,
      minutes: (minutes > 9) ? minutes : "0" + minutes,
      seconds: (seconds > 9) ? seconds : "0" + seconds
    }
  },
  getOrderNumber() {
    let myDate = new Date();
    return myDate.getFullYear() + "" + myDate.getMonth() + "" + myDate.getSeconds() + Math.floor(Math.random() * 1000);
  },
  getSizeByByte(size) {
    if (typeof size != "number") {
      throw Error("Argument Must Be A Number")
    }
    const KBUNIT = "KB", MBUNIT = "MB", UNITSIZE = 1024;
    let
      kb = size / UNITSIZE,
      mb = size / (UNITSIZE * UNITSIZE);
    return mb > 0.01 ? parseFloat(mb).toFixed(2) + MBUNIT : parseFloat(kb).toFixed(2) + KBUNIT;
    //return parseFloat(mb).toFixed(2) + MBUNIT;
  },
  compareTime(start, end) {
    start = +new Date(start);
    end = +new Date(end);
    return (end - start) > 0;
  }
};

export default Utils;