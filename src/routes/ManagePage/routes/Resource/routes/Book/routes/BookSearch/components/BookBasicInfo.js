/*
 *  Date    : 2016.6.30
 *  Author  : Zhang-Guimei
 *  Declare : 书籍基本信息
 */
'use strict';
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';

const isEBook = [
    {
      "id": 0,
      "value": "无电子书"
    },
    {
      "id": 1,
      "value": "有电子书"
    }
  ],
  canTryRead = [
    {
      "id": 0,
      "value": "否"
    },
    {
      "id": 1,
      "value": "是"
    }
  ];

class BookBasicInfo extends React.Component {
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
<<<<<<< HEAD

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

=======
  
>>>>>>> 8f5b8410f67097395d3a42428e553a8ed93dcf8d
  render() {
    const {
      bookInfo, classifyInfo
    } = this.props;
    let datePickerData = {
      format: 'yyyy/mm/dd hh:ii:ss ',
      dateValue: '2016/5/29 00:10:12',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    return (
      <div className="BookBasicInfo form-default">
        <div className="clearfix">
          <ImageUpload name="image" className="reload-pic left" defaultSrc={bookInfo.img}/>
          <div className="book-main-right left">
            <FormItem type="tree" treeData={classifyInfo} title="所属分类" name="classify" defaultValue={bookInfo.classify} rules={{required: true}}
                      className="form-control inline-block tree-input w300"/>
            <FormItem type="text" title="书籍名称" name="classify" className="form-control w300" defaultValue={bookInfo.name} rules={{required: true}}/>
            <div className="clearfix">
              <div className="form-two-item left">
                <FormItem type="text" title="出版社" name="publish" defaultValue={bookInfo.publish} rules={{required: true}}
                          className="form-control w200"/>
              </div>
              <div className="form-two-item left">
                <FormItem type="text" title="书号" name="bookNumber" defaultValue={bookInfo.bookNumber} rules={{required: true}}
                          className="form-control w200"/>
              </div>
            </div>
            <div className="clearfix">
              <div className="form-two-item left">
                <FormItem type="text" title="作/译者" name="author" defaultValue={bookInfo.author} rules={{required: true}}
                          className="form-control w200"/>
              </div>
              <div className="form-two-item left">
                <FormItem type="text" title="出版时间" name="publishDate" defaultValue={bookInfo.publishDate} rules={{required: true}}
                          className="form-control w200"/>
              </div>
            </div>
            <FormItem type="text" title="外链跳转链接" name="link" className="form-control w500" defaultValue={bookInfo.link}/>

          </div>
        </div>
        <ul className="form-list">
          <li className="form-item">
            <h4 className="info-title">微信响应消息封面图</h4>
            <ImageUpload name="image" className="react-img" defaultSrc={bookInfo.img}/>
          </li>
          <li className="form-item">
            <h4 className="info-title">销售信息</h4>
            <div className="sales-info clearfix">
              <div className="left w150">
                <FormItem type="text" title="当前库存" name="link" className="form-control w120" defaultValue={bookInfo.inventory}/>
              </div>
              <div className="left">
                <FormItem type="datePicker" data={datePickerData} title="销售有效期" name="valid-start-time" />
                <span className="validity-center-text">至</span>
                <FormItem type="datePicker" data={datePickerData} name="valid-end-time"/>
              </div>
            </div>
          </li>
          <li className="form-item">
            <h4 className="info-title">实体书信息</h4>
            <div className="physical-book-info clearfix">
              <div className="physical-item-width left">
                <FormItem type="text" title="市场价" name="market-price" className="form-control w120" defaultValue={bookInfo.marketPrice}/>
              </div>
              <div className="physical-item-width left">
                <FormItem type="text" title="折扣" name="discount" className="form-control w120" defaultValue={bookInfo.discount}/>
              </div>
              <div className="physical-item-width left">
                <FormItem type="text" title="售价" name="salesPrice" className="form-control w120" defaultValue={bookInfo.salesPrice}/>
              </div>
              <div className="physical-item-width left">
                <FormItem type="text" title="分销提成（现金）" name="sharing" className="form-control w120" defaultValue={bookInfo.sharing}/>
              </div>
            </div>
          </li>
          <li className="form-item">
            <h4 className="info-title">电子书信息</h4>
            <div className="virtual-book-info clearfix">
              <div className="virtual-item-width left">
                <FormItem name="eBook" type="radio" options={isEBook} title="电子书" defaultValue={1}/>
              </div>
              <div className="virtual-item-width left">
                <FormItem type="text" title="电子书售价" className="form-control w200" defaultValue={bookInfo.eBookPrice}/>
              </div>
              <div className="virtual-item-width left">
                <FormItem name="tryRead" type="radio" options={canTryRead} title="允许试读" defaultValue={1}/>
              </div>
            </div>
          </li>
          <li className="form-item">
            <h4 className="info-title">简介</h4>
            <FormItem name="introduction" type="textarea" className="form-control w700" defaultValue={bookInfo.introduction}/>
          </li>
        </ul>
      </div>
    )
  }
}

BookBasicInfo.propTypes = {
  bookInfo: PropTypes.object,
  classifyInfo: PropTypes.array,
  handleSubmit: PropTypes.func
};

export default BookBasicInfo;
