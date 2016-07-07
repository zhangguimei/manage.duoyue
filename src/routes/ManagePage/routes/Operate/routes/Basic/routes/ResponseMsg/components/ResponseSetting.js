/*
 *  Project : Basic
 *  Date    : 2016/7/5
 *  Author  : Melody Yuen
 *  Declare : ResponseSetting
 */

'use strict';
import React from 'react';
import Tab from 'UIComponentFolder/Tab/Tab';
import PhotoMaterial from 'PageComponentFolder/PhotoMaterial/PhotoMaterial';
import ResponseSettingInfo from './ResponseSettingInfo';
import ResponseSettingSingle from './ResponseSettingSingle';

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
      tabItemOn: "active"
    }
  };

class ResponseSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
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
    const {data:{title, createTime}} = this.props,
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
        {'material': '素材'},
        {'sign': '报名'},
        {'topic': '专题'}
      ],
      navSingleData = [
        {'text': '文本素材'}
      ];
    return (
      <div className="ResponseSetting">
        <ul className="setting-head">
          <li><span className="caption">标题</span>{title}</li>
          <li><span className="caption">创建</span>{createTime}</li>
        </ul>
        <div className="setting-body">
          <Tab TabItemsData={TabItemsData} typeIndex={index} onTypeChange={::this.onTypeChange}/>
          { index == 0 && <ResponseSettingInfo tabData={tabData}/> }
          { index == 1 && <PhotoMaterial selectedData={tabData} data={settingMultiData} navData={navMultiData}/> }
          { index == 2 && <ResponseSettingSingle selectedData={tabData} data={settingSingleData} navData={navSingleData}/> }
        </div>
      </div>
    );
  }
}

export default ResponseSetting;