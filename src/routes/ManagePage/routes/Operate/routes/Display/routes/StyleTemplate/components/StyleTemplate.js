/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-风格模板
 */

'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import styles from './StyleTemplate.scss';

const templateData = require("AssetsFolder/MockData/operate/display/wechatDemo_data.json"),
  tableHeadData =  {
  "id": "#",
  "demoName": "模版名称",
  "publishData": "模版发布日期",
  "updateData": "微信更新日期",
  "useState": "使用状态",
  "operation": "操作"
};

class StyleTemplate extends React.Component {
  clickUpdate() {
    if(confirm("您确定要选择模板并更新吗?")){

    }
  }
  
  render() {
    templateData.tableContentData.map((item) => {
      item.operation = <a href="javascript:;" onClick={::this.clickUpdate}>选择并更新</a>
    });
    return (
      <div className="StyleTemplate">
        <Table className="table-left" contentData={templateData.tableContentData} headData={tableHeadData}/>
      </div>
    )
  }
}

module.exports = StyleTemplate;