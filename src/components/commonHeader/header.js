import React, { Component, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SliderMenu from '../sliderMenu';
import { filterRouter } from '@/assets/js/common';
import logo from "@/assets/img/common/logo.png";
import './header.scss';

let OPEN_TYPE = 1;
const HeaderDom = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [visable, setVisable] = useState(false);
  let loginInfo= [];
  // 个人中心
  const handlePersion = (e) => {
    e.stopPropagation();
    if (props.userAuth === 0) {
      history.push('/login');
    } else {
      setVisable(!visable);
      // loginInfo.push(props.userAuth.lastLoginInfo);
      OPEN_TYPE = 2;
    }
  }
  // menu导航
  const handleSliderRouter = (e) => {
    e.stopPropagation();
    setVisable(!visable);
    OPEN_TYPE = 1;
  }

  return (
    <>
      {!filterRouter(pathname) && (
        <header className="main-header">
          <div className="container">
            <div className="header-left">
              <Link to="/">
                <img
                  src={logo}
                  style={{ height: "28px", width: "auto" }}
                  alt=""
                />
              </Link>
            </div>
            <div className="header-right">
              <i className="iconfont icon-yonghuxinxi" onClick={handlePersion} />
              <i className="iconfont icon-menu" onClick={handleSliderRouter} />
            </div>
          </div>
          <SliderMenu
            handleSliderCancel={() => setVisable(false)}
            visable={visable}
            type={OPEN_TYPE}
            props={props}
          />
        </header>
      )}
    </>
  );
};

@connect((state) => ({
  apis: state.apis,
  lang: state.lang,
  setLang: state.setLang,
  langSrc: state.langSrc,
  userAuth: state.userAuth,
  clearUserAuth: state.clearUserAuth,
}))
class CommonHeader extends Component {
  constructor() {
    super();
  }

  render() {
    return <HeaderDom {...this.props} />;
  }
}
export default CommonHeader;
