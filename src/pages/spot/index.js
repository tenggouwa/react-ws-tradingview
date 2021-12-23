import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux'

const SpotDom = () => {
  const history = useHistory()
  const jump = () => {
    history.push('/trade')
  }
  return (
    <div className="spot">
      <Button onClick={() => jump()}>spot</Button>
    </div>
  )
}

@connect(state => ({
  apis: state.apis,
  lang: state.lang
}))

export default class Spot extends Component {
  constructor() { super() }
  render() {
    return <SpotDom />
  }
}
