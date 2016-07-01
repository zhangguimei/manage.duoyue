/*
 *  Date    : 2016.7.1
 *  Author  : Zhang Guimei
 *  Declare : 资讯时长页面
 */
'use strict';
import React, {PropTypes} from 'react';
import styles from './InformationDuration.scss';

const readLengthTableData = require("AssetsFolder/MockData/analysis/resource/information_reading_length_data.json");

class InformationDuration extends React.Component {
  render() {
    return (
      <div className="InformationDuration">
        <ul>
          {
            readLengthTableData.tableContentData.map((item, i) => {
              return <li className="read-duration-item" key={i}>
                <span className="number">{i + 1}</span>
                <span className="title">{item.title}</span>
                <span className="read-duration">{item.readDuration}</span>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = InformationDuration;
