'use strict';
import React, {PropTypes} from 'react';

import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Tab from 'UIComponentFolder/Tab/Tab';
import Tag from 'PageComponentFolder/Tag/Tag'
import QRcode from 'PageComponentFolder/QRcode/QRcode'
import HeaderInfo from 'PageComponentFolder/HeaderInfo/HeaderInfo'
import AssignMoney from 'PageComponentFolder/AssignMoney/AssignMoney'
import TablePage from 'PageComponentFolder/TablePage/TablePage'
import RelatedRecommend from 'PageComponentFolder/RelatedRecommend/RelatedRecommend'

import ProductBaseInfo from './ProductBasicInfo';

const keyMaps = require("AssetsFolder/MockData/sourcecenter/product/product_search_tab_data.json"),
  productInfo = require("AssetsFolder/MockData/sourcecenter/product/product_info.json"),
  tagData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json"),
  classifyInfo = require("AssetsFolder/MockData/tree_data.json").menu,
  browseHistoryTableData = require("AssetsFolder/MockData/sourcecenter/product/product_browse_table_data.json"),
  salesHistoryTableData = require("AssetsFolder/MockData/sourcecenter/product/product_sales_history.json"),
  codeData = require("AssetsFolder/MockData/sourcecenter/code_data.json"),
  fashionTableData = require("AssetsFolder/MockData/sourcecenter/product/product_fashion_table_data.json"),
  relatedTableData = require("AssetsFolder/MockData/sourcecenter/product/product_related_data.json"),
  tabContent = keyMaps.map((item) => {
    return Object.values(item)[0]
  });

let TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "tab-nav",
    tabItemOn: "active"
  }
};

class ProductModify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
    this.showPageData = {};
  }

  onTypeChange(index) {
    this.createShowPageData(index);
    this.setState({
      tabIndex: index
    })
  }

  createShowPageData(idx) {
    const {toggleModal} = this.props;
    let data = {
      title: "修改商品",
      closeShowPage: toggleModal
    };
    if (idx === 0) {
      data.ftChildren = <div><span className="submit-btn btn">确定新增</span>
        <span className="cancel-btn btn" onClick={toggleModal}>返回关闭</span></div>;
    } else if (idx === 1 || idx === 2 || idx === 5 || idx === 6) {
      data.ftChildren = <div><span className="cancel-btn btn" onClick={toggleModal}>返回关闭</span></div>;
    }
    else {
      data.showFooter = false;
    }
    this.showPageData = data;
  }

  componentWillMount() {
    this.createShowPageData(0);
  }

  render() {
    const {tabIndex} = this.state,
      {showPageData} = this;
    return (
      <ShowPage {...showPageData}>
        <from>
          <HeaderInfo data={productInfo}/>
          <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
          { tabIndex == 0 &&
          <ProductBaseInfo productInfo={productInfo} classifyInfo={classifyInfo}/>}
          { tabIndex == 1 && <Tag tagData={tagData}/>}
          { tabIndex == 2 && <QRcode data={codeData} count={10}/>}
          { tabIndex == 3 && <TablePage data={salesHistoryTableData}/> }
          { tabIndex == 4 && <TablePage data={browseHistoryTableData}/>}
          { tabIndex == 5 && <AssignMoney data={fashionTableData}/>}
          { tabIndex == 6 &&
          <RelatedRecommend relatedTableData={relatedTableData} classifyData={classifyInfo}/>}
        </from>
      </ShowPage>
    )
  }
}

ProductModify.propTypes = {
  toggleModal: PropTypes.func
}

export default ProductModify;