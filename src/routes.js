import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import ManageWrap from './components/Manage/ManageWrap';
import Manage from './components/Manage/Manage';
import UserPage from './pages/PageUser/PageUser';

import TestPageHome from './pages/PageTest/home';
import TestPage from './pages/PageTest/PageTest';
import DatePickerTest from './components/PageTest/DatePickerTestPage/DatePickerTestPage';
import TableTest from './components/PageTest/TableTestPage/TableTest';
import ModalTestPage from './components/PageTest/ModalTestPage/ModalTestPage';
import MapTest from 'components/PageTest/Map/Map';
import UserAnalysis from './components/PageTest/ChartTestPage/UserAnalysis';
import NewsOrder from './components/PageTest/ChartTestPage/NewsOrder';
import ValidationForm from './components/PageTest/ValidationForm/ValidationModal';

import BookSearch from './components/BookSearch/BookSearch';
import Rays from './components/Rays2.0/index';

//登录注册
import LoginPage from './components/PageLogin/PageLogin';
import RegisterPage from './components/PageRegister/PageRegister';

import NotFound from './components/NotFound/NotFound';

//用户管理
import UserManage from './pages/User';
import UserManageHome from './components/UserManage/home';
import UserImage from './components/UserManage/UserImage';
import UserVideo from './components/UserManage/UserVideo';
import GroupManage from './components/UserManage/GroupManage';

export default (
  <Route path="/" component={ManageWrap}>
    <IndexRedirect to="manage"/>
    <Route path="manage" component={Manage}>
      <IndexRoute component={UserPage}/>
      <Route path="user" component={UserPage}>
        <IndexRoute component={UserManageHome}/>
        <Route path="usermanage" component={UserManage}>
          <IndexRoute component={UserManageHome}/>
          <Route path="userimage" component={UserImage}/>
          <Route path="uservideo" component={UserVideo}/>
          <Route path="groupmanage" component={GroupManage}/>
        </Route>
      </Route>
      <Route path="test" component={TestPageHome}>
        <IndexRoute component={TestPage}/>
        <Route path="datepicker" component={DatePickerTest}/>
        <Route path="table" component={TableTest}/>
        <Route path="modal" component={ModalTestPage}/>
        <Route path="map" component={MapTest}/>
        <Route path="useranalysis" component={UserAnalysis}/>
        <Route path="newsorder" component={NewsOrder}/>
        <Route path="validation" component={ValidationForm}/>
      </Route>
      <Route path="book" component={BookSearch}/>
      <Route path="rays" component={Rays}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>

    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
  </Route>
)