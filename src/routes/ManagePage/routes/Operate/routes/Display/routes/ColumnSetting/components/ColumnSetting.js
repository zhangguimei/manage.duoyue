/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-发票选项
 */
'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import FixBottom from 'UIComponentFolder/FixBottom/FixBottom';
import styles from './ColumnSetting.scss';

const viewRangeData = require("AssetsFolder/MockData/operate/display/viewRange_data.json"),
  tableHeadData = {
    "columnName": "栏目名称",
    "definedNameo": "自定义名称",
    "ranko": "排序值",
    "whetherShow": "是否展示",
    "detailPagesState": "详情页引导",
    "colunmUrl": "栏目URL"
  },
  whetherShowData = [
    {
      "name": "展示"
    },
    {
      "name": "关闭"
    }
  ];

class ColumnSetting extends React.Component {
  render() {
    let option = whetherShowData.map((ip, i) => {
      return (
        <option value={ip.name} key={i}>{ip.name}</option>
      )
    });
    viewRangeData.tableContentData.map((item) => {
      item.definedNameo = <input type="text" className="form-control input-sm w60" defaultValue={item.definedName}/>;
      item.ranko = <input type="text" className="form-control input-sm w60" defaultValue={item.rank}/>;
      item.whetherShow = <select className="form-control input-sm" defaultValue={ item.whetherShow}>
        {option}
      </select>;
      item.detailPagesState = <select className="form-control input-sm" defaultValue={ item.detailPagesState}>
        {option}
      </select>;
    });
    return (
      <div className="ColumnSetting">
        <Table className="table-left" contentData={viewRangeData.tableContentData} headData={tableHeadData}/>
        <FixBottom>
          <input className="btn btn-primary w100" type="button" value="确定"/>
        </FixBottom>
      </div>
    );
  }
}

module.exports = ColumnSetting;