import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import { Table } from 'antd';
import message from '@tenggouwa/message';
import MarketTableLine from '@/components/marketTableLine';
import { TAB_LIST } from './constants';

import './index.scss';

const MOCK_LINE = [1, 2, 9, 4, 3, 5, 4, 6, 7, 3, 9, 3, 10, 2, 1];

const MarketCard = ({ dataSource }) => {
  return (
    <div className="marketCard">
      {
        dataSource.map(item => (
          <div className="marketCard-item">
            <div>
              <img src={item.coinIconUrl} alt="" />
              <span>{item.cardName}</span>
              <span>{item.gain >= 0 ? '+' : ''}{Number(item.gain).toFixed(2)}%</span>
            </div>
            <p>{item.realTimePrice}</p>
            <div>
              <span>24H量</span>
              <span>{item.vol}</span>
            </div>
            <MarketTableLine d={MOCK_LINE} className="line" />
          </div>
        ))
      }
    </div>
  )
}

const MarketTable = () => {
  // const history = useHistory()
  // const jump = () => {
  //   history.push('/trade')
  // }
  const [tabIndex, setTabIndex] = useState(0);
  const handleChangeTab = (e) => {
    setTabIndex(e)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const Tab = () => {
    return (
      <ul className="marketTab">
        {
          TAB_LIST.map(item => (
            <li
              key={item.value}
              className={tabIndex === item.value ? 'active' : ''}
              onClick={() => handleChangeTab(item.value)}
            >
              {item.label}
            </li>
          ))
        }
      </ul>
    );
  }
  return (
    <div className="marketTable">
      <Tab />
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}

@connect(state => ({
  apis: state.apis,
  lang: state.lang,
  wsData: state.wsData,
  wsObj: state.wsObj,
  sendWs: state.sendWs,
}))

export default class Market extends Component {
  constructor() {
    super();
    this.state = {
      cardData: [],
    }
  }
  componentDidMount() {
    this.initCard();
  }
  static getDerivedStateFromProps({ wsData }, prevState) {
    if (wsData.ws_10 && wsData.ws_10 !== prevState.cardData) {
      return {
        cardData: wsData.ws_10
      }
    }
    return null;
  }
  componentDidUpdate({ wsData }, state) {
    if (wsData.ws_10 && wsData.ws_10 !== state.cardData) {
      this.setState({
        cardData: wsData.ws_10
      });
    }
  }
  componentWillUnmount() {
    this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify({
      reqType: -5,
      type: 10
    })))
  }
  initCard = async () => {
    try {
      const res = await this.props.apis.lineCard();
      if (res.code === 0) {
        this.setState({
          cardData: res.data
        })
        const cardIds = res.data.map(item => ({
          cardId: item.cardId,
          cardType: item.cardType
        }))
        const wsParam = {
          reqType: 10,
          param: JSON.stringify({
            type: 10,
            data: cardIds
          })
        }
        this.props.dispatch(this.props.sendWs(this.props.wsObj, JSON.stringify(wsParam)))
      }
    } catch (error) {
      message.error(error)
    }
  }
  render() {
    const { cardData } = this.state;
    return (
      <div className="market">
        <div className="market-main">
          <MarketCard dataSource={cardData} />
          <MarketTable/>
        </div>
      </div>
    )
  }
}
