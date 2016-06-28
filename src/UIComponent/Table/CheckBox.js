"use strict";
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './CheckBox.scss';

class CheckBox extends React.Component {
  static defaultProps = {
    checked: false,
    defaultChecked: false,
    index: -1,
    value: "",
    name: "",
    title: "",
    disabled: false
  };

  render() {
    let { checked, className, checkBoxOnClick, name, index, value, defaultChecked, title, disabled } = this.props;
    let uniqCode = Math.random();
    let generalProps = {
      type: "checkbox",
      name: name,
      className: "input-checkbox",
      defaultValue: value
    };
    if(disabled) {
      generalProps.disabled = "disabled";
    }
    return (
      <div className={classNames("CheckBox center", {"checked": checked})}>
        {
          defaultChecked ?
            <input {...generalProps} id={`checkbox${index}-${uniqCode}`} onClick={() => checkBoxOnClick(index)}
                                     defaultChecked/>
            :
            <input {...generalProps} id={`checkbox${index}-${uniqCode}`} onClick={() => checkBoxOnClick(index)} />
        }
        <label className={`checkbox-label ${className}`} htmlFor={`checkbox${index}-${uniqCode}`}>
          <span className="checkbox-symbol"/>
        </label>
        <label htmlFor={`checkbox${index}-${uniqCode}`} className="checkbox-title">{title}</label>
      </div>
    );
  };
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  checkBoxOnClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultChecked: PropTypes.bool,
  title: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default CheckBox;