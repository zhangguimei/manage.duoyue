'use strict';
import React, {PropTypes} from 'react';
import styles from './Operate.scss';

class Operate extends React.Component {
  render() {
    return (
      <div className="Operate">
        {this.props.children}
      </div>
    );
  }
}

Operate.propTypes = {
  children: PropTypes.any
}

module.exports = Operate;