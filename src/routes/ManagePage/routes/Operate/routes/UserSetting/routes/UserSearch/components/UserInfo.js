/*
 *  Project : User Setting
 *  Date    : 2016/6/30
 *  Author  : Melody Yuen
 *  Declare : UserInfo
 */

'use strict';
import React from 'react';
import {fromJS, toJS, merge} from 'immutable';
import Chart from 'UIComponentFolder/Chart/Chart'
import LocationMap from 'UIComponentFolder/Map/LocationMap';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import styles from './UserSearch.scss';

class UserInfo extends React.Component {
  render() {
    const {tabData:{chartData, mapData, extend}, basicData} = this.props;
    const iMapData = fromJS(mapData),
      iBasicData = fromJS(basicData),
      iMapTotalData = iMapData.merge(iBasicData),
      mapTotalData = iMapTotalData.toJS(),
      chartTotalData = {
        data: {
          labels: chartData.labels,
          datasets: [
            {
              lineTension: 0,
              data: chartData.data
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
      <div className="UserInfo">
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
        <div className="extend">
          <h5 className="mb10">扩展信息</h5>
          <ul>
            <li><i>用户标识：</i>{extend.mark}</li>
            <li><i>首次关注：</i>{extend.focuseTime}</li>
            <li><i>手机号：</i>{extend.phone}</li>
            <li><i>分组：</i><FormItem options={extend.group} className="form-control input-sm" type="select"/></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default UserInfo;