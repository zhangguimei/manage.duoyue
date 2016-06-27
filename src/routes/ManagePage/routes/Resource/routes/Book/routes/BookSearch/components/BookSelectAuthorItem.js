'use strict';
import React, {PropTypes} from 'react';
import CheckBox from '../UIComponent/Table/CheckBox';

class BookSelectAuthorItem extends React.Component {
  render() {
  	const { data, checkBoxState, checkBoxOnClick } = this.props;
    return (
      <div className="BookSelectAuthorItem">
        <li className="add-author-item left clearfix">
          <div className="left"><CheckBox checked={checkBoxState} index={data.id} value={data.id} checkBoxOnClick={() => checkBoxOnClick(data.id)}/></div>
          <div className="add-author-name left">{data.name}</div>
        </li>
      </div>
    )
  }
}
BookSearchOperation.propTypes = {
  data: PropTypes.string,
  checkBoxState: PropTypes.string,
  checkBoxOnClick: PropTypes.func
};
export default BookSelectAuthorItem;
