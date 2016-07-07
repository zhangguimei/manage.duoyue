'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {regPath} from 'UtilsFolder/getDataInfo';

class SidebarSubItem extends React.Component {
  render() {
    const {subData:{ permissionName, children}, path} = this.props;
    return (
      <div className="SidebarSubItem">
        <h5>{permissionName}</h5>
        <ul>
          {
            children && children.map((item, i) => {
              return (
                <li key={i}>
                  <Link to={regPath(item.accessPath)} className={item.accessPath == path ? 'cur' : ""} >{item.permissionName}</Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

SidebarSubItem.propTypes = {
  subData: PropTypes.shape({
    permissionName: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      accessPath: PropTypes.string.isRequired,
      permissionName: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
};

export default SidebarSubItem;