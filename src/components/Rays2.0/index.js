'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import ShowRoute from '../UIComponent/Menu/ShowRoute';
import Tree from '../UIComponent/Tree/Tree';
import Menu from '../UIComponent/Menu/Menu';
import Collapse from '../UIComponent/Collapse/Collapse';
import Dropdown from '../UIComponent/Dropdown/Dropdown';

import styles from './index.scss';

class Rays extends React.Component {
  render() {
    const {route} = this.props;
    let collapseData = require("../../assets/MockData/collapse_data.json");
    let treeData = require("../../assets/MockData/tree_data.json");
    let dropdownData = require("../../assets/MockData/dropdown_data.json");
    let routeData = require("../../assets/MockData/header_data.json");
    return (
      <div className="RaysTab">
        <Menu data={treeData}/>
        <ShowRoute data={routeData} route={route}/>
        <Tree data={treeData}/>
        <div className="DropdownPage">
          <div className="title">多选</div>
          <Dropdown option={dropdownData} isMultiple={true} skin={"default"}/>
          <div className="title">单选</div>
          <Dropdown option={dropdownData} isMultiple={false} skin={"blue"}/>
        </div>

        <Collapse data={collapseData} skin="default" mutex={false} openFirst={false}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    route: state.menu.toJS(),
  };
}

export default connect(
  mapStateToProps,
  ""
)(Rays);
