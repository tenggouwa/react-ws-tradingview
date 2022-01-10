import React, { Component } from 'react'
import Img1 from '../../assets/img/message/1.png'
import Img2 from '../../assets/img/message/2.png'
import Img3 from '../../assets/img/message/3.png'
import Img4 from '../../assets/img/message/4.png'

import './message.scss'

export default class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // duration: props.duration
        }
        this.dismiss = this.dismiss.bind(this)
    }

    componentDidMount() {
        const { duration } = this.props
        if (duration > 0) {
            this.timeout = setTimeout(this.dismiss, duration * 1000)
        }
    }

    dismiss() {
        this.props.onClose(this.props.id)
    }

    render() {
        const { content, ...props } = this.props
        // const { duration } = this.state;
        delete props.duration

        return (
            <div className="alert">
                <div className={this.props.theme === 'night' ? 'alert-info ft-message' : 'alert-info'}>
                    {
                        this.props.type === 'info' ?
                            <img src={Img1} alt="" />
                            :
                            null
                    }
                    {
                        this.props.type === 'success' ?
                            <img src={Img2} alt="" />
                            :
                            null
                    }
                    {
                        this.props.type === 'warning' ?
                            <img src={Img3} alt="" />
                            :
                            null
                    }
                    {
                        this.props.type === 'error' ?
                            <img src={Img4} alt="" />
                            :
                            null
                    }
                    {content}
                </div>
            </div>
        )
    }
}
