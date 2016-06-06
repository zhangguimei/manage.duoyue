"use strict";
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './Radio.scss';

class Radio extends React.Component {
  static defaultProps = {
    checked: false,
    defaultChecked: false,
    index: -1
  };

  render(){
    let { checked, radioOnClick, name, index, value, defaultChecked } = this.props;
    const uniqCode = Math.random();
    return(
      <div className={classNames("Radio", {"checked": checked})}>
        {
          defaultChecked ?
          <input name={name} id={`radio${index}-${uniqCode}`} type="radio" onClick={() => radioOnClick(index)} defaultValue={value} defaultChecked />
          :
          <input name={name} id={`radio${index}-${uniqCode}`} type="radio" onClick={() => radioOnClick(index)} defaultValue={value} />
        }
        <label className="radio-label" htmlFor={`radio${index}-${uniqCode}`}>
          <span className="radio-symbol" />
        </label>
      </div>
    );
  };
};

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  radioOnClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultChecked: PropTypes.bool
};

export default Radio;