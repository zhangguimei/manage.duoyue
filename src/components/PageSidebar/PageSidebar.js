'use strict';
import React, {PropTypes} from 'react';
import SidebarItem from './SidebarItem';
import SidebarSubItem from './SidebarSubItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTitle, getChildren,getUrlRoute} from '../UIComponent/Menu/ShowRoute';
import {Map, is, fromJS} from 'immutable';
import * as actions from '../../actions/MenuActions';
import {Scrollbars} from 'react-custom-scrollbars';
import styles from './PageSidebar.scss';

class PageSidebar extends React.Component {
  constructor(props) {
    super(props);
    const {route} = this.props;
    this.state = {
      route: route.length > 0 ? route : ['0'],
      subData: {data: []},
      subIndex: '',
      fold: false
    };
  }

  componentWillReceiveProps(np) {
    const {route} = np, {treeData:{menu}} = this.props;
    //console.log(route);
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
      } else {
        this.setState({
          subData: {
            data: [],
            name: ''
          },
          subIndex: ''
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

  componentDidMount() {
    const {actions:{changeRoute},treeData:{menu},path} = this.props;
    let route = getUrlRoute(menu,path);
    //console.log(route);
    changeRoute && changeRoute(route.split('.'));
  }

  changeRoutes(routes, subDatas = {data: []}, subIndexs = '') {
    const {actions:{changeRoute}} = this.props;
    let {route} = this.state;
    let routeArray = [route[0], ...routes.split(".")];
    this.setState({
      route: routeArray,
      subData: subDatas,
      subIndex: subIndexs
    });
    changeRoute && changeRoute(routeArray);
  }

  foldToggle() {
    this.setState({
      fold: !this.state.fold
    })
  }

  render() {
    const {treeData:{menu}} = this.props,
      {route, subData, subIndex, fold} = this.state;
    const routeFirst = route[0];
    const menuData = menu[routeFirst].data;
    let foldClass = fold ? 'fold' : '';
    return (
      <div className={`PageSidebar ${foldClass} transitioned`}>
        <div className="sidebarOne">
          <Scrollbars autoHide={true} style={{height:'100%'}} renderTrackVertical={props => <div {...props} className="sideScrollBarVertical"/>}>
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
          </Scrollbars>
          <a className="btn-toggle transitioned" onClick={::this.foldToggle}><i
            className={fold ? 'ic ic-right2' : 'ic ic-back2'}/></a>
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
    route: menu
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