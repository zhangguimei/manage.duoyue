/*
 *  Date    : 2016.6.28
 *  Author  : Han-Shuangli
 *  Declare : 通用弹层头部
 */
'use strict';
import React, {PropTypes} from 'react';

import styles from './HeaderInfo.scss';

let showItem = {
  "browse": "浏览",
  "scan": "扫一扫",
  "collection": "收藏",
  "comment": "评论",
  "orderList": "订单",
  "position": "位置",
  "time": "时长",
  "signUp": "报名"
};

let info = {
  "name": "名称",
  "nickname": "昵称",
  "sex": "性别",
  "city": "城市",
  "tag": "标签",
  "price": "价格",
  "update": "更新时间"
};

let headUrl = {
  "img": "头像"
};

class HeaderInfo extends React.Component {

  render() {
    const {data} = this.props;
    return (
      <header className="HeaderInfo">
        <section className="common-hd">
          <div className="title">
            <div className="img-wrap left">
              {
                Object.keys(headUrl).map((item, index) => {
                  if(headUrl[item] == "头像" && data[item]) {
                    return <img src={data[item]} key={index} className="img"/>
                  }
                })
              }
            </div>
            <div className="main-info left">
              {
                Object.keys(info).map((item, index) => {
                  if(info[item] && data[item]) {
                    return <h4 className={` info-${item}-name`} key={index}><span className={`info-${item}-desc`}>{info[item]}</span>{data[item]}</h4>
                  }
                })
              }
            </div>
          </div>

          <ul className="info">
            {
              Object.keys(showItem).map((item, index) => {
                if(showItem[item] && (data[item] || data[item] == 0)) {
                  return (
                    <li key={index} className={`show show-${item}`}>
                      <h5>{data[item]}</h5>
                      <p>{showItem[item]}</p>
                    </li>
                  )
                }
              })
            }
          </ul>
        </section>
      </header>
    )
  }
}

HeaderInfo.propTypes = {
  data: PropTypes.shape({
    browse: PropTypes.number,
    scan: PropTypes.number,
    collection: PropTypes.number,
    comment: PropTypes.number,
    orderList: PropTypes.number,
    position: PropTypes.string,
    time: PropTypes.number,
    signUp: PropTypes.number,
    name: PropTypes.string,
    nickname: PropTypes.string,
    sex: PropTypes.string,
    city: PropTypes.string,
    tag: PropTypes.string,
    price: PropTypes.string,
    update: PropTypes.string
  }).isRequired
};

export default HeaderInfo;
