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
