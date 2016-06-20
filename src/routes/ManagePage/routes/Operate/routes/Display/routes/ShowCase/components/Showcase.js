'use strict';
import React, {PropTypes} from 'react';

class ShowCase extends React.Component {
  render() {
    return (
      <div className="ShowCase">
        {this.props.children}
      </div>
    );
  }
}

ShowCase.propTypes = {
  children: PropTypes.any
}

module.exports = ShowCase;