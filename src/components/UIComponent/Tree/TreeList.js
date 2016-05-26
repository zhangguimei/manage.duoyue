'use strict';
import React, {PropTypes} from 'react';
import TreeItem from './TreeItem';
import CheckBoxItem from './CheckBoxItem';

class TreeList extends React.Component {

  render() {
    const {checkable, data = [], route = [0], parent = "", clickItem, chooseTreeLeaves, open, freeOpen} = this.props;
    let props = {
      route: route,
      clickItem: clickItem,
      chooseTreeLeaves: chooseTreeLeaves,
      checkable: checkable,
      open: open,
      freeOpen: freeOpen
    };
    if(data.length) {
      return (
        <ul className="ul-item">
          {
            data.map((item, index) => {
              if(checkable){
                return <CheckBoxItem data={item} parent={`${parent}${index}.`} key={index} {...props}/>
              }else{
                return <TreeItem data={item} parent={`${parent}${index}.`} key={index} {...props}/>
              }
            })
          }
        </ul>
      )
    }else {
      return null;
    }
  }
}

export default TreeList;