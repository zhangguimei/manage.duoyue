import React, {PropTypes} from 'react';

import Modal from '../../UIComponent/Modals/Modal'
import ShowPage from '../../UIComponent/Modals/ShowPage'
import TableTestpage from '../TableTestPage/TableTest'
import DatePickerTestpage from '../DatePickerTestPage/DatePickerTestPage'

import styles from './ModalTestPage.scss';

class ModalTestPage extends React.Component {
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

  newAuthor() {
    this.toggleModal();
  }

  render() {
    const {showModal} = this.state;
    let pagedata = {
      width: '80%',
      height: '90%',
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.toggleModal
    };
    return (
      <div className="ModalTestPage">
        <button onClick={::this.newAuthor}>新增作者</button>
        {
          showModal &&
          <Modal>
            <ShowPage {...pagedata}>
              <DatePickerTestpage/>
              <TableTestpage/>
              <TableTestpage/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

export default ModalTestPage;