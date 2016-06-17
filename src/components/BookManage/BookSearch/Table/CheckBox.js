"use strict";
import React, {PropTypes} from 'react';
import classNames from 'classnames';

import shouldComponentUpdate from '../../../../utils/shouldComponentUpdate';

import styles from './CheckBox.scss';

class CheckBox extends React.Component {
  static defaultProps = {
    checked: false,
    defaultChecked: false,
    index: -1
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    let {checked, checkBoxOnClick, name, index, value, defaultChecked} = this.props;
    let uniqCode = Math.random();
    return (
      <div className={classNames("CheckBox center", {"checked": checked})}>
        {
          defaultChecked ?
            <input name={name} id={`checkbox${index}-${uniqCode}`} type="checkbox"
                   onClick={() => checkBoxOnClick(index)}
                   defaultValue={value} defaultChecked/>
            :
            <input name={name} id={`checkbox${index}-${uniqCode}`} type="checkbox"
                   onClick={() => checkBoxOnClick(index)}
                   defaultValue={value}/>
        }
        <label className="checkbox-label" htmlFor={`checkbox${index}-${uniqCode}`}>
          <span className="checkbox-symbol"/>
        </label>
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
  defaultChecked: PropTypes.bool
};

export default CheckBox;