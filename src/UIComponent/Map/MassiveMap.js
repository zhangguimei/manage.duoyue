'use strict';
import React, {PropTypes} from 'react';
import {openInfo, initialMap} from './MapFun';
import styles from './Map.scss';

class MassiveMap extends React.Component {
  static defaultProps = {
    id: 'allmap'
  };

  constructor(props) {
    super(props);
    this._map = {};
    this.pointCollection = {};
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
    if (document.createElement('canvas').getContext) {
      const {key, values} = list;
      // 判断当前浏览器是否支持绘制海量点
      let points = [];  // 添加海量点数据

      for (let i = 0; i < values.length; i++) {
        let data = values[i];
        let point = new BMap.Point(data[key.lng], data[key.lat]);
        point.data = data;
        points.push(point);
      }
      const options = {
        size: BMAP_POINT_SIZE_BIG,
        shape: BMAP_POINT_SHAPE_WATERDROP,
        color: '#f51605'
      };
      this.pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
      this.pointCollection.addEventListener('click', ::this.clickMarker);
      this._map.addOverlay(this.pointCollection);  // 添加Overlay
    }
    else {
      alert('请在chrome、safari、IE8+以上浏览器查看本示例');
    }
  }

  clickMarker(e) {
    const {data:{list:{key}}} = this.props;
    const data = e.point.data;
    let html = openInfo(data, key);
    let infoWindow = new BMap.InfoWindow(html);  // 创建信息窗口对象
    this._map.openInfoWindow(infoWindow, e.point); //开启信息窗口
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.pointCollection.removeEventListener('click', ::this.clickMarker);
  }

  render() {
    let {id, data} = this.props;
    return (
      <div className="MassiveMap">
        <div id={id} data={data} {...this.props}></div>
      </div>
    );
  }
}

MassiveMap.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

export default MassiveMap;