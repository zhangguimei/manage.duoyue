/*
 * Created on 2016/6/29
 * 
 * by Melody Yuen
 * User Search
 */

'use strict';
import React from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import LocationMap from 'UIComponentFolder/Map/LocationMap';
import styles from './UserSearch.scss';

const UserListData = require("AssetsFolder/MockData/usersetting/user_list_data.json");

class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      userData: {}
    }
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  picClick(id) {
    let userData = this.fetchUserData(UserListData, id);
    this.setState({
      userData: userData,
      showModal: true
    });
  }

  fetchUserData(data, id) {
    return data.filter((item)=> {
      return item.id == id;
    })[0];
  }

  render() {
    const {showModal, userData} = this.state;
    const pagedata = {
      title: "用户视图",
      width: '90%',
      height: '95%',
      closeShowPage: ::this.toggleModal
    };
    return (
      <div className="UserSearch">
        <div className="user-list">
          <ul>
            {
              UserListData && UserListData.map((item, i)=> {
                return (
                  <li key={i}>
                    <div className="inner">
                      <img className="pic" src={item.headimgurl} onClick={() => this.picClick(item.id)}/>
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
          showModal &&
          <Modal onModalClick={::this.toggleModal}>
            <ShowPage {...pagedata}>
              <h5 className="mb5 ml10">最近地理位置</h5>
              <LocationMap id="LocationMap" data={userData} style={{height:350,border:'1px solid #ddd'}}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = UserSearch;