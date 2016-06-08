'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class SidebarItemList extends React.Component {
  render() {
    const {menuData:{id, name}, onClick, select, route} = this.props;
    const treeAdd = require("../../assets/MockData/tree_add_data.json");
    if (!treeAdd[id]) {
      treeAdd[id] = {}
    }
    let {url="/hover"} = treeAdd[id];
    return (
      <li>
        <Link to={`/manage${url}?route=${route}`} className={select?"cur":"hvr-shutter-out-horizontal"}
              onClick={onClick}>{name}</Link>
      </li>
    );
  }
}

SidebarItemList.propTypes = {
  menuData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  }).isRequired
};

export default SidebarItemList;