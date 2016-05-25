'use strict';
import React, {PropTypes} from 'react';
import SidebarItemList from './SidebarItemList';

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      selectIndex: -1
    }
  }

  toggleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    let {data:{title, children}, route, changeRoute, parent} = this.props,
      {open} = this.state;
    return (
      <div className="SidebarItem item">
        <h5>
          <a className={open ? "cur" : null} onClick={()=>this.toggleClick()}>{title}{children.length > 0 ?
            <i className="ic ic-add"/> : null}</a>
        </h5>
        {
          children.length > 0 && <ul style={{display:open?'block':'none'}}>
            {
              children.map((item, i) => {
                let select = route.join(".").slice(2, 5) == `${parent}.${i}`;
                return (
                  <SidebarItemList key={i} select={select} data={item}
                                   onClick={() => changeRoute(`${parent}.${i}`)}/>
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
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
  }).isRequired
};

export default SidebarItem;
