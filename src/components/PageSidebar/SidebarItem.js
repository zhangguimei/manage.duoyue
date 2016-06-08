'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
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
    const {menuData:{id, name, data}, route, changeRoutes, parent, selectTitle} = this.props,
      {open} = this.state;
    const treeAdd = require("../../assets/MockData/tree_add_data.json");
    const icon = treeAdd[id].icon;
    let routeFirst = route[0];
    if (!treeAdd[id]) {
      treeAdd[id] = {}
    }
    let {url="/hover"} = treeAdd[id];
    return (
      <div className="SidebarItem item">
        <h5>
          {
            data.length > 0 ?
              <a className={selectTitle ? 'cur' : null} onClick={() => this.toggleClick()}><i
                className={`ic ${icon} ic1`}/>{name}<i
                className={open ? 'ic ic-move ic2' :'ic ic-add ic2'}/></a> :
              <Link to={`/manage${url}?route=${routeFirst}.${parent}`} className={selectTitle ? 'cur' : null}
                    onClick={() => changeRoutes(`${parent}`)}><i className={`ic ${icon} ic1`}/>{name}</Link>
          }
        </h5>
        {
          data.length > 0 && <ul ref="ul" className="transitioned" style={{height: open ? (data.length*30+'px'): 0 }}>
            {
              data.map((item, i) => {
                let select = route.slice(1, 3).join('.') === `${parent}.${i}`;
                return (
                  <SidebarItemList key={i} select={select} menuData={item} route={`${routeFirst}.${parent}.${i}`}
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
    url: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  }).isRequired
};

export default SidebarItem;
