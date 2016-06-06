"use strict";
import React from 'react';
import SidebarNav from './SidebarNav/SidebarNav';
import EditPanel from './EditPanel/EditPanel';

import styles from './Editor.scss';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      showPanel: true,
      editPanelContent: []
    };
  }

  togglePanel() {
    this.setState({
      showPanel: !this.state.showPanel
    });
  }

  onTabChange(nextIndex) {
    this.setState({
      activeTabIndex: nextIndex,
      showPanel: true
    });
  }

  snapShotOnClick(snapShot) {
    this.setState({
      editPanelContent: this.state.editPanelContent.concat(snapShot)
    });
  }

  render() {
    const { activeTabIndex, showPanel, editPanelContent } = this.state;
    return(
      <div className="Editor clearfix">
        <SidebarNav tabIndex={activeTabIndex} showPanel={showPanel} onTabChange={::this.onTabChange}
                    togglePanel={::this.togglePanel} snapShotOnClick={::this.snapShotOnClick} />
        <EditPanel onTabChange={::this.onTabChange} content={editPanelContent} />
      </div>
    );
  };
}

export default Editor;