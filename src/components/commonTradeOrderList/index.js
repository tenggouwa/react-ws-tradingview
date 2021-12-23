import React, { useState, useEffect } from 'react';

import { ORDER_TYPE, TAB_LIST } from './constants';
import './index.scss';

const TOP_MOCK = [{
  price: 1,
  num: 230,
  total: 230,
}, {
  price: 2,
  num: 230,
  total: 230,
}, {
  price: 3,
  num: 230,
  total: 230,
}]

const BOTTOM_MOCK = [{
  price: 1,
  num: 230,
  total: 230,
}, {
  price: 2,
  num: 230,
  total: 230,
}, {
  price: 3,
  num: 230,
  total: 230,
}]

const ListTab = ({ tabIndex, setTabIndex }) => {
  return (
    <div className="orderList-tab">
      {
        ORDER_TYPE.map(item => (
          <p
            key={item.value}
            className={tabIndex === item.value ? 'active' : ''}
            onClick={() => setTabIndex(item.value)}
          >
            {item.label}
          </p>
        ))
      }
    </div>
  )
}

const ListItem = ({ dataSource }) => {
  if (!dataSource || dataSource.length < 1) return null;
  // console.log(dataSource);
  return (
    <ul className="list-item">
      {
        dataSource.map(item => (
          <li>
            <span>{item.price}</span>
            <span>{item.num}</span>
            <span>{item.total}</span>
          </li>
        ))
      }
    </ul>
  )
}

const ListContent = ({ tabIndex }) => {
  const [typeIndex, setTypeIndex] = useState('0');
  const [topList, setTopList] = useState([]);
  const [bottomList, setBottomList] = useState([]);
  const RenderTitle = () => {
    return (
      <div className="list-title">
        <p>价格</p>
        <p>数量</p>
        <p>累计数量</p>
      </div>
    )
  }
  const handleChangedType = (e = '0') => {
    switch (e) {
      case '0':
        setTopList(TOP_MOCK)
        setBottomList(BOTTOM_MOCK)
        break;
      case '1':
        setTopList(TOP_MOCK)
        setBottomList([])
        break;
      case '2':
        setTopList([])
        setBottomList(BOTTOM_MOCK)
        break;
      default:
        break;
    }
    setTypeIndex(e)
  }
  useEffect(() => {
    handleChangedType()
  }, [])

  return (
    <div className="list-content">
      {
        tabIndex === '0' ? (
          <>
            <div className="list-type">
              {
                TAB_LIST.map(item => (
                  <img
                    src={item.label}
                    className={item.value === typeIndex ? 'active' : ''}
                    onClick={() => handleChangedType(item.value)}
                  />
                ))
              }
            </div>
            <RenderTitle />
            <div className="list-main">
              <ListItem dataSource={topList} />
              <div className="list-center"></div>
              <ListItem dataSource={bottomList} />
            </div>
          </>
        ) : (
          <div className="list-main">
            <RenderTitle />
            <ListItem dataSource={topList} />
          </div>
        )
      }
    </div>
  )
}

const OrderList = () => {
  const [tabIndex, setTabIndex] = useState('0');

  const handleChangeTab = (val) => {
    setTabIndex(val);
  }

  return (
    <div className="orderList">
      <ListTab tabIndex={tabIndex} setTabIndex={handleChangeTab} />
      <ListContent tabIndex={tabIndex} />
    </div>
  );
}

export default OrderList;