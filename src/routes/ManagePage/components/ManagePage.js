'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map, is, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
import {Scrollbars} from 'react-custom-scrollbars';
import {Link} from 'react-router';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

import * as actions from 'ActionsFolder/LoginActions';
import {getTitle, getChildren} from 'UtilsFolder/getDataInfo';
import Modal from 'UIComponentFolder/Modals/Modal';
import LoadingRect from 'UIComponentFolder/Loading/LoadingRect';
import {animations} from 'UtilsFolder/animation';
import shouldComponentUpdate from 'UtilsFolder/shouldComponentUpdate';

import styles from './ManagePage.scss';

class ManagePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showWaitModal: false
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.tree = null
  }

  tempCloseWaitModal() {
    let that = this,
        randtime = Math.random() * 1000;
    randtime = randtime > 990 ? randtime : 0;
    if (!randtime) {
      return
    };
    this.setState({
      showWaitModal: true
    });
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      that.setState({
        showWaitModal: false
      });
    }, randtime);
  }

  componentWillMount() {
    const {userName, tree, permissions, actions:{fetchTreedata}} = this.props;
    console.log('logged', userName, tree, permissions);
    this.tree = fetchTreedata(userName).tree;
  }

  componentWillReceiveProps(nextProps) {
    const Ithis = fromJS(this.props), Inext = fromJS(nextProps);
    if (!is(Ithis, Inext)) {
      this.tempCloseWaitModal();
    }
  }

  componentDidUpdate() {
    animations(this.refs.headerText, 'bounceInLeft');
  }

  componentWillUnmout() {
    clearTimeout(this.timer);
  }

  render() {
    const {children, route, path, routes} = this.props,
        {showWaitModal} = this.state;
    const depth = routes.length;
    //console.log("managePage", route, this.props.routes,this.props.location.pathname)
    const treeData = this.tree;
    let sidebarLeft = route.length === 3 && getChildren(treeData.menu, route).length > 0 || route.length === 4 ? '360px' : '180px';

    return (
        <div className="ManagePage">
          <Header treeData={treeData}/>
          <Sidebar treeData={treeData} path={path}/>
          <main className="Main" style={{left : sidebarLeft}}>
            <Scrollbars style={{height:'100%'}}>
              <header className="page-title">
                <span ref="headerText">{getTitle(treeData.menu, route)}</span>
              </header>
              <section className="page-body">
                {children}
              </section>
            </Scrollbars>
            {
              showWaitModal &&
              <Modal className="topModal">
                <LoadingRect/>
              </Modal>
            }
          </main>
        </div>
    )
  }
}

ManagePage.propTypes = {
  children: PropTypes.node,
  route: PropTypes.array.isRequired,
  username: PropTypes.string
};


function mapStateToProps(state, ownProps) {
  let {login, menu} = fromJS(state).toJS();
  return {
    path: ownProps && ownProps.location.pathname || '/',
    route: menu,
    userName: login.userName,
    permissions: login.permissions,
    tree: login.tree
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

module.exports =  connect(
    mapStateToProps,
    mapDispatchToProps)
(ManagePage);