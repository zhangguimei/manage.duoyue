'use strict';
import React, {PropTypes} from 'react';
import {InputTree} from '../../../../../../../../../components/PageTest/ValidationForm/ValidationComponents';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      check: true,
      selectAddress: {}
    };
  }

  checkDate(start, end) {
    if (!start || !end) {
      return;
    }
    start = new Date(start);
    end = new Date(end);
    this.setState({
      check: !(end < start)
    });
    (end < start) &&
    console.log('开始时间不能大于结束时间！');
  }

  getPickDate(date) {
    const {endDate} = this.state;
    this.setState({
      startDate: date
    });
    this.checkDate(date, endDate);
  }

  getPickDateEnd(date) {
    const {startDate} = this.state;
    this.setState({
      endDate: date
    });
    this.checkDate(startDate, date);
  }

  render() {
    const {productInfo, classifyInfo} = this.props;
    const {startDate, endDate} =this.state;
    let datePickerData = {
      format: 'yyyy-mm-dd hh:ii:ss ',
      dateValue: '2016-5-29 00:10:12',
      placeHolder: '请选择日期',
      showTimePanel: true
    };

    return (
      <form className="ProductForm">
        <ul className="form-list">
          <li className="form-item">
            <div className="info-title">基本信息</div>
            <div className="clearfix">
              <div className="base-info">
                <div className="input-model w400 left">
                  <InputTree className="info-input w200" treeData={classifyInfo} label="商品分类"
                             required={true}/>
                </div>
                <div className="input-model marginL40 left">
                  <div className="input-title">商品推荐度(越小推荐度越高,最小为0)</div>
                  <input type="text" className="info-input input w200"/>
                </div>
                <div className="clearfix"></div>
                <div className="input-model w700 clearfix">
                  <div className="input-title require">商品名称</div>
                  <input type="text" className="info-input w700"/>
                </div>
                <div className="input-model left">
                  <div className="input-title">当前库存</div>
                  <input type="text" className="info-input w100"/>
                </div>
                <div className="input-model marginL40 left">
                  <div className="input-title">销售有效期</div>
                  <DatePicker field={startDate} data={datePickerData} getPickDate={::this.getPickDate}
                              className={startDate.touched && startDate.error ? "error-input" : ""}/>
                  <span className="validity-center-text">至</span>
                  <DatePicker field={endDate} data={datePickerData} getPickDate={::this.getPickDateEnd}
                              className={endDate.touched && endDate.error ? "error-input" : ""}/>

                </div>
                <div className="clearfix"></div>
                <div className="input-model money left">
                  <div className="input-title require">销售价</div>
                  <input type="text" className="info-input w100"/>
                </div>
                <div className="input-model money marginL10 left">
                  <div className="input-title require">市场价(参考价)</div>
                  <input type="text" className="info-input w100"/>
                </div>
                <div className="input-model money marginL10 left">
                  <div className="input-title">运费</div>
                  <input type="text" className="info-input w100"/>
                </div>
                <div className="input-model money marginL10 left">
                  <div className="input-title">分销提成</div>
                  <input type="text" className="info-input w100"/>
                </div>
                <div className="clearfix"></div>
                <div className="input-model">
                  <div className="input-title require goods-desc">商品简介</div>
                  <textarea className="w750"></textarea>
                </div>
                <div className="clearfix"></div>
                <div className="input-model">
                  <div className="input-title require">商品图片</div>
                  <div className="product-pic-box left">
                    <div className="product-pic">
                      <img src={productInfo.img} className="product-img"/>
                      <div className="product-pic-delate">删除</div>
                    </div>
                    <input type="file" className="upload-again" width="240"/>
                  </div>
                  <div className="product-pic-box left">
                    <div className="product-pic">
                      <img src={productInfo.img1} className="product-img"/>
                      <div className="product-pic-delate">删除</div>
                    </div>
                    <input type="file" className="upload-again" width="240"/>
                  </div>
                  <div className="product-pic-box left">
                    <div className="product-pic">
                      <img src={productInfo.img2} className="product-img"/>
                      <div className="product-pic-delate">删除</div>
                    </div>
                    <input type="file" className="upload-again" width="240"/>
                  </div>
                  <div className="clearfix"></div>
                  <div className="product-pic-box left">
                    <div className="product-pic">
                      <img src={productInfo.img3} className="product-img"/>
                      <div className="product-pic-delate">删除</div>
                    </div>
                    <input type="file" className="upload-again" width="240"/>
                  </div>
                  <div className="product-pic-box left">
                    <div className="product-pic">
                      <img src={productInfo.img2} className="product-img"/>
                      <div className="product-pic-delate">删除</div>
                    </div>
                    <input type="file" className="upload-again" width="240"/>
                  </div>
                  <div className="product-pic-box left">
                    <div className="product-pic">
                      <img src={productInfo.img1} className="product-img"/>
                      <div className="product-pic-delate">删除</div>
                    </div>
                    <input type="file" className="upload-again" width="240"/>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="info-title">扩展信息</div>
            <div className="input-model">
              <div className="input-title">商品类型</div>
              <input type="radio" name="productType" className="product-radio"/><span>实物商品</span>
              <input type="radio" name="productType" className="product-radio"/><span>虚拟商品(无需物流)</span>
            </div>
            <div className="input-model">
              <div className="input-title">跳转数据名称（虚拟物品购买成功后，需要跳转到指定页面的名称）</div>
              <input type="text" className="info-input w200"/>
            </div>
            <div className="input-model">
              <div className="input-title">跳转数据URL（虚拟物品购买成功后，需要跳转到指定页面的链接URL）</div>
              <input type="text" className="info-input w750"/>
            </div>
            <div className="input-model">
              <div className="input-title">后台调用URL（商品购买支付成功后，需要由后台发起调用的URL，附带商品清单ID）</div>
              <input type="text" className="info-input w750"/>
            </div>
            <div className="input-model">
              <div className="input-title">手机号码校验URL（提交订单前，若需要单独进行第三方校验，在此配置即可，附带mobile）</div>
              <input type="text" className="info-input w750"/>
            </div>
          </li>
          <li>
            <div className="info-title">详细信息</div>
          </li>
          <li>
            <div className="info-title">商品使用说明</div>
          </li>
        </ul>
      </form>

    )
  }
}

ProductForm.propTypes = {
  productInfo: PropTypes.object,
  classifyInfo: PropTypes.array,
  handleSubmit: PropTypes.func
}
export default ProductForm 