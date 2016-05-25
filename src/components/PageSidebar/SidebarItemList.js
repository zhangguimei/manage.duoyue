'use strict';
import React, {PropTypes} from 'react';

class SidebarItemList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      levelThree:false
    }
  }
  componentWillMount(){

  }
  render() {
    let {data:{title,children}} = this.props;
    return (
      <li>
        <a>{title}</a>
      </li>
    );
  }
}

export default SidebarItemList;