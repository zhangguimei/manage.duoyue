/*
 *  Project : User Setting
 *  Date    : 2016/7/1
 *  Author  : Melody Yuen
 *  Declare : LocationTotalMap
 */

'use strict';
import React from 'react';

class LocationTotalMap extends React.Component {
  static defaultProps = {
    id: 'allmap',
    data: {}
  };

  init() {
    const {id, data:{values, key}} = this.props;
    const center = new qq.maps.LatLng(35.916527, 116.397128);
    let map = new qq.maps.Map(document.getElementById(id), {
      center: center,
      zoom: 1
    });
    if(values.length > 0){
      let marker;
      for (let i = 0; i < values.length; i++) {
        marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(values[i][key.lat], values[i][key.lng]),
          map: map
        });
      }
    }
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const {id, data} = this.props;
    return (
      <div className="LocationTotalMap">
        <div id={id} data={data} {...this.props}></div>
      </div>
    );
  }
}

export default LocationTotalMap;