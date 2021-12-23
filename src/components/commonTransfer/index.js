import React, { Component } from 'react'
import { connect } from 'react-redux'
// import cs from 'classnames'
import { Input, Select } from 'antd'
import message from '@tenggouwa/message';
import { foFixed } from '@/assets/js/common';
import throttle from 'lodash/throttle';
import Button from '../commonButton'

import transfer from '../../assets/img/components/transfer.png';
import './index.scss'

const accountCoinSelectList = [
    {
        key: 2,
        value: '合约账户'
    },
    {
        key: 3,
        value: '法币账户'
    },
    {
        key: 4,
        value: '跟单账户'
    }
]
@connect(state => ({
    apis: state.apis,
    userAuth: state.userAuth,
    lang: state.lang,
}))
class CommonTransfer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TransferStyle: {
                position: 'absolute',
                top: '40%',
                left: '50%',
                width: '400px',
                height: '250px',
                marginLeft: '-200px',
                marginTop: '-125px',
            },
            changeVisable: false,
            availableAmount: '',
            seleFormcoins: 1, // 币种切换的值
            selectCoinsValue: [], // 获取可选币种列表
            numValue: '', // 划转数量
            accountCoinInp: '',
            accountCoinInpSelect: {
                key: 1,
                value: '币币账户',
            }, // 货种划转的值 / "从/至"
            transferBtnDisabel: true, // 控制划转弹窗按钮
            coinID: 1,
        }
        this.handleTransfer = throttle(this.handleTransfer, 1000)
    }
    componentWillMount() {
        this.queryGetCoinList()
        this.TransferInit()
    }

    componentWillReceiveProps(props) {
        if (props.visable !== this.props.visable) {
            // if (props.changeVisable) {
            //     this.setState({
            //         changeVisable: true
            //     })
            // }
            this.setState({
                accountCoinInp: accountCoinSelectList[Number(props.accountType)].key
            }, () => {
                this.getDifferentCoint(this.state.accountCoinInp, props.coinsVisable)
            })
        }
    }
    // 第一次进入获取跟单 / 法币的账户可用余额
    getDifferentCoint = async (accountCoinInp, flage) => {
        const { coinID } = this.state
        // const res = await this.props.apis.getCanUseMount({ assetId: coinID, assetType: flage ? 1 : accountCoinInp })
        const res = await this.props.apis.getCanUseMount({ assetId: coinID, assetType: flage ? 1 : accountCoinInp })
        if (res.code === 0) {
            this.setState({
                availableAmount: res.data,
                changeVisable: !flage
            })
        }
    }

    /**
     * 处理账户切换
     */
    handleFrom = async (value) => {
        const { coinID, changeVisable } = this.state
        const param = {
            assetId: coinID,
            assetType: value,
        }
        if (changeVisable) {
            const result = await this.props.apis.getCanUseMount(param)
            if (result.code === 0) {
                this.setState({
                    accountCoinInp: value,
                    availableAmount: result.data,
                })
            }
        }
        this.setState({
            numValue: '',
            accountCoinInp: value,
        })
    }
  
    /**
     * 处理币种切换
     */
    handleCoins = (value) => {
        this.setState({
            seleFormcoins: value
        })
    }

    // 处理划转切换
    handleTransfer = async () => {
        const { coinID, accountCoinInp, changeVisable } = this.state
        // 跟单 / 法币
        // const result = await this.props.apis.getCanUseMount({ assetId: coinID, assetType: !changeVisable ? 1 : accountCoinInp });
        const result = await this.props.apis.getCanUseMount({ assetId: coinID, assetType: changeVisable ? 1 : accountCoinInp });
        if (result.code === 0) {
            this.setState({
                availableAmount: result.data
            })
        }
        this.setState({
            changeVisable: !changeVisable,
            numValue: '',
            transferBtnDisabel: true
        })
    } 
    /**
     * 获取可划币种列表
     */
    queryGetCoinList = async () => {
        const result = await this.props.apis.getCanUseList()
        if (result.code === 0) {
            this.setState({
                selectCoinsValue: result.data
            })
        } else {
          message.error(result.msg);
        }
    }

    /**
     * 处理划转金额数量
     */
    handleTransferNum = (e) => {
        let inpValue = e.target.value
        this.setState({ numValue: inpValue.match(/^\d+(?:\.\d{0,2})?/) })
        const canuseNum = Number(this.state.availableAmount) // 当前可用资产
        if (!inpValue) {
            this.setState({ transferBtnDisabel: true })
        } else if (Number(inpValue) < 0.000001) {
            this.setState({ transferBtnDisabel: true })
            message.error('划转金额过小')
        } else if (Number(inpValue) > canuseNum) {
            message.error('超过最大可转出金额')
            this.setState({ transferBtnDisabel: true })
        } else {
            inpValue = inpValue.replace(/^()*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3') // 禁止输入八位以上的小数
            const REG = /^\d+(\.\d*)?$/ // eslint-disable-line
            if (!REG.test(inpValue)) return
            this.setState({
                transferBtnDisabel: false
            })
        }
    }

    // 处理划转数量不足填充
    handleComputer = () => {
        if (foFixed(Number(this.state.availableAmount), 2) <= 0) {
            this.setState({
                numValue: foFixed(Number(this.state.availableAmount), 2),
                transferBtnDisabel: true
            })
            message.error('可用余额不足')
        } else {
            this.setState({
                numValue: foFixed(Number(this.state.availableAmount), 2),
                transferBtnDisabel: false
            })
        }
    }

    /**
     * 划转弹出密码输入框
     */
    TransferConfirm = async () => {
        const inputval = this.state.numValue // 输入的数量
        const canuseNum = Number(this.state.availableAmount)
        // 币币账户 accountCoinInpSelect => 默认 accountCoinInp => 可选账户 seleFormcoins币种 可选
        const { accountCoinInp, seleFormcoins, accountCoinInpSelect } = this.state;
        // 输入框数量符合条件出现输入资金密码弹窗
        if ((inputval && Number(inputval) > 0 && Number(inputval) <= canuseNum)) {
            try {
                const param = {
                    // fromType: this.state.changeVisable ? Number(accountCoinInpSelect.key) : accountCoinInp,
                    // toType: this.state.changeVisable ? accountCoinInp : Number(accountCoinInpSelect.key),
                    fromType: this.state.changeVisable ? accountCoinInp : Number(accountCoinInpSelect.key),
                    toType: this.state.changeVisable ? Number(accountCoinInpSelect.key) : accountCoinInp,
                    amount: Number(inputval),
                    assetId: seleFormcoins
                }
                const ress = await this.props.apis.transferMoney(param)
                if (ress.code === 0) {
                    message.success('您可在资产记录页面跟踪状态')
                    this.handleCancel()
                }
            } catch (error) {
                message.error(error.message)
            }
            // }
        } else {
            message.error('可用余额不足')
            this.setState({ transferBtnDisabel: true })
        }
    }

    /**
     * 划转取消
     */
    handleCancel = () => {
        this.setState({
            transferBtnDisabel: true,
            numValue: '',
            accountCoinInp: accountCoinSelectList[0].key,
            coinID: 1, // TODO: 目前只能默认传1
            changeVisable: false,
        }, () => this.props.cancel())
    }
    TransferInit() {
        // 如果没传宽度和高度，就显示默认的宽度400高度250
        if (this.props.width && this.props.height) {
            this.setState({
                TransferStyle: {
                    top: '20px',
                    left: '0',
                    width: `${this.props.width}px`,
                    height: `${this.props.height}px`,
                }
            })
        }
    }
    render() {
        const {
            selectCoinsValue,
            changeVisable,
            accountCoinInp,
            accountCoinInpSelect,
            availableAmount,
            numValue,
            transferBtnDisabel
        } = this.state
        if (!this.props.visable) return false
        return (
            <div>
                {
                    this.props.visable === true ?
                        <div className="transfer">
                            <div style={this.state.TransferStyle} className="TransferPop">
                                <div style={this.props.TransferStyle}>
                                    <div className="transferModel-box">
                                        <div className="transfer-header">
                                              <h2 className="transfer-title">划转</h2>
                                              {
                                                  this.props.type === 'primary' ?
                                                      null
                                                      :
                                                      <i className="iconfont icon-cancel01" onClick={this.handleCancel} />
                                              }
                                        </div>
                                        <div className="flow">
                                             <div className="transfer-direction">
                                                <p className="transfer-text"><i />从</p>
                                                <div className="transfer-from">
                                                    <p className="transfer-icon"><i className="left_raduis" /></p>
                                                        {
                                                            changeVisable ? (
                                                                <Select defaultValue={accountCoinInp} style={{ width: '85%' }} className="flow-inp-select" onChange={this.handleFrom}>
                                                                    {
                                                                        accountCoinSelectList.map((item) => (
                                                                            <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            ) : (<Input className="flowInp" type="text" value={accountCoinInpSelect.value} disabled />)
                                                        }
                                                </div>
                                                <div className="transfer-change">
                                                    <p><img src={transfer} className={`${changeVisable ? 'transferRoate0' : 'transferRoate180'}`} onClick={this.handleTransfer} /></p>
                                                    <p>至</p>
                                                </div>
                                                <div className="transfer-from">
                                                    <p className="transfer-icon"><i className="right_raduis" /></p>
                                                    {
                                                        changeVisable ?
                                                            (<Input className="flowInp" type="text" value={accountCoinInpSelect.value} disabled />) : (
                                                                <Select defaultValue={accountCoinInp} style={{ width: '85%' }} className="flow-inp-select" onChange={this.handleFrom}>
                                                                    {
                                                                        accountCoinSelectList.map((item) => (
                                                                            <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flow">
                                            <span className="label">币种</span>
                                            <Select size="large" defaultValue="USDT" style={{ width: '100%' }} className="flow-inp-select" onChange={this.handleCoins}>
                                                {
                                                    selectCoinsValue.length > 0 ? selectCoinsValue.map(item => (<Select.Option value={item.assetId} key={item.assetId}>{item.assetName}</Select.Option>)) : null
                                                }
                                            </Select>
                                        </div>
                                        <div className="flow">
                                            <span className="label">划转数量</span>
                                            <div className="transfer-group">
                                                <Input
                                                    type="text"
                                                    className="flow-inp-num"
                                                    value={numValue}
                                                    style={{ border: 'none' }}
                                                    onChange={this.handleTransferNum}
                                                />
                                                <div className="addon">
                                                    <span className="addonCoins">USDT</span>｜<span className="addonAll" onClick={this.handleComputer}>全部</span>
                                                </div>
                                            </div>
                                            <p className="convertible-num">可转{availableAmount ? foFixed(Number(availableAmount), 4) : ''} USDT</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="transfer-btn-footer">
                                    {
                                        !this.props.btnStyle ?
                                            <Button type="primary" disabled={transferBtnDisabel} className={transferBtnDisabel ? 'btnPrimary' : 'btn-transfer'} onClick={this.TransferConfirm}>确认</Button>
                                            :
                                            (<Button type="primary" disabled={transferBtnDisabel} className={transferBtnDisabel ? 'btnPrimary-contact' : 'btnStyle-contact'} onClick={this.TransferConfirm}>确认</Button>)
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}
export default CommonTransfer