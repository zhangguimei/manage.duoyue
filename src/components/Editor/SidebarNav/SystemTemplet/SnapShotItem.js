"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEditContent } from '../../../../actions/EditorActions';

import styles from './SnapShotItem.scss';

class SnapShotItem extends React.Component {

  click(component) {
    const { addEditContent } = this.props;
    console.log(component);
    addEditContent && addEditContent(component);
  }

  render() {
    const { children } = this.props,
          contentCode = React.createElement(children.default.snapShot);
    return (
      <div className="SnapShotItem" onClick={() => this.click(children.default.component)}>
        { contentCode }
      </div>
    );
  }
}

const mapStateToProps = () => {
  return{};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEditContent: bindActionCreators(addEditContent, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapShotItem);