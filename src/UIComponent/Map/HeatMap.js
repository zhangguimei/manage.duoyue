'use strict';
import React, {PropTypes} from 'react';
import {initialMap} from './Map';
import styles from './Map.scss';

class HeatMap extends React.Component {
  static defaultProps = {
    id: 'allmap',
    colors: ['blue', '#245ff5', '#4274f4', '#7398f5', '#9fb7f3', '#c6d3f3']
  }

  constructor(props) {
    super(props);
    this._map = {};
    this.numTolal = 0;
  }

  initMap() {
    const {id} = this.props;
    this._map = initialMap(id, false);
    this.loadUserData();
  }

  loadUserData() {
    const {data} = this.props;
    for (let j = 0; j < data.data.length; j++) {
      this.numTolal += parseInt(data.data[j].num);
    }
    for (let i = 0; i < data.data.length; i++) {
      this.getBoundary(data.data[i]);
    }
  }

  getBoundary(province) {
    let _this_map = this._map;
    let str = province.name.toString();
    if (str == "吉林") {
      str = "吉林省";
    }
    let Color = this.getColorByNum(parseInt(province.num));
    let bdary = new BMap.Boundary();
    bdary.get(str, function (rs) {
      let count = rs.boundaries.length; //行政区域的点有多少个
      let pointArray = [];
      for (let i = 0; i < count; i++) {
        let ply = new BMap.Polygon(rs.boundaries[i], {
          strokeWeight: 1,
          strokeOpacity: 0.5,
          strokeColor: "white",
          fillColor: Color
        }); //建立多边形覆盖物
        _this_map.addOverlay(ply);  //添加覆盖物
        pointArray = pointArray.concat(ply.getPath());
      }
    });
  }

  getColorByNum(num) {
    let {colors} = this.props;
    colors.push('#f5f3f0');
    if (parseInt(num / this.numTolal) > 0.05) {
      return colors[0];
    } else if (parseInt(num) / this.numTolal > 0.04) {
      return colors[1];
    } else if (parseInt(num) / this.numTolal > 0.03) {
      return colors[2];
    } else if (parseInt(num) / this.numTolal > 0.02) {
      return colors[3];
    } else if (parseInt(num) / this.numTolal > 0.01) {
      return colors[4];
    } else if (parseInt(num) / this.numTolal > 0) {
      return colors[5];
    } else {
      return colors[6];
    }
  }

  componentDidMount() {
    this.initMap();
  }

  render() {
    const {id, data, colors} = this.props;
    return (
      <div className="HeatMap">
        <div id={id} data={data} {...this.props}></div>
        <div className="map-desc">
          <h5>关注指数：</h5>
          <dl>
            <dt>高</dt>
            {
              colors.map((color, i)=> {
                return (
                  <dd key={i} style={{backgroundColor:color}}/>
                );
              })
            }
            <dt>低</dt>
          </dl>
        </div>
      </div>
    );
  }
}

HeatMap.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  colors: PropTypes.array
};

export default HeatMap;