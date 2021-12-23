import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { SLIDER_BTN, CONFIG_ROUTER } from './constants';
import './index.scss';

const LOGIN_TYPE = "登录";

const SliderMenu = ({ visable, handleSliderCancel, type, props }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(2);
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  // let loginInfo = {
  //   loginTime: null,
  //   ip: "",
  // };
  // if (props.userAuth) {
  //   loginInfo = props.userAuth.lastLoginInfo
  //     ? props.userAuth.lastLoginInfo
  //     : loginInfo;
  // }
  
  const sliderList = CONFIG_ROUTER.filter((item) => item.pid === type)[0];
  const handleToPath = async (e, pathName, router) => {
    e.stopPropagation();
    // 退出登录
    if (router.symbol) {
      const res = await props.apis.logout();
      if (res.code === 0) {
        localStorage.removeItem('followVisible')
        props.dispatch(props.clearUserAuth());
        history.push(pathName);
      }
    } else {
      history.push(pathName);
    }
    handleSliderCancel();
  };

  const handleToRouter = (item) => {
    setCurrentIndex(item.id);
    const routerName = item.btnName === LOGIN_TYPE ? "/login" : "/register";
    history.push(routerName);
  };

  const handleOpenChild = (key) => {
    setOpenIndex(key);
    setOpen(!open);
  };

  const handleToWindowHref = (href) => {
    window.open(href);
  }

  CONFIG_ROUTER[1].children.map(it => {
    let result;
    if (it.key === 0 && props.userAuth) {
      result = props.userAuth.isEmailAuth ? it.child[it.key].routerName : it.child[it.key].routerName = '未绑定';
    }
    return result;
  })

  return (
    <div className="slider-bar">
      <section className={`slider-container ${visable ? "active" : "default"}`}>
        <div className="slider-cancel" onClick={handleSliderCancel}>
          <i className="iconfont icon-cancel01" />
        </div>

        {type === 1 ? (
          props.userAuth ? null : (
            <div className="slider-loginBtn">
              {SLIDER_BTN.map((item) => (
                <button
                  key={item.id}
                  className={`slider-btn ${
                    currentIndex === item.id ? "active" : "default"
                  }`}
                  onClick={() => handleToRouter(item)}
                >
                  {item.btnName}
                </button>
              ))}
            </div>
          )
        ) : (
          <div className="slider-personCenter">
            <div className="personCenter-content personCenter-top">
              <span>
                {(props.userAuth && props.userAuth.registerAccount) || "--"}
              </span>
              <span className="personCenter-text">
                UID: {(props.userAuth && props.userAuth.userId) || "--"}
              </span>
            </div>
            {/* <div className="personCenter-content personCenter-bottom">
              <span>
                上次登录时间{" "}
                {formData(
                  loginInfo && loginInfo.loginTime,
                  "YYYY-MM-DD hh:mm:ss"
                )}
              </span>
              <span>IP：{loginInfo ? loginInfo.ip : "--"}</span>
            </div> */}
          </div>
        )}

        <ul>
          {sliderList.children.map((router) => (
            <li key={router.key}>
              <div className="router-img">
                <img src={router.imgUrl} alt="" />
              </div>
              {router.child ? (
                <div className="router-child">
                  <div
                    className="child-title"
                    onClick={() => handleOpenChild(router.key)}
                  >
                    <span>{router.name}</span>
                    <i className="iconfont icon-xiasanjiaoxing" />
                  </div>
                  <div
                    className={`openContent ${
                      openIndex === router.key && open
                        ? "openTxt"
                        : "visbledTxt"
                    }`}
                  >
                    {router.child.map(childRouter => (
                      <div className="link-child" key={childRouter.childId}>
                        <span>{childRouter.childName}</span>
                        {childRouter.updateLink ? (
                          props.userAuth && props.userAuth.isFundPwdSet ? (
                            <div className="flex-direction-row">
                              <Link to={childRouter.forgetLink} onClick={() => handleSliderCancel()}>
                                {childRouter.forgetRouterName}
                              </Link>
                              <Link to={childRouter.updateLink} onClick={() => handleSliderCancel()}>
                                {childRouter.updateRouterName}
                              </Link>
                            </div>
                          ) : (
                            <Link to={childRouter.setLink} onClick={() => handleSliderCancel()}>
                              {childRouter.setRouterName}
                            </Link>
                          )
                        ) : (
                          <Link onClick={(e) => handleToPath(e, childRouter.link, router)}>
                            {childRouter.routerName}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                router.href ? (
                  <a onClick={() => handleToWindowHref(router.href)}>{router.hrefName}</a>
                ) :
                <a onClick={(e) => handleToPath(e, router.pathName, router)}>{router.name}</a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SliderMenu;
