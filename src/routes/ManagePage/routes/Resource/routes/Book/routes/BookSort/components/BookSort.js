/*
 *  Date    : 2016.07.07
 *  Author  : CC
 *  Declare : 书籍分类
 */
"use strict";
import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal'
import Confirm from 'UIComponentFolder/Modals/Confirm';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import TablePage from 'PageComponentFolder/TablePage/TablePage';

import SortDetail from './SortDetail';
import styles from './BookSort.scss';
const tableData = require("AssetsFolder/MockData/sourcecenter/book/book_sort_data.json").tableData,
  tagData = require("AssetsFolder/MockData/sourcecenter/book/book_sort_data.json").treeData;

class BookSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailLayer: false,
      showConfirm: false,
      title: ''
    };
    this.deleteId = -1;
  }

  toggleConfirm(id) {
    this.setState({
      showConfirm: !this.state.showConfirm
    });
    this.deleteId = id;
  }

  confirmResult(result) {
    const {deleteId} = this;
    if (result) {
      console.log('删除', deleteId, '成功！');
    }
    this.toggleConfirm();
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

  pluginTableData() {
    tableData.content.forEach((item, i) => {
      item.operation = <div className="clearfix" key={i}>
        <span className="btn btn-operate" onClick={() => this.toggleDetailLayer(item.id)}>修改</span>
        <span className="btn btn-operate" onClick={()=>::this.toggleConfirm(item.id)}>删除</span>
      </div>;
      item.sortNum = <div className="form-group-sm">
        <input type="text" className="w80 form-control" key={i} defaultValue={item.num}/>
      </div>;
    });
  }

  componentWillMount() {
    this.pluginTableData();
  }

  render() {
    const { showDetailLayer, showConfirm, title } = this.state,
      pageData = {
        title: title,
        width: "850px",
        height: "60%",
        closeShowPage: ::this.toggleDetailLayer
      };
    return (
      <div className="BookSort">
        <form className="form-inline search-bar clearfix">
          <FormItem type="tree" name="tagData" treeData={tagData} itemClass="inline-block form-group-sm ml10" className="form-control w300"/>
          <input type="button" className="btn btn-primary btn-sm ml20 w80" value="查询"/>
          <input type="button" className="btn btn-primary btn-sm ml20 w120 right" value="新增分类"
                 onClick={() => this.toggleDetailLayer()}/>
        </form>
        <div className="attr-content">
          <TablePage headData={tableData.head} contentData={tableData.content} fixBottom={true}/>
        </div>
        {
          showDetailLayer &&
          <Modal>
            <ShowPage {...pageData} >
              <SortDetail treeData={tagData} data={this.dataItem}/>
            </ShowPage>
          </Modal>
        }
        {
          showConfirm &&
          <Modal onModalClick={::this.toggleConfirm}>
            <Confirm confirmResult={::this.confirmResult} content="确定删除么？"/>
          </Modal>
        }
      </div>
    );
  }
}

BookSort.propTypes = {
  tableData: PropTypes.object,
  treeData: PropTypes.array
};

module.exports = BookSort;