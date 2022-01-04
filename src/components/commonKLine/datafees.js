const config = {
  session: '24x7',
  timezone: 'Asia/Shanghai',
  minmov: 1,
  minmov2: 0,
  // description: '',
  pointvalue: 1,
  volume_precision: 4,
  hide_side_toolbar: false,
  fractional: false,
  supports_search: false,
  supports_group_request: false,
  supported_resolutions: ['1', '5', '15', '30', '60', '240', '360', '1D', '1W'],
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true,
  has_intraday: true,
  intraday_multipliers: ['1', '5', '15', '30', '60', '240', '360', '1D', '1W'],
}

export const Datafeeds = {
  onReady: (cb) => {
      setTimeout(() => {
          cb(config)
      }, 0)
  },

  unsubscribeBars: () => {
  },

}

export function extraConfig(self) {
  return {
      getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
          self.getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback)
      },

      resolveSymbol: (symbolName, onSymbolResolvedCallback) => {
          const symbolInfo = {
              name: symbolName,
              ticker: symbolName,
              pricescale: 10 ** self.tradePricePrecision || 10000,
          }
          setTimeout(() => {
              onSymbolResolvedCallback(Object.assign({}, config, symbolInfo))
              // console.log('Resolving that symbol....', symbolInfo)
          }, 0)
      },

      subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID) {
          self.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID)
      },
  }
}

export const ThemeDark = {
  theme: 'Dark',
  toolbar_bg: '#131722',
  background: '#131722',
  vertGridProperties: '#363c4e',
  horzGridProperties: '#252a38',
  crossHairProperties: '#b2b5be',
  lineColor: '#31384a',
  textColor: '#C5CDE1',
  upColor: '#63C9A2',
  downColor: '#FC4E56',
  borderUpColor: '#63C9A2',
  borderDownColor: '#FC4E56',
  wickUpColor: '#63C9A2',
  wickDownColor: '#FC4E56',
  volume0: '#FC4E56',
  volume1: '#63C9A2'
}
export const ThemeWhite = {
  theme: '',
  toolbar_bg: '#fff',
  background: '#fff',
  vertGridProperties: '#EBF0F2',
  horzGridProperties: '#EBF0F2',
  crossHairProperties: '#b2b5be',
  lineColor: '#EBF0F2',
  textColor: '#707A8A',
  upColor: '#63C9A2',
  downColor: '#FC4E56',
  borderUpColor: '#63C9A2',
  borderDownColor: '#FC4E56',
  wickUpColor: '#63C9A2',
  wickDownColor: '#FC4E56',
  volume0: '#FC4E56',
  volume1: '#63C9A2'
}
