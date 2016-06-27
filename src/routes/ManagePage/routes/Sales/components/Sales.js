'use strict';
import React, {PropTypes} from 'react';
import styles from './Sales.scss';

class Sales extends React.Component {
  render() {
    return (
      <div className="Sales">
        {this.props.children}
      </div>
    );
  }
}

Sales.propTypes = {
  children: PropTypes.any
}

module.exports = Sales;