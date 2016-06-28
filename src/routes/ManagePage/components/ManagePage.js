'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map, is, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
import {Scrollbars} from 'react-custom-scrollbars';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

import * as actions from 'ActionsFolder/LoginActions';
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
    const {username, actions:{fetchTreedata}} = this.props;
    console.log('logged', username);
    this.tree = fetchTreedata(username).tree;
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
    const {children, path} = this.props,
        {showWaitModal} = this.state;
    const treeData = require('AssetsFolder/MockData/menu_data.json');
    return (
        <div className="ManagePage">
          <Header treeData={treeData} path={path}/>
          <Sidebar treeData={treeData} path={path} ref="sidebar"/>
          <main className="Main" style={{left : this.asideWidth}}>
            <Scrollbars style={{height:'100%'}}>
              <header className="page-title">
                <span ref="headerText">{compareData(treeData.permissions, 'accessPath', path, 'permissionName')}</span>
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
  let {login:{username}, menu} = fromJS(state).toJS();
  return {
    path: ownProps && ownProps.location.pathname || '/',
    username
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