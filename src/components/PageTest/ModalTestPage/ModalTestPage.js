import React, {PropTypes} from 'react';
import {Map, is, fromJS} from 'immutable';

import shouldComponentUpdate from '../../../utils/shouldComponentUpdate';

import Modal from '../../UIComponent/Modals/Modal'
import ShowPage from '../../UIComponent/Modals/ShowPage'
import TableTestpage from '../TableTestPage/TableTest'
import DatePickerTestpage from '../DatePickerTestPage/DatePickerTestPage'
import Chart from '../../UIComponent/Chart/Chart'

import styles from './ModalTestPage.scss';

let chartData1 = [65, 59, 80, 81, 56, 55, 40];
let chartData2 = [65, 59, 80, 81, 56, 55, 400];

class ModalTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: chartData1
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }
  

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  newAuthor() {
    this.toggleModal();
  }

  changeData() {
    const {data} = this.state;
    //if(chartData2 != data) {
      this.setState({
        data: chartData2
      });
    //}
  }

  render() {
    const {showModal, data} = this.state;
    let pagedata = {
      width: '80%',
      height: '90%',
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.toggleModal
    };
    let chartData = {
      width: 600,
      height: 400,
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            lineTension: 0,
            data: data
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          gridLines: [{
            display: false,
            color: '#ff0000'
          }],
          xAxes: [{
            stacked: false
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    };
    return (
      <div className="ModalTestPage">
        <Chart type="line" {...chartData}/>
        <Chart type="bar" {...chartData}/>
        <span>123222</span>
        <button onClick={::this.changeData}>change</button>
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