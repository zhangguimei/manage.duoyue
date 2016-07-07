/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-关键字应用-点击设置
 */

'use strict';
import React,{PropTypes} from 'react';
import Tab from 'UIComponentFolder/Tab/Tab';
import PhotoMaterial from 'PageComponentFolder/PhotoMaterial/PhotoMaterial';
import BasicInfo from './BasicInfo';
import ResponseSettingSingle from '../../../../Basic/routes/ResponseMsg/components/ResponseSettingSingle';
import ImageText from './Material';

const settingData = require("AssetsFolder/MockData/operate/basic/setting_data.json"),
  navData = [
    {'info': '基本信息'},
    {'multi': '多图文响应'},
    {'single': '单素材响应'}
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

class KeywordSetup extends React.Component {
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
    });
  }

  render() {
    const {data} = this.props,
      {index, tabData} = this.state;
    const settingMultiData = require("AssetsFolder/MockData/operate/basic/setting_multi_data.json"),
      settingSingleData = require("AssetsFolder/MockData/operate/basic/setting_single_data.json"),
      navMultiData = [
        {'article': '文章'},
        {'book': '书籍'},
        {'source': '资源'},
        {'product': '商品'},
        {'funding': '众筹'},
        {'circle': '圈子'},
        {'author': '作者'},
        {'material': '图文素材'}
      ],
      navSingleData = [
        {'text': '文本素材'}
      ];
    return (
      <div className="KeywordSetup">
        <header className="hd">
          <ul className="text">
            <li><i>标题</i><span>{data.keyword}</span></li>
            <li><i>创建</i><span>{data.publicData}</span></li>
          </ul>
        </header>
        <Tab TabItemsData={TabItemsData} typeIndex={index} onTypeChange={::this.onTypeChange}/>
        { index == 0 && <BasicInfo data={data}/>}
        { index == 1 && <PhotoMaterial selectedData={tabData} data={settingMultiData} navData={navMultiData}/>}
        { index == 2 && <ResponseSettingSingle selectedData={tabData} data={settingSingleData} navData={navSingleData}/>}
      </div>
    )
  }
}

KeywordSetup.PropTypes = {
  data: PropTypes.object
};

export default KeywordSetup;