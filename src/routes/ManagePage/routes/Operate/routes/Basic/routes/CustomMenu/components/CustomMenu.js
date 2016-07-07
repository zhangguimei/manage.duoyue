/*
 *  Project : Basic
 *  Date    : 2016/7/4
 *  Author  : Melody Yuen
 *  Declare : CustomMenu
 */

'use strict';
import React from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import styles from './CustomMenu.scss';

const menuListData = require("AssetsFolder/MockData/operate/basic/menu_list_data.json"),
  options = [
    {
      id: 1,
      value: '消息推送'
    },
    {
      id: 2,
      value: '网页链接'
    }
  ];

class CustomMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: menuListData,
      clickType: '',//add,modify
      clickData: {},
      selectID: 1,
      showSelect: true
    }
  }

  onMenuClick(type, id) {
    const {menuData} = this.state;
    this.setState({
      clickType: type,
      showSelect: false
    }, ()=> {
      this.setState({
        showSelect: true
      })
    });
    switch (type) {
      case 'add':
        this.setState({
          clickData: {
            title: "",
            type: 1,
            website: "",
            key: "",
            zIndex: 0
          }
        });
        break;
      case 'modify':
        const data = this.getValue(menuData, id);
        this.setState({
          clickData: data,
          selectID: data.type
        });
        break;
    }
  }

  onDeleteClick(id) {
    //delete
  }

  onSelectChange(e) {
    this.setState({
      selectID: e.target.value
    })
  }

  getValue(data, id) {
    if (!data || !data.length) return;
    let stack = [], item;
    for (let i = 0, len = data.length; i < len; i++) {
      stack.push(data[i]);
    }
    while (stack.length) {
      item = stack.shift();
      if (item.id === id) {
        return item;
      }
      if (item.children && item.children.length) {
        stack = item.children.concat(stack);
      }
    }
  }

  removeValue(data, id, stack = []) {
    if (!data || !data.length) return;
    let item;
    item = data.filter((v) => v.id == id)[0];
    if (item) {
      stack = data.filter((v) => v.id !== id);
      return stack;
    } else {
      data.forEach((v) => {
        if (v.children) {
          this.removeValue(v.children, id, stack);
        }
      })
    }
    return stack;
  }

  render() {
    const {selectID, clickType, clickData, menuData, showSelect} = this.state;
    return (
      <div className="CustomMenu">
        <div className="menu-left">
          {
            menuData && menuData.map((item, i) => {
              return (
                <div className="item" key={i}>
                  <h4>
                    <a className="title" href="javascript:;"
                       onClick={() => this.onMenuClick('modify',item.id)}>{item.title}</a>
                    <a className="add-submenu" href="javascript:;"
                       onClick={() => this.onMenuClick('add')}>新增子菜单</a>
                  </h4>
                  {
                    item.children &&
                    <ul>
                      {
                        item.children.map((subitem, j) => {
                          return (
                            <li key={j}><a href="javascript:;"
                                           onClick={() => this.onMenuClick('modify',subitem.id)}>{subitem.title}</a>
                            </li>
                          )
                        })
                      }
                    </ul>
                  }
                </div>
              )
            })
          }
          <a className="add-menu" href="javascript:;" onClick={() => this.onMenuClick('add')}>新增主菜单</a>
          <input type="button" value="发布微信菜单" className="btn btn-menu"/>
        </div>
        <div className="menu-main">
          {
            clickType ?
              <form className="form-default">
                {
                  clickType == 'modify' &&
                  <div className="menu-title">
                    <h4 className="title">修改菜单</h4>
                    <a className="delete" href="javascript:;" onClick={() => this.onDeleteClick(clickData.id)}>删除菜单</a>
                  </div>
                }
                <div className="form-group">
                  <label>菜单类型</label>
                  {
                    showSelect &&
                    <select className="form-control" onChange={::this.onSelectChange}
                            defaultValue={clickData.type}>
                      {
                        options.map((item, i) => {
                          return (
                            <option key={i} value={item.id}>{item.value}</option>
                          )
                        })
                      }
                    </select>
                  }
                </div>
                <FormItem title="菜单名称" className="form-control" rules={{required: true}} requireError
                          defaultValue={clickData.title} value={clickData.title}/>
                {
                  selectID == 1 &&
                  <FormItem title="消息KEY" className="form-control" rules={{required: true}} requireError
                            defaultValue={clickData.key} value={clickData.key}/>
                }
                {
                  selectID == 2 &&
                  <FormItem title="网址" className="form-control" rules={{required: true}} requireError
                            defaultValue={clickData.website} value={clickData.website}/>
                }
                <FormItem title="排序值" className="form-control" defaultValue="0" value={clickData.zIndex}/>
                <input type="button" value="确定" className="btn btn-primary w100"/>
              </form> :
              <div>请点击左侧的增加菜单或修改菜单按钮</div>
          }
        </div>
      </div>
    );
  }
}

module.exports = CustomMenu;