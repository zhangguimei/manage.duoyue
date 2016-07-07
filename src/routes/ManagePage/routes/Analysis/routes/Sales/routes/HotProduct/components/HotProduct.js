/*
 *  Date    : 2016.7.4
 *  Author  : Zhang Guimei
 *  Declare : 热销商品页面
 */
'use strict';
import React, {PropTypes} from 'react';
import shouldComponentUpdate from 'UtilsFolder/shouldComponentUpdate';
import Chart from 'UIComponentFolder/Chart/Chart';
import Tab from 'UIComponentFolder/Tab/Tab';
import Table from 'UIComponentFolder/Table/Table';
import styles from './HotProduct.scss';

const hotProductListData = require("AssetsFolder/MockData/analysis/sales/hot_product_list_data.json"),
  labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  TabData = {
    content: ["销售量", "销售金额"],
    tabClass: {
      tabBox: "tab-box",
      tabItemOn: "tab active",
      tabItemDefault: "tab"
    }
  };

class HotProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: hotProductListData.tableContentData.slice(0, 10).map(item => item.salesVolume)
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onTypeChange(type) {
    let tempChartData;
    switch (type) {
      case 0:
        tempChartData = hotProductListData.tableContentData.slice(0, 10).map(item => item.salesVolume);
        break;
      case 1:
        tempChartData = hotProductListData.tableContentData.slice(0, 10).map((item) => {
          let str = item.salesAmount, len = str.length;
          if(str) {
            return str.slice(0, len - 1)
          }
        });
        break;
      default:
        tempChartData = hotProductListData.tableContentData.slice(0, 10).map(item => item.salesVolume);
    }
    this.setState({
      chartData: tempChartData
    });
  }

  render() {
    const {chartData} =this.state;
    const tempChartData = {
      width: 900,
      height: 400,
      data: {
        labels: labels,
        datasets: [
          {
            lineTension: 0,
            data: chartData,
            backgroundColor: "#1b91d9"
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
      <div className="HotProduct">
        <div className="tab-wrap">
          <strong className="tab-type">类型</strong>
          <Tab TabItemsData={TabData} onTypeChange={::this.onTypeChange}/>
        </div>
        <div className="chart-wrap">
          <Chart type="bar" className="chart-zg" {...tempChartData}/>
        </div>
        <div className="table-wrap">
          <Table className="book-browse-history" headData={hotProductListData.tableHeadData}
                 contentData={hotProductListData.tableContentData}/>
        </div>
      </div>
    );
  }
}

module.exports = HotProduct;
