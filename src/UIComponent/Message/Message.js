'use strict';
import React, {PropTypes} from 'react';

import styles from './Message.scss';

class Message extends React.Component {

  render() {
    const {type, message} = this.props;
    return (
      <div className={`Message text-center message-${type}`}>
        <span className="title">{message}</span>
      </div>
    );
  }
}

Message.PropTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired
};

export default Message;

