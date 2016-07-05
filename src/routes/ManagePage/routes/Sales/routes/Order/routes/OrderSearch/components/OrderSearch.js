/*
 *  Date    : 2016.6.28
 *  Author  : Zhang Guimei
 *  Declare : 订单管理订单查询入口
 */
'use strict';
import React, {PropTypes} from 'react';
import {fromJS} from 'immutable';
import Tab from 'UIComponentFolder/Tab/Tab';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import Modal from 'UIComponentFolder/Modals/Modal'
import ChooseGoods from './ChooseGoods';
import OrderList from './OrderList';
import styles from './OrderSearch.scss';

const tabData = require("AssetsFolder/MockData/sales/order/order_search_tab_data.json"),
  wechatList = require("AssetsFolder/MockData/sales/order/wechat_list_data.json"),
  goodsListData = require("AssetsFolder/MockData/sales/order/goods_list_data.json"),
  orderList = require("AssetsFolder/MockData/sales/order/order_list_data.json");
const numsForOnePage = 10;
const tabContent = tabData.map((item) => {
  return Object.values(item)[0]
});

const TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "tab-nav",
    tabItemOn: "active"
  }
};

class OrderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      startDate: '',
      endDate: '',
      showChooseGoodsLayer: false,
      searchGoodsName: "",
      searchGoodsId: "",
      pageIndex: 1
    };
    this.dataForShow = [];
    this.totalPages = "";
  }

  checkDate(start, end) {
    if(!start || !end) {
      return
    }
    start = new Date(start);
    end = new Date(end);
    this.setState({
      check: !(end < start)
    });
    (end < start) &&
    console.log('开始时间不能大于结束时间')
  }

  getPickDate(date) {
    const {endDate} = this.state;
    this.setState({
      startDate: date
    });
    this.checkDate(date, endDate)
  }

  getPickDateEnd(date) {
    const {startDate} = this.state;
    this.setState({
      endDate: date
    });
    this.checkDate(startDate, date)
  }

  onTypeChange(index) {
    let tempArr = fromJS(orderList).toJS();
    switch (index) {
      case 1:
        tempArr = tempArr.filter(v => v.orderStatus == "待支付");
        break;
      case 2:
        tempArr = tempArr.filter(v => v.orderStatus == "待发货");
        break;
      case 3:
        tempArr = tempArr.filter(v => ( v.orderStatus == "待收货" || v.orderStatus == "申请退货" ));
        break;
      case 4:
        tempArr = tempArr.filter(v => v.orderStatus == "申请退货");
        break;
      case 5:
        tempArr = tempArr.filter(v => v.orderStatus == "已完成");
        break;
      default:
        tempArr = tempArr;
    }
    this.setState({
      pageIndex: 1,
      tabIndex: index,
      orderListArr: tempArr
    });
    this.totalPages = Math.ceil(tempArr.length / numsForOnePage);
    this.dataForShow = tempArr.slice(0, numsForOnePage);
  }


  toggleChooseGoods() {
    this.setState({
      showChooseGoodsLayer: !this.state.showChooseGoodsLayer
    });
  }

  chooseGoods(id) {
    this.setState({
      searchGoodsId: id,
      searchGoodsName: goodsListData.filter(v => v.id == id)[0].title,
      showChooseGoodsLayer: !this.state.showChooseGoodsLayer
    })
  }

  clearGoods() {
    this.setState({
      searchGoodsId: "",
      searchGoodsName: ""
    })
  }

  onPageClick(nextPageIndex) {
    const {orderListArr} = this.state;
    const {dataForShow} = this;
    this.dataForShow = orderListArr.slice((nextPageIndex - 1) * numsForOnePage, nextPageIndex * numsForOnePage);
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  submitChange() {
    //点击订单发货页确定提交表单
  }

  searchForm() {
    const {searchGoodsId, startDate, endDate} = this.state;
    let tempArr = fromJS(this.dataForShow).toJS(), selectBoxValue = this.refs.selectBox.value,
      orderNumValue = this.refs.orderNum.value, itemData, dealTime, startTime, endTime;
    tempArr = selectBoxValue && selectBoxValue != "全部" ? tempArr.filter(v => v.wechatName == selectBoxValue) : tempArr;
    let selectGoodsData = tempArr.map((item) => {
      itemData = item.productList.filter(v => v.id == searchGoodsId);
      return itemData.length > 0 && item
    })
    tempArr = searchGoodsId ? selectGoodsData.filter(v => v != false) : tempArr;
    tempArr = orderNumValue ? tempArr.filter(v => v.orderNum == orderNumValue) : tempArr;
    let filterTimeData = tempArr.map((item) => {
      dealTime = new Date(item.dealTime);
      startTime = new Date(startDate);
      endTime = new Date(endDate);
      return startTime <= dealTime && dealTime <= endTime && item
    });
    tempArr = startDate && endDate ? filterTimeData.filter(v => v != false) : tempArr;
    this.totalPages = Math.ceil(tempArr.length / numsForOnePage);
    this.dataForShow = tempArr;
    this.forceUpdate();
  }

  componentWillMount() {
    let tempArr = fromJS(orderList).toJS();
    this.totalPages = Math.ceil(tempArr.length / numsForOnePage);
    if(tempArr.length > 0) {
      tempArr = tempArr.slice(0, numsForOnePage);
    }
    this.setState({
      orderListArr: tempArr
    })
  }

  render() {
    const {showChooseGoodsLayer, searchGoodsName, pageIndex} = this.state,
      {dataForShow, totalPages} = this;
    let datePickerData = {
      format: 'yyyy-mm-dd hh:ii:ss ',
      dateValue: '2016-5-29 00:10:12',
      placeHolder: '请选择日期 ',
      showTimePanel: true
    };
    let chooseGoodsData = {
      width: "80%",
      height: "80%",
      title: "选择商品",
      closeShowPage: ::this.toggleChooseGoods
    };
    return (
      <div className="OrderSearch">
        <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
        <div className="search-area">
          <form className="form-inline">
            <span className="search-item-name">微信公众号</span>
            <select className="form-control w120" ref="selectBox">
              <option>全部</option>
              {
                wechatList.map((item, i) => {
                  return <option value={item.title} key={i}>{item.title}</option>
                })
              }
            </select>
            <span className="search-item-name">收货人/订单号</span>
            <input type="text" className="form-control w200" id="order-input" ref="orderNum"/>
            <span className="search-item-name">商品</span>
            <span className="goods-box" onClick={::this.toggleChooseGoods}>{searchGoodsName}</span>
            <span className="clear-goods" onClick={::this.clearGoods}>清除</span>
            <span className="search-item-name">起始时间</span>
            <DatePicker data={datePickerData} getPickDate={::this.getPickDate}/>
            <span>至</span>
            <DatePicker data={datePickerData} getPickDate={::this.getPickDateEnd}/>
            <input type="submit" value="搜索" className="btn btn-primary btn-sm ml10 w80" onClick={::this.searchForm}/>
          </form>
        </div>
        <OrderList orderData={dataForShow} submitChange={::this.submitChange}/>
        { totalPages > 1 && <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/> }
        {
          showChooseGoodsLayer &&
          <Modal>
            <ChooseGoods chooseGoodsData={chooseGoodsData} goodsListData={goodsListData}
                         chooseGoods={::this.chooseGoods}/>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = OrderSearch;
