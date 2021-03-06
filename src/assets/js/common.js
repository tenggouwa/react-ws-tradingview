
import days from 'dayjs';
import React from 'react';
/**
 *
 * 通过当前语言选择123
 * @function chooseLang
 * @param {当前的语言} lang
 * @returns
 */
export function chooseLang(lang) {
  switch (lang) {
  case 'zh': return 1
  case 'en': return 2
  case 'ko': return 3
  case 'tw': return 4
  case 'jp': return 5
  default: return 1
  }
}

export const filterLabel = (val, list) => {
  if (!val || !list || list.length === 0) return '--';
  const valArr = list.filter(item => item.value === val);
  if (valArr && valArr.length > 0) {
    return valArr[0].label;
  }
  return '--';
}

/**
 * 通过当前语言合约名称
 * @function chooseContractName
 * @param {当前的语言} lang
 * @param {是否需要转换} type
 * @param {合约名称} name
 * @param {非转换名称} klineName
 * @returns
 */

export function chooseContractName(lang, type, name, klineName) {
  if (!name && !klineName) return '--'
  if (type && (lang === 'en' || lang === 'jp')) {
      return `${name} PERP`
  }
  if (!name) return klineName
  const assetName = name.split('/')[0]
  let unit = '永續'
  if (lang === 'zh') {
      unit = '永续'
  }
  return `${assetName} ${unit}`
}

/**
 * 小数位截取，不足补0
 * @param {要截取的数字} value
 * @param {小数位数} num
 */
export const foFixed = (value, num) => {
  let a = value.toString()
  if (a.indexOf('-') >= 0 && String(a).indexOf('e') !== -1) { // 是否有-并且有e，是为科学计数法
      a = `0${String(Number(a) + 1).substr(1)}`
  }
  const b = a.indexOf('.')
  const c = a.length
  let i
  if (num === 0) {
      if (b !== -1) {
          a = a.substring(0, b)
      }
      return a
  }
  // 如果没有小数点
  if (b === -1) {
      a = `${a}.`
      for (i = 1; i <= num; i += 1) {
          a = `${a}0`
      }
  } else {
      // 有小数点，超出位数自动截取，否则补0
      a = a.substring(0, b + num + 1)
      for (i = c; i <= b + num; i += 1) {
          a = `${a}0`
      }
  }
  return a
}
export const formData = (val, type) => {
  if (val) {
    const values = days(Number(val)).format(type);
    return values
  } 
  return '--';
}

export const filterColorClass = (val) => {
  if (!val) return null;
  if (Number(val) === 0) return null;
  if (val.indexOf('-') !== -1) return 'red'
  return 'green'
}

export const filterRouter = (pathname) => {
  const routerName = ['/register', '/login', '/forgetPass'];
  if (routerName.includes(pathname)) return true;
}

export const useThrottle = (fn, delay, dep = []) => {
  const { current } = React.useRef({ fn, timer: null });
  React.useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  )

  return React.useCallback(function f(...arg) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay)
      current.fn.call(this, ...arg);
    }
  }, dep)
}

export const getUrlParams = (param) => {
  const currentUrl = window.location.href; //获取当前链接
  let arr = currentUrl.split("?");//分割域名和参数界限
  if (arr.length > 1) {
    arr = arr[1].split("&");//分割参数
    for (let i = 0; i < arr.length; i++) {
      const tem = arr[i].split("="); //分割参数名和参数内容
      if (tem[0] == param) {
        return tem[1];
      }
    }
    return null;
  } else {
    return null;
  }
  return theRequest
}
