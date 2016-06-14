'use strict';
import React, {PropTypes} from 'react';

class Display extends React.Component {
  render() {
    return (
      <div className="Display">
        {this.props.children}
      </div>
    );
  }
}

Display.propTypes = {
  children: PropTypes.any
}

export default Display;