
'use strict'

/*
 *  Project : website Area
 *  Date    : 2016.06.29
 *  Author  : jin guolong
 *  Declare : layer page for advertisingArea editor
 */

import React, {PropTypes} from 'react';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';
import FormItem from 'UIComponentFolder/FormComponent/FormItem'

class AdvertiseEditor extends React.Component {

  render() {
    const {advertisingManageData, modifyData} = this.props,
          wechatData = advertisingManageData.wechatOption,
          areaData = advertisingManageData.areaOption,
          columnData = advertisingManageData.columnOption,
          targetData = advertisingManageData.targetOption,
          {imgName="", imgSrc="", addressSrc="", targetValue=""} = modifyData;
    let datePickerStartData = {
          format: 'yyyy-mm-dd hh:ii:ss ',
          dateValue: modifyData.startDate || '',
          placeHolder: '请选择日期',
          showTimePanel: true
        };
    let datePickerEndData = {
          format: 'yyyy-mm-dd hh:ii:ss ',
          dateValue: modifyData.endDate || '',
          placeHolder: '请选择日期',
          showTimePanel: true
        }
    return(
      <div className="AdvertiseEditor">
        <form className="form-default">
            <div className="form-group">
              <label className="require">广告名称</label>
              <input type="text" className="form-control" defaultValue={imgName} />
            </div>
            <div className="select-model">
              <label className="input-title require">广告区域</label>
              <FormItem type="select" options={areaData} defaultValue={modifyData.areaValue}/>
            </div>
            <div className="select-model">
              <label className="input-title">适用栏目</label>
              <FormItem type="select" options={columnData} defaultValue={modifyData.columnValue}/>
              <span>（如果不选择，则出现在所有栏目的广告区域）</span>
            </div>
            <div className="select-model">
              <label className="input-title">适用微信</label>
              <FormItem type="select" options={wechatData} defaultValue={modifyData.wechatValue}/>
            </div>
            <div className="setDate">
              <span className="date-title require">有效时间</span>
              <DatePicker  data={datePickerStartData} getPickDate={()=>{}}/>
              <span >至</span>
              <DatePicker  data={datePickerEndData} getPickDate={()=>{}}/>
            </div>  
            <div className="targetWindow">
              <span className="input-title require">目标窗口</span>
              <input type="radio" name="targetWindow" value="0" defaultChecked={targetValue==0} 
                    className="target-window"/>默认
              <input type="radio" name="targetWindow" value="1" defaultChecked={targetValue==1} 
                    className="target-window"/>新窗口
              <input type="radio" name="targetWindow" value="2" defaultChecked={targetValue==2} 
                    className="target-window"/>顶级窗口
            </div>
            <div className="form-group">
              <label className="input-title require">链接地址</label>
              <input type="text" className="form-control" defaultValue={addressSrc}/>
            </div>
            <div className="upload">
              <span className="input-title require">上传图片</span>
              <ImageUpload defaultSrc={imgSrc}/>
            </div>
        </form>
      </div>
      )
    }
  }
AdvertiseEditor.propTypes = {
  advertisingManageData: PropTypes.object,
  modifyData: PropTypes.object

}
export default AdvertiseEditor;