"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Scrollbars} from 'react-custom-scrollbars';

import { hideAllEditMenu } from '../../../actions/EditorActions';

import MusicBox from './MusicBox/MusicBox';
import WechatContent from './WechatContent/WechatContent';

import styles from './EditPanel.scss';

class EditPanel extends React.Component {

  hideAllEditMenu() {
    const { hideAllEditMenu } = this.props;
    hideAllEditMenu && hideAllEditMenu();
  }

  render() {
    const { onTabChange } = this.props;
    return (
      <div className="editPanel-box">
        <div className="back-modal" onClick={(e) => this.hideAllEditMenu(e)}></div>
        <Scrollbars style={{height:'100%'}}>
          <div className="EditPanel">
            <MusicBox onTabChange={onTabChange} />
            <WechatContent onTabChange={onTabChange} />
          </div>
        </Scrollbars>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideAllEditMenu: bindActionCreators(hideAllEditMenu, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPanel);