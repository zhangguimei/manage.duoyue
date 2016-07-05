'use strict';
import React from 'react';

class Sales extends React.Component {
  render() {
    return (
      <div className="Sales">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Sales;