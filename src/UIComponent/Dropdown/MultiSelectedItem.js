'use strict';
import React, {PropTypes} from 'react';

import styles from './Dropdown.scss';

class MultiSelectedItem extends React.Component {

  render() {
    const { data, onDelete } = this.props;
    return (
			<li className="MultiSelectedItem left" >
        <span className="item-title">{data.title}</span>
        <a className="close-icon ic ic-close" onClick={(e) => { e.stopPropagation(); return onDelete()}} />
      </li>
    );
  }
}

export default MultiSelectedItem;
