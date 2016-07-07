
'use strict'

import React, {PropTypes} from 'react';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';

class AdvertiseEditor extends React.Component {

	render() {
		const {modifyData} = this.props,
				  data = modifyData[0] || {};
		let areaName = data.areaName || "",
			  areaCode = data.areaCode || "",
			  width = data.width || "",
			  height = data.height || "",
			  tips = data.tips || "",
			  defaultChecked=-1;
		{
			if (data.showNum=="是") {defaultChecked=0}
				else if (data.showNum=="否") {defaultChecked=1}
		}
		return(
			<div className="AdvertiseEditor">
				<form>
						<div className="form-group">
		          <label className="require">区域名称</label>
		          <input type="text" className="form-control" defaultValue={areaName} />
		        </div>
		        <div className="form-group">
		          <label className="require">区域编码</label>
		          <div>
			          <input type="text" className="form-control inline" defaultValue={areaCode} />
			          <span>（请填写英文字母）</span>
		          </div>
		        </div>
		        <div className="form-group">
		          <label className="require">图片宽度</label>
		          <div>
			          <input type="text" className="form-control inline" defaultValue={width} />
			          <span>像素</span>
		          </div>
		        </div>
		        <div className="form-group">
		          <label className="require">图片高度</label>
		          <div>
			          <input type="text" className="form-control inline" defaultValue={height} />
			          <span>像素</span>
		          </div>
		        </div>
		        <div className="show-num-box">
		        	<span className="input-title require">显示数字</span>
		        	<input type="radio" name="showNum" value="0" defaultChecked={defaultChecked==0} className="show-num"/>是
		        	<input type="radio" name="showNum" value="1" defaultChecked={defaultChecked==1} className="show-num"/>否
		        </div>
		        <div className="form-group">
		          <label className="require">备注</label>
		          <textarea  className="form-control" defaultValue={tips}></textarea>
		        </div>
				</form>
			</div>
			)
		}
	}
AdvertiseEditor.propTypes = {
	modifyData: PropTypes.array

}
export default AdvertiseEditor;