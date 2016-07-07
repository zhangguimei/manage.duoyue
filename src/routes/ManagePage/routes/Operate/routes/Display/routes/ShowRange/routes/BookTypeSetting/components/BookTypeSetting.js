/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-展示范围-书籍设置
 */
'use strict';
import React from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import styles from './BookTypeSetting.scss';

const bookSettingData = require("AssetsFolder/MockData/operate/display/bookTypeSetting_data.json");

class BookTypeSetting extends React.Component {
  render() {
    return (
      <div className="BookTypeSetting">
        <Tree data={bookSettingData.TreeData} checkable/>
      </div>
    );
  }
}

module.exports = BookTypeSetting;