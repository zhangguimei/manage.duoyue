'use strict';
import React from 'react';

class Resource extends React.Component {
  render() {
    return (
      <div className="Resource">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Resource;