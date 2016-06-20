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
    const {data, clickItem} = this.props;
    if(data.data.length > 0) {
      this.setState({
        showItem: !this.state.showItem
      })
    }else {
      clickItem && clickItem(data);
    }
  }

  render() {
    const {data: {name, data = []}, route, parent, ...props} = this.props, {showItem} = this.state;
    const level = parent.split(".").length - 2;
    return (
      <li className="TreeItem text-center" >
        <div className="tree-item" onClick={::this.showItem}>
          {
            data.length > 0 ?
              <i className={`triangle-${showItem ? "down" : "right"}`}/>
              :
              <i className="triangle-replace"/>
          }
          {
            data.length > 0 && showItem &&
            <i className="ic ic-folderopenempty"/>
          }
          {
            data.length > 0 && !showItem &&
            <i className="ic ic-folderempty"/>
          }
          {
            data.length == 0 &&
            <i className="ic ic-doc"/>
          }
          <span className="item-title">{name}</span>
        </div>
        {
          data.length > 0 && showItem &&
          <TreeList data={data} parent={parent} route={route} {...props}/>
        }
      </li>
    );
  }
}

export default TreeItem;