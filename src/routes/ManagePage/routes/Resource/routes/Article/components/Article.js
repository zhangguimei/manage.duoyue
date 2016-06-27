'use strict';
import React from 'react';

class Article extends React.Component {
  render() {
    return (
      <div className="Article">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Article;