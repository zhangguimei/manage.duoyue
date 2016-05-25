'use strict';
import React from 'react';
import MenuList from './MenuList';

class MenuItem extends React.Component {
  render() {
    const {data: {title, icon, children = []}, route, parent, clickItem, moveItem, mainIndex} = this.props;
    const level = parent.split(".").length;
    //console.log(`${route.join(".")}.`.slice(0, (level-1)*2 ), parent);
    let routeString = `${route.join(".")}.`.slice(0, (level-1)*2);
    let liOn = routeString == parent;  //判断是否鼠标悬浮
    let liClass = level <=2 ? mainIndex == parent.slice(-2, -1)  ? "li-menu li-menu-on" : "li-menu" :  liOn ? "li-item li-item-on" : "li-item";
    return (
      <li className={`MenuItem ${liClass}`} onMouseMove={(e) => moveItem(e, parent)} onClick={(e) => clickItem(e, parent)}>
        <div className="text">
          {
            icon && <i className={`menu-pic icon ${icon}`}/>
          }
          <span className="item-title">{title}</span>
          {
            children.length > 0 && level > 2 && <i className="ic ic-right"></i>
          }
        </div>
        {
          children.length > 0 &&
          <MenuList data={children} parent={parent} route={route} moveItem={moveItem} clickItem={clickItem}/>
        }
      </li>
    );
  }
}

export default MenuItem;