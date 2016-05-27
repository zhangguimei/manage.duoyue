'use strict';
import React, {PropTypes} from 'react';
import SidebarItemList from './SidebarItemList';

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  toggleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const {menuData:{name, data}, route, changeRoutes, parent, selectTitle} = this.props,
      {open} = this.state;
    return (
      <div className="SidebarItem item">
        <h5>
          {
            data.length > 0 ?
              <a className={selectTitle ? 'cur' : null} onClick={() => this.toggleClick()}>{name}<i
                className={open ? 'ic ic-move' :'ic ic-add'}/></a> :
              <a className={selectTitle ? 'cur' : null} onClick={() => changeRoutes(`${parent}`)}>{name}</a>
          }
        </h5>
        {
          data.length > 0 && <ul style={{display:open?'block':'none'}}>
            {
              data.map((item, i) => {
                let select = route.slice(1, 3).join(".") == `${parent}.${i}`;
                return (
                  <SidebarItemList key={i} select={select} menuData={item}
                                   onClick={() => changeRoutes(`${parent}.${i}`, item, `${parent}.${i}`)}/>
                );
              })
            }
          </ul>
        }
      </div>
    );
  }
}

SidebarItem.propTypes = {
  menuData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  }).isRequired
};

export default SidebarItem;
