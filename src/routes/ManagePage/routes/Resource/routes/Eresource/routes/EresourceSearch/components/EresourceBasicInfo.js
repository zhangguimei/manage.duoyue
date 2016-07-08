'use strict';
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';

const classifyData = require("AssetsFolder/MockData/sourcecenter/eresource/eresource_classify_tree.json"),
  typeData = require("AssetsFolder/MockData/sourcecenter/eresource/eresource_type_data.json"),
  radioData = [
    {
      "id": 0,
      "value": "否"
    },
    {
      "id": 1,
      "value": "是"
    }
  ];

class EresourceBasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let datePickerData = {};
    return (
      <div className="EresourceBasicInfo">
        <section className="content-wrap">
          <div className="resource-type"><FormItem title="资源类型" name="type" type="select" options={typeData} rules={{required:true}}
                         className="form-control w300"/></div>
          <FormItem title="资源分类" name="classify" treeData={classifyData} type="tree" name="classify"
                    rules={{required:true}}
                    className="form-control w300 classify-input"/>
          <FormItem type="text" name="name" title="资源标题" className="form-control w700" rules={{required:true}}/>
          <span className="subtitle required">微信相应消息</span>
          <div className="wechat-info-wrap w700 clearfix">
            <ImageUpload className="left"/>
            <div className="msg-time-wrap right">
              <FormItem type="datePicker" data={datePickerData} title="开始时间" rules={{required:true}}/>
              <FormItem type="datePicker" data={datePickerData} title="结束时间" rules={{required:true}}/>
            </div>
          </div>
          <FormItem type="radio" name="isShowPic" options={radioData} title="是否显示微信消息图"/>
          <div className="inventory-wrap">
            <FormItem type="text" name="inventory" title="当前库存" className="form-control w100"/>
            <div className="sales-time-wrap inline-block">
              <span className="subtitle">销售有效期</span>
              <FormItem type="datePicker" data={datePickerData}/>
              <span className="middle-text">至</span>
              <FormItem type="datePicker" data={datePickerData}/>
            </div>
          </div>
          <div className="price-wrap">
            <FormItem type="text" name="price" title="单价" className="form-control w60" desc="元"/>
            <FormItem type="text" name="price" title="运费" className="form-control w60" desc="元"/>
            <FormItem type="radio" title="虚拟商品" name="isEProd" options={radioData}/>
            <FormItem type="radio" title="是否提供下载" name="idDownload" options={radioData}/>
          </div>
          <FormItem type="textarea" name="desc" title="资源简介" rules={{required:true}}
                    className="form-control w700 resource-desc"/>
          <FormItem type="textarea" name="detail" title="资源详细信息" rules={{required:true}}
                    className="form-control resource-detail"/>
        </section>
      </div>
    )
  }
}

EresourceBasicInfo.propTypes = {};

export default EresourceBasicInfo;
