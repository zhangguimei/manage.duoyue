'use strict';
import React, {PropTypes} from 'react';
import classNames from 'classnames';

import styles from './Dropdown.scss';

class DropdownItem extends React.Component {
	
  render() {
    const { data, select, selectedArr } = this.props;
    let disabled = selectedArr.findIndex( v => v.id == data.id) > -1 || !data.canSelect ;
    return (
      <li className={classNames('DropdownItem a-line',{'gray-color cant-click': disabled})} onClick={() => !disabled && select(data.id)}>{data.title}</li>
    );
  }
}

export default DropdownItem;

