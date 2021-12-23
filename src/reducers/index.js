import apis from '@/fetch'
import { handleActions, combineActions } from 'redux-actions'
import createActionsHandler from './actions'
import OPTIONS from './options'
import zh from '../i18n/zh.js'
import en from '../i18n/en.js'
import ko from '../i18n/ko.js'
import tw from '../i18n/tw.js'

const langSrc = {
    zh,
    'zh-CN': zh,
    tw,
    en,
    ko,
}

let lan = 'zh'
const navigatorLang = localStorage.lang || navigator.browserLanguage || navigator.language
if (navigatorLang.indexOf('TW') > -1 || navigatorLang.indexOf('tw') > -1) {
    lan = 'tw'
} else if (navigatorLang.indexOf('zh') > -1) {
    lan = 'zh'
} else {
    lan = 'en'
}

export const lang = lan
// export const lang = localStorage.lang || ((navigator.browserLanguage || navigator.language).indexOf('zh') > -1 ? 'zh' : 'ko') || 'en'
localStorage.lang = lan

const actions = createActionsHandler(apis)
const {
    setLang,
    changeTheme,
    getUserAuth,
    clearUserAuth,
    changeLeverage,
    setWs,
    setWsStatus,
    sendWs,
    closeWs,
    setWsData,
    clearWsData,
    getContractData,
    getUsdkData,
    saveSessionId,
    savePriceData,
    passDeepPrice,
    getSwith,
    sendFundComponent,
    saveLever,
    saveUdeskLoad,
    setVisible,
} = actions
// 初始化状态
const initialState = {
    lang: localStorage.lang,
    apis,
    wsObj: null,
    swith: false,
    lever: null,
    wsConnet: true,
    // wsTranObj: null,
    wsData: {},
    // wsBondData: {},
    // theme: localStorage.theme || Object.keys(window.themeUrl)[0],
    userAuth: null,
    leverage: 1,
    contractData: null,
    asynchronous: null,
    usdkData: null,
    sessionId: null,
    priceData: null,
    tradePrice: null,
    udeskLoaded: false,
    headerFundComponent: null,
    langSrc,
    followVisible: false,
    dispLang: langSrc[lan].translation,
    ...OPTIONS,
    ...actions,
}

const rootReducer = handleActions({
    [combineActions(
        setLang,
        getUserAuth,
        clearUserAuth,
        getContractData,
        savePriceData,
        saveSessionId,
        getUsdkData,
        passDeepPrice,
        changeTheme,
        changeLeverage,
        setWs,
        setWsStatus,
        sendWs,
        closeWs,
        clearWsData,
        getSwith,
        saveLever,
        saveUdeskLoad,
        // sendWsbond,
        // closeWsbond,
        // clearWsbondData,
        sendFundComponent,
        setVisible,
    )]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [combineActions(setWsData)]: (state, { payload }) => ({
        ...state,
        wsData: {
            ...state.wsData,
            ...payload.wsData
        }
    }),
}, initialState)
export default rootReducer
