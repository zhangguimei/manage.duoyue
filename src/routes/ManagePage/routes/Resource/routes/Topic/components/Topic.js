'use strict';
import React from 'react';

class Topic extends React.Component {
  render() {
    return (
      <div className="Topic">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Topic;