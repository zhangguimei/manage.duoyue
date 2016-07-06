/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-智能客服-客服列表
 */
'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import styles from './CustomerList.scss';

const customerListData = require("AssetsFolder/MockData/operate/customerservice/customerlist_data.json"),
  tableHeadData = {
    "id": "ID",
    "customerId": "客服ID",
    "customerName": "橱窗名称",
    "customerWeChat": "橱窗代码",
    "customerAccount": "包含商品"
  };
class CustomerList extends React.Component {
  onClick() {
    if (confirm("您确定要选择模板并更新吗?")) {

    }
  }

  render() {
    return (
      <div className="CustomerList">
        <form className="form-inline form">
          <div className="form-group form-group-sm">
            <label>关键字&nbsp;&nbsp;</label>
            <input type="text" className="form-control"/>
          </div>
          <input type="submit" className="btn btn-primary btn-sm ml10 w80"/>
          <input type="button" className="btn btn-primary btn-sm ml10 w150 right" value="同步客服信息"
                 onClick={::this.onClick}/>
        </form>
        <div className="customer-table">
          <Table contentData={customerListData} headData={tableHeadData}/>
        </div>
      </div>
    )
  }
}

module.exports = CustomerList;