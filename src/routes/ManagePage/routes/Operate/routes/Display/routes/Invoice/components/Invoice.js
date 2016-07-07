/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-发票选项
 */
'use strict';
import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';
import InvoiceAdd from './InvoiceAdd';
import styles from './Invoice.scss';

const tableHeadData = {
  "id": "ID",
  "ranko": "排序",
  "invoiceName": "选项名称",
  "operation": "操作"
};
class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddLayer: false,
      item: {},
      tableContent: this.getData().tableContentData
    };
  }

  getData() {
    return require("AssetsFolder/MockData/operate/display/invoice_data.json");
  }

  toggleAddModal(item) {
    this.setState({
      showAddLayer: !this.state.showAddLayer,
      item: item
    });
  }

  clickDelete(id) {
    if (confirm("确定要删除吗？")) {
      const {tableContent} = this.state;
      this.setState({
        tableContent: tableContent.filter(v => v.id != id)
      });
      this.forceUpdate();
    }
  }

  render() {
    const {tableContent, showAddLayer, item} = this.state;
    let pageadddata = {
      title: '修改发票选项',
      width: '30%',
      height: '30%',
      closeShowPage: ::this.toggleAddModal
    };
    tableContent.map((item) => {
      item.ranko = <input type="text" className="form-control input-sm w60" defaultValue={item.rank}/>;
      item.operation = <div className="clearfix">
        <div className="left cursor" onClick={() => this.toggleAddModal(item)}>修改</div>
        <div className="left">&nbsp;|&nbsp;</div>
        <div className="left cursor" onClick={() => this.clickDelete(item.id)}>删除</div>
      </div>
    });
    return (
      <div className="Invoice">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group form-group-sm">
              <label>关键字：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary btn-sm w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w120 ml20" onClick={::this.toggleAddModal}
                   value="新增发票选项"/>
          </div>
        </div>
        <div className="invoice-table">
          <Table className="table-left" contentData={tableContent} headData={tableHeadData}/>
        </div>
        {
          showAddLayer &&
          <Modal>
            <ShowPage {...pageadddata}>
              <InvoiceAdd data={item}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = Invoice;