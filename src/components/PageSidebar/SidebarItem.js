'use strict';
import React, {PropTypes} from 'react';
import SidebarItemList from './SidebarItemList';

class SidebarItem extends React.Component {
  render() {
    let {data:{title, children}} = this.props;
    return (
      <div className="SidebarItem item">
        <h5><a>{title}{children.length>0 ? <i className="ic ic-add"></i> :null}</a></h5>
        {
          children.length > 0 && <ul>
            {
              children.map((item, i) => <SidebarItemList key={i} data={item}/>)
            }
          </ul>
        }
      </div>
    );
  }
}

export default SidebarItem;
