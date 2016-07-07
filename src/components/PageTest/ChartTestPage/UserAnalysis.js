import React, {PropTypes} from 'react';
import {Map, is, fromJS} from 'immutable';
import shouldComponentUpdate from '../../../utils/shouldComponentUpdate';
import styles from './UserAnalysis.scss';

import Chart from '../../../UIComponent/Chart/Chart';
import Tab from '../../../UIComponent/Tab/Tab';

export const rand = (max, min, num) => {
  let rtn = [];
  while (rtn.length < num) {
    rtn.push((Math.random() * (max - min)).toFixed(2));
  }
  return rtn;
};

let randData = rand(100, 25, 30);
class UserAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: randData
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onTypeChange(index) {
    let start = 0, end = randData.length;
    let showData = fromJS(randData);
    if (index >= 0) {
      switch (index) {
        case 0:
          start = -7;
          break;
        case 1:
          start = -14;
          break;
        case 2:
          start = 0;
          break;
        default:
          break;
      }
      showData = showData.slice(start, end).toJS();
      this.setState({
        chartData: showData
      });
    }
  }

  render() {
    const {chartData} = this.state;
    console.log(chartData)
    let TabData = {
      content: ['7日', '14日', '30日'],
      tabClass: {
        tabBox: "tab-box",
        tabItemOn: "tab active",
        tabItemDefault: "tab"
      }
    };
    let chartsData = {
      type: 'line',
      data: {
        labels: chartData,
        datasets: [
          {
            lineTension: 0,
            backgroundColor: 'transparent',
            pointBackgroundColor: 'rgba(74, 154, 211, 1)',
            data: chartData
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          time: {},
          xAxes: [{
            stacked: false
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    };
    return (
      <div className="UserAnalysis clearfix animated lightSpeedIn">
        <header className="page-header">粉丝增长统计图</header>
        <section className="page-body">
          <header className="body-header">
            <span>关键指标详解: </span>
            <span className="info-btn">粉丝统计图</span>
          </header>
          <div className="tab-wrap">
            <span className="tab-title">时间:</span>
            <Tab TabItemsData={TabData} onTypeChange={::this.onTypeChange} typeIndex={-1}/>
          </div>
          <div className="chart-wrap">
            <Chart {...chartsData}/>
          </div>
        </section>
      </div>
    );
  }
}
export default UserAnalysis;
