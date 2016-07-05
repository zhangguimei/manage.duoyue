'use strict';
import React, {PropTypes}  from 'react';
import HeatMap from 'UIComponentFolder/Map/HeatMap';
const heatData = require("AssetsFolder/MockData/map/heat_data.json");

class HotMap extends React.Component {

  render() {
    return (
      <HeatMap id="HeatMap" data={heatData} style={{height:580}}/>
    )
  }
}
HotMap.propTypes = {
  data: PropTypes.object
};
module.exports = HotMap;