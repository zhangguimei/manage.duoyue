import React, {PropTypes} from 'react';
import {Map, is, fromJS} from 'immutable';

import Chart from '../../../UIComponent/Chart/Chart';
import DatePicker from '../../../UIComponent/DatePicker/DatePicker';
import Tab from '../../../UIComponent/Tab/Tab';
import TableTestPage from '../TableTestPage/TableTest';
import {rand} from './UserAnalysis.js';
import shouldComponentUpdate from '../../../utils/shouldComponentUpdate';
import styles from './NewsOrder.scss';

class NewsOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: rand(1000, 100, 5)
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onTypeChangeLook() {
    this.setState({
      chartData: rand(1000, 100, 5)
    });
  }

  getPickedDate(info) {
    //console.log(info);
  }

  render() {
    const {chartData} = this.state;
    let TabData = {
      content: ['点击量', '阅读时长'],
      tabClass: {
        tabBox: "tab-box",
        tabItemOn: "tab active",
        tabItemDefault: "tab"
      }
    };
    let chartsData = {
      type: 'bar',
      data: {
        labels: chartData,
        datasets: [
          {
            data: chartData,
            backgroundColor: '#1b91d9'
          }
        ]
      },
      options: {
        tooltips: false,
        responsive: true,
        scales: {
          xAxes: [{
            categoryPercentage: 0.2
          }]
        }
      }
    };
    return (
      <div className="NewsOrder animated rotateIn">
        <header className="page-header">用户阅读活跃度排行榜</header>
        <section className="page-body clearfix">
          <div className="control-box left">
            <h3 className="title">请选择查询时间</h3>
            <div className="date-box">
              <span className="desc">开始时间：</span>
              <DatePicker getPickDate={::this.getPickedDate}/>
            </div>
            <div className="date-box">
              <span className="desc">结束时间：</span>
              <DatePicker getPickDate={::this.getPickedDate}/>
            </div>
            <span className="search-btn btn" onClick={::this.onTypeChangeLook}>查询</span>
            <div className="tab-wrap">
              <span className="desc">查看类型</span>
              <Tab TabItemsData={TabData} onTypeChange={::this.onTypeChangeLook}/>
            </div>
            <div className="tab-wrap">
              <span className="desc">阅读类型</span>
              <Tab TabItemsData={TabData} onTypeChange={::this.onTypeChangeLook}/>
            </div>
          </div>
          <div className="chart-wrap left">
            <Chart {...chartsData}/>
          </div>
          <div className="table-wrap">
            <TableTestPage/>
          </div>
        </section>
      </div>
    )
  }
}

export default NewsOrder;