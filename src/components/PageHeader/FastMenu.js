'use strict';
import React, {PropTypes} from 'react';
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
                let {name, icon_max} = item;
                return (
                  <a key={i} href="javascript:;" onClick={() => changeRoute(options[item.id])}>
                    <img src={icon_max} alt={name}/>
                    <span>{name}</span>
                  </a>
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
    icon_max: PropTypes.string.isRequired
  })).isRequired
}

export default FastMenu;