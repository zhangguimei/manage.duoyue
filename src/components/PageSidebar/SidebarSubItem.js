'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class SidebarSubItem extends React.Component {
  render() {
    const {subData:{name, data}, route, parent, changeRoutes} = this.props;
    return (
      <div className="SidebarSubItem">
        <h5>{name}</h5>
        <ul>
          {
            data.map((item, i) => {
              let select = route.join(".").slice(2) == `${parent}.${i}`;
              return (
                <li key={i}>
                  <Link to={`${item.url}`} className={select ? 'cur': ''}
                        onClick={() => changeRoutes(`${parent}.${i}`)}>{item.name}</Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

SidebarSubItem.propTypes = {
  subData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
}

export default SidebarSubItem;