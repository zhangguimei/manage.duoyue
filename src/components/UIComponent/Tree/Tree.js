'use strict';
import React, {PropTypes} from 'react';
import TreeList from './TreeList';
import styles from "./Tree.scss";

class Tree extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //mainIndex: 0,  //Menu主页的显示index
      route: [] //当前鼠标滑过的路线
    };
    //console.log(this.context);
  }

  componentWillReceiveProps(np) {
    // if(np.route) {
    //   this.setState({
    //     route: np.route
    //   })
    // }
  }

  clickItem(id) {
    let {changeRoute} = this.props;
    console.log(id);
    // this.setState({
    //   route: [...nodeRoute.split(".")]
    // })
  }

  render() {
    const {data, parent = "", route, chooseTreeLeaves} = this.props;
    let props = {
      data: data,
      route: route,
      parent: parent,
      clickItem: ::this.clickItem,
      chooseTreeLeaves: chooseTreeLeaves
    };
    return (
      <div className="Tree">
        <TreeList {...props}/>
      </div>
    );
  }
}

export default Tree;