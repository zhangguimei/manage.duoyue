'use strict'
/*
 *  Project : website Area
 *  Date    : 2016.07.05
 *  Author  : jinguolong
 *  Declare : 系统管理-角色权限
 */

import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import UserAuthorityEditor from './UserAuthorityEditor'

import styles from './UserAuthority.scss';

const AuthorityData = require('AssetsFolder/MockData/system/user_authority_table_data.json'),
      classifyInfo = require("AssetsFolder/MockData/tree_data.json").menu;

class UserAuthority extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      showModifyLayer: false,
      contentData: []
    };
    this.title = "新增角色信息";
    this.isPermit = false;
    this.modifyData = {};
  }

  modifyContent(item,i) {
    if (i=="change") {
      this.title = "修改角色信息";
      this.isPermit = false;
      }
    else if (i=="permit") {
      this.title = "分配权限";
      this.isPermit = true;
      }
      else {
        this.title = "新增角色信息";
        this.isPermit = false;
        }
    this.setState({
      showModifyLayer: !this.state.showModifyLayer
    });
    this.modifyData = item
  }

  submitChange() {
    //this.refs.AdvertiseEditor.submit();
    this.setState({
      showModifyLayer: false
    })
  }

  deleteOperation(id) {
    const {contentData} = this.state;
    this.setState({
      contentData: contentData.filter(v => v.id != id)
    });
  }

  pluginData() {
    AuthorityData.contentData.forEach((item,i)=>{
      item.operation = <div className="AuthorityOperation clearfix">
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item,"change")}>修改</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.deleteOperation(item.id)}>删除</button>
      </div>
      item.permission = <button className="btn btn-operate center" onClick={() => this.modifyContent(item,"permit")}>分配权限</button>
    });
  }

  componentWillMount() {
    this.setState({
      contentData: AuthorityData.contentData
    });
    this.pluginData();
  }

  render() {
    const {modifyData, title, isPermit} = this,
        {showModifyLayer} = this.state,
        {contentData} = this.state;
    let pagedata = {
      width: "50%",
      height: "90%",
      closeShowPage: ::this.modifyContent
    };
    return (
      <div className="UserAuthority">
        <header className="search-bar">
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary ml10">查询</button>
            <button className="btn btn-primary right" onClick={::this.modifyContent}>新增角色</button>
          </div>
        </header>
        <TablePage headData={AuthorityData.headData} contentData={contentData} />
        {
          showModifyLayer &&
          <Modal>
            <ShowPage  {...pagedata} submitForm={::this.submitChange} title={title}>
              <UserAuthorityEditor data={modifyData} isPermit={isPermit} classifyInfo={classifyInfo}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = UserAuthority;