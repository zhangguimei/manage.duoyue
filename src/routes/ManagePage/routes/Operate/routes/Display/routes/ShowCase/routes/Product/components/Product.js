/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-橱窗管理-商品橱窗
 */
'use strict';
import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';
import ProductAdd from './ProductAdd';
import ProductSetup from './ProductSetup';
import styles from './Product.scss';

const tableHeadData = {
  "id": "ID",
  "ranko": "排序",
  "displayName": "橱窗名称",
  "displayCode": "橱窗代码",
  "comNumOp": "包含商品",
  "operation": "操作"
};

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddLayer: false,
      showSetupLayer: false,
      item: {},
      type: "",
      tableContent: this.getData().tableContentData
    };
  }

  getData() {
    return require("AssetsFolder/MockData/operate/display/product_display_data.json");
  }

  toggleAddModal(item) {
    this.setState({
      showAddLayer: !this.state.showAddLayer,
      item: item
    });
  }

  toggleSetupModal(type) {
    this.setState({
      showSetupLayer: !this.state.showSetupLayer,
      type: type,
      tableContent: this.getData().tableContentData
    });
  }

  onSetup(type) {
  }

  onDeleteProductType(id) {
    if (confirm("确定要删除吗？")) {
      const {tableContent} = this.state;
      this.setState({
        tableContent: tableContent.filter(v => v.id != id)
      });
      this.forceUpdate();
    }
  }

  render() {
    const {tableContent, showAddLayer, showSetupLayer, item, type} = this.state;
    const pagedata = {
        title: '修改橱窗',
        width: '40%',
        height: '50%',
        closeShowPage: ::this.toggleAddModal
      },
      setupdata = {
        title: '设置橱窗商品',
        width: '90%',
        height: '90%',
        closeShowPage: ::this.toggleSetupModal
      };
    tableContent.map((item) => {
      item.ranko = <input type="text" className="form-control input-sm w60" defaultValue={item.rank}/>;
      item.comNumOp = <a href="javascript:;" onClick={() => this.toggleSetupModal(item.type)}>设置（{item.comNum}）</a>;
      item.operation = <div className="clearfix">
        <a href="javascript:;" className="left modify couser" onClick={() => this.toggleAddModal(item)}>修改</a>
        <div className="left">&nbsp;|&nbsp;</div>
        <a href="javascript:;" className="left delete couser" onClick={() => this.onDeleteProductType(item.id)}>删除</a>
      </div>
    });
    return (
      <div className="Product">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group form-group-sm">
              <label>关键字：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="submit" className="btn btn-primary btn-sm w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w100 ml20" value="新增橱窗"
                   onClick={::this.toggleAddModal}/>
          </div>
        </div>
        <div className="product-table">
          <Table className="table-left" contentData={tableContent} headData={tableHeadData}/>
        </div>
        {
          showAddLayer &&
          <Modal>
            <ShowPage {...pagedata}>
              <ProductAdd data={item}/>
            </ShowPage>
          </Modal>
        }
        {
          showSetupLayer &&
          <Modal>
            <ShowPage {...setupdata}>
              <ProductSetup type={type} onSetup={::this.onSetup}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

ProductSetup.propsType = {
  contentData: PropTypes.array,
  headData: PropTypes.array,
  data: PropTypes.object,
  type: PropTypes.string
};

module.exports = Product;