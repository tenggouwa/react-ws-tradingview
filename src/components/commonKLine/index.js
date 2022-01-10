/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Datafeeds, extraConfig, ThemeDark, ThemeWhite } from './datafees'
import { widget } from '../../../static/TradingView/charting_library';
import './index.scss'

function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
@withRouter
@connect(state => ({
    lang: state.lang,
    ws7: state.wsData.ws_7,
    wsObj: state.wsObj,
    sendWs: state.sendWs,
    wsConnet: state.wsConnet,
    setLang: state.setLang,
}))
export default class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      webData: {},
      theme: ThemeWhite,
    }
    this.cacheData = {}
    this.resolution = '15'
    this.lastHistoryKlineTime = '' // 缓存当前最后一个历史点
    this.newestKlineTime = '' // 缓存当前最右侧的实时点
  }
	tvWidget = null;

  componentDidMount() {
    const mockData = {
      type: '1',
      klineId: '9',
      resolution: '15',
      theme: 'White',
      lang: 'zh',
      pre: 2,
    }

    this.setState({
      webData: mockData,
      theme: mockData.theme === 'Dark' ? ThemeDark: ThemeWhite
    }, () => {
      const { resolution, lang, pre } = this.state.webData
      this.tradePricePrecision = pre
      if (this.tvWidget) {
        this.tvWidget.chart().setResolution(resolution, function onReadyCallback() {});
      } else {
        this.resolution = resolution;
      }
      this.props.dispatch(this.props.setLang(lang))
      this.initTradingview(this.props)
    });

    setTimeout(() => {
      const a = document.getElementsByClassName('onlyOneButtonCanBeStick-2KhwsEwE')
      console.log(a);
    }, 1000)
    // setupWebViewJavascriptBridge(function(bridge) {
    //   bridge.registerHandler('tvInit', (data, responseCallback) => {
    //     const {
    //       type,
    //       klineId,
    //       resolution,
    //       theme,
    //       lang,
    //     } = data;
    //     console.log('getData', data);
    //     _that.initTv(type, klineId);
    //     if (_that.tvWidget) {
    //       _that.tvWidget.chart().setResolution(resolution, function onReadyCallback() {});
    //     } else {
    //       _that.resolution = resolution;
    //     }
    //     _that.setState({
    //       theme: theme === 'Dark' ? ThemeDark: ThemeWhite
    //     })
    //     _that.props.dispatch(_that.props.setLang(lang))
    //   });
    // })
  }

  componentWillReceiveProps(props) {
    if (props.ws7 && props.ws7 !== this.props.ws7) {
      this.formatKlineData(props.ws7)
    }
    if (this.tvWidget && props.wsConnet === true && props.wsConnet !== this.props.wsConnet) {
      this.initTradingview(props)
    }
    if (this.tvWidget && this.props.lang !== props.lang) {
      this.initTradingview(props)
    }
  }

	initTradingview (props) {
    const { theme } = this.state;
    const { lang } = props || this.props
    let tvLang = lang
    switch (lang) {
      case 'tw':
        tvLang = 'zh_TW'
        break;
      case 'jp':
        tvLang = 'ja'
        break;
      default:
        break;
    }
		const widgetOptions = {
			debug: !true,
      symbol: ' ',
      datafeed: Object.assign({}, Datafeeds, extraConfig(this)),
      interval: this.resolution,
      container_id: 'tv_chart_container',
      library_path: '/static/TradingView/charting_library/',
      timezone: 'Asia/Shanghai',
      locale: tvLang,
      fullscreen: false,
      autosize: true,
      theme: theme.theme,
      toolbar_bg: theme.toolbar_bg,
      loading_screen: { backgroundColor: theme.toolbar_bg, foregroundColor: theme.toolbar_bg },
      disabled_features: [
        'Legend_widget',
        'main_series_scale_menu',
        'chart_crosshair_menu',
        'remove_library_container_border',
        'adaptive_logo',
        'hide_resolution_in_legend',
        'edit_buttons_in_legend',
        'go_to_date',
        'timeframes_toolbar',
        'header_fullscreen_button', // 全屏
        'header_settings', // 头部设置按钮
        'volume_force_overlay', // 成交量 是否用横线隔开
        'header_symbol_search',
        'header_undo_redo',
        'caption_button_text_if_possible',
        'header_resolutions',
        'header_interval_dialog_button',
        'show_interval_dialog_on_key_press',
        'header_compare',
        'header_screenshot',
        'header_saveload',
        'display_market_status',
      ],
      enabled_features: [
        'left_toolbar',
        'hide_left_toolbar_by_default',
      ],
      time_frames: [],
      overrides: {
        // ======整体背景以及刻度线======
        'volumePaneSize': 'medium', // large, medium, small, tiny
        'symbolWatermarkProperties.color': 'rgba(0,0,0,0)', // 水印的主要配置
        'paneProperties.background': theme.background,
        'paneProperties.vertGridProperties.color': theme.vertGridProperties,
        'paneProperties.backgroundType': 'solid', // or 'gradient'
        'paneProperties.horzGridProperties.color': theme.horzGridProperties, // 纵轴刻度线颜色
        'paneProperties.horzGridProperties.style': 0,
        'paneProperties.crossHairProperties.color': theme.crossHairProperties, // 十字线颜色
        'paneProperties.crossHairProperties.width': 1,
        'paneProperties.crossHairProperties.style': 2,
        'scalesProperties.fontSize': 11,
        'scalesProperties.lineColor' : theme.lineColor, // x轴 y轴颜色
        'scalesProperties.textColor': theme.textColor, // x轴 y轴文字颜色

        'mainSeriesProperties.style': 1,
        'mainSeriesProperties.showCountdown': true, // 是否展示倒计时
        'mainSeriesProperties.visible':true,
        'mainSeriesProperties.showPriceLine': true,
        'mainSeriesProperties.priceLineWidth': 1, // 当前价格横线宽度
        'mainSeriesProperties.priceLineColor': '', // 当前价格横线颜色

        'mainSeriesProperties.candleStyle.upColor': theme.upColor, // 蜡烛填充色
        'mainSeriesProperties.candleStyle.downColor': theme.downColor, // 蜡烛填充色
        'mainSeriesProperties.candleStyle.borderUpColor': theme.borderUpColor, // 蜡烛边框色
        'mainSeriesProperties.candleStyle.borderDownColor': theme.borderDownColor, // 蜡烛边框色
        'mainSeriesProperties.candleStyle.wickUpColor': theme.wickUpColor, // 蜡烛竖线颜色
        'mainSeriesProperties.candleStyle.wickDownColor': theme.wickDownColor, // 蜡烛竖线颜色

        'paneProperties.legendProperties.showStudyValues': true,
        'paneProperties.legendProperties.showSeriesTitle': false, // 是否展示 合约名称
        'paneProperties.legendProperties.showSeriesOHLC': true,
        // 'paneProperties.legendProperties.showLegend': false,

      },
      studies_overrides: {
        'volume.volume.color.0': theme.volume0,
        'volume.volume.color.1': theme.volume1,
      },
		};

    this.tvWidget = new widget(widgetOptions);
    const tvWidget = this.tvWidget || {}
    const MA_LINES = [
      { time: 5, color: '#b9b9b9' },
      { time: 10, color: '#e0db1a' },
      { time: 30, color: '#c31ae0' }
    ]

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
        MA_LINES.forEach(item => {
          this.tvWidget.chart().createStudy(
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
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
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
        this.lastHistoryKlineTime = klineFormatData[0].time
        this.cacheData.onHistoryCallback(klineFormatData, { noData: false })
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
    const { webData } = this.state;
    const params = {
      reqType: 7,
      type: firstDataRequest ? 1 : 3, // 是否第一次加载历史
      param: {
        resolution: resolution === 'D' ? '1W' : resolution,
        klineId: webData.klineId, // 从数据来选择
        type: webData.type,
        limit: 50,
        endTime: parseInt(((firstDataRequest ? Date.now() : this.lastHistoryKlineTime) / 1000), 10),
      }
    }
    // this.props.ws.sendReq(params)
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(params)))
  }

  // 订阅实时点
  subscribeRealTimeData(resolution) {
    // 插件1W周期的resolution传入的字符串为'D',针对D进行特殊处理
    const { webData, type } = this.state;
    const params = {
      reqType: 7,
      type: 2,
      param: {
        resolution: resolution === 'D' ? '1W' : resolution,
        klineId:  webData.klineId, // 从数据来选择
        type: webData.type,
        endTime: parseInt((Date.now() / 1000), 10)
      }
    }
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(params)))
  }

  setSymbolName(symbolName) {
    try {
      this.lastHistoryKlineTime = null
      this.tvWidget.chart().setSymbol(symbolName, this.resolution, () => {})
    } catch (e) {
      throw new Error(e)
    }
  }

  getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
    const { firstDataRequest } = periodParams;
    this.cacheData.onHistoryCallback = onHistoryCallback
    this.interval = resolution
    this.resolution = resolution === 'D' ? '1W' : resolution

    this.getHistoryKLineData(firstDataRequest, resolution)
  }

  subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID) {
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
		);
	}
}
