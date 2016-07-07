'use strict';
import React from 'react';
import {getTitle} from '../../utils/getDataInfo';

class ShowRoute extends React.Component {

  getRoute() {
    let {data, route} = this.props, str = "Rays";
    for (let i = 0, l = route.length; i < l - 1; i++) {
      str += "=>" + getTitle(data, route.slice(0, i + 1));
    }
    return str;
  }

  render() {
    return (
      <div className="ShowRoute">
        {this.getRoute()}
      </div>
    )
  }
}

export default ShowRoute;