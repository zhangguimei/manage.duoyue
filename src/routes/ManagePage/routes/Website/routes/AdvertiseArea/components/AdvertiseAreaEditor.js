
'use strict'
/*
 *  Project : website manage
 *  Date    : 2016.06.29
 *  Author  : jin guolong
 *  Declare : website manage page
 */

import React, {PropTypes} from 'react';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';

class AdvertiseEditor extends React.Component {

	render() {
		const {modifyData} = this.props;
		let {areaName="", areaCode="", width="", height="", tips=""} = modifyData,
				defaultChecked = -1;
		{
			if (modifyData.showNum=="是") {defaultChecked=0}
				else if (modifyData.showNum=="否") {defaultChecked=1}
		}
		return(
			<div className="AdvertiseEditor">
				<form className="form-default">
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
	modifyData: PropTypes.object

}
export default AdvertiseEditor;