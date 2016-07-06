/*
 *  Project : Basic
 *  Date    : 2016/7/4
 *  Author  : Melody Yuen
 *  Declare : ResponseMsg
 */

'use strict';
import React from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import ResponseModify from './ResponseModify';
import ResponseSetting from './ResponseSetting';
import styles from './ResponseMsg.scss';

const msgListData = require("AssetsFolder/MockData/operate/basic/msg_list_data.json");

class ResponseMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModifyLayer: false,
      typeLayer: null,
      msgData: msgListData,
      modifyData: {},
      showSettingLayer: false
    };
  }

  onDeleteClick(id) {
    if (confirm('您确定要删除？')) {
      const {msgData} = this.state;
      this.setState({
        msgData: msgData.filter((item) => item.id !== id)
      })
    }
  }

  onModifyClick(type, id) {
    const {msgData} = this.state;
    this.setState({
      showModifyLayer: true,
      typeLayer: type
    });
    if (type == 'modify') {
      this.setState({
        modifyData: msgData.filter((item) => item.id == id)[0]
      })
    } else {
      this.setState({
        modifyData: {}
      })
    }
  }

  onSettingClick(id) {
    const {msgData} = this.state;
    this.setState({
      showSettingLayer: true,
      modifyData: msgData.filter((item) => item.id == id)[0]
    });
  }

  toggleModifyLayer() {
    this.setState({
      showModifyLayer: !this.state.showModifyLayer
    });
  }

  toggleSettingLayer() {
    this.setState({
      showSettingLayer: !this.state.showSettingLayer
    });
  }

  render() {
    const {showModifyLayer, msgData, typeLayer, modifyData, showSettingLayer} = this.state;
    const pageModifyData = {
        title: typeLayer == 'modify' ? `${modifyData.title}` : '新增响应消息',
        width: '600px',
        height: '80%',
        closeShowPage: ::this.toggleModifyLayer
      },
      pageSettingData = {
        title: `${modifyData.title}`,
        width: '80%',
        height: '85%',
        closeShowPage: ::this.toggleSettingLayer
      };
    return (
      <div className="ResponseMsg">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group form-group-sm">
              <label>关键字：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary btn-sm w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w120 ml20" onClick={() => this.onModifyClick('add')}
                   value="新增响应消息"/>
          </div>
        </div>
        <div className="msg-list">
          <ul>
            {
              msgData && msgData.map((item, i) => {
                const {id, title, isClickEvent, selectedValue, createTime, startTime, endTime, weixinList} = item;
                return (
                  <li key={i}>
                    <p>标题说明：{title}</p>
                    <p>响应事件： {isClickEvent ? `点击菜单【${selectedValue}】` : '关注'}</p>
                    <p>创建时间：{createTime}</p>
                    <p>开始时间：{startTime}</p>
                    <p>结束时间：{endTime}</p>
                    <div className="btns">
                      <a href="javascript:;" onClick={() => this.onSettingClick(id)}>配置</a>&nbsp;|&nbsp;
                      <a href="javascript:;" onClick={() => this.onModifyClick('modify',id)}>修改</a>&nbsp;|&nbsp;
                      <a href="javascript:;" onClick={() => this.onDeleteClick(id)}>删除</a>
                    </div>
                    {
                      weixinList ?
                        <dl className="weixin-list">
                          {
                            weixinList && weixinList.map((subitem, j) => {
                              if (j == 0) {
                                return (
                                  <dt key={j}>
                                    <div className="title">
                                      <img src={subitem.pic} alt={subitem.title}/>
                                      <h5>{subitem.title}</h5>
                                    </div>
                                  </dt>
                                )
                              } else {
                                return (
                                  <dd key={j}>
                                    <div className="inner">
                                      <div className="text">{subitem.title}</div>
                                      <div className="pic">
                                        <img src={subitem.pic} alt={subitem.title}/>
                                      </div>
                                    </div>
                                  </dd>
                                )
                              }
                            })
                          }
                        </dl> :
                        <div className="no-result">没有响应内容</div>
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
        {
          showModifyLayer &&
          <Modal>
            <ShowPage {...pageModifyData}>
              <ResponseModify data={modifyData}/>
            </ShowPage>
          </Modal>
        }
        {
          showSettingLayer &&
          <Modal>
            <ShowPage {...pageSettingData}>
              <ResponseSetting data={modifyData}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = ResponseMsg;