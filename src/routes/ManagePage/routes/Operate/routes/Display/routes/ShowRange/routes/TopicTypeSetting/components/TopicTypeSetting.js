/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-展示范围-专题设置
 */
'use strict';
import React from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import styles from './TopicTypeSetting.scss';

const topicTypeSettingData = require("AssetsFolder/MockData/operate/display/topicSetting_data.json");

class TopicTypeSetting extends React.Component {
  render() {
    return (
      <div className="TopicTypeSetting">
        <Tree data={topicTypeSettingData.TreeData} checkable/>
      </div>
    );
  }
}

module.exports = TopicTypeSetting;