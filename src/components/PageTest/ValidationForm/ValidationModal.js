import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';

import Modal from '../../UIComponent/Modals/Modal'
import ShowPage from '../../UIComponent/Modals/ShowPage';
import ValidationForm from './ValidationForm';
import styles from './ValidationForm.scss';

class ValidationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  newBook() {
    this.toggleModal();
  }

  submit() {
    //this.refs.validateform.submit();
  }

  show(values,a, b) {
    setTimeout(function() {
      console.log(values, a);
    }, 3000)
  }

  render() {
    const {showModal} = this.state;
    let pagedata = {
      width: '80%',
      height: '90%',
      closeShowPage: ::this.toggleModal
    };
    return (
      <div className="ValidationModal">
        <ValidationForm ref="validateform" />
      </div>
    );
  }
}

export default ValidationModal;