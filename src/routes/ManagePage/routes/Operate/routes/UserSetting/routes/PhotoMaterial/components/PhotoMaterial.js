/*
 *  Project : User Setting
 *  Date    : 2016/7/1
 *  Author  : Melody Yuen
 *  Declare : GraphicMaterial
 */

'use strict';
import React from 'react';
import styles from './PhotoMaterial.scss';

const photoListData = require("AssetsFolder/MockData/operate/usersetting/photo_list_data.json");

class PhotoMaterial extends React.Component {
  render() {
    return (
      <div className="PhotoMaterial">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group">
              <label>文章标题：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary w120" value="图文素材同步"/>
          </div>
        </div>
        <div className="photo-list">
          <ul className="clearfix">
            {
              photoListData && photoListData.map((item, i) => {
                return (
                  <li key={i}>
                    <div className="date">{item.datetime}</div>
                    <a className="link" href={item.url} target="_blank">
                      <h4>{item.title}</h4>
                      <div className="pic">
                        <img src={item.pic}/>
                      </div>
                      <p>{item.desc}</p>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = PhotoMaterial;