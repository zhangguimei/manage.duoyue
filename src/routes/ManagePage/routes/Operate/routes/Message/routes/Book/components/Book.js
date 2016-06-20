'use strict';
import React from 'react';
import UserAnalysis from '../../../../../../../../../components/PageTest/ChartTestPage/UserAnalysis';

class Book extends React.Component {
  render() {
    return (
      <div className="Book">
        Book
        <UserAnalysis />
      </div>
    );
  }
}

module.exports =  Book;