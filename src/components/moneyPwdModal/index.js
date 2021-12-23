import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Modal, Button, Input } from "antd";

import './commonModal.scss';

const CommonModal = ({ isModalVisible, handleCancelVisable, handleEmitPwd }) => {
  const history = useHistory();
  const [openVsiable, setOpenVsiable] = useState(false);
  const [valuePwd, setValuePwd] = useState('');
  const [errorInfo, setErrorInfo] = useState('');
  
  const handlePwdChange = (e) => {
    const { value } = e.target;
    const valRegExp = /(?!\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,12}/;
    if (value) {
      if (!valRegExp.test(value)) {
        setErrorInfo('请输入8-12位资金密码（字母、数字、符合），区分大小写');
      } else {
        setErrorInfo('');
      }
      setValuePwd(value);
    } else {
      setValuePwd('');
      setErrorInfo('');
    }
  }

  const handleSubmit = () => {
    setOpenVsiable(true);
    if (openVsiable) {
      if (valuePwd) {
        handleEmitPwd(valuePwd);
        setOpenVsiable(false);
        setValuePwd('');
        handleCancelVisable();
      } else {
        setErrorInfo('请输入资金密码');
      }
    }
  }

  const handleCancel = () => {
    setOpenVsiable(false);
    handleCancelVisable();
  }

  const handleToForget = (e) => {
    e.stopPropagation();
    history.push('/bindpassword');
  }
  return (
    <div className="commonModal">
      <Modal
        title={openVsiable ? '安全中心' : '温馨提示'}
        visible={isModalVisible}
        className="commonModal-modal"
        maskClosable={false}
        onCancel={handleCancel}
        footer={
          <Button key="submit" type="primary" onClick={handleSubmit}>
              确认
          </Button>
        }
      >
        {
          !openVsiable ? (
            <p>
              取消跟单将收回赠金，跟单金额7天后返还到您的跟单账户
            </p>
          ) : (
            <div className="assetPassword-container">
              <span className="assetPassword">资金密码</span>
              <Input.Password placeholder="请输入资金密码" maxLength={12} value={valuePwd} onChange={handlePwdChange} />
              <span className="errorInfo">{errorInfo}</span>
              <span className="forgetPassword" onClick={handleToForget}>忘记密码</span>
            </div>
          )
        }
      </Modal>
    </div>
  );
};

export default CommonModal;
