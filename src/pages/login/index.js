import React, { Component, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import throttle from 'lodash/throttle';

import { chooseLang } from '@/assets/js/common';
import { EMAIL_REG, NUMBER_REG } from '@/assets/js/pattern';
import security from '@/assets/js/security';
import './index.scss';

const CustomizedForm = ({ onChange, fields, loginType, onFinish, form, btnLoading }) => {
  const [disabled, setDisabled] = useState(true);
  return (
    <Form
      className="form"
      name="form"
      form={form}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        const isEmpty = allFields.filter(item => !item.value)
        const isError = allFields.filter(item => item.errors.length !== 0)
        if (isEmpty.length > 0 || isError.length > 0) {
          setDisabled(true)
        } else {
          setDisabled(false)
        }
        onChange(allFields);
      }}
      onFinish={(values) => onFinish({ ...values, type: loginType })}
    >
      <Form.Item>
        {
          loginType === '0' ? (
            <Form.Item name={['phone']} noStyle rules={[{ required: true, pattern: NUMBER_REG, message: '请输入正确的手机号码' }]}>
              <Input placeholder="请输入手机号"/>
            </Form.Item>
          ) : (
            <Form.Item label="邮箱" name={['email']} rules={[{ required: true, pattern: EMAIL_REG, message: '请输入正确的邮箱格式' }]}>
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          )
        }
      </Form.Item>
      <Form.Item name="pwd" label="密码">
        <Input.Password type="password" onPaste={(e) => e.preventDefault()} placeholder="请输入密码" />
      </Form.Item>
      <Form.Item className="submit-btn">
        <Button htmlType="submit" loading={btnLoading} disabled={disabled} type="primary" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

const LoginDom = ({ onFinish, appDownLoad, btnLoading }) => {
  const history = useHistory()
  const jump = (route) => {
    history.push(route)
  }
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [loginType, setLoginType] = useState('1');
  const handleToBack = () => {
    history.go(-1);
  }
  return (
    <div className="login">
      <div className="login-main">
        <div className="login-form">
          <i className="iconfont icon-fanhuijiantou" onClick={handleToBack} />
          <div className="right">
            <div className="right-title">
              <h5>登录</h5>
              <p>登录您的TSEx账号</p>
            </div>
            <CustomizedForm
              form={form}
              loginType={loginType}
              fields={fields}
              onChange={(newFields) => setFields(newFields)}
              onFinish={onFinish}
              btnLoading={btnLoading}
            />
            <div className="formTips">
              <p onClick={() => jump('/register')}><span>还没有账户，</span>去注册</p>
              <p onClick={() => jump('/forgetPass')}>忘记密码？</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  getUserAuth: state.getUserAuth,
  appDownLoad: state.appDownLoad,
  saveSessionId: state.saveSessionId,
  setVisible: state.setVisible,
}))
@withRouter
export default class Login extends Component {
  constructor() { 
    super()
    this.state = {
      btnLoading: false
    }
    this.handleSubmit = throttle(this.handleSubmit, 1000);
  }
  handleSubmit = async values => {
    const params = {
      ...values,
      pwd: security(0, values.pwd),
      language: chooseLang(this.props.lang)
    }
    this.setState({
      btnLoading: true
    })
    try {
      const res = await this.props.apis.login(params)
      if (res.code === 0) {
      this.props.dispatch(this.props.getUserAuth());
      this.props.dispatch(this.props.saveSessionId(res.data.sessionId));
      this.props.dispatch(this.props.setVisible(false));
      message.success('登录成功');
      this.props.history.push('/');
      }
    } catch (error) {
      message.error(error.msg);
    } finally {
      this.setState({
        btnLoading: false
      })
    }
  }

  render() {
    return <LoginDom onFinish={this.handleSubmit} appDownLoad={this.props.appDownLoad} btnLoading={this.state.btnLoading} />
  }
}
