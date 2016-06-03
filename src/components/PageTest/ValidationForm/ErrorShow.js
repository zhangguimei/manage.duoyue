'use strict';
import React from 'react';

class ErrorShow extends  React.Component {
  render() {
    const {field, defaultPrompt} = this.props;
    if(field && field.touched && field.error) {
      return <span className={`error ${field.name}-error`}>{field.error}</span>
    } else if(defaultPrompt){
      return <span className={`prompt ${field.name}-prompt`}>{defaultPrompt}</span>;
    }else {
      return null;
    }
  }
}

export default ErrorShow;
