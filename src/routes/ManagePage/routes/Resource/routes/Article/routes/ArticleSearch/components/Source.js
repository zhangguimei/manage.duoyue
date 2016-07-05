'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS} from 'immutable';
import * as actions from 'ActionsFolder/ArticleActions';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import Tab from 'UIComponentFolder/Tab/Tab';
import styles from './ArticleSearch.scss';

const headData = [{'books': '书籍'}, {'source': '资源'}, {'commodity': '商品'}, {'funding': '众筹'}];
const tableHead = {"title": "标题"};
const tabContent = headData.map((item) => {
  return Object.values(item)[0]
});

const TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "tab-nav",
    tabItemOn: "active",
    tabItemDefault: ""
  }
};

class Source extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      display: true,
      index: 0,
      pageIndex: 1,  //页数
      itemsForOnePage: 10, //初始每页显示的个数
      filterName: '',
      searchData: this.fetchData(0)
    };
    this.resourceData = '';
    this.sourceList = [];
  }

  onPageClick(nextPageIndex) {                               //点击切换页数
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  onTypeChange(index) {
    this.setState({
      index: index,
      pageIndex: 1,
      searchData: this.fetchData(index)
    })
  }

  fetchData(index) {
    const sourceData = require("AssetsFolder/MockData/sourcecenter/article/article_item_data.json");
    let IsourceData = fromJS(sourceData);
    let data;
    switch (index) {
      case 0:
        data = IsourceData.get('source').toJS();
        break;
      case 1:
        data = IsourceData.get('book').toJS();
        break;
      case 2:
        data = IsourceData.get('commodity').toJS();
        break;
      case 3:
        data = IsourceData.get('funding').toJS();
        break;
      default:
        data = IsourceData.get('source').toJS();
    }
    return data;
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
    sourceList.splice(sourceList.indexOf(id), 1)
    this.forceUpdate();
  }

  handleSearch(e) {
    e.preventDefault();
    let filterName = this.refs.filterName.value.trim();
    this.searchFunc(filterName);
  }

  searchFunc(keyword) {
    const {index} = this.state;
    let data = this.fetchData(index);
    let len = data.length;
    for (let i = len - 1; i >= 0; i--) {
      let item = data[i];
      if (item.title.indexOf(keyword) === -1) {
        data.splice(i, 1);
      }
    }
    this.setState({
      filterName: keyword,
      searchData: data
    });

    this.forceUpdate();
  }

  componentWillMount() {
    let {actions:{fetchResourceData}} = this.props;
    this.resourceData = fetchResourceData('source');
  }

  render() {
    const {index, itemsForOnePage, pageIndex, searchData} = this.state;
    let data = this.fetchData(index),
      {sourceList} = this,
      totalPages = Math.ceil(searchData.length / itemsForOnePage),
      listCode = [];
    sourceList.map((item, i) => {
      listCode = listCode.concat(data.filter((dataItem) => {
        return dataItem.id == item;
      }))
    });
    listCode = listCode.map((item, i) => {
      return (
        <div className="source-item" key={i}>
          <div className="title">
            {item.title}
          </div>
          <div className="main">
            <div className="pic"><a><img src={item.pic} alt={item.title} title={item.title}/></a></div>
            <div className="fr">
              <div className="price">售价：
                <sapn className="red">￥{item.price}</sapn>
              </div>
              <div className="num">购买数量：<span className="add"><a className="add-a">-</a><a className="add-a">1</a><a
                className="add-a">+</a></span></div>
              <div className="intro">{item.intro}</div>
              <div className="button">
                <div className="buy-button">立即购买</div>
                <div className="car-button">加入购物车</div>
              </div>
            </div>
          </div>
          <div className="delete" onClick={() => this.deleteRelatedSource(item.id)}>删除</div>
        </div>
      )
    });
    return (
      <div className="SourcePage">
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
              <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
              <div className="fr-main">
                <div className="rec-top">
                  <form className="form-inline" action="" onSubmit={::this.handleSearch}>
                    <div className="form-group form-group-sm">
                      <label>关键字&nbsp;&nbsp;</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <input type="submit" className="btn btn-primary btn-sm ml10 w80"/>
                  </form>
                </div>
                <div className="table_main">
                  <Table headData={tableHead} contentData={searchData} isOptional={true}
                         rowsForOnePage={itemsForOnePage} pageIndex={pageIndex} checkBoxClick={::this.selectSource}/>
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

Source.PropTypes = {
  src: PropTypes.String,
  onChangeFunc: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  let {article:{resourceData}} = fromJS(state).toJS();
  return {
    resourceData: resourceData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Source);