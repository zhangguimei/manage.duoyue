'use strict';
import React, {PropTypes} from 'react';
import SidebarItem from './SidebarItem';
import SidebarSubItem from './SidebarSubItem';
import {getMainIndex, compareData} from 'UtilsFolder/getDataInfo';
import {Scrollbars} from 'react-custom-scrollbars';
import styles from './Sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fold: false,
      subData: {}
    };
  }

  componentWillReceiveProps(np) {
    const {treeData:{permissions}} = this.props;
    let subData = {}, pathArr = np.path.split("/"), path;
    if(pathArr.length >= 4) {
      pathArr.length = 4;
      path = pathArr.join("/");
      subData = compareData(permissions, 'accessPath', path, null);
    }else {
      subData = {};
    }
    this.setState({
      subData: subData
    })
  }

  changeRoute(routes, data) {
    this.setState({
      routes: routes,
      subData: data
    })
  }

  foldToggle() {
    this.setState({
      fold: !this.state.fold
    })
  }

  getWidth() {
    const {subData} = this.state;
    return !!(subData && subData.children && subData.children.length > 0) ? 360 : 180;
  }

  render() {
    const {treeData:{permissions}, path} = this.props,
      {fold, subData} = this.state;
    const menuData = permissions[getMainIndex(permissions, path)].children;
    let foldClass = fold ? 'fold' : '';
    const hasSubItem = !!(subData && subData.children && subData.children.length > 0);
    return (
      <aside className={`Sidebar ${foldClass} transitioned`} >
        <div className="sidebarOne">
          <Scrollbars autoHide={true} style={{height:'100%'}} renderTrackVertical={props => <div {...props} className="sideScrollBarVertical"/>}>
            {
              menuData.map((item, i)=> {
                return (
                  <SidebarItem key={i} menuData={item} parent={`${i}.`} path={path} changeRoute={::this.changeRoute}/>
                );
              })
            }
          </Scrollbars>
          <a className="btn-toggle transitioned" onClick={::this.foldToggle}><i
            className={fold ? 'ic ic-right2' : 'ic ic-back2'}/></a>
        </div>
        {
          hasSubItem &&
          <div className="sidebarTwo">
            <SidebarSubItem subData={subData} path={path}/>
          </div>
        }
      </aside>
    );
  }
}

export default Sidebar;