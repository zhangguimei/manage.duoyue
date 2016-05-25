'use strict';
import React from 'react';
import TreeList from './TreeList';
//import {Map} from 'immutable';

class CheckBoxItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showItem: true
    };
    this.child = [];
  }

  showItem() {
    const {data:{children = [], id}, chooseTreeLeaves} = this.props;
    if(children.length > 0) {
      this.setState({
        showItem: !this.state.showItem
      })
    }
  }

  getChooseClass() {
    const {data:{id, children = []}, route} = this.props;
    let isChoosed = false;
    if(children.length > 0) {
      isChoosed = this.alChoosed(children, route);
    }else {
      isChoosed = route.findIndex(v => v == id) > -1;
    }
    return isChoosed;
  }

  alChoosed(children, route) {
    let isAllChoose = true;
    children.forEach(item => {
      if(!item.children || item.children.length == 0 ) {
        if(route.findIndex(v => v == item.id) < 0) {
          isAllChoose = false;
        }
      }else {
        if(!this.alChoosed(item.children, route)) {
          isAllChoose = false;
        }
      }
    });
    return isAllChoose;
  }

  chooseAllChild() {
    const {data:{id, children = []}, chooseTreeLeaves, route} = this.props;
    let child = children.length > 0 ? this.child.length > 0 ? this.child : this.getChildIds(children) : id;
    let alChoosed = this.alChoosed(children, route);
    chooseTreeLeaves && chooseTreeLeaves(child, !alChoosed);
  }

  getChildIds(children) {
    let childArr = this.child;
    children.forEach( item => {
      if(!item.children || item.children.length == 0 ) {
        childArr.push(item.id);
      }else {
        this.getChildIds(item.children);
      }
    });
    return childArr;
  }

  render() {
    const {data: {title, children = []}, route, parent, chooseTreeLeaves} = this.props, {showItem} = this.state;
    const level = parent.split(".").length - 2;
    const chooseClass = this.getChooseClass() ;
    return (
      <li className="CheckBoxItem text-center" style={{marginLeft: `${level*10}` }}  >
        <div className="tree-item">
          {
            children.length > 0 ?
              <i className={`triangle-${showItem ? "down" : "right"}`}  onClick={::this.showItem}/>
              :
              <i className="triangle-replace"/>
          }
          <span className="choose" onClick={::this.chooseAllChild}>
            {
              chooseClass ?
              <input type="checkbox" checked="checked" />
              :
              <input type="checkbox" />
            }
          </span>
          <span className="item-title" onClick={::this.chooseAllChild}>{title}</span>
        </div>
        {
          children.length > 0 && showItem &&
          <TreeList data={children} parent={parent} route={route} chooseTreeLeaves={chooseTreeLeaves}/>
        }
      </li>
    );
  }
}

export default CheckBoxItem;