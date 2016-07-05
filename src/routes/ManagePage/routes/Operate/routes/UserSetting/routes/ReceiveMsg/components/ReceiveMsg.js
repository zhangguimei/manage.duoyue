/*
 *  Project : User Setting
 *  Date    : 2016/7/1
 *  Author  : Melody Yuen
 *  Declare : Receive Message
 */

'use strict';
import React from 'react';
import UserMaterial from '../../UserSearch/components/UserMaterial';
import styles from './ReceiveMsg.scss';

const msgListData = require("AssetsFolder/MockData/operate/usersetting/msg_list_data.json");

class ReceiveMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      msgID: -1,
      userID: -1,
      msgData: msgListData
    }
  }

  onDeleteClick(id) {
    if (confirm("您确定要删除？")) {
      const {msgData} = this.state;
      const tempMsgData = msgData.filter((item) => {
        return item.id !== id;
      });
      this.setState({
        msgData: tempMsgData
      });
    }
  }

  onCloseClick() {
    this.setState({
      showLayer: false
    });
  }

  onUserClick(userID) {
    this.setState({
      showLayer: true,
      userID: userID
    });
  }

  render() {
    const {showLayer, userID, msgData} = this.state;
    return (
      <div className="ReceiveMsg">
        <div className="msg-list">
          <ul className="clearfix">
            {
              msgData && msgData.map((item, i) => {
                return (
                  <li key={i}>
                    <div className="heading">
                      <div className="replay">{item.replay}</div>
                      <div className="user clearfix">
                        <img className="pic" src={item.headimgurl} alt={item.nickname}/>
                        <div className="text">
                          <h5><a onClick={() => this.onUserClick(item.userID)} href="javascript:;">{item.nickname}</a>
                          </h5>
                          <p>{item.locationTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="delete"><a href="javascript:;" onClick={() => this.onDeleteClick(item.id)}>删除</a>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
        {
          showLayer && <UserMaterial userID={userID} onCloseClick={() => this.onCloseClick()}/>
        }
      </div>
    );
  }
}

module.exports = ReceiveMsg;