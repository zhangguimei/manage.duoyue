'use strict';
import React, {PropTypes} from 'react';

class AuthorManage extends React.Component {
  render() {
    return (
      <div className="AuthorManage">
        {this.props.children}
      </div>
    );
  }
}

AuthorManage.propTypes = {
  children: PropTypes.any
}

module.exports =  AuthorManage;