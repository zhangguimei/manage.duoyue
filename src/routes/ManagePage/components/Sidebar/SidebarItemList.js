'use strict';
import React, {PropTypes} from 'react';
import {regPath} from 'UtilsFolder/getDataInfo';
import {Link} from 'react-router';

class SidebarItemList extends React.Component {
  render() {
    const {menuData:{permissionName, accessPath}, changeSubData, menuData, path} = this.props, LEVEL = 3, reg = /^\//;
    let selected = path.indexOf(accessPath) == 0 &&
      path.split("/")[LEVEL] == accessPath.split("/")[reg.test("/accessPath") ? LEVEL : LEVEL - 1];
    return (
      <li className="">
        <Link to={regPath(accessPath)} className={selected ? "cur":"hvr-shutter-out-horizontal"}
              onClick={() => changeSubData(menuData)}>
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