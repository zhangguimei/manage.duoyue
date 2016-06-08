'use strict';
import React, {PropTypes} from 'react';

class PageUser extends React.Component {
  render() {
    return (
      <div className="PageUser">
        {this.props.children}
      </div>
    );
  }
}

PageUser.propTypes = {
  children: PropTypes.any
}

export default PageUser;