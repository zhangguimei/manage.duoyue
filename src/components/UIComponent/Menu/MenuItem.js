'use strict';
import React from 'react';
import MenuList from './MenuList';
import {Link} from 'react-router';

class MenuItem extends React.Component {
  render() {
    const {menuData: {id, name, icon_min, icon_min_light, icon_max, icon_max_light, data = []}, route, parent, clickItem, moveItem, mainIndex} = this.props;
    const level = parent.split(".").length;
    //console.log(`${route.join(".")}.`.slice(0, (level-1)*2 ), parent);
    let routeString = `${route.join(".")}.`.slice(0, (level - 1) * 2);
    let liOn = routeString == parent;  //判断是否鼠标悬浮
    let thisRoute = parent.slice(0, parent.length - 1);
    let liClass = level <= 2 ? mainIndex == parent.slice(-2, -1) ? "li-menu li-menu-on" : "li-menu" : liOn ? "li-item li-item-on" : "li-item";

    const treeAdd = require("../../../assets/MockData/tree_add_data.json");
    if (!treeAdd[id]) {
      treeAdd[id] = {}
    }
    let {url="/hover"} = treeAdd[id];
    return (
      <li className={`MenuItem ${liClass}`} onMouseMove={(e) => moveItem(e, parent)}
          onClick={(e) => clickItem(e, parent)}>
        <Link to={`/manage${url}?route=${thisRoute}`} className="text hvr-bounce-to-right">
          {
            icon_min && icon_min_light && icon_max && icon_max_light && <img src={icon_max} alt={name}/>
          }
          <span className="item-title">{name}</span>
          {
            data.length > 0 && level > 2 && <i className="ic ic-right"/>
          }
        </Link>
        {
          data.length > 0 &&
          <MenuList menuData={data} parent={parent} route={route} moveItem={moveItem} clickItem={clickItem}/>
        }
      </li>
    );
  }
}

export default MenuItem;