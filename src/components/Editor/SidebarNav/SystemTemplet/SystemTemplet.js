"use strict";
import React from 'react';
import classNames from 'classnames';

import styles from './SystemTemplet.scss';

class SystemTemplet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPageTemplet: true,
      showEffectTemplet: false
    };
  }

  toggleTemplet(index) {
    if(index == 0) {
      this.setState({
        showPageTemplet: !this.state.showPageTemplet
      });
    } else if(index == 1) {
      this.setState({
        showEffectTemplet: !this.state.showEffectTemplet
      });
    }
  }

  render() {
    const { showPageTemplet, showEffectTemplet } = this.state
    return(
      <div className="SystemTemplet left">
        <header className="header" onClick={() => this.toggleTemplet(0)}>
          页面模板
          <i className={classNames("ic right", {"ic-unfold": showPageTemplet}, {"ic-right": !showPageTemplet})} />
        </header>
        <div className="page-templet">

        </div>
        <header className="header" onClick={() => this.toggleTemplet(1)}>
          特效模板
          <i className={classNames("ic right", {"ic-unfold": showEffectTemplet}, {"ic-right": !showEffectTemplet})} />
        </header>
      </div>
    );
  }
}

export default SystemTemplet;