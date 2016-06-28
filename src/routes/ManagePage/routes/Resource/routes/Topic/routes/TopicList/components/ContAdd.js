'use strict';
import React, {PropTypes} from 'react';

const optionData = [
  {
    "id": 1,
    "ShowStyle": "列表"
  },
  {
    "id": 2,
    "ShowStyle": "相册"
  },
  {
    "id": 3,
    "ShowStyle": "日志"
  },
  {
    "id": 4,
    "ShowStyle": "详情"
  }
];

class ContAdd extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <form className="ContAdd form-horizontal">
        <div className="form-group">
          <label className="control-label">栏目名称：</label>
          <div className="control-body">
            <input type="text" className="form-control w200" defaultValue={data.title}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">展示样式：</label>
          <div className="control-body">
            <select className="form-control">
              {
                optionData.map((item, index) => {
                  return (
                    <option key={index} value={item.ShowStyle}>{item.ShowStyle}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">排序值：</label>
          <div className="control-body">
            <input type="text" className="form-control w100" defaultValue={data.title}/>
          </div>
        </div>
      </form>
    )
  }
}

ContAdd.propTypes = {
  data: PropTypes.object
};

export default ContAdd;