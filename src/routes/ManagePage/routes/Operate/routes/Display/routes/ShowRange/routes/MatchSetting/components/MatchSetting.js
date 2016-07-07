/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-展示范围-报名设置
 */
'use strict';
import React from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import styles from './MatchSetting.scss';

const matchSettingData = require("AssetsFolder/MockData/operate/display/matchSetting_data.json");

class MatchSetting extends React.Component {
  render() {
    return (
      <div className="MatchSetting">
        <Tree data={matchSettingData.TreeData} checkable/>
      </div>
    );
  }
}

module.exports = MatchSetting;