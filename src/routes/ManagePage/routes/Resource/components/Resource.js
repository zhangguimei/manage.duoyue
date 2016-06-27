'use strict';
import React, {PropTypes} from 'react';
import styles from './Resource.scss';

class Resource extends React.Component {
  render() {
    return (
      <div className="Resource">
        {this.props.children}
      </div>
    );
  }
}

Resource.propTypes = {
  children: PropTypes.any
}

module.exports = Resource;