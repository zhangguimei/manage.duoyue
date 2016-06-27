import React, {PropTypes} from 'react';
import styles from './recommend.scss';
import Table from '../BookManage/BookSearch/Table/Table';
import {reduxForm} from 'redux-form';
import {InputTree} from '../PageTest/ValidationForm/ValidationComponents';
import Pagination from '../UIComponent/Pagination/Pagination';
import RecommendValidate from './Validate/RecommendValidate';

const tableHead = {"recommend": "标题"};
const data = require("../../assets/MockData/sourcecenter/related_recommend_data.json");
let dataTree = require("../../assets/MockData/tree_data.json").menu;
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
    const data = lodash.clone(require("../../assets/MockData/sourcecenter/related_recommend_data.json"));
    let len = data.length;
    let i;
    for (i = len - 1; i >= 0; i--) {
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
                <form className="rec-top" onSubmit={::this.handleSearch}>
                  <ul className="search">
                    <li className="search-li">
                      <InputTree className="tree" treeData={dataTree} field={category} label="所属分类" ref="category"/>
                    </li>
                    <li className="search-li">
                      <span className="search-label">关键字</span>
                      <input className="search-keyword" ref="filterName" type="text"
                             defaultValue={this.state.filterName}/>
                    </li>
                    <li className="search-li">
                      <input className="button-search" type="submit" value="搜索"/>
                    </li>
                  </ul>
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
