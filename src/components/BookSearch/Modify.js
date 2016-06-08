"use strict";
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Modal from '../UIComponent/Modals/Modal'
import ShowPage from '../UIComponent/Modals/ShowPage'
// import BookInfo from './BookInfo';
class Modify extends React.Component {

  render() {
    const { index, linkContent, linkOnClick } = this.props;
    return (
      <button className="Modify hvr-radial-out" onClick={() => linkOnClick(index)}>{linkContent}</button>
    );
  };
}

export default Modify;