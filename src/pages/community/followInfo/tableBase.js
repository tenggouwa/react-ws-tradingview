import React from 'react';
import formData from '@/assets/js/common';

const TableBase = ({ dataHeader, dataSource, title, text }) => {
  if (!dataSource) return false;
  const changeStatus = () => {
    let followMsg
    if (text.followStatus) {
      if (text.followStatus === 1) {
        followMsg = '正在跟随';
      }
      if (text.followStatus === 0) {
        followMsg = '结束跟随';
      }
    } else {
      followMsg = '--';
    }
    return followMsg;
  }
  return (
    <div className="tableBase">
      <div className="table-box">
        <div className="table-title">
          {
            title ? <p>{title}</p> : null
          }
          {
            title === '跟单概述' ? (
              <p className="title-text">
                <span>{changeStatus()}</span>
                {/* <span>{text.followStatus === 1 ? '正在跟随' : '结束跟随' || '--'}</span> */}
                <span>已经跟单<i>{text.followDays || '--'}</i>天</span>
              </p>
            ) : ''
          }
        </div>
        <div className="table-main">
          <p className="table-header">
            {
              dataHeader.map((header, i) => (
                <span key={`${i}_${header}`}>{header.label}</span>
              ))
            }
          </p>
          <div className="table-tbody">
            {
              dataHeader.map(({ value, render }, i) => {
                return (
                  <p key={`${i}_${value}`}>
                    {
                      value === 'action' ? render(dataSource, i) : dataSource[value] || '--'
                    }
                  </p>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableBase
