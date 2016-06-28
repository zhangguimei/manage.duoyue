import React, {PropTypes} from 'react';
import styles from './Loading.scss';

class LoadingRect extends React.Component {
  static defaultProps = {
    desc: '正在加载...'
  }

  render() {
    return (
      <div className="LoadingRect">
        <p className="desc">{this.props.desc}</p>
        <div className="spinner">
          <div className="running animated infinite"></div>
          <div className="running-end animated infinite"></div>
        </div>
      </div>
    );
  }
}

LoadingRect.propTypes = {
  desc: PropTypes.string
};

export default LoadingRect;

