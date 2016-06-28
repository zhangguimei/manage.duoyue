'use strict';
import React from 'react';

class Match extends React.Component {
  render() {
    return (
      <div className="Match">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Match;