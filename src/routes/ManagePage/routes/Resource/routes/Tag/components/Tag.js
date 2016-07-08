'use strict';
import React from 'react';

class Tag extends React.Component {
  render() {
    return (
      <div className="Tag">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Tag;