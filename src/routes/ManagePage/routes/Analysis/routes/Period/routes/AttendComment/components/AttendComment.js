/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 时段分析-> 参与评论
 */
'use strict';
import React, {PropTypes} from 'react';
import PeriodChart from '../../AllInfomation/components/PeriodChart';

const chartData = require("AssetsFolder/MockData/analysis/period/period_chart_data.json");
class AttendComment extends React.Component {
  render() {
    return (
      <div className="AttendComment">
        <PeriodChart labels={chartData.labels} data={chartData.attendCommentData} title="参与评论 - 时段分析" />
      </div>
    );
  }
}

module.exports = AttendComment;
