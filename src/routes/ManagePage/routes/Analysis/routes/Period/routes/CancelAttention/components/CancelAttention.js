/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 时段分析-> 取消关注
 */
'use strict';
import React, {PropTypes} from 'react';
import PeriodChart from '../../AllInfomation/components/PeriodChart';

const chartData = require("AssetsFolder/MockData/analysis/period/period_chart_data.json");
class CancelAttention extends React.Component {
  render() {
    return (
      <div className="CancelAttention">
        <PeriodChart labels={chartData.labels} data={chartData.cancelAttentionData} title="取消关注 - 时段分析" />
      </div>
    );
  }
}

module.exports = CancelAttention;
