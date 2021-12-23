import React, { Component } from 'react'

export default class FtBLine extends Component {
  kw = 100 || this.props.w
  kh = 20 || this.props.h
  constructor() {
    super()
    const d = []
    for (let i = 0; i < 54; i += 1) {
      d.push(Math.floor((Math.random() * 35) + 26))
    }
    this.state = {
      d,
    }
  }
  render() {
    const d = this.props.d || this.state.d
    if (!d || d.length < 2) {
      return null
    }
    let min
    for (let i = 0; i < d.length; i += 1) {
      const el = d[i]
      if (min === undefined) {
        min = el
      }
      if (el < min) {
        min = el
      }
    }
    const { kw, kh } = this
    const data = []
    let max = 0
    for (let i = 0; i < d.length; i += 1) {
      const el = d[i]
      if (el > max) {
        max = el
      }
    }
    let pth
    let bt
    if (max - min === 0) {
      pth = kh / min
      bt = min / kh
    } else {
      pth = kh / ((max - min) * 1.2)
      bt = min - ((max - min) / 10)
    }
    const ptl = (kw + 5) / (d.length - 1)
    for (let i = 0; i < d.length; i += 1) {
      data.push(`L ${(i * ptl) - 2} ${kh - (pth * (d[i] - bt))}`)
    }
    return (
      <div className={this.props.className}>
        <svg style={{ overflow: 'hidden', display: 'block' }} width={kw} height={kh}>
          <linearGradient id="normal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#F4CD52', stopOpacity: '0.5' }} />
            <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: '0.5' }} />
          </linearGradient>
          <path
            d={`M -2 2
              ${data.join(' ')}
              L ${kw + 2} ${kh + 2} L -2 ${kh + 2} z`}
            stroke="#F4CD52"
            strokeWidth="1"
            fill="url(#normal)"
          />
        </svg>
      </div>
    )
  }
}
