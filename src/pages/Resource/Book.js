'use strict';
import React, {PropTypes} from 'react';

class Book extends React.Component {
  render() {
    return (
      <div className="Book">
        {this.props.children}
      </div>
    );
  }
}

Book.propTypes = {
  children: PropTypes.any
}

export default Book;