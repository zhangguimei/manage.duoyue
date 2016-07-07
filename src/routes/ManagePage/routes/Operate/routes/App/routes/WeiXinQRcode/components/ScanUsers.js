/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-微信二维码点击设置-扫描纪录
 */

'use strict';
import React,{PropTypes} from 'react';
import Table from 'UIComponentFolder/Table/Table';
import styles from './WeiXinQRcode.scss';

const tableHeadData = {
  "id": "ID",
  "user": "用户",
  "sex": "性别",
  "city": "城市",
  "scanTimes": "扫描次数",
  "updateTime": "更新时间"
};

class ScanUsers extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className="ScanUsers">
        <Table contentData={data} headData={tableHeadData}/>
      </div>
    )
  }
}

ScanUsers.propsType = {
  data: PropTypes.object
};

export default ScanUsers;