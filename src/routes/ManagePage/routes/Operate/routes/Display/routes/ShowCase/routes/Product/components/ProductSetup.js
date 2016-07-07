/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-橱窗管理-商品橱窗点设置
 */
'use strict';
import React, {PropTypes} from 'react';
import {Map, is, fromJS} from 'immutable';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';
import ProductSelect from './ProductSelect';

const tableHead = {"id": "ID", "ranko": "排序值", "img": "商品图片", "name": "商品名称", "price": "单价", "operation": "操作"};

class ProductSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectLayer: false,
      setupProducTypeData: this.getTypeData(this.props.type),
      showTable: true
    }
  }

  getTypeData(type) {
    return require("AssetsFolder/MockData/operate/display/product_list_data.json").filter(v => v.type == type).filter(v =>v.selected)
  }

  toggleSelectProductModal() {
    this.setState({
      showSelectLayer: !this.state.showSelectLayer
    })
  }

  deleteProduct(type, id) {
    if (confirm("确定要删除吗？")) {
      this.setState({
        setupProducTypeData: this.state.setupProducTypeData.filter(v => v.id != id)
      });
      this.props.onSetup(type)
    }
  }

  setupProduct(item) {
    /*保存数据到远程服务器*/
    let productList = this.state.setupProducTypeData;
    productList.push(item);
    this.setState({
      setupProducTypeData: productList,
      showSelectLayer: !this.state.showSelectLayer,
      showTable: false
    }, () => {
      this.setState({
        showTable: true
      })
    });
  }

  render() {
    let {showSelectLayer, setupProducTypeData, showTable} = this.state;
    let selectdata = {
      title: '选择商品',
      width: '80%',
      height: '80%',
      closeShowPage: ::this.toggleSelectProductModal
    };
    setupProducTypeData.map((item) => {
      item.ranko = <input type="text" defaultValue={item.rank} className="form-control input-sm w60"/>;
      item.operation = <a href="javascript:;" onClick={() => this.deleteProduct(item.type, item.id)}>删除</a>
    });
    return (
      <div className="ProductSetup">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group form-group-sm">
              <label>关键字：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary btn-sm w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w100 ml20" onClick={::this.toggleSelectProductModal}
                   value="选择商品"/>
          </div>
        </div>
        <div className="product-table">
          {showTable && <Table contentData={setupProducTypeData} headData={tableHead}/>}
        </div>
        {
          showSelectLayer &&
          <Modal>
            <ShowPage {...selectdata}>
              <ProductSelect setupProduct={::this.setupProduct}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

export default ProductSetup;