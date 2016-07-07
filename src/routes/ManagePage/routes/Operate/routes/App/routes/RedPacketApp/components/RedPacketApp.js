'use strict';

import React from 'react';

class RedPacketApp extends React.Component {
  render() {
    return (
      <div className="RedPacketApp">
        {this.props.children}
      </div>
    )
  }
}


module.exports = RedPacketApp;