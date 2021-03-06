"use strict";
class CrowdFundingDetail {
  constructor(json) {
    this.id = json.id || '';
    this.userName = json.userName || '';
    this.userID = json.userID || '';
    this.cellPhone = json.cellPhone || '';
    this.startTime = json.startTime || '';
    this.endTime = json.endTime || '';
    this.detail = json.detail || '';
    this.pic1 = json.pic1 || json.img1 || json.url1 || "";
    this.pic2 = json.pic2 || json.img2 || json.url2 || "";
    this.pic3 = json.pic3 || json.img3 || json.url3 || "";
    this.wantedNum = json.wantedNum || 0;
    this.remainDay = json.remainDay || 0;
    this.title = json.title || "";
    this.desc = json.desc || "";
    this.repayList = CrowdFundingDetail.createRepayList(json.repayList) || [];
  }

  static createRepayList = (list) => {
    if(!list) {
      return;
    }
    return list.map((item) => {
      return new Repay(item);
    });
  }
}

class Repay {
  constructor(json) {
    this.id = json.id || 0;
    this.pic = json.pic || "";
    this.supportNum = json.supportNum || 0;
    this.freight = json.freight || 0;
    this.limit = json.limit || 0;
    this.repayTime = json.repayTime || "";
    this.repayDetail = json.repayDetail || "";
  }
}

export default CrowdFundingDetail;