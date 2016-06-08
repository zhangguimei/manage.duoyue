"use strict";
import React from 'react';
import { connect } from 'react-redux';

import ContentItem from './ContentItem';
import WordsEditMenu from './EditMenu/WordsEditMenu/WordsEditMenu';

import styles from './WechatContent.scss';

class WechatContent extends React.Component {
  render(){
    const { editPanelContent, ShowWordsEditMenu } = this.props,
          contentCode = editPanelContent.map((item, index) => {
            return <ContentItem key={index}>{item}</ContentItem>;
          });
    return (
      <div className="WechatContent">
        <WordsEditMenu className={ShowWordsEditMenu ? "show" : ""} />
        {
          editPanelContent.length == 0 &&
          <div className="no-page">←选择模板</div>
        }
        { contentCode }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { editPanelContent, editMenuState: { ShowWordsEditMenu } } = state.editor.toJS();
  return {
    editPanelContent,
    ShowWordsEditMenu
  }
};

export default connect(
  mapStateToProps
)(WechatContent);