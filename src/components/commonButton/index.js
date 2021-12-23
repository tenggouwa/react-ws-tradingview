import React, { Component } from 'react'
import LoadingBall from '../commonTransfer/loadingBall'

import './index.scss'

export default class Button extends Component {
    constructor() {
        super()
        this.state = {
            // loadP: '',
            loadingBall: false
        }
    }
    componentWillMount() {
        if (this.props.loading) this.setState({ loadingBall: true })// this.loading()
    }
    componentWillReceiveProps(props) {
        if (props.loading !== this.props.loading) {
            if (props.loading) {
                this.setState({ loadingBall: true })
                // this.loading()
            } else {
                this.setState({
                    // loadP: '',
                    loadingBall: false
                })
                if (this.loadInterval) clearTimeout(this.loadInterval)
            }
        }
    }
    render() {
        const {
            className,
            type = 'button',
            loading = false,
            theme,
            size,
            disabled,
            children,
            loadMsg,
            style,
            onClick
        } = this.props
        const classes = ['ft-button', className]
        if (size) classes.push(`ft-size-${size}`)
        if (theme) classes.push(`ft-color-${theme}`)
        return (
            <button
                className={classes.join(' ')}
                style={style}
                onClick={onClick}
                type={type}
                disabled={disabled || loading}
            >
                {loadMsg && loading ? loadMsg : children}{this.state.loadingBall ? <LoadingBall /> : null}
            </button>
        )
    }
}
