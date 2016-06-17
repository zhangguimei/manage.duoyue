'use strict';
import React, {PropTypes} from 'react';

class BookCode extends React.Component {

  render() {
    const {codeData} = this.props;
    return (
      <div className="BookCode">
        <div className="book-code-list clearfix">
          {
            codeData.map((item,i) => {
              return (
                <div className="book-item left" key={i}>
                  <div className="code-pic">
                    <img src={item.codeimg} className="code-img"/>
                  </div>
                  <div className="code-title">{item.title}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
BookCode.propTypes = {
  authorListData: PropTypes.array
};
export default BookCode;