/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 时段分析-> 浏览阅读
 */
'use strict';
import React, {PropTypes} from 'react';
import PeriodChart from '../../AllInfomation/components/PeriodChart';

const chartData = require("AssetsFolder/MockData/analysis/period/period_chart_data.json");
class BrowseRead extends React.Component {
  render() {
    return (
      <div className="BrowseRead">
        <PeriodChart labels={chartData.labels} data={chartData.browseReadData} title="浏览阅读 - 时段分析" />
      </div>
    );
  }
}

module.exports = BrowseRead;
