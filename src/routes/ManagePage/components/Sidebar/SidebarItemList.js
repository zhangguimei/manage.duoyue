'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class SidebarItemList extends React.Component {
  render() {
    const {menuData:{permissionName, accessPath}, changeRoute, parent, menuData, path} = this.props;
    let selected = path.indexOf(accessPath) == 0;
    return (
      <li className="">
        <Link to={accessPath} className={selected ? "cur":"hvr-shutter-out-horizontal"}
              onClick={() => changeRoute(parent.split(".").slice(0,-1), menuData)}>
          {permissionName}
        </Link>
      </li>
    );
  }
}

SidebarItemList.propTypes = {
  menuData: PropTypes.shape({
    permissionName: PropTypes.string.isRequired,
    accessPath: PropTypes.string.isRequired,
    children: PropTypes.array
  }).isRequired
};

export default SidebarItemList;