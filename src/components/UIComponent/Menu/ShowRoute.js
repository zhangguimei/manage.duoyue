'use strict';
import React from 'react';

class ShowRoute extends React.Component {

  getRoute(){
    let {data, route} = this.props, str = "Rays";
    for(let i = 0, l = route.length; i < l-1; i++) {
      str += "=>" + getTitle(route.slice(0, i+1));
    }

    function getTitle(route) {
      let getData = data;
      for(let i = 0, l = route.length; i < l; i++) {
        if(i != l-1) {
          getData = getData[parseInt(route[i], 10)].children;
        }else {
          getData = getData[parseInt(route[i], 10)];
        }
      }
      return getData.title;
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