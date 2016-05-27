'use strict';
import React, {PropTypes} from 'react';

class SidebarSubItem extends React.Component {
  render() {
    let {subData:{name, data}, route, parent, changeRoutes} = this.props;
    return (
      <div className="SidebarSubItem">
        <h5>{name}</h5>
        <ul>
          {
            data.map((item, i) => {
              let select = route.join(".").slice(2) == `${parent}.${i}`;
              return (
                <li key={i}><a className={select ? 'cur': ''}
                               onClick={() => changeRoutes(`${parent}.${i}`)}>{item.name}</a></li>
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
    data: PropTypes.array.isRequired
  }).isRequired
}

export default SidebarSubItem;