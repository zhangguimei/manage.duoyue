'use strict';
import React, {PropTypes} from 'react';
import {openInfo, initialMap} from './MapFun';
import styles from './Map.scss';

class SexMap extends React.Component {
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
    this.loadUserData(0);
    this.loadUserData(1);
    this.loadUserData(2);
  }

  loadUserData(sex) {
    const {data} = this.props;
    this.showMarker(data[sex].list, sex);
  }

  showMarker(list, sex) {
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
      let options = null;
      if (sex == 1) {//男
        options = {
          size: BMAP_POINT_SIZE_SMALL,
          shape: BMAP_POINT_SHAPE_CIRCLE,
          color: '#00a2ff'
        }
      }
      else if (sex == 2) {//女
        options = {
          size: BMAP_POINT_SIZE_SMALL,
          shape: BMAP_POINT_SHAPE_CIRCLE,
          color: '#e600b3'
        }
      }
      else {//未知
        options = {
          size: BMAP_POINT_SIZE_BIG,
          shape: BMAP_POINT_SHAPE_WATERDROP,
          color: '#f51605'
        }
      }
      this.pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
      this.pointCollection.addEventListener('click', (e) => this.clickMarker(sex,e));
      this._map.addOverlay(this.pointCollection);  // 添加Overlay
    }
    else {
      alert('请在chrome、safari、IE8+以上浏览器查看本示例');
    }
  }

  clickMarker(sex,e) {
    const {data} = this.props;
    let key = data[sex].list.key;
    let html = openInfo(e.point.data, key);
    let infoWindow = new BMap.InfoWindow(html);  // 创建信息窗口对象
    this._map.openInfoWindow(infoWindow, e.point); //开启信息窗口
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.pointCollection.removeEventListener('click', (e)=>this.clickMarker());
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

SexMap.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default SexMap;