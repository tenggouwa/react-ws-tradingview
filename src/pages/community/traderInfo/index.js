import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Avatar, Pagination, Empty } from 'antd';
// import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'
import { message } from '@tenggouwa/message';
import dayjs from 'dayjs';

import { filterColorClass, formData } from '@/assets/js/common';
import FullImg from '@/assets/img/community/full.png';
import { COMMUNITY_LIST, HISTORY_LIST, TIME_LIST } from "./constants.js";
import './index.scss';


const TraderInfoTop = ({ dataSource }) => {
  if (!dataSource) return false;
  return [
    <div className="traderInfoTop">
      <Avatar src={dataSource.traderHeadUrl} style={{ width: '50px', height: '50px' }} />
      <div className="right">
        <h4>{dataSource.traderName}</h4>
        {
          dataSource.full === 1 && (
            <div>
              <img src={FullImg} alt="" />
              <span>满员</span>
            </div>
          )
        }
        <p>{formData(dataSource.becomeTraderDate, 'YYYY-MM-DD')}成为交易员</p>
      </div>
    </div>,
    <div className="traderInfoTop-introduction">个人简介: {dataSource.introduction || '--'}</div>,
    <div className="traderInfoTop-info">
      <div className="top">
        <h4>交易分析</h4>
        <p>跟单利润分成比例: <span>{dataSource.flowProfitRate}%</span></p>
      </div>
      <div className="content">
        <div className="content-item">
          <p className="label">累计收益率</p>
          <p className={`value ${filterColorClass(dataSource.earnRate)}`}>{dataSource.earnRate || '--'}%</p>
        </div>
        <div className="content-item">
          <p className="label">进三周交易胜率</p>
          <p className="value">{dataSource.traderWinRate || '--'}</p>
        </div>
        <div className="content-item">
          <p className="label">近三周最大回撤</p>
          <p className="value">{dataSource.maxRetracement || '--'}%</p>
        </div>
        <div className="content-item">
          <p className="label">交易天数</p>
          <p className="value">{dataSource.dealDays || '--'}</p>
        </div>
        <div className="content-item">
          <p className="label">交易笔数</p>
          <p className="value">{dataSource.tradeNum || '--'}</p>
        </div>
        <div className="content-item">
          <p className="label">累计跟随人数</p>
          <p className="value">{dataSource.totalFlowMan || '--'}</p>
        </div>
      </div>
    </div>
  ];
}

