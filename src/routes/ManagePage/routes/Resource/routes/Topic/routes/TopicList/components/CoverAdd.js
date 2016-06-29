'use strict';
import React, {PropTypes} from 'react';

class CoverAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  render() {
    const {data} = this.props;
    return (
      <form className="CoverAdd form-horizontal">
        <div className="form-group">
          <label className="control-label">封面名称：</label>
          <div className="control-body">
            <input type="text" className="form-control" defaultValue={data.title}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">封面简介：</label>
          <div className="control-body">
            <textarea className="form-control w300" rows="3" defaultValue={data.intro}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">封面图片：</label>
          <div className="control-body">
            <div className="upload">
              <img className="mb10" src={data.imgSrc} alt={data.title} title={data.title}/>
              <input type="file"/>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">排序值：</label>
          <div className="control-body">
            <input type="text" className="form-control w100" defaultValue={data.order}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">目标链接：</label>
          <div className="control-body">
            <input type="text" className="form-control w400"/>
          </div>
        </div>
      </form>
    )
  }
}

CoverAdd.propTypes = {
  data: PropTypes.object
};

export default CoverAdd;