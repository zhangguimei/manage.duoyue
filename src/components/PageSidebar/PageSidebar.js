'use strict';
import React, {PropTypes} from 'react';
import SidebarItem from './SidebarItem';
import styles from './PageSidebar.scss';

class PageSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: [0]
    }
  }

  componentWillReceiveProps(np) {
    const {route} = np;
    if (route.length > 0) {
      this.setState({
        route: route
      })
    }
  }

  changeRoute(routes) {
    const {route} = this.state;
    this.setState({
      route: [route[0], ...routes.split(".")]
    })
  }

  render() {
    const {data} = this.props, {route} = this.state;
    let sidebarData = data[route[0]].children;
    return (
      <div className="PageSidebar">
        <div className="sidebarOne">
          {
            sidebarData.map((item, i)=> {
              return (
                <SidebarItem key={i} data={item} route={route} changeRoute={::this.changeRoute} parent={`${i}`}/>
              );
            })
          }
        </div>
        {/*<div className="sidebarTwo"></div>*/}
      </div>
    );
  }
}

PageSidebar.propTypes = {
  data: PropTypes.array.isRequired
};

export default PageSidebar;