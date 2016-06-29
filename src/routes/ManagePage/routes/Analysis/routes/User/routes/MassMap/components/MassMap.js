'use strict';
import React, {PropTypes}  from 'react';
import MassiveMap from 'UIComponentFolder/Map/MassiveMap';
const mapData = require("AssetsFolder/MockData/map/massive_data.json");

class MassMap extends React.Component {

  render() {
    return (
      <MassiveMap id="HeatMap" data={mapData} style={{height:580}}/>
    )
  }
}
MassMap.propTypes = {
  data: PropTypes.object
};
module.exports = MassMap;