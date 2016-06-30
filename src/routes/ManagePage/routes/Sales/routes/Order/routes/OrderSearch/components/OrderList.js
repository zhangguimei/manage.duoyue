/*
 *  Date    : 2016.6.28
 *  Author  : Zhang Guimei
 *  Declare : 订单管理点订单查询列表
 */
'use strict';
import React, {PropTypes} from 'react';
import OrderItem from './OrderItem';

class OrderList extends React.Component {

  render() {
    const {orderData, submitChange} = this.props;
    return (
      <div className="OrderList">
        <ul>
          {
            orderData.map((item, i) => {
              return <OrderItem orderData={item} key={i} submitChange={submitChange}/>
            })
          }
        </ul>
      </div>
    )
  }
}

OrderList.propTypes = {
  orderData: PropTypes.array,
  submitChange: PropTypes.func
};

export default OrderList;
