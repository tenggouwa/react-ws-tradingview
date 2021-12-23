import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import message from '@tenggouwa/message';
import { Avatar } from 'antd';

import { filterLabel, formData } from '@/assets/js/common';
import TableBase from './tableBase';
import { STATUS_LIST } from './constants';
import './index.scss';

const dataHeader1 = [{
  label: '跟单金额(USDT)',
  value: 'followAmount',
}, {
  label: '跟单收益(USDT)',
  value: 'followProfit',
}, {
  label: '总收益率',
  value: 'action',
  render: (item) => `${item.earnRate || '--'}%`,
}]

const dataHeader2 = [{
  label: '盈利分成',
  value: 'action',
  render: (item) => `${item.followProfitRate || '--'}%`,
}, {
  label: '跟单止损比例',
  value: 'action',
  render: (item) => `${item.followStopLossRate || '--'}%`,
}, {
  label: '跟单止盈比例',
  value: 'action',
  render: (item) => `${item.followStopWinRate || '--'}%`,
}]

const dataHeader3 = [{
  label: '投入金额(USDT)',
  value: 'followAmount',
}, {
  label: '类型',
  value: 'action',
  render: (item) => filterLabel(item.addType, STATUS_LIST)
}, {
  label: '时间',
  value: 'action',
  render: (item) => formData(item.createTime, `${'MM-DD HH:mm' || '--'}`)
}]

const dataHeader4 = [{
  label: '交易对',
  value: 'action',
  render: (item) => (
    item.directionType === 1 ?
      <div>
        <p style={{ padding: 0 }}>{item.contract}</p>
        <br />
        <span className="bear">空仓{item.level}x</span>
      </div> :
      <div>
        <p style={{ padding: 0 }}>{item.contract}</p>
        <br />
        <span className="long">多仓{item.level}x</span>
      </div>
  )
}, {
  label: '开仓价',
  value: 'openPrice',
}, {
  label: '开仓时间',
  value: 'action',
  render: (item) => formData(item.openDate, `${'MM-DD HH:mm:ss' || '--'}`)
}]

const dataHeader5 = [{
  label: '平仓价',
  value: 'closePrice',
}, {
  label: '收益率',
  value: 'action',
  render: (item) => `${item.earnRate || '--'}%`,
}, {
  label: '收益金额',
  value: 'profitAmount',
}]

const BTN_GROUP = [
  // { label: '推荐分享', value: 1 },
  { label: '编辑跟单', value: 2 },
]

@withRouter
@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  appDownLoad: state.appDownLoad,
}))

export default class FollowInfo extends Component {
  constructor() {
    super()
    this.state = {
      followOverview: {},
      intoDetails: [],
      trader: {
        // traderName: '',
        // traderHeadUrl: '',
      },
      overviewText: {},
      bearData: [],
      followType: null,
    }
  }

  componentDidMount() {
    const { historyId, id } = this.props.match.params;
    this.setState({
      historyId,
      traderId: id,
    })
    if (historyId !== 'false') {
      this.queryFollowHistory();
    } else {
      this.queryFollowDetail();
    }
  }

  // 正在跟单详情
  queryFollowDetail = async () => {
    const params = {
      traderId: this.props.match.params.id,
      pageNo: 1,
      pageSize: 10,
    }
    try {
      const result = await this.props.apis.fetchFollowDetail(params)
      if (result.code === 0) {
        const { followDetails, item, followStatus, followDays } = result.data;
        const text = { followStatus, followDays }
        const { traderName, headUrl } = { ...result.data };
        this.setState({
          trader: { traderName, headUrl },
          followOverview: result.data,
          overviewText: text,
          intoDetails: followDetails || [],
          bearData: item,
          followType: text.followStatus,
        })
      }
    } catch (error) {
      message.error(error.msg)
    }
  }

  // 历史跟单详情
  queryFollowHistory = async () => {
    const params = {
      traderId: this.props.match.params.id,
      historyId: this.props.match.params.historyId,
      pageNo: 1,
      pageSize: 10,
    }
    const result = await this.props.apis.fetchFollowOwnHistoryInfo(params)
    if (result.code === 0) {
      const { followDetails, item, followStatus, followDays, } = result.data;
      const text = { followStatus, followDays }
      const { traderName, traderHeadUrl } = { ...result.data };
      this.setState({
        trader: { traderName, traderHeadUrl },
        followOverview: result.data,
        overviewText: text,
        intoDetails: followDetails || [],
        bearData: item,
      })
    } else {
      message.error(result.msg);
    }
  }

  goBack = () => {
    this.props.history.push("/community/myFollow");
  }

  handleJump = () => {
    const { followType } = this.state;
    this.props.history.push(`/community/editFollow/${this.props.match.params.id}/${followType}`);
  }

  render() {
    const { historyId } = this.props.match.params;
    const { followOverview, intoDetails, trader, overviewText, bearData } = this.state;
    return (
      <div>
        <div className="followInfo">
          <p className="followInfo-header">
            <i className="iconfont icon-fanhuijiantou" onClick={this.goBack} />
            <span>跟单详情</span>
            <i />
          </p>
          <div className="followInfo-trader">
            <Avatar size={60} src={historyId !== 'false' ? trader.traderHeadUrl : trader.headUrl} />
            <p>{trader.traderName || '--'}</p>
          </div>
          <div className="followInfo-table">
            <TableBase dataHeader={dataHeader1} dataSource={followOverview} title="跟单概述" text={overviewText} />
            <TableBase dataHeader={dataHeader2} dataSource={followOverview} title="跟单详情" />
            {
              intoDetails.length > 0 ? <p className="earnings-title">跟投详情</p> : ''
            }
            {
              intoDetails.map((item, i) => (
                <div className="earningsDetails" key={`${i}_${item}`}>
                  <TableBase dataHeader={dataHeader3} dataSource={item} />
                </div>
              ))
            }
            {
              bearData.length > 0 ? <p className="earnings-title">收益详情</p> : ''
            }
            {
              bearData.map((item, index) => (
                <div key={`${index}_${item}`}>
                  <div className="earningsDetails">
                    <TableBase dataHeader={dataHeader4} dataSource={bearData[index]} />
                    <TableBase dataHeader={dataHeader5} dataSource={bearData[index]} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {
          historyId === "false" ?
            (
              <div className="followInfo-btn">
                <div>
                  {
                    BTN_GROUP.map((item, i) => (
                      <p key={`${i}_${item}`} onClick={this.handleJump}>{item.label}</p>
                    ))
                  }
                </div>
              </div>
            ) : ''
        }
      </div>
    )
  }
}
