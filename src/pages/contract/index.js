import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import CommonTradeCoin from '@/components/commonTradeCoin';
import CommonKLine from '@/components/commonKLine';
import CommonOrderList from '@/components/commonTradeOrderList';

import './index.scss';

const MOCK_COIN_LIST = [{
  label: 'BTC/USDT',
  value: '-1.27%',
  isCorrect: true,
}, {
  label: 'BTC/USDT',
  value: '1.27%',
  isCorrect: true,
}, {
  label: 'BTC/USDT',
  value: '-1.27%',
  isCorrect: true,
}]
@connect(state => ({
  apis: state.apis,
  lang: state.lang
}))

export default class Contract extends Component {
  constructor() { super() }
  render() {
    return (
      <div className="contract">
        <div className="contract-left">
          <CommonTradeCoin dataSource={MOCK_COIN_LIST} />
          <div className="contract-left-container">
            <div className="kLine">
              <CommonKLine />
            </div>
            <div className="deepLine">
              <CommonOrderList />
            </div>
          </div>
          <div className="contract-left-table">
            table
          </div>
        </div>
        <div className="contract-right">
          222
        </div>
      </div>
    )
  }
}
