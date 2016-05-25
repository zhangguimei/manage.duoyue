'use strict';
import React from 'react';
import TreeList from './TreeList';
//import {Map} from 'immutable';

class TreeItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showItem: false
    }
  }

  showItem() {
    const {data:{children = [], id}, clickItem, parent} = this.props;
    if(children.length > 0) {
      this.setState({
        showItem: !this.state.showItem
      })
    }else {
      clickItem && clickItem(id);
    }
  }

  render() {
    const {data: {title, children = []}, route, parent, clickItem} = this.props, {showItem} = this.state;
    const level = parent.split(".").length - 2;
    return (
      <li className="TreeItem text-center" style={{marginLeft: `${level*10}` }}  >
        <div className="tree-item" onClick={::this.showItem}>
          {
            children.length > 0 ?
              <i className={`triangle-${showItem ? "down" : "right"}`}/>
              :
              <i className="triangle-replace"/>
          }
          <span className="item-title">{title}</span>
        </div>
        {
          children.length > 0 && showItem &&
          <TreeList data={children} parent={parent} route={route} clickItem={clickItem}/>
        }
      </li>
    );
  }
}

export default TreeItem;