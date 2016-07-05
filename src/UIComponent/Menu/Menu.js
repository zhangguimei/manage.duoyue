/*
 *  Project : Menu Guide
 *  Date    : 2016.06.28
 *  Author  : Paco
 *  Declare : Website Menu
 *  UseAge  : You need provide a json tree, which contain data , url and name
 *
 */
'use strict';
import React, {PropTypes} from 'react';
import shouldComponentUpdate from 'UtilsFolder/shouldComponentUpdate';
import {getMainIndex} from 'UtilsFolder/getDataInfo';

import MenuList from './MenuList';
import styles from "./Menu.scss";

class Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {path, menuData} = this.props;
    this.state = {
      mainIndex: getMainIndex(menuData, path),
      route: [] //当前鼠标滑过的路线
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }
  
  moveItem(e, nodeRoute) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      route: [...nodeRoute.split(".")]
    })
  }

  componentWillReceiveProps(nextProps) {
    //接受外部路由改变mainIndex
    const {menuData} = this.props, {path} = nextProps;
    this.setState({
      mainIndex: getMainIndex(menuData, path)
    });
    //console.log(getMainIndex(menuData, path), path);
  }

  clickItem(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      route: []
    });
  }

  leaveMenu() {
    this.setState({
      route: []
    });
  }

  render() {
    const {menuData, parent = ""} = this.props, {route, mainIndex}=this.state;
    let props = {
      menuData: menuData,
      route: route,
      parent: parent,
      moveItem: ::this.moveItem,
      clickItem: ::this.clickItem,
      mainIndex: mainIndex
    };
    return (
      <div className="Menu" onMouseLeave={::this.leaveMenu}>
        <MenuList {...props}/>
      </div>
    );
  }
}

Menu.propTypes = {
  menuData: PropTypes.array,
  parent: PropTypes.string
};


export default Menu;
