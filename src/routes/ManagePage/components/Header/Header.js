'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import Menu from 'UIComponentFolder/Menu/Menu';
import FastMenu from './FastMenu';
import styles from './Header.scss';

class Header extends React.Component {
  render() {
    const {treeData:{login, user, fast, permissions}, path} = this.props;
    const imgsrc = 'http://www.sangbuzhahuwai.com/admin/do/pic/2015103017301207.jpg';
    return (
      <header className="Header">
        <div className="blur-glass" style={{backgroundImage: `url(${imgsrc})`}}></div>
        <Link className="logo left" to="/">RAYS-2.0</Link>
        <div className="menu left">
          <Menu menuData={permissions} path={path}/>
        </div>
        <div className="fast-menu right">
          <FastMenu fastData={fast}/>
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
    permissions: PropTypes.array.isRequired
  }).isRequired
};

export default Header;