/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-橱窗管理-商品橱窗点设置
 */
'use strict';
import React,{PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';
import ProductSelect from './ProductSelect';
const tableHead = {"id": "ID", "rank": "排序值", "img": "商品图片", "name": "商品名称", "price": "单价", "operation": "操作"};
class ProductSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableContent: this.props.data,
      showSelectLayer: false,
      selectListData: []
    };
  }

  toggleModal() {
    const {showSelectLayer} = this.state;
    this.setState({
      showSelectLayer: !showSelectLayer,
      selectListData: this.props.data
    });
  }

  deleteProduct(type, id) {
    if (confirm("确定要删除吗？")) {
      const {tableContent} = this.state;
      let list = tableContent.list.filter(v => v.id != id);
      this.setState({
        tableContent: {
          'type': type,
          'list': list
        }
      });
      this.props.onDeleteFun(type, id);
    }
  }

  render() {
    const {tableContent,showSelectLayer,selectListData} = this.state,
      selectedData = this.state.tableContent.list.filter(v => v.selected);
    tableContent.list.map((item) => {
      item.rank = <input type="text" defaultValue={item.rank} className="form-control input-sm w60"/>;
      item.operation = <a href="javascrit:;" onClick={() => this.deleteProduct(tableContent.type, item.id)}>删除</a>
    });
    let selectdata = {
      title: '选择商品',
      width: '80%',
      height: '80%',
      closeShowPage: ::this.toggleModal
    };
    return (
      <div className="ProductSetup">
        <form className="form-inline form">
          <div className="form-group form-group-sm">
            <label>关键字&nbsp;&nbsp;</label>
            <input type="text" className="form-control"/>
          </div>
          <input type="submit" className="btn btn-primary btn-sm ml10 w80"/>
          <input type="button" className="btn btn-primary btn-sm ml10 w80 right"
                 onClick={() => this.toggleModal(tableContent.type)}
                 value="选择商品"/>
        </form>
        <div className="product-table">
          <Table contentData={selectedData} headData={tableHead}/>
        </div>
        {
          showSelectLayer &&
          <Modal>
            <ShowPage {...selectdata}>
              <ProductSelect data={selectListData}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}
ProductSetup.propsType = {
  contentData: PropTypes.array,
  headData: PropTypes.array,
  data: PropTypes.object
};
export default ProductSetup;