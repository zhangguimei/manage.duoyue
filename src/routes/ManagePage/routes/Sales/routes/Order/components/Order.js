/*
 * Created on 2016-06-30 10:00
 *
 * By Zhang-Guimei
 */
'use strict';
import React, {PropTypes} from 'react';

class Order extends React.Component {
  render() {
    return (
      <div className="Order">
        {this.props.children}
      </div>
    );
  }
}

Order.propTypes = {
  children: PropTypes.any
}

module.exports = Order;