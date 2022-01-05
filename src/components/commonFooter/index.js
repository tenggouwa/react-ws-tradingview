import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import OPTIONS from '../../reducers/options';
import { TOBABOUT_LIST, SERVICE_LIST } from './constants';

import './index.scss';

const CommonFooter = ({ props }) => {
  const [aboutToggle, setAboutToggle] = useState(false);
  const [serviceToggle, setServiceToggle] = useState(false);
  const history = useHistory();
  const handleAboutToggle = () => {
    setAboutToggle(!aboutToggle);
  }

  const handleToRouter = (path) => {
    history.push(path);
  }
  return (
    <div className="footer">
      <div className="footer-main">
        <h1>进入社区</h1>

        <div className={`footer-btn ${props.userAuth !== 0 ? 'footer-center' : null}`}>
          {
            props.userAuth !== 0 ? null : <Button className="btn register" onClick={() => handleToRouter('/register')}>注册</Button>
          }
          <Button className="btn play" onClick={() => handleToRouter('/community/home')}>进入社区</Button>
        </div>
        <div className="footer-tobAbout">
          <div className="footer-tobAbout-title">
            <h5>关于</h5>
            <span onClick={handleAboutToggle}>{aboutToggle ? '-' : '+' }</span>
          </div>
          <div className={`tobAboutBox ${aboutToggle ? 'visbleTxt' : 'openTxt'}`}>
          {
            TOBABOUT_LIST.map((child) => (
              <p key={child.key}>
                <a href={`${OPTIONS.helpcenter}${child.link}`} target="_blank" rel="noopener noreferrer">{child.content}</a>  
              </p>
            ))
          }
          </div>
          <div className="footer-tobAbout-title">
            <h5>服务</h5>
            <span onClick={() => setServiceToggle(!serviceToggle)}>{serviceToggle ? '-' : '+' }</span>
          </div>
          <div className={`tobAboutBox ${serviceToggle ? 'visbleTxt' : 'openTxt'}`}>
          {
            SERVICE_LIST.map((child) => (
              <p key={child.key}>
                <a href={`${OPTIONS.helpcenter}${child.link}`} target="_blank" rel="noopener noreferrer">{child.content}</a>  
              </p>
            ))
          }
          </div>
        </div>
        {/* 社区 */}
        <div className="footer-tobContent">
          <h5>社区</h5>
          <div className="footer-tonConten-card">
            <ul>
              {/* Telegram */}
              <li style={{ background: "#77808F" }}>
                <a
                  href="https://t.me/TSLx_CN"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="iconfont icon-icon-test2" />
                </a>
              </li>
              {/* twitter */}
              <li style={{ background: "#77808F" }}>
                <a
                  href="https://twitter.com/@TSLx_Official"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="iconfont icon-icon-test4" />
                </a>
              </li>
              {/* Facebook */}
              <li style={{ background: "#77808F" }}>
                <a
                  href="https://www.facebook.com/profile.php?id=100063794261922 "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="iconfont icon-icon-test13" />
                </a>
              </li>
              {/* LinkedIn */}
              <li style={{ background: "#77808F" }}>
                <a
                  href="https://www.linkedin.com/company/tslx88_official"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="iconfont icon-icon-test6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CommonFooter;
