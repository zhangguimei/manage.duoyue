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
      showPanel: true
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

  render() {
    const { activeTabIndex, showPanel } = this.state;
    return(
      <div className="Editor clearfix">
        <SidebarNav tabIndex={activeTabIndex} showPanel={showPanel} onTabChange={::this.onTabChange}
                    togglePanel={::this.togglePanel} />
        <EditPanel onTabChange={::this.onTabChange} />
      </div>
    );
  };
}

export default Editor;