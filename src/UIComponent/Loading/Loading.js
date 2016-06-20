import React, {PropTypes} from 'react';
import classnames from 'classnames';
import styles from './Loading.scss';

class Loading extends React.Component {

  render() {
    let cName = this.props.className;
    let classNames = classnames('Loading', {
      [cName]: true
    });

    return (
      <div className={classNames}>
        <div className="spinner">
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string
};

export default Loading;

