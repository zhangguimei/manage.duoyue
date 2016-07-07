'use strict';
import React, {PropTypes} from 'react';

class Basic extends React.Component {
  render() {
    return (
      <div className="Basic">
        {this.props.children}
      </div>
    );
  }
}

Comment.propTypes = {
  children: PropTypes.any
}

module.exports =  Basic;