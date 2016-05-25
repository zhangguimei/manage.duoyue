import React, {PropTypes}  from 'react';
import styles from './Alert.scss';

class Alert extends React.Component {

  render() {
    const {content} = this.props;
    let imgCode = content.img ? <span className="alert-img"><i className="ic ic-roundcheck"></i></span> : null;
    let contentCode = content.content ? <span className="alert-content text-center">{content.content}</span> : null;
    return (
        <div className={"Alert"}>
          {imgCode}
          {contentCode}
        </div>
    );
  }
}

Alert.propTypes = {
  content: PropTypes.object
};
export default Alert;