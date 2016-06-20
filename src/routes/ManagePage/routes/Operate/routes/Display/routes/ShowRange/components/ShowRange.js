'use strict';
import React from 'react';

class ShowRange extends React.Component {
  render() {
    return (
      <div className="ShowRange">
        {this.props.children}
      </div>
    );
  }
}

module.exports = ShowRange;