import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import { useHistory } from 'react-router-dom';
import message from '@tenggouwa/message';
import { Pagination, Avatar, Empty } from 'antd';

import { filterColorClass } from '@/assets/js/common';
import Followed from "@/assets/img/community/status.png";
import { COMMUNITY_LIST } from "./constants.js";
import "./index.scss";

const HomeTop = () => {
  const history = useHistory();
  const handleJump = () => {
    history.push({
      pathname: '/community/myFollow',
    });
  }
  return (
    <div className="home-top">
      <div className="top-item">
        <div>
          <p>我的跟单</p>
          <span>查看跟单收益</span>
        </div>
        <div className="btn" onClick={() => handleJump()}>立即查看</div>
      </div>
    </div>
  );
}

const RenderTypeList = () => {
  const [index, setIndex] = useState(0);
  const handleChooseIndex = (value) => {
    if (index !== value) {
      setIndex(value);
    }
  };
  return (
    <ul className="home-switch">
      {COMMUNITY_LIST.map((item) => (
        <li
          key={item.value}
          className={index === item.value ? "active" : ""}
          onClick={() => handleChooseIndex(item.value)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};


const RenderList = ({ dataSource }) => {
  if (!dataSource || dataSource.length === 0) return <Empty description="暂无数据" />;
  const history = useHistory();
  const handleFollowRouter = (e, router, traderId, following) => {
    e.stopPropagation();
    history.push({
      pathname: `/community${router}/${traderId}/${following}`
    });
  }

  return (
    <div className="communitor-list">
      {dataSource.map((item, index) => (
        <div className="list-item" key={index} onClick={(e) => handleFollowRouter(e, '/traderInfo', item.traderId, item.following)}>
          <div className="top">
            <div className="top-left">
              <Avatar src={item.traderHeadUrl} style={{ width: '27px', height: '27px' }} />
              {/* <img src={item.traderHeadUrl} alt="" /> */}
              <p>{item.traderName}</p>
            </div>
            <p className="top-right">交易天数: {item.dealDays}</p>
          </div>
          <div className="content">
            <div className="content-item">
              <p className="label">累计收益率</p>
              <p className={`value ${filterColorClass(item.earnRate)}`}>{item.earnRate || '--'}%</p>
            </div>
            <div className="content-item">
              <p className="label">总收益</p>
              <p className="value">{item.totalEarnAmount || '--'}</p>
            </div>
            <div className="content-item">
              <p className="label">跟单人数</p>
              <p className="value">{item.totalFlowMan || '--'}</p>
            </div>
          </div>
          <div className="bottom" onClick={(e) => handleFollowRouter(e, '/editFollow', item.traderId, item.following)}>
            <p>
              {item.following === 1 ? "编辑跟单" : "立即跟单"}
              <i className="iconfont icon-jiantouyou" />
            </p>
          </div>
          {item.following === 1 && (
            <img className="followed" src={Followed} alt="" />
          )}
        </div>
      ))}
    </div>
  );
};


@withRouter
@connect((state) => ({
  apis: state.apis,
  lang: state.lang,
}))
@withRouter
export default class Home extends Component {
  
  handleToNotice = () => {
    this.props.history.push('/community/followNews');
  }

  constructor() {
    super();
    this.state = {
      traderList: [],
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      hasNotice: false,
    };
  }
  componentDidMount() {
    this.getList();
    this.getNotice();
  }

  getNotice = async () => {
    try {
      const { code, data } = await this.props.apis.fetchFollowMsgNum();
      if (code === 0) {
        if (data && data !== 0) {
          this.setState({
            hasNotice: true,
          })
        } else {
          this.setState({
            hasNotice: false,
          })
        }
      }
    } catch (error) {
      message.error(error.msg);
    }
  }
  getList = async () => {
    const { pageIndex, pageSize } = this.state;
    try {
      const { code, data } = await this.props.apis.fetchSteadyTraderList({
        pageNo: pageIndex,
        pageSize,
      });
      if (code === 0) {
        this.setState({
          traderList: data.item,
          total: data.total
        });
      }
    } catch (error) {
      message.error(error.msg);
    }
  }
  handleChangePage = (pageIndex) => {
    this.setState({
      pageIndex,
    }, () => this.getList())
  }
  render() {
    const { traderList, pageIndex, pageSize, total, hasNotice } = this.state;
    return (
      <div className="community-home">
        <div className="home-title">
          <h5>社区</h5>
          <i className={`iconfont icon-tongzhi ${hasNotice ? 'red-mull' : ''}`} onClick={this.handleToNotice} />
        </div>
        <HomeTop />
        <RenderTypeList />
        <RenderList dataSource={traderList} />
        <Pagination onChange={this.handleChangePage} hideOnSinglePage current={pageIndex} pageSize={pageSize} size="small" total={total} />
      </div>
    );
  }
}
