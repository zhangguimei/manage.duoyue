'use strict';
import React from 'react';

class Period extends React.Component {
  render() {
    return (
      <div className="Period">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Period;