import React, { Component } from 'react'
import { connect } from 'react-redux';
import message from '@tenggouwa/message';
import CommonBanner from '@/components/commonBanner';
import CommonFooter from '@/components/commonFooter';

import HomeNotice from './homeNotice';
import HomeTable from './homeTable';
import HomeCode from './homeCode';
import HomeSecurity from './homeSecurity';

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  wsData: state.wsData,
  wsObj: state.wsObj,
  sendWs: state.sendWs,
  userAuth: state.userAuth,
}))
export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      bannerList: [],
      noticeList: [],
      tableList: [],
      currendTableIndex: 2,
    }
  }

  componentDidMount() {
    const { currendTableIndex } = this.state;
    this.getBannerList();
    this.getNoticeList();
    this.getTableList(currendTableIndex)
  }

  componentWillReceiveProps(nextProps) {
    const wsData = nextProps.wsData.ws_20
    if (wsData && wsData !== this.props.wsData.ws_20) {
      this.setState({
        tableList: wsData
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify({
      reqType: -5,
      type: 20
    })))
  }

  // 轮播
  getBannerList = async () => {
    const { apis } = this.props;
    try {
      const res = await apis.getContentPic();
      if (res.code === 0) {
        this.setState({
          bannerList: res.data.allInfos.map(item => item.allLanguage).flat()
        })
      }
    } catch (e) {
      message.error(e.message);
    }
  }

  // 公告
  getNoticeList = async () => {
    const { apis } = this.props;
    try {
      const res = await apis.tsetNotice();
      if (res.code === 0) {
        this.setState({
          noticeList: res.data
        })
      }
    } catch (e) {
      message.error(e.message);
    }
  }

  // 表格
  getTableList = async (type) => {
    const paramAry = {
      reqType: 20,
      handleType: 1,
      param: JSON.stringify({
          type: 20,
          cardType: type,
      })
    }
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(paramAry)))
  }

  // 获取tab切换下标
  handleTabCurrentIndex = async (value) => {
    this.setState({
      currendTableIndex: value
    }, () => this.getTableList(value))
  }


  render() {
    const {
      bannerList,
      noticeList,
      tableList
    } = this.state;
    // const bannerData =  bannerList.filter(item => item.language === chooseLang(lang)) || [];
    return (
      <React.Fragment>
        <CommonBanner dataSource={[...bannerList, ...bannerList]} height="160" />
        <HomeNotice dataSource={noticeList} />
        <HomeTable dataSource={tableList} currentIndex={this.handleTabCurrentIndex} />
        <HomeCode />
        <HomeSecurity />
        <CommonFooter props={this.props} />
      </React.Fragment>
    )
  }
}
