import React, { Component, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import message from '@tenggouwa/message';
import throttle from 'lodash/throttle';
import { NUMBER_REG } from '@/assets/js/pattern';
import MoneyPwdModal from '@/components/moneyPwdModal';
import security from '@/assets/js/security';
import defaultAvator from '@/assets/img/community/defaultAvator.png';
import './index.scss';

// 编辑跟单
const EditFollowForm = ({ onChange, fields, onFinish, form, canUseAsset, handleCancles, loading }) => {
  const { id, following } = useParams();
  const handleCancle = () => {
    return handleCancles();
  }
  return (
    <Form
      className="form"
      name="form"
      form={form}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      onFinish={(values) => onFinish({ ...values, traderId: id, following })}
    >
      <Form.Item
        name="addAmount"
        label="追加"
        rules={[
          {
            required: true,
            message: "请输入追加金额"
          },
          {
            validator: (_, value, callback) => {
              if (value && !NUMBER_REG.test(Number(value))) {
                callback('请输入正确的追加金额')
              } else {
                callback();
              }
            }
          }
        ]}
      >
        <Input placeholder="请输入新增跟单金额" type="number" suffix="USDT" />
      </Form.Item>
      <span className="lable-msg">
        可用余额 {(canUseAsset && canUseAsset.canUseAmount) || "--"} USDT
      </span>

      <Form.Item
        name="followStop"
        label="跟单止损比例"
        rules={[
          {
            validator: (_, value, callback) => {
              if (value === '') callback();
              if (value && !NUMBER_REG.test(Number(value))) {
                callback('请输入正确的跟单比例')
              } else if (Number(value) < 5) {
                callback('止损最小值是5%');
              } else {
                callback();
              }
            }
          }
        ]}
      >
        <Input type="number" placeholder="请输入止损比例" />
      </Form.Item>
      <span className="lable-msg">
        ※ 例如设置为50%,亏损超过50%将自动结束订单
      </span>

      <Form.Item
        name="followLimit"
        label="跟单止盈比例"
        rules={[
          {
            validator: (_, value, callback) => {
              if (value === '') callback();
              if (value && !NUMBER_REG.test(Number(value))) {
                callback('请输入正确的跟单比例')
              } else if (Number(value) < 5) {
                callback('止盈最小值是5%');
              } else {
                callback();
              }
            }
          }
        ]}
      >
        <Input type="number" placeholder="请输入止盈比例" />
      </Form.Item>
      <span className="lable-msg">
        ※ 例如设置为50%,盈利超过50%将自动结束订单
      </span>

      <Form.Item className="submit-btn">
        <Button onClick={handleCancle}>取消跟随</Button>
        <Button htmlType="submit" loading={loading} typeof="primary">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

// 跟单设置
const ConfigFollowForm = ({ onChanges, fields, onFinish, form, canUseAsset, loading }) => {
  const { following, id } = useParams();
  const history = useHistory();
  const handleCancle = () => {
    history.goBack();
  }
  return (
    <Form
      className="form"
      name="form"
      form={form}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChanges(allFields);
      }}
      onFinish={(values) => onFinish({ ...values, traderId: id, following })}
    >
      <Form.Item
        name="addAmount"
        label="跟单金额"
        rules={[
          {
            required: true,
            message: '请输入跟单金额'
          },
          {
            validator: (_, value, callback) => {
              if (value && !NUMBER_REG.test(Number(value))) {
                callback('请输入正确的跟单金额')
              } else if (Number(value) < 100) {
                callback('跟单金额最低100U');
              } else {
                callback();
              }
            }
          }
        ]}
      >
        <Input type="number" placeholder="请输入跟单金额(最低100U)" />
      </Form.Item>
      <span className="lable-msg">可用余额  {(canUseAsset && canUseAsset.canUseAmount) || "--"} USDT</span>

      <Form.Item 
        label="跟单止损比例"
        name="followStop"
        rules={[
          {
            validator: (_, value, callback) => {
              if (value === '') callback();
              if (value && !NUMBER_REG.test(Number(value))) {
                callback('请输入正确的跟单比例')
              } else if (Number(value) < 5) {
                callback('止损最小值是5%');
              } else {
                callback();
              }
            }
          }
        ]}
        >
        <Input type="number" placeholder="请输入止损比例" />
      </Form.Item>
      <span className="lable-msg">
        ※ 例如设置为50%,亏损超过50%将自动结束订单
      </span>

      <Form.Item
        name="followLimit"
        label="跟单止盈比例"
        rules={[
          {
            validator: (_, value, callback) => {
              if (value === '') callback();
              if (value && !NUMBER_REG.test(Number(value))) {
                callback('请输入正确的跟单比例')
              } else if (Number(value) < 5) {
                callback('止盈最小值是5%');
              } else {
                callback();
              }
            }
          }
        ]}
      >
        <Input type="number" placeholder="请输入止盈比例" />
      </Form.Item>
      <span className="lable-msg">
        ※ 例如设置为50%,盈利超过50%将自动结束订单
      </span>

      <Form.Item className="submit-btn">
        <Button onClick={handleCancle}>取消</Button>
        <Button htmlType="submit" loading={loading} typeof="primary">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

const HandleFollow = ({ onFinish, dataDetaile, canUseAsset, handleEmitPwd, btnLoading }) => {
  const history = useHistory();
  const { following } = useParams();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const handleToBack = () => {
    history.goBack();
  };
  // open modal
  const handleCancle = () => {
    setVisibleModal(true);
  }
  return (
    <div className="editFollow">
      <div className="editFollow-container">
        <div className="editFollow-title">
          <i className="iconfont icon-fanhuijiantou" onClick={handleToBack} />
          <h2>{following === '1' ? '编辑跟单' : '跟单设置'}</h2>
        </div>

        <div className="editFollow-userInfo">
          <div className="userInfo-avator">
            <img
              src={
                dataDetaile && dataDetaile.traderHeadUrl
                  ? dataDetaile.traderHeadUrl
                  : defaultAvator
              }
              alt=""
            />
          </div>
          <div className="userInfo">
            <span>
              {dataDetaile && dataDetaile.traderName
                ? dataDetaile.traderName
                : '--'}
            </span>
            <span>
              跟单利润分成比例：
              {dataDetaile && dataDetaile.flowProfitRate
                ? dataDetaile.flowProfitRate
                : '--'}
              %
            </span>
          </div>
        </div>
        {following === '1' ? (
          <EditFollowForm
            form={form}
            fields={fields}
            onChange={(newFields) => setFields(newFields)}
            onFinish={onFinish}
            canUseAsset={canUseAsset}
            handleCancles={handleCancle}
            loading={btnLoading}
          />
        ) : (
          <ConfigFollowForm
            form={form}
            fields={fields}
            onChanges={(newFields) => setFields(newFields)}
            onFinish={onFinish}
            canUseAsset={canUseAsset}
            handleCancles={handleCancle}
            loading={btnLoading}
          />
        )}
      </div>
      {/* 取消跟随弹窗 */}
      <MoneyPwdModal
        isModalVisible={visibleModal}
        handleCancelVisable={() => setVisibleModal(false)}
        handleEmitPwd={(pwd) => handleEmitPwd(pwd)}
      />
    </div>
  );
};

@connect((state) => ({
  apis: state.apis,
  lang: state.lang,
}))
@withRouter
export default class Follow extends Component {
  constructor() {
    super();
    this.state = {
      followTradeDetail: null,
      followAssetList: null,
      btnLoading: false
    };
    this.handleSubmit = throttle(this.handleSubmit, 1000);
  }

  componentDidMount() {
    this.getFollowTradeDetail();
    this.getFollowAsset();
  }

  // 交易员详情
  async getFollowTradeDetail() {
    try {
      const params = {
        traderId: this.props.match.params.id,
        communityType: 2,
      };
      const res = await this.props.apis.fetchFollowTradeInfo(params);
      if (res.code === 0) {
        this.setState({
          followTradeDetail: res.data,
        });
      }
    } catch (e) {
      message.error(e.msg);
    }
  }
  // 跟单账户资产
  async getFollowAsset() {
    try {
      const res = await this.props.apis.fetchFollowAssets();
      if (res.code === 0) {
        this.setState({
          followAssetList: res.data.item[0] || null,
        });
      }
    } catch (e) {
      message.error(e.msg);
    }
  }
  // 提交
  handleSubmit = async (values) => {
    this.setState({
      btnLoading: true
    })
    try {
      const { apis } = this.props;
      const typeFollow = Number(values.following);
      const params = {
        traderId: Number(values.traderId),
        followStopLossRate: values.followStop,
        followStopWinRate: values.followLimit,
      };
      let res;
        if (typeFollow === 1) {
          params.addFollowNum = values.addAmount;
          res = await apis.fetchFollowEditFollow(params);
        } else {
          params.followNum = values.addAmount;
          params.followType = 2;
          params.followRatio = 0.1;
          params.maxPositionAmount = 0;
          params.isAgree = true;
          res = await apis.fetchFollowFollow(params);
        }
      if (res.code === 0) {
        message.success(`${typeFollow === 1 ? '编辑跟单成功' : '跟单设置成功'}`);
        this.props.history.push("/community/home");
      }
    } catch (e) {
      message.error(e.msg);
    } finally {
      this.setState({
        btnLoading: false
      })
    }
  };

  // 取消跟随
  handleEmitPwd = async (pwd) => {
    try {
      const params = {
        traderId: this.props.match.params.id,
        communityType: 2,
        fundPassword: security(0, pwd)
      }
      const res = await this.props.apis.fetchFollowCancel(params);
      if (res.code === 0) {
        message.success('取消跟单成功');
      }
    } catch (e) {
      message.error(e.msg);
    }
  }
  
  render() {
    const {
      followTradeDetail,
      followAssetList,
      btnLoading
    } = this.state;
    return (
      <HandleFollow
        onFinish={this.handleSubmit}
        dataDetaile={followTradeDetail}
        canUseAsset={followAssetList}
        handleEmitPwd={this.handleEmitPwd}
        btnLoading={btnLoading}
      />
    );
  }
}
