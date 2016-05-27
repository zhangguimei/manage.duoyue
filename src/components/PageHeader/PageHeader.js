'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/MenuActions';
import ShowRoute from '../UIComponent/Menu/ShowRoute';
import Menu from '../UIComponent/Menu/Menu';
import FastMenu from './FastMenu';
import styles from './PageHeader.scss';

class PageHeader extends React.Component {
  render() {
    const {treeData:{login, user, fast, menu}} = this.props;
    return (
      <div className="PageHeader">
        <a className="logo">RAYS-2.0</a>
        <div className="menu">
          <Menu menuData={menu}/>
        </div>
        <div className="fast-menu">
          <FastMenu fastData={fast}/>
        </div>
        <div className="name">{login && user}</div>
      </div>
    );
  }
}

PageHeader.propTypes = {
  treeData: PropTypes.shape({
    login:PropTypes.bool.isRequired,
    user:PropTypes.string.isRequired,
    fast:PropTypes.array.isRequired,
    menu:PropTypes.array.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    route: state.menu
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);