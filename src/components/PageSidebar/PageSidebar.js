'use strict';
import React, {PropTypes} from 'react';
import SidebarItem from './SidebarItem';
import SidebarSubItem from './SidebarSubItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTitle, getChildren} from '../UIComponent/Menu/ShowRoute';
import {Map, is, fromJS} from 'immutable';
import * as actions from '../../actions/MenuActions';
import styles from './PageSidebar.scss';

class PageSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: ['0'],
      subData: {data: []},
      subIndex: ''
    }
  }

  componentWillReceiveProps(np) {
    const {route} = np, {treeData:{menu}} = this.props;
    if (route.length > 0) {
      this.setState({
        route: route
      })
    }
    if (route.length >= 4) {
      const subData = getChildren(menu, route.slice(0, route.length - 1)),
        subTitle = getTitle(menu, route.slice(0, route.length - 1));
      this.setState({
        subData: {
          data: subData,
          name: subTitle
        },
        subIndex: route.slice(1, route.length - 1).join('.')
      })
    } else if (route.length >= 3) {
      const subData = getChildren(menu, route),
        subTitle = getTitle(menu, route.slice(0, route.length));
      if (subData.length > 0) {
        this.setState({
          subData: {
            data: subData,
            name: subTitle
          },
          subIndex: route.slice(1).join('.')
        })
      }
    } else {
      this.setState({
        subData: {
          data: [],
          name: ''
        },
        subIndex: ''
      })
    }
  }

  changeRoutes(routes, subDatas = {data: []}, subIndexs = '') {
    const {route} = this.state, {actions:{changeRoute}} = this.props;
    let routeArray = [route[0].toString(), ...routes.split(".")];
    this.setState({
      route: routeArray,
      subData: subDatas,
      subIndex: subIndexs
    });
    changeRoute && changeRoute(routeArray);
  }

  render() {
    const {treeData:{menu}} = this.props,
      {route, subData, subIndex} = this.state;
    const routeFirst = route[0];
    const menuData = menu[routeFirst].data;
    return (
      <div className="PageSidebar">
        <div className="sidebarOne">
          {
            menuData.map((item, i)=> {
              let selectTitle = route.slice(0, 2).join('.') == `${routeFirst}.${i}`;
              return (
                <SidebarItem key={i} menuData={item} route={route} selectTitle={selectTitle}
                             changeRoutes={::this.changeRoutes}
                             parent={i}/>
              );
            })
          }
        </div>
        {
          subData.data.length > 0 &&
          <div className="sidebarTwo">
            <SidebarSubItem subData={subData} route={route} changeRoutes={::this.changeRoutes} parent={subIndex}/>
          </div>
        }
      </div>
    );
  }
}

PageSidebar.propTypes = {
  treeData: PropTypes.shape({
    menu: PropTypes.array.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  let {menu} = fromJS(state).toJS();
  return {
    menu
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
)(PageSidebar);