import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import message from '@tenggouwa/message';

import "./index.scss";
import AssetsData from '../assetsData';
import CommonTableList from '@/components/commonTableList';
import CommonRecharge from '@/components/commonRecharge';
import CommonWithdraw from '@/components/commonWithdraw';
import CommonTransfer from '@/components/commonTransfer';

let paramAryfresh;
let paramsFollow;
@withRouter
@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  appDownLoad: state.appDownLoad,
  wsObj: state.wsObj,
  sendWs: state.sendWs,
  wsData: state.wsData,
  wsConnet: state.wsConnet,
}))

export default class FollowAccount extends Component {
  constructor() {
    super()
    this.state = {
      visible: false, // 充值
      withVisible: false, // 提现
      transferVisable: false,  // 划转
      coinList: [],
      followData: null,
      withdrawExtra: '',
      totalAllValuation: {},
      mentionMoneyList: null, // 提现
    }
  }

  componentDidMount() {
    // this.queryFollowAssets();
    this.getAllAssets()
    this.getFollow()
  }

  componentWillReceiveProps(props) {
    if (props.userAuth === 0) return
    if (props.wsConnet === true && props.wsConnet !== this.props.wsConnet && paramAryfresh) {
      this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramAryfresh)))
    }
    if (props.wsData !== this.props.wsData) {
      if (props.wsData.ws_24) {
        if ((!this.props.wsData.ws_24 || props.wsData.ws_24 !== this.props.wsData.ws_24) && props.wsData.ws_24) {
          const { code, data } = props.wsData.ws_24
          if (code === 0) {
            this.setState({
              totalAllValuation: data,
            })
          }
        }
      }
    }
    if (props.wsConnet === true && props.wsConnet !== this.props.wsConnet && paramsFollow) {
      this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramsFollow)))
    }
    if (props.wsData.ws_18) {
      if ((!this.props.wsData.ws_18 || props.wsData.ws_18 !== this.props.wsData.ws_18) && props.wsData.ws_18) {
        const { item } = props.wsData.ws_18
          this.setState({
            followData: item,
          })
      }
    }
  }

  componentWillUnmount() {
    const paramAry = {
      reqType: -5,
      type: 24,
    }
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramAry)))
    const paramFollow = {
      reqType: -5,
      type: 18
    }
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramFollow)))
  }
  // 总资产币币和跟单通用
  getAllAssets = () => {
    const param = {
      reqType: 24,
      sessionId: localStorage.sessionId || ''
    }
    paramAryfresh = param
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramAryfresh)))
  }

  // 请求跟单账户
  getFollow = () => {
    const params = {
      reqType: 18,
      sessionId: localStorage.sessionId || '',
      param: {
        exchangeRateType: 1
      }
    }
    paramsFollow = params
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramsFollow)))
  }

  // 充值-跟单资产
  queryFollowAssets = async () => {
    const params = { exchangeRateType: 2 }
    const result = await this.props.apis.fetchFollowAssets(params)
    if (result.code === 0) {
      const { item, totalAmount, exchangeTotalAmount } = result.data;
    } else {
      message.error(result.msg);
    }
  }

  // 提现
  showTranslation = async () => {
    try {
      const res = await this.props.apis.queryWallet()
      if (res.code === 0) {
        // if (res.code === 0 && this.props.userAuth.isFundPwdSet === true) {
        const { item } = res.data;
        if (item.length > 0) {
          const fliterMention = item.filter(it => it.withdrawEnabled)
          this.setState({
            mentionMoneyList: fliterMention,
            withVisible: true
          })
        }
      } else {
        message.error('交易前请先设置资金密码')
      }
    } catch (e) {
      message.error(e.msg)
    }
  }

  closeWithdraw = () => {
    this.setState({
      withVisible: false,
    })
  }

  // 划转
  handleOpenTransfer = () => {
    this.setState({
      transferVisable: true,
    })
  }

  closeTransfer = () => {
    this.setState({
      transferVisable: false,
    })
  }

  // 充值
  openRecharge = () => {
    this.setState({
      visible: true,
    })
  }

  handleClose = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const dataHeader = [{
      label: '币种',
      value: 'assetName',
    }, {
      label: '总资产',
      value: 'totalAmount',
    }, {
      label: '可用',
      value: 'canUseAmount',
    }, {
      label: '冻结',
      value: 'lockAmount',
    }, {
      label: '跟单金额',
      value: 'followAmount',
    }, {
      label: '我的佣金',
      value: 'commissionAmount',
    }, {
      label: '操作',
      value: 'action',
      render: (item) => (
        (
          // item.WhiteList ?
          <div className="dataHeader-btns">
            {
              item.depositEnabled ? (
                <div
                  onClick={() => this.openRecharge(item)}
                >
                  充值
                </div>
              ) : null
            }
            {
              item.withdrawEnabled ? (
                <div
                  onClick={() => this.showTranslation(item)}
                >
                  提现
                </div>
              ) : null
            }
            {
              item.assetName === 'USDT' ? (
                <div
                  onClick={() => { this.handleOpenTransfer(item) }}
                >
                  划转
                </div>
              ) : null
            }
            {/* {
                item.tradingPairId ? (
                  <div
                  // onClick={() => { this.handleTodeal(record) }}
                  >
                    去交易
                  </div>
                ) : null
              } */}
            {/* </div> : null */}
          </div>
        )
      )
    }]
    const { visible, followData, withVisible, transferVisable, mentionMoneyList, totalAllValuation } = this.state
    return (
      <div className="followAccount">
        <AssetsData
          dataSource={totalAllValuation}
          recharge={this.openRecharge}
          withdraw={this.showTranslation}
          transfer={this.handleOpenTransfer}
        />
        <CommonTableList dataHeader={dataHeader} dataSource={followData || []} />
        {/* <CommonRecharge
          modalName="充值"
          visible={visible}
          dataSource={followData || []}
          handleCancel={this.handleClose}
        /> */}
        {/* 提币 */}
        {/* <CommonWithdraw
          visable={withVisible}
          mentionMoneyList={mentionMoneyList}
          cancel={this.closeWithdraw}
        /> */}
        {/* 划转 */}
        <CommonTransfer
          visable={transferVisable}
          width="520px"
          height="auto"
          accountType="2"
          btnStyle
          coinsVisable
          changeVisable
          cancel={this.closeTransfer}
        />
      </div>
    )
  }
}
