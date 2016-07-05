/*
 *  Date    : 2016.7.5
 *  Author  : Zhang Guimei
 *  Declare : 用户增长页面
 */
'use strict';
import React, {PropTypes}  from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Tab from 'UIComponentFolder/Tab/Tab';
import Chart from 'UIComponentFolder/Chart/Chart';
import styles from './UserGrowth.scss';

const userGrowthChartData = require("AssetsFolder/MockData/analysis/user/user_growth_chart_data.json"),
  TabData = {
    content: ["粉丝统计图"],
    tabClass: {
      tabBox: "tab-box",
      tabItemOn: "tab active",
      tabItemDefault: "tab"
    }
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

class UserGrowth extends React.Component {
  onTypeChange(type) {
    // 关键指标详解Tab切换
  }

  searchForm() {
    // 查询按钮事件
  }

  render() {
    let chartLineData = {
      type: "line",
      width: "900",
      height: "400",
      data: {
        labels: userGrowthChartData.labels,
        datasets: [
          {
            label: "用户总数",
            lineTension: 0,
            backgroundColor: "transparent",
            pointBackgroundColor: "rgba( 255, 0, 0, 1)",
            borderColor: "rgba( 255, 0, 0, 1)",
            data: userGrowthChartData.allUser
          },
          {
            label: "新增关注",
            lineTension: 0,
            backgroundColor: "transparent",
            pointBackgroundColor: "rgba( 46, 145, 218, 1)",
            borderColor: "rgba( 46, 145, 218, 1)",
            data: userGrowthChartData.newUser
          },
          {
            label: "取消关注",
            lineTension: 0,
            backgroundColor: "transparent",
            pointBackgroundColor: "rgba( 108, 189, 61, 1)",
            borderColor: "rgba( 108, 189, 61, 1)",
            data: userGrowthChartData.lossUser
          }
        ],
      },
      options: {
        legend: {
          display: true
        }
      }
    };
    return (
      <div className="UserGrowth">
        <div className="tab-wrap">
          <span className="tab-type inline-block">关键指标详解:</span>
          <Tab TabItemsData={TabData} onTypeChange={::this.onTypeChange}/>
        </div>
        <form className="form-inline search-wrap">
          <FormItem type="select" name="officialAccounts" title="公号选择：" className="form-control input-sm"
                    options={wechatList}/>
          <FormItem type="datePicker" name="startDate" data={datePickerData} title="开始时间：" name="valid-start-time"/>
          <FormItem type="datePicker" name="endDate" data={datePickerData} title="至" name="valid-end-time"/>
          <input type="submit" value="搜索" className="btn btn-primary btn-sm ml10 w80 search-btn"
                 onClick={::this.searchForm}/>
        </form>
        <div className="chart-wrap left">
          <Chart type="bar" {...chartLineData}/>
        </div>
      </div>
    )
  }
}

module.exports = UserGrowth;