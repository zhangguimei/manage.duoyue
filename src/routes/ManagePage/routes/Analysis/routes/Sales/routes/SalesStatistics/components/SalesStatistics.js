/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 销售统计页面
 */
'use strict';
import React, {PropTypes} from 'react';
import shouldComponentUpdate from 'UtilsFolder/shouldComponentUpdate';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Tab from 'UIComponentFolder/Tab/Tab';
import Chart from 'UIComponentFolder/Chart/Chart';
import styles from './SalesStatistics.scss';

const salesChartData = require("AssetsFolder/MockData/analysis/sales/sales_chart_data.json"),
  TabData = {
    content: ["分销与销售统计图", "分销排行"],
    tabClass: {
      tabBox: "tab-box",
      tabItemOn: "tab active",
      tabItemDefault: "tab"
    }
  },
  salesStatisticsInfo = {
    "todayTurnOver": 0,
    "todayToPay": 2,
    "totalTurnOver": 20
  },
  datePickerData = {
    format: 'yyyy-mm-dd hh:ii:ss ',
    dateValue: '2016-5-29 00:10:12',
    placeHolder: '请选择日期',
    showTimePanel: true
  },
  wechatList = [
    {
      "id": 1,
      "value": "洛克里尼"
    },
    {
      "id": 2,
      "value": "煮酒风云"
    },
    {
      "id": 3,
      "value": "吉品印象"
    }
  ];

class SalesStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      chartData: salesChartData.map(item => item.salesChartData),
      chartLabelsData: salesChartData.map(item => item.date)
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onTypeChange(index) {
    this.setState({
      tabIndex: index
    });
  }

  searchForm() {
    // 查询按钮事件
  }

  render() {
    const {chartData, chartLabelsData, tabIndex} = this.state;
    let chartLineData = {
        type: "line",
        data: {
          labels: chartLabelsData,
          datasets: [
            {
              lineTension: 0,
              backgroundColor: "transparent",
              pointBackgroundColor: "rgba( 55, 144, 206, 1)",
              data: chartData
            }
          ]
        },
        options: {
          tooltips: true
        }
      },
      chartBarData = {
        data: {
          labels: ['', '', '', '', '', '', '', '', '', ''],
          datasets: [
            {
              lineTension: 0,
              backgroundColor: "#1b91d9",
              data: ""
            }
          ]
        },
        options: {
          tooltips: false,
          responsive: true,
          scales: {
            xAxes: [{
              categoryPercentage: 0.3
            }]
          }
        }
      };

    return (
      <div className="SalesStatistics">
        <ul className="sales-detail clearfix">
          <li className="sales-detail-item left">
            <h5>{salesStatisticsInfo.todayTurnOver}</h5>
            <p>今日成交额</p>
          </li>
          <li className="sales-detail-item left">
            <h5>{salesStatisticsInfo.todayToPay}</h5>
            <p>今日待支付</p>
          </li>
          <li className="sales-detail-item left">
            <h5>{salesStatisticsInfo.totalTurnOver}</h5>
            <p>总成交金额</p>
          </li>
        </ul>
        <div className="tab-wrap">
          <span className="tab-type">关键指标详解：</span>
          <Tab TabItemsData={TabData} onTypeChange={::this.onTypeChange}/>
        </div>
        { tabIndex == 0 &&
        <div>
          <form className="form-inline search-wrap">
            <FormItem type="select" name="officialAccounts" title="公号选择：" className="form-control input-sm"
                      options={wechatList}/>
            <FormItem type="datePicker" name="startDate" data={datePickerData} title="开始时间：" name="valid-start-time"/>
            <FormItem type="datePicker" name="endDate" data={datePickerData} title="至" name="valid-end-time"/>
            <input type="submit" value="搜索" className="btn btn-primary btn-sm ml10 w80 search-btn" onClick={::this.searchForm}/>
          </form>
          <div className="chart-wrap">
            <Chart type="line" {...chartLineData}/>
          </div>
        </div>
        }
        { tabIndex == 1 &&
        <div className="chart-wrap">
          <Chart type="bar" {...chartBarData}/>
        </div>
        }
      </div>
    );
  }
}

module.exports = SalesStatistics;
