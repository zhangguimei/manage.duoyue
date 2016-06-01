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
    let { checked, radioOnClick, name, index, defaultChecked } = this.props;
    return(
      <div className={classNames("Radio", {"checked": checked})}>
        {
          defaultChecked ?
          <input name={name} id={`radio${index}`} type="radio" onClick={() => radioOnClick(index)} defaultChecked />
          :
          <input name={name} id={`radio${index}`} type="radio" onClick={() => radioOnClick(index)} />
        }
        <label className="radio-label" htmlFor={`radio${index}`}>
          <span className="radio-symbol" />
        </label>
      </div>
    );
  };
};

Radio.propTypes = {
  checked: PropTypes.bool,
  radioOnClick: PropTypes.func.isRequired,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultChecked: PropTypes.bool
};

export default Radio;