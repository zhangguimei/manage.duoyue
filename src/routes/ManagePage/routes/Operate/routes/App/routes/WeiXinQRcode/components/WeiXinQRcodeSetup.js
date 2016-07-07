/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-微信二维码点击设置
 */

'use strict';
import React,{PropTypes} from 'react';
import Tab from 'UIComponentFolder/Tab/Tab';
import Tag from 'PageComponentFolder/Tag/Tag';
import TablePage from 'PageComponentFolder/TablePage/TablePage'
import BasicInfo from './BasicInfo';
import ResponseMessage from './ResponseMessage';
import ScanUsers from './ScanUsers';

const settingData = require("AssetsFolder/MockData/operate/basic/setting_data.json"),
  tagData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json"),
  historyData = require('AssetsFolder/MockData/sourcecenter/article/cookies_data.json'),
  basicInfoData = require('AssetsFolder/MockData/operate/app/basicInfo_data.json'),
  scanUsersData = require('AssetsFolder/MockData/operate/app/scanUsers_data.json'),
  navData = [
    {'info': '基本信息'},
    {'news': '响应消息'},
    {'tag': '标签'},
    {'record': '扫描记录'},
    {'user': '用户'}
  ],
  tabContent = navData.map((item) => {
    return Object.values(item)[0]
  }),
  keyRoute = navData.map((item) => {
    return Object.keys(item)[0]
  }),
  TabItemsData = {
    content: tabContent,
    tabClass: {
      tabBox: "tab-nav",
      tabItemOn: "active",
      tabItemDefault: ""
    }
  };

class WeiXinQRcodeSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      tabData: settingData[keyRoute[1]]
    };
  }

  onTypeChange(index) {
    this.setState({
      index: index,
      tabData: settingData[keyRoute[index]]
    })
  }

  render() {
    const {data} = this.props, {index,tabData} = this.state;
    const responseData = require('AssetsFolder/MockData/operate/app/responseTable_data.json'),
      navData = [
        {'article': '文章'},
        {'book': '书籍'},
        {'source': '资源'},
        {'commodity': '商品'},
        {'funding': '众筹'},
        {'circle': '圈子'},
        {'author': '作者'},
        {'material': '素材'},
        {'sign': '报名'},
        {'packet': '红包'},
        {'sign': '报名'}
      ];
    return (
      <div className="WeiXinQRcodeSetup">
        <header className="hd clearfix">
          <div className="left">
            <img className="img left" src={data.QRcodeImg} alt={data.QRcodeImg} title={data.QRcodeImg}/>
            <ul className="text">
              <li><i>名称</i><span>{data.QRcodeTitle}</span></li>
              <li><i>简介</i><span>{data.QRcodeExplain}</span></li>
              <li><i>创建</i><span>{data.publishData}</span></li>
            </ul>
          </div>
          <ul className="info right">
            <li className="left">
              <h5>{data.scan}</h5>
              <p>扫描(次)</p>
            </li>
            <li className="left">
              <h5>{data.attention}</h5>
              <p>新关注(人)</p>
            </li>
            <li className="left">
              <h5>{data.user}</h5>
              <p>用户</p>
            </li>
            <li className="left">
              <h5>{data.tag}</h5>
              <p>标签</p>
            </li>
          </ul>
        </header>
        <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
        { index == 0 && <BasicInfo data={basicInfoData}/>}
        { index == 1 && <ResponseMessage selectedData={tabData} data={responseData} navData={navData} toggleMessageLayer={this.props.toggleMessageLayer}/>}
        { index == 2 && <Tag tagData={tagData}/>}
        { index == 3 && <TablePage data={historyData}/>}
        { index == 4 && <ScanUsers data={scanUsersData.tableContentData}/>}
      </div>
    )
  }
}

WeiXinQRcodeSetup.PropTypes = {
  data: PropTypes.object
};

export default WeiXinQRcodeSetup;