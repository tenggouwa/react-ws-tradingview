import { Component } from 'react'
import { connect } from 'react-redux'
import socket from '@/fetch/ws.js'

// 公共路由钩子方法
@connect(state => ({
    setWs: state.setWs,
    setWsData: state.setWsData,
    clearWsData: state.clearWsData, //
    setWsStatus: state.setWsStatus,
    wsObj: state.wsObj,
    sendWs: state.sendWs,
    closeWs: state.closeWs,
}))
export default class Websocket extends Component {
    constructor() {
        super()
        this.timeoutObj = null
        // 超时
        this.timeout = 30000
        // 服务器时间
        this.serverTimeoutObj = null
        // 重连锁
        this.lockReconnect = false
        // 是否链接
        this.isconnet = false
        // 链接状态
        this.connect = 2
        this.isOnline = true
        // 重连次数
        this.reconnectCount = 0
        // 重连次数最大值
        this.reconnectCountMax = 10
        // 重连间隔
        this.reconnectRate = 5
        // 未发送消息队列
        this.messageQueue = []
        // 消息订阅函数
        this.mapSubscribe = {}
        // 检测心跳包
        this.heartBeatSend = 'ping'
        // 心跳频率
        this.heartBeatRate = 10
        // 最近发送心跳包时间戳
        this.lastHeartBeatSend = null
        // 消息订阅函数
        this.mapSubscribe = {}
        'message ready close packData unpackData'
            .split(' ')
            .forEach((one) => { this.mapSubscribe[one] = [] })
    }
    componentDidMount() {
        this.createWebSocket()
        window.addEventListener('offline', this.offline.bind(this))
        window.addEventListener('online', this.online.bind(this))
    }
    componentWillReceiveProps(props) {
        if ((props.wsObj && props.wsObj !== this.props.wsObj)) {
            /* eslint-disable-next-line */
            props.wsObj.onmessage = (res) => {
                const data = JSON.parse(res.data)
                if (data.reqType) {
                    props.dispatch(props.setWsData({
                        [`ws_${data.reqType}`]: data.data
                    }))
                } else {
                    const { type } = data
                    if (type === 11) {
                        // 对行情24小时表格进行特殊处理
                        props.dispatch(props.setWsData({
                            [`ws_${data.subType}`]: data
                        }))
                    } else if (type === 7) {
                        props.dispatch(props.setWsData({
                            [`ws_${type}`]: data
                        }))
                    } else {
                        props.dispatch(props.setWsData({
                            [`ws_${type}`]: data.data
                        }))
                    }
                }
            }
        }
    }
    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer)
        window.removeEventListener('offline', this.offline)
        window.removeEventListener('online', this.online)
        this.props.dispatch(this.props.closeWs(this.props.wsObj))
    }

    online() {
        this.isOnline = true
    }
    offline() {
        this.isOnline = false
        // this.props.dispatch(this.props.closeWs(this.props.wsObj))
        // 等待服务端响应
        /* setTimeout(() => {
            // 断网场景，提前手动触发
            if (this.props.wsObj && this.props.wsObj.readyState === WebSocket.CLOSING) {
                this.ws.onclose({
                    code: 1006,
                    reason: '连接超时',
                })
            }
        }, 1000) */
    }
    // createWebSocket = () => {
    //     try {
    //         // console.log(this.props.wsObj)
    //         this.ws = socket.createWs()
    //         this.init()
    //         this.props.dispatch(this.props.setWs(this.ws))
    //     } catch (e) {
    //         console.log('catch')
    //     }
    // }
    // 新建连接
    createWebSocket() {
        this.isReconnect = true
        this.lastOnmessage = null
        this.lastOnmessageDiff = 0

        this.ws = socket.createWs()
        this.init()
        this.props.dispatch(this.props.setWs(this.ws))
    }
    init = () => {
        this.ws.onclose = (e) => {
            // console.log('链接关闭')
            const key = 'close'
            if (this.mapSubscribe[key][0]) this.mapSubscribe[key][0](e)
            this.isReady = false
            this.isConnected = false
            clearInterval(this.heartbeatTimer)
            this.heartbeatTimer = null
            clearTimeout(this.sendTimer)
            this.sendTimer = null

            this.ws.onopen = null
            this.ws.onmessage = null
            this.ws.onerror = null
            this.ws.onclose = null
            this.ws = null

            if (this.isReconnect || e.code === 1006) this.reconnect()
            this.props.dispatch(this.props.setWsStatus(false))
            // this.reconnect()
            // this.props.dispatch(this.props.closeWs(this.props.wsObj))
        }
        this.ws.onerror = () => {
            // console.log('发生异常了')
            this.props.dispatch(this.props.setWsStatus(false))
            // 检测重连次数
            if (this.reconnectCount < this.reconnectCountMax) {
                // 动态调整频率
                this.reconnectCount = (this.reconnectCount + 1) % this.reconnectCountMax
            } else {
                // this.isReconnect = false;
            }
            // this.reconnect()
        }
        this.ws.onopen = () => {
            // 心跳检测重置
            this.isConnected = true
            this.ready()
            setTimeout(() => {
                this.props.dispatch(this.props.setWsStatus(true))
            }, 10)
        }
        this.ws.onmessage = (e) => {
            const dataUnpacked = this.unpackData(e.data)
            const key = 'message'
            if (this.mapSubscribe[key]) {
                this.mapSubscribe[key].forEach(one => one(dataUnpacked))
            }
            // 重置心跳检测
            clearTimeout(this.sendTimer)
            this.sendTimer = null
            this.isConnected = true
            // 检测网速
            const now = Date.now()
            if (this.lastOnmessage) this.lastOnmessageDiff = now - this.lastOnmessage
            this.lastOnmessage = now
            // 心跳包响应速度
            if (this.heartBeatBack && this.heartBeatBack(dataUnpacked)) {
                if (this.lastHeartBeatSend) {
                    this.lastHeartBeatDiff = now - this.lastHeartBeatSend
                    this.lastHeartBeatSend = null
                }
            }
        }
    }
    reconnect = () => {
        const delay = this.isOnline ? 1 : this.reconnectCount // this.reconnectRate
        if (this.reconnectCount < this.reconnectCountMax) {
            setTimeout(() => {
                if (!this.isConnected) this.createWebSocket()
            }, 1000 * delay)
        }
    }
    heartCheckstart = () => {
        const self = this
        clearTimeout(this.timeoutObj)
        clearTimeout(this.serverTimeoutObj)
        this.timeoutObj = setInterval(() => {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，
            if (this.ws.readyState === 3) {
                this.props.wsObj.close()
                this.isconnet = false
                return
            }
            if (this.ws.readyState === 1) {
                this.props.dispatch(this.props.sendWs(this.props.wsObj, 'ping'))
                this.isconnet = true
            }
            self.serverTimeoutObj = setTimeout(() => {
                this.props.wsObj.close()
            }, 10000)
        }, this.timeout)
    }
    // 检测状态
    ready() {
        if (this.isConnected) {
            const key = 'ready'
            if (this.mapSubscribe[key][0]) this.mapSubscribe[key][0]()
            this.isReady = true
            this.reconnectCount = 0

            // 发送缓存区消息
            this.messageQueue.forEach(pack => this.props.dispatch(this.props.sendWs(this.props.wsObj, pack)))
            this.messageQueue = []

            this.startHeartBeat()
        }
    }
    // 解包接收消息
    unpackData(data) {
        const key = 'unpackData'
        if (this.mapSubscribe[key][0]) return this.mapSubscribe[key][0](data)
        return data ? JSON.parse(data) : {}
    }
    // 心跳包数据
    startHeartBeat() {
        // this.send(this.heartBeatSend);
        clearInterval(this.heartbeatTimer)
        this.heartbeatTimer = setInterval(() => {
            // this.send(this.heartBeatSend)
            this.props.dispatch(this.props.sendWs(this.props.wsObj, this.heartBeatSend))
            this.lastHeartBeatSend = Date.now()
        }, 1000 * this.heartBeatRate)
    }
    render() {
        return null
    }
}
