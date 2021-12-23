import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Select, Pagination } from 'antd';
import message from '@tenggouwa/message';
import CommonTableList from '@/components/commonTableList';
import { filterLabel, formData } from '@/assets/js/common';
import { ASSETS_TYPE, STATUS_LIST, WITH_STATUS, WALLET_LIST } from './constants';
import './index.scss'

const { Option } = Select;

const OrderType = ({ index, handleChoose }) => (
  <ul className="assetsRecord-type">
    {
      ASSETS_TYPE.map(item => (
        <li
          key={item.value}
          className={item.value === index ? 'active' : ''}
          onClick={() => handleChoose(item.value)}
        >
          {item.label}
        </li>
      ))
    }
  </ul>
);

@withRouter
@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  getUserAuth: state.getUserAuth,
}))

export default class AssetsRecord extends Component {
  constructor() {
    super();
    this.state = {
      orderIndex: '0',
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      coinType: '0',
      coinTypeList: [],
      steadyType: '',
      steadyTypes: [],
      dataSource: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getCoinTypes();
    this.getSteadyTypes();
    this.switchTypeGetList();
  }

  handleChoose = index => {
    const { steadyTypes } = this.state;
    this.setState({
      orderIndex: index,
      coinType: '0',
      steadyType: steadyTypes[0].key,
      pageIndex: 1,
      total: 0,
    }, () => this.switchTypeGetList());
  }
  

  switchTypeGetList = () => {
    const { orderIndex } = this.state;
    if (orderIndex === '0' || orderIndex === '1') {
      // this.getCoinTypes();
      this.getCoinRecords();
    } else if (orderIndex === '2') {
      this.getTransferRecord();
    } else {
      this.getCommunityRecord();
    }
  }

  handlePageChange = (page) => {
    this.setState({
      pageIndex: page,
    }, () => this.switchTypeGetList());
  }

  handleSelectChange = (key) => {
    this.setState({
      coinType: key,
      pageIndex: 1,
    }, () => this.getCoinRecords());
  }
  
  handleSelectSteadyChange = (key) => {
    this.setState({
      steadyType: key,
      pageIndex: 1,
    }, () => this.getCommunityRecord());
  }

  // 提币 - 获取币种
  getCoinTypes = async () => {
    try {
      const { code, data } = await this.props.apis.queryCoinTypes();
      const coinTypes=[{ key: '0', value: '全部币种' }];
      if (code === 0) {
        coinTypes.push(...data.map(item => ({
          key: item.id,
          value: item.name
        })));
        this.setState({
          coinTypeList: coinTypes
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  // 提币 - 获取充币记录信息
  getCoinRecords = async () => {
    const { orderIndex, coinType, pageIndex, pageSize } = this.state;
    this.setState({ loading: true });
    const params = {
      pageNo: pageIndex,
      pageSize,
      assetId: coinType,
      transferType: orderIndex === '0' ? 1 : 2
    };
    try {
      const { code, data } = await this.props.apis.queryCoinRecord(params);
      if (code === 0) {
        this.setState({
          dataSource: data.data || [],
          total: data.total,
        });
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  // 划转 - 记录
  getTransferRecord = async (page) => {
    const { pageIndex, pageSize } = this.state;
    this.setState({ loading: true });
    const params = {
      pageNo: page || pageIndex,
      pageSize,
    }
    try {
      const { code, data } = await this.props.apis.queryTransferRecord(params);
      if (code === 0) {
        const dataLists = data.data;
        this.setState({
          dataSource: dataLists,
          total: data.total,
        });
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({ loading: false });
    }
  }
  // 社区 - 获取类型
  getSteadyTypes = async () => {
    try {
      const { code, data } = await this.props.apis.getSteadyTypeList();
      if (code === 0) {
        const steadyTypes = data.map(item => ({
          key: item.code,
          value: item.name
        }));
        this.setState({
          steadyType: steadyTypes[0].key,
          steadyTypes
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  // 稳健区 - 记录
  getCommunityRecord = async () => {
    const { pageIndex, pageSize, steadyType } = this.state;
    this.setState({ loading: true });
    const params = {
      pageNo: pageIndex,
      pageSize,
      type: steadyType,
    }
    try {
      const { code, data } = await this.props.apis.getSteadyList(params);
      if (code === 0) {
        const dataLists = data.item;
        this.setState({
          dataSource: dataLists,
          total: data.total,
        });
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  // 取消提币
  cancelWithDraw = async item => {
    try {
      const res = await this.props.apis.calbackCoin({ id: item.id });
      if (res.code === 0) {
        message.success('撤销申请已提交！');
        this.getCoinRecords(1);
      }
    } catch (error) {
      Message.error(error.message);
    }
  }
  


  render() {
    const { orderIndex, steadyTypes, steadyType, coinType, coinTypeList, dataSource, pageIndex, pageSize, total, loading } = this.state;
    let header = []
    const chargeHeader = [{
      label: '时间',
      value: 'action',
      render: (item) => formData(item.gmtCreate, 'YYYY-MM-DD HH:mm:ss'),
    }, {
      label: '币种',
      value: 'assetName',
    }, {
      label: '类型',
      value: 'action',
      render: (item) => filterLabel(item.transferType, WITH_STATUS)
    }, {
      label: '数量',
      value: 'amount',
    }, {
      label: '状态',
      value: 'action',
      render: (item) => <div style={{ color: '#7B818A' }}>{filterLabel(item.status, STATUS_LIST)}</div>
    }];
    const withHeader = [{
      label: '时间',
      value: 'action',
      render: (item) => formData(item.gmtCreate, 'YYYY-MM-DD HH:mm:ss'),
    }, {
      label: '币种',
      value: 'assetName',
    }, {
      label: '类型',
      value: 'action',
      render: (item) => filterLabel(item.transferType, WITH_STATUS)
    }, {
      label: '数量',
      value: 'amount',
    }, {
      label: '状态',
      value: 'action',
      render: (item) => <div style={{ color: '#7B818A' }}>{filterLabel(item.status, STATUS_LIST)}</div>
    }, {
      label: '',
      value: 'actionDown',
      btnText: '详情',
      render: (item) => (
        <div className="withDrawActive">
          <ul>
            <li><p>提币地址</p><p>{item.toAddress || '--'}</p></li>
            <li><p>手续费</p><p>{item.fee || '--'}</p></li>
            <li><p>区块链交易ID</p><p>{item.txId || '--'}</p></li>
            <li><p>提现时间</p><p>{formData(item.gmtModified, 'YYYY-MM-DD HH:mm:ss')}</p></li>
            {
              (item.status === 1 && item.transferType === 2) && <div className="btn" onClick={() => this.cancelWithDraw(item)}>撤销</div>
            }
          </ul>
        </div>
      )
    }];
    const transHeader = [{
      label: '时间',
      value: 'action',
      render: (item) => formData(item.gmtCreate, 'YYYY-MM-DD HH:mm:ss'),
    }, {
      label: '币种',
      value: 'action',
      render: () => 'USDT'
    }, {
      label: '类型',
      value: 'action',
      render: (item) => `${filterLabel(item.fromType, WALLET_LIST)} 至 ${filterLabel(item.toType, WALLET_LIST)}`
    }, {
      label: '数量',
      value: 'amount',
    }];
    const communityHeader = [{
      label: '时间',
      value: 'action',
      render: (item) => formData(item.time, 'YYYY-MM-DD HH:mm:ss'),
    }, {
      label: '类型',
      value: 'type',
    }, {
      label: '总额(USDT)',
      value: 'amount',
    }];
    switch (orderIndex) {
      case '0':
        header = chargeHeader
        break;
      case '1':
        header = withHeader
        break;
      case '2':
        header = transHeader
        break;
      case '3':
        header = communityHeader
        break;
      default:
        header = chargeHeader
        break;
    }
    return (
      <div className="assetsRecord">
        <OrderType index={orderIndex} handleChoose={this.handleChoose} />
        <p className="backLast" onClick={() => this.props.history.push('/property')}><i className="iconfont icon-fanhuijiantou" />返回上一级</p>
        <div className="assetsRecord-title">
          <h5>资产记录</h5>
          {
            (orderIndex === '0' || orderIndex === '1') && (
              <Select value={coinType} defaultValue="0" onChange={this.handleSelectChange}>
                {
                  coinTypeList.map(item => (
                    <Option key={item.key} value={item.key}>{item.value}</Option>
                  ))
                }
              </Select>
            )
          }
          {
            orderIndex === '3' && (
              <Select style={{ width: '100px' }} value={steadyType} onChange={this.handleSelectSteadyChange}>
                {
                  steadyTypes.map(item => (
                    <Option key={item.key} value={item.key}>{item.value}</Option>
                  ))
                }
              </Select>
            )
          }
        </div>
        <CommonTableList loading={loading} dataHeader={header} dataSource={dataSource} />
        <Pagination hideOnSinglePage current={pageIndex} size="small" total={total} pageSize={pageSize} onChange={this.handlePageChange} />
      </div>
    );
  }
}
