/*
 *  Date    : 2016.6.30
 *  Author  : Zhang-Guimei
 *  Declare : 书籍修改页
 */
'use strict';
import React, {PropTypes} from 'react';

import ShowPage from 'UIComponentFolder/Modals/ShowPage'
import Tab from 'UIComponentFolder/Tab/Tab'
import Tag from 'PageComponentFolder/Tag/Tag';
import QRcode from 'PageComponentFolder/QRcode/QRcode';
import HeaderInfo from 'PageComponentFolder/HeaderInfo/HeaderInfo';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import AssignMoney from 'PageComponentFolder/AssignMoney/AssignMoney';
import RelatedRecommend from 'PageComponentFolder/RelatedRecommend/RelatedRecommend';
import EresourceBasicInfo from './EresourceBasicInfo';
import EresourceMenu from './EresoureMenu';
import EresourceFile from './EresourceFile';

const classifyData = require("AssetsFolder/MockData/sourcecenter/eresource/eresource_classify_tree.json"),
  detailData = require("AssetsFolder/MockData/sourcecenter/eresource/eresource_detail.json"),
  tagData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json"),
  codeData = require("AssetsFolder/MockData/sourcecenter/code_data.json"),
  browseData = require("AssetsFolder/MockData/sourcecenter/book/book_browse_table_data.json"),
  AssignMoneyData = require("AssetsFolder/MockData/sourcecenter/product/product_fashion_table_data.json"),
  salesData = require("AssetsFolder/MockData/sourcecenter/book/book_sales_history_book.json"),
  relateData = require("AssetsFolder/MockData/sourcecenter/book/book_related_table_data.json"),
  tabContent = ["基本信息", "目录", "文件", "标签", "二维码", "浏览记录", "分账设置", "销售记录", "相关推荐"],
  typeArr = ["文章", "图片", "音频", "视频", "PDF", "TXT"];

let TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "tab-nav",
    tabItemOn: "active"
  }
};

class EresourceModify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: this.props.tabIndex > -1 ? this.props.tabIndex : 0
    };
    this.showPageData = {
      closeShowPage: this.props.closeShowPage,
      height: "96%"
    };
  }

  onTypeChange(index) {
    this.createShowPageData(index);
    this.setState({
      tabIndex: index
    })
  }

  createShowPageData(idx) {
    const {showPageData} = this,
      {closeShowPage} = this.props;
    showPageData.showFooter = true;
    if (idx > 0 && idx != 2) {
      showPageData.ftChildren = <button onClick={closeShowPage} className="cancel-btn btn">返回关闭</button>;
    } else if (idx == 2) {
      showPageData.showFooter = false;
    } else {
      showPageData.ftChildren = <div>
        <button className="submit-btn btn">确定新增</button>
        <button className="cancel-btn btn" onClick={closeShowPage}>返回关闭</button>
      </div>;
    }
  }


  render() {
    const {tabIndex} = this.state,
      {showPageData} = this,
      headInfoData = {
        browse: detailData.browseCount,
        scan: detailData.scanCount,
        collection: detailData.collectCount,
        comment: detailData.commentCount,
        name: detailData.name,
        update: detailData.updateTime,
        price: detailData.price,
        img: detailData.cover,
        type: typeArr[detailData.type]
      };
    return (
      <div className="EresourceModify">
        <ShowPage {...showPageData}>
          <HeaderInfo data={headInfoData}/>
          <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange} typeIndex={tabIndex}/>
          {tabIndex == 0 && <EresourceBasicInfo/>}
          {tabIndex == 1 && <EresourceMenu/>}
          {tabIndex == 2 && <EresourceFile/>}
          { tabIndex == 3 && <Tag tagData={tagData}/>}
          { tabIndex == 4 && <QRcode data={codeData} count={6}/>}
          { tabIndex == 5 &&
          <TablePage className="browse-table" headData={browseData.headData} contentData={browseData.contentData}/>}
          { tabIndex == 6 && <AssignMoney data={AssignMoneyData}/>}
          { tabIndex == 7 &&
          <TablePage className="sales-table" headData={salesData.headData} contentData={salesData.contentData}/> }
          { tabIndex == 8 &&
          <RelatedRecommend relatedTableData={relateData} classifyData={classifyData}/>}
        </ShowPage>
      </div>
    );
  }
}

EresourceModify.propTypes = {
  closeShowPage: PropTypes.func,
  tabIndex: PropTypes.number
};
export default EresourceModify;
