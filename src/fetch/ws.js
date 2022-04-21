function createWebSocket(url) {
  const isTest = window.location.protocol === 'http:'
  const wsProtocol = isTest ? 'ws' : 'wss'


  return () => {
      const BrowserWebSocket = window.WebSocket || window.MozWebSocket
      const ws = new BrowserWebSocket(`${wsProtocol}://${location.host}/mapi/${url}`)
      return ws
  }
}

export default {
  createWs: createWebSocket('websocket')
}
