'use strict';
import React, {PropTypes} from 'react';

class SidebarItemList extends React.Component {
  render() {
    const {menuData:{name}, onClick, select} = this.props;
    return (
      <li>
        <a className={select?"cur":null} onClick={onClick}>{name}</a>
      </li>
    );
  }
}

SidebarItemList.propTypes = {
  menuData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  }).isRequired
};

export default SidebarItemList;