'use strict';
import React, {PropTypes} from 'react';
import DatePickerTest from '../../../../../../../../../components/PageTest/DatePickerTestPage/DatePickerTestPage';

class ArticleSearch extends React.Component {
  render() {
    return (
      <div className="ArticleSearch">
        <DatePickerTest />
      </div>
    );
  }
}

ArticleSearch.propTypes = {
  children: PropTypes.any
}

module.exports = ArticleSearch;