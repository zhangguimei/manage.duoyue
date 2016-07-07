/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-微信二维码点击配置-基本消息
 */

'use strict';
import React,{PropTypes} from 'react';
import {fromJS, toJS, merge} from 'immutable';
import Chart from 'UIComponentFolder/Chart/Chart'
import LocationMap from 'UIComponentFolder/Map/LocationMap';
import styles from './WeiXinQRcode.scss';

class BasicInfo extends React.Component {
  render() {
    const {data} = this.props,
      iMapData = fromJS(data.mapData),
      iMapTotalData = iMapData,
      mapTotalData = iMapTotalData.toJS(),
      chartTotalData = {
        data: {
          labels: data.chartData.labels,
          datasets: [
            {
              lineTension: 0,
              data: data.chartData.data
            }
          ]
        },
        options: {
          responsive: true,
          barShowStroke: false,
          maintainAspectRatio: false
        }
      };
    return (
      <div className="BasicInfo">
        <div className="row">
          <div className="col-sm-6">
            <h5 className="mb5">30天浏览量趋势</h5>
            <div className="chart-box">
              <Chart type="line" {...chartTotalData}/>
            </div>
          </div>
          <div className="col-sm-6">
            <h5 className="mb5">最近地理位置</h5>
            <LocationMap id="LocationMap" data={mapTotalData} style={{height:352,border:'1px solid #ddd'}}/>
          </div>
        </div>
      </div>
    )
  }
}

BasicInfo.propsType = {
  data: PropTypes.object
};

export default BasicInfo;