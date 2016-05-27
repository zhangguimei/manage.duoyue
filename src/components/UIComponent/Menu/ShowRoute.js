'use strict';
import React from 'react';

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

export function getTitle(data, route) {
  let getData = data;
  if (route.length === 0) return "Rays";
  for (let i = 0, l = route.length; i < l; i++) {
    if (i != l - 1) {
      getData = getData[parseInt(route[i], 10)].data;
    } else {
      getData = getData[parseInt(route[i], 10)];
    }
  }
  return getData.name;
}

export function getChildren(data, route) {
  let getData = data;
  if (route.length === 0) return [];
  for (let i = 0, l = route.length; i < l; i++) {
    if (i < l) {
      getData = getData[parseInt(route[i], 10)].data;
    }
  }
  return getData;
}