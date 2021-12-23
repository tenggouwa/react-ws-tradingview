import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from 'react-router-dom';
import message from '@tenggouwa/message';
import { Pagination, Avatar, Empty, Modal, Button } from 'antd';

import MoneyPwdModal from '@/components/moneyPwdModal';
import { filterColorClass, formData } from '@/assets/js/common';
import security from '@/assets/js/security';
import { COMMUNITY_LIST } from "./constants.js";
import "./index.scss";

const HomeTop = ({ dataSource = {} }) => (
  <div className="myFollow-top">
    <div className="top">
      <p className="label">累计跟单金额(USDT)</p>
      <span>{dataSource.totalFollowAmount || '--'}</span>
    </div>
    <div className="bottom">
      <div>
        <p className="label">累计收益(USDT)</p>
        <span className="value">{dataSource.totalFollowProfit || '--'}</span>
      </div>
      <div>
        <p className="label">总收益率(%)</p>
        <span className="value">{dataSource.totalFollowEarnRate || '--'}</span>
      </div>
    </div>
  </div>
);

const RenderTypeList = ({ index, setIndex }) => {
  return (
    <ul className="myFollow-switch">
      {COMMUNITY_LIST.map((item) => (
        <li
          key={item.value}
          className={index === item.value ? "active" : ""}
          onClick={() => setIndex(item.value)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};


const RenderList = ({ dataSource, type, openDialog, handleOutWin, handleTranserRouter }) => {
  if (!dataSource || dataSource.length === 0) return <Empty description="暂无数据" />;
  const history = useHistory();
  const handleFollowRouter = (e, router, item, following) => {
    e.stopPropagation();
    let path = `/community${router}/${item.traderId}`;
    if (following) path = `${path}/${following}`;
    history.push({
      pathname: path
    });
  }

  const handleJumpInfo = (item) => {
    history.push({
      pathname: `/community/followInfo/${item.traderId}${type !== 1 ? `/${item.historyId}` : '/false'}`,
      // pathname: `${`/community/followInfo/${item.traderId}${type !== 1 ? `/${item.historyId}` : '/false'}`}`
    });
  }

  return (
    <div className="communitor-list">
      {dataSource.map((item, index) => (
        <div className="list-item" key={index} onClick={() => handleJumpInfo(item)}>
          <div className="top">
            <div className="top-left">
              <Avatar src={item.traderHeadUrl} style={{ width: '27px', height: '27px' }} />
              <p>{item.traderName}</p>
              {
                type === 1 ? (
                  <p className="top-center" onClick={(e) => handleTranserRouter(e, '/transferFollow', item)}>
                    <i className="iconfont icon-huazhuan" />划转
                  </p>
                ) : null
              }
            </div>
            
            {
              type === 1 ? (
                <p className="top-right">已跟单{item.followDays || '--'}天</p>
              ) : (
                <p className="top-right">已结束</p>
              )
            }
          </div>
          <div className="content">
            <div className="content-item">
              <p className="label">跟单金额</p>
              <p className="value">{item.followAmount || '--'}</p>
            </div>
            {
              type === 1 && (
                <div className="content-item">
                  <p className="label">活动赠金</p>
                  <p className="value">{item.bonusAmount || '--'}</p>
                </div>
              )
            }
            <div className="content-item">
              <p className="label">跟单收益</p>
              <p className={`value ${filterColorClass()}`}>
                {item.thisFollowProfit || '--'}
                {
                  (type === 1 && Number(item.thisFollowProfit) !== 0) && <span onClick={(e) => handleOutWin(e, item)}>提取</span>
                }
              </p>
            </div>
            {
              type !== 1 && (
                <div className="content-item">
                  <p className="label">开始时间</p>
                  <p className="value">{formData(item.followStartTime, 'YYYY-MM-DD')}</p>
                </div>
              )
            }
            {
              type !== 1 && (
                <div className="content-item">
                  <p className="label">结束时间</p>
                  <p className="value">{formData(item.followEndTime, 'YYYY-MM-DD')}</p>
                </div>
              )
            }
          </div>
          {
            type === 1 && (
              <div className="bottom">
                <p onClick={(e) => openDialog(e, item)}>
                  取消跟单
                </p>
                <p onClick={(e) => handleFollowRouter(e, '/editFollow', item, 1)}>
                  跟单设置
                  <i className="iconfont icon-jiantouyou" />
                </p>
              </div>
            )
          }
        </div>
      ))}
    </div>
  );
};

@connect((state) => ({
  apis: state.apis,
  lang: state.lang,
}))
@withRouter
export default class MyFollow extends Component {
  constructor() {
    super();
    this.state = {
      traderList: [],
      type: 1,
      otherData: {},
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      cancelItem: {},
      outItem: {},
      transferVisable: false,
      transferItem: {}
    };
  }
  componentDidMount() {
    this.getList();
  }
  getList = async () => {
    const { pageIndex, pageSize, type } = this.state;
    try {
      const { code, data } = await this.props.apis.fetchFollowOwn({
        pageNo: pageIndex,
        pageSize,
        communityType: 2,
        followOrderType: type,
      });
      if (code === 0) {
        const { item, total, ...others } = data;
        this.setState({
          traderList: item,
          otherData: others,
          total,
        });
      }
    } catch (error) {
      message.error(error.msg);
    }
  }
  handleChooseIndex = value => {
    this.setState({
      type: value,
      pageIndex: 1,
      traderList: [],
    }, () => this.getList());
  }
  handleChangePage = (pageIndex) => {
    this.setState({
      pageIndex,
    }, () => this.getList());
  }

  handleOpenDialog = (e, item) => {
    e.stopPropagation();
    this.setState({
      cancelItem: item,
      visible: true,
    })
  }

  handleCloseDialog = () => {
    this.setState({
      cancelItem: {},
      visible: false,
    })
  }

  handleEmitPwd = async (value) => {
    const { cancelItem } = this.state;
    try {
      const res = await this.props.apis.fetchFollowCancel({
        traderId: cancelItem.traderId,
        communityType: 2,
        fundPassword: security(0, value),
      });
      if (res.code === 0) {
        message.success('取消跟单成功！');
        this.handleChangePage(1);
      }
    } catch (error) {
      message.error(error.msg);
    }
  }

  handleOutWin = (e, item) => {
    e.stopPropagation();
    if (Number(item.settledProfit) <= 0) {
      message.info('可提取利润为0');
      return false;
    }
    this.setState({
      outItem: item,
      modalVisible: true,
    });
  }

  handleOutWinFetch = async () => {
    const { outItem } = this.state;
    try {
      const { code } = await this.props.apis.outWinFetch({
        traderId: outItem.traderId,
        drawProfitAmount: outItem.thisFollowProfit
      });
      if (code === 0) {
        message.success('提取收益成功！');
      }
    } catch (error) {
      message.error(error.msg);
    } finally {
      this.handleCloseOut();
      this.setState({
        pageIndex: 1
      }, () => this.getList());
    }
  }
  handleCloseOut = () => {
    this.setState({
      outItem: {},
      modalVisible: false,
    });
  }

  handleTransferCancel = () => {
    this.setState({
      transferVisable: false,
    })
  }

  handleTransferComfirm = () => {
    const { transferItem } = this.state;
    const { router, item } = transferItem;
    this.props.history.push(`/community${router}/${item.traderId}`);
    this.setState({
      transferVisable: false
    })
  }

  handleTranserRouter = (e, router, item) => {
    e.stopPropagation();
    if (item.bonusAmount > 0) {
      this.setState({
        transferVisable: true,
        transferItem: {
          router,
          item
        }
      })
    } else {
      this.props.history.push(`/community${router}/${item.traderId}`);
    }
  }

  render() {
    const { traderList, type, otherData, pageIndex, pageSize, total, visible, modalVisible, outItem, transferVisable } = this.state;
    return (
      <div className="myFollow">
        <HomeTop dataSource={otherData} />
        <RenderTypeList index={type} setIndex={this.handleChooseIndex} />
        <RenderList type={type} dataSource={traderList} openDialog={this.handleOpenDialog} handleOutWin={this.handleOutWin} handleTranserRouter={this.handleTranserRouter} />
        <Pagination onChange={this.handleChangePage} hideOnSinglePage current={pageIndex} pageSize={pageSize} size="small" total={total} />
        {/* 取消跟随弹窗 */}
        <MoneyPwdModal
          isModalVisible={visible}
          handleCancelVisable={() => this.handleCloseDialog()}
          handleEmitPwd={this.handleEmitPwd}
        />
        <Modal
          title="温馨提示"
          visible={modalVisible}
          bodyStyle={{ paddingBottom: 0 }}
          className="commonModal-modal"
          maskClosable={false}
          onCancel={() => this.handleCloseOut()}
          footer={
            <Button key="submit" type="primary" onClick={this.handleOutWinFetch}>
                确认
            </Button>
          }
        >
          <div className="outWin">
            <div>
              <p>可提取</p>
              <p>{outItem.thisFollowProfit || ''} USDT</p>
            </div>
            <p className="tips">利润每周日8点结算</p>
          </div>
        </Modal>

        {/* 跟单划转弹窗 */}
        <Modal
          title='温馨提示'
          visible={transferVisable}
          className="commonModal-modal"
          onCancel={() => this.handleTransferCancel()}
          maskClosable={false}
          footer={
            <Button key="submit" type="primary" onClick={this.handleTransferComfirm}>
                确认
            </Button>
          }
        >
          <p>
            划转跟单将收回赠金，划转金额24小时到账
          </p>
      </Modal>
      </div>
    );
  }
}
