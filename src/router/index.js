import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import loadableRouter from '@/components/loadableRouter';
import { filterRouter } from '@/assets/js/common';
import './index.scss';

const Router = () => {
  const { pathname } = useLocation();
  return (
    <main className={`${!filterRouter(pathname) && 'innerRouter'}`}>
      <Switch>
        {/* 首页 */}
        <Route path="/" exact component={loadableRouter(() => import('@/pages/home'))} />
        {/* 登录 */}
        <Route path="/login" component={loadableRouter(() => import('@/pages/login'))} />
        {/* 注册 */}
        <Route path="/register" component={loadableRouter(() => import('@/pages/register'))} />
        {/* 忘记密码 */}
        <Route path="/forgetPass" component={loadableRouter(() => import('@/pages/forgetPass'))} />
        {/* 行情 */}
        {/* <Route path="/market" component={loadableRouter(() => import('@/pages/market'))} /> */}
        {/* 现货 */}
        {/* <Route path="/spot" component={loadableRouter(() => import('@/pages/spot'))} /> */}
        {/* 合约 */}
        <Route path="/contract" component={loadableRouter(() => import('@/pages/contract'))} />
        {/* 身份认证 */}
        <Route path="/personal" component={loadableRouter(() => import('@/pages/person'))} />
        {/* 修改登录密码 */}
        <Route path="/changelogin" component={loadableRouter(() => import('@/pages/changeLogin'))} />
        {/* 修改资金密码 */}
        <Route path="/changepassword" component={loadableRouter(() => import('@/pages/changePass'))} />
        {/* 设置资金密码和忘记资金密码 */}
        <Route path="/bindpassword" component={loadableRouter(() => import('@/pages/bindpass'))} />
        {/* <Route path="/contract" component={loadableRouter(() => import('@/pages/contract'))} /> */}
        {/* 资产 */}
        <Route path="/assetRecord" component={loadableRouter(() => import('@/pages/assetRecord'))} />
        {/* 社区 */}
        <Route path="/community" component={loadableRouter(() => import('@/pages/community'))} />
        {/* 资产记录 */}
        <Route path="/assetRecord" component={loadableRouter(() => import('@/pages/assetRecord'))} />
        {/* 资产 */}
        <Route path="/property" component={loadableRouter(() => import('@/pages/property'))} />
      </Switch>
    </main>
  )
};

export default Router;