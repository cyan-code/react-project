import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import './App.css';


// 引入本地化组件，这样UI库为中文
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';

// 引入路由组件
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

// 引入路由表
import { whiteListRoutes } from './routes'


ReactDOM.render(
  <Router>
  <ConfigProvider locale = {zhCN}>
    <Switch>
      {
        whiteListRoutes.map(route => (<Route path={route.path} component={route.component} key={route.path}/>))
      }
      <Route path="/admin" component={ App }/>
      {/* 加exact参数精确匹配，不然所有带有斜杠的路径都会去admin */}
      <Redirect to="/admin" from="/" exact /> 
      <Redirect to="/404" />
    </Switch>
  </ConfigProvider>
  </Router>,
  document.getElementById('root')
);
