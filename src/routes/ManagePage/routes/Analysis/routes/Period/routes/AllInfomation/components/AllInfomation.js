/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 时段分析-> 全部内容
 */
'use strict';
import React, {PropTypes} from 'react';
import PeriodChart from './PeriodChart';

const chartData = require("AssetsFolder/MockData/analysis/period/period_chart_data.json");
class AllInfomation extends React.Component {
  render() {
    return (
      <div className="AllInfomation">
        <PeriodChart labels={chartData.labels} data={chartData.allData} title="全部内容 - 浏览时段分析"/>
      </div>
    );
  }
}

module.exports = AllInfomation;
