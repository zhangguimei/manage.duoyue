'use strict';
import React, {PropTypes} from 'react';
import {openInfo, initialMap} from './MapFun';
import styles from './Map.scss';

class PolyMap extends React.Component {
  static defaultProps = {
    id: 'allmap'
  };

  constructor(props) {
    super(props);
    this._map = {};
    this.marker = {};
  }

  initMap() {
    const {id} = this.props;
    this._map = initialMap(id);
    this.loadUserData();
  }

  loadUserData() {
    const {data:{list}} = this.props;
    this.showMarker(list);
  }

  showMarker(list) {
    const {key, values} = list;
    let _this_map = this._map;
    let markers = [];
    let pt = null;
    for (let i = 0; i < values.length; i++) {
      let data = values[i];
      pt = new BMap.Point(data[key.lng], data[key.lat]);
      this.marker = new BMap.Marker(pt);
      this.marker.addEventListener('click', ::this.clickMarker);
      this.marker.data = data;
      markers.push(this.marker);
    }
    new BMapLib.MarkerClusterer(_this_map, {markers: markers});
  }

  clickMarker(e) {
    const {data:{list:{key}}} = this.props;
    let data = e.target.data;
    let html = openInfo(data, key);
    let infoWindow = new BMap.InfoWindow(html);  // 创建信息窗口对象
    this._map.openInfoWindow(infoWindow, e.target.getPosition()); //开启信息窗口
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.marker.removeEventListener('click', ::this.clickMarker);
  }

  render() {
    const {id, data} = this.props;
    return (
      <div className="HeatMap">
        <div id={id} data={data} {...this.props}></div>
      </div>
    );
  }
}

PolyMap.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

export default PolyMap;