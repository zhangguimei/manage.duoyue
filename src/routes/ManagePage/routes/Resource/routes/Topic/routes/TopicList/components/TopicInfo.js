'use strict';
import React, {PropTypes} from 'react';

class TopicInfo extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <form className="TopicInfo form-horizontal">
        <div className="form-group">
          <label className="control-label">专题分类：</label>
          <div className="control-body">
            <input type="text" className="form-control" defaultValue={data.classify}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">专题名称：</label>
          <div className="control-body">
            <input type="text" className="form-control" defaultValue={data.title}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">专题简介：</label>
          <div className="control-body">
            <textarea className="form-control" rows="3" defaultValue={data.intro}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">专题图片（横图）</label>
          <div className="control-body">
            <div className="upload">
              <img src={data.imgSrc} className="mb10" alt=""/>
              <input type="file"/>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

TopicInfo.propTypes = {
  data: PropTypes.object
};

export default TopicInfo;