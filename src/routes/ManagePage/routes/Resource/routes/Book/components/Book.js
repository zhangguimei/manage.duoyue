'use strict';
import React from 'react';

class Book extends React.Component {
  render() {
    return (
      <div className="Book">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Book;