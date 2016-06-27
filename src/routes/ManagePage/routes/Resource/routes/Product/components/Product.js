'use strict';
import React from 'react';

class Product extends React.Component {
  render() {
    return (
      <div className="Product">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Product;