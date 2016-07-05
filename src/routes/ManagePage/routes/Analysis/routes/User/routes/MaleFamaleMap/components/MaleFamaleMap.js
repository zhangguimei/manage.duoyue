'use strict';
import React, {PropTypes}  from 'react';
import SexMap from 'UIComponentFolder/Map/SexMap';
const mapData = require("AssetsFolder/MockData/map/sex_data.json");

class MaleFamaleMap extends React.Component {

  render() {
    return (
      <SexMap id="SexMap" data={mapData} style={{height:580}}/>
    )
  }
}
MaleFamaleMap.propTypes = {
  data: PropTypes.array
};
module.exports = MaleFamaleMap;