// 配置简化转换
function conversion(url, method, config) {
    return {
        url,
        method,
        ...config,
    }
}

// ajax通用配置
export default {
    // web端获取某个区域下的活动（孙武子）
    getActiveList: conversion('site/content/activites', 'get'),
    // ---未注册状态或者修改手机号状态下
    // 账户 / 设置用户昵称
    putUserName: conversion('account/user/username', 'put'),
    // 账户 / 根据手机号发送验证码
    sendphonecode: conversion('account/code/phone', 'post'),
    // ----注册后
    // 账户 / 获取用户认证信息
    getUserAuth: conversion('account/user/info/auth', 'get', { unTs: true }),
    // 账户 / 获取用户认证信息
    getKYCAuth: conversion('account/auth/kyc', 'get', { unTs: true }),
    // 账户 / 开启或关闭谷歌验证
    usergoogleLogin: conversion('account/google/verification/login/access/switch', 'post'),
    // 账户 / 获取用户基本信息
    getUserBaseInfo: conversion('account/user/info/basic', 'get'),
    // 账户 / 资金密码忘记
    // sendfundPwd: conversion('account/fundPwd/forget', 'PUT'),
    // // 账户 / 修改资金密码
    // revisefundPwd: conversion('account/fundPwd', 'PUT'),
    // // 账户 / 资金密码绑定
    // bindfundPwd: conversion('account/fundPwd', 'post'),
    // 账户 / 绑定谷歌验证
    bindgoogleauth: conversion('account/googleauth', 'post'),
    // 账户 / 绑定邮箱
    bindemail: conversion('account/email', 'post'),
    // 账户 / 登陆密码修改
    // revisepwd: conversion('account/user/login/pwd', 'post'),
    // 账户 / 重置登陆密码
    resetpwd: conversion('account/user/login/pwd', 'put'),
    // 账户 / 忘记登陆密码-获取图片验证码
    getpicture: conversion('account/captcha/picture', 'get'),
    // 账户 / 忘记登陆密码-校验图片验证码
    checkverify: conversion('account/captcha/verify', 'post'),
    // 账户 / 重置密码，发送账号验证码
    getupdatepwd: conversion('/account/code/updatePwd', 'get'),
    // 账户 / 身份认证图片上传
    upload: conversion('auth/idcard/picture', 'post'),
    // 账户 / 开通合约交易
    opencontract: conversion('account/contract-opening', 'post'),
    // 账户 / 身份认证提交审核
    authUserIdentity: conversion('account/auth/idcard', 'post'),
    // 账户 / 高级认证初始化
    authHighIdentity: conversion('account/auth/init/h5/living', 'post'),
    // 账户 / 创建用户
    regist: conversion('account/user/register', 'post'),
    // 账户 / 登录
    login: conversion('account/user/login', 'post'),
    // 账户 / 谷歌登录验证
    googleCheck: conversion('account/user/googleCheck', 'get'),
    // 账户 / 退出
    logout: conversion('account/user/logout', 'post'),
    //  账户 / 发送短信或邮箱验证码
    sendCode: conversion('account/verification/code', 'post'),
    // 账户 / 判断用户是否存在
    checkUser: conversion('account/user/checkUser', 'get'),

    // 安全设置 / 修改登陆密码
    changeloPass: conversion('account/user/login/pwd', 'post'),
    // 安全设置 / 绑定邮箱
    bindEmail: conversion('account/email', 'post'),
    // 安全设置 / 绑定谷歌验证
    bindgoogle: conversion('account/google/verification', 'post'),
    // 安全设置 / 解除谷歌验证
    nobindgoogle: conversion('account/google/verification', 'delete'),
    // 安全设置 / 获取谷歌验证二维码
    googlercode: conversion('account/google/verification/secretkey', 'get'),
    // 安全设置 / 绑定资金密码
    bindFundPass: conversion('/account/fundPwd', 'post'),
    // 安全设置 / 修改资金密码
    changeFundPass: conversion('account/fundPwd', 'put'),
    // 安全设置 / 忘记资金密码
    forgetFundPass: conversion('account/fundPwd/forget', 'put'),
    // 安全设置 / 设置手机号/修改手机号
    mobile: conversion('account/user/phone', 'post'),

    // 资金 / 钱包账户信息
    queryWallet: conversion('asset/capital', 'get'),
    // 资金 / 获取资金划转记录
    queryTransferRecord: conversion('asset/transfer/record/asset', 'get'),
    // 资金 / 获取合约账户信息
    queryContract: conversion('asset/contract', 'get'),
    // 资金 / 资金划转接口
    transferMoney: conversion('asset/transfer', 'post'),
    // 资金 / 获取充提币记录
    queryCoinRecord: conversion('asset/transfer/record/coin', 'get'),
    // 资金 / 获取冲币地址
    getAddress: conversion('wallet/account/deposit/address', 'post'),
    // 资金 / 获取币种列表
    queryCoinTypes: conversion('asset/coin/list', 'get'),
    // 资金 / 获取币种列表
    getCoinListOption: conversion('asset/coin/optionList', 'get'), // TODO
    // 资金 / 提币
    withdraw: conversion('asset/withdraw', 'post'),
    // 资金 / 获取提币手续费
    getWithdrawFee: conversion('asset/withdraw/asset/fee', 'get'),
    // 资金 / 提现配置
    getConfig: conversion('config', 'get'),
    // 资金 / 获取最近提币纪录
    recentWithdraw: conversion('asset/withdraw/address', 'get'),
    // 资金 / 撤销提币
    calbackCoin: conversion('asset/withdraw/cancel', 'get'),
    // 资金 / 资金流水
    waterOrderRecord: conversion('asset/fund/data', 'post'),
    // 资金 / 资金流水类型
    waterOrderRecordType: conversion('asset/fund/data/type', 'get'),
    // 行情 / 获取27个数据跑马灯
    getHorseLamp: conversion('market/horselamp', 'get'),
    // 行情 / 未登录下卡片查询
    offlineCard: conversion('market/offline/card', 'get', { unTs: true }),

    // 行情 / 登录状态卡片查询
    inlineCard: conversion('market/card', 'get'),
    // 行情 / 卡片查询
    lineCard: conversion('market/static/card', 'get'),
    // 行情 / 登录状态添加卡片
    addCard: conversion('market/card', 'post'),
    // 行情 / 登录状态删除卡片
    delCard: conversion('market/card', 'delete'),
    // 行情 / 登录状态卡片查询
    getAllContractUsdk: conversion('market/contract-usdk', 'get'),

    // 交易 / 校验密码时效
    verifyPassword: conversion('user/verify/trade/password', 'get', { unTs: true }),
    // 交易 /  资金密码校验
    verifyPwd: conversion('user/verify/trade/password', 'post'),
    // 交易 / 【合约交易】左上角合约下拉列表 第一次请求用的！只有当前合约信息，为了数据快速渲染
    contractListFirst: conversion('contract/list/first', 'get'),
    // 交易 / 【合约交易】左上角合约下拉列表
    contractList: conversion('contract/list', 'get'),
    // 交易 / 【合约交易】左上下拉右边：资金信息
    fundInfo: conversion('contract/account', 'get'),
    // 交易 / 【合约交易/【USDK交易】右上成交列表
    dealList: conversion('matched/order/info', 'get'),
    // 交易 / 【合约交易】深度列表
    deepList: conversion('entrust/depth', 'get'),
    // 交易（行情） / 【合约交易】交易页面跑马灯下方标的物合约价格、现货指数、持仓量等信息
    oneDayInfo: conversion('market/contract', 'get'),
    // 交易 / 【合约交易】委托列表 资金管理=>合约账户=>委托
    tradeEntrus: conversion('contract/entrust/list', 'get'),
    // 交易 / 【合约交易】查看合约持仓列表
    tradePosition: conversion('contract/position', 'get'),
    // 交易 / 【合约交易】合约成交列表
    tradeMatched: conversion('contract/matched', 'get'),
    // 交易 / 【合约交易】合约历史列表
    tradeHistory: conversion('contract/history', 'get'),
    // 交易 / 【合约交易】计算保证金
    calculateMargin: conversion('contract/preciseMargin', 'post'),
    // 交易 / 【合约交易】委托提交
    tradeSubmit: conversion('/contract/order', 'post'),
    // 交易 / 【合约交易】平仓撤销反向单
    tradeOrigin: conversion('/contract/order/cancelReverse', 'post'),
    // 交易 / 【合约交易】取消订单
    tradeCancle: conversion('contract/order', 'delete'),
    // 交易 / 【合约交易】撤销全部委托
    tradeCancelAll: conversion('contract/order/cancel-all', 'delete'),

    // 交易 / 【USDK交易】左上角USDK下拉列表 第一次请求用的！只有当前币种信息，为了数据快速渲染
    USDKListFirst: conversion('usdk/list/first', 'get'),
    // 交易 / 【USDK交易】左上角USDK下拉列表
    USDKList: conversion('usdk/list', 'get'),
    // 交易 / 【USDK交易】左上下拉右边：资金信息
    USDKFundInfo: conversion('usdk/account', 'get'),
    // 交易（行情） / 【USDK交易】交易页面跑马灯下方标的物合约价格、现货指数、持仓量等信息
    USDKDayInfo: conversion('market/usdk', 'get'),
    // 交易 / 【USDK交易】委托列表查询
    USDTtradeOrderlist: conversion('usdk/orderlist', 'get'),
    // 交易 / 【USDK交易】委托提交
    USDKSubmit: conversion('/usdk/order', 'post'),
    // 交易 / 【USDK交易】取消订单
    USDTtradeCancle: conversion('usdk/order', 'delete'),
    // 交易 / 【USDK交易】撤销全部委托
    USDTtradeCancleAll: conversion('usdk/order/cancel-all', 'delete'),
    // 交易 / 获取杠杆设置
    getLeval: conversion('/contract/lever', 'get'),
    // 交易 / 调整杠杆接口
    setLeval: conversion('/contract/lever', 'post'),
    // 交易 / 单个杠杆获取
    getLeverOne: conversion('/contract/leverage/one', 'get'),
    // 交易 / 单个杠杆设置
    setLeverOne: conversion('/contract/leverage/modify', 'post'),
    // 交易 / 【usdk】个人资产
    USDTtradeasset: conversion('usdk/asset/info', 'get'),
    // 交易 / 【交易】货币汇率
    getExchangeRate: conversion('/usdk/asset/exchangeRate', 'get'),
    // 交易 /  获取usdk可购买额度
    USDKAvailable: conversion('/usdk/available', 'get'),
    // 交易 /  获取合约可购买额度
    contractAvailable: conversion('/contract/available', 'get'),
    // 行情 / 24小时行情
    queryAllQuotations: conversion('market/quotations', 'get'),
    // 行情 / 24小时行情置顶
    pickTop: conversion('market/promotion', 'post'),
    // 行情 / 24小时行情收藏
    collection: conversion('market/collection', 'post'),
    // 行情 / 24小时行情取消收藏，与collection的传输类型不同
    collectionDel: conversion('market/collection', 'delete'),
    // 行情 / 24小时行情，获取是否存在自选数据
    getDefaultTab: conversion('market/quotations/collection', 'get'),

    // 分红 / 分红页相关展示数据
    getBonusData: conversion('/loan/rightAntProfit', 'get'),
    // 分红 / 分红页面抬头
    getBonusHead: conversion('/loan/headOfProfit', 'get'),
    // 分红 / 分红页锁仓fota
    lockFota: conversion('/loan/lock', 'post'),
    // 分红 / 分红页解锁fota
    unlockFota: conversion('/loan/unlock', 'post'),
    // 分红 / 获取解锁中fota列表记录
    getUnlockingList: conversion('/loan/getUnlockedRecord', 'get'),
    // 分红 / 取消解锁按钮
    cancelUnlocking: conversion('/loan/cancelUnlock', 'post'),
    // 借贷&锁仓 / 【借贷】放贷
    sendLending: conversion('loan/lend', 'post'),
    // 借贷&锁仓 / 【借贷】放贷页面获取用户放贷信息
    getLending: conversion('loan/lend', 'get'),
    // 借贷&锁仓 / 【借贷】借贷总信息
    getLendInfo: conversion('/loan/info', 'get'),
    // 借贷&锁仓 / 【借贷】终止放贷合约
    stopLending: conversion('loan/lend/cancel', 'get'),
    // 借贷&锁仓 / 【借贷】获取房贷纪录
    getLendRecord: conversion('/loan/lend/record', 'get'),
    // 借贷&锁仓 / 【借贷】利息收益
    getInterest: conversion('loan/lend/interest', 'get'),
    // 还款计划列表
    replayList: conversion('/loan/mortgage/orderlist', 'get'),
    // 设置自动还款
    setAutoPay: conversion('/loan/autopay', 'post'),
    // 还款
    loanPay: conversion('/loan/pay', 'post'),
    // 增加抵押物
    loanAppend: conversion('/loan/mortgage/append', 'post'),

    // 借贷&锁仓 / 【借贷】获取所有人的放贷列表
    getOrderList: conversion('/loan/lend/orderlist', 'get'),
    // 借贷&锁仓 / 【借贷】我要借款中我的借款的信息
    getPayInfo: conversion('/loan/pay/info', 'get'),
    // 借贷&锁仓&资金 / 【资金】分页获取分红记录@王冕
    getDividendRecords: conversion('/loan/getProfitRecord', 'get'),
    // 借贷&锁仓 / 【借贷】借款记录
    getBorrowRecords: conversion('/loan/mortgage/record', 'get'),
    // 借贷&锁仓 / 【借贷】分页获取锁仓和解锁记录@王冕
    getLockedRecords: conversion('/loan/getLockRecord', 'get'),
    // 借贷&锁仓 / 【借贷】我要借款
    postBorrowMoney: conversion('/loan/mortgage', 'post'),

    // 一分钟期权 / 查询交易记录(分页)
    optionRecords: conversion('/option/order/page', 'get'),
    // 一分钟期权 / 下载csv文件
    exportRecords: conversion('/option/order/export', 'get'),

    // 帮助中心 - 平台公告 site/content/text
    platNotice: conversion('/site/content/text', 'get'),

    // 通知中心 / 获取消息列表
    getNoticeList: conversion('/notify/msg/list', 'get'),

    // 账户 / 初始化签名认证算法(孟德)
    getSHA1Sign: conversion('account/code/sha1/create', 'get'),
    // 模拟交易大赛开关
    switch: conversion('/contest/config', 'get'),
    // 模拟交易大赛 / 获取个人信息
    moniTradePerson: conversion('/contest/personalInfo', 'get'),

    // 模拟交易大赛 / 获取排行榜单
    moniTradeList: conversion('/contest/leaderBoard', 'get'),

    // 模拟交易大赛 / 获取当前期数
    moniTradeNow: conversion('/contest/currentPeriod', 'get'),

    // 模拟交易获取邀请记录
    getinviteRecord: conversion('/contest/inviteRecord', 'get'),
    // 模拟交易获取邀请码
    getInviteCode: conversion('/invitation/code', 'get'),
    // 邀请码
    // 邀请返佣邀请设置
    getInviteConfig: conversion('/activity/invite/config', 'get'),
    // 邀请排行榜前3
    getInviteRank: conversion('/activity/invite/bonus/rank', 'get'),
    // 邀请排行榜前3
    getInviteTop: conversion('/activity/invite/top', 'get'),
    // 我的邀请统计
    getInviteStatistics: conversion('/account/invite/statistics', 'get'),
    // 邀请记录
    getInviteList: conversion('/account/invite/record', 'get'),
    // 返佣记录
    getReferrList: conversion('/activity/invite/rebate', 'get'),
    // 获取邀请码
    getCode: conversion('/activity/invite/code', 'get'),

    /* -----------条件委托--------------- */
    // 计划委托下单
    createTriggerOrder: conversion('/contract/condition-order/place', 'post'),
    // 止盈止损单下单
    createStopOrder: conversion('/contract/condition-order/stop/order', 'post'),
    // 计划委托、止盈止损单历史查询
    stopOrderHistory: conversion('/contract/condition-order/histories', 'get'),
    // 计划委托、止盈止损当前订单查询
    stopOrderOrderList: conversion('/contract/condition-order/orders/now', 'get'),
    // 计划委托（止盈止损单）撤单(POST)
    cancelTriggerOrder: conversion('/contract/condition-order/cancel', 'post'),

    /* -----------新合约H5 首页--------------- */
    // 首页 / 获取后台配置图片
    // getContentPic: conversion('/site/content/picture', 'get'),
    getContentPic: conversion('/site/content/app/picture', 'get'),
    // 首页 / 公告信息
    tsetNotice: conversion('/site/content/tsex/notice', 'get'),

    /* -----------新合约H5 登录注册--------------- */
    // 账户 / 根据邮箱发送邮件
    sendEmailcode: conversion('account/code/email', 'post'),
    // 重置密码
    updatePwd: conversion('account/user/reset/pwd', 'put'),


    /* -----------H5 社区--------------- */
    // 获取风格标签
    fetchStyleTitle: conversion('/community/common/style/title', 'get'),
    // 获取累计收益率列表
    fetchProfitRateList: conversion('/community/common/total/profit/rate/list', 'get'),
    // 获取近三周最大回撤列表
    fetchThreeWeekMaxDraw: conversion('/community/common/last/three/week/max/draw', 'get'),
    // 获取交易天数列表
    fetchTradeDays: conversion('/community/common/trade/days', 'get'),
    // 热门搜索关键字
    fetchFollowHot: conversion('/community/follow/hot/key', 'get'),
    // 稳健区交易员列表查询
    fetchSteadyTraderList: conversion('/community/follow/steady/trader/list', 'post'),
    // 交易员详情
    fetchFollowTradeInfo: conversion('/community/follow/trader/detail', 'get'),
    // 交易员历史带单列表
    fetchTraderOrderHistory: conversion('/community/follow/trader/leader/order/history', 'post'),
    // 交易员当前持仓信息
    fetchFollowTradeCurrentPosition: conversion('/community/follow/trader/current/position', 'get'),
    // 收益率走势
    fetchFollowTradeRateTrend: conversion('/community/follow/trader/rate/trend', 'get'),
    // 稳健区跟单操作
    fetchFollowFollow: conversion('/community/follow/steady/follow', 'post'),
    // 稳健区编辑跟单操作
    fetchFollowEditFollow: conversion('/community/follow/steady/edit/follow', 'post'),
    // 自己跟单列表
    fetchFollowOwn: conversion('/community/follow/own/follow', 'get'),
    // 获取跟单历史详情
    fetchFollowOwnHistoryInfo: conversion('/community/follow/own/follow/history/detail', 'get'),
    // 取消跟单
    fetchFollowCancel: conversion('/community/follow/cancel', 'delete'),
    // 稳健区提取收益
    fetchFollowWithDrawProfit: conversion('/community/follow/steady/withdraw/profit', 'post'),
    // 跟单划转
    fetchFollowTransfer: conversion('/community/follow/transfer', 'post'),
    // 申请成为交易员
    fetchFollowRequestTrader: conversion('/community/follow/request/trader', 'get'),
    // 申请成为交易员状态查看
    fetchFollowRequestTraderStatus: conversion('/community/follow/request/trader/audit/status', 'get'),
    // 跟单提醒消息
    fetchFollowMsgList: conversion('/community/follow/msg/list', 'get'),
    // 跟随详情
    fetchFollowDetail: conversion('/community/follow/details', 'get'),
    // 读信息
    fetchFollowMsgRead: conversion('/community/follow/read/msg', 'get'),
    // 一键已读
    fetchFollowMsgReadAll: conversion('/community/follow/read/all', 'get'),
    // 交易员社区基本信息
    fetchTraderDetail: conversion('/community/trader/detail', 'get'),
    // 交易员个人中心
    fetchTraderSingle: conversion('/community/trader/single/detail', 'get'),
    // 交易员风格、简介编辑
    editTraderStyleIntroduce: conversion('/community/trader/style/introduce/update', 'post'),
    // 交易员跟随者
    fetchTraderFollowList: conversion('/community/trader/follow/list', 'get'),
    // 交易员带单分润
    fetchTraderProfit: conversion('/community/trader/profit', 'get'),
    // 交易员是否满员、是否带单编辑
    fetchTraderConfigEdit: conversion('/community/trader/config/edit', 'get'),
    // 交易员移除跟随者
    delTraderFollower: conversion('/community/trader/delete/follower', 'get'),
    // 热门搜索
    fetchFollowHotKey: conversion('/community/follow/hot/key', 'get'),
    // 编辑跟单前的交易员以及资金基本信息
    fetchFollowPreEdit: conversion('/community/follow/pre/edit', 'get'),
    // 正在跟单的稳健区交易员id和名字-划转用
    fetchFollowAll: conversion('/community/follow/steady/follow/all', 'get'),
    // 获取划转手续费
    fetchFollowTransferFee: conversion('/community/follow/transfer/fee', 'get'),
    // 用户未读消息数量
    fetchFollowMsgNum: conversion('/community/follow/msg/num', 'get'),
    // 跟单账户资产
    fetchFollowAssets: conversion('/community/follow/asset', 'get'),
    
    // 资金 / 获取币种列表
    getConList: conversion('/usdk/pair/list', 'get'),
    // 资金 / 划转 / 不同账户可用余额
    getCanUseMount: conversion('/asset/can/use', 'get'),
    // 资金 / 划转 / 获取可划币种列表
    getCanUseList: conversion('/asset/transfer/coin/list', 'get'),
    // // 资金 / 提币 / 提币地址校验
    // checkAddress: conversion('/asset/withdraw/address/check', 'get'),
    // 获取稳健区记录类型
    getSteadyTypeList: conversion('/activity/invite/steady/record/type', 'get'),
    // 获取稳健区记录类型
    getSteadyList: conversion('/activity/invite/share/record', 'get'),
    // 稳健区提取收益
    outWinFetch: conversion('/community/follow/steady/withdraw/profit', 'post'),
}
