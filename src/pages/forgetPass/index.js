import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Button, Form, Input } from 'antd';

import message from '@tenggouwa/message';
import throttle from 'lodash/throttle';
import { chooseLang } from '@/assets/js/common';
import { EMAIL_REG, PWD_REG } from '@/assets/js/pattern';
import security from '@/assets/js/security';

import './index.scss';

const SEND_SECOND = 60;

const CustomizedForm = ({ onChange, form, fields, onFinish, sendCode, loading }) => {
  const [seCond, setSecond] = useState(SEND_SECOND);
  const [isSend, setIsSend] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const sendCodeDom = () => {
    if (!form.getFieldValue('email')) {
      message.info('请输入账号');
      return false;
    }
    if (seCond !== SEND_SECOND) return false;
    setSecond(SEND_SECOND);
    setIsSend(true);
    sendCode({...form.getFieldsValue()});
  }
  useEffect(() => {
    let timer = 0;
    if (isSend && seCond !== 0) {
      timer = setInterval(() => {
        setSecond(n => {
          if (n === 1) {
            setIsSend(false);
            clearInterval(timer);
          }
          return n - 1;
        });
      }, 1000)
    }
    if (seCond === 0) {
      setSecond(SEND_SECOND);
    }
    return () => clearInterval(timer);
  }, [isSend])
  return (
    <Form
      className="forgetpass-form"
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
      onFinish={(values) => onFinish({ ...values })}
    >
      <Form.Item name={['email']} label="邮箱" rules={[{ required: true, pattern: EMAIL_REG, message: '请输入正确的邮箱格式' }]}>
        <Input placeholder="输入您的邮箱" />
      </Form.Item>
      <Form.Item className="forgetpass-sendCode">
        <Form.Item name={['emailCode']} label="验证码" rules={[{ required: true, type: 'string', min: 6, max: 6, message: '请输入6位验证码' }]}>
          <Input placeholder="输入邮箱验证码" />
        </Form.Item>
        <Button type="text" onClick={() => sendCodeDom(seCond)}>
          {seCond === 60 ? '获取验证码' : <span className="code-color"><span className="code-red">{seCond}s</span> 后获取</span>}
        </Button>
      </Form.Item>
      <Form.Item
        label="设置新密码"
        name={['pwd']}
        rules={[
          { 
            required: true,
            pattern: PWD_REG,
            type: 'string',
            max: 12,
            message: '请输入6-12位包含数字和字母的密码'
          },
        ]}
      >
        <Input.Password onPaste={(e) => e.preventDefault()} type="password" placeholder="请输入密码" />
      </Form.Item>
      {/* TODO: hook 新写法 返回promise，先暂时用回调 */}
      <Form.Item name={['reLoginPwd']} label="确认新登录密码" rules={[
        {
          validator: (_, value, callback) => {
            if (value !== form.getFieldValue('pwd')) {
              callback('密码输入不一致');
            } else {
              callback();
            }
          }
        }
      ]}>
        <Input.Password onPaste={(e) => e.preventDefault()} type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" disabled={disabled} loading={loading} type="primary" block>
          确认
        </Button>
      </Form.Item>
    </Form>
  )
}

const ForgetPassDom = ({ onFinish, sendCode, btnLoading }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const handleToBack = () => {
    history.go(-1);
  };
  return (
    <div className="forgetpass">
      <div className="forgetpass-content">
        <i className="iconfont icon-fanhuijiantou" onClick={handleToBack} />
        <div className="forgetpass-text">
          <h5>忘记密码</h5>
          <p>忘记的TSEx账号</p>
          <CustomizedForm
            form={form}
            fields={fields}
            onChange={(newFields) => setFields(newFields)}
            onFinish={onFinish}
            sendCode={sendCode}
            loading={btnLoading}
          />
        </div>
      </div>
    </div>
  )
}

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  getUserAuth: state.getUserAuth,
}))
export default class ForgetPass extends Component {
  constructor() { 
    super()
    this.state = {
      btnLoading: false
    }
    this.handleSubmit = throttle(this.handleSubmit, 1000);
  }
  sendCode = async (values) => {
    const { email } = values
    const param = {
      email: email,
      language: chooseLang(this.props.lang)
    }
    try {
      const res = await this.props.apis.sendEmailcode(param)
      if (res.code === 0) {
        return true
      }
      return false
    } catch (error) {
      message.error(error.msg)
    }
  }
  handleSubmit = async (values) => {
    const { emailCode, email, pwd, reLoginPwd } = values;
    this.setState({
      btnLoading: true
    })
    const params = {
      passwdSecurityLevel: 0,
      verifyCode: emailCode,
      account: email,
      loginPwd: security(0, pwd),
      reLoginPwd: security(0, reLoginPwd),
    }
    try {
      const res = await this.props.apis.resetpwd(params)
      if (res.code === 0) {
        message.success('恭喜您修改成功！')
        this.props.history.push('/login')
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
    return <ForgetPassDom onFinish={this.handleSubmit} sendCode={this.sendCode} btnLoading={this.state.btnLoading} />
  }
}
