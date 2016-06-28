'use strict';
import React from 'react';
import UserHome from './UserHome';
import styles from './User.scss';

class User extends React.Component {
  render() {
    return (
      <div className="User">
        {this.props.children || <UserHome />}
      </div>
    );
  }
}

module.exports = User;