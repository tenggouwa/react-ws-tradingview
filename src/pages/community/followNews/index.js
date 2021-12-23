import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import message from '@tenggouwa/message';

import { formData } from '@/assets/js/common';
import NoData from '@/assets/img/community/noNews.png';
import "./index.scss";

const NewsList = ({ dataSource, readNewItem, readNewAll }) => {
  const history = useHistory();
  const handleToBack = () => {
    history.push('/community/home');
  };

  const handleToDetail = item => {
    if (!item) {
      readNewAll();
    } else {
      readNewItem(item.id);
      history.push(`/community/followNewsDetail/${JSON.stringify(item)}`);
    }
  }
  return (
    <div className="followNews">
      <div className="followNews-container">
        <div className="followNews-title">
          <i className="iconfont icon-fanhuijiantou" onClick={handleToBack} />
          <h2>跟单通知</h2>
          <span onClick={() => handleToDetail()}>一键已读</span>
        </div>

        <ul className="item">
          {dataSource.length > 0 ? dataSource.map((item, index) => (
            <li className={`item-list ${item.read === 1 ? 'active' : ''}`} key={index}>
              <div className="title-box">
                <h4>{item.title}</h4>
                <span className="time">{formData(item.msgDate, 'YYYY-MM-DD HH:mm:ss')}</span>
              </div>

              <div className="content" onClick={() => handleToDetail(item)}>
                <p>
                  {item.content}
                </p>
                <i className="iconfont icon-jiantouyou" />
              </div>

              <div className="underline" />
            </li>
          )) : <div className="noData">
            <img src={NoData} alt="" />
            <p>暂无消息呢~</p>
          </div>
        }
        </ul>
      </div>
    </div>
  );
};

@connect((state) => ({
  apis: state.apis,
  lang: state.lang,
}))
@withRouter
export default class FollowNews extends Component {
  constructor() { 
    super()
    this.state = {
      newsListData: []
    }
  }

  componentDidMount() {
    this.getNewsList();
  }

  readNewAll = async () => {
    try {
      const res = await this.props.apis.fetchFollowMsgReadAll();
      if (res.code === 0) {
        message.success('全部已读！');
        this.getNewsList();
      }
    } catch (e) {
      message.error(e.error);
    }
  }

  readNewItem = async (idx) => {
    try {
      const res = await this.props.apis.fetchFollowMsgRead({ msgId: idx });
    } catch (e) {
      message.error(e.error);
    }
  }
  async getNewsList() {
    try {
      const res = await this.props.apis.fetchFollowMsgList();
      if (res.code === 0) {
        this.setState({
          newsListData: res.data.item
        })
      }
    } catch (e) {
      message.error(e.error);
    }
  }

  render() {
    return <NewsList dataSource={this.state.newsListData} readNewAll={this.readNewAll} readNewItem={this.readNewItem} />;
  }
}
