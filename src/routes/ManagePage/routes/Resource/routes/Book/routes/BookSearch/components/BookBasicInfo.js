'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Validate from './Validate/BookFormValidate';
import {InputF, InputTree} from '../../../../../../../../../components/PageTest/ValidationForm/ValidationComponents';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import toolMethods from 'UtilsFolder/toolMethods';

const fields = ['classify', 'title', 'publish', 'bookNumber', 'author', 'publishDate', 'link', 'inventory', 'startDate', 'endDate', 'price',
  'discount', 'salesPrice', 'sharing', 'eBook', 'eBookPrice', 'tryRead', 'introduction', 'cover'];
const eBookRadio = [{value: "no", content: "无电子书"}, {value: "yes", content: "有电子书"}];
const tryReadRadio = [{value: "no", content: "否"}, {value: "yes", content: "是"}];

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      check: true,
      selectAddress: {}
    };
    this.startDate = 0;
    this.endDate = 0;
  }

  checkDate(start, end) {
    console.log('时间',toolMethods.compareTime(start, end))
  }

  getPickDate(date) {
    const {endDate} = this;
    this.startDate = date;
    this.checkDate(date, endDate);
  }

  getPickDateEnd(date) {
    const {startDate} = this;
    this.endDate = date;
    this.checkDate(startDate, date);
  }

  render() {
    const {
      bookInfo, classifyInfo, handleSubmit,
      fields: {
        classify, title, publish, bookNumber, author, publishDate, link, inventory, startDate, endDate, price,
        discount, salesPrice, sharing, eBook, eBookPrice, tryRead, introduction, cover
      }
    } = this.props;
    let datePickerData = {
      format: 'yyyy-mm-dd hh:ii:ss ',
      dateValue: '2016-5-29 00:10:12',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    return (
      <form className="BookForm" onSubmit={handleSubmit}>
        <div className="clearfix">
          <div className="book-pic-box left">
            <div className="book-pic">
              <img src={bookInfo.img} className="book-img"/>
              <input type="file" multiple {...cover} value={null} className="upload-again" width="270"/>
            </div>
          </div>
          <div className="book-main-right left">
            <InputTree className="info-input w300" treeData={classifyInfo} field={classify} label="所属分类"
                       required={true}/>
            <InputF field={title} className="info-input input w300" label="书籍名称" required={true}/>
            <div className="clearfix">
              <div className="form-two-item left">
                <InputF field={publish} className="info-input input w200" label="出版社" required={true}/>
              </div>
              <div className="form-two-item left">
                <InputF field={bookNumber} className="info-input input w200" label="书号" required={true}
                        placeholder="999-9-9999-9999-9"/>
              </div>
            </div>
            <div className="clearfix">
              <div className="form-two-item left">
                <InputF field={author} className="info-input input w200" label="作/译者" required={true}/>
              </div>
              <div className="form-two-item left">
                <InputF field={publishDate} className="info-input input w200" label="出版时间" required={true}/>
              </div>
            </div>
            <InputF field={link} className="info-input input w500" label="外链跳转网页"/>

          </div>
        </div>
        <ul className="form-list">
          <li className="form-item">
            <div className="info-title">微信响应消息封面图</div>
            <div className="response-cover">
              <img src={bookInfo.img} className="response-img"/>
              <input type="file" multiple {...cover} value={null} className="upload-again"/>
            </div>
          </li>
          <li className="form-item">
            <div className="info-title">销售信息</div>
            <div className="sales-info clearfix">
              <div className="item-content w150 left">
                <InputF field={inventory} className="info-input input current-inventory w120" label="当前库存"/>
              </div>
              <div className="item-content left">
                <div className="form-title">销售有效期</div>
                <div className="validity">
                  <DatePicker field={startDate} data={datePickerData} getPickDate={::this.getPickDate}
                              className={startDate.touched && startDate.error ? "error-input" : ""}/>
                  <span className="validity-center-text">至</span>
                  <DatePicker field={endDate} data={datePickerData} getPickDate={::this.getPickDateEnd}
                              className={endDate.touched && endDate.error ? "error-input" : ""}/>
                </div>
              </div>
            </div>
          </li>
          <li className="form-item">
            <div className="info-title">实体书信息</div>
            <div className="physical-book-info clearfix">
              <div className="item-content physical-item-width left">
                <InputF field={price} className="info-input input physical-book-price w120" label="市场价"/>
              </div>
              <div className="item-content physical-item-width left">
                <InputF field={discount} className="info-input input discount w120" label="折扣"/>
              </div>
              <div className="item-content physical-item-width left">
                <InputF field={salesPrice} className="info-input input sales-price w120" label="售价"/>
              </div>
              <div className="item-content physical-item-width left">
                <InputF field={sharing} className="info-input input distribution-commission w120" label="分销提成（现金）"/>
              </div>
            </div>
          </li>
          <li className="form-item">
            <div className="info-title">电子书信息</div>
            <div className="virtual-book-info clearfix">
              <div className="item-content virtual-item-width left">
                <InputF field={eBook} label="电子书" inputType="radio" children={eBookRadio}/>
              </div>
              <div className="item-content virtual-item-width left">
                <InputF field={eBookPrice} label="电子书售价" className="info-input input eBookPrice w200"/>
              </div>
              <div className="item-content virtual-item-width left">
                <InputF field={tryRead} label="允许试读" inputType="radio" children={tryReadRadio}/>
              </div>
            </div>
          </li>
          <li className="form-item">
            <div className="info-title">简介</div>
            <textarea {...introduction} className="introduction-input w700"/>
          </li>
        </ul>
      </form>
    )
  }
}

BookForm.propTypes = {
  bookInfo: PropTypes.object,
  classifyInfo: PropTypes.array,
  handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'bookform',
    fields,
    validate: Validate
  },
  state => ({
    initialValues: state.book.toJS().bookData
  })
)(BookForm);
