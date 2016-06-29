'use strict';
import React, {PropTypes} from 'react';
import styles from './Analysis.scss';

class Analysis extends React.Component {
  render() {
    return (
      <div className="Analysis">
        {this.props.children}
      </div>
    );
  }
}

Analysis.propTypes = {
  children: PropTypes.any
}

module.exports = Analysis;