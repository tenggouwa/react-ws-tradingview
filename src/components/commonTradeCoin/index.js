import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';

function TradeCoinDom({ dataSource }) {
  return (
    <ul className="tradeCoin">
      {
        dataSource.map((item, index) => (
          <li key={index}>
            <i className="iconfont icon-xingxingmianxing" />
            <span className="label">{item.label}</span>
            <span className="value green">{item.value}</span>
          </li>
        ))
      }
    </ul>
  )
}

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  setLang: state.setLang,
  langSrc: state.langSrc,
}))

class CommonTradeCoin extends Component {
  constructor() { super() }
  render() {
    const { dataSource } = this.props;
    return <TradeCoinDom dataSource={dataSource} />
  }
}
export default CommonTradeCoin