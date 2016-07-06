/*
 *  Date    : 2016.7.5
 *  Author  : Zhang Guimei
 *  Declare : 时段分析曲线图
 */
'use strict';
import React, {PropTypes} from 'react';
import Chart from 'UIComponentFolder/Chart/Chart';
import styles from './PeriodChart.scss';

class PeriodChart extends React.Component {
  render() {
    const {labels, data, title} = this.props;
    const chartLineData = {
      type: "line",
      height: 310,
      data: {
        labels: labels,
        datasets: [
          {
            lineTension: 0.5,
            backgroundColor: "rgba(55, 144, 206, 0.6)",
            pointBackgroundColor: "rgba(55, 144, 206, 0.75)",
            data: data
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
    return (
      <div className="PeriodChart">
        <h3>{title}</h3>
        <div className="chart-wrap">
          <Chart {...chartLineData}/>
        </div>
      </div>
    );
  }
}

PeriodChart.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
  title: PropTypes.string
};
module.exports = PeriodChart;
