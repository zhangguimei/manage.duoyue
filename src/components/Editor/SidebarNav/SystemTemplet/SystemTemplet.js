"use strict";
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {Scrollbars} from 'react-custom-scrollbars';
import Tab from '../Tab/Tab';
import TitleStore from './TitleStore';
import ImageStore from './ImageStore';

import styles from './SystemTemplet.scss';

const tabClass = {
  tabBox: "tab-box",
  tabItemOn: "tab-item active",
  tabItemDefault: "tab-item"
};

const tabItemsData = {
  content: ["标题", "图片"],
  tabClass: tabClass
};

class SystemTemplet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0
    };
  }

  onTabChange(nextIndex) {
    this.setState({
      activeTabIndex: nextIndex
    });
  }

  render() {
    const { activeTabIndex } = this.state;
    let contentCode;
    switch(activeTabIndex) {
      case 0:
        contentCode =  <TitleStore />;
        break;

      case 1:
        contentCode =  <ImageStore />;
        break;
    }
    return(
      <div className="SystemTemplet left">
        <Tab TabItemsData={tabItemsData} onTypeChange={::this.onTabChange} typeIndex={activeTabIndex} />
        <Scrollbars style={{height:'100%'}}>
          { contentCode }
        </Scrollbars>
      </div>
    );
  }
}

export default SystemTemplet;
