import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import reducers from './reducers';
import Router from './router';
// import CommonHeader from '@/components/commonHeader';
import CommonHeader from '@/components/commonHeader/header';
import CommonHook from '@/components/commonHook';
import Websocket from '@/components/websocket'
import './assets/iconfont/iconfont.scss'
import './assets/iconfont/iconfont.js'

import './styles/index.scss';

/*初始化*/
renderWithHotReload(Router);

/*热更新*/
if (module.hot) {
  module.hot.accept("./router/index.js", () => {
    const Router = require("./router/index.js").default;
    renderWithHotReload(Router);
  });
}

function renderWithHotReload(Router) {
  const store = createStore(reducers, applyMiddleware(reduxPromise/* , createLogger() */))
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <HashRouter>
          <CommonHook />
          <CommonHeader />
          <Websocket />
          <Router />
        </HashRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  );
}