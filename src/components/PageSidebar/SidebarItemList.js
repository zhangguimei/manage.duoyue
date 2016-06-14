'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class SidebarItemList extends React.Component {
  render() {
    const {menuData:{name, url}, onClick, select} = this.props;
    return (
      <li>
        <Link to={`${url}`} className={select?"cur":"hvr-shutter-out-horizontal"}
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