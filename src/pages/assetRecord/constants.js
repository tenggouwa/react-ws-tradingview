const ASSETS_TYPE = [{
  label: '充币记录',
  value: '0'
}, {
  label: '提现记录',
  value: '1'
}, {
  label: '划转记录',
  value: '2'
}, {
  label: '稳健区记录',
  value: '3'
}]

const WITH_STATUS = [{
  label: '充值',
  value: 1,
}, {
  label: '提现',
  value: 2,
}]

const STATUS_LIST = [{
  label: '审核中',
  value: 1,
}, {
  label: '审核失败',
  value: 2,
}, {
  label: '等待发送',
  value: 3,
}, {
  label: '未确认',
  value: 4,
}, {
  label: '已确认',
  value: 5,
}, {
  label: '失败',
  value: 6,
}, {
  label: '已取消',
  value: 7,
}]

const WALLET_LIST = [{
  label: '币币账户',
  value: 1,
}, {
  label: '合约账户',
  value: 2,
}, {
  label: '法币账户',
  value: 3,
}, {
  label: '跟单账户',
  value: 4,
}]
export {
  ASSETS_TYPE,
  STATUS_LIST,
  WITH_STATUS,
  WALLET_LIST
}