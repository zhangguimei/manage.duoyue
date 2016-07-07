'use strict';
import React, {PropTypes} from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.any
};

module.exports =  App;