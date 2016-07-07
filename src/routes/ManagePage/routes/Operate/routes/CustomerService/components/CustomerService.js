'use strict';
import React, {PropTypes} from 'react';

class CustomerService extends React.Component {
  render() {
    return (
      <div className="CustomerService">
        {this.props.children}
      </div>
    );
  }
}

CustomerService.propTypes = {
  children: PropTypes.any
}

module.exports =  CustomerService;