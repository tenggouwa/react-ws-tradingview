import React from 'react';
import QRCode from 'qrcode.react'

import ModelPng from '@/assets/img/home/models.png';
import IosPng from '@/assets/img/home/ios.png';
import Android from '@/assets/img/home/android.png';
import './index.scss';

const HomeCode = () => {

  return (
    <div className="homeCode">
      <div className="homeCode-container">
        <h1>随时随地，进行交易</h1>

        <div className="homeCode-title">
          <span>支持iOS、Android。</span>
          <span>下载客户端，开启您的数字之旅</span>
        </div>

        <div className="homeCode-img">
          <img src={ModelPng} alt="" />
        </div>

        <div className="homeCode-hoverBtn">
          <div className="hoverbtn">
            <img src={IosPng} alt="" />
            <span>iPhone</span>
          </div>
          <div className="hoverbtn">
            <img src={Android} alt="" />
            <span>Android</span>
          </div>
        </div>

        <div className="homeCode-code">
          <div className="code">
            <QRCode size={118} value="https://invite.tsex.io/#/?type=downLoad" />
          </div>
          <span>ios & Android 扫码下载</span>
        </div>
      </div>
    </div>
  )
}

export default HomeCode;
