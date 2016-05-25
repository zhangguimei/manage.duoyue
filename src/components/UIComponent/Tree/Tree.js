'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {chooseTreeLeaves} from '../../../actions/MenuActions';
import TreeList from './TreeList';
import styles from "./Tree.scss";

class Tree extends React.Component {

  static defaultProps = {
    checkable: true //默认为有checkbox,可多选
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      route: [] //当前鼠标滑过的路线
    };
  }

  clickItem(id) {
    let {changeRoute} = this.props;
    console.log(id);
  }

  render() {
    return (
      <div className="Tree">
        <TreeList clickItem={::this.clickItem} {...this.props}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    route: state.tree.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chooseTreeLeaves: bindActionCreators(chooseTreeLeaves, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tree);