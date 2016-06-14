'use strict';
import React, {PropTypes} from 'react';

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

export default Website;