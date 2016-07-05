/*
 *  Date    : 2016.6.28
 *  Author  : Zhang Guimei
 *  Declare : 订单管理每条订单
 */
'use strict';
import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import OrderDetail from './OrderDetail';
import PostGoodsModal from './PostGoodsModal';
import BookModify from '../../../../../../Resource/routes/Book/routes/BookSearch/components/BookModify';

class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrderDetailLayer: false,
      showShipGoodsLayer: false,
      showBookSalesLayer: false
    };
  }

  toggleSalesRecord(type) {
    switch (type) {
      case "book":
        this.setState({
          showBookSalesLayer: !this.state.showBookSalesLayer
        })
        break;
      case "goods":
        this.setState({})
        break;
      default:
        this.setState({
          showBookSalesLayer: false
        })
    }
  }

  toggleOrderDetail() {
    this.setState({
      showOrderDetailLayer: !this.state.showOrderDetailLayer
    })
  }

  toggleShipGoods() {
    this.setState({
      showShipGoodsLayer: !this.state.showShipGoodsLayer
    })
  }

  render() {
    const {orderData, submitChange} = this.props,
      {showOrderDetailLayer, showShipGoodsLayer, showBookSalesLayer} = this.state;
    let orderDetailData = {
      width: "80%",
      height: "90%",
      title: "订单详情 ",
      closeShowPage: ::this.toggleOrderDetail
    };
    let shipGoodsData = {
      width: "70%",
      height: "90%",
      title: "订单发货",
      closeShowPage: ::this.toggleShipGoods
    };
    let bookDetailData = {
      width: "80%",
      height: "90%",
      title: "销售记录",
      closeShowPage: ::this.toggleSalesRecord
    };
    let totalPrice = Number(orderData.shipment);
    orderData.productList.forEach((item) => {
      totalPrice += Number(item.unitPrice * item.count);
    });
    let orderStatus = orderData.orderStatus == "待发货" || orderData.orderStatus == "申请退货" ?
      <div><span className="to-send-goods-text">{orderData.orderStatus}</span><span className="click-send-goods red"
                                                                                    onClick={::this.toggleShipGoods}>点此发货</span>
      </div> : orderData.orderStatus;

    return (
      <li className="OrderItem">
        <div className="order-item-head">
          <span className="item-title">订单号:</span>
          <span className="item-content">{orderData.orderNum}</span>
          <span className="item-title">成交时间：</span>
          <span className="item-content">{orderData.dealTime}</span>
          <span className="item-title">订单ID：</span>
          <span className="item-content">{orderData.id}</span>
          <span className="item-title">微信公众号:</span>
          <span className="item-content">{orderData.wechatName}</span>
        </div>
        <table className="order-item-content">
          <tbody>
          <tr>
            <td className="sub-table-content">
              <table className="order-sub-content">
                <tbody>
                {
                  orderData.productList.map((item, i) => {
                    return <tr className="order-sub-content-tr" key={i}>
                      <td className="item-sub-table-content book-pic">
                        <img src={item.imgSrc} className="book-img" alt="商品"
                             onClick={() => this.toggleSalesRecord(item.type)}/>
                      </td>
                      <td className="item-sub-table-content book-title">{item.bookTitle}</td>
                      <td className="item-sub-table-content book-price">{item.unitPrice}</td>
                      <td className="item-sub-table-content book-count">{item.count}</td>
                    </tr>
                  })
                }
                </tbody>
              </table>
            </td>
            <td className="item-table-content user-pic-area">
              <div className="user-pic">
                <img src={orderData.userImg} className="user-img" alt="用户头像"/>
              </div>
              <div className="user-name">{orderData.userName}</div>
            </td>
            <td className="item-table-content book-price-red">{totalPrice}
            </td>
            <td className="item-table-content">{orderStatus}</td>
            <td className="item-table-content">
              <div className="btn btn-operate" onClick={::this.toggleOrderDetail}>订单详情</div>
            </td>
            <td className="item-table-content">
              <div className="btn btn-operate">导出excel</div>
            </td>
          </tr>
          </tbody>
        </table>
        {
          showOrderDetailLayer &&
          <Modal>
            <OrderDetail orderData={orderData} totalPrice={totalPrice} orderDetailData={orderDetailData}
                         toggleShipGoods={::this.toggleShipGoods}/>
          </Modal>
        }
        {
          showShipGoodsLayer &&
          <Modal>
            <PostGoodsModal orderData={orderData} totalPrice={totalPrice} shipGoodsData={shipGoodsData}
                            submitChange={submitChange}/>
          </Modal>
        }
        {
          showBookSalesLayer &&
          <BookModify toggleModal={::this.toggleSalesRecord} bookDetailData={bookDetailData} tabIndex={9}/>
        }
      </li>

    )
  }
}

OrderItem.propTypes = {
  orderData: PropTypes.object,
  submitChange: PropTypes.func
};

export default OrderItem;
