import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommonKLine from '@/components/commonKLine';

import './index.scss';

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
}))

export default class Contract extends Component {
  constructor() { super() }
  render() {
    return (
      <div className="contract">
        <CommonKLine type="1" />
      </div>
    )
  }
}
