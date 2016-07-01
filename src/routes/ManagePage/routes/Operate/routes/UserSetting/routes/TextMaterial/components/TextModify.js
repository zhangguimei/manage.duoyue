/*
 *  Project : User Setting
 *  Date    : 2016/7/1
 *  Author  : Melody Yuen
 *  Declare : TextModify
 */

'use strict';
import React from 'react';

class TextModify extends React.Component {
  render() {
    const {data:{content=''}} = this.props;
    return (
      <form className="TextModify form-default">
        <div className="form-group">
          <label><i className="text-danger">*</i>文本内容</label>
          <textarea className="form-control w100per" rows="5" defaultValue={content}/>
        </div>
      </form>
    );
  }
}

export default TextModify;