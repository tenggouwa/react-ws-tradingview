import React, { useState } from "react";
import CommonTable from "@/components/commonTable";

import { TAB_LIST } from "./contants";
import "./index.scss";

const HomeTable = (props) => {
  const [headerContractKey, setHeaderContractKey] = useState(2);

  const dataHeader = [
    {
      name: "币对",
      key: "cardName",
      width: "33.33%",
    },
    {
      name: "最新价格",
      key: "realTimePrice",
      width: "33.33%",
    },
    {
      name: "24h涨跌",
      key: "action",
      width: "33.33%",
      render: (item) => 
        <span>
          {Number(item.gain) >= 0 ? (
            <span className="daily-green">
              +{Number(item.gain) === 0 ? "0.00" : item.gain}%
            </span>
          ) : (
            <span className="daily-red">{item.gain}%</span>
          )}
        </span>,
    },
  ];

  const handleTab = (item) => {
    setHeaderContractKey(item.label);
    props.currentIndex(item.label);
  };

  const { dataSource } = props;
  
  return (
    <div className="homeTable">
      <div className="homeTable-container">
        <div className="homeTable-tab">
          {TAB_LIST.map((item) => (
            <div
              key={item.label}
              className={`tab-submenu-comm-market ${
                item.label === headerContractKey ? "active" : ""
              }`}
              onClick={() => handleTab(item)}
            >
              {item.value}
            </div>
          ))}
        </div>
        <div className="homeTable-Content">
          <CommonTable dataHeader={dataHeader} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
};

export default HomeTable;
