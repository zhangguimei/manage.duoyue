'use strict';
import React, {PropTypes} from 'react';

import styles from './Dropdown.scss';

class MultiSelectedItem extends React.Component {

  render() {
    const { selected, onDelete } = this.props;
    return (
			<li className="MultiSelectedItem left" >
        <span className="item-title">{selected}</span>
        <a className="close-icon ic ic-close" onClick={(e) => onDelete(selected, e)} ></a>
      </li>
    );
  }
}

export default MultiSelectedItem;
