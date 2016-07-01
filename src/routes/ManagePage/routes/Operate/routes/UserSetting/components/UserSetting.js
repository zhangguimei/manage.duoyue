/*
 *  Project : User Setting
 *  Date    : 2016/6/30
 *  Author  : Melody Yuen
 */
'use strict';
import React from 'react';

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