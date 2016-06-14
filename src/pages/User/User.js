'use strict';
import React, {PropTypes} from 'react';

class User extends React.Component {
  render() {
    return (
      <div className="User">
        {this.props.children}
      </div>
    );
  }
}

User.propTypes = {
  children: PropTypes.any
}

export default User;