'use strict';
import React, {PropTypes} from 'react';
import TreeItem from './TreeItem';
import CheckBoxItem from './CheckBoxItem';

class TreeList extends React.Component {

  render() {
    const {data = [], route = [0], parent = "", clickItem, chooseTreeLeaves} = this.props;
    let level = parent.split(".").length - 1;
    //let routeString = route.join("."), test = new RegExp("^" + parent.slice(0, -1), );
    let props = {
      route: route,
      clickItem: clickItem,
      chooseTreeLeaves: chooseTreeLeaves
    };
    if(data.length) {
      return (
        <ul className="ul-item">
          {
            data.map((item, index) => {
              return <CheckBoxItem data={item} parent={`${parent}${index}.`} key={index} {...props}/>
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