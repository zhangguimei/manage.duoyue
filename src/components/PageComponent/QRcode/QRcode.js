import React, {PropTypes} from 'react';
import styles from './QRcode.scss';

const data = require("../../../assets/MockData/sourcecenter/code_data.json");

class QRcode extends React.Component {

  render() {
    let QRcodeContent = data.map((item, index) => {
      return (
        <div className="item left" key={index}>
          <div className="pic">
            <img src={item.pic} alt="二维码"/>
          </div>
          <div className="title">{item.title}</div>
        </div>
      )
    });
    return (
      <div className="QRcode clearfix">
        {QRcodeContent}
      </div>
    )
  }
}

/**
 * 暂时静态数据直接调用，后期传参
 * @type {{
 * data: *,
 * fetchData: *
 * }}
 */
QRcode.propTypes = {
  data: PropTypes.object,
  fetchData: PropTypes.func
};
export default QRcode;