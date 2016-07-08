/*
 *  Date    : 2016.07.07
 *  Author  : CC
 *  Declare : 扩展属性维护可选值
 */
"use strict";
import React, {PropTypes} from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import Modal from 'UIComponentFolder/Modals/Modal'
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

import OptionDetail from './OptionDetail';
import styles from './ExtendedAttr.scss';

class KeepOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 5,
      showDetailLayer: false,
      title: ''
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

  toggleDetailLayer(id) {
    const { showDetailLayer } = this.state,
      { data } = this.props,
      content = data.optionContent;
    let title = "扩展属性修改";
    if(id == undefined) {
      title = "新增可选值";
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
    const { data } = this.props;
    data.optionContent.forEach((item, i) => {
      item.operation = <div className="BookSearchOperation clearfix" key={i}>
        <span className="btn btn-operate" onClick={() => this.toggleDetailLayer(item.id)}>修改</span>
        <span className="btn btn-operate">删除</span>
      </div>;
    });
  }

  componentWillMount() {
    this.pluginTableData();
  }

  render() {
    const { rowsForOnePage, pageIndex, showDetailLayer, title } = this.state,
      { data } = this.props,
      totalPages = Math.ceil(data.optionContent.length / rowsForOnePage),
      pageData = {
        title: title,
        width: '600px',
        height: '350px',
        closeShowPage: ::this.toggleDetailLayer
      };

    return (
      <div className="KeepOption">
        <form action="" className="form-inline search-area clearfix">
          <FormItem type="text" name="search" itemClass="inline-block ml10" itemClass="form-group-sm inline-block"
                    className="form-control"/>
          <input type="button" className="btn btn-primary btn-sm ml20 w80" value="查询"/>
          <input type="button" className="btn btn-primary btn-sm ml20 w120 right" value="新增可选值"
                 onClick={() => this.toggleDetailLayer()}/>
        </form>
        <div className="attr-content">
          <Table headData={data.optionHead} contentData={data.optionContent}
                 rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}/>
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                      selectOnChange={::this.selectOnChange}/>
        </div>
        {
          showDetailLayer &&
          <Modal>
            <ShowPage {...pageData} >
              <OptionDetail data={this.dataItem}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

KeepOption.propTypes = {
  data: PropTypes.object
};

export default KeepOption;