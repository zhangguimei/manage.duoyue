import React, {PropTypes}  from 'react';

import styles from './Confirm.scss';

class Confirm extends React.Component {

  confirmResult(result) {
    this.props.confirmResult && this.props.confirmResult(result);
  }

  render() {
    const {content} = this.props;
    return (
        <div className={"Confirm"}>
          <span className="confirm-content text-center">{content}</span>

          <div className="confirm-text text-center">
            <button className="confirm-no" onClick={ ()=> this.confirmResult(false)}>取消</button>
            <button className="confirm-yes" onClick={ ()=> this.confirmResult(true)}>好</button>
          </div>
        </div>
    );
  }
}

Confirm.propTypes = {
  content: PropTypes.string,
  confirmResult: PropTypes.func
};
export default Confirm;