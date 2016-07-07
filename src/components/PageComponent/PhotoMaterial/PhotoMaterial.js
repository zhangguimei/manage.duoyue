/*
 *  Project : PageComponent
 *  Date    : 2016/7/6
 *  Author  : Melody Yuen
 *  Declare : Photo Material
 */

'use strict';
import React, {PropTypes} from 'react';
import {fromJS} from 'immutable';
import Tab from 'UIComponentFolder/Tab/Tab';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import styles from './PhotoMaterial.scss';

class PhotoMaterial extends React.Component {
  static defaultProps = {
    itemsForOnePage: 10,  //分页数
    selectedData:[]
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      pageIndex: 1,  //页数
      showTable: true,
      tableData: this.fetchData(0),
      selectedID: this.props.selectedData.map((item) => item.id)
    };
  }

  fetchData(index) {
    const {data, navData} = this.props;
    const keyRoute = navData.map((item) => {
      return Object.keys(item)[0]
    });
    return fromJS(data).get(keyRoute[index]).toJS();
  }

  onTypeChange(index) {
    this.setState({
      index: index,
      pageIndex: 1,
      tableData: this.fetchData(index),
      showTable: false
    }, ()=> {
      this.setState({
        showTable: true
      })
    });
  }

  onCheckClick(id, isSelected) {
    const {selectedID} = this.state;
    if (isSelected) {
      if (selectedID.indexOf(id) < 0) {
        selectedID.push(id);
        this.setState({
          selectedID: selectedID
        });
      }
    } else {
      if (selectedID.indexOf(id) >= 0) {
        selectedID.splice(selectedID.indexOf(id), 1);
        this.setState({
          selectedID: selectedID
        });
      }
    }
  }

  onDeleteClick(id) {
    const {selectedID} = this.state;
    selectedID.splice(selectedID.indexOf(id), 1);
    this.setState({
      selectedID: selectedID
    })
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  render() {
    const {pageIndex, tableData:{tableHeadData, tableContentData}, selectedID, showTable} = this.state,
      {itemsForOnePage, data, navData} = this.props;
    const totalPages = Math.ceil(tableContentData.length / itemsForOnePage),
      tabContent = navData.map((item) => {
        return Object.values(item)[0]
      }),
      TabItemsData = {
        content: tabContent,
        tabClass: {
          tabBox: "tab-nav",
          tabItemOn: "active"
        }
      };
    let allMultiData = [];//所有类型数据
    for (let i in data) {
      allMultiData = allMultiData.concat(data[i].tableContentData);
    }
    let selectedList = [];
    selectedID.forEach((id) => {
      selectedList = selectedList.concat(allMultiData.filter((item) => item.id == id));
    });
    return (
      <div className="PhotoMaterial">
        <div className="multi-left">
          <dl className="PhotoList weixin-list">
            {
              selectedList.length > 0 ? selectedList.map((item, i) => {
                if (i == 0) {
                  return (
                    <dt key={i}>
                      <div className="title">
                        <img src={item.pic} alt={item.title}/>
                        <h5>{item.title}</h5>
                      </div>
                      <div className="delete"><a href="javascript:;" onClick={() => this.onDeleteClick(item.id)}>删除</a>
                      </div>
                    </dt>
                  )
                } else {
                  return (
                    <dd key={i}>
                      <div className="inner">
                        <div className="text">{item.title}</div>
                        <div className="pic">
                          <img src={item.pic} alt={item.title}/>
                        </div>
                      </div>
                      <div className="delete"><a href="javascript:;" onClick={() => this.onDeleteClick(item.id)}>删除</a>
                      </div>
                    </dd>
                  )
                }
              }) :
                <dt className="no-result">没有响应内容</dt>
            }
          </dl>
        </div>
        <div className="multi-main">
          <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <label>分类</label>
              <input className="form-control"/>
            </div>
            <div className="form-group form-group-sm">
              <label>文章标题</label>
              <input className="form-control"/>
            </div>
            <input className="btn btn-primary btn-sm w80" type="button" value="搜索"/>
          </div>
          <div className="table-wrap">
            {
              showTable &&
              <Table className="table-left" contentData={tableContentData} headData={tableHeadData} isOptional={true}
                     rowsForOnePage={itemsForOnePage} pageIndex={pageIndex}
                     checkBoxClick={::this.onCheckClick} initState={selectedID}/>
            }
            <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>
          </div>
        </div>
      </div>
    );
  }
}

PhotoMaterial.propTypes = {
  data: PropTypes.object.isRequired,//table数据
  navData: PropTypes.array.isRequired,//tab数据
  itemsForOnePage: PropTypes.number,//每一页的显示的数据
  selectedData: PropTypes.array//默认勾选的数据
};

export default PhotoMaterial;