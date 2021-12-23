import React from 'react';
import { useHistory } from 'react-router-dom';

import defaultAvator from '@/assets/img/community/defaultAvator.png';
import './index.scss';

const FollowHeader = ({ title, className, dataSource }) => {
  const history = useHistory();
  const handleToBack = () => {
    history.push('/community/myFollow');
  }
  return (
    <div className="followHeader">
      <div className="followHeader-title">
        <i className="iconfont icon-fanhuijiantou" onClick={handleToBack} />
        <h2>{title}</h2>
      </div>

      <div className="followHeader-userInfo">
        <div className="userInfo-avator">
          <img src={dataSource && dataSource.headUrl ? dataSource.headUrl : defaultAvator} alt="" />
        </div>
        <div className="userInfo">
          <span>{dataSource && dataSource ? dataSource.traderName : null}</span>
          <span className={className}>当前跟随交易员</span>
        </div>
      </div>
    </div>
  );
};

export default FollowHeader;
