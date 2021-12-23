import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import loadableRouter from '@/components/loadableRouter';
import { connect } from 'react-redux';


@withRouter
@connect(state => ({
  apis: state.apis,
  lang: state.lang
}))


export default class Community extends Component {
  render() {
    return (
      <div className="community">
        <Switch>
          {/* 社区首页 */}
          <Route path="/community/home" exact component={loadableRouter(() => import('@/pages/community/home'))} />
          {/* 我的跟单 */}
          <Route path="/community/myFollow" component={loadableRouter(() => import('@/pages/community/myFollow'))} />
          {/* 交易员详情 */}
          <Route path="/community/traderInfo/:id/:following" component={loadableRouter(() => import('@/pages/community/traderInfo'))} />
          {/* 跟单详情 */}
          <Route path="/community/followInfo/:id/:historyId" component={loadableRouter(() => import('@/pages/community/followInfo'))} />
          {/* 跟单设置 */}
          <Route path="/community/editFollow/:id/:following" exact component={loadableRouter(() => import('@/pages/community/editFollow'))} />
          {/* 立即跟单 */}
          {/* <Route path="/community/nowFollow/:id" exact component={loadableRouter(() => import('@/pages/community/nowFollow'))} /> */}
          {/* 跟单划转 */}
          <Route path="/community/transferFollow/:id" component={loadableRouter(() => import('@/pages/community/transferFollow'))} />
          {/* 跟单通知 */}
          <Route path="/community/followNews" component={loadableRouter(() => import('@/pages/community/followNews'))} />
          {/* 通知详情 */}
          <Route path="/community/followNewsDetail/:msg" component={loadableRouter(() => import('@/pages/community/followNewsDetail'))} />
          <Redirect to="/community/home" />
        </Switch>
      </div>
    )
  }
}
