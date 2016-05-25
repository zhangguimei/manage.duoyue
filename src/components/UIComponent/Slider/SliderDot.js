import React, {PropTypes}from 'react';
import classnames from 'classnames';

class SliderDot extends React.Component {

  static defaultProps = {
    classname: "slider-dot"
  };

  render() {
    const {nums, index, classname} = this.props;
    let dots = new Array(nums).fill(1);
    let dotsCode = dots.map((item, i) => {
      return (
        <span className={classnames("dot slider-dot-item", {"hover": index - 1 == i})} key={i}>.</span>
      );
    });
    return (
      <div className={`SliderDot ${classname}`}>
        {dotsCode}
      </div>
    );
  }
}

SliderDot.PropTypes = {
  nums: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  classname: PropTypes.string
};

export default SliderDot;