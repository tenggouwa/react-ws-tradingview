import React from 'react';
import { Empty } from 'antd';
import './index.scss';


const CommonTable = ({ dataSource = [], dataHeader = [], expandkey = '' }) => {
  // 渲染头部
  function renderHeader() {
    return dataHeader.map((item, i) => {
      const style = {
        width: item.width,
        textAlign: item.align,
      };
      return (
        <span key={i} style={style}>
          {item.name}
        </span>
      );
    });
  };

  // 渲染内容
  function renderContent(item, i) {
    return dataHeader.map((opt, index) => {
      const style = {
        width: opt.width,
        textAlign: opt.align,
      };
      return (
        <span
          key={`${item[expandkey]}_${i}_${opt.key}_${index}`}
          style={style}
        >
          {opt.key === "action" ? (
            <div>{opt.render(item, i)}</div>
          ) : (
            item[opt.key]
          )}
        </span>
      );
    });
  };

  return (
    <div className="commons-table">
      <div className="tableOnes">
        <ul>
          {/* 头部 */}
          <li>{renderHeader()}</li>
          {dataSource && dataSource.length !== 0
            ? dataSource.map((item, i) => (
                <li key={i}>
                  {renderContent(item, i)}
                </li>
              ))
            : <Empty  description="暂无数据" />}
        </ul>
      </div>
    </div>
  );
};

export default CommonTable;
