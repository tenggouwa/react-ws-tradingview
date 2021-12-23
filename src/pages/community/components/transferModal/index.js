import React from "react";
import { Modal, Button } from "antd";

import './index.scss';

const TransferModal = ({ isModalVisible, handleCancelVisable }) => {
  
  const handleCancel = () => {
    handleCancelVisable();
  }

  const handleComfirm = () => {
    handleCancelVisable();
  }

  return (
    <div className="transferModal">
      <Modal
        title='温馨提示'
        visible={isModalVisible}
        className="transferModal-modal"
        onCancel={handleCancel}
        maskClosable={false}
        footer={
          <Button key="submit" type="primary" onClick={handleComfirm}>
              确认
          </Button>
        }
      >
        <p>
          划转跟单将收回赠金，划转金额24小时到账
        </p>
      </Modal>
    </div>
  );
};

export default TransferModal;
