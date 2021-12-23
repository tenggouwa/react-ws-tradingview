import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommonKLine from '@/components/commonKLine';

import './index.scss';

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  getContractData: state.getContractData,
}))

export default class Contract extends Component {
  constructor() { super() }
  componentDidMount() {
    this.initTv();
  }
  initTv = async () => {
    await this.props.dispatch(this.props.getContractData('9'))
  }
  render() {
    return (
      <div className="contract">
        <CommonKLine type="1" />
      </div>
    )
  }
}
