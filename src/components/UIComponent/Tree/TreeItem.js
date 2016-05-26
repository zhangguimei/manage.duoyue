'use strict';
import React from 'react';
import TreeList from './TreeList';

class TreeItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showItem: false
    }
  }

  componentWillReceiveProps(np) {
    const {open, freeOpen} = np, {showItem} = this.state;
    if( freeOpen &&  !open == showItem) {
      this.setState({
        showItem: open
      })
    }
  }

  componentDidMount() {
    const {open, freeOpen} = this.props, {showItem} = this.state;
    if( freeOpen &&  !open == showItem) {
      this.setState({
        showItem: open
      })
    }
  }

  showItem() {
    const {data:{children = [], id}, clickItem} = this.props;
    if(children.length > 0) {
      this.setState({
        showItem: !this.state.showItem
      })
    }else {
      clickItem && clickItem(id);
    }
  }

  render() {
    const {data: {title, children = []}, route, parent, ...props} = this.props, {showItem} = this.state;
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
          {
            children.length > 0 && showItem &&
            <i className="ic ic-folderopenempty"/>
          }
          {
            children.length > 0 && !showItem &&
            <i className="ic ic-folderempty"/>
          }
          {
          children.length == 0 &&
            <i className="ic ic-doc"/>
          }
          <span className="item-title">{title}</span>
        </div>
        {
          children.length > 0 && showItem &&
          <TreeList data={children} parent={parent} route={route} {...props}/>
        }
      </li>
    );
  }
}

export default TreeItem;