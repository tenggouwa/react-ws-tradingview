import React, { useState } from "react";
import { Spin } from 'antd';
import NoData from '@/assets/img/assetsRecord/noData.png';
import "./index.scss";

const OrderList = ({ dataHeader = [], dataSource = [], loading = false }) => {
  const [showIndex, setShowIndex] = useState('');
  const handleChoose = i => {
    if (showIndex !== i) {
      setShowIndex(i);
    } else {
      setShowIndex('');
    }
  }
  return (
    <div className="assetsOrderList">
      <Spin spinning={loading}>
        {
          dataSource && dataSource.length > 0 ? dataSource.map((item, i) => (
            <ul className="assetsOrderList-ul" key={`${i}${item}`}>
              {
                dataHeader.map((head, index) => head.value !== 'actionDown' ? (
                    <li key={`${head.label}_${i}_${head.key}_${index}`}>
                      <p className="label">{head.label}</p>
                      <div className="value">
                        {
                          head.value === 'action' ? head.render(item, i) : item[head.value]
                        }
                      </div>
                    </li>
                  ) : (
                    <div className="actionDown">
                      <p className="btnText" onClick={() => handleChoose(i)}>
                        {head.btnText || '--'}
                        <i className={`iconfont icon-jiantoushang ${showIndex === i ? 'down' : ''}`} />
                      </p>
                      {
                        showIndex === i ? head.render(item, i) : null
                      }
                    </div>
                  )
                )
              }
            </ul>
          )) : (
            <div className="tableNoData">
              <img src={NoData} alt="" />
            </div>
          )
        }
      </Spin>
    </div>
  )
}
export default OrderList;
