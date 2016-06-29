'use strict';
import React, {PropTypes}  from 'react';
import PolyMap from 'UIComponentFolder/Map/PolyMap';
const mapData = require("AssetsFolder/MockData/map/poly_data.json");

class AssembleMap extends React.Component {

  render() {
    return (
      <PolyMap id="PolyMap" data={mapData} style={{height:580}}/>
    )
  }
}

AssembleMap.propTypes = {
  data: PropTypes.object
};
module.exports = AssembleMap;