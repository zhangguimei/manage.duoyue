/*
 *  Date    : 2016.07.05
 *  Author  : Jin-Guolong
 *  Declare : 网站管理-模板管理
 */
'use strict';
import React, {PropTypes} from 'react'
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import TemplateEditor from './TemplateEditor'

import styles from './Template.scss'

const templateManageData = require('AssetsFolder/MockData/website/template_manage_table_data.json');

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      contentData: []
    };
    this.title = "新增";
    this.modifyData = {};
  }

  modifyContent(item, i) {
    if (i == true)
      this.title = "修改";
    else
      this.title = "新增";
    this.setState({
      showLayer: !this.state.showLayer
    });
    this.modifyData = item
  }
  deleteOperation(id) {
    const {contentData} = this.state;
    this.setState({
      contentData: contentData.filter(v => v.id != id)
    });
  }

  submitChange() {
    //this.refs.AdvertiseEditor.submit();
    this.setState({
      showLayer: false
    })
  }

  pluginData() {
    templateManageData.contentData.forEach((item, i)=> {
      item.operation = <div className="templateOperation clearfix">
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item,true)}>修改</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.deleteOperation(item.id)}>删除</button>
      </div>;
    });
  }

  componentWillMount() {
    this.setState({
      contentData: templateManageData.contentData
    });
    this.pluginData();
  }

  render() {
    const {showLayer, contentData} = this.state,
          {modifyData} = this;
    let pagedata = {
        width: "50%",
        height: "90%",
        closeShowPage: ::this.modifyContent
    };
    let title = this.title + "网站模板";
    
    return (
      <div className="Template">
        <header className="search-bar">
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <label>模板名称</label>
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary ml10">查询</button>
            <button className="btn btn-primary right" onClick={::this.modifyContent}>新增网站模板</button>
          </div>
        </header>
        <TablePage headData={templateManageData.headData} contentData={contentData}/>
        {
          showLayer &&
          <Modal>
            <ShowPage  {...pagedata} submitForm={::this.submitChange} title={title}>
              <TemplateEditor data={modifyData}  />
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = Template;