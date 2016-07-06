/*
 *  Project : Radio Inline
 *  Date    : 2016/7/1
 *  Author  : Melody Yuen
 *  Declare : Radio
 */

'use strict';
import React from 'react';
import {findDOMNode} from 'react-dom';
import Radio from 'UIComponentFolder/Radio/Radio';
import Tag from 'PageComponentFolder/Tag/Tag';
import FixBottom from 'UIComponentFolder/FixBottom/FixBottom';
import styles from './LabelSearch.scss';

const tagData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json"),
  userListData = require("AssetsFolder/MockData/operate/usersetting/user_list_data.json");

class LabelSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearched: false
    }
  }

  onSearchClick() {
    const count = findDOMNode(this.refs.tag).firstChild.childNodes.length;
    if (count > 0) {
      this.setState({
        isSearched: !this.state.isSearched
      })
    } else {
      alert('至少需要选择一个标签！');
    }
  }

  render() {
    const {isSearched} = this.state;
    return (
      <div className="LabelSearch">
        {
          !isSearched &&
          <div className="label-search">
            <div className="label-cont">
              <label>用户标签关系：</label>
              <div className="radio-box">
                <Radio name="relation" index="0" defaultChecked title="包含标签之一（选择标签越多用户越多）"/>
                <Radio name="relation" index="1" title="包含所有标签（选择标签越多用户越少）"/>
              </div>
              <hr className="mb10"/>
              <label>已选择的标签：</label>
              <Tag ref="tag" tagData={tagData}/>
            </div>
            <FixBottom>
              <input className="btn btn-primary w100" type="button" value="查询用户" onClick={::this.onSearchClick}/>
            </FixBottom>
          </div>
        }
        {
          isSearched &&
          <div className="label-result">
            <div className="search-bar">
              <form className="form-inline left">
                <div className="form-group form-group-sm">
                  <label>昵称：</label>
                  <input type="text" className="form-control"/>
                </div>
                <input type="button" className="btn btn-primary btn-sm w80" value="搜索"/>
              </form>
            </div>
            <div className="user-list">
              {
                userListData.length > 0 ?
                  <ul>
                    {
                      userListData.map((item, i) => {
                        return (
                          <li key={i}>
                            <div className="inner">
                              <img className="pic" src={item.headimgurl} alt={item.nickname}
                                   onClick={() => this.onPicClick(item.id)}/>
                              <div className="text">
                                <div className="name">{item.nickname}</div>
                                <div className="city">{item.province}.{item.city}</div>
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                  :
                  <div className="none-result">未查询到任何结果...</div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

module.exports = LabelSearch;