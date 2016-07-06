'use strict';
import React from 'react';
import TreeList from './TreeList';

class CheckBoxItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showItem: false
    };
    this.child = [];
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
    const {data:{data = [], id}, chooseTreeLeaves} = this.props;
    if(data.length > 0) {
      this.setState({
        showItem: !this.state.showItem
      })
    }
  }

  getChooseClass() {
    const {data:{id, data = []}, route} = this.props;
    let isChoosed = false;
    if(data.length > 0) {
      isChoosed = this.alChoosed(data, route);
    }else {
      isChoosed = route.findIndex(v => v == id) > -1;
    }
    return isChoosed;
  }

  alChoosed(data, route) {
    let isAllChoose = true;
    data.forEach(item => {
      if(!item.data || item.data.length == 0 ) {
        if(route.findIndex(v => v == item.id) < 0) {
          isAllChoose = false;
        }
      }else {
        if(!this.alChoosed(item.data, route)) {
          isAllChoose = false;
        }
      }
    });
    return isAllChoose;
  }

  chooseAllChild() {
    const {data:{id, data = []}, chooseTreeLeaves, route} = this.props;
    let child = data.length > 0 ? this.child.length > 0 ? this.child : this.getChildIds(data) : id;
    let alChoosed = this.alChoosed(data, route);
    chooseTreeLeaves && chooseTreeLeaves(child, !alChoosed);
  }

  getChildIds(data) {
    let childArr = this.child;
    data.forEach( item => {
      if(!item.data || item.data.length == 0 ) {
        childArr.push(item.id);
      }else {
        this.getChildIds(item.data);
      }
    });
    return childArr;
  }

  render() {
    const {data: {name, data = []}, route, parent, ...props} = this.props, {showItem} = this.state;
    const level = parent.split(".").length - 2;
    const chooseClass = this.getChooseClass();
    return (
      <li className="CheckBoxItem text-center" style={{marginLeft: `${level*10}` }}  >
        <div className="tree-item">
          {
            data.length > 0 ?
              <i className={`triangle-${showItem ? "down" : "right"}`}  onClick={::this.showItem}/>
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
            <i className="ic ic-folderempty"/>
          }
          <span className="choose" onClick={::this.chooseAllChild}>
            {
              chooseClass ?
              <input type="checkbox" checked="checked" />
              :
              <input type="checkbox" />
            }
          </span>
          <span className="item-title" onClick={::this.chooseAllChild}>{name}</span>
        </div>
        {
          data.length > 0 && showItem &&
          <TreeList data={data} parent={parent} route={route} {...props}/>
        }
      </li>
    );
  }
}

export default CheckBoxItem;