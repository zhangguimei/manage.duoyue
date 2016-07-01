/*
 *  Project : User Setting
 *  Date    : 2016/6/30
 *  Author  : Melody Yuen
 *  Declare : User Modal
 */

'use strict';
import React from 'react';
import Tab from 'UIComponentFolder/Tab/Tab';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import LocationTotalMap from 'UIComponentFolder/Map/LocationTotalMap';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import UserInfo from './UserInfo';

const userData = require("AssetsFolder/MockData/operate/usersetting/user_data.json"),
  navData = [
    {'info': '基本信息'},
    {'article': '文章'},
    {'source': '资源'},
    {'book': '书籍'},
    {'product': '商品'},
    {'qrcode': '二维码'},
    {'location': '位置'},
    {'tag': '标签'}
  ]
  , tabContent = navData.map((item) => {
    return Object.values(item)[0]
  }),
  keyRoute = navData.map((item) => {
    return Object.keys(item)[0]
  }),
  TabItemsData = {
    content: tabContent,
    tabClass: {
      tabBox: "tab-nav",
      tabItemOn: "active",
      tabItemDefault: ""
    }
  };


class UserMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      tabData: userData[keyRoute[0]]
    };
  }

  onTypeChange(index) {
    this.setState({
      index: index,
      tabData: userData[keyRoute[index]]
    });
  }

  render() {
    const pagedata = {
      title: "用户视图",
      width: '90%',
      height: '95%',
      closeShowPage: this.props.onCloseClick
    };
    const {index, tabData} = this.state,
      {headInfo:{basic, extra}} = userData;
    return (
      <div className="UserMaterial">
        <Modal>
          <ShowPage {...pagedata}>
            <header className="common-hd">
              <div className="title hd-title">
                <img className="pic" src={basic.headimgurl}/>
                <ul className="text">
                  <li><i>昵称</i><span>{basic.nickname}</span></li>
                  <li><i>性别</i><span>男</span></li>
                  <li><i>城市</i><span>{basic.country} {basic.province} {basic.city}</span></li>
                  <li><i>标签</i><span>{basic.tag}</span></li>
                </ul>
              </div>
              <ul className="info">
                {
                  extra.map((item, i) => {
                    return (
                      <li key={i}>
                        <h5>{item.count}</h5>
                        <p>{item.title}</p>
                      </li>
                    );
                  })
                }
              </ul>
            </header>
            <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
            <div className="tab-content">
              { index == 0 && <UserInfo tabData={tabData} basicData={basic}/> }
              { index == 1 && <TablePage data={tabData}/> }
              { index == 2 && <TablePage data={tabData}/> }
              { index == 3 && <TablePage data={tabData}/> }
              { index == 4 && <TablePage data={tabData}/> }
              { index == 5 && <TablePage data={tabData}/> }
              { index == 6 && <LocationTotalMap data={tabData} style={{height:"400px"}}/> }
              { index == 7 && <TablePage data={tabData}/> }
            </div>
          </ShowPage>
        </Modal>
      </div>
    );
  }
}

export default UserMaterial;