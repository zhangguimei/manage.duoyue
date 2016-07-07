/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-微信二维码点击文章
 */

'use strict';
import React,{PropTypes} from 'react';

class MessageViewShow extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className="MessageViewShow">
        {
          data.sourceType != "article" &&
          <div className="message-main clearfix">
            <div className="pic left">
              <img src={data.pic} alt={data.pic} title={data.pic}/>
            </div>
            <div className="abstract">
              <div><span>书籍名称：</span><span>{data.title}</span></div>
              <div><span>书籍描述：</span><span>{data.itemAbstract}</span></div>
              <div><span>浏览：</span><span>{data.browseNum}</span></div>
              <div><span>出版社：</span><span>{data.publisher}</span></div>
            </div>
          </div>
        }
        {
          data.sourceType == "article" && <div className="msg-main clearfix">
            <div className="message-cont left">
              <h5>{data.title}</h5>
              <img src={data.pic} alt={data.pic} title={data.pic}/>
              <p className="info">{data.itemAbstract}</p>
            </div>
            <div className="message-abstract">
              <div className="title"><strong>标题：</strong>{data.title}</div>
              <div className="title"><strong>摘要：</strong>{data.itemAbstract}</div>
              <div className="title"><strong>原文链接：</strong>
                {
                  data.originalLink.map((item, index) => {
                    return (
                      <div className="title" key={index}>
                        <h5>{item.name}</h5>
                        <p className="link">{item.link}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

MessageViewShow.propsType = {
  data: PropTypes.object
};

export default MessageViewShow;