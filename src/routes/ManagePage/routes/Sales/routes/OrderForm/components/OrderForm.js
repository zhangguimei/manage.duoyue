'use strict';
import React, {PropTypes} from 'react';
import styles from './OrderForm.scss';

class OrderForm extends React.Component {
  render() {
    return (
      <div className="OrderForm">
        订单查询首页
      </div>
    );
  }
}

OrderForm.propTypes = {
  children: PropTypes.any
}

module.exports = OrderForm;