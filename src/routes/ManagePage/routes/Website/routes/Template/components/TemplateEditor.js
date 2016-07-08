'use strict'
/*
 *  Date    : 2016.07.07
 *  Author  : Jin-Guolong
 *  Declare : 网站管理-模板管理
 */


import React from 'react'

class TemplateEditor extends React.Component {
	
	render() {
		const {data} = this.props;
		return(
			<div className="TemplateEditor">
				<form className="form-default">
					<div className="form-group">
						<label className="require">模版名称</label>
						<input type="text" className="form-control" defaultValue={data.modelName}/>
					</div>
					<div className="form-group">
						<label className="require">模版路径</label>
						<input type="text" className="form-control" defaultValue={data.menu}/>
					</div>
				</form>
			</div>
			)
	}
}

export default TemplateEditor;