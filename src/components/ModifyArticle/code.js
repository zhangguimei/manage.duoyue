import React from 'react';
import styles from './ModifyArticle.scss';

const codeData = require("../../assets/MockData/sourcecenter/code_data.json");
class Code extends React.Component {
  render() {
  	let codeItem = codeData.map((item, index) => {
  	return (
  		<div className="code-item" key={index}>
    		<div className="code-pic">
    			<img src={item.pic}/>
    		</div>
    		<div className="code-title">{item.title}</div>
  		</div>
  	)
  	})
    return (
    	<div className="code-content clearfix">
    		{codeItem}
    	</div>
    )
  }
}

export default Code;