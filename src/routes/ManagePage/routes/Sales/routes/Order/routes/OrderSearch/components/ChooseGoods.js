/*
 *  Date    : 2016.6.28
 *  Author  : Zhang Guimei
 *  Declare : 选择商品
 */
'use strict';
import React, {PropTypes} from 'react';
import {fromJS} from 'immutable';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Tab from 'UIComponentFolder/Tab/Tab';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import classNames from 'classnames';
import styles from './ChooseGoods.scss';

const tabData = require("AssetsFolder/MockData/sales/order/choose_goods_tab_data.json");
const tabContent = tabData.map((item) => {
  return Object.values(item)[0]
});
const numsForOnePage = 12;
const TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "tab-nav",
    tabItemOn: "active"
  }
};
class ChooseGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      pageIndex: 1
    };
    this.dataForShow = [];
    this.totalPages = "";
  }

  onTypeChange(index) {
    const {goodsListData} = this.props;
    let goodsArr = fromJS(goodsListData).toJS();
    switch (index) {
      case 0:
        goodsArr = goodsArr.filter(v => v.type == "商品");
        break;
      case 1:
        goodsArr = goodsArr.filter(v => v.type == "书籍");
        break;
      case 2:
        goodsArr = goodsArr.filter(v => v.type == "资源");
        break;
      default:
        goodsArr = goodsArr.filter(v => v.type == "商品");
    }
    this.setState({
      tabIndex: index,
      listData: goodsArr,
      pageIndex: 1
    })
    this.totalPages = Math.ceil(goodsArr.length / numsForOnePage);
    this.dataForShow = goodsArr.slice(0, numsForOnePage);
  }

  onPageClick(nextPageIndex) {
    const {listData} = this.state;
    this.dataForShow = listData.slice((nextPageIndex - 1) * numsForOnePage, nextPageIndex * numsForOnePage);
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  searchGoods() {
    let keyword = this.refs.keywordBox.value;
    this.dataForShow = keyword != "" ? this.dataForShow.filter(v => v.title.indexOf(keyword) >= 0) : this.dataForShow;
    this.totalPages = Math.ceil(this.dataForShow.length / numsForOnePage);
    this.forceUpdate();
  }

  componentWillMount() {
    const {goodsListData} = this.props;
    let goodsArr = fromJS(goodsListData).toJS();
    if(goodsArr.length > 0) {
      goodsArr = goodsArr.filter(v => v.type == "商品").slice(0, numsForOnePage);
    }
    this.totalPages = Math.ceil(goodsListData.filter(v => v.type == "商品").length / numsForOnePage);
    this.setState({
      listData: goodsArr
    });
  }

  render() {
    const {pageIndex} = this.state,
      {chooseGoodsData, chooseGoods} =this.props,
      {totalPages} = this;
    return (
      <div className="ChooseGoods">
        <ShowPage {...chooseGoodsData} showFooter={false}>
          <div className="choose-goods-data">{chooseGoodsData.title}</div>
          <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
          <div className="choose-goods-content">
            <form className="form-box form-inline">
              <span>关键字：</span>
              <input type="text" className="form-control w180" ref="keywordBox"/>
              <input type="button" value="搜索" className="submit-btn" onClick={::this.searchGoods}/>
            </form>
            <ul className="choose-goods-list">
              {
                this.dataForShow.map((item, i) => {
                  return <li className={classNames('choose-goods-item left',{'newline':i==6})} key={i}>
                    <div className="goods-item-content">
                      <div className="goods-pic">
                        <img src={item.pic} className="goods-img"/>
                      </div>
                      <div className="goods-title">{item.title}</div>
                      <div className="goods-price">{item.price}</div>
                      <div className="choose-radio-box">
                        <label className="radio-lable" onClick={() => chooseGoods(item.id)}>
                          <input type="radio" className="choose-radio" value="0"/>选择
                        </label>
                      </div>
                    </div>
                  </li>
                })
              }
            </ul>
          </div>
          {totalPages > 1 && <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>}
        </ShowPage>
      </div>
    )
  }
}

ChooseGoods.propTypes = {
  chooseGoodsData: PropTypes.object,
  chooseGoods: PropTypes.func
};

export default ChooseGoods;
