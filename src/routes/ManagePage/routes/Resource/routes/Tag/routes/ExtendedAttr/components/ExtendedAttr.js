/*
 *  Date    : 2016.07.07
 *  Author  : CC
 *  Declare : 扩展属性
 */
"use strict";
import React, {PropTypes} from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import Modal from 'UIComponentFolder/Modals/Modal'
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

import AttrDetail from './AttrDetail';
import KeepOption from './KeepOption';
import styles from './ExtendedAttr.scss';
const tableData = require("AssetsFolder/MockData/sourcecenter/tag/extended_attr_data.json");

class ExtendedAttr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 5,
      showDetailLayer: false,
      showOptionLayer: false,
      title: "",
      attrTitle: ""
    };
  }

  toggleDetailLayer(id) {
    const { showDetailLayer } = this.state,
      content = tableData.content;
    let title = "修改扩展属性";
    if(id == undefined) {
      title = "新增扩展属性";
      this.dataItem = {};
    }
    else {
      this.dataItem = content.filter(item => {
        return item.id == id;
      })[0];
    }
    this.setState({
      title: title,
      showDetailLayer: !showDetailLayer
    });
  }

  toggleOptionLayer(id) {
    const { showOptionLayer } = this.state;
    this.optionalItem = {};
    if(id) {
      this.optionalItem = tableData.content.filter(item => {
        return item.id == id;
      })[0];
      this.optionsData = this.optionalItem.options;
    }
    this.setState({
      showOptionLayer: !showOptionLayer,
      attrTitle: this.optionalItem.attrName
    });
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
    const { pageIndex, rowsForOnePage } = this.state;
    nextRowsForOnePage = parseInt(nextRowsForOnePage, 10);
    nextPageIndex = Math.ceil((rowsForOnePage * (pageIndex - 1) + 1) / nextRowsForOnePage);
    this.setState({
      pageIndex: nextPageIndex,
      rowsForOnePage: nextRowsForOnePage
    });
  }

  pluginTableData() {
    tableData.content.forEach((item, i) => {
      item.operation = <div className="BookSearchOperation clearfix" key={i}>
        <span className="btn btn-operate" onClick={() => this.toggleOptionLayer(item.id)}>维护可选值</span>
        <span className="btn btn-operate" onClick={() => this.toggleDetailLayer(item.id)}>修改</span>
        <span className="btn btn-operate">删除</span>
      </div>;
      item.optionsCount = tableData.content[i].options.optionContent.length;
    });
  }

  componentWillMount() {
    this.pluginTableData();
  }

  render() {
    const { rowsForOnePage, pageIndex, showDetailLayer, title, showOptionLayer, attrTitle } = this.state,
      totalPages = Math.ceil(tableData.content.length / rowsForOnePage),
      pageData = {
        title: title,
        width: '600px',
        height: '550px',
        closeShowPage: ::this.toggleDetailLayer
      },
      optionData = {
        title: attrTitle + "可选值",
        width: '80%',
        height: '85%',
        closeShowPage: ::this.toggleOptionLayer
      };
    return (
      <div className="ExtendedAttr">
        <form action="" className="form-inline search-area clearfix">
          <FormItem type="text" name="search" itemClass="inline-block form-group-sm ml10" className="form-control"/>
          <input type="button" className="btn btn-primary btn-sm ml20 w80" value="查询"/>
          <input type="button" className="btn btn-primary btn-sm ml20 w120 right" value="新增属性"
                 onClick={() => this.toggleDetailLayer()}/>
        </form>
        <div className="attr-content">
          <Table headData={tableData.head} contentData={tableData.content}
                 rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}/>
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                      selectOnChange={::this.selectOnChange}/>
        </div>
        {
          showDetailLayer &&
          <Modal>
            <ShowPage {...pageData} >
              <AttrDetail data={this.dataItem}/>
            </ShowPage>
          </Modal>
        }
        {
          showOptionLayer &&
          <Modal>
            <ShowPage {...optionData} >
              <KeepOption data={this.optionsData}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

ExtendedAttr.propTypes = {
  tableData: PropTypes.object
};

module.exports = ExtendedAttr;
