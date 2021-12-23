import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import message from '@tenggouwa/message';
import BindHeader from '@/components/personalHeader';
import securty from '@/assets/js/security';
import { chooseLang } from '@/assets/js/common';
import { BIND_PWD } from '@/assets/js/pattern';
import Money from '@/assets/img/personal/money.png';
import './index.scss';

const SEND_SECOND = 60;

const SafeBindForm = ({ onFinish, props, sendCode, form, fields }) => {
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
      className="safebindpass-form"
      onFinish={(values) => onFinish({...values})}
      form={form}
      fields={fields}
      onValuesChange={(_, allFields) => {
        const { emailCode, newPwd, rePwd } = allFields;
        if ((emailCode && newPwd && rePwd) !== undefined) {
          setDisabled(true);
          if ((emailCode && newPwd && rePwd) === '') {
            setDisabled(false);
          }
        } else {
          setDisabled(false);
        }
      }}
      autoComplete="off"
    >
      <Form.Item className="safebindpass-sendCode">
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
      <Form.Item label="新资金密码" name="newPwd" rules={[
        {required: true, pattern: BIND_PWD, type: 'string', min: 8, max: 12, message: '请输入8-12位包含大小写子母和数字'}
      ]}>
        <Input.Password type="password" placeholder="请输入新资金密码" />
      </Form.Item>
      <Form.Item label="确认新资金密码" name="rePwd" rules={[
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
        <Input.Password type="password" placeholder="再次输入新资金密码" />
      </Form.Item>
      <Form.Item>
        <Button disabled={!disabled} htmlType="submit" type="primary">确认</Button>
      </Form.Item>
    </Form>
  )
}

const SafeBindPass = ({ props, onFinish, sendCode }) => {
  let txt = '忘记资金密码';
  if (props && !props.isFundPwdSet) {
    txt = '设置资金密码';
  }
  const [fields] = useState([]);
  const [form] = Form.useForm();
  return (
    <div className="safebindpass">
      <div className="safebindpass-text">
        <div className="safebindpass-block">
          <img src={Money} alt="" />
          <div className="safebindpass-content">
            <h3>{txt}</h3>
            <span className="safebindpass-introduce">保护账户安全</span>
          </div>
        </div>
        <SafeBindForm
          props={props}
          form={form}
          fields={fields}
          onFinish={onFinish}
          sendCode={sendCode}
        />
      </div>
    </div>
  )
}

// 头部
const BindPwdHeader = (props) => {
  return <BindHeader props={props} />
} 

@connect(state => ({
  apis: state.apis,
  userAuth: state.userAuth,
  getUserAuth: state.getUserAuth,
}))
class BindPass extends Component {
  constructor() { super() }
  submit = async values => {
    const { userAuth } = this.props;
    const { newPwd, rePwd, emailCode } = values;
    const param = {
      pwd: securty(0, newPwd),
      repwd: securty(0, rePwd),
      emailCode: emailCode,
    }
    if (!userAuth.isFundPwdSet) {
      try {
        const res = await this.props.apis.bindFundPass(param);
        if (res.code === 0) {
          message.success('设置成功');
          this.props.history.push('/');
          this.props.dispatch(this.props.getUserAuth());
        }
      } catch (error) {
        message.error(error,message);
      }
    } else {
      try {
        const res = await this.props.apis.forgetFundPass(param);
        if (res.code === 0) {
          message.success('修改成功');
          this.props.history.push('/');
          this.props.dispatch(this.props.getUserAuth());
        }
      } catch (error) {
        message.error(error,message);
      }
    }
  }
  sendCode = async () => {
    const param = {
      verifyType: 1,
      templateType: 1,
      language: chooseLang(this.props.lang),
    }
    const res = await this.props.apis.sendCode(param);
    if (res.code === 0) { return true; }
    return false;
  }
  render() {
    return (
      <div className="bindpass">
        <BindPwdHeader {...this.props} />
        <SafeBindPass
          props={this.props.userAuth}
          onFinish={this.submit}
          sendCode={this.sendCode}
        />
      </div>
    )
  }
}

export default BindPass;