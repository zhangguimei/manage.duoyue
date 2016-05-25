'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/MenuActions';
import ShowRoute from '../UIComponent/Menu/ShowRoute';
import Menu from '../UIComponent/Menu/Menu';

import styles from './PageHeader.scss';

class PageHeader extends React.Component {
  render() {
    const headerData = this.props.data;
    const fastData = [
      {
        "id": 1,
        "title": "作者查询",
        "icon": "icon-writer",
        "href": ""
      },
      {
        "id": 2,
        "title": "圈子查询",
        "icon": "icon-community",
        "href": " "
      },
      {
        "id": 3,
        "title": "资源查询",
        "icon": "icon-resource",
        "href": " "
      },
      {
        "id": 4,
        "title": "书籍查询",
        "icon": "icon-book",
        "href": " "
      },
      {
        "id": 5,
        "title": "用户查询",
        "icon": "icon-user",
        "href": " "
      },
      {
        "id": 6,
        "title": "二维码应用",
        "icon": "icon-qrcode",
        "href": " "
      },
      {
        "id": 7,
        "title": "红包活动",
        "icon": "icon-gift",
        "href": " "
      },
      {
        "id": 8,
        "title": "文章查询",
        "icon": "icon-article",
        "href": " "
      },
      {
        "id": 9,
        "title": "商品查询",
        "icon": "icon-goods",
        "href": " "
      }
    ];
    return (
      <div className="PageHeader">
        <Link className="logo" to="user">RAYS-2.0</Link>
        <div className="menu">
          <Menu data={headerData}/>
        </div>
        <div className="fast-menu">
          <a className="title" href="javascript:;">三</a>
          <div className="cont">
            <div className="icon-caret"><em/><i/></div>
            <h5>快速操作</h5>
            <div className="list">
              {
                fastData.map((item, i) => {
                  return (
                    <Link key={i} to={item.href}>
                      <i className={`icon ${item.icon}`}/>
                      <span>{item.title}</span>
                    </Link>
                  );
                })
              }
            </div>
            <a className="logout" href="">退出系统</a>
          </div>
        </div>
        <div className="name">长江出版社</div>
      </div>
    );
  }
}

PageHeader.propTypes = {
  data: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    route: state.menu
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);