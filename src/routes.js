
import React from 'react'
import { render } from 'react-dom'
// import { Router, browserHistory } from 'react-router';
 import auth from './api/auth';
const rootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: require('./components/App'),
    childRoutes: [
      require('./routes/LoginPage'),
      require('./routes/RegisterPage'),
      require('./routes/ManagePage')
    ]
  } ]
  // ,
  // onEnter(nextState, replace) {
  //  // const {username} = store.getState().login.toJS();
  //   // if(!username) {
  //   //   replace('/login');
  //   // }
  //   if(!auth.loggedIn()) {
  //     replace({
  //       pathname: '/login',
  //       state: {nextPathname: nextState.location.pathname}
  //     });
  //   }
  // }
}

export default rootRoute;
// export default (store)=> {
//   const requireLogin = (nextState, replace) => {
//     const {username} = store.getState().login.toJS();
//     // if(!username) {
//     //   replace('/login');
//     // }
//     if(!auth.loggedIn()) {
//       replace({
//         pathname: '/login',
//         state: {nextPathname: nextState.location.pathname}
//       });
//     }
//   };
//
//   return rootRoute;
// }














// import React from 'react';
// import {Route, IndexRoute, IndexRedirect} from 'react-router';
//
// /* 七大模块放在containers文件夹,top high components */
//
// import * as containers from './containers';
//
//
// /* Six home page for header modules */
// import UserPageHome from './components/PageUser/home';
// import ResourcePageHome from './components/PageResource/home';
// import OperatePageHome from './components/PageOperate/home';
// import WebsitePageHome from './components/PageWebsite/home';
// import SalesPageHome from './components/PageSales/home';
// import AnalysisPageHome from './components/PageAnalysis/home';
// import SystemPageHome from './components/PageSystem/home';
//
// import TestPageHome from './pages/PageTest/home';
// import TestPage from './pages/PageTest/PageTest';
// import DatePickerTest from './components/PageTest/DatePickerTestPage/DatePickerTestPage';
// import TableTest from './components/PageTest/TableTestPage/TableTest';
// import ModalTestPage from './components/PageTest/ModalTestPage/ModalTestPage';
// import MapTest from 'components/PageTest/Map/Map';
// import UserAnalysis from './components/PageTest/ChartTestPage/UserAnalysis';
// import NewsOrder from './components/PageTest/ChartTestPage/NewsOrder';
// import ValidationForm from './components/PageTest/ValidationForm/ValidationModal';
//
// import BookSearch from './components/BookSearch/BookSearch';
// import Rays from './components/Rays2.0/index';
//
//
// import NotFound from './components/NotFound/NotFound';
//
// //用户中心——用户管理
// import UserManage from './pages/User/UserManage';
// import UserManageHome from './components/UserManage/home';
// import UserImage from './components/UserManage/UserImage';
// import UserVideo from './components/UserManage/UserVideo';
// import GroupManage from './components/UserManage/GroupManage';
//
// //资源中心——文章咨询
// import Article from './pages/Resource/Article';
// import ArticleHome from 'components/Article/home';
// import ArticleSort from 'components/Article/ArticleSort';
//
// //运营中心——展示设置
// import Display from './pages/Operate/Display';
// import Showcase from './pages/Operate/Showcase';
// import ShowcaseHome from 'components/Display/home';
// import ShowcaseBook from 'components/Display/ShowcaseBook';
// import ShowcasePropduct from 'components/Display/ShowcaseProduct';
// import ShowcaseSource from 'components/Display/ShowcaseSource';
// import Invoice from 'components/Display/Invoice';
//
// import {toJS} from 'immutable';
//
// import auth from './api/auth';
//
// const {
//     App,LoginPage,RegisterPage,ManagePage,UserContainer,ResourceContainer,OperateContainer,
//     WebsiteContainer,SalesContainer,AnalysisContainer,SystemContainer
// } = containers;
//
// export default (store)=> {
//   const requireLogin = (nextState, replace) => {
//     const {username } = store.getState().login.toJS();
//     // if(!username) {
//     //   replace('/login');
//     // }
//     if(!auth.loggedIn()) {
//       replace({
//         pathname: '/login',
//         state: { nextPathname: nextState.location.pathname}
//       });
//     }
//   };
//   return (
//     <Route component={App}>
//       <Route path="/login" component={LoginPage}/>
//       <Route path="/register" component={RegisterPage}/>
//
//       <Route path="/" component={ManagePage} onEnter={requireLogin}>
//         <IndexRoute component={UserContainer}/>
//         <Route path="/user" component={UserContainer}>
//           <IndexRoute component={UserPageHome}/>
//           <Route path="usermanage" component={UserManage}>
//             <IndexRoute component={UserManageHome}/>
//             <Route path="search" component={UserManageHome}/>
//             <Route path="image" component={UserImage}/>
//             <Route path="video" component={UserVideo}/>
//             <Route path="group" component={GroupManage}/>
//           </Route>
//         </Route>
//         <Route path="resource" component={ResourceContainer}>
//           <IndexRoute component={ResourcePageHome}/>
//           <Route path="article" component={Article}>
//             <IndexRoute component={ArticleHome}/>
//             <Route path="search" component={ArticleHome}/>
//             <Route path="sort" component={ArticleSort}/>
//           </Route>
//         </Route>
//         <Route path="operate" component={OperateContainer}>
//           <IndexRoute component={OperatePageHome}/>
//           <Route path="display" component={Display}>
//             <IndexRoute component={Showcase}/>
//             <Route path="showcase" component={Showcase}>
//               <IndexRoute component={ShowcaseHome}/>
//               <Route path="book" component={ShowcaseBook}/>
//               <Route path="product" component={ShowcasePropduct}/>
//               <Route path="source" component={ShowcaseSource}/>
//             </Route>
//             <Route path="invoice" component={Invoice}/>
//           </Route>
//         </Route>
//         <Route path="website" component={WebsiteContainer}>
//           <IndexRoute component={WebsitePageHome}/>
//         </Route>
//         <Route path="sales" component={SalesContainer}>
//           <IndexRoute component={SalesPageHome}/>
//         </Route>
//         <Route path="analysis" component={AnalysisContainer}>
//           <IndexRoute component={AnalysisPageHome}/>
//         </Route>
//         <Route path="system" component={SystemContainer}>
//           <IndexRoute component={SystemPageHome}/>
//         </Route>
//         <Route path="test" component={TestPageHome}>
//           <IndexRoute component={TestPage}/>
//           <Route path="datepicker" component={DatePickerTest}/>
//           <Route path="table" component={TableTest}/>
//           <Route path="modal" component={ModalTestPage}/>
//           <Route path="map" component={MapTest}/>
//           <Route path="useranalysis" component={UserAnalysis}/>
//           <Route path="newsorder" component={NewsOrder}/>
//           <Route path="validation" component={ValidationForm}/>
//         </Route>
//         <Route path="book" component={BookSearch}/>
//         <Route path="rays" component={Rays}/>
//         <Route path="*" component={NotFound} status={404}/>
//       </Route>
//
//     </Route>
//   )
// }
