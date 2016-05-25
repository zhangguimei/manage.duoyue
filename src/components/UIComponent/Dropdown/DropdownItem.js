'use strict';
import React, {PropTypes} from 'react';
import classNames from 'classnames';

import styles from './Dropdown.scss';

class DropdownItem extends React.Component {
	
  render() {
    const { data, select, cantSelect, selectedArr } = this.props;
    let grayColor = cantSelect.indexOf(data.title)==-1 && selectedArr.indexOf(data.title)==-1 ? false : true;
    let cantClick = cantSelect.indexOf(data.title)==-1 ? false : true;
    return (
    <li className={classNames('DropdownItem a-line',{'gray-color':grayColor},{'cant-click':cantClick})} onClick={() => select(data.title)}>{data.title}</li>
    );
  }
}

export default DropdownItem;

