/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 时段分析-> 自然关注
 */
'use strict';
import React, {PropTypes} from 'react';
import PeriodChart from '../../AllInfomation/components/PeriodChart';

const chartData = require("AssetsFolder/MockData/analysis/period/period_chart_data.json");
class NatureAttention extends React.Component {
  render() {
    return (
      <div className="NatureAttention">
        <PeriodChart labels={chartData.labels} data={chartData.natureAttentionData} title="自然关注 - 时段分析" />
      </div>
    );
  }
}

module.exports = NatureAttention;
