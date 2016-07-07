'use strict';
import React from 'react';
import styles from './ShowRange.scss';

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