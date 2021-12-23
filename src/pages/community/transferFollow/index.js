import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import message from "@tenggouwa/message";
import throttle from 'lodash/throttle';
import { NUMBER_REG } from "@/assets/js/pattern";
import FollowHeader from "../components/followHeader";
// import TransferModal from '../components/transferModal';

import "./index.scss";

const { Option } = Select;

// 划转表单
const TransferForm = ({ onChange, fields, onFinish, form, followTradeDetail, transferFee, tradeList, loading }) => {
  return (
    <Form
      className="form"
      name="form"
      form={form}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      onFinish={(values) => onFinish({ ...values })}
    >
      <Form.Item label="跟单金额" className="followAmount">
        <span className="lable-amount">{(followTradeDetail && followTradeDetail.followAmount) || "--"}USDT</span>
      </Form.Item>

      <Form.Item
        className="transferLable"
        name="transferTraders"
        label="划转至交易员"
        rules={[
          {
            required: true,
            message: "请选择交易员"
          }
        ]}
      >
        <Select
          placeholder="请选择交易员"
          allowClear
        >
          {
            tradeList && tradeList.length > 0 ? tradeList.map(item => (
                <Option key={item.traderId} value={item.traderId}>{item.traderName}</Option>
            )) : null
          }
        </Select>
      </Form.Item>

      <Form.Item
        className="transferLable"
        name="transferAmount"
        label="划转金额"
        rules={[
          {
            validator: (_, value, callback) => {
              if (value === '') callback();
              if (Number(value) <= 0) {
                callback('划转金额大于0');
              } else if (Number(value) > (followTradeDetail && followTradeDetail.followAmount)) {
                callback('划转金额不能大于当前跟单金额');
              } else if (!NUMBER_REG.test(Number(value))) {
                callback('请输入正确的划转金额');
              } else {
                callback();
              }
            }
          }
        ]}
      >
        <Input placeholder="请输入划转金额" type="number" />
      </Form.Item>
      <div className="label-div">
        <span>划转手续费：</span>
        <span>{transferFee || '--'} USDT</span>
      </div>

      <Form.Item className="submit-btn">
        <span className="btn-title">划转24小时到账</span>
        <Button htmlType="submit" loading={loading} typeof="primary">
          确认划转
        </Button>
      </Form.Item>
    </Form>
  );
};

const HandeTransfer = ({ onFinish, followTradeDetail, transferFee, tradeList, btnLoading }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  // const { bonusAmount } = useParams();
  // const isVisable = !!(bonusAmount > 0);
  // const [ transferVisable, setTransferVisable ] = useState(isVisable);
  return (
    <div className="transferFollow">
      <div className="transferFollow-container">
        <FollowHeader
          title="跟单划转"
          className="userInfoTitle"
          dataSource={followTradeDetail}
        />
        <TransferForm
          form={form}
          onChange={(newFields) => setFields(newFields)}
          onFinish={onFinish}
          fields={fields}
          followTradeDetail={followTradeDetail}
          transferFee={transferFee}
          tradeList={tradeList}
          loading={btnLoading}
        />
        {/* <TransferModal
          isModalVisible={transferVisable}
          handleCancelVisable={() => setTransferVisable(false)}
        /> */}
      </div>
    </div>
  );
};

@connect((state) => ({
  apis: state.apis,
  lang: state.lang,
}))
@withRouter
export default class TransferFollow extends Component {
  constructor() {
    super();
    this.state = {
      followTradeDetail: null,
      transferFee: '',
      tradeList: [],
      btnLoading: false
    };
    this.handleSubmit = throttle(this.handleSubmit, 1000);
  }

  componentDidMount() {
    this.getTradeInfoDetail();
    this.getFollowTransferFee();
    this.getTradeList();
  }

  // 跟随交易员详情
  getTradeInfoDetail = async () => {
    try {
      const params = {
        traderId: this.props.match.params.id || 546767,
        pageNo: 1,
        pageSize: 10
      };
      const res = await this.props.apis.fetchFollowDetail(params);
      if (res.code === 0) {
        this.setState({
          followTradeDetail: res.data,
        });
      }
    } catch (e) {
      message.error(e.msg);
    }
  };

  // 获取手续费
  getFollowTransferFee = async () => {
    try {
      const res = await this.props.apis.fetchFollowTransferFee();
      if (res.code === 0) {
        this.setState({
          transferFee: res.data
        })
      }
    } catch (e) {
      message.error(e.msg);
    }
  }
  // 获取交易员列表
  getTradeList = async () => {
    try {
      const res = await this.props.apis.fetchSteadyTraderList();
      if (res.code === 0) {
        this.setState({
          tradeList: res.data.item
        })
      }
    } catch (e) {
      message.error(e.msg);
    }
  }

  handleSubmit = async (values) => {
    this.setState({
      btnLoading: true
    })
    try {
      const params = {
        fromTraderId: this.props.match.params.id,
        toTraderId: values.transferTraders,
        transferAmount: values.transferAmount,
      };
      const res = await this.props.apis.fetchFollowTransfer(params);
      if (res.code === 0) {
        message.success("划转成功");
        this.props.history.goBack();
      }
    } catch (e) {
      message.error(e.msg);
    } finally {
      this.setState({
        btnLoading: false
      })
    }
  };

  render() {
    const {
      followTradeDetail,
      transferFee,
      tradeList,
      btnLoading
    } = this.state;
    return (
      <HandeTransfer
        followTradeDetail={followTradeDetail}
        onFinish={this.handleSubmit}
        transferFee={transferFee}
        tradeList={tradeList}
        btnLoading={btnLoading}
      />
    );
  }
}
