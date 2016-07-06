/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-展示范围-资源设置
 */

'use strict';
import React from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import styles from './SourceTypeSetting.scss';

const SourceTypeSettingData = require("AssetsFolder/MockData/operate/display/sourceTypeSetting_data.json");

class SourceTypeSetting extends React.Component {
  render() {
    return (
      <div className="SourceTypeSetting">
        <Tree data={SourceTypeSettingData.TreeData} checkable/>
      </div>
    );
  }
}

module.exports = SourceTypeSetting;