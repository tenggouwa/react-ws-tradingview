import { connect } from 'react-redux';
import React from 'react';
// import cs from 'classnames';
import { Select, Input, Form } from 'antd';
import { Link } from 'react-router-dom';
import message from '@tenggouwa/message';
import Button from '../commonButton'

import { chooseLang, foFixed } from '@/assets/js/common';
import bigdecimal from 'bigdecimal';
import securty from '../../assets/js/security';
import './index.scss';

function caleNum(data, num) {
    // const r = foFixed(Number(data), num)
    return foFixed(Number(data), num);
}
@connect((state) => ({
    apis: state.apis,
    userAuth: state.userAuth,
    lang: state.lang,
}))
class CommonWithdraw extends React.Component {
    constructor() {
        super();
        this.state = {
            MentionMoneyStyle: {},
            Radiovalue: 0,
            dataTable: [], // 币种列表
            dataDefaultAssetId: null, // 币种初始化默认值
            assetNameMention: '', // 币种初始名称
            dnetwork: [],
            aboutFee: {}, // 获取tips
            networkName: '',
            // mentionMoneyAddress: [], // 提币地址
            fee: 0, // 手续费
            amount: 0, // 可转数量
            numInput: null,
            numInputAmount: 0,
            mentionAddress: '',
            numError: '', // 单次提额错误提示
            changeCard: true, // 切换卡片
            codeInput: '', // 短信
            passwordtInput: '', // 密码
            wait: 0, // 倒计时时间设置
            sendCodeLoading: false,
            // minFee: '', // 最小的费值
            // maxFee: '', // 最大的费值
            loading: false, // 加载状态
            resetSend: null, // 定时器清空（传提币
            errorTxt: '', // 资金密码/短信验证码 错误提示
            mentionMoneyObj: null, // 判断不同地方打开弹窗内容
            errorAddress: false,
            currentIndex: null,
            codeError: '',
            minPer: '',
        };
    }
    componentDidMount() {
        if (this.props.userAuth) {
            this.setState({
                currentIndex: 1,
                codeError: '请输入6位邮箱验证码',
                // currentIndex: this.props.userAuth.isPhoneAuth ? 2 : 1,
                // codeError: this.props.userAuth.isPhoneAuth
                //     ? '请输入6位短信验证码'
                //     : '请输入6位邮箱验证码',
            });
        }
    }
    componentWillReceiveProps(props) {
        if (this.props.visable !== props.visable && props.visable) {
            // 判断是从列表还是单独按钮点击
            if (JSON.stringify(props.mentionMoney) !== '{}') {
                const { assetId, dnetwork, assetName, amount, withdrawAmountMaxDecimalPlaces } =
                    props.mentionMoney;
                this.setWithDrawFee(assetName, dnetwork[0]);
                this.setState({
                    mentionMoneyObj: props.mentionMoney,
                    dataTable: [props.mentionMoney],
                    dataDefaultAssetId: assetId,
                    networkName: dnetwork[0],
                    dnetwork,
                    assetNameMention: assetName,
                    amount,
                    minPer: withdrawAmountMaxDecimalPlaces,
                    MentionMoneyStyle: {
                        // position: 'absolute',
                        // top: '50%',
                        // left: '50%',
                        // width: '560px',
                        // height: `${
                        //     props.mentionMoney.assetId === 1 ? '668' : '560'
                        // }px`,
                        // marginLeft: `-${(560 / 2).toFixed(0)}px`,
                        // marginTop: `-${(
                        //     (props.mentionMoney.assetId === 1 ? 668 : 540) / 2
                        // ).toFixed(0)}px`,
                    },
                    loading: false,
                });
            } else if (props.mentionMoneyList !== this.props.mentionMoneyList) {
                const { mentionMoneyList } = props;
                const dataSource = mentionMoneyList.filter(item => item.withdrawEnabled);
                const itemSort = dataSource.sort(
                    (a, b) => a.assetId - b.assetId
                );
                let dataUsdtNetwork;
                let dataUsdtAssetId;
                let canUseAmount;
                let minPer;
                dataSource.forEach((item) => {
                    if (item.assetName === 'USDT') {
                        dataUsdtNetwork = item.dnetwork;
                        dataUsdtAssetId = item.assetId;
                        canUseAmount = item.amount;
                        minPer = item.withdrawAmountMaxDecimalPlaces;
                    }
                });
                this.setWithDrawFee(itemSort[0].assetName, dataUsdtNetwork[0]);
                this.setState(
                    {
                        dataTable:
                            itemSort && itemSort.length > 0 ? itemSort : [],
                        assetNameMention: itemSort[0].assetName,
                        dnetwork: dataUsdtNetwork,
                        networkName: dataUsdtNetwork[0],
                        dataDefaultAssetId: dataUsdtAssetId,
                        amount: canUseAmount,
                        minPer
                    },
                    () => this.handleStyle()
                );
            }
        }
    }
    // 处理样式更新变化
    handleStyle = () => {
        this.setState({
            MentionMoneyStyle: {
            },
        });
    };
    // 清除时间
    clearTimeout() {
        if (this.setTimeout) {
            clearTimeout(this.setTimeout);
        }
        this.setState({
            wait: 0,
        });
    }
    // 点击取消关闭
    handleCancle = () => {
        this.props.cancel();
        this.setState(
            {
                changeCard: true,
                numInput: '',
                passwordtInput: '',
                codeInput: '',
                assetNameMention: '',
                numError: '',
                mentionAddress: '',
                networkName: '',
                mentionMoneyObj: null,
                dnetwork: '',
                Radiovalue: 0,
                numInputAmount: null,
                fee: null,
            },
            () => this.handleStyle()
        );
    };
    // 获取提币tips金额
    setWithDrawFee = async (assetName, network) => {
        const response = await this.props.apis.getWithdrawFee({
            assetName,
            network,
        });
        if (response.code === 0) {
            const { fixedFeeAmount } = response.data;
            this.setState({
                loading: true,
                aboutFee: response.data,
                fee: fixedFeeAmount,
            });
        }
    };
    // 处理币种切换
    handleCoinsChange = (selectVal) => {
        const { dataTable, aboutFee } = this.state;
        let assetNameOut;
        let dnetworkOut;
        let fee = '';
        let minPer = '';
        let canUseAmount = '';
        const { fixedFeeAmount } = aboutFee;
        dataTable.forEach(item => {
            if (item.assetId === selectVal) {
                assetNameOut = item.assetName;
                dnetworkOut = item.dnetwork;
                canUseAmount = item.amount;
                minPer = item.withdrawAmountMaxDecimalPlaces;
            }
        })
        this.setWithDrawFee(assetNameOut, dnetworkOut[0]);
        // this.getMentionAddress(selectVal)
        if (fixedFeeAmount) {
            fee = fixedFeeAmount;
        }
        this.setState({
            loading: false,
            dataDefaultAssetId: selectVal,
            assetNameMention: assetNameOut,
            networkName: dnetworkOut[0],
            minPer,
            fee,
            amount: canUseAmount,
            MentionMoneyStyle: {
                position: 'absolute',
            },
            numInput: '',
            numError: '',
            mentionAddress: '',
            numInputAmount: '',
            // minPer: '',
            Radiovalue: 0,
        });
    };
    // 链名称切换
    hanldeRadioChange = (index) => {
        // const { value } = item.target;
        const { dnetwork, assetNameMention } = this.state;
        const Newnetwork = dnetwork[index];
        this.setState({
            Radiovalue: index,
            networkName: Newnetwork,
            loading: false,
            numInput: '',
            mentionAddress: '',
            numInputAmount: '',
            // minPer: '',
        });
        this.setWithDrawFee(assetNameMention, Newnetwork);
    };
    // 监听提币地址
    handleMentionAddress = async (flage, val) => {
        const { value } = val.target;
        let mentionAddress;
        if (flage) {
            mentionAddress = val;
        } else {
            mentionAddress = value;
        }
        this.setState({
            mentionAddress
        });
    };

