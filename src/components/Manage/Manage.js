import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PageHeader from '../PageHeader/PageHeader';
import PageSidebar from '../PageSidebar/PageSidebar';
import {Map, is, fromJS} from 'immutable';
import {getChildren} from '../UIComponent/Menu/ShowRoute';
import styles from './Manage.scss';

class Manage extends React.Component {
  render() {
    const {children, route} = this.props;
    const treeData = require("../../assets/MockData/tree_data.json");
    let sidebarLeft = route.length === 4 ? '360px' : '180px';
    return (
      <div className="Manage">
        <PageHeader treeData={treeData}/>
        <PageSidebar treeData={treeData} route={route}/>
        <div className="PageMain" style={{left : sidebarLeft}}>
          {children && React.cloneElement(children)}
        </div>
      </div>
    )
  }
}

Manage.propTypes = {
  children: PropTypes.node,
  defaultPath: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    defaultPath: ownProps.location.pathname,
    route: state.menu.toJS()
  }
}

export default connect(
  mapStateToProps)
(Manage);