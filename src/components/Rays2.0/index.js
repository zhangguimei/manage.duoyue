'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/MenuActions';

import ShowRoute from '../UIComponent/Menu/ShowRoute';
import Tree from '../UIComponent/Tree/Tree';
import Menu from '../UIComponent/Menu/Menu';
import Collapse from '../UIComponent/Collapse/Collapse';

import styles from './index.scss';

const data = [
  {
    "id": 1,
    "title": "用户中心",
    "pic":  "http://file.duoyue.me/upload/menu/20160321/2016_03_21_200528883.png",
    "children": [
      {
        "id": 11,
        "title": "用户管理",
        "children": [
          {
            "id": 111,
            "title": "用户查询",
            "children": []
          },
          {
            "id": 112,
            "title": "用户图片",
            "children": []
          },
          {
            "id": 113,
            "title": "用户视频",
            "children": []
          },
          {
            "id": 114,
            "title": "群组管理",
            "children": []
          }
        ]
      },
      {
        "id": 12,
        "title": "资讯/评论",
        "children": []
      },
      {
        "id": 13,
        "title": "作者管理",
        "children": [
          {
            "id": 131,
            "title": "作者查询",
            "children": []
          },
          {
            "id": 132,
            "title": "作者分类",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "运营中心",
    "pic": "http://file.duoyue.me/upload/menu/20160330/2016_03_30_190937379.png",
    "children": [
      {
        "id": 21,
        "title": "工号列表哈",
        "children": []
      },
      {
        "id": 22,
        "title": "展示设置测试测试测试测试啊",
        "children": [
          {
            "id": 221,
            "title": "橱窗管理",
            "children": [
              {
                "id": 2211,
                "title": "商品橱窗",
                "children": []
              },
              {
                "id": 2212,
                "title": "书籍橱窗",
                "children": []
              },
              {
                "id": 2213,
                "title": "资源橱窗",
                "children": []
              }
            ]
          },
          {
            "id": 222,
            "title": "发票选项",
            "children": []
          }
        ]
      }
    ]
  }
];

class Rays extends React.Component {
  render() {
    const {route, actions:{changeRoute, chooseTreeLeaves}} = this.props;
    let collapseData= require("../../assets/MockData/collapse_data.json");
    return (
      <div className="RaysTab">
        <Menu data={data} changeRoute={changeRoute} route={route} />
        <Tree data={data} changeRoute={changeRoute} route={route} chooseTreeLeaves={chooseTreeLeaves}/>
        <Collapse data={collapseData} skin="default" mutex={false} openFirst={false}/>
      </div>
    )
  }
}
// <ShowRoute data={data} route={route}/>
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
)(Rays);
