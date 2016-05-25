"use strict";
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './CheckBox.scss';

class CheckBox extends React.Component {
  static defaultProps = {
    checked: false,
    index: -1
  };

  render(){
    let { checked, CheckBoxOnClick, index, value } = this.props;
    return(
      <div className={classNames("CheckBox center", {"checked": checked})}>
        <input id={`checkbox${index}`} type="checkbox" onClick={() => CheckBoxOnClick(index)} value={value} />
        <label className="check-label" htmlFor={`checkbox${index}`}>
          <span className="checkbox-symbol" />
        </label>
      </div>
    );
  };
};

CheckBox.propTypes = {
  checked: PropTypes.bool,
  CheckBoxOnClick: PropTypes.func.isRequired,
  index: PropTypes.number,
  value: PropTypes.number
};

export default CheckBox;