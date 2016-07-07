/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 时段分析-> 分享内容
 */
'use strict';
import React, {PropTypes} from 'react';
import PeriodChart from '../../AllInfomation/components/PeriodChart';

const chartData = require("AssetsFolder/MockData/analysis/period/period_chart_data.json");
class ShareContent extends React.Component {
  render() {
    return (
      <div className="ShareContent">
        <PeriodChart labels={chartData.labels} data={chartData.shareContentData} title="内容分享 - 时段分析" />
      </div>
    );
  }
}

module.exports = ShareContent;
