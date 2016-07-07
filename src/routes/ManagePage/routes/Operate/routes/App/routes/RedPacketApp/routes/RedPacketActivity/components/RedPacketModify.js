/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-红包应用-红包活动-点击设置
 */

'use strict';
import React,{PropTypes} from 'react';
import Tab from 'UIComponentFolder/Tab/Tab';
import Table from 'UIComponentFolder/Table/Table';
import QRcode from 'PageComponentFolder/QRcode/QRcode';
import BasicInfo from './BasicInfo';
import MessagePrompt from './MessagePrompt ';
import styles from './RedPacketActivity.scss';

const navData = [
    {'info': '基本信息'},
    {'news': '二维码'},
    {'tag': '红包领取详情'},
    {'record': '红包领取提示信息'}
  ],
  tabContent = navData.map((item) => {
    return Object.values(item)[0]
  }),
  TabItemsData = {
    content: tabContent,
    tabClass: {
      tabBox: "tab-nav",
      tabItemOn: "active",
      tabItemDefault: ""
    }
  },
  qrcodeData = require("AssetsFolder/MockData/sourcecenter/article/code_data.json"),
  detailsHeadData = {
    "id": "序号",
    "name": "昵称",
    "getAmount": "领取金额",
    "getData": "领取时间"
  },
  detailsTableData = require("AssetsFolder/MockData/operate/app/redpacketDetails_data.json");

class RedPacketModify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  onTypeChange(index) {
    this.setState({
      index: index
    })
  }

  render() {
    const {data} = this.props, {index} = this.state;
    return (
      <div className="RedPacketModify">
        <header className="hd">
          <ul className="text">
            <li>{data.title}</li>
            <li><i>红包总额：</i><span>{data.totalAmount}元</span></li>
            <li><i>单个红包：</i><span>{data.maximumMoney}分-{data.minimumMoney}分</span></li>
          </ul>
        </header>
        <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
        { index == 0 && <BasicInfo data={data}/>}
        { index == 1 && <QRcode data={qrcodeData}/> }
        { index == 2 &&
        <div className="RedpacketDetails">
          <div className="mb20">还剩余红包：10个</div>
          <Table contentData={detailsTableData.tableContentData} headData={detailsHeadData}/>
        </div>}
        { index == 3 && <MessagePrompt/>}
      </div>
    )
  }
}

RedPacketModify.PropTypes = {
  data: PropTypes.object
};

export default RedPacketModify;