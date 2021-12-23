import React, { Component } from "react";
import { useParams, useHistory } from 'react-router-dom';

import { formData } from '@/assets/js/common';
import "./index.scss";


const NewsDetailsContent = () => {
  const { msg } = useParams();
  const history = useHistory();
  const content = JSON.parse(msg);

  if (!content) {
    handleToBack();
  }

  const handleToBack = () => {
    history.push({
      pathname: '/community/followNews'
    })
  }

  return (
    <div className="followNewsDetail">
      <div className="followNewsDetail-container">
        <div className="followNewsDetail-title">
          <i className="iconfont icon-fanhuijiantou" onClick={handleToBack} />
          <h2>通知详情</h2>
        </div>

        <div className="followNewsDetail-content">
          <h2 className="content-title">{content.title || '--'}</h2>
          <span className="content-time">{formData(content.msgDate, 'YYYY-MM-DD HH:mm:ss')}</span>
          <p className="content-detaile">
            {content.content || '--'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default class FollowNewsDetail extends Component {
  render() {
    return <NewsDetailsContent />;
  }
}
