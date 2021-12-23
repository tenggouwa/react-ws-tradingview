import React, { useRef, useEffect, useState } from "react";
import "./index.scss";

const HomeNotice = ({ speed = 2000, height = 25, dataSource }) => {

  // 设置定时器
  const timeRef = useRef();

  const [numbers, setNumber] = useState(0);

  const [marginTop, setMarginTop] = useState(0);

  const [show, setShow] = useState(true);

  // 设置盒子高度
  function warpperHeightStyle() {
    return {
      height: height + "px",
      lineHeight: height + "px",
    };
  }

  useEffect(() => {
    timeRef.current = setTimeout(() => {
      if (numbers === dataSource.length - 1) {
        setShow(false);
        setNumber(0);
        setMarginTop(0);
      } else {
        setShow(true)
        setNumber(numbers + 1);
        setMarginTop(marginTop - 25);
      }
    }, speed);

    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    }
  });

  const handleToMore = () => {
    window.location.href = 'https://douyuehelp.zendesk.com/hc/zh-tw';
  }

  return (
    <div className="homeNotice">
      <div className="homeNotice-main">
        <div className="homeNotice-item">
          <i className="iconfont icon-laba1" />
          公告中心
        </div>
        <div className="homeNotice-content" style={warpperHeightStyle()}>
          <ul style={{ marginTop: marginTop, transition: show ? 'all .5s linear' : '' }}>
            {
              dataSource.map(item => 
                <li className="text" key={item.id}>
                  {item.title}
                </li>
              )
            }
          </ul>
        </div>
        <div className="homeNotice-item" onClick={handleToMore}>
          更多
          <i className="iconfont icon-gengduo1" />
        </div>
      </div>
    </div>
  );
};

export default HomeNotice;
