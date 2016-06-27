'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import * as actions from 'ActionsFolder/MenuActions';
import Menu from 'UIComponentFolder/Menu/Menu';
import FastMenu from './FastMenu';
import styles from './Header.scss';

class Header extends React.Component {
  render() {
    const {treeData:{login, user, fast, menu}, actions: {changeRoute}} = this.props;
    const imgsrc = 'http://www.sangbuzhahuwai.com/admin/do/pic/2015103017301207.jpg';
    return (
      <header className="Header">
        <div className="blur-glass" style={{backgroundImage: `url(${imgsrc})`}}></div>
        <Link className="logo left" to="/">RAYS-2.0</Link>
        <div className="menu left">
          <Menu menuData={menu}/>
        </div>
        <div className="fast-menu right">
          <FastMenu fastData={fast} changeRoute={changeRoute}/>
        </div>
        <div className="name right">{login && user}</div>
      </header>
    );
  }
}

Header.propTypes = {
  treeData: PropTypes.shape({
    login: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    fast: PropTypes.array.isRequired,
    menu: PropTypes.array.isRequired
  }).isRequired,
  actions: PropTypes.object
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
)(Header);