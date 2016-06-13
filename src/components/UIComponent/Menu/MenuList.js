'use strict';
import React, {PropTypes} from 'react';
import MenuItem from './MenuItem';

class MenuList extends React.Component {

  render() {
    const {menuData = [], route = [0], parent = "", moveItem, clickItem, mainIndex} = this.props;
    let level = parent.split(".").length - 1;
    let routeString = route.join("."), test = new RegExp("^" + parent.slice(0, -1), );
    let ulClass = level == 0 ? "ul-menu" : level == 1 ? "ul-menu-index" : "ul-item";
    let props = {
      route: route,
      moveItem: moveItem,
      clickItem: clickItem,
      mainIndex: mainIndex
    };
    if(menuData.length &&  routeString.match(test)) {
      return (
        <ul className={`MenuList ${ulClass} animated fadeIn`}>
          {
            menuData.map((item, index) => {
              return <MenuItem menuData={item} parent={`${parent}${index}.`} key={index} {...props}/>
            })
          }
        </ul>
      )
    }else {
      return null;
    }
  }
}

export default MenuList;