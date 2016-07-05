'use strict';
import React, {PropTypes} from 'react';
import styles from './Website.scss';

class Website extends React.Component {
  render() {
    return (
      <div className="Website">
        {this.props.children}
      </div>
    );
  }
}

Website.propTypes = {
  children: PropTypes.any
}

module.exports = Website;