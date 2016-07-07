/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 时段分析-> 订单支付
 */
'use strict';
import React, {PropTypes} from 'react';
import PeriodChart from '../../AllInfomation/components/PeriodChart';

const chartData = require("AssetsFolder/MockData/analysis/period/period_chart_data.json");
class OrderPay extends React.Component {
  render() {
    return (
      <div className="OrderPay">
        <PeriodChart labels={chartData.labels} data={chartData.orderPayData} title="订单支付 - 时段分析" />
      </div>
    );
  }
}

module.exports = OrderPay;
