import React, { Component } from 'react'
import { Link, withRouter, Switch, Route, Redirect } from 'react-router-dom';
import loadableRouter from '@/components/loadableRouter';
import { connect } from 'react-redux';

import "./index.scss";
import { MENULIST } from './constants';


@withRouter
@connect(state => ({
  apis: state.apis,
  lang: state.lang
}))

export default class Property extends Component {
  constructor() {
    super()
    this.state = {
      index: null,
    }
  }

  componentDidMount() { }

  // handleJump = (item) => {
  //   // this.setState({ index: item.id })
  //   this.props.history.push(item.path)
  // }

  render() {
    // const { index } = this.state
    const { pathname } = this.props.history.location
    return (
      <div className="Property">
        <div className="Property-main">
          <div className="Property-menu">
            {
              MENULIST.map(item => {
                return (
                  <Link key={item.id} to={item.path} className={item.path === pathname ? 'menuActive' : ''}>{item.title}</Link>
                )
              })
            }
          </div>
          <div className="Property-content">
            <Switch>
              {/* 币币账户 */}
              <Route path="/property/coinAccount" exact component={loadableRouter(() => import('@/pages/property/coinAccount'))} />
              {/* 跟单账户 */}
              <Route path="/property/followAccount" component={loadableRouter(() => import('@/pages/property/followAccount'))} />
              <Redirect to="/property/coinAccount" />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
