import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Input } from 'antd';
import QRCode from 'qrcode.react'

import { CopyToClipboard } from 'react-copy-to-clipboard';
import message from '@tenggouwa/message';
import { TEXT_LIST } from './constants'
import './index.scss';

const { Option } = Select;

const CommonRecharges = ({ dataSource, modalName, visible, handleCancel, getAddress, address = '', listAssetId, fee }) => {
  if (!dataSource || dataSource.length === 0 || !visible) return false;

  const dataSourceList = dataSource.filter(item => item.depositEnabled);
  const firstSortAssetId = dataSourceList[0].assetId; // 默认选择第一个assetId

  const [coin, setCoin] = useState(firstSortAssetId); // 下拉切换时assetId值
  const [networkList, setNetworkList] = useState([]); // 切换币种时network(一组
  const [network, setNetwork] = useState(''); // 默认选择的network
  const assetNames = dataSourceList.filter(item => item.assetId === coin); // 选择时的币种名称列表
  const assetNameTip = assetNames[0].assetName; // 币种名称

  // 从列表里打开按钮
  useEffect(() => {
    setCoin(listAssetId ? listAssetId : firstSortAssetId);
  }, [listAssetId]);

  // 监听network和coin
  useEffect(() => {
    endFun(coin, network);
    const arr = dataSourceList.filter(item => item.assetId === coin);
    const wnetworkArr = arr[0].wnetwork;
    if (coin && network && arr && arr.length > 0 && wnetworkArr.indexOf(network) !== -1) {
      getAddress({ assetName: arr[0].assetName, network });
    }
  }, [network, coin]);

  // 切换币种
  const handleChangedSelect = (value) => {
    setNetwork(); // 切换时清空network
    setCoin(value);
  }

  // 切换链名称
  const handleSelect = (value) => {
    setNetwork(value);
  }

  const endFun = () => {
    if (!coin) return;
    const arr = dataSourceList.filter(item => item.assetId === coin);
    const firstNetWork = arr[0].wnetwork; // 币种为USDT时的network
    setNetworkList(firstNetWork);
    if ((network && arr && arr.length > 0) && (!listAssetId || firstNetWork.length !== 1)) {
      setNetwork(network);
    } else {
      setNetwork(firstNetWork[0]);
    }
  }

  // 关闭弹窗-清空数据，恢复默认值
  const handleCancelDialog = () => {
    setCoin(firstSortAssetId); // 传入默认assetId
    setNetwork('');
    setNetworkList([]);
    handleCancel();
  }

  return (
    <div className="recharge">
      <Modal
        title={modalName}
        visible={visible}
        okText='确定'
        onCancel={handleCancelDialog}
        getContainer={false}
        closable
        className="recharge_modal"
        style={{ top: '20px' }}
        footer={null}
      >
        <p className="modal-title">币种</p>
        <Select
          style={{ width: '100%' }}
          value={coin}
          disabled={listAssetId}
          onChange={handleChangedSelect}
        >
          {
            dataSourceList && dataSourceList.length > 0 && (
              dataSourceList.map(item => (
                <Option key={item.assetId} value={item.assetId}>{item.assetName}</Option>
              ))
            )
          }
        </Select>
        <p className="modal-title">链名称</p>
        <div className="select-address">
          {
            networkList.map(item => (
              <p key={item} onClick={() => { handleSelect(item) }}>
                {
                  item === network ?
                    <i className="iconfont icon-select" /> :
                    <i className="iconfont icon-no-select" />
                }
                <span>{item}</span>
              </p>
            ))
          }
        </div>
        <div className="secret-key" id="copys">{address || '--'}</div>
        <CopyToClipboard text={address} onCopy={() => { message.success('复制成功') }}>
          <p className="copy">
            <i className="iconfont icon-fuzhi" />
            复制地址
          </p>
        </CopyToClipboard>
        <div className="QRCode">
          <QRCode size={100} value={address} />
        </div>
        <div className="address-text">
          <p>1.此地址只接受{assetNameTip === 'USDT' ? `${network}_${assetNameTip}` || 'USDT' : assetNameTip || 'USDT'}，发送其他币种资产到此地址将无法找回；</p>
          <p>2.最小充值数量：{fee.minWithdrawFeeStandard || '--'} {assetNameTip || 'USDT'}，小于最小数量将不会上账且无法退回；</p>
        </div>
      </Modal>
    </div>
  );
}


@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  appDownLoad: state.appDownLoad,
}))
export default class CommonRecharge extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      fee: '',
    }
  }
  getAddress = async ({ assetName, network }) => {
    try {
      const { data, code } = await this.props.apis.getAddress({
        assetName,
        network,
      })
      const { address } = data
      if (code === 0) {
        // 获取提币tips金额
        const res = await this.props.apis.getWithdrawFee({
          assetName,
          network,
        });
        this.setState({ address, fee: res.data });
      }
    } catch {
      this.setState({ address: '', fee: 0 });
    }
  }
  render() {
    const { address, fee } = this.state;
    return (
      <CommonRecharges {...this.props} address={address} getAddress={this.getAddress} fee={fee} />
    )
  }
}