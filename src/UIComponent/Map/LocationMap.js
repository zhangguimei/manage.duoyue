/*
 * Created on 2016/6/29
 * 
 * by Melody Yuen
 */

'use strict';
import React from 'react';
import styles from './Map.scss';

class LocationMap extends React.Component {
  static defaultProps = {
    id: 'allmap',
    data: {}
  };

  constructor(props) {
    super(props);
    this.map = {};
    this.marker = {};
    this.info = {};
    this.center = {};
    this.str = {};
  }

  ShowUser() {
    const {id, data} = this.props;
    if (data) {
      this.initMap(data);
    } else {
      document.getElementById(id).innerHTML = " &nbsp;&nbsp;&nbsp;&nbsp; 没有当前用户的地理位置信息！";
    }
  }

  initMap({x, y, nickname, headimgurl, province, city, locationTime}) {
    const {id} = this.props;
    this.map = new qq.maps.Map(document.getElementById(id), {
      center: new qq.maps.LatLng(x, y),
      zoom: 10
    });
    this.marker = new qq.maps.Marker({
      position: new qq.maps.LatLng(x, y),
      map: this.map
    });

    this.info = new qq.maps.InfoWindow({
      map: this.map
    });

    this.center = new qq.maps.LatLng(x, y);
    let str = '';
    str += '<div class="info-window">';
    str += '<img class="pic" src="' + headimgurl + '"/>';
    str += '<div class="text">';
    str += '<div class="name">' + nickname + '</div>';
    str += '<div class="city">' + province + '&nbsp;&nbsp;' + city + '</div>';
    str += '<div class="date">' + locationTime + '</div>';
    str += '</div>';
    str += '</div>';
    this.str = str;

    qq.maps.event.addListener(this.marker, 'click', ::this.clickMarker);
  }

  clickMarker() {
    this.info.open();
    this.info.setContent(this.str);
    this.info.setPosition(this.center);
  }

  componentDidMount() {
    this.ShowUser();
  }

  render() {
    const {id, data} = this.props;
    return (
      <div className="LocationMap">
        <div id={id} data={data} {...this.props}></div>
      </div>
    );
  }
}

export default LocationMap;