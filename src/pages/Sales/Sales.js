'use strict';
import React, {PropTypes} from 'react';

class Sales extends React.Component {
  render() {
    return (
      <div className="Sales">
        {this.props.children}
      </div>
    );
  }
}

Sales.propTypes = {
  children: PropTypes.any
}

export default Sales;