import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, Checkbox } from 'antd';
import message from '@tenggouwa/message';
import throttle from 'lodash/throttle';
import { chooseLang, filterLabel } from '@/assets/js/common';
import { EMAIL_REG, PWD_REG, NUMBER_REG } from '@/assets/js/pattern';
import security from '@/assets/js/security';
import AREA_LIST from '@/assets/js/country';
import OPTIONS from '../../reducers/options.js';
import './index.scss';

const SEND_SECOND = 60;

const CustomizedForm = ({ onChange, fields, loginType, onFinish, form, sendCode, loading }) => {
  const [second, setSecond] = useState(SEND_SECOND);
  const [isSend, setIsSend] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const sendCodeDom = () => {
    if (!form.getFieldValue('phone') && !form.getFieldValue('email')) {
      message.info('请输入账号')
      return false;
    }
    if (second !== SEND_SECOND) return false;
    setSecond(SEND_SECOND);
    setIsSend(true);
    sendCode({...form.getFieldsValue(), type: loginType});
  }
  useEffect(() => {
    let timer = 0;
    if (isSend && second !== 0) {
      timer = setInterval(() => {
        setSecond(n => {
          if (n === 1) {
            setIsSend(false);
            clearInterval(timer);
          }
          return n - 1
        });
      }, 1000)
    }
    if (second === 0) {
      setSecond(SEND_SECOND);
    }
    return () => clearInterval(timer);
  }, [isSend])

  return (
    <Form
      className="form"
      name="form"
      form={form}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        const newAllFields = allFields.filter(item => item.name[0] !== "invitationCode");
        const isEmpty = newAllFields.filter(item => !item.value)
        const isError = newAllFields.filter(item => item.errors.length !== 0)
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
            <Form.Item noStyle>
              <Input.Group compact style={{ display: 'flex' }}>
                <Form.Item name={['country']} noStyle initialValue="86" rules={[{ required: true }]}>
                  <Select placeholder="Select province" showSearch style={{ minWidth: '100px' }}>
                    {
                      AREA_LIST.map(item => (
                        <Option key={item.value} value={item.value}>+ {item.value}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
                <Form.Item name={['phone']} noStyle rules={[{ required: true, pattern: NUMBER_REG, message: '请输入正确的手机号码' }]}>
                  <Input placeholder="请输入手机号" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          ) : (
            <Form.Item label="邮箱注册" name={['email']} rules={[{ required: true, pattern: EMAIL_REG, message: '请输入正确的邮箱格式' }]}>
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          )
        }
      </Form.Item>
      <Form.Item className="sendCode">
        <Form.Item label="验证码" name={['capcha']} rules={[{ required: true, type: 'string', min: 6, max: 6, message: '请输入6位验证码' }]}>
        {/* capcha */}
          <Input placeholder="请输入验证码" />
        </Form.Item>
        <Button
          type="text"
          className={second !== SEND_SECOND ? 'disabled' : ''}
          onClick={() => sendCodeDom(second)}
        >
        {second === SEND_SECOND ? '获取验证码' : <span className="code-color"><span className="code-red">{second}s</span> 后获取</span>}
        </Button>
      </Form.Item>
      <Form.Item label="设置密码" name={['pwd']} rules={[{ required: true, pattern: PWD_REG, type: 'string', max: 12, message: '请输入6-12位包含数字和字母的密码' }]}>
        <Input.Password onPaste={(e) => e.preventDefault()} type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item label="确认密码" name={['repwd']} rules={[
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
      {/* rules={[{ type: 'string', min: 6, max: 6, message: '请输入6位邀请码' }]} */}
      <Form.Item label="推荐人ID（选填）" name="invitationCode">
        <Input placeholder="邀请码（选填）" />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('未勾选《服务条款》和《隐私条款》')),
          },
        ]}
      >
        <Checkbox className="formTips-check">
          注册即代表同意 
          <a href={`${OPTIONS.helpcenter}zh-cn/articles/360013031133-%E6%9C%8D%E5%8A%A1%E6%9D%A1%E6%AC%BE`}>《服务条款》</a>
          <a href={`${OPTIONS.helpcenter}zh-cn/articles/360012968913-%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96%E5%92%8C%E5%A3%B0%E6%98%8E`}>《隐私条款》</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" loading={loading} disabled={disabled} block>
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}

const RegisterDom = ({ onFinish, sendCode, btnLoading }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [loginType, setLoginType] = useState('1');
  const handleToBack = () => {
    history.go(-1);
  }

  return (
    <div className="register">
      <div className="register-form">
        <i className="iconfont icon-fanhuijiantou" onClick={handleToBack} />
        <div className="right">
          <h5>注册</h5>
          <p>立即注册您的TSEx账号</p>
          <CustomizedForm
            form={form}
            loginType={loginType}
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
export default class Register extends Component {
  constructor() { 
    super()
    this.state = {
      btnLoading: false
    }
    this.handleSubmit = throttle(this.handleSubmit, 1000);
  }
  sendCode = async (values) => {
    const { type } = values;
    let params
    if (type === '0') {
      const { country, phone } = values;
      params = {
        type,
        phoneCountryCode: country,
        phone,
        language: chooseLang(this.props.lang)
      }
    } else {
      const { email } = values;
      params = {
        type,
        email,
        language: 0
      }
    }
    let res;
    if (type === '0') {
      res = await this.props.apis.sendphonecode(params)
    } else {
      res = await this.props.apis.sendEmailcode(params)
    }
    if (res.code === 0) {
      return true;
    }
    return false;
  }
  handleSubmit = async (values) => {
    const { capcha, country, invitationCode, phone, email, pwd, repwd, type } = values;
    this.setState({
      btnLoading: true
    })
    const params = {
      type,
      capcha,
      agreeServiceRule: true,
      pwd: security(0, pwd),
      repwd: security(0, repwd),
      language: chooseLang(this.props.lang),
      passwdSecurityLevel: 0,
      invitationCode,
    }
    if (type === '0') {
      params.country = country;
      params.countryKey = filterLabel(country, AREA_LIST);
      params.phone = phone;
    } else {
      params.email = email;
    }
    try {
      const res = await this.props.apis.regist(params)
      if (res.code === 0) {
        message.success('恭喜您注册成功！')
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
    return <RegisterDom onFinish={this.handleSubmit} sendCode={this.sendCode} btnLoading={this.state.btnLoading} />
  }
}
