/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-红包应用
 */

'use strict';
import React from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import RedPacketAdd from './RedPacketAdd';
import RedPacketModify from './RedPacketModify';
import styles from './RedPacketActivity.scss';

const RedPacketData = require("AssetsFolder/MockData/operate/app/redPacketActivity_data.json");

class RedPacketActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RedPacketData: RedPacketData,
      showModifyLayer: false,
      showAddLayer: false,
      item: {}
    };
  }

  toggleModifyLayer(item) {
    this.setState({
      showModifyLayer: !this.state.showModifyLayer,
      item: item
    });
  }

  toggleAddLayer() {
    this.setState({
      showAddLayer: !this.state.showAddLayer
    });
  }

  clickDelete(id) {
    if (confirm("您确定要删除？")) {
      this.setState({
        RedPacketData: this.state.RedPacketData.filter(v => v.id != id)
      })
    }
    this.forceUpdate();
  }

  render() {
    const {RedPacketData, showModifyLayer, showAddLayer, item} = this.state,
     pageModifyData = {
        title: '修改红包活动',
        width: '90%',
        height: '90%',
        closeShowPage: ::this.toggleModifyLayer
      },
      pageAddData = {
        title: '新增红包活动',
        width: '40%',
        height: '90%',
        closeShowPage: ::this.toggleAddLayer
      };
    return (
      <div className="RedPacketActivity">
        <div className="search-bar">
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w120" onClick={::this.toggleAddLayer}
                   value="新增红包活动"/>
          </div>
        </div>
        <div className="redPacket-main">
          <ul className="clearfix">
            {
              RedPacketData.map((item, index) => {
                return (
                  <li key={index}>
                    <a href="javascript:;" onClick={() =>this.toggleModifyLayer(item)}>
                      <div className="redPacket-item-top">
                        <h5>{item.title}</h5>
                        <div className="pic">
                          <img src={item.img} alt={item.title} title={item.title}/>
                        </div>
                        <div className="greet">{item.greetings}</div>
                        <div className="totalAmount">总金额：{item.totalAmount}元</div>
                      </div>
                    </a>
                    <div className="data">
                      <p>开始时间：{item.startData}</p>
                      <p>结束时间：{item.endData}</p>
                    </div>
                    <div className="oper">
                      <a href="javascript:;" onClick={() =>this.toggleModifyLayer(item)}>设置</a><span>&nbsp;
                      |&nbsp;</span><a href="javascript:;" onClick={() =>{this.clickDelete(item.id)}}>删除</a>
                    </div>
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
              <RedPacketModify data={item}/>
            </ShowPage>
          </Modal>
        }
        {
          showAddLayer &&
          <Modal>
            <ShowPage {...pageAddData}>
              <RedPacketAdd/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = RedPacketActivity;