/*
 *  Date    : 2016.6.28
 *  Author  : Zhang Guimei
 *  Declare : 订单管理->订单查询->订单详情
 */
'use strict';
import React, {PropTypes} from 'react';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';

class OrderDetail extends React.Component {
  render() {
    const {orderData, orderDetailData, totalPrice, toggleShipGoods} = this.props;
    const tableHead = {
      "img": "商品图",
      "bookTitle": "商品名称",
      "unitPrice": "单价",
      "count": "数量",
      "oneTypePrice": "小计",
      "no-info": ""
    };
    const tableContent = [
      orderData.productList.map((item) => {
        return {
          "imgSrc": item.imgSrc,
          "bookTitle": item.bookTitle,
          "unitPrice": item.unitPrice,
          "count": item.count,
          "oneTypePrice": item.unitPrice * item.count
        }
      })
    ][0];
    return (
      <div className="OrderDetail">
        <ShowPage {...orderDetailData} closeShowPage={orderDetailData.closeShowPage} showFooter={false}>
          <h3 className="order-detail-title">基本信息</h3>
          <div className="detail-info clearfix">
            <ul className="left">
              <li>
                <span className="detail-title">订单号</span>
                <span className="detail-content">{orderData.orderNum}</span>
              </li>
              <li>
                <span className="detail-title">订单金额</span>
                <span className="detail-content">{totalPrice}</span>
              </li>
              <li>
                <span className="detail-title">运费</span>
                <span className="detail-content">{orderData.shipment}</span>
              </li>
              <li>
                <span className="detail-title">购买用户</span>
                <span className="detail-content">{orderData.userName}</span>
              </li>
            </ul>
            <ul className="left">
              <li>
                <span className="detail-title">提交时间</span>
                <span className="detail-content">{orderData.dealTime}</span>
              </li>
              <li>
                <span className="detail-title">支付状态</span>
                <span className="detail-content">{orderData.payStatus}</span>
              </li>
              <li>
                <span className="detail-title">物流状态</span>
                  <span className="detail-content">{orderData.logisticsStatus}{orderData.logisticsStatus == "未发货" &&
                  <span className="click-ship-goods red" onClick={toggleShipGoods}>点此发货</span> }
                  </span>
              </li>
              {
                orderData.orderStatus == "申请退货" &&
                <li>
                  <span className="detail-title red">退货理由</span>
                  <span className="detail-content">{orderData.returnReason}</span>
                </li>
              }
            </ul>
          </div>
          <h3 className="order-detail-title">收货人信息</h3>
          <div className="detail-info">
            <ul>
              <li>
                <span className="detail-title">收货人</span>
                <span className="detail-content">{orderData.receiver}</span>
              </li>
              <li>
                <span className="detail-title">收货地址</span>
                <span className="detail-content">{orderData.receivePosition}</span>
              </li>
              <li>
                <span className="detail-title">联系电话</span>
                <span className="detail-content">{orderData.phoneNum}</span>
              </li>
              <li>
                <span className="detail-title">邮编</span>
                <span className="detail-content">{orderData.zipCode}</span>
              </li>
            </ul>
          </div>
          <h3 className="order-detail-title">发票信息</h3>
          <div className="detail-info">
            <ul>
              <li>
                <span className="detail-title">发票类型</span>
                <span className="detail-content">{orderData.invoiceType}</span>
              </li>
              <li>
                <span className="detail-title">发票抬头</span>
                <span className="detail-content">{orderData.invoiceTitle}</span>
              </li>
              <li>
                <span className="detail-title">发票内容</span>
                <span className="detail-content">{orderData.invoiceContent}</span>
              </li>
            </ul>
          </div>
          <h3 className="order-detail-title">备注信息</h3>
          <div className="detail-info">
            {orderData.remark}
          </div>
          <h3 className="order-detail-title">商品清单</h3>
          <div className="detail-info">
            <Table headData={tableHead} contentData={tableContent}/>
          </div>
        </ShowPage>
      </div>
    )
  }
}

OrderDetail.propTypes = {
  orderData: PropTypes.object,
  orderDetailData: PropTypes.object,
  totalPrice: PropTypes.number,
  toggleShipGoods: PropTypes.func
};

export default OrderDetail;