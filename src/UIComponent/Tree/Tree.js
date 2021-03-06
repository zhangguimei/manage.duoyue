/*
 *  Project : Tree
 *  Date    : 2016.06.28
 *  Author  : Paco
 *  Declare : Like the Menu, but it can show what you want to show and to choose it.
 */
'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, fromJS, is} from 'immutable';

import {chooseTreeLeaves} from 'ActionsFolder/MenuActions';
import TreeList from './TreeList';
import styles from "./Tree.scss";

class Tree extends React.Component {

  static defaultProps = {
    checkable: false, //默认为有checkbox,可多选
    addContent: {} //是否有新增选项
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false //控制树的展开与收起
    };
    this.freeOpen = true; //自由控制状态
  }

  clickItem(data) {
    let {clickItem} = this.props;
    clickItem && clickItem(data);
  }

  toggleOpen(value) {
    this.freeOpen = true;
    this.setState({
      open: value
    });
  }

  addContent() {
    const {addContent = {}} = this.props;
    addContent.callback && addContent.callback();
  }

  componentWillReceiveProps() {
    this.freeOpen = false;
  }

  render() {
    const {open} = this.state, {addContent} = this.props;
    const ifAddContent = !!addContent.content;
    return (
      <div className="Tree">
        <div className="control-open" >
          <span className="open-tree" onClick={() => this.toggleOpen(true)}>展开节点</span>
          <i>|</i>
          <span className="close-tree" onClick={() => this.toggleOpen(false)}>关闭节点</span>
          {
            ifAddContent && <i>|</i>
          }
          {
            ifAddContent &&
            <span className="add-tree" onClick={::this.addContent}>{addContent.content}</span>
          }
        </div>
        <TreeList clickItem={::this.clickItem} {...this.props} open={open} freeOpen={this.freeOpen}/>
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