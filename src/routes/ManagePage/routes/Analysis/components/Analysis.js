'use strict';
import React, {PropTypes} from 'react';

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

export default Analysis;