/*
 * Created on 2016-06-29 10:27
 *
 * By Ao Zhen Zhen
 */
'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import TopicModify from './TopicModify';
import styles from './TopicList.scss';

const operData = [
  {
    'type': 'link',
    'name': '查看链接'
  },
  {
    'type': 'content',
    'name': '栏目内容'
  },
  {
    'type': 'modify',
    'name': '修改信息'
  },
  {
    'type': 'delect',
    'name': '删除'
  }
];

const tableData = require("AssetsFolder/MockData/sourcecenter/topic/topic_list_data.json");


class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.type = 0; //记录当前资源类型
    this.state = {
      showModal: false,
      list: [],
      index: 0,
      tableContent: tableData.tableContentData
    }
  }

  deleteFun(id) {
    this.setState({
      tableContent: this.state.tableContent.filter(v => v.id != id)
    });
  }

  clickOperation(type, data) {
    let index;
    let showModal = false;
    switch (type) {
      case 'link':
        index = 0;
        showModal = true;
        break;
      case 'content':
        index = 3;
        showModal = true;
        break;
      case 'modify':
        index = 1;
        showModal = true;
        break;
      case 'delect':
        this.deleteFun(data.id);
        showModal = false;
        break;
    }
    this.setState({
      showModal: showModal,
      list: data,
      index: index
    })
  }

  toggleClick(state) {
    this.setState({
      showModal: state
    });
  }

  render() {
    const {showModal, index, list, tableContent} = this.state;
    tableContent.map((item) => {
      item.operation = operData.map((oi, i) => {
        return <button index={i} className="btn btn-operate"
                       onClick={() =>this.clickOperation(oi.type, item)} key={i}>{oi.name}</button>
      })
    });


    return (
      <div className="TopicList">
        <Table contentData={tableContent} headData={tableData.tableHeadData}/>
        {
          showModal && <TopicModify index={index} list={list} showModal={showModal} toggleClick={()=>{
          this.toggleClick()}
          }/>
        }
      </div>
    )
  }
}

module.exports = TopicList;