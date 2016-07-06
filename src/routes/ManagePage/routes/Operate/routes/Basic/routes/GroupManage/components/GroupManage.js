/*
 *  Project : Basic
 *  Date    : 2016/7/4
 *  Author  : Melody Yuen
 *  Declare : Group Manage
 */

'use strict';
import React from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import GroupModify from './GroupModify';
import styles from './GroupManage.scss';

const groupListData = require("AssetsFolder/MockData/operate/basic/group_list_data.json");

class GroupManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      typeLayer: null,
      groupData: groupListData,
      modifyData: {}
    };
  }

  onModifyClick(type, id) {
    const {groupData} = this.state;
    this.setState({
      showLayer: true,
      typeLayer: type
    });
    if (type == 'modify') {
      this.setState({
        modifyData: groupData.filter((item) => item.id == id)[0]
      })
    } else {
      this.setState({
        modifyData: {}
      })
    }
  }

  toggleLayer() {
    this.setState({
      showLayer: !this.state.showLayer
    });
  }

  render() {
    const {showLayer, typeLayer, modifyData} = this.state;
    const pageModifyData = {
      title: typeLayer == 'modify' ? '修改群组' : '新建群组',
      width: '600px',
      height: '500px',
      closeShowPage: ::this.toggleLayer
    };
    return (
      <div className="GroupManage">
        <div className="search-bar">
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w120 ml20" value="刷新同步数据"/>
          </div>
        </div>
        <div className="group-list">
          <ul>
            {
              groupListData && groupListData.map((item, i) => {
                return (
                  <li key={i}>
                    <div className="count" onClick={() => this.onModifyClick('modify',item.id)}>{item.count}</div>
                    <div className="title">{item.title}</div>
                  </li>
                )
              })
            }
            <li className="add" onClick={() => this.onModifyClick('add')}>新增群组</li>
          </ul>
        </div>
        {
          showLayer &&
          <Modal>
            <ShowPage {...pageModifyData}>
              <GroupModify data={modifyData}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = GroupManage;