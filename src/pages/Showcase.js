'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class Showcase extends React.Component {
  render() {
    return (
      <div className="Showcase">
        {this.props.children}
      </div>
    );
  }
}

Showcase.propTypes = {
  children: PropTypes.any
}

export default Showcase;