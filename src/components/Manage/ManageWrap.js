'use strict';
import React, {PropTypes} from 'react';

class ManageWrap extends React.Component {
  render(){
    return (
      <div className="ManageWrap">
        {this.props.children}
      </div>
    );
  }
}

ManageWrap.propTypes = {
  children:PropTypes.any
}

export default ManageWrap;


