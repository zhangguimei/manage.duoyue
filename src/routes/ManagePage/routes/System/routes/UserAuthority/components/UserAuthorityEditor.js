'use strict'
/*
 *  Date    : 2016.07.07
 *  Author  : Jin-Guolong
 *  Declare : 系统管理-角色权限
 */


import React from 'react'
import FormItem from 'UIComponentFolder/FormComponent/FormItem'

class UserAuthorityEditor extends React.Component {
	
	render() {
		const {data, isPermit=false, classifyInfo} = this.props;
		let editorCodes = isPermit
			? <div className="permit-page"><p className="role-name">{data.role}</p><FormItem type="tree" treeData={classifyInfo}/></div>
			: <form className="form-default">
					<div className="form-group">
						<label className="require">角色名称</label>
						<input type="text" className="form-control" defaultValue={data.role}/>
					</div>
					<div className="form-group">
						<label className="require">角色简介</label>
						<textarea type="text" className="form-control" defaultValue={data.describe}></textarea>
					</div>
				</form>
		
		return(
			<div className="UserAuthorityEditor">
				{editorCodes}
			</div>
			)
	}
}

export default UserAuthorityEditor;