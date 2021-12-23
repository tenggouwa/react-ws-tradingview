import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import message from '@tenggouwa/message';

import "./index.scss";
import AssetsData from '../assetsData';
import CommonTableList from '@/components/commonTableList';
import CommonRecharge from '@/components/commonRecharge';
import CommonWithdraw from '@/components/commonWithdraw';
import CommonTransfer from '@/components/commonTransfer';

let paramAryfresh
let paramsRecharge
@withRouter
@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  appDownLoad: state.appDownLoad,
  userAuth: state.userAuth,
  wsObj: state.wsObj,
  sendWs: state.sendWs,
  wsData: state.wsData,
  wsConnet: state.wsConnet,
}))

export default class CoinAccount extends Component {
  constructor() {
    super()
    this.state = {
      visible: false, // 充值
      withVisible: false, // 提现
      transferVisable: false, // 划转
      coinList: [], // 充值
      // withdrawExtra: '',
      totalValuation: {},
      isWhiteList: null,
      mentionMoneyList: null, // 提现
      totalAllValuation: {},
      listAssetId: '', // 列表-币种assetId-充值
      withObj: {}, // 列表-提现内容
    }
  }

  componentDidMount() {
    this.queryGetCoinList();
    this.getAllAssets();
    this.getRechargeList();
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

      if (props.wsConnet === true && props.wsConnet !== this.props.wsConnet && paramsRecharge) {
        this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramsRecharge)))
      }
      if (props.wsData.ws_6) {
        if ((!this.props.wsData.ws_6 || props.wsData.ws_6 !== this.props.wsData.ws_6) && props.wsData.ws_6) {
          this.fetchDataWs(props.wsData.ws_6)
        }
      }
    }
  }

  componentWillUnmount() {
    const paramsList = {
      reqType: -5,
      type: 6,
    }
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramsList)))
    const paramAry = {
      reqType: -5,
      type: 24,
    }
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramAry)))
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

  // 获取币币账户列表
  getRechargeList = () => {
    const param = {
      reqType: 6,
      type: 1,
      sessionId: localStorage.sessionId || ''
    }
    paramsRecharge = param
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramsRecharge)))
  }

  // 充值-获取币种下拉
  queryGetCoinList = async () => {
    const result = await this.props.apis.queryWallet()
    if (result.code === 0) {
      const { item } = result.data;
      // const fliterRecharge = item.filter(a => a.depositEnabled)
      this.setState({
        coinList: item.sort((a, b) => a.assetId - b.assetId),
        // coinList: fliterRecharge.sort((a, b) => a.assetId - b.assetId),
        isWhiteList: result.data.isWhiteList,
      })
    } else {
      message.error(result.msg);
    }
  }

  // 提现
  showTranslation = async (record) => {
    if (record.assetId) {
      this.setState({
        withObj: record,
      })
    }
    try {
      const res = await this.props.apis.queryWallet()
      const { userAuth } = this.props;
      // if (res.code === 0) {
      if (res.code === 0 && userAuth.isFundPwdSet === true && userAuth.cardCheckStatus === 2) {
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
    } catch (error) {
      message.error(error.msg)
    }
  }

  closeWithdraw = () => {
    this.setState({
      withVisible: false,
      withObj: {},
    })
  }

  // 充值
  openRecharge = (item) => {
    if (item.assetId) {
      this.setState({
        listAssetId: item.assetId,
      })
    }
    this.setState({
      visible: true,
    })
  }

  handleClose = () => {
    this.setState({
      visible: false,
      listAssetId: '',
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

  submitTransfer = () => {
    this.setState({
      transferVisable: false,
    })
  }

  // 处理ws可用和冻结
  fetchDataWs = (data) => {
    const { coinList } = this.state;
    const dataSource = coinList.concat();
    const returnArr = [];
    dataSource.forEach(coinItem => {
      const arr = data.filter(dataItem => dataItem.assetId === coinItem.assetId);
      let obj = {};
      if (arr && arr.length > 0) {
        obj = arr[0];
      }
      const coinData = {
        ...coinItem,
        amount: obj.availableAmount || 0,
        lockedAmount: obj.lockedAmount || 0,
      }
      returnArr.push(coinData)
    });
    this.setState({
      coinList: returnArr,
    });
  }

  render() {
    const dataHeader = [{
      label: '币种',
      value: 'assetName',
    },
    {
      label: '可用',
      value: 'amount',
    },
    {
      label: '冻结',
      value: 'lockedAmount',
    }, {
      label: '操作',
      value: 'action',
      render: (item) => (
        isWhiteList ?
          <div className="dataHeader-btns">
            {
              item.depositEnabled ? (
                <div onClick={() => this.openRecharge(item)}>
                  充值
                </div>
              ) : null
            }
            {
              item.withdrawEnabled ? (
                <div onClick={() => this.showTranslation(item)} >
                  提现
                </div>
              ) : null
            }
            {
              item.assetName === 'USDT' ? (
                <div onClick={() => this.handleOpenTransfer(item)} >划转</div>
              ) : null
            }
            {/* {
              item.tradingPairId ? (
                <div>去交易</div>
              ) : null
            } */}
          </div> : null
      )
    }]
    const { visible, coinList, withVisible, listAssetId, withObj, isWhiteList, transferVisable, mentionMoneyList, totalAllValuation } = this.state;
    return (
      <div className="coinAccount">
        <AssetsData
          dataSource={totalAllValuation}
          recharge={this.openRecharge}
          withdraw={this.showTranslation}
          transfer={this.handleOpenTransfer}
        />
        <CommonTableList dataHeader={dataHeader} dataSource={coinList} />
        <CommonRecharge
          modalName="充值"
          visible={visible}
          dataSource={coinList}
          handleCancel={this.handleClose}
          listAssetId={listAssetId}
        />
        {/* 提币 */}
        <CommonWithdraw
          visable={withVisible}
          mentionMoneyList={mentionMoneyList}
          cancel={this.closeWithdraw}
          mentionMoney={withObj}
        />
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
