import React from 'react';

import './index.scss'

export default function TitleWithTip ({ title = '', tip = false, onTipClick = {} }) {

  const tipClick = () => {
    onTipClick();
  }
  return (
    <div className="InviteTitle">
      <h5>{title}</h5>
      { tip && <i onClick={tipClick} className="iconfont icon-info" /> }
    </div>
  )
};
