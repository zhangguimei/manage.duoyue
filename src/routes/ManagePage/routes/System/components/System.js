'use strict';
import React, {PropTypes} from 'react';
import styles from './System.scss';

class System extends React.Component {
  render() {
    return (
      <div className="System">
        {this.props.children}
      </div>
    );
  }
}

System.propTypes = {
  children: PropTypes.any
}

module.exports = System;