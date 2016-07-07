/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 用户管理
 */
'use strict';
import React, {PropTypes} from 'react';

class UserManage extends React.Component {
  render() {
    return (
      <div className="UserManage">
        {this.props.children}
      </div>
    );
  }
}

UserManage.propTypes = {
  children: PropTypes.any
}

module.exports =  UserManage;