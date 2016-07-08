'use strict';
import React from 'react';

class Eresource extends React.Component {
  render() {
    return (
      <div className="Eresource">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Eresource;