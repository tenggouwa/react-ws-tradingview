import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';
import message from '@tenggouwa/message';
import { chooseLang } from '@/assets/js/common';
import { BIND_PWD } from '@/assets/js/pattern';
import securty from '@/assets/js/security';
import PersonalHeader from '@/components/personalHeader';
import Money from '@/assets/img/personal/money.png';

import './index.scss';

const SEND_SECOND = 60;

const ChangePassForm = ({ form, fields, onFinish, sendCode, props }) => {
  const [setCode, setCodes] = useState(SEND_SECOND);
  const [isSend, setIsSend] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const sendCodeDom = () => {
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
  },[isSend])
  return (
    <Form
      className="changePass-form"
      form={form}
      fields={fields}
      onFinish={(values) => onFinish({...values})}
      onValuesChange={(_, allFields) => {
        const { emailCode, newPwd, oldPwd, rePwd } = allFields;
        if ((emailCode && newPwd && oldPwd && rePwd) !== undefined) {
          setDisabled(true);
          if ((emailCode && newPwd && oldPwd && rePwd) === '') {
            setDisabled(false);
          }
        } else {
          setDisabled(false);
        }
      }}
      autoComplete="off"
    >
      <Form.Item name="oldPwd" label="原资金密码" rules={[{required: true, message: '请输入原密码' }]}>
        <Input.Password placeholder="请输入原资金密码" />
      </Form.Item>
      <Form.Item className="changePass-send">
        <Form.Item>
          <Form.Item name="emailCode" label="邮箱验证码" rules={[{required: true, min: 6, max: 6, message: '请输入6位验证码'}]}>
            <Input placeholder="请输入邮箱验证码" />
          </Form.Item>
          <div className="safebindpass-register">将发送验证码到您的{props && props.registerAccount}</div>
        </Form.Item>
        <Button type="text" onClick={() => sendCodeDom(setCode)}>
          {setCode === 60 ? '获取验证码' : <span className="code-color"><span className="code-red">{setCode}s</span> 后获取</span>}
        </Button>
      </Form.Item>
      <Form.Item name="newPwd" label="新资金密码" rules={[{required: true, pattern: BIND_PWD, type: 'string', min: 8, max: 12, message: '请输入8-12位包含大小写子母和数字'}]}>
        <Input.Password placeholder="请输入新资金密码" />
      </Form.Item>
      <Form.Item name="rePwd" label="确认新资金密码" rules={[
        {
          validator: (_, value) => {
            if (value !== form.getFieldValue('newPwd')) {
              return Promise.reject(new Error('密码输入不一致'));
            } else {
              return Promise.resolve();
            }
          }
        }
      ]}>
        <Input.Password placeholder="请确认新资金密码" />
      </Form.Item>
      <Form.Item>
        <Button disabled={!disabled} htmlType="submit" type="primary">确认</Button>
      </Form.Item>
    </Form>
  )
}

const ChangePassFund = ({ onFinish, sendCode, props }) => {
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();
  return (
    <div className="changePass-fund">
      <div className="changePass-text">
        <img src={Money} alt="" />
        <div className="changePass-content">
          <h3>修改资金密码</h3>
          <span className="changePass-introduce">保护账户安全</span>
        </div>
      </div>
      <ChangePassForm
        form={form}
        fields={fields}
        props={props}
        onFinish={onFinish}
        sendCode={sendCode}
        onChange={(values) => setFields(values)}
      />
    </div>
  )
}

const ChangeHeader = (props) => {
  return <PersonalHeader props={props} />
}
@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  userAuth: state.userAuth,
  getUserAuth: state.getUserAuth
}))
class ChangePass extends Component {
  constructor() { super() }
  sendCode = async () => {
    const params = {
        verifyType: 1,
        templateType: 1,
        language: chooseLang(this.props.lang),
    }
    const res = await this.props.apis.sendCode(params);
    if (res.code === 0) {
        return true;
    }
    return false;
  }
  submit = async values => {
    const { oldPwd, newPwd, rePwd, emailCode } = values;
    const param = {
      oldPwd: securty(0, oldPwd), // 旧密码
      pwd: securty(0, newPwd), // 新密码
      repwd: securty(0, rePwd), // 确认新密码
      emailCode: emailCode, // 邮箱验证码
    }
    try {
      const res = await this.props.apis.changeFundPass(param);
      if (res.code === 0) {
        message.success('修改成功');
        this.props.dispatch(this.props.getUserAuth());
        this.props.history.push('/');
      }
    } catch (e) {
      message.error(e.message);
    }
  }
  render() {
    return (
      <div className="changePass">
        <ChangeHeader {...this.props} />
        <ChangePassFund
          props={this.props.userAuth}
          onFinish={this.submit}
          sendCode={this.sendCode}
        />
      </div>
    )
  }
}

export default ChangePass