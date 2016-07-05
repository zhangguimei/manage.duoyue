/**
 * Date: 2016.06.28
 * Author: Jin-Guolong
 * Declare: ProductSearch module
 */
'use strict';
import React, {PropTypes} from 'react';

import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import Modal from 'UIComponentFolder/Modals/Modal';

import ProductModify from './ProductModify'
import styles from './ProductSearch.scss';

const tableData = require("AssetsFolder/MockData/sourcecenter/product/product_list_data.json");

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 5,
      showModifyModal: false
    };
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  selectOnChange(e) {
    let selectDOM = e.target,
      nextRowsForOnePage = selectDOM.options[selectDOM.options.selectedIndex].value,
      nextPageIndex;
    const {pageIndex, rowsForOnePage} = this.state;
    nextRowsForOnePage = parseInt(nextRowsForOnePage, 10);
    nextPageIndex = Math.ceil((rowsForOnePage * (pageIndex - 1) + 1) / nextRowsForOnePage);
    this.setState({
      pageIndex: nextPageIndex,
      rowsForOnePage: nextRowsForOnePage
    });
  }

  toggleModifyModal(id) {
    if (id) {
      //console.log(id);
      //获取弹出层数据
    }
    this.setState({
      showModifyModal: !this.state.showModifyModal
    });
  }

  pluginTableData() {
    tableData.tableContentData.forEach((item, i) => {
      item.operation = <div className="ProductSearchOperation clearfix">
        <div className="operation-btn left">下架</div>
        <div className="operation-btn left" onClick={() => this.toggleModifyModal(item.id)}>修改</div>
        <div className="operation-btn left">删除</div>
      </div>
      item.info = <div className="product-info">
        <div className="product-title">{item.title}</div>
        <div className="product-desc">有效期：<span>{item.startTime}</span>至<span>{item.endTime}</span></div>
        <div className="product-sales">销售量：<span>{item.salesNum}</span>{" "}分销量：<span>{item.subSales}</span></div>
      </div>
    });
  }

  componentWillMount() {
    this.pluginTableData();
  }

  render() {
    const {rowsForOnePage, pageIndex, showModifyModal} = this.state,
      totalPages = Math.ceil(tableData.tableContentData.length / rowsForOnePage);
    return (
      <div className="ProductSearch">
        <Table headData={tableData.tableHeadData} contentData={tableData.tableContentData}
               rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}/>
        <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                    selectOnChange={::this.selectOnChange}/>
        {
          showModifyModal &&
          <Modal onModalClick={::this.toggleModifyModal}>
            <ProductModify toggleModal={::this.toggleModifyModal}/>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = ProductSearch;