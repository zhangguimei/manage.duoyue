'use strict';
import React, {PropTypes} from 'react';

class PercentShow extends React.Component {

  render() {
    const {index, total} = this.props;
    if(!total) return null;
    return (
      <section className="PercentShow">
        <span>{index}</span>/<span>{total}</span>
      </section>
    );
  }
}

PercentShow.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default PercentShow;