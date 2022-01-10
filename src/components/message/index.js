import React from 'react'
import ReactDOM from 'react-dom'
// import { nextUid } from '../../assets/js/common'
import Container from './container'

import './message.scss'

/* eslint-disable no-unused-expressions */
const div = document.createElement('div')
document.body && document.body.appendChild(div)

function Init(type) {
    return (content, theme, msg = {}) => {
        let msg1 = {}
        if (typeof msg === 'string') {
            msg1 = { type: msg }
        }
        if (type) {
            msg1.type = type
        }
        if (theme) {
            msg1.theme = theme
        }
        let uid = Date.now()
        msg1.id = (uid += 1).toString(36)
        // msg1.id = nextUid()
        msg1.content = content
        if (msg.duration !== undefined) {
            msg1.duration = msg.duration
        } else {
            msg1.duration = 3
        }
        ReactDOM.render(<Container msg={msg1} />, div)
        // .addMessage(msg1)
    }
}
export default {
    show: Init(),
    success: Init('success'),
    info: Init('info'),
    warning: Init('warning'),
    error: Init('error')
}
