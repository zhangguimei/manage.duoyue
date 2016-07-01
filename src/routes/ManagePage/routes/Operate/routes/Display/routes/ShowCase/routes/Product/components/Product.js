/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-橱窗管理-商品橱窗
 */
'use strict';
import React,{PropTypes} from 'react';
import {Map, is, fromJS} from 'immutable';
import Table from 'UIComponentFolder/Table/Table';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import ProductAdd from './ProductAdd';
import ProductSetup from './ProductSetup';
import styles from './Product.scss';
const tableData = require("AssetsFolder/MockData/operate/display/product_display_data.json");
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddLayer: false,
      showProductLayer: false,
      item: {},
      type: "",
      tableContent: tableData.tableContentData,
      productListData: []
    };
  }

  toggleModal(data) {
    const {showAddLayer} = this.state;
    this.setState({
      showAddLayer: !showAddLayer,
      item: data
    });
  }

  setupWindow(type) {
    console.log("tableContent",this.state.tableContent);
    const { showProductLayer } = this.state;
    if(!showProductLayer && type != undefined) {
      this.setState({
        type: type,
        showProductLayer: !showProductLayer,
        productListData: this.fetchData(type)
      })
    } else {
      this.setState({
        showProductLayer: !showProductLayer
      })
    }
  }

  fetchData(type) {
    const productData = require("AssetsFolder/MockData/operate/display/product_list_data.json"),
      IproductData = fromJS(productData),
      data = IproductData.get(type).toJS();
    let typeData = {
      'type': type,
      'list': data
    }
    return typeData;
  }

  onDeleteProductType(id) {
    if(confirm("确定要删除吗？")) {
      const {tableContent} = this.state;
      this.setState({
        tableContent: tableContent.filter(v => v.id != id)
      });
      this.forceUpdate();
    }
  }

  onDeleteProductList(type, id) {
    let productTypes = this.state.tableContent;
    for (let i = 0; i < productTypes.length; i++) {
      let item = productTypes[i];
      if(item.type == type) {
        item.comNum--;
        productTypes[i] = item;
        break;
      }
    }
    this.setState({
      tableContent: productTypes
    })
  }

  render() {
    const {tableContent,showAddLayer,item,showProductLayer,productListData} = this.state,
      pagedata = {
        title: '修改橱窗',
        width: '40%',
        height: '55%',
        closeShowPage: ::this.toggleModal
      },
      setupdata = {
        title: '设置橱窗商品',
        width: '90%',
        height: '90%',
        closeShowPage: ::this.setupWindow
      };
    tableContent.map((item) => {
      item.ranko = <input type="text" className="form-control input-sm w60" defaultValue={item.rank}/>;
      item.comNumOp = <a href="javascript:;" onClick={() => this.setupWindow(item.type)}>设置（{item.comNum}）</a>;
      item.operation = <div className="clearfix">
        <div className="left modify cursor" onClick={() => this.toggleModal(item)}>修改</div>
        <div className="left">&nbsp;|&nbsp;</div>
        <div className="left delete cursor" onClick={() => this.onDeleteProductType(item.id)}>删除</div>
      </div>
    });

    return (
      <div className="Product">
        <form className="form-inline form">
          <div className="form-group form-group-sm">
            <label>关键字&nbsp;&nbsp;</label>
            <input type="text" className="form-control"/>
          </div>
          <input type="submit" className="btn btn-primary btn-sm ml10 w80"/>
          <input type="button" className="btn btn-primary btn-sm ml10 w80 right" onClick={::this.toggleModal}
                 value="新增橱窗"/>
        </form>
        <div className="product-table">
          <Table contentData={tableContent} headData={tableData.tableHeadData}/>
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
          showProductLayer &&
          <Modal>
            <ShowPage {...setupdata}>
              <ProductSetup data={productListData} onDeleteFun={::this.onDeleteProductList}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}
Product.propsType = {
  contentData: PropTypes.object,
  data: PropTypes.object,
  onDeleteFun: PropTypes.func
};
module.exports = Product;