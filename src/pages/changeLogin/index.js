import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';
import message from '@tenggouwa/message';
import { chooseLang } from '@/assets/js/common'
import { PWD_REG } from '@/assets/js/pattern';
import securty from '@/assets/js/security';
import Thelock from '@/assets/img/personal/thelock.png';

import PersonalHeader from '@/components/personalHeader';
import './index.scss';

const SEND_SECOND = 60;

// 密码验证
const LoginPwdForm = ({ onFinish, props, sendCode, form, fields }) => {
  const [setCode, setCodes] = useState(SEND_SECOND);
  const [isSend, setIsSend] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const clickCode = () => {
    if (setCode !== SEND_SECOND) return false;
    setCodes(SEND_SECOND);
    setIsSend(true);
    sendCode({...form.getFieldsValue()});
  }
  useEffect(() => {
    let timer = 0;
    if (isSend && setCode !== 0) {
      timer = setInterval(() => {
        setCodes(n => {
          if (n === 1) {
            setIsSend(false);
            clearInterval(timer);
          }
          return n - 1;
        });
      }, 1000)
    }
    if (setCode === 0) {
      setCodes(SEND_SECOND);
    }
    return () => clearInterval(timer);
  }, [isSend])
  return (
    <Form
      className="form-text"
      onFinish={(values) => onFinish({...values})}
      form={form}
      fields={fields}
      onValuesChange={(_, allFields) => {
        const { oldLoginPwd, emailCode, loginPwd, reLoginPwd } = allFields;
        if ((oldLoginPwd && emailCode && loginPwd && reLoginPwd) !== undefined) {
          setDisabled(true);
          if ((oldLoginPwd && emailCode && loginPwd && reLoginPwd) === '') {
            setDisabled(false);
          }
        } else {
          setDisabled(false);
        }
      }}
      autoComplete="off"
    >
      <Form.Item label="旧登录密码" name="oldLoginPwd" rules={[{ required: true, message: '请输入原来的密码' }]}>
        <Input.Password type="password" placeholder="请输入旧登录密码" />
      </Form.Item>
      <Form.Item className="sendCode">
        <Form.Item>
          <Form.Item name="emailCode" label="邮箱验证码" rules={[{ required: true, type: 'string', min: 6, max: 6, message: '请输入6位验证码' }]}>
            <Input placeholder="输入邮箱验证码" />
          </Form.Item>
          <div className="safebindpass-register">将发送验证码到您的{props && props.registerAccount}</div>
        </Form.Item>
        <Button
          type="text"
          onClick={() => clickCode(setCode)}
        >
          {setCode === 60 ? '获取验证码' : <span className="code-color"><span className="code-red">{setCode}s</span> 后获取</span>}
        </Button>
      </Form.Item>
      <Form.Item label="新登录密码" name="loginPwd" rules={[{ required: true, pattern: PWD_REG, type: 'string', max: 12, message: '请输入6-12位包含数字和字母的密码' }]}>
        <Input.Password type="password" placeholder="请输入新登录密码" />
      </Form.Item>
      <Form.Item label="确认新登录密码" name="reLoginPwd" rules={[
        {
          validator: (_, value) => {
            if (value !== form.getFieldValue('loginPwd')) {
              return Promise.reject(new Error('密码输入不一致'));
            } else {
              return Promise.resolve();
            }
          }
        }
      ]}>
        <Input.Password type="password" placeholder="再次输入新登录密码" />
      </Form.Item>
      <Form.Item>
        <Button disabled={!disabled} htmlType="submit" type="primary">确认</Button>
      </Form.Item>
    </Form>
  )
}

// 修改登录密码
const LoginPwd = ({ onFinish, sendCode, props }) => {
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();
  return (
    <div className="loginPwd">
      <div className="loginPwd-content">
        <div className="loginPwd-pwd">
          <img src={Thelock} alt="" />
          <div className="loginPwd-wrap">
            <h3>修改登录密码</h3>
            <span className="loginPwd-introduce">用于保护账户安全</span>
          </div>
        </div>
        <LoginPwdForm
          form={form}
          fields={fields}
          props={props}
          onFinish={onFinish}
          sendCode={sendCode}
          onChange={(values) => setFields(values)}
        />
      </div>
    </div>
  )
}

const PersonAuth = (props) => {
  return <PersonalHeader props={props} />
}
@connect(state => ({
    apis: state.apis,
    lang: state.lang,
    userAuth: state.userAuth,
    getUserAuth: state.getUserAuth,
}))
class ChangeLogin extends Component {
  constructor() { super() }
  sendCode = async () => {
    const params = {
      verifyType: 1,
      templateType: 1,
      language: chooseLang(this.props.lang),
    };
    const res = await this.props.apis.sendCode(params);
    if (res.code === 0) {
        return true;
    }
    return false;
  }
  submit = async (values) => {
    const { loginPwd, reLoginPwd, emailCode, oldLoginPwd } = values;
    const param = {
      passwdSecurityLevel: 0,
      loginPwd: securty(0, loginPwd), // 新密码
      reLoginPwd: securty(0, reLoginPwd), // 确认新密码
      emailCode: emailCode, // 邮箱验证码
      verifyType: 1,
      oldLoginPwd: securty(0, oldLoginPwd), // 旧密码
    }
    try {
      const res = await this.props.apis.changeloPass(param);
      if (res.code === 0) {
        message.success('修改成功');
        this.props.history.push('/login');
        this.props.dispatch(this.props.getUserAuth());
      };
    } catch (error) {
      message.error(error.message);
    }
  }
  render() {
    return (
      <div>
        <PersonAuth {...this.props} />
        <LoginPwd
          props={this.props.userAuth}
          onFinish={this.submit}
          sendCode={this.sendCode}
        />
      </div>
    )
  }
}

export default ChangeLogin