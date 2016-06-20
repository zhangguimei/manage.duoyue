import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import ManageWrap from './components/Manage/ManageWrap';
import Manage from './components/Manage/Manage';

/* Six header modules */
import UserPage from './pages/User/User';
import ResourcePage from './pages/Resource/Resource';
import OperatePage from './pages/Operate/Operate';
import WebsitePage from './pages/Website/Website';
import SalesPage from './pages/Sales/Sales';
import AnalysisPage from './pages/Analysis/Analysis';
import SystemPage from './pages/System/System';

/* Six home page for header modules */
import UserPageHome from './components/PageUser/home';
import ResourcePageHome from './components/PageResource/home';
import OperatePageHome from './components/PageOperate/home';
import WebsitePageHome from './components/PageWebsite/home';
import SalesPageHome from './components/PageSales/home';
import AnalysisPageHome from './components/PageAnalysis/home';
import SystemPageHome from './components/PageSystem/home';


import TestPageHome from './pages/PageTest/home';
import TestPage from './pages/PageTest/PageTest';
import DatePickerTest from './components/PageTest/DatePickerTestPage/DatePickerTestPage';
import TableTest from './components/PageTest/TableTestPage/TableTest';
import ModalTestPage from './components/PageTest/ModalTestPage/ModalTestPage';
import MapTest from 'components/PageTest/Map/Map';
import UserAnalysis from './components/PageTest/ChartTestPage/UserAnalysis';
import NewsOrder from './components/PageTest/ChartTestPage/NewsOrder';
import ValidationForm from './components/PageTest/ValidationForm/ValidationModal';

import Rays from './components/Rays2.0/index';

//登录注册
import LoginPage from './components/PageLogin/PageLogin';
import RegisterPage from './components/PageRegister/PageRegister';

import NotFound from './components/NotFound/NotFound';

//用户中心——用户管理
import UserManage from './pages/User/UserManage';
import UserManageHome from './components/UserManage/home';
import UserImage from './components/UserManage/UserImage';
import UserVideo from './components/UserManage/UserVideo';
import GroupManage from './components/UserManage/GroupManage';

//资源中心——文章资讯
import Article from './pages/Resource/Article';
import ArticleHome from 'components/SourceCenter/home';
import ArticleSort from 'components/Article/ArticleSort';
//资源中心——书籍管理
import Book from './pages/Resource/Book';
import BookSearch from './components/BookManage/BookSearch/BookSearch';

//运营中心——展示设置
import Display from './pages/Operate/Display';
import Showcase from './pages/Operate/Showcase';
import ShowcaseHome from 'components/Display/home';
import ShowcaseBook from 'components/Display/ShowcaseBook';
import ShowcasePropduct from 'components/Display/ShowcaseProduct';
import ShowcaseSource from 'components/Display/ShowcaseSource';
import Invoice from 'components/Display/Invoice';

export default (
  <Route path="/" component={ManageWrap}>
    <IndexRedirect to="manage"/>
    <Route path="manage" component={Manage}>
      <IndexRoute component={UserPage}/>
      <Route path="user" component={UserPage}>
        <IndexRoute component={UserPageHome}/>
        <Route path="usermanage" component={UserManage}>
          <IndexRoute component={UserManageHome}/>
          <Route path="search" component={UserManageHome}/>
          <Route path="image" component={UserImage}/>
          <Route path="video" component={UserVideo}/>
          <Route path="group" component={GroupManage}/>
        </Route>
      </Route>
      <Route path="resource" component={ResourcePage}>
        <IndexRoute component={ResourcePageHome}/>
        <Route path="article" component={Article}>
          <IndexRoute component={ArticleHome}/>
          <Route path="search" component={ArticleHome}/>
          <Route path="sort" component={ArticleSort}/>
        </Route>
        <Route path="book" component={Book}>
          <IndexRoute component={BookSearch}/>
          <Route path="search" component={BookSearch}/>
        </Route>
      </Route>
      <Route path="operate" component={OperatePage}>
        <IndexRoute component={OperatePageHome}/>
        <Route path="display" component={Display}>
          <IndexRoute component={Showcase}/>
          <Route path="showcase" component={Showcase}>
            <IndexRoute component={ShowcaseHome}/>
            <Route path="book" component={ShowcaseBook}/>
            <Route path="product" component={ShowcasePropduct}/>
            <Route path="source" component={ShowcaseSource}/>
          </Route>
          <Route path="invoice" component={Invoice}/>
        </Route>
      </Route>
      <Route path="website" component={WebsitePage}>
        <IndexRoute component={WebsitePageHome}/>
      </Route>
      <Route path="sales" component={SalesPage}>
        <IndexRoute component={SalesPageHome}/>
      </Route>
      <Route path="analysis" component={AnalysisPage}>
        <IndexRoute component={AnalysisPageHome}/>
      </Route>
      <Route path="system" component={SystemPage}>
        <IndexRoute component={SystemPageHome}/>
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
      <Route path="rays" component={Rays}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>

    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
  </Route>
)