'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import CoverAdd from './CoverAdd';

const tableData = require("AssetsFolder/MockData/sourcecenter/topic/topic_cover_data.json");
const OperData = [
  {
    'type': 'modify',
    'name': '修改'
  },
  {
    'type': 'delect',
    'name': '删除'
  }
];
class TopicCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      list: {},
      tableContent: tableData.tableContentData
    };
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      list: {
        imgSrc: '',
        intro: '',
        title: '',
        order: 0,
        url: ''
      }
    });
  }

  modifySpecial(data) {
    this.setState({
      showModal: !this.state.showModal,
      list: data
    });
  }

  deleteSpecial(id) {
    this.setState({
      tableContent: this.state.tableContent.filter(v => v.id != id)
    });
  }

  clickOperation(type, data) {
    let index;
    switch (type) {
      case 'modify':
        this.modifySpecial(data);
        break;
      case 'delect':
        this.deleteSpecial(data.id);
        break;
      default:
        index = 0;
        break;
    }
  }

  render() {
    const {showModal, list, tableContent} = this.state;
    let pagedata = {
      title: "新增专题",
      newPageHref: 'http://www.baidu.com',
      width: '50%',
      height: '90%',
      closeShowPage: ::this.toggleModal
    };
    tableContent.map((item) => {
      item.operation = OperData.map((oi, i) => {
        return <button index={i} className="btn btn-operate" onClick={() =>this.clickOperation(oi.type, item)} key={i}>{oi.name}</button>
      })
    });

    return (
      <div className="TopicCover">
        <div className="text-right mb10">
          <input className="btn btn-primary w100" type="button" value="新增封面" onClick={::this.toggleModal}/>
        </div>
        <Table contentData={tableContent} headData={tableData.tableHeadData}/>
        {
          showModal &&
          <Modal onModalClick={::this.toggleModal}>
            <ShowPage {...pagedata}>
              <CoverAdd data={list}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

export default TopicCover;