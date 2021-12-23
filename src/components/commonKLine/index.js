import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Datafeeds, extraConfig } from './datafees'
import './index.scss'

const TradingView = require('TradingView')

@withRouter
@connect(state => ({
    apis: state.apis,
    theme: state.theme,
    usdkData: state.usdkData,
    contractData: state.contractData,
    lang: state.lang,
    // ws: state.ws,
    ws7: state.wsData.ws_7,
    wsObj: state.wsObj,
    sendWs: state.sendWs,
    wsConnet: state.wsConnet
}))
export default class index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.cacheData = {}
        this.resolution = '15'
        this.lastHistoryKlineTime = '' // 缓存当前最后一个历史点
        this.newestKlineTime = '' // 缓存当前最右侧的实时点
    }

    componentDidMount() {
        // this.initTradingview()
        // this.getHistoryKLineData()
    }

    componentWillUnmount() {
        /* eslint-disable-next-line */
        if (this.widget && this.widget._ready === true) {
            this.widget.remove()
            // this.widget = null
        }
        const params = {
            reqType: -5,
            type: 7,
        }
        // this.props.ws.sendReq(param)
        this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(params)))
    }

    componentWillReceiveProps(props) {
        if (props.type === '2' && props.usdkData && props.usdkData !== this.props.usdkData) {
            this.tradePricePrecision = props.usdkData.usdkTradePricePrecision
            if (this.widget) {
                this.setSymbolName(props.usdkData.assetName)
                return
            }
            this.initTradingview(props)
        }
        if (props.type === '1' && props.contractData && props.contractData !== this.props.contractData) {
            this.tradePricePrecision = props.contractData.contractTradePricePrecision
            if (this.widget) {
                this.setSymbolName(props.contractData.contractName)
                return
            }
            this.initTradingview(props)
        }
        if (props.ws7 && props.ws7 !== this.props.ws7) {
            this.formatKlineData(props.ws7)
        }
        if (this.widget && props.wsConnet === true && props.wsConnet !== this.props.wsConnet) {
            this.initTradingview(props)
        }
    }

    initTradingview(props) {
        const {
            lang
        } = this.props
        const widgetConfig = {
            debug: !true,
            symbol: props.type === '2' ? props.usdkData.assetName : props.contractData.contractName,
            datafeed: Object.assign({}, Datafeeds, extraConfig(this)),
            interval: this.resolution,
            container_id: 'tv_chart_container',
            library_path: '/static/TradingView/charting_library/',
            timezone: 'Asia/Shanghai',
            custom_css_url: 'css/tradingview_night.css',
            locale: lang === 'tw' ? 'zh_TW' : lang,
            fullscreen: false,
            autosize: true,
            disabled_features: [
                'edit_buttons_in_legend',
                'timeframes_toolbar',
                'go_to_date',
                'volume_force_overlay',
                'header_symbol_search',
                'header_undo_redo',
                'caption_button_text_if_possible',
                'header_resolutions',
                'header_interval_dialog_button',
                'show_interval_dialog_on_key_press',
                // 'left_toolbar',
                // 'control_bar',
                'header_compare',
                // 'header_chart_type',
                'header_screenshot',
                'header_saveload'
            ],
            enabled_features: [
                'left_toolbar',
                // 'header_resolutions'
            ],
            overrides: {
                'mainSeriesProperties.showCountdown': true,
                'paneProperties.background': '#020E25',
                'paneProperties.vertGridProperties.color': '#363c4e',
                'paneProperties.horzGridProperties.color': '#363c4e',
                'symbolWatermarkProperties.transparency': 90, // 水印的主要配置
                'scalesProperties.textColor': '#C5CDE1',
                'mainSeriesProperties.candleStyle.downColor': '#FC4E56', // 蜡烛填充色
                'mainSeriesProperties.candleStyle.upColor': '#63C9A2', // 蜡烛填充色
                'mainSeriesProperties.candleStyle.wickDownColor': '#FC4E56', // 蜡烛竖线颜色
                'mainSeriesProperties.candleStyle.wickUpColor': '#63C9A2', // 蜡烛竖线颜色
            },
            studies_overrides: {
                'volume.volume.color.0': '#FC4E56',
                'volume.volume.color.1': '#63C9A2',
                'volume.volume.transparency': 100,
            },
        }
        // eslint-disable-next-line new-cap
        this.widget = new TradingView.widget(widgetConfig)
        const widgets = this.widget || {}
        const { resolution } = this
        const createButton = (buttons) => {
            for (let i = 0; i < buttons.length; i += 1) {
                /* eslint-disable */
                (function(button) {
                    widgets.createButton()
                        .attr('title', button.title)
                        .addClass(`mydate ${button.resolution === resolution ? 'active' : ''}`)
                        .text(button.title)
                        .on('click', function(e) {
                            if (this.className.indexOf('active') > -1) {// 已经选中
                                return false
                            }
                            let curent = e.currentTarget.parentNode.parentElement.childNodes
                            for (let index of curent) {
                                if (index.className.indexOf('my-group') > -1 && index.childNodes[0].className.indexOf('active') > -1) {
                                    index.childNodes[0].className = index.childNodes[0].className.replace('active', '')
                                }
                            }
                            this.className = `${this.className} active`
                            // paramary.resolution = button.resolution
                            widgets.chart().setResolution(button.resolution, function onReadyCallback() {
                                // // that.unSubscribe()
                                // let ticker = `${widgets.symbolName}-${paramary.resolution}`
                                // var tickerstate = `${ticker}state`
                                // that.cacheData[tickerstate] = false
                            })
                        })
                        .parent().addClass('my-group' + (button.resolution == resolution ? ' active' : ''))
                })(buttons[i])
                /* eslint-enable */
            }
        }
        const buttons = [
            { title: '1m', resolution: '1', chartType: 1 },
            { title: '5m', resolution: '5', chartType: 1 },
            { title: '15m', resolution: '15', chartType: 1 },
            { title: '30m', resolution: '30', chartType: 1 },
            { title: '1h', resolution: '60', chartType: 1 },
            { title: '4h', resolution: '240', chartType: 1 },
            { title: '6h', resolution: '360', chartType: 1 },
            { title: '1D', resolution: '1D', chartType: 1 },
            { title: '1W', resolution: '1W', chartType: 1 },
        ]
        const MA_LINES = [
            { time: 5, color: '#b9b9b9' },
            { time: 10, color: '#e0db1a' },
            { time: 30, color: '#c31ae0' }
        ]
        this.widget.onChartReady(() => {
            createButton(buttons)
            MA_LINES.forEach(item => {
                this.widget.chart().createStudy(
                    'Moving Average',
                    false,
                    false,
                    [item.time],
                    null,
                    {
                        'Plot.color': item.color,
                        'Plot.linewidth': 2,
                    }
                );
            })
        })
    }

    formatKlineData(ws7) {
        const klineFormatData = ws7.data.map(one => ({
            time: Number(one.time),
            open: Number(one.open),
            high: Number(one.high),
            low: Number(one.low),
            close: Number(one.close),
            volume: Number(one.volume),
        }))
        const historyReady = Object.prototype.hasOwnProperty.call(this.cacheData, 'onHistoryCallback')
        const firstHisFlagReady = Object.prototype.hasOwnProperty.call(ws7, 'firstHisFlag')
        const calbackReady = Object.prototype.hasOwnProperty.call(this.cacheData, 'onRealtimeCallback')
        // 处理历史数据
        if (firstHisFlagReady && historyReady) {
            if (klineFormatData.length && klineFormatData.length !== 1) {
                this.cacheData.onHistoryCallback(klineFormatData, { noData: false })
                this.lastHistoryKlineTime = klineFormatData[0].time
                // if (!this.newestKlineTime) {
                //     this.newestKlineTime = klineFormatData[klineFormatData.length - 1].time
                // }
            } else {
                this.cacheData.onHistoryCallback([], { noData: true })
            }
            return
        }
        // 处理实时点数据
        if (klineFormatData.length && calbackReady) {
            const newData = klineFormatData[0]
            this.cacheData.onRealtimeCallback(newData)
        }
    }

    // 加载历史k线数据
    getHistoryKLineData(firstDataRequest, resolution) {
        const {
            usdkData,
            contractData,
            type
        } = this.props
        const assetId = type === '2' ? usdkData.assetId : contractData.contractId
        const params = {
            reqType: 7,
            type: firstDataRequest ? 1 : 3, // 是否第一次加载历史
            param: {
                resolution: resolution === 'D' ? '1W' : resolution,
                klineId: assetId, // 从数据来选择
                type,
                limit: 150,
                endTime: parseInt(((firstDataRequest ? Date.now() : this.lastHistoryKlineTime) / 1000), 10),
            }
        }
        // this.props.ws.sendReq(params)
        this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(params)))
    }

    // 订阅实时点
    subscribeRealTimeData(resolution) {
        // 插件1W周期的resolution传入的字符串为'D',针对D进行特殊处理
        const {
            usdkData,
            contractData,
            type
        } = this.props
        const assetId = type === '2' ? usdkData.assetId : contractData.contractId
        const params = {
            reqType: 7,
            type: 2,
            param: {
                resolution: resolution === 'D' ? '1W' : resolution,
                klineId: assetId, // 从数据来选择
                type,
                endTime: parseInt((Date.now() / 1000), 10)
            }
        }
        // this.props.ws.sendReq(params)
        this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(params)))
    }

    setSymbolName(symbolName) {
        try {
            this.lastHistoryKlineTime = null
            this.widget.chart().setSymbol(symbolName, () => {})
        } catch (e) {
            throw new Error(e)
        }
    }

    getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
        this.cacheData.onHistoryCallback = onHistoryCallback
        this.interval = resolution
        this.resolution = resolution === 'D' ? '1W' : resolution
        this.getHistoryKLineData(firstDataRequest, resolution)
        // console.log('symbolInfo--', symbolInfo)
        // console.log('resolution--', resolution)
        // console.log('from--', from)
        // console.log('to--', to)
        // console.log('onErrorCallback--', onErrorCallback)
    }

    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID) {
        // console.log('subscribeBars running')
        this.cacheData.onRealtimeCallback = onRealtimeCallback
        this.cacheData.subscribeUID = subscribeUID
        this.subscribeRealTimeData(resolution)
    }

    render() {
        return (
            <div className="kline ft-theme-kline ">
                <div className="kline_box">
                    <div className="kline_box" id="tv_chart_container" />
                </div>
            </div>
        )
    }
}