const RenderTypeList = ({ dataSource, index, handleChange }) => {
  const handleChangeLi = (value) => {
    if (dataSource && dataSource.length > 0) {
      handleChange(value)
    }
  }
  const indexLi = index || 0
  return (
    <ul className="traderInfo-switch">
      {dataSource.map((item) => (
        <li
          key={item.value}
          className={indexLi === item.value ? "active" : ""}
          onClick={() => handleChangeLi(item.value)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

const EarnChart = ({ index, dataSource, others, chooseTime }) => {
  if (!dataSource || dataSource.length === 0) return <Empty description="暂无数据" />;
  const xLine = dataSource.map(item => item.pointDate)
  const yLine = dataSource.map(item => item.earnRate)
  const option = {
    grid: {
      top: '3%',
      left: '14%',
      right: '0',
      bottom: '10%',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xLine,
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: value => {
          if (index === 0) {
            return `${dayjs(value).format('HH:mm')}`;
          }
          return `${dayjs(value).format('MM-DD')}`;
        }
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle:{
          color:'#ededed'  //网格线颜色
        },
      },
      axisLabel: {
        formatter: value => {
          return `${value}%`;
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [
      {
        data: yLine,
        type: 'line',
        symbol: 'none',
        smooth:true,
        lineStyle: {
          width: 1,
          color: 'rgba(243, 194, 25, 1)',
        },
        areaStyle: {
          origin: 'start',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#F7D134' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(241, 186, 12, 0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
    ]
  };
  return (
    <div className="earnRate">
      <div className="top">
        <h5>收益率走势</h5>
        <div>
          <p>最高: <span className={filterColorClass(others.maxEarnRate)}>{`${others.maxEarnRate || '--'}`}%</span></p>
          <p>最低: <span className={filterColorClass(others.minEarnRate)}>{`${others.minEarnRate || '--'}`}%</span></p>
        </div>
      </div>
      <ReactEcharts
        option={option}
        style={{ height: '250px', width: '100%', paddingBottom: '100' }}
      />
      <ul>
        {
          TIME_LIST.map(item => (
            <li
              className={`${index === item.value ? 'active' : ''}`}
              onClick={() => chooseTime(item.value)}
            >
              {item.label}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
const RenderHistoryItem = ({ dataSource }) => {
  if (!dataSource) return false;
  const color = dataSource.directionType === 1;
  return (
    <div className="traderInfoBottom-info">
      <div className="coin">
        <div>
          <Avatar src={dataSource.coinIconUrl} style={{ width: '20px', height: '20px', marginLeft: '0' }} />
          <span>{dataSource.contract}</span>
          <p className={color ? 'red' : 'green'}>{color ? '空' : '多'}仓{dataSource.lever}x</p>
        </div>
        <p className="time">平仓时间: <span>{formData(dataSource.closeDate, 'MM.DD HH:mm')}</span></p>
      </div>
      <div className="content">
        <div className="content-item">
          <p className="label">开仓价格</p>
          <p className="value">{dataSource.openPrice || '--'}</p>
        </div>
        <div className="content-item">
          <p className="label">平仓价格</p>
          <p className="value">{dataSource.closePrice || '--'}</p>
        </div>
        <div className="content-item">
          <p className="label">收益率</p>
          <p className={`value ${filterColorClass(dataSource.earnRate)}`}>{dataSource.earnRate || '--'}%</p>
        </div>
      </div>
    </div>
  )
}
const RenderHistory = ({ dataSource, first }) => {
  if (first) {
    if (!dataSource || dataSource.length === 0) return false;
    return <div className="lastone">
      <h5>最近一次</h5>
      <RenderHistoryItem dataSource={dataSource[0]} />
    </div>
  }
  if (!dataSource || dataSource.length === 0) return <Empty description="暂无数据" />;
  return (
    <div>{dataSource.map(item => <RenderHistoryItem dataSource={item} />)}</div>
  )
}

const FollowList = ({ dataSource }) => {
  if (!dataSource || dataSource.length === 0) return <Empty description="暂无数据" />;
  return (
    <div className="followList-list">
      {dataSource.map((item, index) => (
        <div className="list-item" key={index}>
          <div className="top">
            <div className="top-left">
              <Avatar src={item.headUrl} style={{ width: '27px', height: '27px' }} />
              <p>{item.userName}</p>
            </div>
          </div>
          <div className="content">
            <div className="content-item">
              <p className="label">跟随总额</p>
              <p className="value">{item.totalFollowAmount || '--'}</p>
            </div>
            <div className="content-item">
              <p className="label">跟随收益(USDT)</p>
              <p className={`value ${filterColorClass(item.totalFollowProfit)}`}>{item.totalFollowProfit || '--'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

@withRouter
@connect((state) => ({
  apis: state.apis,
  lang: state.lang,
}))

export default class TraderInfo extends Component {
  constructor() {
    super();
    this.state = {
      following: 0,
      traderInfo: {},
      traderHistory: [],
      index: 0,
      pageSize: 10,
      pageNo: 1,
      total: 0,
      timeIndex: 0,
      earnList: [],
      traderHistoryFirst: {},
      earnOthers: {},
    };
  }
  componentDidMount() {
    const traderId = this.props.match.params.id;
    const following = this.props.match.params.following;
    this.setState({
      traderId,
      following,
    }, () => {
      this.getTraderInfo();
      this.dataInit();
    })
  }
  getTraderInfo = async () => {
    const { traderId } = this.state;
    try {
      const { code, data } = await this.props.apis.fetchFollowTradeInfo({
        traderId,
        communityType: 2,
      });
      if (code === 0) {
        this.setState({
          traderInfo: data,
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  dataInit = () => {
    const { index } = this.state;
    if (index === 0) { // 交易信息
      this.getTradeHistory();
      this.getEarnList();
    } else {
      this.getFollowList();
    }
  }
  getTradeHistory = async () => {
    const { traderId, pageNo, pageSize } = this.state;
    try {
      const { code, data } = await this.props.apis.fetchTraderOrderHistory({
        traderId,
        communityType: 2,
        pageNo,
        pageSize,
      });
      if (code === 0) {
        this.setState({
          traderHistory: data.item,
          total: data.total,
        });
        if (pageNo === 1) {
          this.setState({
            traderHistoryFirst: [data.item[0]],
          });
        }
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  handleChooseIndex = value => {
    this.setState({
      index: value,
      pageNo: 1,
      total: 0,
      traderHistory: [],
    }, () => this.dataInit());
  }
  handleChangePage = (pageNo) => {
    this.setState({
      pageNo,
    }, () => this.dataInit());
  }
  getFollowList = async () => {
    const { traderId, pageNo, pageSize } = this.state;
    try {
      const { code, data } = await this.props.apis.fetchTraderFollowList({
        traderId,
        communityType: 2,
        pageNo,
        pageSize,
      });
      if (code === 0) {
        this.setState({
          traderHistory: data.item,
          total: data.total,
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  filterTime = () => {
    const { timeIndex } = this.state;
    const endTime = dayjs().valueOf();
    let startTime;
    if (timeIndex === 0) {
      startTime = dayjs().subtract(24, 'hour').valueOf();
    } else if (timeIndex === 1) {
      startTime = dayjs().subtract(1, 'month').valueOf();
    } else if (timeIndex === 2) {
      startTime = dayjs().subtract(3, 'month').valueOf();
    } else if (timeIndex === 3) {
      startTime = dayjs().subtract(6, 'month').valueOf();
    }
    return [startTime, endTime];
  }
  getEarnList = async () => {
    const { traderId, timeIndex } = this.state;
    try {
      const { code, data } = await this.props.apis.fetchFollowTradeRateTrend({
        traderId,
        communityType: 2,
        earnRateQueryType: timeIndex,
        startDate: this.filterTime()[0],
        endDate: this.filterTime()[1]
      });
      if (code === 0) {
        const { item, ...others } = data;
        this.setState({
          earnList: item,
          earnOthers: others
        });
      } else {
        this.setState({
          earnList: [],
          earnOthers: {}
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  handleChooseTime = (value) => {
    this.setState({
      timeIndex: value
    }, () => this.getEarnList());
  }
  handleJump = () => {
    const { traderId, following } = this.state;
    const path = `/community/editFollow/${traderId}/${following}`;
    this.props.history.push(path);
  }
  render() {
    const {
      traderInfo,
      index,
      traderHistory,
      traderHistoryFirst,
      pageNo,
      pageSize,
      total,
      timeIndex,
      earnList,
      earnOthers,
      following,
    } = this.state;
    return (
      <div className="traderInfo">
        <TraderInfoTop dataSource={traderInfo} />
        <RenderTypeList dataSource={COMMUNITY_LIST} index={index} handleChange={this.handleChooseIndex} />
        {
          index === 0 ? [
            <RenderHistory first dataSource={traderHistoryFirst} />,
            <EarnChart chooseTime={this.handleChooseTime} index={timeIndex} dataSource={earnList} others={earnOthers} />,
            <RenderTypeList dataSource={HISTORY_LIST} />,
            <RenderHistory dataSource={traderHistory} />
          ] : (
            <FollowList dataSource={traderHistory} />
          )
        }
        <Pagination onChange={this.handleChangePage} hideOnSinglePage current={pageNo} pageSize={pageSize} size="small" total={total} />
        <div className="traderInfo-btn">
          <div>立即跟单</div>
        </div>
        <div className="traderInfo-btn" onClick={() => this.handleJump()}>
          <div>{following === '0' ? '立即跟单' : '编辑跟单'}</div>
        </div>
      </div>
    )
  }
}
