'use strict';
import React, {PropTypes} from 'react';
import Tree from '../UIComponent/Tree/Tree';
import ShowRoute from '../UIComponent/Menu/ShowRoute';
import DatePicker from '../UIComponent/DatePicker/DatePicker'

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      check: true,
      selectAddress: {}
    }
  }

  checkDate(start, end) {
    if(!start || !end) {
      return;
    }
    start = new Date(start);
    end = new Date(end);
    this.setState({
      check: !(end < start)
    });
    (end < start) &&
    console.log('开始时间不能大于结束时间！')
  }

  getPickDate(date) {
    const {endDate} = this.state;
    this.setState({
      startDate: date
    });
  }

  getPickDateEnd(date) {
    const {startDate} = this.state;
    this.setState({
      endDate: date
    });
    this.checkDate(startDate, date)
  }

  render() {
    const { bookInfo, classifyInfo, onShowClassify, showClassify} = this.props;
    let datePickerData = {
      format: 'yyyy-mm-dd hh:ii:ss ',
      dateValue: '2016-5-29 00:10:12',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    return (
      <div className="BookForm">
        <div className="clearfix">
          <div className="book-pic-box left">
            <div className="book-pic">
              <img src={bookInfo.img} className="book-img"/>
            </div>
            <div className="upload-again">重新上传</div>
          </div>
          <div className="book-main-right left">
            <div className="form-title"><span className="red">*</span>所属分类</div>
            <div className="input" onClick={onShowClassify}><input className="info-input w300"/><span
              className="clear-classify">清除</span></div>
            <div className="form-title"><span className="red">*</span>书籍名称</div>
            <div className="input"><input value={bookInfo.title} className="info-input w300"/></div>
            <div className="clearfix">
              <div className="form-two-item left">
                <div className="form-title"><span className="red">*</span>出版社</div>
                <div className="input"><input value={bookInfo.publish} className="info-input w200"/></div>
              </div>
              <div className="form-two-item left">
                <div className="form-title"><span className="red">*</span>书号</div>
                <div className="input"><input value={bookInfo.bookNumber} className="info-input w200"/></div>
              </div>
            </div>
            <div className="clearfix">
              <div className="form-two-item left">
                <div className="form-title"><span className="red">*</span>作/译者</div>
                <div className="input"><input value={bookInfo.author} className="info-input w200"/></div>
              </div>
              <div className="form-two-item left">
                <div className="form-title"><span className="red">*</span>出版时间</div>
                <div className="input"><input value={bookInfo.publish} className="info-input w200"/></div>
              </div>
            </div>
            <div className="form-title">外链跳转网页</div>
            <div className="input"><input className="info-input w500"/></div>
            { showClassify && <Tree data={classifyInfo}/> }
          </div>
        </div>
        <ul className="form-list">
          <li className="form-item">
            <div className="info-title">微信响应消息封面图</div>
            <div className="response-cover"></div>
          </li>
          <li className="form-item">
            <div className="info-title">销售信息</div>
            <div className="sales-info clearfix">
              <div className="item-content w150 left">
                <div className="form-title">当前库存</div>
                <div className="current-inventory">
                  <input className="info-input w120"/>
                </div>
              </div>
              <div className="item-content left">
                <div className="form-title">销售有效期</div>
                <div className="validity">
                  <DatePicker data={datePickerData} getPickDate={::this.getPickDate}/>
                  <span className="validity-center-text">至</span>
                  <DatePicker data={datePickerData} getPickDate={::this.getPickDateEnd}/>
                </div>
              </div>
            </div>
          </li>
          <li className="form-item">
            <div className="info-title">实体书信息</div>
            <div className="physical-book-info clearfix">
              <div className="item-content physical-item-width left">
                <div className="form-title">市场价</div>
                <div className="physical-book-price">
                  <input className="info-input w120"/>
                </div>
              </div>
              <div className="item-content physical-item-width left">
                <div className="form-title">折扣</div>
                <div className="discount">
                  <input className="info-input w120"/>
                </div>
              </div>
              <div className="item-content physical-item-width left">
                <div className="form-title">售价</div>
                <div className="sales-price">
                  <input className="info-input w120"/>
                </div>
              </div>
              <div className="item-content physical-item-width left">
                <div className="form-title">分销提成（现金）</div>
                <div className="distribution-commission">
                  <input className="info-input w120"/>
                </div>
              </div>
            </div>
          </li>
          <li className="form-item">
            <div className="info-title">电子书信息</div>
            <div className="virtual-book-info clearfix">
              <div className="item-content virtual-item-width left">
                <div className="form-title">电子书</div>
                <input type="radio" value="0" name="hasVirtual"/>无电子书
                <input type="radio" value="1" name="hasVirtual"/>有电子书
              </div>
              <div className="item-content virtual-item-width left">
                <div className="form-title">电子书售价</div>
                <div className="discount">
                  <input className="info-input w200"/>
                </div>
              </div>
              <div className="item-content virtual-item-width left">
                <div className="form-title">允许试读</div>
                <input type="radio" value="0" name="canRead"/>否
                <input type="radio" value="1" name="canRead"/>是
              </div>
            </div>
          </li>
          <li className="form-item">
            <div className="info-title">简介</div>
            <div className="introduction">
              <textarea className="introduction-input w700"/>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
export default BookForm;
