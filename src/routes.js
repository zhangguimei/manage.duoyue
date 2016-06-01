import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Manage from './components/Manage/Manage';
import UserPage from './components/PageUser/PageUser';

import TestPageHome from './pages/PageTest/home';
import TestPage from './pages/PageTest/PageTest';
import DatePickerTest from './components/PageTest/DatePickerTestPage/DatePickerTestPage';
import TableTest from './components/PageTest/TableTestPage/TableTest';
import ModalTestPage from './components/PageTest/ModalTestPage/ModalTestPage';
import MapTest from 'components/PageTest/Map/Map';
import UserAnalysis from './components/PageTest/ChartTestPage/UserAnalysis';
import NewsOrder from './components/PageTest/ChartTestPage/NewsOrder';

import Rays from './components/Rays2.0/index';
import NotFound from './components/NotFound/NotFound';

export default (
  <Route path="/" component={Manage}>
    <IndexRoute component={UserPage}/>
    <Route path="user" component={UserPage}>
    </Route>

    <Route path="test" component={TestPageHome}>
      <IndexRoute component={TestPage}/>
      <Route path="datepicker" component={DatePickerTest}/>
      <Route path="table" component={TableTest} />
      <Route path="modal" component={ModalTestPage}/>
      <Route path="map" component={MapTest}/>
      <Route path="useranalysis" component={UserAnalysis}/>
      <Route path="newsorder" component={NewsOrder}/>
    </Route>
    
    <Route path="rays" component={Rays} />
    <Route path="*" component={NotFound} status={404}/>
  </Route>
)