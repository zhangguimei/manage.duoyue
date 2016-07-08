'use strict';
import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Confirm from 'UIComponentFolder/Modals/Confirm';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import TablePage from 'PageComponentFolder/TablePage/TablePage';

import EresourceBasicInfo from './EresourceBasicInfo';
import EresourceModify from './EresourceModify';
import styles from './EresourceSearch.scss';

const classifyData = require("AssetsFolder/MockData/sourcecenter/eresource/eresource_classify_tree.json"),
  typeData = require("AssetsFolder/MockData/sourcecenter/eresource/eresource_type_data.json"),
  data = require("AssetsFolder/MockData/sourcecenter/eresource/eresource_search_table.json"),
  isDownLoadData = [
    {"id": 1, "value": "是"},
    {"id": 2, "value": "否"}
  ],
  typeArr = ["文章", "图片", "音频", "视频", "PDF", "TXT"];

class EresourceSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerIndex: -1
    };
    this.deleteId = -1;
    this.tabIndex = -1;
  }

  toggleLayer(index) {
    const {layerIndex} = this.state;
    this.setState({
      layerIndex: index == layerIndex ? -1 : index
    });
  }

  modifyItemFunc(param) {
    const {id, tabIndex} = param;
    this.toggleLayer(1);
    if (typeof tabIndex == 'number') {
      this.tabIndex= tabIndex;
    }
  }

  deleteItemFunc(id) {
    this.toggleLayer(3);
    this.deleteId = id;
  }

  confirmResult(result) {
    const {deleteId} = this;
    if (result) {
      console.log('删除', deleteId, '成功！');
    }
    this.toggleLayer(3);
  }

  toggleSalesStatueFunc(id) {
    //切换资源销售状态
    //console.log(id);
  }


  pluginData(data) {
    data.forEach((item)=> {
      item.pluginCover =
        <div className="cover-wrap"><img className="img" width="50" height="50" src={item.cover} alt="资源封面图"/></div>;
      item.pluginName = <div className="info-wrap text-left">
        <h5>{item.name}</h5>
        <div className="time-wrap">
          有效期：
          <time>{item.salesStartTime}</time>
          至：
          <time>{item.salesEndTime}</time>
        </div>
        <span>二维码：{item.QRCodeCount}</span>
        <span>浏览：{item.openSize}</span>
      </div>;
      item.pluginDownload = item.isDownLoad ? <span className="text-success">提供</span> :
        <span className="text-danger">否</span>;
      item.pluginStatus = item.salesState ? <span>销售中</span> : <span className="text-danger">已下架</span>;
      item.pluginType = <div className="type-wrap" onClick={()=>this.modifyItemFunc({tabIndex:2})}><h5>{typeArr[item.type]}</h5><span>({item.fileCount})</span></div>;
      item.pluginPrice = <span className="rmb">{item.price}</span>;
      item.operation = <div className="btn-wrap">
        <button className="btn btn-operate" onClick={()=>this.toggleSalesStatueFunc(item.id)}>上架</button>
        <button className="btn btn-operate" onClick={()=>this.modifyItemFunc({id:item.id,tabIndex:0})}>修改</button>
        <button className="btn btn-operate" onClick={()=>this.deleteItemFunc(item.id)}>删除</button>
      </div>
    });
  }

  componentWillMount() {
    this.pluginData(data.contentData);
  }

  render() {
    const {headData, contentData} = data,
      {layerIndex} = this.state;
    return (
      <div className="EresourceSearch">
        <header className="header search-bar">
          <form action="" className="form form-inline left">
            <div className="form-group form-group-sm tree-wrap">
              <FormItem title="资源分类" treeData={classifyData} type="tree" name="classify"
                        className="form-control inline-block classify-tree"/>
            </div>
            <div className="form-group form-group-sm">
              <FormItem title="资源类型" type="select" name="type" options={typeData}
                        className="form-control inline-block"/>
            </div>
            <div className="form-group form-group-sm">
              <FormItem title="提供下载" type="select" name="isDownload" options={isDownLoadData}
                        className="form-control ml10 inline-block"/>
            </div>
            <div className="form-group form-group-sm">
              <FormItem title="关键字" type="text" name="keyword" className="form-control inline-block"/>
            </div>
            <input type="button" className="btn btn-primary btn-sm inline-block w80" value="搜索"/>
          </form>
          <button className="btn btn-primary btn-sm right" onClick={()=>this.toggleLayer(2)}>新增资源</button>
        </header>
        <section className="content-wrap">
          <TablePage headData={headData} contentData={contentData} fixBottom={true} className="resource-table"/>
        </section>
        {
          layerIndex == 1 &&
            <Modal onModalClick={()=>this.toggleLayer(1)}>
              <EresourceModify closeShowPage={()=>this.toggleLayer(1)} tabIndex={this.tabIndex}/>
            </Modal>
        }
        {
          layerIndex == 2 &&
            <Modal onModalClick={()=>this.toggleLayer(2)}>
              <ShowPage title="新增资源" height="96%" closeShowPage={()=>this.toggleLayer(2)}>
                <EresourceBasicInfo/>
              </ShowPage>
            </Modal>
        }
        {
          layerIndex == 3 &&
          <Modal onModalClick={()=>::this.toggleLayer(3)}>
            <Confirm confirmResult={::this.confirmResult} content="确定删除么？"/>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = EresourceSearch;
