'use strict';
import React from 'react';
import {fromJS} from 'immutable';
import Tab from 'UIComponentFolder/Tab/Tab';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import ContAdd from './ContAdd';
import styles from './TopicList.scss';


const navData = [
    {'article': '文章'},
    {'book': '书籍'},
    {'source': '资源'},
    {'commodity': '商品'},
    {'funding': '众筹'},
    {'circle': '圈子'},
    {'author': '作者'},
    {'material': '素材'},
    {'packet': '红包'},
    {'sign': '报名'}
  ],
  contLeftData = [
    {
      "id": 1,
      "title": "咨询",
      "oper": [],
      "ShowStyle": "日志",
      "order": "2"
    },
    {
      "id": 2,
      "title": "资源",
      "oper": [],
      "ShowStyle": "日志",
      "order": "2"
    }
  ],
  operData = [
    {
      'type': 'setup',
      'name': '设置'
    },
    {
      'type': 'modify',
      'name': '改'
    },
    {
      'type': 'delete',
      'name': '删'
    }
  ],
  tabContent = navData.map((item) => {
    return Object.values(item)[0]
  }),
  keyRoute = navData.map((item) => {
    return Object.keys(item)[0]
  });
let TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "tab-nav",
    tabItemOn: "active",
    tabItemDefault: ""
  }
};

class TopicCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: this.fetchData(0),
      index: 0,
      showModal: false,
      pageIndex: 1,  //页数
      itemsForOnePage: 10, //初始每页显示的个数
      list: {
        title: '',
        oper: [],
        ShowStyle: '',
        order: ''
      },
      showTable: true,
      tableData: this.fetchData(0),
      contLeftNewData: contLeftData,
      showRightColumn: false,
      title: '',
      listCode: []
    };
    this.selectedList = [];
    this.listCode = [];
  }

  componentDidMount() {
    this.setState({
      showRightColumn: false
    });
    const contentHeight = document.querySelector('.content').offsetHeight,
      topHeight = document.querySelector('.TopicTop').offsetHeight,
      navHeight = document.querySelector('.tab-nav').offsetHeight;
    const specialHeight = contentHeight - topHeight - navHeight;
    this.refs.TopicCont.style.height = specialHeight + 'px';
  }

  onPageClick(nextPageIndex) {                               //点击切换页数
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  selectSource(id, isSelected) {
    const {selectedList} = this;
    if (isSelected) {
      if (selectedList.indexOf(id) < 0) {
        this.selectedList = selectedList.concat(id);
      }
    } else {
      if (selectedList.indexOf(id) >= 0) {
        selectedList.splice(selectedList.indexOf(id), 1)
      } else {
        alert("该记录不存在");
      }
    }
    this.forceUpdate();
  }

  setupSpecial(data) {
    this.setState({
      showRightColumn: true,
      title: data.title

    });
    this.selectedList = [1, 2]
  }

  modifySpecial(data) {
    this.toggleModal();
    this.setState({
      list: data
    })
  }

  deleteCont(id) {
    this.setState({
      contLeftNewData: this.state.contLeftNewData.filter(v => v.id != id)
    });
  }

  clickOperation(type, data) {
    let index;
    switch (type) {
      case 'setup':
        this.setupSpecial(data);
        break;
      case 'modify':
        this.modifySpecial(data);
        break;
      case 'delete':
        this.deleteCont(data.id);
        break;
      default:
        index = 0;
        break;
    }
  }

  deleteRelatedSource(id) {
    const {selectedList} = this;
    selectedList.splice(selectedList.indexOf(id), 1);
    this.forceUpdate();
  }

  fetchData(index) {
    const columnData = require('AssetsFolder/MockData/sourcecenter/topic/topic_column_cont_data.json');
    let IcolumnData = fromJS(columnData);
    return IcolumnData.get(keyRoute[index]).toJS();
  }

  onTypeChange(index) {
    this.setState({
      index: index,
      pageIndex: 1,
      tableData: this.fetchData(index),
      showTable: false
    }, () => {
      this.setState({
        showTable: true
      })
    });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      addItem: {}
    });
  }

  render() {
    const {
      itemsForOnePage, pageIndex, showModal, list, showTable, tableData, contLeftNewData, title, showRightColumn
    } = this.state;
    let totalPages = Math.ceil(tableData.tableContentData.length / itemsForOnePage),
      pagedata = {
        title: '新增专题栏目',
        width: '35%',
        height: '35%',
        newPageHref: 'http://www.baidu.com',
        closeShowPage: ::this.toggleModal
      };
    let contLeftCode = contLeftNewData.map((item, index) => {
        return (
          <ul className="cont-left-row" key={index}>
            <li className="cont-left-row-title">{item.title}</li>
            <li className="cont-left-row-oper">{item.oper}</li>
          </ul>
        )
      }),
      {selectedList} = this, listCode = [];
    selectedList.map((item) => {
      listCode = listCode.concat(tableData.tableContentData.filter((dataItem) => {
        return dataItem.id == item;
      }))
    });
    listCode = listCode.map((item, index) => {
      return (
        <div className="selectedItem" key={index}>
          <div className="selected-top clearfix">
            <div className="selected-img">
              <img src={item.imgSrc}/>
            </div>
            <div className="selected-title">{item.title}</div>
          </div>
          <div className="selected-del" onClick={() => this.deleteRelatedSource(item.id)}>删除</div>
        </div>
      )
    });
    contLeftData.map((item) => {
      item.oper = operData.map((oi, index) => {
        return <a className="oper-a" key={index} onClick={() => this.clickOperation(oi.type, item)}>{oi.name}</a>
      })
    });

    return (
      <div className="TopicCont clearfix" ref="TopicCont">
        <div className="cont-left fl">
          {contLeftCode}
          <div className="cont-left-bottom"><input className="btn btn-primary w120" type="button" value="新增栏目"
                                                   onClick={::this.toggleModal}/></div>
        </div>
        <div className="cont-right">
          <div className="cont-item fl">
            {
              !showRightColumn ?
                <div className="choose-title">请选择栏目...</div> :
                <div>
                  <div className="cont-title">{title}</div>
                  {listCode}
                </div>
            }

          </div>
          <div className="cont-table">
            { !showRightColumn &&
            <div className="choose-title">请选择栏目...</div>
            }
            { showRightColumn &&
            <div>
              <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
              <div className="cont-wrap">
                <div className="form-inline cont-search">
                  <div className="form-group form-group-sm">
                    <label>分类&nbsp;&nbsp;</label>
                    <input className="form-control"/>
                  </div>
                  <div className="form-group form-group-sm ml10">
                    <label>文章标题&nbsp;&nbsp;</label>
                    <input className="form-control"/>
                  </div>
                  <input className="btn btn-primary btn-sm w80 ml10" type="button" value="搜索"/>
                </div>
                {
                  showTable &&
                  <Table contentData={tableData.tableContentData} headData={tableData.tableHeadData} isOptional={true}
                         rowsForOnePage={itemsForOnePage} pageIndex={pageIndex} checkBoxClick={::this.selectSource}
                         initState={this.selectedList}/>
                }
                <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>
              </div>
            </div>
            }
          </div>
        </div>
        {
          showModal &&
          <Modal>
            <ShowPage {...pagedata}>
              <ContAdd data={list}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

export default TopicCont;