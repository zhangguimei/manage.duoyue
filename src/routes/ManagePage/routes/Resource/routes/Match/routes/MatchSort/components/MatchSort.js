/*
 *  Project : MatchSort Page In Match
 *  Date    : 2016.7.1
 *  Author  : Zhou Xian
 *  Declare : Built MatchSort Page
 */

'use strict';
import React from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Tree from 'UIComponentFolder/Tree/Tree';

import styles from './MatchSort.scss';

const treeData = require("AssetsFolder/MockData/resource/match/matchSort/matchSort_tree_data.json");

class MatchSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormArea: false
    };
  }

  toggleFormArea(){
    this.setState({
      showFormArea: true
    });
  }

  render() {
    const {showFormArea}=this.state,
      addContent={
        callback: ::this.toggleFormArea,
        content: "新增"
      };
    return (
      <div className="MatchSort clearfix">
        <div className="MatchSort-left left">
          <Tree  data={treeData} clickItem={::this.toggleFormArea} addContent={addContent}/>
        </div>
        <div className="MatchSort-right left form-default">
        {
          !showFormArea &&
          <div className="default-info">请点击左侧目录节点进行维护!</div>
        }
        { 
          showFormArea &&
          <form>
            <div className="form-group">
              <label className="control-label">上级分类</label>
              <div className="control-body">
                <FormItem type="tree" name="classify" className="w300 form-control" treeData={treeData}/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label"><span className="text-danger">*</span>分类名称</label>
              <div className="control-body">
                <input type="text" defaultValue="" className="w300 form-control"/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">排序值</label>
              <div className="control-body">
                <input type="text" defaultValue="0" className="w300 form-control"/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label"><span className="text-danger">*</span>封面图</label>
              <div className="mb5">建议尺寸（900*500）</div>
              <div className="control-body">
                <FormItem type="imageUpload" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">分类图标</label>
              <div className="mb5">建议尺寸（64*64）</div>
              <div className="control-body">
                <FormItem type="imageUpload" />
              </div>
            </div>
            <div className="submit-area">
              <div className="btn btn-primary w80 submit-btn">确定</div>
            </div>
          </form>   
        }
        </div>
      </div>
    );
  }
}

module.exports = MatchSort;