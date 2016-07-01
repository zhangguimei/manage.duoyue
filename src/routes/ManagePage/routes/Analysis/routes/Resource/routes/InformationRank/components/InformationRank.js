/*
 *  Date    : 2016.7.1
 *  Author  : Zhang Guimei
 *  Declare : 资讯排行页面
 */
'use strict';
import React, {PropTypes} from 'react';
import shouldComponentUpdate from 'UtilsFolder/shouldComponentUpdate';
import Tab from 'UIComponentFolder/Tab/Tab';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Chart from 'UIComponentFolder/Chart/Chart';
import Table from 'UIComponentFolder/Table/Table';
import styles from './InformationRank.scss';

const clickVolumeTableData = require("AssetsFolder/MockData/analysis/resource/information_click_volume_data.json"),
  readLengthTableData = require("AssetsFolder/MockData/analysis/resource/information_reading_length_data.json"),
  TabViewData = {
    content: ['点击量', '阅读时长'],
    tabClass: {
      tabBox: "tab-box",
      tabItemOn: "tab active",
      tabItemDefault: "tab"
    }
  }, TabReadData = {
    content: ['资讯'],
    tabClass: {
      tabBox: "tab-box",
      tabItemOn: "tab active",
      tabItemDefault: "tab"
    }
  };

class InformationRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headData: clickVolumeTableData.tableHeadData,
      contentData: clickVolumeTableData.tableContentData,
      chartData: this.createChartData(clickVolumeTableData.tableContentData),
      changeTableData: true
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  createChartData(data) {
    return data.slice(0, 5).map((item) => {
      let str = item.readTimes || item.readDuration, len = str.length;
      if(str) {
        return str.slice(0, len - 1);
      }
    })
  }

  onTypeChangeView(id) {
    let tempHeadArr, tempContentArr, tempChartData;
    switch (id) {
      case 0:
        tempHeadArr = clickVolumeTableData.tableHeadData;
        tempContentArr = clickVolumeTableData.tableContentData;
        tempChartData = this.createChartData(tempContentArr);
        break;
      case 1:
        tempHeadArr = readLengthTableData.tableHeadData;
        tempContentArr = readLengthTableData.tableContentData;
        tempChartData = this.createChartData(tempContentArr);
        break;
      default:
        tempHeadArr = tempHeadArr;
        tempContentArr = clickVolumeTableData.tempContentArr;
    }
    this.setState({
        headData: tempHeadArr,
        contentData: tempContentArr,
        chartData: tempChartData,
        changeTableData: false
      }, () => this.setState({
        changeTableData: true
      })
    );
  }

  onTypeChangeRead() {
    //阅读类型Tab切换函数接口
  }

  submitSearchForm() {
    // 查询按钮事件
  }

  render() {
    const {chartData, headData, contentData, changeTableData} = this.state,
      datePickerData = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: '2016-5-29 00:10:12',
        placeHolder: '请选择日期',
        showTimePanel: true
      };
    const tempChartData = {
      width: 600,
      height: 400,
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            lineTension: 0,
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
            categoryPercentage: 0.3
          }]
        }
      }
    };
    return (
      <div className="InformationRank">
        <div className="clearfix">
          <div className="filter-area left">
            <h3 className="choose-time">请选择查询时间</h3>
            <form className="choose-time-form form-horizontal form-horizontal-lg">
              <FormItem type="datePicker" data={datePickerData} title="开始时间:" name="valid-start-time"/>
              <FormItem type="datePicker" data={datePickerData} title="结束时间:" name="valid-end-time"/>
              <button className="btn btn-primary w80" onClick={::this.submitSearchForm}>查询</button>
            </form>
            <div className="tab-wrap">
              <span className="desc">查看类型：</span>
              <Tab TabItemsData={TabViewData} onTypeChange={::this.onTypeChangeView}/>
            </div>
            <div className="tab-wrap">
              <span className="desc">阅读类型：</span>
              <Tab TabItemsData={TabReadData} onTypeChange={::this.onTypeChangeRead}/>
            </div>
          </div>
          <div className="chart left">
            <Chart type="bar" {...tempChartData}/>
          </div>
        </div>
        <div className="table-wrap">
          {
            changeTableData &&
            <Table className="book-browse-history" headData={headData} contentData={contentData}/>
          }
        </div>
      </div>
    );
  }
}

module.exports = InformationRank;
