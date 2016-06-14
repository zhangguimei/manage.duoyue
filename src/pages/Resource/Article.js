'use strict';
import React, {PropTypes} from 'react';

class Article extends React.Component {
  render() {
    return (
      <div className="Article">
        {this.props.children}
      </div>
    );
  }
}

Article.propTypes = {
  children: PropTypes.any
}

export default Article;