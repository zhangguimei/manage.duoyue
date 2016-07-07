/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 圈子管理
 */
'use strict';
import React, {PropTypes} from 'react';

class GroupManage extends React.Component {
  render() {
    return (
      <div className="GroupManage">
        {this.props.children}
      </div>
    );
  }
}

GroupManage.propTypes = {
  children: PropTypes.any
}

module.exports =  GroupManage;