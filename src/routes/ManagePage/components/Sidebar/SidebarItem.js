'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import SidebarItemList from './SidebarItemList';
import {regPath} from 'UtilsFolder/getDataInfo';

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  toggleClick(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const {menuData:{permissionName, children, icon_min, accessPath}, path, changeSubData} = this.props,
      {open} = this.state, ITEM_HEIGHT = 30;
    return (
      <div className="SidebarItem item">
        <h5>
          {
            children && children.length > 0 ?
              <a onClick={::this.toggleClick} >
                <i className={`ic ${icon_min} ic1`}/>{permissionName}
                <i className={open ? 'ic ic-move ic2' :'ic ic-add ic2'}/>
              </a>
              :
              <Link to={regPath(accessPath)} className={path.indexOf(accessPath) > -1 ? 'cur' : null}>
                <i className={`ic ${icon_min} ic1`}/>
                {permissionName}
              </Link>
          }
          {
            children && children.length > 0 &&
            <ul className="transitioned" style={{height: open ? children.length * ITEM_HEIGHT : 0 }}>
              {
                children.map((item, index) => {
                  return (
                    <SidebarItemList key={index}  menuData={item} changeSubData={changeSubData} path={path}/>
                  );
                })
              }
            </ul>
          }

        </h5>

      </div>
    );
  }
}

SidebarItem.propTypes = {
  menuData: PropTypes.shape({
    permissionName: PropTypes.string.isRequired,
    accessPath: PropTypes.string.isRequired,
    children: PropTypes.array
  }).isRequired
};

export default SidebarItem;
