/*
 *  Date    : 2016.07.07
 *  Author  : CC
 *  Declare : 文章分类
 */
"use strict";
import React, {PropTypes} from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

import styles from './ArticleSort.scss';
const tagData = require("AssetsFolder/MockData/sourcecenter/article/article_sort_data.json").treeData,
  options = require("AssetsFolder/MockData/sourcecenter/article/article_sort_data.json").options;

class ArticleSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormArea: false,
      showInfoArea: false
    };
    this.showArticleData = {
      name: '',
      parentName: '',
      pageName: '',
      type: 1,
      desc: '',
      pic: '',
      window: 1,
      style: 1,
      contentSort: 1,
      sortNum: '',
      link: '',
      systemCoding: 1,
      url1: '',
      url2: '',
      url3: '',
      url4: '',
      showDeleteArea: false,
      submitValue: ''
    };
  }


  clickItem(data) {
    const parentData = tagData.filter(v => v.id == data.parentId),
      pName = data.parentId == 0 ? '' : parentData[0].name,
      aData = data.articleData;
    this.itemData = data;
    this.showArticleData = {
      name: data.name,
      parentName: pName,
      pageName: aData.pageName,
      type: aData.type,
      desc: aData.desc,
      pic: aData.pic,
      window: aData.window,
      style: aData.style,
      contentSort: aData.contentSort,
      sortNum: aData.sortNum,
      link: aData.link,
      systemCoding: aData.systemCoding,
      url1: aData.url1,
      url2: aData.url2,
      url3: aData.url3,
      url4: aData.url4,
      showDeleteArea: true,
      submitValue: '确定修改'
    };
    this.setState({
      showFormArea: true,
      showInfoArea: true
    });
  }

  newChildMenu(data) {
    this.showArticleData = {
      name: '',
      parentName: data.name,
      pageName: '',
      type: 1,
      desc: '',
      pic: '',
      window: 1,
      style: 1,
      contentSort: 1,
      sortNum: '',
      link: '',
      systemCoding: 1,
      url1: '',
      url2: '',
      url3: '',
      url4: '',
      showDeleteArea: false,
      submitValue: '确定新增'
    };
    this.setState({
      showFormArea: true,
      showInfoArea: false
    });
  }

  render() {
    const { showFormArea, showInfoArea } = this.state,
      addContent = {
        callback: () => {
          this.showArticleData = {
            name: '',
            parentName: '',
            pageName: '',
            type: 1,
            desc: '',
            pic: '',
            window: 1,
            style: 1,
            contentSort: 1,
            sortNum: '',
            link: '',
            systemCoding: 1,
            url1: '',
            url2: '',
            url3: '',
            url4: '',
            showDeleteArea: false,
            submitValue: '确定新增'
          };
          this.setState({
            showFormArea: true,
            showInfoArea: true
          });
        },//新增函数在这写
        content: "新增标签"
      },
      { showArticleData, itemData } = this;

    return (
      <div className="ArticleSort clearfix">
        <div className="select-tag-left left">
          <Tree data={tagData} clickItem={::this.clickItem} addContent={addContent}/>
        </div>
        {
          !showFormArea &&
          <div className="click-info">单击左侧目录节点修改信息。</div>
        }
        {
          showFormArea &&
          <form className="select-tag-right left">
            <FormItem type="tree" title="上级标签" name="parentName" treeData={tagData} itemClass="ml50"
                      className="form-control w300 inline-block" rules={{required: false}}
                      defaultValue={showArticleData.parentName} value={showArticleData.parentName}/>
            <FormItem type="text" title="栏目名称" name="name" itemClass="ml50" className="form-control w300"
                      rules={{required: true}} defaultValue={showArticleData.name} value={showArticleData.name}/>
            <FormItem type="text" title="网页名称" name="pageName" itemClass="ml50 inline-block"
                      className="form-control w300" rules={{required: true}}
                      defaultValue={showArticleData.pageName} value={showArticleData.pageName}/><span
            className="gray-text">.html (请填写英文字母)</span>
            <FormItem type="radio" title="栏目类型" name="type" rules={{required: true}} itemClass="ml50"
                      defaultValue={showArticleData.type} value={showArticleData.type} options={options.type}/>
            <FormItem type="textarea" title="简介" name="desc" itemClass="ml50" className="form-control w500"
                      rules={{required: false}}
                      defaultValue={showArticleData.desc} value={showArticleData.desc}/>
            <FormItem type="imageUpload" title="索引图" name="pic" itemClass="ml50" rules={{required: false}}
                      defaultValue={showArticleData.pic} value={showArticleData.pic}/>
            <FormItem type="radio" title="目标窗口" itemClass="ml50" name="window" itemClass="ml50"
                      rules={{required: false}}
                      defaultValue={showArticleData.window} value={showArticleData.window} options={options.window}/>
            <FormItem type="radio" title="显示样式" itemClass="ml50" name="style" itemClass="ml50"
                      rules={{required: false}}
                      defaultValue={showArticleData.style} value={showArticleData.style} options={options.style}/>
            <FormItem type="radio" title="内容排序" itemClass="ml50" name="contentSort" itemClass="ml50"
                      rules={{required: false}}
                      defaultValue={showArticleData.contentSort} value={showArticleData.contentSort} options={options.contentSort}/>
            <FormItem type="select" title="前台模板" itemClass="ml50" name="select" itemClass="ml50"
                      className="form-control w80 inline-block" rules={{required: false}} options={options.format}/>
            <FormItem type="text" title="排序数值" name="sortNum" itemClass="ml50" className="form-control w80"
                      rules={{required: true}}
                      defaultValue={showArticleData.sortNum} value={showArticleData.sortNum}/>
            <FormItem type="text" title="跳出URL" name="link" itemClass="ml50" className="form-control w500"
                      rules={{required: false}} defaultValue={showArticleData.link} value={showArticleData.link}/>
            <FormItem type="checkbox" title="系统编码" name="systemCoding" itemClass="ml50" rules={{required: false}}
                      defaultValue={[showArticleData.systemCoding]} value={[showArticleData.systemCoding]}
                      options={options.systemCoding}/>
            {
              showInfoArea &&
              <div>
                <div className="subtitle ml50 mb5">系统信息</div>
                <p className="ml50 mb5"><span className="gray-text">动态页（电脑）：</span><span>{showArticleData.url1}</span>
                </p>
                <p className="ml50 mb5"><span className="gray-text">动态页（手机）：</span><span>{showArticleData.url2}</span>
                </p>
                <p className="ml50 mb5"><span className="gray-text">静态页（电脑）：</span><span>{showArticleData.url3}</span>
                  <span className="update-button ml20">后台更新</span></p>
                <p className="ml50 mb100"><span className="gray-text">静态页（手机）：</span><span>{showArticleData.url4}</span>
                  <span className="update-button ml20">后台更新</span></p>
              </div>
            }
            <div className="tag-submit">
              <input type="submit" className="btn btn-primary btn-sm w120" value={showArticleData.submitValue}/>
            </div>
          </form>
        }
        {
          showArticleData.showDeleteArea &&
          <div className="delete-area"><span
            onClick={() => this.newChildMenu(itemData)}>新增子菜单</span><span> | 删除此菜单</span></div>
        }
      </div>
    )
  }
}

ArticleSort.propTypes = {
  tableData: PropTypes.object,
  options: PropTypes.object
};

module.exports = ArticleSort;
