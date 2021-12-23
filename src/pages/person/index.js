import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, Upload, Button } from 'antd';
import message from '@tenggouwa/message';
import { REPLACE_REG } from '@/assets/js/pattern'
import {
  AREA_LIST,
  CHANGE_TYPE,
  PersonalHeader,
  PersonalUrl,
  Before,
  After,
  Remind,
  FailUre,
  Basis,
  Group,
  Passport 
} from './constants';

import './index.scss';

const { Option } = Select;
const { auth } = window.localStorage;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 个人头部
const PersonHeader = (props) => {
  return <PersonalHeader props={props} />
}

// 身份认证
const PersonalIdCard = ({ cardCheckStatus, form, data, onFinish }) => {
  const [loading1, setLoading1] = useState(false); // 判断是否是上传的照片
  const [loading2, setLoading2] = useState(false);
  const [fields] = useState([{ name: ['nation'], value: 'CN' }, { name: ['idEntityCardType'], value: 0 }]);
  const [disabled, setDisabled] = useState(false); // 判断提交是否可以点击
  const [nationType, setNationType] = useState(0); // 判断证件类型
  const [imageUrl1, setImageUrl1] = useState(''); // 上传的照片
  const [imageUrl2, setImageUrl2] = useState('');
  // 上传证件资料的事件
  const handleChange = (info, e) => {
    if (info.file.status === 'uploading') {
      if (e === '0') {
        setLoading1(true);
      } else {
        setLoading2(true);
      }
      return;
    }
    if ((loading1 || loading2) === false) {
      return false
    } else {
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          if (e === '0') {
            setLoading1(false);
            setImageUrl1(imageUrl);
          } else {
            setLoading2(false);
            setImageUrl2(imageUrl);
          }
        });
      }
    }
  };
  // 上传前进行校验 包含后缀和大小
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isSize = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error('上传错误，请上传JPG、PNG、JPEG类型的文件');
    }
    if (!isSize) {
      message.error('上传错误，图像大小不超过2M');
    }
    return isJpgOrPng && isSize;
  }
  // 点击删除重新上传
  const deleteUpload = (e) => {
    if (e === 1) {
      setImageUrl1('');
      form.setFieldsValue({ cardPictureFront: '' });
    } else {
      setImageUrl2('');
      form.setFieldsValue({ cardPictureBack: '' });
    }
  }
  const deleteLoading = (e) => {
    if (e === 1) {
      setLoading1(false);
      setImageUrl1('');
      form.setFieldsValue({ cardPictureFront: '' });
    } else {
      setLoading2(false);
      setImageUrl2('');
      form.setFieldsValue({ cardPictureFront: '' });
    }
  }
  const uploadLoading1 = (
      <div>
        {loading1 ? <div className="upload-loading" /> : [nationType === 0 ? <img src={Before} alt="" /> : <img src={Passport} alt="" /> ]}
      </div>
  )
  const uploadLoading2 = (
    <div>
      {loading2 ? <div className="upload-loading" /> : <img src={After} alt="" />}
    </div>
  )
  const backgroundPo = `url(${imageUrl1}) no-repeat`;
  const backgroundRe = `url(${imageUrl2}) no-repeat`;
  return (
    <Form
      name="form"
      className="personal-card"
      autoComplete="off"
      form={form}
      fields={fields}
      onFinish={(values) => onFinish({...values})}
      onValuesChange={(_, setFields) => {
        const { nation, identityCard, firstName, lastName, idEntityCardType, cardPictureFront, cardPictureBack } = setFields;
        if (idEntityCardType === 1) {
          if ((identityCard && firstName && lastName && cardPictureFront) !== undefined) {
            setDisabled(true);
            if ((identityCard && firstName && lastName) === '') {
              setDisabled(false);
            }
          } else {
            setDisabled(false);
          }
        } else {
          if ((identityCard && firstName && lastName && cardPictureFront && cardPictureBack) !== undefined) {
            setDisabled(true);
            if ((identityCard && firstName && lastName) === '') {
              setDisabled(false);
            }
          } else {
            setDisabled(false);
          }
        }
        if (nation !== 'CN') {
          form.setFieldsValue({
            idEntityCardType: 1,
          });
          setNationType(1);
        } else {
          if (idEntityCardType === 1) {
            setNationType(1);
          } else {
            setNationType(0);
          }
        }
      }}
    >
      <Form.Item name="nation" label="国籍">
        <Select disabled={cardCheckStatus === 1}>
          {AREA_LIST.map(item => (
            <Option key={item.value} value={item.label}>{item.name_zh}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="idEntityCardType" label="证件类型">
        <Select disabled={cardCheckStatus === 1}>
          {CHANGE_TYPE.map(item => (
            <Option key={item.value} value={item.value}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="identityCard" label="证件号码" rules={[{ required: true, type: 'string', pattern: REPLACE_REG, message: '只能输入数字或字母' }]}>
        <Input placeholder="请选择证件号码" disabled={cardCheckStatus === 1} />
      </Form.Item>
      <Form.Item>
        <div className="personal-sendCode">
          <Form.Item name="firstName" label="姓">
            <Input placeholder="请输入您的姓" disabled={cardCheckStatus === 1} />
          </Form.Item>
          <Form.Item name="lastName" label="名">
            <Input placeholder="请输入您的名" disabled={cardCheckStatus === 1} />
          </Form.Item>
        </div>
      </Form.Item>
      <Form.Item className="personal-display">
        {
          nationType === 0 ? (
            <div className="personal-upload">
              <Form.Item>
                <Form.Item name="cardPictureFront" label="上传证件资料">
                  <Upload
                    name="file"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/account/auth/idcard/user/picture"
                    beforeUpload={beforeUpload}
                    onChange={(info) => handleChange(info, '0')}
                    disabled={cardCheckStatus === 1 || imageUrl1 || loading1}
                    headers={{
                      'Authorization': auth || '',
                    }}
                  >
                    {imageUrl1 ? <div className="upload-image" style={{ background: backgroundPo, backgroundSize: '100%' }} /> : uploadLoading1}
                    {imageUrl1 && (<i className="iconfont icon-cancel01 icon-upload" onClick={() => deleteUpload(1)} />)}
                    {loading1 && <i className="iconfont icon-cancel01 icon-upload" onClick={() => deleteLoading(1)} />}
                  </Upload>
                </Form.Item>
                  <div className="uploader-passport">点击上传人像面</div>
              </Form.Item>
              <Form.Item>
                <Form.Item name="cardPictureBack" label>
                  <Upload
                    name="file"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/account/auth/idcard/user/picture"
                    beforeUpload={beforeUpload}
                    onChange={(info) => handleChange(info, '1')}
                    disabled={cardCheckStatus === 1 || imageUrl2 || loading2}
                    headers={{
                      'Authorization': auth || '',
                    }}
                  >
                    {imageUrl2 ? <div className="upload-image" style={{ background: backgroundRe, backgroundSize: '100%' }} /> : uploadLoading2}
                    {imageUrl2 && (<i className="iconfont icon-cancel01 icon-upload" onClick={() => deleteUpload(2)} />)}
                    {loading2 && <i className="iconfont icon-cancel01 icon-upload" onClick={() => deleteLoading(2)} />}
                  </Upload>
                </Form.Item>
                <div className="uploader-passport">点击上传国徽面</div>
              </Form.Item>
            </div>
          ) : (
            <Form.Item>
              <Form.Item name="cardPictureFront" label="上传证件资料">
                <Upload
                  name="file"
                  listType="picture-card"
                  showUploadList={false}
                  action="/api/account/auth/idcard/user/picture"
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, '0')}
                  disabled={cardCheckStatus === 1 || imageUrl1 || loading1}
                  headers={{
                    'Authorization': auth || '',
                  }}
                >
                  {imageUrl1 ? <div className="upload-image" style={{ background: backgroundPo, backgroundSize: '100%' }} /> : uploadLoading1}
                  {imageUrl1 && (<i className="iconfont icon-cancel01 icon-upload" onClick={() => deleteUpload(1)} />)}
                  {loading1 && <i className="iconfont icon-cancel01 icon-upload" onClick={() => deleteLoading(1)} />}
                </Upload>
              </Form.Item>
              <div className="uploader-passport">点击上传个人信息</div>
            </Form.Item>
          )
        }
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" className={cardCheckStatus === 1 ? 'btn-primary' : ''} disabled={!disabled || cardCheckStatus === 1}>
          {cardCheckStatus === 1 ? '审核中' : '提交'}
        </Button>
      </Form.Item>
    </Form>
  )
}

const PersonalStetus = ({ data }) => {
  const [fields] = useState([]);
  const [form] = Form.useForm()
  return (
    <Form
      name="form"
      fields={fields}
      form={form}
    >
      <Form.Item name="nations" label="国籍">
        <Input placeholder={data.country} disabled />
      </Form.Item>
      <Form.Item name="idType" label="证件类型">
        <Input placeholder={data.identityCardType === 1 ? '身份证' : '护照'} disabled />
      </Form.Item>
      <Form.Item name="idCard" label="证件号码">
        <Input placeholder={data.identityCard} disabled />
      </Form.Item>
      <Form.Item name="secondName" label="姓名">
        <Input placeholder={data.firstName + data.lastName} disabled />
      </Form.Item>
      <Form.Item>
        <Button>审核中</Button>
      </Form.Item>
    </Form>
  )
}

// 认证成功
const PersonalSuceedForm = ({ data, form }) => {
  const [fields] = useState([])
  return (
    <Form
      name="form"
      fields={fields}
      form={form}
    >
      <Form.Item name="nations" label="国籍">
        <Input placeholder={data.country} disabled />
      </Form.Item>
      <Form.Item name="idType" label="证件类型">
        <Input placeholder={data.identityCardType === 1 ? '身份证' : '护照'} disabled />
      </Form.Item>
      <Form.Item name="idCard" label="证件号码">
        <Input placeholder={data.identityCard} disabled />
      </Form.Item>
      <Form.Item name="secondName" label="姓名">
        <Input placeholder={data.firstName + data.lastName} disabled />
      </Form.Item>
    </Form>
  )
}
const PersonalSuceed = ({ data, form }) => {
  return (
    <div className="personal-suceed">
      <div className="personal-text">
        <span className="personal-success">基础认证</span>
        <img src={Basis} alt="" />
      </div>
      <PersonalSuceedForm data={data} form={form} />
    </div>
  )
}

// 认证失败
const PersonalFailure = ({ reset }) => {
  return (
    <div className="personal-failure">
      <img src={FailUre} alt="" />
      <div className="failurelist-again">身份认证失败</div>
      <Button onClick={() => reset()}>重新认证</Button>
    </div>
  )
}
// 身份认证，成功，失败
const PersonalForm = ({ cardCheckStatus, onFinish, reset, data }) => {
  const [form] = Form.useForm();
  const cardCheckUser = () => {
    switch (cardCheckStatus) {
      case 0:
        return <PersonalIdCard cardCheckStatus={cardCheckStatus} form={form} onFinish={onFinish} />
      case 1:
        return <PersonalStetus data={data} cardCheckStatus={cardCheckStatus} form={form} onFinish={onFinish} />
      case 2:
        return <PersonalSuceed data={data} form={form} />
      case 3:
        return <PersonalFailure reset={reset} />
      default: break
    }
  }
  return (
    <div className="personal-content">
      <div className="personal-list">
        <img src={PersonalUrl} alt="" />
        <div className="personal-text">
            <h3>身份认证</h3>
            <div className='personal-introduce'>完成身份认证提高账户安全，提现额度及交易权限</div>
        </div>
      </div>
      {
        cardCheckStatus === 0 && (
          <div className="personal-remind">
            <img src={Remind} alt="" />
            您填写的信息必须与证件保持一致
          </div>
        )
      }
      <div className="personal-form">
        {cardCheckUser()}
      </div>
    </div>
  )
}
@connect(state => ({
  lang: state.lang,
  apis: state.apis,
  userAuth: state.userAuth,
}))
export default class Personal extends Component {
  constructor() {
    super()
    this.state ={
      cardCheckStatus: 0, // 审核
      data: [],
    }
  }
  componentDidMount() {
    this.setOnChange()
  }
  getHigher = async () => {
    try {
      const { code, data } = await this.props.apis.authHighIdentity();
      if (code === 0) {
        
          const TagA = document.createElement('a');
          TagA.href = data;
          // TagA.target = '__blank';
          document.body.appendChild(TagA);
          TagA.className = 'oInput';
          TagA.style.display = 'none';
      
          // 兼容ios safari浏览器
          const e = document.createEvent('MouseEvent');     
          e.initEvent('click', false, false);     
          TagA.dispatchEvent(e);


        window.open(data)
        console.log(data);
      }
    } catch (error) {
      message.error(error.message);
    }
    
  }
  setOnChange = async () => {
    try {
      const {code, data} = await this.props.apis.getKYCAuth();
      if (code === 0) {
        this.setState({
          data: data,
          cardCheckStatus: data.cardCheckStatus
        })
        // kycLevel 0 未认证 2通过
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  submit = async (values) => {
    const { nation, idEntityCardType, identityCard, firstName, lastName, cardPictureFront, cardPictureBack } = values;
    const param = {
      nation: nation, // 国籍
      cardType: idEntityCardType === 0 ? 1 : 2, // 证件类型
      idCard: identityCard, // 证件号
      firstName: firstName, // 姓
      lastName: lastName, // 名
    };
    if (nation === 'CN') {
      if (idEntityCardType === 0) {
        param.idCardFrontUrl = cardPictureFront && cardPictureFront.file.response.data; // 证件正面
        param.idCardBackUrl = cardPictureBack && cardPictureBack.file.response.data; // 证件反面
      } else {
        param.idCardFrontUrl = cardPictureFront && cardPictureFront.file.response.data; // 证件正面
      }
    } else {
      param.idCardFrontUrl = cardPictureFront && cardPictureFront.file.response.data; // 证件正面
    }
    try {
      const res = await this.props.apis.authUserIdentity(param)
      if (res.code === 0) {
        message.success("提交成功");
        this.setOnChange();
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  // 重新认证
  reset = () => {
    this.setState({ cardCheckStatus: 0 })
  }
  render() {
    const { cardCheckStatus, data } = this.state
    return (
      <div className="personal">
        <PersonHeader {...this.props} />
        <PersonalForm
          onFinish={this.submit}
          data={data}
          cardCheckStatus={cardCheckStatus}
          reset={() => this.reset()}
        />
        {
          (cardCheckStatus === 2 && (data && data.country === 'CN')) && (
            <div className="higherIn">
              <div className="personal-text">
                <span className="personal-success">高级认证</span>
                {
                  data && data.kycLevel === 2 && (<img src={Basis} alt="" />)
                }
              </div>
              <div className="personal-policy">
                <div className="label">进行高级认证，可进行单笔高于<span>2000CNY</span>或累计金额大于<span>10000CNY</span>的法币交易</div>
                {
                  data && data.kycLevel === 0 && (
                    <div className="button" onClick={() => {this.getHigher()}}>
                      去认证
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}