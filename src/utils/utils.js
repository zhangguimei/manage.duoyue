/*
 * Created on 2016-03-17 14:57
 *
 * By Susan Su
 */

'use strict';
import ShoppingGoods from '../models/ShoppingGood';

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
  calculateTotalByGoodsArray(array = [], privilegeThreshold = 0) {
    if(!array instanceof Array) {
      throw Error("The first argument must be an array!");
    }
    if(array[0] && !array[0] instanceof ShoppingGoods) {
      throw Error("Goods detail must be class ShoppingGoods!");
    }
    let count = 0, money = 0, frei = 0, total;
    array.map((item) => {
      if(item.choosed) {
        money += parseInt(item.count, 10) * parseFloat(item.unitPrice);
        frei = parseFloat(frei) + parseFloat(item.proFreight);
        count += parseInt(item.count, 10);
      }
    });
    frei = privilegeThreshold && money >= privilegeThreshold ? 0 : frei;
    total = (money + frei).toFixed(2);
    return {
      money: money.toFixed(2),
      total: total,
      freight: frei.toFixed(2),
      count: count
    }
  },
  getOrderNumber() {
    let myDate = new Date();
    return myDate.getFullYear() + "" + myDate.getMonth() + "" + myDate.getSeconds() + Math.floor(Math.random() * 1000);
  }
};

export default Utils;