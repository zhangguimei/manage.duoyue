/*
 *  Project : User Setting
 *  Date    : 2016/7/4
 *  Author  : Melody Yuen
 *  Declare : BookConsult
 */

'use strict';
import React from 'react';
import {fromJS} from 'immutable';
import styles from './BookConsult.scss';

const consultListData = require("AssetsFolder/MockData/operate/usersetting/consult_list_data.json");

class BookConsult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consultData: consultListData,
      consultID: -1
    }
  }

  onReplyClick(id) {
    this.setState({
      consultID: id
    })
  }

  onDeleteClick(id) {
    if (confirm('您确定删除？')) {
      const {consultData} = this.state;
      this.setState({
        consultData: consultData.filter((item) => item.id !== id)
      });
    }
  }

  onSubmitClick(id) {
    const value = this.refs.textarea.value;
    if (value) {
      const {consultData} = fromJS(this.state).toJS();
      const date = this.fetchDate();
      let thisData = consultData.filter((item) => item.id == id)[0];
      thisData.replyContent = value;
      thisData.replyTime = date;
      this.setState({
        consultData: consultData,
        consultID: -1
      });
    }
  }

  fetchDate() {
    const myDate = new Date();
    const year = myDate.getFullYear(),
      month = myDate.getMonth() + 1,
      days = myDate.getDate(),
      hours = myDate.getHours(),
      minutes = myDate.getMinutes(),
      seconds = myDate.getSeconds();
    return `${year}/${month}/${days} ${hours}:${minutes}:${seconds}`
  }

  render() {
    const {consultData, consultID} = this.state;
    return (
      <div className="BookConsult">
        <ul className="consult-list">
          {
            consultData && consultData.map((item, i) => {
              const isShow = item.id == consultID;
              return (
                <li key={i}>
                  <div className="consult-body">
                    <div className="left">
                      <img className="pic" src={item.headimgurl} alt={item.askBook}/>
                      <div className="text">
                        <h5>提问：{item.askContent}<span className="name">@书籍：{item.askBook}</span><span
                          className="date">{item.askTime}</span>
                        </h5>
                        {
                          item.replyContent &&
                          <p>回复：{item.replyContent}<span className="date">{item.replyTime}</span></p>
                        }
                      </div>
                    </div>
                    <div className="right">
                      <a onClick={() => this.onReplyClick(item.id)} href="javascript:;">回复</a>&nbsp;|&nbsp;
                      <a onClick={() => this.onDeleteClick(item.id)} href="javascript:;">删除</a>
                    </div>
                  </div>
                  {
                    isShow &&
                    <footer className="consult-footer">
                      <a onClick={() => this.onSubmitClick(item.id)} className="btn btn-gray btn-sm w60"
                         href="javascript:;">回复</a>
                      <div className="text">
                        <textarea className="form-control w100per" rows="2" ref="textarea"/>
                      </div>
                    </footer>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = BookConsult;