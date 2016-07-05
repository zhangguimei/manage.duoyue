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

  radioOnClick() {
    const { radioOnClick, index } = this.props;
    radioOnClick && radioOnClick(index)
  }

  render(){
    let { checked, name, index, value, defaultChecked, title } = this.props;
    const uniqCode = Math.random();
    return(
      <div className={classNames("Radio", {"checked": checked})}>
        {
          defaultChecked ?
          <input name={name} id={`radio${index}-${uniqCode}`} type="radio" onClick={::this.radioOnClick} defaultValue={value} defaultChecked />
          :
          <input name={name} id={`radio${index}-${uniqCode}`} type="radio" onClick={::this.radioOnClick} defaultValue={value} />
        }
        <label className="radio-label" htmlFor={`radio${index}-${uniqCode}`}>
          <span className="radio-symbol" />
        </label>
        <label htmlFor={`radio${index}-${uniqCode}`} className="radio-title">{title}</label>
      </div>
    );
  };
}

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  radioOnClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultChecked: PropTypes.bool
};

export default Radio;