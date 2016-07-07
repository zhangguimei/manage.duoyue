/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-红包应用-红包池点击查看
 */
'use strict';
import React from 'react';

class RedPacketGroupView extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className="RedPacketGroupView">
        <ul className="group-top">
          <li><i>红包池名称：</i><span>{data.title}</span></li>
          <li><i>每人限领：</i><span>{data.limitNum}</span></li>
        </ul>
        <h5>关联红包</h5>
        <div className="group-main">
          <div className="cont">
            <div className="title">{data.title}</div>
            <div className="pic">
              <img src={data.img} alt={data.title} title={data.title}/>
            </div>
            <div className="info">{data.greetings}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default RedPacketGroupView;