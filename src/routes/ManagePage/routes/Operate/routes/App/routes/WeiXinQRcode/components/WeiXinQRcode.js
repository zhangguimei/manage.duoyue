/*
 *  Date    : 2016.7.7
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-微信二维码
 */

'use strict';
import React from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import WeiXinQRcodeSetup from './WeiXinQRcodeSetup';
import WeiXinQRcodeModify from './WeiXinQRcodeModify';
import MessageViewShow from './MessageViewShow';
import styles from './WeiXinQRcode.scss';

const WeiXinQRcodeData = require("AssetsFolder/MockData/operate/app/weiXinQRcode_data.json");

class WeiXinQRcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WeiXinQRcodeDataq: WeiXinQRcodeData,
      showViewLayer: false,
      showModifyLayer: false,
      showMessageLayer: false,
      typeLayer: null,
      item: {},
      item2: {}
    };
  }

  toggleViewLayer(message) {
    this.setState({
      showViewLayer: !this.state.showViewLayer,
      item2: message
    });
  }

  toggleModifyLayer(type, id) {
    this.setState({
      showModifyLayer: !this.state.showModifyLayer,
      typeLayer: type
    });
    if (type == 'add') {
      this.setState({
        item: {}
      })
    } else {
      this.setState({
        item: this.state.WeiXinQRcodeDataq.filter((item) => item.id == id)[0]
      })
    }
  }

  toggleMessageLayer(item) {
    if (!this.state.showMessageLayer && item != undefined) {
      this.setState({
        showMessageLayer: !this.state.showMessageLayer,
        item: item
      });
    } else {
      this.setState({
        showMessageLayer: !this.state.showMessageLayer
      });
    }
  }

  clickDelete(id) {
    if (confirm("您确定要删除？")) {
      this.setState({
        WeiXinQRcodeDataq: this.state.WeiXinQRcodeDataq.filter(v => v.id != id)
      })
    }
    this.forceUpdate();
  }

  render() {
    console.log("WeiXinQRcodeData", WeiXinQRcodeData);
    const {showViewLayer, showModifyLayer, item, showMessageLayer, item2, WeiXinQRcodeDataq, typeLayer} = this.state,
      pageviewData = {
        title: '二维码视图',
        width: '90%',
        height: '90%',
        closeShowPage: ::this.toggleViewLayer
      },
      pagemodifyData = {
        title: typeLayer == 'modify' ? `二维码视图` : '新增二维码',
        width: '35%',
        height: '35%',
        closeShowPage: ::this.toggleModifyLayer
      },
      pageMessageData = {
        title: '信息视图',
        width: '65%',
        height: '75%',
        closeShowPage: ::this.toggleMessageLayer
      };
    WeiXinQRcodeDataq.map((item) => {
      item.operation =
        <div className="oper clearfix">
          <a href="javascript:;" onClick={() =>this.toggleViewLayer(item)}>配置</a>
          <a href="">&nbsp;|&nbsp;</a>
          <a href="javascript:;" onClick={() =>this.toggleModifyLayer('modify',item.id)}>修改</a>
          <a href="">&nbsp;|&nbsp;</a>
          <a href="javascript:;" onClick={() =>this.clickDelete(item.id)}>删除</a>
        </div>
    });
    return (
      <div className="WeiXinQRcode">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group form-group-sm">
              <label>关键字：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary btn-sm w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w120 ml20"
                   onClick={() =>this.toggleModifyLayer('add')}
                   value="新增二维码"/>
          </div>
        </div>
        <div className="qrcode-content clearfix">
          {
            WeiXinQRcodeDataq.map((item, index) => {
              return (
                <div className="qrcode-item left" key={index}>
                  <div className="qrcode-item-top">
                    <div className="qrcode-img left">
                      <img src={item.QRcodeImg} alt=""/>
                    </div>
                    <div className="qrcode-info">
                      <div className="qrcode-tit">{item.QRcodeTitle}</div>
                      <div className="qrcode-explain color">{item.QRcodeExplain}</div>
                      <div className="qrcode-data color">{item.publishData}</div>
                      <div>{item.operation}</div>
                    </div>
                  </div>
                  {
                    item.QRcodeData.length ? <ul className="qrcode-item-main">
                      {
                        item.QRcodeData.map((list, i) => {
                          return (
                            <li key={i}>
                              {
                                i == 0 &&
                                <a className="item" href="javascript:;" onClick={() =>this.toggleMessageLayer(list)}>
                                  <div className="qrcode-tip-tit">{list.title}</div>
                                  <div className="qrcode-tip-img">
                                    <img src={list.pic} alt={list.pic}/>
                                    <div className="meg-tit">{list.title}</div>
                                  </div>
                                  {
                                    item.length == 1 && <div>
                                      <div className="qrcode-tip-abstract">{item.itemAbstract}</div>
                                      <div><a href="javascript:;" onClick={() => this.props.toggleMessageLayer(item)}>查看全文</a>
                                      </div>
                                    </div>
                                  }
                                </a>
                              }
                              {
                                i > 0 &&
                                <a className="item" href="javascript:;" onClick={() =>this.toggleMessageLayer(list)}>
                                  <div className="qrcode-item-tit">{list.title}</div>
                                  <div className="qrcode-item-img pic">
                                    <img src={list.pic} alt={list.pic}/>
                                  </div>
                                </a>
                              }
                            </li>
                          )
                        })}
                    </ul> : <div className="onMessage">没有响应信息</div>
                  }
                </div>
              )
            })
          }
        </div>
        {
          showViewLayer &&
          <Modal>
            <ShowPage {...pageviewData}>
              <WeiXinQRcodeSetup data={item2} toggleMessageLayer={::this.toggleMessageLayer}/>
            </ShowPage>
          </Modal>
        }
        {
          showModifyLayer &&
          <Modal>
            <ShowPage {...pagemodifyData}>
              <WeiXinQRcodeModify data={item}/>
            </ShowPage>
          </Modal>
        }
        {
          showMessageLayer &&
          <Modal>
            <ShowPage {...pageMessageData}>
              <MessageViewShow data={item}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = WeiXinQRcode;