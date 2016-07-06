/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-展示范围-资讯设置
 */
'use strict';
import React from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import styles from './ColumnSetting.scss';

const columnSettingData = require("AssetsFolder/MockData/operate/display/columnSetting_data.json");

class ColumnSetting extends React.Component {
  render() {
    return (
      <div className="ColumnSetting">
        <Tree data={columnSettingData.TreeData} checkable/>
      </div>
    );
  }
}

module.exports = ColumnSetting;