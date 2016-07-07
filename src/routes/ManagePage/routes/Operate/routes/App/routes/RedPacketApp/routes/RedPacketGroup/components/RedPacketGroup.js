/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-应用管理-红包应用-红包池
 */
'use strict';
import React from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';
import RedPacketGroupModify from './RedPacketGroupModify';
import RedPacketGroupView from './RedPacketGroupView';
import styles from './RedPacketGroup.scss';

const RedPacketData = require("AssetsFolder/MockData/operate/app/redPacketActivity_data.json"),
  tableHeadData = {
    "id": "序号",
    "title": "名称",
    "greetings": "描述",
    "limitNum": "每人限领个数",
    "operation": "操作"
  };

class RedPacketGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RedPacketData1: RedPacketData,
      item: {},
      typeLayer: null,
      showModifyLayer: false,
      showViewLayer: false
    };
  }

  toggleModifyLayer(type, item) {
    this.setState({
      showModifyLayer: !this.state.showModifyLayer,
      typeLayer: type
    });
    if(type == 'modify') {
      this.setState({
        item: item
      })
    } else {
      this.setState({
        item: {
          title:'',
          greetings:'',
          limitNum:''
        }
      })
    }
  }

  toggleViewLayer(item) {
    this.setState({
      showViewLayer: !this.state.showViewLayer,
      item: item
    });
  }

  clickDelete(id) {
    if(confirm("您确定要删除？")) {
      this.setState({
        RedPacketData1: this.state.RedPacketData1.filter(v =>v.id != id)
      })
    }
    this.forceUpdate();
  }

  render() {
    const {showModifyLayer, showViewLayer, item, typeLayer, RedPacketData1} = this.state,
      pagemodifyData = {
        title: typeLayer == 'modify' ? "修改红包池" : '新增红包池',
        width: '35%',
        height: '45%',
        closeShowPage: ::this.toggleModifyLayer
      },
      pageviewData = {
        title: '红包池应用',
        width: '45%',
        height: '45%',
        closeShowPage: ::this.toggleViewLayer
      };
    RedPacketData1.map((item) => {
      item.operation =
        <div>
          <a href="javascript:;" onClick={() =>this.toggleViewLayer(item)}>查看</a>&nbsp;|&nbsp;
          <a href="javascript:;" onClick={() =>this.toggleModifyLayer("modify",item)}>修改</a>&nbsp;|&nbsp;
          <a href="javascript:;" onClick={() =>this.clickDelete(item.id)}>删除</a>
        </div>
    });

    return (
      <div className="RedPacketGroup">
        <div className="search-bar">
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w120" onClick={() =>this.toggleModifyLayer("add")}
                   value="新增红包池"/>
          </div>
        </div>
        <div className="redPacketGroup-table">
          <Table headData={tableHeadData} contentData={RedPacketData1}/>
        </div>
        {
          showModifyLayer &&
          <Modal>
            <ShowPage {...pagemodifyData}>
              <RedPacketGroupModify data={item}/>
            </ShowPage>
          </Modal>
        }
        {
          showViewLayer &&
          <Modal>
            <ShowPage {...pageviewData}>
              <RedPacketGroupView data={item} toggleMessageLayer={::this.toggleViewLayer}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = RedPacketGroup;