'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map, is, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
import {Scrollbars} from 'react-custom-scrollbars';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

import * as loginActions from 'ActionsFolder/LoginActions';
import {compareData} from 'UtilsFolder/getDataInfo';
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
    this.asideWidth = 180;
    //this.tree = null
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
    const {token, actions:{loginByToken}} = this.props;
    console.log('logged', token);
    if(token) {
      loginByToken();
    }
    //this.tree = fetchTreedata(userName).tree;
  }

  componentWillReceiveProps(nextProps) {
    const Ithis = fromJS(this.props), Inext = fromJS(nextProps);
    if (!is(Ithis, Inext)) {
      this.tempCloseWaitModal();
    }
  }

  componentDidUpdate() {
    const tAsideWidth = this.asideWidth, getWidth = this.refs.sidebar.getWidth();
    animations(this.refs.headerText, 'bounceInLeft');
    if(tAsideWidth != getWidth) {
      this.asideWidth = getWidth;
      this.forceUpdate();
    }
  }

  componentWillUnmout() {
    clearTimeout(this.timer);
  }

  render() {
    const {children, path, permissions, fast} = this.props,
        {showWaitModal} = this.state;
    //       <Sidebar path={path} permissions={permissions} {...others} ref="sidebar"/>
    return (
        <div className="ManagePage">
          <Header path={path} permissions={permissions} fast={fast}/>
          <Sidebar path={path} permissions={permissions} fast={fast} ref="sidebar"/>
          <main className="Main" style={{left: this.asideWidth}}>
            <Scrollbars style={{height:'100%'}}>
              <header className="page-title">
                <span ref="headerText">{compareData(permissions, 'accessPath', path, 'permissionName')}</span>
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
  username: PropTypes.string
};


function mapStateToProps(state, ownProps) {
  let { login }= fromJS(state).toJS();
  return {
    path: ownProps && ownProps.location.pathname || '/',
    token: login.token,
    userName: login.userName,
    fast: login.fast,
    permissions: login.permissions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

module.exports =  connect(
    mapStateToProps,
    mapDispatchToProps)
(ManagePage);