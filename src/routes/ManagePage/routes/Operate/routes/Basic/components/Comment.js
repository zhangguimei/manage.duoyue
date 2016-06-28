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