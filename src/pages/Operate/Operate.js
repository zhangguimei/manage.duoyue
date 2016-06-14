'use strict';
import React, {PropTypes} from 'react';

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

export default Operate;