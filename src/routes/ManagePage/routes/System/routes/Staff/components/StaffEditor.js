
'use strict'
/*
 *  Project : system area
 *  Date    : 2016.07.05
 *  Author  : jin guolong 
 *  Declare : layer page for staff change
 */

import React, {PropTypes} from 'react';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';
import FormItem from 'UIComponentFolder/FormComponent/FormItem'

class StaffEditor extends React.Component {

	render() {
		const {wechatOption=[{}], modifyData, page} = this.props;
		let {userName="", role="", wechatValue=0} = modifyData;
		let wechatCodes = <div className="select-model">
								        <label className="input-title">微信公众号管理范围</label>
								        <input type="checkbox" name="wechatManage"/>{wechatOption[0].value}<br/>
								        <input type="checkbox" name="wechatManage"/>{wechatOption[1].value}<br/>
								        <input type="checkbox" name="wechatManage"/>{wechatOption[2].value}
								      </div>;
		return(
			<div className="StaffEditor">
				<form className="form-default">
						<div className="form-group">
		          <label className="require">用户名</label>
		          {
		          	page? <p>{userName}</p> : <input type="text" className="form-control" />
		          }
		        </div>
						<div className="select-model">
			        <label className="input-title require">角色</label>
			        <FormItem type="select" options={wechatOption} defaultValue={modifyData.wechatValue}/>
			      </div>
		        <div className="form-group">
		          <label className="require">登录密码</label>
		          <div>
			          <input type="password" className="form-control inline" />
			          {
			          	page && <span>(不填写则不修改)</span> 
			          }
		          </div>
		        </div>
		        <div className="form-group">
		          <label className="require">确认密码</label>
		          <div>
			          <input type="password" className="form-control inline"  />
		          </div>
		        </div>
		        {
		        	page &&
		        	wechatCodes
		        }
				</form>
			</div>
			)
		}
	}
StaffEditor.propTypes = {
	wechatOption: PropTypes.array,
	modifyData: PropTypes.object

}
export default StaffEditor;