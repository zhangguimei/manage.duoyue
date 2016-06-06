"use strict";
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Tab from './Tab/Tab';
import SystemTemplet from './SystemTemplet/SystemTemplet';

import styles from './SidebarNav.scss';

class SidebarNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelWidth: 360
    };
  }

  onTabChange(index) {
    const { onTabChange } = this.props;
    onTabChange && onTabChange(index);
  }

  render() {
    const { tabItemsData, tabIndex, togglePanel, showPanel, snapShotOnClick } = this.props,
          { panelWidth } = this.state;
    return(
      <div className="SidebarNav left clearfix">
        <Tab TabItemsData={tabItemsData} onTypeChange={::this.onTabChange} typeIndex={tabIndex} />
        <div className="sidebar-panel left" style={{ marginLeft: showPanel ? 80 : (80 - panelWidth) }}>
          {
            tabIndex == 0 &&
           <SystemTemplet snapShotOnClick={snapShotOnClick} />
          }
        </div>
        <div className="toggle-button left" onClick={togglePanel}>
          <div className="inter-layer"></div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = () => {
  const tabClass = {
    tabBox: "editor-tab-box",
    tabItemOn: "tab-item active",
    tabItemDefault: "tab-item"
  };
  const tabItemsData = {
    content: require('../../../assets/MockData/editor/sidebar_nav_tab_data.json'),
    tabClass: tabClass
  };
  return {
    tabItemsData
  };
};

export default connect(
  mapStateToProps
)(SidebarNav);