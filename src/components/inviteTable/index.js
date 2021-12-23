import React from 'react';

import './index.scss'

export default function InviteTable ({ dataSource = [], columList = [] }) {
  return (
    <ul className="inviteTable">
      <li className="inviteTable-tr inviteTable-header">
        {
          columList.map(columItem => (
            <span>{columItem.label}</span>
          ))
        }
      </li>
      {
        dataSource && dataSource.length > 0 ? (
          dataSource.map(dataItem => (
            <li className="inviteTable-tr">
              {
                columList.map(columItem => {
                  if (columItem.hasOwnProperty('render')) {
                    return <span style={columItem.width ? { maxWidth: columItem.width } : {}}>{columItem.render(dataItem[columItem.dataIndex])}</span>
                  }
                  return <span style={columItem.width ? { maxWidth: columItem.width } : {}}>{dataItem[columItem.dataIndex]}</span>
                })
              }
            </li>
          ))
        ) : (
          <li className="inviteTable-noData">
            <i className="iconfont icon-ku" />
            <p>暂无数据</p>
          </li>
        )
      }
    </ul>
  )
};
