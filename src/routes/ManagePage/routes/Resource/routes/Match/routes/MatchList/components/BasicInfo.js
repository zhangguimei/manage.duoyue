/*
 *  Project : MatchList
 *  Date    : 2016.6.29
 *  Author  : Zhou Xian
 *  Declare : Match Basic Info
 */
import React, {PropTypes} from 'react';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    const {startTime, endTime} = this.props.matchInfo;
    this.startDate = startTime;
    this.endDate = endTime;
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
    console.log('开始时间不能大于结束时间！');
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
    const {matchInfo, treeData}=this.props;
    let dateStart = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: matchInfo.startTime,
        placeHolder: '请选择日期',
        showTimePanel: true
      },
      dateEnd = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: matchInfo.endTime,
        placeHolder: '请选择日期',
        showTimePanel: true
      };
    return (
      <div className="BasicInfo form-horizontal form-horizontal-lg">
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>活动分类：</label>
          <div className="control-body">
            <FormItem type="tree" name="classify" className="w300 form-control" treeData={treeData}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>活动名称：</label>
          <div className="control-body">
            <input type="text" defaultValue={matchInfo.title} className="w500 form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>活动简介：</label>
          <div className="control-body">
            <textarea rows="3" className="w500 form-control" defaultValue={matchInfo.desc}></textarea>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>报名人数限制：</label>
          <div className="control-body">
            <input type="text" defaultValue={matchInfo.limitNum} className="w100 form-control"/>
            <span>{` `}0表示禁止报名，最大值9999999</span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>报名费：</label>
          <div className="control-body">
            <input type="text" defaultValue={matchInfo.registePrice} className="w100 form-control"/>
            <span>{` `}元，0表示不用支付报名费</span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>起始日期：</label>
          <div className="control-body">
            <DatePicker data={dateStart} getPickDate={::this.getPickDate}/><span>{` `}至{` `}</span><DatePicker data={dateEnd} getPickDate={::this.getPickDateEnd}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>需要手机验证：</label>
          <div className="control-body">
            <input type="radio" value="1" defaultChecked="true" name="check_mobile" id="check_mobile_true"/>
            <label htmlFor="check_mobile_true">是</label>
            <input type="radio" value="0" name="check_mobile" id="check_mobile_false"/>
            <label htmlFor="check_mobile_false">否</label>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">手机验证说明：</label>
          <div className="control-body">
            <textarea rows="3" className="w500 form-control" defaultValue={matchInfo.phoneCheckText}></textarea>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>报名完成文字说明：</label>
          <div className="control-body">
            <textarea rows="2" className="w500 form-control" defaultValue={matchInfo.successMessage}></textarea>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>入口图片（竖图）</label>
          <div className="control-body">
            <FormItem type="imageUpload" name="headImg"/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>响应图片（横图）</label>
          <div className="control-body">
            <FormItem type="imageUpload" name="headImg"/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>活动名称展示：</label>
          <div className="control-body">
            <input type="radio" value="1" defaultChecked="true" name="hidden_check_mobile" id="hidden_check_mobile_true"/>
            <label htmlFor="hidden_check_mobile_true">展示</label>
            <input type="radio" value="0" name="hidden_check_mobile" id="hidden_check_mobile_false"/>
            <label htmlFor="hidden_check_mobile_false">隐藏</label>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>主题色调：</label>
          <div className="control-body">
            <span>背景色{` `}</span>
            <input type="text" defaultValue={matchInfo.themeToneBg} className="w100 form-control"/>
            <span>{` `}主题色{` `}</span>
            <input type="text" defaultValue={matchInfo.themeTone} className="w100 form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>文字颜色：</label>
          <div className="control-body">
            <span>普通色{` `}</span>
            <input type="text" defaultValue={matchInfo.textColor} className="w100 form-control"/>
            <span>{` `}亮度色{` `}</span>
            <input type="text" defaultValue={matchInfo.textHeighColor} className="w100 form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label"><span className="text-danger">*</span>按钮颜色：</label>
          <div className="control-body">
            <span>背景色{` `}</span>
            <input type="text" defaultValue={matchInfo.btnColorBg} className="w100 form-control"/>
            <span>{` `}文字色{` `}</span>
            <input type="text" defaultValue={matchInfo.btnColor} className="w100 form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">完成外链文字：</label>
          <div className="control-body">
            <input type="text" value={matchInfo.urlText} className="w500 form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">完成外链URL：</label>
          <div className="control-body">
            <input type="text" value={matchInfo.url} className="w500 form-control"/>
          </div>
        </div>
      </div>
    )
  }
}

BasicInfo.propTypes = {
  matchInfo: PropTypes.object,
  treeData: PropTypes.array
};

export default BasicInfo;