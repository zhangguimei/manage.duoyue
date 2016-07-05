/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 评论管理
 */
'use strict';
import React, {PropTypes} from 'react';

class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        {this.props.children}
      </div>
    );
  }
}

Comment.propTypes = {
  children: PropTypes.any
}

module.exports =  Comment;