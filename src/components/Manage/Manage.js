import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PageHeader from '../PageHeader/PageHeader';
import PageSidebar from '../PageSidebar/PageSidebar';
import {Map, is, fromJS} from 'immutable';
import {getChildren} from '../UIComponent/Menu/ShowRoute';
import {getTitle} from '../UIComponent/Menu/ShowRoute';
import {Scrollbars} from 'react-custom-scrollbars';
import styles from './Manage.scss';

class Manage extends React.Component {
  render() {
    const {children, route, query} = this.props;
    let queryRoute = query.route ? query.route.split('.') : [];
    const treeData = require("../../assets/MockData/tree_data.json");
    let sidebarLeft = route.length === 3 && getChildren(treeData.menu, route).length > 0 || route.length === 4 ? '360px' : '180px';
    return (
      <div className="Manage">
        <PageHeader treeData={treeData}/>
        <PageSidebar treeData={treeData} queryRoute={queryRoute}/>
        <div className="PageMain" style={{left : sidebarLeft}}>
          <Scrollbars style={{height:'100%'}}>
            <header className="page-title">{getTitle(treeData.menu, route)}</header>
            {children && React.cloneElement(children)}
          </Scrollbars>
        </div>
      </div>
    )
  }
}

Manage.propTypes = {
  children: PropTypes.node,
  route: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query,
    route: state.menu.toJS()
  }
}

export default connect(
  mapStateToProps)
(Manage);