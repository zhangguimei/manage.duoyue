/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-智能客服-聊天记录
 */

'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import styles from './ChattingRecords.scss';

const chattingrecordsData = require("AssetsFolder/MockData/operate/customerservice/chattingrecords_data.json"),
  tableHeadData = {
    "id": "ID",
    "customerId": "客服ID",
    "userName": "用户",
    "customer": "客服",
    "chatContent": "内容",
    "chatDate": "时间"
  };

class ChattingRecords extends React.Component {
  onClick() {
    if (confirm("您确定要同步聊天记录吗?一般需要1-3分钟！")) {

    }
  }

  render() {
    return (
      <div className="ChattingRecords">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group form-group-sm">
              <label>关键字：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary btn-sm w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w120 ml20" onClick={::this.onClick}
                   value="同步聊天记录"/>
          </div>
        </div>
        <div className="chatting-table">
          <Table className="table-left" contentData={chattingrecordsData} headData={tableHeadData}/>
        </div>
      </div>
    )
  }
}

module.exports = ChattingRecords;