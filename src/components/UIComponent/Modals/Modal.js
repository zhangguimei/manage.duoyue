import React, {PropTypes}  from 'react';

import styles from './Modal.scss';

class Modal extends React.Component {

  render() {
    const { className = "" } = this.props;
    return (
        <div className="Modal">
          <div className="real-modal" onClick={ () => this.props.onModalClick && this.props.onModalClick()}></div>
          <div className={className}>
            {this.props.children}
          </div>
        </div>
    );
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  onModalClick: PropTypes.func
};
export default Modal;