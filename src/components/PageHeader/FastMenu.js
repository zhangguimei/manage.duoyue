'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import options from './ConstantOfFast';

class FastMenu extends React.Component {
  render() {
    let {fastData, changeRoute} = this.props;
    return (
      <div className="FastMenu">
        <a className="title" href="javascript:;">三</a>
        <div className="cont">
          <div className="icon-caret"><em/><i/></div>
          <h5>快速操作</h5>
          <div className="list">
            {
              fastData.map((item, i) => {
                let {name, url, icon_max} = item;
                let route = options[item.id].join('.');
                return (
                  <Link to={`${url}?route=${route}`} key={i} onClick={() => changeRoute(options[item.id])}>
                    <img src={icon_max} alt={name} className="hvr-pop"/>
                    <span>{name}</span>
                  </Link>
                );
              })
            }
          </div>
          <a className="logout" href="">退出系统</a>
        </div>
      </div>
    );
  }
}

FastMenu.propTypes = {
  fastData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon_max: PropTypes.string.isRequired
  })).isRequired
}

export default FastMenu;