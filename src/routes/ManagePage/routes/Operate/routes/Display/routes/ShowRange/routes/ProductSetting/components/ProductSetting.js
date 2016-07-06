/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-展示范围-产品设置
 */
'use strict';
import React from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import styles from './ProductSetting.scss';

const productSettingData = require("AssetsFolder/MockData/operate/display/productSetting_data.json");

class ProductSetting extends React.Component {
  render() {
    return (
      <div className="ProductSetting">
        <Tree data={productSettingData.TreeData} checkable/>
      </div>
    );
  }
}

module.exports = ProductSetting;