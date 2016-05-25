'use strict';
import React, {PropTypes} from 'react';

class SidebarItemList extends React.Component {
  render() {
    let {data:{title}, onClick, select} = this.props;
    return (
      <li>
        <a className={select?"cur":null} onClick={onClick}>{title}</a>
      </li>
    );
  }
}

SidebarItemList.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
  }).isRequired
}

export default SidebarItemList;