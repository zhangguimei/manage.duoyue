'use strict';
import React, {PropTypes} from 'react';
import MenuList from './MenuList';
import styles from "./Menu.scss";
import Immutable from 'Immutable';

class Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mainIndex: 0,  //Menu主页的显示index
      route: [] //当前鼠标滑过的路线
    };
  }

  componentWillReceiveProps(np) {
    // if(np.route) {
    //   this.setState({
    //     route: np.route
    //   })
    // }
  }

  moveItem(e, nodeRoute) {
    e.stopPropagation();
    e.preventDefault();
    //console.log(nodeRoute);
    this.setState({
      route: [...nodeRoute.split(".")]
    })
  }

  clickItem(e) {
    e.stopPropagation();
    e.preventDefault();
    let {route} = this.state, {changeRoute} = this.props;
    this.setState({
      mainIndex: route[0].toString()
    });
    changeRoute && changeRoute(route);
  }

  leaveMenu() {
    this.setState({
      route: []
    });
  }

  render() {
    const {data, parent = ""} = this.props, {route, mainIndex}=this.state;
    let props = {
      data: data,
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

export default Menu;