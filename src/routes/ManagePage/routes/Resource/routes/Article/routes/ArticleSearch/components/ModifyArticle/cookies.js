import React from 'react';
import styles from './ModifyArticle.scss';
let data = require("../../assets/MockData/sourcecenter/cookies_data.json");
class Cookies extends React.Component {
	render() {
	let cookiesData = data.map((item, index) => {
		return (
			<tr className="rows" key={index} index={index}>
				<td>{item.id}</td>
				<td>{item.time}</td>
				<td>{item.user}</td>
				<td>{item.ip}</td>
				<td>{item.position_x}，{item.position_x}</td>
			</tr>
		)
	});
		return (
			<div className="cookies-pages">
				<table className="cookies">
					<thead>
						<tr>
							<th className="td-id">ID</th>
							<th className="td-time">时间</th>
							<th className="td-user">用户</th>
							<th className="td-ip">IP</th>
							<th>位置</th>
						</tr>
					</thead>
					<tbody>
						{cookiesData}
					</tbody>
				</table>
			</div>
		)
	}
 }

export default Cookies;