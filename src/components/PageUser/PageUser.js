'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, is, fromJS} from 'immutable';
import * as actions from '../../actions/MenuActions';
import {getTitle} from '../UIComponent/Menu/ShowRoute';
import styles from "./PageUser.scss";

class PageUser extends React.Component {
  render() {
    let {menu} = this.props;
    const treeData = require("../../assets/MockData/tree_data.json");
    //console.log('menu:' + menu);
    return (
      <div className="PageUser">{getTitle(treeData.menu, menu)}</div>
    );
  }
}

PageUser.propTypes = {
  actions: PropTypes.shape({
    changeRoute: PropTypes.func
  }),
}

function mapStateToProps(state) {
  let {menu} = fromJS(state).toJS();
  return {
    menu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageUser);