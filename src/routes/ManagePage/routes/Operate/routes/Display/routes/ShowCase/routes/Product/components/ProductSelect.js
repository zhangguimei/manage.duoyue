/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-橱窗管理-商品橱窗点选择商品
 */
'use strict';
import React, {PropTypes} from 'react';
import {fromJS} from 'immutable';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
const itemForOnePage = 10;
class ProductSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1
    };
    this.totalPages = "";
    this.itemsForShow = [];
  }

  componentWillMount() {
    let Idata = fromJS(this.props.data.list);
    let tempObj = Idata.slice(0, itemForOnePage);
    this.itemsForShow = tempObj.toJS();
  }

  onPageClick(nextPageIndex) {           //点击切换页数
    this.itemsForShow = this.props.data.list.slice((nextPageIndex - 1) * itemForOnePage, nextPageIndex * itemForOnePage);
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  cilckSelectItem(item) {
  }

  render() {
    const {data} = this.props, {pageIndex} = this.state;
    const totalPages = Math.ceil(data.list.length / itemForOnePage),
      {itemsForShow} = this,
      radioStatusArr = data.list.filter((v =>v.selected)),
      selectIdArr = radioStatusArr.map((item) => {
        return item.id
      });
    return (
      <div className="ProductSelect">
        <form className="form-inline form">
          <div className="form-group form-group-sm">
            <label>关键字&nbsp;&nbsp;</label>
            <input type="text" className="form-control"/>
          </div>
          <input type="submit" className="btn btn-primary btn-sm ml10 w80"/>
        </form>
        <div className="select-cont">
          <ul className="clearfix">
            {
              itemsForShow.map((item, index) => {
                return (
                  <li className="select-item left" key={index}>
                    <div className="select-img">
                      <img src={item.imgSrc} alt={item.name}/>
                    </div>
                    <div className="select-name">{item.name}</div>
                    <div className="select-price">{item.price}</div>
                    <div className="select-radio">
                      {
                        selectIdArr.indexOf(item.id) >= 0 ? <span >已选择</span> :
                          <div className="radio">
                            <label>
                              <input type="radio" onClick={() => this.cilckSelectItem(item)} name="radio"/>请选择
                            </label>
                          </div>
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        {
          totalPages > 1 &&
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>
        }
      </div>
    )
  }
}
ProductSelect.propsType = {
  totalPages: PropTypes.number,
  index: PropTypes.number,
  name: PropTypes.object,
  price: PropTypes.object
};
export default ProductSelect;