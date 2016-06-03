'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/MenuActions';
import shouldUpdate from '../../../utils/shouldUpdate';

import MenuList from './MenuList';
import styles from "./Menu.scss";

@shouldUpdate()
class Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mainIndex: 0,  //Menu主页的显示index
      route: [] //当前鼠标滑过的路线
    };
  }

  moveItem(e, nodeRoute) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      route: [...nodeRoute.split(".")]
    })
  }

  componentWillReceiveProps(nextProps) {
    //接受外部改变Menu的mainIndex
    const {mainIndex} = this.state;
    if(nextProps.route && nextProps.route[0] != mainIndex) {
      this.setState({
        mainIndex: nextProps.route[0]
      })
    }
  }

  clickItem(e) {
    e.stopPropagation();
    e.preventDefault();
    let {route} = this.state, {actions:{changeRoute}} = this.props;
    this.setState({
      mainIndex: route[0].toString(),
      route: []
    });
    changeRoute && changeRoute(route.slice(0, route.length - 1));
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
  actions: PropTypes.shape({
    changeRoute: PropTypes.func
  }),
  menuData: PropTypes.array,
  parent: PropTypes.string
};

function mapStateToProps(state) {
  return {
    route: state.menu.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
