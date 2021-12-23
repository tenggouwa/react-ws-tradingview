import React, { Component } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { Dropdown, Menu } from 'antd';
import { filterLabel } from '@/assets/js/common';
import { LEFT_MENU_LIST, RIGHT_MENU_LIST, ORDER_FORM, LANGUAGE_LIST } from './constants';
import './index.scss';

function HeaderDom(props) {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleClickRoute = (route) => history.push(route);

  const changeLang = ({ key }) => {
    const { dispatch, setLang, langSrc } = props
    compose(dispatch, setLang)(key)
    window.t = function t(path = '.', src = langSrc[key].translation) {
      const pathArray = path.split('.')
      return pathArray.length > 2 ? src[pathArray[0]][pathArray[1]][pathArray[2]] : src[pathArray[0]][pathArray[1]]
    }
    localStorage && (localStorage.setItem('lang', key || 'en'))
  }


  const menu = (
    <Menu onClick={changeLang}>
      {
        LANGUAGE_LIST.map(item => (
          <Menu.Item key={item.value}>{item.label}</Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo" onClick={() => handleClickRoute('/')} />
        <ul className="menu">
          {
            LEFT_MENU_LIST.map(item => (
              <li key={item.route} onClick={() => handleClickRoute(item.route)}>{item.name}</li>
            ))
          }
        </ul>
      </div>
      <div className="header-right">
        <ul className="menu">
          {
            RIGHT_MENU_LIST.map((item => (
              <li
                className={pathname === item.route ? 'active' : ''}
                key={item.route}
                onClick={() => handleClickRoute(item.route)}
              >
                {item.name}
              </li>
            )))
          }
        </ul>
        <ul className='menu'>
          {
              ORDER_FORM.map(item => (
                <li key={item.route} onClick={() => handleClickRoute(item.route)}>
                  {item.name}
                </li>
              ))
          }
          <Dropdown overlay={menu} trigger={['click']}>
            <li className="lang">
              {filterLabel(props.lang, LANGUAGE_LIST)}
              <i className="iconfont icon-msnui-triangle-down" />
            </li>
          </Dropdown>,
        </ul>
      </div>
    </div>
  )
}

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  setLang: state.setLang,
  langSrc: state.langSrc,
}))

class CommonHeader extends Component {
  constructor() { super() }
  render() {
    return <HeaderDom {...this.props} />
  }
}
export default CommonHeader