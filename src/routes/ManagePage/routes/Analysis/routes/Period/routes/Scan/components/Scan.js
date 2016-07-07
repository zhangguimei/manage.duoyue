/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 时段分析-> 扫一扫
 */
'use strict';
import React, {PropTypes} from 'react';
import PeriodChart from '../../AllInfomation/components/PeriodChart';

const chartData = require("AssetsFolder/MockData/analysis/period/period_chart_data.json");
class Scan extends React.Component {
  render() {
    return (
      <div className="Scan">
        <PeriodChart labels={chartData.labels} data={chartData.scanData} title="扫一扫 - 时段分析（不包括第一次扫码关注）" />
      </div>
    );
  }
}

module.exports = Scan;
