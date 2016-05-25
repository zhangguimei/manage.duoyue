import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import SliderItem from './SliderItem';
import SliderDot from './SliderDot';

import styles from './Slider.scss';

const WIDTH = document.documentElement.clientWidth;

class Slider extends React.Component {

  static defaultProps = {
    dots: true,
    title: false
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      left: -WIDTH
    };
    this.isSlidering = false;
    this.SLIDER_TIME = 3000;
    //this.data = { touchstart , startX, marginLeft. isSlidering}
  }

  touchStart(e) {
    window.clearInterval(this.timer);
    this.touchstart = e.targetTouches;
    this.startX = this.touchstart[0].pageX;
    this.marginLeft = this.state.left;
  }

  touchMove(e) {
    e.preventDefault();
    let touchmove = e.targetTouches;
    if(this.isSlidering) return;
    this.moveX = touchmove[0].pageX - this.startX;
    this.setState({left: this.marginLeft + this.moveX});
    //console.log(this.isSlidering);
  }

  touchEnd(e) {
    if(this.isSlidering) return;
    let {index} = this.state, moveX = this.moveX, sliderList = this.props.data, end = 0;
    let sliderLength = sliderList.length;
    this.moveX = 0;
    if(moveX < 0) {
      if(moveX < -50) {
        end = -(index + 1) * WIDTH;
        if(index < sliderLength) {
          this.setState({index: index + 1});
        } else {
          this.setState({index: 1});
        }
        this.playAnimate("left", end);
      } else {
        end = -index * WIDTH;
        this.playAnimate("right", end);
      }
    } else {
      if(moveX > 50) {
        end = -(index - 1) * WIDTH;
        if(index > 1) {
          this.setState({index: index - 1});
        } else {
          this.setState({index: sliderLength});
        }
        this.playAnimate("right", end);
      } else {
        let end = -index * WIDTH;
        this.playAnimate("left", end);
      }
    }
    this.timer = window.setInterval(::this.autoPlay, this.SLIDER_TIME
    )
    ;
  }

  slide(node) {
    node.addEventListener("touchstart", ::this.touchStart, false);
    node.addEventListener('touchmove', ::this.touchMove, false);
    node.addEventListener('touchend', ::this.touchEnd, false);
    this.timer = window.setInterval(::this.autoPlay, this.SLIDER_TIME);
  }

  playAnimate(direction, end) {
    //direction 图片滚动的方向
    let speed, _self = this;

    function animate() {
      window.clearTimeout(_self.animate);
      if(direction === "left") {
        speed = -20;
        if(_self.state.left + speed > end) {
          _self.setState({left: _self.state.left + speed});
          speed--;
          _self.isSlidering = true;
          _self.animate = setTimeout(animate, 10);
        } else {
          _self.setState({left: -_self.state.index * WIDTH});
          _self.isSlidering = false;
        }
      } else {
        speed = 20;
        if(_self.state.left + speed < end) {
          _self.setState({left: _self.state.left + speed});
          speed++;
          _self.isSlidering = true;
          _self.animate = setTimeout(animate, 10);

        } else {
          _self.setState({left: -_self.state.index * WIDTH});
          _self.isSlidering = false;
        }
      }
    }

    animate();
  }

  autoPlay() {
    let {index} = this.state, _self = this, sliderList = this.props.data;
    let sliderLength = sliderList.length;
    let end = -(index + 1) * WIDTH;
    if(index < sliderLength) {
      _self.setState({index: index + 1});
    } else {
      _self.setState({index: 1});
    }
    _self.playAnimate("left", end);
  }

  componentDidMount() {
    this.slide(findDOMNode(this.refs.slide));
  }

  componentWillUnmount() {
    let node = findDOMNode(this.refs.slide);
    node.removeEventListener("touchstart", ::this.touchStart, false);
    node.removeEventListener('touchmove', ::this.touchMove, false);
    node.removeEventListener('touchend', ::this.touchEnd, false);
    window.clearInterval(this.timer);
    window.clearTimeout(this.animate);
  }

  render() {
    const {dots, title, data, sliderClass = ''} = this.props, {left, index} = this.state;
    let items, itemCode;
    if(data.length > 0) {
      items = data.map((item, i)=> {
          return <SliderItem title={title} data={item} key={i + 1}/>;
        }
      );
      itemCode = [<SliderItem title={title} data={data[data.length - 1]} key="0"/>].concat(items).concat(
        <SliderItem data={data[0]} key={data.length + 1}/>);
    } else {
      itemCode = null;
    }

    return (
      <section className={`Slider ${sliderClass}`} ref='slide'>
        <ul className="slider-ul" style={{ "marginLeft": left}}>
          {itemCode}
        </ul>
        { dots && <SliderDot nums={data.length} index={index}/>}
      </section>
    );
  }
}

Slider.proptypes = {
  dots: PropTypes.bool,
  title: PropTypes.bool,
  sliderClass: PropTypes.string,
  data: PropTypes.array.isRequired
};

export default Slider;