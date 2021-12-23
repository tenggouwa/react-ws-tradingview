import React, { Component } from "react";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.scss';

const Assets = ({ dataSource, recharge, withdraw, transfer }) => {
  const history = useHistory()
  const jumpRecord = () => {
    history.push('/assetRecord')
  }

  const canSee = JSON.parse(localStorage.getItem('followVisible'));

  const handleVisible = (flag) => {
    localStorage.setItem('followVisible', flag)
  }

  return (
    <div className="Property-data">
      <div className="data-text">
        <span>总资产折合
          <i className={`iconfont ${canSee ? 'icon-see' : 'icon-bukejian'}`} onClick={() => handleVisible(!canSee)} />
        </span>
        <span onClick={jumpRecord}>资产记录</span>
      </div>
      <div className="data-box">
        <span>
          {
            canSee ? <b>{dataSource.totalValuation || '--'}</b> : <b>****</b>
          }
          BTC</span>
        <p>≈
          {
            canSee ? <i>{dataSource.totalValuationUsd || '--'}</i> : <i>****</i>
          }
          USDT</p>
      </div>
      {
        history.location.pathname === '/property/followAccount' ?
          <div className="property-btn">
            <p className="follow-transfer" onClick={transfer}>划转</p>
          </div>
          :
          <div className="property-btn">
            <p className="property-yellowBtn" onClick={recharge}>充值</p>
            <p onClick={withdraw}>提现</p>
            <p onClick={transfer}>划转</p>
          </div>
      }
    </div>
  );
}

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
}))

export default class AssetsData extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    // const { } = this.state;
    return (
      <div>
        <Assets {...this.props} />
      </div>
    )
  }
}