    // 失焦处理提币地址校验
    handleBlurFront = (val) => {
      const { value } = val.target;
      this.checkAddress(value);
    }

    // 校验提币地址
    checkAddress = (value) => {
      const { networkName, assetNameMention } = this.state;
      let errText = '请输入正确地址格式';
      const len = value.length;
      if (networkName === 'ERC20' || assetNameMention === 'ETH') {
        if (value.startsWith('0x') && (len === 40 || len === 42)) {
          this.setState({
            mentionAddress: value,
          })
        } else {
          message.error(errText)
          return false;
        }
      }
      if (networkName === 'TRC20') {
        if (value.startsWith('T')) {
          this.setState({
            mentionAddress: value,
          })
        } else {
          message.error(errText)
          return false;
        }
      }
      if (networkName === 'OMNI' || assetNameMention === 'BTC') {
        if ((value.startsWith('1') || value.startsWith('2') || value.startsWith('3')) && (len >=26 && len <=35)) {
          this.setState({
            mentionAddress: value,
          })
        } else {
          message.error(errText)
          return false;
        }
      }
    }

    // 失焦处理提币地址校验
    // handleBlur = async (val) => {
    //     const { value } = val.target;
    //     const { assetNameMention, networkName } = this.state;
    //     const params = {
    //         assetName: assetNameMention,
    //         network: networkName,
    //         toAddress: value,
    //     };
    //     const res = await this.props.apis.checkAddress(params);
    //     if (res.code === 0) {
    //         this.setState({
    //             mentionAddress: value,
    //             errorAddress: true,
    //         });
    //     } else {
    //         this.setState({
    //             errorAddress: false,
    //         });
    //     }
    // };
    // 监听提币数量
    handleMentionNum = (val) => {
        const { value } = val.target;
        const { assetNameMention, dataTable, aboutFee, minPer } = this.state;
        const { userAuth } = this.props;
        // let minFee;
        // let maxFee;
        let errorTxt;
        const { withKYCVerifyWithdrawAmount, withoutKYCVerifyWithdrawAmount } =
            dataTable.find((ele) => ele.assetName === assetNameMention);
        const minFee = aboutFee.minWithdrawFeeStandard;
        const maxFee = userAuth.cardCheckStatus === 2 ? withKYCVerifyWithdrawAmount : withoutKYCVerifyWithdrawAmount;
        if (value) {
            if (Number(value) < Number(minFee) || value > Number(maxFee)) {
                errorTxt = `${'单次提币限额'}${minFee} ~ ${maxFee}`;
            } else {
                errorTxt = '';
            }
            let minPerNum = minPer.split('.')[1].length;
            const minT = value.match(/^\d+(?:\.\d{0,2})?/);
            const minF = value.match(/^\d+(?:\.\d{0,4})?/);
            const minE = value.match(/^\d+(?:\.\d{0,8})?/);
            if (minPerNum === 8) {
              this.setState({
                numInput: minE,
                numInputAmount: minE,
              })
            } else if (minPerNum === 4) {
              this.setState({
                numInput: minF,
                numInputAmount: minF,
              })
            } else {
              this.setState({
                numInput: minT,
                numInputAmount: minT,
              })
            }
            this.setState({
                numError: errorTxt,
            });

        } else {
            this.setState({
                numInput: '',
            });
        }
    };
    // 处理全部可转数量
    handleComputer = () => {
        const { amount, dataTable, aboutFee, assetNameMention } = this.state;
        const { userAuth } = this.props;
        let errorTxt;
        const { withKYCVerifyWithdrawAmount, withoutKYCVerifyWithdrawAmount } =
            dataTable.find((ele) => ele.assetName === assetNameMention);
        const minFee = aboutFee.minWithdrawFeeStandard;
        const maxFee =
            userAuth.cardCheckStatus === 2
                ? withKYCVerifyWithdrawAmount
                : withoutKYCVerifyWithdrawAmount;
        if (amount < Number(minFee) || amount > Number(maxFee)) {
            errorTxt = `${'单次提币限额'}${minFee} ~ ${maxFee}`;
        } else {
            errorTxt = '';
        }
        this.setState({
            numInput: amount,
            numError: errorTxt,
        });
    };
    // 下一步按钮
    nextPlay = () => {
        const { mentionAddress, numInput, numError, errorAddress, amount, assetNameMention, networkName } =
            this.state;
        // if (!errorAddress) {
        //     message.error('输入地址校验失败 - 101300');
        //     return;
        // }
        if(mentionAddress) {
          let errText = '请输入正确地址格式';
          const len = mentionAddress.length;
          if (networkName === 'ERC20' || assetNameMention === 'ETH') {
            if (mentionAddress.startsWith('0x') && (len === 40 || len === 42)) {
              this.setState({
                mentionAddress,
              })
            } else {
              message.error(errText)
              return false;
            }
          }
          if (networkName === 'TRC20') {
            if (mentionAddress.startsWith('T')) {
              this.setState({
                mentionAddress
              })
            } else {
              message.error(errText)
              return false;
            }
          }
          if (networkName === 'OMNI' || assetNameMention === 'BTC') {
            if ((mentionAddress.startsWith('1') || mentionAddress.startsWith('2') || mentionAddress.startsWith('3')) && (len >=26 && len <=35)) {
              this.setState({
                mentionAddress,
              })
            } else {
              message.error(errText)
              return false;
            }
          }
        }
        if (!mentionAddress) {
            message.error('请输入提币地址');
            return;
        }
        if (!numInput[0]) {
            message.error('请输入提币数量');
            return;
        }
        if (Number(numInput[0]) > Number(amount)) {
            message.error('可转余额不足');
            return;
        }
        if (numError) {
            return;
        }
        this.setState({
            changeCard: false,
            MentionMoneyStyle: {
            },
        });
    };
    // 处理资金密码
    handleMoneypassword = (val) => {
        const { value } = val.target;
        if (value) {
            this.setState({
                passwordtInput: value,
                errorTxt: '',
            });
        } else {
            this.setState({
                passwordtInput: '',
                errorTxt: '',
            });
        }
    };
    renderCode = () => {
        const { userAuth: { isEmailAuth, isPhoneAuth } } = this.props;
        if (isEmailAuth && isPhoneAuth) {
            return (
                <div className="code-box">
                    {/* <span
                        className={`label ${
                            this.state.currentIndex === 2 ? 'active' : null
                        }`}
                        onClick={() => this.handleCodeTab(2)}
                    >
                        短信验证码
                    </span> */}
                    {/* <span className="lable-line">|</span> */}
                    <span
                        className={`label ${
                            this.state.currentIndex === 1 ? 'active' : null
                        }`}
                        onClick={() => this.handleCodeTab(1)}
                    >
                        邮箱验证码
                    </span>
                </div>
            );
        } 
        // if (!isEmailAuth && isPhoneAuth) {
        //     return (
        //         <div className="code-box">
        //             <span
        //                 className={`label ${
        //                     this.state.currentIndex === 2 ? 'active' : null
        //                 }`}
        //                 onClick={() => this.handleCodeTab(2)}
        //             >
        //                 短信验证码
        //             </span>
        //         </div>
        //     );
        // }
         if (isEmailAuth && !isPhoneAuth) {
            return (
                <div className="code-box">
                    <span
                        className={`label ${
                            this.state.currentIndex === 1 ? 'active' : null
                        }`}
                        onClick={() => this.handleCodeTab(1)}
                    >
                        邮箱验证码
                    </span>
                </div>
            );
        }
    };
    handleCodeTab = (idx) => {
        this.setState({
            currentIndex: idx,
            codeError:
                // idx === 2 ? '请输入6位短信验证码' : '请输入6位邮箱验证码',
                idx === 1 ? '请输入6位邮箱验证码' : '',
        });
    };
    // 处理短信验证码
    handleCode = (code) => {
        const { value } = code.target;
        if (value) {
            this.setState({
                codeInput: value,
            });
        } else {
            this.setState({
                codeInput: '',
                errorTxt: '',
            });
        }
    };
    async sendCodeHandler() {
        const { currentIndex } = this.state;
        try {
            const res = await this.props.apis.sendCode({
                verifyType: currentIndex,
                templateType: 1,
                language: chooseLang(this.props.lang),
            });
            if (res.code === 0) return true;
        } catch (error) {
            message.error(error.message);
        }
        return false;
    }
    // 发送短信验证码
    SendCode = async () => {
        const { sendCodeLoading, wait } = this.state;
        if (sendCodeLoading || wait) {
            return;
        }
        this.setState({
            sendCodeLoading: true,
        });
        const r = await this.sendCodeHandler();
        this.state.sendCodeLoading = false;
        if (r) {
            this.setState({
                sendCodeLoading: false,
                wait: 60,
            });
            this.waitInterval();
        } else {
            this.setState({
                sendCodeLoading: false,
            });
        }
    };
    // 验证码倒计时
    waitInterval() {
        const { wait } = this.state;
        this.setTimeout = setTimeout(() => {
            if (wait > 0) {
                this.setState({
                    wait: wait - 1,
                });
                this.waitInterval();
            }
        }, 1000);
    }
    // 处理提交
    handleSubmit = async () => {
        const {
            assetNameMention, // 币种名称
            dataDefaultAssetId, // 币种id
            numInput, // 提币数量
            fee, // 手续费
            networkName, // 网格名称
            passwordtInput, // 资金密码
            codeInput, // 短信验证码
            mentionAddress, // 提币地址
        } = this.state;
        if (!passwordtInput) {
            this.setState({
                errorTxt: '请输入资金密码',
            });
            return;
        }
        if (!codeInput) {
            return;
        }
        const params = {
            assetId: dataDefaultAssetId,
            assetName: assetNameMention,
            toAddress: mentionAddress,
            amount: typeof numInput === 'object' ? numInput[0] : numInput,
            fee,
            emailCode: codeInput,
            // smsCode: codeInput,
            password: securty(0, passwordtInput),
            remark: null,
            memo: null,
            network: networkName,
        };
        this.setState({
            loading: true,
        });
        try {
            const res = await this.props.apis.withdraw(params);
            if (res.code === 0) {
                message.success('提币成功')
                this.props.cancel();
                this.setState({
                  changeCard: true,
                  assetNameMention: '', // 币种名称
                  dataDefaultAssetId: null, // 币种id
                  numInput: null, // 提币数量
                  fee: null, // 手续费
                  networkName: '', // 网格名称
                  passwordtInput: null, // 资金密码
                  codeInput: null, // 邮箱验证码
                  mentionAddress: '', // 提币地址
                })
                // if (res.data && res.data.isSuccess) {
                //     this.props.cancel();
                //     this.setState({
                //         resetSend: new Date().getTime(),
                //     });
                // } else {
                //     const errMsg = res.data.isVerify
                //         ? '单日最大提现额度'
                //         : '您未完成身份认证';
                //     message.error(
                //         `${errMsg} ${res.data.amount} ${res.data.assetName}`
                //     );
                // }
            }
        } catch (e) {
            message.error(e.msg);
        }
        this.setState({
            loading: false,
        });
    };
    render() {
        const {
            dataTable,
            dataDefaultAssetId,
            dnetwork,
            aboutFee,
            assetNameMention,
            fee,
            amount,
            numInput,
            numInputAmount,
            numError,
            changeCard,
            passwordtInput,
            codeInput,
            wait,
            resetSend,
            errorTxt,
            mentionMoneyObj,
            mentionAddress,
            loading,
            codeError,
            Radiovalue,
        } = this.state;
        // 确认按钮 =》 停止定时器调用
        if (resetSend !== null) {
            this.clearTimeout();
        }
        let minfixed;
        const { BigDecimal } = bigdecimal;
        if (dataTable.length > 0 && assetNameMention !== '') {
            const { withdrawAmountMaxDecimalPlaces } = dataTable.find(
                (ele) => ele.assetName === assetNameMention
            );
            minfixed = new BigDecimal(withdrawAmountMaxDecimalPlaces).scale();
            // eslint-disable-next-line
            // console.log('BigDecimal error test:', withdrawAmountMaxDecimalPlaces);
        }
        // 实时到账
        const actualAchievement = caleNum(numInputAmount - fee, minfixed);
        return (
            <div>
                {this.props.visable === true ? (
                    <div className="mentionMoney">
                        <div
                            style={this.state.MentionMoneyStyle}
                            className="MentionMoney"
                            // className={cs('MentionMoney', this.props.className)}
                        >
                            <div className="mentionMoney-title">
                                <h4 className="withdraw-title">提币</h4>
                                <i
                                    className="iconfont icon-cancel01"
                                    onClick={this.handleCancle}
                                />
                            </div>
                            {changeCard ? (
                                <div className="body-box">
                                    {/* 币种 */}
                                    <div className="mentionMoney-flow">
                                        <span className="label">币种</span>
                                        {mentionMoneyObj !== null ? (
                                            <Input
                                                className="flow-inp"
                                                disabled
                                                value={
                                                    mentionMoneyObj.assetName
                                                }
                                            />
                                        ) : (
                                            <Select
                                                size="large"
                                                style={{ width: '100%' }}
                                                defaultValue={
                                                    dataDefaultAssetId
                                                }
                                                className="flow-inp-select"
                                                onChange={
                                                    this.handleCoinsChange
                                                }
                                                getPopupContainer={(
                                                    triggerNode
                                                ) => triggerNode.parentNode}
                                            >
                                                {dataTable &&
                                                dataTable.length > 0
                                                    ? dataTable.map((item) => (
                                                        <Select.Option
                                                            key={item.assetId}
                                                            value={
                                                                item.assetId
                                                            }
                                                        >
                                                            {item.assetName}
                                                        </Select.Option>
                                                    ))
                                                    : null}
                                            </Select>
                                        )}
                                    </div>
                                    {/* 链名称 */}
                                    {dataDefaultAssetId === 1 ? (
                                        <div className="mentionMoney-flow">
                                            <span className="label">
                                                链名称
                                            </span>
                                            <div className="select-address">
                                              {dnetwork &&
                                              dnetwork.length > 0
                                                  ? dnetwork.map((item,index) => (
                                                  <p key={item} onClick={() => { this.hanldeRadioChange(index) }}>
                                                    {
                                                      index === Radiovalue ?
                                                        <i className="iconfont icon-select" /> :
                                                        <i className="iconfont icon-no-select" />
                                                    }
                                                    <span>{item}</span>
                                                  </p>
                                                ))
                                              : null}
                                            </div>
                                        </div>
                                    ) : null}
                                    {/* 提币地址 */}
                                    <div className="mentionMoney-flow">
                                        <span className="label">提币地址</span>
                                        <Input
                                            type="text"
                                            onBlur={this.handleBlurFront}
                                            value={mentionAddress}
                                            className="flow-inp"
                                            onChange={(val) =>
                                                this.handleMentionAddress(
                                                    false,
                                                    val
                                                )
                                            }
                                        />
                                    </div>
                                    {/* 提币数量 */}
                                    <div className="mentionMoney-flow">
                                        <span className="label">提币数量</span>
                                        <div className="input-addon">
                                            <Input
                                                type="number"
                                                className="flow-inp-num"
                                                value={numInput}
                                                placeholder={`${'最小提币金额'} ${
                                                    loading
                                                        ? aboutFee.minWithdrawFeeStandard
                                                        : '--'
                                                }${assetNameMention}`}
                                                onChange={this.handleMentionNum}
                                                style={{ border: 'none' }}
                                            />
                                            <div className="addon" >
                                                <span className="addonCoins">
                                                    {assetNameMention}
                                                </span>
                                                ｜
                                                <span
                                                    className="addonAll"
                                                    onClick={this.handleComputer}
                                                >
                                                    全部
                                                </span>
                                            </div>
                                        </div>
                                        {numError ? (
                                            <span className="errorTxt">
                                                {numError}
                                            </span>
                                        ) : null}
                                        <div className="convertible-warp">
                                            <span>
                                                可转 {amount} {assetNameMention}
                                            </span>
                                            <div className="flex-direction-column">
                                                <span>
                                                    手续费：{fee}{' '}
                                                    {assetNameMention}
                                                </span>
                                                <span>
                                                    实际到账：
                                                    {actualAchievement > 0
                                                        ? actualAchievement
                                                        : 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="body-box">
                                    {/* 资金密码 */}
                                    <div className="mentionMoney-flow">
                                        <span className="label">资金密码</span>
                                        <div className="input-addon">
                                            <Form autoComplete="off" style={{ width: '100%' }}>
                                                <Input.Password
                                                    visibilityToggle={false}
                                                    type="text"
                                                    // maxLength={12}
                                                    // minLength={6}
                                                    className="flow-inp-code"
                                                    value={passwordtInput}
                                                    onChange={this.handleMoneypassword}
                                                    style={{ border: 'none'}}
                                                />
                                            </Form>
                                            <div className="forget-screct">
                                                <Link
                                                    className="addonAll"
                                                    to="/bindpassword"
                                                >
                                                    忘记密码
                                                </Link>
                                            </div>
                                        </div>
                                        {errorTxt ? (
                                            <span className="errorTxt">
                                                {errorTxt}
                                            </span>
                                        ) : null}
                                    </div>
                                    {/* 短信验证码 */}
                                    <div className="mentionMoney-flow">
                                        {this.renderCode()}
                                        <div className="input-addon">
                                            <Input
                                                type="number"
                                                maxLength={6}
                                                className="flow-inp-code"
                                                value={codeInput}
                                                onChange={this.handleCode}
                                                style={{ border: 'none'}}
                                            />
                                            <div className="code_sms">
                                                <span
                                                    className="addonAll"
                                                    onClick={this.SendCode}
                                                >
                                                    {wait === 0
                                                        ? '发送验证码'
                                                        : `${wait}s 后重发`}
                                                </span>
                                            </div>
                                        </div>
                                        {codeInput ? null : (
                                            <span className="errorTxt">
                                                {codeError}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="mentionMoney-flow flex-direction-center">
                                {changeCard ? (
                                    <Button
                                        className="flow-btn primaryBtn"
                                        onClick={this.nextPlay}
                                    >
                                        下一步
                                    </Button>
                                ) : (
                                    <Button
                                        className="flow-btn primaryBtn"
                                        type="submit"
                                        onClick={this.handleSubmit}
                                    >
                                        确认
                                    </Button>
                                )}
                            </div>
                            {/* tips说明 */}
                            <div className="mentionMoney-flow">
                                <div className="flow-p">
                                    <p>
                                        1. 最小提币金额{' '}
                                        {aboutFee.minWithdrawFeeStandard}
                                        {assetNameMention}
                                    </p>
                                    <p>
                                        2.
                                        提现功能仅支持现货账户的资产，如需提现请将其他账户资产划转至币币账户。
                                    </p>
                                    {/* <p>
                                        3.
                                        {t('mentionMoney.mentionMoney25')}
                                    </p> */}
                                    {assetNameMention === 'BTS' ? (
                                        <React.Fragment>
                                            <p>
                                                -{' '}
                                                请务必填写并仔细核对地址标签，这是您唯一的账户标识，否则资产不可找回
                                            </p>
                                        </React.Fragment>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
export default CommonWithdraw;
