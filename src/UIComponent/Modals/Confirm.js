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
          <p className="confirm-content text-center">{content}</p>
          <div className="confirm-text text-center">
            <button className="confirm-yes btn btn-danger w80" onClick={ ()=> this.confirmResult(true)}>确定</button>
            <button className="confirm-no btn btn-primary w80" onClick={ ()=> this.confirmResult(false)}>取消</button>
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