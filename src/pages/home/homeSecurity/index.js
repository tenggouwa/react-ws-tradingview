import React from 'react';

import { TRADESECURITYLIST } from './constants';

import './index.scss';

const HomeSecurity = () => {
  return (
    <div className="homeSecurity">
      <div className="homeSecurity-content">
        <h2>开启您的数字货币之旅</h2>
        {
          TRADESECURITYLIST.map((item, index) => (
            <div className="homeSecurity-item" key={index}>
              <img src={item.imgUrl} alt="" />
              <span className="title">{item.title}</span>
              <p>{item.content}</p>
            </div>
          ))
        }
      </div>      
    </div>
  )
};

export default HomeSecurity;
