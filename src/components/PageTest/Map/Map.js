'use strict';
import React from 'react';
import HeatMap from '../../UIComponent/Map/HeatMap';
import PolyMap from '../../UIComponent/Map/PolyMap';
import MassiveMap from '../../UIComponent/Map/MassiveMap';
import SexMap from '../../UIComponent/Map/SexMap';

class Map extends React.Component {
  render() {
    const heatData = require("../../../assets/MockData/map/heat_data.json");
    const mapData = require("../../../assets/MockData/map/map_data.json");
    return (
      <div>
        <HeatMap id="HeatMap" data={heatData} style={{height:580}}/>
        <PolyMap id="PolyMap" data={mapData} style={{height:580}}/>
        <MassiveMap id="MassiveMap" data={mapData} style={{height:580}}/>
        <SexMap id="SexMap" data={mapData} style={{height:580}}/>
      </div>
    );
  }
}

export default Map;