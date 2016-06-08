"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showEditMenu } from '../../../../../actions/EditorActions';
import { clickToEdit, removeClickToEdit } from '../../../editorUtils/clickToEdit';

import styles from './WordsComponent.scss';

class WordsComponent extends React.Component {

  componentDidMount() {
    const { _this, children } = this.props;
    let node, childrenList = [];
    if(!Array.isArray(children) && typeof children == "object") {
      childrenList.push(children);
    } else {
      childrenList = children || [];
    }
    for(let child of childrenList) {
      node = _this.refs[child.ref];
      clickToEdit(node);
      node.title = "点击进行编辑";
    }
  }

  componentWillUnmount() {
    const { _this, children } = this.props;
    let childrenList = [];
    if(!Array.isArray(children) && typeof children == "object") {
      childrenList.push(children);
    } else {
      childrenList = children || [];
    }
    for(let child of childrenList) {
      removeClickToEdit(_this.refs[child.ref]);
    }
  }

  showEditMenu() {
    const { showEditMenu } = this.props;
    showEditMenu && showEditMenu("ShowWordsEditMenu");
  }

  render() {
    const { children } = this.props;
    return(
      <div className="WordsComponent" onClick={::this.showEditMenu}>
        { children }
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    showEditMenu: bindActionCreators(showEditMenu, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordsComponent);