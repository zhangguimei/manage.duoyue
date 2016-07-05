'use strict';
import React, {PropTypes} from 'react';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import FormItem from 'UIComponentFolder/FormComponent/FormItem'
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload'

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
            <h3 className="info-title">基本信息</h3>
            <div className="clearfix">
              <div className="base-info">
                <div className="clearfix">
                  <div className="form-group w400 left">
                    <FormItem type='tree' className="w200" treeData={classifyInfo} title="商品分类"
                              rules={{required: true}}/>
                  </div>
                  <div className="form-group ml30 left">
                    <label >商品推荐度(越小推荐度越高,最小为0)</label>
                    <input type="text" className="form-control w200"/>
                  </div>
                </div>
                <div className="form-group w700 clearfix">
                  <label className="input-title require">商品名称</label>
                  <input type="text" className="form-control w700"/>
                </div>
                <div className="clearfix">
                  <div className="form-group left">
                    <label >当前库存</label>
                    <input type="text" className="form-control w100"/>
                  </div>
                  <div className="form-group ml30 left">
                    <label className="input-title">销售有效期</label>
                    <DatePicker field={startDate} data={datePickerData} getPickDate={::this.getPickDate}
                                className={startDate.touched && startDate.error ? "error-input" : ""}/>
                    <span className="validity-center-text">至</span>
                    <DatePicker field={endDate} data={datePickerData} getPickDate={::this.getPickDateEnd}
                                className={endDate.touched && endDate.error ? "error-input" : ""}/>
                  </div>
                </div>
                <div className="clearfix">
                  <div className="form-group left">
                    <label>销售价</label>
                    <div>
                      <input type="text" className="form-control w100 inline"/><span>元</span>
                    </div>
                  </div>
                  <div className="form-group ml30 left">
                    <label>市场价(参考价)</label>
                    <div>
                      <input type="text" className="form-control w100 inline"/><span>元</span>
                    </div>
                  </div>
                  <div className="form-group ml30 left">
                    <label>运费</label>
                    <div>
                      <input type="text" className="form-control w100 inline"/><span>元</span>
                    </div>
                  </div>
                  <div className="form-group ml30 left">
                    <label>分销提成</label>
                    <div>
                      <input type="text" className="form-control w100 inline"/><span>元</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                    <label className="require goods-desc">商品简介</label>
                    <textarea className="form-control w700"></textarea>
                </div>

                <h4 className="input-title require">商品图片</h4>
                <ul className="product-show-box clearfix">
                  <li className="product-pic-box left">
                    <ImageUpload requireDelete={true} className="product" defaultSrc={productInfo.img}/>
                  </li>
                  <li className="product-pic-box left">
                    <ImageUpload requireDelete={true} className="product" defaultSrc={productInfo.img}/>
                  </li>
                  <li className="product-pic-box left">
                   <ImageUpload requireDelete={true} className="product" defaultSrc={productInfo.img2}/>
                  </li>
                  <li className="product-pic-box left">
                    <ImageUpload requireDelete={true} className="product" defaultSrc={productInfo.img3}/>
                  </li>
                  <li className="product-pic-box left">
                    <ImageUpload requireDelete={true} className="product" defaultSrc={productInfo.img2}/>
                  </li>
                  <li className="product-pic-box left">
                    <ImageUpload requireDelete={true} className="product" defaultSrc={productInfo.img1}/>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <h3 className="info-title">扩展信息</h3>
            <div className="form-group">
              <label>商品类型</label>
              <div>
                <input type="radio" name="productType" className="product-radio"/><span>实物商品</span>
                <input type="radio" name="productType" className="product-radio"/><span>虚拟商品(无需物流)</span>
              </div>
            </div>
            <div className="form-group">
              <label>跳转数据名称（虚拟物品购买成功后，需要跳转到指定页面的名称）</label>
              <input type="text" className="form-control w200"/>
            </div>
            <div className="form-group">
              <label>跳转数据URL（虚拟物品购买成功后，需要跳转到指定页面的链接URL）</label>
              <input type="text" className="form-control w700"/>
            </div>
            <div className="form-group">
              <label>后台调用URL（商品购买支付成功后，需要由后台发起调用的URL，附带商品清单ID）</label>
              <input type="text" className="form-control w700"/>
            </div>
            <div className="form-group">
              <label>手机号码校验URL（提交订单前，若需要单独进行第三方校验，在此配置即可，附带mobile）</label>
              <input type="text" className="form-control w700"/>
            </div>
          </li>
          <li>
            <h3 className="info-title">详细信息</h3>
            <textarea className="w700"></textarea>
          </li>
          <li>
            <h3 className="info-title">商品使用说明</h3>
            <textarea className="w700"></textarea>
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