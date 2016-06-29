/*
 * Created on 2016/6/29
 * 
 * by Melody Yuen
 */
'use strict';
import React from 'react';
import styles from './UserSetting.scss';

class UserSetting extends React.Component {
  render() {
    return (
      <div className="UserSetting">
        {this.props.children}
      </div>
    );
  }
}

module.exports = UserSetting;