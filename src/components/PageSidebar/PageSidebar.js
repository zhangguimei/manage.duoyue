'use strict';
import React, {PropTypes} from 'react';
import SidebarItem from './SidebarItem';
import styles from './PageSidebar.scss';

class PageSidebar extends React.Component {
  render() {
    const headerData = this.props.data;
    let sidebarData = headerData[1].children;
    //console.log(sidebarData);
    return (
      <div className="PageSidebar">
        <div className="sidebarOne">
          {
            sidebarData.map((item, i)=> <SidebarItem key={i} data={item}/>)
          }
        </div>
        {/*<div className="sidebarTwo"></div>*/}
      </div>
    );
  }
}

export default PageSidebar;