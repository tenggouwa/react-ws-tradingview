import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'lodash/fp'

// 公共路由钩子方法
@withRouter
@connect(state => ({
    userAuth: state.userAuth,
    swith: state.swith,
    getUserAuth: state.getUserAuth,
    clearUserAuth: state.clearUserAuth,
    setWs: state.setWs,
    setWsData: state.setWsData,
    clearWsData: state.clearWsData,
    sessionId: state.sessionId,
    saveSessionId: state.saveSessionId,
    setWsStatus: state.setWsStatus,
    wsObj: state.wsObj,
    sendWs: state.sendWs,
    langSrc: state.langSrc,
    lang: state.lang,
}))
export default class Hook extends Component {
    componentWillMount() {
        const {
            langSrc,
            lang,
            dispatch,
            getUserAuth,
            history,
        } = this.props
        compose(dispatch, getUserAuth)()
        window.t = function t(path = '.', src = langSrc[lang].translation) {
            const pathArray = path.split('.')
            return pathArray.length > 2 ? src[pathArray[0]][pathArray[1]][pathArray[2]] : src[pathArray[0]][pathArray[1]]
        }
        window.routerHistory = history
    }
    componentWillReceiveProps(props) {
        const { userAuth } = localStorage
        if (props.userAuth === 0 || !props.userAuth) {
            if (this.props.location !== props.location && JSON.stringify(props.userAuth) !== userAuth
            ) {
                this.props.dispatch(this.props.clearUserAuth())
                this.props.dispatch(this.props.getUserAuth())
            }
        }
        const { pathname, search } = props.location

        if (JSON.stringify(props.userAuth) === '0' &&
            (pathname.startsWith('/community'))) {
            this.props.dispatch(this.props.clearUserAuth())
            localStorage.userAuth = 0
            props.history.replace(`/login?backUrl=${encodeURIComponent(pathname)}${encodeURIComponent(search)}`)
        }
        // TODO
        if (JSON.stringify(props.userAuth) !== '0' && (props.userAuth !== this.props.userAuth) && localStorage.sessionId) {
            const paramAry = {
                reqType: -3,
                sessionId: localStorage.sessionId
            }
            props.dispatch(props.sendWs(props.wsObj, JSON.stringify(paramAry)))
        }
        if ((JSON.stringify(props.userAuth) !== '0' && (props.userAuth !== this.props.userAuth)) || (props.wsConnet === true && props.wsConnet !== this.props.wsConnet)) { // 对公共websocket处理，检测下登录状态，加上sessionId
            const param = {
                reqType: 12
            }
            props.dispatch(props.sendWs(props.wsObj, JSON.stringify(param)))
        }
        // if (props.userAuth && !props.userAuth.isFutureTradeAuth && pathname.startsWith('/trade/futures')) {
        //     props.history.replace('/common/futures')
        // }
        // if (props.userAuth && props.userAuth.isFutureTradeAuth && localStorage.pathName.startsWith('/common/futures')) {
        //     props.history.replace('/trade/futures')
        // }
        if (JSON.stringify(props.userAuth) !== '0' && (props.userAuth !== this.props.userAuth)) { // 当前是登录状态
            if (search.indexOf('inviteCode') !== -1) { // 找到邀请码
                props.history.replace('/invite')
            }
        }
        // if (props.swith === true && pathname.startsWith('/trade')) {
        //     props.history.replace('/tradingcontest')
        // }
        if (props.history !== this.props.history) {
            window.routerHistory = this.props.history
        }
    }
    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer)
    }
    render() {
        return null
    }
}
