'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Table from '../../../../Book/routes/BookSearch/components/Table/Table';
import {InputTree} from '../../../../../../../../../components/PageTest/ValidationForm/ValidationComponents';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import RecommendValidate from './Validate/RecommendValidate';
import styles from './ArticleSearch.scss';

const tableHead = {"recommend": "标题"};
const data = require("AssetsFolder/MockData/article/related_recommend_data.json");
let dataTree = require("AssetsFolder/MockData/tree_data.json").menu;
const fields = ['keyword', 'category'];
let lodash = require('lodash');

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      pageIndex: 1,  //页数
      rowsForOnePage: 10,  //初始每页显示的个数,
      searchData: data,
      filterName: ''
    };
    this.sourceList = [];
  }

  onPageClick(nextPageIndex) {                               //点击切换页数
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  onTypeChange(index) {
    this.setState({
      index: index
    })
  }

  selectSource(id, isSelected) {
    const {sourceList} = this;
    if (isSelected) {
      if (sourceList.indexOf(id) < 0) {
        this.sourceList = sourceList.concat(id);
      }
    } else {
      if (sourceList.indexOf(id) >= 0) {
        sourceList.splice(sourceList.indexOf(id), 1)
      } else {
        alert("该记录不存在");
      }
    }
    this.forceUpdate();
  }

  deleteRelatedSource(id) {
    const {sourceList} = this;
    sourceList.splice(sourceList.indexOf(id), 1);
    this.forceUpdate();
  }

  handleSearch(e) {
    e.preventDefault();
    let filterName = this.refs.filterName.value.trim();
    this.searchFunc(filterName, "");
    return false
  }

  searchFunc(keyword) {
    const data = lodash.clone(require("AssetsFolder/MockData/article/related_recommend_data.json"));
    let len = data.length;
    for (let i = len - 1; i >= 0; i--) {
      let item = data[i];
      if (item.recommend.indexOf(keyword) === -1) {
        data.splice(i, 1);
      }
    }
    this.setState({
      filterName: keyword,
      searchData: data
    })
  }

  render() {
    const {fields: {category}} = this.props,
      {rowsForOnePage, pageIndex, searchData} = this.state;
    let {sourceList} = this,
      totalPages = Math.ceil(this.state.searchData.length / rowsForOnePage),
      listCode = [];
    sourceList.map((item, i) => {
      listCode = listCode.concat(data.filter((dataItem) => {
        return dataItem.id == item;
      }))
    });
    listCode = listCode.map((item, i) => {
      return (
        <div className="rec-item" key={i}>
          <div className="rec-title">{item.recommend}</div>
          <div className="rec-delete" onClick={() => this.deleteRelatedSource(item.id)}>
            <span className="delete">删除</span>
          </div>
        </div>
      )
    })
    return (
      <div className="RelatedRecommend">
        <table>
          <tbody>
          <tr>
            <td className="td-lf">
              <div className="lf-main">
                <div className="td1">这里是文章信息...（略）</div>
                {
                  sourceList.length == 0 &&
                  <div className="td2">还没有任何关联信息...</div>
                }
                {listCode}
              </div>
            </td>
            <td className="td-fr">
              <div className="fr-main">
                <form className="rec-top form-inline" onSubmit={::this.handleSearch}>
                  <div className="form-group form-group-sm">
                    <InputTree className="tree" treeData={dataTree} field={category} label="所属分类" ref="category"/>
                  </div>
                  <div className="form-group form-group-sm ml10">
                    <label>关键字&nbsp;&nbsp;</label>
                    <input className="form-control" ref="filterName" defaultValue={this.state.filterName}/>
                  </div>
                  <input type="submit" className="btn btn-primary btn-sm w80 ml10"/>
                </form>
                <div className="table_main">
                  <Table headData={tableHead} contentData={searchData} isOptional={true}
                         rowsForOnePage={rowsForOnePage} pageIndex={pageIndex} selectArticle={::this.selectSource}/>
                  <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Recommend.PropTypes = {
  onChangeFunc: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'recommendform',
  fields,
  validate: RecommendValidate
})(Recommend);
