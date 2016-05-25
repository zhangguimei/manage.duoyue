import React, {PropTypes}  from 'react';

class TimingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  showChildren() {
    const {time=2000} = this.props;
    this.setState({
      show: true
    });
    this.Timer = setTimeout(()=> {
      this.setState({
        show: false
      })
    }, time);
  }

  componentDidMount() {
    const {transferFunc} = this.props;
    transferFunc(::this.showChildren);
  }

  componentWillUnmount() {
    window.clearTimeout(this.Timer);
  }

  render() {
    const {show} = this.state;
    return (
      <div className="TimingModal">
        {
          show &&
          this.props.children
        }
      </div>
    );
  }
}

TimingModal.propTypes = {
  children: PropTypes.any.isRequired,
  transferFunc: PropTypes.func.isRequired
};

export default TimingModal;