/* eslint-disable */
import React from 'react'
import { Datafeeds, extraConfig } from './datafees'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { chooseContractName } from '@/assets/js/common'
import { widget } from '../../../static/TradingView/charting_library';
import './index.scss'

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

@withRouter
@connect(state => ({
    apis: state.apis,
    theme: state.theme,
    usdkData: state.usdkData,
    contractData: state.contractData,
    lang: state.lang,
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
	tvWidget = null;

  componentWillReceiveProps(props) {
    if (props.type === '2' && props.usdkData && props.usdkData !== this.props.usdkData) {
      this.tradePricePrecision = props.usdkData.usdkTradePricePrecision
      if (this.tvWidget) {
        this.setSymbolName(props.usdkData.assetName)
        return
      }
      this.initTradingview(props)
    }
    if (props.type === '1' && props.contractData && props.contractData !== this.props.contractData) {
      // console.log(22222, this.tvWidget);
      this.tradePricePrecision = props.contractData.contractTradePricePrecision
      if (this.tvWidget) {
        this.setSymbolName(this.filterContractName(props))
        return
      }
      this.initTradingview(props)
    }
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

  filterContractName = ({ contractData, lang }) => {
    const isContract = contractData.contractType === 3
    return chooseContractName(lang, isContract, contractData.symbol, contractData.contractName)
  }
  
	initTradingview (props) {
    console.log(1111);
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
      symbol: props.type === '2' ? props.usdkData.assetName : this.filterContractName(props),
      datafeed: Object.assign({}, Datafeeds, extraConfig(this)),
      interval: this.resolution,
      container_id: 'tv_chart_container',
      library_path: '/static/TradingView/charting_library/',
      timezone: 'Asia/Shanghai',
      // exchange: 'ultrdax',
      // custom_css_url: 'css/tradingview_night.css',
      locale: tvLang,
      fullscreen: false,
      autosize: true,
      theme: 'Dark',
      // toolbar_bg: '#12192E',
      toolbar_bg: '#131722',
      disabled_features: [
        'Legend_widget',
        'main_series_scale_menu',
        'chart_crosshair_menu',
        'remove_library_container_border',
        'adaptive_logo',
        'hide_resolution_in_legend',
        'edit_buttons_in_legend',
        'timeframes_toolbar',
        'go_to_date',
        'volume_force_overlay',
        // 'create_volume_indicator_by_default_once',
        // 'create_volume_indicator_by_default',
        'header_symbol_search',
        'header_undo_redo',
        'caption_button_text_if_possible',
        'header_resolutions',
        'header_interval_dialog_button',
        'show_interval_dialog_on_key_press',
        'header_compare',
        'header_screenshot',
        'header_saveload'
      ],
      enabled_features: [
        'left_toolbar',
        'hide_left_toolbar_by_default'
      ],
      overrides: {
        // ======整体背景以及刻度线======
        'volumePaneSize': 'medium', // large, medium, small, tiny
        // 'symbolWatermarkProperties.transparency': 90, // 水印的主要配置
        'symbolWatermarkProperties.color': 'rgba(0,0,0,0)', // 水印的主要配置
        // 'paneProperties.background': '#020E25',
        'paneProperties.background': '#131722',
        'paneProperties.vertGridProperties.color': '#363c4e',
        'paneProperties.horzGridProperties.color': '#363c4e',
        'paneProperties.backgroundType': 'solid', // or 'gradient'
        'paneProperties.horzGridProperties.color': "#252a38", // 纵轴刻度线颜色
        'paneProperties.horzGridProperties.style': 0,
        'paneProperties.crossHairProperties.color': "#252a38", // 横轴刻度线颜色
        'paneProperties.crossHairProperties.width': 1,
        'paneProperties.crossHairProperties.style': 0,

        'scalesProperties.fontSize': 11,
        'scalesProperties.lineColor' : "#31384a", // x轴 y轴颜色
        'scalesProperties.textColor': '#C5CDE1', // x轴 y轴文字颜色

        'mainSeriesProperties.style': 1,
        'mainSeriesProperties.showCountdown': true, // 是否展示倒计时
        'mainSeriesProperties.visible':true,
        'mainSeriesProperties.showPriceLine': true,
        'mainSeriesProperties.priceLineWidth': 1, // 当前价格横线宽度
        'mainSeriesProperties.priceLineColor': '', // 当前价格横线颜色

        'mainSeriesProperties.candleStyle.upColor': "#63C9A2", // 蜡烛填充色
        'mainSeriesProperties.candleStyle.downColor': "#FC4E56", // 蜡烛填充色
        'mainSeriesProperties.candleStyle.borderUpColor': "#63C9A2", // 蜡烛边框色
        'mainSeriesProperties.candleStyle.borderDownColor': "#FC4E56", // 蜡烛边框色
        'mainSeriesProperties.candleStyle.wickUpColor': "#63C9A2", // 蜡烛竖线颜色
        'mainSeriesProperties.candleStyle.wickDownColor': "#FC4E56", // 蜡烛竖线颜色

      },
      studies_overrides: {
        'volume.volume.color.0': '#FC4E56',
        'volume.volume.color.1': '#63C9A2',
      },
		};

    // this.tvWidget = new TradingView.widget(widgetOptions)
    this.tvWidget = new widget(widgetOptions);
    const tvWidget = this.tvWidget || {}
    const { resolution } = this

    const createButton = (buttons) => {
      for (let i = 0; i < buttons.length; i += 1) {
        (function(button) {
          const btn = tvWidget.createButton({ align: 'left' })
          btn.textContent = button.title
          // btn.classList.add('mydate')
          btn.parentNode.parentNode.classList.add('btn');
          if (button.resolution === resolution) {
            btn.classList.add('active')
            btn.style.color = '#1976d2'
          }
          btn.addEventListener('click', (e) => {
            if (btn.className.indexOf('active') > -1) return false
            const current = e.currentTarget.parentNode.parentNode.parentElement.childNodes
            for (let index of current) {
              if (index.className.indexOf('btn') > -1) {
                const childNode = index.childNodes[0].childNodes[0]
                if (childNode.className.indexOf('active') > -1) {
                  childNode.className = childNode.className.replace('active', '')
                  childNode.style.color = '#b2b5be'
                }
              }
            }
            btn.className = `${btn.className} active`
            btn.style.color = '#1976d2'
            tvWidget.chart().setResolution(button.resolution, function onReadyCallback() {})
          });
        })(buttons[i])
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

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
        createButton(buttons)
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
      this.tvWidget.chart().setSymbol(symbolName, () => {})
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
