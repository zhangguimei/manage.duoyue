/*
 *  Date    : 2016.6.28
 *  Author  : Zhang Guimei
 *  Declare : 订单管理->订单查询->发货
 */
'use strict';
import React, {PropTypes} from 'react';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';

const tableHead = {
  "code": "编号",
  "bookTitle": "商品名称",
  "unitPrice": "单价",
  "count": "数量",
  "totalPrice": "金额",
  "no-info": ""
}

class PostGoodsModal extends React.Component {
  render() {
    const {orderData, shipGoodsData, totalPrice, submitChange} = this.props;
    let tableContent = [
      orderData.productList.map((item, i) => {
        return {
          "code": i,
          "bookTitle": item.bookTitle,
          "unitPrice": item.unitPrice,
          "count": item.count,
          "totalPrice": item.unitPrice * item.count
        }
      })
    ][0].concat({
          "code": "运费",
          "totalPrice": orderData.shipment
        },
        {
          "code": "合计",
          "totalPrice": totalPrice
        }
    )
    return (
        <div className="PostGoodsModal">
          <ShowPage {...shipGoodsData} submitForm={submitChange} closeShowPage={shipGoodsData.closeShowPage}>
            <div className="ship-goods-title">发货单</div>
            <div className="ship-goods-info">
              <ul className="ship-goods-list">
                <li>
                  <span className="ship-goods-item-title">订购时间</span>
                  <span className="ship-goods-item-content">{orderData.dealTime}</span>
                </li>
                <li>
                  <span className="ship-goods-item-title">订单号</span>
                  <span className="ship-goods-item-content">{orderData.orderNum}</span>
                </li>
                <li>
                  <span className="ship-goods-item-title">收货人</span>
                  <span className="ship-goods-item-content">{orderData.receiver}</span>
                </li>
                <li>
                  <span className="ship-goods-item-title">联系电话</span>
                  <span className="ship-goods-item-content">{orderData.phoneNum}</span>
                </li>
                <li>
                  <span className="ship-goods-item-title">地址</span>
                  <span className="ship-goods-item-content">{orderData.receivePosition}</span>
                </li>
              </ul>
              <Table headData={tableHead} contentData={tableContent}/>
              <div className="ship-other-info">非常感谢您在测试组购物，我们期待您的再次光临</div>
              <div>如果您想了解我们的商品验收、退换货等政策及流程，请关注测试组微信</div>
            </div>
            <div className="ship-goods-title">物流信息</div>
            <form>
              <div className="logistics-ways">
                <lable className="logistics-ways-item">
                  <input type="radio" value="0" name="logistics" className="logistics-ways-radio"/>快递
                </lable>
                <lable className="logistics-ways-item">
                  <input type="radio" value="1" name="logistics" className="logistics-ways-radio"/>平邮
                </lable>
              </div>
              <ul>
                <li className="logistics-info">
                  <span className="logistics-info-title">物流公司</span>
                  <input type="text" className="form-control w300"/>
                </li>
                <li className="logistics-info">
                  <span className="logistics-info-title">物流单号</span>
                  <input type="text" className="form-control w300"/>
                </li>
              </ul>
            </form>
          </ShowPage>
        </div>
    )
  }
}

PostGoodsModal.propTypes = {
  orderData: PropTypes.object,
  shipGoodsData: PropTypes.object,
  totalPrice: PropTypes.number,
  submitChange: PropTypes.func
};

export default PostGoodsModal;