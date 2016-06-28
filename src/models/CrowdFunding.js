"use strict";
class CrowdFunding{
  constructor(json){
    this.id = json.id || '';
    this.pic = json.pic || json.img || json.url || "";
    this.collectedNum = json.collectedNum || 0;
    this.wantedNum = json.wantedNum || 0;
    this.remainDay = json.remainDay || 0;
    this.title = json.title || "";
    this.desc = json.desc || "";
    this.like = json.like || 0;
    this.support = json.support || 0;
    this.circle = json.circle || 0;
  }
}

export default CrowdFunding;