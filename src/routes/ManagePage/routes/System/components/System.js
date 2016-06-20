'use strict';
import React, {PropTypes} from 'react';

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

export default System;