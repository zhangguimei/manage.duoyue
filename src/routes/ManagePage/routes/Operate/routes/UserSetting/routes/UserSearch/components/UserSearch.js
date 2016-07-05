/*
 *  Project : User Setting
 *  Date    : 2016/6/30
 *  Author  : Melody Yuen
 *  Declare : User Search
 */

'use strict';
import React from 'react';
import UserMaterial from './UserMaterial';
import styles from './UserSearch.scss';

const userListData = require("AssetsFolder/MockData/operate/usersetting/user_list_data.json");

class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      userID: -1
    }
  }

  onPicClick(id) {
    this.setState({
      userID: id,
      showLayer: true
    });
  }

  onCloseClick() {
    this.setState({
      showLayer: false
    });
  }

  render() {
    const {showLayer, userID} = this.state;
    return (
      <div className="UserSearch">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group form-group-sm">
              <label>群组：</label>
              <select className="form-control">
                <option>全部</option>
              </select>
            </div>
            <div className="form-group form-group-sm">
              <label>关键字：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary btn-sm w80" value="搜索"/>
          </form>
          <div className="right">
            <span>粉丝总数：16</span>
            <input type="button" className="btn btn-primary btn-sm w100 ml20" value="同步用户"/>
          </div>
        </div>
        <div className="user-list">
          <ul>
            {
              userListData && userListData.map((item, i)=> {
                return (
                  <li key={i}>
                    <div className="inner">
                      <img className="pic" src={item.headimgurl} onClick={() => this.onPicClick(item.id)}/>
                      <div className="text">
                        <div className="name">{item.nickname}</div>
                        <div className="city">{item.province}.{item.city}</div>
                      </div>
                      <p><a href="javascript:;">同步</a><i className="line">|</i><a href="javascript:;">模拟登录</a></p>
                      <p>合并用户：{item.combineCount}</p>
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

module.exports = UserSearch;