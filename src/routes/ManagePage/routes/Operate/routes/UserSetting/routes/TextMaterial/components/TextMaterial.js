/*
 *  Project : User Setting
 *  Date    : 2016/7/1
 *  Author  : Melody Yuen
 *  Declare : TextMaterial
 */

'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import TextModify from './TextModify';
import styles from './TextMaterial.scss';

const tableData = require("AssetsFolder/MockData/operate/usersetting/text_list_data.json");

class TextMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      typeLayer: null,
      tableContent: tableData.tableContentData,
      modifyData: {}
    };
  }

  onDeleteClick(id) {
    if (confirm('您确定要删除？')) {
      const {tableContent} = this.state;
      this.setState({
        tableContent: tableContent.filter((item) => item.id !== id)
      })
    }
  }

  onModifyClick(type, id) {
    const {tableContent} = this.state;
    this.setState({
      showLayer: true,
      typeLayer: type
    });
    if (type == 'modify') {
      this.setState({
        modifyData: tableContent.filter((item) => item.id == id)[0]
      })
    } else {
      this.setState({
        modifyData: {}
      })
    }
  }

  toggleLayer() {
    this.setState({
      showLayer: !this.state.showLayer
    });
  }

  submitForm() {
  }

  render() {
    const {showLayer, tableContent, typeLayer, modifyData} = this.state;
    tableContent.forEach((item) => {
      item.operation =
        <div>
          <a href="javascript:" onClick={() => this.onModifyClick('modify',item.id)}>修改</a>
          &nbsp;|&nbsp;
          <a href="javascript:;" onClick={() => this.onDeleteClick(item.id)}>删除</a>
        </div>;
    });
    const pagedata = {
      title: typeLayer == 'modify' ? '修改文本素材' : '新增文本素材',
      width: '450px',
      height: '350px',
      closeShowPage: ::this.toggleLayer,
      submitForm: ::this.submitForm
    };
    return (
      <div className="TextMaterial">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group">
              <label>书名：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary w120" value="新增文本素材"
                   onClick={() => this.onModifyClick('add')}/>
          </div>
        </div>
        <div className="table-wrap">
          <Table contentData={tableContent} headData={tableData.tableHeadData}/>
        </div>
        {
          showLayer &&
          <Modal>
            <ShowPage {...pagedata}>
              <TextModify data={modifyData}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = TextMaterial;