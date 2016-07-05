/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 作者管理
 */
'use strict';
import React, {PropTypes} from 'react';

class AuthorManage extends React.Component {
  render() {
    return (
      <div className="AuthorManage">
        {this.props.children}
      </div>
    );
  }
}

AuthorManage.propTypes = {
  children: PropTypes.any
}

module.exports =  AuthorManage;