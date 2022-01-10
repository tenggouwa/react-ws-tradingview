import React, { Component } from 'react'
import Message from './message.js'
import isEmpty from '../../assets/js/isEmpty'

export default class Container extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: {}
        }

        this.addMessage = this.addMessage.bind(this)
        this.removeMessage = this.removeMessage.bind(this)
    }
    componentDidMount() {
        this.addMessage(this.props.msg)
    }
    componentWillReceiveProps(props) {
        if (this.props.msg !== props.msg) {
            this.removeMessage(this.props.msg.id) // 多条数据，删除之前的。
            this.addMessage(props.msg)
        }
    }
    addMessage(msg) {
        const { messages } = this.state
        messages[msg.id] = msg
        this.setState({ messages })
    }

    removeMessage(id) {
        const { messages } = this.state
        delete messages[id]
        this.setState({ messages })
    }

    render() {
        const { messages } = this.state
        if (isEmpty(messages)) {
            return null
        }
        return (
            <div className="message-container">
                {
                    Object.keys(messages).map(key => (
                        <Message
                            key={key}
                            {...messages[key]}
                            onClose={this.removeMessage}
                        />
                    ))
                }
            </div>
        )
    }
}
