/*
 *  Project : Model
 *  Date    : 2016.06.28
 *  Author  : Paco
 *  Declare : Provide A Model Container
 *  UseAge  : Need a component to show and className to the model
 */
import React, {PropTypes}  from 'react';

import styles from './Modal.scss';

class Modal extends React.Component {
  static defaultProps = {
    className: ''
  }

  render() {
    return (
      <div className={`Modal ${this.props.className}`}>
        <div className="real-modal" onClick={ () => this.props.onModalClick && this.props.onModalClick()}></div>
        {this.props.children}
      </div>
    );
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  onModalClick: PropTypes.func
};
export default Modal;